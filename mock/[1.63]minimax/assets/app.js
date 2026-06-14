/* Civic Atlas — App JS (icons, layout, interactions) */

const Icons = {
  // Lucide-style strokes, 24x24
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronUp: '<path d="m18 15-6-6-6 6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  fileSpreadsheet: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h8M8 9h2M14 9h2"/>',
  tree: '<path d="M10 10h.01"/><path d="M10 14h.01"/><path d="M10 18h.01"/><path d="M14 10h.01"/><path d="M14 14h.01"/><path d="M14 18h.01"/><path d="M18 10h.01"/><path d="M18 14h.01"/><path d="M18 18h.01"/><path d="M6 6h.01"/><path d="M6 10h.01"/><path d="M6 14h.01"/><path d="M6 18h.01"/><circle cx="12" cy="12" r="2"/><path d="M12 6V4a2 2 0 0 1 2-2h2"/><path d="M18 6h2a2 2 0 0 1 2 2v2"/><path d="M22 12v2a2 2 0 0 1-2 2h-2"/><path d="M18 18h-2a2 2 0 0 1-2-2v-2"/>',
  tag: '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  clipboardList: '<rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  checkSquare: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="2" y1="2" x2="22" y2="22"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  arrowUpRight: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  alertTriangle: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  alertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  dot: '<circle cx="12" cy="12" r="3"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  barChart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  pieChart: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  trendingUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  trendingDown: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  workflow: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  sparkles: '<path d="m12 3-1.9 5.8L4 10l5.8 1.9L12 18l1.9-5.8L20 10l-6.1-1.9z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>',
  searchUsers: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="17" r="3"/><path d="m21 21-1.5-1.5"/>',
  fileUp: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/>',
  fileDown: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 15v6"/><path d="m9 18 3 3 3-3"/>',
  logIn: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  playCircle: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  pauseCircle: '<circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/>',
  archive: '<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>',
  messageSquare: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  gitBranch: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
};

