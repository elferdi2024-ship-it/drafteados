// filepath: src/app/pickem/profile/[username]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Target, Award, CheckCircle2, XCircle, ArrowLeft, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const supabase = await createClient();

  // 1. Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, created_at')
    .eq('username', username)
    .single();

  if (!profile) {
    notFound();
  }

  // 2. Fetch season
  const { data: seasons } = await supabase
    .from('seasons')
    .select('id, name')
    .eq('name', '2026/27')
    .limit(1);

  const season = seasons?.[0];

  // 3. Fetch leaderboard stats for this user
  let userStats = {
    totalPoints: 0,
    correctPredictions: 0,
    resolvedPredictions: 0,
    accuracy: 0,
    rank: '-',
  };

  if (season) {
    const { data: lbEntry } = await supabase
      .from('leaderboard')
      .select('*')
      .eq('user_id', profile.id)
      .eq('season_id', season.id)
      .maybeSingle();

    if (lbEntry) {
      userStats.totalPoints = lbEntry.total_points || 0;
      userStats.correctPredictions = lbEntry.correct_predictions || 0;
      userStats.resolvedPredictions = lbEntry.resolved_predictions || 0;
      userStats.accuracy = Number(lbEntry.accuracy) || 0;
    }

    // Determine rank
    const { count } = await supabase
      .from('leaderboard')
      .select('*', { count: 'exact', head: true })
      .eq('season_id', season.id)
      .gt('total_points', userStats.totalPoints);

    if (count !== null) {
      userStats.rank = `#${(count || 0) + 1}`;
    }
  }

  // 4. Fetch user predictions with joins
  let picks: Array<{
    id: string;
    typeName: string;
    category: string;
    points: number;
    status: string;
    selectionName: string;
    selectionSub: string;
  }> = [];

  if (season) {
    const { data: rawPicks } = await supabase
      .from('predictions')
      .select(`
        id,
        status,
        points_awarded,
        prediction_types:prediction_type_id (
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
      .eq('user_id', profile.id)
      .eq('season_id', season.id);

    if (rawPicks) {
      rawPicks.sort((a, b) => {
        const orderA = (a.prediction_types as any)?.sort_order ?? 0;
        const orderB = (b.prediction_types as any)?.sort_order ?? 0;
        return orderA - orderB;
      });

      picks = rawPicks.map((p) => {
        const pt = Array.isArray(p.prediction_types) ? p.prediction_types[0] : p.prediction_types;
        const player = Array.isArray(p.players) ? p.players[0] : p.players;
        const team = Array.isArray(p.teams) ? p.teams[0] : p.teams;

        let selectionName = 'Pendiente';
        let selectionSub = '';

        if (player) {
          selectionName = player.display_name;
          const playerTeam = Array.isArray(player.teams) ? player.teams[0] : player.teams;
          selectionSub = `${playerTeam?.abbreviation || 'NBA'} • ${player.position || 'Jugador'}`;
        } else if (team) {
          selectionName = team.name;
          selectionSub = `Conferencia ${team.conference === 'East' ? 'Este' : 'Oeste'}`;
        }

        return {
          id: p.id,
          typeName: pt?.name || 'Predicción',
          category: pt?.category || 'STATS',
          points: pt?.points || 20,
          status: p.status,
          selectionName,
          selectionSub,
        };
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 sm:px-8 pt-8 pb-24 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/pickem/leaderboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          VOLVER AL RANKING
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-[#111111] border border-[#282828] rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-[#181818] border-2 border-[#FF5A1F] flex items-center justify-center font-title text-3xl text-[#FF5A1F] shadow-lg">
            {profile.username.substring(0, 2).toUpperCase()}
          </div>
          <div className="space-y-1 flex-1">
            <h1 className="font-title text-4xl sm:text-5xl tracking-tight text-[#F5F5F5]">
              @{profile.username}
            </h1>
            {profile.display_name && (
              <p className="text-sm font-medium text-[#8B8B8B]">{profile.display_name}</p>
            )}
            <div className="inline-block bg-[#181818] border border-[#282828] text-[11px] uppercase font-bold text-[#FF5A1F] px-2.5 py-0.5 rounded-md mt-2">
              BUQUE OFICIAL
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#282828]">
          <div className="bg-[#181818] rounded-xl p-3.5 text-center">
            <div className="font-title text-3xl text-[#FF5A1F] tabular-nums">
              {userStats.totalPoints}
            </div>
            <div className="text-[10px] uppercase font-bold text-[#8B8B8B] tracking-wider mt-0.5">
              Puntos Totales
            </div>
          </div>

          <div className="bg-[#181818] rounded-xl p-3.5 text-center">
            <div className="font-title text-3xl text-[#F5F5F5] tabular-nums">
              {userStats.rank}
            </div>
            <div className="text-[10px] uppercase font-bold text-[#8B8B8B] tracking-wider mt-0.5">
              Ranking Global
            </div>
          </div>

          <div className="bg-[#181818] rounded-xl p-3.5 text-center">
            <div className="font-title text-3xl text-[#F5F5F5] tabular-nums">
              {userStats.correctPredictions}
            </div>
            <div className="text-[10px] uppercase font-bold text-[#8B8B8B] tracking-wider mt-0.5">
              Picks Acertados
            </div>
          </div>

          <div className="bg-[#181818] rounded-xl p-3.5 text-center">
            <div className="font-title text-3xl text-[#F5F5F5] tabular-nums">
              {userStats.accuracy}%
            </div>
            <div className="text-[10px] uppercase font-bold text-[#8B8B8B] tracking-wider mt-0.5">
              Efectividad
            </div>
          </div>
        </div>
      </div>

      {/* Picks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#282828] pb-3">
          <h2 className="font-title text-2xl text-[#F5F5F5] tracking-wide">
            PREDICCIONES 2026/27
          </h2>
          <span className="text-xs text-[#8B8B8B]">
            {picks.length} REGISTRADAS
          </span>
        </div>

        {picks.length === 0 ? (
          <div className="bg-[#111111] border border-[#282828] rounded-2xl p-8 text-center text-sm text-[#8B8B8B]">
            Este usuario todavía no cargó predicciones para la temporada.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {picks.map((pick) => (
              <div
                key={pick.id}
                className="bg-[#111111] border border-[#282828] rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B8B8B]">
                      {pick.category}
                    </span>
                    <span className="text-xs text-[#555555]">•</span>
                    <span className="text-xs text-[#FF5A1F] font-title">{pick.points} PTS</span>
                  </div>
                  <div className="font-title text-lg text-[#F5F5F5] leading-tight">
                    {pick.typeName}
                  </div>
                  <div className="text-xs font-bold text-white mt-1">
                    {pick.selectionName}
                  </div>
                  <div className="text-[11px] text-[#8B8B8B]">
                    {pick.selectionSub}
                  </div>
                </div>

                <div>
                  {pick.status === 'CORRECT' && (
                    <span className="flex items-center gap-1 text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACERTO
                    </span>
                  )}
                  {pick.status === 'INCORRECT' && (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md">
                      <XCircle className="w-3.5 h-3.5" /> FALLO
                    </span>
                  )}
                  {pick.status === 'LOCKED' && (
                    <span className="text-xs font-semibold text-[#8B8B8B] bg-[#181818] px-2.5 py-1 rounded-md">
                      LOCKED
                    </span>
                  )}
                  {pick.status === 'OPEN' && (
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">
                      ABIERTO
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
