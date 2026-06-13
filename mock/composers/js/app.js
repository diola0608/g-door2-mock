function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
  if (e.target.closest('[data-modal-close]')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) modal.classList.remove('open');
  }
  if (e.target.closest('[data-modal-open]')) {
    const id = e.target.closest('[data-modal-open]').dataset.modalOpen;
    openModal(id);
  }
});

function initTabs(container) {
  const tabs = container.querySelectorAll('.tab');
  const panels = container.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const panel = container.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.style.display = 'block';
    });
  });
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:8px;color:#fff;font-size:0.875rem;z-index:300;transition:opacity .3s;opacity:0;';
    document.body.appendChild(toast);
  }
  const colors = { success: '#057a55', error: '#e02424', info: '#1a56db' };
  toast.style.background = colors[type] || colors.info;
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

function initTreeToggle() {
  document.querySelectorAll('.tree-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = toggle.closest('.tree-item');
      const children = item?.nextElementSibling;
      if (children?.classList.contains('tree-children')) {
        const isOpen = children.style.display !== 'none';
        children.style.display = isOpen ? 'none' : 'block';
        toggle.innerHTML = isOpen ? Icons.chevronRight : Icons.chevronDown;
      }
    });
  });

  document.querySelectorAll('.tree-item[data-selectable]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.tree-item.active').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
