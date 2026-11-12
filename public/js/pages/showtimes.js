import { DATA } from '../data.js';
import { NOW_SHOWING, FORMATS } from '../movies.js';
import { art } from '../modules/art.js';
import { icon } from '../modules/icons.js';
import { section, sectionHead, bg, ratingPill } from '../modules/components.js';

const { contact, theatres } = DATA;
const theatre = theatres[0];
const DAYS = 7;

/* ---------- Dates ---------- */
const today = new Date();
const dates = Array.from({ length: DAYS }, (_, i) => {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
  const f = (o) => d.toLocaleDateString('en-US', o);
  return { i, weekday: f({ weekday: 'short' }), day: f({ day: 'numeric' }), month: f({ month: 'short' }), long: f({ weekday: 'long', day: 'numeric', month: 'long' }) };
});

/* Indicative schedule: base times from movie data, varied by day. */
function slotsFor(m, dayIdx) {
  let t = [...m.times];
  if (dayIdx % 3 === 1 && t.length > 3) t = t.slice(1);
  else if (dayIdx % 3 === 2 && t.length > 3) t = t.slice(0, -1);
  return t.map((time, k) => ({ time, format: m.formats[(k + dayIdx) % m.formats.length] }));
}

/* ---------- Sections ---------- */
const hero = () => `<section class="hero on-dark" aria-labelledby="hero-title">${bg('st-hero-bg')}
<div class="container-lumora hero-inner"><div class="hero-copy">
<p class="eyebrow">Showtimes · ${theatre.name}</p>
<h1 id="hero-title">Find Your Showtime</h1>
<p class="mt-4 text-lg text-[var(--muted)]">Browse the next seven days of screenings, filter by format and pick the time that suits you.</p>
<ul class="hero-meta"><li>${NOW_SHOWING.length} films now showing</li><li>${theatre.screens} screens</li><li>${contact.hours}</li></ul>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#dates">Choose a Date</a><a class="btn btn-secondary btn-lg" href="#theatre">Our Theatre</a></div>
</div></div></section>`;

const dateSel = () => section('dates',
  `${sectionHead({ eyebrow: 'Date selection', title: 'Pick a Day', text: 'Showtimes are available for the next seven days.' })}
<div class="date-strip" role="group" aria-label="Show dates">${dates.map((d) => `<button type="button" class="date-btn" data-date="${d.i}" aria-pressed="${d.i === 0}" aria-label="${d.long}"><span class="dw">${d.i === 0 ? 'Today' : d.weekday}</span><strong>${d.day}</strong><span class="dm">${d.month}</span></button>`).join('')}</div>
<p class="date-summary" id="date-summary" aria-live="polite"></p>`);

const theatreSec = () => section('theatre',
  `<div class="split"><div class="split-text"><p class="eyebrow">Theatre information</p><h2>${theatre.name}</h2>
<p class="mt-4 text-[var(--muted)]">Our flagship theatre in downtown ${theatre.city}, with ${theatre.screens} screens, laser projection, Dolby Atmos and full-recline seating.</p>
<ul class="theatre-facts">
<li>${icon('pin', 'h-5 w-5')}<span>${contact.address}</span></li>
<li>${icon('clock', 'h-5 w-5')}<span>${contact.hours}</span></li>
<li>${icon('phone', 'h-5 w-5')}<span>Box office: <a href="tel:${contact.boxOffice.replace(/[^+\d]/g, '')}" dir="ltr">${contact.boxOffice}</a></span></li>
<li>${icon('mail', 'h-5 w-5')}<span><a href="mailto:${contact.email}">${contact.email}</a></span></li></ul>
<div class="cta-row"><a class="btn btn-primary" href="contact.html#location">Get Directions</a><a class="btn btn-secondary" href="contact.html">Contact Us</a></div></div>
<div class="story-gallery"><div class="media g-wide">${art('st-theatre-screen', 'wide', 'Projection room with the screen lit')}</div>
<div class="media g-half">${art('st-theatre-lobby', 'wide', 'Auditorium with projection set up')}</div>
<div class="stat-card"><p class="stat">${theatre.screens}<span>screens at ${theatre.name}</span></p></div></div></div>`, 'band');

const nowShowing = () => section('now-showing',
  `${sectionHead({ eyebrow: 'Now showing & showtimes', title: 'Films and Times', text: 'Choose a showtime to see it in your summary below.' })}
<div class="chips-filter" role="group" aria-label="Filter by format">${FORMATS.map((f, i) => `<button type="button" class="chip-btn" data-format="${f}" aria-pressed="${i === 0}">${f}</button>`).join('')}</div>
<div class="selection-bar" id="selection-bar"><p id="selection-text" aria-live="polite">Select a showtime to continue.</p>
<a class="btn btn-primary btn-sm" id="selection-cta" href="#book" aria-disabled="true" tabindex="-1">Continue to Booking</a></div>
<div class="show-grid" id="show-grid"></div>
<p class="fine-print">Showtimes are indicative and may change. Seat availability and prices are confirmed during booking.</p>`);

