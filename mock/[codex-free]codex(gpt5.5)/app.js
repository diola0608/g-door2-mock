const state = {
  route: location.hash.replace("#", "") || "/",
  selectedPersonId: "p001",
  selectedTab: "basic",
  selectedOrg: "o03",
  toast: ""
};

const navItems = [
  { path: "/", label: "トップ", icon: "grid", section: "共通" },
  { path: "/roster", label: "名簿管理", icon: "users", section: "サービス" },
  { path: "/accounts", label: "アカウント同期", icon: "mail", section: "サービス" },
  { path: "/org", label: "組織・継承設定", icon: "building", section: "サービス" },
  { path: "/permissions", label: "権限ポリシー", icon: "shield", section: "サービス" },
  { path: "/import", label: "CSVインポート", icon: "upload", section: "運用" },
  { path: "/approvals", label: "所属変更申請", icon: "workflow", section: "運用" },
  { path: "/forms", label: "フォーム", icon: "form", section: "サービス" },
  { path: "/analytics", label: "データ利活用", icon: "chart", section: "サービス" },
  { path: "/logs", label: "処理ログ", icon: "list", section: "運用" }
];

const people = [
  {
    id: "p001",
    name: "佐藤 真央",
    kana: "サトウ マオ",
    role: "生徒",
    email: "mao.sato@school.example.jp",
    org: "県央市立 青葉中学校",
    className: "2年A組",
    grade: "中2",
    status: "在籍",
    sync: "同期済み",
    features: ["サッカー部", "要配慮あり"],
    phone: "090-2345-6789",
    address: "県央市青葉町 2-14-6"
  },
  {
    id: "p002",
    name: "田中 悠人",
    kana: "タナカ ユウト",
    role: "教員",
    email: "tanaka@pref-edu.example.jp",
    org: "県央市立 青葉中学校",
    className: "2年A組担任",
    grade: "教諭",
    status: "在職",
    sync: "反映待ち",
    features: ["部活顧問: サッカー", "一般教員"],
    phone: "080-8888-1122",
    address: "県央市中央 4-1-8"
  },
  {
    id: "p003",
    name: "鈴木 花",
    kana: "スズキ ハナ",
    role: "生徒",
    email: "",
    org: "北浜町立 さくら小学校",
    className: "5年2組",
    grade: "小5",
    status: "転出予定",
    sync: "対象外",
    features: ["吹奏楽", "住所変更申請中"],
    phone: "090-4321-1100",
    address: "北浜町桜台 8-2"
  },
  {
    id: "p004",
    name: "山本 恵子",
    kana: "ヤマモト ケイコ",
    role: "教育委員会",
    email: "keiko.yamamoto@pref-edu.example.jp",
    org: "県教育委員会 学務課",
    className: "学務課",
    grade: "課長補佐",
    status: "在職",
    sync: "同期済み",
    features: ["承認不要CSV", "県全体閲覧"],
    phone: "070-1000-2200",
    address: "県庁第2庁舎 7F"
  }
];

const forms = [
  { name: "教員 私用携帯番号登録", owner: "県教育委員会", target: "全市町村 / 小中学校 / 教員", status: "受付中", responses: 683, due: "2026/07/15" },
  { name: "不登校支援状況 月次報告", owner: "県央市 教育支援課", target: "県央市 / 中学校 / 学年主任", status: "集計中", responses: 42, due: "2026/06/30" },
  { name: "Googleアカウント棚卸し", owner: "システム管理室", target: "全組織 / 管理者", status: "下書き", responses: 0, due: "未設定" }
];

const logs = [
  { job: "CSV名簿インポート", user: "山本 恵子", started: "2026/06/12 09:18", status: "エラー", count: "1,248件中 17件失敗" },
  { job: "Workspace同期", user: "system", started: "2026/06/12 08:00", status: "完了", count: "2,942件反映" },
  { job: "所属変更バッチ", user: "system", started: "2026/06/12 02:30", status: "完了", count: "46件処理" },
  { job: "フォーム回答反映", user: "system", started: "2026/06/11 22:10", status: "警告", count: "12件確認待ち" }
];

const orgs = [
  { id: "o01", level: 0, name: "青嶺県", type: "テナント全体", members: "124,820" },
  { id: "o02", level: 1, name: "県央市", type: "市町村", members: "24,510" },
  { id: "o03", level: 2, name: "県央市立 青葉中学校", type: "学校", members: "812" },
  { id: "o04", level: 2, name: "県央市 教育支援課", type: "教育委員会 部署", members: "44" },
  { id: "o05", level: 1, name: "北浜町", type: "市町村", members: "7,930" },
  { id: "o06", level: 2, name: "北浜町立 さくら小学校", type: "学校", members: "436" },
  { id: "o07", level: 1, name: "県立学校", type: "学校種", members: "18,400" }
];

const iconPaths = {
  grid: "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3 8 6 8-6",
  building: "M3 21h18M5 21V5a2 2 0 0 1 2-2h7v18M9 7h1M9 11h1M9 15h1M14 9h3a2 2 0 0 1 2 2v10M16 13h1M16 17h1",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  workflow: "M6 3v6h6M18 21v-6h-6M6 9a6 6 0 0 1 10.5-4M18 15A6 6 0 0 1 7.5 19",
  form: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M8 13h8M8 17h8M8 9h2",
  chart: "M3 3v18h18M7 16l4-4 3 3 5-8",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  search: "M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  help: "M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14M13 5l7 7-7 7",
  edit: "M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5L17 3Z",
  x: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  filter: "M3 5h18M6 12h12M10 19h4",
  clock: "M12 8v5l3 3M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  lock: "M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5V11Z",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-2 .3l-.1.1a1.7 1.7 0 0 0-.5 1.3H9a1.7 1.7 0 0 0-.5-1.3l-.1-.1a1.7 1.7 0 0 0-2-.3l-.2.1-2-3.4.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7l2-3.4.2.1a1.7 1.7 0 0 0 2-.3l.1-.1A1.7 1.7 0 0 0 9 2h6a1.7 1.7 0 0 0 .5 1.3l.1.1a1.7 1.7 0 0 0 2 .3l.2-.1 2 3.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"
};

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${iconPaths[name] || iconPaths.file}"></path></svg>`;
}

function statusClass(value) {
  if (["完了", "同期済み", "在籍", "在職", "受付中", "承認済み"].includes(value)) return "ok";
  if (["警告", "反映待ち", "転出予定", "集計中", "審査中"].includes(value)) return "warn";
  if (["エラー", "差戻し"].includes(value)) return "bad";
  if (["下書き", "対象外", "未設定"].includes(value)) return "neutral";
  return "info";
}

