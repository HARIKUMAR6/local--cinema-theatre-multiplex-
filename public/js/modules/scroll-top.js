export function initScrollTop() {
  const btn = document.querySelector('[data-scroll-top]');
  if (!btn) return;
  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}
