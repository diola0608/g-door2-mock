/* =========================================================================
   ダミーデータ（連携なし・表示用）
   ========================================================================= */
const TENANT = { name: "山田県 教育委員会", env: "production", project: "gakuto-yamada-pref" };

const ORG_TREE = {
  id: "t", name: "山田県（テナント全体）", type: "県", count: 18420, children: [
    { id: "m1", name: "青葉市", type: "市町村", count: 6120, children: [
      { id: "k1", name: "小学校", type: "学校種", count: 3240, children: [
        { id: "s1", name: "青葉市立第一小学校", type: "学校", count: 540 },
        { id: "s2", name: "青葉市立桜丘小学校", type: "学校", count: 612 },
      ]},
      { id: "k2", name: "中学校", type: "学校種", count: 1980, children: [
        { id: "s3", name: "青葉市立第一中学校", type: "学校", count: 720 },
      ]},
      { id: "e1", name: "青葉市教育委員会", type: "教育委員会", count: 42, children: [
        { id: "d1", name: "学務課", type: "部署", count: 18 },
        { id: "d2", name: "指導課", type: "部署", count: 24 },
      ]},
    ]},
    { id: "m2", name: "緑川町", type: "市町村", count: 2840, children: [
      { id: "k3", name: "小学校", type: "学校種", count: 1620, children: [
        { id: "s4", name: "緑川町立中央小学校", type: "学校", count: 410 },
      ]},
    ]},
    { id: "m3", name: "白岡市", type: "市町村", count: 5310, children: [] },
  ]
};

const PEOPLE = [
  { id:"P-10231", name:"佐藤 美咲", kana:"さとう みさき", role:"生徒", roleType:"student", org:"青葉市立第一小学校", cls:"3年2組", email:"misaki.sato@school.yamada.ed.jp", gsync:true, status:"在籍", grade:"3年", gender:"女", birth:"2016-04-12", phone:"080-1234-xxxx", addr:"青葉市中央2-1", tags:["優良生徒"], club:"なし" },
  { id:"P-10232", name:"鈴木 蓮", kana:"すずき れん", role:"生徒", roleType:"student", org:"青葉市立第一中学校", cls:"2年1組", email:"ren.suzuki@school.yamada.ed.jp", gsync:true, status:"在籍", grade:"2年", gender:"男", birth:"2012-08-30", phone:"090-2233-xxxx", addr:"青葉市東町5-3", tags:["サッカー部"], club:"サッカー部" },
  { id:"P-10233", name:"高橋 結衣", kana:"たかはし ゆい", role:"教員", roleType:"teacher", org:"青葉市立第一小学校", cls:"3年2組(担任)", email:"yui.takahashi@yamada.ed.jp", gsync:true, status:"在職", title:"一般教員", gender:"女", license:"小一種-0291", club:"—" },
  { id:"P-10234", name:"田中 大輔", kana:"たなか だいすけ", role:"教員", roleType:"teacher", org:"青葉市立第一中学校", cls:"—", email:"daisuke.tanaka@yamada.ed.jp", gsync:false, status:"在職", title:"校長", gender:"男", license:"中一種-1102", club:"サッカー部顧問" },
  { id:"P-10235", name:"伊藤 さくら", kana:"いとう さくら", role:"生徒", roleType:"student", org:"青葉市立桜丘小学校", cls:"5年1組", email:"", gsync:false, status:"在籍", grade:"5年", gender:"女", birth:"2014-02-18", phone:"080-5566-xxxx", addr:"青葉市西区1-9", tags:["不登校傾向"], club:"なし" },
  { id:"P-10236", name:"渡辺 颯太", kana:"わたなべ そうた", role:"生徒", roleType:"student", org:"青葉市立第一中学校", cls:"2年1組", email:"sota.watanabe@school.yamada.ed.jp", gsync:true, status:"在籍", grade:"2年", gender:"男", birth:"2012-11-05", phone:"090-7788-xxxx", addr:"青葉市東町8-1", tags:["いじめ加害者"], club:"サッカー部" },
  { id:"P-10237", name:"山本 陽菜", kana:"やまもと ひな", role:"職員", roleType:"staff", org:"青葉市教育委員会 / 学務課", cls:"—", email:"hina.yamamoto@city.yamada.lg.jp", gsync:true, status:"在職", title:"主事", gender:"女", club:"—" },
  { id:"P-10238", name:"中村 健", kana:"なかむら けん", role:"教員", roleType:"teacher", org:"緑川町立中央小学校", cls:"4年3組(担任)", email:"ken.nakamura@yamada.ed.jp", gsync:true, status:"在職", title:"学年主任", gender:"男", license:"小一種-0455", club:"野球部顧問" },
  { id:"P-10239", name:"小林 楓", kana:"こばやし かえで", role:"生徒", roleType:"student", org:"青葉市立桜丘小学校", cls:"5年1組", email:"kaede.kobayashi@school.yamada.ed.jp", gsync:true, status:"在籍", grade:"5年", gender:"女", birth:"2014-06-22", phone:"080-9900-xxxx", addr:"青葉市西区3-4", tags:[], club:"吹奏楽部" },
  { id:"P-10240", name:"加藤 樹", kana:"かとう いつき", role:"生徒", roleType:"student", org:"青葉市立第一中学校", cls:"1年3組", email:"itsuki.kato@school.yamada.ed.jp", gsync:true, status:"在籍", grade:"1年", gender:"男", birth:"2013-09-14", phone:"090-1212-xxxx", addr:"青葉市南町2-2", tags:[], club:"バスケ部" },
];

