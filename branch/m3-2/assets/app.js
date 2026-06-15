/* Composer EDU — shared layout & interactions */
(function () {
  "use strict";

  const NAV = [
    {
      section: "ホーム",
      items: [
        { id: "home", icon: "space_dashboard", label: "ダッシュボード", href: "index.html" },
        { id: "dashboards", icon: "dashboard_customize", label: "ダッシュボード管理", href: "dashboards.html" },
      ],
    },
    {
      section: "名簿サービス",
      items: [
        { id: "roster", icon: "groups", label: "名簿レジストリ", href: "roster.html" },
        { id: "transfers", icon: "swap_horiz", label: "所属変更申請", href: "transfers.html", count: 4 },
        { id: "import", icon: "upload_file", label: "CSVインポート", href: "import.html" },
        { id: "import-mappings", icon: "rule", label: "取込マッピング・変換", href: "import-mappings.html" },
        { id: "jobs", icon: "manage_history", label: "処理状況・ログ", href: "jobs.html", count: 2 },
      ],
    },
    {
      section: "組織・アカウント",
      items: [
        { id: "org", icon: "account_tree", label: "組織管理", href: "org.html" },
        { id: "accounts", icon: "badge", label: "アカウント管理", href: "accounts.html" },
        { id: "permissions", icon: "admin_panel_settings", label: "権限ポリシー", href: "permissions.html" },
      ],
    },
    {
      section: "フォームサービス",
      items: [
        { id: "forms", icon: "dynamic_form", label: "フォーム", href: "forms.html" },
        { id: "form-results", icon: "leaderboard", label: "集計・結果", href: "form-results.html" },
      ],
    },
    {
      section: "データ利活用",
      items: [
        { id: "analytics", icon: "query_stats", label: "分析ダッシュボード", href: "analytics.html" },
      ],
    },
    {
      section: "監査・セキュリティ",
      items: [
        { id: "audit", icon: "policy", label: "監査ログ", href: "audit-log.html", count: 3 },
      ],
    },
    {
      section: "テナント設定",
      items: [
        { id: "attributes", icon: "tune", label: "属性項目定義", href: "attributes.html" },
        { id: "org-attributes", icon: "account_tree", label: "組織別 属性上書き", href: "org-attributes.html" },
        { id: "codes", icon: "data_object", label: "コードマスター", href: "codes.html" },
        { id: "code-standards", icon: "lan", label: "コード標準マッピング", href: "code-standards.html" },
      ],
    },
  ];

  const NOTIFICATIONS = [
    { icon: "error", cls: "red", title: "CSVインポートでエラー (12件)", sub: "教員名簿一括更新 #JOB-20260612-003", time: "8分前", href: "jobs.html" },
    { icon: "approval", cls: "gold", title: "所属変更の承認依頼が4件あります", sub: "松本市立開成中学校 ほか", time: "32分前", href: "transfers.html" },
    { icon: "dynamic_form", cls: "indigo", title: "「ICT活用状況調査」回答率が80%に到達", sub: "回答 1,022 / 対象 1,274", time: "2時間前", href: "form-results.html" },
    { icon: "sync", cls: "green", title: "Workspace同期が完了しました", sub: "更新 248件 / スキップ 3件", time: "今日 04:00", href: "accounts.html" },
  ];

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function icon(name, extra) {
    return `<span class="material-symbols-rounded${extra ? " " + extra : ""}">${name}</span>`;
  }

  /* ---------- header ---------- */
  function buildHeader() {
    const h = el(`<header class="gh">
      <a class="gh-logo" href="index.html">
        <span class="mark">${icon("hub")}</span>
        <span>Composer&nbsp;EDU<small>統合校務プラットフォーム</small></span>
      </a>
      <button class="gh-tenant" id="gh-tenant">
        <span class="dot"></span>長野県教育委員会${icon("expand_more", "sm")}
      </button>
      <div class="gh-search" id="gh-search">
        ${icon("search")}<span>名簿・組織・フォームを横断検索…</span><kbd>Ctrl K</kbd>
      </div>
      <div class="gh-spacer"></div>
      <div class="dd">
        <button class="gh-iconbtn" id="gh-bell" title="通知">${icon("notifications")}<span class="badge-dot"></span></button>
        <div class="dd-menu" id="gh-bell-menu">
          <div class="dd-h">${icon("notifications", "sm")} 通知 <span class="chip red" style="margin-left:auto">未読 4</span></div>
          ${NOTIFICATIONS.map(n => `
            <a class="dd-item" href="${n.href}">
              <span class="ic chip ${n.cls}" style="border-radius:8px">${icon(n.icon, "sm")}</span>
              <span style="min-width:0"><b>${n.title}</b><span>${n.sub}</span></span>
              <time>${n.time}</time>
            </a>`).join("")}
        </div>
      </div>
      <button class="gh-iconbtn" title="ヘルプ" onclick="Composer.toast('ヘルプセンターを開きます（モック）')">${icon("help")}</button>
      <div class="dd">
        <div class="gh-user" id="gh-user">
          <span class="avatar">山田</span>
          <span class="meta"><b>山田 太郎</b><span>県教委・システム管理者</span></span>
          ${icon("expand_more", "sm")}
        </div>
        <div class="dd-menu" id="gh-user-menu" style="min-width:230px">
          <div class="dd-h">${icon("person", "sm")} t-yamada@pref-nagano.ed.jp</div>
          <a class="dd-item" href="#" onclick="Composer.toast('プロフィール（モック）');return false;"><span class="ic">${icon("manage_accounts","sm")}</span><span><b>プロフィール設定</b></span></a>
          <a class="dd-item" href="permissions.html"><span class="ic">${icon("shield_person","sm")}</span><span><b>自分の権限を確認</b></span></a>
          <a class="dd-item" href="#" onclick="Composer.toast('ログアウトしました（モック）');return false;"><span class="ic">${icon("logout","sm")}</span><span><b>ログアウト</b></span></a>
        </div>
      </div>
    </header>`);
    return h;
  }

  /* ---------- sidebar ---------- */
  function buildSidebar(active) {
    const nav = el(`<nav class="sidebar" aria-label="メインナビゲーション"></nav>`);
    NAV.forEach(sec => {
      const s = el(`<div class="sb-section"><div class="sb-label">${sec.section}</div></div>`);
      sec.items.forEach(it => {
        s.appendChild(el(`<a class="sb-item${it.id === active ? " active" : ""}" href="${it.href}">
          ${icon(it.icon)}<span>${it.label}</span>${it.count ? `<span class="count">${it.count}</span>` : ""}
        </a>`));
      });
      nav.appendChild(s);
    });
    nav.appendChild(el(`<div class="sb-foot">
      <b>テナント</b>: nagano-pref-edu<br>
      GCP: composer-nagano-prod<br>
      v4.2.1 / 最終同期 04:00
    </div>`));
    return nav;
  }

  /* ---------- mount ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const active = body.dataset.page || "";
    const main = document.querySelector("main");

    const shell = el(`<div class="shell"></div>`);
    body.insertBefore(buildHeader(), body.firstChild);
    body.insertBefore(shell, main);
    shell.appendChild(buildSidebar(active));
    if (main) { main.classList.add("main"); shell.appendChild(main); }

    body.appendChild(el(`<div id="toast-zone"></div>`));

    // dropdowns
    bindDropdown("gh-bell", "gh-bell-menu");
    bindDropdown("gh-user", "gh-user-menu");
    document.getElementById("gh-tenant").addEventListener("click", () =>
      Composer.toast("テナントは 1県=1GCPプロジェクト で分離されています"));
    document.getElementById("gh-search").addEventListener("click", () =>
      Composer.toast("横断検索（モック）"));

    // tabs (generic)
    document.querySelectorAll("[data-tabs]").forEach(group => {
      const name = group.dataset.tabs;
      group.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
          group.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          document.querySelectorAll(`[data-tab-panel="${name}"]`).forEach(p => {
            p.classList.toggle("active", p.dataset.tab === tab.dataset.tab);
          });
        });
      });
    });

    // modal close on backdrop click / ESC
    document.querySelectorAll(".modal-backdrop").forEach(bd => {
      bd.addEventListener("click", e => { if (e.target === bd) bd.classList.remove("open"); });
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") document.querySelectorAll(".modal-backdrop.open").forEach(m => m.classList.remove("open"));
    });
  });

  function bindDropdown(btnId, menuId) {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const was = menu.classList.contains("open");
      document.querySelectorAll(".dd-menu.open").forEach(m => m.classList.remove("open"));
      if (!was) menu.classList.add("open");
    });
    document.addEventListener("click", () => menu.classList.remove("open"));
    menu.addEventListener("click", e => e.stopPropagation());
  }

  /* ---------- public api ---------- */
  window.Composer = {
    openModal(id) { const m = document.getElementById(id); if (m) m.classList.add("open"); },
    closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove("open"); },
    toast(msg, type) {
      const zone = document.getElementById("toast-zone");
      const t = el(`<div class="toast${type === "err" ? " err" : ""}">
        ${icon(type === "err" ? "error" : "check_circle")}<span>${msg}</span></div>`);
      zone.appendChild(t);
      setTimeout(() => { t.style.transition = "opacity .3s, transform .3s"; t.style.opacity = "0"; t.style.transform = "translateX(20px)"; }, 3400);
      setTimeout(() => t.remove(), 3800);
    },
  };
})();
