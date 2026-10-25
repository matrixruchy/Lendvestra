-- LENDVESTRA Phase 3: admin permissions and operational workflow
-- Run only after profile, dashboard, and Phase 2 enquiry SQL have been reviewed/applied.
-- IMPORTANT: Never put a service-role key in admin.html or any browser code.
-- Assign admin access only in Supabase Auth user app_metadata using a trusted admin/server-side process.

-- Confirm all tables have RLS enabled.
alter table public.loan_applications enable row level security;
alter table public.investment_records enable row level security;
alter table public.investment_enquiries enable row level security;
alter table public.support_enquiries enable row level security;

-- Customer write grants are constrained separately; this grants the authenticated role the columns
-- needed for admin status updates and the admin console's insert workflow. RLS remains mandatory.
grant select on public.loan_applications, public.investment_records,
  public.investment_enquiries, public.support_enquiries to authenticated;
grant update (status, updated_at) on public.loan_applications to authenticated;
grant update (status, updated_at) on public.investment_records to authenticated;
grant update (status) on public.investment_enquiries, public.support_enquiries to authenticated;
grant insert (user_id, plan_name, principal_amount, currency, start_date, expected_earnings, maturity_date, status)
  on public.investment_records to authenticated;

-- Replace named policies consistently. Admin role must live in app_metadata, not user_metadata.
drop policy if exists "Staff manage loan applications" on public.loan_applications;
create policy "Staff manage loan applications" on public.loan_applications
 for all to authenticated
 using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
 with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Staff manage investment records" on public.investment_records;
create policy "Staff manage investment records" on public.investment_records
 for all to authenticated
 using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
 with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Staff manages investment enquiries" on public.investment_enquiries;
create policy "Staff manages investment enquiries" on public.investment_enquiries
 for all to authenticated
 using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
 with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Staff manages support enquiries" on public.support_enquiries;
create policy "Staff manages support enquiries" on public.support_enquiries
 for all to authenticated
 using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
 with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Customers must never update loan approval statuses or investment records.
-- Customer select/insert policies from previous phases remain in place.
