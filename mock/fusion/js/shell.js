/* =========================================================================
   共通シェル：グローバルヘッダー / サイドバー / モーダル / トースト
   各ページは <body data-page="..."> を指定して renderShell() を呼ぶ
   ========================================================================= */

const NAV = [
  { group: "ホーム", items: [
    { id:"dashboard", label:"ダッシュボード", icon:"grid", href:"index.html" },
  ]},
  { group: "名簿・組織", items: [
    { id:"roster",   label:"名簿管理", icon:"users", href:"roster.html" },
    { id:"org",      label:"組織管理", icon:"sitemap", href:"org.html" },
    { id:"transfers",label:"所属変更", icon:"swap", href:"transfers.html", badge:"2" },
  ]},
  { group: "データ取込・連携", items: [
    { id:"import",   label:"CSVインポート", icon:"upload", href:"import.html" },
    { id:"logs",     label:"処理ログ", icon:"list", href:"logs.html", badge:"!", danger:true },
  ]},
  { group: "フォーム", items: [
    { id:"forms",    label:"フォーム", icon:"form", href:"forms.html" },
  ]},
  { group: "設定", items: [
    { id:"attributes", label:"属性項目設定", icon:"sliders", href:"attributes.html" },
    { id:"codes",      label:"コードマスター", icon:"code", href:"codes.html" },
    { id:"permissions",label:"権限管理", icon:"shield", href:"permissions.html" },
  ]},
];

function renderShell() {
  const page = document.body.dataset.page || "dashboard";

  // ---- header ----
  const header = `
  <header class="gheader">
    <button class="icon-btn menu-toggle" onclick="document.querySelector('.sidebar').classList.toggle('open')">${icon('menu',20)}</button>
    <a class="gheader__brand" href="index.html">
      <div class="gheader__logo">学</div>
      <div class="gheader__name">Gakuto<small>EDU PLATFORM</small></div>
    </a>
    <button class="tenant-switch" onclick="openTenantModal()">
      <span class="dot"></span>${TENANT.name} ${icon('chevronDown',14)}
    </button>
    <div class="gsearch">
      ${icon('search',16)}
      <input placeholder="人物・組織・フォームを横断検索…" onkeydown="if(event.key==='Enter')toast('「'+this.value+'」で検索しました','info')">
      <kbd>⌘K</kbd>
    </div>
    <div class="gheader__actions">
      <button class="icon-btn" title="ヘルプ">${icon('help',20)}</button>
      <button class="icon-btn" title="通知" onclick="openNotif()">${icon('bell',20)}<span class="badge">4</span></button>
      <button class="icon-btn" title="設定" onclick="location.href='attributes.html'">${icon('settings',20)}</button>
      <button class="gheader__user" onclick="openUserMenu()">
        <div class="avatar">山本</div>
        <div class="meta"><b>山本 陽菜</b><span>教育委員会管理者</span></div>
        ${icon('chevronDown',14)}
      </button>
    </div>
  </header>`;

  // ---- sidebar ----
  const nav = NAV.map(g => `
    <div class="nav-group">
      <div class="nav-group__label">${g.group}</div>
      ${g.items.map(it => `
        <a class="nav-item ${it.id===page?'active':''}" href="${it.href}">
          ${icon(it.icon,18)}<span>${it.label}</span>
          ${it.badge?`<span class="pill ${it.danger?'danger':''}">${it.badge}</span>`:''}
        </a>`).join('')}
    </div>`).join('');

  const sidebar = `
  <aside class="sidebar">
    <div class="sidebar__scroll">${nav}</div>
    <div class="sidebar__foot">
      <div class="help-card">
        <b>サポートが必要ですか？</b>
        <p>取込エラーや権限設定について管理者へ問い合わせできます。</p>
        <button class="btn btn-secondary btn-sm" style="width:100%" onclick="openContactModal()">${icon('send',14)} 問い合わせ</button>
      </div>
    </div>
  </aside>`;

  document.getElementById('shell-header').innerHTML = header;
  document.getElementById('shell-sidebar').innerHTML = sidebar;
}

/* =========================================================================
   モーダル
   ========================================================================= */
