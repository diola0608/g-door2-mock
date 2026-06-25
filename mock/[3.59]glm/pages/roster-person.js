/* 名簿管理 — Person detail with attribute tabs, history, permission gating */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;

  const syncMap = { synced:{label:'同期済',cls:'ok'}, pending:{label:'同期待ち',cls:'warn'}, error:{label:'同期エラー',cls:'danger'}, none:{label:'アカウントなし',cls:'neutral'} };
  const typeMap = { teacher:{label:'教員',cls:'navy'}, student:{label:'生徒',cls:'amber'}, staff:{label:'職員',cls:'ok'} };

  App.page({
    path:'/roster/person/:id', group:'roster', label:'人物詳細',
    render({el,params}){
      const p = D.people.find(x=>x.id===params.id) || D.people[0];
      let activeTab = 'basic';
      let activeMode = 'current';

      function attrs(){
        const group = D.attrGroups.find(g=>g.id===activeTab);
        const isProtected = activeTab==='sensitive';
        const hasAccess = activeTab!=='sensitive' || p.id==='P1003';
        if (!hasAccess && isProtected){
          return `<div class="card"><div class="card-pad">${UI.empty({icon:'lock',title:'閲覧権限がありません',msg:'この項目グループの閲覧には、担任・学年主任または管理職の権限が必要です。'})}<div class="t-center mt-12"><button class="btn" data-req-access>${I.svg('key',14)} アクセス申請</button></div></div></div>`;
        }
        const rows = group.fields.map(f=>{
          const val = p[f.id] || p.attrs?.[f.id] || fieldDefault(f,p);
          const showHistory = f.history && activeMode==='history';
          return `
            <div class="attr-row">
              <div class="attr-label">${f.sensitive?I.svg('shield',12):''} ${f.label} ${f.required?'<span class="txt-xs" style="color:var(--danger)">*</span>':''}
                <div class="attr-meta">${window.RosterFieldType(f.type)}${f.code?' ? '+f.code:''}${f.history?' ? 履歴あり':''}</div>
              </div>
              <div class="attr-value">
                ${showHistory ? historyBlock(f) : `<div class="row between"><span class="fw-6">${val||'?'}</span>${f.history?`<button class="btn-link txt-xs" data-hist>履歴を見る</button>`:''}</div>`}
              </div>
            </div>`;
        }).join('');
        return `
          <div class="card">
            <div class="card-head">
              <div class="t">${I.svg(group.icon,16)}<h3>${group.name}</h3></div>
              <div class="actions">
                ${UI.seg([{id:'current',label:'現在値'},{id:'history',label:'変更履歴'}], activeMode)}
                <button class="btn btn-sm btn-primary" data-edit>${I.svg('edit',13)} 編集</button>
              </div>
            </div>
            <div class="card-pad attr-list">${rows}</div>
            ${isProtected?`<div class="banner banner-warn" style="margin:0;border-top:1px solid var(--warn-100);border-radius:0">${I.svg('shield',16)}<div class="body">この情報は機微情報です。アクセス・編集は監査ログに記録されます。</div></div>`:''}
          </div>`;
      }

      function historyBlock(f){
        return `<div class="col gap-8">
          <div class="hist-entry"><span class="hist-val">${currentVal(f,p)}</span><span class="badge badge-ok">現在</span><span class="txt-xs muted">2024-04-01 ?</span></div>
          <div class="hist-entry"><span class="hist-val muted">${prevVal(f)}</span><span class="badge badge-neutral">過去</span><span class="txt-xs muted">2023-04-01 〜 2024-03-31</span></div>
        </div>`;
      }
      function currentVal(f,p){ return p[f.id]||p.attrs?.[f.id]||fieldDefault(f,p)||'?'; }
      function prevVal(f){
        const prev={ club:'バスケットボール部', org:'白里市立西小学校', role:'一般教員', 'feature-tag':'-' };
        return prev[f.id]||'?';
      }
      function fieldDefault(f,p){
        const map={ name:p.name,kana:p.kana,gender:p.gender,birth:p.birth,org:p.org,class:p.class,role:p.role,
          'license-no':p.license, subject:p.attrs?.subject, years:p.attrs?.years, email:p.email, phone:p.phone,
          mobile:p.phone, guardian:p.attrs?.guardian, club:p.attrs?.club, 'clubAdvisor':p.attrs?.clubAdvisor,
          allergy:p.attrs?.allergy, 'feature-tag':p.attrs?.feature };
        return map[f.id];
      }

      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'名簿管理',href:'#/roster'},{label:'名簿一覧',href:'#/roster'},{label:p.name,href:'#/roster/person/'+p.id}],
            title:p.name, icon:'user',
            subtitle:`${p.kana} · ${p.id} · ${typeMap[p.type].label}`,
            actions:`<button class="btn" data-go="#/roster">${I.svg('arrow-left',15)} 一覧へ</button>
                     <button class="btn" data-transfer>${I.svg('arrow-right-circle',15)} 異動申請</button>
                     <button class="btn btn-accent" data-edit-main>${I.svg('edit',15)} 編集</button>`
          })}

          <div class="grid" style="grid-template-columns:280px 1fr;gap:16px;align-items:start">
            <!-- Person summary card -->
            <div class="col gap-16">
              <div class="card card-pad t-center">
                ${UI.avatar(UI.initials(p.name), typeMap[p.type].cls,'xl')}
                <h3 style="margin-top:12px">${p.name}</h3>
                <div class="txt-sm muted-2">${p.kana}</div>
                <div class="row gap-6 mt-8" style="justify-content:center;flex-wrap:wrap">
                  ${UI.badge(p.role,typeMap[p.type].cls)}
                  ${(p.tags||[]).map(t=>UI.badge(t,'amber')).join('')}
                </div>
                <div class="divider"></div>
                <div class="kv kv-2col t-left">
                  <span class="k">人物ID</span><span class="v mono">${p.id}</span>
                  <span class="k">所属</span><span class="v">${p.org}</span>
                  <span class="k">クラス等</span><span class="v">${p.class||'?'}</span>
                  <span class="k">メール</span><span class="v" style="word-break:break-all">${p.email||'?'}</span>
                  <span class="k">電話</span><span class="v">${p.phone||'?'}</span>
                  <span class="k">入属日</span><span class="v mono">${p.joinDate}</span>
                </div>
              </div>

              <div class="card">
                <div class="card-head"><div class="t">${I.svg('refresh',16)}<h3>Google Workspace</h3></div></div>
                <div class="card-pad">
                  <div class="row between mb-8"><span class="txt-sm muted-2">同期状態</span>${UI.status(syncMap[p.sync].label, syncMap[p.sync].cls)}</div>
                  <div class="row between mb-8"><span class="txt-sm muted-2">最終同期</span><span class="txt-sm mono">${p.sync==='synced'?'2026-06-24 03:00':p.sync==='error'?'2026-06-23 16:48':'?'}</span></div>
                  <div class="row between"><span class="txt-sm muted-2">ドメイン</span><span class="txt-sm mono">${p.email&&p.email!=='-'?p.email.split('@')[1]||'?':'?'}</span></div>
                  ${p.sync==='error'?`<div class="banner banner-danger mt-12" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">アカウント未発見（404）。要対応。</div></div>`:''}
                </div>
              </div>

              <div class="card">
                <div class="card-head"><div class="t">${I.svg('history',16)}<h3>所属履歴</h3></div></div>
                <div class="card-pad" style="padding-top:8px">
                  <div class="timeline">
                    <div class="tl-item current"><div class="when">2024-04-01 〜 現在</div><div class="what">${p.org}</div><div class="who">${p.class||'?'}</div></div>
                    <div class="tl-item ok"><div class="when">2023-04-01 〜 2024-03-31</div><div class="what">白里市立西小学校</div><div class="who">${p.role}</div></div>
                    <div class="tl-item ok"><div class="when">2022-04-01 〜 2023-03-31</div><div class="what">白里市立南小学校</div><div class="who">${p.role}</div></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main attribute panel -->
            <div>
              <div class="toolbar" style="margin-bottom:0;border-radius:var(--r-md) var(--r-md) 0 0;border-bottom:none">
                <div class="row gap-8">
                  <span class="txt-sm muted-2">属性グループ:</span>
                </div>
                <div class="grow"></div>
                <span class="txt-xs muted">項目数: ${D.attrGroups.reduce((a,g)=>a+g.fields.length,0)}</span>
              </div>
              <div class="tabs" style="margin-top:0">${D.attrGroups.map(g=>`<div class="tab ${g.id===activeTab?'active':''}" data-tab="${g.id}">${I.svg(g.icon,14)} ${g.name} ${g.id==='sensitive'?I.svg('lock',11):''}<span class="count">${g.fields.length}</span></div>`).join('')}</div>
              <div id="attrs">${attrs()}</div>
            </div>
          </div>

          <style>
            .attr-list{display:flex;flex-direction:column}
            .attr-row{display:grid;grid-template-columns:200px 1fr;gap:16px;padding:12px 0;border-bottom:1px solid var(--line)}
            .attr-row:last-child{border-bottom:none}
            .attr-label{font-size:12.5px;font-weight:600;color:var(--ink-2);display:flex;align-items:flex-start;gap:4px;flex-direction:column}
            .attr-meta{font-size:10.5px;color:var(--ink-3);font-weight:400;margin-top:2px}
            .attr-value{font-size:13px}
            .hist-entry{display:flex;align-items:center;gap:10px;padding:4px 0}
            .hist-val{font-weight:600}
          </style>
        `;
        I.scan(el);
        el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
        UI.bindTabs(el.querySelector('.tabs'), id=>{ activeTab=id; el.querySelector('#attrs').innerHTML=attrs(); I.scan(el); bindAttr(); });
        UI.bindSeg(el.querySelector('#attrs .seg'), id=>{ activeMode=id; el.querySelector('#attrs').innerHTML=attrs(); I.scan(el); bindAttr(); });
        el.querySelectorAll('[data-transfer]').forEach(b=>b.addEventListener('click',()=>transferModal(p)));
        el.querySelectorAll('[data-edit],[data-edit-main]').forEach(b=>b.addEventListener('click',()=>editModal(p)));
        el.querySelectorAll('[data-req-access]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'アクセス申請を送信',msg:'担当の管理者に権限申請を送信しました。',kind:'info'})));
        bindAttr();
      }
      function bindAttr(){
        el.querySelectorAll('#attrs [data-hist]').forEach(b=>b.addEventListener('click',()=>{ activeMode='history'; el.querySelector('#attrs').innerHTML=attrs(); I.scan(el); bindAttr(); }));
        el.querySelectorAll('#attrs [data-edit]').forEach(b=>b.addEventListener('click',()=>editModal(p)));
      }
      view();
    }
  });

  function transferModal(p){
    UI.modal({
      title:'異動申請', icon:'arrow-right-circle', size:'lg',
      sub:`${p.name}（${p.id}）の所属変更を申請します。`,
      body:`
        <div class="form-row">
          <div class="field"><label class="field-label">移動元 <span class="req">*</span></label><input class="input" value="${p.org}" readonly></div>
          <div class="field"><label class="field-label">移動先 <span class="req">*</span></label>
            <select class="select"><option>選択…</option><option>白里市立西小学校</option><option>青木橋市立桜小学校</option><option>青葉県立青葉台高校</option></select>
          </div>
        </div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">発効日 <span class="req">*</span></label><input class="input" type="date" value="2026-07-01"></div>
          <div class="field"><label class="field-label">承認先</label><select class="select"><option>移動先組織（承認フロー）</option><option>移動先の上位教育委員会</option></select></div>
        </div>
        <div class="field mt-12"><label class="field-label">異動理由</label><textarea class="textarea" placeholder="例: 保護者の転勤に伴う、人事異動 など"></textarea></div>
        <div class="banner banner-info mt-12">${I.svg('info',18)}<div class="body">承認後、<strong>発効日 01:00</strong> のバッチ処理で自動的に所属が変更されます。実行前であれば取り消し可能です。</div></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 承認フロー経由で申請されます</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-ok>${I.svg('send',15)} 申請を送信</button></div>`
    }).el.querySelector('[data-ok]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'異動申請を送信しました',msg:'承認待ち状態になりました。異動管理で確認できます。',kind:'ok'}); setTimeout(()=>location.hash='#/transfers',900); });
  }

  function editModal(p){
    UI.modal({
      title:`編集: ${p.name}`, icon:'edit', size:'lg',
      sub:'属性値を編集します。履歴ありの項目は変更日が記録されます。',
      body:`
        <div class="form-row">
          <div class="field"><label class="field-label">氏名 <span class="req">*</span></label><input class="input" value="${p.name}"></div>
          <div class="field"><label class="field-label">氏名（カナ） <span class="req">*</span></label><input class="input" value="${p.kana}"></div>
        </div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">所属組織 <span class="req">*</span></label><input class="input" value="${p.org}"></div>
          <div class="field"><label class="field-label">所属クラス</label><input class="input" value="${p.class||''}"></div>
        </div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">メールアドレス</label><input class="input" value="${p.email==='-'?'':p.email}"></div>
          <div class="field"><label class="field-label">電話番号</label><input class="input" value="${p.phone}"></div>
        </div>
        <div class="banner banner-warn mt-12">${I.svg('shield',16)}<div class="body txt-sm">機微情報の編集は監査ログに記録されます。変更理由を記録することを推奨します。</div></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 変更は履歴として保存されます</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-accent" data-save>${I.svg('save',15)} 保存</button></div>`
    }).el.querySelector('[data-save]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'保存しました',msg:'変更内容を保存しました。履歴にも記録されています。',kind:'ok'}); });
  }
})();
