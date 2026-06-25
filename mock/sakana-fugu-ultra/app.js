const navGroups = [
  {
    title: 'トップ',
    items: [
      { id: 'dashboard', label: 'ダッシュボード', icon: '⌂' }
    ]
  },
  {
    title: '名簿・組織',
    items: [
      { id: 'roster', label: 'スマート名簿', icon: '名' },
      { id: 'organizations', label: '組織ツリー', icon: '組' },
      { id: 'attributes', label: '属性項目設計', icon: '属' },
      { id: 'accounts', label: 'アカウント同期', icon: '同' }
    ]
  },
  {
    title: '統制・運用',
    items: [
      { id: 'permissions', label: '権限ポリシー', icon: '権' },
      { id: 'csv', label: 'CSV取込', icon: '取' },
      { id: 'approvals', label: '所属変更承認', icon: '承' },
      { id: 'logs', label: '処理ログ・問い合わせ', icon: '録' }
    ]
  },
  {
    title: 'サービス',
    items: [
      { id: 'forms', label: 'フォームサービス', icon: '問' },
      { id: 'analytics', label: 'データ利活用', icon: '分' },
      { id: 'settings', label: 'テナント設定', icon: '設' }
    ]
  }
];

const people = [
  { name: '青山 美咲', type: '生徒', org: '青海市立第一中学校', className: '2年A組', email: 'misaki.aoyama@stu.aomi.ed.jp', sync: '同期対象', risk: '要配慮', club: 'サッカー部', updated: '2026/06/24' },
  { name: '佐伯 直人', type: '教員', org: '青海市立第一中学校', className: '2年A組 担任', email: 'n.saeki@aomi.ed.jp', sync: '同期済み', risk: '通常', club: 'サッカー部顧問', updated: '2026/06/23' },
  { name: '水野 遥', type: '生徒', org: '青海市立第一中学校', className: '1年B組', email: '未発行', sync: '対象外', risk: '通常', club: '吹奏楽部', updated: '2026/06/21' },
  { name: '北村 玲子', type: '教育委員会', org: '青海市教育委員会 学務課', className: '-', email: 'r.kitamura@city-aomi.jp', sync: '外部メール', risk: '通常', club: '-', updated: '2026/06/20' },
  { name: '藤井 蓮', type: '生徒関係者', org: '青海市立第一中学校', className: '2年A組 保護者', email: 'ren.family@example.com', sync: '外部メール', risk: '閲覧制限', club: '-', updated: '2026/06/19' }
];

const importJobs = [
  { id: 'IMP-20260625-014', name: '教職員_年度途中異動.csv', status: '検証エラー', rows: 1284, owner: '県教育DX管理者', time: '02:04', detail: '識別子の一致確認で12件が保留' },
  { id: 'IMP-20260624-031', name: '生徒基本情報_青海市.csv', status: '処理中', rows: 8421, owner: '青海市 学務課', time: '23:41', detail: 'バックグラウンド処理 68%' },
  { id: 'IMP-20260624-018', name: '保護者連絡先_第一中.csv', status: '完了', rows: 965, owner: '第一中 事務', time: '18:12', detail: '名簿属性 3項目を更新' }
];

const approvals = [
  { id: 'REQ-8012', person: '佐伯 直人', from: '青海市立第一中学校', to: '青海市立第二中学校', effective: '2026/07/01', status: 'B学校承認待ち', requester: '第一中 校長' },
  { id: 'REQ-8008', person: '青山 美咲', from: '2年A組', to: '2年C組', effective: '2026/07/01', status: '実行予約済み', requester: '学年主任' },
  { id: 'REQ-7999', person: '藤井 蓮', from: '保護者連絡先', to: '代表保護者変更', effective: '2026/06/30', status: '差戻し', requester: '担任' }
];

const forms = [
  { title: '教員 私用携帯番号 登録依頼', status: '回答受付中', target: '青海市 / 小学校 / 一般教員', answers: 346, map: '名簿: 連絡先 > 私用携帯番号' },
  { title: 'ICT活用状況アンケート', status: '集計公開中', target: '県内全教職員', answers: 4820, map: '集計のみ' },
  { title: '部活動所属確認', status: '下書き', target: '第一中 生徒・保護者', answers: 0, map: '名簿: 所属部活' }
];

const routes = {
  dashboard: renderDashboard,
  roster: renderRoster,
  organizations: renderOrganizations,
  attributes: renderAttributes,
  accounts: renderAccounts,
  permissions: renderPermissions,
  csv: renderCsv,
  approvals: renderApprovals,
  logs: renderLogs,
  forms: renderForms,
  analytics: renderAnalytics,
  settings: renderSettings
};

function statusPill(status) {
  const map = {
    '同期対象': 'blue', '同期済み': 'green', '対象外': 'gray', '外部メール': 'amber',
    '要配慮': 'red', '通常': 'green', '閲覧制限': 'violet',
    '検証エラー': 'red', '処理中': 'amber', '完了': 'green',
    'B学校承認待ち': 'amber', '実行予約済み': 'blue', '差戻し': 'red',
    '回答受付中': 'green', '集計公開中': 'blue', '下書き': 'gray',
    '継承': 'blue', '上書き': 'violet', '有効': 'green', '停止': 'gray'
  };
  return `<span class="pill ${map[status] || 'gray'}">${status}</span>`;
}

function renderNav() {
  const nav = document.getElementById('sideNav');
  nav.innerHTML = navGroups.map(group => `
    <div class="nav-section-title">${group.title}</div>
    ${group.items.map(item => `<a class="nav-link" href="#/${item.id}" data-route="${item.id}"><span class="nav-icon">${item.icon}</span><span>${item.label}</span></a>`).join('')}
  `).join('');
}

function setActive(route) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.route === route);
  });
}

function render() {
  const route = (location.hash.replace('#/', '') || 'dashboard').split('?')[0];
  const page = routes[route] ? route : 'dashboard';
  setActive(page);
  document.getElementById('main').innerHTML = routes[page]();
  document.getElementById('main').focus({ preventScroll: true });
  wirePageInteractions();
}

function hero(title, text, actions = '') {
  return `
    <section class="page-hero">
      <div>
        <span class="eyebrow">Education Board SaaS</span>
        <h1>${title}</h1>
        <p>${text}</p>
      </div>
      <div class="hero-actions">${actions}</div>
    </section>
  `;
}

