// filepath: src/app/pickem/locked/page.tsx
import { createClient } from '@/lib/supabase/server';
import { LockedViewClient } from '@/components/pickem/LockedViewClient';
import { isUnderdogPick, calculatePotentialPoints } from '@/lib/pickem/community';

export const dynamic = 'force-dynamic';

export default async function LockedPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: seasons } = await supabase
    .from('seasons')
    .select('id, name')
    .eq('name', '2026/27')
    .limit(1);

  const season = seasons?.[0];

  let username = 'buque';
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();
    if (data?.username) {
      username = data.username;
    }
  }

  let userPicks: Array<{
    id: string;
    pointsAwarded: number;
    status: string;
    typeName: string;
    category: string;
    points: number;
    selectionName: string;
    selectionSub: string;
    isUnderdog?: boolean;
  }> = [];

  let potentialPoints = 0;

  if (user && season) {
    const { data: rawPicks } = await supabase
      .from('predictions')
      .select(`
        id,
        status,
        points_awarded,
        prediction_types:prediction_type_id (
          slug,
          name,
          category,
          points,
          sort_order
        ),
        players:player_id (
          display_name,
          position,
          teams:team_id (
            abbreviation
          )
        ),
        teams:team_id (
          name,
          abbreviation,
          conference
        )
      `)
      .eq('user_id', user.id)
      .eq('season_id', season.id);

    if (rawPicks) {
      rawPicks.sort((a, b) => {
        const orderA = (a.prediction_types as any)?.sort_order ?? 0;
        const orderB = (b.prediction_types as any)?.sort_order ?? 0;
        return orderA - orderB;
      });

      userPicks = rawPicks.map((p) => {
        const pt = Array.isArray(p.prediction_types) ? p.prediction_types[0] : p.prediction_types;
        const player = Array.isArray(p.players) ? p.players[0] : p.players;
        const team = Array.isArray(p.teams) ? p.teams[0] : p.teams;

        let selectionName = 'Sin selección';
        let selectionSub = '';
        let isUnderdog = false;

        const basePoints = pt?.points || 20;

        if (player) {
          selectionName = player.display_name;
          const playerTeam = Array.isArray(player.teams) ? player.teams[0] : player.teams;
          selectionSub = `${playerTeam?.abbreviation || 'NBA'} • ${player.position || 'Jugador'}`;
          isUnderdog = isUnderdogPick(pt?.slug || '', player.display_name);
        } else if (team) {
          selectionName = team.name;
          selectionSub = `Conferencia ${team.conference === 'East' ? 'Este' : 'Oeste'}`;
          isUnderdog = isUnderdogPick(pt?.slug || '', team.abbreviation);
        }

        const calculated = calculatePotentialPoints(basePoints, isUnderdog);
        potentialPoints += calculated;

        return {
          id: p.id,
          status: p.status,
          pointsAwarded: p.points_awarded,
          typeName: pt?.name || 'Predicción',
          category: pt?.category === 'STATS' ? 'ESTADÍSTICAS' :
                    pt?.category === 'AWARDS' ? 'PREMIOS' :
                    pt?.category === 'TEAMS' ? 'EQUIPOS' : 'FINAL',
          points: calculated,
          selectionName,
          selectionSub,
          isUnderdog,
        };
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 sm:px-8 pt-12 pb-24 max-w-4xl mx-auto">
      <LockedViewClient
        username={username}
        userPicks={userPicks}
        potentialPoints={potentialPoints || 320}
      />
    </div>
  );
}
