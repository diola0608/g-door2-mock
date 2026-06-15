# 02. コンポーネント＆パターンカタログ ── Composer EDU

> 「やりたいこと → どのクラス/パターンを使うか」の対応表。**新しい見た目が必要になったら、まずここを探す。**
> ここにあるものは `assets/base.css`（デザイントークン＋コンポーネント）と `assets/app.js`
> （レイアウト自動注入＋`Composer.*` API）に実装済み。各ページは2行リンクして再利用するだけ。

デザインシステム名：**「深藍 × 和紙」**（deep indigo × washi paper）のエンタープライズSaaS。

---

## 1. ページの始め方（ボイラープレート）

すべてのページはこの骨格。`<main>` の中身だけ書けば、**ヘッダーとサイドバーは `app.js` が自動注入**する。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ページ名 | Composer EDU</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="assets/base.css">
<style>
  /* ここはページ固有の“レイアウト用”CSSだけ（grid列指定など）。
     見た目のパーツは base.css にある。再発明しない。 */
</style>
</head>
<body data-page="roster">   <!-- ← サイドバーのどの項目をactiveにするか（app.jsのNAVのidと一致させる） -->
<main>
  <!-- breadcrumb → page-head → コンテンツ -->
</main>
<script src="assets/app.js"></script>   <!-- ← 末尾。これがヘッダー/サイドバー/モーダル等を配線 -->
</body>
</html>
```

- アイコンは **Material Symbols Rounded**：`<span class="material-symbols-rounded">icon_name</span>`。
  修飾：`.sm`(16px) / `.lg`(26px) / `.fill`(塗り)。
- `<body data-page="X">` の `X` は `app.js` の `NAV` 配列の `id`。一致するとサイドバーで `active` 表示になる。

---

## 2. デザイントークン（CSS変数・抜粋）

色は**意味の符号**として使う（[00-principles.md](00-principles.md) §2）。`var(--xxx)` で参照。

| 変数 | 用途 |
|---|---|
| `--ink` / `--ink-2` / `--ink-3` | 文字（濃→淡） |
| `--paper` / `--surface` / `--line` / `--line-2` | 背景 / カード面 / 罫線 |
| `--indigo-900..50` | 主・既定（ヘッダー/サイドバー/primary） |
| `--vermilion` `--vermilion-dark` `--vermilion-50` | 朱：強調・注意・accent操作 |
| `--pine` / `--pine-50` | 松緑：成功・有効・同期済 |
| `--gold` / `--gold-50` | 金：警告・要確認 |
| `--sky` / `--sky-50` | 空：情報・補助 |
| `--plum` / `--plum-50` | 李紫：フォーム/オブジェクト系 |
| `--radius` (10px) `--radius-sm` (7px) | 角丸 |
| `--shadow-sm/md/lg` | 影 |
| `--font` / `--mono` | IBM Plex Sans JP / IBM Plex Mono |
| `--header-h` (56px) `--sidebar-w` (232px) | 骨格寸法 |

数値・ID・日付・コードなどは **等幅** にすると締まる：`class="mono"` か `var(--mono)`。

---

## 3. レイアウトシェル（自動注入）と NAV への項目追加

`app.js` が `DOMContentLoaded` で次を行う：
- グローバルヘッダー `.gh`（ロゴ／テナント切替／横断検索／通知ベル／ヘルプ／ユーザーメニュー）を注入
- サイドバー `.sidebar` を `NAV` 配列から生成（`data-page` と一致する項目を `active`）
- `<main>` に `.main` を付与、`#toast-zone` を追加、ドロップダウン/タブ/モーダルを配線

### サイドバーに新ページを足す ＝ `app.js` の `NAV` を編集
`assets/app.js` 冒頭の `NAV` 配列に項目を追加（既存セクションへ追加 or 新セクション）：

