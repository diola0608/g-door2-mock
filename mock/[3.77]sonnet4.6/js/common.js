/* ============================================================
   EduPlatform - common.js
   Shared header, sidebar, modal, toast, and tab utilities
   ============================================================ */

// ── Navigation Config ──────────────────────────────────────
const NAV = {
  main: [
    { id: 'dashboard', icon: 'fa-gauge-high', label: 'ダッシュボード', href: 'index.html' }
  ],
  roster: [
    { id: 'roster-list',   icon: 'fa-users',           label: '名簿一覧',         href: 'roster-list.html' },
    { id: 'roster-import', icon: 'fa-file-arrow-up',   label: 'CSVインポート',     href: 'roster-import.html' },
    { id: 'transfer',      icon: 'fa-right-left',       label: '所属変更申請',      href: 'transfer.html', badge: '3', badgeClass: 'warn' },
    { id: 'import-log',    icon: 'fa-list-check',       label: 'インポートログ',    href: 'import-log.html', badge: '1', badgeClass: '' }
  ],
  org: [
    { id: 'organization',  icon: 'fa-sitemap',          label: '組織管理',         href: 'organization.html' },
    { id: 'accounts',      icon: 'fa-id-card',          label: 'アカウント管理',    href: 'accounts.html' }
  ],
  forms: [
    { id: 'forms-list',    icon: 'fa-wpforms',          label: 'フォーム一覧',     href: 'forms-list.html' },
    { id: 'form-builder',  icon: 'fa-pen-ruler',        label: 'フォーム作成',     href: 'form-builder.html' }
  ],
  settings: [
    { id: 'permissions',   icon: 'fa-shield-halved',    label: '権限設定',         href: 'permissions.html' },
    { id: 'code-master',   icon: 'fa-table-list',       label: 'コードマスター',   href: 'code-master.html' },
    { id: 'settings',      icon: 'fa-sliders',          label: 'システム設定',     href: 'settings.html' }
  ]
};

const NAV_SECTIONS = [
  { key: 'main',     label: null,         items: NAV.main },
  { key: 'roster',   label: '名簿管理',    items: NAV.roster },
  { key: 'org',      label: '組織・アカウント', items: NAV.org },
  { key: 'forms',    label: 'フォーム',    items: NAV.forms },
  { key: 'settings', label: '設定',        items: NAV.settings }
];

