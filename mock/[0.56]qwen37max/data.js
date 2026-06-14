const DUMMY_DATA = {
  tenant: {
    name: "静岡県教育委員会",
    id: "shizuoka-pref",
    plan: "Enterprise",
    workspace: "shizuoka-edu.google.com"
  },

  currentUser: {
    name: "山田 太郎",
    email: "yamada.taro@shizuoka-edu.jp",
    role: "システム管理者",
    org: "静岡県教育委員会 教育政策課",
    avatar: "YT"
  },

  organizations: [
    {
      id: "root",
      name: "静岡県",
      type: "tenant",
      children: [
        {
          id: "city-shizuoka",
          name: "静岡市",
          type: "city",
          children: [
            {
              id: "city-shizuoka-elementary",
              name: "小学校",
              type: "school_type",
              children: [
                { id: "school-aoba", name: "青葉小学校", type: "school", memberCount: 485, staffCount: 28 },
                { id: "school-sakura", name: "桜丘小学校", type: "school", memberCount: 392, staffCount: 24 },
                { id: "school-hikari", name: "光が丘小学校", type: "school", memberCount: 567, staffCount: 32 }
              ]
            },
            {
              id: "city-shizuoka-junior",
              name: "中学校",
              type: "school_type",
              children: [
                { id: "school-tokiwa", name: "常磐中学校", type: "school", memberCount: 312, staffCount: 22 },
                { id: "school-fuji", name: "富士見中学校", type: "school", memberCount: 289, staffCount: 20 }
              ]
            }
          ]
        },
        {
          id: "city-hamamatsu",
          name: "浜松市",
          type: "city",
          children: [
            {
              id: "city-hamamatsu-elementary",
              name: "小学校",
              type: "school_type",
              children: [
                { id: "school-kitano", name: "北野小学校", type: "school", memberCount: 423, staffCount: 26 },
                { id: "school-minami", name: "南小学校", type: "school", memberCount: 356, staffCount: 22 }
              ]
            },
            {
              id: "city-hamamatsu-junior",
              name: "中学校",
              type: "school_type",
              children: [
                { id: "school-naka", name: "中部中学校", type: "school", memberCount: 278, staffCount: 19 }
              ]
            }
          ]
        },
        {
          id: "city-numazu",
          name: "沼津市",
          type: "city",
          children: [
            {
              id: "city-numazu-elementary",
              name: "小学校",
              type: "school_type",
              children: [
                { id: "school-numazu-1", name: "沼津第一小学校", type: "school", memberCount: 345, staffCount: 21 }
              ]
            }
          ]
        },
        {
          id: "edu-committee",
          name: "教育委員会",
          type: "committee",
          children: [
            { id: "dept-policy", name: "教育政策課", type: "department", memberCount: 15 },
            { id: "dept-school", name: "学校教育課", type: "department", memberCount: 22 },
            { id: "dept-social", name: "社会教育課", type: "department", memberCount: 12 },
            { id: "dept-hr", name: "人事課", type: "department", memberCount: 18 }
          ]
        }
      ]
    }
  ],

  people: [
    {
      id: "P001",
      lastName: "田中",
      firstName: "花子",
      lastNameKana: "タナカ",
      firstNameKana: "ハナコ",
      email: "tanaka.hanako@aoba-shizuoka-edu.jp",
      type: "教員",
      role: "一般教員",
      org: "青葉小学校",
      orgId: "school-aoba",
      department: "5年2組",
      position: "担任",
      status: "active",
      joinDate: "2019-04-01",
      birthDate: "1990-05-15",
      gender: "女性",
      phone: "054-XXX-XXXX",
      address: "静岡市葵区XX町X-X-X",
      licenseNumber: "教員免許 小免第12345号",
      club: "バレーボール部",
      syncStatus: "synced",
      lastSync: "2026-06-14 08:30"
    },
    {
      id: "P002",
      lastName: "佐藤",
      firstName: "健一",
      lastNameKana: "サトウ",
      firstNameKana: "ケンイチ",
      email: "sato.kenichi@aoba-shizuoka-edu.jp",
      type: "教員",
      role: "校長",
      org: "青葉小学校",
      orgId: "school-aoba",
      department: "校長室",
      position: "校長",
      status: "active",
      joinDate: "2005-04-01",
      birthDate: "1968-11-22",
      gender: "男性",
      phone: "054-XXX-XXXX",
      address: "静岡市駿河区XX町X-X-X",
      licenseNumber: "教員免許 小免第08912号",
      club: null,
      syncStatus: "synced",
      lastSync: "2026-06-14 08:30"
    },
    {
      id: "P003",
      lastName: "鈴木",
      firstName: "美咲",
      lastNameKana: "スズキ",
      firstNameKana: "ミサキ",
      email: "suzuki.misaki@aoba-shizuoka-edu.jp",
      type: "教員",
      role: "教頭",
      org: "青葉小学校",
      orgId: "school-aoba",
      department: "教頭室",
      position: "教頭",
      status: "active",
      joinDate: "2010-04-01",
      birthDate: "1975-03-08",
      gender: "女性",
      phone: "054-XXX-XXXX",
      address: "静岡市清水区XX町X-X-X",
      licenseNumber: "教員免許 小免第06789号",
      club: "吹奏楽部",
      syncStatus: "synced",
      lastSync: "2026-06-14 08:30"
    },
    {
      id: "P004",
      lastName: "山本",
      firstName: "大輝",
      lastNameKana: "ヤマモト",
      firstNameKana: "ダイキ",
      email: null,
      type: "生徒",
      role: "生徒",
      org: "青葉小学校",
      orgId: "school-aoba",
      department: "5年1組",
      position: null,
      status: "active",
      joinDate: "2022-04-01",
      birthDate: "2014-07-20",
      gender: "男性",
      phone: null,
      address: "静岡市葵区XX町X-X-X",
      licenseNumber: null,
      club: "サッカー部",
      syncStatus: "no_account",
      lastSync: null
    },
    {
      id: "P005",
      lastName: "高橋",
      firstName: "さくら",
      lastNameKana: "タカハシ",
      firstNameKana: "サクラ",
      email: null,
      type: "生徒",
      role: "生徒",
      org: "青葉小学校",
      orgId: "school-aoba",
      department: "5年1組",
      position: null,
      status: "active",
      joinDate: "2022-04-01",
      birthDate: "2014-09-12",
      gender: "女性",
      phone: null,
      address: "静岡市葵区XX町X-X-X",
      licenseNumber: null,
      club: "バスケ部",
      syncStatus: "no_account",
      lastSync: null
    },
    {
      id: "P006",
      lastName: "伊藤",
      firstName: "翔太",
      lastNameKana: "イトウ",
      firstNameKana: "ショウタ",
      email: null,
      type: "生徒",
      role: "生徒",
      org: "青葉小学校",
      orgId: "school-aoba",
      department: "5年2組",
      position: null,
      status: "active",
      joinDate: "2022-04-01",
      birthDate: "2014-04-03",
      gender: "男性",
      phone: null,
      address: "静岡市駿河区XX町X-X-X",
      licenseNumber: null,
      club: "野球部",
      syncStatus: "no_account",
      lastSync: null
    },
    {
      id: "P007",
      lastName: "渡辺",
      firstName: "真理",
      lastNameKana: "ワタナベ",
      firstNameKana: "マリ",
      email: "watanabe.mari@edu-committee-shizuoka.jp",
      type: "教育委員会",
      role: "課長",
      org: "教育政策課",
      orgId: "dept-policy",
      department: "教育政策課",
      position: "課長",
      status: "active",
      joinDate: "2008-04-01",
      birthDate: "1972-12-01",
      gender: "女性",
      phone: "054-XXX-XXXX",
      address: "静岡市葵区XX町X-X-X",
      licenseNumber: null,
      club: null,
      syncStatus: "synced",
      lastSync: "2026-06-14 08:30"
    },
    {
      id: "P008",
      lastName: "中村",
      firstName: "拓也",
      lastNameKana: "ナカムラ",
      firstNameKana: "タクヤ",
      email: "nakamura.takuya@sakura-shizuoka-edu.jp",
      type: "教員",
      role: "一般教員",
      org: "桜丘小学校",
      orgId: "school-sakura",
      department: "3年1組",
      position: "担任",
      status: "active",
      joinDate: "2016-04-01",
      birthDate: "1988-08-14",
      gender: "男性",
      phone: "054-XXX-XXXX",
      address: "静岡市葵区XX町X-X-X",
      licenseNumber: "教員免許 小免第15678号",
      club: "サッカー部",
      syncStatus: "error",
      lastSync: "2026-06-13 14:20"
    },
    {
      id: "P009",
      lastName: "小林",
      firstName: "優子",
      lastNameKana: "コバヤシ",
      firstNameKana: "ユウコ",
      email: "kobayashi.yuko@tokiwa-shizuoka-edu.jp",
      type: "教員",
      role: "一般教員",
      org: "常磐中学校",
      orgId: "school-tokiwa",
      department: "2年A組",
      position: "担任",
      status: "active",
      joinDate: "2014-04-01",
      birthDate: "1985-02-28",
      gender: "女性",
      phone: "054-XXX-XXXX",
      address: "静岡市駿河区XX町X-X-X",
      licenseNumber: "教員免許 中免第23456号",
      club: "テニス部",
      syncStatus: "synced",
      lastSync: "2026-06-14 08:30"
    },
    {
      id: "P010",
      lastName: "加藤",
      firstName: "裕子",
      lastNameKana: "カトウ",
      firstNameKana: "ヒロコ",
      email: "kato.hiroko@kitano-hamamatsu-edu.jp",
      type: "教員",
      role: "一般教員",
      org: "北野小学校",
      orgId: "school-kitano",
      department: "1年1組",
      position: "担任",
      status: "leave",
      joinDate: "2012-04-01",
      birthDate: "1983-06-10",
      gender: "女性",
      phone: "053-XXX-XXXX",
      address: "浜松市中区XX町X-X-X",
      licenseNumber: "教員免許 小免第11234号",
      club: null,
      syncStatus: "synced",
      lastSync: "2026-06-14 08:30"
    }
  ],

  attributeGroups: [
    {
      id: "basic",
      name: "基本情報",
      icon: "person",
      attributes: [
        { id: "name", name: "氏名", type: "string", required: true },
        { id: "name_kana", name: "氏名（カナ）", type: "string", required: true },
        { id: "birth_date", name: "生年月日", type: "date", required: true },
        { id: "gender", name: "性別", type: "code", codeRef: "gender", required: true },
        { id: "org", name: "所属組織", type: "string", required: true },
        { id: "class", name: "クラス", type: "string", required: false }
      ]
    },
    {
      id: "contact",
      name: "連絡先情報",
      icon: "phone",
      attributes: [
        { id: "address", name: "住所", type: "string", required: false },
        { id: "phone", name: "電話番号", type: "string", required: false },
        { id: "mobile", name: "携帯電話番号", type: "string", required: false },
        { id: "emergency_name", name: "緊急連絡先（氏名）", type: "string", required: false },
        { id: "emergency_phone", name: "緊急連絡先（電話）", type: "string", required: false }
      ]
    },
    {
      id: "sensitive",
      name: "機微情報",
      icon: "shield",
      attributes: [
        { id: "bullying", name: "いじめ歴", type: "code", codeRef: "bullying_status", required: false },
        { id: "absentee", name: "不登校歴", type: "code", codeRef: "absentee_status", required: false },
        { id: "special_needs", name: "特別支援", type: "code", codeRef: "special_needs", required: false },
        { id: "household", name: "家庭状況", type: "multi_string", required: false }
      ]
    },
    {
      id: "employment",
      name: "職員情報",
      icon: "work",
      attributes: [
        { id: "license_no", name: "教員免許番号", type: "string", required: false },
        { id: "license_type", name: "免許種別", type: "code", codeRef: "license_type", required: false },
        { id: "position", name: "職位", type: "code", codeRef: "position", required: false },
        { id: "club_advisor", name: "部活顧問", type: "code", codeRef: "club", required: false },
        { id: "subject", name: "担当教科", type: "code", codeRef: "subject", required: false }
      ]
    }
  ],

  attributeHistory: [
    { attribute: "所属組織", value: "青葉小学校", startDate: "2022-04-01", endDate: null, isCurrent: true },
    { attribute: "所属組織", value: "桜丘小学校", startDate: "2019-04-01", endDate: "2022-03-31", isCurrent: false },
    { attribute: "クラス", value: "5年2組", startDate: "2025-04-01", endDate: null, isCurrent: true },
    { attribute: "クラス", value: "4年1組", startDate: "2024-04-01", endDate: "2025-03-31", isCurrent: false },
    { attribute: "部活顧問", value: "バレーボール部", startDate: "2023-04-01", endDate: null, isCurrent: true },
    { attribute: "部活顧問", value: "バスケットボール部", startDate: "2019-04-01", endDate: "2023-03-31", isCurrent: false }
  ],

  forms: [
    {
      id: "F001",
      title: "2026年度 教員研修アンケート",
      description: "令和8年度の教員研修プログラムに関するアンケートです。",
      status: "active",
      target: "全教員",
      targetDetail: "静岡県 > 全学校 > 教員",
      responses: 234,
      totalTarget: 456,
      createdBy: "渡辺 真理",
      createdAt: "2026-05-15",
      deadline: "2026-06-30",
      linkedAttribute: null
    },
    {
      id: "F002",
      title: "緊急連絡先（携帯電話番号）登録のお願い",
      description: "教員の皆様は、自家用の携帯電話番号を登録してください。",
      status: "active",
      target: "全教員",
      targetDetail: "静岡県 > 全学校 > 教員",
      responses: 189,
      totalTarget: 456,
      createdBy: "渡辺 真理",
      createdAt: "2026-06-01",
      deadline: "2026-07-15",
      linkedAttribute: "mobile"
    },
    {
      id: "F003",
      title: "令和8年度 部活動顧問希望調査",
      description: "来年度の部活動顧問の希望を調査します。",
      status: "draft",
      target: "全教員",
      targetDetail: "静岡県 > 全学校 > 教員",
      responses: 0,
      totalTarget: 456,
      createdBy: "山田 太郎",
      createdAt: "2026-06-10",
      deadline: null,
      linkedAttribute: null
    },
    {
      id: "F004",
      title: "2025年度 学校施設点検報告",
      description: "各学校の施設点検結果を報告してください。",
      status: "closed",
      target: "校長",
      targetDetail: "静岡県 > 全学校 > 校長",
      responses: 45,
      totalTarget: 45,
      createdBy: "中村 拓也",
      createdAt: "2025-12-01",
      deadline: "2026-01-31",
      linkedAttribute: null
    }
  ],

  formQuestions: [
    { id: "Q1", type: "radio", question: "研修の内容は業務に役立ちましたか？", options: ["非常に役立った", "役立った", "どちらともいえない", "あまり役立たなかった", "役立たなかった"], required: true },
    { id: "Q2", type: "radio", question: "研修の時間は適切でしたか？", options: ["長すぎた", "やや長かった", "適切だった", "やや短かった", "短すぎた"], required: true },
    { id: "Q3", type: "checkbox", question: "今後受講したい研修テーマを選択してください（複数選択可）", options: ["ICT活用", "特別支援教育", "外国語教育", "プログラミング教育", "メンタルヘルス", "キャリア教育"], required: true },
    { id: "Q4", type: "text", question: "研修の改善点やご意見をお聞かせください", options: [], required: false },
    { id: "Q5", type: "number", question: "研修の満足度を1〜10で評価してください", options: [], required: true }
  ],

  transferRequests: [
    {
      id: "TR001",
      personName: "山本 大輝",
      personId: "P004",
      fromOrg: "青葉小学校",
      toOrg: "桜丘小学校",
      effectiveDate: "2026-07-01",
      requestedBy: "佐藤 健一",
      requestedAt: "2026-06-10",
      status: "pending",
      approvedBy: null,
      approvedAt: null,
      reason: "保護者の転居に伴う転校"
    },
    {
      id: "TR002",
      personName: "田中 花子",
      personId: "P001",
      fromOrg: "青葉小学校",
      toOrg: "光が丘小学校",
      effectiveDate: "2026-09-01",
      requestedBy: "佐藤 健一",
      requestedAt: "2026-06-08",
      status: "approved",
      approvedBy: "鈴木 正男",
      approvedAt: "2026-06-12",
      reason: "人事異動"
    },
    {
      id: "TR003",
      personName: "中村 拓也",
      personId: "P008",
      fromOrg: "桜丘小学校",
      toOrg: "青葉小学校",
      effectiveDate: "2026-04-01",
      requestedBy: "渡辺 真理",
      requestedAt: "2026-03-01",
      status: "completed",
      approvedBy: "佐藤 健一",
      approvedAt: "2026-03-05",
      reason: "定期人事異動"
    },
    {
      id: "TR004",
      personName: "伊藤 翔太",
      personId: "P006",
      fromOrg: "青葉小学校",
      toOrg: "北野小学校",
      effectiveDate: "2026-08-01",
      requestedBy: "佐藤 健一",
      requestedAt: "2026-06-14",
      status: "pending",
      approvedBy: null,
      approvedAt: null,
      reason: "保護者の転勤"
    },
    {
      id: "TR005",
      personName: "高橋 さくら",
      personId: "P005",
      fromOrg: "青葉小学校",
      toOrg: "南小学校",
      effectiveDate: "2026-07-15",
      requestedBy: "佐藤 健一",
      requestedAt: "2026-06-05",
      status: "rejected",
      approvedBy: "田中 明",
      approvedAt: "2026-06-07",
      reason: "転居予定だったがキャンセル"
    }
  ],

  importLogs: [
    { id: "IL001", fileName: "2026年度_新入生名簿.csv", importedBy: "山田 太郎", importedAt: "2026-04-01 09:15", status: "completed", totalRows: 156, successRows: 154, errorRows: 2, type: "名簿インポート" },
    { id: "IL002", fileName: "教員_異動リスト_202604.csv", importedBy: "渡辺 真理", importedAt: "2026-04-01 10:30", status: "completed", totalRows: 23, successRows: 23, errorRows: 0, type: "所属変更（承認不要）" },
    { id: "IL003", fileName: "生徒_連絡先更新_202606.csv", importedBy: "田中 花子", importedAt: "2026-06-10 14:00", status: "processing", totalRows: 89, successRows: 0, errorRows: 0, type: "名簿インポート" },
    { id: "IL004", fileName: "教員_免許情報_2026.csv", importedBy: "山田 太郎", importedAt: "2026-06-12 11:45", status: "error", totalRows: 45, successRows: 38, errorRows: 7, type: "名簿インポート" },
    { id: "IL005", fileName: "年度末_退学者リスト.csv", importedBy: "佐藤 健一", importedAt: "2026-03-25 16:00", status: "completed", totalRows: 12, successRows: 12, errorRows: 0, type: "名簿インポート" }
  ],

  permissionRules: [
    {
      id: "PR001",
      name: "担任教員のクラス閲覧権限",
      description: "担任を持つ教員は、自分のクラスの生徒の基本情報を閲覧・編集できる",
      subject: { type: "role", value: "一般教員" },
      object: { type: "role", value: "生徒" },
      scope: "担任クラス",
      permissions: ["view", "edit"],
      targetPages: ["名簿一覧", "人物詳細"],
      status: "active"
    },
    {
      id: "PR002",
      name: "校長の教員連絡先閲覧権限",
      description: "校長は同一市町村・同一学校種の一般教員の連絡先を閲覧できる",
      subject: { type: "role", value: "校長" },
      object: { type: "role", value: "一般教員" },
      scope: "同一市町村・同一学校種",
      permissions: ["view"],
      targetPages: ["名簿一覧", "人物詳細"],
      status: "active"
    },
    {
      id: "PR003",
      name: "部活顧問の部員連絡先閲覧",
      description: "部活顧問は担当部の生徒の連絡先情報を閲覧できる",
      subject: { type: "attribute", attribute: "部活顧問", value: "any" },
      object: { type: "attribute", attribute: "club", value: "match" },
      scope: "担当学校・担当部",
      permissions: ["view"],
      targetPages: ["名簿一覧", "人物詳細"],
      status: "active"
    },
    {
      id: "PR004",
      name: "教育委員会の全データ閲覧",
      description: "教育委員会は県下の全データを閲覧できる",
      subject: { type: "role", value: "教育委員会" },
      object: { type: "all" },
      scope: "テナント全体",
      permissions: ["view", "edit", "delete"],
      targetPages: ["名簿一覧", "人物詳細", "組織管理", "アカウント管理"],
      status: "active"
    },
    {
      id: "PR005",
      name: "機微情報の閲覧制限",
      description: "機微情報は担任と学年主任のみ閲覧可能",
      subject: { type: "role", value: "担任・学年主任" },
      object: { type: "attribute_group", value: "機微情報" },
      scope: "担任クラス",
      permissions: ["view"],
      targetPages: ["人物詳細"],
      status: "active"
    }
  ],

  codeMasters: [
    {
      id: "gender",
      name: "性別",
      description: "性別の選択肢",
      values: [
        { code: "male", label: "男性", sortOrder: 1, active: true },
        { code: "female", label: "女性", sortOrder: 2, active: true },
        { code: "other", label: "その他", sortOrder: 3, active: true },
        { code: "unknown", label: "不明", sortOrder: 4, active: false }
      ]
    },
    {
      id: "bullying_status",
      name: "いじめ状況",
      description: "いじめに関する状況分類",
      values: [
        { code: "none", label: "なし", sortOrder: 1, active: true },
        { code: "victim", label: "被害者", sortOrder: 2, active: true },
        { code: "perpetrator", label: "加害者", sortOrder: 3, active: true },
        { code: "resolved", label: "解決済み", sortOrder: 4, active: true }
      ]
    },
    {
      id: "absentee_status",
      name: "不登校状況",
      description: "不登校に関する状況分類",
      values: [
        { code: "none", label: "なし", sortOrder: 1, active: true },
        { code: "current", label: "現在不登校", sortOrder: 2, active: true },
        { code: "past", label: "過去に不登校", sortOrder: 3, active: true },
        { code: "resolved", label: "解消", sortOrder: 4, active: true }
      ]
    },
    {
      id: "position",
      name: "職位",
      description: "教職員の職位",
      values: [
        { code: "principal", label: "校長", sortOrder: 1, active: true },
        { code: "vice_principal", label: "教頭", sortOrder: 2, active: true },
        { code: "grade_head", label: "学年主任", sortOrder: 3, active: true },
        { code: "homeroom", label: "担任", sortOrder: 4, active: true },
        { code: "teacher", label: "一般教員", sortOrder: 5, active: true },
        { code: "staff", label: "事務職員", sortOrder: 6, active: true }
      ]
    },
    {
      id: "club",
      name: "部活動",
      description: "部活動の選択肢",
      values: [
        { code: "soccer", label: "サッカー部", sortOrder: 1, active: true },
        { code: "baseball", label: "野球部", sortOrder: 2, active: true },
        { code: "volleyball", label: "バレーボール部", sortOrder: 3, active: true },
        { code: "basketball", label: "バスケットボール部", sortOrder: 4, active: true },
        { code: "tennis", label: "テニス部", sortOrder: 5, active: true },
        { code: "brass_band", label: "吹奏楽部", sortOrder: 6, active: true },
        { code: "art", label: "美術部", sortOrder: 7, active: true },
        { code: "science", label: "科学部", sortOrder: 8, active: true }
      ]
    },
    {
      id: "license_type",
      name: "免許種別",
      description: "教員免許の種別",
      values: [
        { code: "elementary", label: "小学校教諭免許", sortOrder: 1, active: true },
        { code: "junior_high", label: "中学校教諭免許", sortOrder: 2, active: true },
        { code: "high", label: "高等学校教諭免許", sortOrder: 3, active: true },
        { code: "special", label: "特別支援学校教諭免許", sortOrder: 4, active: true }
      ]
    },
    {
      id: "subject",
      name: "担当教科",
      description: "担当教科の選択肢",
      values: [
        { code: "japanese", label: "国語", sortOrder: 1, active: true },
        { code: "math", label: "算数・数学", sortOrder: 2, active: true },
        { code: "science", label: "理科", sortOrder: 3, active: true },
        { code: "social", label: "社会", sortOrder: 4, active: true },
        { code: "english", label: "外国語（英語）", sortOrder: 5, active: true },
        { code: "music", label: "音楽", sortOrder: 6, active: true },
        { code: "art", label: "図工・美術", sortOrder: 7, active: true },
        { code: "pe", label: "体育", sortOrder: 8, active: true },
        { code: "home_ec", label: "家庭科", sortOrder: 9, active: true }
      ]
    }
  ],

  alerts: [
    { id: "A1", type: "error", title: "CSVインポートエラー", message: "教員_免許情報_2026.csv で7件のエラーが発生しました。確認してください。", time: "2時間前", page: "csv-import" },
    { id: "A2", type: "warning", title: "所属変更の承認待ち", message: "2件の所属変更申請が承認待ちです。", time: "1日前", page: "transfers" },
    { id: "A3", type: "info", title: "Google同期エラー", message: "中村 拓也 のGoogle Workspace同期に失敗しました。", time: "2日前", page: "accounts" },
    { id: "A4", type: "info", title: "フォーム回答期限間近", message: "「教員研修アンケート」の回答期限があと15日です。", time: "3時間前", page: "forms" }
  ],

  dashboardStats: {
    totalPeople: 12847,
    totalTeachers: 2456,
    totalStudents: 10234,
    totalStaff: 157,
    totalOrgs: 187,
    activeForms: 2,
    pendingTransfers: 2,
    syncErrors: 3,
    importErrors: 7
  }
};
