import { renderLayout } from './modules/layout.js';
import { initTheme } from './modules/theme.js';
import { initDirection } from './modules/direction.js';
import { initNav } from './modules/nav.js';
import { initScrollTop } from './modules/scroll-top.js';

renderLayout();

/* Page content module is chosen by <main data-page="...">. */
const main = document.getElementById('main');
if (main && main.dataset.page) {
  const page = await import(`./pages/${main.dataset.page}.js`);
  page.render(main);
}

initTheme();
initDirection();
initNav();
initScrollTop();
