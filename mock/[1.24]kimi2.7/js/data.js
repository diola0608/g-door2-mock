/**
 * ダミーデータ
 * 教育委員会向け 名簿・権限・フォーム管理システム モック用
 */

const MOCK_DATA = {
  tenant: { name: "静岡県教育委員会", code: "SHIZUOKA-BOE", domain: "pref.shizuoka.jp" },
  user: {
    name: "山田 太郎",
    email: "yamada.t@pref.shizuoka.jp",
    role: "システム管理者",
    org: "県教育委員会 情報政策課"
  },

  notifications: [
    { id: 1, title: "CSVインポートで2件のエラー", message: "職員番号の形式が不正なデータがあります。ログを確認してください。", type: "error", read: false, date: "2026-06-14 09:23" },
    { id: 2, title: "所属変更申請が承認されました", message: "佐藤 花子 先生の所属変更がB学校により承認されました。", type: "success", read: false, date: "2026-06-13 16:45" },
    { id: 3, title: "Google Workspace同期完了", message: "全アカウントの同期が完了しました。", type: "info", read: true, date: "2026-06-12 05:00" },
    { id: 4, title: "新しいアンケート回答があります", message: "「教員private携帯番号登録」に5件の新規回答があります。", type: "info", read: true, date: "2026-06-11 11:20" }
  ],

  stats: {
    people: 12840,
    teachers: 3840,
    students: 8432,
    guardians: 568,
    syncPending: 3,
    errors: 2,
    transferRequests: 5,
    formsActive: 7
  },

  organizations: [
    { id: "org_root", name: "静岡県（テナント全体）", type: "tenant", parentId: null },
    { id: "org_city_shizuoka", name: "静岡市", type: "city", parentId: "org_root" },
    { id: "org_city_hamamatsu", name: "浜松市", type: "city", parentId: "org_root" },
    { id: "org_city_numazu", name: "沼津市", type: "city", parentId: "org_root" },
    { id: "org_edu_shizuoka", name: "静岡市教育委員会", type: "board", parentId: "org_city_shizuoka" },
    { id: "org_dept_guidance", name: "指導課", type: "department", parentId: "org_edu_shizuoka" },
    { id: "org_dept_info", name: "情報政策課", type: "department", parentId: "org_edu_shizuoka" },
    { id: "org_type_primary", name: "小学校", type: "school_type", parentId: "org_root" },
    { id: "org_type_junior", name: "中学校", type: "school_type", parentId: "org_root" },
    { id: "org_school_chuo", name: "静岡市立中央小学校", type: "school", parentId: "org_city_shizuoka" },
    { id: "org_school_nishi", name: "静岡市立西小学校", type: "school", parentId: "org_city_shizuoka" },
    { id: "org_school_higashi_junior", name: "静岡市立東中学校", type: "school", parentId: "org_city_shizuoka" },
    { id: "org_school_hamamatsu_prim", name: "浜松市立中央小学校", type: "school", parentId: "org_city_hamamatsu" }
  ],

  classes: [
    { id: "cls_c1_1", name: "1年1組", schoolId: "org_school_chuo" },
    { id: "cls_c1_2", name: "1年2組", schoolId: "org_school_chuo" },
    { id: "cls_c2_1", name: "2年1組", schoolId: "org_school_chuo" },
    { id: "cls_c3_1", name: "3年1組", schoolId: "org_school_chuo" },
    { id: "cls_hj_1_1", name: "1年1組", schoolId: "org_school_higashi_junior" },
    { id: "cls_hj_2_1", name: "2年1組", schoolId: "org_school_higashi_junior" }
  ],

  people: [
    {
      id: "p001",
      name: "佐藤 花子",
      type: "teacher",
      email: "sato.h@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: "cls_c1_1",
      position: "一般教員",
      status: "active",
      phone: "090-1234-5678",
      address: "静岡市葵区追手町1-1",
      birthDate: "1985-04-12",
      sex: "女性",
      license: "静岡県 普通教員 第12345号",
      club: "サッカー部",
      features: ""
    },
    {
      id: "p002",
      name: "鈴木 一郎",
      type: "teacher",
      email: "suzuki.i@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: "cls_c2_1",
      position: "学年主任",
      status: "active",
      phone: "080-9876-5432",
      address: "静岡市駿河区南町2-15",
      birthDate: "1978-11-03",
      sex: "男性",
      license: "静岡県 普通教員 第54321号",
      club: "",
      features: ""
    },
    {
      id: "p003",
      name: "高橋 太郎",
      type: "student",
      email: "takahashi.t@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: "cls_c1_1",
      position: "",
      status: "active",
      phone: "",
      address: "静岡市葵区七間町3-8",
      birthDate: "2015-05-20",
      sex: "男性",
      license: "",
      club: "サッカー部",
      features: "優良生徒"
    },
    {
      id: "p004",
      name: "田中 次郎",
      type: "student",
      email: "tanaka.j@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: "cls_c1_1",
      position: "",
      status: "active",
      phone: "",
      address: "静岡市葵区七間町4-12",
      birthDate: "2015-08-14",
      sex: "男性",
      license: "",
      club: "サッカー部",
      features: "いじめ加害者"
    },
    {
      id: "p005",
      name: "伊藤 美咲",
      type: "student",
      email: "ito.m@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: "cls_c2_1",
      position: "",
      status: "active",
      phone: "",
      address: "静岡市駿河区中島町7-3",
      birthDate: "2014-02-28",
      sex: "女性",
      license: "",
      club: "吹奏楽部",
      features: "生徒会役員"
    },
    {
      id: "p006",
      name: "渡辺 校長",
      type: "teacher",
      email: "watanabe.k@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: null,
      position: "校長",
      status: "active",
      phone: "090-1111-2222",
      address: "静岡市駿河区曲町5-21",
      birthDate: "1965-01-10",
      sex: "男性",
      license: "静岡県 教育職員 第00091号",
      club: "",
      features: ""
    },
    {
      id: "p007",
      name: "山本 和夫",
      type: "staff",
      email: "yamamoto.k@pref.shizuoka.jp",
      orgId: "org_dept_info",
      classId: null,
      position: "情報政策課職員",
      status: "active",
      phone: "054-XXX-XXXX",
      address: "静岡市葵区追手町9-6",
      birthDate: "1980-07-07",
      sex: "男性",
      license: "",
      club: "",
      features: ""
    },
    {
      id: "p008",
      name: "中村 誠",
      type: "teacher",
      email: "nakamura.m@edu.city.shizuoka.jp",
      orgId: "org_school_higashi_junior",
      classId: "cls_hj_1_1",
      position: "一般教員",
      status: "active",
      phone: "080-2222-3333",
      address: "静岡市駿河区みずほ4-2",
      birthDate: "1988-09-19",
      sex: "男性",
      license: "静岡県 普通教員 第98765号",
      club: "バスケ部",
      features: ""
    },
    {
      id: "p009",
      name: "小林 愛子",
      type: "guardian",
      email: "kobayashi.a@example.com",
      orgId: "org_school_chuo",
      classId: null,
      position: "保護者",
      status: "active",
      phone: "090-5555-6666",
      address: "静岡市葵区七間町3-8",
      birthDate: "1980-12-01",
      sex: "女性",
      license: "",
      club: "",
      features: ""
    },
    {
      id: "p010",
      name: "加藤 健太",
      type: "student",
      email: "kato.k@edu.city.shizuoka.jp",
      orgId: "org_school_chuo",
      classId: "cls_c1_2",
      position: "",
      status: "inactive",
      phone: "",
      address: "静岡市葵区柚木町2-4",
      birthDate: "2015-03-11",
      sex: "男性",
      license: "",
      club: "茶道部",
      features: ""
    }
  ],

  attributeCategories: [
    { id: "cat_basic", name: "基本情報", icon: "id-card", color: "primary" },
    { id: "cat_contact", name: "連絡先情報", icon: "phone", color: "teal" },
    { id: "cat_sensitive", name: "機微情報", icon: "alert-triangle", color: "danger" },
    { id: "cat_qual", name: "資格・所属", icon: "award", color: "indigo" },
    { id: "cat_custom", name: "カスタム", icon: "tag", color: "amber" }
  ],

  attributes: [
    { id: "attr_name", name: "氏名", categoryId: "cat_basic", dataType: "string", required: true, note: "必須" },
    { id: "attr_sex", name: "性別", categoryId: "cat_basic", dataType: "code", refCode: "sex", note: "コードマスター参照" },
    { id: "attr_birth", name: "生年月日", categoryId: "cat_basic", dataType: "date", required: true, note: "日付" },
    { id: "attr_registry", name: "戸籍", categoryId: "cat_basic", dataType: "string", note: "文字列" },
    { id: "attr_address", name: "住所", categoryId: "cat_contact", dataType: "string", note: "文字列" },
    { id: "attr_phone", name: "電話番号", categoryId: "cat_contact", dataType: "string", note: "正規表現バリデーション" },
    { id: "attr_emergency", name: "緊急連絡先", categoryId: "cat_contact", dataType: "strings", note: "複数文字列" },
    { id: "attr_absence", name: "不登校履歴", categoryId: "cat_sensitive", dataType: "code", refCode: " AbsenceType", note: "履歴管理対象" },
    { id: "attr_bully_victim", name: "いじめ歴（被害）", categoryId: "cat_sensitive", dataType: "code", refCode: "bully", note: "履歴管理対象" },
    { id: "attr_bully_perp", name: "いじめ歴（加害）", categoryId: "cat_sensitive", dataType: "code", refCode: "bully", note: "選択肢制限あり" },
    { id: "attr_allergy", name: "食物アレルギー", categoryId: "cat_sensitive", dataType: "strings", note: "複数文字列" },
    { id: "attr_license", name: "教員免許番号", categoryId: "cat_qual", dataType: "string", note: "教員のみ" },
    { id: "attr_qual", name: "保有資格", categoryId: "cat_qual", dataType: "strings", note: "複数文字列" },
    { id: "attr_club", name: "部活動", categoryId: "cat_custom", dataType: "code", refCode: "club", note: "コードマスター参照" },
    { id: "attr_feature", name: "人物の特徴", categoryId: "cat_custom", dataType: "code", refCode: "feature", note: "選択肢制限あり" }
  ],

  codes: [
    { id: "c_s1", group: "sex", label: "男性", value: "male" },
    { id: "c_s2", group: "sex", label: "女性", value: "female" },
    { id: "c_s3", group: "sex", label: "回答しない", value: "unspecified" },
    { id: "c_club1", group: "club", label: "サッカー部", value: "soccer", restriction: null },
    { id: "c_club2", group: "club", label: "バスケ部", value: "basketball", restriction: null },
    { id: "c_club3", group: "club", label: "吹奏楽部", value: "band", restriction: null },
    { id: "c_club4", group: "club", label: "茶道部", value: "tea", restriction: null },
    { id: "c_club5", group: "club", label: "鉄道研究部", value: "railway", restriction: null },
    { id: "c_feat1", group: "feature", label: "優良生徒", value: "excellent", restriction: null },
    { id: "c_feat2", group: "feature", label: "いじめ加害者", value: "bully_perp", restriction: "学年主任のみ表示" },
    { id: "c_feat3", group: "feature", label: "生徒会役員", value: "council", restriction: null },
    { id: "c_b1", group: "bully", label: "なし", value: "none" },
    { id: "c_b2", group: "bully", label: "軽微", value: "minor" },
    { id: "c_b3", group: "bully", label: "重大", value: "serious" }
  ],

  permissions: [
    {
      id: "perm1",
      name: "担任クラス生徒の基本情報閲覧・編集",
      subject: "職種 = 一般教員",
      object: "担任を持つクラスの生徒",
      resource: "基本情報",
      actions: ["閲覧", "編集"],
      scope: "同一学校",
      inheritedFrom: "テナント全体設定",
      orgId: "org_root"
    },
    {
      id: "perm2",
      name: "部活顧問による担当部活生徒の連絡先閲覧",
      subject: '属性「部活顧問」に値が設定されている先生',
      object: "担当部活に所属する生徒",
      resource: "連絡先情報",
      actions: ["閲覧"],
      scope: "担当学校",
      inheritedFrom: "テナント全体設定",
      orgId: "org_root"
    },
    {
      id: "perm3",
      name: "校長による同一市町村・同一学校種の教員連絡先閲覧",
      subject: "職種 = 校長",
      object: "同一市町村・同一学校種の一般教員",
      resource: "連絡先情報",
      actions: ["閲覧"],
      scope: "同一市町村・同一学校種",
      inheritedFrom: "静岡市教育委員会",
      orgId: "org_edu_shizuoka"
    },
    {
      id: "perm4",
      name: "人物の特徴の閲覧制限（いじめ加害者）",
      subject: "担任 かつ 学年主任",
      object: "生徒",
      resource: "属性項目「人物の特徴」",
      actions: ["閲覧"],
      scope: "同一学校",
      inheritedFrom: "テナント全体設定",
      orgId: "org_root"
    },
    {
      id: "perm5",
      name: "静岡市立中央小学校独自：部活顧問の編集権限",
      subject: "部活顧問",
      object: "担当部活生徒",
      resource: "部活動",
      actions: ["閲覧", "編集"],
      scope: "本校",
      inheritedFrom: "独自設定",
      orgId: "org_school_chuo"
    }
  ],

  forms: [
    {
      id: "f001",
      title: "教員private携帯番号登録",
      description: "災害時の連絡網整備のため、教員全員の自家用携帯番号を登録します。",
      status: "公開中",
      target: "静岡市 小学校 一般教員",
      deadline: "2026-06-30",
      responseCount: 42,
      totalCount: 48,
      canMapToRoster: true,
      mapping: { "自家用携帯番号": "attr_phone" }
    },
    {
      id: "f002",
      title: "小学校教育ICT環境アンケート",
      description: "各小学校のICT端末配備状況・ネットワーク環境について調査します。",
      status: "公開中",
      target: "静岡市 小学校 校長・教頭",
      deadline: "2026-07-15",
      responseCount: 18,
      totalCount: 22,
      canMapToRoster: false,
      mapping: {}
    },
    {
      id: "f003",
      title: "不登校対応に関する実態調査",
      description: "不登校児童生徒の支援状況と課題を把握するためのアンケートです。",
      status: "下書き",
      target: "静岡市 中学校 学年主任",
      deadline: "",
      responseCount: 0,
      totalCount: 0,
      canMapToRoster: true,
      mapping: { "直近の状況": "attr_absence" }
    },
    {
      id: "f004",
      title: "保護者緊急連絡先確認",
      description: "児童生徒の保護者緊急連絡先を年度中に確認します。",
      status: "終了",
      target: "静岡市 小学校 児童保護者",
      deadline: "2026-05-31",
      responseCount: 1560,
      totalCount: 1600,
      canMapToRoster: true,
      mapping: { "緊急連絡先": "attr_emergency" }
    }
  ],

  logs: [
    { id: "log1", type: "CSVインポート", title: "教員名簿一括登録", status: "エラー", requester: "山田 太郎", date: "2026-06-14 09:23", message: "2件の職員番号形式エラー。詳細はダウンロード可能。" },
    { id: "log2", type: "Google Workspace同期", title: "定期同期（全アカウント）", status: "成功", requester: "システム", date: "2026-06-12 05:00", message: "3件の新規アカウント作成、5件の属性更新。" },
    { id: "log3", type: "所属変更", title: "佐藤 花子 先生の異動", status: "承認済み", requester: "佐藤 花子", date: "2026-06-13 16:45", message: "A学校 → B学校。7月1日実行予定。" },
    { id: "log4", type: "CSVインポート", title: "新入生データ取り込み", status: "処理中", requester: "鈴木 一郎", date: "2026-06-14 12:10", message: "バッチ処理実行中。完了まで数分かかります。" },
    { id: "log5", type: "属性項目更新", title: "人物の特徴 選択肢変更", status: "成功", requester: "山田 太郎", date: "2026-06-10 10:00", message: "選択肢「いじめ加害者」に学年主任表示制限を追加。" },
    { id: "log6", type: "所属変更", title: "中村 誠 先生の異動申請", status: "承認待ち", requester: "中村 誠", date: "2026-06-14 08:50", message: "東中学校 → 西小学校。承認期限：6月20日。" },
    { id: "log7", type: "フォーム連携", title: "教員private携帯番号登録 反映", status: "成功", requester: "システム", date: "2026-06-11 11:20", message: "5件の回答を名簿の「電話番号」に反映。" }
  ],

  transfers: [
    { id: "t1", personId: "p001", personName: "佐藤 花子", fromOrgId: "org_school_chuo", toOrgId: "org_school_nishi", date: "2026-07-01", requestedBy: "佐藤 花子", approvedBy: "鈴木 一郎（B学校管理者）", status: "承認済み" },
    { id: "t2", personId: "p008", personName: "中村 誠", fromOrgId: "org_school_higashi_junior", toOrgId: "org_school_nishi", date: "2026-08-01", requestedBy: "中村 誠", approvedBy: "", status: "承認待ち" },
    { id: "t3", personId: "p002", personName: "鈴木 一郎", fromOrgId: "org_school_chuo", toOrgId: "org_dept_guidance", date: "2026-04-01", requestedBy: "校長 渡辺", approvedBy: "教育委員会 指導課長", status: "実行済み" }
  ]
};

/**
 * ユーティリティ
 */
function findOrg(id) { return MOCK_DATA.organizations.find(o => o.id === id); }
function findPerson(id) { return MOCK_DATA.people.find(p => p.id === id); }
function findClass(id) { return MOCK_DATA.classes.find(c => c.id === id); }
function findAttribute(id) { return MOCK_DATA.attributes.find(a => a.id === id); }
function findCode(value) { return MOCK_DATA.codes.find(c => c.value === value); }
function orgPath(orgId) {
  const parts = [];
  let cur = findOrg(orgId);
  while (cur) {
    parts.unshift(cur.name);
    cur = findOrg(cur.parentId);
  }
  return parts.join(" > ");
}
