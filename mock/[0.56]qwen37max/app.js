const NAV_ITEMS = [
  { section: "メイン", items: [
    { id: "dashboard", label: "ダッシュボード", icon: "dashboard", page: "dashboard" },
  ]},
  { section: "名簿・組織", items: [
    { id: "directory", label: "名簿一覧", icon: "groups", page: "directory" },
    { id: "organization", label: "組織管理", icon: "account_tree", page: "organization" },
    { id: "accounts", label: "アカウント管理", icon: "manage_accounts", page: "accounts" },
    { id: "transfers", label: "所属変更申請", icon: "swap_horiz", page: "transfers", badge: 2 },
  ]},
  { section: "フォーム", items: [
    { id: "forms", label: "フォーム管理", icon: "description", page: "forms" },
  ]},
  { section: "データ管理", items: [
    { id: "csv-import", label: "CSVインポート", icon: "upload_file", page: "csv-import" },
    { id: "logs", label: "操作ログ", icon: "history", page: "logs" },
  ]},
  { section: "設定", items: [
    { id: "attributes", label: "属性項目設定", icon: "tune", page: "attributes" },
    { id: "permissions", label: "権限設定", icon: "admin_panel_settings", page: "permissions" },
    { id: "codes", label: "コード管理", icon: "code", page: "codes" },
    { id: "settings", label: "システム設定", icon: "settings", page: "settings" },
  ]}
];

let currentPage = 'dashboard';
let sidebarCollapsed = false;
let isNavigating = false;

function init() {
  renderSidebar();
  setupEventListeners();
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(hash);
}

function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  let html = '';
  NAV_ITEMS.forEach(section => {
    html += `<div class="nav-section-title">${section.section}</div>`;
    section.items.forEach(item => {
      const active = currentPage === item.page ? 'active' : '';
      html += `
        <div class="nav-item ${active}" data-page="${item.page}" onclick="navigateTo('${item.page}')">
          <span class="material-symbols-outlined">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        </div>`;
    });
  });
  nav.innerHTML = html;
}

function setupEventListeners() {
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  document.getElementById('notifBtn').addEventListener('click', toggleNotifPanel);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeNotifPanel(); }
  });
  window.addEventListener('hashchange', () => {
    if (isNavigating) return;
    const hash = window.location.hash.slice(1) || 'dashboard';
    navigateTo(hash);
  });
}

function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
}

function toggleNotifPanel() {
  const panel = document.getElementById('notifPanel');
  const isActive = panel.classList.contains('active');
  if (isActive) { closeNotifPanel(); return; }
  renderNotifications();
  panel.classList.add('active');
}

