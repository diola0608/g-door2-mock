/* 名簿管理 — Attribute field configuration (属性項目設定) */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;
  const typeIcon = { 'text-single':'type','text-multi':'align-left','number':'hash','date':'calendar','code':'git-branch' };
  const typeLabel = { 'text-single':'単一文字列','text-multi':'複数文字列','number':'数値','date':'日付','code':'コードマスター' };

  App.page({
    path:'/roster/attributes', group:'roster', label:'属性項目設定', icon:'settings',
    render({el}){
      let activeGroup = 'basic';
      function view(){
        const g = D.attrGroups.find(x=>x.id===activeGroup);
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'名簿管理',href:'#/roster'},{label:'属性項目設定',href:'#/roster/attributes'}],
            title:'属性項目設定', icon:'layers',
            subtitle:'テナントごとに保持するデータ項目を自由に定義できます。データ形式・必須・履歴・権限制限を項目ごとに設定します。',
            actions:`<button class="btn" data-go="#/settings">${I.svg('git-branch',15)} コードマスター</button>
                     <button class="btn btn-accent" data-add>${I.svg('plus',15)} 属性項目を追加</button>`
          })}

          <div class="grid" style="grid-template-columns:240px 1fr;gap:16px;align-items:start">
            <div class="card">
              <div class="card-head"><div class="t">${I.svg('folder',16)}<h3>項目グループ</h3></div></div>
              <div class="card-pad" style="padding:6px">
                ${D.attrGroups.map(g=>`
                  <div class="sidebar-item ${g.id===activeGroup?'active':''}" data-group="${g.id}">
                    ${I.svg(g.icon,17)} <span>${g.name}</span><span class="count">${g.fields.length}</span>
                  </div>`).join('')}
              </div>
              <div class="card-pad" style="border-top:1px solid var(--line)">
                <button class="btn btn-block btn-sm" data-add-group>${I.svg('plus',13)} グループ追加</button>
              </div>
            </div>

            <div class="card">
              <div class="card-head">
                <div class="t">${I.svg(g.icon,16)}<div><h3>${g.name}</h3><div class="sub txt-xs muted">${g.desc}</div></div></div>
                <span class="badge badge-navy">${g.fields.length} 項目</span>
              </div>
              <div class="tbl-wrap">
                <table class="tbl">
                  <thead><tr>
                    <th>項目名</th><th>データ形式</th><th>必須</th><th>履歴</th><th>権限制限</th><th>コード</th><th></th>
                  </tr></thead>
                  <tbody>
                    ${g.fields.map(f=>`
                      <tr>
                        <td>
                          <div class="fw-6">${f.label}</div>
                          <div class="txt-xs muted mono">${f.id}</div>
                        </td>
                        <td>${UI.badge(typeLabel[f.type],'neutral')} ${I.svg(typeIcon[f.type]||'circle',12)}</td>
                        <td>${f.required?UI.badge('必須','danger'):`<span class="muted">?</span>`}</td>
                        <td>${f.history?I.svg('check',16):`<span class="muted">?</span>`}</td>
                        <td>${f.sensitive?`<span class="chip chip-danger">${I.svg('shield',11)} 機微</span>${f.permNote?`<div class="txt-xs muted mt-4">${f.permNote}</div>`:''}`:`<span class="muted">?</span>`}</td>
                        <td>${f.code?`<span class="mono txt-sm">${f.code}</span>`:`<span class="muted">?</span>`}</td>
                        <td>
                          <div class="row gap-4">
                            <button class="btn btn-sm btn-icon btn-ghost" data-edit-field="${f.id}">${I.svg('edit',14)}</button>
                            ${!f.required?`<button class="btn btn-sm btn-icon btn-ghost" data-del-field="${f.id}">${I.svg('trash',14)}</button>`:''}
                          </div>
                        </td>
                      </tr>`).join('')}
                  </tbody>
                </table>
              </div>
              <div class="card-pad" style="border-top:1px solid var(--line);background:var(--paper-2)">
                <div class="row between">
                  <span class="txt-xs muted">データ形式ごとにバリデーションを設定できます。</span>
                  <button class="btn btn-sm" data-add>${I.svg('plus',13)} このグループに項目追加</button>
                </div>
              </div>
            </div>
          </div>
        `;
        I.scan(el);
        el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
        el.querySelectorAll('[data-group]').forEach(b=>b.addEventListener('click',()=>{ activeGroup=b.dataset.group; view(); }));
        el.querySelectorAll('[data-add],[data-add-group]').forEach(b=>b.addEventListener('click',addFieldModal));
        el.querySelectorAll('[data-edit-field]').forEach(b=>b.addEventListener('click',()=>editFieldModal(b.dataset.editField)));
        el.querySelectorAll('[data-del-field]').forEach(b=>b.addEventListener('click',()=>UI.confirm({title:'項目を削除',msg:'この属性項目を削除しますか？過去の履歴データは保持されます。',kind:'danger',okText:'削除',onOk:()=>UI.toast({title:'項目を削除しました',kind:'ok'})})));
      }
      view();
    }
  });

  function addFieldModal(){
    UI.modal({
      title:'属性項目を追加', icon:'plus', size:'lg',
      sub:'新しいデータ項目を定義します。データ形式に応じたバリデーションが適用されます。',
      body:`
        <div class="form-row">
          <div class="field"><label class="field-label">項目名 <span class="req">*</span></label><input class="input" placeholder="例: 通学手段"></div>
          <div class="field"><label class="field-label">項目ID <span class="req">*</span></label><input class="input mono" placeholder="例: commute-method"></div>
        </div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">データ形式 <span class="req">*</span></label>
            <select class="select" id="f-type">
              <option value="text-single">単一文字列</option>
              <option value="text-multi">複数文字列</option>
              <option value="number">数値</option>
              <option value="date">日付</option>
              <option value="code">コードマスター</option>
            </select>
          </div>
          <div class="field"><label class="field-label">コードマスター</label>
            <select class="select"><option>?（データ形式=コード時）</option>${D.codeMasters.map(c=>`<option>${c.name} (${c.code})</option>`).join('')}</select>
          </div>
        </div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">所属グループ <span class="req">*</span></label>
            <select class="select">${D.attrGroups.map(g=>`<option>${g.name}</option>`).join('')}</select>
          </div>
          <div class="field"><label class="field-label">並び順</label><input class="input" type="number" value="0"></div>
        </div>
        <div class="mt-12 row gap-16" style="flex-wrap:wrap">
          <label class="checkbox"><input type="checkbox"> 必須項目</label>
          <label class="checkbox"><input type="checkbox"> 履歴を保持</label>
          <label class="checkbox"><input type="checkbox"> 機微情報（権限制限）</label>
        </div>
        <div class="banner banner-info mt-12">${I.svg('info',16)}<div class="body txt-sm">コード形式を選択した場合、各コード値ごとに権限制限を設定できます（例: 「いじめ加害者」は学年主任のみ表示）。</div></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} テナント全体に適用されます</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-accent" data-save>${I.svg('plus',15)} 追加</button></div>`
    }).el.querySelector('[data-save]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'属性項目を追加しました',kind:'ok'}); });
  }

  function editFieldModal(fid){
    const all = D.attrGroups.flatMap(g=>g.fields);
    const f = all.find(x=>x.id===fid) || all[0];
    UI.modal({
      title:`編集: ${f.label}`, icon:'edit', size:'lg',
      body:`
        <div class="form-row">
          <div class="field"><label class="field-label">項目名</label><input class="input" value="${f.label}"></div>
          <div class="field"><label class="field-label">データ形式</label><select class="select"><option>${typeLabel[f.type]}</option></select></div>
        </div>
        <div class="mt-12 row gap-16" style="flex-wrap:wrap">
          <label class="checkbox"><input type="checkbox" ${f.required?'checked':''}> 必須項目</label>
          <label class="checkbox"><input type="checkbox" ${f.history?'checked':''}> 履歴を保持</label>
          <label class="checkbox"><input type="checkbox" ${f.sensitive?'checked':''}> 機微情報</label>
        </div>
        ${f.sensitive?`<div class="field mt-12"><label class="field-label">権限制限メモ</label><textarea class="textarea">${f.permNote||''}</textarea></div>`:''}
        ${f.type==='code'?`<div class="field mt-12"><label class="field-label">参照コードマスター</label><input class="input mono" value="${f.code||''}"></div>
          <div class="banner banner-warn mt-8">${I.svg('shield',16)}<div class="body txt-sm">コードマスターの各値に対して、さらに表示権限を設定できます。「コードマスター」設定画面から個別に制限してください。</div></div>`:''}
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 変更は履歴付きで保存されます</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-accent" data-save>${I.svg('save',15)} 保存</button></div>`
    }).el.querySelector('[data-save]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'属性項目を保存しました',kind:'ok'}); });
  }
})();
