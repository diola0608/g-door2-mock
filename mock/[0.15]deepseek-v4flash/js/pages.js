const PAGES = {
  "approvals": `<div class="page-header">
  <div class="page-title-group">
    <h1>承認管理</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>承認管理</span>
    </div>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid">
  <div class="stat-card animate-in">
    <div class="stat-icon amber">⏳</div>
    <div class="stat-value">12</div>
    <div class="stat-label">承認待ち</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon green">✅</div>
    <div class="stat-value">847</div>
    <div class="stat-label">今月承認済</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon red">❌</div>
    <div class="stat-value">23</div>
    <div class="stat-label">却下</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon blue">📅</div>
    <div class="stat-value">7/1</div>
    <div class="stat-label">次回バッチ処理日</div>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active" data-tab="pending">承認待ち</button>
  <button class="tab" data-tab="approved">承認済</button>
  <button class="tab" data-tab="rejected">却下</button>
  <button class="tab" data-tab="scheduled">実行予定</button>
</div>

<div class="tab-content active" data-tab="pending">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>申請ID</th>
          <th>申請者</th>
          <th>種類</th>
          <th>異動元</th>
          <th>異動先</th>
          <th>希望日</th>
          <th>申請日</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0042</span></td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--navy-500),var(--navy-400));display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:600;color:var(--text-primary);">SM</div>
              <span style="color:var(--text-primary);">佐藤 美咲</span>
            </div>
          </td>
          <td><span class="tag tag-blue">所属変更</span></td>
          <td>川口市立中学校</td>
          <td>浦和高校</td>
          <td>2026/07/01</td>
          <td>2026/06/10</td>
          <td>
            <div style="display:flex;gap:4px;">
              <button class="btn btn-emerald btn-sm" data-modal="approve-modal">承認</button>
              <button class="btn btn-secondary btn-sm" data-modal="reject-modal">却下</button>
            </div>
          </td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0041</span></td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),var(--emerald-dark));display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:600;color:white;">YT</div>
              <span style="color:var(--text-primary);">山田 太郎</span>
            </div>
          </td>
          <td><span class="tag tag-blue">所属変更</span></td>
          <td>さいたま市立中央小</td>
          <td>さいたま市立北小</td>
          <td>2026/06/15</td>
          <td>2026/06/08</td>
          <td>
            <div style="display:flex;gap:4px;">
              <button class="btn btn-emerald btn-sm" data-modal="approve-modal">承認</button>
              <button class="btn btn-secondary btn-sm" data-modal="reject-modal">却下</button>
            </div>
          </td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0040</span></td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--terracotta),var(--terracotta-dark));display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:600;color:white;">SI</div>
              <span style="color:var(--text-primary);">鈴木 一郎</span>
            </div>
          </td>
          <td><span class="tag tag-green">属性変更</span></td>
          <td>指導主事</td>
          <td>管理主事</td>
          <td>2026/06/20</td>
          <td>2026/06/05</td>
          <td>
            <div style="display:flex;gap:4px;">
              <button class="btn btn-emerald btn-sm" data-modal="approve-modal">承認</button>
              <button class="btn btn-secondary btn-sm" data-modal="reject-modal">却下</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="approved">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>申請ID</th>
          <th>申請者</th>
          <th>種類</th>
          <th>承認者</th>
          <th>反映予定日</th>
          <th>ステータス</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0038</span></td>
          <td>田中 花子</td>
          <td><span class="tag tag-blue">所属変更</span></td>
          <td>高橋 校長</td>
          <td>2026/07/01</td>
          <td><span class="tag tag-amber">実行待ち</span></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0035</span></td>
          <td>伊藤 誠</td>
          <td><span class="tag tag-green">属性変更</span></td>
          <td>システム</td>
          <td>2026/06/01</td>
          <td><span class="tag tag-green">反映済</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="rejected">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>申請ID</th>
          <th>申請者</th>
          <th>種類</th>
          <th>却下者</th>
          <th>理由</th>
          <th>却下日</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0030</span></td>
          <td>渡辺 健</td>
          <td><span class="tag tag-blue">所属変更</span></td>
          <td>佐藤 教育長</td>
          <td>異動先の受入人数超過</td>
          <td>2026/05/20</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="scheduled">
  <div class="card">
    <div class="card-header">
      <span class="card-title">次回バッチ処理: 2026/07/01 03:00</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>申請ID</th>
            <th>申請者</th>
            <th>異動元</th>
            <th>異動先</th>
            <th>反映日</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0042</span></td>
            <td>佐藤 美咲</td>
            <td>川口市立中学校</td>
            <td>浦和高校</td>
            <td>2026/07/01</td>
            <td><button class="btn btn-secondary btn-sm">取り消し</button></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-muted);font-size:0.8rem;">#AP-2026-0038</span></td>
            <td>田中 花子</td>
            <td>大宮高校</td>
            <td>浦和高校</td>
            <td>2026/07/01</td>
            <td><button class="btn btn-secondary btn-sm">取り消し</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Approve Modal -->
<div class="modal-overlay" id="approve-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>申請を承認</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="alert alert-info">
        <span class="alert-icon">ℹ️</span>
        <div>承認後、異動希望日にバッチ処理で自動反映されます。実行前であれば取り消し可能です。</div>
      </div>
      <div class="form-group">
        <label class="form-label">コメント（任意）</label>
        <textarea class="form-textarea" placeholder="承認コメントを入力"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-emerald modal-close">承認する</button>
    </div>
  </div>
</div>

<!-- Reject Modal -->
<div class="modal-overlay" id="reject-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>申請を却下</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">却下理由 <span style="color:var(--terracotta);">*</span></label>
        <textarea class="form-textarea" placeholder="却下理由を入力してください"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-secondary modal-close">却下する</button>
    </div>
  </div>
</div>`,
  "attributes": `<div class="page-header">
  <div class="page-title-group">
    <h1>属性項目管理</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>属性項目管理</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-primary btn-sm" data-modal="add-attr-def-modal">＋ 新規属性項目</button>
  </div>
</div>

<div class="grid-2-1">
  <div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">属性項目一覧</span>
      </div>
      <div class="table-container" style="border:none;margin:-8px -24px;">
        <table>
          <thead>
            <tr>
              <th>項目名</th>
              <th>データ形式</th>
              <th>コード管理</th>
              <th>履歴</th>
              <th>権限制御</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style="color:var(--text-primary);font-weight:500;">教員免許番号</span></td>
              <td><span class="tag tag-gray">文字列</span></td>
              <td><span class="tag tag-gray">—</span></td>
              <td><span class="tag tag-green">有効</span></td>
              <td><span class="tag tag-orange">要設定</span></td>
              <td><span class="tag tag-green">有効</span></td>
            </tr>
            <tr>
              <td><span style="color:var(--text-primary);font-weight:500;">担当部活</span></td>
              <td><span class="tag tag-gray">複数文字列</span></td>
              <td><span class="tag tag-green">部活マスター</span></td>
              <td><span class="tag tag-green">有効</span></td>
              <td><span class="tag tag-green">設定済</span></td>
              <td><span class="tag tag-green">有効</span></td>
            </tr>
            <tr>
              <td><span style="color:var(--text-primary);font-weight:500;">人物の特徴</span></td>
              <td><span class="tag tag-gray">コード</span></td>
              <td><span class="tag tag-green">人物特徴コード</span></td>
              <td><span class="tag tag-green">有効</span></td>
              <td><span class="tag tag-green">設定済</span></td>
              <td><span class="tag tag-green">有効</span></td>
            </tr>
            <tr>
              <td><span style="color:var(--text-primary);font-weight:500;">勤務評価点</span></td>
              <td><span class="tag tag-gray">数値</span></td>
              <td><span class="tag tag-gray">—</span></td>
              <td><span class="tag tag-green">有効</span></td>
              <td><span class="tag tag-orange">要設定</span></td>
              <td><span class="tag tag-green">有効</span></td>
            </tr>
            <tr>
              <td><span style="color:var(--text-primary);font-weight:500;">所有資格</span></td>
              <td><span class="tag tag-gray">複数文字列</span></td>
              <td><span class="tag tag-amber">資格マスター</span></td>
              <td><span class="tag tag-green">有効</span></td>
              <td><span class="tag tag-gray">未設定</span></td>
              <td><span class="tag tag-amber">下書き</span></td>
            </tr>
            <tr>
              <td><span style="color:var(--text-primary);font-weight:500;">戸籍情報</span></td>
              <td><span class="tag tag-gray">文字列</span></td>
              <td><span class="tag tag-gray">—</span></td>
              <td><span class="tag tag-red">無効</span></td>
              <td><span class="tag tag-red">要設定</span></td>
              <td><span class="tag tag-red">無効</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div>
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">コードマスター一覧</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <div>
            <div style="font-size:0.85rem;color:var(--text-primary);">部活マスター</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">12 コード</div>
          </div>
          <button class="btn btn-ghost btn-sm">管理</button>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <div>
            <div style="font-size:0.85rem;color:var(--text-primary);">人物特徴コード</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">8 コード</div>
          </div>
          <button class="btn btn-ghost btn-sm">管理</button>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">
          <div>
            <div style="font-size:0.85rem;color:var(--text-primary);">職種コード</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">24 コード</div>
          </div>
          <button class="btn btn-ghost btn-sm">管理</button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">コード詳細: 人物特徴コード</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-primary);">優良生徒</span>
          <span class="tag tag-green">担任以上</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-primary);">要支援</span>
          <span class="tag tag-orange">担任以上</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-primary);">いじめ加害者</span>
          <span class="tag tag-red">学年主任のみ</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
          <span style="font-size:0.85rem;color:var(--text-primary);">いじめ被害者</span>
          <span class="tag tag-red">学年主任のみ</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Add Attribute Definition Modal -->
<div class="modal-overlay" id="add-attr-def-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>新規属性項目</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">項目名</label>
        <input class="form-input" placeholder="例: 出身中学校">
      </div>
      <div class="form-group">
        <label class="form-label">データ形式</label>
        <select class="form-select">
          <option>文字列（単一）</option>
          <option>文字列（複数）</option>
          <option>数値</option>
          <option>日付</option>
          <option>コード（マスター参照）</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">履歴管理</label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
          <input type="checkbox" checked style="accent-color:var(--terracotta);"> 変更履歴を有効にする
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">バリデーション設定</label>
        <div style="display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
            <input type="checkbox" style="accent-color:var(--terracotta);"> 必須項目
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
            <input type="checkbox" style="accent-color:var(--terracotta);"> 重複禁止
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
            <input type="checkbox" style="accent-color:var(--terracotta);"> 最大文字数制限
            <input class="form-input" style="width:80px;" placeholder="255">
          </label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">作成する</button>
    </div>
  </div>
</div>`,
  "csv-import": `<div class="page-header">
  <div class="page-title-group">
    <h1>CSVインポート</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>CSVインポート</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-primary btn-sm" data-modal="import-modal">📥 新規インポート</button>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active" data-tab="mapping">マッピング設定</button>
  <button class="tab" data-tab="history">インポート履歴</button>
  <button class="tab" data-tab="identifiers">識別子設定</button>
</div>

<div class="tab-content active" data-tab="mapping">
  <div class="card" style="margin-bottom:20px;">
    <div class="card-header">
      <span class="card-title">保存済みマッピング設定</span>
      <button class="btn btn-secondary btn-sm" data-modal="new-mapping-modal">＋ 新規マッピング</button>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>マッピング名</th>
            <th>対象</th>
            <th>識別子</th>
            <th>最終使用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">新任教員インポート</span></td>
            <td>教員</td>
            <td>職員番号</td>
            <td>2026/06/10</td>
            <td>
              <button class="btn btn-ghost btn-sm">使用</button>
              <button class="btn btn-ghost btn-sm">✏️</button>
            </td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">新入生インポート</span></td>
            <td>生徒</td>
            <td>Eメール</td>
            <td>2026/04/01</td>
            <td>
              <button class="btn btn-ghost btn-sm">使用</button>
              <button class="btn btn-ghost btn-sm">✏️</button>
            </td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">保護者連絡先更新</span></td>
            <td>保護者</td>
            <td>Eメール</td>
            <td>2026/06/12</td>
            <td>
              <button class="btn btn-ghost btn-sm">使用</button>
              <button class="btn btn-ghost btn-sm">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">マッピング詳細: 新任教員インポート</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>CSV項目</th>
            <th>→</th>
            <th>システム項目</th>
            <th>データ形式</th>
            <th>変換ルール</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="tag tag-blue">職員番号</span></td>
            <td>→</td>
            <td><span style="color:var(--text-primary);">職員番号（識別子）</span></td>
            <td><span class="tag tag-gray">文字列</span></td>
            <td>—</td>
          </tr>
          <tr>
            <td><span class="tag tag-blue">氏名</span></td>
            <td>→</td>
            <td><span style="color:var(--text-primary);">氏名</span></td>
            <td><span class="tag tag-gray">文字列</span></td>
            <td>—</td>
          </tr>
          <tr>
            <td><span class="tag tag-blue">メールアドレス</span></td>
            <td>→</td>
            <td><span style="color:var(--text-primary);">メールアドレス</span></td>
            <td><span class="tag tag-gray">文字列</span></td>
            <td>小文字に変換</td>
          </tr>
          <tr>
            <td><span class="tag tag-blue">生年月日</span></td>
            <td>→</td>
            <td><span style="color:var(--text-primary);">生年月日</span></td>
            <td><span class="tag tag-gray">日付</span></td>
            <td>YYYY/MM/DD 形式</td>
          </tr>
          <tr>
            <td><span class="tag tag-blue">所属学校コード</span></td>
            <td>→</td>
            <td><span style="color:var(--text-primary);">所属組織</span></td>
            <td><span class="tag tag-gray">コード</span></td>
            <td>組織マスター参照</td>
          </tr>
          <tr>
            <td><span class="tag tag-blue">教員免許番号</span></td>
            <td>→</td>
            <td><span style="color:var(--text-primary);">属性: 教員免許番号</span></td>
            <td><span class="tag tag-gray">文字列</span></td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="history">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ファイル名</th>
          <th>インポート日時</th>
          <th>種別</th>
          <th>総件数</th>
          <th>成功</th>
          <th>エラー</th>
          <th>ステータス</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-primary);">2026年度_新入生名簿.csv</span></td>
          <td>2026/06/11 14:23</td>
          <td><span class="tag tag-blue">新規登録</span></td>
          <td>1,284</td>
          <td>1,284</td>
          <td>0</td>
          <td><span class="tag tag-green">完了</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-primary);">2026年度_新任教員一覧.csv</span></td>
          <td>2026/06/12 11:23</td>
          <td><span class="tag tag-blue">新規登録</span></td>
          <td>156</td>
          <td>133</td>
          <td>23</td>
          <td><span class="tag tag-red">エラー</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-primary);">保護者連絡先一覧.csv</span></td>
          <td>2026/06/12 13:00</td>
          <td><span class="tag tag-green">更新</span></td>
          <td>2,100</td>
          <td>342</td>
          <td>0</td>
          <td><span class="tag tag-amber">処理中</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-primary);">2025年度_教員異動一覧.csv</span></td>
          <td>2026/03/31 09:00</td>
          <td><span class="tag tag-orange">所属変更</span></td>
          <td>847</td>
          <td>832</td>
          <td>15</td>
          <td><span class="tag tag-green">完了</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="identifiers">
  <div class="card">
    <div class="card-header">
      <span class="card-title">識別子設定</span>
      <button class="btn btn-secondary btn-sm">✏️ 編集</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="padding:12px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
        <div style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">同一人物の識別に使用する項目</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">CSVインポート時に同一人物を特定するための基準です。以下の項目がすべて一致する場合、同一人物とみなします。</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <input type="checkbox" checked style="accent-color:var(--terracotta);"> 職員番号
          <span style="font-size:0.75rem;color:var(--text-muted);margin-left:8px;">（教員・職員の場合）</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <input type="checkbox" checked style="accent-color:var(--terracotta);"> Eメールアドレス
        </label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <input type="checkbox" style="accent-color:var(--terracotta);"> 氏名 + 生年月日
        </label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;">
          <input type="checkbox" style="accent-color:var(--terracotta);"> 外部ID（連携システム用）
        </label>
      </div>
    </div>
  </div>
</div>

<!-- Import Modal -->
<div class="modal-overlay" id="import-modal">
  <div class="modal" style="max-width:560px;">
    <div class="modal-header">
      <h2>CSVインポート</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">マッピング設定</label>
        <select class="form-select">
          <option>新任教員インポート</option>
          <option>新入生インポート</option>
          <option>保護者連絡先更新</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">CSVファイル</label>
        <div style="border:2px dashed var(--border);border-radius:var(--radius-md);padding:32px;text-align:center;cursor:pointer;transition:all var(--transition-fast);">
          <div style="font-size:2rem;margin-bottom:8px;">📁</div>
          <div style="font-size:0.85rem;color:var(--text-secondary);">クリックしてファイルを選択</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">またはドラッグ＆ドロップ</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;gap:8px;">
          <input type="checkbox" style="accent-color:var(--terracotta);"> 所属変更の承認をスキップする
        </label>
        <div class="form-hint">権限設定で許可されている場合、所属変更が即時反映されます。</div>
      </div>
      <div class="form-group">
        <label class="form-label">インポート種別</label>
        <select class="form-select">
          <option>新規登録 + 更新</option>
          <option>新規のみ（重複スキップ）</option>
          <option>更新のみ（存在しない場合はスキップ）</option>
          <option>所属変更のみ</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">インポート開始</button>
    </div>
  </div>
</div>

<!-- New Mapping Modal -->
<div class="modal-overlay" id="new-mapping-modal">
  <div class="modal" style="max-width:560px;">
    <div class="modal-header">
      <h2>新規マッピング設定</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">マッピング名</label>
        <input class="form-input" placeholder="例: 非常勤講師インポート">
      </div>
      <div class="form-group">
        <label class="form-label">対象種別</label>
        <select class="form-select">
          <option>教員</option>
          <option>生徒</option>
          <option>保護者</option>
          <option>職員</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">識別子</label>
        <select class="form-select">
          <option>職員番号</option>
          <option>Eメールアドレス</option>
          <option>外部ID</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">CSVヘッダー行サンプル</label>
        <textarea class="form-textarea" rows="3" placeholder="職員番号,氏名,メールアドレス,生年月日,所属学校コード,教員免許番号"></textarea>
        <div class="form-hint">1行目を貼り付けると自動で項目マッピングを提案します</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">マッピングを作成</button>
    </div>
  </div>
</div>`,
  "dashboard": `<div class="page-header">
  <div class="page-title-group">
    <h1>ダッシュボード</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>ダッシュボード</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm" onclick="App.loadPage('logs')">
      📜 最近の処理
    </button>
    <button class="btn btn-primary btn-sm" onclick="App.loadPage('csv-import')">
      📥 CSVインポート
    </button>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid">
  <div class="stat-card animate-in">
    <div class="stat-icon blue">👥</div>
    <div class="stat-value">48,392</div>
    <div class="stat-label">登録人物総数</div>
    <div class="stat-trend up">↑ 124 (今月)</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon green">🏫</div>
    <div class="stat-value">847</div>
    <div class="stat-label">組織数</div>
    <div class="stat-trend up">↑ 3 (今月)</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon orange">📋</div>
    <div class="stat-value">23</div>
    <div class="stat-label">アクティブなフォーム</div>
    <div class="stat-trend up">↑ 5 (今週)</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon amber">⏳</div>
    <div class="stat-value">12</div>
    <div class="stat-label">承認待ち申請</div>
    <div class="stat-trend down">↑ 4 (要対応)</div>
  </div>
</div>

<!-- Main Grid -->
<div class="grid-2-1">
  <!-- Left: Recent Activity & Alerts -->
  <div>
    <!-- Alerts -->
    <div class="alert alert-error animate-in">
      <span class="alert-icon">⚠️</span>
      <div>
        <strong>CSVインポートでエラーが発生しました</strong><br>
        2026/06/12 11:23 — 「2026年度_新任教員一覧.csv」の処理中に 23 件のエラーが検出されました。
        <a href="#" data-page="logs" style="margin-left:8px;">詳細を見る →</a>
      </div>
    </div>

    <div class="alert alert-warning animate-in">
      <span class="alert-icon">🔔</span>
      <div>
        <strong>Google Workspace 同期が保留中です</strong><br>
        前回の同期から 72 時間が経過しています。手動同期を推奨します。
        <a href="#" data-page="sync" style="margin-left:8px;">同期を実行 →</a>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">クイックアクション</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <button class="btn btn-secondary" onclick="App.loadPage('roster')" style="justify-content:flex-start;">
          <span>👤</span> 人物を検索
        </button>
        <button class="btn btn-secondary" onclick="App.loadPage('csv-import')" style="justify-content:flex-start;">
          <span>📥</span> CSVをインポート
        </button>
        <button class="btn btn-secondary" onclick="App.loadPage('forms')" style="justify-content:flex-start;">
          <span>📋</span> フォームを作成
        </button>
        <button class="btn btn-secondary" onclick="App.loadPage('organization')" style="justify-content:flex-start;">
          <span>🏛</span> 組織を管理
        </button>
      </div>
    </div>

    <!-- Pending Approvals -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">承認待ち申請</span>
        <a href="#" data-page="approvals" style="font-size:0.8rem;">すべて見る →</a>
      </div>
      <div class="table-container" style="border:none;margin:-8px -24px;">
        <table>
          <thead>
            <tr>
              <th>申請者</th>
              <th>種類</th>
              <th>対象</th>
              <th>希望日</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-link" onclick="App.loadPage('approvals')">
              <td><strong style="color:var(--text-primary)">佐藤 美咲</strong><br><span style="font-size:0.75rem;color:var(--text-muted)">川口市立中学校</span></td>
              <td><span class="tag tag-blue">所属変更</span></td>
              <td>川口市立高校 → 浦和高校</td>
              <td>2026/07/01</td>
              <td><span class="tag tag-amber">承認待ち</span></td>
            </tr>
            <tr class="table-row-link" onclick="App.loadPage('approvals')">
              <td><strong style="color:var(--text-primary)">山田 太郎</strong><br><span style="font-size:0.75rem;color:var(--text-muted)">さいたま市立小学校</span></td>
              <td><span class="tag tag-blue">所属変更</span></td>
              <td>さいたま市立中央小 → さいたま市立北小</td>
              <td>2026/06/15</td>
              <td><span class="tag tag-amber">承認待ち</span></td>
            </tr>
            <tr class="table-row-link" onclick="App.loadPage('approvals')">
              <td><strong style="color:var(--text-primary)">鈴木 一郎</strong><br><span style="font-size:0.75rem;color:var(--text-muted)">埼玉県教育委員会</span></td>
              <td><span class="tag tag-green">属性変更</span></td>
              <td>職種: 指導主事 → 管理主事</td>
              <td>2026/06/20</td>
              <td><span class="tag tag-amber">承認待ち</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Right: Recent Imports & System Status -->
  <div>
    <!-- Recent Imports -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">最近のインポート</span>
        <a href="#" data-page="csv-import" style="font-size:0.8rem;">詳細 →</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:rgba(42,157,143,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">✅</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.85rem;color:var(--text-primary);">2026年度_新入生名簿.csv</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">1,284 件処理済み • 完了</div>
          </div>
          <span class="tag tag-green">成功</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:rgba(212,90,58,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">❌</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.85rem;color:var(--text-primary);">2026年度_新任教員一覧.csv</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">23 件エラー • 要確認</div>
          </div>
          <span class="tag tag-red">エラー</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:8px 0;">
          <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:rgba(233,196,106,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">⏳</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.85rem;color:var(--text-primary);">保護者連絡先一覧.csv</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">処理中... 342/2,100 件</div>
          </div>
          <span class="tag tag-amber">処理中</span>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">システムステータス</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">Google Workspace 同期</span>
          <span class="tag tag-green">正常</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">データベース接続</span>
          <span class="tag tag-green">正常</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">バッチ処理キュー</span>
          <span class="tag tag-amber">12 件待機中</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">最終バックアップ</span>
          <span class="tag tag-green">2026/06/12 03:00</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">テナント</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">埼玉県 (prod-saitama)</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  "form-detail": `<div class="page-header">
  <div class="page-title-group">
    <h1>フォーム詳細</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <a href="#" data-page="forms">フォーム / アンケート</a>
      <span class="sep">/</span>
      <span>2026年度 教員携帯電話番号登録</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm">✏️ 編集</button>
    <button class="btn btn-primary btn-sm">📊 集計を見る</button>
  </div>
</div>

<div class="grid-2-1">
  <div>
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">フォーム情報</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">タイトル</span>
          <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">2026年度 教員携帯電話番号登録</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">説明</span>
          <span style="font-size:0.85rem;color:var(--text-secondary);text-align:right;max-width:300px;">教員の自家用携帯電話番号を登録してください。登録された情報は名簿に自動反映されます。</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">対象</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">埼玉県内 全小中学校 一般教諭</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">期間</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">2026/06/01 〜 2026/07/15</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">名簿連携</span>
          <span class="tag tag-green">有効（携帯電話 → 連絡先.携帯電話）</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">設問一覧</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="padding:14px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="tag tag-blue">Q1</span>
            <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">メールアドレス</span>
            <span style="font-size:0.75rem;color:var(--text-muted);">（自動入力）</span>
          </div>
          <div style="font-size:0.8rem;color:var(--text-muted);">回答者のメールアドレス（自動取得）</div>
        </div>
        <div style="padding:14px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="tag tag-blue">Q2</span>
            <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">携帯電話番号</span>
            <span style="font-size:0.75rem;color:var(--text-muted);">（必須）</span>
          </div>
          <div style="font-size:0.8rem;color:var(--text-muted);">自家用の携帯電話番号を入力してください</div>
          <div style="font-size:0.75rem;color:var(--emerald-light);margin-top:4px;">→ 名簿「連絡先.携帯電話」に連携</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">回答状況</span>
      </div>
      <div style="text-align:center;padding:16px 0;">
        <div style="font-family:var(--font-display);font-size:2.5rem;color:var(--text-primary);">1,284</div>
        <div style="font-size:0.85rem;color:var(--text-muted);">/ 2,100 回答</div>
        <div style="height:8px;background:var(--surface-alt);border-radius:4px;overflow:hidden;margin:12px 0;">
          <div style="height:100%;width:61%;background:var(--emerald);border-radius:4px;"></div>
        </div>
        <div style="font-size:0.8rem;color:var(--text-secondary);">回答率 61.1%</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">組織別回答率</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:4px;">
            <span style="color:var(--text-secondary);">さいたま市</span>
            <span style="color:var(--text-primary);">68%</span>
          </div>
          <div style="height:4px;background:var(--surface-alt);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:68%;background:var(--emerald);border-radius:2px;"></div>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:4px;">
            <span style="color:var(--text-secondary);">川口市</span>
            <span style="color:var(--text-primary);">55%</span>
          </div>
          <div style="height:4px;background:var(--surface-alt);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:55%;background:var(--terracotta);border-radius:2px;"></div>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:4px;">
            <span style="color:var(--text-secondary);">川越市</span>
            <span style="color:var(--text-primary);">72%</span>
          </div>
          <div style="height:4px;background:var(--surface-alt);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:72%;background:var(--emerald);border-radius:2px;"></div>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:4px;">
            <span style="color:var(--text-secondary);">県教育委員会</span>
            <span style="color:var(--text-primary);">89%</span>
          </div>
          <div style="height:4px;background:var(--surface-alt);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:89%;background:var(--emerald);border-radius:2px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  "forms": `<div class="page-header">
  <div class="page-title-group">
    <h1>フォーム / アンケート</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>フォーム / アンケート</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-primary btn-sm" data-modal="create-form-modal">＋ 新規フォーム作成</button>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid">
  <div class="stat-card animate-in">
    <div class="stat-icon blue">📋</div>
    <div class="stat-value">23</div>
    <div class="stat-label">アクティブなフォーム</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon green">✅</div>
    <div class="stat-value">1,847</div>
    <div class="stat-label">今月の回答数</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon orange">⏳</div>
    <div class="stat-value">342</div>
    <div class="stat-label">未回答</div>
  </div>
  <div class="stat-card animate-in">
    <div class="stat-icon amber">📊</div>
    <div class="stat-value">68.4%</div>
    <div class="stat-label">平均回答率</div>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active" data-tab="active">配信中のフォーム</button>
  <button class="tab" data-tab="draft">下書き</button>
  <button class="tab" data-tab="closed">終了したフォーム</button>
  <button class="tab" data-tab="templates">テンプレート</button>
</div>

<div class="tab-content active" data-tab="active">
  <div style="display:flex;flex-direction:column;gap:12px;">
    <div class="card card-hover" style="cursor:pointer;" onclick="App.loadPage('form-detail')">
      <div style="display:flex;align-items:center;gap:16px;">
        <div style="width:44px;height:44px;border-radius:var(--radius-sm);background:rgba(42,157,143,0.15);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">📋</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">2026年度 教員携帯電話番号登録</div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">
            対象: 埼玉県内 全小中学校 一般教諭 • 回答期限: 2026/07/15
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.85rem;color:var(--text-primary);">1,284 / 2,100</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">回答済</div>
        </div>
        <div style="width:120px;">
          <div style="height:6px;background:var(--surface-alt);border-radius:3px;overflow:hidden;">
            <div style="height:100%;width:61%;background:var(--emerald);border-radius:3px;"></div>
          </div>
        </div>
        <span class="tag tag-green">名簿連携</span>
        <button class="btn btn-ghost btn-sm">→</button>
      </div>
    </div>

    <div class="card card-hover" style="cursor:pointer;" onclick="App.loadPage('form-detail')">
      <div style="display:flex;align-items:center;gap:16px;">
        <div style="width:44px;height:44px;border-radius:var(--radius-sm);background:rgba(90,122,170,0.15);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">📋</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">校内ICT環境に関するアンケート</div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">
            対象: 川口市立中学校 全教職員 • 回答期限: 2026/06/30
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.85rem;color:var(--text-primary);">38 / 52</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">回答済</div>
        </div>
        <div style="width:120px;">
          <div style="height:6px;background:var(--surface-alt);border-radius:3px;overflow:hidden;">
            <div style="height:100%;width:73%;background:var(--terracotta);border-radius:3px;"></div>
          </div>
        </div>
        <span class="tag tag-gray">通常</span>
        <button class="btn btn-ghost btn-sm">→</button>
      </div>
    </div>

    <div class="card card-hover" style="cursor:pointer;" onclick="App.loadPage('form-detail')">
      <div style="display:flex;align-items:center;gap:16px;">
        <div style="width:44px;height:44px;border-radius:var(--radius-sm);background:rgba(233,196,106,0.15);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">📋</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">2026年度 研修希望調査</div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">
            対象: 埼玉県教育委員会 所属職員 • 回答期限: 2026/07/31
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.85rem;color:var(--text-primary);">89 / 342</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">回答済</div>
        </div>
        <div style="width:120px;">
          <div style="height:6px;background:var(--surface-alt);border-radius:3px;overflow:hidden;">
            <div style="height:100%;width:26%;background:var(--amber);border-radius:3px;"></div>
          </div>
        </div>
        <span class="tag tag-gray">通常</span>
        <button class="btn btn-ghost btn-sm">→</button>
      </div>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="draft">
  <div class="empty-state">
    <div class="empty-icon">📝</div>
    <h3>下書きフォーム</h3>
    <p>現在下書き中のフォームはありません。「新規フォーム作成」から新しいフォームを作成できます。</p>
  </div>
</div>

<div class="tab-content" data-tab="closed">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>フォーム名</th>
          <th>期間</th>
          <th>回答数</th>
          <th>回答率</th>
          <th>集計</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-primary);">2025年度 教員満足度調査</span></td>
          <td>2025/11/01 - 2025/11/30</td>
          <td>1,892</td>
          <td>78.3%</td>
          <td><button class="btn btn-ghost btn-sm">📊 集計を見る</button></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-primary);">2025年度 保護者アンケート</span></td>
          <td>2025/09/01 - 2025/09/30</td>
          <td>8,234</td>
          <td>45.2%</td>
          <td><button class="btn btn-ghost btn-sm">📊 集計を見る</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="templates">
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
    <div class="card card-hover" style="cursor:pointer;">
      <div style="font-size:2rem;margin-bottom:12px;">📞</div>
      <div style="font-size:0.9rem;color:var(--text-primary);font-weight:500;">連絡先更新フォーム</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">名簿連携対応。電話番号・住所の一斉更新に。</div>
    </div>
    <div class="card card-hover" style="cursor:pointer;">
      <div style="font-size:2rem;margin-bottom:12px;">📊</div>
      <div style="font-size:0.9rem;color:var(--text-primary);font-weight:500;">満足度調査</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">5段階評価＋自由記述の標準テンプレート。</div>
    </div>
    <div class="card card-hover" style="cursor:pointer;">
      <div style="font-size:2rem;margin-bottom:12px;">📅</div>
      <div style="font-size:0.9rem;color:var(--text-primary);font-weight:500;">研修希望調査</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">研修日程・テーマの希望を収集。</div>
    </div>
  </div>
