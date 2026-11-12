/* The eight dashboard modules. Each view returns { title, html, mount }. */
import { DATA } from '../data.js';
import { GENRES } from '../movies.js';
import { art } from '../modules/art.js';
import {
  USER, POINTS, BOOKINGS, NOTIFICATIONS, FAQS, REWARD_ITEMS, OFFER_CODES, OFFERS, TIERS, PRICE, FEE_PER_TICKET,
  movieOf, dateOf, tickets, subtotal, fee, total, money,
} from '../bookings.js';
import { state, commit } from './store.js';
import { ic, esc, initials, dateLong, dateShort, toast, confirmDialog, rules, bindValidation, fieldHtml } from './ui.js';

const { contact, theatres } = DATA;
const DAY = 86400000;
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

/* ---------- Shared state accessors ---------- */
export const profile = () => ({ ...USER, ...(state.profile || {}) });
export const bookings = () => BOOKINGS.map((b) => ({ ...b, status: state.cancelled.includes(b.id) ? 'cancelled' : b.status }));
export const upcoming = () => bookings().filter((b) => b.status === 'upcoming').sort((a, b) => a.day - b.day);
export const history = () => bookings().filter((b) => b.status !== 'upcoming').sort((a, b) => b.day - a.day);
export const points = () => POINTS.balance + state.extraPoints;

const DEFAULT_READ = ['n4', 'n5', 'n6', 'n7'];
export const notifications = () => [...state.notifs, ...NOTIFICATIONS].map((n) => ({ ...n, read: state.read.includes(n.id) || DEFAULT_READ.includes(n.id) }));
export const unreadCount = () => notifications().filter((n) => !n.read).length;
const ago = (h) => (h < 1 ? 'Just now' : h < 24 ? `${Math.round(h)}h ago` : `${Math.round(h / 24)}d ago`);

const STATUS = { upcoming: 'Upcoming', watched: 'Watched', cancelled: 'Cancelled' };
const badge = (s) => `<span class="status is-${s}">${STATUS[s]}</span>`;
const daysUntil = (b) => Math.round((dateOf(b) - today()) / DAY);
const when = (b) => { const n = daysUntil(b); return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n > 1 ? `In ${n} days` : ''; };
const head = (eyebrow, title, sub = '', actions = '') => `<header class="page-head"><div><p class="eyebrow">${eyebrow}</p><h1 id="page-title" tabindex="-1">${title}</h1>${sub ? `<p class="page-sub">${sub}</p>` : ''}</div>${actions ? `<div class="page-actions">${actions}</div>` : ''}</header>`;
const empty = (icon, title, text, cta = '') => `<div class="empty-state">${ic(icon, 'h-8 w-8')}<h3 class="text-lg">${title}</h3><p>${text}</p>${cta}</div>`;

function facts(b) {
  const m = movieOf(b);
  return `<dl class="bk-facts"><div><dt>Date</dt><dd>${dateShort(dateOf(b))}</dd></div><div><dt>Showtime</dt><dd>${b.time}</dd></div><div><dt>Format</dt><dd>${b.format}</dd></div>
<div><dt>Screen</dt><dd>${b.screen}</dd></div><div><dt>Seats</dt><dd>${b.seats.join(', ')}</dd></div><div><dt>Tickets</dt><dd>${tickets(b)}</dd></div></dl>`;
}
function bookingCard(b, withCancel) {
  const m = movieOf(b);
  return `<article class="panel booking-card" data-booking="${b.id}"><div class="media media-poster">${art(`${m.id}-poster`, 'portrait', `${m.title} poster`)}</div>
<div class="bk-body"><div class="bk-head"><h3 class="text-xl">${m.title}</h3>${badge(b.status)}</div>
<p class="meta">${m.genres.join(' · ')} · ${m.runtime} · ${m.cert} · ${m.language}</p><p class="bk-ref">Booking ${b.id}${when(b) ? ` · ${when(b)}` : ''}</p>${facts(b)}
<div class="bk-actions"><a class="btn btn-primary btn-sm" href="#details/${b.id}">View Details</a>${withCancel ? `<button class="btn btn-secondary btn-sm" type="button" data-cancel="${b.id}">Cancel Booking</button>` : ''}</div></div></article>`;
}

