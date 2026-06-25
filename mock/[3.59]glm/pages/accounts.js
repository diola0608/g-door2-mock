/* アカウント管理 — Google Workspace sync status & settings */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;
  const gwMap = { synced:{label:'同期済',cls:'ok'}, pending:{label:'同期待ち',cls:'warn'}, error:{label:'エラー',cls:'danger'} };

  App.group({id:'accounts', label:'アカウント管理'});
  App.page({
    path:'/accounts', group:'accounts', label:'アカウント一覧', icon:'shield',
    render({el}){
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'アカウント管理',href:'#/accounts'}],
          title:'アカウント一覧', icon:'shield',
          subtitle:'メールアカウントを持つ人物の Google Workspace 連携状態を管理します。同期は本システム → Workspace の一方向です。',
          actions:`<button class="btn" data-sync-now>${I.svg('refresh',15)} 今すぐ同期</button>
                   <button class="btn" data-settings>${I.svg('settings',15)} 同期設定</button>`
        })}

        <div class="panel-grid g4 mb-16">
          ${UI.statCard({label:'アカウント総数',val:'9,460',delta:'+128 (今月)',dcls:'up',strip:'navy',icon:'shield'})}
          ${UI.statCard({label:'同期済',val:'9,432',delta:'99.7%',dcls:'up',strip:'ok',icon:'check-circle'})}
          ${UI.statCard({label:'同期待ち',val:'21',delta:'初回同期待ち',dcls:'flat',strip:'amber',icon:'clock'})}
          ${UI.statCard({label:'同期エラー',val:'7',delta:'要対応',dcls:'danger',strip:'danger',icon:'alert-triangle'})}
        </div>

        <div class="toolbar">
          <div class="seg">
            <button class="active" data-seg="all">全件</button>
            <button data-seg="synced">同期済</button>
            <button data-seg="pending">同期待ち</button>
            <button data-seg="error">エラー</button>
          </div>
          <div class="toolbar-divider"></div>
          <div class="input-icon" style="width:260px"><span class="sicon">${I.svg('search',15)}</span><input class="input" placeholder="氏名・メールで検索…"></div>
          <div class="grow"></div>
          <select class="select" style="width:180px"><option>ドメイン: すべて</option><option>shirosato-el.jp</option><option>aoba-edu.pref.jp</option></select>
        </div>

        <div class="card">
          <div class="card-head">
            <div class="t">${I.svg('cloud',16)}<h3>Workspace アカウント</h3></div>
            <div class="actions">
              <button class="btn btn-sm" data-export>${I.svg('download',13)} エクスポート</button>
            </div>
          </div>
          <div class="tbl-wrap">
            <table class="tbl">
              <thead><tr>
                <th>人物</th><th>メールアドレス</th><th>同期状態</th><th>最終同期</th><th>組織ユニット</th><th>ライセンス</th><th></th>
              </tr></thead>
              <tbody>
                ${D.gwAccounts.map(a=>`
                  <tr>
                    <td>
                      <div class="row gap-8">
                        ${UI.avatar(UI.initials(a.name), a.gwStatus==='error'?'danger':a.gwStatus==='pending'?'amber':'navy','sm')}
                        <div>
                          <div class="linkcell" data-person="${a.id}">${a.name}</div>
                          <div class="txt-xs muted mono">${a.id}</div>
                        </div>
                      </div>
                    </td>
                    <td class="mono txt-sm">${a.email}</td>
                    <td>${UI.status(gwMap[a.gwStatus].label, gwMap[a.gwStatus].cls)}${a.issues?` <span class="badge badge-danger">${a.issues}</span>`:''}</td>
                    <td class="mono txt-sm">${a.lastSync}</td>
                    <td class="mono txt-sm muted">${a.orgUnit}</td>
                    <td>${a.license==='-'?'<span class="muted">?</span>':`<span class="tag">${a.license}</span>`}</td>
                    <td>
                      <div class="row gap-4">
                        ${a.gwStatus==='error'?`<button class="btn btn-sm btn-danger" data-fix="${a.id}">${I.svg('wrench',13)} 修正</button>`:''}
                        <button class="btn btn-sm btn-icon btn-ghost" data-detail="${a.id}">${I.svg('chevron-right',14)}</button>
                      </div>
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="banner banner-info mt-16">${I.svg('info',18)}<div class="body"><div class="title">同期の方向について</div>本システム → Google Workspace の一方向同期です。本システムに登録された情報が Workspace アカウントのプロフィール・組織ユニットに反映されます。Workspace 側での変更は本システムへ反映されません。</div></div>
      `;
      I.scan(el);
      el.querySelectorAll('[data-person]').forEach(b=>b.addEventListener('click',()=>location.hash='#/roster/person/'+b.dataset.person));
      el.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>detailModal(b.dataset.detail)));
      el.querySelectorAll('[data-fix]').forEach(b=>b.addEventListener('click',()=>fixModal(b.dataset.fix)));
      el.querySelectorAll('[data-sync-now]').forEach(b=>b.addEventListener('click',()=>UI.confirm({title:'今すぐ同期を実行',msg:'全テナントの Google Workspace 同期を今すぐ実行しますか？（通常は毎日 03:00 の自動実行）',okText:'実行',onOk:()=>UI.toast({title:'同期を開始しました',msg:'バックグラウンドで Workspace 同期を実行中です。',kind:'ok'})})));
      el.querySelectorAll('[data-settings]').forEach(b=>b.addEventListener('click',settingsModal));
      el.querySelectorAll('[data-export]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'エクスポート中',kind:'info'})));
      UI.bindSeg(el.querySelector('.toolbar .seg'), id=>UI.toast({title:'フィルタ適用',msg:id==='all'?'全件表示':`${gwMap[id]?.label||id}で絞り込み`,kind:'info'}));
    }
  });

  function detailModal(id){
    const a = D.gwAccounts.find(x=>x.id===id) || D.gwAccounts[0];
    UI.drawer({
      title:a.name, sub:a.email, icon:'cloud', size:'lg',
      body:`
        <div class="row gap-12 mb-16">
          ${UI.avatar(UI.initials(a.name), a.gwStatus==='error'?'danger':'navy','lg')}
          <div>
            <h3>${a.name}</h3>
            <div class="txt-sm muted">${a.email}</div>
            <div class="mt-8">${UI.status(gwMap[a.gwStatus].label, gwMap[a.gwStatus].cls)}</div>
          </div>
        </div>
        <div class="kv">
          <span class="k">人物ID</span><span class="v mono">${a.id}</span>
          <span class="k">同期状態</span><span class="v">${UI.status(gwMap[a.gwStatus].label, gwMap[a.gwStatus].cls)}</span>
          <span class="k">最終同期</span><span class="v mono">${a.lastSync}</span>
          <span class="k">組織ユニット</span><span class="v mono">${a.orgUnit}</span>
          <span class="k">ライセンス</span><span class="v">${a.license}</span>
          <span class="k">課題</span><span class="v">${a.issues?`<span class="chip chip-danger">${a.issue||a.issues+'件'}</span>`:'<span class="muted">なし</span>'}</span>
        </div>
        <div class="divider"></div>
        <h4>同期マッピング</h4>
        <div class="mt-8 col gap-8">
          ${D.gwSyncSettings.items.map(it=>`
            <div class="row between" style="padding:8px 0;border-bottom:1px solid var(--line)">
              <div><div class="fw-6 txt-sm">${it.name}</div><div class="txt-xs muted">${it.mapped}</div></div>
              <div class="switch"><input type="checkbox" ${it.enabled?'checked':''} disabled><span class="slider"></span></div>
            </div>`).join('')}
        </div>
      `,
      footer:`<button class="btn" data-close>閉じる</button><button class="btn btn-primary" data-retry>${I.svg('refresh',15)} 再同期</button>`
    });
    document.querySelector('.drawer [data-retry]')?.addEventListener('click',()=>{ UI.toast({title:'再同期を開始',msg:'このアカウントの同期を再実行します。',kind:'info'}); });
  }

  function fixModal(id){
    const a = D.gwAccounts.find(x=>x.id===id);
    UI.modal({
      title:'同期エラーの修正', icon:'alert-triangle',
      sub:`${a.name} (${a.email})`,
      body:`
        <div class="banner banner-danger">${I.svg('alert-octagon',18)}<div class="body"><div class="title">${a.issue||'アカウント未発見（404）'}</div>Workspace 側でアカウントが見つかりません。アカウントが未作成か、削除されている可能性があります。</div></div>
        <div class="field mt-16"><label class="field-label">対応方法 <span class="req">*</span></label>
          <select class="select"><option>Workspace に新規アカウントを作成して再同期</option><option>別のメールアドレスに紐付け直す</option><option>アカウントなしとして扱う</option></select>
        </div>
        <div class="field mt-12"><label class="field-label">メモ（管理者へ連絡）</label><textarea class="textarea" placeholder="補足情報があれば入力"></textarea></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} システム管理者に問い合わせ可能</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-ok>${I.svg('check',15)} 適用して再同期</button></div>`
    }).el.querySelector('[data-ok]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'修正を適用しました',msg:'再同期を開始します。結果は処理ログで確認できます。',kind:'ok'}); });
  }

  function settingsModal(){
    UI.modal({
      title:'同期設定', icon:'settings', size:'xl',
      sub:D.gwSyncSettings.direction,
      body:`
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:12px">
          <div class="field"><label class="field-label">実行スケジュール</label><input class="input" value="${D.gwSyncSettings.schedule}" readonly></div>
          <div class="field"><label class="field-label">同期スコープ</label><input class="input" value="${D.gwSyncSettings.scope}" readonly></div>
        </div>
        <h4 class="mt-16">同期項目マッピング</h4>
        <div class="mt-8 col gap-8">
          ${D.gwSyncSettings.items.map(it=>`
            <div class="row between" style="padding:10px 0;border-bottom:1px solid var(--line)">
              <div><div class="fw-6 txt-sm">${it.name}</div><div class="txt-xs muted">→ ${it.mapped}</div></div>
              <div class="switch"><input type="checkbox" ${it.enabled?'checked':''}><span class="slider"></span></div>
            </div>`).join('')}
        </div>
        <div class="banner banner-warn mt-12">${I.svg('alert-triangle',16)}<div class="body txt-sm">同期は一方向（本システム → Workspace）です。Workspace 側で直接編集された値は上書きされます。</div></div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} テナント全体の設定</div>
              <div class="right"><button class="btn" data-close>閉じる</button><button class="btn btn-primary" data-save>${I.svg('save',15)} 保存</button></div>`
    }).el.querySelector('[data-save]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'設定を保存しました',kind:'ok'}); });
  }
})();
