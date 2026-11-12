import { DATA } from '../data.js';
import { art } from '../modules/art.js';
import { icon } from '../modules/icons.js';
import { section, sectionHead, bg } from '../modules/components.js';

const { contact, theatres } = DATA;
const tel = (n) => `tel:${n.replace(/[^+\d]/g, '')}`;
const { lat, lon } = contact.geo;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.006}%2C${lat - 0.003}%2C${lon + 0.006}%2C${lat + 0.003}&layer=mapnik&marker=${lat}%2C${lon}`;
const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;

const hero = () => `<section class="hero on-dark" aria-labelledby="hero-title">${bg('contact-hero-bg')}
<div class="container-lumora hero-inner"><div class="hero-copy">
<p class="eyebrow">Contact ${DATA.brand.name}</p>
<h1 id="hero-title">We’d Love to Hear From You</h1>
<p class="mt-4 text-lg text-[var(--muted)]">Questions about showtimes, private screenings, group bookings or accessibility? Our team is here every day until late.</p>
<ul class="hero-meta"><li><a href="${tel(contact.phone)}" dir="ltr">${contact.phone}</a></li><li>${contact.hours}</li></ul>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="#enquiry">Send an Enquiry</a><a class="btn btn-secondary btn-lg" href="#location">Find Us</a></div>
</div></div></section>`;

const CARDS = [
  { icon: 'pin', title: 'Visit us', lines: [contact.name, contact.address], link: { href: mapLink, label: 'View on map', ext: true } },
  { icon: 'phone', title: 'Call us', lines: [`General: <a href="${tel(contact.phone)}" dir="ltr">${contact.phone}</a>`, `Box office: <a href="${tel(contact.boxOffice)}" dir="ltr">${contact.boxOffice}</a>`], link: { href: tel(contact.phone), label: 'Call now' } },
  { icon: 'mail', title: 'Email us', lines: [`<a href="mailto:${contact.email}">${contact.email}</a>`, `<a href="mailto:${contact.supportEmail}">${contact.supportEmail}</a>`], link: { href: `mailto:${contact.email}`, label: 'Write to us' } },
  { icon: 'clock', title: 'Opening hours', lines: [contact.hours, 'Box office opens 30 minutes before the first show'], link: { href: '#enquiry', label: 'Send a message' } },
];
const info = () => section('info',
  `${sectionHead({ eyebrow: 'Contact information', title: 'Get in Touch', text: 'Pick the way that suits you best.' })}
<div class="info-grid">${CARDS.map((c) => `<article class="card info-card"><span class="icon-badge">${icon(c.icon)}</span><h3 class="text-xl">${c.title}</h3>
<div class="info-lines">${c.lines.map((l) => `<p class="text-[var(--muted)]">${l}</p>`).join('')}</div>
<div class="actions-row"><a class="btn btn-secondary btn-sm" href="${c.link.href}"${c.link.ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${c.link.label}</a></div></article>`).join('')}</div>`);

const location = () => section('location',
  `${sectionHead({ eyebrow: 'Theatre location', title: 'Find Lumora Union Square', text: 'In the heart of downtown, steps from Union Square and public transport.' })}
<div class="map-wrap"><div class="map-frame"><iframe title="Map showing ${contact.name} at ${contact.address}" src="${mapSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
<aside class="card map-card"><h3 class="text-xl">${contact.name}</h3><p class="text-[var(--muted)]">${contact.address}</p>
<ul class="benefits"><li>Powell Street BART and Muni: 5 minute walk</li><li>Underground parking on Post Street</li><li>Step-free entrance and accessible seating</li></ul>
<div class="actions-row"><a class="btn btn-primary" href="${mapLink}" target="_blank" rel="noopener noreferrer">Open Larger Map</a></div></aside></div>`, 'band');

const FIELD = (id, label, control, hint = '') => `<div class="field${hint === 'full' ? ' col-full' : ''}"><label for="${id}">${label}</label>${control}<p class="field-error" id="${id}-error" hidden></p></div>`;
const form = () => section('enquiry',
  `${sectionHead({ eyebrow: 'Enquiries', title: 'Send Us a Message', text: 'We reply to every enquiry within one working day.' })}