```js
{
  section: "監査・セキュリティ",          // 新セクションの見出し（既存セクションに足すなら不要）
  items: [
    { id: "audit", icon: "policy", label: "監査ログ", href: "audit-log.html", count: 3 },
    // id: data-page と一致 / icon: Material Symbols / count: 任意のバッジ数値
  ],
}
```

これだけで**全ページのサイドバー**に項目が出る（サイドバーは各ページで生成されるため）。
通知・ユーザー情報を変えたいときは `NAV` の下にある `NOTIFICATIONS` 等を編集。

---

## 4. コンポーネント早見表（コピペ＋使いどころ）

### 4.1 ページ骨格

**breadcrumb（パンくず）** — `<main>` の先頭に必ず。
```html
<div class="breadcrumb">
  <a href="index.html">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
  <a href="roster.html">名簿レジストリ</a><span class="material-symbols-rounded">chevron_right</span>
  <span class="here">田中 花子</span>
</div>
```

**page-head（見出し＋説明＋右側アクション）**
```html
<div class="page-head">
  <div>
    <h1><span class="material-symbols-rounded">groups</span>名簿レジストリ</h1>
    <div class="desc">この画面が何で、どんな前提か（権限スコープ等）を1〜2文で。</div>
  </div>
  <div class="actions">
    <button class="btn"><span class="material-symbols-rounded">download</span>エクスポート</button>
    <button class="btn primary" onclick="Composer.openModal('modal-add')"><span class="material-symbols-rounded">add</span>新規</button>
  </div>
</div>
```

### 4.2 ボタン `.btn`
- 既定（白）／`.primary`（インディゴ＝主操作）／`.accent`（朱＝実行・配信など強い操作）/
  `.ghost`（枠なし）／`.danger-ghost`（朱文字・破壊操作）／`.sm`（小）／`disabled`。
```html
<button class="btn primary"><span class="material-symbols-rounded">check</span>保存</button>
<button class="btn accent">配信する</button>
<button class="btn sm ghost">すべて見る</button>
```

### 4.3 データ表示

**card** — 区切られた箱。`card-h`（見出し）＋`card-b`（本文）。
```html
<section class="card">
  <div class="card-h"><span class="material-symbols-rounded">campaign</span>お知らせ
    <span class="sub">補助テキスト</span>
    <div class="right"><a class="btn sm ghost" href="#">一覧</a></div>
  </div>
  <div class="card-b">…</div>
</section>
```

**KPI** — 指標カード。`--accent` で上辺の色を意味付け。`kpi-grid`（既定4列、狭幅で2列）。
```html
<section class="kpi-grid">
  <div class="kpi" style="--accent: var(--vermilion)">
    <div class="k-label"><span class="material-symbols-rounded">error</span>処理エラー</div>
    <div class="k-value">12<small>行</small></div>
    <div class="k-delta down">CSVインポート #JOB-003 で発生</div>
  </div>
</section>
```

**テーブル `.tbl`** — 一覧の基本。ヘッダーは sticky。行の補助クラス：
- `.clickable`（行クリックで遷移：`onclick="location.href='…'"`）
- セル：`.mono`（等幅）／`.num`（右寄せ数値）／`.person`（人の表示）／`tr.masked`（権限外で淡色）
```html
<table class="tbl">
  <thead><tr><th>氏名</th><th>種別</th><th>所属</th><th>Workspace</th></tr></thead>
  <tbody>
    <tr class="clickable" onclick="location.href='roster-detail.html'">
      <td><div class="person"><span class="avatar a2 sm">鈴</span><div><b>鈴木 一郎</b><span>すずき・S-2026-04412</span></div></div></td>
      <td><span class="chip indigo">生徒</span></td>
      <td class="muted">長野市立城山小学校</td>
      <td><span class="sync on"><span class="material-symbols-rounded">cloud_done</span>同期済</span></td>
    </tr>
  </tbody>
</table>
```

