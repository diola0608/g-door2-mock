/**
 * 共通スクリプト
 */

const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  "git-compare": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>',
  "file-text": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  "user-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="9" y1="12" x2="9" y2="12.01"/><line x1="12" y1="12" x2="12" y2="12.01"/><line x1="15" y1="12" x2="15" y2="12.01"/></svg>',
  "refresh-cw": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  "message-circle": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  "alert-triangle": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  "id-card": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h.01"/><path d="M9.5 13a2.5 2.5 0 1 1 5 0"/><line x1="16" y1="9" x2="16" y2="9.01"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  "more-horizontal": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
  "chevron-right": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  "chevron-down": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  "map-pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  school: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
};

const NAV = [
  { group: "HOME", items: [
    { id: "dashboard", label: "ダッシュボード", href: "index.html", icon: "home" }
  ]},
  { group: "名簿管理", items: [
    { id: "roster_list", label: "名簿一覧", href: "roster_list.html", icon: "users" },
    { id: "roster_import", label: "CSVインポート", href: "roster_import.html", icon: "upload" },
    { id: "roster_transfer", label: "所属変更申請", href: "roster_transfer.html", icon: "git-compare" },
    { id: "logs", label: "処理ログ", href: "logs.html", icon: "file-text" }
  ]},
  { group: "フォーム", items: [
    { id: "forms_list", label: "フォーム一覧", href: "forms_list.html", icon: "layout" },
    { id: "forms_create", label: "フォーム作成", href: "forms_create.html", icon: "edit" }
  ]},
  { group: "アカウント・権限", items: [
    { id: "accounts", label: "アカウント管理", href: "accounts.html", icon: "user-check" },
    { id: "permissions", label: "権限設定", href: "permissions.html", icon: "shield" },
    { id: "attributes", label: "属性項目設定", href: "attributes.html", icon: "tag" },
    { id: "codes", label: "コードマスター", href: "codes.html", icon: "bookmark" }
  ]},
  { group: "組織・設定", items: [
    { id: "organizations", label: "組織管理", href: "organizations.html", icon: "building" },
    { id: "sync", label: "同期設定", href: "sync.html", icon: "refresh-cw" },
    { id: "contact", label: "問い合わせ", href: "contact.html", icon: "message-circle" }
  ]}
];

function icon(name) { return ICONS[name] || ICONS.circle; }

function buildHeader() {
  const unread = (MOCK_DATA.notifications || []).filter(n => !n.read).length;
  return `
    <header class="header">
      <button class="menu-toggle" id="menu-toggle" aria-label="メニュー">${icon("more-horizontal")}</button>
      <a href="index.html" class="header-logo">
        <div class="header-logo-mark">静</div>
        <span>静岡県教育委員会 統合管理システム</span>
      </a>
      <div class="header-actions">
        <div class="header-search">
          ${icon("search")}
          <input type="text" placeholder="人・組織・フォームを検索">
        </div>
        <button class="header-icon-btn" id="notif-btn" aria-label="通知">
          ${icon("bell")}
          ${unread > 0 ? '<span class="badge-dot"></span>' : ''}
        </button>
        <div class="header-user">
          <div class="header-user-avatar">山</div>
          <div class="header-user-info">
            <div class="header-user-name">${escapeHtml(MOCK_DATA.user.name)}</div>
            <div class="header-user-org">${escapeHtml(MOCK_DATA.user.org)}</div>
          </div>
        </div>
      </div>
    </header>
  `;
}

function buildSidebar(current) {
  let html = '<aside class="sidebar" id="sidebar"><nav>';
  for (const g of NAV) {
    html += `<div class="sidebar-group"><div class="sidebar-label">${escapeHtml(g.group)}</div>`;
    for (const item of g.items) {
      const active = item.id === current ? ' active' : '';
      html += `<a class="sidebar-link${active}" href="${item.href}">${icon(item.icon)}<span>${escapeHtml(item.label)}</span></a>`;
    }
    html += '</div>';
  }
  html += '</nav></aside>';
  return html;
}

function initLayout() {
  const current = document.body.dataset.page || 'dashboard';
  const main = document.getElementById('main');
  if (!main) return;
  document.body.insertAdjacentHTML('afterbegin', buildHeader());
  main.insertAdjacentHTML('beforebegin', buildSidebar(current));

  // モバイルメニュー
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    // サイドバー外タップで閉じる
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // 通知ボタンは仮
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => showToast('通知センターは現在モック表示です', 'info'));
  }

  // ページ別初期化
  const initFn = window['init_' + current];
  if (typeof initFn === 'function') initFn();

  // アイコン置換
  replaceIcons();
}

function replaceIcons() {
  document.querySelectorAll('.icon[data-icon]').forEach(el => {
    el.innerHTML = icon(el.dataset.icon);
  });
}

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.iconHtml = icon;
window.escapeHtml = escapeHtml;

