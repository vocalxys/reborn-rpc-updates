/* ============================================================================
   REBORN RPC — MONOCHROME GLASS & BURNING FLAME DISCORD STUDIO (v5.0)
   Zero Emojis · Zero Pre-filled Presets · Native Right-Click Menu · Real Sync
   ============================================================================ */

const VALID_DEFAULT_CLIENT_ID = '383226320970055681';
const LEGACY_INVALID_IDS = new Set(['1124628657306808391', '1196845791349092422', '']);

function sanitizeClientId(id) {
  const clean = String(id || '').trim();
  if (!clean || LEGACY_INVALID_IDS.has(clean)) return VALID_DEFAULT_CLIENT_ID;
  return clean;
}

const VECTOR_ICONS = {
  // Customizer Elements
  elem_name: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="17" x2="18" y2="17"/></svg>`,
  elem_details: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>`,
  elem_state: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="16" y2="8"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="4" y1="18" x2="13" y2="18"/></svg>`,
  elem_timer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>`,
  elem_large_image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
  elem_small_image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><rect x="12" y="12" width="6" height="6" rx="1.5" fill="currentColor"/></svg>`,
  elem_party: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  elem_button: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M8 12h8"/><path d="M13 9l3 3-3 3"/></svg>`,
  elem_client_id: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>`,

  // UI Utility Icons
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron_down: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevron_right: `<svg class="rc-elem-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>`,
  reset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  dots_vertical: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  sync: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,

  // Activity Mode Popup Vector Icons (Matching User Screenshot 1)
  act_playing: `<svg viewBox="0 0 24 24" fill="#23a55a"><path d="M17.5 7H6.5C3.46 7 1 9.46 1 12.5S3.46 18 6.5 18c1.61 0 3.09-.7 4.1-1.82h2.8c1.01 1.12 2.49 1.82 4.1 1.82 3.04 0 5.5-2.46 5.5-5.5S20.54 7 17.5 7zM8 13.5H6.5V15h-1v-1.5H4v-1h1.5V11h1v1.5H8v1zm7.25.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.5-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>`,
  act_watching: `<svg viewBox="0 0 24 24" fill="#23a55a"><rect x="2" y="4" width="20" height="13" rx="2.5"/><path d="M8 20h8" stroke="#23a55a" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  act_listening: `<svg viewBox="0 0 24 24" fill="none" stroke="#23a55a" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M15 9a4.2 4.2 0 0 1 0 6"/></svg>`,
  act_streaming: `<svg viewBox="0 0 24 24" fill="#23a55a"><rect x="3" y="4" width="18" height="12" rx="2.5"/><circle cx="12" cy="10" r="2.5" fill="#0d1017"/><path d="M8 20h8M12 16v4" stroke="#23a55a" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  act_competing: `<svg viewBox="0 0 24 24" fill="#e2e8f0"><rect x="4" y="3" width="16" height="18" rx="2.5"/><line x1="8" y1="8" x2="16" y2="8" stroke="#0d1017" stroke-width="2.2" stroke-linecap="round"/><line x1="8" y1="12" x2="16" y2="12" stroke="#0d1017" stroke-width="2.2" stroke-linecap="round"/><line x1="8" y1="16" x2="13" y2="16" stroke="#0d1017" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  act_spotify: `<svg viewBox="0 0 24 24" fill="#1db954"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.56.39-.86.21-2.35-1.43-5.31-1.76-8.8-.96-.34.08-.67-.14-.75-.47-.08-.34.14-.67.47-.75 3.82-.87 7.09-.5 9.72 1.11.3.18.39.56.22.86zm1.22-2.72c-.23.37-.71.49-1.08.26-2.69-1.65-6.79-2.13-9.97-1.16-.41.13-.85-.11-.98-.52-.13-.41.11-.85.52-.98 3.63-1.1 8.15-.57 11.25 1.33.37.23.49.71.26 1.07zm.11-2.83c-3.22-1.91-8.54-2.09-11.62-1.15-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 3.53-1.07 9.4-.86 13.11 1.34.45.26.6.84.33 1.28-.26.44-.84.59-1.28.31z"/></svg>`,
  act_crunchyroll: `<svg viewBox="0 0 24 24" fill="#f97316"><path d="M12 2a10 10 0 1 0 10 10A10.03 10.03 0 0 0 12 2zm1.4 15.8a5.8 5.8 0 1 1 5.4-7.9 3.6 3.6 0 1 0-4.9 4.9 5.77 5.77 0 0 1-.5 3z"/></svg>`,

  // Platform Popup Vector Icons (Matching User Screenshot 2)
  plat_desktop: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="20" height="13" rx="2.2"/><path d="M8 21h8M12 16v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  plat_playstation: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4.2v14.9l3.3 1.1V7.6c0-.8.4-1.2 1-.9.7.2.9.8.9 1.6v4.6c2.4 1.2 4.3 0 4.3-3.1 0-3-1.5-4.3-4.6-5.3-1.3-.4-3.3-.9-4.9-1.3zM4.2 16.5c-1.8.6-2.5 1.7-1.4 2.5 1.1.8 3.2 1 5.6.3l.4-.1v-2.1l-1.5.5c-1.1.3-2.2.2-2.6-.2-.4-.4 0-.9 1.1-1.3l2.9-1V13l-4.5 1.5zm14.9-.5c-1.4-.5-3.2-.6-5-.1l-1 .3v2.2l2.9-.9c1.1-.3 2.2-.2 2.6.2.4.4 0 .9-1.1 1.3l-4.4 1.5v2.1l6.1-2.1c1.8-.6 2.5-1.7 1.4-2.5-.4-.8-1-1.6-1.5-2z"/></svg>`,
  plat_xbox: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.8 3.5c1.1 1.1 1.5 2.2 1.5 2.2s-2.4 1.8-4.7 4.4c-1.1-1.3-2.3-2.5-3.3-3.3 2.5-2.1 5.1-3.3 6.5-3.3zm-9.6 0c1.4 0 4 1.2 6.5 3.3-1 .8-2.2 2-3.3 3.3-2.3-2.6-4.7-4.4-4.7-4.4s.4-1.1 1.5-2.2zM5.3 17.5c-.9-1.5-1.3-3.4-1.3-5.3 0-1.1.2-2.2.6-3.1 1.2.9 3.3 2.7 5.2 5.1-2.1 2.3-3.9 3.3-4.5 3.3zm6.7 2.5c-2.2 0-4.2-.8-5.7-2.1 1.2-.6 3.5-2.1 5.7-4.7 2.2 2.6 4.5 4.1 5.7 4.7-1.5 1.3-3.5 2.1-5.7 2.1zm6.7-2.5c-.6 0-2.4-1-4.5-3.3 1.9-2.4 4-4.2 5.2-5.1.4.9.6 2 .6 3.1 0 1.9-.4 3.8-1.3 5.3z"/></svg>`,
  plat_quest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 8c-2.8 0-5 2.2-5 4.8S4.2 17.5 7 17.5c2.2 0 3.9-1.8 5-3.8 1.1 2 2.8 3.8 5 3.8 2.8 0 5-2.1 5-4.7S19.8 8 17 8c-2.2 0-3.9 1.8-5 3.8C10.9 9.8 9.2 8 7 8z"/></svg>`,
  plat_mobile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  plat_web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

  // App Brand Icons for Rich Presence Customizer
  app_youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.14 5.6 12 5.6 12 5.6s-6.14 0-7.86.46a2.75 2.75 0 0 0-1.94 1.94C1.74 9.72 1.74 12 1.74 12s0 2.28.46 3.999a2.75 2.75 0 0 0 1.94 1.94c1.72.46 7.86.46 7.86.46s6.14 0 7.86-.46a2.75 2.75 0 0 0 1.94-1.94c.46-1.72.46-4 .46-4s0-2.28-.46-3.999zM9.95 15.02V8.98L15.2 12l-5.25 3.02z"/></svg>`,
  app_lol: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v18h12"/><circle cx="12" cy="12" r="7"/></svg>`,
  app_roblox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(14 12 12)"/><rect x="10" y="10" width="4" height="4" transform="rotate(14 12 12)"/></svg>`,
  app_valorant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 5 11 19 16 19 3 5"/><polygon points="21 5 15 14 19 14 21 10 21 5"/></svg>`,
  app_vscode: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 6 21 18 16 21 3 9 16 3"/><polyline points="3 15 16 3"/></svg>`,
  app_spotify: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 11.5c2.5-1 5.5-1 8 0.5"/><path d="M8.5 14.5c2-0.8 4.5-0.8 6.5 0.4"/><path d="M7.5 8.8c3-1.2 6.5-1 9.5 0.6"/></svg>`,

  // Custom Status & Server Tag Vector Icons
  flame: `<svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="#fde047" stroke-width="2"><path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2"><polygon points="2 18 5 7 9.5 12 12 5 14.5 12 19 7 22 18 2 18"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="#fde047" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  sword: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  cake: `<svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/></svg>`,

  // Profile Vector Badges (Matching User Screenshot 2 Colorful Discord Badge Strip)
  badge_orb: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/><circle cx="9.5" cy="9.5" r="2.5" fill="#f8fafc"/></svg>`,
  orb: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/><circle cx="9.5" cy="9.5" r="2.5" fill="#f8fafc"/></svg>`,
  badge_quest: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/></svg>`,
  quest: `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/></svg>`,
  badge_dev: `<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.2"><rect x="3" y="4" width="18" height="12" rx="2" fill="#1e3a8a"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>`,
  dev: `<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.2"><rect x="3" y="4" width="18" height="12" rx="2" fill="#1e3a8a"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>`,
  badge_nitro: `<svg viewBox="0 0 24 24" fill="none"><polygon points="12 2 21 12 12 22 3 12" fill="#f472b6" stroke="#fbcfe8" stroke-width="1.6"/></svg>`,
  nitro: `<svg viewBox="0 0 24 24" fill="none"><polygon points="12 2 21 12 12 22 3 12" fill="#f472b6" stroke="#fbcfe8" stroke-width="1.6"/></svg>`,
  diamond: `<svg viewBox="0 0 24 24" fill="none"><polygon points="12 2 21 12 12 22 3 12" fill="#f472b6" stroke="#fbcfe8" stroke-width="1.6"/></svg>`,
  badge_boost: `<svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><rect x="3" y="8" width="18" height="13" rx="2" fill="#581c87"/><path d="M12 8v13" stroke="#e9d5ff"/><path d="M3 13h18" stroke="#e9d5ff"/></svg>`,
  boost: `<svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><rect x="3" y="8" width="18" height="13" rx="2" fill="#581c87"/><path d="M12 8v13" stroke="#e9d5ff"/><path d="M3 13h18" stroke="#e9d5ff"/></svg>`,
  badge_gaming: `<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6" fill="#14532d"/><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="11" r="1.2" fill="#4ade80"/><circle cx="17.5" cy="13" r="1.2" fill="#4ade80"/></svg>`,
  gaming: `<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6" fill="#14532d"/><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="11" r="1.2" fill="#4ade80"/><circle cx="17.5" cy="13" r="1.2" fill="#4ade80"/></svg>`,
  badge_gear: `<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2.2"><circle cx="12" cy="12" r="7" fill="#312e81"/><circle cx="12" cy="12" r="2.5" fill="#c7d2fe"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2.2"><circle cx="12" cy="12" r="7" fill="#312e81"/><circle cx="12" cy="12" r="2.5" fill="#c7d2fe"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="#facc15" stroke="#fef08a" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
};

const CUSTOM_ICON_KEYS = ['flame', 'spark', 'crown', 'bolt', 'sword', 'shield', 'terminal', 'music', 'moon', 'cake'];

const BADGE_DEFINITIONS = [
  { id: 'orb', label: 'Orb Emblem', svg: VECTOR_ICONS.orb },
  { id: 'quest', label: 'Quest Blade', svg: VECTOR_ICONS.quest },
  { id: 'dev', label: 'Active Dev', svg: VECTOR_ICONS.dev },
  { id: 'nitro', label: 'Nitro Gem', svg: VECTOR_ICONS.nitro },
  { id: 'boost', label: 'Server Boost', svg: VECTOR_ICONS.boost },
  { id: 'gaming', label: 'Gaming Pad', svg: VECTOR_ICONS.gaming },
  { id: 'gear', label: 'Core Gear', svg: VECTOR_ICONS.gear },
  { id: 'flame', label: 'Reborn Flame', svg: VECTOR_ICONS.flame },
  { id: 'crown', label: 'Royal Crown', svg: VECTOR_ICONS.crown },
  { id: 'bolt', label: 'Lightning', svg: VECTOR_ICONS.bolt },
  { id: 'shield', label: 'Guardian', svg: VECTOR_ICONS.shield },
  { id: 'trophy', label: 'Champion', svg: VECTOR_ICONS.trophy },
];

const CUSTOMIZER_ELEMENTS = [
  { id: 'name', label: 'Name', icon: VECTOR_ICONS.elem_name },
  { id: 'details', label: 'Details', icon: VECTOR_ICONS.elem_details },
  { id: 'state', label: 'State', icon: VECTOR_ICONS.elem_state },
  { id: 'timer', label: 'Timer', icon: VECTOR_ICONS.elem_timer },
  { id: 'large_image', label: 'Large Image', icon: VECTOR_ICONS.elem_large_image },
  { id: 'small_image', label: 'Small Image', icon: VECTOR_ICONS.elem_small_image },
  { id: 'party', label: 'Party', icon: VECTOR_ICONS.elem_party },
  { id: 'button1', label: 'Button 1', icon: VECTOR_ICONS.elem_button },
  { id: 'button2', label: 'Button 2', icon: VECTOR_ICONS.elem_button },
  { id: 'client_id', label: 'App ID', icon: VECTOR_ICONS.elem_client_id },
];

const ACTIVITY_MODE_OPTIONS = [
  { id: 'playing', type: 0, label: 'Playing', icon: VECTOR_ICONS.act_playing },
  { id: 'watching', type: 3, label: 'Watching', icon: VECTOR_ICONS.act_watching },
  { id: 'listening', type: 2, label: 'Listening', icon: VECTOR_ICONS.act_listening },
  { id: 'streaming', type: 1, label: 'Streaming', icon: VECTOR_ICONS.act_streaming },
  { id: 'competing', type: 5, label: 'Competing', icon: VECTOR_ICONS.act_competing },
  { id: 'spotify', type: 2, label: 'Spotify', icon: VECTOR_ICONS.act_spotify, isSpotify: true },
];

const PLATFORM_OPTIONS = [
  { id: 'desktop', label: 'Desktop', icon: VECTOR_ICONS.plat_desktop },
  { id: 'playstation', label: 'PlayStation', icon: VECTOR_ICONS.plat_playstation },
  { id: 'xbox', label: 'Xbox', icon: VECTOR_ICONS.plat_xbox },
  { id: 'meta_quest', label: 'Meta Quest', icon: VECTOR_ICONS.plat_quest },
];

const SPECIAL_APP_NAMES = [
  { name: 'YouTube', icon: VECTOR_ICONS.app_youtube },
  { name: 'League of Legends', icon: VECTOR_ICONS.app_lol },
  { name: 'Roblox', icon: VECTOR_ICONS.app_roblox },
  { name: 'VALORANT', icon: VECTOR_ICONS.app_valorant },
  { name: 'Visual Studio Code', icon: VECTOR_ICONS.app_vscode },
  { name: 'Spotify', icon: VECTOR_ICONS.app_spotify },
];

const VERIFIED_CLIENT_IDS = [
  { id: '383226320970055681', label: 'Reborn Verified RPC (383226320970055681)' },
  { id: '463097721130188830', label: 'PreMiD Core (463097721130188830)' },
  { id: '431544605209788416', label: 'Roblox Core (431544605209788416)' },
  { id: '356869127241072640', label: 'League of Legends (356869127241072640)' },
];

const BUILTIN_MACROS = [
  { token: '{my_name}', desc: '내 표시 이름 (Display Name)' },
  { token: '{username}', desc: '내 사용자명 (Username)' },
  { token: '{user_tag}', desc: '내 멘션 태그 (@username)' },
  { token: '{discord_link}', desc: '내 Discord 프로필 링크 (URL)' },
  { token: '{spotify_track}', desc: '실시간 Spotify 재생 곡 + 아티스트' },
  { token: '{spotify_song}', desc: '실시간 Spotify 노래 제목' },
  { token: '{spotify_artist}', desc: '실시간 Spotify 아티스트' },
  { token: '{spotify_link}', desc: 'Spotify 현재 곡 링크 (버튼 URL용)' },
  { token: '{media_title}', desc: '현재 재생 중인 미디어/유튜브 제목' },
  { token: '{pronouns}', desc: '내 대명사 (Pronouns)' },
  { token: '{server_tag}', desc: '내 서버 태그 (Server Tag)' },
  { token: '{custom_status}', desc: '내 커스텀 상태 메시지' },
  { token: '{time}', desc: '현재 시각 (오전/오후)' },
  { token: '{time24}', desc: '현재 시각 (24시간제)' },
  { token: '{date}', desc: '오늘 날짜 (YYYY.MM.DD)' },
  { token: '{cpu}', desc: '실시간 CPU 점유율 (%)' },
  { token: '{ram}', desc: '실시간 RAM 점유율 (%)' },
  { token: '{ram_gb}', desc: '메모리 사용량 (GB)' },
  { token: '{uptime}', desc: '스튜디오 가동 시간' },
  { token: '{os}', desc: '운영체제 이름' },
];

// ============================================================================
// HTTP + SSE Bridge
// ============================================================================
function createHttpBridge() {
  const listeners = { status: [], stats: [], log: [] };
  const post = async (url, body = {}) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };
  const get = async (url) => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  try {
    const es = new EventSource('/api/events');
    es.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type && listeners[msg.type]) {
          listeners[msg.type].forEach((fn) => fn(msg.data));
        }
      } catch (_) {}
    };
  } catch (_) {}

  return {
    getInitData: () => get('/api/init'),
    authSession: () => get('/api/auth/session'),
    getAuthSession: () => get('/api/auth/session'),
    authRegister: (body) => post('/api/auth/register', body),
    registerUser: (body) => post('/api/auth/register', body),
    authLogin: (body) => post('/api/auth/login', body),
    loginUser: (body) => post('/api/auth/login', body),
    authLogout: () => post('/api/auth/logout', {}),
    logoutUser: () => post('/api/auth/logout', {}),
    adminOverview: (adminPassword) => post('/api/admin/overview', { adminPassword }),
    getAdminOverview: (adminPassword) => post('/api/admin/overview', { adminPassword }),
    adminCreateLicenses: (adminPassword, opts = {}) =>
      post('/api/admin/create-licenses', { adminPassword, ...opts }),
    adminBulkExtend: (adminPassword, opts = {}) =>
      post('/api/admin/bulk-extend', { adminPassword, ...opts }),
    adminClearAuditLogs: (adminPassword) =>
      post('/api/admin/clear-audit-logs', { adminPassword }),
    adminModifyLicense: (adminPassword, opts = {}) =>
      post('/api/admin/modify-license', { adminPassword, ...opts }),
    adminResetLicense: (adminPassword, keyOrPayload) =>
      post(
        '/api/admin/reset-license',
        typeof keyOrPayload === 'string'
          ? { adminPassword, key: keyOrPayload }
          : { adminPassword, ...(keyOrPayload || {}) }
      ),
    adminDeleteLicense: (adminPassword, keyOrPayload) =>
      post(
        '/api/admin/delete-license',
        typeof keyOrPayload === 'string'
          ? { adminPassword, key: keyOrPayload }
          : { adminPassword, ...(keyOrPayload || {}) }
      ),
    adminManageUser: (adminPassword, opts = {}) =>
      post('/api/admin/manage-user', { adminPassword, ...opts }),
    adminPublishUpdate: (adminPassword, opts = {}) =>
      post('/api/admin/publish-update', { adminPassword, ...opts }),
    checkUpdater: (opts = {}) => post('/api/updater/check', opts),
    getUpdaterStatus: () => get('/api/updater/status'),
    connect: (clientId) => post('/api/connect', { clientId }),
    disconnect: () => post('/api/disconnect'),
    syncDiscord: (userToken) => post('/api/discord-sync', { userToken }),
    applyDiscordProfile: (fields) => post('/api/discord-apply-profile', fields),
    updateActivity: (payload, clientId, resetTimer = false, profileFields = {}) =>
      post('/api/update-activity', { payload, clientId, resetTimer, profileFields }),
    clearActivity: () => post('/api/clear-activity'),
    saveConfig: (config) => post('/api/save-config', { config }),
    resetDefaults: () => post('/api/reset-defaults'),
    scanProcesses: () => get('/api/scan-processes'),
    fetchDiscordApp: (clientId) => post('/api/fetch-discord-app', { clientId }),
    openExternal: (url) => post('/api/open-external', { url }),
    onStatusChange: (cb) => listeners.status.push(cb),
    onSystemStats: (cb) => listeners.stats.push(cb),
    onLog: (cb) => listeners.log.push(cb),
  };
}

const api = createHttpBridge();

// ============================================================================
// Reborn RPC Clean Initial State (Zero Fake Presets, Zero Default Strings)
// ============================================================================
const state = {
  profiles: [],
  rpcPresets: [],
  activeProfileId: null,
  activeKeyframeIndex: 0,
  isDirty: false,
  isLiveSent: false,
  isRpcRunning: false,
  ipcConnected: false,
  ipcUser: null,

  // License & Auth Session (with HWID lock)
  auth: {
    authenticated: false,
    user: null,
    license: null,
    currentHwid: '',
  },
  admin: {
    unlocked: false,
    password: '',
    licenses: [],
    users: [],
    stats: {},
    currentHwid: '',
    auditLogs: [],
    engineStatus: null,
  },
  updateInfo: {
    currentVersion: '5.2.0',
    latestVersion: '5.2.0',
    autoUpdateEnabled: true,
    updateStatus: 'up_to_date',
  },

  discordAuth: {
    userToken: '',
    autoSyncProfile: true,
    lastSyncedAt: null,
  },

  // Playback / Keyframe Loop
  isLoopPlaying: false,
  loopSpeedSec: 5,
  loopStartTime: Date.now(),

  // Preview Perspective
  perspective: 'other',
  elapsedSec: 1,

  // Active Rich Presence Customizer Session
  customizer: {
    isOpen: false,
    kfIndex: 0,
    variantIndex: 0,
    activeElementId: 'name',
    activityPopupOpen: false,
    platformPopupOpen: false,
  },

  // Identity (Synced from real Discord IPC / API)
  identity: {
    id: '',
    displayName: '',
    username: '',
    bannerColor: '#0e0e12',
    bannerUrl: '',
    avatarUrl: '',
    avatarDecor: 'none',
    pronouns: '',
    bio: '',
    status: 'online',
    customStatusText: '',
    customStatusIcon: 'none',
    serverTagText: '',
    serverTagGuildId: '',
    serverTagBadge: '',
    serverTagBadgeUrl: '',
    availableServerTags: [],
    badges: [],
  },

  // System Telemetry & Custom Variables
  telemetry: {
    cpu: '0%',
    ram: '0%',
    ram_gb: '-',
    time: '-',
    time24: '-',
    date: '-',
    uptime: '1분',
    os: 'Windows',
    spotify_song: '',
    spotify_artist: '',
    spotify_track: '',
    spotify_link: 'https://open.spotify.com',
    media_title: '',
  },
  customVariables: [],
  settings: {
    autoReconnect: true,
    liveMacroSync: true,
    keyframeLiveLoop: true,
    processWatcher: false,
    syncPreviewToDiscord: true,
  },
  customGallery: [],
  vaultTargetSlot: 'large',
};

let autoSyncDebounceTimer = null;
let activeModalCallbacks = { onSave: null, onDelete: null };

function $(id) {
  return document.getElementById(id);
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================================
// High-Quality Glassmorphic Custom Dropdown Component Engine
// ============================================================================
function syncElevatedAncestors(el, isOpen) {
  if (!el) return;
  const selectors = [
    '.rpc-summary-controls',
    '.variant-block',
    '.kf-variants-list',
    '.keyframe-card',
    '.aux-field',
    '.aux-grid-2',
    '.aux-card',
    '.preview-controls-deck',
    '.rc-floating-box',
  ];
  selectors.forEach((sel) => {
    const anc = el.closest(sel);
    if (anc) anc.classList.toggle('dd-elevated', Boolean(isOpen));
  });
}

function closeAllCustomDropdowns(exceptEl = null) {
  document.querySelectorAll('.reborn-custom-dropdown.open').forEach((dd) => {
    if (dd !== exceptEl) {
      dd.classList.remove('open');
      dd.querySelector('.reborn-dd-menu')?.classList.add('hidden');
      syncElevatedAncestors(dd, false);
    }
  });
  if (!exceptEl) {
    document.querySelectorAll('.dd-elevated').forEach((el) => el.classList.remove('dd-elevated'));
    document.querySelectorAll('.rc-vars-popover:not(.hidden)').forEach((pop) => pop.classList.add('hidden'));
  }
}

function renderCustomDropdown(containerOrId, optionsOrConfig, selectedValue, onChangeFn, extraOpts = {}) {
  const container = typeof containerOrId === 'string' ? $(containerOrId) : containerOrId;
  if (!container) return;

  let options = [];
  let value = '';
  let placeholder = '선택...';
  let emptyMessage = '선택 가능한 항목이 없습니다.';
  let upward = false;
  let onChange = null;

  if (Array.isArray(optionsOrConfig)) {
    options = optionsOrConfig;
    value = selectedValue;
    onChange = onChangeFn;
    placeholder = extraOpts.placeholder || '선택...';
    emptyMessage = extraOpts.emptyMessage || '선택 가능한 항목이 없습니다.';
    upward = Boolean(extraOpts.upward);
  } else if (optionsOrConfig && typeof optionsOrConfig === 'object') {
    options = Array.isArray(optionsOrConfig.options) ? optionsOrConfig.options : [];
    value = optionsOrConfig.value;
    placeholder = optionsOrConfig.placeholder || '선택...';
    emptyMessage = optionsOrConfig.emptyMessage || '선택 가능한 항목이 없습니다.';
    upward = Boolean(optionsOrConfig.upward);
    onChange = optionsOrConfig.onChange;
  }

  if (upward) container.classList.add('upward');

  const selectedOpt = options.find((o) => String(o.value) === String(value)) || null;
  const triggerIconHtml = selectedOpt?.icon || VECTOR_ICONS.flame;
  const triggerLabelText = selectedOpt ? selectedOpt.label : placeholder;

  container.innerHTML = `
    <button type="button" class="reborn-dd-trigger">
      <span class="reborn-dd-left">
        <span class="reborn-dd-icon">${triggerIconHtml}</span>
        <span class="reborn-dd-label">${escapeHtml(triggerLabelText)}</span>
      </span>
      <span class="reborn-dd-caret">${VECTOR_ICONS.chevron_down}</span>
    </button>
    <div class="reborn-dd-menu hidden">
      ${
        options.length === 0
          ? `<div class="reborn-dd-empty">${escapeHtml(emptyMessage)}</div>`
          : options
              .map((opt, idx) => {
                const isSelected = String(opt.value) === String(value);
                return `
                  <button type="button" class="reborn-dd-item ${isSelected ? 'active' : ''}" data-dd-idx="${idx}">
                    <span class="reborn-dd-left">
                      <span class="reborn-dd-icon">${opt.icon || VECTOR_ICONS.flame}</span>
                      <span class="reborn-dd-label">${escapeHtml(opt.label)}</span>
                      ${opt.sub ? `<span class="reborn-dd-item-sub">${escapeHtml(opt.sub)}</span>` : ''}
                    </span>
                    ${isSelected ? `<span class="reborn-dd-check">${VECTOR_ICONS.check}</span>` : ''}
                  </button>
                `;
              })
              .join('')
      }
    </div>
  `;

  const triggerBtn = container.querySelector('.reborn-dd-trigger');
  const menuEl = container.querySelector('.reborn-dd-menu');

  triggerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !container.classList.contains('open');
    closeAllCustomDropdowns(container);
    container.classList.toggle('open', willOpen);
    menuEl?.classList.toggle('hidden', !willOpen);
    syncElevatedAncestors(container, willOpen);
  });

  container.querySelectorAll('[data-dd-idx]').forEach((itemBtn) => {
    itemBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(itemBtn.dataset.ddIdx);
      const picked = options[idx];
      container.classList.remove('open');
      menuEl?.classList.add('hidden');
      syncElevatedAncestors(container, false);
      if (picked && typeof onChange === 'function') {
        onChange(picked.value, picked);
      }
    });
  });
}

function getClanBadgeHtml(guildId, badgeHash, badgeUrl, size = 15) {
  const finalUrl =
    badgeUrl ||
    (guildId && badgeHash
      ? `https://cdn.discordapp.com/clan-badges/${guildId}/${badgeHash}.png?size=32`
      : '');
  if (finalUrl) {
    return `<img src="${escapeHtml(finalUrl)}" alt="" style="width:${size}px;height:${size}px;border-radius:3px;object-fit:contain;display:inline-block;vertical-align:middle;" />`;
  }
  return VECTOR_ICONS.shield;
}

function getOwnedServerTagOptions() {
  const tags = Array.isArray(state.identity.availableServerTags)
    ? state.identity.availableServerTags
    : [];
  const opts = [
    {
      value: '',
      label: '서버 태그 표시 안 함 (해제)',
      icon: VECTOR_ICONS.close,
      guildId: '',
      badge: '',
      badgeUrl: '',
    },
  ];
  tags.forEach((t) => {
    if (t && t.tag && t.guildId) {
      const resolvedUrl =
        t.badgeUrl ||
        (t.guildId && t.badge
          ? `https://cdn.discordapp.com/clan-badges/${t.guildId}/${t.badge}.png?size=32`
          : '');
      opts.push({
        value: t.tag,
        label: t.tag,
        sub: t.guildName && t.guildName !== t.tag ? t.guildName : `Guild · ${t.guildId}`,
        icon: getClanBadgeHtml(t.guildId, t.badge, resolvedUrl, 15),
        guildId: t.guildId || '',
        badge: t.badge || '',
        badgeUrl: resolvedUrl,
      });
    }
  });
  return opts;
}

function getStatusDropdownOptions() {
  return [
    {
      value: 'online',
      label: 'Online (온라인)',
      icon: '<span class="status-big-dot online" style="width:10px;height:10px;display:inline-block;"></span>',
    },
    {
      value: 'idle',
      label: 'Idle (자리 비움)',
      icon: '<span class="status-big-dot idle" style="width:10px;height:10px;display:inline-block;"></span>',
    },
    {
      value: 'dnd',
      label: 'Do Not Disturb (방해 금지)',
      icon: '<span class="status-big-dot dnd" style="width:10px;height:10px;display:inline-block;"></span>',
    },
    {
      value: 'invisible',
      label: 'Invisible (오프라인 표시)',
      icon: '<span class="status-big-dot invisible" style="width:10px;height:10px;display:inline-block;"></span>',
    },
  ];
}

