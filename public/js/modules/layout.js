import { DATA } from '../data.js';
import { emblem } from './logo.js';

const icon = (d, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

const ICONS = {
  sun: 'M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M3 12h2m14 0h2M5.6 18.4L7 17m10-10l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  dir: 'M4 7h12m0 0l-3-3m3 3l-3 3M20 17H8m0 0l3-3m-3 3l3 3',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  chev: 'M6 9l6 6 6-6',
  up: 'M12 19V5m0 0l-6 6m6-6l6 6',
};

/* Desktop layout starts at xl (1280px) so the full nav fits; below it the menu toggle is used. */
const themeBtn = () => `<button type="button" class="icon-btn" data-theme-toggle aria-label="${DATA.ui.theme}" aria-pressed="false">${icon(ICONS.sun)}</button>`;
const dirBtn = () => `<button type="button" class="icon-btn" data-dir-toggle aria-label="${DATA.ui.dir}" aria-pressed="false">${icon(ICONS.dir)}</button>`;
const loginBtn = (cls = '') => `<a href="${DATA.login.href}" class="btn btn-secondary ${cls}">${DATA.login.label}</a>`;
const ctaBtn = (cls = '') => `<a href="${DATA.cta.href}" class="btn btn-primary ${cls}">${DATA.cta.label}</a>`;

function desktopNav() {
  return DATA.nav.map((item, i) => {
    if (!item.children) return `<li><a class="nav-link" href="${item.href}">${item.label}</a></li>`;
    const id = `dd-${i}`;
    return `<li class="relative" data-dropdown>
<button type="button" class="nav-link inline-flex items-center gap-1" aria-expanded="false" aria-haspopup="true" aria-controls="${id}" data-dropdown-trigger>${item.label}${icon(ICONS.chev, 'h-4 w-4')}</button>
<div id="${id}" class="dropdown-panel" hidden>${item.children.map((c) => `<a href="${c.href}">${c.label}</a>`).join('')}</div></li>`;
  }).join('');
}

function mobileNav() {
  const big = 'font-display text-2xl py-3 block border-b border-[var(--border)]';
  return DATA.nav.map((item, i) => {
    if (!item.children) return `<li><a class="${big}" href="${item.href}" data-menu-link>${item.label}</a></li>`;
    const id = `mdd-${i}`;
    return `<li><button type="button" class="${big} w-full flex items-center justify-between text-start" aria-expanded="false" aria-controls="${id}" data-accordion-trigger><span>${item.label}</span>${icon(ICONS.chev, 'h-5 w-5')}</button>
<ul id="${id}" class="ps-4 py-2" hidden>${item.children.map((c) => `<li><a class="block py-2 text-lg text-[var(--muted)]" href="${c.href}" data-menu-link>${c.label}</a></li>`).join('')}</ul></li>`;
  }).join('');
}

const logoLink = () => `<a href="index.html" class="inline-flex items-center gap-3 text-[var(--accent)]" aria-label="${DATA.brand.name}">${emblem('h-11 w-11 shrink-0')}<span class="leading-none"><span class="block font-display text-xl tracking-[.18em] text-[var(--text)]">LUMORA</span><span class="block text-[.6rem] tracking-[.5em] text-[var(--accent)]">CINEMAS</span></span></a>`;

export function headerHTML() {
  return `<a class="skip-link" href="#main">${DATA.ui.skip}</a>
<header class="site-header"><div class="container-lumora flex h-[4.5rem] items-center justify-between gap-4">
${logoLink()}
<nav class="hidden xl:block" aria-label="Primary"><ul class="flex items-center gap-6">${desktopNav()}</ul></nav>
<div class="hidden xl:flex items-center gap-3" data-header-controls>${loginBtn('btn-sm')}${dirBtn()}${themeBtn()}${ctaBtn('btn-sm')}</div>
<button type="button" class="icon-btn xl:hidden" data-menu-open aria-controls="mobile-menu" aria-expanded="false" aria-label="${DATA.ui.menu}">${icon(ICONS.menu)}</button>
</div></header>
<div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
<div class="flex h-[3.5rem] shrink-0 items-center justify-between">${logoLink()}<button type="button" class="icon-btn" data-menu-close aria-label="${DATA.ui.close}">${icon(ICONS.close)}</button></div>
<nav class="mt-6" aria-label="Mobile"><ul>${mobileNav()}</ul></nav>
<div class="mx-auto mt-8 flex w-full max-w-sm flex-col items-center gap-4" data-menu-controls>
${loginBtn('btn-lg w-full')}
<div class="flex items-center justify-center gap-4">${dirBtn()}${themeBtn()}</div>
${ctaBtn('btn-lg w-full')}
</div>
</div>`;
}

export function footerHTML() {
  const { brand, contact, theatres, social, footerLinks } = DATA;
  const h = 'font-sans text-sm font-semibold uppercase tracking-widest text-[var(--accent)]';
  return `<footer class="mt-auto border-t border-[var(--border)] bg-[var(--surface)]"><div class="container-lumora section grid gap-10 md:grid-cols-2 lg:grid-cols-4">
<div>${logoLink()}<p class="mt-4 max-w-xs text-sm text-[var(--muted)]">${brand.tagline}</p>
<ul class="mt-5 flex gap-3">${social.map((s) => `<li><a class="icon-btn" href="${s.href}" aria-label="${s.name}">${icon(s.path)}</a></li>`).join('')}</ul></div>
${footerLinks.map((c) => `<div><h2 class="${h}">${c.title}</h2><ul class="mt-4 space-y-2 text-sm">${c.links.map((l) => `<li><a class="text-[var(--muted)] hover:text-[var(--accent)]" href="${l.href}">${l.label}</a></li>`).join('')}</ul></div>`).join('')}
<div><h2 class="${h}">Visit</h2>
<address class="mt-4 space-y-2 text-sm not-italic text-[var(--muted)]"><p>${contact.address}</p><p><a class="hover:text-[var(--accent)]" href="tel:${contact.phone.replace(/[^+\d]/g, '')}" dir="ltr">${contact.phone}</a></p><p><a class="hover:text-[var(--accent)]" href="mailto:${contact.email}">${contact.email}</a></p><p>${contact.hours}</p></address>
<p class="mt-3 text-xs text-[var(--muted)]">${theatres.map((x) => x.name).join(' · ')}</p></div>
</div><div class="border-t border-[var(--border)] py-5 text-center text-xs text-[var(--muted)]">© ${brand.year} ${brand.name}. ${DATA.ui.rights}</div></footer>
<button type="button" class="icon-btn scroll-top" data-scroll-top aria-label="${DATA.ui.top}">${icon(ICONS.up)}</button>`;
}

export function renderLayout() {
  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.innerHTML = headerHTML();
  if (f) f.innerHTML = footerHTML();
}
