import supabase from '../lib/supabaseClient.js';

// AUTO-FALLBACK: use local mock store when Supabase is not configured
const hasSupabase = Boolean(import.meta?.env?.VITE_SUPABASE_URL) && Boolean(import.meta?.env?.VITE_SUPABASE_ANON_KEY);
let useFallback = !hasSupabase;
let Fallback;
if (useFallback) {
  // dynamic import to avoid bundling issues
  Fallback = await import('./fallback.js');
}


/* map DB row <-> UI shape (camelCase in React, snake_case in DB) */
const fromRow = (r) => ({
  id: r.id,
  title: r.title,
  description: r.description ?? '',
  url: r.url,
  type: r.type,                           // 'book' | 'course' | 'job'
  price: Number(r.price ?? 0),
  tags: r.tags ?? [],
  category: r.category ?? '',
  source: r.source ?? '',
  thumbnail: r.thumbnail ?? '',
  published: !!r.published,
  clicks: r.clicks ?? 0,
  dateAdded: r.date_added,                // date string 'YYYY-MM-DD'
});

const toRow = (it) => ({
  id: it.id,                              // let DB generate if undefined
  title: it.title,
  description: it.description ?? null,
  url: it.url,
  type: it.type,
  price: it.price ?? 0,
  tags: it.tags ?? [],
  category: it.category ?? null,
  source: it.source ?? null,
  thumbnail: it.thumbnail ?? null,
  published: it.published ?? true,
  clicks: it.clicks ?? 0,
  date_added: it.dateAdded ?? new Date().toISOString().slice(0,10),
});

/* READ */
export async function fetchAll() {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('date_added', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

/* CREATE */
export async function add(item) {
  const payload = toRow(item);
  const { data, error } = await supabase
    .from('resources')
    .insert(payload)
    .select('*')
    .single();
  if (error) throw error;
  return fromRow(data);
}

/* UPDATE */
export async function update(id, patch) {
  const payload = toRow({ ...patch, id });
  const { data, error } = await supabase
    .from('resources')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return fromRow(data);
}

/* DELETE */
export async function remove(id) {
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

/* REPLACE ALL (admin import): wipe + bulk insert */
export async function replaceAll(items) {
  // delete everything first
  let { error: delErr } = await supabase.from('resources').delete().neq('id', null);
  if (delErr) throw delErr;

  // bulk insert
  const payload = items.map(toRow);
  const { data, error } = await supabase
    .from('resources')
    .insert(payload)
    .select('*');
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

/* CLICK COUNTER via RPC */
export async function click(id) {
  const { data, error } = await supabase.rpc('increment_clicks', { res: id });
  if (error) throw error;
  return data; // new clicks count
}
