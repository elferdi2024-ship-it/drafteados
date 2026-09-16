-- ============================================================
-- DRAFTEADOS PICK'EM — Schema MVP
-- Temporada 2026/27 · 13 predicciones
-- ============================================================

-- Enable UUID
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- PROFILES (public user data)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_length check (char_length(username) >= 3 and char_length(username) <= 24),
  constraint username_format check (username ~ '^[a-z0-9_]+$')
);

create index if not exists profiles_username_idx on public.profiles (username);

-- ------------------------------------------------------------
-- SEASONS
-- ------------------------------------------------------------
create table if not exists public.seasons (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  season_year integer not null,
  status text not null default 'PRESEASON'
    check (status in ('PRESEASON', 'OPEN', 'LOCKED', 'REGULAR', 'PLAYOFFS', 'COMPLETE')),
  lock_at timestamptz,
  start_date timestamptz,
  regular_end_date timestamptz,
  playoffs_start_date timestamptz,
  finals_end_date timestamptz,
  rules_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- TEAMS
-- ------------------------------------------------------------
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'mock',
  provider_team_id text not null,
  name text not null,
  abbreviation text not null,
  conference text not null check (conference in ('East', 'West')),
  division text,
  logo_url text,
  primary_color text,
  secondary_color text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_team_id)
);

create index if not exists teams_abbreviation_idx on public.teams (abbreviation);
create index if not exists teams_conference_idx on public.teams (conference);

-- ------------------------------------------------------------
-- PLAYERS
-- ------------------------------------------------------------
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'mock',
  provider_player_id text not null,
  first_name text,
  last_name text,
  display_name text not null,
  team_id uuid references public.teams(id) on delete set null,
  position text,
  jersey_number text,
  headshot_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_player_id)
);

create index if not exists players_team_id_idx on public.players (team_id);
create index if not exists players_display_name_idx on public.players (display_name);
create index if not exists players_active_idx on public.players (active) where active = true;

-- ------------------------------------------------------------
-- PREDICTION TYPES (catalog of the 13 picks)
-- ------------------------------------------------------------
create table if not exists public.prediction_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category text not null check (category in ('STATS', 'AWARDS', 'TEAMS', 'FINALS')),
  phase text not null default 'SEASON' check (phase in ('SEASON', 'PLAYOFFS', 'FINALS')),
  selection_type text not null check (selection_type in ('player', 'team')),
  points integer not null check (points > 0),
  active boolean not null default true,
  sort_order integer not null default 0,
  rules_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists prediction_types_active_sort_idx
  on public.prediction_types (active, sort_order);

-- ------------------------------------------------------------
-- PREDICTIONS (user selections)
-- ------------------------------------------------------------
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  prediction_type_id uuid not null references public.prediction_types(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  player_id uuid references public.players(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  selected_value text,
  status text not null default 'OPEN'
    check (status in ('OPEN', 'LOCKED', 'CORRECT', 'INCORRECT', 'VOID')),
  locked_at timestamptz,
  points_awarded integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, season_id, prediction_type_id),
  constraint prediction_has_selection check (
    player_id is not null or team_id is not null or selected_value is not null
  )
);

create index if not exists predictions_user_season_idx on public.predictions (user_id, season_id);
create index if not exists predictions_season_status_idx on public.predictions (season_id, status);
create index if not exists predictions_type_idx on public.predictions (prediction_type_id);

-- ------------------------------------------------------------
-- SCORING EVENTS (audit / idempotency)
-- ------------------------------------------------------------
create table if not exists public.scoring_events (
  id uuid primary key default gen_random_uuid(),
  prediction_id uuid not null references public.predictions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  points integer not null,
  reason text,
  resolution_version integer not null default 1,
  created_at timestamptz not null default now(),
  unique (prediction_id, resolution_version)
);

create index if not exists scoring_events_user_idx on public.scoring_events (user_id);

-- ------------------------------------------------------------
-- LEADERBOARD VIEW
-- ------------------------------------------------------------
create or replace view public.leaderboard as
select
  p.user_id,
  p.season_id,
  coalesce(sum(p.points_awarded), 0)::integer as total_points,
  count(*) filter (where p.status = 'CORRECT')::integer as correct_predictions,
  count(*) filter (where p.status in ('CORRECT', 'INCORRECT'))::integer as resolved_predictions,
  case
    when count(*) filter (where p.status in ('CORRECT', 'INCORRECT')) > 0
    then round(
      (count(*) filter (where p.status = 'CORRECT')::numeric /
       count(*) filter (where p.status in ('CORRECT', 'INCORRECT'))::numeric) * 100,
      1
    )
    else 0
  end as accuracy
from public.predictions p
where p.status in ('LOCKED', 'CORRECT', 'INCORRECT', 'VOID')
group by p.user_id, p.season_id;

-- ------------------------------------------------------------
-- UPDATED_AT TRIGGER
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger seasons_updated_at
  before update on public.seasons
  for each row execute function public.set_updated_at();

create trigger teams_updated_at
  before update on public.teams
  for each row execute function public.set_updated_at();

create trigger players_updated_at
  before update on public.players
  for each row execute function public.set_updated_at();

create trigger predictions_updated_at
  before update on public.predictions
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- AUTO CREATE PROFILE ON SIGNUP
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  base_username text;
  final_username text;
  suffix int := 0;
begin
  base_username := lower(regexp_replace(
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1), 'buque'),
    '[^a-z0-9_]', '', 'g'
  ));
  if char_length(base_username) < 3 then
    base_username := 'buque';
  end if;
  final_username := left(base_username, 20);

  while exists (select 1 from public.profiles where username = final_username) loop
    suffix := suffix + 1;
    final_username := left(base_username, 20) || suffix::text;
  end loop;

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    final_username,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', final_username),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.seasons enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.prediction_types enable row level security;
alter table public.predictions enable row level security;
alter table public.scoring_events enable row level security;

-- Profiles
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Seasons / Teams / Players / Prediction types → public read
create policy "Seasons are public"
  on public.seasons for select using (true);

create policy "Teams are public"
  on public.teams for select using (true);

create policy "Players are public"
  on public.players for select using (true);

create policy "Prediction types are public"
  on public.prediction_types for select using (true);

-- Predictions: own data only for write; public read of locked/resolved for leaderboard feel
create policy "Users can view own predictions"
  on public.predictions for select
  using (auth.uid() = user_id);

create policy "Users can insert own predictions"
  on public.predictions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own open predictions"
  on public.predictions for update
  using (auth.uid() = user_id and status = 'OPEN')
  with check (auth.uid() = user_id);

-- Scoring events: users can read their own
create policy "Users can view own scoring events"
  on public.scoring_events for select
  using (auth.uid() = user_id);

-- Leaderboard view is readable by everyone (security invoker by default on views in newer PG;
-- for simplicity we expose via a security definer function later if needed)

comment on table public.prediction_types is 'Catalog of the 13 MVP prediction types';
comment on table public.predictions is 'User selections per season; unique per user+type';
comment on view public.leaderboard is 'Aggregated points and accuracy per user per season';
