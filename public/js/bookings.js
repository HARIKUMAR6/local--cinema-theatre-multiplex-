/* Moviegoer account data: one source for every dashboard module.
   Movie details come from movies.js; theatre and contact details come from data.js. */
import { NOW_SHOWING, OFFERS, TIERS } from './movies.js';

export const PRICE = { Standard: 12, 'Dolby Atmos': 15, IMAX: 18, '4DX': 20 };
export const FEE_PER_TICKET = 1.5;

export const USER = {
  name: 'Jordan Reyes',
  email: 'jordan.reyes@inbox.com',
  mobile: '+1 (415) 555-0123',
  dob: '1992-04-18',
  city: 'San Francisco',
  format: 'IMAX',
  genres: ['Sci-Fi', 'Drama'],
  emailUpdates: true,
  smsReminders: true,
  memberId: 'LC-2048-7731',
  tier: 'Gold',
  since: 2023,
};

export const POINTS = { balance: 2450, nextTier: 'Platinum', nextAt: 5000 };

const b = (id, movieId, day, time, format, screen, seats, status) => ({ id, movieId, day, time, format, screen, seats, status });
export const BOOKINGS = [
  b('LUM-48213', 'midnight-meridian', 2, '20:45', 'IMAX', 'Screen 1', ['H7', 'H8'], 'upcoming'),
  b('LUM-48377', 'echoes-of-ember', 9, '17:00', '4DX', 'Screen 6', ['E4', 'E5', 'E6'], 'upcoming'),
  b('LUM-47102', 'the-last-lantern', -6, '16:10', 'Dolby Atmos', 'Screen 3', ['F9', 'F10'], 'watched'),
  b('LUM-46655', 'paper-moons', -19, '13:45', 'Standard', 'Screen 5', ['C3', 'C4'], 'watched'),
  b('LUM-46012', 'crimson-tide-rising', -33, '21:45', '4DX', 'Screen 6', ['G1'], 'watched'),
  b('LUM-45288', 'velvet-hour', -52, '18:00', 'Dolby Atmos', 'Screen 3', ['D6', 'D7'], 'watched'),
  b('LUM-44970', 'iron-valley', -70, '15:30', 'Standard', 'Screen 5', ['B5'], 'cancelled'),
];

export const movieOf = (bk) => NOW_SHOWING.find((m) => m.id === bk.movieId);
export const dateOf = (bk) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + bk.day); return d; };
export const tickets = (bk) => bk.seats.length;
export const subtotal = (bk) => tickets(bk) * PRICE[bk.format];
export const fee = (bk) => tickets(bk) * FEE_PER_TICKET;
export const total = (bk) => subtotal(bk) + fee(bk);
export const money = (n) => `$${n.toFixed(2)}`;

export const REWARD_ITEMS = [
  { id: 'popcorn', title: 'Regular popcorn', cost: 500, text: 'A fresh regular popcorn at the concession counter.' },
  { id: 'upgrade', title: 'Format upgrade', cost: 800, text: 'Upgrade one ticket to IMAX or Dolby Atmos.' },
  { id: 'ticket', title: 'Free standard ticket', cost: 1200, text: 'One standard ticket for any 2D showing.' },
];

export const OFFER_CODES = { tuesday: 'TUESDAY50', student: 'STUDENT30', family: 'FAMILY4' };
export { OFFERS, TIERS };

export const NOTIFICATIONS = [
  { id: 'n1', type: 'booking', hoursAgo: 3, title: 'Your IMAX show is coming up', text: 'Midnight Meridian starts in two days at 20:45 in Screen 1. Seats H7 and H8.' },
  { id: 'n2', type: 'offer', hoursAgo: 20, title: 'Gold members: free upgrade this month', text: 'Upgrade one ticket to IMAX or Dolby Atmos at no extra cost.' },
  { id: 'n3', type: 'announcement', hoursAgo: 48, title: 'New releases arriving in December', text: 'Aurora Protocol opens on December 4. Reminders are available on the Coming Soon page.' },
  { id: 'n4', type: 'booking', hoursAgo: 96, title: 'Reminder set for Echoes of Ember', text: 'We will remind you the day before your 4DX showing.' },
  { id: 'n5', type: 'announcement', hoursAgo: 170, title: 'Extended opening hours', text: 'Late shows now run until 01:00 every day at Lumora Union Square.' },
  { id: 'n6', type: 'offer', hoursAgo: 240, title: 'You earned 120 points', text: 'Points from your last visit have been added to your balance.' },
  { id: 'n7', type: 'announcement', hoursAgo: 400, title: 'Dolby Atmos upgrade in Screen 3', text: 'Screen 3 now has a refreshed Atmos speaker array.' },
];

export const FAQS = [
  ['How do I change or cancel a booking?', 'Open My Bookings, choose the booking and select Cancel Booking. Exchanges are possible up to 2 hours before the show.'],
  ['When do reward points reach my balance?', 'Points are added after each film you watch and appear in Offers & Rewards within a day.'],
  ['How do I use an offer code?', 'Copy the code from Offers & Rewards and enter it when you choose your tickets.'],
  ['Can I update my contact details?', 'Yes. Open My Profile, edit your details and save.'],
  ['What if I cannot find my ticket?', 'Open Booking Details for the show to see your reference, seats and showtime at any time.'],
  ['Are the theatres accessible?', 'All Lumora theatres offer step-free access, wheelchair spaces and companion seating. Contact support to arrange anything in advance.'],
];