async function cancelBooking(id, ctx) {
  const b = bookings().find((x) => x.id === id);
  const m = movieOf(b);
  const ok = await confirmDialog({ title: 'Cancel this booking?', text: `${m.title}, ${dateShort(dateOf(b))} at ${b.time}. This booking will move to your history as cancelled.`, confirmLabel: 'Cancel Booking', cancelLabel: 'Keep Booking' });
  if (!ok) return;
  const note = { id: `c-${id}-${Date.now()}`, type: 'booking', hoursAgo: 0, title: `Booking ${id} cancelled`, text: `${m.title} on ${dateShort(dateOf(b))} at ${b.time} has been cancelled.` };
  commit({ cancelled: [...state.cancelled, id], notifs: [note, ...state.notifs] });
  toast('Booking cancelled.');
  ctx.refresh();
}
const bindCancel = (el, ctx) => el.addEventListener('click', (e) => { const c = e.target.closest('[data-cancel]'); if (c) cancelBooking(c.dataset.cancel, ctx); });

/* ---------- 1. Overview ---------- */
function overview(ctx) {
  const p = profile();
  const ups = upcoming();
  const next = ups[0];
  const all = bookings();
  const watched = all.filter((b) => b.status === 'watched').length;
  const nextHtml = next
    ? (() => { const m = movieOf(next); return `<section class="panel next-card" aria-labelledby="next-title"><div class="media media-poster">${art(`${m.id}-poster`, 'portrait', `${m.title} poster`)}</div>
<div class="bk-body"><p class="eyebrow" id="next-title">Your next booking</p><h2 class="text-2xl mt-1">${m.title}</h2><p class="meta">${m.genres.join(' · ')} · ${m.runtime} · ${m.cert}</p>
<p class="countdown-chip">${ic('clock', 'h-4 w-4')}${when(next)}, ${dateLong(dateOf(next))} at ${next.time}</p>${facts(next)}
<div class="bk-actions"><a class="btn btn-primary btn-sm" href="#details/${next.id}">View Details</a><a class="btn btn-secondary btn-sm" href="#bookings">All Bookings</a></div></div></section>`; })()
    : `<section class="panel next-empty">${empty('ticket', 'No upcoming bookings', 'Pick a film and showtime to plan your next night out.', '<a class="btn btn-primary btn-sm" href="showtimes.html">Browse Showtimes</a>')}</section>`;
  const stat = (icon, label, value, href) => `<a class="stat-tile" href="${href}"><span class="stat-ic">${ic(icon)}</span><span class="stat-val">${value}</span><span class="stat-lbl">${label}</span></a>`;
  const recent = [...bookings()].sort((a, b) => b.day - a.day).slice(0, 4);
  const html = `${head('Overview', `Welcome back, ${esc(p.name.split(' ')[0])}`, 'Here is what is happening with your bookings and rewards.', '<a class="btn btn-primary btn-sm" href="showtimes.html">Book Tickets</a>')}
<div class="ov-grid">${nextHtml}
<section class="panel points-card" aria-labelledby="pts-title"><p class="eyebrow" id="pts-title">${esc(p.tier)} member</p><p class="points-num">${points().toLocaleString('en-US')}<span>points</span></p>
<progress class="meter" max="${POINTS.nextAt}" value="${points()}" aria-label="Progress to ${POINTS.nextTier}"></progress>
<p class="meta">${(POINTS.nextAt - points()).toLocaleString('en-US')} points to ${POINTS.nextTier}</p><a class="btn btn-secondary btn-sm" href="#rewards">View Rewards</a></section></div>
<div class="stat-grid">${stat('ticket', 'Total bookings', all.length, '#history')}${stat('calendar', 'Upcoming', ups.length, '#bookings')}${stat('film', 'Films watched', watched, '#history')}${stat('star', 'Reward points', points().toLocaleString('en-US'), '#rewards')}</div>
<div class="ov-bottom"><section class="panel" aria-labelledby="qa-title"><h2 class="panel-title" id="qa-title">Quick actions</h2><div class="quick-grid">
<a class="quick" href="showtimes.html">${ic('ticket')}<span>Book tickets</span></a><a class="quick" href="#bookings">${ic('receipt')}<span>My bookings</span></a><a class="quick" href="#rewards">${ic('gift')}<span>Offers &amp; rewards</span></a><a class="quick" href="#support">${ic('help')}<span>Get help</span></a></div></section>
<section class="panel" aria-labelledby="act-title"><h2 class="panel-title" id="act-title">Recent activity</h2><ul class="activity">${recent.map((b) => { const m = movieOf(b); return `<li><a href="#details/${b.id}"><span><strong>${m.title}</strong><small>${dateShort(dateOf(b))} · ${b.time} · ${b.format}</small></span>${badge(b.status)}</a></li>`; }).join('')}</ul></section></div>`;
  return { title: 'Overview', html, };
}