const ATTR_GROUPS = ["基本情報","連絡先情報","学籍情報","機微情報"];

const ATTRIBUTES = [
  { id:"a1", group:"基本情報", name:"氏名", type:"単一文字列", required:true, validation:"必須・50文字以内", restricted:false },
  { id:"a2", group:"基本情報", name:"生年月日", type:"日付", required:true, validation:"必須", restricted:false },
  { id:"a3", group:"基本情報", name:"性別", type:"コード", required:false, validation:"コード:GENDER", restricted:false },
  { id:"a4", group:"基本情報", name:"所属組織", type:"コード", required:true, validation:"組織ツリー参照", restricted:false },
  { id:"a5", group:"連絡先情報", name:"住所", type:"単一文字列", required:false, validation:"200文字以内", restricted:true },
  { id:"a6", group:"連絡先情報", name:"電話番号", type:"単一文字列", required:false, validation:"電話形式", restricted:true },
  { id:"a7", group:"連絡先情報", name:"自家用携帯番号", type:"単一文字列", required:false, validation:"電話形式", restricted:true, formLinked:true },
  { id:"a8", group:"学籍情報", name:"所属クラス", type:"コード", required:false, validation:"クラスマスター参照", restricted:false },
  { id:"a9", group:"学籍情報", name:"所属する部活", type:"複数文字列", required:false, validation:"—", restricted:false },
  { id:"a10", group:"学籍情報", name:"教員免許番号", type:"単一文字列", required:false, validation:"免許形式", restricted:true },
  { id:"a11", group:"機微情報", name:"人物の特徴", type:"コード", required:false, validation:"コード:PERSON_TRAIT", restricted:true },
  { id:"a12", group:"機微情報", name:"不登校履歴", type:"複数文字列", required:false, validation:"—", restricted:true },
  { id:"a13", group:"機微情報", name:"いじめ履歴", type:"複数文字列", required:false, validation:"—", restricted:true },
];

const CODE_MASTERS = [
  { id:"GENDER", name:"性別", count:4, restricted:false, codes:[
    {code:"1",label:"男",restricted:false},{code:"2",label:"女",restricted:false},{code:"3",label:"その他",restricted:false},{code:"9",label:"回答しない",restricted:false}
  ]},
  { id:"PERSON_TRAIT", name:"人物の特徴", count:3, restricted:true, codes:[
    {code:"PT01",label:"優良生徒",restricted:false, visibleTo:"担任・学年主任"},
    {code:"PT02",label:"いじめ被害者",restricted:true, visibleTo:"学年主任"},
    {code:"PT03",label:"いじめ加害者",restricted:true, visibleTo:"学年主任のみ"},
  ]},
  { id:"CLUB", name:"部活動", count:8, restricted:false, codes:[
    {code:"C1",label:"サッカー部"},{code:"C2",label:"野球部"},{code:"C3",label:"吹奏楽部"},{code:"C4",label:"バスケ部"}
  ]},
];

