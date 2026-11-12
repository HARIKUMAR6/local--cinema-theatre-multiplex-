import { COMING_SOON, GENRES } from '../movies.js';
import { art } from '../modules/art.js';
import { section, sectionHead, bg, fmtDate } from '../modules/components.js';

const upcoming = [...COMING_SOON].sort((a, b) => a.date.localeCompare(b.date));
const featured = upcoming[0];
const DAY = 86400000;

const daysTo = (iso) => {
  const now = new Date();
  const t0 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const [y, m, d] = iso.split('-').map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - t0) / DAY);
};
const countdown = (iso) => { const n = daysTo(iso); return n > 1 ? `${n} days to go` : n === 1 ? 'Opens tomorrow' : n === 0 ? 'Opens today' : 'Now showing'; };
const weekday = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long' });

const hero = () => `<section class="hero on-dark" aria-labelledby="hero-title">${bg('cs-hero-bg')}
<div class="container-lumora hero-inner"><div class="hero-copy">
<p class="eyebrow">Coming soon</p>
<h1 id="hero-title">The Next Big Nights</h1>
<p class="mt-4 text-lg text-[var(--muted)]">Meet the films arriving at Lumora over the coming weeks, and be first to know when they open.</p>
<ul class="hero-meta"><li>${upcoming.length} upcoming releases</li><li>Next: ${featured.title}, ${fmtDate(featured.date).long}</li></ul>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#calendar">View Release Calendar</a><a class="btn btn-secondary btn-lg" href="#updates">Get Updates</a></div>
</div></div></section>`;

const featuredSec = () => section('featured',
  `<div class="feature-split"><div class="media feature-poster">${art('cs-featured', 'wide', `${featured.title} promotional still`)}</div>
<div class="split-text"><p class="eyebrow">Featured upcoming movie</p><h2>${featured.title}</h2>
<ul class="hero-meta feature-meta"><li><span class="badge">${fmtDate(featured.date).long}</span></li><li>${featured.genres.join(' · ')}</li><li>${featured.language}</li></ul>
<p class="mt-4 text-[var(--muted)]">${featured.synopsis} When the last signal on Earth answers back, a small team of listeners has one night to decide whether to reply. A slow-burning, visually stunning story built for the biggest screen we have.</p>
<p class="countdown">${countdown(featured.date)}</p>
<div class="cta-row"><a class="btn btn-primary" href="#updates">Notify Me</a><a class="btn btn-secondary" href="#calendar">Release Calendar</a></div></div></div>`);

const collection = () => section('upcoming',
  `${sectionHead({ eyebrow: 'Upcoming movies', title: 'On the Horizon', text: 'Eight releases to look forward to.' })}
<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">${upcoming.map((m) => `<article class="movie-card"><div class="poster">${art(`${m.id}-upcoming`, 'portrait', `${m.title} still`)}<span class="cert-pill">${fmtDate(m.date).month} ${fmtDate(m.date).day}</span></div>
<div class="movie-body"><h3>${m.title}</h3><p class="meta">${m.genres.join(' · ')}</p><p class="meta">${m.language}</p><p class="meta">Opens ${fmtDate(m.date).long}</p>
<div class="actions"><button type="button" class="btn btn-secondary btn-sm" data-remind="${m.id}" aria-pressed="false">Remind Me</button></div></div></article>`).join('')}</div>`, 'band');

const calendar = () => section('calendar',
  `${sectionHead({ eyebrow: 'Release calendar', title: 'Mark Your Calendar', text: 'Every upcoming opening night in date order.' })}
<ol class="rel-grid">${upcoming.map((m) => { const d = fmtDate(m.date); return `<li class="card rel-row"><div class="date-tile" aria-label="${d.long}"><span>${d.month}</span><strong>${d.day}</strong></div>
<div class="rel-body"><h3 class="text-lg">${m.title}</h3><p class="meta">${weekday(m.date)} · ${m.genres.join(' · ')} · ${m.language}</p><p class="text-sm text-[var(--muted)]">${m.synopsis}</p></div>
<a class="btn btn-secondary btn-sm" href="#updates">Notify Me</a></li>`; }).join('')}</ol>`);

