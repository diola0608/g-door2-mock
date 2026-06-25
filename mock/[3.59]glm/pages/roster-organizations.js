/* 名簿管理 — Organization tree (組織ツリー) */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;
  const typeIcon = { テナント:'globe', 市町村:'building', 学校種:'layers', 学校:'building-2', 教育委員会:'shield', 部署:'folder', クラス:'users' };

  App.page({
    path:'/roster/organizations', group:'roster', label:'組織ツリー',
    render({el}){
      let activeOrg = 'tenant';
      const collapsed = new Set();

      function nodeRow(node, depth){
        const hasKids = node.children && node.children.length;
        const isCollapsed = collapsed.has(node.id);
        return `
          <div class="tree-node">
            <div class="tree-row ${node.id===activeOrg?'active':''}" data-org="${node.id}" style="padding-left:${4+depth*0}px">
              <span class="tog ${hasKids?'':'empty'}" data-tog="${node.id}">${hasKids?I.svg(isCollapsed?'chevron-right':'chevron-down',14):''}</span>
              ${I.svg(typeIcon[node.type]||'circle',15)}
              <span class="label">${node.name}</span>
              <span class="meta">${node.type}</span>
              <span class="badge badge-neutral">${node.count.toLocaleString()}</span>
            </div>
            ${hasKids?`<div class="tree-children ${isCollapsed?'collapsed':''}">${node.children.map(c=>nodeRow(c,depth+1)).join('')}</div>`:''}
          </div>`;
      }

      function detail(){
        const org = findOrg(D.orgTree[0], activeOrg) || D.orgTree[0];
        return `
          <div class="card">
            <div class="card-head">
              <div class="t">${I.svg(typeIcon[org.type]||'circle',16)}<div><h3>${org.name}</h3><div class="sub txt-xs muted">${org.type} ? ${org.count.toLocaleString()}名</div></div></div>
              <div class="actions">
                <button class="btn btn-sm" data-add-sub>${I.svg('plus',13)} 配下組織</button>
                <button class="btn btn-sm btn-primary" data-roster>${I.svg('users',13)} 名簿を見る</button>
              </div>
            </div>
            <div class="card-pad">
              <div class="kv">
                <span class="k">組織ID</span><span class="v mono">${org.id}</span>
                <span class="k">種別</span><span class="v">${org.type}</span>
                <span class="k">階層</span><span class="v">${'テナント > 市町村 > 学校種 > 学校'.split(' > ').slice(0, (org.level||0)+1).join(' > ')}</span>
                <span class="k">構成人数</span><span class="v fw-7">${org.count.toLocaleString()}</span>
                <span class="k">配下組織</span><span class="v">${org.children?org.children.length+'組織':'末端組織'}</span>
              </div>
            </div>
          </div>
          <div class="panel-grid g3 mt-16">
            ${UI.statCard({label:'生徒',val:String(Math.round(org.count*0.92)),'delta':'推計',dcls:'flat',strip:'amber'})}
            ${UI.statCard({label:'教員',val:String(Math.round(org.count*0.06)),'delta':'推計',dcls:'flat',strip:'navy'})}
            ${UI.statCard({label:'職員',val:String(Math.round(org.count*0.02)),'delta':'推計',dcls:'flat',strip:'ok'})}
          </div>
          <div class="card mt-16">
            <div class="card-head"><div class="t">${I.svg('layers',16)}<h3>配下組織</h3></div></div>
            ${org.children && org.children.length ? `<div class="tbl-wrap"><table class="tbl tbl-dense"><thead><tr><th>組織名</th><th>種別</th><th class="num">人数</th></tr></thead><tbody>${org.children.map(c=>`<tr><td class="linkcell" data-org="${c.id}">${c.name}</td><td>${UI.badge(c.type,'neutral')}</td><td class="num">${c.count.toLocaleString()}</td></tr>`).join('')}</tbody></table></div>` : `<div class="card-pad">${UI.empty({icon:'folder',title:'配下組織なし',msg:'この組織は末端組織です。'})}</div>`}
          </div>
          <div class="card mt-16">
            <div class="card-head"><div class="t">${I.svg('lock',16)}<h3>権限継承</h3></div></div>
            <div class="card-pad">
              <div class="banner banner-info" style="padding:9px 11px">${I.svg('info',15)}<div class="body txt-xs">この組織は上位組織の権限設定を継承し、独自設定で上書き・追加できます。下位組織へも波及します。</div></div>
              <div class="mt-12 row gap-8">
                <span class="chip chip-navy">継承: ${D.permInheritance[0].own + D.permInheritance[0].inherited}ルール</span>
                <span class="chip chip-amber">独自: 0ルール</span>
                <button class="btn btn-sm" data-go="#/permissions">${I.svg('arrow-right',13)} 権限設定へ</button>
              </div>
            </div>
          </div>`;
      }

      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'名簿管理',href:'#/roster'},{label:'組織ツリー',href:'#/roster/organizations'}],
            title:'組織ツリー', icon:'tree',
            subtitle:'テナントをルートとする階層構造を表示・編集します。各組織の構成人数と権限継承状態を確認できます。',
            actions:`<button class="btn btn-accent" data-add-root>${I.svg('plus',15)} 組織を追加</button>`
          })}
          <div class="grid" style="grid-template-columns:360px 1fr;gap:16px;align-items:start">
            <div class="card">
              <div class="card-head"><div class="t">${I.svg('tree',16)}<h3>組織階層</h3></div>
                <button class="btn btn-sm btn-icon btn-ghost" data-expand-all title="すべて展開">${I.svg('chevron-down',14)}</button>
              </div>
              <div class="card-pad" style="padding:8px">
                <div class="tree">${nodeRow(D.orgTree[0],0)}</div>
              </div>
            </div>
            <div id="org-detail">${detail()}</div>
          </div>
        `;
        I.scan(el);
        el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
        el.querySelectorAll('[data-org]').forEach(b=>b.addEventListener('click',()=>{ activeOrg=b.dataset.org; el.querySelector('#org-detail').innerHTML=detail(); I.scan(el); rebindDetail(); }));
        el.querySelectorAll('[data-tog]').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); const id=b.dataset.tog; if(collapsed.has(id))collapsed.delete(id); else collapsed.add(id); view(); }));
        el.querySelectorAll('[data-expand-all]').forEach(b=>b.addEventListener('click',()=>{ collapsed.clear(); view(); }));
        el.querySelectorAll('[data-add-root],[data-add-sub]').forEach(b=>b.addEventListener('click',addOrgModal));
        rebindDetail();
      }
      function rebindDetail(){
        el.querySelectorAll('#org-detail [data-org]').forEach(b=>b.addEventListener('click',()=>{ activeOrg=b.dataset.org; el.querySelector('#org-detail').innerHTML=detail(); I.scan(el); rebindDetail(); }));
        el.querySelectorAll('#org-detail [data-roster]').forEach(b=>b.addEventListener('click',()=>{ location.hash='#/roster'; UI.toast({title:'組織で絞り込み',msg:'選択した組織で名簿を絞り込み表示します。',kind:'info'}); }));
      }
      view();
    }
  });

  function findOrg(node, id){
    if (node.id===id) return node;
    if (node.children) for (const c of node.children){ const r=findOrg(c,id); if(r) return r; }
    return null;
  }

  function addOrgModal(){
    UI.modal({
      title:'組織を追加', icon:'plus',
      body:`
        <div class="field"><label class="field-label">組織名 <span class="req">*</span></label><input class="input" placeholder="例: 白里市立北小学校"></div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">種別 <span class="req">*</span></label>
            <select class="select"><option>市町村</option><option>学校種</option><option>学校</option><option>教育委員会</option><option>部署</option></select>
          </div>
          <div class="field"><label class="field-label">親組織</label><select class="select"><option>青葉県（テナント全体）</option></select></div>
        </div>
      `,
      footer:`<div class="left"></div><div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-accent" data-ok>${I.svg('plus',15)} 追加</button></div>`
    }).el.querySelector('[data-ok]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'組織を追加しました',kind:'ok'}); });
  }
})();