/* ---------- 2. My Bookings ---------- */
function myBookings(ctx) {
  const ups = upcoming();
  const html = `${head('My bookings', 'Upcoming Bookings', 'Your next shows at Lumora.', '<a class="btn btn-primary btn-sm" href="showtimes.html">Book Tickets</a>')}
${ups.length ? `<div class="bk-grid">${ups.map((b) => bookingCard(b, true)).join('')}</div>` : `<div class="panel">${empty('ticket', 'No upcoming bookings', 'When you book a film it will appear here.', '<a class="btn btn-primary btn-sm" href="showtimes.html">Browse Showtimes</a>')}</div>`}`;
  return { title: 'My Bookings', html, mount: (el) => bindCancel(el, ctx) };
}

/* ---------- 3. Booking History ---------- */
function bookingHistory() {
  const list = history();
  const html = `${head('Booking history', 'Previous Bookings', 'Everything you have watched or cancelled.')}
<div class="toolbar"><div class="search"><label class="sr-only" for="h-search">Search history</label>${ic('search', 'h-4 w-4')}<input class="input" id="h-search" type="search" placeholder="Search by film or reference"></div>
<div class="chips-filter" role="group" aria-label="Filter by status">${['All', 'Watched', 'Cancelled'].map((f, i) => `<button type="button" class="chip-btn" data-status="${f.toLowerCase()}" aria-pressed="${i === 0}">${f}</button>`).join('')}</div></div>
<div class="panel table-panel"><table class="data-table"><thead><tr><th>Film</th><th>Date</th><th>Showtime</th><th>Format</th><th>Tickets</th><th>Amount</th><th>Status</th><th><span class="sr-only">Details</span></th></tr></thead>
<tbody>${list.map((b) => { const m = movieOf(b); return `<tr data-status="${b.status}" data-text="${(m.title + ' ' + b.id).toLowerCase()}"><td data-label="Film"><strong>${m.title}</strong><small>${b.id}</small></td><td data-label="Date">${dateShort(dateOf(b))}</td><td data-label="Showtime">${b.time}</td><td data-label="Format">${b.format}</td><td data-label="Tickets">${tickets(b)}</td><td data-label="Amount">${money(total(b))}</td><td data-label="Status">${badge(b.status)}</td><td class="cell-action"><a class="btn btn-secondary btn-sm" href="#details/${b.id}">Details</a></td></tr>`; }).join('')}</tbody></table>
<p class="empty-row" hidden>No bookings match your filters.</p></div>`;
  return {
    title: 'Booking History', html,
    mount: (el) => {
      let status = 'all'; let q = '';
      const rows = [...el.querySelectorAll('tbody tr')];
      const apply = () => {
        let n = 0;
        rows.forEach((r) => { const show = (status === 'all' || r.dataset.status === status) && r.dataset.text.includes(q); r.hidden = !show; if (show) n++; });
        el.querySelector('.empty-row').hidden = n > 0;
      };
      el.querySelector('.chips-filter').addEventListener('click', (e) => { const b = e.target.closest('[data-status]'); if (!b) return; status = b.dataset.status; el.querySelectorAll('[data-status].chip-btn').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); apply(); });
      el.querySelector('#h-search').addEventListener('input', (e) => { q = e.target.value.trim().toLowerCase(); apply(); });
    },
  };
}

