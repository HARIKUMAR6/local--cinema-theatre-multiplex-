import { NOW_SHOWING, COMING_SOON, GENRES, EXPERIENCE, OFFERS, TIERS, HERO } from '../movies.js';
import { art } from '../modules/art.js';
import { section, sectionHead, ratingPill, fmtDate, bg } from '../modules/components.js';

const spot = NOW_SHOWING.find((x) => x.id === HERO.home2.id);
const lineup = ['velvet-hour', 'starlight-brigade', 'hollow-pines', 'iron-valley', 'the-quiet-orchestra']
  .map((id) => NOW_SHOWING.find((x) => x.id === id));
const [lead, ...rest] = lineup;
const premieres = COMING_SOON.slice(4);
const catalog = [...NOW_SHOWING, ...COMING_SOON];

const hero = () => `<section class="hero on-dark" aria-labelledby="hero-title">${bg('h2-hero-bg')}
<div class="container-lumora hero-inner hero-split"><div class="hero-copy">
<p class="eyebrow">Spotlight · ${spot.genres.join(' · ')}</p>
<h1 id="hero-title">Feel Every Frame</h1>
<p class="mt-4 text-lg text-[var(--muted)]"><strong class="text-[var(--text)]">${spot.title}</strong> — ${spot.synopsis}</p>
<ul class="hero-meta">${[ratingPill(spot.rating), spot.runtime, spot.cert, spot.formats.join(' / ')].map((x) => `<li>${x}</li>`).join('')}</ul>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="#now-showing">What’s On</a></div>
</div><div class="spot-frame"><div class="media media-poster">${art(`${spot.id}-poster`, 'portrait', `${spot.title} poster`)}</div></div></div></section>`;

const explore = () => section('explore',
  `${sectionHead({ eyebrow: 'Explore movies', title: 'Find Your Genre', text: 'Choose a mood and see everything playing or arriving soon.' })}
<div class="genre-grid" role="group" aria-label="Genres">${GENRES.map((g, i) => `<button type="button" class="genre-tile" data-genre="${g}" aria-pressed="${i === 0}"><span class="media media-wide">${art(`h2-genre-${g}`, 'wide')}</span><span class="genre-name">${g}</span></button>`).join('')}</div>
<div class="results" data-results aria-live="polite"></div>`);

const listRow = (m) => `<article class="card row-card"><div class="media media-poster">${art(`${m.id}-poster`, 'portrait', `${m.title} poster`)}</div>
<div class="row-body"><h3 class="text-lg">${m.title}</h3><p class="meta">${m.genres.join(' · ')} · ${m.runtime}</p><p class="row-actions">${ratingPill(m.rating)}<a class="btn btn-primary btn-sm" href="#book">Book</a></p></div></article>`;

const nowShowing = () => section('now-showing',
  `${sectionHead({ eyebrow: 'Now showing', title: 'This Week’s Lineup', text: 'One headline feature and four more worth the trip.' })}
<div class="editorial"><article class="lead-card"><div class="media">${art(`${lead.id}-backdrop`, 'wide', `${lead.title} still`)}</div>
<div class="lead-body"><p class="eyebrow">Editor’s pick</p><h3 class="text-2xl md:text-3xl">${lead.title}</h3><p class="meta">${lead.genres.join(' · ')} · ${lead.runtime} · ${lead.cert}</p><p class="mt-2 text-[var(--muted)]">${lead.synopsis}</p>
<p class="row-actions">${ratingPill(lead.rating)}<a class="btn btn-primary btn-sm" href="#book">Book Tickets</a></p></div></article>
<div class="editorial-list">${rest.map(listRow).join('')}</div></div>`, 'band');

