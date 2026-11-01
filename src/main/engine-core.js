const path = require('path');
const https = require('https');
const EventEmitter = require('events');
const { DiscordIPCClient } = require('./discord-ipc');
const { SystemMonitor } = require('./system-monitor');
const { ConfigStore, VALID_DEFAULT_CLIENT_ID, sanitizeClientId } = require('./store');
const { LicenseManager } = require('./license-manager');

function httpsJsonRequest(hostname, reqPath, method = 'GET', headers = {}, bodyObj = null, timeoutMs = 6500) {
  return new Promise((resolve, reject) => {
    const payloadStr = bodyObj !== null ? JSON.stringify(bodyObj) : null;
    const reqHeaders = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9168 Chrome/128.0.6613.186 Electron/32.2.2 Safari/537.36',
      Accept: 'application/json',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
      ...headers,
    };
    if (payloadStr !== null) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(payloadStr, 'utf8');
    }

    const req = https.request(
      {
        hostname,
        port: 443,
        path: reqPath,
        method,
        headers: reqHeaders,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let parsed = {};
          try {
            parsed = raw ? JSON.parse(raw) : {};
          } catch {
            parsed = { raw };
          }
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(
              new Error(
                parsed?.message || `API 응답 오류 (HTTP ${res.statusCode})`
              )
            );
          }
        });
      }
    );

    req.on('error', (err) => reject(err));
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error('API 요청 시간 초과'));
    });

    if (payloadStr !== null) {
      req.write(payloadStr);
    }
    req.end();
  });
}

function discordApiRequest(method, apiPath, token, bodyObj = null) {
  const cleanToken = String(token || '').trim().replace(/^Bearer\s+/i, '');
  if (!cleanToken) {
    return Promise.reject(new Error('Discord 인증 토큰이 설정되지 않았습니다.'));
  }
  return httpsJsonRequest(
    'discord.com',
    `/api/v9${apiPath}`,
    method,
    { Authorization: cleanToken },
    bodyObj,
    7000
  );
}

function fetchPublicDiscordProfile(userId) {
  if (!userId || !/^\d{15,22}$/.test(String(userId).trim())) {
    return Promise.resolve(null);
  }
  return httpsJsonRequest(
    'japi.rest',
    `/discord/v1/user/${encodeURIComponent(String(userId).trim())}`,
    'GET',
    {},
    null,
    4500
  )
    .then((res) => (res && res.data ? res.data : null))
    .catch(() => null);
}

function buildDiscordAvatarUrl(user) {
  if (!user || !user.id) return '';
  if (user.avatar) {
    const ext = String(user.avatar).startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
  }
  return '';
}

function buildDiscordBannerUrl(user) {
  if (!user || !user.id || !user.banner) return '';
  const ext = String(user.banner).startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=600`;
}

function buildClanBadgeUrl(guildId, badgeHash) {
  if (!guildId || !badgeHash) return '';
  return `https://cdn.discordapp.com/clan-badges/${guildId}/${badgeHash}.png?size=32`;
}

function extractRealDiscordBadges(user, profileBadges = []) {
  const badgesList = [];
  const seenIds = new Set();

  if (Array.isArray(profileBadges) && profileBadges.length > 0) {
    profileBadges.forEach((b) => {
      if (!b || !b.id) return;
      const id = String(b.id);
      if (seenIds.has(id)) return;
      seenIds.add(id);
      badgesList.push({
        id,
        label: b.description || id,
        iconUrl: b.icon ? `https://cdn.discordapp.com/badge-icons/${b.icon}.png` : '',
      });
    });
  }

  if (badgesList.length === 0 && user) {
    const flags = Number(user.public_flags ?? user.flags ?? 0);
    const premType = Number(user.premium_type ?? 0);
    const addFlagBadge = (id, label, iconHash) => {
      if (seenIds.has(id)) return;
      seenIds.add(id);
      badgesList.push({
        id,
        label,
        iconUrl: `https://cdn.discordapp.com/badge-icons/${iconHash}.png`,
      });
    };
    if (premType > 0) addFlagBadge('premium', 'Discord Nitro', '2ba85e8026a8614b640c2837bcdfe21b');
    if (flags & (1 << 6)) addFlagBadge('hypesquad_house_1', 'HypeSquad Bravery', '8a88d63823d8a71cd5e390baa45efa02');
    if (flags & (1 << 7)) addFlagBadge('hypesquad_house_2', 'HypeSquad Brilliance', '011940fd013da3f7fb926e4a1cd2e618');
    if (flags & (1 << 8)) addFlagBadge('hypesquad_house_3', 'HypeSquad Balance', '3aa41de486fa12454c3761e8e223442e');
    if (flags & (1 << 22)) addFlagBadge('active_developer', 'Active Developer', '6bdc42827a38498929a4920da12695d9');
    if (flags & (1 << 9)) addFlagBadge('early_supporter', 'Early Supporter', '7060786766c9c840eb3019e725d2b358');
  }

  return badgesList;
}