**masked-cell** — 閲覧権限のないデータ（空欄にしない！）。
```html
<td><span class="masked-cell"><span class="material-symbols-rounded">visibility_off</span>閲覧権限がありません</span></td>
<!-- 鍵バージョン：<span class="masked-cell"><span class="material-symbols-rounded">key</span>学年主任のみ閲覧可</span> -->
```

**chip（ラベル）** — 色＝意味：`indigo/green/red/gold/sky/plum/line`（点線）。種別・状態・タグに。
```html
<span class="chip green">優良生徒</span> <span class="chip red">いじめ加害者</span> <span class="chip line">スキップ</span>
```

**status（点付きステータス）** — `ok/err/warn/run`(点滅)/`wait`。
```html
<span class="status ok">承認済</span> <span class="status warn">氏名不一致</span> <span class="status run">処理中</span>
```

**sync（同期インジケータ）** — `on`/`off`/`pending`(回転)。
```html
<span class="sync on"><span class="material-symbols-rounded">cloud_done</span>同期済</span>
<span class="sync pending"><span class="material-symbols-rounded">sync</span>反映待ち</span>
```

**avatar** — `a2..a5` で色違い、`.sm`/`.big` でサイズ。`.person` の中で使うことが多い。

### 4.4 構造・ナビゲーション

**tabs（タブ）** — カテゴリ切替に。`data-tabs="名前"` のグループと `data-tab-panel="名前"` のパネルを
同じ名前で対応付ける。切替は `app.js` が自動配線（JS不要）。`active` を初期表示に付ける。
```html
<div class="tabs" data-tabs="cat">
  <button class="tab active" data-tab="basic"><span class="material-symbols-rounded">id_card</span>基本情報</button>
  <button class="tab" data-tab="sensitive"><span class="material-symbols-rounded">lock</span>機微情報<span class="material-symbols-rounded lock">shield_lock</span></button>
</div>
<div class="tab-panel active" data-tab-panel="cat" data-tab="basic">…</div>
<div class="tab-panel" data-tab-panel="cat" data-tab="sensitive">…</div>
```

**tree（組織ツリー）** — `<details>/<summary>` で開閉。`.leaf.active` で選択中。`.cnt` で件数。
```html
<div class="tree">
  <details open>
    <summary><span class="material-symbols-rounded tw">chevron_right</span><span class="material-symbols-rounded">flag</span>長野県（テナント全体）<span class="cnt">214,387</span></summary>
    <div class="leaf active"><span class="material-symbols-rounded">school</span>長野市立城山小学校<span class="cnt">412</span></div>
  </details>
</div>
```

**stepper（ウィザードの進行）** — `.step` に `.done`/`.now`。CSVインポート等の多段処理に。
```html
<div class="stepper">
  <div class="step done"><span class="s-num">1</span><span class="s-meta"><b>ファイル選択</b><span>CSVのアップロード</span></span></div>
  <div class="step now"><span class="s-num">2</span><span class="s-meta"><b>項目マッピング</b><span>CSV列→名簿項目</span></span></div>
  <div class="step"><span class="s-num">3</span><span class="s-meta"><b>本人一致確認</b><span>識別子で照合</span></span></div>
</div>
```

**toolbar（検索/フィルタ帯）** — 一覧の上に。`.search`＋`.select`＋`.sep`。
```html
<div class="toolbar mb-2">
  <div class="search"><span class="material-symbols-rounded">search</span><input placeholder="氏名・メール・職員番号で検索"></div>
  <select class="select" style="width:130px"><option>すべての種別</option></select>
  <div class="sep"></div>
  <span class="muted" style="margin-left:auto">412人中 1–8件</span>
</div>
```

**pagination** — 一覧の下に。`button.cur` が現在ページ。

### 4.5 入力フォーム

**field / input / select / textarea** — ラベル＋必須＋ヒント。
```html
<div class="field">
  <label>氏名<span class="req">必須</span></label>
  <input class="input" placeholder="例: 信州 太郎">
  <div class="hint">補足説明をここに。</div>
</div>
<div class="field"><label>種別</label><select class="select"><option>生徒</option><option>教員</option></select></div>
<div class="field"><label>備考</label><textarea class="input" rows="3"></textarea></div>
```