/* Toast */
let toastTimer;
window.showToast = function(message, type = 'info', title = '') {
  let existing = document.getElementById('global-toast');
  if (!existing) {
    document.body.insertAdjacentHTML('beforeend', '<div id="global-toast" class="toast"><div class="toast-title"></div><div class="toast-body"></div></div>');
    existing = document.getElementById('global-toast');
  }
  const typeClass = { success: 'toast-success', warning: 'toast-warning', danger: 'toast-danger', error: 'toast-danger', info: '' }[type] || '';
  existing.className = 'toast ' + typeClass;
  existing.querySelector('.toast-title').textContent = title || (type === 'success' ? '成功' : type === 'warning' ? '注意' : type === 'danger' || type === 'error' ? 'エラー' : 'お知らせ');
  existing.querySelector('.toast-body').textContent = message;
  clearTimeout(toastTimer);
  requestAnimationFrame(() => existing.classList.add('show'));
  toastTimer = setTimeout(() => existing.classList.remove('show'), 3200);
};

/* Modal */
window.openModal = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    el.addEventListener('click', modalOverlayClick);
  }
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
    el.removeEventListener('click', modalOverlayClick);
  }
};

function modalOverlayClick(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* Tabs */
window.initTabs = function(container) {
  container = container || document;
  container.querySelectorAll('.tabs').forEach(tabBar => {
    tabBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (!btn) return;
      const tabGroup = btn.closest('.tabs');
      const paneGroup = tabGroup.nextElementSibling;
      tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      if (paneGroup && paneGroup.classList.contains('tab-contents')) {
        paneGroup.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
        const target = btn.dataset.tab;
        if (target) {
          const pane = paneGroup.querySelector('[data-tab="' + target + '"]');
          if (pane) pane.classList.add('active');
        }
      }
    });
  });
};

/* Table simple filter */
window.attachTableFilter = function(inputId, tableSelector, columns) {
  const input = document.getElementById(inputId);
  const table = document.querySelector(tableSelector);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      const text = Array.from(row.querySelectorAll('td')).map(td => td.textContent.toLowerCase()).join(' ');
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
};

/* Status helpers */
window.statusClass = function(status) {
  const map = {
    '成功': 'success',
    '公開中': 'success',
    '実行済み': 'success',
    '処理中': 'info',
    '下書き': 'neutral',
    '承認待ち': 'warning',
    '承認済み': 'info',
    'エラー': 'danger',
    '終了': 'neutral',
    'active': 'success',
    'inactive': 'neutral'
  };
  return 'status-' + (map[status] || 'neutral');
};

/* Date helper */
window.formatDate = function(d) {
  if (!d) return '-';
  const date = new Date(d);
  if (isNaN(date)) return d;
  return `${date.getFullYear()}/${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getDate()).padStart(2,'0')}`;
};

window.formatDateTime = function(d) {
  if (!d) return '-';
  const date = new Date(d);
  if (isNaN(date)) return d;
  return `${date.getFullYear()}/${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
};

/* Org path */
window.getOrgPath = function(orgId) {
  const org = MOCK_DATA.organizations.find(o => o.id === orgId);
  if (!org) return '-';
  const parts = [org.name];
  let parentId = org.parentId;
  while (parentId) {
    const parent = MOCK_DATA.organizations.find(o => o.id === parentId);
    if (!parent) break;
    parts.unshift(parent.name);
    parentId = parent.parentId;
  }
  return parts.join(' > ');
};

window.getClassName = function(id) {
  const c = MOCK_DATA.classes.find(x => x.id === id);
  return c ? c.name : '-';
};

window.getOrgName = function(id) {
  const o = MOCK_DATA.organizations.find(x => x.id === id);
  return o ? o.name : '-';
};

window.getPersonName = function(id) {
  const p = MOCK_DATA.people.find(x => x.id === id);
  return p ? p.name : '-';
};

/* Org tree rendering */
window.renderOrgTree = function(parentId, container) {
  const children = MOCK_DATA.organizations.filter(o => o.parentId === parentId).sort((a,b) => a.type.localeCompare(b.type));
  if (children.length === 0) return '';
  let html = '<div class="org-children">';
  for (const org of children) {
    const hasChildren = MOCK_DATA.organizations.some(o => o.parentId === org.id);
    const toggle = hasChildren ? icon('chevron-down') : '<span style="width:18px"></span>';
    html += `
      <div class="org-node">
        <div class="org-node-header" data-org-id="${org.id}">
          <span class="org-toggle">${toggle}</span>
          <span class="org-name">${escapeHtml(org.name)}</span>
          <span class="tag tag-primary" style="margin-left:auto">${escapeHtml(org.type)}</span>
        </div>
        ${renderOrgTree(org.id)}
      </div>
    `;
  }
  html += '</div>';
  return html;
};

/* Sidebar init on DOM ready */
document.addEventListener('DOMContentLoaded', initLayout);
