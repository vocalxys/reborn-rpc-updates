const net = require('net');
const crypto = require('crypto');
const EventEmitter = require('events');

const OPCODES = {
  HANDSHAKE: 0,
  FRAME: 1,
  CLOSE: 2,
  PING: 3,
  PONG: 4,
};

class DiscordIPCClient extends EventEmitter {
  constructor() {
    super();
    this.socket = null;
    this.connected = false;
    this.ready = false;
    this.clientId = null;
    this.user = null;
    this.pipeIndex = null;
    this.lastActivity = null;
    this.reconnectTimer = null;
    this.autoReconnect = true;
    this.isConnecting = false;
    this.pendingCallbacks = new Map();
    this.buffer = Buffer.alloc(0);
    this.connectedAt = null;
  }

  encode(op, data) {
    const payload = Buffer.from(JSON.stringify(data), 'utf8');
    const packet = Buffer.alloc(8 + payload.length);
    packet.writeInt32LE(op, 0);
    packet.writeInt32LE(payload.length, 4);
    payload.copy(packet, 8);
    return packet;
  }

  getPipePath(index) {
    if (process.platform === 'win32') {
      return `\\\\?\\pipe\\discord-ipc-${index}`;
    }
    const prefix =
      process.env.XDG_RUNTIME_DIR ||
      process.env.TMPDIR ||
      process.env.TMP ||
      process.env.TEMP ||
      '/tmp';
    return `${prefix.replace(/\/$/, '')}/discord-ipc-${index}`;
  }

  async connect(clientId) {
    if (!clientId || typeof clientId !== 'string' || !/^\d{15,22}$/.test(clientId.trim())) {
      const err = new Error('유효한 Discord Application Client ID (17~20자리 숫자)를 입력해주세요.');
      this.emit('log', { type: 'error', message: err.message });
      throw err;
    }

    const cleanClientId = clientId.trim();

    if (this.isConnecting) {
      return;
    }

    if (this.connected && this.clientId === cleanClientId && this.ready) {
      return { user: this.user, pipeIndex: this.pipeIndex };
    }

    if (this.socket) {
      await this.disconnect(false);
    }

    this.clientId = cleanClientId;
    this.isConnecting = true;
    this.emit('status', { state: 'connecting', clientId: cleanClientId });
    this.emit('log', {
      type: 'info',
      message: `Discord IPC 파이프 탐색 중... (Client ID: ${cleanClientId})`,
    });

    try {
      const socketInfo = await this.findAndConnectPipe();
      this.socket = socketInfo.socket;
      this.pipeIndex = socketInfo.index;
      this.connected = true;
      this.buffer = Buffer.alloc(0);

      this.setupSocketListeners();

      const readyData = await this.performHandshake(cleanClientId);
      this.ready = true;
      this.isConnecting = false;
      this.connectedAt = Date.now();
      this.user = readyData.user || null;

      this.emit('status', {
        state: 'connected',
        clientId: cleanClientId,
        user: this.user,
        pipeIndex: this.pipeIndex,
        connectedAt: this.connectedAt,
      });

      this.emit('log', {
        type: 'success',
        message: `Discord IPC 연결 완료 (pipe-${this.pipeIndex}) · 계정: ${
          this.user ? `${this.user.global_name || this.user.username} (@${this.user.username})` : '연결됨'
        }`,
      });

      return {
        user: this.user,
        pipeIndex: this.pipeIndex,
        config: readyData.config,
      };
    } catch (error) {
      this.isConnecting = false;
      this.connected = false;
      this.ready = false;
      this.emit('status', {
        state: 'error',
        error: error.message,
        clientId: cleanClientId,
      });
      this.emit('log', {
        type: 'error',
        message: `IPC 연결 실패: ${error.message}`,
      });
      this.scheduleReconnect();
      throw error;
    }
  }

