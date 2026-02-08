-- Recharge: Burnout Recovery & Focus SaaS
-- Initial schema migration

-- User settings (extends Supabase auth.users)
create table public.user_settings (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  pomodoro_work_minutes integer not null default 25,
  pomodoro_break_minutes integer not null default 5,
  pomodoro_long_break_minutes integer not null default 15,
  pomodoros_until_long_break integer not null default 4,
  sound_enabled boolean not null default true,
  theme text not null default 'light',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pomodoro sessions
create table public.pomodoro_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz,
  duration_minutes integer not null,
  session_type text not null check (session_type in ('work', 'break', 'long_break')),
  completed boolean not null default false,
  label text,
  created_at timestamptz not null default now()
);

-- Journal entries
create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  mood text check (mood in ('great', 'good', 'okay', 'low', 'struggling')),
  entry_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Daily check-ins (burnout self-assessment)
create table public.daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  energy_level integer not null check (energy_level between 1 and 5),
  stress_level integer not null check (stress_level between 1 and 5),
  motivation_level integer not null check (motivation_level between 1 and 5),
  notes text,
  checkin_date date not null default current_date,
  created_at timestamptz not null default now(),
  unique(user_id, checkin_date)
);

-- Recovery activity log (streak/habit tracking)
create table public.recovery_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in (
    'breathing_exercise', 'meditation', 'stretch', 'walk', 'journal', 'checkin'
  )),
  duration_seconds integer,
  activity_date date not null default current_date,
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index idx_pomodoro_sessions_user_date on public.pomodoro_sessions(user_id, started_at);
create index idx_journal_entries_user_date on public.journal_entries(user_id, entry_date);
create index idx_daily_checkins_user_date on public.daily_checkins(user_id, checkin_date);
create index idx_recovery_activities_user_date on public.recovery_activities(user_id, activity_date);

-- Row Level Security
alter table public.user_settings enable row level security;
alter table public.pomodoro_sessions enable row level security;
alter table public.journal_entries enable row level security;
alter table public.daily_checkins enable row level security;
alter table public.recovery_activities enable row level security;

-- RLS Policies: users can only access their own data
create policy "Users can view own settings"
  on public.user_settings for select using (auth.uid() = id);
create policy "Users can insert own settings"
  on public.user_settings for insert with check (auth.uid() = id);
create policy "Users can update own settings"
  on public.user_settings for update using (auth.uid() = id);

create policy "Users can view own pomodoro sessions"
  on public.pomodoro_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own pomodoro sessions"
  on public.pomodoro_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own pomodoro sessions"
  on public.pomodoro_sessions for update using (auth.uid() = user_id);

create policy "Users can view own journal entries"
  on public.journal_entries for select using (auth.uid() = user_id);
create policy "Users can insert own journal entries"
  on public.journal_entries for insert with check (auth.uid() = user_id);
create policy "Users can update own journal entries"
  on public.journal_entries for update using (auth.uid() = user_id);
create policy "Users can delete own journal entries"
  on public.journal_entries for delete using (auth.uid() = user_id);

create policy "Users can view own checkins"
  on public.daily_checkins for select using (auth.uid() = user_id);
create policy "Users can insert own checkins"
  on public.daily_checkins for insert with check (auth.uid() = user_id);
create policy "Users can update own checkins"
  on public.daily_checkins for update using (auth.uid() = user_id);

create policy "Users can view own recovery activities"
  on public.recovery_activities for select using (auth.uid() = user_id);
create policy "Users can insert own recovery activities"
  on public.recovery_activities for insert with check (auth.uid() = user_id);

-- Trigger for auto-updating updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_user_settings_updated_at
  before update on public.user_settings
  for each row execute function update_updated_at_column();

create trigger update_journal_entries_updated_at
  before update on public.journal_entries
  for each row execute function update_updated_at_column();
