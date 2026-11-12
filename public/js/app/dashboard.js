/* Moviegoer dashboard: application shell, hash router and top-bar menus.
   No public header or footer is rendered here. */
import { DATA } from '../data.js';
import { emblem } from '../modules/logo.js';
import { initTheme } from '../modules/theme.js';
import { initDirection } from '../modules/direction.js';
import { state, commit, getSession, clearSession } from './store.js';
import { ic, esc, initials } from './ui.js';
import { ROUTES, profile, notifications, unreadCount } from './views.js';

const root = document.getElementById('app');
const lg = window.matchMedia('(min-width: 1024px)');

/* Each new sign-in carries the account name and email into the profile once.
   A new registration, or a different email, starts a fresh profile; the same account keeps its edits. */
const session = getSession();
if (session && session.at !== state.sessionAt) {
  const who = { ...(session.name ? { name: session.name } : {}), ...(session.email ? { email: session.email } : {}) };
  const sameAccount = state.profile && (!session.email || state.profile.email === session.email);
  if (Object.keys(who).length) commit({ profile: session.fresh || !sameAccount ? who : { ...state.profile, ...who }, sessionAt: session.at });
  else commit({ sessionAt: session.at });
}

const logo = () => `<a class="brand-link" href="index.html" aria-label="${DATA.brand.name}, back to home">${emblem('h-10 w-10 shrink-0')}<span class="brand-text"><strong>LUMORA</strong><small>CINEMAS</small></span></a>`;

root.innerHTML = `<div class="app-shell" id="shell">
<aside class="app-sidebar" id="sidebar" aria-label="Dashboard">
<div class="side-brand">${logo()}<button type="button" class="icon-btn side-close" data-side-close aria-label="Close navigation">${ic('close')}</button></div>
<nav class="side-nav" aria-label="Dashboard sections"><ul>${ROUTES.map((r) => `<li><a class="side-link" href="#${r.id}" data-route="${r.id}">${ic(r.icon)}<span class="nav-label">${r.label}</span>${r.id === 'notifications' ? '<span class="side-count" data-unread hidden></span>' : ''}</a></li>`).join('')}</ul></nav>
<div class="side-foot"><a class="side-link" href="index.html">${ic('home')}<span class="nav-label">Back to website</span></a><button type="button" class="side-link" data-signout>${ic('logout')}<span class="nav-label">Sign out</span></button></div></aside>
<div class="app-overlay" data-side-close hidden></div>
<div class="app-col">
<header class="app-topbar"><button type="button" class="icon-btn" data-side-toggle aria-controls="sidebar" aria-expanded="true" aria-label="Toggle navigation">${ic('menu')}</button>
<p class="crumb">Moviegoer dashboard</p><span class="grow"></span>
<a class="btn btn-primary btn-sm top-cta" href="showtimes.html">Book Tickets</a>
<button type="button" class="icon-btn" data-dir-toggle aria-label="${DATA.ui.dir}" aria-pressed="false">${ic('dir')}</button>
<button type="button" class="icon-btn" data-theme-toggle aria-label="${DATA.ui.theme}" aria-pressed="false">${ic('sun')}</button>
<div class="menu-wrap" data-menu><button type="button" class="icon-btn bell" data-menu-btn aria-expanded="false" aria-haspopup="true" aria-label="Notifications">${ic('bell')}<span class="bell-count" data-unread hidden></span></button>
<div class="menu-panel notif-panel" data-menu-panel hidden><div class="menu-head"><strong>Notifications</strong><button type="button" class="link-btn" data-readall-menu>Mark all as read</button></div><ul class="menu-notifs" data-notif-list></ul><a class="menu-foot" href="#notifications">View all notifications</a></div></div>
<div class="menu-wrap" data-menu><button type="button" class="profile-btn" data-menu-btn aria-expanded="false" aria-haspopup="true" aria-label="Account menu"><span class="avatar" data-avatar></span><span class="profile-name" data-pname></span>${ic('chev', 'h-4 w-4')}</button>
<div class="menu-panel profile-panel" data-menu-panel hidden><div class="menu-head profile-head"><span class="avatar" data-avatar></span><span><strong data-pname-full></strong><small data-pemail></small></span></div>
<a class="menu-item" href="#profile">${ic('user', 'h-4 w-4')}My Profile</a><a class="menu-item" href="#support">${ic('help', 'h-4 w-4')}Help &amp; Support</a><a class="menu-item" href="index.html">${ic('home', 'h-4 w-4')}Back to Website</a><button type="button" class="menu-item" data-signout>${ic('logout', 'h-4 w-4')}Sign Out</button></div></div></header>
<main class="app-main" id="app-main"><div class="app-container" id="app-content"></div></main></div></div>`;

const shell = document.getElementById('shell');
const content = document.getElementById('app-content');
const sideToggle = root.querySelector('[data-side-toggle]');

