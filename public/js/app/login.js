/* Login portal: sign in, create account and password reset as frontend experiences.
   No public header or footer is rendered here. */
import { DATA } from '../data.js';
import { art } from '../modules/art.js';
import { emblem } from '../modules/logo.js';
import { initTheme } from '../modules/theme.js';
import { initDirection } from '../modules/direction.js';
import { ic, rules, bindValidation, fieldHtml } from './ui.js';
import { setSession, getRemember, setRemember } from './store.js';

const root = document.getElementById('auth');

const GOOGLE = '<svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>';
const APPLE = '<svg class="h-5 w-5" viewBox="0 0 22 24" fill="currentColor" aria-hidden="true"><path d="M16.37 1.43c0 1.14-.46 2.22-1.2 3.03-.8.87-2.1 1.55-3.15 1.46-.13-1.1.4-2.25 1.1-2.97.8-.85 2.18-1.5 3.25-1.52zM20.5 17.1c-.55 1.27-.82 1.84-1.52 2.96-1 1.57-2.4 3.52-4.14 3.53-1.55.02-1.95-1-4.05-.99-2.1.01-2.54 1.01-4.1.99-1.74-.02-3.07-1.78-4.07-3.35C-.1 15.7-.4 10.6 1.4 7.9c1.27-1.95 3.28-3.09 5.17-3.09 1.92 0 3.13 1.05 4.72 1.05 1.54 0 2.48-1.05 4.7-1.05 1.68 0 3.46.91 4.72 2.5-4.15 2.27-3.48 8.2.8 9.8z"/></svg>';

const pw = (id, label, auto) => fieldHtml(id, label, `<div class="pw-wrap"><input class="input" id="${id}" type="password" autocomplete="${auto}" aria-describedby="${id}-error"><button type="button" class="pw-toggle" data-pw="${id}" aria-pressed="false" aria-label="Show password">${ic('eye', 'h-5 w-5')}</button></div>`);
const withIcon = (icon, input) => `<div class="in-wrap">${ic(icon, 'h-5 w-5')}${input}</div>`;