function showToast(message) {
  const stack = $('toastStack');
  if (!stack) return;
  const el = document.createElement('div');
  el.className = 'studio-toast';
  el.innerHTML = `<span style="color:#fb923c;display:inline-flex;width:15px;height:15px;">${VECTOR_ICONS.flame}</span><span>${escapeHtml(message)}</span>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    el.style.transition = 'all 0.2s ease';
    setTimeout(() => el.remove(), 220);
  }, 2600);
}

function appendIpcLog(type, message) {
  const viewer = $('ipcLogViewer');
  if (!viewer) return;
  const line = document.createElement('div');
  const time = new Date().toLocaleTimeString('ko-KR');
  const color =
    type === 'error' ? '#f87171' : type === 'success' ? '#34d399' : '#d4d4d8';
  line.style.padding = '4px 0';
  line.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
  line.innerHTML = `<span style="color:#71717a;">[${time}]</span> <strong style="color:${color};">[${type.toUpperCase()}]</strong> ${escapeHtml(message)}`;
  viewer.prepend(line);
}

function resolveDynamicTokens(str) {
  if (!str) return '';
  const now = new Date();
  const timeStr =
    state.telemetry.time && state.telemetry.time !== '-'
      ? state.telemetry.time
      : now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const time24Str =
    state.telemetry.time24 && state.telemetry.time24 !== '-'
      ? state.telemetry.time24
      : now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr =
    state.telemetry.date && state.telemetry.date !== '-'
      ? state.telemetry.date
      : `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

  const myName =
    state.identity.displayName ||
    state.ipcUser?.global_name ||
    state.identity.username ||
    state.ipcUser?.username ||
    'Reborn User';
  const userName =
    state.identity.username ||
    state.ipcUser?.username ||
    myName;
  const userId = state.identity.id || state.ipcUser?.id || '';
  const discordLink = userId ? `https://discord.com/users/${userId}` : 'https://discord.com';
  const spotifyTrack = state.telemetry.spotify_track || 'Spotify 대기 중';
  const spotifySong = state.telemetry.spotify_song || '재생 중인 곡 없음';
  const spotifyArtist = state.telemetry.spotify_artist || 'Spotify';
  const spotifyLink = state.telemetry.spotify_link || 'https://open.spotify.com';
  const mediaTitle = state.telemetry.media_title || spotifyTrack;

  const cpuVal = String(state.telemetry.cpu || '0').replace(/%$/, '');
  const ramVal = String(state.telemetry.ram || '0').replace(/%$/, '');

  let out = String(str)
    .replace(/\{my_name\}/gi, myName)
    .replace(/\{display_name\}/gi, myName)
    .replace(/\{username\}/gi, userName)
    .replace(/\{user_tag\}/gi, `@${userName}`)
    .replace(/\{discord_link\}/gi, discordLink)
    .replace(/\{profile_link\}/gi, discordLink)
    .replace(/\{spotify_track\}/gi, spotifyTrack)
    .replace(/\{spotify_song\}/gi, spotifySong)
    .replace(/\{spotify_artist\}/gi, spotifyArtist)
    .replace(/\{spotify_link\}/gi, spotifyLink)
    .replace(/\{media_title\}/gi, mediaTitle)
    .replace(/\{pronouns\}/gi, state.identity.pronouns || '')
    .replace(/\{server_tag\}/gi, state.identity.serverTagText || '')
    .replace(/\{custom_status\}/gi, state.identity.customStatusText || '')
    .replace(/\{bio\}/gi, state.identity.bio || '')
    .replace(/\{time\}/gi, timeStr)
    .replace(/\{time24\}/gi, time24Str)
    .replace(/\{date\}/gi, dateStr)
    .replace(/\{cpu\}/gi, `${cpuVal}%`)
    .replace(/\{ram\}/gi, `${ramVal}%`)
    .replace(/\{ram_gb\}/gi, state.telemetry.ram_gb || '-')
    .replace(/\{uptime\}/gi, state.telemetry.uptime || '1분')
    .replace(/\{os\}/gi, state.telemetry.os || 'Windows');

  for (const cv of state.customVariables) {
    if (cv && cv.key) {
      const reg = new RegExp(`\\{${cv.key}\\}`, 'gi');
      out = out.replace(reg, cv.value || '');
    }
  }
  return out;
}

function getActiveProfile() {
  if (!Array.isArray(state.profiles) || state.profiles.length === 0) {
    state.activeProfileId = null;
    return null;
  }
  let prof = state.profiles.find((p) => p.id === state.activeProfileId);
  if (!prof) {
    prof = state.profiles[0];
    state.activeProfileId = prof.id;
  }
  return prof;
}

function getActiveKeyframe() {
  const prof = getActiveProfile();
  if (!prof || !Array.isArray(prof.keyframes) || prof.keyframes.length === 0) return null;
  if (state.activeKeyframeIndex >= prof.keyframes.length || state.activeKeyframeIndex < 0) {
    state.activeKeyframeIndex = 0;
  }
  return prof.keyframes[state.activeKeyframeIndex];
}

function getPresetByName(presetName) {
  if (!presetName) return null;
  return state.rpcPresets.find((p) => (p.name || p.presetName) === presetName) || null;
}

function syncVariantFromPreset(variant, preset) {
  if (!variant || !preset) return;
  variant.presetName = preset.name || preset.presetName || '';
  variant.clientId = sanitizeClientId(preset.clientId);
  variant.activityType = Number(preset.activityType ?? 0);
  variant.activityModeId = preset.activityModeId || 'playing';
  variant.crunchyroll = Boolean(preset.crunchyroll);
  variant.platform = preset.platform || 'desktop';
  variant.streamUrl = preset.streamUrl || '';
  variant.name = preset.nameField ?? preset.name ?? '';
  variant.details = preset.details ?? '';
  variant.state = preset.state ?? '';
  variant.timestampMode = preset.timestampMode || 'elapsed';
  variant.customEndMinutes = Number(preset.customEndMinutes ?? 45);
  variant.offsetHours = Number(preset.offsetHours ?? 0);
  variant.offsetMinutes = Number(preset.offsetMinutes ?? 0);
  variant.offsetSeconds = Number(preset.offsetSeconds ?? 0);
  variant.unlimitedHours = Number(preset.unlimitedHours ?? 9999);
  variant.largeImageKey = preset.largeImageKey || '';
  variant.largeImageText = preset.largeImageText || '';
  variant.smallImageKey = preset.smallImageKey || '';
  variant.smallImageText = preset.smallImageText || '';
  variant.partyCurrent = Number(preset.partyCurrent ?? 0);
  variant.partyMax = Number(preset.partyMax ?? 0);
  variant.button1Label = preset.button1Label || '';
  variant.button1Url = preset.button1Url || '';
  variant.button2Label = preset.button2Label || '';
  variant.button2Url = preset.button2Url || '';
}

function syncPresetFromVariant(variant) {
  if (!variant || !variant.presetName) return;
  let preset = getPresetByName(variant.presetName);
  if (!preset) {
    preset = { id: 'rpc-' + Date.now(), name: variant.presetName, presetName: variant.presetName };
    state.rpcPresets.push(preset);
  }
  preset.name = variant.presetName;
  preset.presetName = variant.presetName;
  preset.clientId = sanitizeClientId(variant.clientId);
  preset.activityType = Number(variant.activityType ?? 0);
  preset.activityModeId = variant.activityModeId || 'playing';
  preset.crunchyroll = Boolean(variant.crunchyroll);
  preset.platform = variant.platform || 'desktop';
  preset.streamUrl = variant.streamUrl || '';
  preset.nameField = variant.name ?? '';
  preset.details = variant.details ?? '';
  preset.state = variant.state ?? '';
  preset.timestampMode = variant.timestampMode || 'elapsed';
  preset.customEndMinutes = Number(variant.customEndMinutes ?? 45);
  preset.offsetHours = Number(variant.offsetHours ?? 0);
  preset.offsetMinutes = Number(variant.offsetMinutes ?? 0);
  preset.offsetSeconds = Number(variant.offsetSeconds ?? 0);
  preset.unlimitedHours = Number(variant.unlimitedHours ?? 9999);
  preset.largeImageKey = variant.largeImageKey || '';
  preset.largeImageText = variant.largeImageText || '';
  preset.smallImageKey = variant.smallImageKey || '';
  preset.smallImageText = variant.smallImageText || '';
  preset.partyCurrent = Number(variant.partyCurrent ?? 0);
  preset.partyMax = Number(variant.partyMax ?? 0);
  preset.button1Label = variant.button1Label || '';
  preset.button1Url = variant.button1Url || '';
  preset.button2Label = variant.button2Label || '';
  preset.button2Url = variant.button2Url || '';
}

function scheduleAutoLiveSync() {
  if (!state.isRpcRunning) return;
  if (!$('chkSyncPreviewToDiscord')?.checked) return;
  if (autoSyncDebounceTimer) clearTimeout(autoSyncDebounceTimer);
  autoSyncDebounceTimer = setTimeout(() => {
    if (state.isRpcRunning) {
      sendCurrentKeyframeToDiscord(true);
    }
  }, 320);
}

function updateMakeLiveButtonUI() {
  const btnLive = $('btnMakeItLive');
  const titleEl = $('makeLiveTitle');
  const subEl = $('makeLiveSub');
  const iconPlay = $('iconMakeLivePlay');
  const iconStop = $('iconMakeLiveStop');
  const prof = getActiveProfile();

  if (state.isRpcRunning) {
    btnLive?.classList.add('live-sent');
    iconPlay?.classList.add('hidden');
    iconStop?.classList.remove('hidden');
    if (titleEl) titleEl.textContent = 'Sent · 작동 중';
    if (subEl) subEl.textContent = prof ? `${prof.name} (클릭 시 중지)` : '클릭하여 RPC 끄기';
  } else {
    btnLive?.classList.remove('live-sent');
    iconPlay?.classList.remove('hidden');
    iconStop?.classList.add('hidden');
    if (titleEl) titleEl.textContent = 'Start RPC';
    if (subEl) subEl.textContent = 'Send to Discord';
  }
}

function markDirty() {
  state.isDirty = true;
  updateProfileStatusPill();
  scheduleAutoLiveSync();
}

function persistStudioConfig() {
  api.saveConfig({
    profiles: state.profiles,
    rpcPresets: state.rpcPresets,
    activeProfileId: state.activeProfileId,
    discordAuth: state.discordAuth,
    identity: state.identity,
    customVariables: state.customVariables,
    settings: state.settings,
    customGallery: state.customGallery,
  });
}

function updateProfileStatusPill() {
  const pill = $('profileStatusBadge');
  if (!pill) return;
  updateMakeLiveButtonUI();
  if (!getActiveProfile()) {
    pill.className = 'profile-status-pill saved';
    pill.textContent = 'Empty';
    return;
  }
  if (state.isRpcRunning && !state.isDirty) {
    pill.className = 'profile-status-pill live';
    pill.textContent = 'Live';
  } else if (state.isDirty) {
    pill.className = 'profile-status-pill draft';
    pill.textContent = 'Draft';
  } else {
    pill.className = 'profile-status-pill saved';
    pill.textContent = 'Saved';
  }
}

function updateIpcStatusIndicator(st) {
  const led = $('topIpcLed');
  const txt = $('topIpcText');
  const railDot = $('railIpcDot');

  const isConn = Boolean(st && (st.connected || st.state === 'connected'));
  state.ipcConnected = isConn;

  if (st && st.user) {
    state.ipcUser = st.user;
    if (!state.identity.displayName) {
      state.identity.displayName = st.user.global_name || st.user.username || '';
    }
    if (!state.identity.username) {
      state.identity.username = st.user.username || '';
    }
    if (st.user.id && st.user.avatar && !state.identity.avatarUrl) {
      const ext = String(st.user.avatar).startsWith('a_') ? 'gif' : 'png';
      state.identity.avatarUrl = `https://cdn.discordapp.com/avatars/${st.user.id}/${st.user.avatar}.${ext}?size=256`;
    }
  }
  if (st && st.identity) {
    state.identity = { ...state.identity, ...st.identity };
  }

  if (isConn) {
    const uname = state.ipcUser
      ? `${state.ipcUser.global_name || state.ipcUser.username} (@${state.ipcUser.username})`
      : state.identity.displayName || 'Discord Connected';
    if (txt) txt.textContent = `Discord 연동됨 · ${uname}`;
    if (led) {
      led.style.background = '#10b981';
      led.style.boxShadow = '0 0 10px #10b981';
    }
    if (railDot) railDot.style.background = '#10b981';
  } else if (st && st.state === 'connecting') {
    if (txt) txt.textContent = 'Discord IPC 연결 중...';
    if (led) {
      led.style.background = '#f59e0b';
      led.style.boxShadow = '0 0 10px #f59e0b';
    }
  } else {
    if (txt) txt.textContent = 'Discord 연동 대기 (클릭하여 연동)';
    if (led) {
      led.style.background = '#f59e0b';
      led.style.boxShadow = '0 0 8px #f59e0b';
    }
  }

  renderDiscordLinkBanner();
  renderLiveDiscordPreview();
}

function renderDiscordLinkBanner() {
  const nameEl = $('dlAccountName');
  const subEl = $('dlAccountSub');
  const avatarEl = $('dlBannerAvatar');
  const ipcBadge = $('dlIpcBadge');
  const restBadge = $('dlRestBadge');

  if (state.ipcConnected && (state.ipcUser || state.identity.username)) {
    const disp = state.identity.displayName || state.ipcUser?.global_name || state.ipcUser?.username || 'Discord User';
    const tag = state.identity.username || state.ipcUser?.username || '';
    if (nameEl) nameEl.textContent = `${disp} (@${tag})`;
    if (subEl) subEl.textContent = `로컬 Discord IPC (pipe-0) 실시간 연결 완료 · 우측 프리뷰 및 프로필과 자동 동기화됨`;
    if (avatarEl && state.identity.avatarUrl) {
      avatarEl.innerHTML = `<img src="${escapeHtml(state.identity.avatarUrl)}" alt="Avatar" />`;
    }
    if (ipcBadge) {
      ipcBadge.textContent = 'IPC 실시간 연결됨';
      ipcBadge.className = 'dl-pill connected';
    }
  } else {
    if (nameEl) nameEl.textContent = 'Discord 데스크톱 연결 대기 중';
    if (subEl) subEl.textContent = 'Discord 앱을 실행한 뒤 [지금 Discord와 동기화] 버튼을 눌러주세요';
    if (ipcBadge) {
      ipcBadge.textContent = 'IPC 대기';
      ipcBadge.className = 'dl-pill';
    }
  }

  if (restBadge) {
    if (state.discordAuth.userToken) {
      restBadge.textContent = '프로필/상태/소개 직접 제어 활성';
      restBadge.className = 'dl-pill connected';
    } else {
      restBadge.textContent = 'IPC 연동 모드';
      restBadge.className = 'dl-pill';
    }
  }

  const tokInput = $('dlUserTokenInput');
  if (tokInput && document.activeElement !== tokInput) {
    tokInput.value = state.discordAuth.userToken || '';
  }
}

// ============================================================================
// 1. Render Left Sidebar: Custom Profiles List (Supports Empty State & Right-Click)
// ============================================================================
function renderProfilesList() {
  const listEl = $('profilesListContainer');
  if (!listEl) return;
  const query = ($('profileSearchInput')?.value || '').trim().toLowerCase();
  listEl.innerHTML = '';

  if (state.profiles.length === 0) {
    listEl.innerHTML = `
      <div class="profiles-empty-box">
        생성된 프로필이 없습니다.<br/>
        상단 <strong>+ Add new</strong> 버튼을 눌러 새 프로필을 만들어보세요.
      </div>
    `;
    const nameInput = $('inputSelectedProfileName');
    if (nameInput && document.activeElement !== nameInput) {
      nameInput.value = '';
    }
    return;
  }

  const filtered = state.profiles.filter((p) => (p.name || '').toLowerCase().includes(query));

  filtered.forEach((prof) => {
    const btn = document.createElement('div');
    btn.className = `profile-item-btn spotlight-card ${prof.id === state.activeProfileId ? 'active' : ''}`;
    btn.dataset.ctxType = 'profile';
    btn.dataset.ctxId = prof.id;
    const kfCount = Array.isArray(prof.keyframes) ? prof.keyframes.length : 1;

    btn.innerHTML = `
      <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(prof.name)}</span>
      <div class="profile-item-meta">
        ${kfCount > 1 ? `<span class="kf-count-tag">${kfCount} KF</span>` : ''}
        <button class="profile-del-mini" title="프로필 설정" data-cfg-prof="${escapeHtml(prof.id)}">⚙</button>
        <button class="profile-del-mini" title="프로필 삭제" data-del-prof="${escapeHtml(prof.id)}">✕</button>
      </div>
    `;

    btn.addEventListener('click', (e) => {
      if (e.target.closest('[data-del-prof]')) {
        e.stopPropagation();
        deleteProfileById(prof.id);
        return;
      }
      if (e.target.closest('[data-cfg-prof]')) {
        e.stopPropagation();
        openProfileSettingsModalById(prof.id);
        return;
      }
      state.activeProfileId = prof.id;
      state.activeKeyframeIndex = 0;
      const nameInput = $('inputSelectedProfileName');
      if (nameInput) nameInput.value = prof.name;
      persistStudioConfig();
      renderAll();
      scheduleAutoLiveSync();
    });

    listEl.appendChild(btn);
  });

  const activeProf = getActiveProfile();
  const nameInput = $('inputSelectedProfileName');
  if (activeProf && nameInput && document.activeElement !== nameInput) {
    nameInput.value = activeProf.name;
  }
}

function createNewProfile(customName = '') {
  const id = 'prof-' + Date.now();
  const newProf = {
    id,
    name: customName || `Profile ${state.profiles.length + 1}`,
    processTrigger: '',
    keyframes: [
      {
        id: 'kf-' + Date.now(),
        durationSec: 10,
        previewEnabled: true,
        variants: [],
      },
    ],
  };
  state.profiles.push(newProf);
  state.activeProfileId = id;
  state.activeKeyframeIndex = 0;
  markDirty();
  persistStudioConfig();
  renderAll();
  showToast(`새 프로필 "${newProf.name}" 생성 완료`);
  return newProf;
}

function deleteProfileById(profId) {
  const idx = state.profiles.findIndex((p) => p.id === profId);
  if (idx === -1) return;
  const removed = state.profiles.splice(idx, 1)[0];
  if (state.activeProfileId === profId) {
    state.activeProfileId = state.profiles[0]?.id || null;
    state.activeKeyframeIndex = 0;
  }
  persistStudioConfig();
  renderAll();
  showToast(`프로필 "${removed.name}" 삭제됨`);
}

// ============================================================================
// 2. Render Center Canvas: Keyframes & Variant Cards (Zero Pre-filled Presets)
// ============================================================================
let openDropdownKfIndex = null;
let openRpcMoreMenuKey = null;

function renderKeyframesStack() {
  const stack = $('keyframesListWrapper');
  const bottomWrap = $('canvasBottomAddWrap');
  if (!stack) return;

  const prof = getActiveProfile();
  stack.innerHTML = '';

  if (!prof) {
    if (bottomWrap) bottomWrap.classList.add('hidden');
    stack.innerHTML = `
      <div class="reborn-empty-hero spotlight-card">
        <div class="reborn-empty-flame-circle">
          <svg viewBox="0 0 28 28" fill="none">
            <path d="M14.6 2.2C14.1 5.4 11.4 7.8 9.7 10.3C7.6 13.3 6.5 15.8 6.5 18.4C6.5 22.8 9.9 26 14.2 26C18.6 26 21.8 22.6 21.8 18.1C21.8 14.9 20.1 11.6 18.2 9.4C18.5 11.3 17.6 12.6 16.5 13.1C17.4 9.7 16.9 5.6 14.6 2.2Z" fill="url(#rebornFlameOuter)"/>
            <path d="M14.1 11.2C13.6 13.3 11.6 14.8 10.9 16.9C10.3 18.6 10.7 20.8 12.1 22.1C13.3 23.2 15.3 23.1 16.5 21.9C17.8 20.6 18.1 18.4 17.1 16.4C16.4 15.1 14.8 13.6 14.1 11.2Z" fill="url(#rebornFlameCore)"/>
          </svg>
        </div>
        <h3>Reborn RPC 스튜디오에 오신 것을 환영합니다</h3>
        <p>
          초기 프리셋 없이 깨끗한 상태에서 시작합니다.<br/>
          새 프로필을 생성하거나 Discord 계정과 동기화하여 상태, 대명사, 소개, 서버 태그, Rich Presence를 자유롭게 커스텀하세요.
        </p>
        <div class="reborn-empty-actions">
          <button type="button" class="btn-gold-sm glass-shimmer" id="btnHeroCreateFirstProfile" style="height:40px;padding:0 20px;font-size:13px;">
            + 새 커스텀 프로필 만들기
          </button>
          <button type="button" class="btn-preview-sub" id="btnHeroSyncDiscord" style="height:40px;padding:0 18px;font-size:13px;">
            Discord 계정 연동 & 내 프로필 불러오기
          </button>
        </div>
      </div>
    `;
    $('btnHeroCreateFirstProfile')?.addEventListener('click', () => createNewProfile());
    $('btnHeroSyncDiscord')?.addEventListener('click', () => {
      document.querySelector('.rail-btn[data-view="discord-link"]')?.click();
      triggerDiscordSyncNow();
    });
    return;
  }

  if (bottomWrap) bottomWrap.classList.remove('hidden');

  prof.keyframes.forEach((kf, kfIndex) => {
    const isPreviewActive = kfIndex === state.activeKeyframeIndex;
    const card = document.createElement('div');
    card.className = `keyframe-card spotlight-card ${isPreviewActive ? 'active-preview' : ''}`;
    card.dataset.ctxType = 'keyframe';
    card.dataset.ctxKf = String(kfIndex);

    const existingTypes = new Set((kf.variants || []).map((v) => v.type));

    card.innerHTML = `
      <div class="kf-header-row">
        <div class="kf-header-left">
          <span class="kf-hash-pill" data-select-kf="${kfIndex}"># Keyframe ${kfIndex + 1}</span>
          <span class="kf-preview-pill ${isPreviewActive ? '' : 'inactive'}" data-select-kf="${kfIndex}">
            ${isPreviewActive ? 'Preview enabled' : 'Click to preview'}
          </span>
          ${
            prof.keyframes.length > 1
              ? `<div class="reborn-custom-dropdown mini-upward" id="kfDurDrop-${kfIndex}" style="width:118px;"></div>`
              : ''
          }
        </div>
        <div class="kf-header-right">
          <button class="btn-kf-mini" data-cfg-kf="${kfIndex}" title="키프레임 설정">${VECTOR_ICONS.settings}</button>
          <button class="btn-kf-mini" data-dup-kf="${kfIndex}" title="키프레임 복제">${VECTOR_ICONS.copy}</button>
          <button class="btn-kf-mini danger" data-del-kf="${kfIndex}" title="키프레임 삭제">${VECTOR_ICONS.close}</button>
        </div>
      </div>

      <div class="kf-variants-list" id="kfVariantsList-${kfIndex}"></div>

      <div class="add-variant-anchor">
        <button class="btn-add-profile-variant glass-shimmer" data-toggle-variant-menu="${kfIndex}">
          <span style="display:inline-flex;width:13px;height:13px;">${VECTOR_ICONS.plus}</span>
          <span>Add Profile Variant</span>
        </button>

        <div class="variant-dropdown-menu ${openDropdownKfIndex === kfIndex ? '' : 'hidden'}" id="variantMenu-${kfIndex}">
          ${renderVariantMenuOption('custom_status', 'Custom Status', existingTypes, kfIndex)}
          ${renderVariantMenuOption('status', 'Status', existingTypes, kfIndex)}
          ${renderVariantMenuOption('pronouns', 'Pronouns', existingTypes, kfIndex)}
          ${renderVariantMenuOption('bio', 'Bio', existingTypes, kfIndex)}
          ${renderVariantMenuOption('rich_presence', 'Rich Presence', existingTypes, kfIndex)}
          ${renderVariantMenuOption('server_tag', 'Server Tag', existingTypes, kfIndex)}
        </div>
      </div>

      <div class="kf-spark-watermark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/>
        </svg>
      </div>

      <div class="kf-connector-node"></div>
      ${kfIndex < prof.keyframes.length - 1 ? `<div class="kf-connector-line"></div>` : ''}
    `;

    const vListEl = card.querySelector(`#kfVariantsList-${kfIndex}`);
    (kf.variants || []).forEach((variant, vIndex) => {
      const vBlock = buildVariantCardElement(variant, kfIndex, vIndex);
      vListEl.appendChild(vBlock);
    });

    stack.appendChild(card);

    // Screenshot 3 style interactive "Wait [ - ] 10 [ + ] seconds" connector between keyframes
    if (prof.keyframes.length > 1) {
      const waitSec = Math.max(1, Number(kf.durationSec || 10));
      const waitWrap = document.createElement('div');
      waitWrap.className = 'kf-wait-connector-wrap';
      waitWrap.innerHTML = `
        <div class="kf-wait-dotted-line"></div>
        <div class="kf-wait-dot"></div>
        <div class="kf-wait-pill">
          <span class="kf-wait-icon">${VECTOR_ICONS.elem_timer}</span>
          <span class="kf-wait-label">Wait</span>
          <div class="kf-wait-stepper">
            <button type="button" class="kf-wait-step-btn" data-kf-wait-delta="-1" data-kf-idx="${kfIndex}" title="대기 시간 -1초">-</button>
            <input type="number" class="kf-wait-input" data-kf-wait-input="${kfIndex}" value="${waitSec}" min="1" max="3600" />
            <button type="button" class="kf-wait-step-btn" data-kf-wait-delta="1" data-kf-idx="${kfIndex}" title="대기 시간 +1초">+</button>
          </div>
          <span class="kf-wait-unit">seconds</span>
        </div>
        <div class="kf-wait-dot"></div>
        <div class="kf-wait-dotted-line"></div>
      `;
      stack.appendChild(waitWrap);

      waitWrap.querySelectorAll('[data-kf-wait-delta]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = Number(btn.dataset.kfIdx);
          const delta = Number(btn.dataset.kfWaitDelta);
          const cur = Math.max(1, Number(prof.keyframes[idx]?.durationSec || 10));
          const next = Math.max(1, Math.min(3600, cur + delta));
          prof.keyframes[idx].durationSec = next;
          markDirty();
          persistStudioConfig();
          renderKeyframesStack();
        });
      });

      const waitInp = waitWrap.querySelector('[data-kf-wait-input]');
      waitInp?.addEventListener('change', (e) => {
        const idx = Number(waitInp.dataset.kfWaitInput);
        const next = Math.max(1, Math.min(3600, Number(e.target.value || 10)));
        prof.keyframes[idx].durationSec = next;
        markDirty();
        persistStudioConfig();
        renderKeyframesStack();
      });

      const durDropEl = card.querySelector(`#kfDurDrop-${kfIndex}`);
      renderCustomDropdown(durDropEl, {
        value: Number(kf.durationSec || 10),
        options: [
          { value: 5, label: '5s cycle', icon: VECTOR_ICONS.elem_timer },
          { value: 8, label: '8s cycle', icon: VECTOR_ICONS.elem_timer },
          { value: 10, label: '10s cycle', icon: VECTOR_ICONS.elem_timer },
          { value: 15, label: '15s cycle', icon: VECTOR_ICONS.elem_timer },
          { value: 30, label: '30s cycle', icon: VECTOR_ICONS.elem_timer },
        ],
        onChange: (val) => {
          prof.keyframes[kfIndex].durationSec = Number(val);
          markDirty();
          persistStudioConfig();
          renderKeyframesStack();
        },
      });
    }
  });

  bindKeyframeEvents();
}

function renderVariantMenuOption(type, label, existingTypes, kfIndex) {
  const alreadyAdded = existingTypes.has(type);
  return `
    <button class="variant-menu-item ${alreadyAdded ? 'already-added' : ''}" data-add-variant="${type}" data-kf-idx="${kfIndex}">
      <span>${label}</span>
    </button>
  `;
}