/* ---------- 4. Booking Details ---------- */
function icsFor(b) {
  const m = movieOf(b); const d = dateOf(b); const [h, mi] = b.time.split(':').map(Number);
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = (date, hh, mm) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hh)}${pad(mm)}00`;
  const [, rh, rm] = m.runtime.match(/(\d+)h\s*(\d+)m/);
  const end = new Date(d); end.setHours(h, mi + Number(rh) * 60 + Number(rm));
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lumora Cinemas//EN', 'BEGIN:VEVENT', `UID:${b.id}@lumoracinemas.com`, `DTSTAMP:${stamp(new Date(), new Date().getHours(), new Date().getMinutes())}`,
    `DTSTART:${stamp(d, h, mi)}`, `DTEND:${stamp(end, end.getHours(), end.getMinutes())}`, `SUMMARY:${m.title} (${b.format})`, `LOCATION:${contact.name}\\, ${contact.address}`,
    `DESCRIPTION:Booking ${b.id}. ${b.screen}, seats ${b.seats.join(' ')}.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}
function details(ctx, arg) {
  const all = bookings();
  const b = all.find((x) => x.id === arg) || upcoming()[0] || all[0];
  const m = movieOf(b);
  const html = `${head('Booking details', 'Ticket Information', 'Review the full details of a booking.')}
<div class="toolbar"><label class="sr-only" for="d-select">Choose a booking</label><select class="input select-wide" id="d-select">${all.map((x) => `<option value="${x.id}"${x.id === b.id ? ' selected' : ''}>${x.id} · ${movieOf(x).title} · ${dateShort(dateOf(x))}</option>`).join('')}</select></div>
<div class="detail-grid"><section class="panel ticket" aria-labelledby="t-title"><div class="media media-poster">${art(`${m.id}-poster`, 'portrait', `${m.title} poster`)}</div>
<div class="ticket-body"><div class="bk-head"><h2 class="text-2xl" id="t-title">${m.title}</h2>${badge(b.status)}</div><p class="meta">${m.genres.join(' · ')} · ${m.runtime} · ${m.cert} · ${m.language}</p>
<p class="ticket-ref">Booking reference <strong>${b.id}</strong></p>${facts(b)}
<ul class="benefits ticket-notes"><li>Doors open 30 minutes before the showtime.</li><li>Show your booking reference at the entrance.</li><li>Seats are assigned to this booking only.</li></ul>
<div class="bk-actions no-print"><button class="btn btn-primary btn-sm" type="button" data-print>${ic('print', 'h-4 w-4')}Print Ticket</button><button class="btn btn-secondary btn-sm" type="button" data-ics>${ic('download', 'h-4 w-4')}Add to Calendar</button>${b.status === 'upcoming' ? `<button class="btn btn-secondary btn-sm" type="button" data-cancel="${b.id}">Cancel Booking</button>` : ''}</div></div></section>
<div class="detail-side"><section class="panel" aria-labelledby="th-title"><h2 class="panel-title" id="th-title">Theatre</h2><p class="font-semibold">${contact.name}</p><p class="text-[var(--muted)]">${contact.address}</p><p class="text-[var(--muted)] mt-2">${b.screen} · ${b.format}</p>
<a class="btn btn-secondary btn-sm mt-4" href="contact.html#location">${ic('pin', 'h-4 w-4')}Get Directions</a></section>
<section class="panel" aria-labelledby="sum-title"><h2 class="panel-title" id="sum-title">Booking summary</h2><dl class="summary">
<div><dt>${tickets(b)} × ${b.format} ticket (${money(PRICE[b.format])})</dt><dd>${money(subtotal(b))}</dd></div><div><dt>Booking fee (${money(FEE_PER_TICKET)} each)</dt><dd>${money(fee(b))}</dd></div><div class="sum-total"><dt>Total</dt><dd>${money(total(b))}</dd></div></dl>
<p class="meta mt-3">Points for this visit: ${Math.floor(total(b))}</p></section></div></div>`;
  return {
    title: 'Booking Details', html,
    mount: (el) => {
      bindCancel(el, ctx);
      el.querySelector('#d-select').addEventListener('change', (e) => { location.hash = `#details/${e.target.value}`; });
      el.querySelector('[data-print]').addEventListener('click', () => window.print());
      el.querySelector('[data-ics]').addEventListener('click', () => {
        const url = URL.createObjectURL(new Blob([icsFor(b)], { type: 'text/calendar' }));
        const a = document.createElement('a'); a.href = url; a.download = `${b.id}.ics`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        toast('Calendar file downloaded.');
      });
    },
  };
}

