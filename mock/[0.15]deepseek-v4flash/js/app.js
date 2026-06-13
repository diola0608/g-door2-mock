const App = {
  currentPage: 'dashboard',

  init() {
    this.loadPage('dashboard');
    this.setupGlobalListeners();
  },

  setupGlobalListeners() {
    document.addEventListener('click', (e) => {
      const modalOverlay = e.target.closest('.modal-overlay');
      if (modalOverlay && e.target === modalOverlay) {
        this.closeModal(modalOverlay);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => this.closeModal(m));
      }
    });
  },

  loadPage(page, params = {}) {
    this.currentPage = page;
    const container = document.getElementById('page-content');
    if (!container) return;

    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';

    const html = PAGES[page];
    if (!html) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><h3>Page Not Found</h3><p>Page "${page}" not found</p></div>`;
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
      return;
    }

    container.innerHTML = html;

    requestAnimationFrame(() => {
      container.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });

    this.updateSidebarActive(page);
    this.initPageScripts(page, params);
  },

  updateSidebarActive(page) {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });
  },

  initPageScripts(page, params) {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabsContainer = tab.closest('.tabs');
        if (!tabsContainer) return;
        tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        const parent = tabsContainer.parentElement;
        parent.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        const content = parent.querySelector(`.tab-content[data-tab="${target}"]`);
        if (content) content.classList.add('active');
      });
    });

    document.querySelectorAll('.tree-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const children = toggle.nextElementSibling;
        if (children && children.classList.contains('tree-children')) {
          children.classList.toggle('expanded');
          toggle.querySelector('.arrow')?.classList.toggle('expanded');
        }
      });
    });

    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) this.openModal(modal);
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) this.closeModal(modal);
      });
    });

    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.dataset.page;
        if (page) this.loadPage(page);
      });
    });

    document.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', (e) => {
        const action = el.dataset.action;
        if (typeof this[action] === 'function') {
          this[action](el, e);
        }
      });
    });
  },

  openModal(modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    document.querySelector('.sidebar')?.classList.toggle('collapsed', this.sidebarCollapsed);
    document.querySelector('.main-content')?.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());