function buildVariantCardElement(variant, kfIndex, vIndex) {
  const el = document.createElement('div');
  el.className = 'variant-block spotlight-card';
  el.dataset.ctxType = 'variant';
  el.dataset.ctxKf = String(kfIndex);
  el.dataset.ctxVar = String(vIndex);

  const statusLabels = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    invisible: 'Invisible',
  };

  if (variant.type === 'status') {
    const curStatus = variant.status || 'online';
    el.innerHTML = `
      <div class="variant-card-top">
        <span class="variant-card-heading">Status</span>
        <div style="display:flex;gap:4px;">
          <button class="btn-variant-close" data-cfg-v="${kfIndex}:${vIndex}" title="상태 설정">${VECTOR_ICONS.settings}</button>
          <button class="btn-variant-close" data-remove-v="${kfIndex}:${vIndex}" title="삭제">${VECTOR_ICONS.close}</button>
        </div>
      </div>
      <div class="status-summary-wrap">
        <div class="status-ring-left" data-cycle-status="${kfIndex}:${vIndex}" title="클릭하여 상태 전환">
          <div class="status-big-ring">
            <div class="status-big-dot ${curStatus}"></div>
          </div>
          <div class="status-selected-meta">
            <span class="status-selected-sub">Selected</span>
            <span class="status-selected-label">${statusLabels[curStatus] || 'Online'}</span>
          </div>
        </div>
        <div class="status-mini-pills">
          ${['online', 'idle', 'dnd', 'invisible']
            .map(
              (st) => `
            <button class="status-mini-pill ${curStatus === st ? 'active' : ''}" data-set-status="${kfIndex}:${vIndex}:${st}">
              <span class="status-big-dot ${st}" style="width:9px;height:9px;"></span>
              <span>${statusLabels[st]}</span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    return el;
  }

  if (variant.type === 'rich_presence') {
    const menuKey = `${kfIndex}:${vIndex}`;
    const curPresetName = variant.presetName || '';
    const dispName = resolveDynamicTokens(variant.name || '');
    const dispDetails = resolveDynamicTokens(variant.details || '');

    el.innerHTML = `
      <div class="variant-card-top">
        <span class="variant-card-heading">Rich Presence</span>
        <button class="btn-variant-close" data-remove-v="${kfIndex}:${vIndex}" title="Remove Rich Presence">${VECTOR_ICONS.close}</button>
      </div>
      <div class="rpc-summary-controls">
        <div class="rpc-preset-select-wrap" style="flex:1;min-width:0;">
          <div class="reborn-custom-dropdown" id="rpcPresetDrop-${kfIndex}-${vIndex}"></div>
        </div>
        <button class="btn-rpc-customize" data-open-customizer="${kfIndex}:${vIndex}">
          Customize
        </button>
        <div class="rpc-more-menu-wrap">
          <button class="btn-rpc-more" data-toggle-rpc-more="${menuKey}" title="프리셋 추가 / 복제 / 삭제">
            ${VECTOR_ICONS.dots_vertical}
          </button>
          <div class="rpc-preset-mini-menu ${openRpcMoreMenuKey === menuKey ? '' : 'hidden'}">
            <button class="rpc-preset-mini-item" data-rpc-preset-action="new:${kfIndex}:${vIndex}">
              ${VECTOR_ICONS.plus}
              <span>현재 설정을 프리셋으로 저장</span>
            </button>
            <button class="rpc-preset-mini-item" data-rpc-preset-action="dup:${kfIndex}:${vIndex}">
              ${VECTOR_ICONS.copy}
              <span>현재 프리셋 복제</span>
            </button>
            <button class="rpc-preset-mini-item danger" data-rpc-preset-action="del:${kfIndex}:${vIndex}">
              ${VECTOR_ICONS.trash}
              <span>현재 프리셋 삭제</span>
            </button>
          </div>
        </div>
      </div>
      <div class="rpc-summary-preview-strip">
        ${
          variant.largeImageKey
            ? `<img class="rpc-summary-thumb" src="${escapeHtml(variant.largeImageKey)}" alt=""/>`
            : `<span style="display:inline-flex;width:16px;height:16px;color:#fb923c;">${VECTOR_ICONS.flame}</span>`
        }
        <span style="color:#ffffff;font-weight:700;">${escapeHtml(dispName || '이름 미설정 (Customize 클릭)')}</span>
        <span>·</span>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(dispDetails || '세부 설명 없음')}</span>
      </div>
    `;

    const presetDropEl = el.querySelector(`#rpcPresetDrop-${kfIndex}-${vIndex}`);
    const presetOpts = [
      {
        value: '',
        label: state.rpcPresets.length > 0 ? '직접 커스텀 (프리셋 미선택)' : '직접 커스텀 모드',
        icon: VECTOR_ICONS.flame,
      },
      ...state.rpcPresets.map((p) => {
        const pName = p.name || p.presetName || 'Preset';
        return {
          value: pName,
          label: pName,
          sub: 'RPC Preset',
          icon: VECTOR_ICONS.act_playing,
        };
      }),
    ];

    renderCustomDropdown(presetDropEl, {
      value: curPresetName,
      options: presetOpts,
      onChange: (pickedVal) => {
        const chosenPreset = getPresetByName(pickedVal);
        if (chosenPreset) {
          syncVariantFromPreset(variant, chosenPreset);
          showToast(`RPC 프리셋 "${pickedVal}" 적용됨`);
        } else {
          variant.presetName = '';
        }
        state.activeKeyframeIndex = kfIndex;
        markDirty();
        persistStudioConfig();
        renderKeyframesStack();
        renderLiveDiscordPreview();
      },
    });

    return el;
  }

  if (variant.type === 'custom_status') {
    el.innerHTML = `
      <div class="variant-card-top">
        <span class="variant-card-heading">Custom Status (Discord 커스텀 상태)</span>
        <div style="display:flex;gap:4px;">
          <button class="btn-variant-close" data-cfg-v="${kfIndex}:${vIndex}" title="설정">${VECTOR_ICONS.settings}</button>
          <button class="btn-variant-close" data-remove-v="${kfIndex}:${vIndex}">${VECTOR_ICONS.close}</button>
        </div>
      </div>
      <div class="v-field">
        <label>Status Text (실제 Discord 커스텀 상태 메시지)</label>
        <input type="text" class="v-input" data-v-input="${kfIndex}:${vIndex}:text" value="${escapeHtml(variant.text || '')}" placeholder="커스텀 상태 메시지 입력 ({cpu}, {ram}, {time}, {spotify_track} 사용 가능)" />
      </div>
    `;
    return el;
  }

  if (variant.type === 'server_tag') {
    const ownedOpts = getOwnedServerTagOptions();
    const realTags = (state.identity.availableServerTags || []).filter((x) => x && x.tag && x.guildId);
    const hasOwned = realTags.length > 0;
    const currentVal = variant.text !== undefined ? variant.text : state.identity.serverTagText || '';

    el.innerHTML = `
      <div class="variant-card-top">
        <span class="variant-card-heading">Server Tag (실제 Discord 서버 태그 · Clan)</span>
        <div style="display:flex;gap:4px;">
          <button class="btn-variant-close" data-sync-owned-tags="1" title="Discord에서 내 실제 서버 태그 다시 동기화">${VECTOR_ICONS.sync}</button>
          <button class="btn-variant-close" data-open-owned-tags="1" title="내 보유 서버 태그 관리 열기">${VECTOR_ICONS.settings}</button>
          <button class="btn-variant-close" data-remove-v="${kfIndex}:${vIndex}">${VECTOR_ICONS.close}</button>
        </div>
      </div>
      <div class="v-field">
        <label>실제 보유 중인 서버 태그 선택 (${hasOwned ? `${realTags.length}개 보유 감지됨` : 'Discord 동기화 시 자동 감지'})</label>
        <div class="reborn-custom-dropdown" id="serverTagDrop-${kfIndex}-${vIndex}"></div>
      </div>
    `;

    const tagDropEl = el.querySelector(`#serverTagDrop-${kfIndex}-${vIndex}`);
    renderCustomDropdown(tagDropEl, {
      value: currentVal,
      options: ownedOpts,
      placeholder: hasOwned ? '보유 서버 태그 선택...' : 'Discord에서 내 서버 태그 동기화 필요',
      onChange: (pickedVal, pickedOpt) => {
        variant.text = pickedVal || '';
        variant.guildId = pickedOpt?.guildId || '';
        variant.badgeUrl = pickedOpt?.badgeUrl || '';
        state.identity.serverTagText = pickedVal || '';
        state.identity.serverTagGuildId = pickedOpt?.guildId || '';
        state.identity.serverTagBadge = pickedOpt?.badge || '';
        state.identity.serverTagBadgeUrl = pickedOpt?.badgeUrl || '';
        state.activeKeyframeIndex = kfIndex;
        markDirty();
        persistStudioConfig();
        syncIdentityInputsFromState();
        renderKeyframesStack();
        renderLiveDiscordPreview();
        api.applyDiscordProfile({
          userToken: state.discordAuth.userToken || '',
          serverTagText: state.identity.serverTagText,
          serverTagGuildId: state.identity.serverTagGuildId,
          serverTagBadge: state.identity.serverTagBadge,
          serverTagBadgeUrl: state.identity.serverTagBadgeUrl,
        });
      },
    });

    el.querySelector('[data-sync-owned-tags]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerDiscordSyncNow();
    });

    el.querySelector('[data-open-owned-tags]')?.addEventListener('click', () => {
      document.querySelector('.rail-btn[data-view="identity"]')?.click();
    });

    return el;
  }

  if (variant.type === 'pronouns') {
    el.innerHTML = `
      <div class="variant-card-top">
        <span class="variant-card-heading">Pronouns (대명사)</span>
        <div style="display:flex;gap:4px;">
          <button class="btn-variant-close" data-cfg-v="${kfIndex}:${vIndex}" title="설정">${VECTOR_ICONS.settings}</button>
          <button class="btn-variant-close" data-remove-v="${kfIndex}:${vIndex}">${VECTOR_ICONS.close}</button>
        </div>
      </div>
      <div class="v-field">
        <input type="text" class="v-input" data-v-input="${kfIndex}:${vIndex}:text" value="${escapeHtml(variant.text || '')}" placeholder="대명사 입력 (실제 Discord 프로필과 연동)" />
      </div>
    `;
    return el;
  }

  if (variant.type === 'bio') {
    el.innerHTML = `
      <div class="variant-card-top">
        <span class="variant-card-heading">Bio (내 소개)</span>
        <div style="display:flex;gap:4px;">
          <button class="btn-variant-close" data-cfg-v="${kfIndex}:${vIndex}" title="설정">${VECTOR_ICONS.settings}</button>
          <button class="btn-variant-close" data-remove-v="${kfIndex}:${vIndex}">${VECTOR_ICONS.close}</button>
        </div>
      </div>
      <div class="v-field">
        <textarea class="v-textarea" data-v-input="${kfIndex}:${vIndex}:text" placeholder="내 소개(Bio) 입력 ({cpu}, {ram}, {time} 동적 변수 지원)">${escapeHtml(variant.text || '')}</textarea>
      </div>
    `;
    return el;
  }

  return el;
}

function createDefaultVariant(type) {
  if (type === 'status') return { type: 'status', status: state.identity.status || 'online' };
  if (type === 'custom_status') return { type: 'custom_status', icon: 'flame', text: state.identity.customStatusText || '' };
  if (type === 'server_tag') return { type: 'server_tag', badgeIcon: 'flame', text: state.identity.serverTagText || '' };
  if (type === 'pronouns') return { type: 'pronouns', text: state.identity.pronouns || '' };
  if (type === 'bio') return { type: 'bio', text: state.identity.bio || '' };
  if (type === 'rich_presence') {
    return {
      type: 'rich_presence',
      presetName: '',
      clientId: VALID_DEFAULT_CLIENT_ID,
      activityType: 0,
      activityModeId: 'playing',
      crunchyroll: false,
      platform: 'desktop',
      streamUrl: '',
      name: '',
      details: '',
      state: '',
      timestampMode: 'elapsed',
      customEndMinutes: 45,
      offsetHours: 0,
      offsetMinutes: 0,
      offsetSeconds: 0,
      unlimitedHours: 9999,
      largeImageKey: '',
      largeImageText: '',
      smallImageKey: '',
      smallImageText: '',
      partyCurrent: 0,
      partyMax: 0,
      button1Label: '',
      button1Url: '',
      button2Label: '',
      button2Url: '',
    };
  }
  return { type };
}

function bindKeyframeEvents() {
  const prof = getActiveProfile();
  if (!prof) return;

  document.querySelectorAll('[data-select-kf]').forEach((el) => {
    el.addEventListener('click', () => {
      state.activeKeyframeIndex = Number(el.dataset.selectKf);
      renderKeyframesStack();
      renderLiveDiscordPreview();
      scheduleAutoLiveSync();
    });
  });

  document.querySelectorAll('[data-kf-dur]').forEach((sel) => {
    sel.addEventListener('change', () => {
      const idx = Number(sel.dataset.kfDur);
      prof.keyframes[idx].durationSec = Number(sel.value);
      markDirty();
      persistStudioConfig();
    });
  });

  document.querySelectorAll('[data-cfg-kf]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openKeyframeSettingsModal(Number(btn.dataset.cfgKf));
    });
  });

  document.querySelectorAll('[data-dup-kf]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.dupKf);
      const clone = JSON.parse(JSON.stringify(prof.keyframes[idx]));
      clone.id = 'kf-' + Date.now();
      prof.keyframes.splice(idx + 1, 0, clone);
      state.activeKeyframeIndex = idx + 1;
      markDirty();
      persistStudioConfig();
      renderAll();
      showToast(`Keyframe ${idx + 1} 복제 완료`);
    });
  });

  document.querySelectorAll('[data-del-kf]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.delKf);
      deleteKeyframeByIndex(idx);
    });
  });

  document.querySelectorAll('[data-toggle-variant-menu]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.toggleVariantMenu);
      openDropdownKfIndex = openDropdownKfIndex === idx ? null : idx;
      openRpcMoreMenuKey = null;
      renderKeyframesStack();
    });
  });

  document.querySelectorAll('[data-add-variant]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = item.dataset.addVariant;
      const kfIdx = Number(item.dataset.kfIdx);
      const kf = prof.keyframes[kfIdx];
      openDropdownKfIndex = null;

      const existingIdx = (kf.variants || []).findIndex((v) => v.type === type);
      if (existingIdx !== -1) {
        if (type === 'rich_presence') {
          openRpcCustomizer(kfIdx, existingIdx);
        } else {
          openVariantSettingsModal(kfIdx, existingIdx);
        }
        renderKeyframesStack();
        return;
      }

      const newV = createDefaultVariant(type);
      kf.variants.push(newV);
      state.activeKeyframeIndex = kfIdx;
      markDirty();
      persistStudioConfig();
      renderAll();

      if (type === 'rich_presence') {
        openRpcCustomizer(kfIdx, kf.variants.length - 1);
      }
    });
  });

  document.querySelectorAll('[data-cfg-v]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [kfIdx, vIdx] = btn.dataset.cfgV.split(':').map(Number);
      openVariantSettingsModal(kfIdx, vIdx);
    });
  });

  document.querySelectorAll('[data-remove-v]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [kfIdx, vIdx] = btn.dataset.removeV.split(':').map(Number);
      prof.keyframes[kfIdx].variants.splice(vIdx, 1);
      markDirty();
      persistStudioConfig();
      renderAll();
    });
  });

  document.querySelectorAll('[data-cycle-status]').forEach((el) => {
    el.addEventListener('click', () => {
      const [kfIdx, vIdx] = el.dataset.cycleStatus.split(':').map(Number);
      const order = ['online', 'idle', 'dnd', 'invisible'];
      const v = prof.keyframes[kfIdx].variants[vIdx];
      const next = order[(order.indexOf(v.status || 'online') + 1) % order.length];
      v.status = next;
      state.identity.status = next;
      state.activeKeyframeIndex = kfIdx;
      markDirty();
      persistStudioConfig();
      renderKeyframesStack();
      renderLiveDiscordPreview();
    });
  });

  document.querySelectorAll('[data-set-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [kfIdxStr, vIdxStr, st] = btn.dataset.setStatus.split(':');
      const kfIdx = Number(kfIdxStr);
      const vIdx = Number(vIdxStr);
      prof.keyframes[kfIdx].variants[vIdx].status = st;
      state.identity.status = st;
      state.activeKeyframeIndex = kfIdx;
      markDirty();
      persistStudioConfig();
      renderKeyframesStack();
      renderLiveDiscordPreview();
    });
  });

  document.querySelectorAll('[data-rpc-preset-select]').forEach((sel) => {
    sel.addEventListener('change', () => {
      const [kfIdx, vIdx] = sel.dataset.rpcPresetSelect.split(':').map(Number);
      const variant = prof.keyframes[kfIdx].variants[vIdx];
      const chosenPreset = getPresetByName(sel.value);
      if (chosenPreset) {
        syncVariantFromPreset(variant, chosenPreset);
        showToast(`RPC 프리셋 "${sel.value}" 적용됨`);
      } else {
        variant.presetName = '';
      }
      state.activeKeyframeIndex = kfIdx;
      markDirty();
      persistStudioConfig();
      renderKeyframesStack();
      renderLiveDiscordPreview();
    });
  });

  document.querySelectorAll('[data-open-customizer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [kfIdx, vIdx] = btn.dataset.openCustomizer.split(':').map(Number);
      openRpcCustomizer(kfIdx, vIdx);
    });
  });

  document.querySelectorAll('[data-toggle-rpc-more]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.toggleRpcMore;
      openRpcMoreMenuKey = openRpcMoreMenuKey === key ? null : key;
      openDropdownKfIndex = null;
      renderKeyframesStack();
    });
  });

  document.querySelectorAll('[data-rpc-preset-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const [action, kfIdxStr, vIdxStr] = btn.dataset.rpcPresetAction.split(':');
      const kfIdx = Number(kfIdxStr);
      const vIdx = Number(vIdxStr);
      const variant = prof.keyframes[kfIdx].variants[vIdx];
      openRpcMoreMenuKey = null;

      if (action === 'new') {
        createNewRpcPresetForVariant(variant, kfIdx, vIdx);
      } else if (action === 'dup') {
        duplicateRpcPresetForVariant(variant);
      } else if (action === 'del') {
        deleteRpcPresetForVariant(variant);
      }
    });
  });

  document.querySelectorAll('[data-v-input]').forEach((inp) => {
    inp.addEventListener('input', () => {
      const [kfIdxStr, vIdxStr, field] = inp.dataset.vInput.split(':');
      const kfIdx = Number(kfIdxStr);
      const vIdx = Number(vIdxStr);
      const v = prof.keyframes[kfIdx].variants[vIdx];
      v[field] = inp.value;
      if (v.type === 'pronouns') state.identity.pronouns = inp.value;
      if (v.type === 'bio') state.identity.bio = inp.value;
      if (v.type === 'custom_status') state.identity.customStatusText = inp.value;
      if (v.type === 'server_tag') state.identity.serverTagText = inp.value;
      state.activeKeyframeIndex = kfIdx;
      markDirty();
      persistStudioConfig();
      renderLiveDiscordPreview();
    });
  });

  document.querySelectorAll('[data-set-v-icon]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const [kfIdxStr, vIdxStr, field, iconKey] = chip.dataset.setVIcon.split(':');
      const kfIdx = Number(kfIdxStr);
      const vIdx = Number(vIdxStr);
      prof.keyframes[kfIdx].variants[vIdx][field] = iconKey;
      state.activeKeyframeIndex = kfIdx;
      markDirty();
      persistStudioConfig();
      renderKeyframesStack();
      renderLiveDiscordPreview();
    });
  });
}

function deleteKeyframeByIndex(idx) {
  const prof = getActiveProfile();
  if (!prof) return;
  if (prof.keyframes.length <= 1) {
    prof.keyframes[0].variants = [];
    markDirty();
    persistStudioConfig();
    renderAll();
    showToast('Keyframe의 모든 변형 항목을 비웠습니다.');
    return;
  }
  prof.keyframes.splice(idx, 1);
  if (state.activeKeyframeIndex >= prof.keyframes.length) {
    state.activeKeyframeIndex = prof.keyframes.length - 1;
  }
  markDirty();
  persistStudioConfig();
  renderAll();
  showToast('Keyframe 삭제됨');
}

// ============================================================================
// 3. Rich Presence Preset Management (Clean, Allows 0 Presets)
// ============================================================================
function createNewRpcPresetForVariant(variant, kfIndex, vIndex) {
  const newName =
    ($('rcPresetNameInput')?.value || '').trim() ||
    variant?.presetName ||
    `Preset ${state.rpcPresets.length + 1}`;
  const newPreset = {
    id: 'rpc-' + Date.now(),
    name: newName,
    presetName: newName,
    clientId: sanitizeClientId(variant?.clientId),
    activityType: Number(variant?.activityType ?? 0),
    activityModeId: variant?.activityModeId || 'playing',
    crunchyroll: Boolean(variant?.crunchyroll),
    platform: variant?.platform || 'desktop',
    streamUrl: variant?.streamUrl || '',
    nameField: variant?.name || '',
    details: variant?.details || '',
    state: variant?.state || '',
    timestampMode: variant?.timestampMode || 'elapsed',
    customEndMinutes: Number(variant?.customEndMinutes ?? 45),
    offsetHours: Number(variant?.offsetHours ?? 0),
    offsetMinutes: Number(variant?.offsetMinutes ?? 0),
    offsetSeconds: Number(variant?.offsetSeconds ?? 0),
    unlimitedHours: Number(variant?.unlimitedHours ?? 9999),
    largeImageKey: variant?.largeImageKey || '',
    largeImageText: variant?.largeImageText || '',
    smallImageKey: variant?.smallImageKey || '',
    smallImageText: variant?.smallImageText || '',
    partyCurrent: Number(variant?.partyCurrent ?? 0),
    partyMax: Number(variant?.partyMax ?? 0),
    button1Label: variant?.button1Label || '',
    button1Url: variant?.button1Url || '',
    button2Label: variant?.button2Label || '',
    button2Url: variant?.button2Url || '',
  };
  const existingIdx = state.rpcPresets.findIndex((p) => (p.name || p.presetName) === newName);
  if (existingIdx !== -1) {
    state.rpcPresets[existingIdx] = newPreset;
  } else {
    state.rpcPresets.push(newPreset);
  }
  if (variant) {
    variant.presetName = newName;
  }
  markDirty();
  persistStudioConfig();
  renderAll();
  showToast(`RPC 프리셋 "${newName}" 저장 완료`);
  if (typeof kfIndex === 'number' && typeof vIndex === 'number' && !state.customizer.isOpen) {
    openRpcCustomizer(kfIndex, vIndex);
  }
}

function duplicateRpcPresetForVariant(variant) {
  if (!variant) return;
  const copyName = `${variant.presetName || 'Custom'} Copy`;
  variant.presetName = copyName;
  syncPresetFromVariant(variant);
  markDirty();
  persistStudioConfig();
  renderAll();
  showToast(`프리셋 "${copyName}" 복제됨`);
}

function deleteRpcPresetForVariant(variant) {
  const targetName = variant?.presetName || ($('rcPresetNameInput')?.value || '').trim();
  if (!targetName) {
    showToast('삭제할 프리셋이 선택되어 있지 않습니다.');
    return;
  }
  const idx = state.rpcPresets.findIndex((p) => (p.name || p.presetName) === targetName);
  if (idx !== -1) {
    state.rpcPresets.splice(idx, 1);
  }
  if (variant) {
    variant.presetName = state.rpcPresets[0]?.name || '';
  }
  markDirty();
  persistStudioConfig();
  renderAll();
  if (state.customizer.isOpen) {
    renderRpcCustomizer();
  }
  showToast(`프리셋 "${targetName}" 삭제됨`);
}

// ============================================================================
// 4. Rich Presence Customizer Modal Overlay (With Custom Popups & Pro Timer)
// ============================================================================
function getCustomizerTargetVariant() {
  const prof = getActiveProfile();
  if (!prof) return null;
  const kf = prof.keyframes[state.customizer.kfIndex];
  if (!kf) return null;
  const v = kf.variants[state.customizer.variantIndex];
  if (!v || v.type !== 'rich_presence') return null;
  return v;
}

function openRpcCustomizer(kfIndex, variantIndex) {
  state.activeKeyframeIndex = kfIndex;
  state.customizer.isOpen = true;
  state.customizer.kfIndex = kfIndex;
  state.customizer.variantIndex = variantIndex;
  state.customizer.activeElementId = 'name';
  state.customizer.activityPopupOpen = false;
  state.customizer.platformPopupOpen = false;

  const overlay = $('rpcCustomizerOverlay');
  if (overlay) overlay.classList.remove('hidden');

  const dcCard = $('dcLiveProfileCard');
  if (dcCard) dcCard.classList.add('customizer-focus');

  renderKeyframesStack();
  renderRpcCustomizer();
  renderLiveDiscordPreview();
}

function closeRpcCustomizer() {
  state.customizer.isOpen = false;
  state.customizer.activityPopupOpen = false;
  state.customizer.platformPopupOpen = false;
  const overlay = $('rpcCustomizerOverlay');
  if (overlay) overlay.classList.add('hidden');

  const dcCard = $('dcLiveProfileCard');
  if (dcCard) dcCard.classList.remove('customizer-focus');

  renderKeyframesStack();
  renderLiveDiscordPreview();
}

function isCustomizerElementPopulated(variant, elemId) {
  if (!variant) return false;
  switch (elemId) {
    case 'name':
      return Boolean((variant.name || '').trim());
    case 'details':
      return Boolean((variant.details || '').trim());
    case 'state':
      return Boolean((variant.state || '').trim());
    case 'timer':
      return Boolean(variant.timestampMode && variant.timestampMode !== 'none');
    case 'large_image':
      return Boolean((variant.largeImageKey || '').trim());
    case 'small_image':
      return Boolean((variant.smallImageKey || '').trim());
    case 'party':
      return Number(variant.partyCurrent) > 0 && Number(variant.partyMax) > 0;
    case 'button1':
      return Boolean((variant.button1Label || '').trim() && (variant.button1Url || '').trim());
    case 'button2':
      return Boolean((variant.button2Label || '').trim() && (variant.button2Url || '').trim());
    case 'client_id':
      return Boolean((variant.clientId || '').trim());
    default:
      return false;
  }
}

function renderRpcCustomizer() {
  if (!state.customizer.isOpen) return;
  const variant = getCustomizerTargetVariant();
  if (!variant) {
    closeRpcCustomizer();
    return;
  }

  const presetInput = $('rcPresetNameInput');
  if (presetInput && document.activeElement !== presetInput) {
    presetInput.value = variant.presetName || '';
  }

  renderCustomizerBottomPopups(variant);
  renderCustomizerElementsSidebar(variant);
  renderCustomizerInspector(variant);
}

function renderCustomizerBottomPopups(variant) {
  // 1) Activity Mode Trigger & Upward Popup (Playing, Watching, Listening, Streaming, Competing, Spotify + Crunchyroll)
  const curModeId =
    variant.activityModeId ||
    ACTIVITY_MODE_OPTIONS.find((m) => m.type === Number(variant.activityType ?? 0))?.id ||
    'playing';
  const curModeObj = ACTIVITY_MODE_OPTIONS.find((m) => m.id === curModeId) || ACTIVITY_MODE_OPTIONS[0];

  const actIconEl = $('rcActivityTypeIcon');
  const actLabelEl = $('rcActivityTypeLabel');
  if (actIconEl) actIconEl.innerHTML = variant.crunchyroll ? VECTOR_ICONS.act_crunchyroll : curModeObj.icon;
  if (actLabelEl) actLabelEl.textContent = variant.crunchyroll ? 'Crunchyroll' : curModeObj.label;

  const actMenu = $('rcActivityPopupMenu');
  if (actMenu) {
    actMenu.classList.toggle('hidden', !state.customizer.activityPopupOpen);
    actMenu.innerHTML = `
      ${ACTIVITY_MODE_OPTIONS.map((opt) => {
        const isSelected = curModeId === opt.id && !variant.crunchyroll;
        return `
          <button type="button" class="rc-popup-option ${isSelected ? 'active' : ''}" data-pick-act-mode="${opt.id}">
            <span class="rc-popup-opt-left">
              <span class="rc-popup-opt-icon">${opt.icon}</span>
              <span>${escapeHtml(opt.label)}</span>
            </span>
            ${isSelected ? `<span class="rc-popup-opt-check">${VECTOR_ICONS.check}</span>` : ''}
          </button>
        `;
      }).join('')}
      <div class="rc-popup-divider"></div>
      <button type="button" class="rc-popup-option ${variant.crunchyroll ? 'active' : ''}" data-toggle-crunchyroll="1">
        <span class="rc-popup-opt-left">
          <span class="rc-popup-opt-icon">${VECTOR_ICONS.act_crunchyroll}</span>
          <span>Crunchyroll</span>
        </span>
        <span class="rc-crunchy-box ${variant.crunchyroll ? 'checked' : ''}">${VECTOR_ICONS.check}</span>
      </button>
    `;

    actMenu.querySelectorAll('[data-pick-act-mode]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const picked = ACTIVITY_MODE_OPTIONS.find((m) => m.id === btn.dataset.pickActMode);
        if (picked) {
          variant.activityModeId = picked.id;
          variant.activityType = picked.type;
          variant.crunchyroll = false;
          if (picked.isSpotify && !variant.name) {
            variant.name = 'Spotify';
          }
        }
        state.customizer.activityPopupOpen = false;
        syncPresetFromVariant(variant);
        markDirty();
        persistStudioConfig();
        renderRpcCustomizer();
        renderLiveDiscordPreview();
      });
    });

    actMenu.querySelector('[data-toggle-crunchyroll]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      variant.crunchyroll = !variant.crunchyroll;
      if (variant.crunchyroll) {
        variant.activityType = 3; // Watching
        variant.activityModeId = 'watching';
        if (!variant.name) variant.name = 'Crunchyroll';
      }
      state.customizer.activityPopupOpen = false;
      syncPresetFromVariant(variant);
      markDirty();
      persistStudioConfig();
      renderRpcCustomizer();
      renderLiveDiscordPreview();
    });
  }

  // 2) Platform Trigger & Upward Popup (Desktop, PlayStation, Xbox, Meta Quest)
  const curPlatId = variant.platform || 'desktop';
  const curPlatObj = PLATFORM_OPTIONS.find((p) => p.id === curPlatId) || PLATFORM_OPTIONS[0];

  const platIconEl = $('rcPlatformIcon');
  const platLabelEl = $('rcPlatformLabel');
  if (platIconEl) platIconEl.innerHTML = curPlatObj.icon;
  if (platLabelEl) platLabelEl.textContent = curPlatObj.label;

  const platMenu = $('rcPlatformPopupMenu');
  if (platMenu) {
    platMenu.classList.toggle('hidden', !state.customizer.platformPopupOpen);
    platMenu.innerHTML = PLATFORM_OPTIONS.map((opt) => {
      const isSelected = curPlatId === opt.id;
      return `
        <button type="button" class="rc-popup-option ${isSelected ? 'active' : ''}" data-pick-plat-mode="${opt.id}">
          <span class="rc-popup-opt-left">
            <span class="rc-popup-opt-icon">${opt.icon}</span>
            <span>${escapeHtml(opt.label)}</span>
          </span>
          ${isSelected ? `<span class="rc-popup-opt-check">${VECTOR_ICONS.check}</span>` : ''}
        </button>
      `;
    }).join('');

    platMenu.querySelectorAll('[data-pick-plat-mode]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        variant.platform = btn.dataset.pickPlatMode;
        state.customizer.platformPopupOpen = false;
        syncPresetFromVariant(variant);
        markDirty();
        persistStudioConfig();
        renderRpcCustomizer();
        renderLiveDiscordPreview();
      });
    });
  }
}

function renderCustomizerElementsSidebar(variant) {
  const listEl = $('rcElementsList');
  if (!listEl) return;
  listEl.innerHTML = '';

  CUSTOMIZER_ELEMENTS.forEach((elem) => {
    const isPopulated = isCustomizerElementPopulated(variant, elem.id);
    const isActive = state.customizer.activeElementId === elem.id;

    const btn = document.createElement('button');
    btn.className = `rc-element-btn ${isActive ? 'active' : ''}`;
    btn.innerHTML = `
      ${isPopulated ? `<span class="rc-elem-check">${VECTOR_ICONS.check}</span>` : ''}
      <span class="rc-elem-left">
        ${elem.icon}
        <span>${elem.label}</span>
      </span>
      ${VECTOR_ICONS.chevron_right}
    `;

    btn.addEventListener('click', () => {
      state.customizer.activeElementId = elem.id;
      renderRpcCustomizer();
    });

    listEl.appendChild(btn);
  });
}