const genres = () => section('genres',
  `${sectionHead({ eyebrow: 'Explore by genre', title: 'What Are You in the Mood For?', text: 'Pick a genre to see what is coming.' })}
<div class="genre-grid" role="group" aria-label="Genres">${GENRES.map((g, i) => `<button type="button" class="genre-tile" data-genre="${g}" aria-pressed="${i === 0}"><span class="media media-wide">${art(`cs-genre-${g}`, 'wide')}</span><span class="genre-name">${g}</span></button>`).join('')}</div>
<div class="results" data-results aria-live="polite"></div>`, 'band');

const updates = () => `<section id="updates" class="cta-band on-dark" aria-labelledby="updates-title">${bg('cs-cta-bg')}<div class="container-lumora cta-inner">
<p class="eyebrow">Movie updates</p><h2 id="updates-title">Never Miss an Opening Night</h2>
<p class="mt-3 max-w-xl text-[var(--muted)]">Get release news and early booking reminders for upcoming films.</p>
<form class="news-form" id="news-form" novalidate aria-label="Release updates signup">
<div class="news-row"><label class="sr-only" for="n-email">Email address</label><input class="input" id="n-email" type="email" autocomplete="email" placeholder="Your email address" aria-describedby="n-email-error">
<button class="btn btn-primary" type="submit">Notify Me</button></div>
<p class="field-error" id="n-email-error" hidden></p>
<label class="check"><input type="checkbox" id="n-consent" aria-describedby="n-consent-error"><span>I agree to receive release updates by email.</span></label>
<p class="field-error" id="n-consent-error" hidden></p>
<p class="form-status" id="n-status" role="status" aria-live="polite" hidden></p></form></div></section>`;

function initResults(main) {
  const box = main.querySelector('[data-results]');
  const show = (g) => {
    const list = upcoming.filter((m) => m.genres.includes(g));
    box.innerHTML = list.length
      ? `<ul class="result-list">${list.map((m) => `<li><span class="result-title">${m.title}</span><span class="meta">${m.genres.join(' · ')}</span><span class="result-tag">Opens ${fmtDate(m.date).month} ${fmtDate(m.date).day}</span><a class="btn btn-secondary btn-sm" href="#updates">Notify Me</a></li>`).join('')}</ul>`
      : '<p class="text-center text-[var(--muted)]">Nothing in this genre right now.</p>';
  };
  show(GENRES[0]);
  main.querySelector('.genre-grid').addEventListener('click', (e) => {
    const b = e.target.closest('[data-genre]'); if (!b) return;
    main.querySelectorAll('[data-genre]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    show(b.dataset.genre);
  });
}

function initReminders(main) {
  main.addEventListener('click', (e) => {
    const b = e.target.closest('[data-remind]'); if (!b) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? 'Reminder Set' : 'Remind Me';
    b.classList.toggle('btn-primary', on);
    b.classList.toggle('btn-secondary', !on);
  });
}

function initNewsletter(main) {
  const form = main.querySelector('#news-form');
  const email = main.querySelector('#n-email');
  const consent = main.querySelector('#n-consent');
  const status = main.querySelector('#n-status');
  const flag = (el, msg) => {
    const err = main.querySelector(`#${el.id}-error`);
    el.setAttribute('aria-invalid', String(Boolean(msg)));
    err.textContent = msg; err.hidden = !msg;
    return !msg;
  };
  const checkEmail = () => flag(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? '' : 'Please enter a valid email address.');
  const checkConsent = () => flag(consent, consent.checked ? '' : 'Please agree to receive updates.');
  email.addEventListener('blur', checkEmail);
  email.addEventListener('input', () => { if (email.getAttribute('aria-invalid') === 'true') checkEmail(); });
  consent.addEventListener('change', () => { if (consent.getAttribute('aria-invalid') === 'true') checkConsent(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const a = checkEmail(); const b = checkConsent();
    status.hidden = false;
    if (!a || !b) { status.className = 'form-status is-error'; status.textContent = 'Please check the highlighted fields.'; (a ? consent : email).focus(); return; }
    status.className = 'form-status is-success';
    status.textContent = `Thank you. We will send release updates to ${email.value.trim()}.`;
    form.reset();
  });
}

export function render(main) {
  main.innerHTML = hero() + featuredSec() + collection() + calendar() + genres() + updates();
  initResults(main); initReminders(main); initNewsletter(main);
}
