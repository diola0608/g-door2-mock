# Composer EDU ── モック拡張キット

教育委員会向けエンタープライズSaaS「**Composer EDU**」のHTML/JSモックと、
**他のLLMでも同じ設計思想でページを追加・拡張できるようにするためのドキュメント一式**です。

「機能が動くだけ」の浅いUIではなく、ユーザーの背景・現場・権限環境を深く推測して作られた
一式のUIを、**誰が作っても再現できる**ようにすることがこのキットの目的です。

---

## なぜ「mockを毎回渡す」必要がないのか

このmockは最初からコンポーネントが**再利用資産**になっています：

- `assets/base.css` … デザイントークン＋全コンポーネント（ボタン/カード/表/タブ/モーダル/チップ…）
- `assets/app.js` … `NAV` 配列からヘッダー＆サイドバーを**自動注入**＋`Composer.*` API

各ページは `<main>` の中身だけ書き、この2ファイルをリンクするだけ。
→ **コンポーネント実装を毎回貼る必要はありません。** 必要なのは「思想・背景・部品の使い方」の知識で、
それを下の `docs/` に資料化しました。

---

## ディレクトリ構成

```
mock/[9.73]fable/
├─ index.html, roster.html, permissions.html, …   ← 既存ページ（15枚）
├─ audit-log.html                                  ← このキットの作法だけで作った実証ページ（監査ログ）
├─ assets/
│  ├─ base.css   ← デザイントークン＋コンポーネント（ソース・オブ・トゥルース）
│  └─ app.js     ← レイアウト自動注入＋NAV＋Composer.* API
├─ _page-template.html   ← 新規ページのコピー元スケルトン
├─ AGENTS.md             ← エージェント型LLM向け運用プロンプト（≒CLAUDE.md）
├─ README.md             ← これ
└─ docs/
   ├─ 00-principles.md          ← 構築思想と“署名的挙動6つ”【最重要】
   ├─ 01-domain-model.md        ← ドメイン背景・用語集
   ├─ 02-component-catalog.md   ← 部品とパターンの早見表
   ├─ 03-add-a-page-playbook.md ← 追加手順とチェックリスト
   └─ 04-chat-llm-prompt.md     ← チャット型LLM 貼り付け用プロンプト
```

---

## 新しいページを作る最短手順

1. `_page-template.html` を複製して新ファイル名にする（例 `training.html`）。
2. `<title>` / breadcrumb / page-head を埋め、`<body data-page="X">` を決める。
3. `assets/app.js` の `NAV` 配列に項目を追加（`id` を `X` と一致）。
4. [`docs/02`](docs/02-component-catalog.md) の部品で本体を組み、`Composer.*` で配線。
5. [`docs/00` のセルフチェック](docs/00-principles.md#5-出力前のセルフチェック合格ライン) で仕上げる。

詳細は [`docs/03-add-a-page-playbook.md`](docs/03-add-a-page-playbook.md)。

---

## LLMに作業を頼むとき（何を渡すか）

| ツール | 渡すもの |
|---|---|
| **エージェント型**（Claude Code / Cursor 等） | リポにアクセスできるので何も貼らなくてよい。[`AGENTS.md`](AGENTS.md) が自動で効く。依頼文だけ。 |
| **チャット型**（リポ非アクセス） | [`docs/04-chat-llm-prompt.md`](docs/04-chat-llm-prompt.md) を貼り、`docs/00–03` ＋ `assets/*` ＋ **最も近い既存ページ1枚** を添付。全mockは不要。 |

---

## プレビュー
静的HTMLなので、各 `*.html` をブラウザで直接開けば動きます（フォント/アイコンはCDN）。
ローカルサーバを使う場合は、このフォルダを配信して `index.html` を開いてください。