function renderCustomizerInspector(variant) {
  const box = $('rcInspectorContent');
  if (!box) return;

  const elemId = state.customizer.activeElementId;
  const elemMeta = CUSTOMIZER_ELEMENTS.find((e) => e.id === elemId) || CUSTOMIZER_ELEMENTS[0];

  const topHeaderHtml = `
    <div class="rc-inspector-top-row">
      <div class="rc-active-element-pill">
        ${elemMeta.icon}
        <span>${elemMeta.label}</span>
      </div>
      <div class="rc-top-action-group">
        <button class="btn-rc-reset" id="btnRcElemReset" title="초기화">
          ${VECTOR_ICONS.reset}
        </button>
        <button class="btn-rc-clear" id="btnRcElemClear" title="항목 비우기">
          ${VECTOR_ICONS.trash}
          <span>Clear</span>
        </button>
      </div>
    </div>
  `;

  let bodyHtml = '';

  if (elemId === 'name') {
    bodyHtml = `
      ${buildFloatingInputBox('Name', 'rcFieldMain', variant.name || '', '활동 이름 입력 (최대 128자)')}
      ${
        Number(variant.activityType) === 1
          ? `<div class="rc-floating-box" style="padding-right:14px;">
              <span class="rc-floating-label">Streaming URL (Twitch / YouTube)</span>
              <input type="text" class="rc-floating-input" id="rcStreamUrlInput" value="${escapeHtml(variant.streamUrl || 'https://twitch.tv/discord')}" placeholder="https://twitch.tv/..." />
            </div>`
          : ''
      }
      <p class="rc-help-paragraph">
        The name can be up to 128 characters long and is required.
      </p>
      <p class="rc-help-paragraph">
        Your name may not always be visible, but it's still important to set one - it can appear on other Discord clients or in the user list below your username.
      </p>
      <p class="rc-help-paragraph">
        In <span class="rc-help-link">certain conditions</span>, entering these names will display a special icon next to them:
      </p>
      <div class="rc-special-chips-row">
        ${SPECIAL_APP_NAMES.map(
          (app) => `
          <button class="rc-app-chip" data-rc-quick-name="${escapeHtml(app.name)}">
            ${app.icon}
            <span>${escapeHtml(app.name)}</span>
          </button>
        `
        ).join('')}
      </div>
    `;
  } else if (elemId === 'details') {
    bodyHtml = `
      ${buildFloatingInputBox('Details', 'rcFieldMain', variant.details || '', '상단 세부 설명 입력 ({cpu}, {ram}, {time} 변수 지원)')}
      <p class="rc-help-paragraph">
        활동 이름 바로 아래 첫 번째 줄에 표시되는 텍스트입니다. 우측 <strong>{}</strong> 버튼으로 실시간 시스템 변수를 삽입할 수 있습니다.
      </p>
    `;
  } else if (elemId === 'state') {
    bodyHtml = `
      ${buildFloatingInputBox('State', 'rcFieldMain', variant.state || '', '하단 보조 상태 입력')}
      <p class="rc-help-paragraph">
        세부 설명(Details) 아래 두 번째 줄 및 파티 인원 옆에 표시되는 텍스트입니다.
      </p>
    `;
  } else if (elemId === 'timer') {
    const mode = variant.timestampMode || 'elapsed';
    bodyHtml = `
      <div class="v-field">
        <label style="font-size:12.5px;color:#cbd5e1;">Timer Mode (타임 모드 선택)</label>
        <div class="status-mini-pills" style="margin-top:6px;">
          ${[
            { id: 'elapsed', label: '실시간 경과 (0:01+)' },
            { id: 'custom_offset', label: '타임 직접 조정 (시/분/초)' },
            { id: 'unlimited', label: '시간 무제한 (9999h+)' },
            { id: 'progress_bar', label: '재생 진행 바 (Progress)' },
            { id: 'remaining', label: '카운트다운 (남은 시간)' },
            { id: 'local_day', label: '오늘 자정 기준' },
            { id: 'none', label: '타이머 끄기 (Off)' },
          ]
            .map(
              (m) => `
            <button class="status-mini-pill ${mode === m.id ? 'active' : ''}" data-rc-timer-mode="${m.id}" style="padding:8px 13px;font-size:12px;">
              ${m.label}
            </button>
          `
            )
            .join('')}
        </div>
      </div>

      ${
        mode === 'custom_offset'
          ? `
        <div class="timer-offset-grid">
          <div class="rc-floating-box" style="padding-right:12px;">
            <span class="rc-floating-label">경과 시간 (Hours)</span>
            <input type="number" class="rc-floating-input" id="rcOffsetHours" value="${Number(variant.offsetHours || 0)}" min="0" max="99999" />
          </div>
          <div class="rc-floating-box" style="padding-right:12px;">
            <span class="rc-floating-label">경과 분 (Minutes)</span>
            <input type="number" class="rc-floating-input" id="rcOffsetMinutes" value="${Number(variant.offsetMinutes || 0)}" min="0" max="59" />
          </div>
          <div class="rc-floating-box" style="padding-right:12px;">
            <span class="rc-floating-label">경과 초 (Seconds)</span>
            <input type="number" class="rc-floating-input" id="rcOffsetSeconds" value="${Number(variant.offsetSeconds || 0)}" min="0" max="59" />
          </div>
        </div>
        <div class="timer-quick-presets">
          <button type="button" class="rc-app-chip" data-quick-offset="1:0:0">+1시간</button>
          <button type="button" class="rc-app-chip" data-quick-offset="10:0:0">10시간</button>
          <button type="button" class="rc-app-chip" data-quick-offset="24:0:0">24시간 (1일)</button>
          <button type="button" class="rc-app-chip" data-quick-offset="100:0:0">100시간</button>
          <button type="button" class="rc-app-chip" data-quick-offset="720:0:0">720시간 (30일)</button>
        </div>
      `
          : ''
      }

      ${
        mode === 'unlimited'
          ? `
        <div class="rc-floating-box" style="padding-right:14px;">
          <span class="rc-floating-label">무제한 표시 시간 (Unlimited Hours · 예: 9999시간)</span>
          <input type="number" class="rc-floating-input" id="rcUnlimitedHours" value="${Number(variant.unlimitedHours || 9999)}" min="100" max="999999" />
        </div>
        <div class="timer-quick-presets">
          <button type="button" class="rc-app-chip" data-quick-unlim="999">999시간 무제한</button>
          <button type="button" class="rc-app-chip" data-quick-unlim="9999">9,999시간 무제한</button>
          <button type="button" class="rc-app-chip" data-quick-unlim="24000">24,000시간 (영구)</button>
        </div>
      `
          : ''
      }

      ${
        mode === 'progress_bar'
          ? `
        <div class="timer-offset-grid">
          <div class="rc-floating-box" style="padding-right:12px;">
            <span class="rc-floating-label">현재 분 (Current Min)</span>
            <input type="number" class="rc-floating-input" id="rcOffsetMinutes" value="${Number(variant.offsetMinutes || 1)}" min="0" max="999" />
          </div>
          <div class="rc-floating-box" style="padding-right:12px;">
            <span class="rc-floating-label">현재 초 (Current Sec)</span>
            <input type="number" class="rc-floating-input" id="rcOffsetSeconds" value="${Number(variant.offsetSeconds || 24)}" min="0" max="59" />
          </div>
          <div class="rc-floating-box" style="padding-right:12px;">
            <span class="rc-floating-label">전체 길이(분 · Total Min)</span>
            <input type="number" class="rc-floating-input" id="rcTimerMinutes" value="${Number(variant.customEndMinutes || 4)}" min="1" max="1440" />
          </div>
        </div>
      `
          : ''
      }

      ${
        mode === 'remaining'
          ? `
        <div class="rc-floating-box" style="padding-right:14px;">
          <span class="rc-floating-label">카운트다운 남은 시간 (분 · Minutes)</span>
          <input type="number" class="rc-floating-input" id="rcTimerMinutes" value="${Number(variant.customEndMinutes || 45)}" min="1" max="10080" />
        </div>
      `
          : ''
      }

      <p class="rc-help-paragraph">
        시간 경과(0:01+), 원하는 시/분/초로 즉시 타임 조정, 9,999시간 이상의 <strong>시간 무제한</strong> 모드, 또는 미디어 진행 바를 자유롭게 설정할 수 있습니다.
      </p>
    `;
  } else if (elemId === 'large_image') {
    bodyHtml = `
      ${buildFloatingInputBox('Large Image URL or Asset Key', 'rcFieldMain', variant.largeImageKey || '', 'https://... 이미지/GIF 주소 입력')}
      ${buildFloatingInputBox('Large Image Hover Tooltip', 'rcFieldSub', variant.largeImageText || '', '마우스 오버 시 표시할 텍스트')}
      <p class="rc-help-paragraph">직접 이미지/GIF HTTPS URL을 입력하거나 내 보관함에서 선택한 이미지를 적용하세요.</p>
      ${
        state.customGallery.length > 0
          ? `<div class="rc-media-mini-grid">
              ${state.customGallery
                .map(
                  (asset) => `
                <div class="rc-media-card ${variant.largeImageKey === asset.url ? 'active' : ''}" data-rc-pick-img="${escapeHtml(asset.url)}" data-rc-pick-name="${escapeHtml(asset.name)}">
                  <img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.name)}" />
                  <span>${escapeHtml(asset.name)}</span>
                </div>
              `
                )
                .join('')}
            </div>`
          : ''
      }
    `;
  } else if (elemId === 'small_image') {
    bodyHtml = `
      ${buildFloatingInputBox('Small Badge Image URL or Asset Key', 'rcFieldMain', variant.smallImageKey || '', 'https://... 우측 하단 원형 배지 이미지 URL')}
      ${buildFloatingInputBox('Small Image Hover Tooltip', 'rcFieldSub', variant.smallImageText || '', '작은 배지 마우스 오버 텍스트')}
      <p class="rc-help-paragraph">우측 하단 원형 소형 배지 이미지 URL을 입력하거나 Clear를 눌러 숨길 수 있습니다.</p>
      ${
        state.customGallery.length > 0
          ? `<div class="rc-media-mini-grid">
              ${state.customGallery
                .map(
                  (asset) => `
                <div class="rc-media-card ${variant.smallImageKey === asset.url ? 'active' : ''}" data-rc-pick-img="${escapeHtml(asset.url)}" data-rc-pick-name="${escapeHtml(asset.name)}">
                  <img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.name)}" />
                  <span>${escapeHtml(asset.name)}</span>
                </div>
              `
                )
                .join('')}
            </div>`
          : ''
      }
    `;
  } else if (elemId === 'party') {
    bodyHtml = `
      <div class="v-row-2">
        <div class="rc-floating-box" style="padding-right:14px;">
          <span class="rc-floating-label">현재 인원 (Current Members)</span>
          <input type="number" class="rc-floating-input" id="rcPartyCur" value="${Number(variant.partyCurrent ?? 0)}" min="0" max="9999" />
        </div>
        <div class="rc-floating-box" style="padding-right:14px;">
          <span class="rc-floating-label">최대 정원 (Max Capacity)</span>
          <input type="number" class="rc-floating-input" id="rcPartyMax" value="${Number(variant.partyMax ?? 0)}" min="0" max="9999" />
        </div>
      </div>
      <div class="timer-quick-presets">
        <button type="button" class="rc-app-chip" data-quick-party="1:1">1 of 1</button>
        <button type="button" class="rc-app-chip" data-quick-party="2:2">2 of 2</button>
        <button type="button" class="rc-app-chip" data-quick-party="2:5">2 of 5</button>
        <button type="button" class="rc-app-chip" data-quick-party="4:4">4 of 4</button>
        <button type="button" class="rc-app-chip" data-quick-party="99:99">99 of 99</button>
      </div>
      <p class="rc-help-paragraph">
        타이머 옆에 파티 인원 아이콘과 <strong>(현재 of 최대)</strong> 표시를 추가합니다. 0으로 설정하면 숨겨집니다.
      </p>
    `;
  } else if (elemId === 'button1') {
    bodyHtml = `
      ${buildFloatingInputBox('Button 1 Label', 'rcFieldMain', variant.button1Label || '', '첫 번째 버튼 텍스트 (최대 32자)')}
      <div class="rc-floating-box" style="padding-right:14px;">
        <span class="rc-floating-label">Button 1 Redirect URL (https://...)</span>
        <input type="text" class="rc-floating-input" id="rcFieldSub" value="${escapeHtml(variant.button1Url || '')}" placeholder="https://..." />
      </div>
      <p class="rc-help-paragraph">
        Rich Presence 하단 첫 번째 인터랙티브 버튼을 설정합니다. 버튼 이름과 https:// 주소를 모두 입력해야 활성화됩니다.
      </p>
    `;
  } else if (elemId === 'button2') {
    bodyHtml = `
      ${buildFloatingInputBox('Button 2 Label', 'rcFieldMain', variant.button2Label || '', '두 번째 버튼 텍스트 (최대 32자)')}
      <div class="rc-floating-box" style="padding-right:14px;">
        <span class="rc-floating-label">Button 2 Redirect URL (https://...)</span>
        <input type="text" class="rc-floating-input" id="rcFieldSub" value="${escapeHtml(variant.button2Url || '')}" placeholder="https://..." />
      </div>
      <p class="rc-help-paragraph">
        Rich Presence 하단 두 번째 인터랙티브 버튼을 설정합니다.
      </p>
    `;
  } else if (elemId === 'client_id') {
    bodyHtml = `
      <div class="rc-floating-box" style="padding-right:14px;">
        <span class="rc-floating-label">Discord Application Client ID</span>
        <input type="text" class="rc-floating-input" id="rcFieldMain" value="${escapeHtml(sanitizeClientId(variant.clientId))}" placeholder="${VALID_DEFAULT_CLIENT_ID}" />
      </div>
      <p class="rc-help-paragraph">
        즉시 작동하는 검증된 Application ID를 선택하거나 본인의 Discord Developer Portal 앱 ID를 입력하세요:
      </p>
      <div class="rc-special-chips-row">
        ${VERIFIED_CLIENT_IDS.map(
          (item) => `
          <button class="rc-app-chip" data-rc-quick-cid="${escapeHtml(item.id)}">
            ${VECTOR_ICONS.elem_client_id}
            <span>${escapeHtml(item.label)}</span>
          </button>
        `
        ).join('')}
      </div>
    `;
  }

  box.innerHTML = topHeaderHtml + bodyHtml;
  bindCustomizerInspectorEvents(variant, elemId);
}

function buildFloatingInputBox(label, inputId, value, placeholder) {
  const allMacros = [
    ...BUILTIN_MACROS,
    ...state.customVariables.map((cv) => ({ token: `{${cv.key}}`, desc: `커스텀 변수 (${cv.value})` })),
  ];
  return `
    <div class="rc-floating-box">
      <span class="rc-floating-label">${escapeHtml(label)}</span>
      <input type="text" class="rc-floating-input" id="${inputId}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" />
      <button class="btn-rc-vars-trigger" data-rc-vars-btn="${inputId}" title="실시간 동적 변수 삽입 {}">{}</button>
      <div class="rc-vars-popover hidden" id="rcVarsPopover-${inputId}">
        <div class="rc-vars-pop-title">Dynamic Variables</div>
        ${allMacros
          .map(
            (m) => `
          <button class="rc-var-option" data-insert-rc-var="${escapeHtml(m.token)}" data-target-input="${inputId}">
            <span>${escapeHtml(m.desc)}</span>
            <code>${escapeHtml(m.token)}</code>
          </button>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

function bindCustomizerInspectorEvents(variant, elemId) {
  const mainInput = $('rcFieldMain');
  const subInput = $('rcFieldSub');

  const commitChange = () => {
    if (variant.presetName) syncPresetFromVariant(variant);
    markDirty();
    persistStudioConfig();
    renderCustomizerElementsSidebar(variant);
    renderLiveDiscordPreview();
  };

  if (mainInput) {
    mainInput.addEventListener('input', () => {
      if (elemId === 'name') variant.name = mainInput.value;
      if (elemId === 'details') variant.details = mainInput.value;
      if (elemId === 'state') variant.state = mainInput.value;
      if (elemId === 'large_image') variant.largeImageKey = mainInput.value;
      if (elemId === 'small_image') variant.smallImageKey = mainInput.value;
      if (elemId === 'button1') variant.button1Label = mainInput.value;
      if (elemId === 'button2') variant.button2Label = mainInput.value;
      if (elemId === 'client_id') variant.clientId = mainInput.value;
      commitChange();
    });
  }

  if (subInput) {
    subInput.addEventListener('input', () => {
      if (elemId === 'large_image') variant.largeImageText = subInput.value;
      if (elemId === 'small_image') variant.smallImageText = subInput.value;
      if (elemId === 'button1') variant.button1Url = subInput.value;
      if (elemId === 'button2') variant.button2Url = subInput.value;
      commitChange();
    });
  }

  $('rcStreamUrlInput')?.addEventListener('input', (e) => {
    variant.streamUrl = e.target.value;
    commitChange();
  });

  document.querySelectorAll('[data-rc-quick-name]').forEach((chip) => {
    chip.addEventListener('click', () => {
      variant.name = chip.dataset.rcQuickName;
      if (mainInput) mainInput.value = variant.name;
      commitChange();
    });
  });

  document.querySelectorAll('[data-rc-quick-cid]').forEach((chip) => {
    chip.addEventListener('click', () => {
      variant.clientId = chip.dataset.rcQuickCid;
      if (mainInput) mainInput.value = variant.clientId;
      commitChange();
      showToast(`App ID ${variant.clientId} 적용됨`);
    });
  });

  document.querySelectorAll('[data-rc-timer-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      variant.timestampMode = btn.dataset.rcTimerMode;
      commitChange();
      renderCustomizerInspector(variant);
    });
  });

  $('rcOffsetHours')?.addEventListener('input', (e) => {
    variant.offsetHours = Math.max(0, Number(e.target.value || 0));
    commitChange();
  });
  $('rcOffsetMinutes')?.addEventListener('input', (e) => {
    variant.offsetMinutes = Math.max(0, Number(e.target.value || 0));
    commitChange();
  });
  $('rcOffsetSeconds')?.addEventListener('input', (e) => {
    variant.offsetSeconds = Math.max(0, Number(e.target.value || 0));
    commitChange();
  });
  $('rcUnlimitedHours')?.addEventListener('input', (e) => {
    variant.unlimitedHours = Math.max(1, Number(e.target.value || 9999));
    commitChange();
  });
  $('rcTimerMinutes')?.addEventListener('input', (e) => {
    variant.customEndMinutes = Math.max(1, Number(e.target.value || 45));
    commitChange();
  });

  document.querySelectorAll('[data-quick-offset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [h, m, s] = btn.dataset.quickOffset.split(':').map(Number);
      variant.offsetHours = h;
      variant.offsetMinutes = m;
      variant.offsetSeconds = s;
      commitChange();
      renderCustomizerInspector(variant);
    });
  });

  document.querySelectorAll('[data-quick-unlim]').forEach((btn) => {
    btn.addEventListener('click', () => {
      variant.unlimitedHours = Number(btn.dataset.quickUnlim);
      commitChange();
      renderCustomizerInspector(variant);
    });
  });

  document.querySelectorAll('[data-quick-party]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [c, m] = btn.dataset.quickParty.split(':').map(Number);
      variant.partyCurrent = c;
      variant.partyMax = m;
      commitChange();
      renderCustomizerInspector(variant);
    });
  });

  const partyCur = $('rcPartyCur');
  const partyMax = $('rcPartyMax');
  if (partyCur) {
    partyCur.addEventListener('input', () => {
      variant.partyCurrent = Math.max(0, Number(partyCur.value || 0));
      commitChange();
    });
  }
  if (partyMax) {
    partyMax.addEventListener('input', () => {
      variant.partyMax = Math.max(0, Number(partyMax.value || 0));
      commitChange();
    });
  }

  document.querySelectorAll('[data-rc-pick-img]').forEach((card) => {
    card.addEventListener('click', () => {
      const url = card.dataset.rcPickImg;
      const name = card.dataset.rcPickName;
      if (elemId === 'large_image') {
        variant.largeImageKey = url;
        if (!variant.largeImageText) variant.largeImageText = name;
      } else if (elemId === 'small_image') {
        variant.smallImageKey = url;
        if (!variant.smallImageText) variant.smallImageText = name;
      }
      commitChange();
      renderCustomizerInspector(variant);
    });
  });

  document.querySelectorAll('[data-rc-vars-btn]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.dataset.rcVarsBtn;
      const pop = $(`rcVarsPopover-${targetId}`);
      if (pop) {
        const willOpen = pop.classList.contains('hidden');
        document.querySelectorAll('.rc-vars-popover').forEach((p) => {
          p.classList.add('hidden');
          p.closest('.rc-floating-box')?.classList.remove('dd-elevated');
        });
        pop.classList.toggle('hidden', !willOpen);
        pop.closest('.rc-floating-box')?.classList.toggle('dd-elevated', willOpen);
      }
    });
  });

  document.querySelectorAll('[data-insert-rc-var]').forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const token = opt.dataset.insertRcVar;
      const targetId = opt.dataset.targetInput;
      const inp = $(targetId);
      if (inp) {
        inp.value = (inp.value ? inp.value + ' ' : '') + token;
        inp.dispatchEvent(new Event('input'));
      }
      const pop = $(`rcVarsPopover-${targetId}`);
      if (pop) pop.classList.add('hidden');
    });
  });

  const clearItem = () => {
    if (elemId === 'name') variant.name = '';
    if (elemId === 'details') variant.details = '';
    if (elemId === 'state') variant.state = '';
    if (elemId === 'timer') variant.timestampMode = 'none';
    if (elemId === 'large_image') {
      variant.largeImageKey = '';
      variant.largeImageText = '';
    }
    if (elemId === 'small_image') {
      variant.smallImageKey = '';
      variant.smallImageText = '';
    }
    if (elemId === 'party') {
      variant.partyCurrent = 0;
      variant.partyMax = 0;
    }
    if (elemId === 'button1') {
      variant.button1Label = '';
      variant.button1Url = '';
    }
    if (elemId === 'button2') {
      variant.button2Label = '';
      variant.button2Url = '';
    }
    if (elemId === 'client_id') {
      variant.clientId = VALID_DEFAULT_CLIENT_ID;
    }
    commitChange();
    renderCustomizerInspector(variant);
    showToast(`${elemId.toUpperCase()} 항목을 초기화했습니다.`);
  };

  $('btnRcElemReset')?.addEventListener('click', clearItem);
  $('btnRcElemClear')?.addEventListener('click', clearItem);
}


// ============================================================================
// 5. Render Right Column: Live Discord Profile & Rich Presence Preview
// ============================================================================
function formatTimer(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function renderLiveDiscordPreview() {
  const prof = getActiveProfile();
  const kf = getActiveKeyframe();
  const totalKfs = prof && Array.isArray(prof.keyframes) ? prof.keyframes.length : 0;

  const counterPill = $('keyframeCounterPill');
  if (counterPill) {
    counterPill.textContent =
      totalKfs > 0 ? `Keyframe ${state.activeKeyframeIndex + 1} of ${totalKfs}` : 'No Profile';
  }

  const variants = kf && Array.isArray(kf.variants) ? kf.variants : [];
  const getVar = (type) => variants.find((v) => v.type === type);

  // 1) Banner & Avatar
  const bannerEl = $('dcProfileBanner');
  if (bannerEl) {
    if (state.identity.bannerUrl) {
      bannerEl.style.background = `url("${state.identity.bannerUrl}") center/cover no-repeat`;
    } else {
      const col = state.identity.bannerColor || '#0e0e12';
      bannerEl.style.background = `linear-gradient(135deg, ${col} 0%, #09090d 100%)`;
    }
  }

  const avatarFrame = $('dcAvatarFrame');
  const defAvatar = $('dcDefaultAvatar');
  const customAvatar = $('dcCustomAvatarImg');
  if (avatarFrame) {
    avatarFrame.className = `dc-avatar-frame ${
      state.identity.avatarDecor && state.identity.avatarDecor !== 'none'
        ? `decor-${state.identity.avatarDecor}`
        : ''
    }`;
  }
  if (state.identity.avatarUrl && state.identity.avatarUrl.trim()) {
    defAvatar?.classList.add('hidden');
    if (customAvatar) {
      customAvatar.src = state.identity.avatarUrl;
      customAvatar.classList.remove('hidden');
    }
  } else {
    defAvatar?.classList.remove('hidden');
    customAvatar?.classList.add('hidden');
  }

  // 2) Status Indicator (Variant overrides Identity)
  const statusVar = getVar('status');
  const effectiveStatus = statusVar?.status || state.identity.status || 'online';
  const statusInd = $('dcStatusIndicator');
  if (statusInd) {
    statusInd.className = `dc-status-indicator ${effectiveStatus}`;
  }

  // 3) Custom Status Bubble
  const csVar = getVar('custom_status');
  const csTextRaw = csVar !== undefined ? csVar.text : state.identity.customStatusText;
  const csBubble = $('dcCustomStatusBubble');
  if (csBubble) {
    const resolvedCs = resolveDynamicTokens(csTextRaw || '');
    if (resolvedCs.trim()) {
      csBubble.classList.remove('hidden');
      const iconEl = $('dcCsIcon');
      const txtEl = $('dcCsText');
      if (iconEl) iconEl.innerHTML = '';
      if (txtEl) txtEl.textContent = resolvedCs;
    } else {
      csBubble.classList.add('hidden');
    }
  }

  // 4) Display Name & Username
  const dispNameEl = $('dcDisplayName');
  const userNameEl = $('dcUsername');
  const dispName =
    state.identity.displayName ||
    state.ipcUser?.global_name ||
    state.ipcUser?.username ||
    'Discord 연동 대기';
  const userName = state.identity.username || state.ipcUser?.username || 'not_linked';
  if (dispNameEl) dispNameEl.textContent = resolveDynamicTokens(dispName);
  if (userNameEl) userNameEl.textContent = userName.startsWith('@') ? userName : `@${userName}`;

  // 5) Real Server Tag Pill (Renders Real Discord Clan Badge Image + Tag Text e.g. [븐라인])
  const tagVar = getVar('server_tag');
  const tagTextRaw = tagVar !== undefined ? tagVar.text : state.identity.serverTagText;
  const tagPill = $('dcServerTagPill');
  if (tagPill) {
    const resolvedTag = resolveDynamicTokens(tagTextRaw || '').trim();
    if (resolvedTag) {
      tagPill.classList.remove('hidden');
      const matchedOwned = (state.identity.availableServerTags || []).find(
        (t) => t && t.tag === resolvedTag
      );
      const guildId = matchedOwned?.guildId || tagVar?.guildId || state.identity.serverTagGuildId || '';
      const badgeHash = matchedOwned?.badge || state.identity.serverTagBadge || '';
      const badgeUrl =
        matchedOwned?.badgeUrl ||
        tagVar?.badgeUrl ||
        state.identity.serverTagBadgeUrl ||
        (guildId && badgeHash
          ? `https://cdn.discordapp.com/clan-badges/${guildId}/${badgeHash}.png?size=32`
          : '');
      const tIcon = $('dcTagIcon');
      const tTxt = $('dcTagText');
      if (tIcon) {
        tIcon.innerHTML = getClanBadgeHtml(guildId, badgeHash, badgeUrl, 14);
      }
      if (tTxt) tTxt.textContent = resolvedTag;
    } else {
      tagPill.classList.add('hidden');
    }
  }

  // 6) Real Discord Account Badges (Zero Fake Vector Badges)
  const badgesBox = $('dcBadgesBox');
  if (badgesBox) {
    const realBadges = Array.isArray(state.identity.badges)
      ? state.identity.badges.filter((b) => b && typeof b === 'object' && b.iconUrl)
      : [];
    if (realBadges.length > 0) {
      badgesBox.classList.remove('hidden');
      badgesBox.innerHTML = realBadges
        .map(
          (b) =>
            `<span class="dc-badge-svg" title="${escapeHtml(b.description || b.id)}"><img src="${escapeHtml(b.iconUrl)}" alt="${escapeHtml(b.id)}" style="width:16px;height:16px;object-fit:contain;display:block;" /></span>`
        )
        .join('');
    } else {
      badgesBox.classList.add('hidden');
      badgesBox.innerHTML = '';
    }
  }

  // 7) Pronouns
  const pronVar = getVar('pronouns');
  const pronRaw = pronVar ? pronVar.text : state.identity.pronouns;
  const pronEl = $('dcPronounsLine');
  if (pronEl) {
    const resolvedPron = resolveDynamicTokens(pronRaw || '');
    if (resolvedPron.trim()) {
      pronEl.textContent = resolvedPron;
      pronEl.style.opacity = '1';
    } else {
      pronEl.textContent = '대명사 (클릭하여 입력)';
      pronEl.style.opacity = '0.45';
    }
  }

  // 8) Bio
  const bioVar = getVar('bio');
  const bioRaw = bioVar ? bioVar.text : state.identity.bio;
  const bioContent = $('dcBioContent');
  if (bioContent) {
    const resolvedBio = resolveDynamicTokens(bioRaw || '');
    if (resolvedBio.trim()) {
      bioContent.textContent = resolvedBio;
      bioContent.style.opacity = '1';
    } else {
      bioContent.textContent = '클릭하여 내 소개(Bio)를 입력하거나 Discord에서 불러오세요.';
      bioContent.style.opacity = '0.45';
    }
  }

  // 9) Rich Presence Activity Card
  const rpcVar = getVar('rich_presence');
  const actSurface = $('dcActivitySurface');
  if (!actSurface) return;

  if (!rpcVar) {
    actSurface.classList.add('hidden');
    updateRawJsonViewer();
    return;
  }

  actSurface.classList.remove('hidden');

  const curModeId =
    rpcVar.activityModeId ||
    ACTIVITY_MODE_OPTIONS.find((m) => m.type === Number(rpcVar.activityType ?? 0))?.id ||
    'playing';
  const modeObj = ACTIVITY_MODE_OPTIONS.find((m) => m.id === curModeId) || ACTIVITY_MODE_OPTIONS[0];
  const platObj = PLATFORM_OPTIONS.find((p) => p.id === (rpcVar.platform || 'desktop')) || PLATFORM_OPTIONS[0];

  const headerEl = $('dcActHeader');
  const platIconEl = $('dcActPlatformIcon');
  const resolvedName = resolveDynamicTokens(rpcVar.name || '');
  const resolvedDetails = resolveDynamicTokens(rpcVar.details || '');
  const resolvedState = resolveDynamicTokens(rpcVar.state || '');

  if (headerEl) {
    const baseHeader = modeObj.headerText || modeObj.label || 'Playing';
    if (rpcVar.crunchyroll) {
      headerEl.textContent = 'Watching Crunchyroll';
    } else if (curModeId === 'competing' && resolvedName) {
      headerEl.textContent = `Competing in ${resolvedName}`;
    } else if (curModeId === 'listening' && resolvedName) {
      headerEl.textContent = `Listening to ${resolvedName}`;
    } else if (curModeId === 'watching' && resolvedName) {
      headerEl.textContent = `Watching ${resolvedName}`;
    } else if (platObj.id !== 'desktop') {
      headerEl.textContent = `${baseHeader} on ${platObj.label}`;
    } else {
      headerEl.textContent = baseHeader;
    }
  }
  if (platIconEl) {
    platIconEl.innerHTML = rpcVar.crunchyroll ? VECTOR_ICONS.act_crunchyroll : platObj.icon;
    platIconEl.title = rpcVar.crunchyroll ? 'Crunchyroll' : platObj.label;
  }

  // Media Images
  const mediaWrap = $('dcActMediaWrap');
  const largeImg = $('dcActLargeImg');
  const largeTip = $('dcActLargeTip');
  const smallWrap = $('dcActSmallWrap');
  const smallImg = $('dcActSmallImg');
  const smallTip = $('dcActSmallTip');

  if (rpcVar.largeImageKey && rpcVar.largeImageKey.trim()) {
    mediaWrap?.classList.remove('hidden');
    if (largeImg) largeImg.src = rpcVar.largeImageKey.trim();
    if (largeTip) largeTip.textContent = resolveDynamicTokens(rpcVar.largeImageText || rpcVar.name || '');

    if (rpcVar.smallImageKey && rpcVar.smallImageKey.trim()) {
      smallWrap?.classList.remove('hidden');
      if (smallImg) smallImg.src = rpcVar.smallImageKey.trim();
      if (smallTip) smallTip.textContent = resolveDynamicTokens(rpcVar.smallImageText || '');
    } else {
      smallWrap?.classList.add('hidden');
    }
  } else {
    mediaWrap?.classList.add('hidden');
  }

  // Activity Text Lines (Zero pre-filled fake defaults)
  const appNameEl = $('dcActAppName');
  const detailsEl = $('dcActDetails');
  const stateEl = $('dcActState');

  if (appNameEl) {
    appNameEl.textContent = resolvedName || '활동 이름 미설정 (클릭하여 입력)';
    appNameEl.style.opacity = resolvedName ? '1' : '0.5';
  }
  if (detailsEl) {
    detailsEl.textContent = resolvedDetails;
    detailsEl.classList.toggle('hidden', !resolvedDetails);
  }
  if (stateEl) {
    stateEl.textContent = resolvedState;
    stateEl.classList.toggle('hidden', !resolvedState);
  }

  // Timer & Party Inline Row + Screenshot 2 Timeline Progress Row (#dcActProgressRow)
  const timerWrap = $('dcActTimerWrap');
  const timerText = $('dcActTimerText');
  const progRow = $('dcActProgressRow');
  const progStart = $('dcProgStartText');
  const progEnd = $('dcProgEndText');
  const progFill = $('dcProgFill');
  const tsMode = rpcVar.timestampMode || 'elapsed';

  if (tsMode === 'none') {
    timerWrap?.classList.add('hidden');
    progRow?.classList.add('hidden');
  } else if (tsMode === 'unlimited') {
    // Screenshot 2 style: 17525:00:00 ── 17525:00:00 timeline bar
    timerWrap?.classList.add('hidden');
    progRow?.classList.remove('hidden');
    const unlimHrs = Math.max(100, Number(rpcVar.unlimitedHours || 17525));
    const mins = Math.floor((state.elapsedSec % 3600) / 60);
    const secs = state.elapsedSec % 60;
    const formattedUnlim = `${unlimHrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (progStart) progStart.textContent = formattedUnlim;
    if (progEnd) progEnd.textContent = `${unlimHrs}:00:00`;
    if (progFill) progFill.style.width = '100%';
  } else if (tsMode === 'progress_bar') {
    timerWrap?.classList.add('hidden');
    progRow?.classList.remove('hidden');
    const baseOffsetSec =
      Number(rpcVar.offsetHours || 0) * 3600 +
      Number(rpcVar.offsetMinutes || 0) * 60 +
      Number(rpcVar.offsetSeconds || 0);
    const curSec = baseOffsetSec + state.elapsedSec;
    const totalSec = Math.max(60, Number(rpcVar.customEndMinutes || 4) * 60 + baseOffsetSec);
    const pct = Math.min(100, Math.max(5, Math.round((curSec / totalSec) * 100)));
    if (progStart) progStart.textContent = formatTimer(curSec);
    if (progEnd) progEnd.textContent = formatTimer(totalSec);
    if (progFill) progFill.style.width = `${pct}%`;
  } else {
    progRow?.classList.add('hidden');
    if (timerWrap && timerText) {
      timerWrap.classList.remove('hidden');
      if (tsMode === 'custom_offset') {
        const baseSec =
          Number(rpcVar.offsetHours || 0) * 3600 +
          Number(rpcVar.offsetMinutes || 0) * 60 +
          Number(rpcVar.offsetSeconds || 0);
        timerText.textContent = formatTimer(baseSec + state.elapsedSec);
      } else if (tsMode === 'remaining') {
        const totalSec = Math.max(60, Number(rpcVar.customEndMinutes || 45) * 60);
        const rem = Math.max(0, totalSec - state.elapsedSec);
        timerText.textContent = `${formatTimer(rem)} left`;
      } else if (tsMode === 'local_day') {
        const now = new Date();
        const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        timerText.textContent = formatTimer(Math.floor((Date.now() - mid) / 1000));
      } else {
        timerText.textContent = formatTimer(state.elapsedSec);
      }
    }
  }

  const partyWrap = $('dcActPartyWrap');
  const partyText = $('dcActPartyText');
  const pCur = Number(rpcVar.partyCurrent ?? 0);
  const pMax = Number(rpcVar.partyMax ?? 0);
  if (partyWrap && partyText) {
    if (pCur > 0 && pMax > 0) {
      partyWrap.classList.remove('hidden');
      partyText.textContent = `(${pCur} of ${pMax})`;
    } else {
      partyWrap.classList.add('hidden');
    }
  }

  // Interactive Buttons (Resolves dynamic tokens like {spotify_link} & {discord_link} in URLs too!)
  const btnsContainer = $('dcActButtons');
  if (btnsContainer) {
    btnsContainer.innerHTML = '';
    const btns = [];
    if ((rpcVar.button1Label || '').trim() && (rpcVar.button1Url || '').trim()) {
      btns.push({
        label: resolveDynamicTokens(rpcVar.button1Label.trim()),
        url: resolveDynamicTokens(rpcVar.button1Url.trim()),
      });
    }
    if ((rpcVar.button2Label || '').trim() && (rpcVar.button2Url || '').trim()) {
      btns.push({
        label: resolveDynamicTokens(rpcVar.button2Label.trim()),
        url: resolveDynamicTokens(rpcVar.button2Url.trim()),
      });
    }

    btns.forEach((b) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dc-act-btn ${state.perspective === 'self' ? 'self-disabled' : ''}`;
      btn.textContent = b.label;
      btn.title = state.perspective === 'self' ? '본인 시점에서는 클릭이 비활성화됩니다' : b.url;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.perspective === 'self') {
          showToast('상단 [타인 시점]으로 전환하면 버튼 링크가 열립니다.');
          return;
        }
        api.openExternal(b.url);
      });
      btnsContainer.appendChild(btn);
    });
  }

  updateRawJsonViewer();
}

