-- filepath: supabase/migrations/20260916_nba_teams_seed.sql
-- ============================================================
-- DRAFTEADOS NBA HUB — SEED EQUIPOS (opcional)
-- Usar si querés persistir teams en Supabase para slugs, colores y cache
-- ============================================================

-- Tabla mínima (ajustar nombres si ya existe algo similar en Pick'em)
create table if not exists public.nba_teams (
  id text primary key,
  name text not null,
  abbreviation text not null unique,
  city text not null,
  conference text not null check (conference in ('East', 'West')),
  division text not null,
  slug text not null unique,
  primary_color text,
  secondary_color text,
  logo_url text,
  created_at timestamptz default now()
);

-- RLS simple (lectura pública)
alter table public.nba_teams enable row level security;

create policy "nba_teams_public_read"
  on public.nba_teams
  for select
  using (true);

-- Seed 30 equipos
insert into public.nba_teams (id, name, abbreviation, city, conference, division, slug, primary_color) values
  ('1', 'Boston Celtics', 'BOS', 'Boston', 'East', 'Atlantic', 'celtics', '#007A33'),
  ('2', 'Brooklyn Nets', 'BKN', 'Brooklyn', 'East', 'Atlantic', 'nets', '#000000'),
  ('3', 'New York Knicks', 'NYK', 'New York', 'East', 'Atlantic', 'knicks', '#006BB6'),
  ('4', 'Philadelphia 76ers', 'PHI', 'Philadelphia', 'East', 'Atlantic', 'sixers', '#006BB6'),
  ('5', 'Toronto Raptors', 'TOR', 'Toronto', 'East', 'Atlantic', 'raptors', '#CE1141'),
  ('6', 'Chicago Bulls', 'CHI', 'Chicago', 'East', 'Central', 'bulls', '#CE1141'),
  ('7', 'Cleveland Cavaliers', 'CLE', 'Cleveland', 'East', 'Central', 'cavaliers', '#860038'),
  ('8', 'Detroit Pistons', 'DET', 'Detroit', 'East', 'Central', 'pistons', '#C8102E'),
  ('9', 'Indiana Pacers', 'IND', 'Indiana', 'East', 'Central', 'pacers', '#002D62'),
  ('10', 'Milwaukee Bucks', 'MIL', 'Milwaukee', 'East', 'Central', 'bucks', '#00471B'),
  ('11', 'Atlanta Hawks', 'ATL', 'Atlanta', 'East', 'Southeast', 'hawks', '#E03A3E'),
  ('12', 'Charlotte Hornets', 'CHA', 'Charlotte', 'East', 'Southeast', 'hornets', '#1D1160'),
  ('13', 'Miami Heat', 'MIA', 'Miami', 'East', 'Southeast', 'heat', '#98002E'),
  ('14', 'Orlando Magic', 'ORL', 'Orlando', 'East', 'Southeast', 'magic', '#0077C0'),
  ('15', 'Washington Wizards', 'WAS', 'Washington', 'East', 'Southeast', 'wizards', '#002B5C'),
  ('16', 'Denver Nuggets', 'DEN', 'Denver', 'West', 'Northwest', 'nuggets', '#0E2240'),
  ('17', 'Minnesota Timberwolves', 'MIN', 'Minnesota', 'West', 'Northwest', 'timberwolves', '#0C2340'),
  ('18', 'Oklahoma City Thunder', 'OKC', 'Oklahoma City', 'West', 'Northwest', 'thunder', '#007AC1'),
  ('19', 'Portland Trail Blazers', 'POR', 'Portland', 'West', 'Northwest', 'blazers', '#E03A3E'),
  ('20', 'Utah Jazz', 'UTA', 'Utah', 'West', 'Northwest', 'jazz', '#002B5C'),
  ('21', 'Golden State Warriors', 'GSW', 'Golden State', 'West', 'Pacific', 'warriors', '#1D428A'),
  ('22', 'Los Angeles Clippers', 'LAC', 'Los Angeles', 'West', 'Pacific', 'clippers', '#C8102E'),
  ('23', 'Los Angeles Lakers', 'LAL', 'Los Angeles', 'West', 'Pacific', 'lakers', '#552583'),
  ('24', 'Phoenix Suns', 'PHX', 'Phoenix', 'West', 'Pacific', 'suns', '#1D1160'),
  ('25', 'Sacramento Kings', 'SAC', 'Sacramento', 'West', 'Pacific', 'kings', '#5A2D81'),
  ('26', 'Dallas Mavericks', 'DAL', 'Dallas', 'West', 'Southwest', 'mavericks', '#00538C'),
  ('27', 'Houston Rockets', 'HOU', 'Houston', 'West', 'Southwest', 'rockets', '#CE1141'),
  ('28', 'Memphis Grizzlies', 'MEM', 'Memphis', 'West', 'Southwest', 'grizzlies', '#5D76A9'),
  ('29', 'New Orleans Pelicans', 'NOP', 'New Orleans', 'West', 'Southwest', 'pelicans', '#0C2340'),
  ('30', 'San Antonio Spurs', 'SAS', 'San Antonio', 'West', 'Southwest', 'spurs', '#C4CED4')
on conflict (id) do update set
  name = excluded.name,
  abbreviation = excluded.abbreviation,
  slug = excluded.slug,
  primary_color = excluded.primary_color;
