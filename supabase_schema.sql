-- ResourceHub schema (minimal, matches src/store/db.js expectations)

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Main table
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text check (type in ('book','course','job','link')) default 'link',
  tags text[] default '{}',
  url text,
  price numeric,
  is_free boolean generated always as (coalesce(price,0) = 0) stored,
  platform text,
  published boolean default true,
  clicks integer not null default 0,
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists resources_type_idx on public.resources(type);
create index if not exists resources_published_idx on public.resources(published);
create index if not exists resources_created_at_idx on public.resources(created_at);

-- RPC to increment clicks and return the new count
create or replace function public.increment_clicks(res uuid)
returns integer
language plpgsql
security definer
as $$
declare new_clicks integer;
begin
  update public.resources
     set clicks = clicks + 1
   where id = res
  returning clicks into new_clicks;

  return coalesce(new_clicks, 0);
end;
$$;

-- Permissions: for proto, keep RLS off so anon can read/write via anon key.
-- If you prefer RLS ON, uncomment the block below.

-- alter table public.resources enable row level security;
-- create policy "read published resources"
--   on public.resources for select
--   using (published = true);
-- create policy "admin manage resources"
--   on public.resources for all
--   using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant all on public.resources to anon, authenticated;
grant execute on function public.increment_clicks(uuid) to anon, authenticated;