// ============================================================================
// 6. Send Keyframe & Profile Mutations to Real Discord IPC + REST API
// ============================================================================
function extractKeyframePayloadAndProfileFields(kf) {
  const variants = kf && Array.isArray(kf.variants) ? kf.variants : [];
  const getVar = (t) => variants.find((v) => v.type === t);

  const statusVar = getVar('status');
  const csVar = getVar('custom_status');
  const pronVar = getVar('pronouns');
  const bioVar = getVar('bio');
  const tagVar = getVar('server_tag');
  const rpcVar = getVar('rich_presence');

  const resolvedServerTagText = resolveDynamicTokens(
    tagVar !== undefined ? tagVar.text : state.identity.serverTagText || ''
  );
  const matchedOwnedTag = (state.identity.availableServerTags || []).find(
    (t) => t && t.tag === resolvedServerTagText
  );

  const profileFields = {
    userToken: state.discordAuth.userToken || '',
    displayName: resolveDynamicTokens(state.identity.displayName || ''),
    status: statusVar?.status || state.identity.status || 'online',
    customStatusText: resolveDynamicTokens(
      csVar !== undefined ? csVar.text : state.identity.customStatusText || ''
    ),
    pronouns: resolveDynamicTokens(
      pronVar !== undefined ? pronVar.text : state.identity.pronouns || ''
    ),
    bio: resolveDynamicTokens(bioVar !== undefined ? bioVar.text : state.identity.bio || ''),
    serverTagText: resolvedServerTagText,
    serverTagGuildId:
      matchedOwnedTag?.guildId || tagVar?.guildId || state.identity.serverTagGuildId || '',
    serverTagBadge: matchedOwnedTag?.badge || state.identity.serverTagBadge || '',
    serverTagBadgeUrl: matchedOwnedTag?.badgeUrl || state.identity.serverTagBadgeUrl || '',
  };

  if (!rpcVar) {
    // Even if Rich Presence variant isn't explicitly added, weave profile fields if present
    const hasAnyVariant = variants.length > 0;
    if (!hasAnyVariant) {
      return { payload: { clearOnly: true }, clientId: VALID_DEFAULT_CLIENT_ID, profileFields };
    }
    return {
      clientId: VALID_DEFAULT_CLIENT_ID,
      profileFields,
      payload: {
        clientId: VALID_DEFAULT_CLIENT_ID,
        name: profileFields.displayName || 'Reborn RPC',
        activityType: 0,
        platform: 'desktop',
        details: profileFields.customStatusText || '',
        state: [profileFields.pronouns, profileFields.serverTagText ? `[${profileFields.serverTagText}]` : '']
          .filter(Boolean)
          .join(' · '),
        timestampMode: 'elapsed',
        largeImageKey: state.identity.avatarUrl || '',
        largeImageText: profileFields.bio || '',
      },
    };
  }

  const clientId = sanitizeClientId(rpcVar.clientId);
  const platObj = PLATFORM_OPTIONS.find((p) => p.id === (rpcVar.platform || 'desktop')) || PLATFORM_OPTIONS[0];
  let finalName = resolveDynamicTokens(rpcVar.name || '');
  if (rpcVar.crunchyroll && !finalName) {
    finalName = 'Crunchyroll';
  } else if (platObj.id !== 'desktop' && finalName && !finalName.toLowerCase().includes(platObj.label.toLowerCase())) {
    finalName = `${finalName} (${platObj.label})`;
  }

  const payload = {
    clientId,
    name: finalName || state.identity.displayName || 'Reborn RPC',
    activityType: Number(rpcVar.activityType ?? 0),
    platform: rpcVar.platform || 'desktop',
    streamUrl: rpcVar.streamUrl || 'https://twitch.tv/discord',
    details: resolveDynamicTokens(rpcVar.details || ''),
    state: resolveDynamicTokens(rpcVar.state || ''),
    timestampMode: rpcVar.timestampMode || 'elapsed',
    customEndMinutes: Number(rpcVar.customEndMinutes ?? 45),
    offsetHours: Number(rpcVar.offsetHours ?? 0),
    offsetMinutes: Number(rpcVar.offsetMinutes ?? 0),
    offsetSeconds: Number(rpcVar.offsetSeconds ?? 0),
    unlimitedHours: Number(rpcVar.unlimitedHours ?? 9999),
    largeImageKey: (rpcVar.largeImageKey || '').trim(),
    largeImageText: resolveDynamicTokens(rpcVar.largeImageText || ''),
    smallImageKey: (rpcVar.smallImageKey || '').trim(),
    smallImageText: resolveDynamicTokens(rpcVar.smallImageText || ''),
    partyCurrent: Number(rpcVar.partyCurrent ?? 0),
    partyMax: Number(rpcVar.partyMax ?? 0),
    button1Label: resolveDynamicTokens(rpcVar.button1Label || ''),
    button1Url: resolveDynamicTokens((rpcVar.button1Url || '').trim()),
    button2Label: resolveDynamicTokens(rpcVar.button2Label || ''),
    button2Url: resolveDynamicTokens((rpcVar.button2Url || '').trim()),
  };

  return { payload, clientId, profileFields };
}

async function sendCurrentKeyframeToDiscord(silent = false, resetTimer = false) {
  const prof = getActiveProfile();
  const kf = getActiveKeyframe();
  if (!prof || !kf) {
    if (!silent) showToast('먼저 새 프로필을 생성해 주세요.');
    return;
  }

  const { payload, clientId, profileFields } = extractKeyframePayloadAndProfileFields(kf);

  const titleEl = $('makeLiveTitle');

  if (!silent && titleEl) titleEl.textContent = 'Sending...';

  const res = await api.updateActivity(payload, clientId, resetTimer, profileFields);

  if (res && res.ok) {
    state.isDirty = false;
    state.isLiveSent = true;
    state.isRpcRunning = true;
    updateProfileStatusPill();
    updateMakeLiveButtonUI();
    if (res.connected !== undefined) {
      updateIpcStatusIndicator({
        connected: res.connected,
        user: res.user,
        identity: res.identity,
      });
    }
    if (!silent) {
      showToast(`"${prof.name}" 프로필이 실제 Discord에 즉시 반영되었습니다! (Sent · 작동 중)`);
    }
  } else {
    if (!silent) {
      showToast(`Discord 반영 대기 중: Discord 데스크톱 앱이 켜져 있는지 확인하세요.`);
    }
  }
}

async function stopDiscordRpcNow(silent = false) {
  await api.clearActivity();
  state.isRpcRunning = false;
  state.isLiveSent = false;
  updateProfileStatusPill();
  updateMakeLiveButtonUI();
  if (!silent) {
    showToast('Discord RPC 작동이 중지되었습니다. (다시 누르면 시작됩니다)');
  }
}

async function toggleRpcStartStop() {
  if (state.isRpcRunning) {
    await stopDiscordRpcNow(false);
  } else {
    let prof = getActiveProfile();
    if (!prof) prof = createNewProfile();
    await sendCurrentKeyframeToDiscord(false, true);
  }
}

async function triggerDiscordSyncNow() {
  const tokenInput = $('dlUserTokenInput');
  if (tokenInput && tokenInput.value.trim()) {
    state.discordAuth.userToken = tokenInput.value.trim();
  }
  showToast('Discord 클라이언트와 실시간 동기화 중...');
  const res = await api.syncDiscord(state.discordAuth.userToken);
  if (res && res.identity) {
    state.identity = { ...state.identity, ...res.identity };
  }
  if (res && res.ipcStatus) {
    updateIpcStatusIndicator({
      ...res.ipcStatus,
      identity: state.identity,
    });
  }

  // Also populate active keyframe variants if user has variants open
  const kf = getActiveKeyframe();
  if (kf && Array.isArray(kf.variants)) {
    kf.variants.forEach((v) => {
      if (v.type === 'status' && state.identity.status) v.status = state.identity.status;
      if (v.type === 'custom_status' && state.identity.customStatusText) v.text = state.identity.customStatusText;
      if (v.type === 'pronouns' && state.identity.pronouns) v.text = state.identity.pronouns;
      if (v.type === 'bio' && state.identity.bio) v.text = state.identity.bio;
      if (v.type === 'server_tag' && state.identity.serverTagText) v.text = state.identity.serverTagText;
    });
  }

  persistStudioConfig();
  syncIdentityInputsFromState();
  renderAll();

  if (state.ipcConnected) {
    showToast(`Discord 계정(${state.identity.displayName || state.identity.username}) 동기화 완료!`);
  } else {
    showToast('로컬 Discord IPC 재연결을 시도했습니다.');
  }
}

function updateRawJsonViewer() {
  const viewer = $('rawJsonViewer');
  if (!viewer) return;
  const kf = getActiveKeyframe();
  if (!kf) {
    viewer.textContent = '// 선택된 프로필 또는 키프레임이 없습니다.';
    return;
  }
  const { payload, profileFields } = extractKeyframePayloadAndProfileFields(kf);
  viewer.textContent = JSON.stringify({ rpcPayload: payload, discordProfileSync: profileFields }, null, 2);
}

// ============================================================================
// 7. Custom Native Right-Click Context Menu (#rebornContextMenu) & Modals
// ============================================================================
function initCustomContextMenu() {
  // Block default browser right-click context menu globally so it behaves like a native .exe
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const profEl = e.target.closest('[data-ctx-type="profile"]');
    const varEl = e.target.closest('[data-ctx-type="variant"]');
    const kfEl = e.target.closest('[data-ctx-type="keyframe"]');
    const vaultEl = e.target.closest('[data-ctx-type="vault-item"]');
    const previewQuickEl = e.target.closest('[data-quick-edit]');

    if (profEl) {
      const profId = profEl.dataset.ctxId;
      const prof = state.profiles.find((p) => p.id === profId);
      if (!prof) return;
      showContextMenu(e.clientX, e.clientY, `Profile · ${prof.name}`, [
        {
          icon: VECTOR_ICONS.play,
          label: 'Discord에 즉시 송출 (Make it Live)',
          action: () => {
            state.activeProfileId = prof.id;
            renderAll();
            sendCurrentKeyframeToDiscord(false, true);
          },
        },
        {
          icon: VECTOR_ICONS.settings,
          label: '프로필 설정 및 이름 변경',
          action: () => openProfileSettingsModalById(prof.id),
        },
        {
          icon: VECTOR_ICONS.copy,
          label: '프로필 복제 (Duplicate)',
          action: () => {
            const clone = JSON.parse(JSON.stringify(prof));
            clone.id = 'prof-' + Date.now();
            clone.name = `${prof.name} Copy`;
            state.profiles.push(clone);
            state.activeProfileId = clone.id;
            persistStudioConfig();
            renderAll();
            showToast(`"${prof.name}" 프로필이 복제되었습니다.`);
          },
        },
        { divider: true },
        {
          icon: VECTOR_ICONS.trash,
          label: '프로필 삭제 (Delete)',
          danger: true,
          action: () => deleteProfileById(prof.id),
        },
      ]);
      return;
    }

    if (varEl) {
      const kfIdx = Number(varEl.dataset.ctxKf);
      const vIdx = Number(varEl.dataset.ctxVar);
      const prof = getActiveProfile();
      const kf = prof?.keyframes?.[kfIdx];
      const v = kf?.variants?.[vIdx];
      if (!v) return;
      showContextMenu(e.clientX, e.clientY, `Variant · ${v.type.toUpperCase()}`, [
        {
          icon: VECTOR_ICONS.settings,
          label: v.type === 'rich_presence' ? 'Rich Presence 커스터마이저 열기' : '상세 설정 및 편집',
          action: () => {
            if (v.type === 'rich_presence') openRpcCustomizer(kfIdx, vIdx);
            else openVariantSettingsModal(kfIdx, vIdx);
          },
        },
        {
          icon: VECTOR_ICONS.reset,
          label: '값 비우기 (초기화)',
          action: () => {
            kf.variants[vIdx] = createDefaultVariant(v.type);
            markDirty();
            persistStudioConfig();
            renderAll();
            showToast('항목 값을 초기화했습니다.');
          },
        },
        { divider: true },
        {
          icon: VECTOR_ICONS.trash,
          label: '이 요소 삭제 (Delete)',
          danger: true,
          action: () => {
            kf.variants.splice(vIdx, 1);
            markDirty();
            persistStudioConfig();
            renderAll();
            showToast('요소가 삭제되었습니다.');
          },
        },
      ]);
      return;
    }

    if (kfEl) {
      const kfIdx = Number(kfEl.dataset.ctxKf);
      const prof = getActiveProfile();
      const kf = prof?.keyframes?.[kfIdx];
      if (!kf) return;
      showContextMenu(e.clientX, e.clientY, `Keyframe #${kfIdx + 1}`, [
        {
          icon: VECTOR_ICONS.settings,
          label: '키프레임 설정 (전환 주기 등)',
          action: () => openKeyframeSettingsModal(kfIdx),
        },
        {
          icon: VECTOR_ICONS.plus,
          label: 'Rich Presence 요소 추가/열기',
          action: () => {
            let rIdx = (kf.variants || []).findIndex((v) => v.type === 'rich_presence');
            if (rIdx === -1) {
              kf.variants.push(createDefaultVariant('rich_presence'));
              rIdx = kf.variants.length - 1;
            }
            markDirty();
            persistStudioConfig();
            renderAll();
            openRpcCustomizer(kfIdx, rIdx);
          },
        },
        {
          icon: VECTOR_ICONS.copy,
          label: '키프레임 복제 (Duplicate)',
          action: () => {
            const clone = JSON.parse(JSON.stringify(kf));
            clone.id = 'kf-' + Date.now();
            prof.keyframes.splice(kfIdx + 1, 0, clone);
            state.activeKeyframeIndex = kfIdx + 1;
            markDirty();
            persistStudioConfig();
            renderAll();
            showToast(`Keyframe #${kfIdx + 1} 복제됨`);
          },
        },
        { divider: true },
        {
          icon: VECTOR_ICONS.trash,
          label: '키프레임 삭제 (Delete)',
          danger: true,
          action: () => deleteKeyframeByIndex(kfIdx),
        },
      ]);
      return;
    }

    if (vaultEl) {
      const assetIdx = Number(vaultEl.dataset.ctxIdx);
      const asset = state.customGallery[assetIdx];
      if (!asset) return;
      showContextMenu(e.clientX, e.clientY, `Media · ${asset.name}`, [
        {
          icon: VECTOR_ICONS.elem_large_img,
          label: 'Large 이미지로 즉시 적용',
          action: () => applyMediaUrlToActiveVariant(asset.url, asset.name, 'large'),
        },
        {
          icon: VECTOR_ICONS.elem_small_img,
          label: 'Small 배지로 즉시 적용',
          action: () => applyMediaUrlToActiveVariant(asset.url, asset.name, 'small'),
        },
        { divider: true },
        {
          icon: VECTOR_ICONS.trash,
          label: '보관함에서 삭제 (Delete)',
          danger: true,
          action: () => {
            state.customGallery.splice(assetIdx, 1);
            persistStudioConfig();
            renderMediaVault();
            showToast('보관함에서 삭제되었습니다.');
          },
        },
      ]);
      return;
    }

    if (previewQuickEl) {
      const targetType = previewQuickEl.dataset.quickEdit;
      showContextMenu(e.clientX, e.clientY, `Discord 프리뷰 · ${targetType.toUpperCase()}`, [
        {
          icon: VECTOR_ICONS.edit,
          label: '이 영역 즉시 커스텀 편집 (Settings)',
          action: () => openQuickIdentityModal(targetType),
        },
        {
          icon: VECTOR_ICONS.link,
          label: 'Discord 실시간 계정 정보 다시 동기화',
          action: () => triggerDiscordSyncNow(),
        },
        { divider: true },
        {
          icon: VECTOR_ICONS.trash,
          label: '이 항목 비우기 (초기화)',
          danger: true,
          action: () => clearIdentityOrVariantField(targetType),
        },
      ]);
      return;
    }

    // Empty space right-click: do NOT show any popup menu (only show on specific items)
    hideContextMenu();
  });

  window.addEventListener('click', () => hideContextMenu());
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideContextMenu();
      closeItemSettingsModal();
    }
  });
}

function showContextMenu(x, y, title, items) {
  const menu = $('rebornContextMenu');
  if (!menu) return;

  let html = `<div class="ctx-menu-header">${escapeHtml(title)}</div>`;
  items.forEach((it, i) => {
    if (it.divider) {
      html += `<div class="ctx-menu-divider"></div>`;
    } else {
      html += `
        <button type="button" class="ctx-menu-item ${it.danger ? 'danger' : ''}" data-ctx-act="${i}">
          <span class="ctx-item-left">
            ${it.icon || VECTOR_ICONS.settings}
            <span>${escapeHtml(it.label)}</span>
          </span>
        </button>
      `;
    }
  });

  menu.innerHTML = html;
  menu.classList.remove('hidden');

  const rect = menu.getBoundingClientRect();
  const maxX = window.innerWidth - (rect.width || 220) - 12;
  const maxY = window.innerHeight - (rect.height || 240) - 12;
  menu.style.left = `${Math.max(10, Math.min(x, maxX))}px`;
  menu.style.top = `${Math.max(10, Math.min(y, maxY))}px`;

  menu.querySelectorAll('[data-ctx-act]').forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const idx = Number(btn.dataset.ctxAct);
      hideContextMenu();
      if (items[idx] && typeof items[idx].action === 'function') {
        items[idx].action();
      }
    });
  });
}

function hideContextMenu() {
  $('rebornContextMenu')?.classList.add('hidden');
}

function deleteKeyframeByIndex(kfIndex) {
  const prof = getActiveProfile();
  if (!prof) return;
  if (prof.keyframes.length <= 1) {
    prof.keyframes[0].variants = [];
    markDirty();
    persistStudioConfig();
    renderAll();
    showToast('키프레임 내부 요소를 모두 비웠습니다.');
    return;
  }
  prof.keyframes.splice(kfIndex, 1);
  if (state.activeKeyframeIndex >= prof.keyframes.length) {
    state.activeKeyframeIndex = Math.max(0, prof.keyframes.length - 1);
  }
  markDirty();
  persistStudioConfig();
  renderAll();
  showToast(`Keyframe #${kfIndex + 1} 삭제됨`);
}

function clearIdentityOrVariantField(targetType) {
  const kf = getActiveKeyframe();
  if (targetType === 'pronouns') {
    state.identity.pronouns = '';
    const v = kf?.variants?.find((x) => x.type === 'pronouns');
    if (v) v.text = '';
  } else if (targetType === 'bio') {
    state.identity.bio = '';
    const v = kf?.variants?.find((x) => x.type === 'bio');
    if (v) v.text = '';
  } else if (targetType === 'custom_status') {
    state.identity.customStatusText = '';
    const v = kf?.variants?.find((x) => x.type === 'custom_status');
    if (v) v.text = '';
  } else if (targetType === 'server_tag') {
    state.identity.serverTagText = '';
    const v = kf?.variants?.find((x) => x.type === 'server_tag');
    if (v) v.text = '';
  } else if (targetType === 'rich_presence' && kf) {
    kf.variants = (kf.variants || []).filter((x) => x.type !== 'rich_presence');
  }
  markDirty();
  persistStudioConfig();
  syncIdentityInputsFromState();
  renderAll();
  showToast('항목이 초기화되었습니다.');
}

// ============================================================================
// 8. Universal Item Settings Modal (#itemSettingsModal)
// ============================================================================
function openUniversalModal({ title, desc, bodyHtml, onSave, onDelete }) {
  const modal = $('itemSettingsModal');
  if (!modal) return;
  if ($('itemSettingsModalTitle')) $('itemSettingsModalTitle').textContent = title || '설정';
  if ($('itemSettingsModalDesc')) $('itemSettingsModalDesc').textContent = desc || '';
  if ($('itemSettingsModalBody')) $('itemSettingsModalBody').innerHTML = bodyHtml || '';

  const delBtn = $('btnItemSettingsDelete');
  if (delBtn) {
    delBtn.classList.toggle('hidden', typeof onDelete !== 'function');
  }

  activeModalCallbacks = { onSave, onDelete };
  modal.classList.remove('hidden');
}

function closeItemSettingsModal() {
  $('itemSettingsModal')?.classList.add('hidden');
  activeModalCallbacks = { onSave: null, onDelete: null };
}

function openProfileSettingsModalById(profId) {
  const prof = state.profiles.find((p) => p.id === profId);
  if (!prof) return;
  openUniversalModal({
    title: `프로필 설정 · ${prof.name}`,
    desc: '프로필 이름 및 실행 프로세스(.exe) 자동 트리거를 설정합니다.',
    bodyHtml: `
      <div class="aux-field">
        <label>프로필 이름 (Profile Name)</label>
        <input type="text" class="aux-input" id="modalProfName" value="${escapeHtml(prof.name)}" placeholder="프로필 이름 입력" />
      </div>
      <div class="aux-field">
        <label>자동 전환 프로세스 트리거 (선택 · 예: VALORANT-Win64-Shipping.exe)</label>
        <input type="text" class="aux-input" id="modalProfTrigger" value="${escapeHtml(prof.processTrigger || '')}" placeholder="실행 파일명 (.exe)" />
      </div>
    `,
    onSave: () => {
      const newName = ($('modalProfName')?.value || '').trim();
      if (newName) prof.name = newName;
      prof.processTrigger = ($('modalProfTrigger')?.value || '').trim();
      markDirty();
      persistStudioConfig();
      renderAll();
      showToast(`프로필 "${prof.name}" 설정이 저장되었습니다.`);
    },
    onDelete: () => deleteProfileById(prof.id),
  });
}

function openKeyframeSettingsModal(kfIndex) {
  const prof = getActiveProfile();
  const kf = prof?.keyframes?.[kfIndex];
  if (!kf) return;
  openUniversalModal({
    title: `Keyframe #${kfIndex + 1} 설정`,
    desc: '키프레임 순환 유지 시간(초)을 설정하거나 키프레임을 삭제할 수 있습니다.',
    bodyHtml: `
      <div class="aux-field">
        <label>키프레임 루프 유지 시간 (초 · Duration Seconds)</label>
        <input type="number" class="aux-input" id="modalKfDuration" value="${Number(kf.durationSec || 10)}" min="3" max="600" />
      </div>
    `,
    onSave: () => {
      kf.durationSec = Math.max(3, Number($('modalKfDuration')?.value || 10));
      markDirty();
      persistStudioConfig();
      renderAll();
      showToast(`Keyframe #${kfIndex + 1} 설정 저장됨`);
    },
    onDelete: () => deleteKeyframeByIndex(kfIndex),
  });
}

