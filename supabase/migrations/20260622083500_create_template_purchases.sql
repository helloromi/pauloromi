create table if not exists public.template_purchases (
  id uuid primary key default gen_random_uuid(),
  template_key text not null,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  stripe_customer_email text not null,
  stripe_customer_id text,
  stripe_price_id text,
  stripe_payment_link_id text,
  amount_total integer,
  currency text,
  paid_at timestamptz not null,
  download_count integer not null default 0,
  last_download_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists template_purchases_template_key_idx
  on public.template_purchases (template_key);

create index if not exists template_purchases_customer_email_idx
  on public.template_purchases (stripe_customer_email);

alter table public.template_purchases enable row level security;

create or replace function public.set_template_purchases_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists template_purchases_updated_at on public.template_purchases;

create trigger template_purchases_updated_at
before update on public.template_purchases
for each row
execute function public.set_template_purchases_updated_at();
