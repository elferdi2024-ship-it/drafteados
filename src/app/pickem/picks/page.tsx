// filepath: src/app/pickem/picks/page.tsx
import { createClient } from '@/lib/supabase/server';
import { PicksClient } from '@/components/pickem/PicksClient';

export const dynamic = 'force-dynamic';

export default async function PicksPage() {
  const supabase = await createClient();

  // 1. Fetch current active season
  const { data: seasons } = await supabase
    .from('seasons')
    .select('id, name, status, lock_at')
    .eq('name', '2026/27')
    .limit(1);

  const season = seasons?.[0] || {
    id: 'dd1be55a-6231-4f54-9637-cc21efe8abd5',
    name: '2026/27',
    status: 'OPEN',
    lock_at: '2026-10-21T23:59:00+00:00',
  };

  // 2. Fetch 13 prediction types
  const { data: predictionTypesData } = await supabase
    .from('prediction_types')
    .select('id, slug, name, description, category, selection_type, points, sort_order')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  const predictionTypes = (predictionTypesData || []).map((pt) => ({
    id: pt.id,
    slug: pt.slug,
    name: pt.name,
    description: pt.description,
    category: pt.category,
    selectionType: pt.selection_type as 'player' | 'team',
    points: pt.points,
    sortOrder: pt.sort_order,
  }));

  // 3. Fetch all 30 teams
  const { data: teamsData } = await supabase
    .from('teams')
    .select('id, name, abbreviation, conference, division, primary_color, secondary_color')
    .eq('active', true)
    .order('name', { ascending: true });

  const teams = (teamsData || []).map((t) => ({
    id: t.id,
    name: t.name,
    abbreviation: t.abbreviation,
    conference: t.conference as 'East' | 'West',
    division: t.division,
    primaryColor: t.primary_color,
    secondaryColor: t.secondary_color,
  }));

  // 4. Fetch players with team information
  const { data: playersData } = await supabase
    .from('players')
    .select(`
      id,
      display_name,
      position,
      jersey_number,
      team_id,
      teams:team_id (
        id,
        name,
        abbreviation,
        primary_color
      )
    `)
    .eq('active', true)
    .order('display_name', { ascending: true });

  const players = (playersData || []).map((p) => {
    // Supabase returns relation as object or array
    const teamRel = Array.isArray(p.teams) ? p.teams[0] : p.teams;
    return {
      id: p.id,
      displayName: p.display_name,
      position: p.position,
      jerseyNumber: p.jersey_number,
      team: teamRel ? {
        id: teamRel.id,
        name: teamRel.name,
        abbreviation: teamRel.abbreviation,
        primaryColor: teamRel.primary_color,
      } : null,
    };
  });

  // 5. Fetch user session and user predictions if logged in
  const { data: { user } } = await supabase.auth.getUser();

  let existingPicks: Array<{
    predictionTypeId: string;
    playerId: string | null;
    teamId: string | null;
    status: 'OPEN' | 'LOCKED' | 'CORRECT' | 'INCORRECT' | 'VOID';
  }> = [];

  if (user) {
    const { data: userPicks } = await supabase
      .from('predictions')
      .select('prediction_type_id, player_id, team_id, status')
      .eq('user_id', user.id)
      .eq('season_id', season.id);

    if (userPicks) {
      existingPicks = userPicks.map((up) => ({
        predictionTypeId: up.prediction_type_id,
        playerId: up.player_id,
        teamId: up.team_id,
        status: up.status as 'OPEN' | 'LOCKED' | 'CORRECT' | 'INCORRECT' | 'VOID',
      }));
    }
  }

  return (
    <PicksClient
      season={{
        id: season.id,
        name: season.name,
        status: season.status,
        lockAt: season.lock_at,
      }}
      predictionTypes={predictionTypes}
      players={players}
      teams={teams}
      existingPicks={existingPicks}
      isLoggedIn={Boolean(user)}
    />
  );
}
