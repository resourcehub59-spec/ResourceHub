// src/store/fallback.js
import data from './mockData.json';

let rows = data.map((it) => ({ ...it }));
let nextId = Math.max(0, ...rows.map(r => Number(r.id)||0)) + 1;

const normalize = (r) => ({
  id: r.id,
  title: r.title || '',
  description: r.description || '',
  url: r.url || '',
  type: r.type || 'book',
  price: Number(r.price || 0),
  tags: Array.isArray(r.tags) ? r.tags : [],
  category: r.category || '',
  source: r.source || '',
  thumbnail: r.thumbnail || '',
  published: !!r.published,
  clicks: Number(r.clicks || 0),
  dateAdded: r.dateAdded || new Date().toISOString().slice(0,10),
});

export async function fetchAll() {
  return rows.map(normalize);
}
export async function fetchType(t) {
  return rows.filter(r => r.type === t).map(normalize);
}
export async function create(it) {
  const row = normalize({ ...it, id: nextId++ });
  rows.push(row);
  return [row];
}
export async function update(id, patch) {
  const idx = rows.findIndex(r => String(r.id) === String(id));
  if (idx === -1) throw new Error('Not found');
  rows[idx] = normalize({ ...rows[idx], ...patch, id: rows[idx].id });
  return [rows[idx]];
}
export async function remove(id) {
  const before = rows.length;
  rows = rows.filter(r => String(r.id) != String(id));
  return before - rows.length;
}
export async function click(id) {
  const r = rows.find(r => String(r.id) === String(id));
  if (!r) throw new Error('Not found');
  r.clicks = (r.clicks || 0) + 1;
  return r.clicks;
}
export default { fetchAll, fetchType, create, update, remove, click };