  findAndConnectPipe() {
    return new Promise((resolve, reject) => {
      let currentIndex = 0;

      const tryNextPipe = () => {
        if (currentIndex > 9) {
          reject(
            new Error(
              '실행 중인 Discord 데스크톱 앱을 찾을 수 없습니다. Discord 앱이 켜져 있는지 확인해주세요.'
            )
          );
          return;
        }

        const pipePath = this.getPipePath(currentIndex);
        const socket = net.createConnection(pipePath);

        let settled = false;
        const timeout = setTimeout(() => {
          if (!settled) {
            settled = true;
            socket.destroy();
            currentIndex++;
            tryNextPipe();
          }
        }, 650);

        socket.once('connect', () => {
          if (!settled) {
            settled = true;
            clearTimeout(timeout);
            socket.removeAllListeners('error');
            resolve({ socket, index: currentIndex });
          }
        });

        socket.once('error', () => {
          if (!settled) {
            settled = true;
            clearTimeout(timeout);
            socket.destroy();
            currentIndex++;
            tryNextPipe();
          }
        });
      };

      tryNextPipe();
    });
  }

  setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on('data', (chunk) => {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      this.processBuffer();
    });

    this.socket.on('close', () => {
      const wasConnected = this.connected;
      this.connected = false;
      this.ready = false;
      this.socket = null;

      for (const [, pending] of this.pendingCallbacks) {
        clearTimeout(pending.timer);
        pending.reject(new Error('Discord IPC 소켓 연결이 종료되었습니다.'));
      }
      this.pendingCallbacks.clear();

      this.emit('status', { state: 'disconnected', clientId: this.clientId });
      if (wasConnected) {
        this.emit('log', {
          type: 'warn',
          message: 'Discord IPC 연결이 끊어졌습니다.',
        });
        this.scheduleReconnect();
      }
    });

