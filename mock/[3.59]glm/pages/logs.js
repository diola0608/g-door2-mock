/* 処理ログ — CSV import / sync / transfer batch status, errors, admin contact */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;
  const logIcon = { 'csv-import':'upload','sync-gw':'cloud','transfer-batch':'arrow-right-circle','form-writeback':'refresh' };
  const logLabel = { 'csv-import':'CSV取込','sync-gw':'GW同期','transfer-batch':'異動バッチ','form-writeback':'名簿反映' };

  App.page({
    path:'/logs', group:null, label:'処理ログ', icon:'activity', pill:'1',
    render({el}){
      let active = 'all';
      const tabs = [
        {id:'all',label:'すべて',count:D.logs.length},
        {id:'running',label:'処理中',count:D.logs.filter(l=>l.status==='running').length},
        {id:'partial',label:'一部成功',count:D.logs.filter(l=>l.status==='partial').length},
        {id:'error',label:'エラー',count:D.logs.filter(l=>l.status==='error').length},
        {id:'success',label:'成功',count:D.logs.filter(l=>l.status==='success').length},
      ];
      const list = ()=> D.logs.filter(l=>active==='all'||l.status===active);

      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'システム',href:'#/'},{label:'処理ログ',href:'#/logs'}],
            title:'処理ログ', icon:'activity',
            subtitle:'CSV取込・同期・異動バッチ・名簿反映の実行状態を確認できます。エラー時は詳細を確認し、必要に応じてシステム管理者へ問い合わせます。',
            actions:`<button class="btn" data-refresh>${I.svg('refresh',15)} 更新</button>`
          })}

          <div class="panel-grid g4 mb-16">
            ${UI.statCard({label:'処理中',val:String(D.logs.filter(l=>l.status==='running').length),delta:'バッチ実行中',dcls:'flat',strip:'info',icon:'play'})}
            ${UI.statCard({label:'エラー',val:String(D.logs.filter(l=>l.status==='error').length),delta:'要対応',dcls:'danger',strip:'danger',icon:'alert-triangle'})}
            ${UI.statCard({label:'一部成功',val:String(D.logs.filter(l=>l.status==='partial').length),delta:'要確認',dcls:'flat',strip:'amber',icon:'alert-octagon'})}
            ${UI.statCard({label:'本日の成功',val:String(D.logs.filter(l=>l.status==='success').length),delta:'正常終了',dcls:'up',strip:'ok',icon:'check-circle'})}
          </div>

          ${tabs.length?UI.tabs(tabs, active):''}

          <div class="card">
            <div class="card-head"><div class="t">${I.svg('activity',16)}<h3>バッチ処理履歴</h3></div>
              <div class="actions"><button class="btn btn-sm" data-export>${I.svg('download',13)} エクスポート</button></div>
            </div>
            <div class="tbl-wrap"><table class="tbl">
              <thead><tr><th>バッチID</th><th>種別</th><th>詳細</th><th>実行者</th><th class="num">件数</th><th class="num">エラー</th><th>状態</th><th>実行日時</th><th></th></tr></thead>
              <tbody>
                ${list().length?list().map(l=>{
                  const s=D.logStatusMap[l.status];
                  return `<tr>
                    <td class="linkcell mono" data-detail="${l.id}">${l.batch}</td>
                    <td>${I.svg(logIcon[l.type]||'activity',13)} ${logLabel[l.type]||l.type}</td>
                    <td class="txt-sm">${l.detail}</td>
                    <td class="txt-sm">${l.person}</td>
                    <td class="num mono">${l.count||'?'}</td>
                    <td class="num mono ${l.errors?'fw-7':''}" style="${l.errors?'color:var(--danger)':''}">${l.errors||'0'}</td>
                    <td>${l.status==='running'?`<span class="status info"><span class="spinner" style="width:11px;height:11px;border-width:1.5px;margin-right:4px"></span>${s.label}</span>`:UI.status(s.label, s.cls)}</td>
                    <td class="mono txt-sm">${l.at}</td>
                    <td><button class="btn btn-sm btn-icon btn-ghost" data-detail="${l.id}">${I.svg('chevron-right',14)}</button></td>
                  </tr>`;
                }).join(''):`<tr><td colspan="9">${UI.empty({icon:'inbox',title:'該当するログがありません'})}</td></tr>`}
              </tbody>
            </table></div>
          </div>
        `;
        I.scan(el);
        UI.bindTabs(el.querySelector('.tabs'), id=>{ active=id; view(); });
        el.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>detailModal(b.dataset.detail)));
        el.querySelectorAll('[data-refresh]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'ログを更新しました',kind:'info'})));
        el.querySelectorAll('[data-export]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'エクスポート中',kind:'info'})));
      }
      view();
    }
  });

  function detailModal(id){
    const l = D.logs.find(x=>x.id===id) || D.logs[0];
    const s = D.logStatusMap[l.status];
    const hasError = l.errors>0;
    UI.modal({
      title:`バッチ ${l.batch}`, icon:logIcon[l.type]||'activity', size:'lg',
      sub:l.detail,
      body:`
        <div class="row gap-8 mb-16">
          ${UI.status(s.label, s.cls)}
          ${l.status==='running'?`<span class="badge badge-info"><span class="spinner" style="width:10px;height:10px;border-width:1.5px;margin-right:4px"></span>実行中</span>`:''}
        </div>
        <div class="panel-grid g3 mb-16">
          ${UI.statCard({label:'処理件数',val:String(l.count||0),dcls:'flat',strip:'navy'})}
          ${UI.statCard({label:'成功',val:String((l.count||0)-(l.errors||0)),dcls:'up',strip:'ok'})}
          ${UI.statCard({label:'エラー',val:String(l.errors||0),dcls:l.errors?'danger':'flat',strip:l.errors?'danger':'neutral'})}
        </div>
        <div class="kv">
          <span class="k">バッチID</span><span class="v mono">${l.batch}</span>
          <span class="k">種別</span><span class="v">${logLabel[l.type]||l.type}</span>
          <span class="k">実行者</span><span class="v">${l.person}</span>
          <span class="k">実行日時</span><span class="v mono">${l.at}</span>
          <span class="k">状態</span><span class="v">${UI.status(s.label, s.cls)}</span>
        </div>
        ${hasError?`
          <div class="divider"></div>
          <h4>エラー詳細</h4>
          <div class="col gap-8 mt-8">
            <div class="banner banner-danger" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">行 12: 組織コード「ORG-999」がマスタ未登録。スキップしました。</div></div>
            <div class="banner banner-danger" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">行 34: 必須項目「氏名」が空です。</div></div>
            <div class="banner banner-danger" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">行 56: 識別キー重複。既存レコードと競合しています。</div></div>
          </div>
          <div class="row gap-8 mt-12">
            <button class="btn btn-sm" data-retry>${I.svg('refresh',13)} 再実行</button>
            <button class="btn btn-sm btn-danger" data-contact>${I.svg('mail',13)} 管理者へ問い合わせ</button>
          </div>`:''}
        <div class="divider"></div>
        <h4>処理タイムライン</h4>
        <div class="timeline mt-8">
          <div class="tl-item ${hasError?'danger':'ok'}"><div class="when">${l.at}</div><div class="what">バッチ開始</div></div>
          <div class="tl-item ${l.status==='running'?'current':hasError?'danger':'ok'}"><div class="when">${l.at}</div><div class="what">${hasError?'エラー発生':l.status==='running'?'処理中':'処理完了'}</div></div>
          ${l.status!=='running'?`<div class="tl-item ok"><div class="when">${l.at}</div><div class="what">${s.label}で終了</div></div>`:''}
        </div>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 7日間保持されます</div>
              <div class="right"><button class="btn" data-close>閉じる</button></div>`
    });
    document.querySelector('.modal [data-retry]')?.addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'再実行を開始',msg:'新しいバッチとして再実行します。',kind:'info'}); });
    document.querySelector('.modal [data-contact]')?.addEventListener('click',()=>contactModal(l));
  }

  function contactModal(l){
    UI.modal({
      title:'システム管理者へ問い合わせ', icon:'mail',
      sub:`バッチ ${l.batch} について`,
      body:`
        <div class="field"><label class="field-label">件名</label><input class="input" value="バッチ ${l.batch} のエラーについて"></div>
        <div class="field mt-12"><label class="field-label">問い合わせ内容 <span class="req">*</span></label><textarea class="textarea" placeholder="エラーの状況・期待する動作を記入してください">${l.detail} でエラーが発生しています。${l.errors}件のエラーを確認しました。対応方法をご教示ください。</textarea></div>
        <div class="banner banner-info mt-12">${I.svg('info',16)}<div class="body txt-sm">問い合わせは ${D.tenant.adminEmail} へ送信されます。バッチID・エラー詳細が自動添付されます。</div></div>
      `,
      footer:`<div class="left"></div><div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-send>${I.svg('send',15)} 送信</button></div>`
    }).el.querySelector('[data-send]').addEventListener('click',()=>{ UI.closeTopModal(); UI.toast({title:'問い合わせを送信しました',msg:'管理者から折り返し連絡があります。',kind:'ok'}); });
  }
})();