**checkbox-row（説明付きチェック）** — オプションのオン/オフに最適。
```html
<label class="checkbox-row"><input type="checkbox" checked>
  <span><b>Google Workspace アカウントを発行する</b><span>メールは命名規則で自動生成されます</span></span>
</label>
```

**toggle（スイッチ）** — オン/オフの即時切替表現に。
```html
<label class="toggle"><input type="checkbox" checked><span class="tr"></span></label>
```

### 4.6 オーバーレイ・フィードバック

**modal（モーダル）** — `.modal-backdrop#id` の中に `.modal`。`.wide`（760px）/`.danger`（朱・破壊系）。
開閉は `Composer.openModal('id')` / `Composer.closeModal('id')`。背景クリック・ESCで閉じる（自動配線）。
```html
<div class="modal-backdrop" id="modal-add">
  <div class="modal">
    <div class="modal-h">
      <h3><span class="material-symbols-rounded">person_add</span>名簿に個別登録</h3>
      <button class="x" onclick="Composer.closeModal('modal-add')"><span class="material-symbols-rounded">close</span></button>
    </div>
    <div class="modal-b">…フォーム…</div>
    <div class="modal-f">
      <button class="btn" onclick="Composer.closeModal('modal-add')">キャンセル</button>
      <button class="btn primary" onclick="Composer.closeModal('modal-add'); Composer.toast('登録しました')">登録する</button>
    </div>
  </div>
</div>
```

**callout（注意書きボックス）** — 既定（情報）／`.warn`（警告）／`.error`（エラー）。
権限・同期・継承・バッチの説明に多用。
```html
<div class="callout warn"><span class="material-symbols-rounded">layers</span>
  <div><b>継承モデル</b>: テナントで定義 → 各組織が継承・上書き（下位優先）。</div>
</div>
```

**toast（一時通知）** — 操作結果に。`Composer.toast('保存しました')` / 失敗は `Composer.toast('失敗', 'err')`。

**dropdown（`.dd` / `.dd-menu`）** — ヘッダーの通知・ユーザーメニューで使用。`bindDropdown` で配線。

**timeline（時系列）** — 履歴・お知らせに。`.tl-item.now` が現在/最新。
```html
<div class="timeline">
  <div class="tl-item now"><div class="tl-date">2026-04-01 〜 現在</div><div class="tl-body"><b>クラス</b>: 6年1組へ変更</div></div>
  <div class="tl-item"><div class="tl-date">2025-04-01</div><div class="tl-body"><b>クラス</b>: 5年2組</div></div>
</div>
```

**empty（空状態）** — データ無しに。アイコン＋メッセージ。

### 4.7 簡易チャート（外部ライブラリ不要）
- **bars（横棒）** `.bars > .bar-row(.b-label/.b-track>.b-fill/.b-num)`。`.b-fill` に `.v/.g/.gold` で色。
- **donut（ドーナツ）** `conic-gradient` を `style` で指定、`.d-center` に中央値、`.legend` で凡例。

---

## 5. JavaScript API（`app.js`）

グローバル `Composer`：
- `Composer.openModal(id)` / `Composer.closeModal(id)` — モーダル開閉
- `Composer.toast(msg)` / `Composer.toast(msg, 'err')` — トースト（成功/失敗）

自動配線（自前のJSは基本不要）：
- **タブ**：`[data-tabs]` グループ内の `.tab` クリックで、同名 `[data-tab-panel]` を切替。
- **ドロップダウン**：ヘッダーのベル/ユーザー。
- **モーダル**：背景クリック・ESCで閉じる。
- ページ固有のミニ機能（例：`import.html` のウィザード `wiz.go(n)`）は、そのページの末尾に
  小さな `<script>` を足してよい（ただし base.css のクラスを使う）。

