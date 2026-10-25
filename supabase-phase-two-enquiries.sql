-- LENDVESTRA Phase 2: secure customer enquiries
-- Run after supabase-profile-setup.sql and supabase-dashboard-setup.sql.
-- Review in a staging project before production. Do not store payment/card/bank credentials here.

alter table public.loan_applications
  add column if not exists monthly_income_range text,
  add column if not exists employment_or_business text,
  add column if not exists repayment_period text,
  add column if not exists applicant_phone text;

create table if not exists public.investment_enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  contact_method text,
  interest_range text,
  category text not null default 'Investment information',
  message text not null,
  consent_recorded boolean not null default false check (consent_recorded = true),
  status text not null default 'Received' check (status in ('Received','Under review','Responded','Closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.support_enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  contact_method text,
  interest_range text,
  category text not null default 'Support',
  message text not null,
  consent_recorded boolean not null default false check (consent_recorded = true),
  status text not null default 'Received' check (status in ('Received','Under review','Responded','Closed')),
  created_at timestamptz not null default now()
);

alter table public.investment_enquiries enable row level security;
alter table public.support_enquiries enable row level security;

-- Customers can insert and read only their own enquiries. No customer update/delete policy is created.
drop policy if exists "Customer creates own investment enquiry" on public.investment_enquiries;
create policy "Customer creates own investment enquiry" on public.investment_enquiries
  for insert to authenticated with check (auth.uid() = user_id and consent_recorded = true);
drop policy if exists "Customer reads own investment enquiries" on public.investment_enquiries;
create policy "Customer reads own investment enquiries" on public.investment_enquiries
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Staff manages investment enquiries" on public.investment_enquiries;
create policy "Staff manages investment enquiries" on public.investment_enquiries
  for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Customer creates own support enquiry" on public.support_enquiries;
create policy "Customer creates own support enquiry" on public.support_enquiries
  for insert to authenticated with check (auth.uid() = user_id and consent_recorded = true);
drop policy if exists "Customer reads own support enquiries" on public.support_enquiries;
create policy "Customer reads own support enquiries" on public.support_enquiries
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Staff manages support enquiries" on public.support_enquiries;
create policy "Staff manages support enquiries" on public.support_enquiries
  for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

revoke all on public.investment_enquiries from anon;
revoke all on public.support_enquiries from anon;
grant select on public.investment_enquiries, public.support_enquiries to authenticated;
grant insert (user_id, full_name, email, phone, contact_method, interest_range, category, message, consent_recorded)
  on public.investment_enquiries to authenticated;
grant insert (user_id, full_name, email, phone, contact_method, interest_range, category, message, consent_recorded)
  on public.support_enquiries to authenticated;

-- Restrict loan inserts to enquiry fields; customers cannot insert their own status or timestamps.
revoke insert, update, delete on public.loan_applications from authenticated;
grant insert (user_id, reference_code, requested_amount, currency, purpose, monthly_income_range, employment_or_business, repayment_period, applicant_phone)
  on public.loan_applications to authenticated;
-- Staff/admin access remains governed by the admin RLS policy. If an admin dashboard is built,
-- grant the minimum required column permissions to the trusted staff workflow at that stage.

drop policy if exists "Customers submit own loan applications" on public.loan_applications;
create policy "Customers submit own loan applications" on public.loan_applications
  for insert to authenticated with check (auth.uid() = user_id);
