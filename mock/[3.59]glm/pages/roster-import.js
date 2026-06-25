/* 名簿管理 — CSV import with field mapping (CSV取込) */
(function(){
  const I = window.Icon, D = window.DUMMY, UI = window.UI;

  App.page({
    path:'/roster/import', group:'roster', label:'CSV取込',
    render({el}){
      let step = 1;
      const steps = [
        {n:1,label:'ファイル選択'},{n:2,label:'項目マッピング'},{n:3,label:'識別・検証'},{n:4,label:'実行'}
      ];

      function stepper(){
        return `<div class="steps">${steps.map((s,i)=>`
          <div class="step ${s.n===step?'active':s.n<step?'done':''}">
            <div class="num">${s.n<step?I.svg('check',14):s.n}</div>
            <div class="label">${s.label}</div>
          </div>${i<steps.length-1?`<div class="step-line ${s.n<step?'done':''}"></div>`:''}
        `).join('')}</div>`;
      }

      function stepBody(){
        if (step===1) return `
          <div class="panel-grid g2">
            <div class="card card-pad">
              <h4>取込設定</h4>
              <div class="field mt-8"><label class="field-label">取込種別 <span class="req">*</span></label>
                <select class="select"><option>生徒名簿</option><option>教員名簿</option><option>職員名簿</option><option>組織マスタ</option></select>
              </div>
              <div class="field mt-12"><label class="field-label">マッピングテンプレート</label>
                <select class="select"><option>生徒名簿（標準） M-001 — 一致率 98%</option><option>新規マッピング</option></select>
              </div>
              <div class="field mt-12"><label class="field-label">識別キー <span class="req">*</span></label>
                <div class="row gap-8">
                  <label class="radio"><input type="radio" name="key" checked> メールアドレス</label>
                  <label class="radio"><input type="radio" name="key"> 職員番号</label>
                  <label class="radio"><input type="radio" name="key"> 生徒番号</label>
                </div>
              </div>
              <div class="mt-12"><label class="checkbox"><input type="checkbox"> 所属変更の承認を不要にする（直接反映）</label></div>
            </div>
            <div class="card card-pad">
              <h4>ファイル</h4>
              <div class="dropzone mt-8">${I.svg('upload',32)}<div style="font-weight:600;font-size:14px;margin-top:8px">students_std.csv</div><div class="txt-sm muted mt-4">412 行 · 14 列 · UTF-8 · 86KB</div><div class="txt-xs muted mt-4">クリックして別のファイルを選択</div></div>
              <div class="row between mt-12">
                <span class="txt-xs muted">${I.svg('check-circle',13)} フォーマット検証: OK</span>
                <button class="btn-link txt-sm">詳細</button>
              </div>
            </div>
          </div>
          <div class="banner banner-info mt-12">${I.svg('info',18)}<div class="body"><div class="title">次のステップ</div>ファイル内容を確認し、各CSV列を名簿の属性項目にマッピングします。識別キーが一致する既存レコードは更新、新規は追加されます。</div></div>
          <style>.dropzone{border:2px dashed var(--line-2);border-radius:var(--r-md);padding:32px;text-align:center;color:var(--ink-3);background:var(--paper-2);cursor:pointer}.dropzone:hover{border-color:var(--navy-400);background:var(--navy-050)}</style>`;

        if (step===2) return `
          <div class="grid" style="grid-template-columns:1fr 320px;gap:16px;align-items:start">
            <div class="card">
              <div class="card-head"><div class="t">${I.svg('git-branch',16)}<h3>項目マッピング</h3></div><span class="badge badge-warn">1 件注意</span></div>
              <div class="tbl-wrap"><table class="tbl tbl-dense">
                <thead><tr><th>CSV列</th><th>サンプル値</th><th>→</th><th>名簿項目</th><th>形式</th><th>状態</th></tr></thead>
                <tbody>
                  ${D.csvFieldMap.map(r=>`
                    <tr>
                      <td class="fw-6">${r.csv}</td>
                      <td class="muted mono">${D.csvPreview.sampleRows[0][D.csvPreview.headers.indexOf(r.csv)]||'—'}</td>
                      <td class="t-center muted">${I.svg('arrow-right',14)}</td>
                      <td>
                        <select class="select" style="height:26px;font-size:11px"><option>${r.field}</option><option>—（無視）</option></select>
                      </td>
                      <td>${UI.badge(r.type,'neutral')}</td>
                      <td>${r.status==='ok'?UI.badge('OK','ok'):r.status==='warn'?UI.badge('注意','warn'):UI.badge('エラー','danger')}</td>
                    </tr>`).join('')}
                </tbody>
              </table></div>
              <div class="card-pad" style="border-top:1px solid var(--line);background:var(--paper-2)">
                <div class="banner banner-warn" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">「性別」列のコード値「不明」がコードマスター C001-gender に存在しません。スキップするか、マスターに追加してください。</div></div>
              </div>
            </div>
            <div class="col gap-16">
              <div class="card card-pad">
                <h4>プレビュー</h4>
                <div class="txt-xs muted mt-4">先頭4行の取り込みイメージ</div>
                <div class="tbl-wrap mt-8"><table class="tbl tbl-dense">
                  <thead><tr><th>識別</th><th>氏名</th><th>部活</th></tr></thead>
                  <tbody>${D.csvPreview.sampleRows.map(r=>`<tr><td class="mono">${r[0]}</td><td>${r[1]}</td><td>${r[9]}</td></tr>`).join('')}</tbody>
                </table></div>
              </div>
              <div class="card card-pad">
                <h4>識別設定</h4>
                <div class="kv mt-8 txt-sm">
                  <span class="k">識別キー</span><span class="v">メールアドレス</span>
                  <span class="k">一致確認</span><span class="v">全項目突合</span>
                  <span class="k">新規扱い</span><span class="v">識別子不一致時</span>
                </div>
              </div>
            </div>
          </div>`;

        if (step===3) return `
          <div class="panel-grid g3 mb-16">
            ${UI.statCard({label:'総行数',val:'412',delta:'CSVファイル',dcls:'flat',strip:'navy'})}
            ${UI.statCard({label:'更新予定',val:'386',delta:'既存レコード更新',dcls:'up',strip:'ok'})}
            ${UI.statCard({label:'新規追加',val:'26',delta:'新規レコード',dcls:'up',strip:'amber'})}
          </div>
          <div class="panel-grid g2">
            <div class="card card-pad">
              <div class="row between"><h4>検証結果</h4>${UI.badge('12件エラー','danger')}</div>
              <div class="mt-12 col gap-8">
                <div class="banner banner-danger" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">行 23: 性別コード「不明」が未登録。行をスキップします。</div></div>
                <div class="banner banner-danger" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">行 47: メール形式エラー。要修正。</div></div>
                <div class="banner banner-warn" style="padding:9px 11px">${I.svg('alert-triangle',15)}<div class="body txt-xs">行 88: 部活コード「ART」は存在しますが無効化されています。</div></div>
              </div>
            </div>
            <div class="card card-pad">
              <h4>実行オプション</h4>
              <div class="mt-12 col gap-8">
                <label class="checkbox"><input type="checkbox" checked> エラー行をスキップして続行</label>
                <label class="checkbox"><input type="checkbox" checked> 取込後に Google Workspace へ同期</label>
                <label class="checkbox"><input type="checkbox"> ドライラン（実行せず検証のみ）</label>
                <div class="divider"></div>
                <div class="row gap-8">
                  <span class="txt-sm fw-6">所属変更の扱い:</span>
                  ${UI.badge('承認フロー経由','info')}
                </div>
                <div class="txt-xs muted">「承認不要」にチェックしていないため、所属を含む行は異動申請として処理されます。</div>
              </div>
            </div>
          </div>`;

        if (step===4) return `
          <div class="card card-pad t-center" style="padding:48px 20px">
            ${I.svg('check-circle',56)}
            <h2 style="margin-top:16px">取込を開始しました</h2>
            <p class="muted mt-8">バッチ <span class="mono">B-26202</span> としてバックグラウンド処理中です。進捗は処理ログで確認できます。</p>
            <div class="row gap-8 mt-16" style="justify-content:center">
              <button class="btn btn-primary" data-go="#/logs">${I.svg('activity',15)} 処理ログへ</button>
              <button class="btn" data-go="#/roster">${I.svg('list',15)} 名簿一覧へ</button>
            </div>
          </div>`;
      }

      function view(){
        el.innerHTML = `
          ${UI.pageHead({
            crumbs:[{label:'名簿管理',href:'#/roster'},{label:'CSV取込',href:'#/roster/import'}],
            title:'CSV取込', icon:'upload',
            subtitle:'CSVファイルから名簿データを一括取込します。項目マッピング・識別検証を経て、バックグラウンドで実行されます。',
            actions:`<button class="btn" data-go="#/roster">${I.svg('x',15)} 中止</button>`
          })}
          ${stepper()}
          <div id="step-body">${stepBody()}</div>
          <div class="row between mt-16">
            <button class="btn" ${step===1?'disabled':''} data-prev>${I.svg('arrow-left',15)} 戻る</button>
            <div class="row gap-8">
              <button class="btn" data-save-template>${I.svg('save',15)} テンプレート保存</button>
              ${step<4?`<button class="btn btn-primary" data-next>${step===3?'取込を実行':'次へ'} ${I.svg('arrow-right',15)}</button>`:''}
            </div>
          </div>
        `;
        I.scan(el);
        el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>location.hash=b.dataset.go));
        el.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>{ if(step>1){step--; view();} }));
        el.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{ if(step<4){step++; view();} }));
        el.querySelectorAll('[data-save-template]').forEach(b=>b.addEventListener('click',()=>UI.toast({title:'マッピングを保存',msg:'現在のマッピングをテンプレートとして保存しました。',kind:'ok'})));
      }
      view();
    }
  });
})();