const experience = () => section('experience',
  `${sectionHead({ eyebrow: 'Premium cinema experience', title: 'Every Seat, the Best Seat', text: 'Technology and comfort working together.' })}
<div class="bento">${EXPERIENCE.map((e, i) => `<article class="tile${i === 0 ? ' tile-lg' : ''}"><div class="media">${art(`h2-exp-${e.key}`, 'wide', e.title)}</div>
<div class="tile-body"><p class="stat">${e.stat}<span>${e.statLabel}</span></p><h3 class="text-xl">${e.title}</h3><p class="text-sm">${e.text}</p></div></article>`).join('')}</div>`);

const premieresSec = () => section('coming-soon',
  `${sectionHead({ eyebrow: 'Upcoming premieres', title: 'Release Calendar', text: 'Opening nights worth planning around.' })}
<ol class="calendar">${premieres.map((m) => { const d = fmtDate(m.date); return `<li class="card cal-row"><div class="date-tile" aria-label="${d.long}"><span>${d.month}</span><strong>${d.day}</strong></div>
<div class="media media-wide thumb">${art(`${m.id}-backdrop`, 'wide', `${m.title} still`)}</div>
<div class="cal-body"><h3 class="text-lg">${m.title}</h3><p class="meta">${m.genres.join(' · ')}</p><p class="text-sm text-[var(--muted)]">${m.synopsis}</p><a class="btn btn-secondary btn-sm" href="#coming-soon">Notify Me</a></div></li>`; }).join('')}</ol>`, 'band');

const rewards = () => section('rewards',
  `${sectionHead({ eyebrow: 'Moviegoer rewards & offers', title: 'Watch More, Earn More', text: 'Every ticket brings you closer to free movies.' })}
<div class="grid gap-6 md:grid-cols-3">${TIERS.map((t) => `<article class="card tier${t.featured ? ' tier-featured' : ''}"><h3 class="text-2xl">${t.name}</h3><p class="tier-price">${t.price}</p>
<ul class="benefits">${t.perks.map((p) => `<li>${p}</li>`).join('')}</ul><a class="btn ${t.featured ? 'btn-primary' : 'btn-secondary'}" href="#login">Choose ${t.name}</a></article>`).join('')}</div>
<ul class="offer-strip">${OFFERS.map((o) => `<li class="card"><span class="badge">${o.badge}</span><h3 class="mt-3 text-lg">${o.title}</h3><p class="mt-1 text-sm text-[var(--muted)]">${o.text}</p></li>`).join('')}</ul>`);

const finalCta = () => `<section id="book" class="section" aria-labelledby="book-title"><div class="container-lumora"><div class="cta-split on-dark"><div class="media">${art('h2-cta-art', 'wide')}</div>
<div class="cta-split-body"><p class="eyebrow">Your next movie</p><h2 id="book-title">Book Your Next Movie</h2><p class="mt-3 text-[var(--muted)]">Pick a showtime, choose your seats and you are done.</p>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="#now-showing">See What’s On</a></div></div></div></div></section>`;

export function render(main) {
  main.innerHTML = hero() + explore() + nowShowing() + experience() + premieresSec() + rewards() + finalCta();
  const box = main.querySelector('[data-results]');
  const show = (g) => {
    const list = catalog.filter((m) => m.genres.includes(g));
    box.innerHTML = list.length
      ? `<ul class="result-list">${list.map((m) => `<li><span class="result-title">${m.title}</span><span class="meta">${m.genres.join(' · ')}</span><span class="result-tag">${m.date ? `Opens ${fmtDate(m.date).month} ${fmtDate(m.date).day}` : `${m.runtime} · ${m.rating.toFixed(1)}`}</span><a class="btn btn-secondary btn-sm" href="${m.date ? '#coming-soon' : '#book'}">${m.date ? 'Notify Me' : 'Book'}</a></li>`).join('')}</ul>`
      : '<p class="text-center text-[var(--muted)]">Nothing in this genre right now.</p>';
  };
  show(GENRES[0]);
  main.querySelector('.genre-grid').addEventListener('click', (e) => {
    const b = e.target.closest('[data-genre]');
    if (!b) return;
    main.querySelectorAll('[data-genre]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    show(b.dataset.genre);
  });
}