function closeNotifPanel() {
  document.getElementById('notifPanel').classList.remove('active');
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  list.innerHTML = DUMMY_DATA.alerts.map(a => `
    <div class="notif-item unread" onclick="navigateTo('${a.page}'); closeNotifPanel();">
      <div class="notif-dot ${a.type}"></div>
      <div class="notif-content">
        <div class="notif-title">${a.title}</div>
        <div class="notif-message">${a.message}</div>
        <div class="notif-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function navigateTo(page, params) {
  currentPage = page;
  isNavigating = true;
  window.location.hash = page;
  setTimeout(() => { isNavigating = false; }, 50);
  renderSidebar();
  const container = document.getElementById('pageContainer');
  container.innerHTML = '';
  container.classList.remove('fade-in');
  void container.offsetWidth;
  container.classList.add('fade-in');

  const renderers = {
    'dashboard': renderDashboard,
    'directory': renderDirectory,
    'person-detail': () => renderPersonDetail(params),
    'organization': renderOrganization,
    'accounts': renderAccounts,
    'attributes': renderAttributes,
    'permissions': renderPermissions,
    'forms': renderForms,
    'form-builder': () => renderFormBuilder(params),
    'form-responses': () => renderFormResponses(params),
    'csv-import': renderCsvImport,
    'transfers': renderTransfers,
    'logs': renderLogs,
    'codes': renderCodes,
    'settings': renderSettings
  };

  const renderer = renderers[page] || renderDashboard;
  renderer();
}

function openModal(title, bodyHtml, footerHtml) {
  document.getElementById('modalHeader').innerHTML = `
    <h3 class="modal-title">${title}</h3>
    <button class="modal-close" onclick="closeModal()">
      <span class="material-symbols-outlined">close</span>
    </button>`;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalFooter').innerHTML = footerHtml || '';
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>${message}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== DASHBOARD =====
function renderDashboard() {
  const s = DUMMY_DATA.dashboardStats;
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">ダッシュボード</h1>
        <p class="page-subtitle">ようこそ、${DUMMY_DATA.currentUser.name}さん。システムの概要を確認できます。</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary" onclick="showToast('データを更新しました', 'success')">
          <span class="material-symbols-outlined">refresh</span>更新
        </button>
      </div>
    </div>

    <div class="stats-grid slide-up">
      <div class="stat-card" onclick="navigateTo('directory')">
        <div class="stat-icon blue"><span class="material-symbols-outlined">groups</span></div>
        <div class="stat-info">
          <div class="stat-value">${s.totalPeople.toLocaleString()}</div>
          <div class="stat-label">登録総人数</div>
          <div class="stat-change up">+124 今月</div>
        </div>
      </div>
      <div class="stat-card" onclick="navigateTo('directory')">
        <div class="stat-icon green"><span class="material-symbols-outlined">school</span></div>
        <div class="stat-info">
          <div class="stat-value">${s.totalTeachers.toLocaleString()}</div>
          <div class="stat-label">教職員数</div>
          <div class="stat-change up">+12 今月</div>
        </div>
      </div>
      <div class="stat-card" onclick="navigateTo('directory')">
        <div class="stat-icon purple"><span class="material-symbols-outlined">child_care</span></div>
        <div class="stat-info">
          <div class="stat-value">${s.totalStudents.toLocaleString()}</div>
          <div class="stat-label">生徒数</div>
          <div class="stat-change up">+108 今月</div>
        </div>
      </div>
      <div class="stat-card" onclick="navigateTo('organization')">
        <div class="stat-icon blue"><span class="material-symbols-outlined">apartment</span></div>
        <div class="stat-info">
          <div class="stat-value">${s.totalOrgs}</div>
          <div class="stat-label">組織数</div>
        </div>
      </div>
      <div class="stat-card" onclick="navigateTo('transfers')">
        <div class="stat-icon amber"><span class="material-symbols-outlined">pending_actions</span></div>
        <div class="stat-info">
          <div class="stat-value">${s.pendingTransfers}</div>
          <div class="stat-label">承認待ち申請</div>
        </div>
      </div>
      <div class="stat-card" onclick="navigateTo('accounts')">
        <div class="stat-icon red"><span class="material-symbols-outlined">sync_problem</span></div>
        <div class="stat-info">
          <div class="stat-value">${s.syncErrors}</div>
          <div class="stat-label">同期エラー</div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-bottom:24px">
      <div class="card-header">
        <span class="card-title">サービス</span>
      </div>
      <div class="card-body">
        <div class="service-launcher">
          <div class="service-card" onclick="navigateTo('directory')">
            <div class="service-card-icon" style="background:var(--primary-50); color:var(--primary-500)">
              <span class="material-symbols-outlined">groups</span>
            </div>
            <div class="service-card-title">名簿管理</div>
            <div class="service-card-desc">人物情報の閲覧・編集・管理</div>
          </div>
          <div class="service-card" onclick="navigateTo('organization')">
            <div class="service-card-icon" style="background:var(--accent-50); color:var(--accent-500)">
              <span class="material-symbols-outlined">account_tree</span>
            </div>
            <div class="service-card-title">組織管理</div>
            <div class="service-card-desc">組織階層の管理と設定</div>
          </div>
          <div class="service-card" onclick="navigateTo('accounts')">
            <div class="service-card-icon" style="background:#f3e8ff; color:#7c3aed">
              <span class="material-symbols-outlined">manage_accounts</span>
            </div>
            <div class="service-card-title">アカウント管理</div>
            <div class="service-card-desc">メールアカウントと同期設定</div>
          </div>
          <div class="service-card" onclick="navigateTo('forms')">
            <div class="service-card-icon" style="background:var(--warning-50); color:var(--warning-500)">
              <span class="material-symbols-outlined">description</span>
            </div>
            <div class="service-card-title">フォーム管理</div>
            <div class="service-card-desc">アンケート・調査の作成と管理</div>
          </div>
          <div class="service-card" onclick="navigateTo('csv-import')">
            <div class="service-card-icon" style="background:var(--danger-50); color:var(--danger-500)">
              <span class="material-symbols-outlined">upload_file</span>
            </div>
            <div class="service-card-title">CSVインポート</div>
            <div class="service-card-desc">CSVファイルからの一括データ取込</div>
          </div>
          <div class="service-card" onclick="navigateTo('permissions')">
            <div class="service-card-icon" style="background:var(--primary-50); color:var(--primary-600)">
              <span class="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <div class="service-card-title">権限設定</div>
            <div class="service-card-desc">アクセス権限の詳細設定</div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <span class="card-title">アラート・お知らせ</span>
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('logs')">すべて表示</button>
        </div>
        <div class="card-body" style="padding:0">
          ${DUMMY_DATA.alerts.map(a => `
            <div class="notif-item" onclick="navigateTo('${a.page}')" style="cursor:pointer">
              <div class="notif-dot ${a.type}"></div>
              <div class="notif-content">
                <div class="notif-title">${a.title}</div>
                <div class="notif-message">${a.message}</div>
                <div class="notif-time">${a.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">フォーム回答状況</span>
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('forms')">すべて表示</button>
        </div>
        <div class="card-body">
          ${DUMMY_DATA.forms.filter(f => f.status === 'active').map(f => `
            <div style="margin-bottom:16px; cursor:pointer" onclick="navigateTo('form-responses', {formId:'${f.id}'})">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px">
                <span style="font-size:13px; font-weight:500">${f.title}</span>
                <span style="font-size:12px; color:var(--text-tertiary)">${f.responses}/${f.totalTarget}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill blue" style="width:${Math.round(f.responses/f.totalTarget*100)}%"></div>
              </div>
              <div style="font-size:11px; color:var(--text-tertiary); margin-top:4px">期限: ${f.deadline || '未設定'}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">最近のインポート</span>
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('logs')">すべて表示</button>
        </div>
        <div class="card-body" style="padding:0">
          <table>
            <thead><tr><th>ファイル名</th><th>ステータス</th><th>日時</th></tr></thead>
            <tbody>
              ${DUMMY_DATA.importLogs.slice(0, 4).map(l => `
                <tr onclick="navigateTo('logs')" style="cursor:pointer">
                  <td style="font-size:12px">${l.fileName}</td>
                  <td>${getImportStatusBadge(l.status)}</td>
                  <td style="font-size:12px; color:var(--text-tertiary)">${l.importedAt}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">所属変更申請</span>
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('transfers')">すべて表示</button>
        </div>
        <div class="card-body" style="padding:0">
          <table>
            <thead><tr><th>対象者</th><th>異動先</th><th>ステータス</th></tr></thead>
            <tbody>
              ${DUMMY_DATA.transferRequests.slice(0, 4).map(t => `
                <tr onclick="navigateTo('transfers')" style="cursor:pointer">
                  <td style="font-size:13px; font-weight:500">${t.personName}</td>
                  <td style="font-size:12px">${t.toOrg}</td>
                  <td>${getTransferStatusBadge(t.status)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ===== DIRECTORY =====
let directoryTab = 'basic';
let directoryFilter = { org: '', type: '', search: '' };

function renderDirectory() {
  const container = document.getElementById('pageContainer');
  const filteredPeople = DUMMY_DATA.people.filter(p => {
    if (directoryFilter.type && p.type !== directoryFilter.type) return false;
    if (directoryFilter.search) {
      const s = directoryFilter.search.toLowerCase();
      if (!p.lastName.toLowerCase().includes(s) && !p.firstName.toLowerCase().includes(s) && !(p.email || '').toLowerCase().includes(s)) return false;
    }
    return true;
  });

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">名簿一覧</h1>
        <p class="page-subtitle">${DUMMY_DATA.dashboardStats.totalPeople.toLocaleString()}件のレコード</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary" onclick="navigateTo('csv-import')">
          <span class="material-symbols-outlined">upload_file</span>CSVインポート
        </button>
        <button class="btn btn-primary" onclick="openAddPersonModal()">
          <span class="material-symbols-outlined">person_add</span>新規登録
        </button>
      </div>
    </div>

    <div class="tabs" id="dirTabs">
      <button class="tab ${directoryTab==='basic'?'active':''}" onclick="switchDirTab('basic')">
        <span class="material-symbols-outlined">person</span>基本情報
      </button>
      <button class="tab ${directoryTab==='contact'?'active':''}" onclick="switchDirTab('contact')">
        <span class="material-symbols-outlined">phone</span>連絡先情報
      </button>
      <button class="tab ${directoryTab==='sensitive'?'active':''}" onclick="switchDirTab('sensitive')">
        <span class="material-symbols-outlined">shield</span>機微情報
      </button>
      <button class="tab ${directoryTab==='employment'?'active':''}" onclick="switchDirTab('employment')">
        <span class="material-symbols-outlined">work</span>職員情報
      </button>
    </div>

    <div class="filters-bar">
      <div class="filter-input">
        <span class="material-symbols-outlined">search</span>
        <input type="text" placeholder="氏名・メールで検索..." value="${directoryFilter.search}" oninput="directoryFilter.search=this.value; renderDirectory();">
      </div>
      <div class="filter-input">
        <span class="material-symbols-outlined">filter_list</span>
        <select onchange="directoryFilter.type=this.value; renderDirectory();">
          <option value="">すべての種別</option>
          <option value="教員" ${directoryFilter.type==='教員'?'selected':''}>教員</option>
          <option value="生徒" ${directoryFilter.type==='生徒'?'selected':''}>生徒</option>
          <option value="教育委員会" ${directoryFilter.type==='教育委員会'?'selected':''}>教育委員会</option>
        </select>
      </div>
      <div class="filter-input">
        <span class="material-symbols-outlined">apartment</span>
        <select onchange="directoryFilter.org=this.value; renderDirectory();">
          <option value="">すべての組織</option>
          <option value="school-aoba">青葉小学校</option>
          <option value="school-sakura">桜丘小学校</option>
          <option value="school-tokiwa">常磐中学校</option>
          <option value="school-kitano">北野小学校</option>
        </select>
      </div>
      <button class="btn btn-ghost btn-sm">
        <span class="material-symbols-outlined">download</span>エクスポート
      </button>
    </div>

    <div class="card">
      <div class="table-container">
        ${renderDirectoryTable(filteredPeople)}
      </div>
      <div class="card-footer">
        <div class="pagination">
          <div class="pagination-info">${filteredPeople.length}件中 1〜${filteredPeople.length}件を表示</div>
          <div class="pagination-controls">
            <button class="page-btn" disabled><span class="material-symbols-outlined" style="font-size:16px">chevron_left</span></button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn"><span class="material-symbols-outlined" style="font-size:16px">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function switchDirTab(tab) {
  directoryTab = tab;
  renderDirectory();
}

function renderDirectoryTable(people) {
  if (directoryTab === 'basic') {
    return `<table>
      <thead><tr><th>ID</th><th>氏名</th><th>種別</th><th>所属</th><th>クラス/部署</th><th>職位</th><th>ステータス</th></tr></thead>
      <tbody>${people.map(p => `
        <tr>
          <td style="font-size:12px; color:var(--text-tertiary)">${p.id}</td>
          <td><span class="table-link" onclick="navigateTo('person-detail', {personId:'${p.id}'})">${p.lastName} ${p.firstName}</span></td>
          <td>${getTypeBadge(p.type)}</td>
          <td style="font-size:12px">${p.org}</td>
          <td style="font-size:12px">${p.department}</td>
          <td style="font-size:12px">${p.position || '-'}</td>
          <td>${getStatusBadge(p.status)}</td>
        </tr>
      `).join('')}</tbody></table>`;
  } else if (directoryTab === 'contact') {
    return `<table>
      <thead><tr><th>氏名</th><th>所属</th><th>メールアドレス</th><th>電話番号</th><th>住所</th></tr></thead>
      <tbody>${people.map(p => `
        <tr>
          <td><span class="table-link" onclick="navigateTo('person-detail', {personId:'${p.id}'})">${p.lastName} ${p.firstName}</span></td>
          <td style="font-size:12px">${p.org}</td>
          <td style="font-size:12px">${p.email || '<span style="color:var(--text-tertiary)">未登録</span>'}</td>
          <td style="font-size:12px">${p.phone || '-'}</td>
          <td style="font-size:12px">${p.address || '-'}</td>
        </tr>
      `).join('')}</tbody></table>`;
  } else if (directoryTab === 'sensitive') {
    return `<table>
      <thead><tr><th>氏名</th><th>所属</th><th>いじめ歴</th><th>不登校歴</th><th>特別支援</th><th>家庭状況</th></tr></thead>
      <tbody>${people.filter(p => p.type === '生徒').map(p => `
        <tr>
          <td><span class="table-link" onclick="navigateTo('person-detail', {personId:'${p.id}'})">${p.lastName} ${p.firstName}</span></td>
          <td style="font-size:12px">${p.org} ${p.department}</td>
          <td><span class="badge badge-gray badge-dot">なし</span></td>
          <td><span class="badge badge-gray badge-dot">なし</span></td>
          <td><span class="badge badge-gray badge-dot">なし</span></td>
          <td style="font-size:12px; color:var(--text-tertiary)">-</td>
        </tr>
      `).join('')}</tbody></table>`;
  } else {
    return `<table>
      <thead><tr><th>氏名</th><th>所属</th><th>職位</th><th>免許番号</th><th>担当部活</th><th>同期状態</th></tr></thead>
      <tbody>${people.filter(p => p.type === '教員' || p.type === '教育委員会').map(p => `
        <tr>
          <td><span class="table-link" onclick="navigateTo('person-detail', {personId:'${p.id}'})">${p.lastName} ${p.firstName}</span></td>
          <td style="font-size:12px">${p.org}</td>
          <td style="font-size:12px">${p.position || '-'}</td>
          <td style="font-size:12px">${p.licenseNumber || '-'}</td>
          <td style="font-size:12px">${p.club || '-'}</td>
          <td>${getSyncBadge(p.syncStatus)}</td>
        </tr>
      `).join('')}</tbody></table>`;
  }
}

function openAddPersonModal() {
  openModal('新規人物登録', `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">姓<span class="required">*</span></label>
        <input class="form-input" placeholder="例: 山田">
      </div>
      <div class="form-group">
        <label class="form-label">名<span class="required">*</span></label>
        <input class="form-input" placeholder="例: 太郎">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">姓（カナ）</label>
        <input class="form-input" placeholder="例: ヤマダ">
      </div>
      <div class="form-group">
        <label class="form-label">名（カナ）</label>
        <input class="form-input" placeholder="例: タロウ">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">種別<span class="required">*</span></label>
      <select class="form-select"><option>教員</option><option>生徒</option><option>教育委員会</option><option>保護者</option></select>
    </div>
    <div class="form-group">
      <label class="form-label">所属組織<span class="required">*</span></label>
      <select class="form-select"><option>青葉小学校</option><option>桜丘小学校</option><option>光が丘小学校</option><option>常磐中学校</option><option>教育政策課</option></select>
    </div>
    <div class="form-group">
      <label class="form-label">メールアドレス</label>
      <input class="form-input" type="email" placeholder="example@shizuoka-edu.jp">
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('人物を登録しました', 'success')">登録</button>
  `);
}

// ===== PERSON DETAIL =====
function renderPersonDetail(params) {
  const personId = params?.personId || 'P001';
  const person = DUMMY_DATA.people.find(p => p.id === personId) || DUMMY_DATA.people[0];
  const container = document.getElementById('pageContainer');

  container.innerHTML = `
    <div class="breadcrumb">
      <a onclick="navigateTo('directory')">名簿一覧</a>
      <span class="sep">/</span>
      <span>${person.lastName} ${person.firstName}</span>
    </div>

    <div class="detail-header">
      <div class="detail-avatar">${person.lastName[0]}${person.firstName[0]}</div>
      <div class="detail-info">
        <div class="detail-name">${person.lastName} ${person.firstName}
          <span style="font-size:14px; color:var(--text-tertiary); font-weight:400; margin-left:8px">${person.lastNameKana} ${person.firstNameKana}</span>
        </div>
        <div class="detail-meta">
          <div class="detail-meta-item"><span class="material-symbols-outlined">apartment</span>${person.org}</div>
          <div class="detail-meta-item"><span class="material-symbols-outlined">group</span>${person.department}</div>
          ${person.position ? `<div class="detail-meta-item"><span class="material-symbols-outlined">badge</span>${person.position}</div>` : ''}
          ${getStatusBadge(person.status)}
          ${getSyncBadge(person.syncStatus)}
        </div>
      </div>
      <div style="display:flex; gap:8px">
        <button class="btn btn-secondary" onclick="openEditPersonModal('${person.id}')">
          <span class="material-symbols-outlined">edit</span>編集
        </button>
        <button class="btn btn-secondary" onclick="openTransferModal('${person.id}')">
          <span class="material-symbols-outlined">swap_horiz</span>所属変更
        </button>
      </div>
    </div>

    <div class="tabs" id="personTabs">
      <button class="tab active" onclick="switchPersonTab(this, 'detail-basic')">
        <span class="material-symbols-outlined">info</span>詳細情報
      </button>
      <button class="tab" onclick="switchPersonTab(this, 'detail-history')">
        <span class="material-symbols-outlined">history</span>変更履歴
      </button>
      <button class="tab" onclick="switchPersonTab(this, 'detail-account')">
        <span class="material-symbols-outlined">mail</span>アカウント
      </button>
    </div>

    <div id="personTabContent">
      ${renderPersonBasicTab(person)}
    </div>
  `;
}

function switchPersonTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const person = DUMMY_DATA.people[0];
  const content = document.getElementById('personTabContent');
  if (tabId === 'detail-basic') content.innerHTML = renderPersonBasicTab(person);
  else if (tabId === 'detail-history') content.innerHTML = renderPersonHistoryTab();
  else content.innerHTML = renderPersonAccountTab(person);
}

function renderPersonBasicTab(person) {
  return `
    <div class="dashboard-grid" style="margin-bottom:24px">
      <div class="card">
        <div class="card-header"><span class="card-title">基本情報</span></div>
        <div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><div class="detail-field-label">ID</div><div class="detail-field-value">${person.id}</div></div>
            <div class="detail-field"><div class="detail-field-label">種別</div><div class="detail-field-value">${getTypeBadge(person.type)}</div></div>
            <div class="detail-field"><div class="detail-field-label">生年月日</div><div class="detail-field-value">${person.birthDate}</div></div>
            <div class="detail-field"><div class="detail-field-label">性別</div><div class="detail-field-value">${person.gender}</div></div>
            <div class="detail-field"><div class="detail-field-label">所属組織</div><div class="detail-field-value">${person.org}</div></div>
            <div class="detail-field"><div class="detail-field-label">クラス/部署</div><div class="detail-field-value">${person.department}</div></div>
            <div class="detail-field"><div class="detail-field-label">入職日</div><div class="detail-field-value">${person.joinDate}</div></div>
            <div class="detail-field"><div class="detail-field-label">職位</div><div class="detail-field-value">${person.position || '-'}</div></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">連絡先情報</span></div>
        <div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><div class="detail-field-label">メールアドレス</div><div class="detail-field-value">${person.email || '未登録'}</div></div>
            <div class="detail-field"><div class="detail-field-label">電話番号</div><div class="detail-field-value">${person.phone || '-'}</div></div>
            <div class="detail-field" style="grid-column:1/-1"><div class="detail-field-label">住所</div><div class="detail-field-value">${person.address || '-'}</div></div>
          </div>
        </div>
      </div>
    </div>
    ${person.type === '教員' ? `
    <div class="card">
      <div class="card-header"><span class="card-title">職員情報</span></div>
      <div class="card-body">
        <div class="detail-grid">
          <div class="detail-field"><div class="detail-field-label">教員免許番号</div><div class="detail-field-value">${person.licenseNumber || '-'}</div></div>
          <div class="detail-field"><div class="detail-field-label">担当部活</div><div class="detail-field-value">${person.club || '-'}</div></div>
        </div>
      </div>
    </div>` : ''}
  `;
}

function renderPersonHistoryTab() {
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">属性変更履歴</span>
        <button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">filter_list</span>フィルター</button>
      </div>
      <div class="card-body">
        <div class="history-timeline">
          ${DUMMY_DATA.attributeHistory.map(h => `
            <div class="history-item">
              <div class="history-date">${h.startDate}${h.endDate ? ' 〜 ' + h.endDate : ''}</div>
              <div class="history-content">
                <div class="history-attr">${h.attribute}</div>
                <div class="history-value">${h.value}
                  ${h.isCurrent ? '<span class="history-current"><span class="material-symbols-outlined" style="font-size:12px">check_circle</span>現在</span>' : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderPersonAccountTab(person) {
  return `
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><span class="card-title">Google Workspace アカウント</span></div>
      <div class="card-body">
        <div class="detail-grid">
          <div class="detail-field"><div class="detail-field-label">メールアドレス</div><div class="detail-field-value">${person.email || '未発行'}</div></div>
          <div class="detail-field"><div class="detail-field-label">同期状態</div><div class="detail-field-value">${getSyncBadge(person.syncStatus)}</div></div>
          <div class="detail-field"><div class="detail-field-label">最終同期</div><div class="detail-field-value">${person.lastSync || '-'}</div></div>
          <div class="detail-field"><div class="detail-field-label">ワークスペース</div><div class="detail-field-value">${DUMMY_DATA.tenant.workspace}</div></div>
        </div>
        ${person.email ? `
        <div style="margin-top:16px; display:flex; gap:8px">
          <button class="btn btn-secondary btn-sm" onclick="showToast('同期を実行しました', 'success')">
            <span class="material-symbols-outlined">sync</span>手動同期
          </button>
          <button class="btn btn-ghost btn-sm">
            <span class="material-symbols-outlined">open_in_new</span>Google管理コンソールで開く
          </button>
        </div>` : `
        <div style="margin-top:16px">
          <button class="btn btn-accent btn-sm" onclick="showToast('アカウントを発行しました', 'success')">
            <span class="material-symbols-outlined">person_add</span>アカウント発行
          </button>
        </div>`}
      </div>
    </div>
  `;
}

function openEditPersonModal(personId) {
  const person = DUMMY_DATA.people.find(p => p.id === personId) || DUMMY_DATA.people[0];
  openModal('人物情報編集', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">姓</label><input class="form-input" value="${person.lastName}"></div>
      <div class="form-group"><label class="form-label">名</label><input class="form-input" value="${person.firstName}"></div>
    </div>
    <div class="form-group"><label class="form-label">所属組織</label>
      <select class="form-select"><option selected>${person.org}</option><option>桜丘小学校</option><option>光が丘小学校</option></select>
    </div>
    <div class="form-group"><label class="form-label">クラス/部署</label><input class="form-input" value="${person.department}"></div>
    <div class="form-group"><label class="form-label">職位</label>
      <select class="form-select"><option>${person.position || '一般教員'}</option><option>校長</option><option>教頭</option><option>学年主任</option></select>
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('情報を更新しました', 'success')">保存</button>
  `);
}

function openTransferModal(personId) {
  const person = DUMMY_DATA.people.find(p => p.id === personId) || DUMMY_DATA.people[0];
  openModal('所属変更申請', `
    <div style="padding:12px; background:var(--primary-50); border-radius:var(--radius-md); margin-bottom:16px; font-size:13px">
      <strong>${person.lastName} ${person.firstName}</strong> の所属を変更します。
    </div>
    <div class="form-group"><label class="form-label">現在の所属</label><div style="font-size:14px; padding:8px 0">${person.org} / ${person.department}</div></div>
    <div class="form-group"><label class="form-label">異動先組織<span class="required">*</span></label>
      <select class="form-select"><option>選択してください</option><option>桜丘小学校</option><option>光が丘小学校</option><option>北野小学校</option><option>常磐中学校</option></select>
    </div>
    <div class="form-group"><label class="form-label">異動先クラス/部署</label><input class="form-input" placeholder="例: 3年1組"></div>
    <div class="form-group"><label class="form-label">発効日<span class="required">*</span></label><input class="form-input" type="date" value="2026-07-01"></div>
    <div class="form-group"><label class="form-label">理由</label><textarea class="form-textarea" placeholder="所属変更の理由を入力してください"></textarea></div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('所属変更申請を送信しました', 'success')">申請を送信</button>
  `);
}

// ===== ORGANIZATION =====
function renderOrganization() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">組織管理</h1>
        <p class="page-subtitle">組織階層の構造を管理します</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary"><span class="material-symbols-outlined">download</span>エクスポート</button>
        <button class="btn btn-primary" onclick="openAddOrgModal()"><span class="material-symbols-outlined">add</span>組織を追加</button>
      </div>
    </div>
    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <span class="card-title">組織ツリー</span>
          <div style="display:flex; gap:4px">
            <button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">unfold_more</span></button>
            <button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">unfold_less</span></button>
          </div>
        </div>
        <div class="card-body" style="padding:8px">
          <div class="org-tree" id="orgTree">${renderOrgTree(DUMMY_DATA.organizations, 0)}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">組織詳細</span></div>
        <div class="card-body" id="orgDetail">
          <div class="empty-state">
            <span class="material-symbols-outlined">account_tree</span>
            <div class="empty-state-title">組織を選択</div>
            <div class="empty-state-desc">左のツリーから組織を選択すると、詳細情報が表示されます。</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOrgTree(nodes, depth) {
  if (!nodes) return '';
  return nodes.map(node => {
    const hasChildren = node.children && node.children.length > 0;
    const icon = getOrgIcon(node.type);
    const count = node.memberCount || node.staffCount ? `${node.memberCount || 0}人` : '';
    return `
      <div>
        <div class="org-node" onclick="selectOrg(this, '${node.id}', '${node.name}', '${node.type}', ${node.memberCount || 0}, ${node.staffCount || 0})" style="padding-left:${12 + depth * 20}px">
          ${hasChildren ? `<span class="org-toggle" onclick="event.stopPropagation(); toggleOrgNode(this)"><span class="material-symbols-outlined" style="font-size:16px">expand_more</span></span>` : '<span style="width:20px"></span>'}
          <span class="material-symbols-outlined">${icon}</span>
          <span>${node.name}</span>
          ${count ? `<span class="org-count">${count}</span>` : ''}
        </div>
        ${hasChildren ? `<div class="org-children">${renderOrgTree(node.children, depth + 1)}</div>` : ''}
      </div>`;
  }).join('');
}

function toggleOrgNode(el) {
  const children = el.closest('div').parentElement.querySelector('.org-children');
  if (children) {
    const isHidden = children.style.display === 'none';
    children.style.display = isHidden ? 'block' : 'none';
    const icon = el.querySelector('.material-symbols-outlined');
    icon.textContent = isHidden ? 'expand_more' : 'chevron_right';
  }
}

function selectOrg(el, id, name, type, members, staff) {
  document.querySelectorAll('.org-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('orgDetail').innerHTML = `
    <div style="margin-bottom:20px">
      <h3 style="font-size:18px; font-weight:700; margin-bottom:4px">${name}</h3>
      <div style="display:flex; gap:8px">${getTypeOrgBadge(type)}<span class="badge badge-gray">ID: ${id}</span></div>
    </div>
    <div class="detail-grid" style="margin-bottom:20px">
      <div class="detail-field"><div class="detail-field-label">組織種別</div><div class="detail-field-value">${getOrgTypeLabel(type)}</div></div>
      <div class="detail-field"><div class="detail-field-label">メンバー数</div><div class="detail-field-value">${members}人</div></div>
      <div class="detail-field"><div class="detail-field-label">職員数</div><div class="detail-field-value">${staff}人</div></div>
      <div class="detail-field"><div class="detail-field-label">作成日</div><div class="detail-field-value">2024-04-01</div></div>
    </div>
    <div style="display:flex; gap:8px">
      <button class="btn btn-secondary btn-sm" onclick="showToast('組織情報を更新しました', 'success')"><span class="material-symbols-outlined">edit</span>編集</button>
      <button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">group_add</span>メンバー追加</button>
      <button class="btn btn-ghost btn-sm" style="color:var(--danger-500)"><span class="material-symbols-outlined">delete</span>削除</button>
    </div>
  `;
}

function openAddOrgModal() {
  openModal('組織を追加', `
    <div class="form-group"><label class="form-label">組織名<span class="required">*</span></label><input class="form-input" placeholder="例: 新小学校"></div>
    <div class="form-group"><label class="form-label">組織種別<span class="required">*</span></label>
      <select class="form-select"><option>市町村</option><option>学校種</option><option>学校</option><option>部署</option></select>
    </div>
    <div class="form-group"><label class="form-label">親組織<span class="required">*</span></label>
      <select class="form-select"><option>静岡県</option><option>静岡市</option><option>浜松市</option><option>沼津市</option></select>
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('組織を追加しました', 'success')">追加</button>
  `);
}

// ===== ACCOUNTS =====
function renderAccounts() {
  const container = document.getElementById('pageContainer');
  const accounts = DUMMY_DATA.people.filter(p => p.email);
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">アカウント管理</h1>
        <p class="page-subtitle">Google Workspace アカウントの同期状態を管理します</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary" onclick="showToast('全アカウントの同期を開始しました', 'success')">
          <span class="material-symbols-outlined">sync</span>全件同期
        </button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">check_circle</span></div>
        <div class="stat-info"><div class="stat-value">${accounts.filter(a => a.syncStatus === 'synced').length}</div><div class="stat-label">同期済み</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">error</span></div>
        <div class="stat-info"><div class="stat-value">${accounts.filter(a => a.syncStatus === 'error').length}</div><div class="stat-label">エラー</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber"><span class="material-symbols-outlined">person_off</span></div>
        <div class="stat-info"><div class="stat-value">${DUMMY_DATA.people.filter(p => !p.email).length}</div><div class="stat-label">アカウント未発行</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-title">アカウント一覧</span></div>
      <div class="table-container">
        <table>
          <thead><tr><th>氏名</th><th>メールアドレス</th><th>所属</th><th>同期状態</th><th>最終同期</th><th>操作</th></tr></thead>
          <tbody>
            ${accounts.map(a => `
              <tr>
                <td><span class="table-link" onclick="navigateTo('person-detail', {personId:'${a.id}'})">${a.lastName} ${a.firstName}</span></td>
                <td style="font-size:12px">${a.email}</td>
                <td style="font-size:12px">${a.org}</td>
                <td>${getSyncBadge(a.syncStatus)}</td>
                <td style="font-size:12px; color:var(--text-tertiary)">${a.lastSync || '-'}</td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="showToast('同期を実行しました', 'success')"><span class="material-symbols-outlined" style="font-size:16px">sync</span></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== ATTRIBUTES =====
function renderAttributes() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">属性項目設定</h1>
        <p class="page-subtitle">名簿で使用するカスタム属性項目を定義します</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openAddAttributeModal()">
          <span class="material-symbols-outlined">add</span>属性を追加
        </button>
      </div>
    </div>

    <div class="tabs">
      ${DUMMY_DATA.attributeGroups.map((g, i) => `
        <button class="tab ${i===0?'active':''}" onclick="switchAttrTab(this, '${g.id}')">
          <span class="material-symbols-outlined">${g.icon}</span>${g.name}
          <span class="tab-count">${g.attributes.length}</span>
        </button>
      `).join('')}
    </div>

    <div id="attrTabContent">
      ${renderAttrGroup(DUMMY_DATA.attributeGroups[0])}
    </div>
  `;
}

function switchAttrTab(el, groupId) {
  el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const group = DUMMY_DATA.attributeGroups.find(g => g.id === groupId);
  document.getElementById('attrTabContent').innerHTML = renderAttrGroup(group);
}

function renderAttrGroup(group) {
  return `
    <div class="card">
      <div class="table-container">
        <table>
          <thead><tr><th>項目名</th><th>データ型</th><th>必須</th><th>コード参照</th><th>操作</th></tr></thead>
          <tbody>
            ${group.attributes.map(a => `
              <tr>
                <td style="font-weight:500">${a.name}</td>
                <td>${getDataTypeBadge(a.type)}</td>
                <td>${a.required ? '<span class="badge badge-red">必須</span>' : '<span class="badge badge-gray">任意</span>'}</td>
                <td style="font-size:12px">${a.codeRef ? `<span class="table-link" onclick="navigateTo('codes')">${a.codeRef}</span>` : '-'}</td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="openEditAttributeModal('${a.name}')"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
                  <button class="btn btn-ghost btn-sm" style="color:var(--danger-500)"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openAddAttributeModal() {
  openModal('属性項目を追加', `
    <div class="form-group"><label class="form-label">項目名<span class="required">*</span></label><input class="form-input" placeholder="例: 血液型"></div>
    <div class="form-group"><label class="form-label">データ型<span class="required">*</span></label>
      <select class="form-select"><option>単一文字列</option><option>複数文字列</option><option>数値</option><option>日付</option><option>コードマスター参照</option></select>
    </div>
    <div class="form-group"><label class="form-label">所属グループ<span class="required">*</span></label>
      <select class="form-select"><option>基本情報</option><option>連絡先情報</option><option>機微情報</option><option>職員情報</option></select>
    </div>
    <div class="form-group"><label class="form-label">必須</label>
      <div class="toggle" onclick="this.classList.toggle('active')"></div>
    </div>
    <div class="form-group"><label class="form-label">バリデーション</label>
      <input class="form-input" placeholder="例: 正規表現パターン">
      <div class="form-hint">入力値のバリデーションパターンを設定できます</div>
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('属性項目を追加しました', 'success')">追加</button>
  `);
}

function openEditAttributeModal(name) {
  openModal(`属性項目を編集: ${name}`, `
    <div class="form-group"><label class="form-label">項目名</label><input class="form-input" value="${name}"></div>
    <div class="form-group"><label class="form-label">データ型</label>
      <select class="form-select"><option>単一文字列</option><option selected>コードマスター参照</option><option>数値</option><option>日付</option></select>
    </div>
    <div class="form-group"><label class="form-label">必須</label>
      <div class="toggle active" onclick="this.classList.toggle('active')"></div>
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('属性項目を更新しました', 'success')">保存</button>
  `);
}

// ===== PERMISSIONS =====
function renderPermissions() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">権限設定</h1>
        <p class="page-subtitle">サブジェクト・オブジェクト関係に基づく柔軟なアクセス制御</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openAddPermModal()">
          <span class="material-symbols-outlined">add</span>権限ルールを追加
        </button>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active"><span class="material-symbols-outlined">rule</span>権限ルール<span class="tab-count">${DUMMY_DATA.permissionRules.length}</span></button>
      <button class="tab"><span class="material-symbols-outlined">apartment</span>組織スコープ</button>
      <button class="tab"><span class="material-symbols-outlined">shield</span>属性権限</button>
    </div>

    <div>
      ${DUMMY_DATA.permissionRules.map(r => `
        <div class="perm-card">
          <div class="perm-card-header">
            <div class="perm-card-title">${r.name}</div>
            <div style="display:flex; gap:6px; align-items:center">
              ${r.status === 'active' ? '<span class="badge badge-green badge-dot">有効</span>' : '<span class="badge badge-gray badge-dot">無効</span>'}
              <button class="btn btn-ghost btn-sm" onclick="openEditPermModal('${r.id}')"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
            </div>
          </div>
          <div class="perm-card-desc">${r.description}</div>
          <div class="perm-card-tags">
            <span class="badge badge-blue">Subject: ${r.subject.type === 'role' ? r.subject.value : r.subject.attribute}</span>
            <span class="badge badge-purple">Object: ${r.object.type === 'role' ? r.object.value : r.object.type === 'all' ? '全データ' : r.object.value}</span>
            <span class="badge badge-amber">Scope: ${r.scope}</span>
            ${r.permissions.map(p => `<span class="badge badge-green">${p}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openAddPermModal() {
  openModal('権限ルールを追加', `
    <div class="form-group"><label class="form-label">ルール名<span class="required">*</span></label><input class="form-input" placeholder="例: 学年主任の機微情報閲覧"></div>
    <div class="form-group"><label class="form-label">説明</label><textarea class="form-textarea" placeholder="この権限ルールの説明"></textarea></div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
      <div class="form-group"><label class="form-label">サブジェクト（主体）</label>
        <select class="form-select"><option>職種で指定</option><option>属性値で指定</option><option>特定の人物</option></select>
        <select class="form-select" style="margin-top:6px"><option>一般教員</option><option>校長</option><option>教頭</option><option>教育委員会</option></select>
      </div>
      <div class="form-group"><label class="form-label">オブジェクト（対象）</label>
        <select class="form-select"><option>職種で指定</option><option>属性グループで指定</option><option>全データ</option></select>
        <select class="form-select" style="margin-top:6px"><option>生徒</option><option>教員</option><option>全人物</option></select>
      </div>
    </div>
    <div class="form-group"><label class="form-label">組織スコープ</label>
      <select class="form-select"><option>同一組織</option><option>同一市町村</option><option>同一市町村・同一学校種</option><option>テナント全体</option></select>
    </div>
    <div class="form-group"><label class="form-label">許可アクション</label>
      <div style="display:flex; gap:12px; margin-top:6px">
        <label style="display:flex; align-items:center; gap:4px; font-size:13px; cursor:pointer"><input type="checkbox" checked> 閲覧</label>
        <label style="display:flex; align-items:center; gap:4px; font-size:13px; cursor:pointer"><input type="checkbox"> 編集</label>
        <label style="display:flex; align-items:center; gap:4px; font-size:13px; cursor:pointer"><input type="checkbox"> 削除</label>
      </div>
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('権限ルールを追加しました', 'success')">追加</button>
  `);
}

function openEditPermModal(id) {
  const rule = DUMMY_DATA.permissionRules.find(r => r.id === id);
  if (!rule) return;
  openModal(`権限ルールを編集: ${rule.name}`, `
    <div class="form-group"><label class="form-label">ルール名</label><input class="form-input" value="${rule.name}"></div>
    <div class="form-group"><label class="form-label">説明</label><textarea class="form-textarea">${rule.description}</textarea></div>
    <div class="form-group"><label class="form-label">ステータス</label>
      <div class="toggle active" onclick="this.classList.toggle('active')"></div>
    </div>
  `, `
    <button class="btn btn-danger btn-sm" style="margin-right:auto"><span class="material-symbols-outlined">delete</span>削除</button>
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('権限ルールを更新しました', 'success')">保存</button>
  `);
}

// ===== FORMS =====
function renderForms() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">フォーム管理</h1>
        <p class="page-subtitle">アンケート・調査フォームの作成と管理</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="navigateTo('form-builder')">
          <span class="material-symbols-outlined">add</span>新規フォーム作成
        </button>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active">すべて<span class="tab-count">${DUMMY_DATA.forms.length}</span></button>
      <button class="tab">実施中<span class="tab-count">${DUMMY_DATA.forms.filter(f=>f.status==='active').length}</span></button>
      <button class="tab">下書き<span class="tab-count">${DUMMY_DATA.forms.filter(f=>f.status==='draft').length}</span></button>
      <button class="tab">終了<span class="tab-count">${DUMMY_DATA.forms.filter(f=>f.status==='closed').length}</span></button>
    </div>

    <div class="card">
      <div class="table-container">
        <table>
          <thead><tr><th>フォーム名</th><th>対象</th><th>回答状況</th><th>ステータス</th><th>期限</th><th>名簿連携</th><th>操作</th></tr></thead>
          <tbody>
            ${DUMMY_DATA.forms.map(f => `
              <tr>
                <td><span class="table-link" onclick="navigateTo('form-responses', {formId:'${f.id}'})">${f.title}</span></td>
                <td style="font-size:12px">${f.target}</td>
                <td>
                  <div style="display:flex; align-items:center; gap:8px">
                    <div class="progress-bar" style="width:80px"><div class="progress-fill ${f.responses===f.totalTarget?'green':'blue'}" style="width:${Math.round(f.responses/f.totalTarget*100)}%"></div></div>
                    <span style="font-size:12px; color:var(--text-secondary)">${f.responses}/${f.totalTarget}</span>
                  </div>
                </td>
                <td>${getFormStatusBadge(f.status)}</td>
                <td style="font-size:12px; color:var(--text-tertiary)">${f.deadline || '-'}</td>
                <td>${f.linkedAttribute ? `<span class="badge badge-purple badge-dot">${f.linkedAttribute}</span>` : '-'}</td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="navigateTo('form-builder', {formId:'${f.id}'})"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="navigateTo('form-responses', {formId:'${f.id}'})"><span class="material-symbols-outlined" style="font-size:16px">analytics</span></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== FORM BUILDER =====
function renderFormBuilder(params) {
  const form = params?.formId ? DUMMY_DATA.forms.find(f => f.id === params.formId) : null;
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="breadcrumb">
      <a onclick="navigateTo('forms')">フォーム管理</a>
      <span class="sep">/</span>
      <span>${form ? form.title : '新規フォーム'}</span>
    </div>

    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">${form ? 'フォーム編集' : '新規フォーム作成'}</h1>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary">下書き保存</button>
        <button class="btn btn-primary" onclick="showToast('フォームを公開しました', 'success')">公開</button>
      </div>
    </div>

    <div class="form-builder-layout">
      <div class="form-builder-palette">
        <div class="palette-title">質問タイプ</div>
        <div class="palette-item"><span class="material-symbols-outlined">radio_button_checked</span>ラジオボタン</div>
        <div class="palette-item"><span class="material-symbols-outlined">check_box</span>チェックボックス</div>
        <div class="palette-item"><span class="material-symbols-outlined">short_text</span>テキスト（単一行）</div>
        <div class="palette-item"><span class="material-symbols-outlined">long_text</span>テキスト（複数行）</div>
        <div class="palette-item"><span class="material-symbols-outlined">numbers</span>数値</div>
        <div class="palette-item"><span class="material-symbols-outlined">calendar_today</span>日付</div>
        <div class="palette-item"><span class="material-symbols-outlined">arrow_drop_down_circle</span>ドロップダウン</div>
        <div class="palette-item"><span class="material-symbols-outlined">upload_file</span>ファイルアップロード</div>
        <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border-light)">
          <div class="palette-title">名簿連携</div>
          <div class="palette-item"><span class="material-symbols-outlined">link</span>属性に紐づけ</div>
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:16px">
          <div class="card-body">
            <div class="form-group"><label class="form-label">フォームタイトル<span class="required">*</span></label>
              <input class="form-input" value="${form ? form.title : ''}" placeholder="フォームのタイトルを入力">
            </div>
            <div class="form-group"><label class="form-label">説明</label>
              <textarea class="form-textarea" placeholder="フォームの説明文">${form ? form.description : ''}</textarea>
            </div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">対象者</label>
                <select class="form-select"><option>全教員</option><option>全校長</option><option>全生徒</option><option>カスタム</option></select>
              </div>
              <div class="form-group"><label class="form-label">回答期限</label>
                <input class="form-input" type="date" value="${form?.deadline || ''}">
              </div>
            </div>
          </div>
        </div>

        <div class="form-builder-canvas">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px">
            <span style="font-size:12px; font-weight:600; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.05em">質問リスト</span>
            <button class="btn btn-secondary btn-sm" onclick="showToast('質問を追加しました', 'success')"><span class="material-symbols-outlined">add</span>質問追加</button>
          </div>
          ${DUMMY_DATA.formQuestions.map((q, i) => `
            <div class="canvas-question">
              <div class="canvas-question-number">Q${i + 1} ${q.required ? '<span style="color:var(--danger-500)">*</span>' : ''}</div>
              <div class="canvas-question-text">${q.question}</div>
              ${q.type === 'radio' ? q.options.map(o => `<div class="canvas-option"><div class="canvas-option-radio"></div>${o}</div>`).join('') : ''}
              ${q.type === 'checkbox' ? q.options.map(o => `<div class="canvas-option"><div class="canvas-option-checkbox"></div>${o}</div>`).join('') : ''}
              ${q.type === 'text' ? '<div style="border:1px solid var(--border-light); border-radius:var(--radius-sm); padding:8px; color:var(--text-tertiary); font-size:12px">テキスト入力欄</div>' : ''}
              ${q.type === 'number' ? '<div style="border:1px solid var(--border-light); border-radius:var(--radius-sm); padding:8px; color:var(--text-tertiary); font-size:12px; width:120px">数値入力</div>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ===== FORM RESPONSES =====
function renderFormResponses(params) {
  const form = DUMMY_DATA.forms.find(f => f.id === (params?.formId || 'F001')) || DUMMY_DATA.forms[0];
  const container = document.getElementById('pageContainer');
  const pct = Math.round(form.responses / form.totalTarget * 100);
  container.innerHTML = `
    <div class="breadcrumb">
      <a onclick="navigateTo('forms')">フォーム管理</a>
      <span class="sep">/</span>
      <span>${form.title}</span>
    </div>

    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">${form.title}</h1>
        <p class="page-subtitle">${form.description}</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary"><span class="material-symbols-outlined">download</span>CSV出力</button>
        <button class="btn btn-secondary"><span class="material-symbols-outlined">share</span>共有設定</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">how_to_reg</span></div>
        <div class="stat-info"><div class="stat-value">${form.responses}</div><div class="stat-label">回答済み</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber"><span class="material-symbols-outlined">pending</span></div>
        <div class="stat-info"><div class="stat-value">${form.totalTarget - form.responses}</div><div class="stat-label">未回答</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">pie_chart</span></div>
        <div class="stat-info"><div class="stat-value">${pct}%</div><div class="stat-label">回答率</div></div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header"><span class="card-title">Q1: 研修の内容は業務に役立ちましたか？</span></div>
        <div class="card-body">
          <div style="space-y:8px">
            ${[
              {label:'非常に役立った', val:89, color:'var(--accent-500)'},
              {label:'役立った', val:98, color:'var(--primary-400)'},
              {label:'どちらともいえない', val:32, color:'var(--warning-400)'},
              {label:'あまり役立たなかった', val:12, color:'var(--danger-300)'},
              {label:'役立たなかった', val:3, color:'var(--danger-500)'}
            ].map(o => `
              <div style="margin-bottom:10px">
                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px">
                  <span>${o.label}</span><span style="font-weight:600">${o.val}件</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.round(o.val/form.responses*100)}%; background:${o.color}"></div></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Q2: 研修の時間は適切でしたか？</span></div>
        <div class="card-body">
          <div style="display:flex; align-items:center; gap:24px">
            <div class="chart-placeholder" style="width:160px; height:160px; border-radius:50%; background:conic-gradient(var(--primary-400) 0% 15%, var(--accent-400) 15% 55%, var(--warning-400) 55% 85%, var(--danger-300) 85% 95%, var(--gray-300) 95% 100%)">
              <div class="donut-center">
                <div class="donut-value">${form.responses}</div>
                <div class="donut-label">回答</div>
              </div>
            </div>
            <div style="flex:1">
              ${[
                {label:'長すぎた', pct:15, color:'var(--primary-400)'},
                {label:'やや長かった', pct:40, color:'var(--accent-400)'},
                {label:'適切だった', pct:30, color:'var(--warning-400)'},
                {label:'やや短い', pct:10, color:'var(--danger-300)'},
                {label:'短すぎた', pct:5, color:'var(--gray-300)'}
              ].map(o => `
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:12px">
                  <div style="width:10px; height:10px; border-radius:2px; background:${o.color}; flex-shrink:0"></div>
                  <span style="flex:1">${o.label}</span>
                  <span style="font-weight:600">${o.pct}%</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="card full-width">
        <div class="card-header"><span class="card-title">Q3: 今後受講したい研修テーマ（複数選択可）</span></div>
        <div class="card-body">
          <div class="chart-bars" style="justify-content:center; height:200px">
            ${[
              {label:'ICT活用', h:140, color:'var(--primary-400)'},
              {label:'特別支援', h:110, color:'var(--accent-400)'},
              {label:'外国語', h:85, color:'var(--warning-400)'},
              {label:'プログラミング', h:120, color:'#7c3aed'},
              {label:'メンタルヘルス', h:95, color:'var(--danger-300)'},
              {label:'キャリア', h:70, color:'var(--primary-200)'}
            ].map(b => `
              <div style="display:flex; flex-direction:column; align-items:center; gap:6px">
                <span style="font-size:11px; font-weight:600">${b.h > 0 ? Math.round(b.h/1.4) : 0}</span>
                <div class="chart-bar ${b.color.includes('primary')?'blue':b.color.includes('accent')?'green':'amber'}" style="height:${b.h}px; background:${b.color}; width:40px"></div>
                <span style="font-size:10px; color:var(--text-tertiary); text-align:center; max-width:60px">${b.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ===== CSV IMPORT =====
function renderCsvImport() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">CSVインポート</h1>
        <p class="page-subtitle">CSVファイルからデータを一括で取り込みます</p>
      </div>
    </div>

    <div class="import-steps">
      <div class="import-step completed">
        <div class="step-circle"><span class="material-symbols-outlined" style="font-size:16px">check</span></div>
        <span class="step-label">ファイル選択</span>
      </div>
      <div class="import-step active">
        <div class="step-circle">2</div>
        <span class="step-label">項目マッピング</span>
      </div>
      <div class="import-step">
        <div class="step-circle">3</div>
        <span class="step-label">識別確認</span>
      </div>
      <div class="import-step">
        <div class="step-circle">4</div>
        <span class="step-label">プレビュー</span>
      </div>
      <div class="import-step">
        <div class="step-circle">5</div>
        <span class="step-label">インポート実行</span>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card full-width">
        <div class="card-header"><span class="card-title">CSV項目のマッピング</span></div>
        <div class="card-body">
          <div style="padding:12px; background:var(--primary-50); border-radius:var(--radius-md); margin-bottom:16px; font-size:13px; display:flex; align-items:center; gap:8px">
            <span class="material-symbols-outlined" style="color:var(--primary-500)">info</span>
            CSVファイルの各列を、名簿のどの項目に対応付けるか設定してください。
          </div>
          <table class="mapping-table">
            <thead><tr><th style="width:30%">CSV列名</th><th style="width:10%"></th><th style="width:30%">名簿項目</th><th style="width:30%">プレビュー</th></tr></thead>
            <tbody>
              ${[
                {csv:'氏名（姓）', target:'姓', preview:'田中'},
                {csv:'氏名（名）', target:'名', preview:'花子'},
                {csv:'メールアドレス', target:'メールアドレス', preview:'tanaka.hanako@...'},
                {csv:'所属学校', target:'所属組織', preview:'青葉小学校'},
                {csv:'学年組', target:'クラス', preview:'5年2組'},
                {csv:'生年月日', target:'生年月日', preview:'1990-05-15'},
                {csv:'電話番号', target:'電話番号', preview:'054-XXX-XXXX'},
                {csv:'職員番号', target:'識別子（職員番号）', preview:'EMP-2019-0042'}
              ].map(m => `
                <tr>
                  <td class="mapping-csv">${m.csv}</td>
                  <td class="mapping-arrow"><span class="material-symbols-outlined">arrow_forward</span></td>
                  <td><select class="form-select" style="font-size:12px"><option selected>${m.target}</option><option>--- マッピングしない ---</option><option>姓</option><option>名</option><option>メールアドレス</option></select></td>
                  <td style="font-size:12px; color:var(--text-tertiary)">${m.preview}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="card-footer" style="display:flex; justify-content:space-between">
          <div>
            <label style="display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer">
              <input type="checkbox"> 所属変更の承認フローをスキップ
            </label>
          </div>
          <div style="display:flex; gap:8px">
            <button class="btn btn-secondary">戻る</button>
            <button class="btn btn-primary" onclick="showToast('マッピングを保存しました。次のステップに進みます。', 'success')">次へ進む</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:20px">
      <div class="card-header"><span class="card-title">最近のインポート履歴</span></div>
      <div class="table-container">
        <table>
          <thead><tr><th>ファイル名</th><th>種別</th><th>実行者</th><th>日時</th><th>件数</th><th>ステータス</th></tr></thead>
          <tbody>
            ${DUMMY_DATA.importLogs.map(l => `
              <tr>
                <td style="font-size:12px">${l.fileName}</td>
                <td style="font-size:12px">${l.type}</td>
                <td style="font-size:12px">${l.importedBy}</td>
                <td style="font-size:12px; color:var(--text-tertiary)">${l.importedAt}</td>
                <td style="font-size:12px">${l.successRows}/${l.totalRows}</td>
                <td>${getImportStatusBadge(l.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== TRANSFERS =====
function renderTransfers() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">所属変更申請</h1>
        <p class="page-subtitle">所属変更の申請・承認フローを管理します</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openTransferModal('P001')">
          <span class="material-symbols-outlined">add</span>新規申請
        </button>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active">すべて<span class="tab-count">${DUMMY_DATA.transferRequests.length}</span></button>
      <button class="tab">承認待ち<span class="tab-count">${DUMMY_DATA.transferRequests.filter(t=>t.status==='pending').length}</span></button>
      <button class="tab">承認済み<span class="tab-count">${DUMMY_DATA.transferRequests.filter(t=>t.status==='approved').length}</span></button>
      <button class="tab">完了<span class="tab-count">${DUMMY_DATA.transferRequests.filter(t=>t.status==='completed').length}</span></button>
      <button class="tab">却下<span class="tab-count">${DUMMY_DATA.transferRequests.filter(t=>t.status==='rejected').length}</span></button>
    </div>

    <div class="card">
      <div class="table-container">
        <table>
          <thead><tr><th>ID</th><th>対象者</th><th>異動元</th><th>異動先</th><th>発効日</th><th>申請者</th><th>ステータス</th><th>操作</th></tr></thead>
          <tbody>
            ${DUMMY_DATA.transferRequests.map(t => `
              <tr>
                <td style="font-size:12px; color:var(--text-tertiary)">${t.id}</td>
                <td><span class="table-link" onclick="navigateTo('person-detail', {personId:'${t.personId}'})">${t.personName}</span></td>
                <td style="font-size:12px">${t.fromOrg}</td>
                <td style="font-size:12px">${t.toOrg}</td>
                <td style="font-size:12px">${t.effectiveDate}</td>
                <td style="font-size:12px">${t.requestedBy}</td>
                <td>${getTransferStatusBadge(t.status)}</td>
                <td>
                  ${t.status === 'pending' ? `
                    <button class="btn btn-accent btn-sm" onclick="showToast('申請を承認しました', 'success')">承認</button>
                    <button class="btn btn-ghost btn-sm" style="color:var(--danger-500)" onclick="showToast('申請を却下しました', 'warning')">却下</button>
                  ` : t.status === 'approved' ? `
                    <button class="btn btn-ghost btn-sm" onclick="showToast('申請を取り消しました', 'warning')">取消</button>
                  ` : '-'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== LOGS =====
function renderLogs() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">操作ログ</h1>
        <p class="page-subtitle">システムの操作履歴とインポートログを確認します</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary"><span class="material-symbols-outlined">download</span>ログ出力</button>
      </div>
    </div>

    <div class="filters-bar">
      <div class="filter-input">
        <span class="material-symbols-outlined">search</span>
        <input type="text" placeholder="ファイル名・実行者で検索...">
      </div>
      <div class="filter-input">
        <span class="material-symbols-outlined">filter_list</span>
        <select><option>すべての種別</option><option>名簿インポート</option><option>所属変更（承認不要）</option></select>
      </div>
      <div class="filter-input">
        <span class="material-symbols-outlined">event</span>
        <input type="date" value="2026-06-01">
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table>
          <thead><tr><th>ID</th><th>ファイル名</th><th>種別</th><th>実行者</th><th>日時</th><th>結果</th><th>ステータス</th><th>操作</th></tr></thead>
          <tbody>
            ${DUMMY_DATA.importLogs.map(l => `
              <tr>
                <td style="font-size:12px; color:var(--text-tertiary)">${l.id}</td>
                <td style="font-size:12px; font-weight:500">${l.fileName}</td>
                <td style="font-size:12px">${l.type}</td>
                <td style="font-size:12px">${l.importedBy}</td>
                <td style="font-size:12px; color:var(--text-tertiary)">${l.importedAt}</td>
                <td style="font-size:12px">
                  ${l.status === 'processing' ? '<span style="color:var(--text-tertiary)">処理中...</span>' :
                    `<span style="color:var(--accent-500)">${l.successRows}件成功</span>${l.errorRows > 0 ? ` / <span style="color:var(--danger-500)">${l.errorRows}件エラー</span>` : ''}`}
                </td>
                <td>${getImportStatusBadge(l.status)}</td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="openLogDetailModal('${l.id}')"><span class="material-symbols-outlined" style="font-size:16px">visibility</span></button>
                  ${l.status === 'error' ? `<button class="btn btn-ghost btn-sm" onclick="showToast('エラー詳細をダウンロードしました', 'success')"><span class="material-symbols-outlined" style="font-size:16px">download</span></button>` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <div class="pagination">
          <div class="pagination-info">${DUMMY_DATA.importLogs.length}件中 1〜${DUMMY_DATA.importLogs.length}件を表示</div>
          <div class="pagination-controls">
            <button class="page-btn" disabled><span class="material-symbols-outlined" style="font-size:16px">chevron_left</span></button>
            <button class="page-btn active">1</button>
            <button class="page-btn"><span class="material-symbols-outlined" style="font-size:16px">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openLogDetailModal(logId) {
  const log = DUMMY_DATA.importLogs.find(l => l.id === logId);
  if (!log) return;
  openModal(`インポート詳細: ${log.fileName}`, `
    <div class="detail-grid" style="margin-bottom:16px">
      <div class="detail-field"><div class="detail-field-label">ファイル名</div><div class="detail-field-value">${log.fileName}</div></div>
      <div class="detail-field"><div class="detail-field-label">種別</div><div class="detail-field-value">${log.type}</div></div>
      <div class="detail-field"><div class="detail-field-label">実行者</div><div class="detail-field-value">${log.importedBy}</div></div>
      <div class="detail-field"><div class="detail-field-label">実行日時</div><div class="detail-field-value">${log.importedAt}</div></div>
      <div class="detail-field"><div class="detail-field-label">総行数</div><div class="detail-field-value">${log.totalRows}</div></div>
      <div class="detail-field"><div class="detail-field-label">成功</div><div class="detail-field-value" style="color:var(--accent-500)">${log.successRows}件</div></div>
      <div class="detail-field"><div class="detail-field-label">エラー</div><div class="detail-field-value" style="color:${log.errorRows > 0 ? 'var(--danger-500)' : 'inherit'}">${log.errorRows}件</div></div>
      <div class="detail-field"><div class="detail-field-label">ステータス</div><div class="detail-field-value">${getImportStatusBadge(log.status)}</div></div>
    </div>
    ${log.errorRows > 0 ? `
      <div style="padding:12px; background:var(--danger-50); border-radius:var(--radius-md); border:1px solid var(--danger-200)">
        <div style="font-size:13px; font-weight:600; color:var(--danger-600); margin-bottom:8px">エラー詳細</div>
        <div style="font-size:12px; color:var(--danger-600); line-height:1.6">
          行15: メールアドレスの形式が不正です<br>
          行23: 必須項目「氏名」が空です<br>
          行31: 所属組織が見つかりません<br>
          ...他4件
        </div>
      </div>
    ` : ''}
  `, `
    ${log.errorRows > 0 ? `<button class="btn btn-secondary" style="margin-right:auto" onclick="showToast('エラーログをダウンロードしました', 'success')"><span class="material-symbols-outlined">download</span>エラーCSVダウンロード</button>` : ''}
    <button class="btn btn-secondary" onclick="closeModal()">閉じる</button>
  `);
}

// ===== CODES =====
function renderCodes() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">コード管理</h1>
        <p class="page-subtitle">ドロップダウン等で使用するコードマスターを管理します</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openAddCodeModal()">
          <span class="material-symbols-outlined">add</span>コード追加
        </button>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header"><span class="card-title">コードマスター一覧</span></div>
        <div class="card-body" style="padding:0">
          <div style="padding:0">
            ${DUMMY_DATA.codeMasters.map((c, i) => `
              <div class="org-node ${i===0?'selected':''}" onclick="selectCode(this, '${c.id}')" style="border-bottom:1px solid var(--border-light)">
                <span class="material-symbols-outlined">list</span>
                <span>${c.name}</span>
                <span class="org-count">${c.values.length}件</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="card" id="codeDetail">
        ${renderCodeDetail(DUMMY_DATA.codeMasters[0])}
      </div>
    </div>
  `;
}

function renderCodeDetail(code) {
  return `
    <div class="card-header">
      <span class="card-title">${code.name}</span>
      <button class="btn btn-secondary btn-sm" onclick="openEditCodeModal('${code.id}')"><span class="material-symbols-outlined">edit</span>編集</button>
    </div>
    <div class="card-body">
      <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px">${code.description}</p>
      <div style="font-size:12px; font-weight:600; color:var(--text-tertiary); margin-bottom:8px">コード値</div>
      <div class="code-values-list">
        ${code.values.map(v => `
          <div class="code-value-item">
            <div class="code-value-order">${v.sortOrder}</div>
            <div class="code-value-label">${v.label}</div>
            <div class="code-value-code">${v.code}</div>
            ${v.active ? '<span class="badge badge-green badge-dot">有効</span>' : '<span class="badge badge-gray badge-dot">無効</span>'}
          </div>
        `).join('')}
      </div>
      <button class="btn btn-secondary btn-sm" style="margin-top:12px" onclick="showToast('コード値を追加しました', 'success')">
        <span class="material-symbols-outlined">add</span>値を追加
      </button>
    </div>
  `;
}

function selectCode(el, codeId) {
  el.closest('.card-body').querySelectorAll('.org-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
  const code = DUMMY_DATA.codeMasters.find(c => c.id === codeId);
  document.getElementById('codeDetail').innerHTML = renderCodeDetail(code);
}

function openAddCodeModal() {
  openModal('コードマスターを追加', `
    <div class="form-group"><label class="form-label">コードID<span class="required">*</span></label><input class="form-input" placeholder="例: blood_type"></div>
    <div class="form-group"><label class="form-label">名称<span class="required">*</span></label><input class="form-input" placeholder="例: 血液型"></div>
    <div class="form-group"><label class="form-label">説明</label><textarea class="form-textarea" placeholder="このコードマスターの説明"></textarea></div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('コードマスターを追加しました', 'success')">追加</button>
  `);
}

function openEditCodeModal(codeId) {
  const code = DUMMY_DATA.codeMasters.find(c => c.id === codeId);
  if (!code) return;
  openModal(`コード編集: ${code.name}`, `
    <div class="form-group"><label class="form-label">名称</label><input class="form-input" value="${code.name}"></div>
    <div class="form-group"><label class="form-label">説明</label><textarea class="form-textarea">${code.description}</textarea></div>
    <div class="form-group"><label class="form-label">権限制限</label>
      <div class="form-hint" style="margin-bottom:8px">特定のコード値に対して閲覧権限を設定できます</div>
      <div style="padding:10px; border:1px solid var(--border-light); border-radius:var(--radius-md); font-size:12px; color:var(--text-secondary)">
        例: 「いじめ加害者」タグは学年主任以上にのみ表示
      </div>
    </div>
  `, `
    <button class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
    <button class="btn btn-primary" onclick="closeModal(); showToast('コードを更新しました', 'success')">保存</button>
  `);
}

// ===== SETTINGS =====
function renderSettings() {
  const container = document.getElementById('pageContainer');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">システム設定</h1>
        <p class="page-subtitle">テナント全体の設定を管理します</p>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active"><span class="material-symbols-outlined">settings</span>一般設定</button>
      <button class="tab"><span class="material-symbols-outlined">link</span>Google連携</button>
      <button class="tab"><span class="material-symbols-outlined">palette</span>外観</button>
      <button class="tab"><span class="material-symbols-outlined">notifications</span>通知設定</button>
    </div>

    <div class="dashboard-grid">
      <div class="card full-width">
        <div class="card-header"><span class="card-title">テナント情報</span></div>
        <div class="card-body">
          <div class="form-row">
            <div class="form-group"><label class="form-label">テナント名</label><input class="form-input" value="${DUMMY_DATA.tenant.name}"></div>
            <div class="form-group"><label class="form-label">テナントID</label><input class="form-input" value="${DUMMY_DATA.tenant.id}" disabled></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">プラン</label><input class="form-input" value="${DUMMY_DATA.tenant.plan}" disabled></div>
            <div class="form-group"><label class="form-label">Google Workspace</label><input class="form-input" value="${DUMMY_DATA.tenant.workspace}"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Google Workspace 同期設定</span></div>
        <div class="card-body">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-light)">
            <div><div style="font-size:13px; font-weight:500">自動同期</div><div style="font-size:12px; color:var(--text-tertiary)">1時間ごとに自動同期を実行</div></div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-light)">
            <div><div style="font-size:13px; font-weight:500">双方向同期</div><div style="font-size:12px; color:var(--text-tertiary)">Google Workspace側の変更も取り込む</div></div>
            <div class="toggle" onclick="this.classList.toggle('active')"></div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0">
            <div><div style="font-size:13px; font-weight:500">エラー通知</div><div style="font-size:12px; color:var(--text-tertiary)">同期エラー時に管理者へ通知</div></div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">所属変更設定</span></div>
        <div class="card-body">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-light)">
            <div><div style="font-size:13px; font-weight:500">承認フロー必須</div><div style="font-size:12px; color:var(--text-tertiary)">所属変更時に承認を必須とする</div></div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-light)">
            <div><div style="font-size:13px; font-weight:500">CSV一括変更</div><div style="font-size:12px; color:var(--text-tertiary)">CSV経由での承認スキップを許可</div></div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
          <div class="form-group" style="margin-top:12px">
            <label class="form-label">バッチ実行時刻</label>
            <select class="form-select"><option>00:00 (深夜)</option><option selected>03:00 (早朝)</option><option>06:00 (朝)</option></select>
            <div class="form-hint">承認済み所属変更のバッチ実行時刻</div>
          </div>
        </div>
      </div>

      <div class="card full-width">
        <div class="card-header"><span class="card-title">権限の継承設定</span></div>
        <div class="card-body">
          <div style="padding:12px; background:var(--primary-50); border-radius:var(--radius-md); margin-bottom:16px; font-size:13px; display:flex; gap:8px">
            <span class="material-symbols-outlined" style="color:var(--primary-500)">info</span>
            <div>上位組織で設定された権限は、下位組織に自動的に継承されます。下位組織で独自に設定を追加・上書きすることも可能です。</div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-light)">
            <div><div style="font-size:13px; font-weight:500">権限の継承を有効化</div><div style="font-size:12px; color:var(--text-tertiary)">上位組織の権限設定を下位組織に自動継承</div></div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 0">
            <div><div style="font-size:13px; font-weight:500">下位組織による上書きを許可</div><div style="font-size:12px; color:var(--text-tertiary)">下位組織が上位の設定を上書きすることを許可</div></div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
        </div>
        <div class="card-footer" style="display:flex; justify-content:flex-end">
          <button class="btn btn-primary" onclick="showToast('設定を保存しました', 'success')">設定を保存</button>
        </div>
      </div>
    </div>
  `;
}

// ===== HELPER FUNCTIONS =====
function getTypeBadge(type) {
  const map = { '教員': 'blue', '生徒': 'purple', '教育委員会': 'amber', '保護者': 'green' };
  return `<span class="badge badge-${map[type] || 'gray'}">${type}</span>`;
}

function getStatusBadge(status) {
  const map = { active: ['green', 'active', '在籍'], leave: ['amber', 'leave', '休職'], inactive: ['gray', 'inactive', '離職'] };
  const [color, , label] = map[status] || ['gray', '', status];
  return `<span class="badge badge-${color} badge-dot">${label || status}</span>`;
}

function getSyncBadge(status) {
  const map = { synced: ['green', '同期済み'], error: ['red', 'エラー'], no_account: ['gray', 'アカウントなし'] };
  const [color, label] = map[status] || ['gray', status];
  return `<span class="badge badge-${color} badge-dot">${label}</span>`;
}

function getImportStatusBadge(status) {
  const map = { completed: ['green', '完了'], processing: ['blue', '処理中'], error: ['red', 'エラー'] };
  const [color, label] = map[status] || ['gray', status];
  return `<span class="badge badge-${color} badge-dot">${label}</span>`;
}

function getTransferStatusBadge(status) {
  const map = { pending: ['amber', '承認待ち'], approved: ['blue', '承認済み'], completed: ['green', '完了'], rejected: ['red', '却下'] };
  const [color, label] = map[status] || ['gray', status];
  return `<span class="badge badge-${color} badge-dot">${label}</span>`;
}

function getFormStatusBadge(status) {
  const map = { active: ['green', '実施中'], draft: ['gray', '下書き'], closed: ['blue', '終了'] };
  const [color, label] = map[status] || ['gray', status];
  return `<span class="badge badge-${color} badge-dot">${label}</span>`;
}

function getDataTypeBadge(type) {
  const map = { string: ['blue', '文字列'], multi_string: ['purple', '複数文字列'], number: ['green', '数値'], date: ['amber', '日付'], code: ['red', 'コード参照'] };
  const [color, label] = map[type] || ['gray', type];
  return `<span class="badge badge-${color}">${label}</span>`;
}

function getOrgIcon(type) {
  const map = { tenant: 'location_city', city: 'location_on', school_type: 'school', school: 'house', committee: 'business', department: 'meeting_room' };
  return map[type] || 'folder';
}

function getOrgTypeLabel(type) {
  const map = { tenant: 'テナント', city: '市町村', school_type: '学校種', school: '学校', committee: '教育委員会', department: '部署' };
  return map[type] || type;
}

function getTypeOrgBadge(type) {
  return `<span class="badge badge-blue">${getOrgTypeLabel(type)}</span>`;
}

document.addEventListener('DOMContentLoaded', init);