function modal(html, size = "") {
  let overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<div class="modal ${size}">${html}</div>`;
  requestAnimationFrame(() => overlay.classList.add('open'));
}
function closeModal() {
  const o = document.getElementById('modal-overlay');
  if (o) o.classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function modalShell({title, sub, icon:ic, iconBg='var(--brand-50)', iconColor='var(--brand-600)', body, foot, size=''}) {
  modal(`
    <div class="modal__head">
      ${ic?`<div class="mi" style="background:${iconBg};color:${iconColor}">${icon(ic,20)}</div>`:''}
      <div><h3>${title}</h3>${sub?`<p>${sub}</p>`:''}</div>
      <button class="icon-btn close" onclick="closeModal()">${icon('x',18)}</button>
    </div>
    <div class="modal__body">${body}</div>
    ${foot?`<div class="modal__foot">${foot}</div>`:''}
  `, size);
}

/* =========================================================================
   トースト
   ========================================================================= */
function toast(msg, type = "ok") {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const ic = type === 'ok' ? 'check' : type === 'err' ? 'x' : 'bell';
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="ti">${icon(ic,14)}</span><span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = '.25s'; setTimeout(() => t.remove(), 260); }, 2800);
}

/* =========================================================================
   共通モーダル群（ヘッダー由来）
   ========================================================================= */
function openNotif() {
  const items = NOTIFICATIONS.map(n => {
    const color = n.type==='err'?'var(--err-500)':n.type==='warn'?'var(--warn-500)':'var(--brand-500)';
    const bg = n.type==='err'?'var(--err-50)':n.type==='warn'?'var(--warn-50)':'var(--brand-50)';
    return `<a href="${n.link}" style="display:flex;gap:12px;padding:13px;border-radius:11px;border:1px solid var(--ink-100);margin-bottom:8px;align-items:flex-start" onmouseover="this.style.background='var(--ink-50)'" onmouseout="this.style.background='#fff'">
      <span style="width:32px;height:32px;border-radius:9px;background:${bg};color:${color};display:grid;place-items:center;flex-shrink:0">${icon(n.type==='err'?'alert':n.type==='warn'?'clock':'bell',16)}</span>
      <div style="flex:1"><b style="font-size:13px;color:var(--ink-800)">${n.title}</b><div style="font-size:12.5px;color:var(--ink-500);margin-top:2px">${n.desc}</div><div style="font-size:11px;color:var(--ink-400);margin-top:4px">${n.at}</div></div>
    </a>`;
  }).join('');
  modalShell({ title:"通知", sub:"4件の未読・うちエラー2件", icon:"bell", iconBg:"var(--err-50)", iconColor:"var(--err-500)",
    body: items + `<div style="text-align:center;margin-top:6px"><a href="logs.html" style="color:var(--brand-600);font-weight:700;font-size:13px">処理ログで全件を確認 →</a></div>` });
}
function openUserMenu() {
  modalShell({ title:"山本 陽菜", sub:"hina.yamamoto@city.yamada.lg.jp", icon:"user",
    body:`<dl class="kv"><dt>職種</dt><dd>教育委員会管理者</dd><dt>所属</dt><dd>青葉市教育委員会 / 学務課</dd><dt>権限</dt><dd><span class="badge-s b-brand">CSV直接インポート可</span> <span class="badge-s b-ok">承認スキップ可</span></dd><dt>Google連携</dt><dd><span class="badge-s b-ok"><span class="dot"></span>同期中</span></dd></dl>`,
    foot:`<button class="btn btn-secondary" onclick="closeModal()">閉じる</button><button class="btn btn-ghost" style="color:var(--err-600)" onclick="toast('ログアウトしました','info');closeModal()">${icon('logout',16)} ログアウト</button>` });
}
function openTenantModal() {
  modalShell({ title:"テナント（県）の切替", sub:"1県=1テナント。データは GCP プロジェクト単位で分離されています", icon:"database",
    body:`
      <div style="display:flex;flex-direction:column;gap:8px">
        ${[["山田県","gakuto-yamada-pref",true],["緑野県","gakuto-midorino-pref",false],["白波県","gakuto-shiranami-pref",false]].map(([n,p,act])=>`
          <button class="scope-row" style="cursor:pointer;text-align:left;width:100%" onclick="toast('${n} に切り替えました','ok');closeModal()">
            <span style="width:36px;height:36px;border-radius:10px;background:var(--brand-50);color:var(--brand-600);display:grid;place-items:center">${icon('database',18)}</span>
            <div style="flex:1"><b style="font-size:13.5px">${n}</b><div style="font-size:12px;color:var(--ink-400);font-family:var(--font-num)">${p}</div></div>
            ${act?'<span class="badge-s b-ok"><span class="dot"></span>接続中</span>':'<span class="badge-s b-gray">切替</span>'}
          </button>`).join('')}
      </div>
      <div class="alert info mt-16"><span class="ai">${icon('shield',16)}</span><div>各テナントは独立した GCP プロジェクト・データベースで稼働し、他テナントのデータと混在しません。</div></div>`,
    foot:`<button class="btn btn-secondary" onclick="closeModal()">閉じる</button>` });
}
function openContactModal() {
  modalShell({ title:"システム管理者へ問い合わせ", sub:"取込エラーや権限についての質問を送信します", icon:"send",
    body:`
      <div class="form-row"><label>種別</label><select class="input"><option>CSVインポートのエラーについて</option><option>権限設定について</option><option>所属変更・承認フローについて</option><option>その他</option></select></div>
      <div class="form-row"><label>関連ジョブ / 画面（任意）</label><input class="input" placeholder="例：JOB-8842"></div>
      <div class="form-row"><label>内容<span class="req">*</span></label><textarea class="textarea" placeholder="問い合わせ内容を入力してください"></textarea></div>`,
    foot:`<button class="btn btn-secondary" onclick="closeModal()">キャンセル</button><button class="btn btn-primary" onclick="toast('問い合わせを送信しました','ok');closeModal()">${icon('send',16)} 送信</button>` });
}

document.addEventListener('DOMContentLoaded', renderShell);
