const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { RPCEngineCore } = require('./engine-core');
const { sanitizeClientId } = require('./store');
const { AutoUpdater } = require('./auto-updater');

const PORT = 4789;
const rendererDir = path.join(__dirname, '../renderer');
const engine = new RPCEngineCore(path.join(process.cwd(), 'data'));
const autoUpdater = new AutoUpdater(path.join(process.cwd(), 'data'));

const sseClients = new Set();

function broadcastSSE(type, data) {
  const jsonMsg = JSON.stringify({ type, data });
  const payload = `data: ${jsonMsg}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(payload);
    } catch {
      sseClients.delete(res);
    }
  }
}

engine.on('status', (data) => broadcastSSE('status', data));
engine.on('log', (data) => broadcastSSE('log', data));
engine.on('telemetry-tick', (data) => broadcastSSE('stats', data));
engine.on('keyframe-switched', (data) => broadcastSSE('keyframe-switched', data));
engine.on('profile-switched', (data) => broadcastSSE('profile-switched', data));

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(obj));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const pathname = urlObj.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // SSE stream
  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write(
      `data: ${JSON.stringify({
        type: 'status',
        data: {
          ...engine.rpcClient.getStatus(),
          identity: engine.store.getState().identity,
        },
      })}\n\n`
    );
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  // REST API Endpoints
  try {
    if ((pathname === '/api/init' || pathname === '/api/initial-state') && req.method === 'GET') {
      const snap = engine.getInitialSnapshot();
      sendJson(res, 200, {
        ok: true,
        config: snap.store,
        authSession: snap.authSession,
        status: snap.ipcStatus,
        isRpcRunning: engine.isRpcRunning,
        variables: snap.variables,
        updateInfo: autoUpdater.getStatus(),
      });
      return;
    }

    if (pathname === '/api/updater/status' && req.method === 'GET') {
      sendJson(res, 200, autoUpdater.getStatus());
      return;
    }

    if (pathname === '/api/updater/check' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const upd = await autoUpdater.checkForUpdates(body);
      sendJson(res, 200, upd);
      return;
    }

    if (pathname === '/api/update/manifest' && req.method === 'GET') {
      const baseHost = req.headers.host ? `http://${req.headers.host}` : 'http://127.0.0.1:4789';
      sendJson(res, 200, autoUpdater.getLocalManifest(baseHost));
      return;
    }

    if (pathname === '/api/update/raw' && req.method === 'GET') {
      const relFile = parsedUrl.query?.file || '';
      const rawText = autoUpdater.getRawFileContent(relFile);
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      });
      res.end(rawText, 'utf8');
      return;
    }

    if (pathname === '/api/admin/publish-update' && req.method === 'POST') {
      const body = await readJsonBody(req);
      engine.licenseManager.verifyAdmin(body.adminPassword);
      const pubRes = await autoUpdater.publishUpdate(body);
      engine.licenseManager.addAuditLog(
        'PUBLISH_UPDATE',
        `새 버전 v${pubRes.currentVersion} 자동 업데이트 배포 완료${pubRes.githubResult ? ` (GitHub: ${pubRes.githubResult.owner}/${pubRes.githubResult.repo})` : ' (자체 업데이트 서버)'}`
      );
      sendJson(res, 200, pubRes);
      return;
    }

    // AUTH & LICENSE ENDPOINTS
    if (pathname === '/api/auth/session' && req.method === 'GET') {
      sendJson(res, 200, {
        ok: true,
        ...engine.licenseManager.getSessionStatus(),
      });
      return;
    }

    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const session = engine.licenseManager.registerUser(body);
      sendJson(res, 200, { ok: true, ...session });
      return;
    }

    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const session = engine.licenseManager.loginUser(body);
      sendJson(res, 200, { ok: true, ...session });
      return;
    }

    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      await engine.clearActivity().catch(() => {});
      const out = engine.licenseManager.logoutUser();
      sendJson(res, 200, out);
      return;
    }

    if (pathname === '/api/admin/overview' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const overview = engine.licenseManager.getAdminOverview(body.adminPassword);
      overview.engineStatus = {
        connected: engine.rpcClient.connected,
        isRpcRunning: engine.isRpcRunning,
        pipeIndex: engine.rpcClient.pipeIndex,
        user: engine.rpcClient.user,
        identity: engine.store.getState().identity,
        hasUserToken: Boolean(engine.store.getState().discordAuth?.userToken),
        updater: autoUpdater.getStatus(),
      };
      sendJson(res, 200, overview);
      return;
    }

    if (pathname === '/api/admin/create-licenses' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.createLicenses(body.adminPassword, body);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/admin/bulk-extend' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.bulkExtendLicenses(body.adminPassword, body);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/admin/clear-audit-logs' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.clearAuditLogs(body.adminPassword);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/admin/modify-license' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.extendOrModifyLicense(body.adminPassword, body);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/admin/reset-license' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.resetLicense(body.adminPassword, body);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/admin/delete-license' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.deleteLicense(body.adminPassword, body);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/admin/manage-user' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = engine.licenseManager.manageUser(body.adminPassword, body);
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/discord-sync' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const syncResult = await engine.syncDiscordAccount(body.userToken);
      sendJson(res, 200, syncResult);
      return;
    }

    if (pathname === '/api/discord-apply-profile' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const applyResult = await engine.applyDiscordProfileFields(body);
      sendJson(res, 200, applyResult);
      return;
    }

    if (pathname === '/api/update-activity' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const p = body.payload || {};
      const profileFields = body.profileFields || {};
      const clientId = sanitizeClientId(body.clientId || p.clientId);

      if (body.resetTimer) {
        engine.sessionStartMs = Date.now();
      }

      // Apply profile fields (Status, Custom Status, Pronouns, Bio, Display Name, Server Tag)
      let profileApplyRes = null;
      if (Object.keys(profileFields).length > 0) {
        profileApplyRes = await engine.applyDiscordProfileFields(profileFields).catch(() => null);
      }

      if (p.clearOnly) {
        const clearRes = await engine.clearActivity();
        sendJson(res, 200, {
          ok: true,
          isRpcRunning: engine.isRpcRunning,
          connected: engine.rpcClient.connected,
          user: engine.rpcClient.user,
          identity: engine.store.getState().identity,
          profileApplyRes,
          result: clearRes,
        });
        return;
      }

      const pCur = Number(p.partyCurrent ?? 0);
      const pMax = Number(p.partyMax ?? 0);
      const tsMode = p.timestampMode === 'remaining' ? 'countdown' : p.timestampMode || 'elapsed';

      const activityConfig = {
        clientId,
        name: p.name || engine.store.getState().identity?.displayName || 'Reborn RPC',
        appName: p.name || engine.store.getState().identity?.displayName || 'Reborn RPC',
        type: Number(p.activityType ?? 0),
        platform: p.platform || 'desktop',
        streamUrl: p.streamUrl || '',
        details: p.details || '',
        state: p.state || '',
        timestampMode: tsMode,
        countdownSeconds: Number(p.customEndMinutes || 45) * 60,
        offsetHours: Number(p.offsetHours || 0),
        offsetMinutes: Number(p.offsetMinutes || 0),
        offsetSeconds: Number(p.offsetSeconds || 0),
        unlimitedHours: Number(p.unlimitedHours || 9999),
        customEndMinutes: Number(p.customEndMinutes || 45),
        largeImageKey: p.largeImageKey || '',
        largeImageText: p.largeImageText || '',
        smallImageKey: p.smallImageKey || '',
        smallImageText: p.smallImageText || '',
        partyEnabled: pCur > 0 && pMax > 0,
        partyCurrent: pCur,
        partyMax: pMax,
        button1Enabled: Boolean(p.button1Label && p.button1Url),
        button1Label: p.button1Label || '',
        button1Url: p.button1Url || '',
        button2Enabled: Boolean(p.button2Label && p.button2Url),
        button2Label: p.button2Label || '',
        button2Url: p.button2Url || '',
        _sessionStartMs: engine.sessionStartMs,
        _appStartMs: engine.sysMonitor.appStartTime,
      };

      const vars = engine.getCombinedVariables();
      engine.isRpcRunning = true;
      const result = await engine.rpcClient.setActivity(activityConfig, vars);

      sendJson(res, 200, {
        ok: true,
        isRpcRunning: engine.isRpcRunning,
        connected: engine.rpcClient.connected,
        user: engine.rpcClient.user,
        pipeIndex: engine.rpcClient.pipeIndex,
        identity: engine.store.getState().identity,
        profileApplyRes,
        result,
      });
      return;
    }

    if (pathname === '/api/make-live' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = await engine.makeProfileLive(
        body.profile,
        Number(body.keyframeIndex || 0),
        Boolean(body.resetTimer)
      );
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/clear-activity' && req.method === 'POST') {
      const result = await engine.clearActivity();
      sendJson(res, 200, { ok: true, isRpcRunning: false, ...result });
      return;
    }

    if (pathname === '/api/connect' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const cid = sanitizeClientId(body.clientId || engine.rpcClient.clientId);
      const result = await engine.rpcClient.connect(cid);
      sendJson(res, 200, {
        ok: true,
        connected: engine.rpcClient.connected,
        user: engine.rpcClient.user,
        pipeIndex: engine.rpcClient.pipeIndex,
        identity: engine.store.getState().identity,
        ...result,
      });
      return;
    }

    if (pathname === '/api/disconnect' && req.method === 'POST') {
      const result = await engine.disconnect();
      sendJson(res, 200, result);
      return;
    }

    if (pathname === '/api/scan-processes' && req.method === 'GET') {
      const list = await engine.sysMonitor.scanProcesses();
      sendJson(res, 200, { ok: true, processes: list.slice(0, 80) });
      return;
    }

    if ((pathname === '/api/fetch-discord-app' || pathname === '/api/fetch-app-info') && req.method === 'POST') {
      const body = await readJsonBody(req);
      const result = await engine.sysMonitor.fetchDiscordAppInfo(sanitizeClientId(body.clientId));
      sendJson(res, 200, result);
      return;
    }

    if ((pathname === '/api/save-config' || pathname === '/api/save-state') && req.method === 'POST') {
      const body = await readJsonBody(req);
      const payload = body.config || body;
      const updated = engine.store.updateState(payload);
      engine.setupBackgroundTimers();
      sendJson(res, 200, { ok: true, state: updated });
      return;
    }

    if (pathname === '/api/reset-defaults' && req.method === 'POST') {
      const fresh = engine.store.resetToDefaults();
      engine.setupBackgroundTimers();
      sendJson(res, 200, { ok: true, config: fresh });
      return;
    }

    if (pathname === '/api/open-external' && req.method === 'POST') {
      const body = await readJsonBody(req);
      if (body.url && /^https?:\/\/.+/i.test(body.url)) {
        exec(`start "" "${body.url}"`);
      }
      sendJson(res, 200, { ok: true });
      return;
    }
  } catch (err) {
    sendJson(res, 400, { ok: false, error: err.message || '요청 처리 중 오류가 발생했습니다.' });
    return;
  }

  // Static Renderer Assets
  const safeFile = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.join(rendererDir, safeFile);

  if (filePath.startsWith(rendererDir) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function launchDesktopAppWindow(url) {
  const electronExe = path.join(__dirname, '../../node_modules/electron/dist/electron.exe');
  const projectRoot = path.join(__dirname, '../..');
  if (fs.existsSync(electronExe)) {
    exec(`"${electronExe}" "${projectRoot}"`);
    return;
  }

  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  const foundBrowser = chromePaths.find((p) => fs.existsSync(p));
  if (foundBrowser) {
    exec(`"${foundBrowser}" --app=${url} --window-size=1560,950`);
  } else {
    exec(`start "" "${url}"`);
  }
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const url = `http://127.0.0.1:${PORT}`;
    console.log(`Reborn RPC already running at ${url}, opening window...`);
    if (process.argv.includes('--launch')) {
      launchDesktopAppWindow(url);
    }
    process.exit(0);
  } else {
    console.error(err);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`Reborn RPC Engine listening at ${url}`);
  if (process.argv.includes('--launch')) {
    launchDesktopAppWindow(url);
  }
});