root.innerHTML = `<div class="auth-shell">
<aside class="auth-visual"><div class="media-bg" aria-hidden="true">${art('login-visual', 'portrait')}</div>
<a class="brand-link auth-brand" href="index.html" aria-label="${DATA.brand.name}, back to home">${emblem('h-12 w-12 shrink-0')}<span class="brand-text"><strong>LUMORA</strong><small>CINEMAS</small></span></a>
<div class="auth-quote"><p class="eyebrow">Feel every frame</p><p class="auth-line">Your tickets, rewards and showtimes in one place.</p></div></aside>
<main class="auth-main" id="main"><div class="auth-tools"><button type="button" class="icon-btn" data-dir-toggle aria-label="${DATA.ui.dir}" aria-pressed="false">${ic('dir')}</button><button type="button" class="icon-btn" data-theme-toggle aria-label="${DATA.ui.theme}" aria-pressed="false">${ic('sun')}</button></div>
<div class="auth-card">
<div class="auth-tabs" role="tablist" aria-label="Account"><button type="button" role="tab" id="tab-signin" aria-selected="true" aria-controls="panel-signin" data-view="signin">Sign In</button><button type="button" role="tab" id="tab-register" aria-selected="false" aria-controls="panel-register" tabindex="-1" data-view="register">Create Account</button></div>

<section id="panel-signin" role="tabpanel" aria-labelledby="tab-signin"><h1 class="auth-title">Welcome back</h1><p class="auth-sub">Sign in to manage your bookings and rewards.</p>
<form id="signin-form" novalidate aria-label="Sign in"><div class="form-stack">
${fieldHtml('si-id', 'Email or mobile number', withIcon('mail', '<input class="input" id="si-id" type="text" inputmode="email" autocomplete="username" aria-describedby="si-id-error">'))}
${pw('si-pw', 'Password', 'current-password')}
<div class="row-between"><label class="check"><input type="checkbox" id="si-remember"><span>Remember me</span></label><button type="button" class="link-btn" data-view="forgot">Forgot password?</button></div></div>
<button class="btn btn-primary btn-lg w-full" type="submit">Sign In</button><p class="form-status" id="si-status" role="status" aria-live="polite" hidden></p></form>
<div class="divider"><span>or continue with</span></div>
<div class="social-row"><button type="button" class="btn btn-secondary social" data-social="Google">${GOOGLE}<span>Google</span></button><button type="button" class="btn btn-secondary social" data-social="Apple">${APPLE}<span>Apple</span></button></div>
<p class="auth-switch">New to Lumora? <button type="button" class="link-btn" data-view="register">Create an account</button></p></section>

<section id="panel-register" role="tabpanel" aria-labelledby="tab-register" hidden><h1 class="auth-title">Create your account</h1><p class="auth-sub">Join Lumora to book faster and earn rewards.</p>
<form id="register-form" novalidate aria-label="Create account"><div class="form-stack">
${fieldHtml('rg-name', 'Full name', withIcon('user', '<input class="input" id="rg-name" type="text" autocomplete="name" aria-describedby="rg-name-error">'))}
${fieldHtml('rg-id', 'Email or mobile number', withIcon('mail', '<input class="input" id="rg-id" type="text" inputmode="email" autocomplete="username" aria-describedby="rg-id-error">'))}
${pw('rg-pw', 'Password', 'new-password')}
${pw('rg-pw2', 'Confirm password', 'new-password')}
<p class="hint">Use at least 8 characters with a letter and a number.</p>
<div class="field"><label class="check"><input type="checkbox" id="rg-terms" aria-describedby="rg-terms-error"><span>I agree to the terms of service and privacy policy.</span></label><p class="field-error" id="rg-terms-error" hidden></p></div></div>
<button class="btn btn-primary btn-lg w-full" type="submit">Create Account</button><p class="form-status" id="rg-status" role="status" aria-live="polite" hidden></p></form>
<p class="auth-switch">Already have an account? <button type="button" class="link-btn" data-view="signin">Sign in</button></p></section>

<section id="panel-forgot" hidden aria-labelledby="forgot-title"><h1 class="auth-title" id="forgot-title">Reset your password</h1><p class="auth-sub">Enter your email or mobile number and we will send you a reset link.</p>
<form id="forgot-form" novalidate aria-label="Reset password"><div class="form-stack">${fieldHtml('fp-id', 'Email or mobile number', withIcon('mail', '<input class="input" id="fp-id" type="text" inputmode="email" autocomplete="username" aria-describedby="fp-id-error">'))}</div>
<button class="btn btn-primary btn-lg w-full" type="submit">Send Reset Link</button><p class="form-status" id="fp-status" role="status" aria-live="polite" hidden></p></form>
<p class="auth-switch"><button type="button" class="link-btn" data-view="signin">Back to sign in</button></p></section>
</div></main></div>`;

/* ---------- View switching ---------- */
const panels = { signin: root.querySelector('#panel-signin'), register: root.querySelector('#panel-register'), forgot: root.querySelector('#panel-forgot') };
function view(name, focus = true) {
  Object.entries(panels).forEach(([k, el]) => { el.hidden = k !== name; });
  ['signin', 'register'].forEach((k) => { const t = root.querySelector(`#tab-${k}`); t.setAttribute('aria-selected', String(k === name)); t.tabIndex = k === name ? 0 : -1; });
  document.title = `${{ signin: 'Sign In', register: 'Create Account', forgot: 'Reset Password' }[name]} | Lumora Cinemas`;
  if (focus) panels[name].querySelector('input').focus();
}
root.addEventListener('click', (e) => { const v = e.target.closest('[data-view]'); if (v) view(v.dataset.view); });
root.querySelector('.auth-tabs').addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const next = e.target.dataset.view === 'signin' ? 'register' : 'signin';
  view(next, false); root.querySelector(`#tab-${next}`).focus();
});