/* ---------- Chrome (badge, profile, notification list) ---------- */
function chrome() {
  const p = profile();
  const n = unreadCount();
  root.querySelectorAll('[data-unread]').forEach((el) => { el.hidden = n === 0; el.textContent = n > 9 ? '9+' : String(n); });
  root.querySelector('.bell').setAttribute('aria-label', n ? `Notifications, ${n} unread` : 'Notifications');
  root.querySelectorAll('[data-avatar]').forEach((el) => { el.textContent = initials(p.name); });
  root.querySelectorAll('[data-pname]').forEach((el) => { el.textContent = p.name.split(' ')[0]; });
  root.querySelector('[data-pname-full]').textContent = p.name;
  root.querySelector('[data-pemail]').textContent = p.email;
  root.querySelector('[data-notif-list]').innerHTML = notifications().slice(0, 4).map((x) => `<li><a class="menu-notif${x.read ? '' : ' is-unread'}" href="#notifications"><span class="notif-dot" aria-hidden="true"></span><span><strong>${esc(x.title)}</strong><small>${esc(x.text)}</small></span></a></li>`).join('');
}

/* ---------- Router ---------- */
const parse = () => {
  const [id, arg] = location.hash.replace(/^#\/?/, '').split('/');
  return { id: ROUTES.some((r) => r.id === id) ? id : 'overview', arg };
};
const ctx = { refresh: (chromeToo) => { show(true); if (chromeToo) chrome(); else chrome(); }, chrome };

function show(keep = false) {
  const { id, arg } = parse();
  const route = ROUTES.find((r) => r.id === id);
  const v = route.view(ctx, arg);
  /* Each view mounts into a fresh wrapper so its listeners never accumulate. */
  const host = document.createElement('div');
  host.innerHTML = v.html;
  content.replaceChildren(host);
  if (v.mount) v.mount(host);
  document.title = `${v.title} | Lumora Cinemas`;
  root.querySelectorAll('[data-route]').forEach((a) => { if (a.dataset.route === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  chrome();
  if (!keep) { closeDrawer(false); window.scrollTo(0, 0); const h = content.querySelector('#page-title'); if (h) h.focus({ preventScroll: true }); }
}

/* ---------- Sidebar: collapse (desktop) and drawer (mobile/tablet) ---------- */
function setCollapsed(c) {
  shell.classList.toggle('is-collapsed', c);
  commit({ collapsed: c });
  sideToggle.setAttribute('aria-expanded', String(!c));
}
function openDrawer() { shell.classList.add('is-open'); root.querySelector('.app-overlay').hidden = false; sideToggle.setAttribute('aria-expanded', 'true'); document.body.classList.add('no-scroll'); root.querySelector('#sidebar .side-link').focus(); }
function closeDrawer(refocus = true) {
  if (!shell.classList.contains('is-open')) return;
  shell.classList.remove('is-open'); root.querySelector('.app-overlay').hidden = true; sideToggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('no-scroll');
  if (refocus) sideToggle.focus();
}
sideToggle.addEventListener('click', () => {
  if (lg.matches) setCollapsed(!shell.classList.contains('is-collapsed'));
  else if (shell.classList.contains('is-open')) closeDrawer(); else openDrawer();
});
root.addEventListener('click', (e) => { if (e.target.closest('[data-side-close]')) closeDrawer(); });
lg.addEventListener('change', () => { closeDrawer(false); sideToggle.setAttribute('aria-expanded', String(lg.matches ? !shell.classList.contains('is-collapsed') : false)); });
if (lg.matches && state.collapsed) setCollapsed(true); else sideToggle.setAttribute('aria-expanded', String(lg.matches));

/* ---------- Dropdown menus (click only) ---------- */
const closeMenus = (except) => root.querySelectorAll('[data-menu]').forEach((m) => {
  if (m === except) return;
  m.querySelector('[data-menu-btn]').setAttribute('aria-expanded', 'false');
  m.querySelector('[data-menu-panel]').hidden = true;
});
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-menu-btn]');
  if (btn) {
    const m = btn.closest('[data-menu]');
    const open = btn.getAttribute('aria-expanded') === 'true';
    closeMenus(m);
    btn.setAttribute('aria-expanded', String(!open));
    m.querySelector('[data-menu-panel]').hidden = open;
    return;
  }
  if (!e.target.closest('[data-menu-panel]') || e.target.closest('a.menu-item, a.menu-foot, a.menu-notif, button.menu-item')) closeMenus();
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = root.querySelector('[data-menu-btn][aria-expanded="true"]');
  if (open) { closeMenus(); open.focus(); } else closeDrawer();
});

/* ---------- Actions ---------- */
root.addEventListener('click', (e) => {
  if (e.target.closest('[data-signout]')) { clearSession(); location.href = 'login.html'; }
  if (e.target.closest('[data-readall-menu]')) { commit({ read: notifications().map((n) => n.id) }); show(true); }
});
window.addEventListener('hashchange', () => show());

initTheme();
initDirection();
show();