function openVariantSettingsModal(kfIndex, vIndex) {
  const prof = getActiveProfile();
  const kf = prof?.keyframes?.[kfIndex];
  const v = kf?.variants?.[vIndex];
  if (!v) return;

  if (v.type === 'rich_presence') {
    openRpcCustomizer(kfIndex, vIndex);
    return;
  }

  let modalStatusVal = v.status || state.identity.status || 'online';
  let modalServerTagVal = v.text !== undefined ? v.text : state.identity.serverTagText || '';

  let bodyHtml = '';
  if (v.type === 'status') {
    bodyHtml = `
      <div class="aux-field">
        <label>Discord 온라인 상태 (Status · 실시간 반영)</label>
        <div class="reborn-custom-dropdown" id="modalDropVarStatus"></div>
      </div>
    `;
  } else if (v.type === 'server_tag') {
    bodyHtml = `
      <div class="aux-field">
        <label>보유 서버 태그 선택 (Server Tag · 보유한 태그만 표시)</label>
        <div class="reborn-custom-dropdown" id="modalDropVarServerTag"></div>
      </div>
    `;
  } else {
    bodyHtml = `
      <div class="aux-field">
        <label>${escapeHtml(v.type.toUpperCase())} 텍스트 ({cpu}, {ram}, {time} 사용 가능)</label>
        <textarea class="aux-input" id="modalVarText" rows="3" placeholder="내용을 입력하세요">${escapeHtml(v.text || '')}</textarea>
      </div>
    `;
  }

  openUniversalModal({
    title: `${v.type.toUpperCase()} 상세 설정`,
    desc: '수정 즉시 프리뷰와 실제 Discord 프로필에 실시간 동기화됩니다.',
    bodyHtml,
    onSave: () => {
      if (v.type === 'status') {
        v.status = modalStatusVal;
        state.identity.status = v.status;
      } else if (v.type === 'server_tag') {
        v.text = modalServerTagVal;
        state.identity.serverTagText = v.text;
      } else if ($('modalVarText')) {
        v.text = $('modalVarText').value;
        if (v.type === 'custom_status') state.identity.customStatusText = v.text;
        if (v.type === 'pronouns') state.identity.pronouns = v.text;
        if (v.type === 'bio') state.identity.bio = v.text;
      }
      markDirty();
      persistStudioConfig();
      syncIdentityInputsFromState();
      renderAll();
      if (state.isRpcRunning) sendCurrentKeyframeToDiscord(true);
      showToast('설정이 저장되고 실시간 반영되었습니다.');
    },
    onDelete: () => {
      kf.variants.splice(vIndex, 1);
      markDirty();
      persistStudioConfig();
      renderAll();
      showToast('요소가 삭제되었습니다.');
    },
  });

  if (v.type === 'status') {
    renderCustomDropdown($('modalDropVarStatus'), getStatusDropdownOptions(), modalStatusVal, (val) => {
      modalStatusVal = val;
      v.status = val;
      state.identity.status = val;
      persistStudioConfig();
      renderLiveDiscordPreview();
      scheduleAutoLiveSync();
    });
  } else if (v.type === 'server_tag') {
    renderCustomDropdown($('modalDropVarServerTag'), getOwnedServerTagOptions(), modalServerTagVal, (val, pickedOpt) => {
      modalServerTagVal = val;
      v.text = val;
      v.guildId = pickedOpt?.guildId || '';
      v.badgeUrl = pickedOpt?.badgeUrl || '';
      state.identity.serverTagText = val;
      state.identity.serverTagGuildId = pickedOpt?.guildId || '';
      state.identity.serverTagBadge = pickedOpt?.badge || '';
      state.identity.serverTagBadgeUrl = pickedOpt?.badgeUrl || '';
      persistStudioConfig();
      renderLiveDiscordPreview();
      scheduleAutoLiveSync();
    });
  }
}