/* ---------- Password show/hide ---------- */
root.addEventListener('click', (e) => {
  const b = e.target.closest('[data-pw]'); if (!b) return;
  const input = root.querySelector(`#${b.dataset.pw}`);
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  b.setAttribute('aria-pressed', String(show));
  b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  b.innerHTML = ic(show ? 'eyeoff' : 'eye', 'h-5 w-5');
});

/* ---------- Validation and submit ---------- */
const idRule = (x) => (!x.value.trim() ? 'Enter your email or mobile number.' : rules.email(x.value) || rules.mobile(x.value) ? '' : 'Enter a valid email address or mobile number.');
const nameFrom = (id) => (rules.email(id) ? id.split('@')[0].split(/[._-]+/).filter(Boolean).map((p) => p[0].toUpperCase() + p.slice(1)).join(' ') : '');
const signedIn = (statusEl, text, session) => {
  setSession({ ...session, at: Date.now() });
  statusEl.hidden = false; statusEl.className = 'form-status is-success'; statusEl.textContent = text;
  root.querySelectorAll('button[type=submit]').forEach((b) => { b.disabled = true; });
  setTimeout(() => { location.href = 'dashboard.html'; }, 800);
};

const signinValidate = bindValidation(root, {
  'si-id': idRule,
  'si-pw': (x) => (!x.value ? 'Enter your password.' : x.value.length < 8 ? 'Your password must be at least 8 characters.' : ''),
});
const remembered = getRemember();
if (remembered) { root.querySelector('#si-id').value = remembered; root.querySelector('#si-remember').checked = true; }
root.querySelector('#signin-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const st = root.querySelector('#si-status');
  if (!signinValidate()) { st.hidden = false; st.className = 'form-status is-error'; st.textContent = 'Please check the highlighted fields.'; return; }
  const id = root.querySelector('#si-id').value.trim();
  setRemember(root.querySelector('#si-remember').checked ? id : null);
  signedIn(st, 'Signing you in…', { name: nameFrom(id) || undefined, email: rules.email(id) ? id : undefined });
});

const registerValidate = bindValidation(root, {
  'rg-name': (x) => (x.value.trim().length < 2 ? 'Enter your full name.' : ''),
  'rg-id': idRule,
  'rg-pw': (x) => (x.value.length < 8 ? 'Use at least 8 characters.' : !/[A-Za-z]/.test(x.value) || !/\d/.test(x.value) ? 'Include at least one letter and one number.' : ''),
  'rg-pw2': (x) => (!x.value ? 'Confirm your password.' : x.value !== root.querySelector('#rg-pw').value ? 'Passwords do not match.' : ''),
  'rg-terms': (x) => (x.checked ? '' : 'Please accept the terms to continue.'),
});
root.querySelector('#register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const st = root.querySelector('#rg-status');
  if (!registerValidate()) { st.hidden = false; st.className = 'form-status is-error'; st.textContent = 'Please check the highlighted fields.'; return; }
  const id = root.querySelector('#rg-id').value.trim();
  signedIn(st, 'Account created. Taking you to your dashboard…', { name: root.querySelector('#rg-name').value.trim(), email: rules.email(id) ? id : undefined, fresh: true });
});

const forgotValidate = bindValidation(root, { 'fp-id': idRule });
root.querySelector('#forgot-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const st = root.querySelector('#fp-status'); st.hidden = false;
  if (!forgotValidate()) { st.className = 'form-status is-error'; st.textContent = 'Please check the highlighted field.'; return; }
  st.className = 'form-status is-success'; st.textContent = 'If an account exists for that email or number, a reset link is on its way.';
});

root.querySelectorAll('[data-social]').forEach((b) => b.addEventListener('click', () => {
  const st = root.querySelector('#si-status');
  signedIn(st, `Continuing with ${b.dataset.social}…`, { provider: b.dataset.social });
}));

initTheme();
initDirection();
view('signin', false);
