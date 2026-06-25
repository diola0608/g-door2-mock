/* Dummy data for the EDU platform mock. All values are fictional. */

const D = {};

D.tenant = {
  name: '青葉県教育委員会',
  code: 'AOBA-PREF',
  region: '関東地方',
  gcpProject: 'aoba-edu-prd',
  dbProject: 'aoba-edu-db-prd',
  deployedAt: '2024-04-01',
  workspaceDomain: 'aoba-edu.pref.jp',
  adminEmail: 'admin@aoba-edu.pref.jp',
  schools: 248,
  municipalities: 32,
  students: 96420,
  teachers: 8120,
  staff: 1340,
};

D.user = {
  name: '相澤　直樹',
  role: 'システム管理者',
  org: '青葉県教育委員会 情報政策課',
  email: 'aizawa.n@aoba-edu.pref.jp',
  initials: '相',
  avatarColor: 'amber',
};

D.orgTree = [
  { id:'tenant', name:'青葉県（テナント全体）', type:'テナント', level:0, count:105880, children:[
    { id:'m-shirosato', name:'白里市', type:'市町村', level:1, count:18420, children:[
      { id:'s-shirosato-el', name:'白里市立小学校', type:'学校種', level:2, count:6240, children:[
        { id:'sch-higashi', name:'白里市立東小学校', type:'学校', level:3, count:412, children:[
          { id:'cls-3a', name:'3年A組', type:'クラス', level:4, count:32 }
        ]},
        { id:'sch-nishi', name:'白里市立西小学校', type:'学校', level:3, count:388 },
        { id:'sch-minami', name:'白里市立南小学校', type:'学校', level:3, count:351 },
      ]},
      { id:'s-shirosato-jh', name:'白里市立中学校', type:'学校種', level:2, count:3120, children:[
        { id:'sch-chuo', name:'白里市立中央中学校', type:'学校', level:3, count:298 },
      ]},
      { id:'boe-shirosato', name:'白里市教育委員会', type:'教育委員会', level:2, count:48, children:[
        { id:'dep-jouhou', name:'情報政策課', type:'部署', level:3, count:12 },
        { id:'dep-gimu', name:'義務教育課', type:'部署', level:3, count:9 },
      ]},
    ]},
    { id:'m-aokibashi', name:'青木橋市', type:'市町村', level:1, count:22130, children:[
      { id:'s-aokibashi-el', name:'青木橋市立小学校', type:'学校種', level:2, count:7120 },
      { id:'s-aokibashi-jh', name:'青木橋市立中学校', type:'学校種', level:2, count:3480 },
      { id:'boe-aokibashi', name:'青木橋市教育委員会', type:'教育委員会', level:2, count:52 },
    ]},
    { id:'s-pref-jh', name:'県立中学校', type:'学校種', level:1, count:9840, children:[
      { id:'sch-minamidai', name:'青葉県立南台中等教育学校', type:'学校', level:2, count:612 },
    ]},
    { id:'s-pref-hs', name:'県立高等学校', type:'学校種', level:1, count:14820, children:[
      { id:'sch-kitayama', name:'青葉県立北山高校', type:'学校', level:2, count:942 },
      { id:'sch-aobadai', name:'青葉県立青葉台高校', type:'学校', level:2, count:889 },
    ]},
    { id:'boe-pref', name:'青葉県教育委員会', type:'教育委員会', level:1, count:185, children:[
      { id:'dep-soumu', name:'総務課', type:'部署', level:2, count:18 },
      { id:'dep-jouhou-p', name:'情報政策課', type:'部署', level:2, count:22 },
      { id:'dep-kouiki', name:'広域連携推進室', type:'部署', level:2, count:8 },
    ]},
  ]}
];

