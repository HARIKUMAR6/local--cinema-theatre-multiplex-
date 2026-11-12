const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function initNav() {
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.querySelector('[data-menu-open]');
  let lastFocus = null;

  /* ---- Dropdown: CLICK ONLY (no hover handlers) ---- */
  const closeDropdowns = (except) => {
    document.querySelectorAll('[data-dropdown]').forEach((d) => {
      if (d === except) return;
      d.querySelector('[data-dropdown-trigger]').setAttribute('aria-expanded', 'false');
      d.querySelector('.dropdown-panel').hidden = true;
    });
  };

  document.addEventListener('click', (e) => {
    const trig = e.target.closest('[data-dropdown-trigger]');
    if (trig) {
      const d = trig.closest('[data-dropdown]');
      const open = trig.getAttribute('aria-expanded') === 'true';
      closeDropdowns(d);
      trig.setAttribute('aria-expanded', String(!open));
      d.querySelector('.dropdown-panel').hidden = open;
      return;
    }
    if (!e.target.closest('[data-dropdown]') || e.target.closest('.dropdown-panel a')) closeDropdowns();
  });

  document.addEventListener('keydown', (e) => {
    const d = e.target.closest && e.target.closest('[data-dropdown]');
    if (e.key === 'Escape') {
      if (d) d.querySelector('[data-dropdown-trigger]').focus();
      closeDropdowns();
    }
    if (d && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      const items = [...d.querySelectorAll('.dropdown-panel a')];
      if (d.querySelector('.dropdown-panel').hidden || !items.length) return;
      e.preventDefault();
      const i = items.indexOf(document.activeElement);
      const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
      items[next].focus();
    }
  });

  /* ---- Mobile accordion ---- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-accordion-trigger]');
    if (!t) return;
    const open = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', String(!open));
    document.getElementById(t.getAttribute('aria-controls')).hidden = open;
  });

  /* ---- Full-screen mobile menu ---- */
  const openMenu = () => {
    lastFocus = document.activeElement;
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.remove('is-closed'));
    document.body.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
    menu.querySelector('[data-menu-close]').focus();
  };
  const closeMenu = () => {
    if (menu.hidden) return;
    menu.hidden = true;
    menu.classList.add('is-closed');
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  menu.classList.add('is-closed');
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-menu-open]')) openMenu();
    else if (!menu.hidden && (e.target.closest('[data-menu-close]') || e.target.closest('[data-menu-link]') || e.target.closest('#mobile-menu a.btn'))) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (menu.hidden) return;
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const f = [...menu.querySelectorAll(FOCUSABLE)].filter((x) => x.offsetParent !== null);
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  window.matchMedia('(min-width: 1280px)').addEventListener('change', (m) => { if (m.matches) closeMenu(); });
}
