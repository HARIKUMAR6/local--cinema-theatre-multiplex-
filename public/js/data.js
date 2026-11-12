/* Single source of truth: brand, theatres, contact, navigation, social. */
export const DATA = {
  brand: {
    name: 'Lumora Cinemas',
    short: 'Lumora',
    tagline: 'Where light becomes story',
    description:
      'Lumora Cinemas — premium multiplex cinema experiences with luxury seating, immersive sound and laser projection.',
    year: new Date().getFullYear(),
  },
  contact: {
    name: 'Lumora Union Square',
    phone: '+1 (415) 555-0142',
    boxOffice: '+1 (415) 555-0178',
    email: 'hello@lumoracinemas.com',
    supportEmail: 'support@lumoracinemas.com',
    address: '245 Grant Avenue, San Francisco, CA 94108',
    hours: 'Daily 10:00 – 01:00',
    /* Map anchor: must stay consistent with `address` above. */
    geo: { lat: 37.789, lon: -122.4058 },
  },
  theatres: [
    { id: 'union-square', name: 'Lumora Union Square', city: 'San Francisco', screens: 12 },
    { id: 'riverside', name: 'Lumora Riverside', city: 'Riverside', screens: 8 },
    { id: 'skyline', name: 'Lumora Skyline IMAX', city: 'Uptown', screens: 6 },
  ],
  /* Header order: nav links -> login -> direction toggle -> theme toggle -> CTA */
  nav: [
    {
      label: 'Home',
      href: '#home',
      children: [
        { label: 'Home 1', href: 'index.html' },
        { label: 'Home 2', href: 'home-2.html' },
      ],
    },
    { label: 'About', href: 'about.html' },
    { label: 'Showtimes', href: 'showtimes.html' },
    { label: 'Coming Soon', href: 'coming-soon.html' },
    { label: 'Contact', href: 'contact.html' },
    { label: 'Dashboard', href: 'dashboard.html' },
  ],
  login: { label: 'Login', href: 'login.html' },
  cta: { label: 'Book Tickets', href: '#book' },
  footerLinks: [
    { title: 'Explore', links: [{ label: 'About', href: 'about.html' }, { label: 'Showtimes', href: 'showtimes.html' }, { label: 'Coming Soon', href: 'coming-soon.html' }] },
    { title: 'Account', links: [{ label: 'Dashboard', href: 'dashboard.html' }, { label: 'Login', href: 'login.html' }, { label: 'Contact', href: 'contact.html' }] },
  ],
  social: [
    { name: 'Instagram', href: '#', path: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01' },
    { name: 'X', href: '#', path: 'M4 4l16 16M20 4L4 20' },
    { name: 'YouTube', href: '#', path: 'M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8zm7 1.5v5l4.5-2.5L10 9.5z' },
  ],
  ui: {
    theme: 'Toggle light / dark theme',
    dir: 'Toggle RTL / LTR direction',
    menu: 'Open menu',
    close: 'Close menu',
    top: 'Back to top',
    skip: 'Skip to content',
    rights: 'All rights reserved.',
  },
};
