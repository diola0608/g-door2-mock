/* Dummy data (no backend). Used by pages to render tables/cards. */
window.DATA = (function () {
  var avatarColors = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#0ea5e9,#2563eb)',
    'linear-gradient(135deg,#f59e0b,#ef4444)',
    'linear-gradient(135deg,#10b981,#059669)',
    'linear-gradient(135deg,#ec4899,#db2777)',
    'linear-gradient(135deg,#14b8a6,#0d9488)',
  ];

  // 名簿（人物）
  var people = [
    { id: 'P-10231', kana: 'さとう はなこ', name: '佐藤 花子', type: '生徒', org: '青葉第一中学校', cls: '2年A組', grade: '2年', email: 'h.sato@s.aoba-edu.ed.jp', birth: '2012-05-14', gender: '女', tel: '090-1234-5678', addr: '青葉市みどり町2-14-3', status: '在籍', sync: '同期済', club: 'サッカー部', feature: '優良生徒' },
    { id: 'P-10232', kana: 'すずき たろう', name: '鈴木 太郎', type: '生徒', org: '青葉第一中学校', cls: '2年A組', grade: '2年', email: 't.suzuki@s.aoba-edu.ed.jp', birth: '2012-08-02', gender: '男', tel: '080-2233-4455', addr: '青葉市本町1-2-9', status: '在籍', sync: '同期済', club: '吹奏楽部', feature: '' },
    { id: 'P-10233', kana: 'たかはし みさき', name: '高橋 美咲', type: '生徒', org: '青葉第一中学校', cls: '2年B組', grade: '2年', email: '', birth: '2012-01-22', gender: '女', tel: '090-8765-4321', addr: '青葉市桜ヶ丘5-1', status: '在籍', sync: 'アカウント無', club: 'サッカー部', feature: '要配慮' },
    { id: 'P-10234', kana: 'たなか けんと', name: '田中 健斗', type: '生徒', org: '青葉第二中学校', cls: '3年C組', grade: '3年', email: 'k.tanaka@s.aoba-edu.ed.jp', birth: '2011-11-30', gender: '男', tel: '070-1122-3344', addr: '青葉市東区3-3-3', status: '在籍', sync: '同期済', club: 'バスケ部', feature: '' },
    { id: 'P-20011', kana: 'いとう まなぶ', name: '伊藤 学', type: '教員', org: '青葉第一中学校', cls: '2年A組(担任)', grade: '—', email: 'm.ito@aoba-edu.ed.jp', birth: '1986-03-19', gender: '男', tel: '090-5555-1212', addr: '青葉市中央区1-1', status: '在職', sync: '同期済', club: 'サッカー部顧問', feature: '', job: '一般教員', license: '中一種(数学) 第12345号' },
    { id: 'P-20012', kana: 'わたなべ ゆき', name: '渡辺 由紀', type: '教員', org: '青葉第一中学校', cls: '2年B組(担任)', grade: '学年主任', email: 'y.watanabe@aoba-edu.ed.jp', birth: '1980-07-08', gender: '女', tel: '090-6666-7878', addr: '青葉市西区2-2', status: '在職', sync: '同期済', club: '吹奏楽部顧問', feature: '', job: '学年主任', license: '中一種(国語) 第22310号' },
    { id: 'P-20001', kana: 'やまもと いちろう', name: '山本 一郎', type: '教員', org: '青葉第一中学校', cls: '—', grade: '校長', email: 'principal@aoba-edu.ed.jp', birth: '1968-12-01', gender: '男', tel: '090-9999-0000', addr: '青葉市中央区4-5', status: '在職', sync: '同期済', club: '', feature: '', job: '校長', license: '中専修(社会) 第00821号' },
    { id: 'P-30005', kana: 'なかむら さき', name: '中村 咲', type: '教育委員会', org: '青葉市教育委員会 学校教育課', cls: '指導主事', grade: '—', email: 's.nakamura@city.aoba-edu.ed.jp', birth: '1979-09-25', gender: '女', tel: '090-3333-2121', addr: '青葉市役所内', status: '在職', sync: '同期済', club: '', feature: '', job: '指導主事' },
    { id: 'P-10240', kana: 'こばやし ひな', name: '小林 陽菜', type: '生徒', org: '青葉第二中学校', cls: '1年A組', grade: '1年', email: 'h.koba@s.aoba-edu.ed.jp', birth: '2013-04-10', gender: '女', tel: '080-4455-6677', addr: '青葉市南区1-8', status: '在籍', sync: '同期済', club: '美術部', feature: '' },
    { id: 'P-10241', kana: 'かとう そうた', name: '加藤 颯太', type: '生徒', org: '青葉第二中学校', cls: '1年A組', grade: '1年', email: 's.kato@s.aoba-edu.ed.jp', birth: '2013-06-21', gender: '男', tel: '080-7788-9900', addr: '青葉市北区2-4', status: '在籍', sync: '同期済', club: 'サッカー部', feature: 'いじめ加害' },
    { id: 'P-10242', kana: 'よしだ あおい', name: '吉田 葵', type: '生徒', org: '青葉第一中学校', cls: '3年A組', grade: '3年', email: 'a.yoshida@s.aoba-edu.ed.jp', birth: '2011-02-17', gender: '女', tel: '090-1212-3434', addr: '青葉市みどり町8-2', status: '在籍', sync: '同期済', club: '陸上部', feature: '優良生徒' },
    { id: 'P-10243', kana: 'やまだ りく', name: '山田 陸', type: '生徒', org: '青葉第一中学校', cls: '3年A組', grade: '3年', email: 'r.yamada@s.aoba-edu.ed.jp', birth: '2011-10-05', gender: '男', tel: '070-5656-7878', addr: '青葉市本町6-1', status: '転入手続中', sync: '保留', club: '', feature: '' },
  ];
  people.forEach(function (p, i) { p.color = avatarColors[i % avatarColors.length]; });

  // 組織ツリー
  var orgTree = {
    name: '青葉県（テナント全体）', type: 'tenant', count: 48210, children: [
      { name: '青葉市', type: 'municipality', count: 18420, children: [
        { name: '中学校', type: 'schooltype', count: 6240, children: [
          { name: '青葉第一中学校', type: 'school', count: 612 },
          { name: '青葉第二中学校', type: 'school', count: 548 },
        ]},
        { name: '小学校', type: 'schooltype', count: 9180, children: [
          { name: '青葉東小学校', type: 'school', count: 421 },
          { name: '青葉西小学校', type: 'school', count: 398 },
        ]},
        { name: '青葉市教育委員会', type: 'board', count: 84, children: [
          { name: '学校教育課', type: 'dept', count: 32 },
          { name: '総務課', type: 'dept', count: 18 },
        ]},
      ]},
      { name: '緑川市', type: 'municipality', count: 12380, children: [
        { name: '中学校', type: 'schooltype', count: 4120, children: [
          { name: '緑川中央中学校', type: 'school', count: 503 },
        ]},
      ]},
      { name: '県立学校', type: 'schooltype', count: 9210, children: [
        { name: '青葉県立青葉高等学校', type: 'school', count: 962 },
        { name: '青葉県立緑が丘高等学校', type: 'school', count: 814 },
      ]},
    ]
  };

  // 属性項目
  var attributes = [
    { id: 'A001', name: '氏名', group: '基本情報', type: 'string', required: true, validation: '必須', protected: true, vis: '全員' },
    { id: 'A002', name: '生年月日', group: '基本情報', type: 'date', required: true, validation: '日付形式', protected: true, vis: '全員' },
    { id: 'A003', name: '性別', group: '基本情報', type: 'code', required: false, validation: 'コード:GENDER', protected: false, vis: '全員' },
    { id: 'A010', name: '住所', group: '連絡先情報', type: 'string', required: false, validation: '—', protected: false, vis: '担任・連絡担当' },
    { id: 'A011', name: '電話番号', group: '連絡先情報', type: 'string', required: false, validation: '電話番号形式', protected: false, vis: '担任・連絡担当' },
    { id: 'A012', name: '緊急連絡先', group: '連絡先情報', type: 'multistring', required: false, validation: '—', protected: false, vis: '担任・連絡担当' },
    { id: 'A020', name: '所属部活', group: '学校生活', type: 'code', required: false, validation: 'コード:CLUB', protected: false, vis: '所属校教職員' },
    { id: 'A021', name: '部活顧問', group: '学校生活', type: 'code', required: false, validation: 'コード:CLUB', protected: false, vis: '所属校教職員' },
    { id: 'A030', name: '人物の特徴', group: '機微情報', type: 'code', required: false, validation: 'コード:FEATURE', protected: true, vis: '担任・学年主任のみ' },
    { id: 'A031', name: 'いじめ歴', group: '機微情報', type: 'multistring', required: false, validation: '—', protected: true, vis: '学年主任以上' },
    { id: 'A032', name: '不登校状況', group: '機微情報', type: 'code', required: false, validation: 'コード:ATTEND', protected: true, vis: '担任・養護・管理職' },
    { id: 'A040', name: '教員免許番号', group: '教員情報', type: 'string', required: false, validation: '—', protected: true, vis: '管理職・教育委員会' },
    { id: 'A041', name: '戸籍上の氏名', group: '機微情報', type: 'string', required: false, validation: '—', protected: true, vis: '管理職・教育委員会' },
  ];

  // フォーム
  var forms = [
    { id: 'F-2041', title: 'ICT活用状況に関する調査', status: '受付中', target: '青葉市 / 小中学校 一般教員', responses: 342, total: 418, due: '2026-06-20', linked: false, owner: '中村 咲' },
    { id: 'F-2038', title: '教職員 緊急連絡先 登録フォーム', status: '受付中', target: '青葉県 全教職員', responses: 1820, total: 2240, due: '2026-06-30', linked: true, owner: '井上 管理' },
    { id: 'F-2035', title: '令和8年度 部活動希望調査', status: '集計中', target: '青葉第一中 全生徒', responses: 598, total: 612, due: '2026-05-31', linked: true, owner: '伊藤 学' },
    { id: 'F-2030', title: '保護者向け 学校満足度アンケート', status: '終了', target: '青葉第一中 保護者', responses: 489, total: 612, due: '2026-04-28', linked: false, owner: '渡辺 由紀' },
    { id: 'F-2028', title: '研修会 出欠確認', status: '下書き', target: '—', responses: 0, total: 0, due: '—', linked: false, owner: '井上 管理' },
  ];

  // 処理ログ
  var logs = [
    { id: 'J-88213', type: 'CSVインポート', file: '教員名簿_2026.csv', user: '井上 管理', at: '2026-06-13 09:12', status: 'error', total: 240, ok: 228, ng: 12 },
    { id: 'J-88210', type: '所属変更バッチ', file: '—', user: 'システム', at: '2026-06-13 06:00', status: 'success', total: 18, ok: 18, ng: 0 },
    { id: 'J-88204', type: 'Workspace同期', file: '—', user: 'システム', at: '2026-06-13 03:00', status: 'success', total: 1204, ok: 1204, ng: 0 },
    { id: 'J-88198', type: 'CSVインポート', file: '生徒名簿_2年.csv', user: '伊藤 学', at: '2026-06-12 17:40', status: 'success', total: 132, ok: 132, ng: 0 },
    { id: 'J-88190', type: 'フォーム名簿反映', file: '緊急連絡先登録', user: 'システム', at: '2026-06-12 12:00', status: 'partial', total: 412, ok: 405, ng: 7 },
    { id: 'J-88182', type: 'CSVインポート', file: '住所更新_南区.csv', user: '中村 咲', at: '2026-06-12 10:21', status: 'processing', total: 540, ok: 312, ng: 0 },
  ];

  // 所属変更申請
  var transfers = [
    { id: 'T-512', name: '吉田 葵', from: '青葉第一中学校 3年A組', to: '緑川中央中学校 3年1組', date: '2026-07-01', applicant: '伊藤 学', status: 'pending', step: 1 },
    { id: 'T-511', name: '渡辺 由紀', from: '青葉第一中学校', to: '青葉第二中学校', date: '2026-08-01', applicant: '山本 一郎', status: 'pending', step: 1 },
    { id: 'T-510', name: '加藤 颯太', from: '青葉第二中学校 1年A組', to: '青葉第一中学校 1年B組', date: '2026-07-01', applicant: '中村 咲', status: 'approved', step: 2 },
    { id: 'T-508', name: '高橋 美咲', from: '青葉第一中学校 2年B組', to: '青葉東小学校', date: '2026-06-10', applicant: '伊藤 学', status: 'scheduled', step: 2 },
    { id: 'T-505', name: '田中 健斗', from: '青葉第二中学校 3年C組', to: '青葉第一中学校 3年A組', date: '2026-06-01', applicant: '渡辺 由紀', status: 'done', step: 3 },
    { id: 'T-501', name: '小林 陽菜', from: '青葉西小学校', to: '青葉第二中学校 1年A組', date: '2026-05-20', applicant: '中村 咲', status: 'rejected', step: 1 },
  ];

  // コードマスター
  var codeSets = [
    { id: 'GENDER', name: '性別', count: 4, restricted: false, updated: '2026-03-01' },
    { id: 'CLUB', name: '部活動', count: 24, restricted: false, updated: '2026-04-15' },
    { id: 'FEATURE', name: '人物の特徴', count: 6, restricted: true, updated: '2026-05-22' },
    { id: 'ATTEND', name: '出席状況区分', count: 5, restricted: true, updated: '2026-05-10' },
    { id: 'SUBJECT', name: '担当教科', count: 14, restricted: false, updated: '2026-02-28' },
  ];

  var featureCodes = [
    { code: 'F01', label: '優良生徒', restrict: '所属校教職員', color: 'success' },
    { code: 'F02', label: '要配慮', restrict: '担任・学年主任・養護', color: 'warning' },
    { code: 'F03', label: 'いじめ被害', restrict: '学年主任以上', color: 'info' },
    { code: 'F04', label: 'いじめ加害', restrict: '学年主任のみ', color: 'danger' },
    { code: 'F05', label: '不登校傾向', restrict: '担任・養護・管理職', color: 'violet' },
    { code: 'F06', label: '医療的ケア', restrict: '養護・管理職', color: 'teal' },
  ];

  // 権限ポリシー
  var policies = [
    { id: 'POL-001', name: '一般教員：担任クラスの基本情報', subject: '職種=一般教員', object: '基本情報(閲覧/編集)', scope: '担任クラスの生徒', source: 'テナント既定', enabled: true },
    { id: 'POL-002', name: '部活顧問：連絡先閲覧', subject: '属性「部活顧問」に値あり', object: '連絡先情報(閲覧)', scope: '担当校・同一部活の生徒', source: 'テナント既定', enabled: true },
    { id: 'POL-003', name: '校長：同一市町村教員の連絡先', subject: '職種=校長', object: '連絡先情報(閲覧)', scope: '同一市町村・同一学校種の一般教員', source: 'テナント既定', enabled: true },
    { id: 'POL-011', name: '学年主任：機微情報の閲覧', subject: '職種=学年主任', object: '機微情報(閲覧)', scope: '所属学年の生徒', source: '青葉第一中（上書き）', enabled: true },
    { id: 'POL-020', name: '養護教諭：不登校状況の編集', subject: '職種=養護教諭', object: '不登校状況(閲覧/編集)', scope: '所属校の生徒', source: '青葉市（追加）', enabled: false },
  ];

  // 機能・アドオン（テナント/自治体ごとに利用可否を選択）
  var addons = [
    { id: 'roster', name: '名簿管理', cat: 'コア機能', ic: 'users', c: 'brand', status: 'enabled', core: true, desc: '児童生徒・教職員・委員会の名簿を一元管理', orgs: '全組織', href: 'roster-list.html' },
    { id: 'accounts', name: 'アカウント管理', cat: 'コア機能', ic: 'user', c: 'info', status: 'enabled', core: true, desc: 'Google Workspace連携アカウントとログイン', orgs: '全組織', href: 'accounts.html' },
    { id: 'forms', name: 'フォーム', cat: 'コア機能', ic: 'forms', c: 'violet', status: 'enabled', core: true, desc: 'アンケート・調査の作成と名簿への自動反映', orgs: '全組織', href: 'forms-list.html' },
    { id: 'attendance', name: '出欠管理', cat: '学校生活', ic: 'calendarCheck', c: 'teal', status: 'enabled', desc: '日次・時限ごとの出欠を記録し長期欠席を可視化', orgs: '青葉市・緑川市', href: '#' },
    { id: 'schedule', name: '予定表', cat: '学校生活', ic: 'calendarDays', c: 'info', status: 'enabled', desc: '学校・学年・クラスの予定を共有', orgs: '全組織', href: '#' },
    { id: 'health', name: '健康診断', cat: '保健', ic: 'heart', c: 'pink', status: 'enabled', desc: '身体測定・健康診断の結果を記録', orgs: '青葉市', href: '#' },
    { id: 'nurse', name: '保健室利用', cat: '保健', ic: 'plusSquare', c: 'danger', status: 'trial', desc: '保健室の来室記録と利用傾向の把握', orgs: '青葉第一中（試用）', href: '#' },
    { id: 'newsletter', name: 'お便り管理', cat: '連絡', ic: 'megaphone', c: 'violet', status: 'trial', desc: '学校からのお便りを配信し既読を管理', orgs: '青葉市（試用）', href: '#' },
    { id: 'fitness', name: '体力測定', cat: '保健', ic: 'activity', c: 'success', status: 'available', desc: '新体力テストの記録と全国平均との比較', orgs: '—', href: '#' },
    { id: 'counselor', name: 'スクールカウンセラー', cat: '保健', ic: 'messageCircle', c: 'warning', status: 'available', desc: 'SC面談の予約・記録（機微情報として保護）', orgs: '—', href: '#' },
    { id: 'guidance', name: '指導要録', cat: '学籍', ic: 'bookOpen', c: 'brand', status: 'available', desc: '指導要録の作成・電子保存・引継ぎ', orgs: '—', href: '#' },
    { id: 'classchange', name: 'クラス替え', cat: '学籍', ic: 'shuffle', c: 'teal', status: 'available', desc: '成績・人間関係などを考慮したクラス編成支援', orgs: '—', href: '#' },
    { id: 'parentapp', name: '保護者アプリ連携', cat: '連絡', ic: 'smartphone', c: 'pink', status: 'available', desc: '保護者アプリと出欠・お便り・健康情報を連携', orgs: '—', href: '#' },
  ];

  // ダッシュボード（複数パターン・誰に適用するか）
  var dashboards = [
    { id: 'D-EB', name: '教育委員会 標準', role: '教育委員会', ic: 'building2', c: 'teal', widgets: 8, applied: '教育委員会 全職員（184名）', updated: '2026-06-10', isDefault: true, desc: '管轄エリア全体の異動・長期欠席・トラブル事案を俯瞰' },
    { id: 'D-PR', name: '校長・管理職 向け', role: '校長 / 教頭', ic: 'briefcase', c: 'warning', widgets: 6, applied: '職種=校長・教頭（412名）', updated: '2026-06-08', isDefault: false, desc: '自校の在籍・出欠・保健・教職員状況のサマリ' },
    { id: 'D-HR', name: '担任 向け', role: '一般教員（担任）', ic: 'users', c: 'brand', widgets: 7, applied: '担任クラスを持つ教員（2,180名）', updated: '2026-06-12', isDefault: false, desc: '受け持ち学級にフォーカス。閾値逸脱の生徒をアラート' },
    { id: 'D-NS', name: '養護教諭 向け', role: '養護教諭', ic: 'plusSquare', c: 'pink', widgets: 5, applied: '職種=養護教諭（218名）', updated: '2026-05-30', isDefault: false, desc: '保健室来室・健康診断・欠席を保健視点で集約' },
  ];

  // ダッシュボードのアラート（正常値からの逸脱）
  var dashAlerts = [
    { sev: 'danger', ic: 'alert', t: '長期欠席（30日以上）が前月比 +12%', d: '緑川市の中学校で増加。3校が閾値を超過しています', a: 'analytics.html', al: '分析' },
    { sev: 'warning', ic: 'activity', t: '保健室の来室が急増した生徒 4名', d: '青葉第一中 2年A組ほか・週5回以上の来室', a: 'roster-list.html', al: '確認' },
    { sev: 'warning', ic: 'heart', t: '健康診断 未受診者 28名', d: '再通知の対象です。期限まで残り5日', a: 'forms-list.html', al: '催促' },
    { sev: 'info', ic: 'swap', t: '7/1 発効の異動が承認待ち 4件', d: '実行前に内容の確認をお願いします', a: 'transfers.html', al: '承認' },
  ];

  // インポート/エクスポート 連携プロファイル
  var mapProfiles = [
    { id: 'MP-01', name: '校務支援システム 教職員取込', dir: 'import', fmt: 'CSV / Shift-JIS', target: '教職員', fields: 18, transforms: 3, updated: '2026-06-01', source: 'C社 校務支援' },
    { id: 'MP-02', name: '児童生徒 基本情報（県標準様式）', dir: 'import', fmt: 'CSV / UTF-8', target: '児童生徒', fields: 24, transforms: 5, updated: '2026-05-20', source: '県標準様式' },
    { id: 'MP-04', name: 'スプレッドシート貼り付け（汎用）', dir: 'import', fmt: 'TSV / クリップボード', target: '児童生徒', fields: 12, transforms: 1, updated: '2026-06-11', source: '手動貼り付け' },
    { id: 'MP-03', name: 'OneRoster v1.2 エクスポート', dir: 'export', fmt: 'CSV / OneRoster', target: '児童生徒・教職員', fields: 32, transforms: 6, updated: '2026-04-15', source: 'OneRoster規格' },
    { id: 'MP-05', name: '文科省 学校基本調査 様式', dir: 'export', fmt: 'CSV / Shift-JIS', target: '集計値', fields: 16, transforms: 4, updated: '2026-03-22', source: '文科省様式' },
  ];

  // 識別キー（誰のデータかの判別）
  var idKeys = [
    { key: 'メールアドレス', scope: '人物 (1:1)', headers: ['Email', 'メール', 'mail', 'mailaddress', 'E-mail'], primary: true },
    { key: '職員番号', scope: '人物 (1:1)', headers: ['職員番号', '教職員番号', 'staff_no', 'employeeCode'], primary: false },
    { key: '生徒番号', scope: '人物 (1:1)', headers: ['生徒番号', '児童生徒番号', 'student_id'], primary: false },
    { key: '組織コード ＋ 職員番号', scope: '人物の所属 (1:1)', headers: ['org_code', 'school_code ＋ staff_no'], primary: false },
  ];

  // 項目マッピングの判定用文字列（1項目に複数設定可）
  var fieldMatchers = [
    { field: '氏名', type: 'string', headers: ['氏名', '名前', 'name', 'fullname'], transform: '姓名分割（スペース区切り）' },
    { field: '姓 / 名', type: 'string', headers: ['姓', '名', 'last_name', 'first_name'], transform: '—' },
    { field: 'メールアドレス', type: 'string', headers: ['Email', 'メール', 'mail', 'E-mail'], transform: '小文字化・前後空白除去' },
    { field: '性別', type: 'code', headers: ['性別', 'gender', 'sex'], transform: 'Female→女性 / Male→男性' },
    { field: '学年', type: 'number', headers: ['学年', 'grade', 'gakunen'], transform: '中学は 1→7 …（OneRoster）' },
    { field: '職種', type: 'code', headers: ['職種', '職名', 'role'], transform: 'ICT支援員→その他の職員' },
  ];

  // コード標準マッピング（規格との相互変換・職種の例）
  var codeStd = [
    { app: '一般教員', appCode: 'T01', mext: '教諭', mextCode: '01', oneroster: 'teacher', custom: false },
    { app: '学年主任', appCode: 'T02', mext: '教諭', mextCode: '01', oneroster: 'teacher', custom: false },
    { app: '校長', appCode: 'T10', mext: '校長', mextCode: '10', oneroster: 'administrator', custom: false },
    { app: '教頭', appCode: 'T11', mext: '教頭', mextCode: '11', oneroster: 'administrator', custom: false },
    { app: '副校長', appCode: 'T12', mext: '副校長', mextCode: '12', oneroster: 'administrator', custom: false },
    { app: '養護教諭', appCode: 'T20', mext: '養護教諭', mextCode: '20', oneroster: 'aide', custom: false },
    { app: 'ICT支援員', appCode: 'T90', mext: 'その他の職員', mextCode: '99', oneroster: 'aide', custom: true },
  ];

  // 組織ごとの設定の上書き・追加（継承の差分）
  var orgOverrides = [
    { item: '性別の選択肢', tenant: '男性 / 女性 / 適用不能', value: '男性 / 女性', org: '緑川市', type: '上書き', cat: 'コード' },
    { item: '役職「教頭」', tenant: 'あり', value: 'なし（副校長を使用）', org: '県立学校（高校）', type: '上書き', cat: '役職' },
    { item: '生年月日の必須', tenant: '任意', value: '必須', org: '小学校', type: '上書き', cat: 'バリデーション' },
    { item: '属性「アレルギー」', tenant: '—（未定義）', value: '追加（保健アドオンで使用）', org: '青葉市', type: '追加', cat: '属性項目' },
    { item: '住所の閲覧権限', tenant: '担任・連絡担当', value: '担任のみ', org: '青葉第一中学校', type: '上書き', cat: '権限' },
  ];

  return {
    people: people, orgTree: orgTree, attributes: attributes, forms: forms,
    logs: logs, transfers: transfers, codeSets: codeSets, featureCodes: featureCodes,
    policies: policies, avatarColors: avatarColors,
    addons: addons, dashboards: dashboards, dashAlerts: dashAlerts,
    mapProfiles: mapProfiles, idKeys: idKeys, fieldMatchers: fieldMatchers,
    codeStd: codeStd, orgOverrides: orgOverrides,
  };
})();

