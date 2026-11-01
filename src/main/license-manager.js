const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const { execSync } = require('child_process');

const ADMIN_PASSWORD = 'Mk2010047sxlvlrt!!';

function getSystemHwid() {
  try {
    let raw = `${os.hostname()}|${os.platform()}|${os.arch()}|${os.cpus()?.[0]?.model || 'CPU'}|${os.totalmem()}`;
    if (process.platform === 'win32') {
      try {
        const regOut = execSync(
          'reg query "HKLM\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid',
          { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 2000 }
        );
        const match = regOut.match(/MachineGuid\s+REG_SZ\s+([^\r\n]+)/i);
        if (match && match[1]) {
          raw += `|${match[1].trim()}`;
        }
      } catch {
        // Fallback to OS hardware fingerprint
      }
    }
    const hash = crypto.createHash('sha256').update(raw).digest('hex').toUpperCase();
    return `HWID-${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}`;
  } catch {
    return 'HWID-DEFAULT-0001';
  }
}

function hashPassword(password, salt = 'reborn_rpc_salt_v1') {
  return crypto
    .createHmac('sha256', salt)
    .update(String(password || ''))
    .digest('hex');
}

function generateRandomKey(prefix = 'REBORN') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = (len) => {
    let out = '';
    const bytes = crypto.randomBytes(len);
    for (let i = 0; i < len; i++) {
      out += chars[bytes[i] % chars.length];
    }
    return out;
  };
  const cleanPrefix = String(prefix || 'REBORN')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '') || 'REBORN';
  return `${cleanPrefix}-${seg(4)}-${seg(4)}-${seg(4)}`;
}

