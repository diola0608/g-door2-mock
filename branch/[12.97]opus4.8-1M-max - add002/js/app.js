/* Shared interactions: modal, drawer, dropdown, tabs, toast, table-select */
(function () {
  /* ---------- Overlays (modal / drawer) ---------- */
  function openOverlay(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeOverlay(el) {
    if (!el) return;
    el.classList.remove('open');
    if (!document.querySelector('.overlay.open')) document.body.style.overflow = '';
  }
  window.openOverlay = openOverlay;
  window.closeOverlay = function (id) { closeOverlay(document.getElementById(id)); };

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open]');
    if (opener) { e.preventDefault(); openOverlay(opener.dataset.open); return; }

    var closer = e.target.closest('[data-close]');
    if (closer) { e.preventDefault(); closeOverlay(closer.closest('.overlay')); return; }

    // click on backdrop
    if (e.target.classList.contains('overlay')) { closeOverlay(e.target); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = document.querySelector('.overlay.open');
      if (open) closeOverlay(open);
      document.querySelectorAll('.menu.open').forEach(function (m) { m.classList.remove('open'); });
    }
  });

  /* ---------- Dropdown menus ---------- */
  document.addEventListener('click', function (e) {
    var dd = e.target.closest('[data-dropdown]');
    var inMenu = e.target.closest('.menu');

    // close any open menu not belonging to the clicked dropdown
    document.querySelectorAll('.menu.open').forEach(function (m) {
      if (dd && dd.contains(m)) return;
      m.classList.remove('open');
    });

    // clicked inside a menu (an item) -> let action run, then close it
    if (inMenu) {
      setTimeout(function () { inMenu.classList.remove('open'); }, 30);
      return;
    }

    // clicked a dropdown trigger -> toggle its menu
    if (dd) {
      var menu = dd.querySelector('.menu');
      if (menu) { e.preventDefault(); menu.classList.toggle('open'); }
    }
  });

  /* ---------- Tabs (wrap in [data-tabs]) ---------- */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-tab]');
    if (!tab) return;
    var group = tab.closest('[data-tabs]') || document;
    var name = tab.dataset.tab;
    group.querySelectorAll('[data-tab]').forEach(function (t) {
      if ((t.closest('[data-tabs]') || document) === group) t.classList.remove('active');
    });
    tab.classList.add('active');
    group.querySelectorAll('[data-tab-panel]').forEach(function (p) {
      if ((p.closest('[data-tabs]') || document) === group) p.classList.toggle('active', p.dataset.tabPanel === name);
    });
  });

  /* ---------- Pills (filter pills) ---------- */
  document.addEventListener('click', function (e) {
    var pill = e.target.closest('[data-pill-group] .pill');
    if (!pill) return;
    pill.parentNode.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
    pill.classList.add('active');
  });

  /* ---------- Segmented ---------- */
  document.addEventListener('click', function (e) {
    var seg = e.target.closest('.segmented button');
    if (!seg) return;
    seg.parentNode.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
    seg.classList.add('active');
  });

  /* ---------- Table: select-all + row select ---------- */
  document.addEventListener('change', function (e) {
    var all = e.target.closest('[data-check-all]');
    if (all) {
      var tbl = all.closest('table');
      tbl.querySelectorAll('tbody [data-row-check]').forEach(function (cb) {
        cb.checked = all.checked;
        cb.closest('tr').classList.toggle('is-selected', all.checked);
      });
      updateBulkBar(tbl);
      return;
    }
    var row = e.target.closest('[data-row-check]');
    if (row) {
      row.closest('tr').classList.toggle('is-selected', row.checked);
      updateBulkBar(row.closest('table'));
    }
  });

  function updateBulkBar(tbl) {
    if (!tbl) return;
    var n = tbl.querySelectorAll('tbody [data-row-check]:checked').length;
    var bar = document.querySelector('[data-bulk-bar]');
    if (bar) {
      bar.classList.toggle('hidden', n === 0);
      var c = bar.querySelector('[data-bulk-count]');
      if (c) c.textContent = n;
    }
  }

  /* ---------- Tree toggles ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('.tree__toggle:not(.leaf)');
    if (!t) return;
    e.stopPropagation();
    t.classList.toggle('open');
    var children = t.closest('.tree__node').querySelector(':scope > .tree__children');
    if (children) children.classList.toggle('collapsed');
  });

  /* ---------- Toast ---------- */
  var zone;
  window.toast = function (title, opts) {
    opts = opts || {};
    if (!zone) { zone = document.createElement('div'); zone.className = 'toast-zone'; document.body.appendChild(zone); }
    var type = opts.type || 'success';
    var iconName = type === 'error' ? 'xCircle' : type === 'info' ? 'info' : 'checkCircle';
    var el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = '<span class="toast__ico">' + window.icon(iconName, { size: 20 }) + '</span>' +
      '<div><div class="toast__title">' + title + '</div>' + (opts.text ? '<div class="toast__text">' + opts.text + '</div>' : '') + '</div>';
    zone.appendChild(el);
    setTimeout(function () { el.classList.add('hide'); setTimeout(function () { el.remove(); }, 220); }, opts.duration || 3200);
  };

  /* ---------- Generic action stubs (data-toast / data-confirm) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toast]');
    if (t && !t.closest('[data-close]')) {
      window.toast(t.dataset.toast, { type: t.dataset.toastType || 'success', text: t.dataset.toastText || '' });
    }
  });

  /* ---------- Demo: prevent dead links from jumping ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });
})();