function appShell(content) {
  const sections = [...new Set(navItems.map((item) => item.section))];
  return `
    <header class="global-header">
      <div class="brand-mark">ET</div>
      <div class="header-title">
        <strong>EduTenant Console</strong>
        <span>青嶺県 教育データ基盤</span>
      </div>
      <div class="tenant-switcher">
        <label for="tenant">テナント</label>
        <select id="tenant">
          <option>青嶺県 GCP Project / prod-aomine</option>
          <option>検証環境 / stg-aomine</option>
        </select>
      </div>
      <div class="header-search">
        ${icon("search")}
        <input type="search" placeholder="氏名、メール、組織、フォーム、処理IDで検索" />
      </div>
      <div class="header-actions">
        <button class="icon-button" title="通知" data-modal="notifications">${icon("bell")}</button>
        <button class="icon-button" title="ヘルプ" data-modal="help">${icon("help")}</button>
        <div class="user-pill">
          <span class="avatar">山</span>
          <span><strong>山本 恵子</strong><span>県管理者</span></span>
        </div>
      </div>
    </header>
    <aside class="sidebar">
      ${sections.map((section) => `
        <div class="side-section">
          <p class="side-label">${section}</p>
          ${navItems.filter((item) => item.section === section).map((item) => `
            <a class="nav-link ${state.route === item.path ? "active" : ""}" href="#${item.path}">
              ${icon(item.icon)}<span>${item.label}</span>
            </a>
          `).join("")}
        </div>
      `).join("")}
      <div class="sidebar-context">
        <h3>現在の組織スコープ</h3>
        <ul class="org-mini-tree">
          <li>青嶺県</li>
          <li>県央市</li>
          <li>県央市立 青葉中学校</li>
        </ul>
      </div>
    </aside>
    <main class="main">
      <div class="content">${content}</div>
    </main>
  `;
}

