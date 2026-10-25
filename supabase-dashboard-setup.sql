-- LENDVESTRA customer dashboard data tables
-- Run after supabase-profile-setup.sql. Review with your security/engineering adviser before production.
-- Staff/admin status must be set securely in Supabase Auth app_metadata by a trusted administrator,
-- never from customer-editable user_metadata or from the browser.

create table if not exists public.loan_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference_code text unique,
  requested_amount numeric(14,2) not null check (requested_amount > 0),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  purpose text,
  status text not null default 'Submitted' check (status in ('Submitted','Under review','More information required','Approved','Declined','Closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investment_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_name text not null,
  principal_amount numeric(14,2) not null check (principal_amount > 0),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  start_date date,
  expected_earnings numeric(14,2) check (expected_earnings is null or expected_earnings >= 0),
  maturity_date date,
  status text not null default 'Recorded' check (status in ('Enquiry','Pending verification','Active','Matured','Closed','Cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (maturity_date is null or start_date is null or maturity_date >= start_date)
);

alter table public.loan_applications enable row level security;
alter table public.investment_records enable row level security;

-- Customers can only read their own records. They cannot set or edit approval outcomes.
drop policy if exists "Customers read own loan applications" on public.loan_applications;
create policy "Customers read own loan applications" on public.loan_applications
 for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Staff manage loan applications" on public.loan_applications;
create policy "Staff manage loan applications" on public.loan_applications
 for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
 with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Customers read own investment records" on public.investment_records;
create policy "Customers read own investment records" on public.investment_records
 for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Staff manage investment records" on public.investment_records;
create policy "Staff manage investment records" on public.investment_records
 for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
 with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

revoke all on public.loan_applications from anon;
revoke all on public.investment_records from anon;
grant select on public.loan_applications to authenticated;
grant select on public.investment_records to authenticated;
grant insert, update, delete on public.loan_applications to authenticated;
grant insert, update, delete on public.investment_records to authenticated;
-- RLS policies above still restrict writes to trusted admin-role sessions.
