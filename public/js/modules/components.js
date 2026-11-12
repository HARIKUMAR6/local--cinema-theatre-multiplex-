/* Shared page building blocks (markup helpers). Styles live in src/css/input.css. */
import { art } from './art.js';

export const star = '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 7 7 .6-5.3 4.6 1.7 7.3L12 17.8 5.6 21.5l1.7-7.3L2 9.6 9 9z"/></svg>';

export const sectionHead = ({ eyebrow, title, text }) =>
  `<header class="section-head"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2>${text ? `<p class="mt-3 text-[var(--muted)]">${text}</p>` : ''}</header>`;

export const section = (id, inner, cls = '') =>
  `<section id="${id}" class="section ${cls}" aria-labelledby="${id}-title"><div class="container-lumora">${inner.replace('<h2>', `<h2 id="${id}-title">`)}</div></section>`;

export const chips = (list) => `<ul class="chips">${list.map((x) => `<li class="chip">${x}</li>`).join('')}</ul>`;
export const ratingPill = (n) => `<span class="rating-pill">${star}${n.toFixed(1)}</span>`;

export function fmtDate(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  const o = (opt) => d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opt });
  return { month: o({ month: 'short' }), day: o({ day: 'numeric' }), long: o({ month: 'long', day: 'numeric', year: 'numeric' }) };
}

/* Portrait poster card used in 6-up grids: fixed 2:3 poster, stacked equal buttons. */
export function posterCard(m) {
  return `<article class="movie-card">
<div class="poster">${art(`${m.id}-poster`, 'portrait', `${m.title} poster`)}${ratingPill(m.rating)}<span class="cert-pill">${m.cert}</span></div>
<div class="movie-body"><h3>${m.title}</h3><p class="meta">${m.genres.join(' · ')} · ${m.runtime}</p>
<div class="actions"><a class="btn btn-primary btn-sm" href="#book">Book Now</a><a class="btn btn-secondary btn-sm" href="#showtimes">Showtimes</a></div></div></article>`;
}

/* Logo-less decorative full-bleed background for hero/CTA bands. */
export const bg = (seed) => `<div class="band-bg" aria-hidden="true">${art(seed, 'wide')}</div>`;
