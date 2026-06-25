/* 権限設定 — Subject/Object/Scope condition rules with org inheritance */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;

  App.group({id:'permissions', label:'権限設定'});
  App.page({
    path:'/permissions', group:'permissions', label:'権限ルール', icon:'lock',
    render({el}){
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'権限設定',href:'#/permissions'}],
          title:'権限ルール', icon:'lock',
          subtitle:'サブジェクト・オブジェクト・属性値・組織スコープを組み合わせ、機能へのアクセスを条件付きで付与します。テナント全体で設定し、各組織で継承・上書きできます。',
          actions:`<button class="btn" data-go="#/permissions/inheritance">${I.svg('git-branch',15)} 継承ツリー</button>
                   <button class="btn btn-accent" data-add>${I.svg('plus',15)} ルールを作成</button>`
        })}

        <div class="panel-grid g3 mb-16">
          ${UI.statCard({label:'有効ルール',val:String(D.permRules.filter(r=>r.enabled).length),delta:'/ '+D.permRules.length+'件',dcls:'flat',strip:'navy',icon:'lock'})}
          ${UI.statCard({label:'組織独自設定',val:'5',delta:'上位継承を上書き',dcls:'up',strip:'amber',icon:'git-branch'})}
          ${UI.statCard({label:'権限制限付き項目',val:String(D.attrGroups.flatMap(g=>g.fields).filter(f=>f.sensitive).length),delta:'機微属性・コード値',dcls:'flat',strip:'danger',icon:'shield'})}
        </div>

        <div class="grid" style="grid-template-columns:1fr 300px;gap:16px;align-items:start">
          <div class="card">
            <div class="card-head">
              <div class="t">${I.svg('list',16)}<h3>権限ルール一覧</h3></div>
              <div class="actions">
                <select class="select" style="height:28px;font-size:12px;width:160px"><option>全組織スコープ</option><option>テナント全体</option><option>白里市</option></select>
              </div>
            </div>
            <div class="tbl-wrap">
              <table class="tbl">
                <thead><tr><th>ルール</th><th>サブジェクト</th><th>オブジェクト</th><th>権限</th><th>状態</th><th>適用組織</th><th></th></tr></thead>
                <tbody>
                  ${D.permRules.map(r=>`
                    <tr>
                      <td>
                        <div class="linkcell" data-rule="${r.id}">${r.name}</div>
                        <div class="txt-xs muted mono">${r.id}</div>
                      </td>
                      <td>
                        <div class="txt-sm fw-6">${r.subject.role}</div>
                        ${r.subject.cond?`<div class="txt-xs muted">${r.subject.cond}</div>`:''}
                      </td>
                      <td>
                        <div class="txt-sm">${r.object.type}</div>
                        ${r.object.scope?`<div class="txt-xs muted">${r.object.scope}</div>`:''}
                      </td>
                      <td>${r.permissions.map(p=>`<span class="tag">${p}</span>`).join(' ')}</td>
                      <td>${r.enabled?UI.status('有効','ok'):UI.status('無効','neutral')}</td>
                      <td>
                        <span class="txt-sm">${r.scopeOrg}</span>
                        ${r.inherited?'':`<div class="txt-xs" style="color:var(--amber-600)">${I.svg('star',10)} 独自</div>`}
                      </td>
                      <td><button class="btn btn-sm btn-icon btn-ghost" data-rule="${r.id}">${I.svg('chevron-right',14)}</button></td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="col gap-16">
            <div class="card">
              <div class="card-head"><div class="t">${I.svg('info',16)}<h3>権限モデル</h3></div></div>
              <div class="card-pad txt-sm muted-2">
                <p><strong style="color:var(--ink)">サブジェクト</strong>（誰が）= 職種・属性値・組織スコープ</p>
                <p class="mt-8"><strong style="color:var(--ink)">オブジェクト</strong>（何を）= 生徒・教員・コード値（選択肢レベル）</p>
                <p class="mt-8"><strong style="color:var(--ink)">機能</strong>（どうする）= 閲覧・編集・申請・承認…</p>
                <div class="divider"></div>
                <p class="txt-xs">条件を組み合わせて機能を付与。組織階層で継承・上書き可能。</p>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div class="t">${I.svg('git-branch',16)}<h3>コード値レベル制限</h3></div></div>
              <div class="card-pad">
                <div class="banner banner-warn" style="padding:9px 11px">${I.svg('shield',15)}<div class="body txt-xs">「人物の特徴」などコード項目は、<strong>選択肢ごと</strong>に表示権限を設定可能。例: いじめ加害者タグは学年主任のみ表示。</div></div>
                <button class="btn btn-sm btn-block mt-12" data-go="#/settings">${I.svg('git-branch',13)} コードマスター管理</button>
              </div>
            </div>
          </div>
        </div>
      `;
      I.scan(el);
      el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
      el.querySelectorAll('[data-rule]').forEach(b=>b.addEventListener('click',()=>ruleModal(b.dataset.rule)));
      el.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',addRuleModal));
    }
  });

  function ruleModal(id){
    const r = D.permRules.find(x=>x.id===id) || D.permRules[0];
    UI.modal({
      title:r.name, icon:'lock', size:'xl',
      sub:`${r.id} · 適用組織: ${r.scopeOrg}${r.inherited?'（継承）':'（独自）'}`,
      body:`
        <div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:12px">
          <!-- Subject -->
          <div class="card card-pad">
            <div class="row gap-6 mb-8">${I.svg('user',15)}<h4>サブジェクト（誰が）</h4></div>
            <div class="field"><label class="field-label">職種 / 属性</label>
              <select class="select">${D.permConditions.subjectTypes.map(s=>`<option ${s.name.includes('職種')?'selected':''}>${s.name}</option>`).join('')}</select>
            </div>
            <div class="field mt-8"><label class="field-label">値</label>
              <select class="select"><option>${r.subject.role}</option><option>校長</option><option>学年主任</option></select>
            </div>
            <div class="field mt-8"><label class="field-label">追加条件</label>
              <input class="input" value="${r.subject.cond||''}" placeholder="例: 担任である">
            </div>
          </div>
          <!-- Object -->
          <div class="card card-pad">
            <div class="row gap-6 mb-8">${I.svg('shield',15)}<h4>オブジェクト（何を）</h4></div>
            <div class="field"><label class="field-label">対象タイプ</label>
              <select class="select">${D.permConditions.objectTypes.map(o=>`<option ${o.name===r.object.type?'selected':''}>${o.name}</option>`).join('')}</select>
            </div>
            <div class="field mt-8"><label class="field-label">スコープ</label>
              <select class="select">${D.permConditions.scopes.map(s=>`<option ${s.name===r.object.scope?'selected':''}>${s.name}</option>`).join('')}</select>
            </div>
            ${r.object.code?`<div class="field mt-8"><label class="field-label">コードマスター</label><input class="input mono" value="${r.object.code}" readonly></div>`:''}
            ${r.object.value?`<div class="field mt-8"><label class="field-label">対象コード値</label><input class="input mono" value="${r.object.value}" readonly></div>`:''}
          </div>
          <!-- Function -->
          <div class="card card-pad">
            <div class="row gap-6 mb-8">${I.svg('key',15)}<h4>機能（どうする）</h4></div>
            <div class="field"><label class="field-label">付与機能</label>
              <div class="col gap-8 mt-4">
                ${D.permConditions.functions.map(f=>`<label class="checkbox"><input type="checkbox" ${r.permissions.some(p=>p.includes(f.name.split(':')[0]))?'checked':''}><span class="txt-sm">${f.name}</span></label>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-16 card-pad">
          <div class="row between">
            <div class="row gap-8">
              <h4>継承・適用状態</h4>
              ${r.enabled?UI.status('有効','ok'):UI.status('無効','neutral')}
              ${r.inherited?UI.badge('テナント継承','info'):UI.badge('独自設定','amber')}
            </div>
            <div class="switch"><input type="checkbox" ${r.enabled?'checked':''}><span class="slider"></span></div>
          </div>
          <div class="kv mt-8">
            <span class="k">適用組織</span><span class="v">${r.scopeOrg}</span>
            <span class="k">継承元</span><span class="v">${r.inherited?'青葉県（テナント全体）':'?'}</span>
            <span class="k">下位への波及</span><span class="v">あり（下位で上書き可能）</span>
          </div>
          <div class="banner banner-info mt-8" style="padding:9px 11px">${I.svg('info',15)}<div class="body txt-xs">このルールは配下組織に継承されます。配下組織で独自に上書き・無効化できます。</div></div>
        </div>
      `,
      footer:`<div class="left"><button class="btn btn-danger btn-sm" data-del>${I.svg('trash',13)} 削除</button></div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-save>${I.svg('save',15)} 保存</button></div>`
    });
    document.querySelector('.modal [data-save]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'ルールを保存しました',kind:'ok'}); });
    document.querySelector('.modal [data-del]').addEventListener('click',()=>UI.confirm({title:'ルールを削除',msg:'この権限ルールを削除しますか？',kind:'danger',okText:'削除',onOk:()=>UI.toast({title:'ルールを削除しました',kind:'ok'})}));
  }

  function addRuleModal(){
    UI.modal({
      title:'権限ルールを作成', icon:'plus', size:'xl',
      sub:'サブジェクト・オブジェクト・機能を組み合わせて新しい権限ルールを定義します。',
      body:`
        <div class="field"><label class="field-label">ルール名 <span class="req">*</span></label><input class="input" placeholder="例: 担任の自クラス保護者情報編集"></div>
        <div class="grid mt-12" style="grid-template-columns:1fr 1fr;gap:12px">
          <div class="field"><label class="field-label">適用組織</label><select class="select"><option>テナント全体（基底）</option><option>白里市</option><option>白里市立東小学校</option></select></div>
          <div class="field"><label class="field-label">優先度</label><select class="select"><option>通常</option><option>高（上書き）</option></select></div>
        </div>
        <div class="grid mt-12" style="grid-template-columns:1fr 1fr 1fr;gap:12px">
          <div class="card card-pad"><div class="row gap-6 mb-8">${I.svg('user',15)}<h4>サブジェクト</h4></div>
            <div class="field"><label class="field-label">条件タイプ</label><select class="select">${D.permConditions.subjectTypes.map(s=>`<option>${s.name}</option>`).join('')}</select></div>
            <div class="field mt-8"><label class="field-label">値</label><select class="select"><option>一般教員</option><option>校長</option><option>学年主任</option></select></div>
          </div>
          <div class="card card-pad"><div class="row gap-6 mb-8">${I.svg('shield',15)}<h4>オブジェクト</h4></div>
            <div class="field"><label class="field-label">対象</label><select class="select">${D.permConditions.objectTypes.map(o=>`<option>${o.name}</option>`).join('')}</select></div>
            <div class="field mt-8"><label class="field-label">スコープ</label><select class="select">${D.permConditions.scopes.map(s=>`<option>${s.name}</option>`).join('')}</select></div>
          </div>
          <div class="card card-pad"><div class="row gap-6 mb-8">${I.svg('key',15)}<h4>機能</h4></div>
            <div class="col gap-8 mt-4">${D.permConditions.functions.slice(0,5).map(f=>`<label class="checkbox"><input type="checkbox"><span class="txt-sm">${f.name}</span></label>`).join('')}</div>
          </div>
        </div>
        <div class="banner banner-warn mt-12">${I.svg('alert-triangle',16)}<div class="body txt-sm">ルールは配下組織に継承されます。機微情報へのアクセスは監査ログに記録されます。</div></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 継承ルールは下位組織で上書き可能</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-accent" data-ok>${I.svg('plus',15)} 作成</button></div>`
    }).el.querySelector('[data-ok]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'権限ルールを作成しました',kind:'ok'}); });
  }

  /* Inheritance tree page */
  App.page({
    path:'/permissions/inheritance', group:'permissions', label:'継承ツリー',
    render({el}){
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'権限設定',href:'#/permissions'},{label:'継承ツリー',href:'#/permissions/inheritance'}],
          title:'権限継承ツリー', icon:'git-branch',
          subtitle:'組織階層ごとの権限ルール継承状況を確認できます。上位で設定したルールを継承しつつ、各組織で独自設定を追加・上書きできます。',
          actions:`<button class="btn" data-go="#/permissions">${I.svg('arrow-left',15)} ルール一覧へ</button>`
        })}
        <div class="card">
          <div class="card-head"><div class="t">${I.svg('git-branch',16)}<h3>組織別 継承状態</h3></div></div>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>組織</th><th>階層</th><th class="num">ルール計</th><th class="num">独自</th><th class="num">継承</th><th>モード</th><th></th></tr></thead>
            <tbody>
              ${D.permInheritance.map(o=>`
                <tr>
                  <td class="fw-6">${o.org}</td>
                  <td>${UI.badge(o.level,'neutral')}</td>
                  <td class="num fw-7">${o.rules}</td>
                  <td class="num">${o.own?`<span class="badge badge-amber">${o.own}</span>`:'<span class="muted">?</span>'}</td>
                  <td class="num">${o.inherited?`<span class="badge badge-info">${o.inherited}</span>`:'<span class="muted">?</span>'}</td>
                  <td>${o.mode==='base'?UI.badge('基底','navy'):o.mode==='extend'?UI.badge('継承+独自','amber'):UI.badge('継承のみ','neutral')}</td>
                  <td><button class="btn btn-sm btn-icon btn-ghost">${I.svg('chevron-right',14)}</button></td>
                </tr>`).join('')}
            </tbody>
          </table></div>
        </div>
        <div class="banner banner-info mt-16">${I.svg('info',18)}<div class="body"><div class="title">継承の仕組み</div>テナントで設定したルールは全組織に継承されます。下位組織で独自ルールを追加・上書きでき、その設定はさらに配下組織へ波及します。基本的に下位組織の設定が優先されます。</div></div>
      `;
      I.scan(el);
      el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
    }
  });
})();
