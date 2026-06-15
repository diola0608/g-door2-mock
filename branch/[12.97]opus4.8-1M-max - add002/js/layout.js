/* Shared app shell: global header + left sidebar, injected on every page */
(function () {
  var I = window.icon;

  var NAV = [
    {
      title: null,
      items: [
        { id: 'dashboard', label: 'ダッシュボード', icon: 'dashboard', href: 'index.html' },
      ],
    },
    {
      title: '名簿・組織',
      items: [
        { id: 'roster-list', label: '名簿管理', icon: 'users', href: 'roster-list.html' },
        { id: 'org', label: '組織管理', icon: 'sitemap', href: 'org.html' },
        { id: 'org-settings', label: '組織別設定', icon: 'layers', href: 'org-settings.html' },
        { id: 'accounts', label: 'アカウント管理', icon: 'user', href: 'accounts.html' },
        { id: 'transfers', label: '所属変更申請', icon: 'swap', href: 'transfers.html', badge: '4', badgeType: 'warn' },
      ],
    },
    {
      title: 'データ取込・連携',
      items: [
        { id: 'roster-import', label: 'インポート', icon: 'upload', href: 'roster-import.html' },
        { id: 'data-mapping', label: '連携・変換設定', icon: 'plug', href: 'data-mapping.html' },
        { id: 'logs', label: '処理ログ', icon: 'history', href: 'logs.html', badge: '2', badgeType: 'danger' },
      ],
    },
    {
      title: 'フォーム',
      items: [
        { id: 'forms-list', label: 'フォーム', icon: 'forms', href: 'forms-list.html' },
      ],
    },
    {
      title: '分析・可視化',
      items: [
        { id: 'analytics', label: 'データ利活用', icon: 'chart', href: 'analytics.html' },
        { id: 'dashboards', label: 'ダッシュボード管理', icon: 'dashboard', href: 'dashboards.html' },
      ],
    },
    {
      title: '管理設定',
      items: [
        { id: 'permissions', label: '権限管理', icon: 'shield', href: 'permissions.html' },
        { id: 'roster-attributes', label: '属性項目', icon: 'sliders', href: 'roster-attributes.html' },
        { id: 'codes', label: 'コードマスター', icon: 'list', href: 'codes.html' },
        { id: 'apps', label: '機能・アドオン', icon: 'puzzle', href: 'apps.html' },
        { id: 'settings', label: 'テナント設定', icon: 'settings', href: 'settings.html' },
      ],
    },
  ];

  var active = document.body.dataset.page || '';

  /* ---------- Header ---------- */
  var header = document.createElement('header');
  header.className = 'appbar';
  header.innerHTML =
    '<button class="icon-btn appbar__menu" id="navToggle" title="メニュー">' + I('menu') + '</button>' +
    '<a class="appbar__brand" href="index.html">' +
      '<span class="appbar__logo">' + I('cap', { size: 19 }) + '</span>' +
      '<span class="appbar__brand-text">' +
        '<span class="appbar__name">Edu<b>Connect</b></span>' +
        '<span class="appbar__sub">教育情報プラットフォーム</span>' +
      '</span>' +
    '</a>' +
    '<div class="appbar__divider"></div>' +
    '<div class="tenant-switch dropdown" data-dropdown>' +
      '<span class="tenant-switch__badge">青</span>' +
      '<span><span class="tenant-switch__name">青葉県教育委員会</span><br><span class="tenant-switch__role">テナント全体 / システム管理者</span></span>' +
      I('chevronDown', { size: 15 }) +
      '<div class="menu" style="top:48px;left:0;min-width:240px">' +
        '<div class="menu__label">テナント切替</div>' +
        '<div class="menu__item"><span class="tenant-switch__badge" style="width:22px;height:22px;font-size:10px">青</span> 青葉県教育委員会 ' + I('check', { size: 16, class: 'spacer' }) + '</div>' +
        '<div class="menu__item"><span class="tenant-switch__badge" style="width:22px;height:22px;font-size:10px;background:linear-gradient(135deg,#f59e0b,#ef4444)">桜</span> 桜花県教育委員会</div>' +
        '<div class="menu__sep"></div>' +
        '<div class="menu__item">' + I('sitemap', { size: 16 }) + 'スコープを変更…</div>' +
      '</div>' +
    '</div>' +
    '<label class="appbar__search">' + I('search', { size: 17 }) +
      '<input type="text" placeholder="名簿・組織・フォームを検索…">' +
      '<kbd>⌘K</kbd>' +
    '</label>' +
    '<div class="appbar__actions">' +
      '<div class="dropdown" data-dropdown>' +
        '<button class="icon-btn" title="サービス">' + I('grid') + '</button>' +
        appSwitcher() +
      '</div>' +
      '<button class="icon-btn" title="ヘルプ">' + I('help') + '</button>' +
      '<div class="dropdown" data-dropdown>' +
        '<button class="icon-btn" title="通知">' + I('bell') + '<span class="dot">5</span></button>' +
        notifMenu() +
      '</div>' +
      '<div class="dropdown" data-dropdown>' +
        '<div class="appbar__user">' +
          '<span class="avatar avatar--sm">井</span>' +
          '<span class="appbar__user-meta"><span class="appbar__user-name">井上 管理</span><br><span class="appbar__user-role">システム管理者</span></span>' +
          I('chevronDown', { size: 15, class: 'spacer' }) +
        '</div>' +
        '<div class="menu right" style="top:52px;min-width:230px">' +
          '<div style="display:flex;gap:11px;align-items:center;padding:8px 10px">' +
            '<span class="avatar">井</span><div><div style="font-weight:650;font-size:13px">井上 管理</div><div class="text-3" style="font-size:11.5px">admin@aoba-edu.ed.jp</div></div>' +
          '</div>' +
          '<div class="menu__sep"></div>' +
          '<div class="menu__item">' + I('user', { size: 16 }) + 'プロフィール</div>' +
          '<div class="menu__item">' + I('shield', { size: 16 }) + '自分の権限を確認</div>' +
          '<div class="menu__item">' + I('settings', { size: 16 }) + '個人設定</div>' +
          '<div class="menu__sep"></div>' +
          '<div class="menu__item danger">' + I('logout', { size: 16 }) + 'ログアウト</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ---------- Sidebar ---------- */
  var sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  var navHtml = '<nav class="sidebar__scroll">';
  NAV.forEach(function (sec) {
    navHtml += '<div class="nav-section">';
    if (sec.title) navHtml += '<div class="nav-section__title">' + sec.title + '</div>';
    sec.items.forEach(function (it) {
      var isActive = it.id === active;
      navHtml +=
        '<a class="nav-item' + (isActive ? ' active' : '') + '" href="' + it.href + '">' +
          I(it.icon, { size: 19 }) +
          '<span class="nav-item__label">' + it.label + '</span>' +
          (it.badge ? '<span class="nav-item__badge ' + (it.badgeType || '') + '">' + it.badge + '</span>' : '') +
        '</a>';
    });
    navHtml += '</div>';
  });
  navHtml += '</nav>';
  navHtml +=
    '<div class="sidebar__foot">' +
      '<div class="org-context">' +
        '<span class="org-context__icon">' + I('globe', { size: 18 }) + '</span>' +
        '<div><div class="org-context__name">青葉県（テナント全体）</div><div class="org-context__path">表示スコープ</div></div>' +
      '</div>' +
    '</div>';
  sidebar.innerHTML = navHtml;

  var scrim = document.createElement('div');
  scrim.className = 'nav-scrim';

  /* ---------- Assemble ---------- */
  var main = document.getElementById('main');
  var shell = document.createElement('div');
  shell.className = 'shell';
  document.body.insertBefore(header, document.body.firstChild);
  document.body.insertBefore(scrim, header.nextSibling);
  if (main && main.parentNode) main.parentNode.removeChild(main);
  shell.appendChild(sidebar);
  if (main) shell.appendChild(main);
  document.body.insertBefore(shell, scrim.nextSibling);

  /* ---------- Nav toggle ---------- */
  function toggleNav() {
    if (window.innerWidth <= 1100) document.body.classList.toggle('nav-open');
    else document.body.classList.toggle('nav-collapsed');
  }
  document.getElementById('navToggle').addEventListener('click', toggleNav);
  scrim.addEventListener('click', function () { document.body.classList.remove('nav-open'); });

  /* ---------- helpers ---------- */
  function appSwitcher() {
    var apps = [
      { ic: 'users', c: 'brand', t: '名簿管理', h: 'roster-list.html' },
      { ic: 'sitemap', c: 'teal', t: '組織管理', h: 'org.html' },
      { ic: 'user', c: 'info', t: 'アカウント', h: 'accounts.html' },
      { ic: 'forms', c: 'violet', t: 'フォーム', h: 'forms-list.html' },
      { ic: 'chart', c: 'pink', t: 'データ利活用', h: 'analytics.html' },
      { ic: 'dashboard', c: 'teal', t: 'ダッシュボード', h: 'dashboards.html' },
      { ic: 'shield', c: 'warning', t: '権限管理', h: 'permissions.html' },
      { ic: 'plug', c: 'info', t: '連携・変換', h: 'data-mapping.html' },
      { ic: 'puzzle', c: 'violet', t: '機能・アドオン', h: 'apps.html' },
    ];
    var h = '<div class="menu" style="top:48px;width:300px;padding:12px"><div class="menu__label">サービス</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
    apps.forEach(function (a) {
      h += '<a href="' + a.h + '" style="display:flex;flex-direction:column;align-items:center;gap:7px;padding:13px 6px;border-radius:10px;text-align:center" onmouseover="this.style.background=\'var(--c-100)\'" onmouseout="this.style.background=\'\'">' +
        '<span class="ico-tile ' + a.c + '" style="width:40px;height:40px">' + I(a.ic, { size: 20 }) + '</span>' +
        '<span style="font-size:11.5px;font-weight:600;color:var(--text-2)">' + a.t + '</span></a>';
    });
    h += '</div></div>';
    return h;
  }

  function notifMenu() {
    var items = [
      { ic: 'alert', c: 'danger', t: 'CSVインポートでエラー', d: '「教員名簿_2026.csv」の12行目で検証エラー', tm: '8分前' },
      { ic: 'swap', c: 'warning', t: '所属変更の承認依頼', d: '青葉第一中学校から3件の承認待ち', tm: '32分前' },
      { ic: 'forms', c: 'violet', t: 'フォーム回答が集まりました', d: '「ICT活用状況調査」回答率82%に到達', tm: '1時間前' },
      { ic: 'checkCircle', c: 'success', t: '同期が完了しました', d: 'Google Workspaceへ1,204件を反映', tm: '3時間前' },
    ];
    var h = '<div class="menu right" style="top:48px;width:360px;padding:0">' +
      '<div style="display:flex;align-items:center;padding:13px 16px;border-bottom:1px solid var(--border)"><b style="font-size:14px">通知</b><a href="logs.html" class="muted-link spacer" style="font-size:12px">すべて表示</a></div>';
    items.forEach(function (n) {
      h += '<div class="menu__item" style="align-items:flex-start;padding:12px 16px;border-bottom:1px solid var(--border);border-radius:0">' +
        '<span class="ico-tile ' + n.c + '" style="width:34px;height:34px">' + I(n.ic, { size: 17 }) + '</span>' +
        '<div style="white-space:normal"><div style="font-weight:650;font-size:12.5px">' + n.t + '</div><div class="text-3" style="font-size:11.5px;margin-top:1px">' + n.d + '</div><div class="text-3" style="font-size:11px;margin-top:3px">' + n.tm + '</div></div></div>';
    });
    h += '</div>';
    return h;
  }
})();