const ROLES = [
  { id:"r1", name:"一般教員", subjects:42, scope:"担任クラス", desc:"自分が担任を持つクラスの生徒の基本情報を閲覧・編集" },
  { id:"r2", name:"学年主任", subjects:8, scope:"担当学年", desc:"担当学年の生徒の機微情報を含む全項目を閲覧" },
  { id:"r3", name:"校長", subjects:5, scope:"同一市町村・同一学校種", desc:"同一市町村同一学校種の一般教員の連絡先を閲覧" },
  { id:"r4", name:"部活顧問", subjects:12, scope:"属性:部活顧問の値", desc:"担当部に所属する生徒の連絡先情報のみ閲覧" },
  { id:"r5", name:"教育委員会管理者", subjects:6, scope:"テナント全体", desc:"CSV直接インポート・所属変更承認スキップが可能" },
];

const IMPORT_LOGS = [
  { id:"JOB-8842", file:"students_aoba_2026q1.csv", rows:540, ok:528, err:12, status:"completed_with_errors", by:"山本 陽菜", at:"2026-06-25 01:12", type:"名簿更新" },
  { id:"JOB-8841", file:"teacher_transfer.csv", rows:38, ok:38, err:0, status:"completed", by:"田中 大輔", at:"2026-06-24 18:40", type:"所属変更(承認スキップ)" },
  { id:"JOB-8840", file:"new_students.csv", rows:120, ok:0, err:0, status:"processing", by:"山本 陽菜", at:"2026-06-25 02:30", type:"新規登録", progress:64 },
  { id:"JOB-8839", file:"contact_update.csv", rows:210, ok:205, err:5, status:"completed_with_errors", by:"高橋 結衣", at:"2026-06-23 09:15", type:"連絡先更新" },
  { id:"JOB-8838", file:"club_assign.csv", rows:88, ok:88, err:0, status:"completed", by:"中村 健", at:"2026-06-22 14:02", type:"属性更新" },
  { id:"JOB-8837", file:"midori_roster.csv", rows:410, ok:0, err:410, status:"failed", by:"山本 陽菜", at:"2026-06-22 11:30", type:"名簿更新", reason:"ヘッダー不一致" },
];

const TRANSFER_REQS = [
  { id:"TR-301", person:"佐藤 美咲", from:"青葉市立第一小学校", to:"緑川町立中央小学校", effective:"2026-07-01", status:"pending", requester:"高橋 結衣", at:"2026-06-20" },
  { id:"TR-302", person:"加藤 樹", from:"青葉市立第一中学校 1年3組", to:"青葉市立第一中学校 1年1組", effective:"2026-07-01", status:"approved", requester:"田中 大輔", at:"2026-06-18", scheduled:true },
  { id:"TR-303", person:"小林 楓", from:"青葉市立桜丘小学校", to:"青葉市立第一小学校", effective:"2026-08-01", status:"pending", requester:"伊藤 先生", at:"2026-06-22" },
  { id:"TR-304", person:"渡辺 颯太", from:"青葉市立第一中学校", to:"白岡市立南中学校", effective:"2026-04-15", status:"cancelled", requester:"田中 大輔", at:"2026-04-01" },
  { id:"TR-305", person:"中村 健", from:"緑川町立中央小学校", to:"青葉市教育委員会 指導課", effective:"2026-07-15", status:"approved", requester:"教育委員会", at:"2026-06-15", scheduled:true },
];

const FORMS = [
  { id:"F-201", title:"教員 自家用携帯番号 登録依頼", target:"青葉市・小学校・一般教員", responses:38, total:54, status:"open", linked:true, deadline:"2026-06-30", linkAttr:"自家用携帯番号" },
  { id:"F-202", title:"夏季研修 受講希望アンケート", target:"全校・教員", responses:210, total:412, status:"open", linked:false, deadline:"2026-07-10" },
  { id:"F-203", title:"いじめ防止に関する意識調査", target:"中学校・生徒", responses:680, total:720, status:"open", linked:false, deadline:"2026-07-05" },
  { id:"F-204", title:"通学路 安全点検 報告", target:"青葉市・全教員", responses:54, total:54, status:"closed", linked:false, deadline:"2026-06-01" },
];

const NOTIFICATIONS = [
  { type:"err", title:"CSVインポートでエラー", desc:"JOB-8842 で12件の取込エラーがあります", at:"5分前", link:"logs.html" },
  { type:"err", title:"取込ジョブが失敗しました", desc:"JOB-8837 ヘッダー不一致により全件失敗", at:"3日前", link:"logs.html" },
  { type:"warn", title:"承認待ちの所属変更", desc:"2件の変更申請があなたの承認を待っています", at:"1時間前", link:"transfers.html" },
  { type:"info", title:"フォーム回答が締切間近", desc:"「自家用携帯番号 登録依頼」の回答率 70%", at:"本日", link:"forms.html" },
];