class RPCEngineCore extends EventEmitter {
  constructor(storageDir) {
    super();
    this.storageDir = storageDir || path.join(process.cwd(), 'data');
    this.store = new ConfigStore(this.storageDir);
    this.licenseManager = new LicenseManager(this.storageDir);
    this.rpcClient = new DiscordIPCClient();
    this.sysMonitor = new SystemMonitor();

    this.sessionStartMs = Date.now();
    this.isRpcRunning = false;
    this.liveProfileId = null;
    this.liveKeyframeIndex = 0;
    this.keyframeTimer = null;
    this.macroTimer = null;
    this.processTimer = null;

    // Clean up any legacy fake badges or fake tags on startup
    this.sanitizeStoredIdentity();

    this.rpcClient.on('status', (statusData) => {
      if (statusData && statusData.user) {
        this.syncIdentityFromIpcUser(statusData.user).catch(() => {});
      }
      this.emit('status', {
        ...statusData,
        isRpcRunning: this.isRpcRunning,
        identity: this.store.getState().identity,
      });
    });

    this.rpcClient.on('log', (logData) => {
      this.emit('log', { ...logData, timestamp: Date.now() });
    });

    this.setupBackgroundTimers();
    this.autoConnectAndBroadcast();
  }

  sanitizeStoredIdentity() {
    const st = this.store.getState();
    const id = { ...(st.identity || {}) };

    // Remove legacy fake string badges (e.g. ['flame', 'crown', 'diamond', 'bolt', ...])
    if (Array.isArray(id.badges)) {
      id.badges = id.badges.filter(
        (b) => b && typeof b === 'object' && b.id && b.iconUrl
      );
    } else {
      id.badges = [];
    }

    // Remove any manually-added fake server tags that lack a real Discord guildId
    if (Array.isArray(id.availableServerTags)) {
      id.availableServerTags = id.availableServerTags.filter(
        (t) => t && t.tag && t.guildId && /^\d{15,22}$/.test(String(t.guildId))
      );
    } else {
      id.availableServerTags = [];
    }

    id.avatarDecor = 'none';
    this.store.updateState({ identity: id });
  }

  mergeOwnedServerTag(list, tagObj) {
    const arr = Array.isArray(list) ? [...list] : [];
    if (!tagObj || !tagObj.tag) return arr;
    const cleanTag = String(tagObj.tag).trim();
    const cleanGuildId = String(tagObj.guildId || '').trim();
    if (!cleanTag || !cleanGuildId) return arr;

    const badgeHash = tagObj.badge || '';
    const badgeUrl = tagObj.badgeUrl || buildClanBadgeUrl(cleanGuildId, badgeHash);

    const existingIdx = arr.findIndex(
      (item) =>
        (item.guildId && item.guildId === cleanGuildId) ||
        String(item.tag).toUpperCase() === cleanTag.toUpperCase()
    );
    const normalized = {
      tag: cleanTag,
      guildId: cleanGuildId,
      guildName: tagObj.guildName || cleanTag,
      badge: badgeHash,
      badgeUrl: badgeUrl || '',
    };
    if (existingIdx !== -1) {
      arr[existingIdx] = {
        ...arr[existingIdx],
        ...normalized,
        badge: normalized.badge || arr[existingIdx].badge || '',
        badgeUrl: normalized.badgeUrl || arr[existingIdx].badgeUrl || '',
      };
    } else {
      arr.push(normalized);
    }
    return arr;
  }

  extractClanFromUserObject(userObj) {
    if (!userObj) return null;
    const clan = userObj.primary_guild || userObj.clan || null;
    if (!clan || !clan.tag || !clan.identity_guild_id) return null;
    const guildId = String(clan.identity_guild_id);
    const badge = String(clan.badge || '');
    return {
      tag: String(clan.tag).trim(),
      guildId,
      badge,
      badgeUrl: buildClanBadgeUrl(guildId, badge),
      enabled: clan.identity_enabled !== false,
    };
  }