function formatDurationKorean(ms, isLifetime = false) {
  if (isLifetime) return '영구제 (무제한)';
  const totalSec = Math.max(0, Math.floor(Number(ms || 0) / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const parts = [];
  if (days > 0) parts.push(`${days}일`);
  if (hours > 0) parts.push(`${hours}시간`);
  if (days === 0 && hours === 0 && mins > 0) parts.push(`${mins}분`);
  return parts.length > 0 ? parts.join(' ') : '0분';
}

class LicenseManager {
  constructor(storageDir) {
    this.storageDir = storageDir || path.join(process.cwd(), 'data');
    this.filePath = path.join(this.storageDir, 'reborn-licenses-v1.json');
    this.currentHwid = getSystemHwid();
    this.data = this.load();
  }

  getDefaultData() {
    return {
      licenses: [],
      users: [],
      activeSession: null,
      auditLogs: [],
    };
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        const parsed = JSON.parse(raw);
        return {
          licenses: Array.isArray(parsed.licenses) ? parsed.licenses : [],
          users: Array.isArray(parsed.users) ? parsed.users : [],
          activeSession: parsed.activeSession || null,
          auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : [],
        };
      }
    } catch {
      // Fallback to default
    }
    const def = this.getDefaultData();
    this.save(def);
    return def;
  }

  appendAuditLog(action, detail) {
    if (!Array.isArray(this.data.auditLogs)) {
      this.data.auditLogs = [];
    }
    this.data.auditLogs.unshift({
      id: 'aud-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
      time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
      timestamp: Date.now(),
      action,
      detail,
    });
    if (this.data.auditLogs.length > 100) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 100);
    }
  }

  save(nextData = this.data) {
    this.data = nextData;
    try {
      if (!fs.existsSync(this.storageDir)) {
        fs.mkdirSync(this.storageDir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to save license store:', err);
    }
    return this.data;
  }

  verifyAdminPassword(password) {
    return String(password || '') === ADMIN_PASSWORD;
  }

  refreshStates() {
    const now = Date.now();
    let changed = false;

    for (const lic of this.data.licenses) {
      if (!Array.isArray(lic.boundUsers)) {
        lic.boundUsers = [];
        changed = true;
      }
      if (lic.status === 'suspended') continue;

      if (lic.isLifetime) {
        const nextSt = lic.boundUsers.length > 0 || lic.activatedAt ? 'active' : 'unused';
        if (lic.status !== nextSt) {
          lic.status = nextSt;
          changed = true;
        }
      } else if (lic.activatedAt && lic.expiresAt) {
        if (now >= lic.expiresAt) {
          if (lic.status !== 'expired') {
            lic.status = 'expired';
            changed = true;
          }
        } else {
          if (lic.status !== 'active') {
            lic.status = 'active';
            changed = true;
          }
        }
      } else {
        if (lic.status !== 'unused') {
          lic.status = 'unused';
          changed = true;
        }
      }
    }

    if (changed) this.save();
  }

  serializeLicense(lic) {
    if (!lic) return null;
    const now = Date.now();
    let remainingMs = null;
    if (lic.isLifetime) {
      remainingMs = Infinity;
    } else if (lic.activatedAt && lic.expiresAt) {
      remainingMs = Math.max(0, lic.expiresAt - now);
    } else {
      remainingMs = Number(lic.durationMs || 0);
    }

    return {
      id: lic.id,
      key: lic.key,
      isLifetime: Boolean(lic.isLifetime),
      durationMs: Number(lic.durationMs || 0),
      durationLabel: formatDurationKorean(lic.durationMs, lic.isLifetime),
      remainingMs: lic.isLifetime ? -1 : remainingMs,
      remainingLabel: lic.isLifetime
        ? '영구제 (무제한)'
        : lic.activatedAt
        ? remainingMs > 0
          ? `${formatDurationKorean(remainingMs)} 남음`
          : '만료됨'
        : `미사용 (${formatDurationKorean(lic.durationMs)})`,
      remainingText: lic.isLifetime
        ? '영구제 (무제한)'
        : lic.activatedAt
        ? remainingMs > 0
          ? `${formatDurationKorean(remainingMs)} 남음`
          : '만료됨'
        : `미사용 (${formatDurationKorean(lic.durationMs)})`,
      status: lic.status || 'unused',
      effectiveStatus: lic.status || 'unused',
      maxUsers: Number(lic.maxUsers ?? 1),
      boundUsers: Array.isArray(lic.boundUsers) ? lic.boundUsers : [],
      boundHwid: lic.boundHwid || null,
      note: lic.note || '',
      createdAt: lic.createdAt,
      activatedAt: lic.activatedAt || null,
      expiresAt: lic.expiresAt || null,
    };
  }

  getSessionStatus() {
    this.refreshStates();
    const sess = this.data.activeSession;
    if (!sess || !sess.username) {
      return { authenticated: false, user: null, license: null, currentHwid: this.currentHwid };
    }

    const user = this.data.users.find(
      (u) => u.username.toLowerCase() === String(sess.username).toLowerCase()
    );
    if (!user || user.suspended) {
      this.data.activeSession = null;
      this.save();
      return {
        authenticated: false,
        currentHwid: this.currentHwid,
        reason: user?.suspended ? '정지된 계정입니다.' : '계정을 찾을 수 없습니다.',
      };
    }

    // Strict HWID check on active session
    if (user.boundHwid && user.boundHwid !== this.currentHwid) {
      this.data.activeSession = null;
      this.save();
      return {
        authenticated: false,
        currentHwid: this.currentHwid,
        reason: `HWID 기기 인증 불일치: 등록된 PC(${user.boundHwid})가 아닙니다. 관리자 패널에서 HWID 초기화를 진행해 주세요.`,
      };
    }

    const lic = this.data.licenses.find((l) => l.key === user.licenseKey);
    if (!lic) {
      this.data.activeSession = null;
      this.save();
      return { authenticated: false, currentHwid: this.currentHwid, reason: '연결된 라이센스가 삭제되었거나 존재하지 않습니다.' };
    }

    if (lic.boundHwid && lic.boundHwid !== this.currentHwid && Number(lic.maxUsers ?? 1) <= 1) {
      this.data.activeSession = null;
      this.save();
      return {
        authenticated: false,
        currentHwid: this.currentHwid,
        reason: `라이센스 HWID 불일치: 다른 PC(${lic.boundHwid})에 귀속된 라이센스입니다.`,
      };
    }

    if (lic.status === 'suspended') {
      this.data.activeSession = null;
      this.save();
      return { authenticated: false, currentHwid: this.currentHwid, reason: '관리자에 의해 일시정지된 라이센스입니다.' };
    }

    if (!lic.isLifetime && lic.expiresAt && Date.now() >= lic.expiresAt) {
      lic.status = 'expired';
      this.data.activeSession = null;
      this.save();
      return { authenticated: false, currentHwid: this.currentHwid, reason: '라이센스 유효 기간이 만료되었습니다.' };
    }

    return {
      authenticated: true,
      currentHwid: this.currentHwid,
      user: {
        id: user.id,
        username: user.username,
        licenseKey: user.licenseKey,
        boundHwid: user.boundHwid || this.currentHwid,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
      license: this.serializeLicense(lic),
    };
  }

  registerUser({ username, password, licenseKey }) {
    this.refreshStates();
    const cleanUser = String(username || '').trim();
    const cleanPass = String(password || '');
    const cleanKey = String(licenseKey || '').trim().toUpperCase();

    if (!cleanUser || cleanUser.length < 2) {
      throw new Error('아이디는 최소 2자 이상 입력해 주세요.');
    }
    if (!cleanPass || cleanPass.length < 4) {
      throw new Error('비밀번호는 최소 4자 이상 입력해 주세요.');
    }
    if (!cleanKey) {
      throw new Error('유효한 라이센스 키를 입력해 주세요.');
    }

    const exists = this.data.users.find(
      (u) => u.username.toLowerCase() === cleanUser.toLowerCase()
    );
    if (exists) {
      throw new Error('이미 사용 중인 아이디입니다.');
    }

    const lic = this.data.licenses.find((l) => l.key.toUpperCase() === cleanKey);
    if (!lic) {
      throw new Error('존재하지 않는 라이센스 키입니다. 오타가 없는지 확인해 주세요.');
    }
    if (lic.status === 'suspended') {
      throw new Error('관리자에 의해 사용 제한(정지)된 라이센스 키입니다.');
    }
    if (lic.status === 'expired' || (!lic.isLifetime && lic.expiresAt && Date.now() >= lic.expiresAt)) {
      throw new Error('유효 기간이 만료된 라이센스 키입니다.');
    }

    const maxUsers = Number(lic.maxUsers ?? 1);
    if (lic.boundHwid && lic.boundHwid !== this.currentHwid && maxUsers <= 1) {
      throw new Error(`해당 라이센스는 이미 다른 PC(${lic.boundHwid})에 HWID 귀속되어 있습니다.`);
    }
    if (maxUsers > 0 && lic.boundUsers.length >= maxUsers && !lic.boundUsers.includes(cleanUser)) {
      throw new Error(`해당 라이센스의 최대 등록 인원(${maxUsers}명)을 초과했습니다.`);
    }

    const now = Date.now();
    if (!lic.activatedAt) {
      lic.activatedAt = now;
      lic.expiresAt = lic.isLifetime ? null : now + Number(lic.durationMs || 0);
    }
    lic.status = 'active';
    if (!lic.boundHwid) {
      lic.boundHwid = this.currentHwid;
    }
    if (!lic.boundUsers.includes(cleanUser)) {
      lic.boundUsers.push(cleanUser);
    }

    const newUser = {
      id: 'usr-' + now + '-' + Math.random().toString(36).slice(2, 6),
      username: cleanUser,
      passwordHash: hashPassword(cleanPass),
      licenseKey: lic.key,
      boundHwid: this.currentHwid,
      suspended: false,
      createdAt: now,
      lastLoginAt: now,
    };

    this.data.users.push(newUser);
    this.data.activeSession = {
      username: newUser.username,
      licenseKey: lic.key,
      hwid: this.currentHwid,
      loginAt: now,
    };
    this.save();

    return this.getSessionStatus();
  }

  loginUser({ username, password, licenseKeyOptional, newLicenseKey }) {
    this.refreshStates();
    const cleanUser = String(username || '').trim();
    const cleanPass = String(password || '');
    const optionalKey = String(newLicenseKey || licenseKeyOptional || '').trim().toUpperCase();

    if (!cleanUser || !cleanPass) {
      throw new Error('아이디와 비밀번호를 모두 입력해 주세요.');
    }

    const user = this.data.users.find(
      (u) => u.username.toLowerCase() === cleanUser.toLowerCase()
    );
    if (!user) {
      throw new Error('존재하지 않는 아이디입니다. 먼저 회원가입을 진행해 주세요.');
    }
    if (user.passwordHash !== hashPassword(cleanPass)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    if (user.suspended) {
      throw new Error('관리자에 의해 정지된 계정입니다.');
    }

    // Strict HWID Verification on Login
    if (!user.boundHwid) {
      user.boundHwid = this.currentHwid;
    } else if (user.boundHwid !== this.currentHwid) {
      throw new Error(
        `HWID 기기 불일치! 등록된 기기(${user.boundHwid})와 현재 PC(${this.currentHwid})가 다릅니다. 관리자 패널에서 HWID 초기화를 진행해 주세요.`
      );
    }

    // If user supplied a new license key during login (e.g. to renew an expired license)
    if (optionalKey && optionalKey !== user.licenseKey.toUpperCase()) {
      this.bindNewLicenseToUser(user, optionalKey);
    }

    const lic = this.data.licenses.find((l) => l.key === user.licenseKey);
    if (!lic) {
      throw new Error('계정에 연결된 라이센스가 삭제되었습니다. 새 라이센스 키를 등록해 주세요.');
    }
    if (!lic.boundHwid) {
      lic.boundHwid = this.currentHwid;
    } else if (lic.boundHwid !== this.currentHwid && Number(lic.maxUsers ?? 1) <= 1) {
      throw new Error(
        `라이센스 HWID 불일치! 이 라이센스는 다른 기기(${lic.boundHwid})에 귀속되어 있습니다.`
      );
    }
    if (lic.status === 'suspended') {
      throw new Error('해당 라이센스는 관리자에 의해 정지되었습니다.');
    }
    if (!lic.isLifetime && lic.expiresAt && Date.now() >= lic.expiresAt) {
      lic.status = 'expired';
      this.save();
      throw new Error('라이센스 기간이 만료되었습니다. 새 라이센스를 입력하거나 관리자에게 연장을 요청하세요.');
    }

    user.lastLoginAt = Date.now();
    this.data.activeSession = {
      username: user.username,
      licenseKey: lic.key,
      hwid: this.currentHwid,
      loginAt: Date.now(),
    };
    this.save();

    return this.getSessionStatus();
  }

  bindNewLicenseToUser(user, newKeyClean) {
    const lic = this.data.licenses.find((l) => l.key.toUpperCase() === newKeyClean);
    if (!lic) {
      throw new Error('입력한 새 라이센스 키가 존재하지 않습니다.');
    }
    if (lic.status === 'suspended') {
      throw new Error('정지된 라이센스 키입니다.');
    }
    if (lic.status === 'expired' || (!lic.isLifetime && lic.expiresAt && Date.now() >= lic.expiresAt)) {
      throw new Error('이미 만료된 라이센스 키입니다.');
    }
    const maxUsers = Number(lic.maxUsers ?? 1);
    if (
      maxUsers > 0 &&
      lic.boundUsers.length >= maxUsers &&
      !lic.boundUsers.includes(user.username)
    ) {
      throw new Error(`해당 라이센스의 최대 등록 가능 인원(${maxUsers}명)이 초과되었습니다.`);
    }

    const now = Date.now();
    if (!lic.activatedAt) {
      lic.activatedAt = now;
      lic.expiresAt = lic.isLifetime ? null : now + Number(lic.durationMs || 0);
    }
    lic.status = 'active';
    if (!lic.boundUsers.includes(user.username)) {
      lic.boundUsers.push(user.username);
    }
    user.licenseKey = lic.key;
    this.save();
  }

  logoutUser() {
    this.data.activeSession = null;
    this.save();
    return { ok: true };
  }

  /* ==========================================================================
     ADMIN PANEL METHODS (Requires Admin Password)
     ========================================================================== */
  getAdminOverview(adminPassword) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 비밀번호가 올바르지 않습니다.');
    }
    this.refreshStates();

    const licenses = this.data.licenses.map((l) => this.serializeLicense(l));
    const users = this.data.users.map((u) => {
      const lic = this.data.licenses.find((l) => l.key === u.licenseKey);
      const serLic = lic ? this.serializeLicense(lic) : null;
      return {
        id: u.id,
        username: u.username,
        licenseKey: u.licenseKey,
        boundHwid: u.boundHwid || lic?.boundHwid || null,
        licenseStatus: lic ? lic.status : 'missing',
        remainingLabel: serLic ? serLic.remainingLabel : '라이센스 없음',
        remainingText: serLic ? serLic.remainingLabel : '라이센스 없음',
        suspended: Boolean(u.suspended),
        createdAt: u.createdAt,
        lastLoginAt: u.lastLoginAt,
      };
    });

    const stats = {
      totalLicenses: licenses.length,
      activeLicenses: licenses.filter((l) => l.status === 'active').length,
      unusedLicenses: licenses.filter((l) => l.status === 'unused').length,
      expiredLicenses: licenses.filter((l) => l.status === 'expired').length,
      suspendedLicenses: licenses.filter((l) => l.status === 'suspended').length,
      lifetimeLicenses: licenses.filter((l) => l.isLifetime).length,
      totalUsers: users.length,
      activeUsers: users.filter((u) => !u.suspended && u.licenseStatus === 'active').length,
      currentHwid: this.currentHwid,
    };

    return {
      ok: true,
      currentHwid: this.currentHwid,
      stats,
      licenses,
      users,
      auditLogs: Array.isArray(this.data.auditLogs) ? this.data.auditLogs : [],
    };
  }

  createLicenses(adminPassword, opts = {}) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }

    const count = Math.max(1, Math.min(50, Number(opts.count || 1)));
    const isLifetime = Boolean(opts.isLifetime);
    const days = Math.max(0, Number(opts.durationDays ?? 30));
    const hours = Math.max(0, Number(opts.durationHours ?? 0));
    const minutes = Math.max(0, Number(opts.durationMinutes ?? 0));
    const durationMs = isLifetime
      ? 0
      : Math.max(60 * 1000, days * 86400000 + hours * 3600000 + minutes * 60000);

    const maxUsers = Math.max(0, Number(opts.maxUsers ?? 1));
    const prefix = String(opts.prefix || 'REBORN').trim() || 'REBORN';
    const note = String(opts.note || '').trim();
    const customKey = String(opts.customKey || '').trim().toUpperCase();

    const created = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      let keyStr = count === 1 && customKey ? customKey : generateRandomKey(prefix);
      while (this.data.licenses.some((l) => l.key.toUpperCase() === keyStr.toUpperCase())) {
        keyStr = generateRandomKey(prefix);
      }

      const lic = {
        id: 'lic-' + now + '-' + i + '-' + Math.random().toString(36).slice(2, 6),
        key: keyStr,
        isLifetime,
        durationMs,
        status: 'unused',
        maxUsers,
        boundUsers: [],
        boundHwid: null,
        note,
        createdAt: now,
        activatedAt: null,
        expiresAt: null,
      };
      this.data.licenses.unshift(lic);
      created.push(this.serializeLicense(lic));
    }

    this.appendAuditLog(
      '라이센스 발급',
      `${created.length}개 발급 (${formatDurationKorean(durationMs, isLifetime)}, 최대 ${maxUsers === 0 ? '무제한' : maxUsers + '명'})`
    );
    this.save();
    return {
      ok: true,
      created,
      overview: this.getAdminOverview(adminPassword),
    };
  }

  bulkExtendLicenses(adminPassword, payload = {}) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }
    const addDays = Number(payload.addDays || 0);
    const addHours = Number(payload.addHours || 0);
    const deltaMs = addDays * 86400000 + addHours * 3600000;
    const targetScope = payload.scope || 'all_non_lifetime'; // 'active_only' | 'all_non_lifetime'

    if (deltaMs === 0) {
      throw new Error('연장할 일수 또는 시간을 선택해 주세요.');
    }

    let affected = 0;
    const now = Date.now();
    for (const lic of this.data.licenses) {
      if (lic.isLifetime) continue;
      if (targetScope === 'active_only' && lic.status !== 'active') continue;
      lic.durationMs = Math.max(60000, Number(lic.durationMs || 0) + deltaMs);
      if (lic.activatedAt) {
        const baseTime = Math.max(now, Number(lic.expiresAt || now));
        lic.expiresAt = baseTime + deltaMs;
        if (lic.expiresAt > now && lic.status === 'expired') {
          lic.status = 'active';
        }
      }
      affected++;
    }

    this.appendAuditLog(
      '전체 라이센스 일괄 연장',
      `${affected}개 라이센스 ${addDays ? `+${addDays}일 ` : ''}${addHours ? `+${addHours}시간` : ''} 연장 완료`
    );
    this.refreshStates();
    this.save();
    return {
      ok: true,
      affected,
      overview: this.getAdminOverview(adminPassword),
    };
  }

  extendOrModifyLicense(adminPassword, payload = {}) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }

    const targetKeyOrId = payload.key || payload.id;
    const lic = this.data.licenses.find((l) => l.id === targetKeyOrId || l.key === targetKeyOrId);
    if (!lic) throw new Error('대상 라이센스를 찾을 수 없습니다.');

    const action = payload.action || '';
    if (action === 'set_lifetime' || payload.setLifetime === true) {
      lic.isLifetime = true;
      lic.expiresAt = null;
      if (lic.status === 'expired') lic.status = lic.boundUsers.length > 0 ? 'active' : 'unused';
      this.appendAuditLog('영구제 전환', `${lic.key} → 영구제(무제한) 전환`);
    } else if (action === 'set_duration') {
      const d = Math.max(0, Number(payload.durationDays ?? 0));
      const h = Math.max(0, Number(payload.durationHours ?? 0));
      lic.isLifetime = Boolean(payload.isLifetime || (d === 0 && h === 0));
      if (lic.isLifetime) {
        lic.expiresAt = null;
      } else {
        lic.durationMs = Math.max(60000, d * 86400000 + h * 3600000);
        if (lic.activatedAt) {
          lic.expiresAt = Date.now() + lic.durationMs;
          lic.status = 'active';
        }
      }
      this.appendAuditLog('기간 재설정', `${lic.key} 기간 재설정 (${d}일 ${h}시간)`);
    } else if (action === 'reset_hwid') {
      lic.boundHwid = null;
      this.data.users.forEach((u) => {
        if (u.licenseKey === lic.key) u.boundHwid = null;
      });
      this.appendAuditLog('HWID 초기화', `${lic.key} 귀속 HWID 잠금 해제`);
    } else if (action === 'bind_current_hwid') {
      lic.boundHwid = this.currentHwid;
      this.data.users.forEach((u) => {
        if (u.licenseKey === lic.key) u.boundHwid = this.currentHwid;
      });
      this.appendAuditLog('현재 PC HWID 귀속', `${lic.key} → ${this.currentHwid}`);
    } else if (action === 'suspend') {
      lic.status = 'suspended';
      this.appendAuditLog('라이센스 정지', `${lic.key} 일시정지 처리`);
    } else if (action === 'activate') {
      lic.status = lic.boundUsers.length > 0 ? 'active' : 'unused';
      this.appendAuditLog('라이센스 정지 해제', `${lic.key} 활성화 복구`);
    }

    const deltaMs = Number(payload.addDays || 0) * 86400000 + Number(payload.addHours || 0) * 3600000;
    if (deltaMs !== 0 && !lic.isLifetime) {
      lic.durationMs = Math.max(60000, Number(lic.durationMs || 0) + deltaMs);
      if (lic.activatedAt) {
        const baseTime = Math.max(Date.now(), Number(lic.expiresAt || Date.now()));
        lic.expiresAt = baseTime + deltaMs;
        if (lic.expiresAt > Date.now() && lic.status === 'expired') {
          lic.status = 'active';
        }
      }
      this.appendAuditLog(
        '라이센스 기간 조정',
        `${lic.key} (${payload.addDays ? `${payload.addDays > 0 ? '+' : ''}${payload.addDays}일 ` : ''}${payload.addHours ? `${payload.addHours > 0 ? '+' : ''}${payload.addHours}시간` : ''})`
      );
    }

    if (payload.maxUsers !== null && payload.maxUsers !== undefined) {
      lic.maxUsers = Math.max(0, Number(payload.maxUsers));
      this.appendAuditLog('인원 제한 변경', `${lic.key} 최대 인원 → ${lic.maxUsers === 0 ? '무제한' : lic.maxUsers + '명'}`);
    }
    if (payload.note !== null && payload.note !== undefined) {
      lic.note = String(payload.note).trim();
    }
    if (payload.status && ['active', 'unused', 'suspended', 'expired'].includes(payload.status)) {
      lic.status = payload.status;
    }

    this.refreshStates();
    this.save();
    return {
      ok: true,
      license: this.serializeLicense(lic),
      overview: this.getAdminOverview(adminPassword),
    };
  }

  resetLicense(adminPassword, payload = {}) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }
    const target = typeof payload === 'string' ? payload : payload.key || payload.id;
    const lic = this.data.licenses.find((l) => l.id === target || l.key === target);
    if (!lic) throw new Error('라이센스를 찾을 수 없습니다.');

    this.data.users.forEach((u) => {
      if (u.licenseKey === lic.key) u.boundHwid = null;
    });
    lic.boundUsers = [];
    lic.boundHwid = null;
    lic.activatedAt = null;
    lic.expiresAt = null;
    lic.status = 'unused';

    this.appendAuditLog('라이센스 전체 초기화', `${lic.key} 미사용 상태로 초기화 완료`);
    this.save();
    return {
      ok: true,
      overview: this.getAdminOverview(adminPassword),
    };
  }

  deleteLicense(adminPassword, payload = {}) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }
    const target = typeof payload === 'string' ? payload : payload.key || payload.id;
    const mode = payload.mode || (target === 'EXPIRED_ONLY' ? 'expired' : target === 'ALL' ? 'all' : 'single');

    if (mode === 'expired') {
      this.refreshStates();
      const before = this.data.licenses.length;
      this.data.licenses = this.data.licenses.filter((l) => l.status !== 'expired');
      this.appendAuditLog('만료 라이센스 정리', `${before - this.data.licenses.length}개 만료 라이센스 삭제`);
    } else if (mode === 'all') {
      const count = this.data.licenses.length;
      this.data.licenses = [];
      this.data.activeSession = null;
      this.appendAuditLog('전체 라이센스 초기화', `총 ${count}개 라이센스 전체 삭제`);
    } else {
      this.data.licenses = this.data.licenses.filter((l) => l.id !== target && l.key !== target);
      this.appendAuditLog('라이센스 삭제', `${target} 영구 삭제`);
    }

    this.save();
    return {
      ok: true,
      overview: this.getAdminOverview(adminPassword),
    };
  }

  manageUser(adminPassword, { userId, action, newPassword, newLicenseKey, addDays, addHours }) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }

    const idx = this.data.users.findIndex((u) => u.id === userId || u.username === userId);
    if (idx === -1) throw new Error('사용자를 찾을 수 없습니다.');
    const user = this.data.users[idx];

    if (action === 'delete') {
      this.data.licenses.forEach((l) => {
        if (Array.isArray(l.boundUsers)) {
          l.boundUsers = l.boundUsers.filter((uname) => uname !== user.username);
        }
      });
      if (this.data.activeSession?.username === user.username) {
        this.data.activeSession = null;
      }
      this.data.users.splice(idx, 1);
      this.appendAuditLog('회원 삭제', `@${user.username} 계정 영구 삭제`);
    } else if (action === 'toggle_suspend') {
      user.suspended = !user.suspended;
      if (user.suspended && this.data.activeSession?.username === user.username) {
        this.data.activeSession = null;
      }
      this.appendAuditLog('회원 상태 변경', `@${user.username} → ${user.suspended ? '정지됨' : '정상 활성'}`);
    } else if (action === 'reset_hwid') {
      user.boundHwid = null;
      const lic = this.data.licenses.find((l) => l.key === user.licenseKey);
      if (lic) lic.boundHwid = null;
      this.appendAuditLog('회원 HWID 초기화', `@${user.username} 기기 귀속 초기화`);
    } else if (action === 'bind_current_hwid') {
      user.boundHwid = this.currentHwid;
      const lic = this.data.licenses.find((l) => l.key === user.licenseKey);
      if (lic) lic.boundHwid = this.currentHwid;
      this.appendAuditLog('회원 현재 PC HWID 고정', `@${user.username} → ${this.currentHwid}`);
    } else if (action === 'extend_user_license') {
      const lic = this.data.licenses.find((l) => l.key === user.licenseKey);
      if (!lic) throw new Error('해당 회원에게 연결된 라이센스가 없습니다.');
      if (!lic.isLifetime) {
        const deltaMs = Number(addDays || 0) * 86400000 + Number(addHours || 0) * 3600000;
        lic.durationMs = Math.max(60000, Number(lic.durationMs || 0) + deltaMs);
        if (lic.activatedAt) {
          const baseTime = Math.max(Date.now(), Number(lic.expiresAt || Date.now()));
          lic.expiresAt = baseTime + deltaMs;
          if (lic.expiresAt > Date.now() && lic.status === 'expired') {
            lic.status = 'active';
          }
        }
        this.appendAuditLog('회원 기간 연장', `@${user.username} (${lic.key}) +${addDays || 0}일 연장`);
      }
    } else if (action === 'reset_password') {
      if (!newPassword || String(newPassword).length < 4) {
        throw new Error('새 비밀번호는 4자 이상이어야 합니다.');
      }
      user.passwordHash = hashPassword(newPassword);
      this.appendAuditLog('회원 비밀번호 변경', `@${user.username} 비밀번호 재설정`);
    } else if (action === 'change_license' || action === 'bind_license') {
      this.bindNewLicenseToUser(user, String(newLicenseKey || '').trim().toUpperCase());
      this.appendAuditLog('회원 라이센스 교체', `@${user.username} → ${newLicenseKey}`);
    }

    this.refreshStates();
    this.save();
    return {
      ok: true,
      overview: this.getAdminOverview(adminPassword),
    };
  }

  clearAuditLogs(adminPassword) {
    if (!this.verifyAdminPassword(adminPassword)) {
      throw new Error('관리자 권한이 없습니다.');
    }
    this.data.auditLogs = [];
    this.save();
    return {
      ok: true,
      overview: this.getAdminOverview(adminPassword),
    };
  }
}

module.exports = {
  LicenseManager,
  ADMIN_PASSWORD,
};
