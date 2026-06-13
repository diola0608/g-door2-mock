const NAV_CONFIG = {
  dashboard: {
    label: 'ダッシュボード',
    links: [
      { href: 'index.html', icon: 'home', label: 'ホーム', id: 'home' },
    ]
  },
  roster: {
    label: '名簿管理',
    back: 'index.html',
    links: [
      { href: 'pages/roster-list.html', icon: 'users', label: '人物ディレクトリ', id: 'roster-list' },
      { href: 'pages/attribute-items.html', icon: 'layers', label: '属性項目設定', id: 'attribute-items' },
      { href: 'pages/import.html', icon: 'upload', label: 'CSVインポート', id: 'import' },
      { href: 'pages/import-logs.html', icon: 'list', label: 'インポートログ', id: 'import-logs' },
      { href: 'pages/transfer-requests.html', icon: 'transfer', label: '所属変更申請', id: 'transfer' },
    ]
  },
  organization: {
    label: '組織管理',
    back: 'index.html',
    links: [
      { href: 'pages/org-tree.html', icon: 'building', label: '組織ツリー', id: 'org-tree' },
    ]
  },
  accounts: {
    label: 'アカウント管理',
    back: 'index.html',
    links: [
      { href: 'pages/accounts.html', icon: 'mail', label: 'アカウント一覧', id: 'accounts' },
    ]
  },
  permissions: {
    label: '権限設定',
    back: 'index.html',
    links: [
      { href: 'pages/permissions.html', icon: 'shield', label: '権限ルール', id: 'permissions' },
      { href: 'pages/code-master.html', icon: 'code', label: 'コードマスター', id: 'code-master' },
    ]
  },
  forms: {
    label: 'フォーム',
    back: 'index.html',
    links: [
      { href: 'pages/forms-list.html', icon: 'clipboard', label: 'フォーム一覧', id: 'forms-list' },
      { href: 'pages/form-builder.html', icon: 'edit', label: 'フォーム作成', id: 'form-builder' },
    ]
  },
};

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return '';
}

function renderHeader() {
  const base = getBasePath();
  return `
    <header class="global-header">
      <a href="${base}index.html" class="header-logo">
        ${Icons.logo}
        EduConnect
      </a>
      <div class="header-tenant">
        ${Icons.building}
        〇〇県教育委員会
      </div>
      <div class="header-spacer"></div>
      <div class="header-search">
        ${Icons.search}
        <input type="text" placeholder="人物・組織を検索..." id="global-search">
      </div>
      <div class="header-actions">
        <button class="header-btn" id="btn-notifications" title="通知">
          ${Icons.bell}
          <span class="badge">3</span>
        </button>
        <button class="header-btn" id="btn-help" title="ヘルプ">
          ${Icons.help}
        </button>
        <button class="header-user" id="btn-user-menu">
          <div class="header-avatar">田</div>
          <span>田中 太郎</span>
        </button>
      </div>
    </header>
  `;
}

function renderSidebar(service, activeId) {
  const base = getBasePath();
  const config = NAV_CONFIG[service] || NAV_CONFIG.dashboard;
  let html = '<nav class="sidebar">';

  if (config.back) {
    html += `<a href="${base}${config.back}" class="sidebar-back">${Icons.arrowLeft} ダッシュボードに戻る</a>`;
  }

  html += `<div class="sidebar-section"><div class="sidebar-label">${config.label}</div>`;

  config.links.forEach(link => {
    const isActive = link.id === activeId ? ' active' : '';
    const href = link.href.startsWith('pages/') ? `${base}${link.href}` : link.href;
    html += `<a href="${href}" class="sidebar-link${isActive}">${Icons[link.icon] || ''} ${link.label}</a>`;
  });

  html += '</div></nav>';
  return html;
}

function renderNotificationsModal() {
  const base = getBasePath();
  return `
    <div class="modal-overlay" id="notifications-modal">
      <div class="modal">
        <div class="modal-header">
          <h2>通知</h2>
          <button class="modal-close" data-modal-close>&times;</button>
        </div>
        <div class="modal-body" style="padding-top:12px">
          <div style="padding:12px 0;border-bottom:1px solid var(--color-gray-100)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="status-dot error"></span>
              <strong style="font-size:0.9rem">CSVインポートエラー</strong>
              <span style="font-size:0.75rem;color:var(--color-gray-400);margin-left:auto">2時間前</span>
            </div>
            <p style="font-size:0.85rem;color:var(--color-gray-500)">教員名簿_2026年4月.csv — 12件のエラーが発生しました</p>
            <a href="${base}pages/import-logs.html" style="font-size:0.8rem;margin-top:4px;display:inline-block">ログを確認 →</a>
          </div>
          <div style="padding:12px 0;border-bottom:1px solid var(--color-gray-100)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="status-dot pending"></span>
              <strong style="font-size:0.9rem">所属変更申請の承認待ち</strong>
              <span style="font-size:0.75rem;color:var(--color-gray-400);margin-left:auto">5時間前</span>
            </div>
            <p style="font-size:0.85rem;color:var(--color-gray-500)">佐藤 花子さんの転入申請（A小学校 → B小学校）が承認待ちです</p>
            <a href="${base}pages/transfer-requests.html" style="font-size:0.8rem;margin-top:4px;display:inline-block">申請を確認 →</a>
          </div>
          <div style="padding:12px 0">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="status-dot active"></span>
              <strong style="font-size:0.9rem">フォーム回答期限</strong>
              <span style="font-size:0.75rem;color:var(--color-gray-400);margin-left:auto">1日前</span>
            </div>
            <p style="font-size:0.85rem;color:var(--color-gray-500)">「自家用携帯番号登録」フォームの回答期限が3日後に迫っています（回答率 68%）</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initLayout(service, activeId) {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
    ${renderHeader()}
    <div class="app-layout">
      ${renderSidebar(service, activeId)}
      <main class="main-content" id="main-content"></main>
    </div>
    ${renderNotificationsModal()}
  `;

  document.getElementById('btn-notifications')?.addEventListener('click', () => {
    openModal('notifications-modal');
  });

  document.getElementById('btn-user-menu')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.getElementById('user-dropdown');
    if (menu) menu.classList.toggle('open');
  });
}

function setPageContent(html) {
  const el = document.getElementById('main-content');
  if (el) el.innerHTML = html;
}