function pageHead(eyebrow, title, description, actions = "") {
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
      <div class="head-actions">${actions}</div>
    </div>
  `;
}

function metric(label, value, note, tone, iconName) {
  return `
    <div class="panel metric ${tone || ""}">
      <div class="metric-top">
        <span class="metric-label">${label}</span>
        ${icon(iconName || "chart")}
      </div>
      <div class="metric-value">${value}</div>
      <div class="metric-note">${note}</div>
    </div>
  `;
}

function dashboardPage() {
  return `
    ${pageHead(
      "Tenant Launcher",
      "青嶺県 教育データ基盤",
      "名簿、Google Workspaceアカウント、権限、フォーム、バッチ処理を横断して確認します。トップページは各サービスへ移動する業務ランチャーです。",
      `<button class="btn" data-modal="support">${icon("help")}問い合わせ</button><a class="btn primary" href="#/import">${icon("upload")}CSVインポート</a>`
    )}
    <div class="grid cols-4">
      ${metric("管理対象人数", "124,820", "児童生徒 99,430 / 教職員 18,204 / 委員会 7,186", "cyan", "users")}
      ${metric("本日の同期", "2,942", "Workspaceへの反映済み。反映待ちは 86 件です。", "green", "mail")}
      ${metric("承認待ち", "18", "所属変更申請 12 件、フォーム反映確認 6 件。", "amber", "workflow")}
      ${metric("要対応エラー", "17", "CSV取込の識別子不一致が検出されています。", "red", "list")}
    </div>
    <div class="panel" style="margin-top:16px;">
      <div class="panel-head">
        <div><h2>サービスランチャー</h2><p>目的の業務に直接移動します。</p></div>
      </div>
      <div class="panel-body">
        <div class="launcher-grid">
          ${launcher("/roster", "名簿管理", "児童生徒・教職員・関係者の属性、所属、履歴、機微情報を管理します。", "users", "cyan", ["属性タブ", "履歴", "UI編集"])}
          ${launcher("/accounts", "アカウント同期", "このシステムの登録内容をGoogle Workspaceへ一方向同期します。", "mail", "green", ["同期キュー", "メール有無", "差分"])}
          ${launcher("/permissions", "権限ポリシー", "職種、関係、属性値、組織スコープを組み合わせてアクセス制御します。", "shield", "red", ["ABAC", "コード制限", "継承"])}
          ${launcher("/import", "CSVインポート", "識別子照合、項目マッピング、所属変更承認の要否を設定して取り込みます。", "upload", "amber", ["マッピング", "検証", "ログ"])}
          ${launcher("/forms", "フォーム", "対象者条件付きアンケート、回答集計、名簿属性への反映を扱います。", "form", "violet", ["対象条件", "集計", "名簿反映"])}
          ${launcher("/analytics", "データ利活用", "県全体の在籍、異動、回答、同期状況を横断的に可視化します。", "chart", "cyan", ["集計", "監査", "出力"])}
        </div>
      </div>
    </div>
    <div class="grid cols-2" style="margin-top:16px;">
      <div class="panel">
        <div class="panel-head">
          <div><h2>運用アラート</h2><p>ユーザーが次に取るべき行動を表示します。</p></div>
          <a class="btn small" href="#/logs">${icon("arrow")}ログへ</a>
        </div>
        <div class="panel-body notice-list">
          ${notice("bad", "CSV名簿インポートで17件のエラー", "職員番号とメールアドレスの一致確認に失敗しています。", "確認")}
          ${notice("warn", "7月1日実行予定の所属変更が12件", "承認待ちの申請は実行日前日までに処理してください。", "承認")}
          ${notice("info", "フォーム回答の名簿反映が6件確認待ち", "携帯番号の更新値が既存値と大きく異なります。", "確認")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head">
          <div><h2>最近の処理</h2><p>バックグラウンドジョブの状態をすばやく確認します。</p></div>
        </div>
        <div class="table-wrap">
          ${logTable(logs.slice(0, 4))}
        </div>
      </div>
    </div>
  `;
}

function launcher(path, title, desc, iconName, tone, tags) {
  return `
    <a class="launcher ${tone}" href="#${path}">
      <span class="launcher-icon">${icon(iconName)}</span>
      <span>
        <h2>${title}</h2>
        <p>${desc}</p>
      </span>
      ${icon("arrow")}
      <span class="launcher-meta">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</span>
    </a>
  `;
}

function notice(tone, title, desc, action) {
  return `
    <div class="notice ${tone}">
      <span class="notice-icon">${icon(tone === "bad" ? "list" : tone === "warn" ? "clock" : "bell")}</span>
      <span><h3>${title}</h3><p>${desc}</p></span>
      <button class="btn small" data-modal="operation-detail">${action}</button>
    </div>
  `;
}

function rosterPage() {
  return `
    ${pageHead(
      "Roster",
      "名簿エクスプローラー",
      "組織、クラス、属性カテゴリ、Workspace同期状態で絞り込み、人物の詳細・履歴・機微情報へ進みます。",
      `<button class="btn" data-modal="attribute-settings">${icon("settings")}属性項目設定</button><button class="btn" data-modal="person-create">${icon("plus")}人を追加</button><a class="btn primary" href="#/import">${icon("upload")}CSVで更新</a>`
    )}
    <div class="panel">
      <div class="panel-body">
        <div class="filters">
          <div class="field"><label>検索</label><input value="青葉中学校" aria-label="検索" /></div>
          <div class="field"><label>人物区分</label><select><option>すべて</option><option>教員</option><option>生徒</option><option>教育委員会</option></select></div>
          <div class="field"><label>組織</label><select><option>県央市立 青葉中学校</option><option>県全体</option><option>北浜町</option></select></div>
          <div class="field"><label>属性カテゴリ</label><select><option>基本情報</option><option>連絡先情報</option><option>機微情報</option><option>Google同期</option></select></div>
          <button class="btn" style="align-self:end;">${icon("filter")}絞り込み</button>
        </div>
        <div class="chip-list" style="margin-bottom:14px;">
          <span class="chip">グループ: 学校種</span>
          <span class="chip">表示項目: 氏名 / 所属 / クラス / 同期</span>
          <span class="chip">権限ビュー: 県管理者</span>
        </div>
        <div class="table-wrap">${peopleTable()}</div>
      </div>
    </div>
  `;
}

function peopleTable() {
  return `
    <table>
      <thead><tr><th>氏名</th><th>区分</th><th>所属</th><th>クラス・職位</th><th>メール</th><th>Workspace</th><th>状態</th><th></th></tr></thead>
      <tbody>
        ${people.map((p) => `
          <tr>
            <td><button class="table-link" data-person="${p.id}">${p.name}</button><br><span class="muted">${p.kana}</span></td>
            <td>${p.role}</td>
            <td>${p.org}</td>
            <td>${p.className}</td>
            <td>${p.email || '<span class="muted">未登録</span>'}</td>
            <td><span class="status ${statusClass(p.sync)}">${p.sync}</span></td>
            <td><span class="status ${statusClass(p.status)}">${p.status}</span></td>
            <td><button class="btn small" data-person="${p.id}">${icon("arrow")}詳細</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function personDetailPage() {
  const p = people.find((person) => person.id === state.selectedPersonId) || people[0];
  const tab = state.selectedTab;
  return `
    ${pageHead(
      "Roster Detail",
      "人物詳細",
      "属性カテゴリごとの閲覧・編集、値の履歴、コード権限制限、Workspace同期結果を一画面で確認します。",
      `<a class="btn" href="#/roster">${icon("arrow")}一覧へ戻る</a><button class="btn primary" data-modal="edit-person">${icon("edit")}編集</button>`
    )}
    <div class="detail-hero">
      <span class="avatar large">${p.name[0]}</span>
      <span>
        <h1>${p.name}</h1>
        <span class="detail-meta">
          <span class="status ${statusClass(p.status)}">${p.status}</span>
          <span class="tag">${p.role}</span>
          <span class="tag">${p.org}</span>
          <span class="tag">${p.className}</span>
        </span>
      </span>
      <div class="row-actions">
        <button class="btn" data-modal="transfer-request">${icon("workflow")}所属変更申請</button>
        <button class="btn" data-modal="sync-diff">${icon("mail")}同期差分</button>
      </div>
    </div>
    <div class="split" style="margin-top:16px;">
      <div class="panel">
        <div class="tabs">
          ${[
            ["basic", "基本情報"],
            ["contact", "連絡先"],
            ["sensitive", "機微情報"],
            ["google", "Google同期"]
          ].map(([key, label]) => `<button class="tab ${tab === key ? "active" : ""}" data-tab="${key}">${label}</button>`).join("")}
        </div>
        <div class="panel-body">${personTab(p, tab)}</div>
      </div>
      <div class="grid">
        <div class="panel">
          <div class="panel-head"><div><h2>値の履歴</h2><p>属性値の有効期間を保持します。</p></div></div>
          <div class="panel-body">
            <ul class="timeline">
              <li><strong>2026/04/01 - 現在</strong><span>所属: ${p.org} / ${p.className}</span></li>
              <li><strong>2025/04/01 - 2026/03/31</strong><span>所属: 県央市立 緑中学校 / 1年B組</span></li>
              <li><strong>2024/09/01</strong><span>連絡先電話番号をCSVインポートで更新</span></li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><div><h2>権限判定</h2><p>この画面で適用されている条件です。</p></div></div>
          <div class="panel-body chip-list">
            <span class="chip">主体: 県管理者</span>
            <span class="chip">対象: ${p.role}</span>
            <span class="chip">組織: 県全体</span>
            <span class="chip">操作: 閲覧 / 編集</span>
            <span class="chip">機微コード: 一部マスク解除可</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function personTab(p, tab) {
  if (tab === "contact") {
    return definitionGrid([
      ["住所", p.address],
      ["電話番号", p.phone],
      ["保護者連絡先", "佐藤 美咲 / 090-5555-0912"],
      ["緊急連絡メモ", "平日17時以降は保護者携帯へ"]
    ]);
  }
  if (tab === "sensitive") {
    return `
      <div class="notice warn" style="margin-bottom:14px;">
        <span class="notice-icon">${icon("lock")}</span>
        <span><h3>機微情報は属性項目とコード値ごとに表示制御されています</h3><p>「人物の特徴: いじめ加害者」は学年主任以上に限定、現在の権限では監査ログ付きで表示されます。</p></span>
        <button class="btn small" data-modal="audit-reason">閲覧理由</button>
      </div>
      ${definitionGrid([
        ["支援区分", "個別支援計画あり"],
        ["不登校状況", "月3日以上の欠席が継続"],
        ["人物の特徴", "要配慮あり / 優良生徒"],
        ["閲覧可能ロール", "担任、学年主任、校長、県管理者"]
      ])}
    `;
  }
  if (tab === "google") {
    return `
      ${definitionGrid([
        ["メールアカウント", p.email || "未登録"],
        ["同期対象", p.email ? "対象" : "対象外"],
        ["最終反映", p.email ? "2026/06/12 08:00" : "なし"],
        ["Workspace OU", "/Aomine/Kenou/Aoba-Junior/Students"]
      ])}
      <div class="notice info" style="margin-top:14px;">
        <span class="notice-icon">${icon("link")}</span>
        <span><h3>同期方向</h3><p>このシステムで更新された氏名、所属、OU、電話番号がGoogle Workspaceへ一方向に反映されます。</p></span>
        <button class="btn small" data-modal="sync-diff">差分</button>
      </div>
    `;
  }
  return definitionGrid([
    ["氏名", p.name],
    ["ふりがな", p.kana],
    ["人物区分", p.role],
    ["所属組織", p.org],
    ["クラス・職位", p.className],
    ["学年・職種", p.grade],
    ["属性タグ", p.features.join(" / ")],
    ["識別子", p.email || "職員番号: STU-44092"]
  ]);
}

function definitionGrid(items) {
  return `<dl class="definition-grid">${items.map(([dt, dd]) => `<div class="definition"><dt>${dt}</dt><dd>${dd}</dd></div>`).join("")}</dl>`;
}

function orgPage() {
  const selected = orgs.find((org) => org.id === state.selectedOrg) || orgs[2];
  return `
    ${pageHead(
      "Organization",
      "組織・継承設定",
      "テナントをルートに、市町村・学校種・学校・部署の階層を管理します。設定は上位から継承し、下位で上書きできます。",
      `<button class="btn" data-modal="org-create">${icon("plus")}組織を追加</button><button class="btn primary" data-modal="inheritance-preview">${icon("settings")}継承プレビュー</button>`
    )}
    <div class="org-layout">
      <div class="panel">
        <div class="panel-head"><div><h2>組織ツリー</h2><p>青嶺県テナント配下</p></div></div>
        <div class="panel-body">
          <ul class="tree">
            ${orgs.map((org) => `<li class="level-${org.level}"><button class="${selected.id === org.id ? "active" : ""}" data-org="${org.id}"><span>${org.name}</span><span class="muted">${org.type}</span></button></li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="grid">
        <div class="panel">
          <div class="panel-head"><div><h2>${selected.name}</h2><p>${selected.type} / ${selected.members}名</p></div><button class="btn small" data-modal="org-edit">${icon("edit")}編集</button></div>
          <div class="panel-body">
            ${definitionGrid([
              ["親組織", selected.level === 0 ? "なし" : "青嶺県 > 県央市"],
              ["Google Workspace OU", "/Aomine/Kenou/Aoba-Junior"],
              ["属性項目設定", "上位継承 42件 / 独自追加 8件"],
              ["権限ポリシー", "上位継承 18件 / 上書き 3件"]
            ])}
          </div>
        </div>
        <div class="grid cols-3">
          ${metric("継承中の設定", "60", "テナント全体・市町村から適用", "cyan", "settings")}
          ${metric("独自上書き", "11", "学校運用に合わせて追加", "amber", "edit")}
          ${metric("配下への波及", "4", "クラス・部署へ適用", "green", "workflow")}
        </div>
        <div class="panel">
          <div class="panel-head"><div><h2>設定の優先順位</h2><p>下位組織の独自設定が優先されます。</p></div></div>
          <div class="panel-body notice-list">
            ${notice("info", "テナント全体: 基本属性の定義", "氏名、生年月日、性別、所属、メールを全組織で共通化。", "詳細")}
            ${notice("warn", "県央市: 連絡先の閲覧条件を追加", "校長は同一市町村同一学校種の一般教員連絡先を閲覧可能。", "詳細")}
            ${notice("info", "青葉中学校: 部活顧問条件を上書き", "部活顧問属性に応じて生徒の連絡先表示範囲を制御。", "詳細")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function permissionsPage() {
  return `
    ${pageHead(
      "Access Control",
      "権限ポリシービルダー",
      "主体、対象、関係性、属性値、組織スコープ、機能を組み合わせて、名簿・コード値・フォーム結果まで制御します。",
      `<button class="btn" data-modal="policy-test">${icon("check")}判定テスト</button><button class="btn primary" data-modal="policy-create">${icon("plus")}ポリシー作成</button>`
    )}
    <div class="panel">
      <div class="panel-head"><div><h2>条件セット: 一般教員が担任クラスの基本情報を編集</h2><p>青葉中学校で上書きされたポリシー。配下クラスへ波及します。</p></div><span class="status ok">有効</span></div>
      <div class="panel-body">
        <div class="policy-builder">
          ${conditionBox("主体", "users", ["職種 = 一般教員", "所属 = 同一学校", "Googleアカウント有効"])}
          ${conditionBox("対象", "users", ["人物区分 = 生徒", "クラス = 担任クラス", "状態 = 在籍"])}
          ${conditionBox("スコープ", "building", ["県央市立 青葉中学校", "2年A組", "継承元: 県央市"])}
          ${conditionBox("許可機能", "shield", ["基本情報: 閲覧/編集", "連絡先: 閲覧のみ", "機微情報: 不可"])}
        </div>
      </div>
    </div>
    <div class="grid cols-2" style="margin-top:16px;">
      <div class="panel">
        <div class="panel-head"><div><h2>コード値ごとの表示制限</h2><p>属性項目「人物の特徴」の選択肢に設定。</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>コード</th><th>表示名</th><th>閲覧可能</th><th>選択可能</th><th>状態</th></tr></thead>
            <tbody>
              <tr><td>good_student</td><td>優良生徒</td><td>担任以上</td><td>担任以上</td><td><span class="status ok">有効</span></td></tr>
              <tr><td>bullying_actor</td><td>いじめ加害者</td><td>学年主任以上</td><td>学年主任以上</td><td><span class="status warn">監査必須</span></td></tr>
              <tr><td>needs_care</td><td>要配慮あり</td><td>担任・養護教諭</td><td>学年主任以上</td><td><span class="status ok">有効</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>ポリシー一覧</h2><p>継承と上書きの状態を確認します。</p></div></div>
        <div class="panel-body notice-list">
          ${notice("info", "部活顧問は担当部員の連絡先のみ閲覧", "属性値: 部活顧問 = サッカー の場合、同一学校のサッカー部員へ限定。", "編集")}
          ${notice("warn", "校長は同一市町村同一学校種の教員連絡先を閲覧", "県央市から継承。青葉中学校では対象職種に講師を追加。", "編集")}
          ${notice("info", "フォーム集計結果は作成者部署と上位組織が閲覧", "サブジェクト・オブジェクト関係で回答者個票を制限。", "編集")}
        </div>
      </div>
    </div>
  `;
}

function conditionBox(title, iconName, chips) {
  return `<div class="condition-box"><h3>${icon(iconName)}${title}</h3><div class="chip-list">${chips.map((chip) => `<span class="chip">${chip}</span>`).join("")}</div></div>`;
}

function importPage() {
  return `
    ${pageHead(
      "CSV Import",
      "CSVインポート設定",
      "ファイル列と名簿属性を紐づけ、同一人物識別、所属変更の承認要否、バックグラウンド処理の確認までを一連の導線にします。",
      `<button class="btn" data-modal="mapping-template">${icon("file")}テンプレート保存</button><button class="btn primary" data-modal="import-confirm">${icon("upload")}検証して投入</button>`
    )}
    <div class="stepper">
      <div class="step done"><span class="step-index">1</span><strong>CSV選択</strong></div>
      <div class="step active"><span class="step-index">2</span><strong>項目マッピング</strong></div>
      <div class="step"><span class="step-index">3</span><strong>照合・検証</strong></div>
      <div class="step"><span class="step-index">4</span><strong>バックグラウンド処理</strong></div>
    </div>
    <div class="split wide-right">
      <div class="panel">
        <div class="panel-head"><div><h2>取込条件</h2><p>識別子と所属変更の扱いを指定します。</p></div></div>
        <div class="panel-body grid">
          <div class="field"><label>同一人物識別セット</label><select><option>メール + 職員番号 + 生年月日</option><option>職員番号のみ</option><option>生徒番号 + 氏名かな</option></select></div>
          <div class="field"><label>対象組織スコープ</label><select><option>県央市立 青葉中学校</option><option>青嶺県全体</option></select></div>
          <label class="kbd-row"><span><strong>所属変更の承認を不要にする</strong><br><span class="muted">権限があるユーザーのみ直接反映できます。</span></span><input type="checkbox" /></label>
          <label class="kbd-row"><span><strong>Workspace同期を予約</strong><br><span class="muted">取込完了後に差分を同期キューへ積みます。</span></span><input type="checkbox" checked /></label>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>CSV列と名簿属性のマッピング</h2><p>型とバリデーションに合わない列は検証で止まります。</p></div></div>
        <div class="panel-body">
          ${mappingRow("email", "基本情報 > メールアドレス", "文字列 / メール形式")}
          ${mappingRow("staff_no", "基本情報 > 職員番号", "文字列 / 一意")}
          ${mappingRow("birth_date", "基本情報 > 生年月日", "日付")}
          ${mappingRow("club", "属性 > 所属部活", "コードマスター")}
          ${mappingRow("private_mobile", "連絡先 > 私用携帯番号", "文字列 / 電話番号")}
          ${mappingRow("transfer_to", "所属 > 異動先組織", "組織コード")}
        </div>
      </div>
    </div>
  `;
}

function mappingRow(csv, attr, rule) {
  return `
    <div class="mapping-row">
      <div class="field"><label>CSV項目</label><input value="${csv}" /></div>
      <div class="arrow-cell">${icon("arrow")}</div>
      <div class="field"><label>名簿属性</label><select><option>${attr}</option><option>未使用</option></select></div>
      <div class="field"><label>形式</label><input value="${rule}" /></div>
    </div>
  `;
}

function approvalsPage() {
  return `
    ${pageHead(
      "Approvals",
      "所属変更申請",
      "転出元が申請し、転入先が承認すると、指定日にバッチで所属が切り替わります。実行前であれば取り消しできます。",
      `<button class="btn primary" data-modal="transfer-request">${icon("plus")}変更申請</button>`
    )}
    <div class="panel">
      <div class="panel-head"><div><h2>承認キュー</h2><p>7月1日実行予定を中心に表示。</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>対象者</th><th>転出元</th><th>転入先</th><th>実行日</th><th>申請者</th><th>状態</th><th></th></tr></thead>
          <tbody>
            <tr><td>鈴木 花</td><td>北浜町立 さくら小学校</td><td>県央市立 青葉中学校</td><td>2026/07/01</td><td>北浜町 管理者</td><td><span class="status warn">審査中</span></td><td><button class="btn small" data-modal="approval-detail">確認</button></td></tr>
            <tr><td>高橋 蓮</td><td>県央市立 青葉中学校</td><td>県央市立 緑中学校</td><td>2026/07/01</td><td>田中 悠人</td><td><span class="status ok">承認済み</span></td><td><button class="btn small" data-modal="approval-detail">確認</button></td></tr>
            <tr><td>井上 彩</td><td>県立 東高等学校</td><td>県教育委員会 学務課</td><td>2026/08/01</td><td>県立学校管理者</td><td><span class="status bad">差戻し</span></td><td><button class="btn small" data-modal="approval-detail">確認</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function accountsPage() {
  return `
    ${pageHead(
      "Google Workspace",
      "アカウント同期",
      "名簿データをGoogle Workspaceへ一方向に反映します。メール未登録者はログイン不可ですが、名簿管理対象として保持できます。",
      `<button class="btn" data-modal="sync-diff">${icon("list")}差分確認</button><button class="btn primary" data-modal="sync-run">${icon("mail")}同期を予約</button>`
    )}
    <div class="grid cols-4">
      ${metric("Workspace対象", "82,410", "メールを持つ管理対象者", "cyan", "mail")}
      ${metric("同期済み", "80,902", "最新の名簿値が反映済み", "green", "check")}
      ${metric("反映待ち", "86", "OU変更・電話番号更新", "amber", "clock")}
      ${metric("同期エラー", "9", "重複メール・OU不一致", "red", "list")}
    </div>
    <div class="grid cols-2" style="margin-top:16px;">
      <div class="panel">
        <div class="panel-head"><div><h2>同期キュー</h2><p>次回バッチで反映される変更。</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>対象</th><th>変更内容</th><th>反映先</th><th>状態</th></tr></thead>
            <tbody>
              <tr><td>田中 悠人</td><td>職位: 教諭 → 学年主任</td><td>Custom schema</td><td><span class="status warn">待機</span></td></tr>
              <tr><td>佐藤 真央</td><td>OU: 1年B組 → 2年A組</td><td>Org Unit</td><td><span class="status warn">待機</span></td></tr>
              <tr><td>山本 恵子</td><td>電話番号更新</td><td>Profile</td><td><span class="status ok">反映済み</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>メール未登録者</h2><p>ログイン不可だが名簿には保持される対象。</p></div></div>
        <div class="panel-body notice-list">
          ${notice("warn", "鈴木 花", "メール未登録。CSV識別は生徒番号 + 生年月日で実施。", "詳細")}
          ${notice("info", "保護者 佐藤 美咲", "関係者として名簿に保持。ログイン権限なし。", "詳細")}
          ${notice("warn", "講師 中村 翔", "外部メールのためWorkspace同期対象外。", "詳細")}
        </div>
      </div>
    </div>
  `;
}

function formsPage() {
  return `
    ${pageHead(
      "Forms",
      "フォーム管理",
      "対象条件に合う利用者だけが回答でき、回答結果は権限付きで集計・閲覧できます。必要に応じて名簿属性へ反映します。",
      `<button class="btn" data-modal="form-preview">${icon("search")}プレビュー</button><button class="btn primary" data-modal="form-create">${icon("plus")}フォーム作成</button>`
    )}
    <div class="split">
      <div class="panel">
        <div class="panel-head"><div><h2>フォーム一覧</h2><p>公開状態と回答状況。</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>フォーム</th><th>対象条件</th><th>期限</th><th>回答</th><th>状態</th><th></th></tr></thead>
            <tbody>
              ${forms.map((f) => `<tr><td><button class="table-link" data-modal="form-detail">${f.name}</button><br><span class="muted">${f.owner}</span></td><td>${f.target}</td><td>${f.due}</td><td>${f.responses}</td><td><span class="status ${statusClass(f.status)}">${f.status}</span></td><td><button class="btn small" data-modal="form-detail">管理</button></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>選択中フォームの概要</h2><p>教員 私用携帯番号登録</p></div></div>
        <div class="panel-body grid">
          ${definitionGrid([
            ["回答対象", "全市町村 / 小中学校 / 教員"],
            ["回答閲覧権限", "作成部署、上位教育委員会"],
            ["名簿反映先", "連絡先 > 私用携帯番号"],
            ["反映ルール", "メール一致時に更新、既存値との差異が大きい場合は確認待ち"]
          ])}
          <div class="mini-chart" aria-label="回答推移">
            <span class="bar" style="height:36%;"></span>
            <span class="bar green" style="height:48%;"></span>
            <span class="bar" style="height:64%;"></span>
            <span class="bar amber" style="height:78%;"></span>
            <span class="bar green" style="height:88%;"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel" style="margin-top:16px;">
      <div class="panel-head"><div><h2>フォームビルダー</h2><p>モック用の編集キャンバス。</p></div></div>
      <div class="panel-body form-canvas">
        <div class="panel-body" style="padding:0;">
          <div class="field"><label>部品</label><select><option>短文入力</option><option>電話番号</option><option>コード選択</option><option>日付</option></select></div>
          <div class="chip-list" style="margin-top:12px;"><span class="chip">名簿へ反映</span><span class="chip">必須</span><span class="chip">対象条件</span></div>
        </div>
        <div>
          <div class="question-item">
            <div class="question-toolbar"><strong>メールアドレス</strong><span class="status ok">識別子</span></div>
            <input value="回答者のGoogleメールを自動入力" />
          </div>
          <div class="question-item">
            <div class="question-toolbar"><strong>私用携帯番号</strong><span class="status warn">名簿反映</span></div>
            <input value="090-0000-0000" />
          </div>
        </div>
        <div>
          <div class="field"><label>回答対象</label><select><option>小中学校 / 一般教員</option></select></div>
          <div class="field" style="margin-top:12px;"><label>結果閲覧</label><select><option>教育委員会 学務課 + 上位組織</option></select></div>
          <button class="btn primary" style="width:100%;margin-top:14px;" data-modal="form-create">${icon("check")}公開設定へ</button>
        </div>
      </div>
    </div>
  `;
}

function analyticsPage() {
  return `
    ${pageHead(
      "Analytics",
      "データ利活用",
      "県全体の名簿、同期、フォーム、所属変更を横断して、教育委員会の運用判断に使う集計を表示します。",
      `<button class="btn" data-modal="export-report">${icon("file")}レポート出力</button>`
    )}
    <div class="grid cols-3">
      ${metric("在籍者増減", "+318", "前月比。転入 602 / 転出 284", "green", "chart")}
      ${metric("属性未入力率", "4.8%", "連絡先・生年月日の不足が中心", "amber", "filter")}
      ${metric("権限監査イベント", "1,204", "機微情報閲覧 86 件を含む", "cyan", "shield")}
    </div>
    <div class="grid cols-2" style="margin-top:16px;">
      <div class="panel">
        <div class="panel-head"><div><h2>学校種別 管理対象者</h2><p>ダミーデータの棒グラフ。</p></div></div>
        <div class="panel-body"><div class="mini-chart"><span class="bar" style="height:82%;"></span><span class="bar green" style="height:68%;"></span><span class="bar amber" style="height:42%;"></span><span class="bar red" style="height:24%;"></span><span class="bar" style="height:51%;"></span></div></div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>利用状況</h2><p>フォーム・CSV・同期の月次サマリー。</p></div></div>
        <div class="panel-body notice-list">
          ${notice("info", "フォーム回答率 71.4%", "教員 私用携帯番号登録は期限まで残り33日。", "詳細")}
          ${notice("warn", "CSV取込エラー率 1.3%", "同一人物識別セットの見直し候補が3件あります。", "詳細")}
          ${notice("info", "Workspace同期成功率 99.7%", "OU不一致は手動確認に送られています。", "詳細")}
        </div>
      </div>
    </div>
  `;
}

function logsPage() {
  return `
    ${pageHead(
      "Job Logs",
      "処理ログ",
      "CSVインポート、所属変更バッチ、Workspace同期、フォーム反映の進行状況とエラーを確認し、必要に応じて問い合わせできます。",
      `<button class="btn" data-modal="support">${icon("help")}管理者へ問い合わせ</button><button class="btn primary" data-modal="retry-job">${icon("workflow")}再実行依頼</button>`
    )}
    <div class="panel">
      <div class="panel-head"><div><h2>バックグラウンド処理</h2><p>ユーザーが申請した内容の反映状況。</p></div></div>
      <div class="table-wrap">${logTable(logs)}</div>
    </div>
    <div class="grid cols-2" style="margin-top:16px;">
      <div class="panel">
        <div class="panel-head"><div><h2>エラー詳細</h2><p>CSV名簿インポート / JOB-20260612-0918</p></div></div>
        <div class="panel-body notice-list">
          ${notice("bad", "識別子不一致: 12件", "メールは一致したが職員番号または生年月日が一致しません。", "確認")}
          ${notice("warn", "コード未定義: 5件", "部活コード「FUTSAL」がコードマスターに存在しません。", "確認")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>問い合わせテンプレート</h2><p>ログからシステム管理者へ連絡。</p></div></div>
        <div class="panel-body">
          <div class="field"><label>件名</label><input value="CSV名簿インポートの識別子不一致について" /></div>
          <div class="field" style="margin-top:12px;"><label>本文</label><textarea>JOB-20260612-0918 で17件のエラーが発生しています。対象CSVとマッピング設定の確認をお願いします。</textarea></div>
          <button class="btn primary" style="margin-top:12px;" data-modal="support">${icon("mail")}問い合わせを作成</button>
        </div>
      </div>
    </div>
  `;
}

function logTable(rows) {
  return `
    <table>
      <thead><tr><th>処理</th><th>実行者</th><th>開始日時</th><th>件数</th><th>状態</th><th></th></tr></thead>
      <tbody>
        ${rows.map((row) => `<tr><td>${row.job}</td><td>${row.user}</td><td>${row.started}</td><td>${row.count}</td><td><span class="status ${statusClass(row.status)}">${row.status}</span></td><td><button class="btn small" data-modal="job-detail">詳細</button></td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function render() {
  state.route = location.hash.replace("#", "") || "/";
  let content;
  if (state.route === "/roster") content = rosterPage();
  else if (state.route === "/person") content = personDetailPage();
  else if (state.route === "/accounts") content = accountsPage();
  else if (state.route === "/org") content = orgPage();
  else if (state.route === "/permissions") content = permissionsPage();
  else if (state.route === "/import") content = importPage();
  else if (state.route === "/approvals") content = approvalsPage();
  else if (state.route === "/forms") content = formsPage();
  else if (state.route === "/analytics") content = analyticsPage();
  else if (state.route === "/logs") content = logsPage();
  else content = dashboardPage();
  document.querySelector("#app").innerHTML = appShell(content);
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modal));
  });
  document.querySelectorAll("[data-person]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPersonId = button.dataset.person;
      location.hash = "/person";
    });
  });
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTab = button.dataset.tab;
      render();
    });
  });
  document.querySelectorAll("[data-org]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedOrg = button.dataset.org;
      render();
    });
  });
}