    this.socket.on('error', (err) => {
      this.emit('log', {
        type: 'error',
        message: `IPC 소켓 오류: ${err.message}`,
      });
    });
  }

  processBuffer() {
    while (this.buffer.length >= 8) {
      const op = this.buffer.readInt32LE(0);
      const length = this.buffer.readInt32LE(4);

      if (this.buffer.length < 8 + length) {
        break;
      }

      const rawPayload = this.buffer.subarray(8, 8 + length).toString('utf8');
      this.buffer = this.buffer.subarray(8 + length);

      let data = null;
      try {
        data = JSON.parse(rawPayload);
      } catch {
        continue;
      }

      this.handleIncomingPacket(op, data);
    }
  }

  handleIncomingPacket(op, data) {
    if (op === OPCODES.PING) {
      if (this.socket && !this.socket.destroyed) {
        this.socket.write(this.encode(OPCODES.PONG, data));
      }
      return;
    }

    if (op === OPCODES.CLOSE) {
      const errMsg = data?.message || 'Discord에서 연결을 종료했습니다 (Client ID를 확인하세요).';
      this.emit('log', { type: 'error', message: `IPC 종료 응답: ${errMsg} (코드: ${data?.code || 'N/A'})` });
      if (this.handshakeReject) {
        const rej = this.handshakeReject;
        this.handshakeResolve = null;
        this.handshakeReject = null;
        rej(new Error(errMsg));
      }
      this.disconnect(false);
      return;
    }

    if (op === OPCODES.FRAME && data) {
      if (data.cmd === 'DISPATCH' && data.evt === 'READY') {
        if (this.handshakeResolve) {
          const res = this.handshakeResolve;
          this.handshakeResolve = null;
          this.handshakeReject = null;
          res(data.data || {});
        }
        return;
      }

      if (data.nonce && this.pendingCallbacks.has(data.nonce)) {
        const pending = this.pendingCallbacks.get(data.nonce);
        this.pendingCallbacks.delete(data.nonce);
        clearTimeout(pending.timer);

        if (data.evt === 'ERROR') {
          const errMessage = data.data?.message || 'Discord IPC 명령 실행 중 오류가 발생했습니다.';
          pending.reject(new Error(`${errMessage} (코드: ${data.data?.code || 'Unknown'})`));
        } else {
          pending.resolve(data.data);
        }
      }
    }
  }

  performHandshake(clientId) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.handshakeResolve = null;
        this.handshakeReject = null;
        reject(new Error('Discord IPC 핸드셰이크 시간 초과 (Client ID가 유효한지 확인해주세요).'));
      }, 6000);

      this.handshakeResolve = (data) => {
        clearTimeout(timeout);
        resolve(data);
      };

      this.handshakeReject = (err) => {
        clearTimeout(timeout);
        reject(err);
      };

      try {
        this.socket.write(
          this.encode(OPCODES.HANDSHAKE, {
            v: 1,
            client_id: clientId,
          })
        );
      } catch (err) {
        clearTimeout(timeout);
        this.handshakeResolve = null;
        this.handshakeReject = null;
        reject(err);
      }
    });
  }

  sendCommand(cmd, args) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.connected || !this.ready) {
        reject(new Error('Discord IPC가 아직 연결되지 않았습니다.'));
        return;
      }

      const nonce = crypto.randomUUID();
      const timer = setTimeout(() => {
        if (this.pendingCallbacks.has(nonce)) {
          this.pendingCallbacks.delete(nonce);
          reject(new Error(`Discord IPC 명령 응답 시간 초과 (${cmd})`));
        }
      }, 6000);

      this.pendingCallbacks.set(nonce, { resolve, reject, timer });

      const payload = {
        cmd,
        args,
        nonce,
      };

      try {
        this.socket.write(this.encode(OPCODES.FRAME, payload));
      } catch (err) {
        clearTimeout(timer);
        this.pendingCallbacks.delete(nonce);
        reject(err);
      }
    });
  }

  buildActivityPayload(config, resolvedVariables = {}) {
    const replaceVars = (str) => {
      if (!str || typeof str !== 'string') return '';
      return str.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, key) => {
        return resolvedVariables[key] !== undefined ? String(resolvedVariables[key]) : match;
      });
    };

    const activityType = Number(config.type ?? 0);
    const validType = [0, 1, 2, 3, 5].includes(activityType) ? activityType : 0;

    const activity = {
      type: validType,
      instance: Boolean(config.instance ?? true),
    };

    if (validType === 1) {
      activity.url =
        config.streamUrl && /^https?:\/\/(www\.)?(twitch\.tv|youtube\.com)\/.+/i.test(config.streamUrl)
          ? config.streamUrl.trim()
          : 'https://twitch.tv/discord';
    }

    const customName = replaceVars(config.name || config.appName || '').trim();
    if (customName.length > 0) {
      activity.name = customName.slice(0, 128);
    }

    if (typeof config.statusDisplayType === 'number') {
      activity.status_display_type = config.statusDisplayType;
    }

    const details = replaceVars(config.details).trim();
    const state = replaceVars(config.state).trim();

    if (details.length > 0) {
      activity.details = details.slice(0, 128);
    }
    if (state.length > 0) {
      activity.state = state.slice(0, 128);
    }

    // Timestamps (Elapsed, Fixed, Custom Offset, Unlimited, Countdown, Progress Bar, Local Day, None)
    const tsMode = config.timestampMode || 'elapsed';
    const isFrozen = Boolean(config.freezeTimer) || tsMode === 'fixed';
    const timestamps = {};
    const nowMs = Date.now();

    if (tsMode === 'elapsed') {
      const baseMs = isFrozen ? nowMs : config._sessionStartMs || nowMs;
      timestamps.start = Math.floor(baseMs / 1000);
    } else if (tsMode === 'fixed' || tsMode === 'custom_offset') {
      const offsetHours = Math.max(0, Number(config.offsetHours || 0));
      const offsetMinutes = Math.max(0, Number(config.offsetMinutes || 0));
      const offsetSeconds = Math.max(0, Number(config.offsetSeconds || 0));
      const totalOffsetMs = (offsetHours * 3600 + offsetMinutes * 60 + offsetSeconds) * 1000;
      const baseMs = isFrozen ? nowMs : config._sessionStartMs || nowMs;
      timestamps.start = Math.floor((baseMs - totalOffsetMs) / 1000);
    } else if (tsMode === 'unlimited') {
      // Unlimited / Eternal Hours Mode (e.g. 9999h or 24000h fixed or counting)
      const unlimitedHours = Math.max(1, Number(config.unlimitedHours || 9999));
      const freezeUnlim = config.freezeTimer !== false;
      const baseMs = freezeUnlim ? nowMs : config._sessionStartMs || nowMs;
      timestamps.start = Math.floor((baseMs - unlimitedHours * 3600 * 1000) / 1000);
      if (freezeUnlim) {
        timestamps.end = Math.floor(nowMs / 1000);
      }
    } else if (tsMode === 'progress_bar') {
      const curHrs = Math.max(0, Number(config.offsetHours || 0));
      const curMin = Math.max(0, Number(config.offsetMinutes ?? 1));
      const curSec = Math.max(0, Number(config.offsetSeconds ?? 24));
      const totalMin = Math.max(1, Number(config.customEndMinutes || 4));
      const elapsedSec = curHrs * 3600 + curMin * 60 + curSec;
      const totalSec = Math.max(elapsedSec + 5, totalMin * 60);
      const nowSec = Math.floor(nowMs / 1000);
      timestamps.start = nowSec - elapsedSec;
      timestamps.end = timestamps.start + totalSec;
    } else if (tsMode === 'app_uptime') {
      timestamps.start = Math.floor((config._appStartMs || nowMs) / 1000);
    } else if (tsMode === 'local_day') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      timestamps.start = Math.floor(startOfDay.getTime() / 1000);
    } else if (tsMode === 'countdown' || tsMode === 'remaining') {
      const durationSec = Math.max(10, Number(config.countdownSeconds || Number(config.customEndMinutes || 45) * 60 || 2700));
      const baseSec = Math.floor((config._sessionStartMs || nowMs) / 1000);
      timestamps.start = baseSec;
      timestamps.end = baseSec + durationSec;
    } else if (tsMode === 'custom') {
      if (config.customStartTimestamp && Number(config.customStartTimestamp) > 0) {
        const startVal = Number(config.customStartTimestamp);
        timestamps.start = Math.floor(startVal > 1e11 ? startVal / 1000 : startVal);
      }
      if (config.customEndTimestamp && Number(config.customEndTimestamp) > 0) {
        const endVal = Number(config.customEndTimestamp);
        timestamps.end = Math.floor(endVal > 1e11 ? endVal / 1000 : endVal);
      }
    }

    if (timestamps.start || timestamps.end) {
      activity.timestamps = timestamps;
    }

    // Assets
    const assets = {};
    const largeImage = (config.largeImageKey || '').trim();
    const largeText = replaceVars(config.largeImageText).trim();
    const smallImage = (config.smallImageKey || '').trim();
    const smallText = replaceVars(config.smallImageText).trim();

    if (largeImage.length > 0) {
      assets.large_image = largeImage.slice(0, 256);
    }
    if (largeText.length >= 2) {
      assets.large_text = largeText.slice(0, 128);
    } else if (largeText.length === 1) {
      assets.large_text = `${largeText} `;
    }

    if (smallImage.length > 0) {
      assets.small_image = smallImage.slice(0, 256);
    }
    if (smallText.length >= 2) {
      assets.small_text = smallText.slice(0, 128);
    } else if (smallText.length === 1) {
      assets.small_text = `${smallText} `;
    }

    if (Object.keys(assets).length > 0) {
      activity.assets = assets;
    }

    // Party
    if (config.partyEnabled) {
      const currentSize = Math.max(1, parseInt(config.partyCurrent, 10) || 1);
      const maxSize = Math.max(currentSize, parseInt(config.partyMax, 10) || currentSize);
      activity.party = {
        id: (config.partyId || 'rpc-studio-party-01').trim().slice(0, 128),
        size: [currentSize, maxSize],
      };
      if (config.partyPrivacy === 'public') {
        activity.party.privacy = 1;
      }
    }

    // Buttons (up to 2)
    const buttons = [];
    if (config.button1Enabled !== false) {
      const label1 = replaceVars(config.button1Label).trim();
      const url1 = (config.button1Url || '').trim();
      if (label1 && /^https?:\/\/.+/i.test(url1)) {
        buttons.push({ label: label1.slice(0, 32), url: url1 });
      }
    }
    if (config.button2Enabled !== false) {
      const label2 = replaceVars(config.button2Label).trim();
      const url2 = (config.button2Url || '').trim();
      if (label2 && /^https?:\/\/.+/i.test(url2)) {
        buttons.push({ label: label2.slice(0, 32), url: url2 });
      }
    }

    if (buttons.length > 0) {
      activity.buttons = buttons;
    }

    return activity;
  }

  async setActivity(config, resolvedVariables = {}) {
    const targetClientId = (config.clientId || this.clientId || '').trim();
    if (!targetClientId) {
      throw new Error('Application Client ID가 설정되지 않았습니다.');
    }

    if (!this.connected || !this.ready || this.clientId !== targetClientId) {
      await this.connect(targetClientId);
    }

    const activity = this.buildActivityPayload(config, resolvedVariables);
    this.lastActivity = { config, resolvedVariables, payload: activity };

    const result = await this.sendCommand('SET_ACTIVITY', {
      pid: process.pid,
      activity,
    });

    this.emit('activity-updated', {
      activity,
      response: result,
      timestamp: Date.now(),
    });

    this.emit('log', {
      type: 'success',
      message: `RPC 상태 업데이트 전송 완료 (${activity.details || '상세 없음'} · ${activity.state || '보조 문구 없음'})`,
      payload: activity,
    });

    return {
      sent: activity,
      response: result,
      user: this.user,
    };
  }

  async clearActivity() {
    if (!this.connected || !this.ready) {
      return { cleared: true };
    }

    await this.sendCommand('SET_ACTIVITY', {
      pid: process.pid,
      activity: null,
    });

    this.lastActivity = null;
    this.emit('activity-cleared');
    this.emit('log', {
      type: 'info',
      message: 'Discord Rich Presence 활동 표시가 초기화되었습니다.',
    });
    return { cleared: true };
  }

  scheduleReconnect() {
    if (!this.autoReconnect || !this.clientId) return;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

    this.reconnectTimer = setTimeout(async () => {
      if (!this.connected && this.autoReconnect && this.clientId) {
        this.emit('log', {
          type: 'info',
          message: 'Discord IPC 자동 재연결 시도 중...',
        });
        try {
          await this.connect(this.clientId);
          if (this.lastActivity?.config) {
            await this.setActivity(
              this.lastActivity.config,
              this.lastActivity.resolvedVariables
            );
          }
        } catch {
          // Next retry scheduled inside connect catch
        }
      }
    }, 5000);
  }

  async disconnect(disableAutoReconnect = true) {
    if (disableAutoReconnect) {
      this.autoReconnect = false;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      try {
        this.socket.removeAllListeners();
        this.socket.destroy();
      } catch {
        // Ignore cleanup errors
      }
      this.socket = null;
    }

    this.connected = false;
    this.ready = false;
    this.isConnecting = false;
    this.emit('status', { state: 'disconnected', clientId: this.clientId });
    this.emit('log', { type: 'info', message: 'Discord IPC 연결을 수동으로 종료했습니다.' });
  }

  getStatus() {
    return {
      connected: this.connected && this.ready,
      clientId: this.clientId,
      user: this.user,
      pipeIndex: this.pipeIndex,
      connectedAt: this.connectedAt,
      autoReconnect: this.autoReconnect,
      lastActivity: this.lastActivity?.payload || null,
    };
  }
}

module.exports = { DiscordIPCClient };
