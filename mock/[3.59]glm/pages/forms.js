/* フォーム管理 — list, builder, aggregation, roster writeback */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;
  const formStatus = { open:{label:'受付中',cls:'ok'}, closed:{label:'受付終了',cls:'neutral'}, draft:{label:'下書き',cls:'warn'} };

  App.group({id:'forms', label:'フォーム管理'});
  App.page({
    path:'/forms', group:'forms', label:'フォーム一覧', icon:'file-text',
    render({el}){
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'フォーム管理',href:'#/forms'}],
          title:'フォーム一覧', icon:'file-text',
          subtitle:'教育委員会が対象者へアンケートを配信。権限設定で対象者のみ閲覧・回答でき、回答を名簿へ反映する書戻し機能もあります。',
          actions:`<button class="btn btn-accent" data-go="#/forms/new">${I.svg('plus',15)} フォームを作成</button>`
        })}

        <div class="panel-grid g3 mb-16">
          ${UI.statCard({label:'フォーム総数',val:String(D.forms.length),delta:'受付中 2件',dcls:'flat',strip:'navy',icon:'file-text'})}
          ${UI.statCard({label:'総回答数',val:String(D.forms.reduce((a,f)=>a+f.responses,0)),delta:'回収率 76%',dcls:'up',strip:'ok',icon:'inbox'})}
          ${UI.statCard({label:'名簿書戻し設定',val:String(D.forms.filter(f=>f.writeback).length),delta:'自動反映あり',dcls:'flat',strip:'amber',icon:'refresh'})}
        </div>

        <div class="cols">
          ${D.forms.map(f=>formCard(f)).join('')}
        </div>
      `;
      I.scan(el);
      el.querySelectorAll('[data-form]').forEach(b=>b.addEventListener('click',()=>location.hash='#/forms/'+b.dataset.form));
      el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
    }
  });

  function formCard(f){
    const rate = f.total?Math.round(f.responses/f.total*100):0;
    return `
      <div>
        <div class="col-head">
          <span>${UI.status(formStatus[f.status].label, formStatus[f.status].cls)}</span>
          <span class="count">${f.responses}/${f.total||'—'}</span>
        </div>
        <div class="col-body">
          <div class="card-pad" style="padding:0">
            <h4 class="linkcell" data-form="${f.id}">${f.title}</h4>
            <div class="txt-xs muted mt-4">対象: ${f.target}</div>
            <div class="txt-xs muted mt-4">期限: ${f.deadline}</div>
            ${f.writeback?`<div class="mt-8"><span class="chip chip-amber">${I.svg('refresh',11)} 名簿書戻し: ${f.writebackField}</span></div>`:''}
            <div class="mt-12">
              <div class="row between mb-4"><span class="txt-xs muted">回収率</span><span class="txt-xs fw-7">${rate}%</span></div>
              <div class="progress ${rate>=80?'ok':rate>=50?'amber':'danger'} progress-thin"><div class="bar" style="width:${rate}%"></div></div>
            </div>
            <div class="row between mt-12">
              <span class="txt-xs muted">${f.owner}</span>
              <div class="row gap-4">
                <button class="btn btn-sm btn-icon btn-ghost" data-aggregate="${f.id}" title="集計">${I.svg('bar-chart',13)}</button>
                <button class="btn btn-sm btn-icon btn-ghost" data-form="${f.id}" title="編集">${I.svg('edit',13)}</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* Form builder */
  App.page({
    path:'/forms/new', group:'forms', label:'フォーム作成',
    render({el}){
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'フォーム管理',href:'#/forms'},{label:'新規作成',href:'#/forms/new'}],
          title:'フォームを作成', icon:'file-plus',
          subtitle:'対象者・設問・権限を設定してアンケートを作成します。名簿項目への書戻し設定も可能です。',
          actions:`<button class="btn" data-go="#/forms">${I.svg('x',15)} 破棄</button>
                   <button class="btn" data-preview>${I.svg('eye',15)} プレビュー</button>
                   <button class="btn btn-accent" data-publish>${I.svg('send',15)} 公開</button>`
        })}
        <div class="grid" style="grid-template-columns:1fr 300px;gap:16px;align-items:start">
          <div class="col gap-16">
            <div class="card card-pad">
              <div class="field"><label class="field-label">フォームタイトル <span class="req">*</span></label><input class="input" value="教員緊急連絡先（携帯番号）登録アンケート" style="font-family:var(--font-display);font-size:16px;font-weight:700"></div>
              <div class="field mt-8"><label class="field-label">説明文</label><textarea class="textarea">平素より教育行政にご協力いただきありがとうございます。緊急時の連絡網確保のため、教員の個人携帯番号を登録してください。</textarea></div>
            </div>
            <div class="card card-pad">
              <h4>設問</h4>
              <div class="col gap-12 mt-8" id="questions">
                ${question('Q1','text','氏名（自動）',true)}
                ${question('Q2','roster-link','携帯電話番号 <span class="badge badge-amber" style="margin-left:4px">名簿書戻し</span>',false,'名簿項目「携帯電話番号」に自動反映')}
                ${question('Q3','radio','現在の所属校で勤務可能か',false,'',['はい','いいえ（異動希望あり）'])}
              </div>
              <div class="mt-12">
                <button class="btn btn-block" data-add-q>${I.svg('plus',13)} 設問を追加</button>
              </div>
              <div class="mt-12 row gap-8" style="flex-wrap:wrap">
                ${D.formFieldTypes.map(t=>`<button class="chip" data-add-type="${t.id}">${I.svg(t.icon,12)} ${t.name}</button>`).join('')}
              </div>
            </div>
          </div>
          <div class="col gap-16">
            <div class="card card-pad">
              <h4>対象者設定</h4>
              <div class="field mt-8"><label class="field-label">対象スコープ</label>
                <select class="select"><option>白里市 小学校 一般教員</option><option>白里市 全校 教員</option><option>テナント全教員</option></select>
              </div>
              <div class="row between mt-12"><span class="txt-sm muted-2">想定対象者</span><span class="fw-7">68名</span></div>
              <div class="banner banner-info mt-8" style="padding:9px 11px">${I.svg('users',15)}<div class="body txt-xs">権限設定により、対象者のみ回答可能。対象外は閲覧できません。</div></div>
            </div>
            <div class="card card-pad">
              <h4>公開設定</h4>
              <div class="field mt-8"><label class="field-label">受付開始</label><input class="input" type="date" value="2026-06-26"></div>
              <div class="field mt-8"><label class="field-label">受付終了</label><input class="input" type="date" value="2026-07-05"></div>
              <label class="checkbox mt-12"><input type="checkbox" checked> 回答期限を過ぎたら受付終了</label>
              <label class="checkbox mt-8"><input type="checkbox"> リマインドメール送信</label>
            </div>
            <div class="card card-pad">
              <h4>名簿書戻し</h4>
              <div class="switch mt-8"><input type="checkbox" checked><span class="slider"></span></div>
              <div class="mt-8"><label class="checkbox"><input type="checkbox" checked> 回答を名簿に自動反映</label></div>
              <div class="banner banner-warn mt-8" style="padding:9px 11px">${I.svg('refresh',15)}<div class="body txt-xs">書戻し先項目の<strong>編集権限</strong>が必要です。回答値は承認フローを経て名簿へ反映されます。</div></div>
            </div>
          </div>
        </div>
      `;
      I.scan(el);
      el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
      el.querySelectorAll('[data-add-q]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'設問を追加',msg:'設問タイプを選択してください。',kind:'info'})));
      el.querySelectorAll('[data-add-type]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'設問を追加しました',kind:'ok'})));
      el.querySelectorAll('[data-preview]').forEach(b=>b.addEventListener('click',()=>previewModal()));
      el.querySelectorAll('[data-publish]').forEach(b=>b.addEventListener('click',()=>UI.confirm({title:'フォームを公開',msg:'対象者へフォームを公開します。公開後は対象者のみ閲覧・回答できます。',okText:'公開',onOk:()=>{ UI.toast({title:'フォームを公開しました',msg:'対象 68名に通知を送信しました。',kind:'ok'}); setTimeout(()=>location.hash='#/forms',900); }})));
    }
  });

  function question(num, type, label, readonly, hint, options){
    const t = D.formFieldTypes.find(x=>x.id===type);
    return `
      <div class="card" style="box-shadow:none">
        <div class="card-pad" style="padding:12px">
          <div class="row between">
            <div class="row gap-8">
              <span class="badge badge-navy">${num}</span>
              <span class="txt-sm fw-6">${I.svg(t?.icon||'type',13)} ${t?.name||type}</span>
            </div>
            <div class="row gap-4">
              <button class="btn btn-sm btn-icon btn-ghost">${I.svg('more-vertical',14)}</button>
            </div>
          </div>
          <div class="mt-8 fw-6 txt-sm">${label}</div>
          ${hint?`<div class="txt-xs muted mt-4">${I.svg('info',11)} ${hint}</div>`:''}
          ${options?`<div class="mt-8 col gap-6">${options.map(o=>`<label class="radio"><input type="radio" name="${num}"><span>${o}</span></label>`).join('')}</div>`:''}
          ${type==='text'?`<input class="input mt-8" placeholder="回答欄" ${readonly?'readonly value="名簿から自動取得"':''}>`:''}
          ${type==='roster-link'?`<input class="input mt-8" placeholder="090-XXXX-XXXX">`:''}
        </div>
      </div>`;
  }

  function previewModal(){
    UI.modal({
      title:'フォーム プレビュー', icon:'eye', size:'xl',
      sub:'回答者視点での表示イメージ',
      body:`
        <div style="max-width:560px;margin:0 auto">
          <h2>教員緊急連絡先（携帯電話番号）登録アンケート</h2>
          <p class="muted-2 mt-8 txt-sm">緊急時の連絡網確保のため、教員の個人携帯番号を登録してください。</p>
          <div class="divider"></div>
          <div class="field"><label class="field-label">Q1. 氏名</label><input class="input" value="佐藤 健一" readonly></div>
          <div class="field mt-12"><label class="field-label">Q2. 携帯電話番号 <span class="badge badge-amber">名簿へ反映</span></label><input class="input" placeholder="090-XXXX-XXXX"></div>
          <div class="field mt-12"><label class="field-label">Q3. 現在の所属校で勤務可能か</label>
            <div class="col gap-6 mt-4"><label class="radio"><input type="radio" name="q3"><span>はい</span></label><label class="radio"><input type="radio" name="q3"><span>いいえ（異動希望あり）</span></label></div>
          </div>
          <div class="divider"></div>
          <button class="btn btn-primary btn-lg btn-block">${I.svg('send',16)} 回答を送信</button>
        </div>
      `,
      footer:`<div class="left"></div><div class="right"><button class="btn" data-close>閉じる</button></div>`
    });
  }

  /* Form detail / aggregation */
  App.page({
    path:'/forms/:id', group:'forms', label:'フォーム詳細',
    render({el,params}){
      const f = D.forms.find(x=>x.id===params.id) || D.forms[0];
      const rate = f.total?Math.round(f.responses/f.total*100):0;
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'フォーム管理',href:'#/forms'},{label:f.title,href:'#/forms/'+f.id}],
          title:f.title, icon:'file-text',
          subtitle:`対象: ${f.target} · 期限: ${f.deadline} · 作成者: ${f.owner}`,
          actions:`<button class="btn" data-go="#/forms">${I.svg('arrow-left',15)} 一覧へ</button>
                   <button class="btn" data-share>${I.svg('external',15)} 対象者へ通知</button>
                   ${f.status==='open'?`<button class="btn btn-danger" data-close-form>${I.svg('pause',15)} 受付終了</button>`:`<button class="btn btn-accent" data-open>${I.svg('play',15)} 受付再開</button>`}`
        })}
        <div class="panel-grid g4 mb-16">
          ${UI.statCard({label:'回答数',val:String(f.responses),delta:`/ ${f.total}名`,dcls:'up',strip:'navy',icon:'inbox'})}
          ${UI.statCard({label:'回収率',val:rate+'%',delta:rate>=80?'好調':rate>=50?'経過中':'要注意',dcls:rate>=80?'up':rate>=50?'flat':'danger',strip:rate>=80?'ok':rate>=50?'amber':'danger',icon:'trending-up'})}
          ${UI.statCard({label:'未回答',val:String(f.total-f.responses),delta:'リマインド可能',dcls:'flat',strip:'amber',icon:'clock'})}
          ${UI.statCard({label:'名簿反映',val:f.writeback?'あり':'なし',delta:f.writeback?f.writebackField:'—',dcls:f.writeback?'up':'flat',strip:f.writeback?'ok':'neutral',icon:'refresh'})}
        </div>
        ${UI.tabs([{id:'summary',label:'集計サマリ',icon:'bar-chart'},{id:'answers',label:'個別回答',icon:'list',count:f.responses},{id:'writeback',label:'名簿書戻し',icon:'refresh'},{id:'settings',label:'設定',icon:'settings'}],'summary')}

        <div id="form-tab">
          <div class="panel-grid g2">
            <div class="card card-pad">
              <div class="row between"><h4>Q2. 現在の所属校で勤務可能か</h4><span class="badge badge-navy">${f.responses}回答</span></div>
              <div class="mt-12">
                <div class="row between mb-4"><span class="txt-sm">はい</span><span class="fw-7">44 (85%)</span></div>
                <div class="progress ok progress-thin"><div class="bar" style="width:85%"></div></div>
                <div class="row between mb-4 mt-12"><span class="txt-sm">いいえ（異動希望あり）</span><span class="fw-7">8 (15%)</span></div>
                <div class="progress amber progress-thin"><div class="bar" style="width:15%"></div></div>
              </div>
            </div>
            <div class="card card-pad">
              <div class="row between"><h4>Q3. 携帯電話番号（書戻し）</h4><span class="badge badge-amber">名簿反映</span></div>
              <div class="mt-12">
                <div class="row between mb-4"><span class="txt-sm">入力済</span><span class="fw-7">142 (95%)</span></div>
                <div class="progress ok progress-thin"><div class="bar" style="width:95%"></div></div>
                <div class="row between mb-4 mt-12"><span class="txt-sm">未入力</span><span class="fw-7">7 (5%)</span></div>
                <div class="progress danger progress-thin"><div class="bar" style="width:5%"></div></div>
                <div class="banner banner-ok mt-12" style="padding:9px 11px">${I.svg('check-circle',15)}<div class="body txt-xs">入力済 142件は名簿の「携帯電話番号」へ自動反映済み。</div></div>
              </div>
            </div>
          </div>
          <div class="card mt-16">
            <div class="card-head"><div class="t">${I.svg('users',16)}<h3>回答権限（結果閲覧権限）</h3></div></div>
            <div class="card-pad">
              <div class="banner banner-info" style="padding:9px 11px">${I.svg('info',15)}<div class="body txt-xs">集計結果の閲覧権限もサブジェクト・オブジェクト関係で柔軟に設定可能。例: 作成者と管理職のみ集計全体を閲覧、担当校の結果のみ各校長が閲覧。</div></div>
              <div class="row gap-8 mt-12" style="flex-wrap:wrap">
                <span class="chip chip-navy">松本 浩司（作成者）: 全件閲覧</span>
                <span class="chip chip-amber">白里市教育委員会 管理職: 全件閲覧</span>
                <span class="chip">各校長: 自校分のみ閲覧</span>
                <button class="btn btn-sm" data-go="#/permissions">${I.svg('lock',13)} 権限設定</button>
              </div>
            </div>
          </div>
        </div>
      `;
      I.scan(el);
      el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
      el.querySelectorAll('[data-aggregate]').forEach(b=>b.addEventListener('click',()=>location.hash='#/forms/'+b.dataset.aggregate));
      el.querySelectorAll('[data-share]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'通知を送信',msg:'未回答者へリマインドを送信しました。',kind:'ok'})));
      el.querySelectorAll('[data-close-form]').forEach(b=>b.addEventListener('click',()=>UI.confirm({title:'受付を終了',msg:'フォームの受付を終了しますか？以降の回答は受け付けません。',kind:'danger',okText:'受付終了',onOk:()=>UI.toast({title:'受付を終了しました',kind:'ok'})})));
      UI.bindTabs(el.querySelector('.tabs'), ()=>UI.toast({title:'タブ切替',kind:'info'}));
    }
  });
})();
