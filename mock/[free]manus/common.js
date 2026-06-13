// ===== CODEX EDU SYSTEM - Common JS =====

// ---- Navigation ----
function navigate(page) {
  window.location.href = page;
}

// ---- Tab switching ----
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '.tabs-container');
  containers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-item');
    const contents = container.querySelectorAll('.tab-content');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        if (contents[i]) contents[i].classList.add('active');
      });
    });
  });
}

// ---- Modal ----
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ---- Dropdown ----
function toggleDropdown(id) {
  const menu = document.getElementById(id);
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  // close all
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  if (!isOpen) menu.classList.add('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  }
});

// ---- Notification Panel ----
function toggleNotifications() {
  const panel = document.getElementById('notificationPanel');
  if (panel) panel.classList.toggle('open');
}

// ---- Tree toggle ----
function toggleTree(id) {
  const children = document.getElementById(id);
  const toggle = document.querySelector(`[data-tree="${id}"]`);
  if (children) {
    children.classList.toggle('open');
    if (toggle) toggle.classList.toggle('open');
  }
}

// ---- Toast notification ----
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const colors = {
    success: { bg: '#def7ec', color: '#03543f', border: '#6ee7b7', icon: '✓' },
    error: { bg: '#fde8e8', color: '#9b1c1c', border: '#fca5a5', icon: '✕' },
    info: { bg: '#e0f2fe', color: '#0c4a6e', border: '#bae6fd', icon: 'ℹ' },
    warning: { bg: '#fdf6b2', color: '#78350f', border: '#fde68a', icon: '⚠' },
  };
  const c = colors[type] || colors.success;
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: ${c.bg}; color: ${c.color}; border: 1px solid ${c.border};
    padding: 12px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px;
    animation: slideInRight 0.3s ease; max-width: 320px;
  `;
  toast.innerHTML = `<span style="font-size:16px">${c.icon}</span> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Active sidebar item ----
function setActiveSidebar() {
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-item').forEach(item => {
    const href = item.getAttribute('data-href');
    if (href && href === current) {
      item.classList.add('active');
    }
  });
}

// ---- Render global header ----
function renderHeader(title) {
  return `
  <header class="global-header">
    <div class="header-logo" onclick="navigate('index.html')" style="cursor:pointer">
      <div class="logo-icon">C</div>
      <div>
        <div>CODEX EDU</div>
        <span class="logo-sub">神奈川県教育委員会</span>
      </div>
    </div>
    <div class="header-search">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="人物・組織・フォームを検索...">
    </div>
    <div class="header-actions">
      <div class="header-tenant">
        <span>🏛</span> 神奈川県テナント
      </div>
      <button class="header-icon-btn" onclick="toggleNotifications()" data-tooltip="通知">
        🔔
        <span class="badge">3</span>
      </button>
      <button class="header-icon-btn" data-tooltip="ヘルプ">❓</button>
      <button class="header-icon-btn" data-tooltip="設定" onclick="navigate('settings.html')">⚙️</button>
      <div class="header-user" onclick="toggleDropdown('userMenu')">
        <div class="user-avatar">田</div>
        <div class="user-info">
          <div class="user-name">田中 義雄</div>
          <div class="user-role">システム管理者</div>
        </div>
        <span style="color:var(--gray-400);font-size:12px;margin-left:4px">▾</span>
      </div>
      <div class="dropdown">
        <div class="dropdown-menu" id="userMenu">
          <div class="dropdown-item">👤 プロフィール</div>
          <div class="dropdown-item">🔑 パスワード変更</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item danger">🚪 ログアウト</div>
        </div>
      </div>
    </div>
  </header>

  <!-- Notification Panel -->
  <div class="notification-panel" id="notificationPanel">
    <div class="notif-header">
      <span class="notif-title">通知</span>
      <button class="btn btn-ghost btn-sm" onclick="toggleNotifications()">✕</button>
    </div>
    <div class="notif-list">
      <div class="notif-item unread" onclick="navigate('csv-import.html')">
        <div class="notif-item-title">⚠️ CSVインポートエラー</div>
        <div class="notif-item-body">横浜市立南小学校のCSVインポートで3件のエラーが発生しました</div>
        <div class="notif-item-time">10分前</div>
      </div>
      <div class="notif-item unread" onclick="navigate('transfer-approval.html')">
        <div class="notif-item-title">📋 所属変更申請</div>
        <div class="notif-item-body">山田 花子さんの所属変更申請が届いています（横浜市立北中学校→南高校）</div>
        <div class="notif-item-time">1時間前</div>
      </div>
      <div class="notif-item unread" onclick="navigate('forms.html')">
        <div class="notif-item-title">📝 フォーム回答</div>
        <div class="notif-item-body">「2024年度 教員研修アンケート」の回答が更新されました（回答率 68%）</div>
        <div class="notif-item-time">3時間前</div>
      </div>
      <div class="notif-item">
        <div class="notif-item-title">✅ 所属変更完了</div>
        <div class="notif-item-body">鈴木 一郎さんの所属変更が完了しました（横浜市立東小学校）</div>
        <div class="notif-item-time">昨日</div>
      </div>
      <div class="notif-item">
        <div class="notif-item-title">🔄 Google Workspace同期</div>
        <div class="notif-item-body">定期同期が完了しました（対象: 1,234件）</div>
        <div class="notif-item-time">昨日</div>
      </div>
    </div>
  </div>
  `;
}