</div>

<!-- Create Form Modal -->
<div class="modal-overlay" id="create-form-modal">
  <div class="modal" style="max-width:640px;">
    <div class="modal-header">
      <h2>新規フォーム作成</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">フォームタイトル</label>
        <input class="form-input" placeholder="例: 2026年度 教員携帯電話番号登録">
      </div>
      <div class="form-group">
        <label class="form-label">説明</label>
        <textarea class="form-textarea" placeholder="フォームの説明や注意事項を入力"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">対象者</label>
        <div style="display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
            <input type="checkbox" checked style="accent-color:var(--terracotta);"> 組織で指定
            <select class="form-select" style="width:auto;flex:1;margin-left:8px;">
              <option>埼玉県内 全小中学校</option>
              <option>さいたま市 全学校</option>
              <option>川口市立中学校</option>
            </select>
          </div>
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
            <input type="checkbox" checked style="accent-color:var(--terracotta);"> 職種で絞り込み
            <select class="form-select" style="width:auto;flex:1;margin-left:8px;">
              <option>一般教諭</option>
              <option>全教職員</option>
              <option>管理職のみ</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;gap:8px;">
          <input type="checkbox" style="accent-color:var(--terracotta);"> 名簿連携を有効にする
        </label>
        <div class="form-hint">回答内容を名簿の属性項目に自動反映します。連携先の項目マッピングは後から設定できます。</div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">回答開始日</label>
          <input class="form-input" type="date">
        </div>
        <div class="form-group">
          <label class="form-label">回答期限</label>
          <input class="form-input" type="date">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-secondary modal-close">下書き保存</button>
      <button class="btn btn-primary modal-close">作成して配信</button>
    </div>
  </div>
