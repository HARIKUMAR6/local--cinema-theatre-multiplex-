/* Direction toggle: changes layout direction only. lang stays "en", content stays English. */
const KEY = 'lumora-dir';
const root = document.documentElement;

export function getDir() { return root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr'; }

export function setDir(d) {
  root.setAttribute('dir', d);
  try { localStorage.setItem(KEY, d); } catch { /* storage unavailable */ }
  document.querySelectorAll('[data-dir-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(d === 'rtl')));
  document.dispatchEvent(new CustomEvent('lumora:dir', { detail: d }));
}

export function initDirection() {
  setDir(getDir());
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-dir-toggle]')) setDir(getDir() === 'rtl' ? 'ltr' : 'rtl');
  });
}