/* ---------- 5. Offers & Rewards ---------- */
function rewards(ctx) {
  const p = profile();
  const tier = TIERS.find((t) => t.name === p.tier) || TIERS[1];
  const html = `${head('Offers & rewards', 'Rewards and Offers', 'Earn points on every visit and save with member offers.')}
<div class="rw-top"><section class="panel points-card" aria-labelledby="rp-title"><p class="eyebrow" id="rp-title">${esc(p.tier)} member since ${p.since}</p><p class="points-num">${points().toLocaleString('en-US')}<span>points</span></p>
<progress class="meter" max="${POINTS.nextAt}" value="${points()}" aria-label="Progress to ${POINTS.nextTier}"></progress><p class="meta">${(POINTS.nextAt - points()).toLocaleString('en-US')} points to ${POINTS.nextTier}</p><p class="meta">Member ID ${p.memberId}</p></section>
<section class="panel" aria-labelledby="mb-title"><h2 class="panel-title" id="mb-title">${esc(tier.name)} membership benefits</h2><ul class="benefits">${tier.perks.map((x) => `<li>${x}</li>`).join('')}<li>Members-only previews</li></ul></section></div>
<h2 class="section-title">Redeem points</h2><div class="rw-grid">${REWARD_ITEMS.map((r) => `<article class="panel reward"><h3 class="text-lg">${r.title}</h3><p class="text-sm text-[var(--muted)]">${r.text}</p><p class="reward-cost">${r.cost.toLocaleString('en-US')} points</p>
<button class="btn btn-secondary btn-sm" type="button" data-redeem="${r.id}"${points() < r.cost ? ' disabled' : ''}>${points() < r.cost ? 'Not enough points' : 'Redeem'}</button></article>`).join('')}</div>
<h2 class="section-title">Available offers</h2><div class="rw-grid">${OFFERS.map((o) => { const saved = state.saved.includes(o.key); return `<article class="panel offer"><span class="badge">${o.badge}</span><h3 class="text-lg mt-3">${o.title}</h3><p class="text-sm text-[var(--muted)]">${o.text}</p>
<p class="code"><span>Code</span><strong>${OFFER_CODES[o.key]}</strong></p><div class="offer-actions"><button class="btn btn-secondary btn-sm" type="button" data-copy="${OFFER_CODES[o.key]}">${ic('copy', 'h-4 w-4')}Copy Code</button><button class="btn ${saved ? 'btn-primary' : 'btn-secondary'} btn-sm" type="button" data-save="${o.key}" aria-pressed="${saved}">${saved ? 'Saved' : 'Save Offer'}</button></div></article>`; }).join('')}</div>`;
  return {
    title: 'Offers & Rewards', html,
    mount: (el) => {
      el.addEventListener('click', async (e) => {
        const c = e.target.closest('[data-copy]');
        if (c) { try { await navigator.clipboard.writeText(c.dataset.copy); toast(`Code ${c.dataset.copy} copied.`); } catch { toast(`Your code is ${c.dataset.copy}.`); } return; }
        const s = e.target.closest('[data-save]');
        if (s) { const on = !state.saved.includes(s.dataset.save); commit({ saved: on ? [...state.saved, s.dataset.save] : state.saved.filter((x) => x !== s.dataset.save) }); toast(on ? 'Offer saved to your account.' : 'Offer removed.'); ctx.refresh(); return; }
        const r = e.target.closest('[data-redeem]');
        if (r) {
          const item = REWARD_ITEMS.find((x) => x.id === r.dataset.redeem);
          const ok = await confirmDialog({ title: `Redeem ${item.title}?`, text: `${item.cost.toLocaleString('en-US')} points will be used from your balance.`, confirmLabel: 'Redeem', cancelLabel: 'Not Now' });
          if (!ok) return;
          const note = { id: `r-${item.id}-${Date.now()}`, type: 'offer', hoursAgo: 0, title: `${item.title} redeemed`, text: `${item.cost.toLocaleString('en-US')} points were used. Show your member ID at the counter.` };
          commit({ extraPoints: state.extraPoints - item.cost, redeemed: [...state.redeemed, item.id], notifs: [note, ...state.notifs] });
          toast(`${item.title} redeemed.`); ctx.refresh();
        }
      });
    },
  };
}