function modalContent(type) {
  const commonActions = `<button class="btn" data-close>キャンセル</button><button class="btn primary" data-submit>${icon("check")}保存</button>`;
  const content = {
    notifications: ["通知", "承認待ち、同期エラー、フォーム反映確認をまとめて確認します。", `
      <div class="notice-list">
        ${notice("bad", "CSV取込エラー 17件", "識別子不一致とコード未定義があります。", "確認")}
        ${notice("warn", "所属変更承認 12件", "2026/07/01 実行予定です。", "承認")}
      </div>`, `<button class="btn primary" data-close>閉じる</button>`],
    help: ["ヘルプ", "このモックでは導線確認のため、ページ遷移とモーダル表示のみ実装しています。", `<div class="empty-state">操作対象のボタン、一覧の詳細、タブ、組織ツリーをクリックできます。</div>`, `<button class="btn primary" data-close>閉じる</button>`],
    support: ["問い合わせ作成", "ログや画面状態を添付してシステム管理者へ問い合わせる想定です。", formFields([["分類", "CSV/同期/権限/フォーム"], ["対象ID", "JOB-20260612-0918"], ["内容", "エラー内容の確認をお願いします。"]]), commonActions],
    "person-create": ["人を追加", "UI上での個別登録。大量登録はCSVインポートを使います。", formFields([["氏名", ""], ["人物区分", "生徒"], ["所属", "県央市立 青葉中学校"], ["メール", ""]]), commonActions],
    "attribute-settings": ["属性項目設定", "テナントまたは組織ごとに、保持する項目・データ形式・バリデーションを定義します。", formFields([["項目名", "教員免許番号"], ["カテゴリ", "基本情報"], ["データ形式", "単一の文字列"], ["バリデーション", "英数字12桁"]]), commonActions],
    "edit-person": ["人物情報を編集", "属性値は保存時に履歴として有効開始日を保持します。", formFields([["氏名", "佐藤 真央"], ["有効開始日", "2026/06/12"], ["所属部活", "サッカー部"], ["電話番号", "090-2345-6789"]]), commonActions],
    "transfer-request": ["所属変更申請", "転入先が承認すると、指定日にバッチで所属が変更されます。", formFields([["対象者", "佐藤 真央"], ["転出元", "県央市立 青葉中学校"], ["転入先", "県央市立 緑中学校"], ["実行日", "2026/07/01"]]), `<button class="btn" data-close>閉じる</button><button class="btn primary" data-submit>${icon("workflow")}申請する</button>`],
    "sync-diff": ["Workspace同期差分", "このシステムからGoogle Workspaceへ反映される変更です。", `<div class="table-wrap"><table><thead><tr><th>項目</th><th>現在</th><th>反映値</th></tr></thead><tbody><tr><td>OU</td><td>/Old/1B</td><td>/Aoba/2A</td></tr><tr><td>電話番号</td><td>未設定</td><td>090-2345-6789</td></tr></tbody></table></div>`, `<button class="btn" data-close>閉じる</button><button class="btn primary" data-submit>同期を予約</button>`],
    "audit-reason": ["機微情報の閲覧理由", "監査ログへ残すため、閲覧理由を記録します。", formFields([["理由", "担任会議での支援方針確認"], ["関連ケースID", "CASE-2026-044"]]), commonActions],
    "org-create": ["組織を追加", "上位組織を選ぶと継承設定が自動で適用されます。", formFields([["組織名", ""], ["種別", "学校"], ["親組織", "県央市"], ["Workspace OU", "/Aomine/Kenou/"]]), commonActions],
    "org-edit": ["組織を編集", "組織コードやOUの変更は同期差分として扱われます。", formFields([["組織名", "県央市立 青葉中学校"], ["種別", "学校"], ["所属人数", "812"]]), commonActions],
    "inheritance-preview": ["継承プレビュー", "上位設定と独自上書きの最終適用結果です。", `<div class="notice-list">${notice("info", "テナント全体から継承", "基本属性 42件、標準ロール 8件", "詳細")}${notice("warn", "青葉中学校で上書き", "部活顧問の連絡先閲覧範囲を学校内に限定", "詳細")}</div>`, `<button class="btn primary" data-close>閉じる</button>`],
    "policy-create": ["ポリシー作成", "条件を組み合わせて、機能や属性項目への操作を許可します。", formFields([["主体条件", "職種 = 一般教員"], ["対象条件", "クラス = 担任クラス"], ["許可操作", "基本情報: 閲覧/編集"], ["適用組織", "県央市立 青葉中学校"]]), commonActions],
    "policy-test": ["権限判定テスト", "指定したユーザーと対象者で、最終的な許可結果を確認します。", formFields([["主体", "田中 悠人"], ["対象", "佐藤 真央"], ["操作", "連絡先情報の閲覧"]]) + `<div class="notice info" style="margin-top:12px;"><span class="notice-icon">${icon("check")}</span><span><h3>判定結果: 許可</h3><p>部活顧問 = サッカー、対象者の所属部活 = サッカーのため閲覧可能。</p></span><button class="btn small">詳細</button></div>`, `<button class="btn primary" data-close>閉じる</button>`],
    "mapping-template": ["マッピングテンプレート保存", "同じCSV形式を次回以降すぐ利用できるように保存します。", formFields([["テンプレート名", "青葉中学校 教職員更新"], ["共有範囲", "県央市"]]), commonActions],
    "import-confirm": ["インポート検証結果", "投入前の検証サマリーです。エラーがある場合はバックグラウンド処理へ進めません。", `<div class="grid cols-3">${metric("読込件数", "1,248", "CSV行数", "cyan", "file")}${metric("更新予定", "1,231", "履歴付きで反映", "green", "check")}${metric("エラー", "17", "修正が必要", "red", "list")}</div>`, `<button class="btn" data-close>戻る</button><button class="btn primary" data-submit>エラー以外を投入</button>`],
    "approval-detail": ["申請詳細", "転入先の承認、差戻し、実行前取消を行います。", formFields([["対象者", "鈴木 花"], ["実行日", "2026/07/01"], ["申請理由", "保護者転居に伴う転校"]]), `<button class="btn danger" data-submit>差戻し</button><button class="btn" data-close>閉じる</button><button class="btn primary" data-submit>承認</button>`],
    "sync-run": ["同期を予約", "次回バッチでWorkspaceへ反映します。", formFields([["対象", "反映待ち 86件"], ["実行タイミング", "次回バッチ"], ["通知先", "県管理者"]]), commonActions],
    "form-create": ["フォーム作成", "回答対象と名簿反映先を設定します。", formFields([["フォーム名", "教員 私用携帯番号登録"], ["対象条件", "小中学校 / 一般教員"], ["名簿反映先", "連絡先 > 私用携帯番号"], ["回答期限", "2026/07/15"]]), commonActions],
    "form-preview": ["フォームプレビュー", "対象者に見える回答画面のイメージです。", `<div class="question-item"><strong>メールアドレス</strong><input value="tanaka@pref-edu.example.jp" /></div><div class="question-item"><strong>私用携帯番号</strong><input value="090-0000-0000" /></div>`, `<button class="btn primary" data-close>閉じる</button>`],
    "form-detail": ["フォーム詳細", "回答集計、権限、名簿反映の状態を管理します。", `<div class="grid cols-3">${metric("回答", "683", "対象 956名", "green", "form")}${metric("反映済み", "621", "名簿更新済み", "cyan", "link")}${metric("確認待ち", "6", "差異が大きい回答", "amber", "clock")}</div>`, `<button class="btn" data-close>閉じる</button><button class="btn primary" data-submit>集計を見る</button>`],
    "export-report": ["レポート出力", "閲覧権限のある集計のみ出力します。", formFields([["形式", "CSV"], ["範囲", "県全体"], ["含める項目", "在籍者数 / 同期状況 / フォーム回答"]]), commonActions],
    "retry-job": ["再実行依頼", "失敗したジョブを修正後に再投入します。", formFields([["対象ジョブ", "JOB-20260612-0918"], ["再実行範囲", "エラー行のみ"]]), commonActions],
    "job-detail": ["ジョブ詳細", "バックグラウンド処理の実行ログです。", `<div class="table-wrap"><table><thead><tr><th>時刻</th><th>イベント</th></tr></thead><tbody><tr><td>09:18</td><td>CSV読込開始</td></tr><tr><td>09:21</td><td>識別子検証で17件エラー</td></tr><tr><td>09:22</td><td>処理を一時停止</td></tr></tbody></table></div>`, `<button class="btn primary" data-close>閉じる</button>`],
    "operation-detail": ["対応詳細", "選択したアラートの処理画面へ進む想定です。", `<div class="empty-state">本番では対象レコード、影響範囲、推奨アクションをここに表示します。</div>`, `<button class="btn primary" data-close>閉じる</button>`]
  }[type] || ["詳細", "モック用のダイアログです。", `<div class="empty-state">この操作は画面導線の確認用です。</div>`, `<button class="btn primary" data-close>閉じる</button>`];

  return { title: content[0], desc: content[1], body: content[2], actions: content[3] };
}

function formFields(fields) {
  return `<div class="grid cols-2">${fields.map(([label, value]) => `<div class="field"><label>${label}</label><input value="${value}" /></div>`).join("")}</div>`;
}

function openModal(type) {
  const data = modalContent(type);
  document.querySelector("#modal-root").innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <div class="modal ${type === "import-confirm" || type === "form-detail" ? "large" : ""}">
        <div class="modal-head">
          <div><h2>${data.title}</h2><p>${data.desc}</p></div>
          <button class="icon-button" data-close title="閉じる">${icon("x")}</button>
        </div>
        <div class="modal-body">${data.body}</div>
        <div class="modal-actions">${data.actions}</div>
      </div>
    </div>
  `;
  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
  document.querySelectorAll("#modal-root [data-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modal));
  });
  document.querySelectorAll("[data-submit]").forEach((button) => button.addEventListener("click", () => {
    closeModal();
    showToast("モック操作を受け付けました。実データは更新していません。");
  }));
}

function closeModal() {
  document.querySelector("#modal-root").innerHTML = "";
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `${icon("check")}<strong>${message}</strong>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

window.addEventListener("hashchange", render);
render();