// ── Render Header ──────────────────────────────────────────
function renderHeader() {
  const header = document.getElementById('g-header');
  if (!header) return;
  header.innerHTML = `
    <div class="g-header__brand">
      <div class="g-header__logo">EP</div>
      <div class="g-header__brand-name">
        <strong>EduPlatform</strong>
        <span>教育情報管理システム</span>
      </div>
    </div>
    <div class="g-header__tenant" id="tenant-btn">
      <span class="dot"></span>
      <span>愛知県教育委員会</span>
      <i class="fa-solid fa-chevron-down" style="font-size:9px;opacity:.6"></i>
    </div>
    <div class="g-header__search">
      <i class="fa-solid fa-magnifying-glass search-icon"></i>
      <input type="text" placeholder="人物・組織・フォームを検索…" id="global-search">
    </div>
    <div class="g-header__spacer"></div>
    <div class="g-header__actions">
      <button class="header-icon-btn" id="notif-btn" title="通知">
        <i class="fa-solid fa-bell"></i>
        <span class="badge"></span>
      </button>
      <button class="header-icon-btn" title="ヘルプ">
        <i class="fa-solid fa-circle-question"></i>
      </button>
      <div class="header-user" id="user-menu-btn">
        <div class="header-avatar">田中</div>
        <div class="header-user-info">
          <strong>田中 教子</strong>
          <span>テナント管理者</span>
        </div>
        <i class="fa-solid fa-chevron-down" style="font-size:9px;color:rgba(255,255,255,.4);margin-left:4px"></i>
      </div>
    </div>
    <!-- Notification Panel -->
    <div class="notif-panel" id="notif-panel">
      <div class="notif-panel__header">
        <span class="notif-panel__title">通知</span>
        <span class="badge badge-red notif-panel__badge">4</span>
        <span class="notif-panel__all">すべて見る</span>
      </div>
      <div class="notif-list">
        <div class="notif-item unread">
          <div class="notif-icon" style="background:var(--red-100);color:var(--red-600)"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <div class="notif-body">
            <div class="notif-text">CSVインポートで<strong>3件のエラー</strong>が発生しています</div>
            <div class="notif-time">5分前</div>
          </div>
        </div>
        <div class="notif-item unread">
          <div class="notif-icon" style="background:var(--yellow-100);color:var(--yellow-600)"><i class="fa-solid fa-right-left"></i></div>
          <div class="notif-body">
            <div class="notif-text"><strong>所属変更申請</strong>が3件、承認待ちです</div>
            <div class="notif-time">1時間前</div>
          </div>
        </div>
        <div class="notif-item unread">
          <div class="notif-icon" style="background:var(--brand-100);color:var(--brand)"><i class="fa-solid fa-rotate"></i></div>
          <div class="notif-body">
            <div class="notif-text">Google Workspaceとの<strong>同期が完了</strong>しました（847件）</div>
            <div class="notif-time">2時間前</div>
          </div>
        </div>
        <div class="notif-item">
          <div class="notif-icon" style="background:var(--green-100);color:var(--green-600)"><i class="fa-solid fa-envelope-open-text"></i></div>
          <div class="notif-body">
            <div class="notif-text">フォーム「<strong>携帯番号登録</strong>」の回答が82件集まりました</div>
            <div class="notif-time">昨日</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Notification panel toggle
  document.getElementById('notif-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('notif-panel').classList.toggle('open');
  });
  document.addEventListener('click', () => {
    document.getElementById('notif-panel')?.classList.remove('open');
  });
}

// ── Render Sidebar ─────────────────────────────────────────
function renderSidebar(activeId) {
  const sidebar = document.getElementById('g-sidebar');
  if (!sidebar) return;

  let html = '';
  NAV_SECTIONS.forEach(section => {
    html += `<div class="sidebar-section">`;
    if (section.label) {
      html += `<p class="sidebar-section-label">${section.label}</p>`;
    }
    section.items.forEach(item => {
      const isActive = item.id === activeId;
      const badge = item.badge
        ? `<span class="sidebar-badge ${item.badgeClass || ''}">${item.badge}</span>`
        : '';
      html += `
        <a class="sidebar-item ${isActive ? 'active' : ''}" href="${item.href}">
          <span class="sidebar-item__icon"><i class="fa-solid ${item.icon}"></i></span>
          <span>${item.label}</span>
          ${badge}
        </a>`;
    });
    html += `</div>`;
  });

  html += `
    <div class="sidebar-footer">
      <div class="sidebar-item" style="font-size:12px;color:rgba(255,255,255,.3)">
        <span class="sidebar-item__icon"><i class="fa-solid fa-code-branch"></i></span>
        <span>v2.4.1</span>
      </div>
    </div>`;

  sidebar.innerHTML = html;
}

// ── Modal Utilities ────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Close on overlay click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal(id);
  }, { once: false });
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Auto-bind close buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
  });
  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => {
        m.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });
});

// ── Toast Notifications ────────────────────────────────────
let toastContainer = null;
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast(message, type = 'info', duration = 3500) {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-circle' };
  const tc = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" style="font-size:16px;flex-shrink:0"></i><span>${message}</span>`;
  tc.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(24px)';
    toast.style.transition = 'opacity .2s,transform .2s';
    setTimeout(() => toast.remove(), 220);
  }, duration);
}