const FMT = [
  { key: 'imax', name: 'IMAX', alt: 'Film moving through an IMAX projector', text: 'The biggest screen we have, with dual-laser projection and powerful, precise sound.', points: ['Floor-to-ceiling screen', 'Laser projection'] },
  { key: 'atmos', name: 'Dolby Atmos', alt: 'Speaker for immersive cinema sound', text: 'Sound that moves around and above you for a lifelike, immersive soundtrack.', points: ['Overhead speakers', 'Calibrated per room'] },
  { key: '4dx', name: '4DX', alt: 'Roller coaster riders mid-motion', text: 'Seats that move with the action, plus wind, mist and scent effects for big adventures.', points: ['Motion seats', 'Environmental effects'] },
  { key: 'standard', name: 'Standard 2D', alt: 'Vintage film projector body', text: 'Classic 2D presentation in comfortable recliners, perfect for any film and any budget.', points: ['Full-recline seating', 'Great value'] },
];
const formats = () => section('formats',
  `${sectionHead({ eyebrow: 'Screening formats', title: 'Choose How You Watch', text: 'The same film feels different in every format.' })}
<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">${FMT.map((f) => `<article class="card feature-card"><div class="media media-wide">${art(`st-fmt-${f.key}`, 'wide', f.alt)}</div>
<div class="feature-body"><h3 class="text-xl">${f.name}</h3><p class="text-sm text-[var(--muted)]">${f.text}</p><ul class="benefits">${f.points.map((p) => `<li>${p}</li>`).join('')}</ul></div></article>`).join('')}</div>`, 'band');

const cta = () => `<section id="book" class="cta-band on-dark" aria-labelledby="book-title">${bg('st-cta-bg')}<div class="container-lumora cta-inner">
<p class="eyebrow">Ready when you are</p><h2 id="book-title">Choose a Film. Book Your Seats.</h2>
<p class="mt-3 max-w-xl text-[var(--muted)]">Explore the showtimes above, then head to booking to pick your seats. Seat availability is confirmed at booking.</p>
<div class="cta-row cta-center"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="#dates">Explore Showtimes</a></div></div></section>`;

/* ---------- Interactive schedule ---------- */
const state = { date: 0, format: 'All', pick: null };

function card(m) {
  const slots = slotsFor(m, state.date).filter((s) => state.format === 'All' || s.format === state.format);
  if (!slots.length) return '';
  return `<article class="card show-card"><div class="media media-poster">${art(`${m.id}-showtime`, 'portrait', `${m.title} still`)}</div>
<div class="show-body"><h3 class="text-lg">${m.title}</h3><p class="meta">${m.genres.join(' · ')} · ${m.runtime} · ${m.cert}</p><p class="meta">${m.language}</p><p class="show-rating">${ratingPill(m.rating)}</p>
<div class="slots" role="group" aria-label="Showtimes for ${m.title}">${slots.map((s) => `<button type="button" class="slot" data-movie="${m.id}" data-time="${s.time}" data-fmt="${s.format}" aria-pressed="${state.pick === `${m.id}|${s.time}`}"><strong>${s.time}</strong><span>${s.format}</span></button>`).join('')}</div></div></article>`;
}

function renderSchedule(main) {
  const html = NOW_SHOWING.map(card).join('');
  main.querySelector('#show-grid').innerHTML = html || '<p class="empty">No showings for this format on this day. Try another format.</p>';
  const n = (html.match(/class="card show-card"/g) || []).length;
  main.querySelector('#date-summary').textContent = `Showing ${n} ${n === 1 ? 'film' : 'films'} on ${dates[state.date].long}.`;
}

function updateSelection(main) {
  const text = main.querySelector('#selection-text');
  const cta2 = main.querySelector('#selection-cta');
  if (!state.pick) {
    text.textContent = 'Select a showtime to continue.';
    cta2.setAttribute('aria-disabled', 'true'); cta2.tabIndex = -1;
    return;
  }
  const [id, time] = state.pick.split('|');
  const m = NOW_SHOWING.find((x) => x.id === id);
  const fmt = main.querySelector(`.slot[data-movie="${id}"][data-time="${time}"]`).dataset.fmt;
  text.textContent = `${m.title} · ${dates[state.date].long} · ${time} · ${fmt}`;
  cta2.removeAttribute('aria-disabled'); cta2.removeAttribute('tabindex');
}

export function render(main) {
  main.innerHTML = hero() + dateSel() + theatreSec() + nowShowing() + formats() + cta();
  renderSchedule(main);

  main.querySelector('.date-strip').addEventListener('click', (e) => {
    const b = e.target.closest('[data-date]'); if (!b) return;
    state.date = Number(b.dataset.date); state.pick = null;
    main.querySelectorAll('[data-date]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderSchedule(main); updateSelection(main);
  });
  main.querySelector('.chips-filter').addEventListener('click', (e) => {
    const b = e.target.closest('[data-format]'); if (!b) return;
    state.format = b.dataset.format; state.pick = null;
    main.querySelectorAll('[data-format]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderSchedule(main); updateSelection(main);
  });
  main.querySelector('#show-grid').addEventListener('click', (e) => {
    const b = e.target.closest('.slot'); if (!b) return;
    state.pick = `${b.dataset.movie}|${b.dataset.time}`;
    main.querySelectorAll('.slot').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    updateSelection(main);
  });
  main.querySelector('#selection-cta').addEventListener('click', (e) => { if (!state.pick) e.preventDefault(); });
}