</div>`,
  "help": `<div class="page-header">
  <div class="page-title-group">
    <h1>ヘルプ / サポート</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>ヘルプ / サポート</span>
    </div>
  </div>
</div>

<div class="grid-2">
  <div class="card card-hover" style="cursor:pointer;">
    <div style="font-size:2rem;margin-bottom:12px;">📖</div>
    <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">ユーザーマニュアル</div>
    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">各機能の詳細な使い方を説明します。</div>
  </div>
  <div class="card card-hover" style="cursor:pointer;">
    <div style="font-size:2rem;margin-bottom:12px;">❓</div>
    <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">よくある質問（FAQ）</div>
    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">よく寄せられる質問とその回答をまとめています。</div>
  </div>
  <div class="card card-hover" style="cursor:pointer;">
    <div style="font-size:2rem;margin-bottom:12px;">📧</div>
    <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">お問い合わせ</div>
    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">システム管理者に問い合わせる。</div>
  </div>
  <div class="card card-hover" style="cursor:pointer;">
    <div style="font-size:2rem;margin-bottom:12px;">🐛</div>
    <div style="font-size:0.95rem;color:var(--text-primary);font-weight:500;">不具合報告</div>
    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">バグや問題を報告する。</div>
  </div>
</div>`,
  "logs": `<div class="page-header">
  <div class="page-title-group">
    <h1>ログ / 監査</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>ログ / 監査</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm">📥 エクスポート</button>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active" data-tab="import-logs">インポートログ</button>
  <button class="tab" data-tab="audit">監査証跡</button>
  <button class="tab" data-tab="errors">エラー一覧</button>
  <button class="tab" data-tab="access">アクセスログ</button>