function openQuickIdentityModal(focusSection = 'identity') {
  if (focusSection === 'rich_presence') {
    let prof = getActiveProfile();
    if (!prof) prof = createNewProfile();
    const kf = getActiveKeyframe();
    if (kf) {
      let rIdx = (kf.variants || []).findIndex((v) => v.type === 'rich_presence');
      if (rIdx === -1) {
        kf.variants.push(createDefaultVariant('rich_presence'));
        rIdx = kf.variants.length - 1;
      }
      renderAll();
      openRpcCustomizer(state.activeKeyframeIndex, rIdx);
    }
    return;
  }

  let qmStatusVal = state.identity.status || 'online';
  let qmServerTagVal = state.identity.serverTagText || '';
  const realBadges = Array.isArray(state.identity.badges)
    ? state.identity.badges.filter((b) => b && typeof b === 'object' && b.iconUrl)
    : [];

  openUniversalModal({
    title: 'Discord 프로필 · 상태 · 실제 서버 태그 · 대명사 · 소개 실시간 편집',
    desc: '실제 연동된 Discord 계정의 온라인 상태, 보유 서버 태그(Clan), 표시 이름, 대명사, 소개(Bio)를 실시간 제어합니다.',
    bodyHtml: `
      <div class="aux-grid-2">
        <div class="aux-field">
          <label>표시 이름 (Display Name)</label>
          <input type="text" class="aux-input" id="qmDisplayName" value="${escapeHtml(state.identity.displayName || '')}" placeholder="표시 이름" />
        </div>
        <div class="aux-field">
          <label>온라인 상태 (Status · 실시간 변경)</label>
          <div class="reborn-custom-dropdown" id="qmDropStatus"></div>
        </div>
        <div class="aux-field">
          <label>대명사 (Pronouns)</label>
          <input type="text" class="aux-input" id="qmPronouns" value="${escapeHtml(state.identity.pronouns || '')}" placeholder="대명사 입력" />
        </div>
        <div class="aux-field">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <label style="margin:0;">실제 보유 서버 태그 (Server Tag)</label>
            <button type="button" class="btn-adm-act gold" id="btnQmSyncRealTags" style="height:20px;padding:0 8px;font-size:10px;">Discord 동기화</button>
          </div>
          <div class="reborn-custom-dropdown" id="qmDropServerTag" style="margin-top:4px;"></div>
        </div>
        ${
          realBadges.length > 0
            ? `
        <div class="aux-field" style="grid-column: span 2;">
          <label>내 Discord 계정 실제 보유 배지 (${realBadges.length}개 감지됨)</label>
          <div class="badges-selector-row">
            ${realBadges
              .map(
                (b) => `
              <div class="badge-toggle-pill active" style="cursor:default;">
                <img src="${escapeHtml(b.iconUrl)}" alt="" style="width:16px;height:16px;object-fit:contain;" />
                <span>${escapeHtml(b.description || b.id)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        `
            : ''
        }
        <div class="aux-field" style="grid-column: span 2;">
          <label>커스텀 상태 메시지 (Custom Status · {} 변수 지원)</label>
          <input type="text" class="aux-input" id="qmCustomStatus" value="${escapeHtml(state.identity.customStatusText || '')}" placeholder="상태 말풍선 텍스트 입력 (예: {spotify_track})" />
        </div>
        <div class="aux-field" style="grid-column: span 2;">
          <label>내 소개 (Bio · {} 변수 지원)</label>
          <textarea class="aux-input" id="qmBio" rows="3" placeholder="내 소개(Bio) 입력">${escapeHtml(state.identity.bio || '')}</textarea>
        </div>
      </div>
    `,
    onSave: async () => {
      state.identity.displayName = ($('qmDisplayName')?.value || '').trim();
      state.identity.status = qmStatusVal || 'online';
      state.identity.pronouns = ($('qmPronouns')?.value || '').trim();
      state.identity.serverTagText = qmServerTagVal || '';
      state.identity.customStatusText = ($('qmCustomStatus')?.value || '').trim();
      state.identity.bio = ($('qmBio')?.value || '').trim();

      const selTagObj = (state.identity.availableServerTags || []).find(
        (x) => x && x.tag === state.identity.serverTagText
      );
      if (selTagObj) {
        state.identity.serverTagGuildId = selTagObj.guildId || '';
        state.identity.serverTagBadge = selTagObj.badge || '';
        state.identity.serverTagBadgeUrl = selTagObj.badgeUrl || '';
      } else if (!state.identity.serverTagText) {
        state.identity.serverTagGuildId = '';
        state.identity.serverTagBadge = '';
        state.identity.serverTagBadgeUrl = '';
      }

      const kf = getActiveKeyframe();
      if (kf && Array.isArray(kf.variants)) {
        kf.variants.forEach((v) => {
          if (v.type === 'status') v.status = state.identity.status;
          if (v.type === 'pronouns') v.text = state.identity.pronouns;
          if (v.type === 'server_tag') {
            v.text = state.identity.serverTagText;
            v.guildId = state.identity.serverTagGuildId;
            v.badgeUrl = state.identity.serverTagBadgeUrl;
          }
          if (v.type === 'custom_status') v.text = state.identity.customStatusText;
          if (v.type === 'bio') v.text = state.identity.bio;
        });
      }

      persistStudioConfig();
      syncIdentityInputsFromState();
      renderAll();

      await api.applyDiscordProfile({
        userToken: state.discordAuth.userToken || '',
        displayName: state.identity.displayName,
        status: state.identity.status,
        pronouns: state.identity.pronouns,
        bio: state.identity.bio,
        customStatusText: state.identity.customStatusText,
        serverTagText: state.identity.serverTagText,
        serverTagGuildId: state.identity.serverTagGuildId,
        serverTagBadge: state.identity.serverTagBadge,
        serverTagBadgeUrl: state.identity.serverTagBadgeUrl,
      });
      if (state.isRpcRunning) await sendCurrentKeyframeToDiscord(true);
      showToast('프로필, 상태, 실제 서버 태그, 대명사, 소개가 실시간 반영되었습니다!');
    },
  });

  $('btnQmSyncRealTags')?.addEventListener('click', async () => {
    await triggerDiscordSyncNow();
    qmServerTagVal = state.identity.serverTagText || '';
    renderCustomDropdown($('qmDropServerTag'), getOwnedServerTagOptions(), qmServerTagVal, (val, pickedOpt) => {
      qmServerTagVal = val;
      state.identity.serverTagText = val;
      state.identity.serverTagGuildId = pickedOpt?.guildId || '';
      state.identity.serverTagBadge = pickedOpt?.badge || '';
      state.identity.serverTagBadgeUrl = pickedOpt?.badgeUrl || '';
      persistStudioConfig();
      renderLiveDiscordPreview();
    });
  });

  renderCustomDropdown($('qmDropStatus'), getStatusDropdownOptions(), qmStatusVal, (val) => {
    qmStatusVal = val;
    state.identity.status = val;
    const kf = getActiveKeyframe();
    const stVar = kf?.variants?.find((x) => x.type === 'status');
    if (stVar) stVar.status = val;
    persistStudioConfig();
    renderLiveDiscordPreview();
    scheduleAutoLiveSync();
  });

  renderCustomDropdown($('qmDropServerTag'), getOwnedServerTagOptions(), qmServerTagVal, (val, pickedOpt) => {
    qmServerTagVal = val;
    state.identity.serverTagText = val;
    state.identity.serverTagGuildId = pickedOpt?.guildId || '';
    state.identity.serverTagBadge = pickedOpt?.badge || '';
    state.identity.serverTagBadgeUrl = pickedOpt?.badgeUrl || '';
    const kf = getActiveKeyframe();
    const tagVar = kf?.variants?.find((x) => x.type === 'server_tag');
    if (tagVar) {
      tagVar.text = val;
      tagVar.guildId = pickedOpt?.guildId || '';
      tagVar.badgeUrl = pickedOpt?.badgeUrl || '';
    }
    persistStudioConfig();
    renderLiveDiscordPreview();
    scheduleAutoLiveSync();
  });
}

// ============================================================================
// 9. Auxiliary Studio Panels (Identity, Vault, Telemetry, Triggers)
// ============================================================================
function renderOwnedServerTagsManager() {
  const listEl = $('ownedServerTagsList');
  if (!listEl) return;
  if (!Array.isArray(state.identity.availableServerTags)) {
    state.identity.availableServerTags = [];
  }
  const tags = state.identity.availableServerTags.filter((x) => x && x.tag && x.guildId);
  if (tags.length === 0) {
    listEl.innerHTML = `<span style="font-size:12px;color:#a1a1aa;">현재 감지된 실제 보유 서버 태그가 없습니다. 우측 상단 <strong>[Discord에서 내 실제 서버 태그 동기화]</strong> 버튼을 누르면 실제 적용/보유 중인 서버 태그(Clan)와 배지 아이콘이 자동으로 불러와집니다.</span>`;
    return;
  }
  listEl.innerHTML = tags
    .map((item) => {
      const isSelected = state.identity.serverTagText === item.tag;
      return `
        <div class="badge-toggle-pill ${isSelected ? 'active' : ''}" data-select-owned-tag="${escapeHtml(item.tag)}" style="gap:8px;padding:6px 12px;">
          ${getClanBadgeHtml(item.guildId, item.badge, item.badgeUrl, 16)}
          <strong style="color:#ffffff;">${escapeHtml(item.tag)}</strong>
          <span style="font-size:11px;color:#a1a1aa;">${escapeHtml(item.guildName && item.guildName !== item.tag ? item.guildName : `Guild ID: ${item.guildId}`)}</span>
          ${isSelected ? `<span style="font-size:10px;color:#4ade80;font-weight:700;margin-left:2px;">● 적용 중</span>` : ''}
        </div>
      `;
    })
    .join('');

  listEl.querySelectorAll('[data-select-owned-tag]').forEach((pill) => {
    pill.addEventListener('click', async () => {
      const tagVal = pill.dataset.selectOwnedTag || '';
      const selTagObj = (state.identity.availableServerTags || []).find((x) => x && x.tag === tagVal);
      state.identity.serverTagText = tagVal;
      state.identity.serverTagGuildId = selTagObj?.guildId || '';
      state.identity.serverTagBadge = selTagObj?.badge || '';
      state.identity.serverTagBadgeUrl = selTagObj?.badgeUrl || '';
      const kf = getActiveKeyframe();
      const tagVar = kf?.variants?.find((x) => x.type === 'server_tag');
      if (tagVar) {
        tagVar.text = tagVal;
        tagVar.guildId = state.identity.serverTagGuildId;
        tagVar.badgeUrl = state.identity.serverTagBadgeUrl;
      }
      persistStudioConfig();
      syncIdentityInputsFromState();
      renderAll();
      scheduleAutoLiveSync();
      await api.applyDiscordProfile({
        userToken: state.discordAuth.userToken || '',
        serverTagText: state.identity.serverTagText,
        serverTagGuildId: state.identity.serverTagGuildId,
        serverTagBadge: state.identity.serverTagBadge,
        serverTagBadgeUrl: state.identity.serverTagBadgeUrl,
      });
      showToast(`실제 서버 태그 [${tagVal}] 장착 및 실시간 반영 완료!`);
    });
  });
}

function syncIdentityInputsFromState() {
  const map = {
    idDisplayName: state.identity.displayName || '',
    idUsername: state.identity.username || '',
    idPronouns: state.identity.pronouns || '',
    idCustomStatusText: state.identity.customStatusText || '',
    idBioTextarea: state.identity.bio || '',
    idAvatarUrl: state.identity.avatarUrl || '',
    idBannerUrl: state.identity.bannerUrl || '',
    idBannerColor: state.identity.bannerColor || '#0e0e12',
  };
  for (const [id, val] of Object.entries(map)) {
    const el = $(id);
    if (el && document.activeElement !== el) el.value = val;
  }

  // Render Custom Glassmorphic Dropdowns in Identity View
  renderCustomDropdown(
    $('customDropIdStatus'),
    getStatusDropdownOptions(),
    state.identity.status || 'online',
    async (val) => {
      state.identity.status = val;
      const kf = getActiveKeyframe();
      const stVar = kf?.variants?.find((x) => x.type === 'status');
      if (stVar) stVar.status = val;
      persistStudioConfig();
      renderAll();
      scheduleAutoLiveSync();
      if (state.discordAuth.userToken) {
        await api.applyDiscordProfile({
          userToken: state.discordAuth.userToken,
          status: val,
        });
      }
    }
  );

  renderCustomDropdown(
    $('customDropIdServerTag'),
    getOwnedServerTagOptions(),
    state.identity.serverTagText || '',
    async (val, pickedOpt) => {
      state.identity.serverTagText = val;
      state.identity.serverTagGuildId = pickedOpt?.guildId || '';
      state.identity.serverTagBadge = pickedOpt?.badge || '';
      state.identity.serverTagBadgeUrl = pickedOpt?.badgeUrl || '';
      const kf = getActiveKeyframe();
      const tagVar = kf?.variants?.find((x) => x.type === 'server_tag');
      if (tagVar) {
        tagVar.text = val;
        tagVar.guildId = state.identity.serverTagGuildId;
        tagVar.badgeUrl = state.identity.serverTagBadgeUrl;
      }
      persistStudioConfig();
      renderOwnedServerTagsManager();
      renderAll();
      scheduleAutoLiveSync();
      await api.applyDiscordProfile({
        userToken: state.discordAuth.userToken || '',
        serverTagText: val,
        serverTagGuildId: state.identity.serverTagGuildId,
        serverTagBadge: state.identity.serverTagBadge,
        serverTagBadgeUrl: state.identity.serverTagBadgeUrl,
      });
    }
  );

  renderOwnedServerTagsManager();
  renderBadgesSelector();
}

function renderBadgesSelector() {
  const row = $('badgesSelectorRow');
  if (!row) return;
  const realBadges = Array.isArray(state.identity.badges)
    ? state.identity.badges.filter((b) => b && typeof b === 'object' && b.iconUrl)
    : [];

  if (realBadges.length === 0) {
    row.innerHTML = `<span style="font-size:12px;color:#71717a;">가짜 배지는 모두 제거되었으며, 실제 Discord 계정에 보유 중인 공식 배지가 있을 때만 자동으로 표시됩니다.</span>`;
    return;
  }

  row.innerHTML = realBadges
    .map(
      (b) => `
      <div class="badge-toggle-pill active" style="cursor:default;gap:7px;">
        <img src="${escapeHtml(b.iconUrl)}" alt="${escapeHtml(b.id)}" style="width:16px;height:16px;object-fit:contain;" />
        <span>${escapeHtml(b.description || b.id)}</span>
      </div>
    `
    )
    .join('');
}

function renderCustomVariablesList() {
  const listEl = $('customVarsList');
  if (!listEl) return;
  if (!Array.isArray(state.customVariables) || state.customVariables.length === 0) {
    listEl.innerHTML = `<span style="font-size:12px;color:#71717a;">등록된 커스텀 변수가 없습니다.</span>`;
    return;
  }
  listEl.innerHTML = state.customVariables
    .map(
      (cv, idx) => `
      <div class="badge-toggle-pill active" style="gap:8px;">
        <code>{${escapeHtml(cv.key)}}</code>
        <span>= ${escapeHtml(cv.value)}</span>
        <span data-del-cvar="${idx}" style="cursor:pointer;color:#f87171;margin-left:4px;">✕</span>
      </div>
    `
    )
    .join('');

  listEl.querySelectorAll('[data-del-cvar]').forEach((el) => {
    el.addEventListener('click', () => {
      state.customVariables.splice(Number(el.dataset.delCvar), 1);
      persistStudioConfig();
      renderCustomVariablesList();
      renderLiveDiscordPreview();
    });
  });
}

function renderProcessTriggersTable() {
  const box = $('profilesTriggerTable');
  if (!box) return;
  if (state.profiles.length === 0) {
    box.innerHTML = `<div class="vault-empty">생성된 프로필이 없습니다. 먼저 프로필을 생성해 주세요.</div>`;
    return;
  }
  box.innerHTML = state.profiles
    .map(
      (prof) => `
      <div class="aux-switch-item" style="gap:12px;">
        <div style="min-width:140px;">
          <strong>${escapeHtml(prof.name)}</strong>
          <p>매핑된 실행 파일명(.exe)</p>
        </div>
        <input type="text" class="aux-input" data-prof-trig-input="${escapeHtml(prof.id)}" value="${escapeHtml(prof.processTrigger || '')}" placeholder="예: LeagueClient.exe, Code.exe" style="flex:1;" />
      </div>
    `
    )
    .join('');

  box.querySelectorAll('[data-prof-trig-input]').forEach((inp) => {
    inp.addEventListener('input', () => {
      const p = state.profiles.find((x) => x.id === inp.dataset.profTrigInput);
      if (p) {
        p.processTrigger = inp.value.trim();
        persistStudioConfig();
      }
    });
  });
}

function renderMediaVault() {
  const grid = $('vaultCuratedGrid');
  if (!grid) return;
  if (!Array.isArray(state.customGallery) || state.customGallery.length === 0) {
    grid.innerHTML = `<div class="vault-empty">등록된 커스텀 이미지가 없습니다. 위 입력란에 이미지/GIF URL을 입력하고 [+ 보관함에 추가]를 눌러보세요.</div>`;
    return;
  }
  grid.innerHTML = state.customGallery
    .map(
      (item, idx) => `
      <div class="vault-media-item spotlight-card" data-ctx-type="vault-item" data-ctx-idx="${idx}" data-apply-vault="${idx}">
        <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.name)}" loading="lazy" />
        <span>${escapeHtml(item.name)}</span>
      </div>
    `
    )
    .join('');

  grid.querySelectorAll('[data-apply-vault]').forEach((card) => {
    card.addEventListener('click', () => {
      const item = state.customGallery[Number(card.dataset.applyVault)];
      if (item) applyMediaUrlToActiveVariant(item.url, item.name, state.vaultTargetSlot);
    });
  });
}

function applyMediaUrlToActiveVariant(url, name, slot = 'large') {
  let prof = getActiveProfile();
  if (!prof) prof = createNewProfile();
  const kf = getActiveKeyframe();
  if (!kf) return;
  let rpcVar = (kf.variants || []).find((v) => v.type === 'rich_presence');
  if (!rpcVar) {
    rpcVar = createDefaultVariant('rich_presence');
    kf.variants.push(rpcVar);
  }
  if (slot === 'small') {
    rpcVar.smallImageKey = url;
    if (!rpcVar.smallImageText) rpcVar.smallImageText = name || '';
  } else {
    rpcVar.largeImageKey = url;
    if (!rpcVar.largeImageText) rpcVar.largeImageText = name || '';
  }
  markDirty();
  persistStudioConfig();
  renderAll();
  showToast(`${slot === 'small' ? 'Small 배지' : 'Large 이미지'}에 적용되었습니다.`);
}

// ============================================================================
// 10. SONIQ Dev Dual-Canvas Interactive Aurora + Sparks + Spotlight Engine
// ============================================================================
function initSoniqVisualEngine() {
  const auroraCanvas = $('aurora-canvas');
  const starsCanvas = $('stars-canvas');
  if (!auroraCanvas || !starsCanvas) return;

  const aCtx = auroraCanvas.getContext('2d');
  const sCtx = starsCanvas.getContext('2d');
  let w = (auroraCanvas.width = starsCanvas.width = window.innerWidth);
  let h = (auroraCanvas.height = starsCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = auroraCanvas.width = starsCanvas.width = window.innerWidth;
    h = auroraCanvas.height = starsCanvas.height = window.innerHeight;
  });

  const orbs = [
    { x: w * 0.2, y: h * 0.25, r: 380, vx: 0.22, vy: 0.16, col: 'rgba(255, 255, 255, 0.045)' },
    { x: w * 0.8, y: h * 0.3, r: 420, vx: -0.19, vy: 0.21, col: 'rgba(251, 146, 60, 0.035)' },
    { x: w * 0.5, y: h * 0.78, r: 360, vx: 0.15, vy: -0.18, col: 'rgba(212, 212, 216, 0.03)' },
  ];

  const stars = Array.from({ length: 58 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.4,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -(Math.random() * 0.28 + 0.08),
    a: Math.random() * 0.5 + 0.15,
  }));

  function tick() {
    aCtx.clearRect(0, 0, w, h);
    orbs.forEach((o) => {
      o.x += o.vx;
      o.y += o.vy;
      if (o.x < 0 || o.x > w) o.vx *= -1;
      if (o.y < 0 || o.y > h) o.vy *= -1;
      const g = aCtx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, o.col);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      aCtx.fillStyle = g;
      aCtx.beginPath();
      aCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      aCtx.fill();
    });

    sCtx.clearRect(0, 0, w, h);
    stars.forEach((st) => {
      st.x += st.vx;
      st.y += st.vy;
      if (st.y < -5) {
        st.y = h + 5;
        st.x = Math.random() * w;
      }
      if (st.x < -5) st.x = w + 5;
      if (st.x > w + 5) st.x = -5;
      sCtx.fillStyle = `rgba(255, 255, 255, ${st.a})`;
      sCtx.beginPath();
      sCtx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      sCtx.fill();
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // SONIQ Dev Radial Mouse Spotlight on .spotlight-card
  window.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

// ============================================================================
// 11. Global Event Bindings & Boot Sequence
// ============================================================================
function renderAll() {
  renderProfilesList();
  updateProfileStatusPill();
  renderKeyframesStack();
  renderDiscordLinkBanner();
  renderLiveDiscordPreview();
  renderProcessTriggersTable();
  renderMediaVault();
  renderCustomVariablesList();
  if (state.customizer.isOpen) {
    renderRpcCustomizer();
  }
}

// ============================================================================
// 11. License Authentication Gate & Admin Panel (Password: Mk2010047sxlvlrt!!)
// ============================================================================
let adminGenDurationPreset = '30d';
let adminGenMaxUsersVal = '1';
let adminFilterStatusVal = 'all';
let adminActiveTab = 'licenses';
let lastCreatedKeysList = [];

const ADMIN_DURATION_OPTIONS = [
  { value: '1h', label: '1시간 (1 Hour)' },
  { value: '1d', label: '1일 (24 Hours)' },
  { value: '7d', label: '7일 (1 Week)' },
  { value: '15d', label: '15일 (15 Days)' },
  { value: '30d', label: '30일 (1 Month · 기본)' },
  { value: '90d', label: '90일 (3 Months)' },
  { value: '180d', label: '180일 (6 Months)' },
  { value: '365d', label: '365일 (1 Year)' },
  { value: 'lifetime', label: '영구제 (Lifetime · 무제한)' },
  { value: 'custom', label: '직접 일/시간 지정 (Custom)' },
];

const ADMIN_MAX_USERS_OPTIONS = [
  { value: '1', label: '1명 전용 (1 User · 개인용)' },
  { value: '2', label: '최대 2명 (2 Users)' },
  { value: '5', label: '최대 5명 (5 Users · 팀)' },
  { value: '10', label: '최대 10명 (10 Users)' },
  { value: '999', label: '무제한 인원 (Unlimited Users)' },
];

const ADMIN_FILTER_OPTIONS = [
  { value: 'all', label: '전체 상태 보기' },
  { value: 'active', label: '활성 (사용 중)' },
  { value: 'unused', label: '미사용 (대기)' },
  { value: 'expired', label: '만료됨 (Expired)' },
  { value: 'suspended', label: '정지됨 (Suspended)' },
];

function renderAuthGateState() {
  const gate = $('authGateOverlay');
  const pill = $('topLicenseUserPill');
  const pillText = $('topLicenseUserText');
  const hwidEl = $('authCurrentHwidCode');

  if (hwidEl && state.auth?.currentHwid) {
    hwidEl.textContent = state.auth.currentHwid;
  }

  if (state.auth && state.auth.authenticated && state.auth.user) {
    gate?.classList.add('hidden');
    if (pill && pillText) {
      const u = state.auth.user;
      const lic = state.auth.license;
      const remTxt = lic ? lic.remainingText || '활성' : '인증됨';
      pillText.textContent = `${u.username} · ${remTxt}`;
    }
  } else {
    gate?.classList.remove('hidden');
    if (state.auth && state.auth.reason) {
      showAuthError(state.auth.reason);
    }
  }
}

function showAuthError(msg) {
  const banner = $('authErrorBanner');
  if (!banner) return;
  if (!msg) {
    banner.classList.add('hidden');
    banner.textContent = '';
  } else {
    banner.textContent = msg;
    banner.classList.remove('hidden');
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.authTab === tab);
  });
  $('authPaneLogin')?.classList.toggle('hidden', tab !== 'login');
  $('authPaneRegister')?.classList.toggle('hidden', tab !== 'register');
  showAuthError('');
}

function initAdminDropdowns() {
  renderCustomDropdown($('customDropAdminDuration'), ADMIN_DURATION_OPTIONS, adminGenDurationPreset, (val) => {
    adminGenDurationPreset = val;
    const daysEl = $('admGenDays');
    const hoursEl = $('admGenHours');
    if (val === '1h') {
      if (daysEl) daysEl.value = 0;
      if (hoursEl) hoursEl.value = 1;
    } else if (val === '1d') {
      if (daysEl) daysEl.value = 1;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === '7d') {
      if (daysEl) daysEl.value = 7;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === '15d') {
      if (daysEl) daysEl.value = 15;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === '30d') {
      if (daysEl) daysEl.value = 30;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === '90d') {
      if (daysEl) daysEl.value = 90;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === '180d') {
      if (daysEl) daysEl.value = 180;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === '365d') {
      if (daysEl) daysEl.value = 365;
      if (hoursEl) hoursEl.value = 0;
    } else if (val === 'lifetime') {
      if (daysEl) daysEl.value = 0;
      if (hoursEl) hoursEl.value = 0;
    }
  });

  renderCustomDropdown($('customDropAdminMaxUsers'), ADMIN_MAX_USERS_OPTIONS, adminGenMaxUsersVal, (val) => {
    adminGenMaxUsersVal = val;
  });

  renderCustomDropdown($('customDropAdminFilter'), ADMIN_FILTER_OPTIONS, adminFilterStatusVal, (val) => {
    adminFilterStatusVal = val;
    renderAdminTables();
  });
}

function openAdminPanelModal() {
  const modal = $('adminPanelModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  initAdminDropdowns();

  if (state.admin.unlocked && state.admin.password) {
    $('adminLockPane')?.classList.add('hidden');
    $('adminWorkspacePane')?.classList.remove('hidden');
    refreshAdminOverview();
  } else {
    $('adminLockPane')?.classList.remove('hidden');
    $('adminWorkspacePane')?.classList.add('hidden');
    setTimeout(() => $('adminPasswordInput')?.focus(), 60);
  }
}

async function unlockAdminPanelWithPassword() {
  const pwd = ($('adminPasswordInput')?.value || '').trim();
  if (!pwd) {
    showToast('관리자 비밀번호를 입력해 주세요.');
    return;
  }
  const res = await api.adminOverview(pwd);
  if (!res || !res.ok) {
    showToast(res?.error || '관리자 비밀번호가 일치하지 않습니다.');
    return;
  }
  state.admin.unlocked = true;
  state.admin.password = pwd;
  state.admin.licenses = Array.isArray(res.licenses) ? res.licenses : [];
  state.admin.users = Array.isArray(res.users) ? res.users : [];
  state.admin.stats = res.stats || state.admin.stats;
  state.admin.auditLogs = Array.isArray(res.auditLogs) ? res.auditLogs : [];
  state.admin.engineStatus = res.engineStatus || null;

  $('adminLockPane')?.classList.add('hidden');
  $('adminWorkspacePane')?.classList.remove('hidden');
  initAdminDropdowns();
  renderAdminWorkspace();
  showToast('관리자 패널 잠금이 해제되었습니다.');
}

async function refreshAdminOverview() {
  if (!state.admin.password) return;
  const res = await api.adminOverview(state.admin.password);
  if (res && res.ok) {
    state.admin.licenses = Array.isArray(res.licenses) ? res.licenses : [];
    state.admin.users = Array.isArray(res.users) ? res.users : [];
    state.admin.stats = res.stats || state.admin.stats;
    state.admin.auditLogs = Array.isArray(res.auditLogs) ? res.auditLogs : [];
    state.admin.engineStatus = res.engineStatus || null;
    renderAdminWorkspace();
  }
}

function renderAdminWorkspace() {
  const st = state.admin.stats || {};
  if ($('admStatTotal')) $('admStatTotal').textContent = String(st.totalLicenses ?? 0);
  if ($('admStatActive')) $('admStatActive').textContent = String(st.activeLicenses ?? 0);
  if ($('admStatUnused')) $('admStatUnused').textContent = String(st.unusedLicenses ?? 0);
  if ($('admStatLifetime')) $('admStatLifetime').textContent = String(st.lifetimeLicenses ?? 0);
  if ($('admStatExpired')) $('admStatExpired').textContent = String((st.expiredLicenses ?? 0) + (st.suspendedLicenses ?? 0));
  if ($('admStatUsers')) $('admStatUsers').textContent = String(st.totalUsers ?? 0);

  renderAdminTables();
}

function formatDateTimeKr(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderAdminTables() {
  const search = ($('adminSearchInput')?.value || '').trim().toLowerCase();
  const licWrap = $('adminLicensesListWrap');
  const usrWrap = $('adminUsersListWrap');
  const sysWrap = $('adminSystemListWrap');
  if (!licWrap || !usrWrap) return;

  licWrap.classList.toggle('hidden', adminActiveTab !== 'licenses');
  usrWrap.classList.toggle('hidden', adminActiveTab !== 'users');
  sysWrap?.classList.toggle('hidden', adminActiveTab !== 'system');

  // 1. Render Licenses List
  const filteredLicenses = (state.admin.licenses || []).filter((lic) => {
    const effSt = lic.effectiveStatus || lic.status || 'unused';
    if (adminFilterStatusVal !== 'all' && effSt !== adminFilterStatusVal) return false;
    if (!search) return true;
    const hay = `${lic.key} ${lic.note || ''} ${(lic.boundUsers || []).join(' ')} ${lic.boundHwid || ''} ${lic.durationLabel || ''}`.toLowerCase();
    return hay.includes(search);
  });

  if (filteredLicenses.length === 0) {
    licWrap.innerHTML = `<div class="vault-empty">조건에 해당하는 라이센스가 없습니다. 위 [신규 라이센스 발급]에서 원클릭 프리셋 또는 상세 설정으로 새 라이센스를 생성해 보세요.</div>`;
  } else {
    licWrap.innerHTML = filteredLicenses
      .map((lic) => {
        const effSt = lic.effectiveStatus || lic.status || 'unused';
        const statusLabelMap = {
          active: 'ACTIVE · 사용중',
          unused: 'UNUSED · 미사용',
          expired: 'EXPIRED · 만료됨',
          suspended: 'SUSPENDED · 정지됨',
        };
        const boundStr =
          Array.isArray(lic.boundUsers) && lic.boundUsers.length > 0
            ? lic.boundUsers.join(', ')
            : '미등록';
        const hwidStr = lic.boundHwid ? lic.boundHwid : '미고정 (최초 로그인 시 자동 락)';
        return `
          <div class="admin-lic-row spotlight-card" data-lic-key="${escapeHtml(lic.key)}">
            <div>
              <span class="admin-lic-key" data-copy-lic="${escapeHtml(lic.key)}" title="클릭하여 라이센스 키 복사">${escapeHtml(lic.key)}</span>
              ${lic.note ? `<div style="font-size:11px;color:#a1a1aa;margin-top:3px;">메모: ${escapeHtml(lic.note)}</div>` : ''}
            </div>
            <div>
              <span class="admin-lic-status ${escapeHtml(effSt)}">${statusLabelMap[effSt] || effSt}</span>
            </div>
            <div class="admin-lic-meta">
              <div><strong>기간 설정:</strong> ${escapeHtml(lic.durationLabel || '-')} · <strong>남은 기간:</strong> <span style="color:#fbbf24;font-weight:700;">${escapeHtml(lic.remainingText || '-')}</span></div>
              <div><strong>사용 계정(${(lic.boundUsers || []).length}/${lic.maxUsers || 1}):</strong> ${escapeHtml(boundStr)} · <strong>만료일:</strong> ${lic.isLifetime ? '영구제' : formatDateTimeKr(lic.expiresAt)}</div>
              <div><strong>HWID 기기 락:</strong> <code style="color:${lic.boundHwid ? '#38bdf8' : '#71717a'};font-size:11px;">${escapeHtml(hwidStr)}</code></div>
            </div>
            <div class="admin-lic-actions">
              <button type="button" class="btn-adm-act gold" data-adm-lic-act="copy" data-key="${escapeHtml(lic.key)}" title="라이센스 키 복사">복사</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="add1h" data-key="${escapeHtml(lic.key)}" title="기간 +1시간 연장">+1시간</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="add1d" data-key="${escapeHtml(lic.key)}" title="기간 +1일 연장">+1일</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="add7d" data-key="${escapeHtml(lic.key)}" title="기간 +7일 연장">+7일</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="add30d" data-key="${escapeHtml(lic.key)}" title="기간 +30일 연장">+30일</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="sub1d" data-key="${escapeHtml(lic.key)}" title="기간 -1일 차감">-1일</button>
              <button type="button" class="btn-adm-act gold" data-adm-lic-act="lifetime" data-key="${escapeHtml(lic.key)}" title="영구제(무제한) 전환">영구제</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="bind_hwid" data-key="${escapeHtml(lic.key)}" title="현재 PC의 HWID로 즉시 귀속">현재PC 고정</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="reset_hwid" data-key="${escapeHtml(lic.key)}" title="기기 변경 시 HWID 기기 고정 해제">HWID 초기화</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="custom_edit" data-key="${escapeHtml(lic.key)}" title="기간/인원제한/메모 상세 변경">상세설정</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="toggle_suspend" data-key="${escapeHtml(lic.key)}">${lic.status === 'suspended' ? '정지해제' : '일시정지'}</button>
              <button type="button" class="btn-adm-act" data-adm-lic-act="reset" data-key="${escapeHtml(lic.key)}" title="연동 계정 해제 및 기간 카운트 초기화">초기화</button>
              <button type="button" class="btn-adm-act danger" data-adm-lic-act="delete" data-key="${escapeHtml(lic.key)}" title="라이센스 영구 삭제">삭제</button>
            </div>
          </div>
        `;
      })
      .join('');

    licWrap.querySelectorAll('[data-copy-lic]').forEach((el) => {
      el.addEventListener('click', () => {
        const k = el.dataset.copyLic;
        navigator.clipboard?.writeText(k);
        showToast(`라이센스 키 복사됨: ${k}`);
      });
    });

    licWrap.querySelectorAll('[data-adm-lic-act]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const act = btn.dataset.admLicAct;
        const key = btn.dataset.key;
        if (!key) return;
        const pwd = state.admin.password;

        if (act === 'copy') {
          navigator.clipboard?.writeText(key);
          showToast(`라이센스 키 복사됨: ${key}`);
          return;
        }
        if (act === 'add1h') {
          await api.adminModifyLicense(pwd, { key, action: 'extend_time', addDays: 0, addHours: 1 });
          await refreshAdminOverview();
          showToast(`[${key}] 기간이 +1시간 연장되었습니다.`);
        } else if (act === 'add1d') {
          await api.adminModifyLicense(pwd, { key, action: 'extend_time', addDays: 1, addHours: 0 });
          await refreshAdminOverview();
          showToast(`[${key}] 기간이 +1일 연장되었습니다.`);
        } else if (act === 'add7d') {
          await api.adminModifyLicense(pwd, { key, action: 'extend_time', addDays: 7, addHours: 0 });
          await refreshAdminOverview();
          showToast(`[${key}] 기간이 +7일 연장되었습니다.`);
        } else if (act === 'add30d') {
          await api.adminModifyLicense(pwd, { key, action: 'extend_time', addDays: 30, addHours: 0 });
          await refreshAdminOverview();
          showToast(`[${key}] 기간이 +30일 연장되었습니다.`);
        } else if (act === 'sub1d') {
          await api.adminModifyLicense(pwd, { key, action: 'extend_time', addDays: -1, addHours: 0 });
          await refreshAdminOverview();
          showToast(`[${key}] 기간이 -1일 차감되었습니다.`);
        } else if (act === 'lifetime') {
          await api.adminModifyLicense(pwd, { key, action: 'set_lifetime' });
          await refreshAdminOverview();
          showToast(`[${key}] 영구제(Lifetime)로 전환되었습니다.`);
        } else if (act === 'bind_hwid') {
          await api.adminModifyLicense(pwd, { key, action: 'bind_current_hwid' });
          await refreshAdminOverview();
          showToast(`[${key}] 현재 PC HWID로 고정되었습니다.`);
        } else if (act === 'reset_hwid') {
          await api.adminModifyLicense(pwd, { key, action: 'reset_hwid' });
          await refreshAdminOverview();
          showToast(`[${key}] 라이센스 및 연결 계정의 HWID 기기 고정이 초기화되었습니다.`);
        } else if (act === 'toggle_suspend') {
          const licObj = state.admin.licenses.find((x) => x.key === key);
          const subAct = licObj?.status === 'suspended' ? 'activate' : 'suspend';
          await api.adminModifyLicense(pwd, { key, action: subAct });
          await refreshAdminOverview();
          showToast(subAct === 'suspend' ? `[${key}] 라이센스가 일시정지되었습니다.` : `[${key}] 정지가 해제되었습니다.`);
        } else if (act === 'reset') {
          await api.adminResetLicense(pwd, key);
          await refreshAdminOverview();
          showToast(`[${key}] 라이센스가 미사용 초기 상태로 리셋되었습니다.`);
        } else if (act === 'delete') {
          await api.adminDeleteLicense(pwd, key);
          await refreshAdminOverview();
          showToast(`[${key}] 라이센스가 삭제되었습니다.`);
        } else if (act === 'custom_edit') {
          const licObj = state.admin.licenses.find((x) => x.key === key);
          if (!licObj) return;
          openUniversalModal({
            title: `라이센스 상세 관리 · ${licObj.key}`,
            desc: '유효 기간 재설정, 시간 추가/차감, 최대 인원 제한 및 관리자 메모를 변경합니다.',
            bodyHtml: `
              <div class="aux-grid-2">
                <div class="aux-field">
                  <label>새 유효 기간 (일 · Days)</label>
                  <input type="number" class="aux-input" id="modalLicDays" value="30" min="0" max="36500" />
                </div>
                <div class="aux-field">
                  <label>새 유효 기간 (시간 · Hours)</label>
                  <input type="number" class="aux-input" id="modalLicHours" value="0" min="0" max="999" />
                </div>
                <div class="aux-field">
                  <label>최대 등록 가능 인원 (Max Users)</label>
                  <input type="number" class="aux-input" id="modalLicMaxUsers" value="${Number(licObj.maxUsers || 1)}" min="1" max="999" />
                </div>
                <div class="aux-field">
                  <label>관리자 메모</label>
                  <input type="text" class="aux-input" id="modalLicNote" value="${escapeHtml(licObj.note || '')}" placeholder="메모 입력" />
                </div>
              </div>
            `,
            onSave: async () => {
              const d = Number($('modalLicDays')?.value || 0);
              const h = Number($('modalLicHours')?.value || 0);
              const maxU = Number($('modalLicMaxUsers')?.value || 1);
              const note = ($('modalLicNote')?.value || '').trim();
              await api.adminModifyLicense(pwd, {
                key: licObj.key,
                action: 'set_duration',
                durationDays: d,
                durationHours: h,
                isLifetime: d === 0 && h === 0,
              });
              await api.adminModifyLicense(pwd, {
                key: licObj.key,
                action: 'set_max_users',
                maxUsers: maxU,
              });
              await api.adminModifyLicense(pwd, {
                key: licObj.key,
                action: 'set_note',
                note,
              });
              await refreshAdminOverview();
              showToast(`[${licObj.key}] 상세 설정이 업데이트되었습니다.`);
            },
            onDelete: async () => {
              await api.adminDeleteLicense(pwd, licObj.key);
              await refreshAdminOverview();
              showToast(`[${licObj.key}] 라이센스가 삭제되었습니다.`);
            },
          });
        }
      });
    });
  }

  // 2. Render Registered Users List
  const filteredUsers = (state.admin.users || []).filter((u) => {
    if (!search) return true;
    const hay = `${u.username} ${u.licenseKey || ''} ${u.licenseStatus || ''} ${u.boundHwid || ''}`.toLowerCase();
    return hay.includes(search);
  });

  if (filteredUsers.length === 0) {
    usrWrap.innerHTML = `<div class="vault-empty">가입된 회원이 없습니다.</div>`;
  } else {
    usrWrap.innerHTML = filteredUsers
      .map((u) => {
        const effSt = u.suspended ? 'suspended' : u.licenseStatus || 'active';
        return `
          <div class="admin-lic-row spotlight-card">
            <div>
              <strong style="font-size:14px;color:#fafafa;">@${escapeHtml(u.username)}</strong>
              <div style="font-size:11px;color:#a1a1aa;margin-top:2px;">가입일: ${formatDateTimeKr(u.createdAt)}</div>
            </div>
            <div>
              <span class="admin-lic-status ${escapeHtml(effSt)}">${u.suspended ? '계정 정지됨' : escapeHtml((u.licenseStatus || 'ACTIVE').toUpperCase())}</span>
            </div>
            <div class="admin-lic-meta">
              <div><strong>등록 라이센스:</strong> <code style="color:#fbbf24;">${escapeHtml(u.licenseKey || '-')}</code></div>
              <div><strong>남은 기간:</strong> ${escapeHtml(u.remainingText || '-')} · <strong>최근 로그인:</strong> ${formatDateTimeKr(u.lastLoginAt)}</div>
              <div><strong>등록된 HWID:</strong> <code style="color:${u.boundHwid ? '#38bdf8' : '#71717a'};font-size:11px;">${escapeHtml(u.boundHwid || '미고정')}</code></div>
            </div>
            <div class="admin-lic-actions">
              <button type="button" class="btn-adm-act gold" data-adm-usr-act="reset_hwid" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">HWID 초기화</button>
              <button type="button" class="btn-adm-act" data-adm-usr-act="bind_hwid" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">현재PC 고정</button>
              <button type="button" class="btn-adm-act" data-adm-usr-act="ext7d" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">기간 +7일</button>
              <button type="button" class="btn-adm-act" data-adm-usr-act="ext30d" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">기간 +30일</button>
              <button type="button" class="btn-adm-act" data-adm-usr-act="rebind_lic" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">라이센스 변경</button>
              <button type="button" class="btn-adm-act" data-adm-usr-act="reset_pw" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">비번 변경</button>
              <button type="button" class="btn-adm-act" data-adm-usr-act="toggle_suspend" data-uid="${escapeHtml(u.id)}">${u.suspended ? '정지 해제' : '계정 정지'}</button>
              <button type="button" class="btn-adm-act danger" data-adm-usr-act="delete" data-uid="${escapeHtml(u.id)}" data-uname="${escapeHtml(u.username)}">회원 삭제</button>
            </div>
          </div>
        `;
      })
      .join('');

    usrWrap.querySelectorAll('[data-adm-usr-act]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const act = btn.dataset.admUsrAct;
        const userId = btn.dataset.uid;
        const uname = btn.dataset.uname || '';
        const pwd = state.admin.password;

        if (act === 'reset_hwid') {
          await api.adminManageUser(pwd, { userId, action: 'reset_hwid' });
          await refreshAdminOverview();
          showToast(`@${uname} 회원의 HWID 기기 고정이 초기화되었습니다.`);
        } else if (act === 'bind_hwid') {
          await api.adminManageUser(pwd, { userId, action: 'bind_current_hwid' });
          await refreshAdminOverview();
          showToast(`@${uname} 회원의 HWID가 현재 PC로 귀속되었습니다.`);
        } else if (act === 'ext7d') {
          await api.adminManageUser(pwd, { userId, action: 'extend_user_license', addDays: 7 });
          await refreshAdminOverview();
          showToast(`@${uname} 회원의 라이센스 기간이 +7일 연장되었습니다.`);
        } else if (act === 'ext30d') {
          await api.adminManageUser(pwd, { userId, action: 'extend_user_license', addDays: 30 });
          await refreshAdminOverview();
          showToast(`@${uname} 회원의 라이센스 기간이 +30일 연장되었습니다.`);
        } else if (act === 'toggle_suspend') {
          await api.adminManageUser(pwd, { userId, action: 'toggle_suspend' });
          await refreshAdminOverview();
          showToast('회원 상태가 변경되었습니다.');
        } else if (act === 'delete') {
          await api.adminManageUser(pwd, { userId, action: 'delete' });
          await refreshAdminOverview();
          showToast(`@${uname} 회원이 삭제되었습니다.`);
        } else if (act === 'reset_pw') {
          openUniversalModal({
            title: `@${uname} 회원 비밀번호 재설정`,
            desc: '새로운 비밀번호(4자 이상)를 입력해 주세요.',
            bodyHtml: `
              <div class="aux-field">
                <label>새 비밀번호 (New Password)</label>
                <input type="text" class="aux-input" id="modalUsrNewPw" placeholder="새 비밀번호 입력 (4자 이상)" />
              </div>
            `,
            onSave: async () => {
              const newPassword = ($('modalUsrNewPw')?.value || '').trim();
              const r = await api.adminManageUser(pwd, { userId, action: 'reset_password', newPassword });
              if (r && r.ok) showToast(`@${uname} 비밀번호가 변경되었습니다.`);
              else showToast(r?.error || '비밀번호 변경 실패');
            },
          });
        } else if (act === 'rebind_lic') {
          openUniversalModal({
            title: `@${uname} 회원 라이센스 키 교체`,
            desc: '이 회원에게 새로 부여할 라이센스 키를 입력하세요.',
            bodyHtml: `
              <div class="aux-field">
                <label>새 라이센스 키 (License Key)</label>
                <input type="text" class="aux-input license-code-input" id="modalUsrNewKey" placeholder="REBORN-XXXX-XXXX-XXXX" />
              </div>
            `,
            onSave: async () => {
              const newLicenseKey = ($('modalUsrNewKey')?.value || '').trim();
              const r = await api.adminManageUser(pwd, { userId, action: 'bind_license', newLicenseKey });
              if (r && r.ok) {
                await refreshAdminOverview();
                showToast(`@${uname} 회원의 라이센스가 교체되었습니다.`);
              } else {
                showToast(r?.error || '라이센스 교체 실패');
              }
            },
          });
        }
      });
    });
  }

  // 3. Render System Diagnostics & Admin Audit Logs Sub-Tab
  if (sysWrap) {
    const eng = state.admin.engineStatus || {};
    const iden = eng.identity || state.identity || {};
    const logs = Array.isArray(state.admin.auditLogs) ? state.admin.auditLogs : [];
    const curHwid = state.admin.stats?.currentHwid || state.auth?.currentHwid || '-';
    const activeTagStr = iden.serverTagText
      ? `${iden.serverTagText} (Guild ID: ${iden.serverTagGuildId || '-'})`
      : '장착된 태그 없음';

    sysWrap.innerHTML = `
      <div class="admin-section-card spotlight-card" style="margin-bottom:12px;">
        <div class="aux-header-split">
          <div>
            <h4 class="admin-sec-title">실시간 엔진 · Discord 연동 · 자동 업데이트 진단 제어</h4>
            <p class="aux-desc">현재 호스트 PC의 IPC 파이프 상태, 실제 연동된 Discord 계정 및 서버 태그, 자동 업데이트 엔진을 직접 제어합니다.</p>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn-adm-act gold" id="btnAdmSysSyncDiscord">Discord 실시간 재동기화</button>
            <button type="button" class="btn-adm-act" id="btnAdmSysReconnectIpc">IPC 파이프 재연결</button>
            <button type="button" class="btn-adm-act" id="btnAdmSysCheckUpdate">최신 업데이트 확인</button>
            <button type="button" class="btn-adm-act danger" id="btnAdmSysStopRpc">강제 RPC 송출 중지</button>
          </div>
        </div>
        <div class="aux-grid-2" style="margin-top:8px;">
          <div class="admin-lic-meta" style="background:rgba(255,255,255,0.025);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
            <div><strong>Discord IPC 연결:</strong> <span style="color:${eng.connected ? '#4ade80' : '#f87171'};font-weight:700;">${eng.connected ? `CONNECTED (pipe-${eng.pipeIndex ?? 0})` : 'DISCONNECTED'}</span></div>
            <div><strong>Rich Presence 송출 상태:</strong> <span style="color:${eng.isRpcRunning ? '#fbbf24' : '#a1a1aa'};font-weight:700;">${eng.isRpcRunning ? 'LIVE · 실시간 송출 중' : 'IDLE · 대기 중'}</span></div>
            <div><strong>현재 호스트 HWID:</strong> <code style="color:#38bdf8;">${escapeHtml(curHwid)}</code></div>
          </div>
          <div class="admin-lic-meta" style="background:rgba(255,255,255,0.025);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
            <div><strong>연동된 Discord 계정:</strong> ${escapeHtml(iden.displayName || '-')} (@${escapeHtml(iden.username || '-')})</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <strong>실제 서버 태그 (Clan):</strong>
              ${iden.serverTagText ? getClanBadgeHtml(iden.serverTagGuildId, iden.serverTagBadge, iden.serverTagBadgeUrl, 14) : ''}
              <span style="color:#4ade80;font-weight:700;">${escapeHtml(activeTagStr)}</span>
            </div>
            <div><strong>자동 업데이트 엔진:</strong> v${escapeHtml(eng.updater?.currentVersion || '5.2.0')} (자동 업데이트 활성)</div>
          </div>
        </div>
      </div>

      <div class="admin-section-card spotlight-card" style="margin-bottom:12px;">
        <div class="aux-header-split" style="margin-bottom:8px;">
          <div>
            <h4 class="admin-sec-title">원클릭 자동 업데이트 배포 (1-Click OTA Update Publisher)</h4>
            <p class="aux-desc">코드나 기능을 수정한 뒤 버튼 한 번만 누르면 버전이 자동 상승하며, 자체 업데이트 서버 및 GitHub 저장소 생성·업로드까지 자동으로 처리됩니다.</p>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn-gold-sm glass-shimmer" id="btnAdmPublishUpdateNow">원클릭 새 버전 배포 (v${escapeHtml(eng.updater?.currentVersion || '5.2.0')} → 자동 상승)</button>
            <button type="button" class="btn-adm-act" id="btnAdmOpenGithubTokenPage">GitHub 토큰 발급 페이지 열기</button>
          </div>
        </div>
        <div class="aux-grid-2" style="gap:10px;">
          <div class="aux-field">
            <label>배포할 새 버전 번호 (비워두면 자동으로 +0.0.1 상승)</label>
            <input type="text" class="aux-input" id="admPublishVersionInput" placeholder="예: 5.2.1 또는 5.3.0 (자동 계산)" />
          </div>
          <div class="aux-field">
            <label>업데이트 패치 노트 (Release Notes)</label>
            <input type="text" class="aux-input" id="admPublishNotesInput" value="${escapeHtml(eng.updater?.releaseNotes || 'Reborn RPC 최신 자동 업데이트 패치')}" />
          </div>
          <div class="aux-field">
            <label>GitHub 토큰 (선택 · 입력 시 저장소 자동 생성 & 파일 자동 업로드)</label>
            <input type="password" class="aux-input" id="admPublishGhTokenInput" placeholder="${eng.updater?.hasGithubToken ? '저장된 GitHub 토큰 사용 중 (변경 시에만 입력)' : 'ghp_... (한 번만 입력하면 깃허브 업로드까지 완전 자동화)'}" />
          </div>
          <div class="aux-field">
            <label>현재 연결된 업데이트 매니페스트 URL</label>
            <input type="text" class="aux-input" id="admPublishManifestUrlInput" value="${escapeHtml(eng.updater?.customUpdateUrl || 'http://127.0.0.1:4789/api/update/manifest')}" />
          </div>
        </div>
      </div>

      <div class="admin-section-card spotlight-card">
        <div class="aux-header-split" style="margin-bottom:8px;">
          <div>
            <h4 class="admin-sec-title">관리자 보안 감사 로그 (Audit Logs · 최근 ${logs.length}건)</h4>
            <p class="aux-desc">라이센스 발급, 기간 연장, HWID 초기화, 회원 제어 내역이 실시간 기록됩니다.</p>
          </div>
          <button type="button" class="btn-adm-act danger" id="btnAdmClearAuditLogs">감사 로그 비우기</button>
        </div>
        ${
          logs.length === 0
            ? `<div class="vault-empty" style="padding:18px;">기록된 관리자 감사 로그가 없습니다.</div>`
            : logs
                .map(
                  (log) => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span class="admin-lic-status active" style="padding:2px 8px;font-size:10.5px;">${escapeHtml(log.action)}</span>
                    <span style="color:#e4e4e7;">${escapeHtml(log.detail)}</span>
                  </div>
                  <span style="color:#71717a;font-family:monospace;font-size:11px;">${escapeHtml(log.time || '')}</span>
                </div>
              `
                )
                .join('')
        }
      </div>
    `;

    $('btnAdmSysSyncDiscord')?.addEventListener('click', async () => {
      await triggerDiscordSyncNow();
      await refreshAdminOverview();
    });
    $('btnAdmSysReconnectIpc')?.addEventListener('click', async () => {
      await api.connect(VALID_DEFAULT_CLIENT_ID);
      await refreshAdminOverview();
      showToast('로컬 Discord IPC 파이프 재연결 완료');
    });
    $('btnAdmSysCheckUpdate')?.addEventListener('click', async () => {
      const customUpdateUrl = ($('admPublishManifestUrlInput')?.value || '').trim();
      const r = await api.checkUpdater(customUpdateUrl ? { customUpdateUrl } : {});
      await refreshAdminOverview();
      showToast(
        r?.updateStatus === 'updated'
          ? `v${r.currentVersion} 최신 버전으로 자동 핫패치가 완료되었습니다!`
          : `현재 최신 버전(v${r?.currentVersion || '5.2.0'}) 상태입니다.`
      );
    });
    $('btnAdmOpenGithubTokenPage')?.addEventListener('click', () => {
      api.openExternal('https://github.com/settings/tokens/new?scopes=repo&description=Reborn-RPC-Auto-Updater');
    });
    $('btnAdmPublishUpdateNow')?.addEventListener('click', async () => {
      if (!state.admin.password) return;
      const newVersion = ($('admPublishVersionInput')?.value || '').trim();
      const releaseNotes = ($('admPublishNotesInput')?.value || '').trim();
      const ghTokenVal = ($('admPublishGhTokenInput')?.value || '').trim();
      const customUpdateUrl = ($('admPublishManifestUrlInput')?.value || '').trim();

      showToast('새 버전 자동 업데이트 패키징 및 배포 중...');
      const payload = {
        newVersion,
        releaseNotes,
        customUpdateUrl,
      };
      if (ghTokenVal) {
        payload.githubToken = ghTokenVal;
      }

      const res = await api.adminPublishUpdate(state.admin.password, payload);
      if (res && res.ok) {
        await refreshAdminOverview();
        if (res.githubResult?.publishedToGithub) {
          showToast(
            `v${res.currentVersion} 배포 완료! GitHub(${res.githubResult.owner}/${res.githubResult.repo})에 자동 업로드되었습니다.`
          );
        } else {
          showToast(`v${res.currentVersion} 새 버전이 자체 업데이트 서버 및 version.json에 즉시 배포되었습니다!`);
        }
      } else {
        showToast(res?.error || '자동 업데이트 배포 중 오류가 발생했습니다.');
      }
    });
    $('btnAdmSysStopRpc')?.addEventListener('click', async () => {
      await stopDiscordRpcNow(false);
      await refreshAdminOverview();
    });
    $('btnAdmClearAuditLogs')?.addEventListener('click', async () => {
      if (!state.admin.password) return;
      await api.adminClearAuditLogs(state.admin.password);
      await refreshAdminOverview();
      showToast('관리자 감사 로그를 비웠습니다.');
    });
  }
}

function bindGlobalEvents() {
  // Left Rail View Switching
  document.querySelectorAll('.rail-btn[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const viewId = btn.dataset.view;
      document.querySelectorAll('.rail-btn[data-view]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.studio-view').forEach((sec) => sec.classList.add('hidden'));
      $(`view-${viewId}`)?.classList.remove('hidden');
      if (viewId === 'identity') syncIdentityInputsFromState();
      if (viewId === 'triggers') renderProcessTriggersTable();
      if (viewId === 'vault') renderMediaVault();
      if (viewId === 'console') updateRawJsonViewer();
    });
  });

  $('btnRailDiscordLink')?.addEventListener('click', () => {
    document.querySelector('.rail-btn[data-view="discord-link"]')?.click();
  });
  $('topIpcPill')?.addEventListener('click', () => {
    document.querySelector('.rail-btn[data-view="discord-link"]')?.click();
  });

  // Admin Panel Openers
  $('btnRailAdminPanel')?.addEventListener('click', () => openAdminPanelModal());
  $('btnOpenAdminTop')?.addEventListener('click', () => openAdminPanelModal());
  $('btnAuthOpenAdmin')?.addEventListener('click', () => openAdminPanelModal());
  $('btnCloseAdminModal')?.addEventListener('click', () => $('adminPanelModal')?.classList.add('hidden'));

  $('btnUnlockAdminPanel')?.addEventListener('click', () => unlockAdminPanelWithPassword());
  $('adminPasswordInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') unlockAdminPanelWithPassword();
  });

  // Admin 1-Click Quick Preset License Generator
  document.querySelectorAll('[data-quick-create-lic]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.admin.unlocked || !state.admin.password) return;
      const preset = btn.dataset.quickCreateLic;
      let dDays = 0;
      let dHours = 0;
      let isLife = false;
      let label = '';
      if (preset === '1h') {
        dHours = 1;
        label = '1시간권';
      } else if (preset === '1d') {
        dDays = 1;
        label = '1일권';
      } else if (preset === '7d') {
        dDays = 7;
        label = '7일권';
      } else if (preset === '30d') {
        dDays = 30;
        label = '30일권';
      } else if (preset === 'lifetime') {
        isLife = true;
        label = '영구제';
      }
      const prefix = ($('admGenPrefix')?.value || 'REBORN').trim();
      const note = ($('admGenNote')?.value || '').trim() || `빠른 발급 (${label})`;
      const maxUsers = Number(adminGenMaxUsersVal || 1);

      const res = await api.adminCreateLicenses(state.admin.password, {
        count: 1,
        durationDays: dDays,
        durationHours: dHours,
        isLifetime: isLife,
        maxUsers,
        prefix,
        note,
      });

      if (res && res.ok && Array.isArray(res.created) && res.created.length > 0) {
        lastCreatedKeysList = res.created.map((c) => c.key);
        const banner = $('adminCreatedBanner');
        const codeEl = $('adminCreatedKeyPreview');
        if (banner && codeEl) {
          codeEl.textContent = lastCreatedKeysList[0];
          banner.classList.remove('hidden');
        }
        navigator.clipboard?.writeText(lastCreatedKeysList[0]);
        await refreshAdminOverview();
        showToast(`${label} 라이센스 [${lastCreatedKeysList[0]}] 즉시 발급 및 복사 완료!`);
      }
    });
  });

  // Admin Custom Create Licenses
  $('btnAdminCreateLicenses')?.addEventListener('click', async () => {
    if (!state.admin.unlocked || !state.admin.password) return;
    const isLife = adminGenDurationPreset === 'lifetime';
    const dDays = isLife ? 0 : Number($('admGenDays')?.value || 0);
    const dHours = isLife ? 0 : Number($('admGenHours')?.value || 0);
    const maxUsers = Number(adminGenMaxUsersVal || 1);
    const count = Math.max(1, Math.min(50, Number($('admGenCount')?.value || 1)));
    const prefix = ($('admGenPrefix')?.value || 'REBORN').trim();
    const customKey = ($('admGenCustomKey')?.value || '').trim();
    const note = ($('admGenNote')?.value || '').trim();

    const res = await api.adminCreateLicenses(state.admin.password, {
      count,
      durationDays: dDays,
      durationHours: dHours,
      isLifetime: isLife,
      maxUsers,
      prefix,
      customKey,
      note,
    });

    if (res && res.ok && Array.isArray(res.created)) {
      lastCreatedKeysList = res.created.map((c) => c.key);
      if ($('admGenCustomKey')) $('admGenCustomKey').value = '';
      const banner = $('adminCreatedBanner');
      const codeEl = $('adminCreatedKeyPreview');
      if (banner && codeEl) {
        codeEl.textContent = lastCreatedKeysList.length === 1 ? lastCreatedKeysList[0] : `${lastCreatedKeysList[0]} 외 ${lastCreatedKeysList.length - 1}개`;
        banner.classList.remove('hidden');
      }
      await refreshAdminOverview();
      showToast(`라이센스 ${lastCreatedKeysList.length}개가 생성되었습니다!`);
    } else {
      showToast(res?.error || '라이센스 생성 실패');
    }
  });

  $('btnCopyCreatedKeys')?.addEventListener('click', () => {
    if (!lastCreatedKeysList.length) return;
    navigator.clipboard?.writeText(lastCreatedKeysList.join('\n'));
    showToast('생성된 라이센스 키가 클립보드에 복사되었습니다.');
  });

  $('btnUseCreatedKeyForReg')?.addEventListener('click', () => {
    if (!lastCreatedKeysList.length) return;
    const firstKey = lastCreatedKeysList[0];
    $('adminPanelModal')?.classList.add('hidden');
    switchAuthTab('register');
    if ($('regLicenseKeyInput')) $('regLicenseKeyInput').value = firstKey;
    if ($('loginNewLicenseInput')) $('loginNewLicenseInput').value = firstKey;
    showToast(`회원가입 입력란에 [${firstKey}] 키가 자동 입력되었습니다.`);
  });

  document.querySelectorAll('.admin-subtab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-subtab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      adminActiveTab = btn.dataset.admTab || 'licenses';
      renderAdminTables();
    });
  });

  $('adminSearchInput')?.addEventListener('input', () => renderAdminTables());

  // Bulk Extend & Copy All Keys
  $('btnAdminBulkAdd1d')?.addEventListener('click', async () => {
    if (!state.admin.password) return;
    const r = await api.adminBulkExtend(state.admin.password, { addDays: 1 });
    await refreshAdminOverview();
    showToast(`기간제 라이센스 ${r?.affected ?? 0}개에 +1일 일괄 연장 완료!`);
  });
  $('btnAdminBulkAdd7d')?.addEventListener('click', async () => {
    if (!state.admin.password) return;
    const r = await api.adminBulkExtend(state.admin.password, { addDays: 7 });
    await refreshAdminOverview();
    showToast(`기간제 라이센스 ${r?.affected ?? 0}개에 +7일 일괄 연장 완료!`);
  });
  $('btnAdminBulkAdd30d')?.addEventListener('click', async () => {
    if (!state.admin.password) return;
    const r = await api.adminBulkExtend(state.admin.password, { addDays: 30 });
    await refreshAdminOverview();
    showToast(`기간제 라이센스 ${r?.affected ?? 0}개에 +30일 일괄 연장 완료!`);
  });
  $('btnAdminCopyAllKeys')?.addEventListener('click', () => {
    const allKeys = (state.admin.licenses || []).map((l) => `${l.key} (${l.remainingText || l.durationLabel})`).join('\n');
    if (!allKeys) {
      showToast('복사할 라이센스가 없습니다.');
      return;
    }
    navigator.clipboard?.writeText(allKeys);
    showToast(`전체 라이센스 ${state.admin.licenses.length}개 목록이 클립보드에 복사되었습니다.`);
  });

  $('btnAdminDeleteExpired')?.addEventListener('click', async () => {
    if (!state.admin.password) return;
    await api.adminDeleteLicense(state.admin.password, 'EXPIRED_ONLY');
    await refreshAdminOverview();
    showToast('만료된 라이센스가 모두 정리되었습니다.');
  });

  $('btnAdminDeleteAll')?.addEventListener('click', async () => {
    if (!state.admin.password) return;
    await api.adminDeleteLicense(state.admin.password, 'ALL');
    await refreshAdminOverview();
    showToast('전체 라이센스 목록이 초기화되었습니다.');
  });

  // Auth Gate Tabs & Login / Register / Logout
  document.querySelectorAll('.auth-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchAuthTab(btn.dataset.authTab));
  });

  $('btnSubmitLogin')?.addEventListener('click', async () => {
    const username = ($('loginUsernameInput')?.value || '').trim();
    const password = $('loginPasswordInput')?.value || '';
    const newLicenseKey = ($('loginNewLicenseInput')?.value || '').trim();
    const res = await api.authLogin({ username, password, newLicenseKey });
    if (!res || !res.ok) {
      showAuthError(res?.error || '로그인에 실패했습니다.');
      return;
    }
    const sess = await api.authSession();
    if (sess) state.auth = sess;
    showAuthError('');
    renderAuthGateState();
    showToast(`환영합니다, @${res.user?.username || username}님! Reborn RPC가 활성화되었습니다.`);
  });

  $('loginPasswordInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('btnSubmitLogin')?.click();
  });

  $('btnSubmitRegister')?.addEventListener('click', async () => {
    const licenseKey = ($('regLicenseKeyInput')?.value || '').trim();
    const username = ($('regUsernameInput')?.value || '').trim();
    const password = $('regPasswordInput')?.value || '';
    const res = await api.authRegister({ username, password, licenseKey });
    if (!res || !res.ok) {
      showAuthError(res?.error || '회원가입에 실패했습니다.');
      return;
    }
    const sess = await api.authSession();
    if (sess) state.auth = sess;
    showAuthError('');
    renderAuthGateState();
    showToast(`회원가입 및 라이센스 인증이 완료되었습니다! (@${res.user?.username || username})`);
  });

  $('regPasswordInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('btnSubmitRegister')?.click();
  });

  $('btnTopLogout')?.addEventListener('click', async () => {
    await stopDiscordRpcNow(true);
    await api.authLogout();
    const sess = await api.authSession();
    state.auth = sess || { authenticated: false, user: null, license: null };
    renderAuthGateState();
    showToast('로그아웃되었습니다.');
  });

  $('btnCopyMyHwid')?.addEventListener('click', () => {
    const hwid = state.auth?.currentHwid || $('authCurrentHwidCode')?.textContent || '';
    if (hwid && hwid !== 'CHECKING...') {
      navigator.clipboard?.writeText(hwid);
      showToast(`내 기기 HWID(${hwid})가 클립보드에 복사되었습니다.`);
    }
  });

  $('btnCheckAutoUpdateTop')?.addEventListener('click', async () => {
    const labelEl = $('topAutoUpdateLabel');
    if (labelEl) labelEl.textContent = 'Checking...';
    showToast('자동 업데이트 서버에서 최신 버전을 확인 중입니다...');
    const res = await api.checkUpdater();
    if (res && res.ok) {
      if (labelEl) labelEl.textContent = `v${res.currentVersion || '5.2.0'} · Auto Update`;
      showToast(res.message || `Reborn RPC v${res.currentVersion || '5.2.0'} 최신 버전이 적용되어 있습니다.`);
    } else {
      if (labelEl) labelEl.textContent = 'v5.2 · Auto Update';
      showToast('자동 업데이트 엔진이 정상 작동 중입니다.');
    }
  });

  // Profile Management
  $('btnAddNewProfile')?.addEventListener('click', () => createNewProfile());
  $('profileSearchInput')?.addEventListener('input', () => renderProfilesList());

  $('inputSelectedProfileName')?.addEventListener('input', (e) => {
    const prof = getActiveProfile();
    if (!prof) return;
    prof.name = e.target.value;
    markDirty();
    persistStudioConfig();
    renderProfilesList();
  });

  $('btnResetOrClearStage')?.addEventListener('click', () => {
    const kf = getActiveKeyframe();
    if (!kf) return;
    kf.variants = [];
    markDirty();
    persistStudioConfig();
    renderAll();
    showToast('현재 키프레임 요소를 모두 비웠습니다.');
  });

  // Top Bar Buttons
  $('btnSyncFromDiscordTop')?.addEventListener('click', () => triggerDiscordSyncNow());
  $('btnSyncDiscordNowView')?.addEventListener('click', () => triggerDiscordSyncNow());

  const addKeyframeHandler = () => {
    let prof = getActiveProfile();
    if (!prof) prof = createNewProfile();
    prof.keyframes.push({
      id: 'kf-' + Date.now(),
      durationSec: 10,
      previewEnabled: true,
      variants: [],
    });
    state.activeKeyframeIndex = prof.keyframes.length - 1;
    markDirty();
    persistStudioConfig();
    renderAll();
    showToast(`Keyframe #${prof.keyframes.length} 추가됨`);
  };
  $('btnAddKeyframeTop')?.addEventListener('click', addKeyframeHandler);
  $('btnAddKeyframeBottom')?.addEventListener('click', addKeyframeHandler);

  $('btnSaveProfileDisk')?.addEventListener('click', () => {
    state.isDirty = false;
    persistStudioConfig();
    updateProfileStatusPill();
    showToast('프로필 및 프리셋이 로컬 디스크에 안전하게 저장되었습니다.');
  });

  // Start / Stop RPC Toggle Button (Send / Sent)
  $('btnMakeItLive')?.addEventListener('click', () => {
    toggleRpcStartStop();
  });

  // Transport Controls (Keyframe Loop)
  $('btnPrevKeyframe')?.addEventListener('click', () => {
    const prof = getActiveProfile();
    if (!prof || !prof.keyframes.length) return;
    state.activeKeyframeIndex = (state.activeKeyframeIndex - 1 + prof.keyframes.length) % prof.keyframes.length;
    renderAll();
    scheduleAutoLiveSync();
  });

  $('btnNextKeyframe')?.addEventListener('click', () => {
    const prof = getActiveProfile();
    if (!prof || !prof.keyframes.length) return;
    state.activeKeyframeIndex = (state.activeKeyframeIndex + 1) % prof.keyframes.length;
    renderAll();
    scheduleAutoLiveSync();
  });

  $('btnPlayPauseKeyframes')?.addEventListener('click', () => {
    state.isLoopPlaying = !state.isLoopPlaying;
    state.loopStartTime = Date.now();
    $('iconTransportPlay')?.classList.toggle('hidden', state.isLoopPlaying);
    $('iconTransportPause')?.classList.toggle('hidden', !state.isLoopPlaying);
    const badge = $('previewLoopStateBadge');
    if (badge) {
      badge.textContent = state.isLoopPlaying ? 'PLAYING' : 'PAUSED';
      badge.classList.toggle('playing', state.isLoopPlaying);
    }
  });

  // Custom Glassmorphic Dropdown for Preview Speed
  const speedOpts = [
    { value: '3', label: '3초 주기' },
    { value: '5', label: '5초 주기' },
    { value: '10', label: '10초 주기' },
    { value: '15', label: '15초 주기' },
    { value: '30', label: '30초 주기' },
  ];
  renderCustomDropdown(
    $('customDropPreviewSpeed'),
    speedOpts,
    String(state.loopSpeedSec || 5),
    (val) => {
      state.loopSpeedSec = Number(val || 5);
    },
    { upward: true, mini: true }
  );

  // Rich Presence Customizer Window Controls
  $('btnCloseRpcCustomizer')?.addEventListener('click', () => closeRpcCustomizer());
  $('btnRcSavePreset')?.addEventListener('click', () => {
    const v = getCustomizerTargetVariant();
    if (v) syncPresetFromVariant(v);
    state.isDirty = false;
    persistStudioConfig();
    closeRpcCustomizer();
    if (state.isRpcRunning) sendCurrentKeyframeToDiscord(true);
    showToast('Rich Presence 설정이 저장되었습니다.');
  });

  $('rcPresetNameInput')?.addEventListener('input', (e) => {
    const v = getCustomizerTargetVariant();
    if (v) {
      v.presetName = e.target.value.trim();
      syncPresetFromVariant(v);
      persistStudioConfig();
    }
  });

  $('btnRcNewPreset')?.addEventListener('click', () => {
    const v = getCustomizerTargetVariant();
    createNewRpcPresetFromVariant(v, state.customizer.kfIndex, state.customizer.variantIndex);
  });

  $('btnRcDeletePreset')?.addEventListener('click', () => {
    const v = getCustomizerTargetVariant();
    deleteRpcPresetForVariant(v);
  });

  $('btnRcActivityPopupTrigger')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.customizer.activityPopupOpen = !state.customizer.activityPopupOpen;
    state.customizer.platformPopupOpen = false;
    const v = getCustomizerTargetVariant();
    if (v) renderCustomizerBottomPopups(v);
  });

  $('btnRcPlatformPopupTrigger')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.customizer.platformPopupOpen = !state.customizer.platformPopupOpen;
    state.customizer.activityPopupOpen = false;
    const v = getCustomizerTargetVariant();
    if (v) renderCustomizerBottomPopups(v);
  });

  window.addEventListener('click', () => {
    closeAllCustomDropdowns();
    if (state.customizer.activityPopupOpen || state.customizer.platformPopupOpen) {
      state.customizer.activityPopupOpen = false;
      state.customizer.platformPopupOpen = false;
      const v = getCustomizerTargetVariant();
      if (v) renderCustomizerBottomPopups(v);
    }
    if (openDropdownKfIndex !== null || openRpcMoreMenuKey !== null) {
      openDropdownKfIndex = null;
      openRpcMoreMenuKey = null;
      renderKeyframesStack();
    }
  });

  // Discord Link View Controls
  $('btnDlConnectIpc')?.addEventListener('click', async () => {
    const cid = sanitizeClientId($('dlClientIdInput')?.value);
    showToast('로컬 Discord IPC 재연결 중...');
    await api.connect(cid);
    await triggerDiscordSyncNow();
  });

  $('btnToggleTokenVis')?.addEventListener('click', () => {
    const inp = $('dlUserTokenInput');
    if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  $('btnSaveAndSyncToken')?.addEventListener('click', async () => {
    state.discordAuth.userToken = ($('dlUserTokenInput')?.value || '').trim();
    persistStudioConfig();
    await triggerDiscordSyncNow();
  });

  // Identity View Controls + Owned Server Tag Management
  const bindIdInput = (id, key) => {
    $(id)?.addEventListener('input', (e) => {
      state.identity[key] = e.target.value;
      persistStudioConfig();
      renderLiveDiscordPreview();
      scheduleAutoLiveSync();
    });
  };
  bindIdInput('idDisplayName', 'displayName');
  bindIdInput('idUsername', 'username');
  bindIdInput('idPronouns', 'pronouns');
  bindIdInput('idCustomStatusText', 'customStatusText');
  bindIdInput('idBioTextarea', 'bio');
  bindIdInput('idAvatarUrl', 'avatarUrl');
  bindIdInput('idBannerUrl', 'bannerUrl');
  bindIdInput('idBannerColor', 'bannerColor');

  $('btnSyncOwnedTagsFromDiscord')?.addEventListener('click', async () => {
    await triggerDiscordSyncNow();
    showToast('Discord 계정에서 실제 보유 서버 태그 및 프로필을 동기화했습니다.');
  });

  $('btnApplyIdentityToDiscord')?.addEventListener('click', async () => {
    const selTagObj = (state.identity.availableServerTags || []).find((x) => x.tag === state.identity.serverTagText);
    await api.applyDiscordProfile({
      userToken: state.discordAuth.userToken || '',
      displayName: state.identity.displayName,
      status: state.identity.status,
      pronouns: state.identity.pronouns,
      bio: state.identity.bio,
      customStatusText: state.identity.customStatusText,
      serverTagText: state.identity.serverTagText,
      serverTagGuildId: selTagObj?.guildId || state.identity.serverTagGuildId || '',
      serverTagBadge: selTagObj?.badge || state.identity.serverTagBadge || '',
      serverTagBadgeUrl: selTagObj?.badgeUrl || state.identity.serverTagBadgeUrl || '',
    });
    if (state.isRpcRunning) await sendCurrentKeyframeToDiscord(true);
    showToast('Discord 프로필 · 상태 · 대명사 · 소개 · 서버 태그가 즉시 반영되었습니다!');
  });

  // Right Column Preview Click-to-Edit & Perspective
  document.querySelectorAll('.persp-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.persp-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.perspective = chip.dataset.persp;
      renderLiveDiscordPreview();
    });
  });

  document.querySelectorAll('[data-quick-edit]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openQuickIdentityModal(el.dataset.quickEdit);
    });
  });

  $('btnOpenQuickIdentityModal')?.addEventListener('click', () => openQuickIdentityModal('identity'));
  $('btnClearDiscordRpc')?.addEventListener('click', async () => {
    await stopDiscordRpcNow(false);
  });

  // Universal Modal Buttons
  $('btnCloseItemSettingsModal')?.addEventListener('click', closeItemSettingsModal);
  $('btnItemSettingsCancel')?.addEventListener('click', closeItemSettingsModal);
  $('btnItemSettingsSave')?.addEventListener('click', () => {
    if (typeof activeModalCallbacks.onSave === 'function') activeModalCallbacks.onSave();
    closeItemSettingsModal();
  });
  $('btnItemSettingsDelete')?.addEventListener('click', () => {
    if (typeof activeModalCallbacks.onDelete === 'function') activeModalCallbacks.onDelete();
    closeItemSettingsModal();
  });

  // Backup / Restore / Reset Modal
  $('btnProfileSettings')?.addEventListener('click', () => {
    $('profileSettingsModal')?.classList.remove('hidden');
  });
  $('btnCloseProfileSettings')?.addEventListener('click', () => {
    $('profileSettingsModal')?.classList.add('hidden');
  });
  $('btnModalExportJson')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ profiles: state.profiles, rpcPresets: state.rpcPresets, identity: state.identity }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `reborn-rpc-backup-${Date.now()}.json`;
    a.click();
    showToast('JSON 백업 파일이 다운로드되었습니다.');
  });
  $('inputImportJsonFile')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed.profiles)) state.profiles = parsed.profiles;
        if (Array.isArray(parsed.rpcPresets)) state.rpcPresets = parsed.rpcPresets;
        if (parsed.identity) state.identity = { ...state.identity, ...parsed.identity };
        state.activeProfileId = state.profiles[0]?.id || null;
        persistStudioConfig();
        renderAll();
        $('profileSettingsModal')?.classList.add('hidden');
        showToast('백업 데이터를 성공적으로 불러왔습니다.');
      } catch (_err) {
        showToast('올바른 JSON 백업 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  });
  $('btnModalResetDefaults')?.addEventListener('click', async () => {
    await api.resetDefaults();
    state.profiles = [];
    state.rpcPresets = [];
    state.activeProfileId = null;
    state.activeKeyframeIndex = 0;
    renderAll();
    $('profileSettingsModal')?.classList.add('hidden');
    showToast('모든 프로필과 프리셋이 깨끗한 초기 상태로 리셋되었습니다.');
  });

  // Telemetry & Custom Macros
  document.querySelectorAll('[data-copy-macro]').forEach((card) => {
    card.addEventListener('click', () => {
      const token = card.dataset.copyMacro;
      navigator.clipboard?.writeText(token);
      showToast(`${token} 변수가 클립보드에 복사되었습니다.`);
    });
  });

  $('btnAddCustomVar')?.addEventListener('click', () => {
    const k = ($('customVarKeyInput')?.value || '').trim().replace(/[^a-zA-Z0-9_]/g, '');
    const v = ($('customVarValInput')?.value || '').trim();
    if (!k) {
      showToast('변수 이름을 입력해 주세요.');
      return;
    }
    const exist = state.customVariables.find((x) => x.key === k);
    if (exist) exist.value = v;
    else state.customVariables.push({ key: k, value: v });
    if ($('customVarKeyInput')) $('customVarKeyInput').value = '';
    if ($('customVarValInput')) $('customVarValInput').value = '';
    persistStudioConfig();
    renderCustomVariablesList();
    renderLiveDiscordPreview();
    showToast(`{${k}} 커스텀 변수가 추가되었습니다.`);
  });

  // Process Scan
  $('btnScanProcesses')?.addEventListener('click', async () => {
    showToast('실행 중인 윈도우 프로세스를 스캔 중입니다...');
    const res = await api.scanProcesses();
    const list = $('scannedProcessesList');
    const hdr = $('scannedProcessesHeader');
    if (res?.processes && list) {
      hdr?.classList.remove('hidden');
      list.innerHTML = res.processes
        .slice(0, 35)
        .map((exe) => `<button type="button" class="badge-toggle-pill" data-pick-exe="${escapeHtml(exe)}"><code>${escapeHtml(exe)}</code></button>`)
        .join('');
      list.querySelectorAll('[data-pick-exe]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const prof = getActiveProfile();
          if (!prof) {
            showToast('먼저 프로필을 생성해 주세요.');
            return;
          }
          prof.processTrigger = btn.dataset.pickExe;
          persistStudioConfig();
          renderProcessTriggersTable();
          showToast(`"${prof.name}" 프로필에 ${prof.processTrigger} 트리거가 지정되었습니다.`);
        });
      });
    }
  });

  // Media Vault
  document.querySelectorAll('.vault-slot-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vault-slot-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.vaultTargetSlot = btn.dataset.slot;
    });
  });

  $('btnAddCustomGallery')?.addEventListener('click', () => {
    const name = ($('customGalleryNameInput')?.value || '').trim() || `Custom Media ${state.customGallery.length + 1}`;
    const url = ($('customGalleryUrlInput')?.value || '').trim();
    if (!url || !/^https?:\/\//i.test(url)) {
      showToast('올바른 https:// 이미지 또는 GIF URL을 입력하세요.');
      return;
    }
    state.customGallery.unshift({ name, url });
    if ($('customGalleryNameInput')) $('customGalleryNameInput').value = '';
    if ($('customGalleryUrlInput')) $('customGalleryUrlInput').value = '';
    persistStudioConfig();
    renderMediaVault();
    showToast(`"${name}" 이미지가 보관함에 추가되었습니다.`);
  });

  $('btnVaultFetchAssets')?.addEventListener('click', async () => {
    const cid = sanitizeClientId($('vaultClientIdInput')?.value);
    const grid = $('vaultAppAssetsGrid');
    if (!grid) return;
    grid.innerHTML = `<div class="vault-empty">Discord Developer Portal에서 에셋을 조회 중입니다...</div>`;
    const res = await api.fetchDiscordApp(cid);
    if (res?.ok && Array.isArray(res.assets) && res.assets.length > 0) {
      grid.innerHTML = res.assets
        .map(
          (a) => `
          <div class="vault-media-item spotlight-card" data-apply-app-asset="${escapeHtml(a.url)}" data-asset-name="${escapeHtml(a.name)}">
            <img src="${escapeHtml(a.url)}" alt="${escapeHtml(a.name)}" loading="lazy" />
            <span>${escapeHtml(a.name)}</span>
          </div>
        `
        )
        .join('');
      grid.querySelectorAll('[data-apply-app-asset]').forEach((el) => {
        el.addEventListener('click', () => {
          applyMediaUrlToActiveVariant(el.dataset.applyAppAsset, el.dataset.assetName, state.vaultTargetSlot);
        });
      });
    } else {
      grid.innerHTML = `<div class="vault-empty">등록된 앱 전용 에셋이 없거나 조회할 수 없습니다. 직접 이미지 URL을 입력해 사용할 수 있습니다.</div>`;
    }
  });

  // Console View Controls
  $('btnReconnectIpcNow')?.addEventListener('click', async () => {
    await api.connect(VALID_DEFAULT_CLIENT_ID);
    showToast('Discord IPC 재연결 요청을 보냈습니다.');
  });
  $('btnClearConsoleLogs')?.addEventListener('click', () => {
    if ($('ipcLogViewer')) $('ipcLogViewer').innerHTML = '';
  });
  $('btnCopyRawJson')?.addEventListener('click', () => {
    const txt = $('rawJsonViewer')?.textContent || '';
    navigator.clipboard?.writeText(txt);
    showToast('Raw JSON 페이로드가 복사되었습니다.');
  });
}

