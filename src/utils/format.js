export const formatPrice = (p) => (!p || Number(p) === 0 ? 'Free' : `$${Number(p).toFixed(2)}`);
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const toDate = (str) => new Date(str || Date.now());
export const titleCase = (s='') => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
export const uniq = (arr=[]) => [...new Set(arr)];