<div class="enquiry-split"><div class="enquiry-side"><div class="media">${art('contact-form-side', 'wide', 'Cinema box office ticket window')}</div>
<div class="enquiry-note"><p class="eyebrow">Prefer to talk?</p><p class="mt-2 text-lg">Call the box office on <a href="${tel(contact.boxOffice)}" dir="ltr">${contact.boxOffice}</a></p></div></div>
<form class="card enquiry-form" id="enquiry-form" novalidate aria-label="Enquiry form">
<div class="form-grid">
${FIELD('f-name', 'Full name *', '<input class="input" id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-error">')}
${FIELD('f-email', 'Email address *', '<input class="input" id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="f-email-error">')}
${FIELD('f-phone', 'Phone (optional)', '<input class="input" id="f-phone" name="phone" type="tel" autocomplete="tel" aria-describedby="f-phone-error">')}
${FIELD('f-type', 'Enquiry type *', `<select class="input" id="f-type" name="type" required aria-describedby="f-type-error"><option value="">Select a topic</option><option>Tickets and bookings</option><option>Private screenings and events</option><option>Group bookings</option><option>Accessibility</option><option>Feedback</option></select>`)}
${FIELD('f-theatre', 'Preferred theatre', `<select class="input" id="f-theatre" name="theatre" aria-describedby="f-theatre-error">${theatres.map((t) => `<option>${t.name}</option>`).join('')}</select>`, 'full')}
${FIELD('f-message', 'Message *', '<textarea class="input" id="f-message" name="message" rows="5" required minlength="20" aria-describedby="f-message-error"></textarea>', 'full')}
<div class="field col-full"><label class="check"><input type="checkbox" id="f-consent" name="consent" required aria-describedby="f-consent-error"><span>I agree to be contacted about my enquiry. *</span></label><p class="field-error" id="f-consent-error" hidden></p></div>
</div>
<div class="form-actions"><button class="btn btn-primary btn-lg" type="submit">Send Message</button></div>
<p class="form-status" id="form-status" role="status" aria-live="polite" hidden></p></form></div>`);

const FAQS = [
  ['How do I book tickets?', 'Choose a film and showtime on the website, select your seats and pay online. You can also book at the box office up to 30 minutes before the show.'],
  ['Can I change or cancel my booking?', 'Yes. You can exchange tickets for another showing up to 2 hours before the start time at no cost. Refunds are available up to 24 hours before.'],
  ['Are the theatres accessible?', 'All Lumora theatres have step-free access, wheelchair spaces, hearing loops and companion seating. Contact us if you need anything arranged in advance.'],
  ['What formats do you offer?', 'We show films in IMAX, Dolby Atmos, 4DX and standard formats. Each film listing shows the formats available.'],
  ['Can I hire a screen for a private event?', 'Absolutely. Private screenings suit birthdays, corporate events and school groups. Send us an enquiry and we will prepare a quote.'],
  ['Is outside food allowed?', 'We ask guests to enjoy our freshly prepared food and drinks. Medical and baby food are always welcome.'],
];
const faq = () => section('faq',
  `${sectionHead({ eyebrow: 'FAQs & support', title: 'Answers at a Glance', text: 'Quick answers to the questions we hear most.' })}
<div class="faq-layout"><div class="faq-list">${FAQS.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
<aside class="card support-card"><span class="icon-badge">${icon('chat')}</span><h3 class="text-xl">Still need help?</h3><p class="text-[var(--muted)]">Our customer support team is available every day from 10:00 to 01:00.</p>
<div class="support-actions"><a class="btn btn-primary" href="${tel(contact.phone)}">Call Support</a><a class="btn btn-secondary" href="mailto:${contact.supportEmail}">Email Support</a></div></aside></div>`, 'band');

/* ---------- Form validation ---------- */
const RULES = {
  'f-name': (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
  'f-email': (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  'f-phone': (v) => (!v.trim() || /^[+\d\s()-]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.'),
  'f-type': (v) => (v ? '' : 'Please choose an enquiry type.'),
  'f-message': (v) => (v.trim().length < 20 ? 'Please write at least 20 characters so we can help properly.' : ''),
  'f-consent': (_, el) => (el.checked ? '' : 'Please confirm you agree to be contacted.'),
};

function initForm(main) {
  const formEl = main.querySelector('#enquiry-form');
  const status = main.querySelector('#form-status');
  const check = (el) => {
    const msg = RULES[el.id] ? RULES[el.id](el.value, el) : '';
    const err = main.querySelector(`#${el.id}-error`);
    el.setAttribute('aria-invalid', String(Boolean(msg)));
    err.textContent = msg;
    err.hidden = !msg;
    return !msg;
  };
  const fields = Object.keys(RULES).map((id) => main.querySelector(`#${id}`));
  fields.forEach((el) => {
    el.addEventListener('blur', () => check(el));
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    el.addEventListener('change', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); });
  });
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    status.hidden = false;
    const bad = fields.filter((el) => !check(el));
    if (bad.length) {
      status.className = 'form-status is-error';
      status.textContent = `Please fix ${bad.length} ${bad.length === 1 ? 'field' : 'fields'} and try again.`;
      bad[0].focus();
      return;
    }
    status.className = 'form-status is-success';
    status.textContent = 'Thank you. Your message has been sent and our team will reply within one working day.';
    formEl.reset();
    fields.forEach((el) => el.setAttribute('aria-invalid', 'false'));
  });
}

export function render(main) {
  main.innerHTML = hero() + info() + location() + form() + faq();
  initForm(main);
}
