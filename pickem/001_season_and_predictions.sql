-- ============================================================
-- SEED: Season 2026/27 + 13 Prediction Types
-- ============================================================

-- Season
insert into public.seasons (
  name, season_year, status, lock_at, rules_version
) values (
  '2026/27',
  2026,
  'OPEN',
  '2026-10-21 23:59:00+00',  -- adjust to real tip-off
  1
) on conflict (name) do update set
  status = excluded.status,
  lock_at = excluded.lock_at,
  updated_at = now();

-- 13 Prediction Types
insert into public.prediction_types (slug, name, description, category, phase, selection_type, points, sort_order, active)
values
  ('scoring_leader',   'Scoring Leader',   '¿Quién anota más puntos por partido?',           'STATS',  'SEASON', 'player', 20,  1, true),
  ('assists_leader',   'Assists Leader',   '¿Quién más asiste?',                             'STATS',  'SEASON', 'player', 20,  2, true),
  ('rebounds_leader',  'Rebounds Leader',  '¿Rey de los rebotes?',                           'STATS',  'SEASON', 'player', 20,  3, true),
  ('three_point_leader','3PM Leader',      '¿El mejor triplero de la liga?',                 'STATS',  'SEASON', 'player', 20,  4, true),
  ('steals_leader',    'Steals Leader',    '¿El ladrón de la liga?',                         'STATS',  'SEASON', 'player', 20,  5, true),
  ('blocks_leader',    'Blocks Leader',    '¿El protector del aro?',                         'STATS',  'SEASON', 'player', 20,  6, true),
  ('mvp',              'MVP',              'El mejor jugador de la temporada',               'AWARDS', 'SEASON', 'player', 30,  7, true),
  ('dpoy',             'DPOY',             'Defensor del año',                               'AWARDS', 'SEASON', 'player', 25,  8, true),
  ('roy',              'ROY',              'Novato del año',                                 'AWARDS', 'SEASON', 'player', 25,  9, true),
  ('best_record',      'Best Record',      'Equipo con el mejor récord de la liga',          'TEAMS',  'SEASON', 'team',   20, 10, true),
  ('east_champion',    'East Champion',    'Campeón de la Conferencia Este',                 'TEAMS',  'PLAYOFFS','team',  30, 11, true),
  ('west_champion',    'West Champion',    'Campeón de la Conferencia Oeste',                'TEAMS',  'PLAYOFFS','team',  30, 12, true),
  ('nba_champion',     'NBA Champion',     'El anillo. Campeón de la NBA',                   'FINALS', 'FINALS', 'team',   50, 13, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  points = excluded.points,
  sort_order = excluded.sort_order,
  active = excluded.active;

-- Quick verification
-- select slug, name, category, points, sort_order from public.prediction_types order by sort_order;