/* People (roster) */
D.people = [
  { id:'P1001', name:'佐藤　健一', kana:'サトウ ケンイチ', type:'teacher', role:'一般教員', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組 担任', email:'satou.k@shirosato-el.jp', phone:'090-1234-5678', license:'小学校教諭専修 第12345号', status:'active', sync:'synced', joinDate:'2015-04-01', gender:'男', birth:'1985-03-12', attrs:{ clubAdvisor:'サッカー部', subject:'国語', years:11 }, tags:['担任','部活顧問'] },
  { id:'P1002', name:'田中　美咲', kana:'タナカ ミサキ', type:'teacher', role:'校長', org:'白里市立東小学校', orgId:'sch-higashi', class:'-', email:'tanaka.m@shirosato-el.jp', phone:'090-2345-6789', license:'小学校教諭専修 第09876号', status:'active', sync:'synced', joinDate:'2008-04-01', gender:'女', birth:'1972-07-25', attrs:{ clubAdvisor:'-', subject:'-', years:24 }, tags:['管理職'] },
  { id:'P1003', name:'鈴木　翔太', kana:'スズキ ショウタ', type:'student', role:'生徒', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組', email:'suzuki.s@edu.aoba.jp', phone:'090-3456-7890', license:'-', status:'active', sync:'pending', joinDate:'2024-04-01', gender:'男', birth:'2015-05-18', attrs:{ club:'サッカー部', allergy:'なし', guardian:'鈴木　正樹' }, tags:['サッカー部'] },
  { id:'P1004', name:'高橋　花子', kana:'タカハシ ハナコ', type:'student', role:'生徒', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組', email:'-', phone:'090-4567-8901', license:'-', status:'active', sync:'none', joinDate:'2024-04-01', gender:'女', birth:'2015-08-22', attrs:{ club:'吹奏楽部', allergy:'甲殻類', guardian:'高橋　和也' }, tags:['吹奏楽部'] },
  { id:'P1005', name:'渡辺　大輝', kana:'ワタナベ ダイキ', type:'student', role:'生徒', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組', email:'watanabe.d@edu.aoba.jp', phone:'090-5678-9012', license:'-', status:'active', sync:'synced', joinDate:'2024-04-01', gender:'男', birth:'2015-02-03', attrs:{ club:'-', allergy:'卵', guardian:'渡辺　恵子' }, tags:['不登校'] },
  { id:'P1006', name:'伊藤　彩乃', kana:'イトウ アヤノ', type:'teacher', role:'学年主任', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年 学年主任', email:'itou.a@shirosato-el.jp', phone:'090-6789-0123', license:'小学校教諭専修 第13456号', status:'active', sync:'synced', joinDate:'2010-04-01', gender:'女', birth:'1980-11-30', attrs:{ clubAdvisor:'吹奏楽部', subject:'算数', years:15 }, tags:['学年主任','部活顧問'] },
  { id:'P1007', name:'中村　蓮', kana:'ナカムラ レン', type:'student', role:'生徒', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組', email:'-', phone:'090-7890-1234', license:'-', status:'inactive', sync:'none', joinDate:'2024-04-01', gender:'男', birth:'2015-09-14', attrs:{ club:'サッカー部', allergy:'なし', guardian:'中村　誠' }, tags:['サッカー部','転出予定'] },
  { id:'P1008', name:'小林　结衣', kana:'コバヤシ ユイ', type:'teacher', role:'一般教員', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年B組 担任', email:'kobayashi.y@shirosato-el.jp', phone:'090-8901-2345', license:'小学校教諭一種 第15678号', status:'active', sync:'error', joinDate:'2019-04-01', gender:'女', birth:'1990-04-08', attrs:{ clubAdvisor:'-', subject:'理科', years:6 }, tags:['担任'] },
  { id:'P1009', name:'加藤　翔', kana:'カトウ カケル', type:'student', role:'生徒', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組', email:'katou.k@edu.aoba.jp', phone:'090-9012-3456', license:'-', status:'active', sync:'synced', joinDate:'2024-04-01', gender:'男', birth:'2015-06-25', attrs:{ club:'サッカー部', allergy:'なし', guardian:'加藤　博' }, tags:['優良生徒','サッカー部'] },
  { id:'P1010', name:'山田　結菜', kana:'ヤマダ ユイナ', type:'student', role:'生徒', org:'白里市立東小学校', orgId:'sch-higashi', class:'3年A組', email:'-', phone:'090-0123-4567', license:'-', status:'active', sync:'none', joinDate:'2024-04-01', gender:'女', birth:'2015-12-01', attrs:{ club:'-', allergy:'なし', guardian:'山田　美穂' }, tags:['優良生徒'] },
  { id:'P1011', name:'松本　浩司', kana:'マツモト コウジ', type:'staff', role:'事務職員', org:'白里市教育委員会 情報政策課', orgId:'dep-jouhou', class:'-', email:'matsumoto.k@aoba-edu.pref.jp', phone:'090-1111-2222', license:'-', status:'active', sync:'synced', joinDate:'2012-04-01', gender:'男', birth:'1982-01-15', attrs:{}, tags:[] },
  { id:'P1012', name:'木村　由香', kana:'キムラ ユカ', type:'staff', role:'主査', org:'白里市教育委員会 義務教育課', orgId:'dep-gimu', class:'-', email:'kimura.y@aoba-edu.pref.jp', phone:'090-2222-3333', license:'-', status:'active', sync:'synced', joinDate:'2009-04-01', gender:'女', birth:'1978-09-09', attrs:{}, tags:[] },
];

/* Attribute field definitions */
D.attrGroups = [
  { id:'basic', name:'基本情報', icon:'user', desc:'氏名・生年月日・所属など基本事項', fields:[
    { id:'name', label:'氏名', type:'text-single', required:true, history:true, sensitive:false },
    { id:'kana', label:'氏名（カナ）', type:'text-single', required:true, history:false, sensitive:false },
    { id:'gender', label:'性別', type:'code', code:'C001-gender', required:true, history:false, sensitive:false },
    { id:'birth', label:'生年月日', type:'date', required:true, history:false, sensitive:true },
    { id:'org', label:'所属組織', type:'code', code:'ORG', required:true, history:true, sensitive:false },
    { id:'class', label:'所属クラス', type:'code', code:'CLASS', required:false, history:true, sensitive:false },
    { id:'role', label:'職種', type:'code', code:'C010-role', required:true, history:true, sensitive:false },
  ]},
  { id:'contact', name:'連絡先情報', icon:'phone', desc:'住所・電話番号・緊急連絡先', fields:[
    { id:'zip', label:'郵便番号', type:'text-single', required:false, history:false, sensitive:false },
    { id:'addr', label:'住所', type:'text-single', required:false, history:false, sensitive:true },
    { id:'phone', label:'電話番号', type:'text-single', required:false, history:false, sensitive:true },
    { id:'mobile', label:'携帯電話番号', type:'text-single', required:false, history:true, sensitive:true },
    { id:'email', label:'メールアドレス', type:'text-single', required:false, history:true, sensitive:false },
    { id:'guardian', label:'保護者氏名', type:'text-single', required:false, history:false, sensitive:true },
    { id:'guardian-phone', label:'緊急連絡先', type:'text-single', required:false, history:false, sensitive:true },
  ]},
  { id:'license', name:'免許・資格', icon:'badge', desc:'教員免許番号・研修履歴', fields:[
    { id:'license-no', label:'教員免許番号', type:'text-single', required:false, history:true, sensitive:false },
    { id:'license-type', label:'免許状種類', type:'code', code:'C020-license', required:false, history:true, sensitive:false },
    { id:'subject', label:'担当教科', type:'text-multi', required:false, history:true, sensitive:false },
    { id:'years', label:'勤続年数', type:'number', required:false, history:true, sensitive:false },
    { id:'training', label:'研修受講履歴', type:'text-multi', required:false, history:true, sensitive:false },
  ]},
  { id:'activity', name:'活動・所属', icon:'flag', desc:'部活・委員会・特別活動', fields:[
    { id:'club', label:'所属部活', type:'code', code:'C030-club', required:false, history:true, sensitive:false },
    { id:'club-role', label:'部活動役割', type:'code', code:'C031-clubrole', required:false, history:false, sensitive:false },
    { id:'committee', label:'委員会', type:'text-multi', required:false, history:true, sensitive:false },
    { id:'advisor', label:'部活顧問', type:'code', code:'C030-club', required:false, history:true, sensitive:false },
  ]},
  { id:'sensitive', name:'機微情報', icon:'shield', desc:'いじめ・不登校・特別支援（要権限）', fields:[
    { id:'futoukou', label:'不登校', type:'code', code:'C040-futoukou', required:false, history:true, sensitive:true, permNote:'担任・学年主任のみ閲覧可' },
    { id:'ijime', label:'いじめ', type:'code', code:'C041-ijime', required:false, history:true, sensitive:true, permNote:'学年主任・管理職のみ閲覧可' },
    { id:'allergy', label:'アレルギー', type:'text-multi', required:false, history:true, sensitive:true },
    { id:'support', label:'特別支援', type:'code', code:'C042-support', required:false, history:true, sensitive:true, permNote:'特別支援コーディネーターのみ閲覧可' },
  ]},
  { id:'feature', name:'人物の特徴', icon:'star', desc:'評価タグ（コード管理・詳細権限）', fields:[
    { id:'feature-tag', label:'人物の特徴', type:'code', code:'C050-feature', required:false, history:true, sensitive:true, permNote:'担任・学年主任のみ閲覧可。選択肢ごとに表示制限あり' },
  ]},
];

/* Code masters */
D.codeMasters = [
  { id:'C001', name:'性別', code:'C001-gender', values:[ {code:'M',label:'男'},{code:'F',label:'女'} ] },
  { id:'C010', name:'職種', code:'C010-role', values:[ {code:'T1',label:'一般教員'},{code:'T2',label:'学年主任'},{code:'T3',label:'教頭'},{code:'T4',label:'校長'},{code:'S1',label:'事務職員'},{code:'S2',label:'主査'},{code:'ST',label:'生徒'} ] },
  { id:'C020', name:'免許状種類', code:'C020-license', values:[ {code:'ES',label:'小学校教諭専修'},{code:'E1',label:'小学校教諭一種'},{code:'J1',label:'中学校教諭一種'},{code:'HS',label:'高等学校専修'} ] },
  { id:'C030', name:'部活', code:'C030-club', values:[ {code:'SOC',label:'サッカー部'},{code:'BAS',label:'バスケットボール部'},{code:'BRA',label:'吹奏楽部'},{code:'ART',label:'美術部'} ] },
  { id:'C040', name:'不登校区分', code:'C040-futoukou', values:[ {code:'N',label:'該当なし'},{code:'M1',label:'軽度'},{code:'M2',label:'中度'},{code:'M3',label:'重度'} ] },
  { id:'C041', name:'いじめ', code:'C041-ijime', values:[ {code:'VIC',label:'被害者'},{code:'PER',label:'加害者'},{code:'WIT',label:'目撃者'},{code:'N',label:'該当なし'} ] },
  { id:'C050', name:'人物の特徴', code:'C050-feature', values:[ {code:'GOOD',label:'優良生徒'},{code:'BULLY',label:'いじめ加害者'},{code:'LEAD',label:'リーダー性'},{code:'HELP',label:'補助対象'} ] },
];

/* Permission rules */
D.permRules = [
  { id:'R001', name:'担任の自クラス生徒基本情報', scope:'担任クラス', subject:{ role:'一般教員', cond:'担任である' }, object:{ type:'生徒', scope:'自クラス' }, permissions:['基本情報:閲覧','基本情報:編集'], enabled:true, inherited:true, scopeOrg:'テナント全体' },
  { id:'R002', name:'部活顧問の担当部員連絡先', scope:'担当部活', subject:{ role:'一般教員', cond:'属性「部活顧問」=サッカー部' }, object:{ type:'生徒', scope:'担当学校×担当部活' }, permissions:['連絡先情報:閲覧'], enabled:true, inherited:true, scopeOrg:'テナント全体' },
  { id:'R003', name:'校長の同市町村教員連絡先', scope:'市町村×学校種', subject:{ role:'校長' }, object:{ type:'教員', scope:'同一市町村・同一学校種' }, permissions:['連絡先情報:閲覧'], enabled:true, inherited:true, scopeOrg:'テナント全体' },
  { id:'R004', name:'学年主任の機微情報閲覧', scope:'担当学年', subject:{ role:'学年主任' }, object:{ type:'生徒', scope:'担当学年' }, permissions:['機微情報:閲覧','人物の特徴:閲覧'], enabled:true, inherited:true, scopeOrg:'テナント全体' },
  { id:'R005', name:'いじめ加害者タグの表示制限', scope:'担当学年', subject:{ role:'学年主任' }, object:{ type:'コード値', code:'C050', value:'BULLY' }, permissions:['人物の特徴.いじめ加害者:閲覧'], enabled:true, inherited:true, scopeOrg:'テナント全体' },
  { id:'R006', name:'特別支援コーディネーターの支援情報', scope:'自校', subject:{ role:'特別支援コーディネーター' }, object:{ type:'生徒', scope:'自校' }, permissions:['機微情報.特別支援:閲覧','機微情報.特別支援:編集'], enabled:false, inherited:false, scopeOrg:'白里市教育委員会' },
];

D.permConditions = {
  subjectTypes:[
    { id:'role', name:'職種', type:'code' },
    { id:'attr', name:'属性項目の値', type:'attr' },
    { id:'org', name:'所属組織スコープ', type:'org' },
  ],
  objectTypes:[
    { id:'student', name:'生徒' },
    { id:'teacher', name:'教員' },
    { id:'staff', name:'職員' },
    { id:'code', name:'コード値（選択肢レベル）' },
  ],
  scopes:[
    { id:'self-class', name:'自クラス' },
    { id:'self-grade', name:'担当学年' },
    { id:'self-school', name:'自校' },
    { id:'self-city-type', name:'同一市町村・同一学校種' },
    { id:'self-club', name:'担当部活' },
    { id:'org', name:'組織階層スコープ' },
  ],
  functions:[
    { id:'roster-view', name:'名簿:閲覧' },
    { id:'roster-edit', name:'名簿:編集' },
    { id:'contact-view', name:'連絡先:閲覧' },
    { id:'sensitive-view', name:'機微情報:閲覧' },
    { id:'sensitive-edit', name:'機微情報:編集' },
    { id:'transfer-apply', name:'異動申請' },
    { id:'transfer-approve', name:'異動承認' },
    { id:'import-csv', name:'CSV取込' },
    { id:'form-create', name:'フォーム作成' },
  ],
};

/* Transfers */
D.transfers = [
  { id:'T-2026-0312', person:'中村　蓮', personId:'P1007', from:'白里市立東小学校', to:'青木橋市立桜小学校', effectiveDate:'2026-07-01', applicant:'佐藤　健一', appliedAt:'2026-06-20', status:'pending-approve', approver:'青木橋市教育委員会', canCancel:true, reason:'保護者の転勤に伴う' },
  { id:'T-2026-0308', person:'小林　結衣', personId:'P1008', from:'白里市立東小学校', to:'白里市立西小学校', effectiveDate:'2026-08-20', applicant:'田中　美咲', appliedAt:'2026-06-18', status:'approved', approver:'白里市教育委員会', canCancel:true, reason:'人事異動' },
  { id:'T-2026-0295', person:'加藤　博之', personId:'P2001', from:'青葉県立北山高校', to:'青葉県立青葉台高校', effectiveDate:'2026-04-01', applicant:'県教育委員会', appliedAt:'2026-03-15', status:'executed', approver:'-', canCancel:false, reason:'県人事発令' },
  { id:'T-2026-0315', person:'山田　直樹', personId:'P2002', from:'青木橋市教育委員会', to:'白里市教育委員会 義務教育課', effectiveDate:'2026-07-01', applicant:'山田　直樹', appliedAt:'2026-06-22', status:'pending-apply', approver:'-', canCancel:true, reason:'希望異動' },
  { id:'T-2026-0301', person:'伊藤　彩乃', personId:'P1006', from:'白里市立東小学校', to:'青葉県立南台中等教育学校', effectiveDate:'2026-04-01', applicant:'田中　美咲', appliedAt:'2026-03-10', status:'rejected', approver:'青葉県教育委員会', canCancel:false, reason:'県人事枠不足のため不承認' },
];

D.transferStatusMap = {
  'pending-apply':{ label:'申請中', cls:'info' },
  'pending-approve':{ label:'承認待ち', cls:'warn' },
  'approved':{ label:'承認済（実行待ち）', cls:'ok' },
  'executed':{ label:'実行済', cls:'neutral' },
  'rejected':{ label:'不承認', cls:'danger' },
};

/* Logs */
D.logs = [
  { id:'L-26201', type:'csv-import', person:'佐藤　健一', detail:'生徒名簿 CSV 取込（412件）', status:'success', count:412, errors:0, at:'2026-06-24 14:32', batch:'B-26201' },
  { id:'L-26200', type:'sync-gw', person:'システム', detail:'Google Workspace 同期バッチ', status:'success', count:2840, errors:0, at:'2026-06-24 03:00', batch:'B-26200' },
  { id:'L-26199', type:'csv-import', person:'小林　結衣', detail:'教員名簿 CSV 取込（28件）', status:'partial', count:28, errors:3, at:'2026-06-23 16:48', batch:'B-26199' },
  { id:'L-26198', type:'transfer-batch', person:'システム', detail:'異動バッチ実行（7月1日付）', status:'running', count:18, errors:0, at:'2026-06-25 01:00', batch:'B-26198' },
  { id:'L-26197', type:'csv-import', person:'松本　浩司', detail:'組織マスタ CSV 取込', status:'error', count:0, errors:12, at:'2026-06-22 10:15', batch:'B-26197' },
  { id:'L-26196', type:'form-writeback', person:'システム', detail:'フォーム回答 → 名簿反映', status:'success', count:142, errors:0, at:'2026-06-21 22:30', batch:'B-26196' },
  { id:'L-26195', type:'csv-import', person:'木村　由香', detail:'生徒名簿 CSV 取込（388件）', status:'success', count:388, errors:0, at:'2026-06-20 13:22', batch:'B-26195' },
];

D.logStatusMap = {
  success:{ label:'成功', cls:'ok' },
  partial:{ label:'一部成功', cls:'warn' },
  running:{ label:'処理中', cls:'info' },
  error:{ label:'エラー', cls:'danger' },
};

/* Forms */
D.forms = [
  { id:'F-1001', title:'教員携帯電話番号登録アンケート', status:'open', target:'白里市 小学校 一般教員（68名）', responses:52, total:68, deadline:'2026-07-05', writeback:true, writebackField:'携帯電話番号', owner:'松本　浩司', createdAt:'2026-06-15' },
  { id:'F-1002', title:'2026年度 不登校実態調査', status:'open', target:'白里市 全校 学年主任（48名）', responses:31, total:48, deadline:'2026-07-20', writeback:false, owner:'木村　由香', createdAt:'2026-06-10' },
  { id:'F-1003', title:'部活動指導方針アンケート', status:'closed', target:'白里市 全校 部活顧問（120名）', responses:108, total:120, deadline:'2026-06-15', writeback:false, owner:'佐藤　健一', createdAt:'2026-05-20' },
  { id:'F-1004', title:'特別支援教育ニーズ調査', status:'draft', target:'未設定', responses:0, total:0, deadline:'-', writeback:true, writebackField:'特別支援', owner:'松本　浩司', createdAt:'2026-06-22' },
];

/* Form builder question types */
D.formFieldTypes = [
  { id:'text', name:'テキスト', icon:'type' },
  { id:'textarea', name:'長文テキスト', icon:'align-left' },
  { id:'number', name:'数値', icon:'hash' },
  { id:'radio', name:'単一選択', icon:'circle' },
  { id:'checkbox', name:'複数選択', icon:'check-square' },
  { id:'date', name:'日付', icon:'calendar' },
  { id:'roster-link', name:'名簿連携（書戻し）', icon:'refresh' },
];

/* Dashboard stats */
D.dashStats = [
  { label:'管理対象者', val:'105,880', delta:'+128 (今月)', dcls:'up', strip:'navy', icon:'users' },
  { label:'要対応アラート', val:'4', delta:'CSV取込エラー 1件含む', dcls:'danger', strip:'danger', icon:'alert-triangle' },
  { label:'承認待ち異動', val:'3', delta:'7/1実行予定 2件', dcls:'warn', strip:'amber', icon:'arrow-right-circle' },
  { label:'回答中フォーム', val:'2', delta:'回収率 76%', dcls:'up', strip:'ok', icon:'file-text' },
];

D.alerts = [
  { kind:'danger', icon:'alert-triangle', title:'CSV取込エラー：組織マスタ', msg:'12件のエラー。マスタ未登録の組織コードが含まれます。', at:'2026-06-22 10:15', action:'ログを確認' },
  { kind:'warn', icon:'refresh', title:'一部同期失敗：小林 結衣のアカウント', msg:'Google Workspace 側でアカウントが見つかりません。手動確認が必要です。', at:'2026-06-23 16:48', action:'アカウント管理へ' },
  { kind:'info', icon:'arrow-right-circle', title:'異動バッチ実行予定：7/1', msg:'18名の所属変更が予約されています。7月1日 01:00 に自動実行されます。', at:'2026-06-25 01:00', action:'異動管理へ' },
  { kind:'ok', icon:'check-circle', title:'フォーム回答の名簿反映が完了', msg:'「教員携帯電話番号登録」142件が名簿に反映されました。', at:'2026-06-21 22:30', action:'フォーム管理へ' },
];

D.dashCharts = {
  monthly: [ {m:'1月',v:96200},{m:'2月',v:96450},{m:'3月',v:96780},{m:'4月',v:97200},{m:'5月',v:96980},{m:'6月',v:96420} ],
  byRole: [ {name:'生徒', v:96420, cls:'navy'}, {name:'教員', v:8120, cls:'amber'}, {name:'職員', v:1340, cls:'ok'} ],
};

/* Activity timeline (dashboard) */
D.activity = [
  { when:'14:32', who:'佐藤 健一', what:'生徒名簿 CSV 取込を実行', cls:'ok' },
  { when:'14:05', who:'田中 美咲', what:'中村 蓮の異動申請を承認', cls:'ok' },
  { when:'13:18', who:'システム', what:'Google Workspace 同期バッチ完了', cls:'ok' },
  { when:'12:40', who:'木村 由香', what:'「不登校実態調査」フォームを公開', cls:'info' },
  { when:'11:20', who:'システム', what:'小林 結衣のアカウント同期でエラー', cls:'danger' },
  { when:'10:15', who:'松本 浩司', what:'組織マスタ CSV 取込でエラー発生', cls:'danger' },
  { when:'09:30', who:'相澤 直樹', what:'権限ルール R006 を新規作成', cls:'info' },
  { when:'09:00', who:'システム', what:'日次バッチスケジュール開始', cls:'neutral' },
];

/* Quick launcher tiles */
D.launchers = [
  { id:'roster', title:'名簿管理', desc:'生徒・教員・職員の名簿と属性項目', icon:'users', color:'navy', href:'#/roster' },
  { id:'accounts', title:'アカウント管理', desc:'Google Workspace 同期・ログイン状況', icon:'shield', color:'amber', href:'#/accounts' },
  { id:'permissions', title:'権限設定', desc:'サブジェクト・オブジェクト・スコープ条件', icon:'lock', color:'navy', href:'#/permissions' },
  { id:'forms', title:'フォーム管理', desc:'アンケート作成・集計・名簿反映', icon:'file-text', color:'amber', href:'#/forms' },
  { id:'transfers', title:'異動管理', desc:'所属変更の申請・承認・バッチ実行', icon:'arrow-right-circle', color:'navy', href:'#/transfers' },
  { id:'logs', title:'処理ログ', desc:'CSV取込・同期・名簿反映の状態', icon:'activity', color:'amber', href:'#/logs' },
];

/* CSV import mappings (templates) */
D.csvMappings = [
  { id:'M-001', name:'生徒名簿（標準）', file:'students_std.csv', key:'email', matchRate:98, cols:14, lastUsed:'2026-06-24', type:'生徒' },
  { id:'M-002', name:'教員名簿（標準）', file:'teachers_std.csv', key:'license', matchRate:96, cols:18, lastUsed:'2026-06-23', type:'教員' },
  { id:'M-003', name:'職員名簿（県）', file:'staff_pref.csv', key:'email', matchRate:99, cols:12, lastUsed:'2026-06-20', type:'職員' },
  { id:'M-004', name:'組織マスタ', file:'org_master.csv', key:'org-code', matchRate:0, cols:8, lastUsed:'2026-06-22', type:'組織' },
];

D.csvPreview = {
  headers:['識別ID','氏名','カナ','性別','生年月日','郵便番号','住所','電話番号','保護者','部活コード'],
  sampleRows:[
    ['s001','佐藤 拓海','サトウ タクミ','男','2015-04-12','299-1101','白里市東1-2-3','090-1111-2222','佐藤 正樹','SOC'],
    ['s002','田中 咲良','タナカ サクラ','女','2015-05-08','299-1102','白里市西4-5-6','090-3333-4444','田中 美和','BRA'],
    ['s003','鈴木 蓮','スズキ レン','男','2015-06-15','299-1103','白里市南7-8-9','090-5555-6666','鈴木 健','SOC'],
    ['s004','高橋 凛','タカハシ リン','女','2015-07-20','299-1104','白里市北10-11','090-7777-8888','高橋 誠','ART'],
  ],
};

D.csvFieldMap = [
  { csv:'識別ID', field:'メールアドレス / 識別子', type:'key', status:'ok', note:'識別設定に使用' },
  { csv:'氏名', field:'氏名', type:'text-single', status:'ok', note:'' },
  { csv:'カナ', field:'氏名（カナ）', type:'text-single', status:'ok', note:'' },
  { csv:'性別', field:'性別', type:'code', status:'warn', note:'コードマスター未登録: 不明' },
  { csv:'生年月日', field:'生年月日', type:'date', status:'ok', note:'' },
  { csv:'郵便番号', field:'郵便番号', type:'text-single', status:'ok', note:'' },
  { csv:'住所', field:'住所', type:'text-single', status:'ok', note:'' },
  { csv:'電話番号', field:'電話番号', type:'text-single', status:'ok', note:'' },
  { csv:'保護者', field:'保護者氏名', type:'text-single', status:'ok', note:'' },
  { csv:'部活コード', field:'所属部活', type:'code', status:'ok', note:'C030-club に紐付' },
];

/* Google Workspace sync detail */
D.gwAccounts = [
  { id:'P1001', name:'佐藤 健一', email:'satou.k@shirosato-el.jp', gwStatus:'synced', lastSync:'2026-06-24 03:00', orgUnit:'/shirosato-el/teachers', license:'Workspace Education Plus', issues:0 },
  { id:'P1002', name:'田中 美咲', email:'tanaka.m@shirosato-el.jp', gwStatus:'synced', lastSync:'2026-06-24 03:00', orgUnit:'/shirosato-el/staff', license:'Workspace Education Plus', issues:0 },
  { id:'P1008', name:'小林 結衣', email:'kobayashi.y@shirosato-el.jp', gwStatus:'error', lastSync:'2026-06-23 16:48', orgUnit:'/shirosato-el/teachers', license:'-', issues:1, issue:'アカウント未発見（404）' },
  { id:'P1003', name:'鈴木 翔太', email:'suzuki.s@edu.aoba.jp', gwStatus:'pending', lastSync:'-', orgUnit:'/edu.aoba.jp/students', license:'-', issues:0, issue:'初回同期待ち' },
  { id:'P1011', name:'松本 浩司', email:'matsumoto.k@aoba-edu.pref.jp', gwStatus:'synced', lastSync:'2026-06-24 03:00', orgUnit:'/aoba-edu/boe/jouhou', license:'Workspace Business Standard', issues:0 },
];

D.gwSyncSettings = {
  direction:'このシステム → Google Workspace（一方向）',
  schedule:'毎日 03:00 自動実行',
  scope:'テナント全体（ワークスペースドメイン内）',
  items:[
    { name:'氏名', mapped:'GW ユーザー プロフィール > 氏名', enabled:true },
    { name:'組織所属', mapped:'GW 組織ユニット (OU)', enabled:true },
    { name:'役職（職種）', mapped:'GW ユーザー > 役職 / タイトル', enabled:true },
    { name:'電話番号（公務）', mapped:'GW ユーザー > 電話番号', enabled:true },
    { name:'生徒ロスター情報', mapped:'GW Classroom クラス情報', enabled:false },
  ],
};

/* Settings: tenant + code masters */
D.tenantSettings = {
  orgHierarchy:[
    'テナント全体 > 市町村 > 学校種 > 学校',
    'テナント全体 > 市町村 > 教育委員会 > 部署',
    'テナント全体 > 学校種 > 学校',
    'テナント全体 > 学校',
  ],
  identifierKeys:[
    { name:'メールアドレス', key:'email', scope:'全区分', priority:1 },
    { name:'職員番号', key:'license', scope:'教員・職員', priority:2 },
    { name:'生徒番号', key:'student-no', scope:'生徒', priority:2 },
  ],
  transferApproval:{
    defaultRequiresApproval:true,
    csvBypassFlag:'CSV取込時に「承認不要」チェックで承認フローをスキップ',
    batchSchedule:'発効日 01:00 自動実行',
    exemptRoles:['校長','教育委員会 管理職','システム管理者'],
  },
};

/* Permission inheritance sample */
D.permInheritance = [
  { org:'青葉県（テナント全体）', level:'テナント', rules:6, own:6, inherited:0, mode:'base' },
  { org:'白里市', level:'市町村', rules:7, own:1, inherited:6, mode:'extend' },
  { org:'白里市立小学校', level:'学校種', rules:7, own:0, inherited:7, mode:'inherit' },
  { org:'白里市立東小学校', level:'学校', rules:8, own:1, inherited:7, mode:'extend' },
  { org:'白里市教育委員会', level:'教育委員会', rules:9, own:3, inherited:6, mode:'extend' },
];

window.DUMMY = D;
