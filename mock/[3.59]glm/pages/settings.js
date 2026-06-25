/* 設定 — Tenant settings, code masters */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;
  let activeTab = 'tenant';

  App.page({
    path:'/settings', group:null, label:'設定', icon:'settings',
    render({el}){
      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'システム',href:'#/'},{label:'設定',href:'#/settings'}],
            title:'設定', icon:'settings',
            subtitle:'テナント全体の組織階層・識別子・異動承認・コードマスターを管理します。',
          })}
          ${UI.tabs([{id:'tenant',label:'テナント設定',icon:'building'},{id:'codes',label:'コードマスター',icon:'git-branch'},{id:'identifier',label:'識別子設定',icon:'id'},{id:'transfer',label:'異動承認',icon:'arrow-right-circle'}], activeTab)}
          <div id="settings-tab">${tabBody()}</div>
        `;
        I.scan(el);
        UI.bindTabs(el.querySelector('.tabs'), id=>{ activeTab=id; el.querySelector('#settings-tab').innerHTML=tabBody(); I.scan(el); bind(); });
        bind();
      }
      function tabBody(){
        if (activeTab==='tenant') return `
          <div class="panel-grid g2">
            <div class="card card-pad">
              <h4>テナント情報</h4>
              <div class="kv mt-8">
                <span class="k">テナント名</span><span class="v">${D.tenant.name}</span>
                <span class="k">テナントコード</span><span class="v mono">${D.tenant.code}</span>
                <span class="k">GCPプロジェクト</span><span class="v mono">${D.tenant.gcpProject}</span>
                <span class="k">DBプロジェクト</span><span class="v mono">${D.tenant.dbProject}</span>
                <span class="k">Workspace</span><span class="v mono">${D.tenant.workspaceDomain}</span>
                <span class="k">管理者</span><span class="v mono">${D.tenant.adminEmail}</span>
                <span class="k">デプロイ日</span><span class="v mono">${D.tenant.deployedAt}</span>
              </div>
            </div>
            <div class="card card-pad">
              <h4>組織階層パターン</h4>
              <div class="txt-sm muted-2 mt-8">テナントでは以下の階層パターンを許容します:</div>
              <div class="col gap-8 mt-12">
                ${D.tenantSettings.orgHierarchy.map(h=>`<div class="row gap-8"><span class="ava-navy" style="width:22px;height:22px;border-radius:5px;font-size:10px">${I.svg('layers',12)}</span><span class="txt-sm mono">${h}</span></div>`).join('')}
              </div>
              <div class="banner banner-info mt-12">${I.svg('info',15)}<div class="body txt-xs">1県=1テナントでGCPプロジェクト分離。DBもテナントごとに別プロジェクトで他テナントと混ざりません。</div></div>
            </div>
          </div>
          <div class="panel-grid g4 mt-16">
            ${UI.statCard({label:'市町村数',val:String(D.tenant.municipalities),dcls:'flat',strip:'navy',icon:'building'})}
            ${UI.statCard({label:'学校数',val:String(D.tenant.schools),dcls:'flat',strip:'navy',icon:'building-2'})}
            ${UI.statCard({label:'生徒数',val:D.tenant.students.toLocaleString(),dcls:'flat',strip:'amber',icon:'users'})}
            ${UI.statCard({label:'教職員数',val:(D.tenant.teachers+D.tenant.staff).toLocaleString(),dcls:'flat',strip:'ok',icon:'user'})}
          </div>`;

        if (activeTab==='codes') return `
          <div class="card">
            <div class="card-head"><div class="t">${I.svg('git-branch',16)}<h3>コードマスター</h3></div>
              <div class="actions"><button class="btn btn-sm btn-accent" data-add-code>${I.svg('plus',13)} コード追加</button></div>
            </div>
            <div class="card-pad" style="padding:8px">
              ${D.codeMasters.map(c=>`
                <div class="card" style="box-shadow:none;margin:6px 0">
                  <div class="card-pad" style="padding:12px">
                    <div class="row between">
                      <div class="row gap-8">
                        <span class="ava-navy" style="width:24px;height:24px;border-radius:5px;font-size:10px">${I.svg('tag',12)}</span>
                        <div><div class="fw-6">${c.name}</div><div class="txt-xs muted mono">${c.code}</div></div>
                      </div>
                      <div class="row gap-4">
                        ${UI.badge(c.values.length+'件','neutral')}
                        <button class="btn btn-sm btn-icon btn-ghost" data-edit-code="${c.id}">${I.svg('edit',13)}</button>
                      </div>
                    </div>
                    <div class="row gap-6 mt-8" style="flex-wrap:wrap">
                      ${c.values.map(v=>`<span class="chip ${v.code==='BULLY'||v.code==='PER'?'chip-danger':''}">${I.svg('shield',10)} ${v.label} <span class="mono txt-xs muted">${v.code}</span></span>`).join('')}
                    </div>
                    ${c.id==='C050'?`<div class="banner banner-warn mt-8" style="padding:8px 10px">${I.svg('shield',13)}<div class="body txt-xs">このマスターは選択肢ごとに権限制限を設定済み。「いじめ加害者 (BULLY)」は学年主任のみ表示。</div></div>`:''}
                  </div>
                </div>`).join('')}
            </div>
          </div>`;

        if (activeTab==='identifier') return `
          <div class="card">
            <div class="card-head"><div class="t">${I.svg('id',16)}<h3>識別子設定</h3></div>
              <div class="actions"><button class="btn btn-sm" data-add-key>${I.svg('plus',13)} 識別子追加</button></div>
            </div>
            <div class="tbl-wrap"><table class="tbl">
              <thead><tr><th>識別子名</th><th>キー</th><th>対象区分</th><th class="num">優先度</th><th></th></tr></thead>
              <tbody>
                ${D.tenantSettings.identifierKeys.map(k=>`<tr>
                  <td class="fw-6">${k.name}</td>
                  <td class="mono">${k.key}</td>
                  <td>${UI.badge(k.scope,'neutral')}</td>
                  <td class="num">${k.priority}</td>
                  <td><button class="btn btn-sm btn-icon btn-ghost">${I.svg('edit',13)}</button></td>
                </tr>`).join('')}
              </tbody>
            </table></div>
          </div>
          <div class="banner banner-info mt-12">${I.svg('info',16)}<div class="body txt-sm">CSV取込時に同一人物を識別するための基準です。識別子が設定されている場合、全項目が一致するか確認し、本人のデータであるかを検証します。</div></div>`;

        if (activeTab==='transfer') return `
          <div class="panel-grid g2">
            <div class="card card-pad">
              <div class="row between"><h4>承認フロー</h4><div class="switch"><input type="checkbox" ${D.tenantSettings.transferApproval.defaultRequiresApproval?'checked':''}><span class="slider"></span></div></div>
              <div class="txt-sm muted-2 mt-8">既定: 所属変更は承認制</div>
              <div class="divider"></div>
              <div class="kv">
                <span class="k">バッチ実行</span><span class="v mono">${D.tenantSettings.transferApproval.batchSchedule}</span>
                <span class="k">CSV回避フラグ</span><span class="v txt-sm">${D.tenantSettings.transferApproval.csvBypassFlag}</span>
              </div>
            </div>
            <div class="card card-pad">
              <h4>承認不要ロール</h4>
              <div class="txt-sm muted-2 mt-8">以下のロールは承認フローをスキップして直接変更可能:</div>
              <div class="row gap-8 mt-12" style="flex-wrap:wrap">
                ${D.tenantSettings.transferApproval.exemptRoles.map(r=>`<span class="chip chip-amber">${I.svg('star',11)} ${r}</span>`).join('')}
              </div>
              <div class="banner banner-warn mt-12" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">これらのロールがCSV取込時に「承認不要」を指定すると、即時反映されます。監査ログに記録されます。</div></div>
            </div>
          </div>`;
      }
      function bind(){
        el.querySelectorAll('[data-add-code],[data-add-key]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'追加モーダル',msg:'コード/識別子を追加します。',kind:'info'})));
        el.querySelectorAll('[data-edit-code]').forEach(b=>b.addEventListener('click',()=>codeModal(b.dataset.editCode)));
      }
      view();
    }
  });

  function codeModal(cid){
    const c = D.codeMasters.find(x=>x.id===cid) || D.codeMasters[0];
    UI.modal({
      title:`コードマスター: ${c.name}`, icon:'git-branch', size:'lg',
      sub:c.code,
      body:`
        <div class="tbl-wrap"><table class="tbl tbl-dense">
          <thead><tr><th>コード</th><th>表示名</th><th>権限制限</th><th>状態</th><th></th></tr></thead>
          <tbody>
            ${c.values.map(v=>`<tr>
              <td class="mono">${v.code}</td>
              <td class="fw-6">${v.label}</td>
              <td>${v.code==='BULLY'||v.code==='PER'?`<span class="chip chip-danger">${I.svg('lock',11)} 学年主任のみ</span>`:'<span class="muted">—</span>'}</td>
              <td>${UI.status('有効','ok')}</td>
              <td><button class="btn btn-sm btn-icon btn-ghost">${I.svg('edit',13)}</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>
        <div class="banner banner-warn mt-12">${I.svg('shield',16)}<div class="body txt-sm">各コード値ごとに、閲覧可能なサブジェクトを設定できます。機微な選択肢（いじめ加害者など）は表示制限を必ず設定してください。</div></div>
      `,
      footer:`<div class="left"></div><div class="right"><button class="btn" data-close>閉じる</button><button class="btn btn-accent" data-add>${I.svg('plus',15)} コード値追加</button></div>`
    }).el.querySelector('[data-add]').addEventListener('click',()=>UI.toast({title:'コード値を追加',kind:'info'}));
  }
})();
