-- ============================================================
-- CIC Career Job Portal — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Jobs table
create table if not exists jobs (
  id            bigint primary key generated always as identity,
  title         text not null,
  company_name  text not null,
  description   text,
  salary_min    integer,
  salary_max    integer,
  employment_type text,          -- 正社員, 契約社員, etc.
  experience    text,            -- required experience / qualifications
  areas         text[],          -- prefecture list collapsed from 47 bool columns
  tags          text[],          -- e.g. ['施工管理', '土木']
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Inquiries table
create table if not exists inquiries (
  id         bigint primary key generated always as identity,
  job_id     bigint references jobs(id) on delete set null,
  user_id    uuid references auth.users(id) on delete set null,
  name       text not null,
  email      text not null,
  phone      text,
  message    text,
  created_at timestamptz not null default now()
);

-- Auto-update updated_at on jobs
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger jobs_updated_at
  before update on jobs
  for each row execute function update_updated_at();

-- RLS policies
alter table jobs enable row level security;
alter table inquiries enable row level security;

-- Anyone can read published jobs
create policy "public read published jobs"
  on jobs for select
  using (is_published = true);

-- Authenticated users can read all jobs (including unpublished detail)
create policy "auth read all jobs"
  on jobs for select
  to authenticated
  using (true);

-- Only service role can insert/update/delete jobs
create policy "service role manage jobs"
  on jobs for all
  to service_role
  using (true);

-- Authenticated users can insert inquiries
create policy "auth insert inquiries"
  on inquiries for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can read their own inquiries
create policy "auth read own inquiries"
  on inquiries for select
  to authenticated
  using (auth.uid() = user_id);