/* ---------- 6. My Profile ---------- */
function profileView(ctx) {
  const p = profile();
  const html = `${head('My profile', 'Personal Information', 'Keep your details up to date.')}
<div class="profile-grid"><aside class="panel member-panel"><span class="avatar avatar-lg" aria-hidden="true">${initials(p.name)}</span><h2 class="text-xl mt-3">${esc(p.name)}</h2><p class="text-[var(--muted)]">${esc(p.email)}</p>
<dl class="member-facts"><div><dt>Membership</dt><dd>${esc(p.tier)}</dd></div><div><dt>Member ID</dt><dd>${p.memberId}</dd></div><div><dt>Member since</dt><dd>${p.since}</dd></div><div><dt>Points</dt><dd>${points().toLocaleString('en-US')}</dd></div></dl></aside>
<form class="panel profile-form" id="profile-form" novalidate aria-label="Profile form"><div class="form-grid">
${fieldHtml('p-name', 'Full name *', `<input class="input" id="p-name" type="text" autocomplete="name" value="${esc(p.name)}" required aria-describedby="p-name-error">`)}
${fieldHtml('p-email', 'Email address *', `<input class="input" id="p-email" type="email" autocomplete="email" value="${esc(p.email)}" required aria-describedby="p-email-error">`)}
${fieldHtml('p-mobile', 'Mobile number', `<input class="input" id="p-mobile" type="tel" autocomplete="tel" value="${esc(p.mobile)}" aria-describedby="p-mobile-error">`)}
${fieldHtml('p-dob', 'Date of birth', `<input class="input" id="p-dob" type="date" value="${p.dob}" max="${new Date().toISOString().slice(0, 10)}" aria-describedby="p-dob-error">`)}
${fieldHtml('p-city', 'City', `<input class="input" id="p-city" type="text" autocomplete="address-level2" value="${esc(p.city)}" aria-describedby="p-city-error">`)}
${fieldHtml('p-format', 'Preferred format', `<select class="input" id="p-format" aria-describedby="p-format-error">${Object.keys(PRICE).map((f) => `<option${f === p.format ? ' selected' : ''}>${f}</option>`).join('')}</select>`)}
<fieldset class="field col-full"><legend>Favourite genres</legend><div class="check-row">${GENRES.map((g) => `<label class="check"><input type="checkbox" name="genre" value="${g}"${p.genres.includes(g) ? ' checked' : ''}><span>${g}</span></label>`).join('')}</div></fieldset>
<fieldset class="field col-full"><legend>Notifications</legend><div class="check-row"><label class="check"><input type="checkbox" id="p-email-up"${p.emailUpdates ? ' checked' : ''}><span>Email updates</span></label><label class="check"><input type="checkbox" id="p-sms"${p.smsReminders ? ' checked' : ''}><span>Text reminders</span></label></div></fieldset></div>
<div class="form-actions"><button class="btn btn-primary" type="submit">Save Changes</button><button class="btn btn-secondary" type="button" data-reset>Reset</button></div></form></div>`;
  return {
    title: 'My Profile', html,
    mount: (el) => {
      const form = el.querySelector('#profile-form');
      const validate = bindValidation(el, {
        'p-name': (x) => (x.value.trim().length < 2 ? 'Please enter your full name.' : ''),
        'p-email': (x) => (rules.email(x.value) ? '' : 'Please enter a valid email address.'),
        'p-mobile': (x) => (!x.value.trim() || rules.mobile(x.value) ? '' : 'Please enter a valid mobile number.'),
        'p-dob': (x) => (x.value && new Date(x.value) > new Date() ? 'Date of birth cannot be in the future.' : ''),
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validate()) { toast('Please fix the highlighted fields.', 'error'); return; }
        commit({ profile: {
          name: form.querySelector('#p-name').value.trim(), email: form.querySelector('#p-email').value.trim(), mobile: form.querySelector('#p-mobile').value.trim(),
          dob: form.querySelector('#p-dob').value, city: form.querySelector('#p-city').value.trim(), format: form.querySelector('#p-format').value,
          genres: [...form.querySelectorAll('[name=genre]:checked')].map((c) => c.value), emailUpdates: form.querySelector('#p-email-up').checked, smsReminders: form.querySelector('#p-sms').checked,
        } });
        toast('Profile saved.'); ctx.refresh(true);
      });
      form.querySelector('[data-reset]').addEventListener('click', () => { commit({ profile: null }); toast('Profile reset to your saved details.'); ctx.refresh(true); });
    },
  };
}

