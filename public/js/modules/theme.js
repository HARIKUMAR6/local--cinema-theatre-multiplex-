const KEY = 'lumora-theme';
const root = document.documentElement;

export function getTheme() {
  return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function setTheme(t) {
  root.setAttribute('data-theme', t);
  try { localStorage.setItem(KEY, t); } catch { /* storage unavailable */ }
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(t === 'light')));
}

export function initTheme() {
  setTheme(getTheme());
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-theme-toggle]')) setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
}
