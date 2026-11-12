/* Frontend persistence (localStorage). Wrapped so the interface works when storage is unavailable. */
const KEY = 'lumora-app';
const SESSION = 'lumora-session';
const REMEMBER = 'lumora-remember';

const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };

const defaults = { cancelled: [], read: [], saved: [], extraPoints: 0, redeemed: [], profile: null, notifs: [], collapsed: false, sessionAt: 0 };
export const state = { ...defaults, ...(read(KEY) || {}) };
export const commit = (patch = {}) => { Object.assign(state, patch); write(KEY, state); };

export const getSession = () => read(SESSION);
export const setSession = (s) => write(SESSION, s);
export const clearSession = () => { try { localStorage.removeItem(SESSION); } catch { /* storage unavailable */ } };
export const getRemember = () => read(REMEMBER);
export const setRemember = (v) => { if (v) write(REMEMBER, v); else { try { localStorage.removeItem(REMEMBER); } catch { /* storage unavailable */ } } };
