// filepath: src/app/pickem/leaderboard/page.tsx
import Link from 'next/link';
import { Trophy, Medal, Target, User, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface LeaderboardRow {
  userId: string;
  username: string;
  displayName: string | null;
  totalPoints: number;
  correctPredictions: number;
  resolvedPredictions: number;
  accuracy: number;
}

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Get active season
  const { data: seasons } = await supabase
    .from('seasons')
    .select('id, name')
    .eq('name', '2026/27')
    .limit(1);

  const season = seasons?.[0];

  let leaderboardData: LeaderboardRow[] = [];

  if (season) {
    // Query leaderboard view
    const { data: rawLeaderboard } = await supabase
      .from('leaderboard')
      .select('*')
      .eq('season_id', season.id)
      .order('total_points', { ascending: false });

    if (rawLeaderboard && rawLeaderboard.length > 0) {
      // Fetch profiles for these users
      const userIds = rawLeaderboard.map((r) => r.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, display_name')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

      leaderboardData = rawLeaderboard.map((row) => {
        const prof = profileMap.get(row.user_id);
        return {
          userId: row.user_id,
          username: prof?.username || 'buque',
          displayName: prof?.display_name || null,
          totalPoints: row.total_points || 0,
          correctPredictions: row.correct_predictions || 0,
          resolvedPredictions: row.resolved_predictions || 0,
          accuracy: Number(row.accuracy) || 0,
        };
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 sm:px-8 pt-10 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 text-[#FF5A1F] font-title text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          Temporada 2026/27
        </div>
        <h1 className="font-title text-5xl sm:text-7xl tracking-tight text-[#F5F5F5] uppercase">
          RANKING GLOBAL
        </h1>
        <p className="text-sm sm:text-base text-[#8B8B8B] max-w-md mx-auto">
          Los mejores pronosticadores de la comunidad Drafteados. ¿Tenés lo que se necesita para liderar?
        </p>
      </div>

      {leaderboardData.length === 0 ? (
        /* Empty State */
        <div className="bg-[#111111] border border-[#282828] rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 bg-[#181818] border border-[#282828] rounded-2xl flex items-center justify-center mx-auto text-[#FF5A1F]">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-title text-3xl text-[#F5F5F5] tracking-tight mb-2">
              EL TABLERO ESTÁ LIMPIO
            </h2>
            <p className="text-xs sm:text-sm text-[#8B8B8B] leading-relaxed">
              Todavía nadie bloqueó sus 13 picks para esta temporada. ¡Sé el primer Buque en dejar asentado su pronóstico!
            </p>
          </div>
          <Link
            href="/pickem/picks"
            className="inline-flex items-center justify-center gap-2 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-xl tracking-wider px-8 py-3 rounded-xl transition-transform hover:scale-105"
          >
            HACER MIS PICKS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Leaderboard Table */
        <div className="bg-[#111111] border border-[#282828] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#282828] bg-[#0d0d0d] text-[11px] uppercase tracking-wider font-semibold text-[#8B8B8B]">
                  <th className="py-4 px-4 sm:px-6 w-16 text-center">Pos</th>
                  <th className="py-4 px-4">Buque</th>
                  <th className="py-4 px-4 text-right">Puntos</th>
                  <th className="py-4 px-4 text-right hidden sm:table-cell">Aciertos</th>
                  <th className="py-4 px-4 text-right hidden sm:table-cell">Precisión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c] text-sm">
                {leaderboardData.map((row, idx) => {
                  const rank = idx + 1;
                  const isTop3 = rank <= 3;
                  const medalColor = rank === 1 ? 'text-[#FF5A1F]' : rank === 2 ? 'text-neutral-300' : 'text-amber-600';

                  return (
                    <tr
                      key={row.userId}
                      className={`hover:bg-[#181818] transition-colors ${
                        rank === 1 ? 'bg-[#FF5A1F]/5' : ''
                      }`}
                    >
                      <td className="py-4 px-4 sm:px-6 text-center">
                        {isTop3 ? (
                          <div className={`font-title text-xl flex items-center justify-center gap-1 ${medalColor}`}>
                            <Medal className="w-4 h-4" />
                            {rank}
                          </div>
                        ) : (
                          <span className="font-title text-base text-[#8B8B8B]">
                            #{rank}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Link 
                          href={`/pickem/profile/${row.username}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#282828] flex items-center justify-center font-title text-xs text-[#FF5A1F] group-hover:border-[#FF5A1F] transition-colors">
                            {row.username.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors">
                              @{row.username}
                            </div>
                            {row.displayName && (
                              <div className="text-xs text-[#8B8B8B]">
                                {row.displayName}
                              </div>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-title text-2xl text-[#F5F5F5] tabular-nums">
                          {row.totalPoints}
                        </span>
                        <span className="text-[11px] text-[#8B8B8B] ml-1 font-semibold">PTS</span>
                      </td>
                      <td className="py-4 px-4 text-right hidden sm:table-cell text-[#8B8B8B] font-semibold tabular-nums">
                        {row.correctPredictions} / 13
                      </td>
                      <td className="py-4 px-4 text-right hidden sm:table-cell">
                        <span className="font-semibold text-white/90 tabular-nums">
                          {row.accuracy}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
