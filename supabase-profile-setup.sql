-- LENDVESTRA customer profiles (run in Supabase SQL Editor before publishing these changes)
-- This migration creates a private profile table and copies registration fields from auth metadata.
-- It does not enable/disable Supabase email confirmation; configure that separately in Auth settings.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone_number text,
  country text,
  address_line text,
  city text,
  region text,
  postal_code text,
  employment_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A customer can read only their own profile. Do not add a public read policy.
drop policy if exists "Customers can read own profile" on public.profiles;
create policy "Customers can read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Customers may update only their own row. Restrict allowed columns further in production if needed.
drop policy if exists "Customers can update own profile" on public.profiles;
create policy "Customers can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- A trigger inserts the profile even when email confirmation means signup has no active session.
create or replace function public.handle_new_lendvestra_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id, full_name, phone_number, country, address_line, city, region, postal_code, employment_status
  ) values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone_number', ''),
    nullif(new.raw_user_meta_data ->> 'country', ''),
    nullif(new.raw_user_meta_data ->> 'address_line', ''),
    nullif(new.raw_user_meta_data ->> 'city', ''),
    nullif(new.raw_user_meta_data ->> 'region', ''),
    nullif(new.raw_user_meta_data ->> 'postal_code', ''),
    nullif(new.raw_user_meta_data ->> 'employment_status', '')
  ) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_lendvestra_auth_user_created on auth.users;
create trigger on_lendvestra_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_lendvestra_user();

-- No anonymous access is granted. RLS protects profile reads and updates.
revoke all on public.profiles from anon;
grant select, update on public.profiles to authenticated;