function icon(name, size = 16, strokeWidth = 1.75) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Icons[name] || ''}</svg>`;
}

// ============================================ Layout: Header & Sidebar
const NAV = [
  { type: 'link', icon: 'home', label: 'ダッシュボード', href: 'index.html' },
  { type: 'title', label: '名簿管理' },
  { type: 'link', icon: 'grid', label: '名簿ダッシュボード', href: 'directory/index.html' },
  { type: 'link', icon: 'list', label: '名簿一覧', href: 'directory/list.html' },
  { type: 'link', icon: 'tree', label: '組織ツリー', href: 'directory/org.html' },
  { type: 'link', icon: 'sparkles', label: '属性項目', href: 'directory/attributes.html' },
  { type: 'link', icon: 'tag', label: 'コードマスター', href: 'directory/codes.html' },
  { type: 'title', label: 'アカウント・権限' },
  { type: 'link', icon: 'users', label: 'ユーザー一覧', href: 'account/users.html' },
  { type: 'link', icon: 'shieldCheck', label: 'ロール', href: 'account/roles.html' },
  { type: 'link', icon: 'key', label: '権限ルール', href: 'account/permissions.html' },
  { type: 'link', icon: 'history', label: '監査ログ', href: 'account/audit.html' },
  { type: 'title', label: 'データ利活用' },
  { type: 'link', icon: 'clipboardList', label: 'フォーム', href: 'forms/list.html' },
  { type: 'link', icon: 'fileUp', label: 'インポート', href: 'import/index.html' },
  { type: 'link', icon: 'fileText', label: 'インポートログ', href: 'import/logs.html' },
  { type: 'link', icon: 'gitBranch', label: '申請・承認', href: 'requests/index.html', badge: '5' },
  { type: 'title', label: 'システム' },
  { type: 'link', icon: 'settings', label: 'テナント設定', href: 'settings/tenant.html' },
  { type: 'link', icon: 'building', label: '組織設定', href: 'settings/org.html' },
];

function getNavPrefix() {
  const script = document.querySelector('script[src*="assets/app.js"]');
  if (!script) return '';
  return (script.getAttribute('src') || '').replace(/assets\/app\.js$/, '');
}

function getCurrentRelPath() {
  const depth = (getNavPrefix().match(/\.\.\//g) || []).length;
  const parts = location.pathname.split('/').filter(Boolean);
  const file = parts[parts.length - 1] || 'index.html';
  if (depth === 0) return file;
  const dirs = [];
  for (let i = 0; i < depth; i++) {
    dirs.unshift(parts[parts.length - 2 - i]);
  }
  return dirs.join('/') + '/' + file;
}

function resolveActive(activePath) {
  if (!activePath) return getCurrentRelPath();
  if (activePath.includes('/')) return activePath;
  const rel = getCurrentRelPath();
  const slash = rel.lastIndexOf('/');
  if (slash === -1) return activePath;
  return rel.slice(0, slash + 1) + activePath;
}

function navHref(href) {
  return getNavPrefix() + href;
}

function buildHeader(opts = {}) {
  const tenantName = opts.tenantName || '新潟県教育委員会';
  const tenantSub = opts.tenantSub || 'Niigata Prefectural BOE';
  const userName = opts.userName || '佐藤 美咲';
  const userRole = opts.userRole || '情報政策課 · 主任';
  const initials = userName.split(' ').map(s => s[0]).join('').slice(0, 2);

  return `
  <header class="app-header">
    <button class="header-tenant" onclick="window.location.href='${navHref('index.html')}'">
      <div class="header-tenant-avatar">新</div>
      <div class="header-tenant-meta">
        <div class="header-tenant-name">${tenantName}</div>
        <div class="header-tenant-sub">${tenantSub}</div>
      </div>
      <span style="color: var(--ink-3);">${icon('chevronDown', 14)}</span>
    </button>

    <div class="header-org">
      <span>${icon('building', 14)}</span>
      <span>県庁 · 全域</span>
      <span>${icon('chevronDown', 12)}</span>
    </div>

    <div class="header-search">
      ${icon('search', 14)}
      <input type="text" placeholder="人物・組織・フォーム・申請を検索…">
      <kbd>⌘K</kbd>
    </div>

    <div class="header-actions">
      <button class="icon-btn" title="ヘルプ">${icon('help', 18)}</button>
      <button class="icon-btn" title="通知" onclick="toggleNotif()">${icon('bell', 18)}<span class="dot"></span></button>
      <div class="dropdown" id="userDropdown">
        <button class="header-user" onclick="document.getElementById('userDropdown').classList.toggle('open')">
          <div class="header-user-avatar">${initials}</div>
          <div class="header-user-meta">
            <div class="header-user-name">${userName}</div>
            <div class="header-user-role">${userRole}</div>
          </div>
          <span style="color: var(--ink-3);">${icon('chevronDown', 12)}</span>
        </button>
        <div class="dropdown-menu">
          <div class="dropdown-label">${userName}</div>
          <div class="dropdown-item">${icon('user', 14)} プロフィール</div>
          <div class="dropdown-item">${icon('settings', 14)} 設定</div>
          <div class="dropdown-item">${icon('key', 14)} パスワード変更</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item">${icon('logOut', 14)} サインアウト</div>
        </div>
      </div>
    </div>
  </header>`;
}

function buildSidebar(activePath = '') {
  const here = resolveActive(activePath);
  return `
  <aside class="app-sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-brand-mark">A</div>
      <div class="sidebar-brand-text">
        <div class="sidebar-brand-name">Atlas</div>
        <div class="sidebar-brand-sub">教育委員会 Suite</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${NAV.map(item => {
        if (item.type === 'title') {
          return `<div class="sidebar-section-title">${item.label}</div>`;
        }
        const hrefPath = item.href;
        const active = here === hrefPath ? 'active' : '';
        return `<a class="sidebar-link ${active}" href="${navHref(hrefPath)}">
          ${icon(item.icon, 16)}
          <span>${item.label}</span>
          ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
        </a>`;
      }).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-footer-status">全サービス正常</div>
      <div>v2.4.1</div>
    </div>
  </aside>`;
}

function buildLayout(opts = {}) {
  const root = document.getElementById('app');
  const active = opts.active || '';
  root.classList.add('app');
  root.innerHTML = `
    ${buildSidebar(active)}
    ${buildHeader(opts)}
    <main class="app-main">
      <div class="page" id="page">${root.innerHTML}</div>
    </main>
  `;
  // re-render: page content was already inside #app, but we replaced it. Restore:
  // We'll re-design: when calling buildLayout, content should be passed as opts.body
  // For simplicity in this mock, callers should NOT put content in #app before calling buildLayout.
}

function mount(opts = {}) {
  const root = document.getElementById('app');
  const content = root.innerHTML;
  root.className = 'app';
  root.innerHTML = `
    ${buildSidebar(opts.active || '')}
    ${buildHeader(opts)}
    <main class="app-main">
      <div class="page">${content}</div>
    </main>
  `;
  replaceIcons(root);
  document.addEventListener('click', e => {
    document.querySelectorAll('.dropdown.open').forEach(d => {
      if (!d.contains(e.target)) d.classList.remove('open');
    });
  });
}

function replaceIcons(scope) {
  scope.querySelectorAll('[data-i]').forEach(el => {
    const name = el.dataset.i;
    const size = el.dataset.s ? parseInt(el.dataset.s, 10) : 16;
    const sw = el.dataset.w ? parseFloat(el.dataset.w) : 1.75;
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Icons[name] || ''}</svg>`;
  });
}