/* small render helpers shared by pages */
window.UI = {
  avatar: function (name, opts) {
    opts = opts || {};
    var ch = (name || '?').slice(0, 1);
    var cls = 'avatar' + (opts.size ? ' avatar--' + opts.size : '');
    var style = opts.color ? ' style="background:' + opts.color + '"' : '';
    return '<span class="' + cls + '"' + style + '>' + ch + '</span>';
  },
  statusBadge: function (status) {
    var map = {
      '在籍': 'success', '在職': 'success', '同期済': 'success', 'success': 'success', 'approved': 'success', 'done': 'success', '終了': 'neutral',
      '保留': 'warning', '転入手続中': 'warning', 'partial': 'warning', 'pending': 'warning', '集計中': 'warning', 'scheduled': 'info', 'processing': 'info', '受付中': 'success',
      'アカウント無': 'neutral', '下書き': 'neutral', 'error': 'danger', 'rejected': 'danger',
    };
    var label = {
      success: '完了', error: 'エラー', partial: '一部エラー', processing: '処理中',
      pending: '承認待ち', approved: '承認済', scheduled: '実行待ち', done: '反映済', rejected: '却下',
    };
    var t = map[status] || 'neutral';
    var txt = label[status] || status;
    return '<span class="badge badge--' + t + '"><span class="dot-s"></span>' + txt + '</span>';
  },
  typeBadge: function (type) {
    var map = { '生徒': 'info', '教員': 'violet', '教育委員会': 'teal' };
    return '<span class="badge badge--' + (map[type] || 'neutral') + '">' + type + '</span>';
  },
};