---

## 6. ドメイン複合パターン（“レシピ”。新ページでも一貫させる）

[01-domain-model.md](01-domain-model.md) の概念を画面化する定番。**同じ概念は同じ見た目で**。

### 6.1 権限文章トークン（`.pol-token`）＋シミュレーター
権限・条件を「読める文章」にする。色＝役割：
`subj`(誰が/indigo) `cond`(条件/gold) `scope`(範囲/sky) `obj`(対象/plum) `act`(操作/pine)。
```html
<span class="policy-sentence">
  <span class="pol-token subj"><span class="material-symbols-rounded">person</span>職種 = 一般教員</span>は、
  <span class="pol-token scope"><span class="material-symbols-rounded">door_front</span>自分が担任のクラス</span>の生徒の
  <span class="pol-token obj"><span class="material-symbols-rounded">id_card</span>基本情報</span>を
  <span class="pol-token act"><span class="material-symbols-rounded">edit</span>閲覧・編集</span>できる
</span>
```
> `.pol-token` と `.policy-sentence` は `permissions.html` の `<style>` 内で定義。権限を扱う新ページでは
> その定義をコピーして使う（or 共通化したくなったら base.css へ昇格）。シミュレーター（この人として/この対象を
> 見たら、の判定表）も併せて用意すると価値が上がる。

### 6.2 継承タグ（`.inherit-tag`）
テナント定義か組織独自か上書きかを示す：`tenant`（紺）/`org`（朱）。上書き行は元を取消線で。

### 6.3 マスクセル（§4.3）＋「自分の権限」ペイン
個人詳細などの右ペインに、カテゴリ別の閲覧/編集可否＋根拠ポリシーを置く（`roster-detail.html`）。
```html
<section class="card"><div class="card-h"><span class="material-symbols-rounded">shield_person</span>この名簿へのあなたの権限</div>
  <div class="card-b" style="font-size:12px; display:flex; flex-direction:column; gap:8px;">
    <div class="row between"><span>基本情報</span><span class="chip green">閲覧・編集</span></div>
    <div class="row between"><span>機微情報</span><span class="chip gold">閲覧のみ</span></div>
    <div class="muted mt-1">根拠: ポリシー「県教委システム管理者は全組織を管理できる」</div>
  </div>
</section>
```

### 6.4 組織スコープツリー（左ペイン）
2ペインの左に `tree` を置き、「あなたは○○のため△△を閲覧できます」のスコープ注記（`.scope-note`）を添える。

### 6.5 カテゴリタブ（基本/連絡先/学籍/機微）
名簿系は §4.4 の tabs でカテゴリ切替。機微タブはロックアイコン＋監査callout。

### 6.6 CSVウィザード
`stepper` ＋ 各ステップを `card.wizard-step`（`active` のみ表示）にし、`wiz.go(n)` で進む
（`import.html` 参照）。マッピング行 `.map-row`、識別子行は強調。

### 6.7 属性履歴モーダル＋適用開始日付き編集
値の編集UIには必ず「変更の適用開始日」を置き、「履歴として保存される」と明記。
履歴は適用期間／値／登録者・経路の `tbl` で見せる（`roster-detail.html` の `#modal-history`）。

### 6.8 「いつ反映されるか」表現
保存・実行の結果トーストや確認モーダルに、反映タイミングを必ず入れる：
- 「保存しました。Workspaceへは次回同期（04:00）で反映されます」
- 「ジョブ #JOB-… を登録しました（処理状況・ログで確認できます）」
- 「2026-07-01 のバッチで実行されます」

---

## 7. レスポンシブ
`kpi-grid`/`grid-3`/`grid-2` は `@media (max-width:1100px)` で自動的に列が減る。
独自の2ペイン grid を作るときは、狭幅で1列に落ちるか確認（[00](00-principles.md) のセルフチェック）。
