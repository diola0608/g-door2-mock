/* 名簿管理 — Roster list with tabbed attribute grouping */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;

  const typeMap = { teacher:{label:'教員',cls:'navy',icon:'book'}, student:{label:'生徒',cls:'amber',icon:'users'}, staff:{label:'職員',cls:'ok',icon:'building'} };
  const syncMap = { synced:{label:'同期済',cls:'ok'}, pending:{label:'同期待ち',cls:'warn'}, error:{label:'同期エラー',cls:'danger'}, none:{label:'アカウントなし',cls:'neutral'} };

  App.group({id:'roster', label:'名簿管理'});
  App.page({
    path:'/roster', group:'roster', label:'名簿一覧', icon:'users',
    render({el}){
      let activeTab = 'basic';
      let activeType = 'student';

      const segOrder = ['student','teacher','staff'];
      function segButtons(){
        return segOrder.map(id=>{
          const t = typeMap[id];
          return `<button class="seg-${t.cls} ${id===activeType?'active':''}" data-seg="${id}">${I.svg(t.icon,13)} ${t.label}</button>`;
        }).join('');
      }
      function typedSeg(){ return `<div class="seg seg-typed">${segButtons()}</div>`; }

      function scopeBar(){
        const t = typeMap[activeType];
        const people = D.people.filter(p=>p.type===activeType);
        return `<div class="scope-bar scope-${t.cls}">
          <span class="scope-strip"></span>
          <span class="scope-ic">${I.svg(t.icon,20)}</span>
          <div class="scope-txt">
            <div class="scope-label">現在表示中の人物タイプ</div>
            <div class="scope-name">${t.label}の一覧</div>
          </div>
          <div class="grow"></div>
          <span class="scope-count">${people.length.toLocaleString()}件</span>
        </div>`;
      }

      function table(){
        const people = D.people.filter(p=>p.type===activeType);
        const group = D.attrGroups.find(g=>g.id===activeTab);
        const cols = group.fields.slice(0,5);
        return `
          <div class="card">
            <div class="card-head">
              <div class="t">${I.svg('list',16)}<h3>${group.name} — ${people.length}件</h3></div>
              <div class="actions">
                <button class="btn btn-sm" data-cols>${I.svg('columns',13)} 表示列</button>
                <button class="btn btn-sm" data-export>${I.svg('download',13)} エクスポート</button>
              </div>
            </div>
            <div class="tbl-wrap">
              <table class="tbl">
                <thead><tr>
                  <th class="row-select"><input type="checkbox" class="cb-all"></th>
                  <th>氏名</th>
                  <th>職種</th>
                  <th>所属組織</th>
                  ${cols.map(c=>`<th>${c.label}</th>`).join('')}
                  <th>同期</th>
                  <th></th>
                </tr></thead>
                <tbody>
                  ${people.map(p=>`
                    <tr>
                      <td class="row-select"><input type="checkbox"></td>
                      <td>
                        <div class="row gap-8">
                          ${UI.avatar(UI.initials(p.name), p.type==='teacher'?'navy':p.type==='student'?'amber':'ok','sm')}
                          <div>
                            <div class="linkcell" data-person="${p.id}">${p.name}</div>
                            <div class="txt-xs muted">${p.kana} · ${p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>${UI.badge(p.role, typeMap[p.type].cls)}</td>
                      <td><div>${p.org}</div><div class="txt-xs muted">${p.class||'-'}</div></td>
                      ${cols.map(c=>`<td>${renderCell(p,c)}</td>`).join('')}
                      <td>${UI.status(syncMap[p.sync].label, syncMap[p.sync].cls)}</td>
                      <td><button class="btn btn-sm btn-icon btn-ghost" data-person="${p.id}">${I.svg('chevron-right',14)}</button></td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
      }

      function renderCell(p, field){
        const v = p[field.id] || (p.attrs&&p.attrs[field.id]) || fieldLabel(field,p);
        if (v==null||v==='-') return `<span class="muted">—</span>`;
        if (field.id==='tags'||field.id==='feature-tag'){
          return (p.tags||[]).map(t=>`<span class="chip chip-amber">${t}</span>`).join(' ');
        }
        return `<span>${v}</span>`;
      }
      function fieldLabel(field,p){
        const map={ gender:p.gender, birth:p.birth, org:p.org, class:p.class, role:p.role, license:p.license,
          email:p.email, phone:p.phone, mobile:p.phone, guardian:p.attrs?.guardian, 'club':p.attrs?.club,
          'clubAdvisor':p.attrs?.clubAdvisor, subject:p.attrs?.subject, years:p.attrs?.years, allergy:p.attrs?.allergy };
        return map[field.id] ?? '—';
      }

      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'名簿管理',href:'#/roster'},{label:'名簿一覧',href:'#/roster'}],
            title:'名簿一覧', icon:'users',
            subtitle:'生徒・教員・職員を一元管理。属性項目グループごとに表示を切り替えられます。機微情報タブは権限により表示が制御されます。',
            actions:`<button class="btn" data-go="#/roster/organizations">${I.svg('tree',15)} 組織ツリー</button>
                     <button class="btn" data-go="#/roster/attributes">${I.svg('settings',15)} 属性項目設定</button>
                     <button class="btn btn-accent" data-go="#/roster/import">${I.svg('upload',15)} CSV取込</button>`
          })}

          <div class="toolbar">
            ${typedSeg()}
            <div class="toolbar-divider"></div>
            <div class="input-icon" style="width:260px"><span class="sicon">${I.svg('search',15)}</span><input class="input" placeholder="氏名・ID・メールで検索…"></div>
            <div class="grow"></div>
            <select class="select" style="width:200px"><option>所属組織: すべて</option><option>白里市立東小学校</option></select>
            <button class="btn btn-sm">${I.svg('filter',13)} 詳細検索</button>
          </div>

          ${UI.tabs(D.attrGroups.map(g=>({id:g.id,label:g.name,icon:g.icon,count:g.fields.length, ['data-protect']:g.id==='sensitive'?'🔒':''})), activeTab)}

          ${activeTab==='sensitive' ? `
            <div class="banner banner-warn mb-12">${I.svg('shield',18)}<div class="body"><div class="title">機微情報の取り扱い</div>当タブは権限を持つユーザーのみ閲覧・編集できます。アクセスはすべて監査ログに記録されます。</div></div>`:''}

          <div id="roster-scope">${scopeBar()}</div>

          <div id="roster-table">${table()}</div>
        `;
        I.scan(el);
        UI.bindSeg(el.querySelector('.toolbar .seg'), id=>{ activeType=id; el.querySelector('#roster-scope').innerHTML=scopeBar(); el.querySelector('.toolbar .seg').innerHTML=segButtons(); I.scan(el); el.querySelector('#roster-table').innerHTML=table(); I.scan(el); bindRow(); });
        UI.bindTabs(el.querySelector('.tabs'), id=>{ activeTab=id; el.querySelector('#roster-table').innerHTML=table(); I.scan(el); bindRow(); });
        el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
        el.querySelectorAll('[data-export]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'エクスポート中',msg:'現在の表示内容を CSV で出力しています。',kind:'info'})));
        el.querySelectorAll('[data-cols]').forEach(b=>b.addEventListener('click',openColsModal));
        bindRow();
      }
      function bindRow(){
        el.querySelectorAll('[data-person]').forEach(b=>b.addEventListener('click',()=>location.hash='#/roster/person/'+b.dataset.person));
      }
      function openColsModal(){
        const group = D.attrGroups.find(g=>g.id===activeTab);
        UI.modal({
          title:'表示列の設定', icon:'columns', size:'lg',
          sub:`「${group.name}」に表示する属性項目を選択してください。`,
          body:`<div class="col gap-8">${group.fields.map(f=>`<label class="checkbox"><input type="checkbox" ${f.required?'checked disabled':''}><span>${f.label}</span>${UI.badge(fieldTypeLabel(f.type),'neutral')}${f.required?'<span class="txt-xs muted">（必須）</span>':''}${f.sensitive?'<span class="txt-xs" style="color:var(--danger)">🔒 機微</span>':''}</label>`).join('')}</div>`,
          footer:`<div class="left"></div><div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-close>適用</button></div>`
        });
      }
      view();
    }
  });

  function fieldTypeLabel(t){
    return { 'text-single':'単一文字列','text-multi':'複数文字列','number':'数値','date':'日付','code':'コード' }[t]||t;
  }
  window.RosterFieldType = fieldTypeLabel;
})();