// ── Tab Utilities ──────────────────────────────────────────
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '[data-tabs]');
  containers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels  = container.querySelectorAll('.tab-panel');
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        const panel = target
          ? container.querySelector(`[data-tab-panel="${target}"]`)
          : panels[i];
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// ── Org Tree ───────────────────────────────────────────────
function initOrgTree() {
  document.querySelectorAll('.org-tree-node__row').forEach(row => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      const node = row.closest('.org-tree-node');
      const children = node.querySelector('.org-tree-children');
      if (children) {
        children.classList.toggle('open');
        const icon = row.querySelector('.org-tree-node__toggle i');
        if (icon) {
          icon.style.transform = children.classList.contains('open') ? 'rotate(90deg)' : '';
        }
      }
      // Selection highlight
      document.querySelectorAll('.org-tree-node__row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
    });
  });
}

// ── Sidebar Submenu ────────────────────────────────────────
function initSidebarSubmenus() {
  document.querySelectorAll('.sidebar-item.has-sub').forEach(item => {
    item.addEventListener('click', () => {
      const sub = item.nextElementSibling;
      if (sub?.classList.contains('sidebar-submenu')) {
        sub.classList.toggle('open');
        item.classList.toggle('open');
      }
    });
  });
}

// ── Dropdown Menu ──────────────────────────────────────────
function initDropdowns() {
  document.querySelectorAll('[data-dropdown]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = document.getElementById(btn.dataset.dropdown);
      if (!menu) return;
      const isOpen = menu.classList.contains('open');
      document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
      if (!isOpen) {
        menu.classList.add('open');
        // Position it
        const rect = btn.getBoundingClientRect();
        menu.style.top = (rect.bottom + 4) + 'px';
        menu.style.right = (window.innerWidth - rect.right) + 'px';
        menu.style.left = 'auto';
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  });
}

// ── Checkbox Select All ────────────────────────────────────
function initSelectAll() {
  const selectAll = document.getElementById('select-all');
  if (!selectAll) return;
  selectAll.addEventListener('change', () => {
    document.querySelectorAll('.row-check').forEach(cb => {
      cb.checked = selectAll.checked;
      const row = cb.closest('tr');
      if (row) row.classList.toggle('selected', selectAll.checked);
    });
    updateBulkActions();
  });
  document.querySelectorAll('.row-check').forEach(cb => {
    cb.addEventListener('change', () => {
      const row = cb.closest('tr');
      if (row) row.classList.toggle('selected', cb.checked);
      updateBulkActions();
      // Update select-all state
      const all = document.querySelectorAll('.row-check');
      const checked = [...all].filter(c => c.checked);
      selectAll.indeterminate = checked.length > 0 && checked.length < all.length;
      selectAll.checked = checked.length === all.length;
    });
  });
}

function updateBulkActions() {
  const checked = document.querySelectorAll('.row-check:checked').length;
  const bar = document.getElementById('bulk-action-bar');
  if (bar) {
    bar.style.display = checked > 0 ? 'flex' : 'none';
    const count = bar.querySelector('.bulk-count');
    if (count) count.textContent = `${checked}件を選択中`;
  }
}

// ── Wizard Steps ───────────────────────────────────────────
function initWizard(steps) {
  let current = 0;
  function show(n) {
    steps.panels.forEach((id, i) => {
      const panel = document.getElementById(id);
      if (panel) panel.style.display = i === n ? 'block' : 'none';
    });
    steps.stepEls.forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i < n)  el.classList.add('done');
      if (i === n) el.classList.add('active');
    });
    current = n;
  }
  show(0);
  return {
    next: () => { if (current < steps.panels.length - 1) show(current + 1); },
    prev: () => { if (current > 0) show(current - 1); },
    goto: (n) => show(n),
    current: () => current
  };
}

// ── Fieldset History Toggle ────────────────────────────────
function initHistoryToggles() {
  document.querySelectorAll('[data-history-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.historyToggle);
      if (!target) return;
      const isOpen = target.style.display !== 'none';
      target.style.display = isOpen ? 'none' : 'block';
      btn.title = isOpen ? '履歴を表示' : '履歴を隠す';
    });
  });
}

// ── Init All ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  const activeId = document.body.dataset.page;
  renderSidebar(activeId);
  initTabs();
  initDropdowns();
  initSidebarSubmenus();
});