  async syncIdentityFromIpcUser(user) {
    if (!user) return;
    const currentIdentity = { ...(this.store.getState().identity || {}) };
    const avatarUrl = buildDiscordAvatarUrl(user) || currentIdentity.avatarUrl || '';
    const displayName = user.global_name || user.username || currentIdentity.displayName || '';
    const username = user.username || currentIdentity.username || '';

    let availableServerTags = Array.isArray(currentIdentity.availableServerTags)
      ? [...currentIdentity.availableServerTags]
      : [];

    let serverTagText = currentIdentity.serverTagText || '';
    let serverTagGuildId = currentIdentity.serverTagGuildId || '';
    let serverTagBadge = currentIdentity.serverTagBadge || '';
    let serverTagBadgeUrl = currentIdentity.serverTagBadgeUrl || '';

    const ipcClan = this.extractClanFromUserObject(user);
    if (ipcClan) {
      if (ipcClan.enabled) {
        serverTagText = ipcClan.tag;
        serverTagGuildId = ipcClan.guildId;
        serverTagBadge = ipcClan.badge;
        serverTagBadgeUrl = ipcClan.badgeUrl;
      }
      availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
        tag: ipcClan.tag,
        guildId: ipcClan.guildId,
        guildName: ipcClan.tag,
        badge: ipcClan.badge,
        badgeUrl: ipcClan.badgeUrl,
      });
    }

    // Automatically query public Discord profile lookup for real Clan / Server Tag (e.g. 븐라인) & Banner
    const pubData = await fetchPublicDiscordProfile(user.id);
    if (pubData) {
      const pubClan = this.extractClanFromUserObject(pubData);
      if (pubClan) {
        if (pubClan.enabled) {
          serverTagText = pubClan.tag;
          serverTagGuildId = pubClan.guildId;
          serverTagBadge = pubClan.badge;
          serverTagBadgeUrl = pubClan.badgeUrl;
        }
        availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
          tag: pubClan.tag,
          guildId: pubClan.guildId,
          guildName: pubClan.tag,
          badge: pubClan.badge,
          badgeUrl: pubClan.badgeUrl,
        });
      } else if (pubData.clan === null && pubData.primary_guild === null && !this.store.getState().discordAuth?.userToken) {
        serverTagText = '';
        serverTagGuildId = '';
        serverTagBadge = '';
        serverTagBadgeUrl = '';
      }
      if (pubData.bannerURL) currentIdentity.bannerUrl = pubData.bannerURL;
      if (pubData.banner_color) currentIdentity.bannerColor = pubData.banner_color;
    }

    const realBadges = extractRealDiscordBadges(pubData || user);
    const badges =
      Array.isArray(currentIdentity.badges) && currentIdentity.badges.length > 0
        ? currentIdentity.badges
        : realBadges;

    const nextIdentity = {
      ...currentIdentity,
      id: user.id || currentIdentity.id || '',
      displayName,
      username,
      avatarUrl,
      serverTagText,
      serverTagGuildId,
      serverTagBadge,
      serverTagBadgeUrl,
      availableServerTags,
      badges,
    };

    this.store.updateState({ identity: nextIdentity });

    this.emit('status', {
      ...this.rpcClient.getStatus(),
      isRpcRunning: this.isRpcRunning,
      identity: nextIdentity,
    });
  }

  async autoConnectAndBroadcast() {
    try {
      await this.rpcClient.connect(VALID_DEFAULT_CLIENT_ID);
      const st = this.store.getState();
      if (st.discordAuth?.userToken) {
        await this.syncDiscordAccount(st.discordAuth.userToken).catch(() => {});
      } else if (this.rpcClient.user) {
        await this.syncIdentityFromIpcUser(this.rpcClient.user).catch(() => {});
      }
    } catch {
      // If IPC not yet connected, still sync public profile if ID is known
      const st = this.store.getState();
      if (st.identity?.id) {
        await this.syncIdentityFromIpcUser({
          id: st.identity.id,
          username: st.identity.username,
          global_name: st.identity.displayName,
        }).catch(() => {});
      }
    }
  }

  async syncDiscordAccount(optionalToken) {
    const state = this.store.getState();
    const tokenToUse =
      optionalToken !== undefined
        ? String(optionalToken).trim()
        : String(state.discordAuth?.userToken || '').trim();

    // 1. Connect/verify local Discord IPC
    try {
      await this.rpcClient.connect(this.rpcClient.clientId || VALID_DEFAULT_CLIENT_ID);
    } catch {
      // Continue
    }

    const currentIdentity = { ...(this.store.getState().identity || {}) };
    let availableServerTags = Array.isArray(currentIdentity.availableServerTags)
      ? currentIdentity.availableServerTags.filter((t) => t && t.tag && t.guildId)
      : [];

    if (this.rpcClient.user) {
      const u = this.rpcClient.user;
      currentIdentity.id = u.id || currentIdentity.id;
      currentIdentity.username = u.username || currentIdentity.username;
      currentIdentity.displayName = u.global_name || u.username || currentIdentity.displayName;
      const ipcAvatar = buildDiscordAvatarUrl(u);
      if (ipcAvatar) currentIdentity.avatarUrl = ipcAvatar;
    }

    // 2. Always query real-time public Discord profile for live Clan / Server Tag (`븐라인`) & Badge
    if (currentIdentity.id) {
      const pubData = await fetchPublicDiscordProfile(currentIdentity.id);
      if (pubData) {
        currentIdentity.username = pubData.username || currentIdentity.username;
        currentIdentity.displayName = pubData.global_name || pubData.username || currentIdentity.displayName;
        if (pubData.avatarURL) currentIdentity.avatarUrl = `${pubData.avatarURL}?size=256`;
        if (pubData.bannerURL) currentIdentity.bannerUrl = pubData.bannerURL;
        if (pubData.banner_color) currentIdentity.bannerColor = pubData.banner_color;

        const pubClan = this.extractClanFromUserObject(pubData);
        if (pubClan) {
          if (pubClan.enabled) {
            currentIdentity.serverTagText = pubClan.tag;
            currentIdentity.serverTagGuildId = pubClan.guildId;
            currentIdentity.serverTagBadge = pubClan.badge;
            currentIdentity.serverTagBadgeUrl = pubClan.badgeUrl;
          }
          availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
            tag: pubClan.tag,
            guildId: pubClan.guildId,
            guildName: pubClan.tag,
            badge: pubClan.badge,
            badgeUrl: pubClan.badgeUrl,
          });
        }
      }
    }

    let restSynced = false;
    let restError = null;

    // 3. If user provided their Discord Token, fetch full profile (Bio, Pronouns, Status, Real Badges & All Guild Server Tags)
    if (tokenToUse) {
      try {
        const me = await discordApiRequest('GET', '/users/@me', tokenToUse);
        if (me && me.id) {
          currentIdentity.id = me.id;
          currentIdentity.username = me.username || currentIdentity.username;
          currentIdentity.displayName = me.global_name || me.username || currentIdentity.displayName;
          const restAvatar = buildDiscordAvatarUrl(me);
          if (restAvatar) currentIdentity.avatarUrl = restAvatar;
          const restBanner = buildDiscordBannerUrl(me);
          if (restBanner) currentIdentity.bannerUrl = restBanner;
          if (me.banner_color) currentIdentity.bannerColor = me.banner_color;
          if (me.bio !== undefined) currentIdentity.bio = me.bio || '';
          if (me.pronouns !== undefined) currentIdentity.pronouns = me.pronouns || '';

          const meClan = this.extractClanFromUserObject(me);
          if (meClan) {
            if (meClan.enabled) {
              currentIdentity.serverTagText = meClan.tag;
              currentIdentity.serverTagGuildId = meClan.guildId;
              currentIdentity.serverTagBadge = meClan.badge;
              currentIdentity.serverTagBadgeUrl = meClan.badgeUrl;
            } else {
              currentIdentity.serverTagText = '';
            }
            availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
              tag: meClan.tag,
              guildId: meClan.guildId,
              guildName: meClan.tag,
              badge: meClan.badge,
              badgeUrl: meClan.badgeUrl,
            });
          }
        }

        // Fetch full user profile for real Discord Badges, Bio, Pronouns & Clan
        try {
          const profRes = await discordApiRequest(
            'GET',
            `/users/${encodeURIComponent(currentIdentity.id)}/profile?with_mutual_guilds=true`,
            tokenToUse
          );
          if (profRes?.user_profile) {
            if (profRes.user_profile.bio !== undefined) {
              currentIdentity.bio = profRes.user_profile.bio || '';
            }
            if (profRes.user_profile.pronouns !== undefined) {
              currentIdentity.pronouns = profRes.user_profile.pronouns || '';
            }
            if (profRes.user_profile.accent_color) {
              currentIdentity.bannerColor =
                '#' + Number(profRes.user_profile.accent_color).toString(16).padStart(6, '0');
            }
          }
          if (Array.isArray(profRes?.badges)) {
            currentIdentity.badges = extractRealDiscordBadges(profRes.user || me, profRes.badges);
          }
          const profClan = this.extractClanFromUserObject(profRes?.user || profRes);
          if (profClan) {
            availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
              tag: profClan.tag,
              guildId: profClan.guildId,
              guildName: profClan.tag,
              badge: profClan.badge,
              badgeUrl: profClan.badgeUrl,
            });
          }
        } catch {
          // Optional profile endpoint
        }

        // Discover ALL real Server Tags across the user's joined Discord servers
        try {
          const guildsRes = await discordApiRequest('GET', '/users/@me/guilds?with_counts=true', tokenToUse);
          if (Array.isArray(guildsRes)) {
            const candidateGuilds = [];
            for (const g of guildsRes) {
              const directTag = g.clan?.tag || g.profile?.tag || g.tag || null;
              const directBadge = g.clan?.badge || g.profile?.badge_hash || g.profile?.badge || '';
              if (directTag) {
                availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
                  tag: directTag,
                  guildId: g.id,
                  guildName: g.name || directTag,
                  badge: directBadge,
                  badgeUrl: buildClanBadgeUrl(g.id, directBadge),
                });
              } else if (
                Array.isArray(g.features) &&
                (g.features.includes('CLAN') ||
                  g.features.includes('GUILD_TAGS') ||
                  g.features.includes('ENABLED_MODERATION_EXPERIENCE_FOR_NON_COMMUNITY') ||
                  g.features.includes('COMMUNITY'))
              ) {
                candidateGuilds.push(g);
              }
            }

            // Probe up to 16 candidate guilds in parallel for their guild profile tag
            const toProbe = candidateGuilds.slice(0, 16);
            await Promise.all(
              toProbe.map(async (g) => {
                try {
                  const gp = await discordApiRequest('GET', `/guilds/${g.id}/profile`, tokenToUse);
                  if (gp && gp.tag) {
                    const bHash = gp.badge_hash || gp.badge || '';
                    availableServerTags = this.mergeOwnedServerTag(availableServerTags, {
                      tag: gp.tag,
                      guildId: g.id,
                      guildName: g.name || gp.name || gp.tag,
                      badge: bHash,
                      badgeUrl: buildClanBadgeUrl(g.id, bHash),
                    });
                  }
                } catch {
                  // Guild does not have a public/member profile tag
                }
              })
            );
          }
        } catch {
          // Optional guild discovery
        }

        try {
          const settingsRes = await discordApiRequest('GET', '/users/@me/settings', tokenToUse);
          if (settingsRes) {
            if (settingsRes.status) {
              currentIdentity.status = settingsRes.status;
            }
            if (settingsRes.custom_status) {
              currentIdentity.customStatusText = settingsRes.custom_status.text || '';
              currentIdentity.customStatusEmoji = settingsRes.custom_status.emoji_name || '';
            }
          }
        } catch {
          // Optional settings
        }

        restSynced = true;
        this.emit('log', {
          type: 'success',
          message: `Discord 실시간 동기화 완료: ${currentIdentity.displayName} (@${currentIdentity.username}) · 서버 태그(${availableServerTags.length}개) 연동됨`,
          timestamp: Date.now(),
        });
      } catch (err) {
        restError = err.message;
        this.emit('log', {
          type: 'warn',
          message: `Discord API 토큰 동기화 오류: ${err.message}`,
          timestamp: Date.now(),
        });
      }
    }

    currentIdentity.availableServerTags = availableServerTags;

    const updatedStore = this.store.updateState({
      discordAuth: {
        userToken: tokenToUse,
        autoSyncProfile: true,
        lastSyncedAt: Date.now(),
      },
      identity: currentIdentity,
    });

    return {
      ok: true,
      ipcConnected: this.rpcClient.connected,
      ipcUser: this.rpcClient.user,
      restSynced,
      restError,
      identity: updatedStore.identity,
      hasToken: Boolean(tokenToUse),
    };
  }

  async applyDiscordProfileFields(fields = {}) {
    const state = this.store.getState();
    const token = String(
      fields.userToken !== undefined ? fields.userToken : state.discordAuth?.userToken || ''
    ).trim();

    const vars = this.getCombinedVariables();
    const replaceVars = (str) => {
      if (!str || typeof str !== 'string') return '';
      return str.replace(/\{([a-zA-Z0-9_]+)\}/g, (m, k) =>
        vars[k] !== undefined ? String(vars[k]) : m
      );
    };

    const resolvedBio = fields.bio !== undefined ? replaceVars(fields.bio) : undefined;
    const resolvedPronouns =
      fields.pronouns !== undefined ? replaceVars(fields.pronouns) : undefined;
    const resolvedDisplayName =
      fields.displayName !== undefined ? replaceVars(fields.displayName) : undefined;
    const resolvedStatus = fields.status;
    const resolvedCustomStatus =
      fields.customStatusText !== undefined ? replaceVars(fields.customStatusText) : undefined;
    const resolvedCustomEmoji =
      fields.customStatusEmoji !== undefined ? String(fields.customStatusEmoji).trim() : undefined;

    const nextIdentity = {
      ...state.identity,
    };
    const ownedList = Array.isArray(nextIdentity.availableServerTags)
      ? nextIdentity.availableServerTags
      : [];

    if (resolvedDisplayName !== undefined && resolvedDisplayName.trim()) {
      nextIdentity.displayName = resolvedDisplayName.trim();
    }
    if (resolvedPronouns !== undefined) nextIdentity.pronouns = resolvedPronouns;
    if (resolvedBio !== undefined) nextIdentity.bio = resolvedBio;
    if (resolvedStatus !== undefined) nextIdentity.status = resolvedStatus;
    if (resolvedCustomStatus !== undefined) nextIdentity.customStatusText = resolvedCustomStatus;
    if (resolvedCustomEmoji !== undefined) nextIdentity.customStatusEmoji = resolvedCustomEmoji;

    let targetTagObj = null;
    let shouldPatchClan = false;

    if (fields.serverTagText !== undefined || fields.serverTagGuildId !== undefined) {
      shouldPatchClan = true;
      const reqTag = fields.serverTagText !== undefined ? String(fields.serverTagText).trim() : '';
      const reqGuildId = fields.serverTagGuildId ? String(fields.serverTagGuildId).trim() : '';

      if (!reqTag && !reqGuildId) {
        // Unequip Server Tag
        nextIdentity.serverTagText = '';
        nextIdentity.serverTagGuildId = '';
        nextIdentity.serverTagBadge = '';
        nextIdentity.serverTagBadgeUrl = '';
      } else {
        targetTagObj =
          ownedList.find(
            (t) =>
              (reqGuildId && t.guildId === reqGuildId) ||
              (reqTag && String(t.tag).toLowerCase() === reqTag.toLowerCase())
          ) || null;

        if (targetTagObj) {
          nextIdentity.serverTagText = targetTagObj.tag;
          nextIdentity.serverTagGuildId = targetTagObj.guildId;
          nextIdentity.serverTagBadge = targetTagObj.badge || '';
          nextIdentity.serverTagBadgeUrl =
            targetTagObj.badgeUrl || buildClanBadgeUrl(targetTagObj.guildId, targetTagObj.badge);
        }
      }
    }

    this.store.updateState({ identity: nextIdentity });

    const appliedRest = {
      profilePatched: false,
      userPatched: false,
      settingsPatched: false,
      clanPatched: false,
      needToken: !token,
      errors: [],
    };

    if (token) {
      // 1) Patch Bio & Pronouns on Discord (/users/@me/profile)
      if (resolvedBio !== undefined || resolvedPronouns !== undefined) {
        try {
          const body = {};
          if (resolvedBio !== undefined) body.bio = resolvedBio.slice(0, 190);
          if (resolvedPronouns !== undefined) body.pronouns = resolvedPronouns.slice(0, 40);
          await discordApiRequest('PATCH', '/users/@me/profile', token, body);
          appliedRest.profilePatched = true;
        } catch (err) {
          appliedRest.errors.push(`소개/대명사 변경 실패: ${err.message}`);
        }
      }

      // 2) Patch Display Name (global_name) on Discord (/users/@me)
      if (
        resolvedDisplayName !== undefined &&
        resolvedDisplayName.trim() &&
        resolvedDisplayName.trim() !== (this.rpcClient.user?.global_name || '')
      ) {
        try {
          await discordApiRequest('PATCH', '/users/@me', token, {
            global_name: resolvedDisplayName.trim().slice(0, 32),
          });
          appliedRest.userPatched = true;
        } catch (err) {
          appliedRest.errors.push(`표시 닉네임 변경 실패: ${err.message}`);
        }
      }

      // 3) Patch Status (online/idle/dnd/invisible) & Custom Status on Discord (/users/@me/settings)
      if (resolvedStatus !== undefined || resolvedCustomStatus !== undefined) {
        try {
          const settingsPatch = {};
          if (resolvedStatus && ['online', 'idle', 'dnd', 'invisible'].includes(resolvedStatus)) {
            settingsPatch.status = resolvedStatus;
          }
          if (resolvedCustomStatus !== undefined) {
            const textClean = resolvedCustomStatus.trim().slice(0, 128);
            const emojiClean = (nextIdentity.customStatusEmoji || '').trim();
            if (textClean || emojiClean) {
              settingsPatch.custom_status = {
                text: textClean,
                ...(emojiClean ? { emoji_name: emojiClean } : {}),
              };
            } else {
              settingsPatch.custom_status = null;
            }
          }
          if (Object.keys(settingsPatch).length > 0) {
            await discordApiRequest('PATCH', '/users/@me/settings', token, settingsPatch);
            appliedRest.settingsPatched = true;
          }
        } catch (err) {
          appliedRest.errors.push(`온라인 상태/커스텀 상태 변경 실패: ${err.message}`);
        }
      }

      // 4) Patch Real Server Tag / Clan on Discord (PUT /users/@me/clan)
      if (shouldPatchClan) {
        const enableTag = Boolean(nextIdentity.serverTagText && nextIdentity.serverTagGuildId);
        const clanPayload = {
          identity_guild_id: enableTag ? nextIdentity.serverTagGuildId : null,
          identity_enabled: enableTag,
        };
        try {
          await discordApiRequest('PUT', '/users/@me/clan', token, clanPayload);
          appliedRest.clanPatched = true;
        } catch (err) {
          appliedRest.errors.push(`서버 태그 변경 실패: ${err.message}`);
        }
      }
    }

    return {
      ok: true,
      hasToken: Boolean(token),
      appliedRest,
      identity: this.store.getState().identity,
    };
  }

  getCombinedVariables() {
    const sysVars = this.sysMonitor.getVariables();
    const st = this.store.getState();
    const id = st.identity || {};
    const ipcU = this.rpcClient.user || {};
    const rawCustom = st.customVariables || [];
    const customMap = {};
    if (Array.isArray(rawCustom)) {
      rawCustom.forEach((item) => {
        if (item && item.key) customMap[item.key] = item.value || '';
      });
    } else if (typeof rawCustom === 'object') {
      Object.assign(customMap, rawCustom);
    }

    const myName = id.displayName || ipcU.global_name || ipcU.username || 'User';
    const myUser = id.username || ipcU.username || 'username';
    const myId = id.id || ipcU.id || '0';

    return {
      ...customMap,
      ...sysVars,
      display_name: myName,
      my_name: myName,
      username: myUser,
      user_tag: `@${myUser}`,
      user_id: myId,
      discord_link: `https://discord.com/users/${myId}`,
      profile_link: `https://discord.com/users/${myId}`,
      pronouns: id.pronouns || '',
      server_tag: id.serverTagText || '',
      status: id.status || 'online',
      custom_status: id.customStatusText || '',
      bio: id.bio || '',
    };
  }

  extractActivityConfig(profile, keyframeIndex = 0) {
    if (!profile || !Array.isArray(profile.keyframes) || profile.keyframes.length === 0) {
      return null;
    }
    const idx = Math.max(0, Math.min(profile.keyframes.length - 1, keyframeIndex));
    const kf = profile.keyframes[idx];
    const variants = Array.isArray(kf.variants) ? kf.variants.filter((v) => v.enabled !== false) : [];

    const rpcVar = variants.find((v) => v.type === 'rich_presence');
    const cStatusVar = variants.find((v) => v.type === 'custom_status');
    const tagVar = variants.find((v) => v.type === 'server_tag');
    const pronounsVar = variants.find((v) => v.type === 'pronouns');
    const bioVar = variants.find((v) => v.type === 'bio');
    const statusVar = variants.find((v) => v.type === 'status');

    const identity = this.store.getState().identity || {};

    if (rpcVar) {
      const pCur = Number(rpcVar.partyCurrent ?? 0);
      const pMax = Number(rpcVar.partyMax ?? 0);

      const resolvedName =
        (rpcVar.name || rpcVar.nameField || rpcVar.appName || '').trim() ||
        identity.displayName ||
        profile.name ||
        'Reborn RPC';

      const resolvedDetails = (rpcVar.details || '').trim();
      const resolvedState = (rpcVar.state || '').trim();

      return {
        clientId: sanitizeClientId(rpcVar.clientId),
        name: resolvedName,
        appName: resolvedName,
        type: Number(rpcVar.activityType ?? 0),
        platform: rpcVar.platform || 'desktop',
        streamUrl: rpcVar.streamUrl || '',
        details: resolvedDetails,
        state: resolvedState,
        timestampMode: rpcVar.timestampMode || 'elapsed',
        freezeTimer: rpcVar.freezeTimer,
        countdownSeconds: Number(rpcVar.customEndMinutes || 45) * 60,
        customEndMinutes: Number(rpcVar.customEndMinutes ?? 45),
        offsetHours: Number(rpcVar.offsetHours ?? 0),
        offsetMinutes: Number(rpcVar.offsetMinutes ?? 0),
        offsetSeconds: Number(rpcVar.offsetSeconds ?? 0),
        unlimitedHours: Number(rpcVar.unlimitedHours ?? 9999),
        customStartTimestamp: rpcVar.customStartTimestamp || '',
        customEndTimestamp: rpcVar.customEndTimestamp || '',
        largeImageKey: rpcVar.largeImageKey || '',
        largeImageText: rpcVar.largeImageText || '',
        smallImageKey: rpcVar.smallImageKey || '',
        smallImageText: rpcVar.smallImageText || '',
        partyEnabled: pCur > 0 && pMax > 0,
        partyCurrent: pCur,
        partyMax: pMax,
        partyPrivacy: rpcVar.partyPrivacy || 'public',
        button1Enabled: Boolean(rpcVar.button1Label && rpcVar.button1Url),
        button1Label: rpcVar.button1Label || '',
        button1Url: rpcVar.button1Url || '',
        button2Enabled: Boolean(rpcVar.button2Label && rpcVar.button2Url),
        button2Label: rpcVar.button2Label || '',
        button2Url: rpcVar.button2Url || '',
        _sessionStartMs: this.sessionStartMs,
        _appStartMs: this.sysMonitor.appStartTime,
      };
    }

    if (cStatusVar || tagVar || pronounsVar || bioVar || statusVar) {
      const topName = identity.displayName || profile.name || 'Reborn RPC';
      const detailLine =
        cStatusVar?.text ||
        (bioVar?.text ? bioVar.text.split('\n')[0] : '') ||
        (pronounsVar?.text ? pronounsVar.text : '');
      const stateParts = [];
      if (pronounsVar?.text && detailLine !== pronounsVar.text) stateParts.push(pronounsVar.text);
      if (tagVar?.text) stateParts.push(`[${tagVar.text}]`);

      return {
        clientId: VALID_DEFAULT_CLIENT_ID,
        name: topName,
        appName: topName,
        type: 0,
        details: detailLine,
        state: stateParts.join(' · '),
        timestampMode: 'elapsed',
        largeImageKey: identity.avatarUrl || '',
        largeImageText: bioVar?.text ? bioVar.text.replace(/\n/g, ' ').slice(0, 120) : topName,
        smallImageKey: '',
        smallImageText: pronounsVar?.text || '',
        partyEnabled: false,
        button1Enabled: false,
        button2Enabled: false,
        _sessionStartMs: this.sessionStartMs,
        _appStartMs: this.sysMonitor.appStartTime,
      };
    }

    return null;
  }

  async makeProfileLive(profileData, startKeyframeIndex = 0, resetTimer = false) {
    const state = this.store.getState();
    this.rpcClient.autoReconnect = Boolean(state.settings?.autoReconnect ?? true);

    if (resetTimer) {
      this.sessionStartMs = Date.now();
    }

    let profile = profileData;
    if (typeof profileData === 'string') {
      profile = (state.profiles || []).find((p) => p.id === profileData);
    }
    if (!profile) {
      throw new Error('송출할 프로필을 찾을 수 없습니다.');
    }

    this.liveProfileId = profile.id;
    this.liveKeyframeIndex = startKeyframeIndex;

    const kf =
      profile.keyframes?.[this.liveKeyframeIndex] || profile.keyframes?.[0] || null;

    if (kf && Array.isArray(kf.variants)) {
      const vStatus = kf.variants.find((v) => v.type === 'status' && v.enabled !== false);
      const vCustomStatus = kf.variants.find(
        (v) => v.type === 'custom_status' && v.enabled !== false
      );
      const vPronouns = kf.variants.find((v) => v.type === 'pronouns' && v.enabled !== false);
      const vBio = kf.variants.find((v) => v.type === 'bio' && v.enabled !== false);
      const vTag = kf.variants.find((v) => v.type === 'server_tag' && v.enabled !== false);

      await this.applyDiscordProfileFields({
        status: vStatus ? vStatus.status : undefined,
        customStatusText: vCustomStatus ? vCustomStatus.text : undefined,
        customStatusEmoji: vCustomStatus ? vCustomStatus.emoji : undefined,
        pronouns: vPronouns ? vPronouns.text : undefined,
        bio: vBio ? vBio.text : undefined,
        serverTagText: vTag ? vTag.text : undefined,
        serverTagGuildId: vTag ? vTag.guildId : undefined,
      }).catch(() => {});
    }

    const activityConfig = this.extractActivityConfig(profile, this.liveKeyframeIndex);
    const vars = this.getCombinedVariables();

    let res = { cleared: true };
    if (activityConfig) {
      this.isRpcRunning = true;
      res = await this.rpcClient.setActivity(activityConfig, vars);
    } else {
      this.isRpcRunning = false;
      res = await this.rpcClient.clearActivity();
    }

    this.scheduleNextLiveKeyframe(profile);

    return {
      ok: true,
      ...res,
      isRpcRunning: this.isRpcRunning,
      connected: this.rpcClient.connected,
      user: this.rpcClient.user,
      liveProfileId: this.liveProfileId,
      liveKeyframeIndex: this.liveKeyframeIndex,
      sessionStartMs: this.sessionStartMs,
      variables: vars,
    };
  }

  scheduleNextLiveKeyframe(profile) {
    if (this.keyframeTimer) {
      clearTimeout(this.keyframeTimer);
      this.keyframeTimer = null;
    }

    const state = this.store.getState();
    if (!this.isRpcRunning || !state.settings?.keyframeLiveLoop) return;
    if (!profile || !Array.isArray(profile.keyframes)) return;

    const enabledKeyframes = profile.keyframes
      .map((kf, idx) => ({ kf, idx }))
      .filter((item) => item.kf.previewEnabled !== false);

    if (enabledKeyframes.length <= 1) return;

    const currentKf = profile.keyframes[this.liveKeyframeIndex] || profile.keyframes[0];
    const durationMs = Math.max(3, Number(currentKf.durationSec || 15)) * 1000;

    this.keyframeTimer = setTimeout(async () => {
      if (!this.isRpcRunning || !this.rpcClient.connected || !this.liveProfileId) return;
      const latestState = this.store.getState();
      const latestProfile = (latestState.profiles || []).find((p) => p.id === this.liveProfileId);
      if (!latestProfile) return;

      const validIndices = latestProfile.keyframes
        .map((kf, idx) => (kf.previewEnabled !== false ? idx : -1))
        .filter((idx) => idx !== -1);

      if (validIndices.length <= 1) return;

      const pos = validIndices.indexOf(this.liveKeyframeIndex);
      const nextIdx = validIndices[(pos + 1) % validIndices.length];
      this.liveKeyframeIndex = nextIdx;

      this.emit('keyframe-switched', {
        profileId: latestProfile.id,
        keyframeIndex: nextIdx,
      });

      try {
        await this.makeProfileLive(latestProfile, nextIdx, false);
      } catch {
        // Ignore transient IPC error during keyframe transition
      }
    }, durationMs);
  }

  setupBackgroundTimers() {
    if (this.macroTimer) clearInterval(this.macroTimer);
    if (this.processTimer) clearInterval(this.processTimer);

    const state = this.store.getState();
    const settings = state.settings || {};

    const macroIntervalMs = Math.max(5, Number(settings.macroIntervalSec || 5)) * 1000;
    this.macroTimer = setInterval(async () => {
      const vars = this.getCombinedVariables();
      this.emit('telemetry-tick', {
        variables: vars,
        liveProfileId: this.liveProfileId,
        liveKeyframeIndex: this.liveKeyframeIndex,
        isRpcRunning: this.isRpcRunning,
      });

      if (
        this.isRpcRunning &&
        this.rpcClient.connected &&
        this.rpcClient.ready &&
        this.liveProfileId
      ) {
        const currentProfile = (this.store.getState().profiles || []).find(
          (p) => p.id === this.liveProfileId
        );
        if (currentProfile) {
          const cfg = this.extractActivityConfig(currentProfile, this.liveKeyframeIndex);
          const needsFreezeTick =
            cfg &&
            (cfg.timestampMode === 'fixed' ||
              Boolean(cfg.freezeTimer) ||
              (cfg.timestampMode === 'unlimited' && cfg.freezeTimer !== false));
          if (cfg && (settings.liveMacroSync || needsFreezeTick)) {
            try {
              await this.rpcClient.setActivity(cfg, vars);
            } catch {
              // Ignore
            }
          }
        }
      }
    }, macroIntervalMs);

    if (settings.processWatcher) {
      this.processTimer = setInterval(async () => {
        if (!this.isRpcRunning) return;
        const running = await this.sysMonitor.scanProcesses();
        const runningSet = new Set(running);
        const currentState = this.store.getState();
        const matched = (currentState.profiles || []).find(
          (p) => p.processTrigger && runningSet.has(p.processTrigger.trim().toLowerCase())
        );

        if (matched && matched.id !== this.liveProfileId) {
          this.store.updateState({ activeProfileId: matched.id });
          this.emit('profile-switched', matched.id);
          this.emit('log', {
            type: 'info',
            message: `프로세스 감지 (${matched.processTrigger}) → [${matched.name}] 프로필 자동 전환`,
            timestamp: Date.now(),
          });
          if (this.rpcClient.connected) {
            try {
              await this.makeProfileLive(matched, 0, true);
            } catch {
              // Ignore
            }
          }
        }
      }, 10000);
    }
  }

  async clearActivity() {
    if (this.keyframeTimer) {
      clearTimeout(this.keyframeTimer);
      this.keyframeTimer = null;
    }
    this.isRpcRunning = false;
    this.liveProfileId = null;
    return await this.rpcClient.clearActivity();
  }

  async disconnect() {
    if (this.keyframeTimer) {
      clearTimeout(this.keyframeTimer);
      this.keyframeTimer = null;
    }
    this.isRpcRunning = false;
    this.liveProfileId = null;
    await this.rpcClient.disconnect(true);
    return { disconnected: true };
  }

  getInitialSnapshot() {
    return {
      store: this.store.getState(),
      authSession: this.licenseManager.getSessionStatus(),
      ipcStatus: {
        ...this.rpcClient.getStatus(),
        isRpcRunning: this.isRpcRunning,
        liveProfileId: this.liveProfileId,
        liveKeyframeIndex: this.liveKeyframeIndex,
      },
      variables: this.getCombinedVariables(),
      sessionStartMs: this.sessionStartMs,
      appStartMs: this.sysMonitor.appStartTime,
    };
  }
}

module.exports = { RPCEngineCore };
