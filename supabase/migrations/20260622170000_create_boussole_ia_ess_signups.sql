create table if not exists public.boussole_ia_ess_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  accepts_emails boolean not null,
  source text not null default 'boussole-ia-ess',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists boussole_ia_ess_signups_email_idx
  on public.boussole_ia_ess_signups (email);

alter table public.boussole_ia_ess_signups enable row level security;

create or replace function public.set_boussole_ia_ess_signups_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists boussole_ia_ess_signups_updated_at
  on public.boussole_ia_ess_signups;

create trigger boussole_ia_ess_signups_updated_at
before update on public.boussole_ia_ess_signups
for each row
execute function public.set_boussole_ia_ess_signups_updated_at();

grant usage on schema public to service_role;

grant select, insert, update
  on table public.boussole_ia_ess_signups
  to service_role;

grant execute
  on function public.set_boussole_ia_ess_signups_updated_at()
  to service_role;
