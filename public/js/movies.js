/* Centralized movie, offer, rewards and experience data (shared by Home 1 and Home 2).
   All titles are fictional. Artwork is generated from seeds (see modules/art.js). */
const m = (id, title, genres, runtime, rating, cert, formats, times, synopsis) =>
  ({ id, title, genres, runtime, rating, cert, formats, times, synopsis });

export const NOW_SHOWING = [
  m('midnight-meridian', 'Midnight Meridian', ['Sci-Fi', 'Thriller'], '2h 18m', 8.7, 'PG-13', ['IMAX', 'Dolby Atmos'], ['11:00', '14:15', '17:30', '20:45'], 'A navigator crosses a vanishing line between two Earths.'),
  m('the-last-lantern', 'The Last Lantern', ['Drama'], '2h 04m', 8.4, 'PG-13', ['Dolby Atmos', 'Standard'], ['10:30', '13:20', '16:10', '19:00'], 'A lighthouse keeper guards one final secret.'),
  m('crimson-tide-rising', 'Crimson Tide Rising', ['Action'], '2h 11m', 8.1, 'R', ['IMAX', '4DX'], ['12:00', '15:15', '18:30', '21:45'], 'A rescue crew races a storm that wants them gone.'),
  m('paper-moons', 'Paper Moons', ['Romance', 'Comedy'], '1h 46m', 7.9, 'PG', ['Standard'], ['11:15', '13:45', '16:15', '18:45'], 'Two origami artists, one very competitive festival.'),
  m('echoes-of-ember', 'Echoes of Ember', ['Fantasy', 'Adventure'], '2h 29m', 8.5, 'PG', ['IMAX', 'Dolby Atmos', '4DX'], ['10:00', '13:30', '17:00', '20:30'], 'An apprentice wakes a dragon that remembers everything.'),
  m('velvet-hour', 'Velvet Hour', ['Mystery', 'Thriller'], '1h 58m', 7.8, 'R', ['Dolby Atmos', 'Standard'], ['12:30', '15:00', '18:00', '21:15'], 'A jazz club, a missing singer, and one long night.'),
  m('starlight-brigade', 'Starlight Brigade', ['Family', 'Animation'], '1h 37m', 8.0, 'G', ['Standard', '4DX'], ['10:00', '12:15', '14:30', '16:45'], 'Tiny astronauts save the biggest birthday ever.'),
  m('hollow-pines', 'Hollow Pines', ['Horror'], '1h 52m', 7.4, 'R', ['Dolby Atmos', 'Standard'], ['19:30', '21:00', '22:30', '23:45'], 'The forest has been counting the campers.'),
  m('neon-requiem', 'Neon Requiem', ['Sci-Fi', 'Action'], '2h 06m', 8.2, 'PG-13', ['IMAX', 'Dolby Atmos'], ['11:45', '15:00', '18:15', '21:30'], 'A courier carries the last human memory through a city of light.'),
  m('saltwater-summer', 'Saltwater Summer', ['Comedy', 'Drama'], '1h 43m', 7.7, 'PG-13', ['Standard'], ['11:00', '13:30', '16:00', '18:30'], 'Three siblings, one beach house, zero plans.'),
  m('iron-valley', 'Iron Valley', ['Action', 'Western'], '2h 15m', 8.0, 'PG-13', ['IMAX', 'Standard'], ['12:15', '15:30', '18:45', '22:00'], 'A retired marshal rides back to a town that never forgot.'),
  m('the-quiet-orchestra', 'The Quiet Orchestra', ['Drama', 'Music'], '2h 01m', 8.6, 'PG', ['Dolby Atmos', 'Standard'], ['10:45', '13:30', '16:15', '19:15'], 'A conductor loses her hearing and finds the music anyway.'),
];

const c = (id, title, genres, date, synopsis) => ({ id, title, genres, date, synopsis });
export const COMING_SOON = [
  c('aurora-protocol', 'Aurora Protocol', ['Sci-Fi'], '2026-12-04', 'Earth’s last signal answers back.'),
  c('winters-gambit', 'Winter’s Gambit', ['Thriller'], '2026-12-11', 'A chess master plays for her life.'),
  c('glass-kingdom', 'Glass Kingdom', ['Fantasy'], '2026-12-18', 'A fragile realm, a shattering prophecy.'),
  c('gingerbread-heist', 'The Gingerbread Heist', ['Family', 'Comedy'], '2026-12-24', 'Holiday crime has never been this sweet.'),
  c('black-orchid', 'Black Orchid', ['Mystery'], '2027-01-08', 'Every bloom hides a motive.'),
  c('tidebreakers', 'Tidebreakers', ['Action', 'Adventure'], '2027-01-15', 'The sea wants its islands back.'),
  c('letters-to-nowhere', 'Letters to Nowhere', ['Romance', 'Drama'], '2027-01-29', 'Forty years of unsent mail, one address.'),
  c('revenant-road', 'Revenant Road', ['Horror'], '2027-02-05', 'Some highways are never empty.'),
];

export const GENRES = ['Action', 'Sci-Fi', 'Drama', 'Comedy', 'Horror', 'Family'];

export const FORMATS = ['All', 'IMAX', 'Dolby Atmos', '4DX', 'Standard'];

export const EXPERIENCE = [
  { key: 'screens', title: 'Laser Screens', stat: '24 m', statLabel: 'widest IMAX screen', text: 'Dual-laser projection with deep blacks and 4K clarity on every seat.' },
  { key: 'sound', title: 'Immersive Sound', stat: '64 ch', statLabel: 'Dolby Atmos objects', text: 'Sound that moves overhead and behind you, tuned by hand for each auditorium.' },
  { key: 'seating', title: 'Premium Seating', stat: '180°', statLabel: 'full-recline loungers', text: 'Heated leather recliners, wide tables and in-seat service at the touch of a button.' },
];

export const OFFERS = [
  { key: 'tuesday', badge: 'Every Tuesday', title: 'Lumora Tuesdays', text: 'Any standard seat for half price, all day.' },
  { key: 'student', badge: 'Students', title: 'Student Pass', text: 'Show a valid ID and save 30% on weekday shows.' },
  { key: 'family', badge: 'Weekends', title: 'Family Bundle', text: 'Four tickets, two popcorns and four drinks in one price.' },
];

export const TIERS = [
  { name: 'Silver', price: 'Free', perks: ['Earn 1 point per $1', 'Birthday ticket', 'Member-only previews'] },
  { name: 'Gold', price: '$49 / year', perks: ['Earn 2 points per $1', 'Free upgrade each month', 'Priority booking'], featured: true },
  { name: 'Platinum', price: '$99 / year', perks: ['Earn 3 points per $1', 'Unlimited lounge access', 'Two guest passes monthly'] },
];

export const MEMBERSHIP_BENEFITS = ['Priority booking', 'Free monthly upgrade', 'Birthday ticket', 'Members-only previews'];

export const HERO = {
  home1: { id: 'midnight-meridian' },
  home2: { id: 'neon-requiem' },
};

/* Spoken language per film (shared by every page that lists movies). */
const LANGUAGE = {
  'paper-moons': 'Japanese · English subtitles',
  'velvet-hour': 'French · English subtitles',
  'the-quiet-orchestra': 'German · English subtitles',
  'black-orchid': 'Spanish · English subtitles',
  'letters-to-nowhere': 'Italian · English subtitles',
};
[...NOW_SHOWING, ...COMING_SOON].forEach((x) => { x.language = LANGUAGE[x.id] || 'English'; });
