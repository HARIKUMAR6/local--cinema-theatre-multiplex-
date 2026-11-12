/* Shared helpers for the login portal and dashboard. */
const P = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  ticket: 'M4 8a2 2 0 002-2h12a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H6a2 2 0 00-2-2v-2a2 2 0 000-4V8zM14 6v12',
  history: 'M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8M3 3v5h5M12 7v5l3 2',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6',
  gift: 'M4 11h16v9H4zM3 8h18v3H3zM12 8v12M12 8c-2 0-4-1-4-3s3-2 4 1c1-3 4-3 4-1s-2 3-4 3z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0',
  bell: 'M6 16V11a6 6 0 1112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0',
  help: 'M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17h.01',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  chev: 'M6 9l6 6 6-6',
  logout: 'M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 8l-4 4 4 4M6 12h11',
  home: 'M4 11l8-7 8 7v9H4zM10 20v-6h4v6',
  sun: 'M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M3 12h2m14 0h2M5.6 18.4L7 17m10-10l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  dir: 'M4 7h12m0 0l-3-3m3 3l-3 3M20 17H8m0 0l3-3m-3 3l3 3',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeoff: 'M3 3l18 18M10.6 6.1A9.7 9.7 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.2 3.7M6.6 7.6A17 17 0 002 12s4 6 10 6a9.6 9.6 0 003.4-.6M9.9 9.9a3 3 0 004.2 4.2',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 118 0v3',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  seat: 'M6 11V6a2 2 0 012-2h8a2 2 0 012 2v5M4 11h16v5H4zM6 16v4M18 16v4',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  film: 'M4 5h16v14H4zM8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4',
  check: 'M5 13l4 4L19 7',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  copy: 'M9 9h11v11H9zM5 15V4h11',
  download: 'M12 4v12m0 0l-4-4m4 4l4-4M5 20h14',
  print: 'M7 9V4h10v5M7 17H5v-6h14v6h-2M7 14h10v6H7z',
  sidebar: 'M4 5h16v14H4zM9 5v14',
};
export const ic = (name, cls = 'h-5 w-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name]}"/></svg>`;

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase() || 'L';
export const dateLong = (d) => d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const dateShort = (d) => d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });

/* Toasts */
export function toast(msg, type = 'ok') {
  let box = document.getElementById('toasts');
  if (!box) { box = document.createElement('div'); box.id = 'toasts'; box.className = 'toasts'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = `toast is-${type}`;
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('is-out'); setTimeout(() => t.remove(), 300); }, 3600);
}

/* Confirmation dialog (native <dialog>) */
export function confirmDialog({ title, text, confirmLabel = 'Confirm', cancelLabel = 'Keep It' }) {
  return new Promise((resolve) => {
    const d = document.createElement('dialog');
    d.className = 'app-dialog';
    d.innerHTML = `<form method="dialog"><h2 class="text-xl">${esc(title)}</h2><p class="mt-2 text-[var(--muted)]">${esc(text)}</p>
<div class="dialog-actions"><button class="btn btn-secondary" value="no">${esc(cancelLabel)}</button><button class="btn btn-primary" value="yes">${esc(confirmLabel)}</button></div></form>`;
    document.body.appendChild(d);
    d.addEventListener('close', () => { const ok = d.returnValue === 'yes'; d.remove(); resolve(ok); });
    d.showModal();
  });
}

/* Field validation helpers shared by every form. */
export const rules = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  mobile: (v) => /^\+?[\d\s()-]{7,18}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7,
};
export function setError(root, el, msg) {
  const err = root.querySelector(`#${el.id}-error`);
  el.setAttribute('aria-invalid', String(Boolean(msg)));
  if (err) { err.textContent = msg; err.hidden = !msg; }
  return !msg;
}
/* Wire blur/input validation for fields; checks maps id -> (el) => message. */
export function bindValidation(root, checks) {
  const els = Object.keys(checks).map((id) => root.querySelector(`#${id}`)).filter(Boolean);
  const run = (el) => setError(root, el, checks[el.id](el));
  els.forEach((el) => {
    /* Skip blur validation while a submit button is being pressed: error messages would shift it and swallow the click. */
    el.addEventListener('blur', () => { if (!document.querySelector('button[type=submit]:active')) run(el); });
    ['input', 'change'].forEach((ev) => el.addEventListener(ev, () => { if (el.getAttribute('aria-invalid') === 'true') run(el); }));
  });
  return () => { const bad = els.filter((el) => !run(el)); if (bad.length) bad[0].focus(); return bad.length === 0; };
}
export const fieldHtml = (id, label, control) => `<div class="field"><label for="${id}">${label}</label>${control}<p class="field-error" id="${id}-error" hidden></p></div>`;
