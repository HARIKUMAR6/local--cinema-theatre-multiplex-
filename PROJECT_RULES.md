# PROJECT_RULES — LUMORA CINEMAS

## Stack
HTML5 + Tailwind CSS v4 (CLI) + Vanilla JS (ES modules). **Forbidden:** React, Vite, Tailwind Play CDN.

## Scope
- Phase 1: brand, tokens, shared header/footer, theme + direction, nav, UI components, central data.
- Homepage and inner pages are NOT part of Phase 1. `index.html` is a foundation preview only.

## No-rewrite
Preserve existing working files. Edit surgically; never regenerate a working file wholesale.

## Single sources of truth
- Brand / theatres / contact / nav / social: `public/js/data.js` only. Never hardcode in markup.
- Design tokens: `@theme` + semantic variables in `src/css/input.css`.
- Header/footer: `public/js/modules/layout.js` (shared on every page).

## Global development standards
1. Semantic HTML5 landmarks, one `<h1>` per page, skip link.
2. WCAG AA contrast, visible `:focus-visible`, full keyboard support, correct ARIA.
3. Mobile-first responsive; no horizontal overflow at 360px+.
4. Logical CSS properties (`ms-`, `ps-`, `start-`, `text-start`) so RTL works; flip directional icons with `rtl:`.
5. Light/Dark via `data-theme`; RTL/LTR via `dir`; both persisted, no flash on load (inline head script).
6. Respect `prefers-reduced-motion`.
7. No inline styles/handlers, no console errors, no unused deps.
8. Home dropdown opens on click only (no hover).
9. Below `lg`: theme toggle, direction toggle and CTA live inside the full-screen menu.
10. Reusable component classes (`.container-lumora`, `.btn`, `.card`, `.badge`, `.input`, `.icon-btn`) — no copy-pasted utility piles.
11. Meta/OG/favicon on every page; descriptive alt/aria-labels.

## Commands
`npm run build` (CSS) · `npm run dev` (watch) · `npm run serve` (static server)