function renderDashboard() {
  return `
    <div class="page">
      ${hero('教育データ運用の入口を、ひとつに。', '県域テナントの名簿、アカウント、CSV取込、承認、フォーム、集計を統合したダッシュボード兼ランチャーです。異常検知から問い合わせまで、運用者の次の一手がすぐ分かる構成にしています。', '<button class="primary-button" data-modal="quickImport">CSV取込を開始</button><button class="secondary-button" data-modal="support">管理者へ問い合わせ</button>')}
      <section class="grid cols-4">
        <div class="kpi-card" data-icon="名"><span class="eyebrow">People</span><span class="value">184,230</span><span class="trend">+1,204 今月追加</span><p>教委職員・教員・生徒・関係者を含む管理対象者。</p></div>
        <div class="kpi-card" data-icon="同"><span class="eyebrow">Workspace Sync</span><span class="value">98.7%</span><span class="trend">1,982件 同期待ち</span><p>Google Workspace への一方向同期状態。</p></div>
        <div class="kpi-card warning" data-icon="承"><span class="eyebrow">Approvals</span><span class="value">36</span><span class="trend">12件が48時間超過</span><p>所属変更・上書き設定の承認待ち。</p></div>
        <div class="kpi-card danger" data-icon="! "><span class="eyebrow">Errors</span><span class="value">14</span><span class="trend">CSV検証エラーあり</span><p>修正または管理者問い合わせが必要な処理。</p></div>
      </section>

      <section class="grid cols-3 mt-22">
        ${launcher('スマート名簿', '人物を組織・クラス・属性項目で横断検索。基本情報、連絡先、機微情報を権限に応じてタブ表示します。', '名', 'roster')}
        ${launcher('フォームサービス', '対象者条件を指定してアンケートを作成。回答を集計し、必要に応じて名簿属性へ反映します。', '問', 'forms')}
        ${launcher('CSV取込センター', '項目マッピング、識別子一致確認、承認不要オプション、バックグラウンド処理ログを扱います。', '取', 'csv')}
        ${launcher('権限ポリシー', 'サブジェクト・オブジェクト関係、属性値、組織スコープ、コード単位制限を組み合わせて設定します。', '権', 'permissions')}
        ${launcher('所属変更承認', '移動元・移動先の承認、実行予定日、取消、差戻しを一画面で管理します。', '承', 'approvals')}
        ${launcher('データ利活用', '名簿・フォーム・同期ログをもとに、自治体や学校種別の傾向をダッシュボード化します。', '分', 'analytics')}
      </section>

      <section class="grid main-layout mt-22">
        <div class="card">
          <div class="card-header"><div><h2>対応が必要な運用イベント</h2><p>トップページから問題を確認し、ログ確認または問い合わせに進めます。</p></div><a class="secondary-button" href="#/logs">すべて見る</a></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>種別</th><th>内容</th><th>影響範囲</th><th>状態</th><th>操作</th></tr></thead>
              <tbody>
                <tr><td>CSV</td><td>教職員_年度途中異動.csv の識別子不一致</td><td>12人</td><td>${statusPill('検証エラー')}</td><td><button class="secondary-button" data-modal="jobError">詳細</button></td></tr>
                <tr><td>同期</td><td>Workspace OU 反映待ちがしきい値超過</td><td>青海市</td><td>${statusPill('処理中')}</td><td><a class="secondary-button" href="#/accounts">確認</a></td></tr>
                <tr><td>承認</td><td>第二中への所属変更承認待ち</td><td>1人</td><td>${statusPill('B学校承認待ち')}</td><td><a class="secondary-button" href="#/approvals">開く</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card pad">
          <span class="eyebrow">Recommended flow</span>
          <h2>年度途中異動を安全に反映する導線</h2>
          <div class="timeline mt-16">
            <div class="timeline-item"><strong>CSVをアップロード</strong><p>識別子設定に基づいて本人一致を確認します。</p></div>
            <div class="timeline-item"><strong>承認要否を判定</strong><p>権限が強いユーザーのみ承認不要チェックを選択できます。</p></div>
            <div class="timeline-item"><strong>移動先が承認</strong><p>承認済みの変更は実行予定日にバッチで反映されます。</p></div>
            <div class="timeline-item"><strong>ログと通知</strong><p>失敗時はダッシュボードから問い合わせへ誘導します。</p></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function launcher(title, text, icon, route) {
  return `<a class="launcher-card" href="#/${route}"><span class="launcher-icon">${icon}</span><span><h3>${title}</h3><p>${text}</p></span><span class="arrow">開く →</span></a>`;
}

function renderRoster() {
  return `
    <div class="page">
      ${hero('スマート名簿', '「名簿一覧」ではなく、組織・クラス・属性・履歴・権限制御を一体で扱うスマート名簿として設計しました。閲覧できない機微項目やコード選択肢は、権限に応じて表示が制御される前提のモックです。', '<button class="primary-button" data-modal="personEdit">人物を追加</button><button class="secondary-button" data-modal="quickImport">CSVで更新</button>')}
      <div class="split-pane">
        <aside class="card pad filter-panel">
          <span class="eyebrow">Search condition</span>
          <h2>絞り込み</h2>
          <div class="field"><label>対象区分</label><select><option>すべて</option><option>教員</option><option>生徒</option><option>教育委員会</option><option>生徒関係者</option></select></div>
          <div class="field"><label>組織スコープ</label><select><option>青海県全体</option><option>青海市</option><option>青海市立第一中学校</option></select></div>
          <div class="field"><label>属性グループ</label><select><option>基本情報</option><option>連絡先情報</option><option>機微情報</option><option>Google Workspace</option></select></div>
          <div class="field"><label>グルーピング</label><select><option>学校種 > 学校 > クラス</option><option>市町村 > 学校</option><option>部活動</option><option>同期状態</option></select></div>
          <button class="primary-button" style="width:100%">条件を適用</button>
          <div class="notice mt-16">現在の権限: 同一学校の担任クラスは基本情報を編集可能。機微情報は学年主任以上のみ閲覧。</div>
        </aside>
        <section class="grid">
          <div class="card">
            <div class="card-header"><div><h2>人物一覧</h2><p>ダミーデータ。行の「詳細」で属性タブと履歴を確認できます。</p></div><div class="toolbar"><button class="secondary-button" data-modal="grouping">表示項目</button><button class="secondary-button">CSV出力</button></div></div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>氏名</th><th>区分</th><th>所属</th><th>クラス/役割</th><th>メール</th><th>同期</th><th>配慮</th><th>操作</th></tr></thead>
                <tbody>${people.map((p, i) => `<tr><td><strong>${p.name}</strong><br><span class="muted">更新 ${p.updated}</span></td><td>${p.type}</td><td>${p.org}</td><td>${p.className}</td><td>${p.email}</td><td>${statusPill(p.sync)}</td><td>${statusPill(p.risk)}</td><td><button class="secondary-button" data-modal="personDetail" data-person="${i}">詳細</button></td></tr>`).join('')}</tbody>
              </table>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div><h2>選択中人物の詳細</h2><p>タブで基本情報・連絡先・機微情報・属性履歴を切り替えます。</p></div>${statusPill('閲覧制限')}</div>
            <div class="tabs" data-tabs="rosterDetail">
              <button class="tab active" data-tab="basic">基本情報</button>
              <button class="tab" data-tab="contact">連絡先情報</button>
              <button class="tab" data-tab="sensitive">機微情報</button>
              <button class="tab" data-tab="history">属性履歴</button>
            </div>
            <div class="tab-content active" data-tab-panel="basic">${personBasic()}</div>
            <div class="tab-content" data-tab-panel="contact">${personContact()}</div>
            <div class="tab-content" data-tab-panel="sensitive">${personSensitive()}</div>
            <div class="tab-content" data-tab-panel="history">${personHistory()}</div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function personBasic() {
  return `<div class="profile-panel"><div class="profile-photo">青</div><div class="definition-grid"><div class="definition-item"><small>氏名</small><strong>青山 美咲</strong></div><div class="definition-item"><small>生年月日</small><strong>2012/08/19</strong></div><div class="definition-item"><small>所属組織</small><strong>青海市立第一中学校</strong></div><div class="definition-item"><small>所属クラス</small><strong>2年A組</strong></div><div class="definition-item"><small>部活動</small><strong>サッカー部</strong></div><div class="definition-item"><small>Googleアカウント</small><strong>misaki.aoyama@stu.aomi.ed.jp</strong></div></div></div>`;
}

function personContact() {
  return `<div class="definition-grid"><div class="definition-item"><small>住所</small><strong>青海県青海市港町 2-14-6</strong></div><div class="definition-item"><small>本人携帯</small><strong>未登録</strong></div><div class="definition-item"><small>保護者1</small><strong>青山 一郎 / 090-0000-1234</strong></div><div class="definition-item"><small>保護者2</small><strong>青山 由香 / 080-0000-5678</strong></div></div><div class="notice mt-16">部活顧問ロールでは、担当学校かつ担当部活の生徒の連絡先のみ閲覧可能という想定です。</div>`;
}

function personSensitive() {
  return `<div class="warning-box">機微情報は学校の担任・学年主任・管理職など、許可された関係者のみに表示されます。コード選択肢ごとの権限により「いじめ加害者」など一部タグは非表示になります。</div><div class="definition-grid mt-16"><div class="definition-item"><small>登校支援</small><strong>月1回面談</strong></div><div class="definition-item"><small>人物の特徴</small><strong>${statusPill('要配慮')} <span class="tag">学年主任のみ編集</span></strong></div><div class="definition-item"><small>閲覧監査</small><strong>閲覧理由の入力が必要</strong></div><div class="definition-item"><small>最終確認</small><strong>2026/06/10</strong></div></div>`;
}

function personHistory() {
  return `<div class="timeline"><div class="timeline-item"><strong>2026/04/01〜現在: 所属クラス = 2年A組</strong><p>年度更新CSVで反映。識別子: 生徒番号 + 生年月日。</p></div><div class="timeline-item"><strong>2025/04/01〜2026/03/31: 所属クラス = 1年B組</strong><p>担任変更に伴い連絡先閲覧権限も履歴化。</p></div><div class="timeline-item"><strong>2026/06/12: 部活動 = サッカー部</strong><p>フォーム回答から名簿属性へ反映。</p></div></div>`;
}

function renderOrganizations() {
  return `
    <div class="page">
      ${hero('組織ツリー', '県テナントをルートとして、市町村・学校種・学校・教育委員会部署など複数パターンの階層を表現します。下位組織は上位設定を継承し、必要に応じて上書きできます。', '<button class="primary-button" data-modal="orgEdit">組織を追加</button><button class="secondary-button" data-modal="inheritance">継承差分を見る</button>')}
      <div class="grid main-layout">
        <section class="card pad">
          <span class="eyebrow">Tenant hierarchy</span>
          <h2>青海県テナント</h2>
          <div class="org-tree mt-16">
            ${orgNode('青海県全体', 'ルート / GCP: aomi-edu-prod', '有効', 0)}
            ${orgNode('青海市', '市町村 / 配下 42組織', '継承', 1)}
            ${orgNode('中学校', '学校種 / 市町村配下', '継承', 2)}
            ${orgNode('青海市立第一中学校', '学校 / 829人', '上書き', 3)}
            ${orgNode('青海市教育委員会', '教育委員会 / 8部署', '継承', 2)}
            ${orgNode('学務課', '部署 / 24人', '上書き', 3)}
            ${orgNode('緑浜町', '市町村 / 配下 25組織', '継承', 1)}
            ${orgNode('県立青海高等学校', '学校 / 1,240人', '上書き', 1)}
            ${orgNode('県教育庁 DX推進室', '教育委員会部署 / 18人', '有効', 1)}
          </div>
        </section>
        <aside class="card">
          <div class="card-header"><div><h2>組織設定の継承</h2><p>下位組織の設定が優先されます。</p></div></div>
          <div class="card-body">
            <div class="timeline">
              <div class="timeline-item"><strong>テナント全体</strong><p>標準属性項目、全体権限、Google同期ポリシーを設定。</p></div>
              <div class="timeline-item"><strong>市町村</strong><p>独自の学校種分類、教育委員会部署、CSVテンプレートを追加。</p></div>
              <div class="timeline-item"><strong>学校</strong><p>部活動、担任・学年主任、機微情報の閲覧条件を上書き。</p></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function orgNode(name, meta, status, level) {
  return `<div class="org-node level-${level}"><span><strong>${name}</strong><small>${meta}</small></span>${statusPill(status)}</div>`;
}

function renderAttributes() {
  return `
    <div class="page">
      ${hero('属性項目設計', 'テナントごとに自由な名簿属性を定義し、型、バリデーション、表示カテゴリ、履歴保持、権限制限を設計します。コードマスターの選択肢にも個別の閲覧・選択制限を付けられます。', '<button class="primary-button" data-modal="attributeEdit">属性項目を作成</button><button class="secondary-button" data-modal="codeMaster">コードマスター管理</button>')}
      <section class="grid cols-3">
        <div class="kpi-card" data-icon="基"><span class="eyebrow">Basic</span><span class="value">18</span><span class="trend">基本情報カテゴリ</span><p>氏名、生年月日、性別、所属組織、クラスなど。</p></div>
        <div class="kpi-card" data-icon="連"><span class="eyebrow">Contact</span><span class="value">12</span><span class="trend">連絡先情報カテゴリ</span><p>住所、電話番号、保護者連絡先など。</p></div>
        <div class="kpi-card warning" data-icon="機"><span class="eyebrow">Sensitive</span><span class="value">9</span><span class="trend">権限制御あり</span><p>いじめ歴、不登校、支援情報など。</p></div>
      </section>
      <section class="card mt-22">
        <div class="card-header"><div><h2>属性項目一覧</h2><p>データ形式とバリデーション、履歴保持、権限状態を確認します。</p></div><button class="secondary-button" data-modal="attributeEdit">編集</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目名</th><th>カテゴリ</th><th>データ形式</th><th>バリデーション</th><th>履歴</th><th>権限</th></tr></thead>
            <tbody>
              <tr><td><strong>教員免許番号</strong></td><td>基本情報</td><td>単一文字列</td><td>英数字12桁</td><td>${statusPill('有効')}</td><td>校長・教委のみ編集</td></tr>
              <tr><td><strong>所属部活</strong></td><td>基本情報</td><td>コード</td><td>部活動コード</td><td>${statusPill('有効')}</td><td>担任・顧問が閲覧</td></tr>
              <tr><td><strong>人物の特徴</strong></td><td>機微情報</td><td>複数コード</td><td>コードごとの表示制限</td><td>${statusPill('有効')}</td><td>学年主任以上</td></tr>
              <tr><td><strong>自家用携帯番号</strong></td><td>連絡先情報</td><td>単一文字列</td><td>電話番号形式</td><td>${statusPill('有効')}</td><td>本人・管理職</td></tr>
              <tr><td><strong>戸籍関連メモ</strong></td><td>機微情報</td><td>複数文字列</td><td>最大1000文字</td><td>${statusPill('有効')}</td><td>教育委員会限定</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderAccounts() {
  return `
    <div class="page">
      ${hero('アカウント同期', 'このシステムで管理する名簿情報を Google Workspace へ一方向同期します。ワークスペース内メール、外部メール、メール未発行の状態を可視化し、OU・氏名・停止状態の反映を管理します。', '<button class="primary-button" data-modal="workspaceSync">同期ジョブを確認</button><button class="secondary-button">同期対象を再計算</button>')}
      <section class="grid cols-4">
        <div class="kpi-card" data-icon="G"><span class="eyebrow">Managed accounts</span><span class="value">162,884</span><span class="trend">Workspace内メール</span><p>一方向同期の対象アカウント。</p></div>
        <div class="kpi-card" data-icon="外"><span class="eyebrow">External mail</span><span class="value">12,430</span><span class="trend">ログイン可・同期対象外</span><p>保護者や外部関係者など。</p></div>
        <div class="kpi-card warning" data-icon="未"><span class="eyebrow">No mail</span><span class="value">8,916</span><span class="trend">メール未発行</span><p>名簿管理のみの人物。</p></div>
        <div class="kpi-card danger" data-icon="遅"><span class="eyebrow">Pending</span><span class="value">1,982</span><span class="trend">OU反映待ち</span><p>夜間バッチで処理予定。</p></div>
      </section>
      <section class="card mt-22">
        <div class="card-header"><div><h2>同期キュー</h2><p>Google Workspace に反映予定の変更です。</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>対象</th><th>変更内容</th><th>反映先</th><th>予定</th><th>状態</th></tr></thead>
            <tbody>
              <tr><td>佐伯 直人</td><td>所属OU変更</td><td>/Teachers/Aomi/SecondJHS</td><td>2026/07/01 02:00</td><td>${statusPill('処理中')}</td></tr>
              <tr><td>青山 美咲</td><td>表示名・クラス属性更新</td><td>/Students/Aomi/FirstJHS</td><td>次回バッチ</td><td>${statusPill('同期対象')}</td></tr>
              <tr><td>水野 遥</td><td>メール未発行</td><td>-</td><td>-</td><td>${statusPill('対象外')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderPermissions() {
  return `
    <div class="page">
      ${hero('権限ポリシー', '職種、所属、担任・顧問などのサブジェクト条件、対象者や属性値などのオブジェクト条件、組織スコープ、機能割当を組み合わせて細かく設定します。', '<button class="primary-button" data-modal="policyEdit">ポリシーを作成</button><button class="secondary-button" data-modal="permissionTest">権限をテスト</button>')}
      <section class="grid cols-2">
        <div class="card pad">
          <span class="eyebrow">Policy model</span>
          <h2>条件式の考え方</h2>
          <div class="rule-expression">
            <span class="rule-chip">Subject: 一般教員</span><span class="rule-arrow">かつ</span><span class="rule-chip">Relation: 担任クラス</span><span class="rule-arrow">なら</span><span class="rule-chip">Object: 生徒基本情報</span><span class="rule-arrow">に</span><span class="rule-chip">閲覧・編集</span>
          </div>
          <div class="rule-expression">
            <span class="rule-chip">Subject.attr: 部活顧問=サッカー</span><span class="rule-arrow">なら</span><span class="rule-chip">Object.attr: 所属部活=サッカー</span><span class="rule-arrow">の</span><span class="rule-chip">連絡先閲覧</span>
          </div>
        </div>
        <div class="card pad">
          <span class="eyebrow">Inheritance</span>
          <h2>設定継承と優先順位</h2>
          <p class="muted">テナント全体 → 市町村 → 学校種 → 学校 → 部署の順に継承し、下位組織の追加・上書きを優先します。ポリシーごとに影響範囲と差分を表示します。</p>
          <button class="secondary-button mt-16" data-modal="inheritance">継承差分を見る</button>
        </div>
      </section>
      <section class="grid mt-22">
        ${policyCard('一般教員の担任クラス編集', '一般教員が担任を持つクラスの生徒について、基本情報を閲覧・編集できます。', ['職種 = 一般教員', '関係 = 担任', '対象 = 自クラス生徒', '機能 = 基本情報 編集'], 'テナント全体から継承')}
        ${policyCard('サッカー部顧問の連絡先閲覧', '部活顧問属性にサッカー部が設定されている教員は、担当学校のサッカー部生徒の連絡先のみ閲覧できます。', ['Subject.attr 部活顧問 = サッカー', '学校 = 同一', 'Object.attr 所属部活 = サッカー', '機能 = 連絡先 閲覧'], '第一中で上書き')}
        ${policyCard('コード選択肢「いじめ加害者」制限', '人物の特徴コードのうち、特定の選択肢だけ学年主任以上に限定します。', ['属性 = 人物の特徴', 'コード = いじめ加害者', 'Subject.role >= 学年主任', '機能 = 選択肢表示'], '学校単位で追加')}
      </section>
    </div>
  `;
}

function policyCard(title, text, chips, scope) {
  return `<article class="rule-card"><div><h3>${title}</h3><p class="muted">${text}</p><div class="rule-expression">${chips.map(c => `<span class="rule-chip">${c}</span>`).join('')}</div></div><div><span class="eyebrow">Scope</span><p>${scope}</p><button class="secondary-button" data-modal="policyEdit">編集</button></div></article>`;
}

function renderCsv() {
  return `
    <div class="page">
      ${hero('CSV取込センター', '人物に紐づく情報の基本更新フローです。CSV項目と名簿属性のマッピング、識別子一致確認、承認不要フラグ、バックグラウンド処理を段階的に見せます。', '<button class="primary-button" data-modal="quickImport">新しいCSV取込</button><a class="secondary-button" href="#/logs">処理ログへ</a>')}
      <section class="card pad">
        <span class="eyebrow">Import wizard</span>
        <h2>安全な一括更新フロー</h2>
        <div class="flow-steps mt-16">
          <div class="flow-step"><span class="step-num">1</span><strong>CSVアップロード</strong><p>テンプレート選択と文字コードを確認します。</p></div>
          <div class="flow-step"><span class="step-num">2</span><strong>項目マッピング</strong><p>CSV列を名簿属性へ紐づけます。</p></div>
          <div class="flow-step"><span class="step-num">3</span><strong>識別子照合</strong><p>Eメール、職員番号、生年月日などで本人確認します。</p></div>
          <div class="flow-step"><span class="step-num">4</span><strong>承認・反映</strong><p>承認不要権限がある場合のみ直接変更できます。</p></div>
        </div>
      </section>
      <section class="grid main-layout mt-22">
        <div class="card">
          <div class="card-header"><div><h2>取込ジョブ</h2><p>遅延処理の進捗とエラーを確認します。</p></div></div>
          <div class="table-wrap"><table><thead><tr><th>ジョブID</th><th>ファイル</th><th>行数</th><th>実行者</th><th>状態</th><th>詳細</th></tr></thead><tbody>${importJobs.map(j => `<tr><td>${j.id}</td><td><strong>${j.name}</strong><br><span class="muted">${j.time}</span></td><td>${j.rows.toLocaleString()}</td><td>${j.owner}</td><td>${statusPill(j.status)}</td><td><button class="secondary-button" data-modal="jobError">開く</button></td></tr>`).join('')}</tbody></table></div>
        </div>
        <aside class="card pad">
          <span class="eyebrow">Mapping preview</span>
          <h2>CSV列 → 名簿属性</h2>
          <div class="definition-grid mt-16" style="grid-template-columns:1fr">
            <div class="definition-item"><small>メールアドレス</small><strong>基本情報 > Googleアカウント</strong></div>
            <div class="definition-item"><small>職員番号</small><strong>識別子 > 教職員番号</strong></div>
            <div class="definition-item"><small>携帯番号</small><strong>連絡先情報 > 自家用携帯番号</strong></div>
            <div class="definition-item"><small>新所属コード</small><strong>所属履歴 > 予約所属</strong></div>
          </div>
          <label class="choice-row mt-16"><input type="checkbox" /> 所属変更の承認が不要な権限で直接反映する</label>
          <div class="warning-box mt-16">このチェックは権限ポリシーで許可されたユーザーにのみ表示される想定です。</div>
        </aside>
      </section>
    </div>
  `;
}

function renderApprovals() {
  return `
    <div class="page">
      ${hero('所属変更承認', '学校間・クラス間・部署間の所属変更を、申請、移動先承認、実行予約、取消の流れで管理します。承認済みの変更は有効日にバッチで自動反映されます。', '<button class="primary-button" data-modal="approvalRequest">変更申請を作成</button><button class="secondary-button">承認待ちのみ表示</button>')}
      <section class="card">
        <div class="card-header"><div><h2>申請一覧</h2><p>移動元と移動先が明確に分かるように、左右比較の詳細モーダルへ誘導します。</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>申請ID</th><th>対象者</th><th>移動元</th><th>移動先</th><th>反映日</th><th>状態</th><th>操作</th></tr></thead><tbody>${approvals.map(a => `<tr><td>${a.id}</td><td><strong>${a.person}</strong><br><span class="muted">申請者: ${a.requester}</span></td><td>${a.from}</td><td>${a.to}</td><td>${a.effective}</td><td>${statusPill(a.status)}</td><td><button class="secondary-button" data-modal="approvalDetail">詳細</button></td></tr>`).join('')}</tbody></table></div>
      </section>
      <section class="grid cols-3 mt-22">
        <div class="card pad"><span class="eyebrow">Pending</span><h2>18件</h2><p class="muted">移動先組織の承認待ち。</p></div>
        <div class="card pad"><span class="eyebrow">Scheduled</span><h2>11件</h2><p class="muted">実行予定日にバッチ反映。</p></div>
        <div class="card pad"><span class="eyebrow">Canceled</span><h2>7件</h2><p class="muted">実行前に取消済み。</p></div>
      </section>
    </div>
  `;
}

function renderLogs() {
  return `
    <div class="page">
      ${hero('処理ログ・問い合わせ', 'CSV取込、Workspace同期、承認バッチ、フォーム反映の状態を横断して確認します。エラーが出ている場合は、詳細からシステム管理者への問い合わせに進めます。', '<button class="primary-button" data-modal="support">問い合わせを作成</button><button class="secondary-button">エラーのみ表示</button>')}
      <section class="card">
        <div class="card-header"><div><h2>運用ログ</h2><p>ユーザーが自分の申請や取込結果を追跡できるページです。</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>時刻</th><th>種別</th><th>対象</th><th>結果</th><th>詳細</th><th>次アクション</th></tr></thead>
            <tbody>
              <tr><td>02:04</td><td>CSV検証</td><td>教職員_年度途中異動.csv</td><td>${statusPill('検証エラー')}</td><td>12件の識別子不一致</td><td><button class="secondary-button" data-modal="jobError">修正</button></td></tr>
              <tr><td>01:48</td><td>Workspace同期</td><td>OU変更キュー</td><td>${statusPill('処理中')}</td><td>1,982件を処理中</td><td><button class="secondary-button" data-modal="workspaceSync">確認</button></td></tr>
              <tr><td>00:20</td><td>フォーム反映</td><td>私用携帯番号 登録依頼</td><td>${statusPill('完了')}</td><td>346件の名簿属性を更新</td><td><a class="secondary-button" href="#/forms">フォームへ</a></td></tr>
              <tr><td>昨日</td><td>承認バッチ</td><td>REQ-8008</td><td>${statusPill('実行予約済み')}</td><td>2026/07/01反映予定</td><td><a class="secondary-button" href="#/approvals">確認</a></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderForms() {
  return `
    <div class="page">
      ${hero('フォームサービス', '教育委員会や学校が対象条件を指定してアンケートを配信し、回答集計と名簿属性への反映を管理します。閲覧権限にも名簿と同じ柔軟なポリシーを適用します。', '<button class="primary-button" data-modal="formCreate">フォームを作成</button><button class="secondary-button" data-modal="permissionTest">回答閲覧権限を確認</button>')}
      <section class="grid cols-3">
        ${forms.map(f => `<article class="launcher-card" href="#/forms"><span class="launcher-icon">問</span><span><h3>${f.title}</h3><p>対象: ${f.target}</p><p>回答: ${f.answers.toLocaleString()}件 / ${f.map}</p>${statusPill(f.status)}</span><span class="arrow"><button class="secondary-button" data-modal="formDetail">詳細</button></span></article>`).join('')}
      </section>
      <section class="form-builder mt-22">
        <aside class="card pad">
          <span class="eyebrow">Audience</span>
          <h2>対象者条件</h2>
          <div class="rule-expression"><span class="rule-chip">市町村 = 青海市</span><span class="rule-chip">学校種 = 小学校</span><span class="rule-chip">職種 = 一般教員</span></div>
          <div class="notice mt-16">この条件に該当する教員のみ閲覧・回答できます。</div>
        </aside>
        <section class="card">
          <div class="card-header"><div><h2>フォームビルダー</h2><p>設問と名簿反映先を同時に設計します。</p></div><button class="secondary-button" data-modal="formCreate">編集</button></div>
          <div class="card-body">
            <div class="question-card"><strong>1. 私用携帯番号を入力してください</strong><div class="field"><input placeholder="090-0000-0000" /></div><span class="tag">名簿反映: 連絡先情報 > 自家用携帯番号</span></div>
            <div class="question-card"><strong>2. 緊急連絡の希望時間帯</strong><div class="choice-row"><span class="choice-dot"></span>午前</div><div class="choice-row"><span class="choice-dot"></span>午後</div><div class="choice-row"><span class="choice-dot"></span>夜間</div><span class="tag">集計のみ</span></div>
          </div>
        </section>
        <aside class="card pad">
          <span class="eyebrow">Analytics</span>
          <h2>回答状況</h2>
          <div class="chart-bars mt-16">
            <div class="bar-row"><span>回答済み</span><div class="bar-track"><span style="width:72%"></span></div><strong>72%</strong></div>
            <div class="bar-row"><span>未回答</span><div class="bar-track"><span style="width:28%; background:linear-gradient(90deg,#d0d9e4,#9cadbd)"></span></div><strong>28%</strong></div>
            <div class="bar-row"><span>名簿反映</span><div class="bar-track"><span style="width:64%; background:linear-gradient(90deg,#21a67a,#1db7c6)"></span></div><strong>64%</strong></div>
          </div>
        </aside>
      </section>
    </div>
  `;
}

function renderAnalytics() {
  return `
    <div class="page">
      ${hero('データ利活用', '名簿、フォーム、同期、承認ログを横断し、県・市町村・学校種・学校単位の状況を可視化します。ダミーデータによる分析モックです。', '<button class="primary-button" data-modal="analyticsReport">レポートを作成</button><button class="secondary-button">CSV出力</button>')}
      <section class="grid cols-4">
        <div class="kpi-card" data-icon="回"><span class="eyebrow">Form response</span><span class="value">81.4%</span><span class="trend">前週比 +5.2pt</span><p>県内教職員向けフォームの平均回答率。</p></div>
        <div class="kpi-card" data-icon="属"><span class="eyebrow">Attribute completeness</span><span class="value">94.1%</span><span class="trend">連絡先情報</span><p>必須属性の入力完了率。</p></div>
        <div class="kpi-card warning" data-icon="承"><span class="eyebrow">Approval SLA</span><span class="value">87%</span><span class="trend">48時間以内</span><p>所属変更承認のSLA達成率。</p></div>
        <div class="kpi-card danger" data-icon="誤"><span class="eyebrow">Import quality</span><span class="value">1.2%</span><span class="trend">検証エラー率</span><p>CSV行単位のエラー比率。</p></div>
      </section>
      <section class="grid cols-2 mt-22">
        <div class="card pad"><span class="eyebrow">Municipality ranking</span><h2>自治体別 連絡先整備率</h2><div class="chart-bars mt-16"><div class="bar-row"><span>青海市</span><div class="bar-track"><span style="width:96%"></span></div><strong>96%</strong></div><div class="bar-row"><span>緑浜町</span><div class="bar-track"><span style="width:91%"></span></div><strong>91%</strong></div><div class="bar-row"><span>朝凪市</span><div class="bar-track"><span style="width:83%"></span></div><strong>83%</strong></div><div class="bar-row"><span>白浦町</span><div class="bar-track"><span style="width:78%"></span></div><strong>78%</strong></div></div></div>
        <div class="card pad"><span class="eyebrow">Risk signal</span><h2>運用リスクの早期発見</h2><div class="timeline mt-16"><div class="timeline-item"><strong>機微情報の閲覧集中</strong><p>特定学校で通常比2.1倍。監査ログ確認を推奨。</p></div><div class="timeline-item"><strong>承認滞留</strong><p>第二中で移動承認が48時間を超過。</p></div><div class="timeline-item"><strong>同期キュー増加</strong><p>OU変更が夜間バッチ前に増加中。</p></div></div></div>
      </section>
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="page">
      ${hero('テナント設定', '1県=1テナント、1 GCPプロジェクトとしての基本設定、データ分離、Google Workspace連携、組織別上書きルールを管理します。', '<button class="primary-button" data-modal="tenantEdit">設定を編集</button><button class="secondary-button" data-modal="inheritance">継承確認</button>')}
      <section class="grid cols-2">
        <div class="card pad"><span class="eyebrow">Tenant</span><h2>青海県テナント</h2><div class="definition-grid mt-16"><div class="definition-item"><small>GCP Project</small><strong>aomi-edu-prod</strong></div><div class="definition-item"><small>Database Project</small><strong>aomi-edu-db-prod</strong></div><div class="definition-item"><small>Workspace Domain</small><strong>aomi.ed.jp</strong></div><div class="definition-item"><small>データ分離</small><strong>テナント専用DB</strong></div></div></div>
        <div class="card pad"><span class="eyebrow">Governance</span><h2>全体運用ポリシー</h2><div class="timeline mt-16"><div class="timeline-item"><strong>属性履歴保持</strong><p>全属性で履歴を保持。機微情報は監査ログ必須。</p></div><div class="timeline-item"><strong>下位組織優先</strong><p>学校独自の権限・属性設定が上位設定を上書き。</p></div><div class="timeline-item"><strong>Workspace一方向同期</strong><p>名簿データからGoogle Workspaceへ反映。</p></div></div></div>
      </section>
    </div>
  `;
}

function modalTemplate(title, text, body, actions = '<button class="primary-button" data-close-modal>閉じる</button>') {
  return `<section class="modal" role="dialog" aria-modal="true" aria-label="${title}"><div class="modal-header"><div><h2>${title}</h2><p>${text}</p></div><button class="icon-button" data-close-modal aria-label="閉じる">×</button></div><div class="modal-body">${body}</div><div class="modal-actions">${actions}</div></section>`;
}

const modals = {
  quickImport: () => modalTemplate('CSV取込を開始', '実データ連携は行わないモックですが、運用上の流れが分かる入力画面です。', `<div class="field"><label>取込テンプレート</label><select><option>教職員 年度途中異動</option><option>生徒基本情報</option><option>保護者連絡先</option></select></div><div class="field"><label>CSVファイル</label><input type="file" /></div><div class="field"><label>識別キー</label><select><option>メールアドレス + 職員番号</option><option>生徒番号 + 生年月日</option><option>外部ID</option></select></div><label class="choice-row"><input type="checkbox" /> 所属変更の承認が不要な権限で直接反映する</label><div class="notice mt-16">次のステップでCSV列と名簿属性をマッピングします。</div>`, '<button class="secondary-button" data-close-modal>キャンセル</button><button class="primary-button" data-close-modal>マッピングへ進む</button>'),
  support: () => modalTemplate('システム管理者へ問い合わせ', 'ログやジョブIDを添えて問い合わせる導線です。', `<div class="field"><label>関連ジョブID</label><input value="IMP-20260625-014" /></div><div class="field"><label>問い合わせ内容</label><textarea>識別子不一致の修正方法を確認したいです。</textarea></div><div class="field"><label>緊急度</label><select><option>通常</option><option>高</option><option>至急</option></select></div>`, '<button class="secondary-button" data-close-modal>戻る</button><button class="primary-button" data-close-modal>問い合わせを送信</button>'),
  notifications: () => modalTemplate('通知', '承認、CSV、同期、フォームの重要通知です。', `<div class="timeline"><div class="timeline-item"><strong>CSV検証エラー</strong><p>12件の識別子不一致があります。</p></div><div class="timeline-item"><strong>承認待ち</strong><p>第二中への所属変更申請が承認待ちです。</p></div><div class="timeline-item"><strong>フォーム回答率</strong><p>私用携帯番号フォームが70%を超えました。</p></div></div>`),
  workspaceSync: () => modalTemplate('Google Workspace同期', 'このシステムからWorkspaceへ一方向で反映するキューです。', `<div class="definition-grid"><div class="definition-item"><small>同期待ち</small><strong>1,982件</strong></div><div class="definition-item"><small>最終成功</small><strong>2026/06/25 01:30</strong></div><div class="definition-item"><small>失敗</small><strong>3件</strong></div><div class="definition-item"><small>次回実行</small><strong>02:30</strong></div></div><div class="notice mt-16">OU、表示名、停止状態、組織属性を反映します。</div>`),
  jobError: () => modalTemplate('CSV検証エラー詳細', '本人一致確認に失敗した行を修正または保留できます。', `<div class="table-wrap"><table><thead><tr><th>行</th><th>CSV氏名</th><th>候補</th><th>理由</th><th>対応</th></tr></thead><tbody><tr><td>42</td><td>佐伯 直人</td><td>2件</td><td>職員番号不一致</td><td>${statusPill('検証エラー')}</td></tr><tr><td>88</td><td>山野 結</td><td>0件</td><td>メール未登録</td><td>${statusPill('検証エラー')}</td></tr></tbody></table></div>`, '<button class="secondary-button" data-close-modal>保留</button><button class="primary-button" data-close-modal>修正して再検証</button>'),
  personEdit: () => modalTemplate('人物を追加・編集', '基本情報と所属、Googleアカウントを登録します。', `<div class="grid cols-2"><div class="field"><label>氏名</label><input placeholder="例: 青山 美咲" /></div><div class="field"><label>区分</label><select><option>生徒</option><option>教員</option><option>教育委員会</option><option>関係者</option></select></div><div class="field"><label>所属組織</label><input placeholder="青海市立第一中学校" /></div><div class="field"><label>メール</label><input placeholder="name@aomi.ed.jp" /></div></div>`, '<button class="secondary-button" data-close-modal>キャンセル</button><button class="primary-button" data-close-modal>保存</button>'),
  personDetail: () => modalTemplate('人物詳細', 'スマート名簿の詳細タブをモーダルでも確認できます。', `${personBasic()}<div class="tabs mt-16"><button class="tab active">基本情報</button><button class="tab">連絡先</button><button class="tab">機微情報</button><button class="tab">履歴</button></div><div class="notice mt-16">権限に応じて表示されるタブと項目が変わります。</div>`),
  grouping: () => modalTemplate('表示項目とグルーピング', '一覧に表示する属性グループを選択します。', `<label class="choice-row"><input type="checkbox" checked /> 基本情報</label><label class="choice-row"><input type="checkbox" checked /> 連絡先情報</label><label class="choice-row"><input type="checkbox" /> 機微情報</label><label class="choice-row"><input type="checkbox" checked /> Google Workspace同期状態</label><div class="field mt-16"><label>グルーピング</label><select><option>学校種 > 学校 > クラス</option><option>属性項目 > 部活動</option><option>同期状態</option></select></div>`),
  orgEdit: () => modalTemplate('組織を追加', '県テナント配下に組織を追加します。', `<div class="field"><label>親組織</label><select><option>青海県全体</option><option>青海市</option><option>青海市立第一中学校</option></select></div><div class="field"><label>組織種別</label><select><option>市町村</option><option>学校種</option><option>学校</option><option>教育委員会</option><option>部署</option></select></div><div class="field"><label>組織名</label><input placeholder="例: 学務課" /></div>`),
  inheritance: () => modalTemplate('継承差分', '上位から継承した設定と下位組織の上書きを確認します。', `<div class="table-wrap"><table><thead><tr><th>設定</th><th>上位</th><th>下位</th><th>採用</th></tr></thead><tbody><tr><td>機微情報閲覧</td><td>管理職のみ</td><td>担任+学年主任</td><td>${statusPill('上書き')}</td></tr><tr><td>CSVテンプレート</td><td>標準</td><td>第一中独自列あり</td><td>${statusPill('上書き')}</td></tr><tr><td>同期設定</td><td>県標準</td><td>変更なし</td><td>${statusPill('継承')}</td></tr></tbody></table></div>`),
  attributeEdit: () => modalTemplate('属性項目を作成', '型、カテゴリ、バリデーション、履歴保持を設定します。', `<div class="grid cols-2"><div class="field"><label>項目名</label><input placeholder="例: 自家用携帯番号" /></div><div class="field"><label>カテゴリ</label><select><option>基本情報</option><option>連絡先情報</option><option>機微情報</option></select></div><div class="field"><label>データ形式</label><select><option>数値</option><option>単一文字列</option><option>複数文字列</option><option>日付</option><option>コード</option></select></div><div class="field"><label>バリデーション</label><input placeholder="例: 電話番号形式" /></div></div><label class="choice-row"><input type="checkbox" checked /> 履歴を保持する</label>`),
  codeMaster: () => modalTemplate('コードマスター管理', 'コードごとに表示・選択権限を設定できます。', `<div class="table-wrap"><table><thead><tr><th>コード</th><th>表示名</th><th>閲覧条件</th><th>選択条件</th></tr></thead><tbody><tr><td>GOOD</td><td>優良生徒</td><td>担任以上</td><td>担任以上</td></tr><tr><td>BULLYING_ACTOR</td><td>いじめ加害者</td><td>学年主任以上</td><td>学年主任以上</td></tr></tbody></table></div>`),
  policyEdit: () => modalTemplate('権限ポリシー編集', '条件ビルダーでサブジェクト・オブジェクト・機能を組み合わせます。', `<div class="field"><label>サブジェクト条件</label><input value="職種 = 一般教員 AND 関係 = 担任" /></div><div class="field"><label>オブジェクト条件</label><input value="対象 = 自クラス生徒 AND 属性カテゴリ = 基本情報" /></div><div class="field"><label>許可する機能</label><select><option>閲覧・編集</option><option>閲覧のみ</option><option>選択肢表示</option></select></div>`),
  permissionTest: () => modalTemplate('権限テスト', 'ユーザーと対象者を指定して、見える項目・操作できる項目を確認します。', `<div class="grid cols-2"><div class="field"><label>操作ユーザー</label><select><option>佐伯 直人 / 一般教員 / 2年A組担任</option><option>第一中 校長</option><option>青海市 学務課</option></select></div><div class="field"><label>対象者</label><select><option>青山 美咲 / 2年A組</option><option>水野 遥 / 1年B組</option></select></div></div><div class="notice">結果: 基本情報は編集可、連絡先は閲覧可、機微情報は一部コードのみ非表示。</div>`),
  approvalRequest: () => modalTemplate('所属変更申請', '移動元・移動先・有効日を指定します。', `<div class="field"><label>対象者</label><input value="佐伯 直人" /></div><div class="grid cols-2"><div class="field"><label>移動元</label><input value="青海市立第一中学校" /></div><div class="field"><label>移動先</label><input value="青海市立第二中学校" /></div></div><div class="field"><label>反映日</label><input type="date" value="2026-07-01" /></div>`),
  approvalDetail: () => modalTemplate('所属変更申請の詳細', '承認、差戻し、実行前取消ができます。', `<div class="grid cols-2"><div class="definition-item"><small>移動元</small><strong>青海市立第一中学校</strong></div><div class="definition-item"><small>移動先</small><strong>青海市立第二中学校</strong></div></div><div class="timeline mt-16"><div class="timeline-item"><strong>申請作成</strong><p>第一中 校長 / 2026/06/24</p></div><div class="timeline-item"><strong>移動先承認待ち</strong><p>第二中 管理職の承認後、2026/07/01に実行予約。</p></div></div>`, '<button class="danger-button" data-close-modal>差戻し</button><button class="secondary-button" data-close-modal>取消</button><button class="primary-button" data-close-modal>承認</button>'),
  formCreate: () => modalTemplate('フォーム作成', '対象者、設問、名簿反映先を設定します。', `<div class="field"><label>フォーム名</label><input value="教員 私用携帯番号 登録依頼" /></div><div class="field"><label>対象者条件</label><input value="青海市 AND 小学校 AND 一般教員" /></div><div class="field"><label>回答の名簿反映</label><select><option>連絡先情報 > 自家用携帯番号</option><option>基本情報 > 所属部活</option><option>反映しない</option></select></div>`),
  formDetail: () => modalTemplate('フォーム詳細', '回答状況、集計、名簿反映設定を確認します。', `<div class="definition-grid"><div class="definition-item"><small>回答数</small><strong>346件</strong></div><div class="definition-item"><small>回答率</small><strong>72%</strong></div><div class="definition-item"><small>名簿反映</small><strong>連絡先情報 > 自家用携帯番号</strong></div><div class="definition-item"><small>閲覧権限</small><strong>教委 学務課以上</strong></div></div>`),
  analyticsReport: () => modalTemplate('分析レポート作成', '自治体・学校種・期間を指定してレポートを作成します。', `<div class="grid cols-2"><div class="field"><label>集計単位</label><select><option>市町村</option><option>学校種</option><option>学校</option></select></div><div class="field"><label>対象データ</label><select><option>連絡先整備率</option><option>CSVエラー率</option><option>承認SLA</option></select></div></div>`),
  tenantEdit: () => modalTemplate('テナント設定編集', 'GCPプロジェクト、Workspaceドメイン、同期方針を管理します。', `<div class="field"><label>テナント名</label><input value="青海県テナント" /></div><div class="field"><label>GCP Project</label><input value="aomi-edu-prod" /></div><div class="field"><label>Workspace Domain</label><input value="aomi.ed.jp" /></div>`)
};

function openModal(name) {
  const root = document.getElementById('modalRoot');
  const renderModal = modals[name] || (() => modalTemplate('モーダル', 'この操作の詳細です。', '<p>ダミー表示です。</p>'));
  root.innerHTML = renderModal();
  root.classList.add('open');
  root.setAttribute('aria-hidden', 'false');
  const closeButton = root.querySelector('[data-close-modal]');
  if (closeButton) closeButton.focus();
}

function closeModal() {
  const root = document.getElementById('modalRoot');
  root.classList.remove('open');
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = '';
}

function wirePageInteractions() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    tabGroup.addEventListener('click', event => {
      const button = event.target.closest('.tab');
      if (!button) return;
      const parent = tabGroup.parentElement;
      parent.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      parent.querySelectorAll('.tab-content').forEach(panel => panel.classList.remove('active'));
      button.classList.add('active');
      const target = parent.querySelector(`[data-tab-panel="${button.dataset.tab}"]`);
      if (target) target.classList.add('active');
    });
  });
}

document.addEventListener('click', event => {
  const modalButton = event.target.closest('[data-modal]');
  if (modalButton) {
    event.preventDefault();
    openModal(modalButton.dataset.modal);
    return;
  }
  if (event.target.matches('[data-close-modal]') || event.target.closest('[data-close-modal]')) {
    closeModal();
    return;
  }
  if (event.target.id === 'modalRoot') closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

window.addEventListener('hashchange', render);
renderNav();
render();
