import { NOW_SHOWING, COMING_SOON, EXPERIENCE, OFFERS, MEMBERSHIP_BENEFITS, FORMATS, HERO } from '../movies.js';
import { art } from '../modules/art.js';
import { section, sectionHead, posterCard, chips, ratingPill, fmtDate, bg } from '../modules/components.js';

const feature = NOW_SHOWING.find((x) => x.id === HERO.home1.id);
const showing = NOW_SHOWING.slice(0, 6);
const soon = COMING_SOON.slice(0, 4);

const hero = () => `<section class="hero on-dark" aria-labelledby="hero-title">${bg('h1-hero-bg')}
<div class="container-lumora hero-inner"><div class="hero-copy">
<p class="eyebrow">Feel every frame · Now showing</p>
<h1 id="hero-title">${feature.title}</h1>
<p class="mt-4 text-lg text-[var(--muted)]">${feature.synopsis}</p>
<ul class="hero-meta">${[`${ratingPill(feature.rating)}`, feature.genres.join(' · '), feature.runtime, feature.cert].map((x) => `<li>${x}</li>`).join('')}</ul>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="#showtimes">View Showtimes</a></div>
</div></div></section>`;

const nowShowing = () => section('now-showing',
  `${sectionHead({ eyebrow: 'Now showing', title: 'Playing This Week', text: 'Pick a film, choose your format and reserve the perfect seat.' })}
<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-6">${showing.map(posterCard).join('')}</div>`);

const experience = () => section('experience',
  `${sectionHead({ eyebrow: 'Theatre experience', title: 'Built Around the Big Screen', text: 'Screens, sound and seating engineered to disappear so the film can take over.' })}
<div class="grid gap-6 md:grid-cols-3">${EXPERIENCE.map((e) => `<article class="card feature-card"><div class="media media-wide">${art(`h1-exp-${e.key}`, 'wide', e.title)}</div>
<div class="feature-body"><p class="stat">${e.stat}<span>${e.statLabel}</span></p><h3 class="text-xl">${e.title}</h3><p class="text-sm text-[var(--muted)]">${e.text}</p></div></article>`).join('')}</div>`, 'band');

const comingSoon = () => section('coming-soon',
  `${sectionHead({ eyebrow: 'Coming soon', title: 'Next on the Marquee', text: 'Mark your calendar for the releases everyone will be talking about.' })}
<div class="grid gap-6 lg:grid-cols-2">${soon.map((m) => { const d = fmtDate(m.date); return `<article class="card h-card">
<div class="media media-poster">${art(`${m.id}-poster`, 'portrait', `${m.title} poster`)}</div>
<div class="h-card-body"><span class="badge">${d.long}</span><h3 class="mt-3 text-xl">${m.title}</h3><p class="meta">${m.genres.join(' · ')}</p><p class="mt-2 text-sm text-[var(--muted)]">${m.synopsis}</p>
<div class="actions-row"><a class="btn btn-secondary btn-sm" href="#coming-soon">Remind Me</a></div></div></article>`; }).join('')}</div>`, 'band');

const showtimes = () => section('showtimes',
  `${sectionHead({ eyebrow: 'Showtimes & screenings', title: 'Today’s Schedule', text: 'Filter by format and jump straight to booking.' })}
<div class="chips-filter" role="group" aria-label="Filter by format">${FORMATS.map((f, i) => `<button type="button" class="chip-btn" data-format="${f}" aria-pressed="${i === 0}">${f}</button>`).join('')}</div>
<div class="schedule" data-schedule>${showing.map((m) => `<article class="schedule-row" data-formats="${m.formats.join('|')}">
<div class="schedule-info"><h3 class="text-lg">${m.title}</h3><p class="meta">${m.genres.join(' · ')} · ${m.runtime} · ${m.cert}</p>${chips(m.formats)}</div>
<div class="times">${m.times.map((t) => `<a class="time-btn" href="#book" aria-label="Book ${m.title} at ${t}">${t}</a>`).join('')}</div></article>`).join('')}</div>`);

const offers = () => section('offers',
  `${sectionHead({ eyebrow: 'Exclusive offers', title: 'More Movie for Less', text: 'Everyday savings and member perks designed for people who love cinema.' })}
<div class="grid gap-6 md:grid-cols-3">${OFFERS.map((o) => `<article class="card feature-card"><div class="media media-wide">${art(`h1-offer-${o.key}`, 'wide', o.title)}</div>
<div class="feature-body"><span class="badge">${o.badge}</span><h3 class="text-xl">${o.title}</h3><p class="text-sm text-[var(--muted)]">${o.text}</p><div class="actions-row"><a class="btn btn-secondary btn-sm" href="#offers">Claim Offer</a></div></div></article>`).join('')}</div>
<aside class="card member-card"><div><p class="eyebrow">Lumora Club</p><h3 class="mt-2 text-2xl">Join free. Unlock more.</h3></div>
<ul class="benefits">${MEMBERSHIP_BENEFITS.map((b) => `<li>${b}</li>`).join('')}</ul><a class="btn btn-primary" href="#login">Join the Club</a></aside>`, 'band');

const finalCta = () => `<section id="book" class="cta-band on-dark" aria-labelledby="book-title">${bg('h1-cta-bg')}<div class="container-lumora cta-inner">
<p class="eyebrow">Feel every frame</p><h2 id="book-title">Your Seat Is Waiting</h2><p class="mt-3 max-w-xl text-[var(--muted)]">Reserve tickets in under a minute and walk in like you own the place.</p>
<div class="cta-row cta-center"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="#showtimes">Browse Showtimes</a></div></div></section>`;

export function render(main) {
  main.innerHTML = hero() + nowShowing() + experience() + comingSoon() + showtimes() + offers() + finalCta();
  const rows = [...main.querySelectorAll('.schedule-row')];
  main.querySelector('.chips-filter').addEventListener('click', (e) => {
    const b = e.target.closest('[data-format]');
    if (!b) return;
    main.querySelectorAll('[data-format]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    rows.forEach((r) => { r.hidden = b.dataset.format !== 'All' && !r.dataset.formats.split('|').includes(b.dataset.format); });
  });
}
