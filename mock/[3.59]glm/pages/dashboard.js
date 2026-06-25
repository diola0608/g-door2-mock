/* Dashboard / Launcher page */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;

  App.page({
    path:'/', label:'ダッシュボード', icon:'home',
    render({el}){
      const alerts = D.alerts;
      el.innerHTML = `
        ${UI.pageHead({
          crumbs:[{label:'ホーム',href:'#/'}],
          title:`おかえりなさい、${D.user.name.split('　')[0]}さん`, icon:'sparkles',
          subtitle:'青葉県教育委員会の運用状況と、ご対応が必要なアラートを確認できます。各サービスへは下のランチャーまたは左メニューから移動できます。',
          actions:`<button class="btn" data-go="#/logs">${I.svg('activity',15)} 処理ログ</button>
                   <button class="btn btn-accent" data-modal="new-import">${I.svg('upload',15)} データ取込</button>`
        })}

        <div class="panel-grid g4 mb-16">
          ${D.dashStats.map(s=>UI.statCard(s)).join('')}
        </div>

        <div class="grid" style="grid-template-columns:1fr 380px;gap:16px">
          <div class="col gap-16">
            <!-- Launcher -->
            <div class="card">
              <div class="card-head">
                <div class="t">${I.svg('grid',16)}<h3>サービスランチャー</h3></div>
                <span class="badge badge-neutral">6 サービス</span>
              </div>
              <div class="card-pad">
                <div class="panel-grid g3">
                  ${D.launchers.map(l=>`
                    <a class="launcher-tile" href="${l.href}">
                      <div class="lt-icon ${l.color}">${I.svg(l.icon,24)}</div>
                      <div class="lt-body">
                        <div class="lt-title">${l.title}</div>
                        <div class="lt-desc">${l.desc}</div>
                      </div>
                      ${I.svg('arrow-right',16)}
                    </a>`).join('')}
                </div>
              </div>
            </div>

            <!-- Charts -->
            <div class="panel-grid g2">
              <div class="card">
                <div class="card-head"><div class="t">${I.svg('trending-up',16)}<h3>管理対象者数の推移</h3></div><span class="badge badge-ok">前月比 +1.2%</span></div>
                <div class="card-pad">
                  ${UI.barChart(D.dashCharts.monthly.map((d,i)=>({...d,peak:i===D.dashCharts.monthly.length-1})))}
                  <div class="row between mt-12 txt-xs muted">
                    ${D.dashCharts.monthly.map(d=>`<span>${d.m}</span>`).join('')}
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-head"><div class="t">${I.svg('pie-chart',16)}<h3>区分別構成</h3></div></div>
                <div class="card-pad">
                  ${D.dashCharts.byRole.map(r=>`
                    <div class="mb-12">
                      <div class="row between mb-4">
                        <span class="txt-sm fw-6">${r.name}</span>
                        <span class="txt-sm fw-7">${r.v.toLocaleString()}</span>
                      </div>
                      <div class="progress ${r.cls}"><div class="bar" style="width:${(r.v/96420*100).toFixed(1)}%"></div></div>
                    </div>`).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="col gap-16">
            <div class="card">
              <div class="card-head"><div class="t">${I.svg('alert-triangle',16)}<h3>要対応アラート</h3></div><span class="badge badge-danger">${alerts.length}件</span></div>
              <div class="card-pad col gap-12">
                ${alerts.map(a=>`
                  <div class="banner banner-${a.kind}" style="padding:11px 13px">
                    ${I.svg(a.icon,18)}
                    <div class="body">
                      <div class="title">${a.title}</div>
                      <div>${a.msg}</div>
                      <div class="row between mt-8">
                        <span class="txt-xs muted">${a.at}</span>
                        <button class="btn-link" data-alert-action>${a.action}</button>
                      </div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <div class="card">
              <div class="card-head"><div class="t">${I.svg('activity',16)}<h3>最近のアクティビティ</h3></div></div>
              <div class="card-pad" style="padding-top:8px">
                <div class="timeline">
                  ${D.activity.map(a=>`
                    <div class="tl-item ${a.cls}">
                      <div class="when">${a.when}</div>
                      <div class="what">${a.what}</div>
                      <div class="who">${a.who}</div>
                    </div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          .launcher-tile{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid var(--line);border-radius:var(--r-md);background:var(--surface-2);text-decoration:none;color:inherit;transition:.15s;position:relative}
          .launcher-tile:hover{border-color:var(--navy-400);box-shadow:var(--sh-2);transform:translateY(-1px)}
          .launcher-tile .sicon{position:absolute;right:14px;color:var(--ink-3);transition:.15s}
          .launcher-tile:hover .sicon{color:var(--navy-500);transform:translateX(2px)}
          .lt-icon{width:44px;height:44px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0}
          .lt-icon.navy{background:var(--navy-050);color:var(--navy)}
          .lt-icon.amber{background:var(--amber-050);color:var(--amber-600)}
          .lt-body{flex:1;min-width:0}
          .lt-title{font-family:var(--font-display);font-weight:700;font-size:14px;color:var(--ink)}
          .lt-desc{font-size:11px;color:var(--ink-3);margin-top:2px;line-height:1.4}
        </style>
      `;
      el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
      el.querySelectorAll('[data-modal="new-import"]').forEach(b=>b.addEventListener('click',()=>openImportModal()));
      el.querySelectorAll('[data-alert-action]').forEach(b=>b.addEventListener('click',()=>{
        UI.toast({title:'アラートへ移動',msg:'対応ページへ遷移します。',kind:'info'});
      }));
    }
  });

  function openImportModal(){
    const m = UI.modal({
      title:'データ取込を開始', icon:'upload', size:'lg',
      sub:'CSVファイルから名簿・組織データを一括取込します。処理はバックグラウンドで実行され、処理ログで進捗を確認できます。',
      body:`
        <div class="form-row">
          <div class="field"><label class="field-label">取込種別 <span class="req">*</span></label>
            <select class="select"><option>生徒名簿</option><option>教員名簿</option><option>職員名簿</option><option>組織マスタ</option></select>
          </div>
          <div class="field"><label class="field-label">マッピングテンプレート</label>
            <select class="select"><option>生徒名簿（標準） M-001</option><option>新規マッピング</option></select>
          </div>
        </div>
        <div class="field mt-12"><label class="field-label">CSVファイル <span class="req">*</span></label>
          <div class="dropzone">${I.svg('upload',28)}<div style="font-weight:600;font-size:13px;margin-top:6px">ファイルをドラッグ&amp;ドロップ</div><div class="txt-xs muted mt-4">または クリックして選択（UTF-8 / 最大 10MB）</div></div>
        </div>
        <div class="banner banner-info mt-12">${I.svg('info',18)}<div class="body"><strong>所属変更を含む場合：</strong>チェックボックスで「承認不要」を指定すると、CSV取込時に直接所属を変更します（権限が必要です）。既定は承認フロー経由です。</div></div>
        <label class="checkbox mt-12"><input type="checkbox"> 所属変更の承認を不要にする（直接反映）</label>
        <label class="checkbox mt-8"><input type="checkbox" checked> 取込後に Google Workspace へ即時同期</label>
        <style>.dropzone{border:2px dashed var(--line-2);border-radius:var(--r-md);padding:24px;text-align:center;color:var(--ink-3);background:var(--paper-2);cursor:pointer;transition:.15s}.dropzone:hover{border-color:var(--navy-400);background:var(--navy-050)}</style>
      `,
      footer:`<div class="left txt-xs muted">${I.svg('info',13)} 取込は非同期で実行されます</div>
              <div class="right"><button class="btn" data-close>キャンセル</button><button class="btn btn-primary" data-start>${I.svg('upload',15)} 取込開始</button></div>`
    });
    m.el.querySelector('[data-start]').addEventListener('click',()=>{
      m.close();
      UI.toast({title:'取込を開始しました',msg:'バッチ B-26202 として処理中。処理ログで進捗を確認できます。',kind:'ok'});
      setTimeout(()=>location.hash='#/logs', 1200);
    });
  }
})();
