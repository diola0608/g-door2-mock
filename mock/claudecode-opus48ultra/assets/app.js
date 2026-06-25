/* =====================================================================
   まなびConnect — shared shell & interactions (mock)
   ===================================================================== */
(function () {
  /* ---------------- Icons (Lucide-style) ---------------- */
  const I = {
    grid: '<path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    sitemap: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>',
    transfer: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5-5 5 5"/><path d="M12 5v12"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    chevDown: '<polyline points="6 9 12 15 18 9"/>',
    chevRight: '<polyline points="9 18 15 12 9 6"/>',
    chevLeft: '<polyline points="15 18 9 12 15 6"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    dots: '<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    type: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    google: '<path d="M21.35 11.1H12v3.8h5.35c-.25 1.4-1.7 4.1-5.35 4.1a6 6 0 0 1 0-12c1.7 0 2.85.73 3.5 1.35l2.4-2.3C16.4 4.3 14.4 3.4 12 3.4a8.6 8.6 0 1 0 0 17.2c5 0 8.3-3.5 8.3-8.4 0-.56-.06-1-.15-1.5z"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><path d="M9 22v-4h6v4"/>',
    school: '<path d="M22 9 12 5 2 9l10 4 10-4z"/><path d="M6 10.6V16c0 1.1 2.7 2 6 2s6-.9 6-2v-5.4"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 1.5 9 1.5 12 0v-5"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    arrowDown: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    history: '<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    tag: '<path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    columns: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/>',
    moreGrid: '<circle cx="5" cy="5" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="19" cy="5" r="1.5"/><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="19" r="1.5"/><circle cx="12" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/>',
    db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  };

  function icon(name, cls) {
    const p = I[name] || '';
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${cls ? `class="${cls}"` : ''}>${p}</svg>`;
  }
  window.icon = icon;

  /* ---------------- Navigation config ---------------- */
  const NAV = [
    { items: [
      { key: 'dashboard', label: 'ダッシュボード', icon: 'grid', href: 'index.html' },
    ]},
    { label: '名簿・組織', items: [
      { key: 'roster-list', label: '名簿一覧', icon: 'users', href: 'roster-list.html' },
      { key: 'org', label: '組織管理', icon: 'sitemap', href: 'org-structure.html' },
      { key: 'transfers', label: '所属変更・承認', icon: 'transfer', href: 'transfers.html', badge: { t: '6', cls: 'num' } },
      { key: 'import', label: 'CSVインポート', icon: 'upload', href: 'roster-import.html' },
      { key: 'logs', label: '処理ログ', icon: 'activity', href: 'roster-logs.html', badge: { t: '2', cls: 'num' } },
    ]},
    { label: 'アカウント', items: [
      { key: 'accounts', label: 'アカウント・同期', icon: 'at', href: 'accounts.html' },
    ]},
    { label: 'フォーム', items: [
      { key: 'forms', label: 'フォーム一覧', icon: 'file', href: 'forms-list.html' },
    ]},
    { label: '管理設定', items: [
      { key: 'attributes', label: '属性項目', icon: 'sliders', href: 'attributes.html' },
      { key: 'codes', label: 'コードマスター', icon: 'hash', href: 'code-master.html' },
      { key: 'permissions', label: '権限設定', icon: 'shield', href: 'permissions.html' },
    ]},
  ];

  /* ---------------- Header ---------------- */
  function buildHeader() {
    const h = document.createElement('header');
    h.className = 'app-header';
    h.innerHTML = `
      <a class="brand" href="index.html" aria-label="まなびConnect ホーム">
        <span class="logo">${icon('layers')}</span>
        <span class="name">まなびConnect<span class="sub">EDUCATION PLATFORM</span></span>
      </a>

      <div class="dropdown" data-dropdown>
        <div class="tenant-switch" data-dropdown-toggle role="button" tabindex="0">
          <span class="pref">神</span>
          <span class="meta"><b>神奈川県教育委員会</b><span>テナント全体 ・ 本番環境</span></span>
          <span class="chev">${icon('chevDown')}</span>
        </div>
        <div class="dropdown-menu left" style="min-width:280px">
          <div class="menu-label">テナント切替</div>
          <div class="menu-item" data-mock>${icon('building')}<div><b style="display:block;font-size:13px">神奈川県教育委員会</b><span class="tiny muted">現在のテナント</span></div><span class="right">${icon('check')}</span></div>
          <div class="menu-item" data-mock>${icon('building')}<div><b style="display:block;font-size:13px">横浜市教育委員会</b><span class="tiny muted">サンドボックス</span></div></div>
          <div class="menu-sep"></div>
          <div class="menu-item" data-mock>${icon('settings')}テナント設定を開く</div>
        </div>
      </div>

      <div class="header-search">
        ${icon('search')}
        <input type="text" placeholder="名簿・組織・フォームを横断検索…" data-mock-input>
        <span class="kbd">⌘K</span>
      </div>

      <div class="header-actions">
        <div class="dropdown" data-dropdown>
          <button class="icon-btn" data-dropdown-toggle title="新規作成">${icon('plus')}</button>
          <div class="dropdown-menu">
            <div class="menu-label">新規作成</div>
            <div class="menu-item" data-href="roster-list.html">${icon('users')}人物を登録</div>
            <div class="menu-item" data-href="roster-import.html">${icon('upload')}CSVインポート</div>
            <div class="menu-item" data-href="form-builder.html">${icon('file')}フォームを作成</div>
            <div class="menu-item" data-href="transfers.html">${icon('transfer')}所属変更を申請</div>
          </div>
        </div>
        <div class="dropdown" data-dropdown>
          <button class="icon-btn" data-dropdown-toggle title="ヘルプ">${icon('help')}</button>
          <div class="dropdown-menu">
            <div class="menu-item" data-mock>${icon('bookOpen')}操作マニュアル</div>
            <div class="menu-item" data-mock>${icon('play')}チュートリアル動画</div>
            <div class="menu-item" data-mock>${icon('send')}サポートへ問い合わせ</div>
          </div>
        </div>
        <div class="dropdown" data-dropdown>
          <button class="icon-btn" data-dropdown-toggle title="通知"><span class="count">3</span>${icon('bell')}</button>
          <div class="dropdown-menu" style="width:340px">
            <div class="menu-label">通知 (3)</div>
            <div class="menu-item" data-href="roster-logs.html" style="align-items:flex-start">
              <span style="color:var(--err-500)">${icon('alert')}</span>
              <div><b style="display:block;font-size:13px">CSVインポートでエラー 2件</b><span class="tiny muted">教員データ_0625.csv ・ 5分前</span></div>
            </div>
            <div class="menu-item" data-href="transfers.html" style="align-items:flex-start">
              <span style="color:var(--warn-500)">${icon('transfer')}</span>
              <div><b style="display:block;font-size:13px">所属変更の承認依頼 6件</b><span class="tiny muted">あなたの承認待ち ・ 1時間前</span></div>
            </div>
            <div class="menu-item" data-href="form-results.html" style="align-items:flex-start">
              <span style="color:var(--ok-500)">${icon('checkCircle')}</span>
              <div><b style="display:block;font-size:13px">アンケートの回答が集まりました</b><span class="tiny muted">勤務実態調査 ・ 本日 09:12</span></div>
            </div>
            <div class="menu-sep"></div>
            <div class="menu-item" data-mock style="justify-content:center;color:var(--brand-700)">すべての通知を見る</div>
          </div>
        </div>

        <div class="dropdown" data-dropdown>
          <div class="user-chip" data-dropdown-toggle role="button" tabindex="0">
            <span class="avatar av-blue">佐藤</span>
            <span class="who"><b>佐藤 涼太</b><span>県教委 システム管理者</span></span>
            ${icon('chevDown')}
          </div>
          <div class="dropdown-menu" style="width:260px">
            <div style="display:flex;gap:11px;padding:10px;align-items:center">
              <span class="avatar av-blue" style="width:42px;height:42px">佐藤</span>
              <div><b style="display:block">佐藤 涼太</b><span class="tiny muted">ryota.sato@pref-kanagawa.ed.jp</span></div>
            </div>
            <div class="menu-sep"></div>
            <div class="menu-item" data-mock>${icon('users')}プロフィール</div>
            <div class="menu-item" data-mock>${icon('shield')}自分の権限を確認</div>
            <div class="menu-item" data-mock>${icon('settings')}個人設定</div>
            <div class="menu-sep"></div>
            <div class="menu-item danger" data-mock>${icon('logout')}ログアウト</div>
          </div>
        </div>
      </div>`;
    return h;
  }

  /* ---------------- Sidebar ---------------- */
  function buildSidebar(active) {
    const s = document.createElement('aside');
    s.className = 'app-sidebar';
    let html = '';
    NAV.forEach(group => {
      html += '<div class="nav-group">';
      if (group.label) html += `<div class="label">${group.label}</div>`;
      group.items.forEach(it => {
        const on = it.key === active ? ' active' : '';
        let badge = '';
        if (it.badge) badge = `<span class="badge-${it.badge.cls}">${it.badge.t}</span>`;
        html += `<a class="nav-item${on}" href="${it.href}">${icon(it.icon)}<span>${it.label}</span>${badge}</a>`;
      });
      html += '</div>';
    });
    html += `
      <div class="sidebar-foot">
        <div class="upgrade-card">
          <b>データ利活用 BI</b>
          <p>名簿データを横断分析。近日公開予定のアドオンです。</p>
          <span class="mini" data-mock>${icon('sparkle')}先行登録する</span>
        </div>
      </div>`;
    s.innerHTML = html;
    return s;
  }

  /* ---------------- Toast ---------------- */
  function toast(msg, type = 'info') {
    let wrap = document.getElementById('toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toast-wrap'; document.body.appendChild(wrap); }
    const ic = type === 'ok' ? 'checkCircle' : type === 'err' ? 'alert' : 'info';
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.innerHTML = icon(ic) + `<span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.style.transition = '.3s'; t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; setTimeout(() => t.remove(), 300); }, 2800);
  }
  window.toast = toast;

  /* ---------------- Modal / Drawer ---------------- */
  function openModal(id) { const m = document.getElementById(id); if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; } }
  function closeModal(el) {
    const root = el ? el.closest('.modal-root, .drawer-root') : null;
    (root ? [root] : document.querySelectorAll('.modal-root.open, .drawer-root.open')).forEach(r => r.classList.remove('open'));
    document.body.style.overflow = '';
  }
  window.openModal = openModal; window.closeModal = closeModal;

  /* ---------------- Init ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('app');
    const active = document.body.dataset.page || '';
    document.body.insertBefore(buildSidebar(active), document.body.firstChild);
    document.body.insertBefore(buildHeader(), document.body.firstChild);

    /* global click delegation */
    document.addEventListener('click', (e) => {
      const t = e.target;

      // dropdown toggle
      const dt = t.closest('[data-dropdown-toggle]');
      if (dt) {
        const dd = dt.closest('.dropdown');
        const wasOpen = dd.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        if (!wasOpen) dd.classList.add('open');
        e.stopPropagation();
        return;
      }
      // close dropdowns when clicking outside
      if (!t.closest('.dropdown-menu')) document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));

      // menu item with data-href
      const mh = t.closest('[data-href]');
      if (mh) { window.location.href = mh.dataset.href; return; }

      // modal open
      const mo = t.closest('[data-modal]');
      if (mo) { e.preventDefault(); openModal(mo.dataset.modal); return; }
      // drawer open
      const dro = t.closest('[data-drawer]');
      if (dro) { e.preventDefault(); const d = document.getElementById(dro.dataset.drawer); if (d) { d.classList.add('open'); document.body.style.overflow='hidden'; } return; }
      // close modal/drawer
      if (t.closest('[data-close]') || t.classList.contains('modal-backdrop') || t.classList.contains('drawer-root')) { closeModal(t); return; }

      // tabs
      const tab = t.closest('[data-tab]');
      if (tab) {
        e.preventDefault();
        const group = tab.closest('[data-tabs]');
        if (group) {
          group.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
          tab.classList.add('active');
          const val = tab.dataset.tab;
          const vals = Array.from(group.querySelectorAll('[data-tab]')).map(b => b.dataset.tab);
          document.querySelectorAll('[data-panel]').forEach(p => {
            if (vals.includes(p.dataset.panel)) p.style.display = (p.dataset.panel === val) ? '' : 'none';
          });
        }
        return;
      }

      // tree collapse
      const tw = t.closest('[data-tree-toggle]');
      if (tw) {
        const node = tw.closest('.tree-node');
        const kids = node.querySelector(':scope > .tree-children');
        if (kids) { kids.classList.toggle('hidden'); tw.querySelector('.tree-row')?.classList.toggle('collapsed'); }
        const row = tw.classList.contains('tree-row') ? tw : tw.querySelector('.tree-row');
        return;
      }

      // tree select
      const tr = t.closest('.tree-row[data-select]');
      if (tr) { document.querySelectorAll('.tree-row.sel').forEach(r => r.classList.remove('sel')); tr.classList.add('sel'); if (tr.dataset.select) toast(tr.dataset.select + ' を選択しました', 'info'); }

      // mock action
      const mk = t.closest('[data-mock]');
      if (mk) {
        e.preventDefault();
        toast(mk.dataset.mock || 'モックのため、この操作は実行されません', 'info');
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        return;
      }
      // mock action that confirms & closes modal
      const mkc = t.closest('[data-mock-confirm]');
      if (mkc) { e.preventDefault(); toast(mkc.dataset.mockConfirm || '保存しました（モック）', 'ok'); closeModal(t); return; }
    });

    // escape closes overlays
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open')); } });

    // mock inputs: prevent accidental nothing — allow typing but search submit toasts
    document.querySelectorAll('[data-mock-input]').forEach(inp => {
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); toast('「' + (inp.value || '…') + '」を検索（モック）', 'info'); } });
    });

    // segmented as in-page filter (mock)
    document.querySelectorAll('.segmented').forEach(seg => {
      seg.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        seg.querySelectorAll('button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
    });
  });
})();
