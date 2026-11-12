import { DATA } from '../data.js';
import { art } from '../modules/art.js';
import { icon } from '../modules/icons.js';
import { section, sectionHead, bg } from '../modules/components.js';

const screens = DATA.theatres.reduce((n, t) => n + t.screens, 0);

const hero = () => `<section class="hero on-dark" aria-labelledby="hero-title">${bg('about-hero-bg')}
<div class="container-lumora hero-inner"><div class="hero-copy">
<p class="eyebrow">About ${DATA.brand.name}</p>
<h1 id="hero-title">Light Made Into Story</h1>
<p class="mt-4 text-lg text-[var(--muted)]">We built Lumora for people who still believe the best way to see a film is in the dark, together, with the biggest picture and the cleanest sound we can give them.</p>
<ul class="hero-meta"><li>${DATA.theatres.length} theatres</li><li>${screens} screens</li><li>Since 2012</li></ul>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="contact.html">Contact Us</a></div>
</div></div></section>`;

const story = () => section('story',
  `<div class="split"><div class="split-text">
<p class="eyebrow">Our story</p><h2>From One Screen to a Landmark</h2>
<p class="mt-4 text-[var(--muted)]">Lumora opened in 2012 with a single refurbished auditorium and a simple promise: treat every showing like a premiere. A projector bought second-hand, seats chosen one by one, and a team that stayed after closing to tune the sound until it felt right.</p>
<p class="mt-3 text-[var(--muted)]">Today we run ${screens} screens across ${DATA.theatres.length} theatres, with laser projection, Dolby Atmos and full-recline seating. The scale has changed. The promise has not.</p>
<div class="cta-row"><a class="btn btn-secondary" href="#experience">See the Experience</a></div></div>
<div class="story-gallery"><div class="media g-wide">${art('about-story-heritage', 'wide', 'Vintage film projector and reels')}</div>
<div class="media g-half">${art('about-story-camera', 'wide', 'Hand holding a Super 8 camera against the sky')}</div>
<div class="stat-card"><p class="stat">${screens}<span>screens across ${DATA.theatres.length} theatres</span></p></div></div></div>`);

const missionVision = () => section('mission',
  `${sectionHead({ eyebrow: 'Mission & vision', title: 'What Drives Us', text: 'One purpose today, one direction for tomorrow.' })}
<div class="grid gap-6 md:grid-cols-2">
<article class="card feature-card"><div class="media media-wide">${art('about-mission', 'wide', 'Rows of red cinema seats')}</div><div class="feature-body"><p class="eyebrow">Our mission</p><h3 class="text-2xl">Make every visit worth leaving home for</h3><p class="text-[var(--muted)]">We deliver the best picture, sound and comfort in every auditorium, with friendly service and fair prices, so a night at the cinema feels like an event rather than an errand.</p></div></article>
<article class="card feature-card"><div class="media media-wide">${art('about-vision', 'wide', 'Film reel on a cinema projector')}</div><div class="feature-body"><p class="eyebrow">Our vision</p><h3 class="text-2xl">The city’s home for the shared big-screen moment</h3><p class="text-[var(--muted)]">To be the place people choose first for films worth seeing together, where new technology serves the story and every guest, from first-timers to lifelong film lovers, feels at home.</p></div></article>
</div>`, 'band');

const EXP = [
  { key: 'screens', title: 'Premium Screens', icon: 'screen', alt: 'Large cinema projection screen', text: 'Wall-to-wall screens with dual-laser projection, deep blacks and bright, true colour.', specs: ['4K laser projection', 'IMAX and standard formats'] },
  { key: 'sound', title: 'Immersive Sound', icon: 'sound', alt: 'Professional audio mixing console', text: 'Every auditorium is calibrated by our sound engineers for clear dialogue and thunderous low end.', specs: ['Dolby Atmos', 'Hand-tuned per room'] },
  { key: 'seating', title: 'Comfortable Seating', icon: 'seat', alt: 'Rows of cinema seats facing the screen', text: 'Wide recliners with generous legroom, personal tables and clear sight lines from every row.', specs: ['Full-recline loungers', 'In-seat service'] },
];
const experience = () => section('experience',
  `${sectionHead({ eyebrow: 'The cinema experience', title: 'Built for the Big Screen', text: 'Three things we never compromise on.' })}
<div class="grid gap-6 md:grid-cols-3">${EXP.map((e) => `<article class="card feature-card"><div class="media media-wide">${art(`about-exp-${e.key}`, 'wide', e.alt)}</div>
<div class="feature-body"><span class="icon-badge">${icon(e.icon)}</span><h3 class="text-xl">${e.title}</h3><p class="text-sm text-[var(--muted)]">${e.text}</p><ul class="benefits">${e.specs.map((s) => `<li>${s}</li>`).join('')}</ul></div></article>`).join('')}</div>`);

const WHY = [
  { icon: 'screen', title: 'Best-in-class projection', text: 'Laser and IMAX screens that show every frame as the director intended.' },
  { icon: 'sound', title: 'Sound you can feel', text: 'Dolby Atmos systems tuned room by room.' },
  { icon: 'seat', title: 'Seats made for long films', text: 'Recliners, legroom and clear sight lines everywhere.' },
  { icon: 'ticket', title: 'Easy, flexible booking', text: 'Reserve in under a minute and change plans without fuss.' },
  { icon: 'popcorn', title: 'Fresh food and drinks', text: 'Made to order and brought to your seat.' },
  { icon: 'star', title: 'Rewards that add up', text: 'Earn points on every visit and unlock free screenings.' },
];
const why = () => `<section id="why" class="section why-band on-dark" aria-labelledby="why-title">${bg('about-why-bg')}<div class="container-lumora">
${sectionHead({ eyebrow: 'Why choose Lumora', title: 'Six Reasons to Come Back', text: 'The details that turn a good night out into a great one.' }).replace('<h2>', '<h2 id="why-title">')}
<div class="why-grid">${WHY.map((w) => `<article class="why-card"><span class="icon-badge">${icon(w.icon)}</span><h3 class="text-lg">${w.title}</h3><p class="text-sm text-[var(--muted)]">${w.text}</p></article>`).join('')}</div>
<div class="cta-row cta-center"><a class="btn btn-primary btn-lg" href="#book">Book Tickets</a><a class="btn btn-secondary btn-lg" href="contact.html">Talk to Us</a></div></div></section>`;

export function render(main) {
  main.innerHTML = hero() + story() + missionVision() + experience() + why();
}
