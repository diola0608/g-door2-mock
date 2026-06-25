/* 異動管理 — Transfer applications, approval, batch */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;

  App.group({id:'transfers', label:'異動管理'});
  App.page({
    path:'/transfers', group:'transfers', label:'異動申請一覧', icon:'arrow-right-circle',
    render({el}){
      let activeTab = 'all';
      const tabs = [
        {id:'all',label:'すべて',count:D.transfers.length},
        {id:'pending-apply',label:'申請中',count:D.transfers.filter(t=>t.status==='pending-apply').length},
        {id:'pending-approve',label:'承認待ち',count:D.transfers.filter(t=>t.status==='pending-approve').length},
        {id:'approved',label:'承認済',count:D.transfers.filter(t=>t.status==='approved').length},
        {id:'executed',label:'実行済',count:D.transfers.filter(t=>t.status==='executed').length},
        {id:'rejected',label:'不承認',count:D.transfers.filter(t=>t.status==='rejected').length},
      ];
      const list = ()=> D.transfers.filter(t=>activeTab==='all'||t.status===activeTab);

      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'異動管理',href:'#/transfers'}],
            title:'異動申請一覧', icon:'arrow-right-circle',
            subtitle:'所属変更は承認制。申請 → 承認 → 発効日バッチ実行のフローで処理されます。権限によりCSV直接変更も可能です。',
            actions:`<button class="btn btn-accent" data-apply>${I.svg('plus',15)} 異動申請</button>`
          })}

          <div class="panel-grid g4 mb-16">
            ${UI.statCard({label:'承認待ち',val:String(D.transfers.filter(t=>t.status==='pending-approve').length),delta:'7/1実行予定 2件',dcls:'warn',strip:'amber',icon:'clock'})}
            ${UI.statCard({label:'申請中',val:String(D.transfers.filter(t=>t.status==='pending-apply').length),delta:'要対応',dcls:'flat',strip:'navy',icon:'send'})}
            ${UI.statCard({label:'承認済（実行待ち）',val:String(D.transfers.filter(t=>t.status==='approved').length),delta:'発効日待ち',dcls:'up',strip:'ok',icon:'check-circle'})}
            ${UI.statCard({label:'次回バッチ',val:'7/1',delta:'01:00 自動実行',dcls:'flat',strip:'navy',icon:'calendar'})}
          </div>

          ${UI.tabs(tabs, activeTab)}

          <div class="card">
            <div class="card-head"><div class="t">${I.svg('git-pull-request',16)}<h3>異動申請</h3></div>
              <div class="actions">
                <select class="select" style="height:28px;font-size:12px"><option>全期間</option><option>今月</option><option>7月発効分</option></select>
              </div>
            </div>
            <div class="tbl-wrap"><table class="tbl">
              <thead><tr><th>申請ID</th><th>対象者</th><th>移動元 → 先</th><th>発効日</th><th>状態</th><th>申請者</th><th>承認先</th><th></th></tr></thead>
              <tbody>
                ${list().length?list().map(t=>{
                  const s=D.transferStatusMap[t.status];
                  return `<tr>
                    <td class="linkcell mono" data-detail="${t.id}">${t.id}</td>
                    <td>
                      <div class="row gap-8">${UI.avatar(UI.initials(t.person),'navy','sm')}<div><div class="fw-6">${t.person}</div><div class="txt-xs muted mono">${t.personId}</div></div></div>
                    </td>
                    <td>
                      <div class="txt-sm">${t.from}</div>
                      <div class="row gap-4 txt-xs" style="color:var(--amber-600)">${I.svg('arrow-right',12)} ${t.to}</div>
                    </td>
                    <td class="mono">${t.effectiveDate}</td>
                    <td>${UI.status(s.label, s.cls)}</td>
                    <td class="txt-sm">${t.applicant}</td>
                    <td class="txt-sm">${t.approver||'?'}</td>
                    <td>
                      <div class="row gap-4">
                        ${t.canCancel&&t.status!=='executed'&&t.status!=='rejected'?`<button class="btn btn-sm btn-danger" data-cancel="${t.id}">${I.svg('x',13)} 取消</button>`:''}
                        ${t.status==='pending-approve'?`<button class="btn btn-sm btn-primary" data-detail="${t.id}">${I.svg('check',13)} 承認</button>`:''}
                        <button class="btn btn-sm btn-icon btn-ghost" data-detail="${t.id}">${I.svg('chevron-right',14)}</button>
                      </div>
                    </td>
                  </tr>`;
                }).join(''):`<tr><td colspan="8">${UI.empty({icon:'inbox',title:'該当する申請がありません',msg:'タブを切り替えてください。'})}</td></tr>`}
              </tbody>
            </table></div>
          </div>

          <div class="banner banner-info mt-16">${I.svg('info',18)}<div class="body"><div class="title">異動フローについて</div>申請 → 移動先組織が承認 → 発効日 01:00 のバッチで自動実行。実行前なら取り消し可能。教育委員会の権限のある役職者は、CSV取込時に「承認不要」を指定して直接変更できます。</div></div>
        `;
        I.scan(el);
        UI.bindTabs(el.querySelector('.tabs'), id=>{ activeTab=id; view(); });
        el.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>detailModal(b.dataset.detail)));
        el.querySelectorAll('[data-cancel]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();cancelModal(b.dataset.cancel);}));
        el.querySelectorAll('[data-apply]').forEach(b=>b.addEventListener('click',()=>applyModal()));
      }
      view();
    }
  });

  function detailModal(id){
    const t = D.transfers.find(x=>x.id===id) || D.transfers[0];
    const s = D.transferStatusMap[t.status];
    const steps = [
      {n:1,label:'申請', done:true, who:t.applicant, when:t.appliedAt},
      {n:2,label:'承認', done:['approved','executed'].includes(t.status), current:t.status==='pending-approve', who:t.approver!=='-'?t.approver:'', when:''},
      {n:3,label:'実行', done:t.status==='executed', current:t.status==='approved', who:'システム', when:t.status==='executed'?t.effectiveDate+' 01:00':t.status==='approved'?'発効日 01:00予定':''},
    ];
    UI.modal({
      title:`異動申請 ${t.id}`, icon:'arrow-right-circle', size:'lg',
      sub:`${t.person} (${t.personId})`,
      body:`
        <div class="row gap-12 mb-16">
          ${UI.avatar(UI.initials(t.person),'navy','lg')}
          <div>
            <h3>${t.person}</h3>
            <div class="txt-sm muted">${t.personId}</div>
            <div class="mt-8">${UI.status(s.label, s.cls)}</div>
          </div>
        </div>
        <div class="card card-pad mb-16">
          <div class="row between mb-8">
            <div class="t-center" style="flex:1">
              <div class="txt-xs muted">移動元</div>
              <div class="fw-6 mt-4">${t.from}</div>
            </div>
            <div style="color:var(--amber-600);padding:0 12px">${I.svg('arrow-right',24)}</div>
            <div class="t-center" style="flex:1">
              <div class="txt-xs muted">移動先</div>
              <div class="fw-6 mt-4">${t.to}</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="kv">
            <span class="k">発効日</span><span class="v mono">${t.effectiveDate}</span>
            <span class="k">申請者</span><span class="v">${t.applicant}</span>
            <span class="k">申請日時</span><span class="v mono">${t.appliedAt}</span>
            <span class="k">承認先</span><span class="v">${t.approver||'?'}</span>
            <span class="k">理由</span><span class="v">${t.reason}</span>
          </div>
        </div>
        <h4>承認フロー</h4>
        <div class="timeline mt-8">
          ${steps.map(st=>`
            <div class="tl-item ${st.done?'ok':st.current?'current':''}">
              <div class="when">${st.when||'?'}</div>
              <div class="what">${st.label}${st.done?' 完了':st.current?' 進行中':''}</div>
              <div class="who">${st.who||''}</div>
            </div>`).join('')}
          ${t.status==='rejected'?`<div class="tl-item danger"><div class="when">${t.appliedAt}</div><div class="what">不承認</div><div class="who">${t.approver}</div></div>`:''}
        </div>
        ${t.status==='pending-approve'?`<div class="banner banner-warn mt-12">${I.svg('alert-triangle',16)}<div class="body txt-sm">この申請は承認待ちです。承認すると、発効日 ${t.effectiveDate} 01:00 のバッチで自動実行されます。</div></div>`:''}
      `,
      footer: t.status==='pending-approve' ?
        `<div class="left"><button class="btn btn-danger btn-sm" data-reject>${I.svg('x',13)} 不承認</button></div>
         <div class="right"><button class="btn" data-close>閉じる</button><button class="btn btn-primary" data-approve>${I.svg('check',15)} 承認</button></div>`
        : (t.canCancel&&t.status!=='executed'&&t.status!=='rejected' ?
        `<div class="left"><button class="btn btn-danger btn-sm" data-cancel>${I.svg('x',13)} 申請を取消</button></div>
         <div class="right"><button class="btn" data-close>閉じる</button></div>`
        : `<div class="left"></div><div class="right"><button class="btn" data-close>閉じる</button></div>`)
    });
    document.querySelector('.modal [data-approve]')?.addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'異動を承認しました',msg:`発効日 ${t.effectiveDate} に実行されます。`,kind:'ok'}); });
    document.querySelector('.modal [data-reject]')?.addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'不承認としました',kind:'warn'}); });
    document.querySelector('.modal [data-cancel]')?.addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'申請を取り消しました',kind:'info'}); });
  }

  function applyModal(){
    UI.modal({
      title:'異動申請', icon:'arrow-right-circle', size:'lg',
      body:`
        <div class="field"><label class="field-label">対象者 <span class="req">*</span></label>
          <select class="select"><option>選択…</option>${D.people.map(p=>`<option value="${p.id}">${p.name} (${p.org})</option>`).join('')}</select>
        </div>
        <div class="form-row mt-12">
          <div class="field"><label class="field-label">移動先 <span class="req">*</span></label>
            <select class="select"><option>選択…</option><option>白里市立西小学校</option><option>青木橋市立桜小学校</option><option>青葉県立青葉台高校</option></select>
          </div>
          <div class="field"><label class="field-label">発効日 <span class="req">*</span></label><input class="input" type="date" value="2026-07-01"></div>
        </div>
        <div class="field mt-12"><label class="field-label">理由</label><textarea class="textarea" placeholder="例: 保護者の転勤に伴う"></textarea></div>
        <div class="banner banner-info mt-12">${I.svg('info',16)}<div class="body txt-sm">申請後、移動先組織へ承認依頼が送信されます。承認されると発効日のバッチで自動実行されます。</div></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 承認フロー経由</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-ok>${I.svg('send',15)} 申請</button></div>`
    }).el.querySelector('[data-ok]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'異動申請を送信しました',msg:'承認待ち状態になりました。',kind:'ok'}); });
  }

  function cancelModal(id){
    const t = D.transfers.find(x=>x.id===id);
    UI.confirm({
      title:'申請を取り消し',
      msg:`異動申請 ${id}（${t.person}）を取り消しますか？発効日前であれば取り消しできます。`,
      kind:'danger', okText:'取り消す',
      onOk:()=>UI.toast({title:'申請を取り消しました',kind:'info'})
    });
  }
})();