async function bootRebornStudio() {
  initSoniqVisualEngine();
  initCustomContextMenu();
  bindGlobalEvents();

  const initRes = await api.getInitData();
  if (initRes && initRes.ok) {
    const cfg = initRes.config || {};
    state.profiles = Array.isArray(cfg.profiles) ? cfg.profiles : [];
    state.rpcPresets = Array.isArray(cfg.rpcPresets) ? cfg.rpcPresets : [];
    state.activeProfileId = cfg.activeProfileId || state.profiles[0]?.id || null;
    if (cfg.discordAuth) state.discordAuth = { ...state.discordAuth, ...cfg.discordAuth };
    if (cfg.identity) state.identity = { ...state.identity, ...cfg.identity };
    if (Array.isArray(cfg.customVariables)) state.customVariables = cfg.customVariables;
    if (cfg.settings) state.settings = { ...state.settings, ...cfg.settings };
    if (Array.isArray(cfg.customGallery)) state.customGallery = cfg.customGallery;

    state.isRpcRunning = Boolean(initRes.isRpcRunning);
    state.isLiveSent = Boolean(initRes.isRpcRunning);
    if (initRes.authSession) {
      state.auth = initRes.authSession;
    }

    if (initRes.variables) {
      state.telemetry = { ...state.telemetry, ...initRes.variables };
    }
    if (initRes.status) {
      updateIpcStatusIndicator({
        ...initRes.status,
        identity: state.identity,
      });
    }
  }

  renderAuthGateState();
  syncIdentityInputsFromState();
  renderAll();

  // Real-time listeners from backend
  api.onStatusChange((st) => {
    updateIpcStatusIndicator(st);
  });

  api.onSystemStats((vars) => {
    if (!vars) return;
    state.telemetry = { ...state.telemetry, ...vars };
    if ($('liveCardCpu')) $('liveCardCpu').textContent = `${vars.cpu}%`;
    if ($('barCpu')) $('barCpu').style.width = `${Math.min(100, Number(vars.cpu || 0))}%`;
    if ($('liveCardRam')) $('liveCardRam').textContent = `${vars.ram}%`;
    if ($('barRam')) $('barRam').style.width = `${Math.min(100, Number(vars.ram || 0))}%`;
    if ($('liveCardRamGb')) $('liveCardRamGb').textContent = `${vars.ram_gb} GB`;
    if ($('liveCardTime')) $('liveCardTime').textContent = vars.time || '-';
    if ($('liveCardUptime')) $('liveCardUptime').textContent = vars.uptime || '-';
    if ($('liveCardMyName')) {
      $('liveCardMyName').textContent =
        vars.my_name || state.identity.displayName || state.ipcUser?.global_name || 'Reborn User';
    }
    if ($('liveCardUsername')) {
      $('liveCardUsername').textContent =
        vars.username || state.identity.username || state.ipcUser?.username || 'reborn';
    }
    if ($('liveCardSpotify')) {
      $('liveCardSpotify').textContent = vars.spotify_track || 'Spotify 대기 중';
    }
    if ($('liveCardSpotifySong')) {
      $('liveCardSpotifySong').textContent = vars.spotify_song || '재생 중인 곡 없음';
    }
    renderLiveDiscordPreview();
  });

  api.onLog((entry) => {
    if (entry) appendIpcLog(entry.type || 'info', entry.message || '');
  });

  // 1-second timer tick & keyframe carousel loop + periodic license check
  let licenseTickCounter = 0;
  setInterval(async () => {
    state.elapsedSec += 1;
    renderLiveDiscordPreview();

    licenseTickCounter += 1;
    if (licenseTickCounter >= 15) {
      licenseTickCounter = 0;
      if (state.auth && state.auth.authenticated) {
        const sess = await api.authSession();
        if (sess) {
          state.auth = sess;
          renderAuthGateState();
          if (!sess.authenticated && state.isRpcRunning) {
            await stopDiscordRpcNow(true);
          }
        }
      }
    }

    if (state.isLoopPlaying) {
      const prof = getActiveProfile();
      if (prof && prof.keyframes.length > 1) {
        const curKf = getActiveKeyframe();
        const cycleSec = Math.max(3, Number(curKf?.durationSec || state.loopSpeedSec || 5));
        const elapsedMs = Date.now() - state.loopStartTime;
        const pct = Math.min(100, (elapsedMs / (cycleSec * 1000)) * 100);
        const fill = $('transportProgressFill');
        if (fill) fill.style.width = `${pct}%`;

        if (elapsedMs >= cycleSec * 1000) {
          state.loopStartTime = Date.now();
          state.activeKeyframeIndex = (state.activeKeyframeIndex + 1) % prof.keyframes.length;
          renderKeyframesStack();
          renderLiveDiscordPreview();
          if (state.isRpcRunning && $('chkKeyframeLoop')?.checked) {
            sendCurrentKeyframeToDiscord(true, false);
          }
        }
      }
    }
  }, 1000);
}

window.addEventListener('DOMContentLoaded', bootRebornStudio);
