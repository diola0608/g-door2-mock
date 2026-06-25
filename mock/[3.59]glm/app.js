/* App shell: global header + sidebar layout, hash router, page registry.
   Each service registers its pages via App.page().
   The router matches #/service/segment and renders into #content. */
window.App = (function(){
  const I = window.Icon;
  const D = window.DUMMY;
  const UI = window.UI;

  /* Page registry: flat list of {id, path, label, group, icon, render(ctx)} */
  const pages = [];
  /* Service groups for sidebar */
  const groups = [];

  function page(def){ pages.push(def); }
  function group(def){ groups.push(def); }

  /* ---------- Layout ---------- */
  function renderShell(){
    const root = document.getElementById('app');
    root.innerHTML = `
      <div class="app-shell">
        <header class="gheader">
          <div class="gheader-brand">
            <div class="mark">青</div>
            <div>
              <div class="name">あおば教育情報プラットフォーム</div>
              <div class="sub">青葉県教育委員会 テナント</div>
            </div>
          </div>
          <div class="gheader-search">
            <span class="sicon">${I.svg('search',16)}</span>
            <input type="text" placeholder="名簿・フォーム・組織を検索…" />
          </div>
          <div class="gheader-spacer"></div>
          <div class="gheader-actions">
            <button class="gh-btn" data-go="#/" title="ホーム">${I.svg('home',16)}<span class="hide-sm">ホーム</span></button>
            <button class="gh-btn has-dot" data-go="#/logs" title="通知">${I.svg('bell',16)}<span class="badge-dot"></span></button>
            <button class="gh-btn" title="ヘルプ">${I.svg('help',16)}</button>
            <div class="divider-v" style="height:24px;margin:0 4px;background:rgba(255,255,255,.12)"></div>
            <div class="gh-user" data-menu="user">
              <span class="ava ava-amber">${D.user.initials}</span>
              <div class="meta">
                <div class="nm">${D.user.name}</div>
                <div class="rl">${D.user.role}</div>
              </div>
            </div>
          </div>
        </header>
        <div class="app-body">
          <aside class="sidebar" id="sidebar"></aside>
          <main class="content">
            <div id="content" class="page page-anim"></div>
          </main>
        </div>
      </div>`;
    I.scan(root);
    root.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>location.hash=el.dataset.go));
    root.querySelector('.gh-user').addEventListener('click', userMenu);
    renderSidebar();
  }

  function renderSidebar(){
    const sb = document.getElementById('sidebar');
    const activePath = location.hash.replace(/^#/,'') || '/';
    const activeBase = '/'+(activePath.split('/')[1]||'');
    sb.innerHTML = `
      <div class="sidebar-org">
        <div class="label">現在の組織スコープ</div>
        <div class="tenant"><span class="dot"></span> ${D.tenant.name}</div>
        <div class="scope">${I.svg('layers',12)} テナント全体（全組織） ${I.svg('chevron-down',12)}</div>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-group">
          <div class="gtitle">ランチャー</div>
          <a class="sidebar-item ${activeBase==='/'?'active':''}" href="#/">
            ${I.svg('home',17)} <span>ダッシュボード</span>
          </a>
        </div>
        ${groups.map(g=>{
          const inGroup = pages.filter(p=>p.group===g.id);
          const groupActive = inGroup.some(p=>activeBase===p.path.split('/')[1] && matchPath(activePath,p.path));
          return `<div class="sidebar-group">
            <div class="gtitle">${g.label}</div>
            ${inGroup.map(p=>{
              const isAct = matchPath(activePath, p.path);
              return `<a class="sidebar-item ${isAct?'active':''}" href="#${p.path}">
                ${I.svg(p.icon||'circle',17)} <span>${p.label}</span>
                ${p.count!=null?`<span class="count">${p.count}</span>`:''}
                ${p.pill?`<span class="pill">${p.pill}</span>`:''}
              </a>`;
            }).join('')}
          </div>`;
        }).join('')}
        <div class="sidebar-group">
          <div class="gtitle">システム</div>
          <a class="sidebar-item ${matchPath(activePath,'/logs')?'active':''}" href="#/logs">${I.svg('activity',17)} <span>処理ログ</span><span class="pill">1</span></a>
          <a class="sidebar-item ${matchPath(activePath,'/settings')?'active':''}" href="#/settings">${I.svg('settings',17)} <span>設定</span></a>
        </div>
      </nav>
      <div class="sidebar-foot">
        <div class="row between"><span>環境</span><span class="v">本番 (PRD)</span></div>
        <div class="row between"><span>GCP</span><span class="v">${D.tenant.gcpProject}</span></div>
        <div class="row between"><span>DB</span><span class="v">${D.tenant.dbProject}</span></div>
        <div class="row between"><span>ワークスペース</span><span class="v">${D.tenant.workspaceDomain}</span></div>
      </div>`;
    I.scan(sb);
  }

  function matchPath(current, def){
    // current like '/roster/person/P1001' ; def like '/roster' or '/roster/person'
    if (!current) current = '/';
    if (def === '/') return current === '/';
    const parts = def.split('/').filter(Boolean);
    const curParts = current.split('/').filter(Boolean);
    if (curParts.length < parts.length) return false;
    return parts.every((p,i)=> p.startsWith(':') || p===curParts[i]);
  }

  function userMenu(e){
    const existing = document.querySelector('[data-user-menu]');
    if (existing){ existing.remove(); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const m = document.createElement('div');
    m.setAttribute('data-user-menu','');
    m.style.cssText = `position:fixed;top:${rect.bottom+6}px;left:${rect.left}px;z-index:500;background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--sh-3);width:240px;padding:6px`;
    m.innerHTML = `
      <div style="padding:10px 10px;border-bottom:1px solid var(--line);margin-bottom:4px">
        <div style="font-weight:700;font-size:13px">${D.user.name}</div>
        <div style="font-size:11px;color:var(--ink-3)">${D.user.email}</div>
        <div style="margin-top:6px">${UI.badge(D.user.role,'navy')} ${UI.badge(D.user.org,'neutral')}</div>
      </div>
      <a class="sidebar-item" href="#/accounts">${I.svg('user',16)} アカウント情報</a>
      <a class="sidebar-item" href="#/settings">${I.svg('settings',16)} テナント設定</a>
      <div class="sidebar-item">${I.svg('help',16)} ヘルプ・マニュアル</div>
      <div style="border-top:1px solid var(--line);margin:4px 0"></div>
      <div class="sidebar-item" style="color:var(--danger)">${I.svg('log-out',16)} ログアウト</div>`;
    document.body.appendChild(m);
    I.scan(m);
    setTimeout(()=>{
      function out(ev){ if(!m.contains(ev.target)){ m.remove(); document.removeEventListener('mousedown', out);} }
      document.addEventListener('mousedown', out);
    },0);
  }

  /* ---------- Router ---------- */
  function render(){
    const path = location.hash.replace(/^#/,'') || '/';
    const el = document.getElementById('content');
    const def = resolve(path);
    if (!def){
      el.innerHTML = notFound(path);
      I.scan(el);
      renderSidebar();
      return;
    }
    el.className = 'page page-anim';
    try {
      def.render({ path, el, params: extractParams(path, def.path) });
    } catch(err){
      el.innerHTML = `<div class="banner banner-danger">${I.svg('alert-triangle',18)}<div class="body"><div class="title">ページの描画でエラーが発生しました</div>${err.message}</div></div>`;
      console.error(err);
    }
    I.scan(el);
    renderSidebar();
    el.scrollIntoView({block:'start'});
  }

  function resolve(path){
    if (path === '/') return pages.find(p=>p.path==='/');
    let best=null,bestScore=-1;
    for (const p of pages){
      if (p.path === '/') continue;
      if (matchPath(path, p.path)){
        // Prefer: deeper match, then literal segments over :params
        const segs = p.path.split('/').filter(Boolean);
        const depth = segs.length;
        const literals = segs.filter(s=>!s.startsWith(':')).length;
        const score = depth*1000 + literals;
        if (score>bestScore){ bestScore=score; best=p; }
      }
    }
    return best;
  }
  function extractParams(path, defPath){
    const params={};
    const pp = defPath.split('/').filter(Boolean);
    const cp = path.split('/').filter(Boolean);
    pp.forEach((seg,i)=>{ if(seg.startsWith(':')) params[seg.slice(1)] = cp[i]; });
    return params;
  }

  function notFound(path){
    return `<div class="empty" style="padding:80px 20px">${I.svg('alert-triangle',48)}<h3>ページが見つかりません</h3><p>${path} に対応するページが存在しません。</p><div class="mt-12"><a class="btn btn-primary" href="#/">ダッシュボードへ</a></div></div>`;
  }

  function init(){
    renderShell();
    window.addEventListener('hashchange', render);
    if (!location.hash) location.hash = '#/';
    else render();
  }

  return { page, group, init, render, matchPath, resolve };
})();
