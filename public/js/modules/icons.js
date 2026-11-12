/* Small stroke icon set for info/benefit cards. */
const P = {
  pin: 'M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  screen: 'M3 5h18v11H3zM8 20h8M12 16v4',
  sound: 'M4 10v4h4l5 4V6L8 10H4zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11',
  seat: 'M6 11V6a2 2 0 012-2h8a2 2 0 012 2v5M4 11h16v5H4zM6 16v4M18 16v4',
  ticket: 'M4 8a2 2 0 002-2h12a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H6a2 2 0 00-2-2v-2a2 2 0 000-4V8zM14 6v12',
  popcorn: 'M6 10l1.5 10h9L18 10M6 10a3 3 0 013-3 3 3 0 016 0 3 3 0 013 3H6zM10 10l.5 10M14 10l-.5 10',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4',
  leaf: 'M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19c2-4 5-7 9-9',
  gift: 'M4 11h16v9H4zM3 8h18v3H3zM12 8v12M12 8c-2 0-4-1-4-3s3-2 4 1c1-3 4-3 4-1s-2 3-4 3z',
  chat: 'M4 5h16v11H9l-5 4V5z',
};

export const icon = (name, cls = 'h-6 w-6') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name]}"/></svg>`;
