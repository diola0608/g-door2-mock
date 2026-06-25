/* UI helpers: modal, drawer, toast, confirm, and reusable render helpers. */
window.UI = (function(){
  const I = window.Icon;

  /* ---------- Modal ---------- */
  function modal({title, sub, icon, size, body, footer, onClose}){
    const back = document.createElement('div');
    back.className = 'modal-backdrop';
    const sizeCls = size ? ' '+size : '';
    back.innerHTML = `
      <div class="modal${sizeCls}" role="dialog" aria-modal="true">
        <div class="modal-head">
          <div class="t">
            ${icon ? I.svg(icon,20) : ''}
            <div>
              <h3>${title||''}</h3>
              ${sub ? `<div class="sub">${sub}</div>` : ''}
            </div>
          </div>
          <button class="modal-close" data-close aria-label="閉じる">${I.svg('x')}</button>
        </div>
        <div class="modal-body"></div>
        ${footer ? `<div class="modal-foot">${footer}</div>` : ''}
      </div>`;
    const bodyEl = back.querySelector('.modal-body');
    if (typeof body === 'string') bodyEl.innerHTML = body;
    else if (body instanceof Node) bodyEl.appendChild(body);
    back.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click', close));
    back.addEventListener('mousedown', e=>{ if(e.target===back) close(); });
    document.addEventListener('keydown', escClose);
    function escClose(e){ if(e.key==='Escape'){ close(); } }
    function close(){ back.classList.remove('open'); document.removeEventListener('keydown', escClose); setTimeout(()=>{ back.remove(); onClose&&onClose(); }, 160); }
    document.body.appendChild(back);
    requestAnimationFrame(()=>back.classList.add('open'));
    I.scan(back);
    return { el:back, body:bodyEl, close };
  }

  /* ---------- Drawer ---------- */
  function drawer({title, sub, icon, size, body, footer}){
    const back = document.createElement('div');
    back.className = 'drawer-backdrop';
    const dw = document.createElement('div');
    dw.className = 'drawer' + (size==='lg' ? ' lg' : '');
    dw.innerHTML = `
      <div class="drawer-head">
        <div class="t">
          ${icon ? I.svg(icon,18) : ''}
          <div>
            <h3>${title||''}</h3>
            ${sub ? `<div class="sub">${sub}</div>` : ''}
          </div>
        </div>
        <button class="modal-close" data-close>${I.svg('x')}</button>
      </div>
      <div class="drawer-body"></div>
      ${footer ? `<div class="drawer-foot">${footer}</div>` : ''}`;
    const bodyEl = dw.querySelector('.drawer-body');
    if (typeof body === 'string') bodyEl.innerHTML = body;
    else if (body instanceof Node) bodyEl.appendChild(body);
    back.addEventListener('mousedown', e=>{ if(e.target===back) close(); });
    dw.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click', close));
    function close(){ back.classList.remove('open'); dw.classList.remove('open'); setTimeout(()=>{ back.remove(); dw.remove(); }, 220); }
    document.body.appendChild(back);
    document.body.appendChild(dw);
    requestAnimationFrame(()=>{ back.classList.add('open'); dw.classList.add('open'); });
    I.scan(dw);
    return { back, el:dw, body:bodyEl, close };
  }

  /* ---------- Toast ---------- */
  function ensureToastWrap(){
    let w = document.querySelector('.toast-wrap');
    if (!w){ w = document.createElement('div'); w.className='toast-wrap'; document.body.appendChild(w); }
    return w;
  }
  function toast({title, msg, kind, duration}){
    const w = ensureToastWrap();
    const t = document.createElement('div');
    t.className = 'toast ' + (kind||'');
    const ico = kind==='ok'?'check-circle':kind==='danger'?'alert-triangle':kind==='warn'?'alert-triangle':'info';
    t.innerHTML = `${I.svg(ico)}<div class="body"><div class="ttl">${title||''}</div>${msg?`<div class="msg">${msg}</div>`:''}</div>`;
    w.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); }, duration||4200);
  }

  /* ---------- Confirm ---------- */
  function confirm({title, msg, okText, cancelText, kind, onOk}){
    const m = modal({
      title: title||'確認', icon: kind==='danger'?'alert-triangle':'info',
      body: `<p style="color:var(--ink-2);font-size:13px;line-height:1.6">${msg||'実行しますか？'}</p>`,
      footer: `
        <div class="left"></div>
        <div class="right">
          <button class="btn" data-close>${cancelText||'キャンセル'}</button>
          <button class="btn ${kind==='danger'?'btn-danger':'btn-primary'}" data-ok>${okText||'実行'}</button>
        </div>`
    });
    m.el.querySelector('[data-ok]').addEventListener('click', ()=>{ m.close(); onOk&&onOk(); });
    return m;
  }

  /* ---------- Reusable render helpers ---------- */
  function badge(text, kind){
    return `<span class="badge badge-${kind||'neutral'}">${text}</span>`;
  }
  function status(text, kind){
    return `<span class="status ${kind||'neutral'}"><span class="d"></span>${text}</span>`;
  }
  function avatar(initial, color, size){
    const s = size==='lg'?' ava-lg':size==='sm'?' ava-sm':'';
    return `<span class="ava ${color||'navy'}${s}">${initial}</span>`;
  }
  function initials(name){
    const n = (name||'').replace(/\s/g,'');
    return n ? n.charAt(0) : '?';
  }
  function crumbs(items){
    return `<div class="crumbs">${items.map((c,i)=>`${i>0?'<span class="sep">'+I.svg('chevron-right',12)+'</span>':''}<a href="${c.href||'#'}">${c.label}</a>`).join('')}</div>`;
  }
  function pageHead({crumbs: crumbItems, title, icon, subtitle, actions}){
    return `<div class="page-head">
      <div class="titles">
        ${crumbItems?crumbs(crumbItems):''}
        <h1>${icon?`<span class="ava-navy" style="width:32px;height:32px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center">${I.svg(icon,18)}</span>`:''} ${title}</h1>
        ${subtitle?`<p class="subtitle">${subtitle}</p>`:''}
      </div>
      ${actions?`<div class="actions">${actions}</div>`:''}
    </div>`;
  }
  function tabs(items, active){
    return `<div class="tabs">${items.map(t=>`<div class="tab ${t.id===active?'active':''}" data-tab="${t.id}">${t.icon?I.svg(t.icon,14):''} ${t.label}${t.count!=null?`<span class="count">${t.count}</span>`:''}</div>`).join('')}</div>`;
  }
  function seg(items, active){
    return `<div class="seg">${items.map(s=>`<button class="${s.id===active?'active':''}" data-seg="${s.id}">${s.label}</button>`).join('')}</div>`;
  }
  function statCard({label, val, delta, dcls, strip, icon}){
    return `<div class="stat">
      <div class="accent-strip ${strip||'navy'}"></div>
      <div class="label">${icon?I.svg(icon,15):''} ${label}</div>
      <div class="val">${val}</div>
      ${delta?`<div class="delta ${dcls||'flat'}">${dcls==='up'?I.svg('trending-up',12):dcls==='down'?I.svg('trending-down',12):''} ${delta}</div>`:''}
    </div>`;
  }
  function empty({icon, title, msg, action}){
    return `<div class="empty">
      ${icon?I.svg(icon,42):''}
      <h4>${title||'データがありません'}</h4>
      ${msg?`<p>${msg}</p>`:''}
      ${action?`<div class="mt-12">${action}</div>`:''}
    </div>`;
  }

  /* simple bar chart */
  function barChart(data, max){
    const m = max || Math.max(...data.map(d=>d.v));
    return `<div class="barchart">${data.map((d,i)=>`<div class="b ${d.peak?'peak':''}" style="height:${Math.max(4, (d.v/m)*100)}%" title="${d.m||d.name}: ${d.v}"></div>`).join('')}</div>`;
  }

  /* bind tab clicks (delegated within a container) */
  function bindTabs(container, onChange){
    container.addEventListener('click', e=>{
      const t = e.target.closest('[data-tab]');
      if (!t) return;
      container.querySelectorAll('[data-tab]').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      onChange && onChange(t.dataset.tab);
    });
  }
  function bindSeg(container, onChange){
    container.addEventListener('click', e=>{
      const t = e.target.closest('[data-seg]');
      if (!t) return;
      container.querySelectorAll('[data-seg]').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      onChange && onChange(t.dataset.seg);
    });
  }

  /* Close the topmost modal/drawer with fade-out */
  function closeTopModal(){
    const b = document.querySelector('.modal-backdrop.open');
    if (b){ b.classList.remove('open'); setTimeout(()=>b.remove(),160); return; }
    const d = document.querySelector('.drawer.open');
    if (d){ const db=d.previousElementSibling; d.classList.remove('open'); db && db.classList.remove('open'); setTimeout(()=>{ d.remove(); db && db.remove(); },220); }
  }

  return { modal, drawer, toast, confirm, badge, status, avatar, initials, crumbs, pageHead, tabs, seg, statCard, empty, barChart, bindTabs, bindSeg, closeTopModal };
})();