</div>

<div class="tab-content active" data-tab="import-logs">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>日時</th>
          <th>ファイル名</th>
          <th>種別</th>
          <th>総件数</th>
          <th>成功</th>
          <th>エラー</th>
          <th>実行ユーザー</th>
          <th>ステータス</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/12 13:00</span></td>
          <td>保護者連絡先一覧.csv</td>
          <td><span class="tag tag-green">更新</span></td>
          <td>2,100</td>
          <td>342</td>
          <td>0</td>
          <td>田中 管理者</td>
          <td><span class="tag tag-amber">処理中</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/12 11:23</span></td>
          <td>2026年度_新任教員一覧.csv</td>
          <td><span class="tag tag-blue">新規登録</span></td>
          <td>156</td>
          <td>133</td>
          <td>23</td>
          <td>田中 管理者</td>
          <td><span class="tag tag-red">エラー</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/11 14:23</span></td>
          <td>2026年度_新入生名簿.csv</td>
          <td><span class="tag tag-blue">新規登録</span></td>
          <td>1,284</td>
          <td>1,284</td>
          <td>0</td>
          <td>システム (バッチ)</td>
          <td><span class="tag tag-green">完了</span></td>
          <td><button class="btn btn-ghost btn-sm">詳細</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="audit">
  <div class="card" style="margin-bottom:20px;">
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <div style="flex:1;min-width:150px;">
        <label class="form-label">期間</label>
        <div style="display:flex;gap:8px;">
          <input class="form-input" type="date" style="flex:1;">
          <input class="form-input" type="date" style="flex:1;">
        </div>
      </div>
      <div style="width:180px;">
        <label class="form-label">操作種別</label>
        <select class="form-select">
          <option>すべて</option>
          <option>作成</option>
          <option>更新</option>
          <option>削除</option>
          <option>閲覧</option>
        </select>
      </div>
      <div style="width:180px;">
        <label class="form-label">ユーザー</label>
        <input class="form-input" placeholder="ユーザー名">
      </div>
      <div style="display:flex;align-items:flex-end;">
        <button class="btn btn-primary btn-sm">検索</button>
      </div>
    </div>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>日時</th>
          <th>ユーザー</th>
          <th>操作</th>
          <th>対象</th>
          <th>詳細</th>
          <th>IPアドレス</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/12 14:32:15</span></td>
          <td>田中 管理者</td>
          <td><span class="tag tag-blue">更新</span></td>
          <td>人物: 佐藤 美咲</td>
          <td>担当クラスを変更</td>
          <td style="font-size:0.8rem;color:var(--text-muted);">192.168.1.100</td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/12 11:23:00</span></td>
          <td>田中 管理者</td>
          <td><span class="tag tag-blue">作成</span></td>
          <td>CSVインポート</td>
          <td>新任教員一覧.csv (156件)</td>
          <td style="font-size:0.8rem;color:var(--text-muted);">192.168.1.100</td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/12 09:15:42</span></td>
          <td>高橋 校長</td>
          <td><span class="tag tag-orange">閲覧</span></td>
          <td>機微情報: 佐藤 美咲</td>
          <td>機微情報タブを閲覧</td>
          <td style="font-size:0.8rem;color:var(--text-muted);">192.168.1.50</td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/11 15:00:00</span></td>
          <td>システム (バッチ)</td>
          <td><span class="tag tag-green">更新</span></td>
          <td>Google Workspace 同期</td>
          <td>1,284件のアカウントを同期</td>
          <td style="font-size:0.8rem;color:var(--text-muted);">内部</td>
        </tr>
        <tr>
          <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/11 08:30:00</span></td>
          <td>佐藤 美咲</td>
          <td><span class="tag tag-orange">閲覧</span></td>
          <td>フォーム: 研修希望調査</td>
          <td>フォームを閲覧・回答</td>
          <td style="font-size:0.8rem;color:var(--text-muted);">192.168.5.200</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tab-content" data-tab="errors">
  <div class="card" style="margin-bottom:20px;">
    <div class="card-header">
      <span class="card-title">エラー詳細: 2026年度_新任教員一覧.csv</span>
      <button class="btn btn-secondary btn-sm">システム管理者に問い合わせ</button>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>行</th>
            <th>識別子</th>
            <th>項目</th>
            <th>エラー内容</th>
            <th>対処</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-muted);">12</span></td>
            <td>TCH-48301</td>
            <td>メールアドレス</td>
            <td><span style="color:var(--terracotta-light);">既存のメールアドレスと重複</span></td>
            <td>CSVのメールアドレスを確認</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-muted);">23</span></td>
            <td>TCH-48312</td>
            <td>生年月日</td>
            <td><span style="color:var(--terracotta-light);">日付形式が不正</span></td>
            <td>YYYY/MM/DD形式に修正</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-muted);">45</span></td>
            <td>TCH-48334</td>
            <td>所属学校コード</td>
            <td><span style="color:var(--terracotta-light);">組織マスターに存在しないコード</span></td>
            <td>コード値を確認</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-muted);">67</span></td>
            <td>TCH-48356</td>
            <td>教員免許番号</td>
            <td><span style="color:var(--terracotta-light);">バリデーションエラー（形式違反）</span></td>
            <td>免許番号の形式を確認</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="alert alert-info">
    <span class="alert-icon">💡</span>
    <div>
      エラーが解決できない場合は、システム管理者に問い合わせてください。
      <button class="btn btn-secondary btn-sm" style="margin-left:12px;">📧 問い合わせフォーム</button>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="access">
  <div class="card">
    <div class="card-header">
      <span class="card-title">機微情報アクセスログ</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>日時</th>
            <th>ユーザー</th>
            <th>役職</th>
            <th>対象人物</th>
            <th>アクセス種別</th>
            <th>所要時間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/12 14:32</span></td>
            <td>田中 管理者</td>
            <td>システム管理者</td>
            <td>佐藤 美咲</td>
            <td><span class="tag tag-orange">機微情報閲覧</span></td>
            <td>2分34秒</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/08 09:15</span></td>
            <td>高橋 校長</td>
            <td>校長</td>
            <td>佐藤 美咲</td>
            <td><span class="tag tag-orange">機微情報閲覧</span></td>
            <td>45秒</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-muted);font-size:0.8rem;">2026/06/01 03:00</span></td>
            <td>システム監査</td>
            <td>自動監査</td>
            <td>一括スキャン</td>
            <td><span class="tag tag-gray">定期監査</span></td>
            <td>12分00秒</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  "notifications": `<div class="page-header">
  <div class="page-title-group">
    <h1>通知</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>通知</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm">すべて既読にする</button>
  </div>
</div>

<div style="display:flex;flex-direction:column;gap:8px;">
  <div class="card" style="border-left:3px solid var(--terracotta);cursor:pointer;">
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <div style="font-size:1.2rem;">❌</div>
      <div style="flex:1;">
        <div style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">CSVインポートでエラーが発生しました</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">2026年度_新任教員一覧.csv — 23件のエラー</div>
      </div>
      <span style="font-size:0.75rem;color:var(--text-muted);">1時間前</span>
    </div>
  </div>

  <div class="card" style="border-left:3px solid var(--emerald);cursor:pointer;">
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <div style="font-size:1.2rem;">✅</div>
      <div style="flex:1;">
        <div style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">CSVインポートが完了しました</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">2026年度_新入生名簿.csv — 1,284件 正常に処理</div>
      </div>
      <span style="font-size:0.75rem;color:var(--text-muted);">1日前</span>
    </div>
  </div>

  <div class="card" style="border-left:3px solid var(--amber);cursor:pointer;">
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <div style="font-size:1.2rem;">⏳</div>
      <div style="flex:1;">
        <div style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">承認待ち申請があります</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">佐藤 美咲 の所属変更申請が承認待ちです</div>
      </div>
      <span style="font-size:0.75rem;color:var(--text-muted);">2日前</span>
    </div>
  </div>

  <div class="card" style="cursor:pointer;">
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <div style="font-size:1.2rem;">🔄</div>
      <div style="flex:1;">
        <div style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">Google Workspace 同期が完了しました</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">1,284件のアカウントを同期</div>
      </div>
      <span style="font-size:0.75rem;color:var(--text-muted);">2日前</span>
    </div>
  </div>
</div>`,
  "organization": `<div class="page-header">
  <div class="page-title-group">
    <h1>組織管理</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>組織管理</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm" data-modal="add-org-modal">＋ 組織を追加</button>
    <button class="btn btn-primary btn-sm">📥 CSVインポート</button>
  </div>
</div>

<div class="grid-1-2">
  <!-- Tree -->
  <div class="card">
    <div class="card-header">
      <span class="card-title">組織階層</span>
    </div>
    <div style="font-size:0.85rem;">
      <div class="tree-toggle" style="padding-left:0;">
        <span class="arrow expanded">▶</span>
        <span>🏛</span>
        <span style="color:var(--text-primary);font-weight:500;">埼玉県（テナント全体）</span>
        <span class="tag tag-gray" style="margin-left:8px;">48,392人</span>
      </div>
      <div class="tree-children expanded">
        <div class="tree-node">
          <div class="tree-toggle">
            <span class="arrow expanded">▶</span>
            <span>🏛</span>
            <span style="color:var(--text-primary);">埼玉県教育委員会</span>
            <span class="tag tag-gray" style="margin-left:8px;">342人</span>
          </div>
          <div class="tree-children expanded">
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>📁</span>
                <span>総務課</span>
                <span class="tag tag-gray" style="margin-left:8px;">28人</span>
              </div>
              <div class="tree-children"></div>
            </div>
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>📁</span>
                <span>教職員課</span>
                <span class="tag tag-gray" style="margin-left:8px;">45人</span>
              </div>
              <div class="tree-children"></div>
            </div>
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>📁</span>
                <span>学校教育課</span>
                <span class="tag tag-gray" style="margin-left:8px;">52人</span>
              </div>
              <div class="tree-children"></div>
            </div>
          </div>
        </div>

        <div class="tree-node">
          <div class="tree-toggle">
            <span class="arrow expanded">▶</span>
            <span>🏘</span>
            <span style="color:var(--text-primary);">さいたま市</span>
            <span class="tag tag-gray" style="margin-left:8px;">12,847人</span>
          </div>
          <div class="tree-children expanded">
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>🏫</span>
                <span>小学校</span>
                <span class="tag tag-gray" style="margin-left:8px;">6,234人</span>
              </div>
              <div class="tree-children"></div>
            </div>
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>🏫</span>
                <span>中学校</span>
                <span class="tag tag-gray" style="margin-left:8px;">3,891人</span>
              </div>
              <div class="tree-children"></div>
            </div>
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>🏫</span>
                <span>高等学校</span>
                <span class="tag tag-gray" style="margin-left:8px;">2,722人</span>
              </div>
              <div class="tree-children"></div>
            </div>
          </div>
        </div>

        <div class="tree-node">
          <div class="tree-toggle">
            <span class="arrow expanded">▶</span>
            <span>🏘</span>
            <span style="color:var(--text-primary);">川口市</span>
            <span class="tag tag-gray" style="margin-left:8px;">8,934人</span>
          </div>
          <div class="tree-children">
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>🏫</span>
                <span>小学校</span>
                <span class="tag tag-gray" style="margin-left:8px;">4,210人</span>
              </div>
              <div class="tree-children"></div>
            </div>
            <div class="tree-node">
              <div class="tree-toggle">
                <span class="arrow">▶</span>
                <span>🏫</span>
                <span>中学校</span>
                <span class="tag tag-gray" style="margin-left:8px;">2,845人</span>
              </div>
              <div class="tree-children"></div>
            </div>
          </div>
        </div>

        <div class="tree-node">
          <div class="tree-toggle">
            <span class="arrow">▶</span>
            <span>🏘</span>
            <span>川越市</span>
            <span class="tag tag-gray" style="margin-left:8px;">6,234人</span>
          </div>
          <div class="tree-children"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detail -->
  <div>
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">組織詳細</span>
        <button class="btn btn-secondary btn-sm">✏️ 編集</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">組織名</span>
          <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">埼玉県教育委員会</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">組織コード</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">EDB-SAI-001</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">組織種別</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">教育委員会</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">上位組織</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">埼玉県（テナント全体）</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">所属人数</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">342 人</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">権限設定の継承状態</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-secondary);">基本権限設定</span>
          <span class="tag tag-green">テナント設定を継承</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-secondary);">属性項目権限</span>
          <span class="tag tag-orange">組織固有設定あり</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">フォーム権限</span>
          <span class="tag tag-green">テナント設定を継承</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Add Org Modal -->
<div class="modal-overlay" id="add-org-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>組織を追加</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">組織名</label>
        <input class="form-input" placeholder="例: 新座市教育委員会">
      </div>
      <div class="form-group">
        <label class="form-label">組織コード</label>
        <input class="form-input" placeholder="例: EDB-NII-001">
      </div>
      <div class="form-group">
        <label class="form-label">組織種別</label>
        <select class="form-select">
          <option>教育委員会</option>
          <option>小学校</option>
          <option>中学校</option>
          <option>高等学校</option>
          <option>特別支援学校</option>
          <option>部署</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">上位組織</label>
        <select class="form-select">
          <option>埼玉県（テナント全体）</option>
          <option>埼玉県教育委員会</option>
          <option>さいたま市</option>
          <option>川口市</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">作成する</button>
    </div>
  </div>
</div>`,
  "permissions": `<div class="page-header">
  <div class="page-title-group">
    <h1>権限設定</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>権限設定</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-primary btn-sm" data-modal="add-rule-modal">＋ 新規ルール</button>
  </div>
</div>

<div class="alert alert-info" style="margin-bottom:20px;">
  <span class="alert-icon">🔐</span>
  <div>
    <strong>現在のスコープ: 埼玉県（テナント全体）</strong><br>
    この設定はテナント全体に適用されます。各組織で上書き・追加設定が可能です。
    <a href="#" data-page="organization" style="margin-left:8px;">組織別設定を見る →</a>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active" data-tab="subjects">サブジェクト（誰が）</button>
  <button class="tab" data-tab="objects">オブジェクト（何を）</button>
  <button class="tab" data-tab="conditions">条件設定</button>
  <button class="tab" data-tab="attributes">属性項目権限</button>
  <button class="tab" data-tab="overrides">組織別上書き</button>
</div>

<div class="tab-content active" data-tab="subjects">
  <div class="card">
    <div class="card-header">
      <span class="card-title">サブジェクト条件（誰が操作できるか）</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>ルール名</th>
            <th>対象職種</th>
            <th>組織スコープ</th>
            <th>条件（属性）</th>
            <th>優先度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">担任教員のクラス閲覧</span></td>
            <td><span class="tag tag-blue">教諭</span></td>
            <td>所属学校</td>
            <td>担任クラス = 対象クラス</td>
            <td><span class="tag tag-amber">高</span></td>
            <td><button class="btn btn-ghost btn-sm">✏️</button></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">部活顧問の生徒連絡先閲覧</span></td>
            <td><span class="tag tag-blue">教諭</span></td>
            <td>所属学校</td>
            <td>部活顧問 = 対象部活</td>
            <td><span class="tag tag-amber">高</span></td>
            <td><button class="btn btn-ghost btn-sm">✏️</button></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">校長の同一学校種閲覧</span></td>
            <td><span class="tag tag-orange">校長</span></td>
            <td>同一市町村・同一学校種</td>
            <td>—</td>
            <td><span class="tag tag-gray">中</span></td>
            <td><button class="btn btn-ghost btn-sm">✏️</button></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">教育委員会の全体閲覧</span></td>
            <td><span class="tag tag-orange">指導主事</span></td>
            <td>テナント全体</td>
            <td>—</td>
            <td><span class="tag tag-gray">中</span></td>
            <td><button class="btn btn-ghost btn-sm">✏️</button></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);font-weight:500;">システム管理者</span></td>
            <td><span class="tag tag-red">管理者</span></td>
            <td>テナント全体</td>
            <td>—</td>
            <td><span class="tag tag-green">最高</span></td>
            <td><button class="btn btn-ghost btn-sm">✏️</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="objects">
  <div class="card">
    <div class="card-header">
      <span class="card-title">オブジェクト権限（何への操作か）</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>機能</th>
            <th>閲覧</th>
            <th>編集</th>
            <th>作成</th>
            <th>削除</th>
            <th>エクスポート</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);">基本情報</span></td>
            <td><span class="tag tag-green">全員</span></td>
            <td><span class="tag tag-green">担任・管理者</span></td>
            <td><span class="tag tag-green">管理者</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-green">全員</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">連絡先情報</span></td>
            <td><span class="tag tag-green">担任・部活顧問</span></td>
            <td><span class="tag tag-orange">担任のみ</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-orange">担任・管理者</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">機微情報</span></td>
            <td><span class="tag tag-red">校長・管理者</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">カスタム属性</span></td>
            <td><span class="tag tag-green">属性別設定</span></td>
            <td><span class="tag tag-green">属性別設定</span></td>
            <td><span class="tag tag-green">属性別設定</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-orange">属性別設定</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">フォーム管理</span></td>
            <td><span class="tag tag-green">全員</span></td>
            <td><span class="tag tag-green">作成者のみ</span></td>
            <td><span class="tag tag-green">全員</span></td>
            <td><span class="tag tag-orange">作成者・管理者</span></td>
            <td><span class="tag tag-green">全員</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="conditions">
  <div class="card">
    <div class="card-header">
      <span class="card-title">条件設定の組み合わせ</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div style="padding:16px;background:var(--surface-alt);border-radius:var(--radius-md);border:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span class="tag tag-blue">条件ルール #1</span>
          <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">担任教員 → 担任クラスの生徒の基本情報</span>
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted);">
          IF サブジェクト.職種 = "教諭" AND サブジェクト.担任クラス = オブジェクト.所属クラス<br>
          THEN 基本情報.{閲覧, 編集} = true
        </div>
      </div>
      <div style="padding:16px;background:var(--surface-alt);border-radius:var(--radius-md);border:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span class="tag tag-blue">条件ルール #2</span>
          <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">部活顧問 → 担当部活の生徒の連絡先</span>
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted);">
          IF サブジェクト.属性「部活顧問」= オブジェクト.属性「所属部活」<br>
          THEN 連絡先情報.{閲覧} = true
        </div>
      </div>
      <div style="padding:16px;background:var(--surface-alt);border-radius:var(--radius-md);border:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span class="tag tag-blue">条件ルール #3</span>
          <span style="font-size:0.85rem;color:var(--text-primary);font-weight:500;">校長 → 同一市町村同一学校種の教員連絡先</span>
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted);">
          IF サブジェクト.職種 = "校長"<br>
          AND サブジェクト.所属市町村 = オブジェクト.所属市町村<br>
          AND サブジェクト.学校種 = オブジェクト.学校種<br>
          THEN 連絡先情報.{閲覧} = true
        </div>
      </div>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="attributes">
  <div class="card">
    <div class="card-header">
      <span class="card-title">属性項目ごとの権限設定</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>属性項目</th>
            <th>データ形式</th>
            <th>閲覧権限</th>
            <th>編集権限</th>
            <th>コード別制限</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);">人物の特徴</span></td>
            <td><span class="tag tag-gray">コード</span></td>
            <td><span class="tag tag-orange">担任・学年主任</span></td>
            <td><span class="tag tag-red">学年主任のみ</span></td>
            <td>
              <span class="tag tag-green" style="margin-right:4px;">優良生徒: 担任以上</span>
              <span class="tag tag-red">いじめ加害者: 学年主任のみ</span>
            </td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">教員免許番号</span></td>
            <td><span class="tag tag-gray">文字列</span></td>
            <td><span class="tag tag-orange">校長・管理者</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-gray">—</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">担当部活</span></td>
            <td><span class="tag tag-gray">複数文字列</span></td>
            <td><span class="tag tag-green">全教職員</span></td>
            <td><span class="tag tag-green">本人・管理者</span></td>
            <td><span class="tag tag-gray">—</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">勤務評価点</span></td>
            <td><span class="tag tag-gray">数値</span></td>
            <td><span class="tag tag-red">校長・管理者</span></td>
            <td><span class="tag tag-red">管理者のみ</span></td>
            <td><span class="tag tag-gray">—</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="tab-content" data-tab="overrides">
  <div class="card">
    <div class="card-header">
      <span class="card-title">組織別上書き設定</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>組織</th>
            <th>上書きルール</th>
            <th>状態</th>
            <th>最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);">さいたま市教育委員会</span></td>
            <td>担任教員のクラス閲覧 → 学年全体に拡大</td>
            <td><span class="tag tag-orange">上書きあり</span></td>
            <td>2026/04/01</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">川口市立中学校</span></td>
            <td>部活顧問の権限に「編集」を追加</td>
            <td><span class="tag tag-orange">上書きあり</span></td>
            <td>2026/05/15</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">浦和高校</span></td>
            <td>—</td>
            <td><span class="tag tag-green">継承</span></td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Add Rule Modal -->
<div class="modal-overlay" id="add-rule-modal">
  <div class="modal" style="max-width:640px;">
    <div class="modal-header">
      <h2>新規権限ルール</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">ルール名</label>
        <input class="form-input" placeholder="例: 学年主任の機微情報閲覧">
      </div>
      <div class="form-group">
        <label class="form-label">サブジェクト条件（誰が）</label>
        <div style="display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
            <span style="color:var(--text-muted);">職種:</span>
            <select class="form-select" style="width:auto;flex:1;">
              <option>教諭</option>
              <option>指導主事</option>
              <option>校長</option>
              <option>管理職</option>
            </select>
          </div>
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
            <span style="color:var(--text-muted);">属性条件:</span>
            <select class="form-select" style="width:auto;flex:1;">
              <option>指定なし</option>
              <option>担任クラス</option>
              <option>部活顧問</option>
              <option>学年主任</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">オブジェクト（何を）</label>
        <div style="display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--surface-alt);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
            <span style="color:var(--text-muted);">対象データ:</span>
            <select class="form-select" style="width:auto;flex:1;">
              <option>基本情報</option>
              <option>連絡先情報</option>
              <option>機微情報</option>
              <option>カスタム属性</option>
            </select>
          </div>
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
            <span style="color:var(--text-muted);">操作:</span>
            <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" checked style="accent-color:var(--terracotta);"> 閲覧</label>
            <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" style="accent-color:var(--terracotta);"> 編集</label>
            <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" style="accent-color:var(--terracotta);"> 作成</label>
            <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" style="accent-color:var(--terracotta);"> 削除</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">組織スコープ</label>
        <select class="form-select">
          <option>所属学校</option>
          <option>同一市町村</option>
          <option>同一学校種</option>
          <option>テナント全体</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">ルールを作成</button>
    </div>
  </div>
</div>`,
  "person-detail": `<div class="page-header">
  <div class="page-title-group">
    <h1>人物詳細</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <a href="#" data-page="roster">名簿管理</a>
      <span class="sep">/</span>
      <span>佐藤 美咲</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm" data-modal="edit-person-modal">✏️ 編集</button>
    <button class="btn btn-secondary btn-sm" data-modal="transfer-modal">🔄 所属変更</button>
    <button class="btn btn-primary btn-sm" data-modal="export-modal">📤 エクスポート</button>
  </div>
</div>

<!-- Person Header -->
<div class="card" style="margin-bottom:24px;">
  <div style="display:flex;align-items:center;gap:20px;">
    <div style="width:64px;height:64px;border-radius:var(--radius-md);background:linear-gradient(135deg,var(--navy-500),var(--navy-400));display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:600;color:var(--text-primary);flex-shrink:0;">SM</div>
    <div style="flex:1;">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:400;color:var(--text-primary);">佐藤 美咲</h2>
        <span class="tag tag-green">在籍</span>
        <span class="tag tag-blue">教諭</span>
      </div>
      <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">
        サトウ ミサキ • misaki.sato@edu-saitama.jp • 職員番号: TCH-48291
      </div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:0.8rem;color:var(--text-muted);">最終更新</div>
      <div style="font-size:0.85rem;color:var(--text-secondary);">2026/06/10 14:32</div>
    </div>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active" data-tab="basic">基本情報</button>
  <button class="tab" data-tab="contact">連絡先情報</button>
  <button class="tab" data-tab="sensitive">機微情報</button>
  <button class="tab" data-tab="attributes">カスタム属性</button>
  <button class="tab" data-tab="history">変更履歴</button>
  <button class="tab" data-tab="forms">フォーム回答</button>
</div>

<!-- Tab: Basic -->
<div class="tab-content active" data-tab="basic">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <span class="card-title">基本プロフィール</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">氏名</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">佐藤 美咲</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">氏名（かな）</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">さとう みさき</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">生年月日</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">1992/04/15 (34歳)</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">性別</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">女性</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">職員番号</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">TCH-48291</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">所属情報</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">所属組織</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">川口市立中学校</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">所属市町村</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">川口市</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">学校種</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">中学校</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">担当クラス</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">3年A組 (担任)</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">着任日</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">2020/04/01</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Tab: Contact -->
<div class="tab-content" data-tab="contact">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <span class="card-title">連絡先</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">メールアドレス</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">misaki.sato@edu-saitama.jp</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">電話番号</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">048-XXX-XXXX</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">携帯電話</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">090-XXXX-XXXX</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">住所</span>
          <span style="font-size:0.85rem;color:var(--text-primary);text-align:right;max-width:280px;">埼玉県川口市XXXXX 1-2-3</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">緊急連絡先</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">緊急連絡先名</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">佐藤 健一 (父)</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">緊急連絡先電話</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">090-XXXX-XXXX</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Tab: Sensitive -->
<div class="tab-content" data-tab="sensitive">
  <div class="alert alert-warning">
    <span class="alert-icon">🔒</span>
    <div>この情報は権限のあるユーザーのみ閲覧できます。アクセスログが記録されます。</div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <span class="card-title">機微情報</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">要配慮事項</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">—</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.8rem;color:var(--text-muted);">不登校歴</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">—</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.8rem;color:var(--text-muted);">いじめ関連</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">—</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">アクセスログ（機微情報）</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(42,64,112,0.3);font-size:0.8rem;">
          <span style="color:var(--text-secondary);">田中 管理者</span>
          <span style="color:var(--text-muted);">2026/06/10 14:32</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(42,64,112,0.3);font-size:0.8rem;">
          <span style="color:var(--text-secondary);">高橋 校長</span>
          <span style="color:var(--text-muted);">2026/06/08 09:15</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:0.8rem;">
          <span style="color:var(--text-secondary);">システム監査</span>
          <span style="color:var(--text-muted);">2026/06/01 03:00</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Tab: Custom Attributes -->
<div class="tab-content" data-tab="attributes">
  <div class="card" style="margin-bottom:20px;">
    <div class="card-header">
      <span class="card-title">カスタム属性項目</span>
      <button class="btn btn-secondary btn-sm" data-modal="add-attr-modal">＋ 属性を追加</button>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>属性項目</th>
            <th>値</th>
            <th>データ形式</th>
            <th>有効期間</th>
            <th>最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);">教員免許番号</span></td>
            <td>平30 中教 第XXXXX号</td>
            <td><span class="tag tag-gray">文字列</span></td>
            <td>2020/04/01 〜 無期限</td>
            <td>2026/04/01</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">担当部活</span></td>
            <td>
              <span class="tag tag-blue" style="margin-right:4px;">バスケットボール部</span>
              <span class="tag tag-blue">美術部</span>
            </td>
            <td><span class="tag tag-gray">複数文字列</span></td>
            <td>2024/04/01 〜 無期限</td>
            <td>2026/04/01</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">人物の特徴</span></td>
            <td><span class="tag tag-green">優良生徒</span></td>
            <td><span class="tag tag-gray">コード</span></td>
            <td>2025/06/01 〜 無期限</td>
            <td>2025/06/01</td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">勤務評価点</span></td>
            <td>88.5</td>
            <td><span class="tag tag-gray">数値</span></td>
            <td>2025年度</td>
            <td>2026/03/31</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Tab: History -->
<div class="tab-content" data-tab="history">
  <div class="card">
    <div class="card-header">
      <span class="card-title">変更履歴</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:0;">
      <div style="display:flex;gap:16px;padding:14px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
        <div style="width:40px;text-align:center;color:var(--emerald-light);font-size:1.1rem;">✏️</div>
        <div style="flex:1;">
          <div style="font-size:0.85rem;color:var(--text-primary);">担当クラスが変更されました</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">2年B組 → 3年A組</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem;color:var(--text-secondary);">田中 管理者</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">2026/04/01 09:00</div>
        </div>
      </div>
      <div style="display:flex;gap:16px;padding:14px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
        <div style="width:40px;text-align:center;color:var(--terracotta-light);font-size:1.1rem;">🏷</div>
        <div style="flex:1;">
          <div style="font-size:0.85rem;color:var(--text-primary);">属性「人物の特徴」が追加されました</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">値: 優良生徒</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem;color:var(--text-secondary);">高橋 校長</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">2025/06/01 11:20</div>
        </div>
      </div>
      <div style="display:flex;gap:16px;padding:14px 0;">
        <div style="width:40px;text-align:center;color:var(--navy-200);font-size:1.1rem;">🏛</div>
        <div style="flex:1;">
          <div style="font-size:0.85rem;color:var(--text-primary);">所属組織が変更されました</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">川口市立南中学校 → 川口市立中学校</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem;color:var(--text-secondary);">システム (CSVインポート)</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">2024/04/01 08:00</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Tab: Forms -->
<div class="tab-content" data-tab="forms">
  <div class="card">
    <div class="card-header">
      <span class="card-title">フォーム回答履歴</span>
    </div>
    <div class="table-container" style="border:none;margin:-8px -24px;">
      <table>
        <thead>
          <tr>
            <th>フォーム名</th>
            <th>回答日</th>
            <th>ステータス</th>
            <th>名簿連携</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--text-primary);">2026年度 教員携帯電話番号登録</span></td>
            <td>2026/05/20</td>
            <td><span class="tag tag-green">回答済</span></td>
            <td><span class="tag tag-green">連携済</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">校内ICT環境アンケート</span></td>
            <td>2026/04/15</td>
            <td><span class="tag tag-green">回答済</span></td>
            <td><span class="tag tag-gray">—</span></td>
          </tr>
          <tr>
            <td><span style="color:var(--text-primary);">2026年度 研修希望調査</span></td>
            <td>—</td>
            <td><span class="tag tag-amber">未回答</span></td>
            <td><span class="tag tag-gray">—</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Edit Person Modal -->
<div class="modal-overlay" id="edit-person-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>基本情報を編集</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">姓</label>
          <input class="form-input" value="佐藤">
        </div>
        <div class="form-group">
          <label class="form-label">名</label>
          <input class="form-input" value="美咲">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">姓（かな）</label>
          <input class="form-input" value="さとう">
        </div>
        <div class="form-group">
          <label class="form-label">名（かな）</label>
          <input class="form-input" value="みさき">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">メールアドレス</label>
        <input class="form-input" value="misaki.sato@edu-saitama.jp">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">生年月日</label>
          <input class="form-input" type="date" value="1992-04-15">
        </div>
        <div class="form-group">
          <label class="form-label">性別</label>
          <select class="form-select">
            <option>男性</option>
            <option selected>女性</option>
            <option>その他</option>
          </select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">保存する</button>
    </div>
  </div>
</div>

<!-- Transfer Modal -->
<div class="modal-overlay" id="transfer-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>所属変更申請</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="alert alert-info">
        <span class="alert-icon">ℹ️</span>
        <div>所属変更は承認フローが必要です。申請後、異動先組織の承認者による承認が必要となります。</div>
      </div>
      <div class="form-group">
        <label class="form-label">異動元組織</label>
        <input class="form-input" value="川口市立中学校" disabled style="opacity:0.6;">
      </div>
      <div class="form-group">
        <label class="form-label">異動先組織</label>
        <select class="form-select">
          <option value="">選択してください</option>
          <option>浦和高校</option>
          <option>大宮高校</option>
          <option>川口市立南中学校</option>
          <option>さいたま市立中央小学校</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">異動希望日</label>
        <input class="form-input" type="date" value="2026-07-01">
      </div>
      <div class="form-group">
        <label class="form-label">備考</label>
        <textarea class="form-textarea" placeholder="異動理由など"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">申請する</button>
    </div>
  </div>
</div>

<!-- Add Attribute Modal -->
<div class="modal-overlay" id="add-attr-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>属性項目を追加</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">属性項目</label>
        <select class="form-select">
          <option>教員免許番号</option>
          <option>担当部活</option>
          <option>人物の特徴</option>
          <option>勤務評価点</option>
          <option>所有資格</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">値</label>
        <input class="form-input" placeholder="値を入力">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">開始日</label>
          <input class="form-input" type="date">
        </div>
        <div class="form-group">
          <label class="form-label">終了日（任意）</label>
          <input class="form-input" type="date">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">追加する</button>
    </div>
  </div>
</div>

<!-- Export Modal -->
<div class="modal-overlay" id="export-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>データエクスポート</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">出力形式</label>
        <select class="form-select">
          <option>CSV</option>
          <option>Excel (.xlsx)</option>
          <option>JSON</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">出力対象</label>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);cursor:pointer;">
            <input type="checkbox" checked style="accent-color:var(--terracotta);"> 基本情報
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);cursor:pointer;">
            <input type="checkbox" checked style="accent-color:var(--terracotta);"> 連絡先情報
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);cursor:pointer;">
            <input type="checkbox" style="accent-color:var(--terracotta);"> 機微情報
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);cursor:pointer;">
            <input type="checkbox" checked style="accent-color:var(--terracotta);"> カスタム属性
          </label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">エクスポート</button>
    </div>
  </div>
</div>`,
  "roster": `<div class="page-header">
  <div class="page-title-group">
    <h1>名簿管理</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>名簿管理</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-secondary btn-sm" data-modal="filter-modal">
      🔽 フィルター
    </button>
    <button class="btn btn-secondary btn-sm" onclick="App.loadPage('csv-import')">
      📥 CSVインポート
    </button>
    <button class="btn btn-primary btn-sm" data-modal="add-person-modal">
      ＋ 新規登録
    </button>
  </div>
</div>

<!-- Filter Bar -->
<div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
  <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--surface-alt);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-secondary);cursor:pointer;">
    🏛 組織 <span style="color:var(--text-muted);margin-left:4px;">▼</span>
  </div>
  <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--surface-alt);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-secondary);cursor:pointer;">
    🏫 学校種 <span style="color:var(--text-muted);margin-left:4px;">▼</span>
  </div>
  <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--surface-alt);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-secondary);cursor:pointer;">
    👤 職種 <span style="color:var(--text-muted);margin-left:4px;">▼</span>
  </div>
  <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--surface-alt);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-secondary);cursor:pointer;">
    📅 ステータス <span style="color:var(--text-muted);margin-left:4px;">▼</span>
  </div>
  <div style="flex:1;"></div>
  <span style="font-size:0.8rem;color:var(--text-muted);padding:6px 0;">全 48,392 件中 1-25 件表示</span>
</div>

<!-- Table -->
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th style="width:30px;"><input type="checkbox" style="accent-color:var(--terracotta);"></th>
        <th>氏名</th>
        <th>メールアドレス</th>
        <th>職種</th>
        <th>所属組織</th>
        <th>ステータス</th>
        <th>最終更新</th>
        <th style="width:60px;"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-row-link" onclick="App.loadPage('person-detail')">
        <td><input type="checkbox" style="accent-color:var(--terracotta);" onclick="event.stopPropagation();"></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--navy-500),var(--navy-400));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:var(--text-primary);flex-shrink:0;">SM</div>
            <div>
              <div style="color:var(--text-primary);font-weight:500;">佐藤 美咲</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">サトウ ミサキ</div>
            </div>
          </div>
        </td>
        <td>misaki.sato@edu-saitama.jp</td>
        <td><span class="tag tag-blue">教諭</span></td>
        <td>川口市立中学校</td>
        <td><span class="tag tag-green">在籍</span></td>
        <td>2026/06/10</td>
        <td><button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();App.loadPage('person-detail')">→</button></td>
      </tr>
      <tr class="table-row-link" onclick="App.loadPage('person-detail')">
        <td><input type="checkbox" style="accent-color:var(--terracotta);" onclick="event.stopPropagation();"></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),var(--emerald-dark));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:white;flex-shrink:0;">YT</div>
            <div>
              <div style="color:var(--text-primary);font-weight:500;">山田 太郎</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">ヤマダ タロウ</div>
            </div>
          </div>
        </td>
        <td>taro.yamada@edu-saitama.jp</td>
        <td><span class="tag tag-blue">教諭</span></td>
        <td>さいたま市立中央小学校</td>
        <td><span class="tag tag-green">在籍</span></td>
        <td>2026/06/09</td>
        <td><button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();App.loadPage('person-detail')">→</button></td>
      </tr>
      <tr class="table-row-link" onclick="App.loadPage('person-detail')">
        <td><input type="checkbox" style="accent-color:var(--terracotta);" onclick="event.stopPropagation();"></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--terracotta),var(--terracotta-dark));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:white;flex-shrink:0;">KS</div>
            <div>
              <div style="color:var(--text-primary);font-weight:500;">鈴木 一郎</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">スズキ イチロウ</div>
            </div>
          </div>
        </td>
        <td>ichiro.suzuki@edu-saitama.jp</td>
        <td><span class="tag tag-orange">指導主事</span></td>
        <td>埼玉県教育委員会</td>
        <td><span class="tag tag-green">在籍</span></td>
        <td>2026/06/08</td>
        <td><button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();App.loadPage('person-detail')">→</button></td>
      </tr>
      <tr class="table-row-link" onclick="App.loadPage('person-detail')">
        <td><input type="checkbox" style="accent-color:var(--terracotta);" onclick="event.stopPropagation();"></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--navy-300),var(--navy-200));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:var(--text-inverse);flex-shrink:0;">HT</div>
            <div>
              <div style="color:var(--text-primary);font-weight:500;">濱田 太郎</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">ハマダ タロウ</div>
            </div>
          </div>
        </td>
        <td>taro.hamada@edu-saitama.jp</td>
        <td><span class="tag tag-blue">教諭</span></td>
        <td>浦和高校</td>
        <td><span class="tag tag-amber">休職中</span></td>
        <td>2026/06/07</td>
        <td><button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();App.loadPage('person-detail')">→</button></td>
      </tr>
      <tr class="table-row-link" onclick="App.loadPage('person-detail')">
        <td><input type="checkbox" style="accent-color:var(--terracotta);" onclick="event.stopPropagation();"></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#5a3a7a,#7a5aaa);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:white;flex-shrink:0;">KT</div>
            <div>
              <div style="color:var(--text-primary);font-weight:500;">木下 栞</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">キノシタ シオリ</div>
            </div>
          </div>
        </td>
        <td>shiori.kinoshita@edu-saitama.jp</td>
        <td><span class="tag tag-blue">教諭</span></td>
        <td>大宮高校</td>
        <td><span class="tag tag-green">在籍</span></td>
        <td>2026/06/06</td>
        <td><button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();App.loadPage('person-detail')">→</button></td>
      </tr>
      <tr class="table-row-link" onclick="App.loadPage('person-detail')">
        <td><input type="checkbox" style="accent-color:var(--terracotta);" onclick="event.stopPropagation();"></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-light),var(--emerald));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:white;flex-shrink:0;">MT</div>
            <div>
              <div style="color:var(--text-primary);font-weight:500;">村田 翼</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">ムラタ ツバサ</div>
            </div>
          </div>
        </td>
        <td>tsubasa.murata@edu-saitama.jp</td>
        <td><span class="tag tag-blue">教諭</span></td>
        <td>川越市立東中学校</td>
        <td><span class="tag tag-green">在籍</span></td>
        <td>2026/06/05</td>
        <td><button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();App.loadPage('person-detail')">→</button></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Pagination -->
<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
  <span style="font-size:0.8rem;color:var(--text-muted);">1-25 / 48,392 件</span>
  <div style="display:flex;gap:4px;">
    <button class="btn btn-ghost btn-sm btn-icon" disabled>‹</button>
    <button class="btn btn-secondary btn-sm" style="min-width:36px;justify-content:center;">1</button>
    <button class="btn btn-ghost btn-sm" style="min-width:36px;justify-content:center;">2</button>
    <button class="btn btn-ghost btn-sm" style="min-width:36px;justify-content:center;">3</button>
    <button class="btn btn-ghost btn-sm" style="min-width:36px;justify-content:center;">…</button>
    <button class="btn btn-ghost btn-sm" style="min-width:36px;justify-content:center;">1,936</button>
    <button class="btn btn-ghost btn-sm btn-icon">›</button>
  </div>
</div>

<!-- Filter Modal -->
<div class="modal-overlay" id="filter-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>フィルター設定</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">組織</label>
        <select class="form-select">
          <option>すべての組織</option>
          <option>埼玉県教育委員会</option>
          <option>さいたま市</option>
          <option>川口市</option>
          <option>川越市</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">学校種</label>
          <select class="form-select">
            <option>すべて</option>
            <option>小学校</option>
            <option>中学校</option>
            <option>高等学校</option>
            <option>特別支援学校</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">職種</label>
          <select class="form-select">
            <option>すべて</option>
            <option>教諭</option>
            <option>指導主事</option>
            <option>管理主事</option>
            <option>校長</option>
            <option>事務職員</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">ステータス</label>
          <select class="form-select">
            <option>すべて</option>
            <option>在籍</option>
            <option>休職中</option>
            <option>退職</option>
            <option>転出</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">所属クラス</label>
          <input class="form-input" placeholder="例: 3年A組">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">クリア</button>
      <button class="btn btn-primary modal-close">適用</button>
    </div>
  </div>
</div>

<!-- Add Person Modal -->
<div class="modal-overlay" id="add-person-modal">
  <div class="modal">
    <div class="modal-header">
      <h2>新規人物登録</h2>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">姓</label>
          <input class="form-input" placeholder="例: 埼玉">
        </div>
        <div class="form-group">
          <label class="form-label">名</label>
          <input class="form-input" placeholder="例: 花子">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">姓（かな）</label>
          <input class="form-input" placeholder="さいたま">
        </div>
        <div class="form-group">
          <label class="form-label">名（かな）</label>
          <input class="form-input" placeholder="はなこ">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">メールアドレス</label>
        <input class="form-input" type="email" placeholder="hanako.saitama@edu-saitama.jp">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">職種</label>
          <select class="form-select">
            <option>教諭</option>
            <option>指導主事</option>
            <option>管理主事</option>
            <option>校長</option>
            <option>事務職員</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">所属組織</label>
          <select class="form-select">
            <option>埼玉県教育委員会</option>
            <option>さいたま市教育委員会</option>
            <option>川口市教育委員会</option>
          </select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost modal-close">キャンセル</button>
      <button class="btn btn-primary modal-close">登録する</button>
    </div>
  </div>
</div>`,
  "settings": `<div class="page-header">
  <div class="page-title-group">
    <h1>設定</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>設定</span>
    </div>
  </div>
</div>

<div class="grid-2">
  <div class="card">
    <div class="card-header">
      <span class="card-title">アカウント設定</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
        <span style="font-size:0.85rem;color:var(--text-secondary);">表示名</span>
        <span style="font-size:0.85rem;color:var(--text-primary);">田中 管理者</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
        <span style="font-size:0.85rem;color:var(--text-secondary);">メールアドレス</span>
        <span style="font-size:0.85rem;color:var(--text-primary);">admin.tanaka@edu-saitama.jp</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;">
        <span style="font-size:0.85rem;color:var(--text-secondary);">役割</span>
        <span class="tag tag-red">システム管理者</span>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">テナント設定</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
        <span style="font-size:0.85rem;color:var(--text-secondary);">テナント名</span>
        <span style="font-size:0.85rem;color:var(--text-primary);">埼玉県</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
        <span style="font-size:0.85rem;color:var(--text-secondary);">GCP プロジェクト ID</span>
        <span style="font-size:0.85rem;color:var(--text-primary);">prod-edu-nexus-saitama</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;">
        <span style="font-size:0.85rem;color:var(--text-secondary);">データベース</span>
        <span style="font-size:0.85rem;color:var(--text-primary);">saitama-edu-db (us-central1)</span>
      </div>
    </div>
  </div>
</div>`,
  "sync": `<div class="page-header">
  <div class="page-title-group">
    <h1>Google Workspace 同期</h1>
    <div class="breadcrumb">
      <a href="#" data-page="dashboard">ホーム</a>
      <span class="sep">/</span>
      <span>Google Workspace 同期</span>
    </div>
  </div>
  <div class="page-actions">
    <button class="btn btn-primary btn-sm">🔄 今すぐ同期</button>
  </div>
</div>

<div class="grid-2-1">
  <div>
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">同期ステータス</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(42,157,143,0.1);border-radius:var(--radius-sm);border:1px solid rgba(42,157,143,0.3);">
          <div>
            <div style="font-size:0.9rem;color:var(--emerald-light);font-weight:500;">🟢 同期状態: 正常</div>
            <div style="font-size:0.8rem;color:var(--text-muted);">最終同期: 2026/06/11 15:00</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.85rem;color:var(--text-primary);">1,284 件</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">最終同期件数</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-secondary);">同期方向</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">EduNexus → Google Workspace（一方通行）</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-secondary);">同期対象ドメイン</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">edu-saitama.jp</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">前回同期からの変更</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">23 件の保留変更あり</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">同期履歴</span>
      </div>
      <div class="table-container" style="border:none;margin:-8px -24px;">
        <table>
          <thead>
            <tr>
              <th>日時</th>
              <th>種別</th>
              <th>同期件数</th>
              <th>エラー</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026/06/11 15:00</td>
              <td>定期同期</td>
              <td>1,284</td>
              <td>0</td>
              <td><span class="tag tag-green">成功</span></td>
            </tr>
            <tr>
              <td>2026/06/10 15:00</td>
              <td>定期同期</td>
              <td>892</td>
              <td>3</td>
              <td><span class="tag tag-orange">一部エラー</span></td>
            </tr>
            <tr>
              <td>2026/06/09 15:00</td>
              <td>定期同期</td>
              <td>2,100</td>
              <td>0</td>
              <td><span class="tag tag-green">成功</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div>
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <span class="card-title">同期設定</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <input type="checkbox" checked style="accent-color:var(--terracotta);"> 氏名を同期
        </label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <input type="checkbox" checked style="accent-color:var(--terracotta);"> メールアドレスを同期
        </label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <input type="checkbox" checked style="accent-color:var(--terracotta);"> 所属組織を同期
        </label>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);padding:8px 0;">
          <input type="checkbox" style="accent-color:var(--terracotta);"> カスタム属性を同期
        </label>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">スケジュール</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(42,64,112,0.3);">
          <span style="font-size:0.85rem;color:var(--text-secondary);">定期同期</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">毎日 15:00</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
          <span style="font-size:0.85rem;color:var(--text-secondary);">次回同期</span>
          <span style="font-size:0.85rem;color:var(--text-primary);">2026/06/13 15:00</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
};
