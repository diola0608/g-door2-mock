# リポジトリ全体への指示

このファイルは `mock/` 配下の作業には関係ありません（各LLM比較用のモック生成に影響を与えないため、意図的に最小限にしています）。

- `fable-design/` 配下のファイル（`*.html`, `docs/`, `assets/` など）を編集・拡張する場合は、必ず [`fable-design/AGENTS.md`](fable-design/AGENTS.md) の運用指示を読んでから着手してください。
- 要件の段階的適用は `fable-design/prompt/` の番号と [`applied-history.md`](fable-design/prompt/applied-history.md) で管理します。「プロンプト N を実行」と指示されたときのゲート（前提番号の確認・重複適用の拒否）も AGENTS.md に記載しています。
