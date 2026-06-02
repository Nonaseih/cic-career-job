-- ============================================================
-- Profiles table — run this in Supabase SQL Editor
-- ============================================================

create table if not exists profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  full_name          text,
  phone              text,
  birth_year         integer,
  prefecture         text,
  city               text,
  employment_status  text,           -- 在職中 | 離職中 | その他
  current_employer   text,
  recent_job_type    text,
  experience_years   text,           -- 1年未満 | 1〜3年 | 3〜5年 | 5〜10年 | 10年以上
  current_salary     text,           -- 〜300万円 | 300〜400万円 | ...
  experience_types   text[],         -- 経験職種（複数）
  desired_job_type   text,
  desired_prefecture text,
  can_relocate       boolean default false,
  desired_salary     text,
  qualifications     text[],         -- 保有資格（複数）
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Auto-update updated_at
create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- RLS
alter table profiles enable row level security;

-- Users can read and write their own profile
create policy "users manage own profile"
  on profiles for all
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Service role can read all profiles
create policy "service role read profiles"
  on profiles for select
  to service_role
  using (true);
