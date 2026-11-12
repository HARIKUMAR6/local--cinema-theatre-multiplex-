/* Emblem logo, inlined so it follows currentColor / theme. Mirrors assets/logo/lumora-emblem.svg */
let n = 0;

export function emblem(cls = 'h-11 w-11') {
  const id = `ring${n++}`;
  const blades = [0, 45, 90, 135, 180, 225, 270, 315]
    .map((r) => `<path transform="rotate(${r})" d="M0-27 L9-9 L0 0 L-9-9Z" opacity="${r % 90 ? '.75' : '.95'}"/>`)
    .join('');
  return `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
<defs><path id="${id}" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0"/></defs>
<circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="1"/>
<text font-family="Georgia,serif" font-size="9" letter-spacing="3.2" fill="currentColor"><textPath href="#${id}" startOffset="2%">LUMORA ✦ CINEMAS ✦ LUMORA ✦</textPath></text>
<g fill="currentColor" transform="translate(60 62)">${blades}</g>
<circle cx="60" cy="62" r="6" style="fill:var(--logo-core)"/>
<path d="M42 30 Q60 14 78 30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
<path d="M60 10 L63 17 L57 17Z" fill="currentColor"/></svg>`;
}