/* ---------- 7. Notifications ---------- */
const NTYPE = { booking: 'Booking', offer: 'Offer', announcement: 'Announcement' };
function notificationsView(ctx) {
  const list = notifications();
  const html = `${head('Notifications', 'Updates and Announcements', 'Booking updates and news from Lumora.', `<button class="btn btn-secondary btn-sm" type="button" data-readall>${ic('check', 'h-4 w-4')}Mark All as Read</button>`)}
<div class="chips-filter notif-filter" role="group" aria-label="Filter notifications">${['All', 'Unread', 'Booking', 'Offer', 'Announcement'].map((f, i) => `<button type="button" class="chip-btn" data-nf="${f.toLowerCase()}" aria-pressed="${i === 0}">${f === 'Booking' ? 'Bookings' : f === 'Offer' ? 'Offers' : f === 'Announcement' ? 'Announcements' : f}</button>`).join('')}</div>
<ul class="notif-list">${list.map((n) => `<li data-type="${n.type}" data-read="${n.read}"><button type="button" class="notif" data-nid="${n.id}" aria-label="${esc(n.title)}${n.read ? '' : ', unread'}"><span class="notif-dot" aria-hidden="true"></span><span class="notif-main"><strong>${esc(n.title)}</strong><span>${esc(n.text)}</span></span><span class="notif-meta"><small>${NTYPE[n.type]}</small><small>${ago(n.hoursAgo)}</small></span></button></li>`).join('')}</ul>
<p class="empty-row" hidden>No notifications here.</p>`;
  return {
    title: 'Notifications', html,
    mount: (el) => {
      let f = 'all';
      const apply = () => { let n = 0; el.querySelectorAll('.notif-list li').forEach((li) => { const show = f === 'all' || (f === 'unread' ? li.dataset.read === 'false' : li.dataset.type === f); li.hidden = !show; if (show) n++; }); el.querySelector('.empty-row').hidden = n > 0; };
      el.querySelector('.notif-filter').addEventListener('click', (e) => { const b = e.target.closest('[data-nf]'); if (!b) return; f = b.dataset.nf; el.querySelectorAll('[data-nf]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); apply(); });
      el.querySelector('.notif-list').addEventListener('click', (e) => {
        const b = e.target.closest('[data-nid]'); if (!b) return;
        const id = b.dataset.nid;
        const li = b.closest('li');
        const nowRead = li.dataset.read === 'false';
        commit({ read: nowRead ? [...new Set([...state.read, id])] : state.read.filter((x) => x !== id) });
        li.dataset.read = String(nowRead);
        ctx.chrome(); apply();
      });
      el.querySelector('[data-readall]').addEventListener('click', () => { commit({ read: notifications().map((n) => n.id) }); toast('All notifications marked as read.'); ctx.refresh(); });
    },
  };
}

/* ---------- 8. Help & Support ---------- */
function support() {
  const all = bookings();
  const html = `${head('Help & support', 'How Can We Help?', 'Answers, contact details and a direct line to our team.')}
<div class="help-cards">
<article class="panel info-mini">${ic('phone', 'h-6 w-6')}<h3 class="text-lg">Call us</h3><p><a href="tel:${contact.phone.replace(/[^+\d]/g, '')}" dir="ltr">${contact.phone}</a></p><p class="meta">${contact.hours}</p></article>
<article class="panel info-mini">${ic('mail', 'h-6 w-6')}<h3 class="text-lg">Email us</h3><p><a href="mailto:${contact.supportEmail}">${contact.supportEmail}</a></p><p class="meta">Replies within one working day</p></article>
<article class="panel info-mini">${ic('pin', 'h-6 w-6')}<h3 class="text-lg">Visit us</h3><p>${contact.name}</p><p class="meta">${contact.address}</p></article></div>
<div class="help-grid"><section aria-labelledby="faq-title"><h2 class="section-title" id="faq-title">Frequently asked questions</h2><div class="faq-list">${FAQS.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>
<form class="panel support-form" id="support-form" novalidate aria-label="Support request"><h2 class="panel-title">Contact support</h2><div class="form-stack">
${fieldHtml('s-topic', 'Topic *', '<select class="input" id="s-topic" required aria-describedby="s-topic-error"><option value="">Select a topic</option><option>A booking</option><option>Rewards and offers</option><option>My account</option><option>Accessibility</option><option>Something else</option></select>')}
${fieldHtml('s-ref', 'Related booking', `<select class="input" id="s-ref" aria-describedby="s-ref-error"><option value="">None</option>${all.map((b) => `<option value="${b.id}">${b.id} · ${movieOf(b).title}</option>`).join('')}</select>`)}
${fieldHtml('s-message', 'Message *', '<textarea class="input" id="s-message" rows="5" required aria-describedby="s-message-error"></textarea>')}</div>
<button class="btn btn-primary" type="submit">Send Message</button><p class="form-status" id="s-status" role="status" aria-live="polite" hidden></p></form></div>`;
  return {
    title: 'Help & Support', html,
    mount: (el) => {
      const form = el.querySelector('#support-form'); const status = el.querySelector('#s-status');
      const validate = bindValidation(el, {
        's-topic': (x) => (x.value ? '' : 'Please choose a topic.'),
        's-message': (x) => (x.value.trim().length < 15 ? 'Please write at least 15 characters.' : ''),
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault(); status.hidden = false;
        if (!validate()) { status.className = 'form-status is-error'; status.textContent = 'Please check the highlighted fields.'; return; }
        status.className = 'form-status is-success'; status.textContent = 'Thank you. Our team will reply within one working day.'; toast('Message sent to support.'); form.reset();
      });
    },
  };
}

export const ROUTES = [
  { id: 'overview', label: 'Overview', icon: 'grid', view: overview },
  { id: 'bookings', label: 'My Bookings', icon: 'ticket', view: myBookings },
  { id: 'history', label: 'Booking History', icon: 'history', view: bookingHistory },
  { id: 'details', label: 'Booking Details', icon: 'receipt', view: details },
  { id: 'rewards', label: 'Offers & Rewards', icon: 'gift', view: rewards },
  { id: 'profile', label: 'My Profile', icon: 'user', view: profileView },
  { id: 'notifications', label: 'Notifications', icon: 'bell', view: notificationsView },
  { id: 'support', label: 'Help & Support', icon: 'help', view: support },
];