// ---- Render sidebar ----
function renderSidebar(activePage) {
  const items = [
    { section: 'メイン', items: [
      { icon: '🏠', label: 'ダッシュボード', href: 'index.html' },
    ]},
    { section: '名簿管理', items: [
      { icon: '👥', label: '人物一覧', href: 'roster.html' },
      { icon: '🏫', label: '組織管理', href: 'organizations.html' },
      { icon: '📋', label: '所属変更申請', href: 'transfer-approval.html', badge: '2', badgeType: '' },
    ]},
    { section: 'アカウント', items: [
      { icon: '🔐', label: 'アカウント管理', href: 'accounts.html' },
      { icon: '🛡️', label: '権限設定', href: 'permissions.html' },
    ]},
    { section: 'データ管理', items: [
      { icon: '📤', label: 'CSVインポート', href: 'csv-import.html' },
      { icon: '📊', label: 'インポートログ', href: 'import-log.html', badge: '3', badgeType: '' },
    ]},
    { section: 'フォーム', items: [
      { icon: '📝', label: 'フォーム管理', href: 'forms.html' },
      { icon: '📈', label: '集計・レポート', href: 'form-results.html' },
    ]},
    { section: 'システム', items: [
      { icon: '⚙️', label: 'システム設定', href: 'settings.html' },
      { icon: '📜', label: '監査ログ', href: 'audit-log.html' },
    ]},
  ];

  let html = '<nav class="sidebar">';
  items.forEach(section => {
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-label">${section.section}</div>`;
    section.items.forEach(item => {
      const isActive = item.href === activePage;
      const badgeHtml = item.badge ? `<span class="item-badge ${item.badgeType || ''}">${item.badge}</span>` : '';
      html += `
        <button class="sidebar-item ${isActive ? 'active' : ''}" onclick="navigate('${item.href}')" data-href="${item.href}">
          <span class="item-icon">${item.icon}</span>
          ${item.label}
          ${badgeHtml}
        </button>
      `;
    });
    html += `</div>`;
  });
  html += '</nav>';
  return html;
}

// ---- Init on load ----
document.addEventListener('DOMContentLoaded', () => {
  initTabs('.tabs-container');
  setActiveSidebar();
});

// ---- CSS animation ----
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeIn 0.3s ease; }
`;
document.head.appendChild(style);