// ============================================ Modal
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
function closeAllModals() {
  document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });
document.addEventListener('click', e => {
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

// ============================================ Toast
function toast(message, kind = 'default') {
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (kind !== 'default' ? ' ' + kind : '');
  t.innerHTML = `${icon('check', 14)}<span>${message}</span>`;
  stack.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all .2s'; }, 2400);
  setTimeout(() => t.remove(), 2700);
}

// ============================================ Notifications panel
function toggleNotif() {
  let panel = document.getElementById('notifPanel');
  if (panel) { panel.remove(); return; }
  panel = document.createElement('div');
  panel.id = 'notifPanel';
  panel.style.cssText = 'position:fixed;top:60px;right:16px;width:380px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);box-shadow:var(--sh-pop);z-index:80;overflow:hidden;';
  panel.innerHTML = `
    <div style="padding:14px 16px;border-bottom:1px solid var(--border-soft);display:flex;justify-content:space-between;align-items:center">
      <div style="font-family:var(--font-display);font-size:14px;font-weight:600">通知</div>
      <button class="btn btn-ghost btn-sm">すべて既読</button>
    </div>
    <div style="max-height:420px;overflow-y:auto">
      <div class="activity-item" style="padding:12px 16px">
        <div class="activity-avatar" style="background:var(--danger-soft);color:var(--danger)">${icon('alertTriangle',14)}</div>
        <div class="activity-body">
          <div class="activity-text"><strong>CSVインポートで5件エラー</strong> — 高校3年学籍異動.csv</div>
          <div class="activity-time">12分前</div>
        </div>
      </div>
      <div class="activity-item" style="padding:12px 16px">
        <div class="activity-avatar" style="background:var(--warning-soft);color:var(--warning)">${icon('gitBranch',14)}</div>
        <div class="activity-body">
          <div class="activity-text"><strong>所属変更申請</strong> 山本 蓮さん · 新潟高校へ</div>
          <div class="activity-time">1時間前</div>
        </div>
      </div>
      <div class="activity-item" style="padding:12px 16px">
        <div class="activity-avatar" style="background:var(--info-soft);color:var(--info)">${icon('mail',14)}</div>
        <div class="activity-body">
          <div class="activity-text"><strong>フォーム回答</strong> 「在校生調査2026」 1,284件</div>
          <div class="activity-time">3時間前</div>
        </div>
      </div>
    </div>
    <div style="padding:10px 16px;border-top:1px solid var(--border-soft);text-align:center;background:var(--surface-2)">
      <a href="${navHref('import/logs.html')}" class="muted-link fs-12">すべての通知を見る →</a>
    </div>
  `;
  document.body.appendChild(panel);
  setTimeout(() => {
    document.addEventListener('click', function h(e) {
      if (!panel.contains(e.target) && !e.target.closest('[onclick*="toggleNotif"]')) {
        panel.remove();
        document.removeEventListener('click', h);
      }
    });
  }, 50);
}

// ============================================ Tabs
function activateTab(tabsContainer, panelAttr) {
  // simple tab activation by data-tab matching data-panel
  const tabs = tabsContainer.querySelectorAll('[data-tab]');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const id = t.dataset.tab;
    document.querySelectorAll('[data-panel]').forEach(p => {
      p.style.display = p.dataset.panel === id ? '' : 'none';
    });
  }));
}

// ============================================ Active link highlighter (if not in sidebar)
document.addEventListener('DOMContentLoaded', () => {
  // nothing global yet
});
