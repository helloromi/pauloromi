grant usage on schema public to service_role;

grant select, insert, update
  on table public.template_purchases
  to service_role;

grant execute
  on function public.set_template_purchases_updated_at()
  to service_role;
