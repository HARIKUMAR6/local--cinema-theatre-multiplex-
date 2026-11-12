/* Original generated artwork. Every seed yields a unique composition, so no image repeats.
   Original work: no third-party images and no licensing concerns. */
import { PHOTOS } from './photos.js';

const hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
const rng = (seed) => {
  let a = hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const f = (n) => Math.round(n * 10) / 10;

const MOTIFS = ['mountains', 'city', 'portal', 'beams', 'dunes', 'pines'];

function motif(kind, r, W, H, c) {
  const horizon = H * (0.6 + r() * 0.12);
  let o = '';
  const cx = W * (0.3 + r() * 0.4);
  if (kind === 'mountains') {
    o += `<circle cx="${f(cx)}" cy="${f(H * 0.38)}" r="${f(W * 0.14)}" fill="${c.glow}" opacity=".9"/>`;
    for (let k = 0; k < 3; k++) {
      let d = `M0 ${H}`; let x = 0;
      while (x < W + 40) { d += ` L${f(x)} ${f(horizon - (k + 1) * H * 0.04 - r() * H * 0.2)}`; x += W * (0.12 + r() * 0.1); }
      o += `<path d="${d} L${W} ${H}Z" fill="${c.layer[k]}"/>`;
    }
  } else if (kind === 'city') {
    o += `<circle cx="${f(cx)}" cy="${f(H * 0.3)}" r="${f(W * 0.09)}" fill="${c.glow}"/>`;
    for (let k = 0; k < 2; k++) {
      let x = -10;
      while (x < W) {
        const w = W * (0.04 + r() * 0.07); const h = H * (0.12 + r() * 0.3) * (k ? 0.7 : 1);
        o += `<rect x="${f(x)}" y="${f(H - h - k * 0 )}" width="${f(w)}" height="${f(h)}" fill="${c.layer[k]}"/>`;
        if (!k && r() > 0.5) o += `<rect x="${f(x + w * 0.3)}" y="${f(H - h + 8)}" width="${f(w * 0.12)}" height="${f(h * 0.5)}" fill="${c.glow}" opacity=".5"/>`;
        x += w + 2;
      }
    }
  } else if (kind === 'portal') {
    for (let k = 0; k < 7; k++) o += `<circle cx="${f(cx)}" cy="${f(H * 0.45)}" r="${f(W * (0.07 + k * 0.06))}" fill="none" stroke="${c.glow}" stroke-width="${f(1 + (7 - k) * 0.8)}" opacity="${f(0.15 + (7 - k) * 0.1)}"/>`;
    o += `<circle cx="${f(cx)}" cy="${f(H * 0.45)}" r="${f(W * 0.05)}" fill="${c.glow}"/>`;
    o += `<path d="M0 ${H} L0 ${f(horizon + H * 0.1)} Q${f(W / 2)} ${f(horizon - H * 0.05)} ${W} ${f(horizon + H * 0.1)} L${W} ${H}Z" fill="${c.layer[0]}"/>`;
  } else if (kind === 'beams') {
    for (let k = 0; k < 6; k++) {
      const a = (r() - 0.5) * W * 1.4;
      o += `<path d="M${f(cx)} ${f(-H * 0.05)} L${f(cx + a - W * 0.08)} ${H} L${f(cx + a + W * 0.08)} ${H}Z" fill="${c.glow}" opacity="${f(0.07 + r() * 0.12)}"/>`;
    }
    o += `<ellipse cx="${f(cx)}" cy="${f(H * 0.9)}" rx="${f(W * 0.4)}" ry="${f(H * 0.05)}" fill="${c.glow}" opacity=".35"/>`;
    o += `<path d="M0 ${H} L0 ${f(horizon + H * 0.15)} L${W} ${f(horizon + H * 0.1)} L${W} ${H}Z" fill="${c.layer[1]}"/>`;
  } else if (kind === 'dunes') {
    o += `<circle cx="${f(cx)}" cy="${f(H * 0.35)}" r="${f(W * 0.12)}" fill="${c.glow}" opacity=".85"/>`;
    for (let k = 0; k < 3; k++) {
      const y = horizon + k * H * 0.08;
      o += `<path d="M0 ${H} L0 ${f(y)} C${f(W * 0.3)} ${f(y - H * (0.05 + r() * 0.1))} ${f(W * 0.6)} ${f(y + H * 0.05)} ${W} ${f(y - H * 0.04)} L${W} ${H}Z" fill="${c.layer[k]}"/>`;
    }
  } else {
    o += `<circle cx="${f(cx)}" cy="${f(H * 0.3)}" r="${f(W * 0.1)}" fill="${c.glow}" opacity=".9"/>`;
    for (let k = 0; k < 2; k++) {
      let x = -10;
      while (x < W) {
        const w = W * (0.06 + r() * 0.06); const h = H * (0.2 + r() * 0.3) * (k ? 0.75 : 1);
        o += `<path d="M${f(x)} ${H} L${f(x + w / 2)} ${f(H - h)} L${f(x + w)} ${H}Z" fill="${c.layer[k]}"/>`;
        x += w * 0.7;
      }
    }
  }
  return o;
}

/* kind: 'portrait' (2:3) or 'wide' (16:9). label is the accessible name (omit for decorative). */
function generate(seed, kind = 'portrait', label = '') {
  const r = rng(seed);
  const W = kind === 'portrait' ? 400 : 800;
  const H = kind === 'portrait' ? 600 : 450;
  const hue = Math.floor(r() * 360);
  const hue2 = (hue + 40 + Math.floor(r() * 80)) % 360;
  const c = {
    glow: `hsl(${hue2} 85% ${62 + Math.floor(r() * 12)}%)`,
    layer: [`hsl(${hue} 45% 22%)`, `hsl(${hue} 50% 14%)`, `hsl(${hue} 55% 9%)`],
  };
  const id = `a${hash(seed).toString(36)}`;
  const kindName = MOTIFS[Math.floor(r() * MOTIFS.length)];
  let stars = '';
  for (let k = 0; k < 28; k++) stars += `<circle cx="${f(r() * W)}" cy="${f(r() * H * 0.5)}" r="${f(0.5 + r() * 1.3)}" fill="#fff" opacity="${f(0.2 + r() * 0.6)}"/>`;
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" ${a11y}>
<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${hue} 60% 10%)"/><stop offset=".6" stop-color="hsl(${hue2} 55% 24%)"/><stop offset="1" stop-color="hsl(${hue} 60% 12%)"/></linearGradient>
<radialGradient id="${id}v" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#${id}s)"/>${stars}${motif(kindName, r, W, H, c)}<rect width="${W}" height="${H}" fill="url(#${id}v)"/></svg>`;
}

/* Real photograph when one exists for the seed; otherwise the generated placeholder. */
export function art(seed, kind = 'portrait', label = '') {
  if (!PHOTOS.has(seed)) return generate(seed, kind, label);
  return `<img class="art" src="public/assets/img/${seed}.jpg" alt="${label}" loading="lazy" decoding="async">`;
}
