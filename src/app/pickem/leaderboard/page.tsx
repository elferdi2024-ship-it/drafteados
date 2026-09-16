"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Target, User, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface LeaderboardRow {
  userId: string;
  username: string;
  displayName: string | null;
  totalPoints: number;
  correctPredictions: number;
  resolvedPredictions: number;
  accuracy: number;
}

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      const supabase = createClient();

      const { data: seasons } = await supabase
        .from('seasons')
        .select('id, name')
        .eq('name', '2026/27')
        .limit(1);

      const season = seasons?.[0];

      if (season) {
        const { data: rawLeaderboard } = await supabase
          .from('leaderboard')
          .select('*')
          .eq('season_id', season.id)
          .order('total_points', { ascending: false });

        if (rawLeaderboard && rawLeaderboard.length > 0) {
          const userIds = rawLeaderboard.map((r) => r.user_id);
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, username, display_name')
            .in('id', userIds);

          const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

          const mapped = rawLeaderboard.map((row) => {
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

          setLeaderboardData(mapped);
        }
      }

      setLoading(false);
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-pickem-bg text-white pb-24">
      {/* Header */}
      <div className="border-b border-pickem-border bg-pickem-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/pickem"
            className="font-title text-xl tracking-wider text-white hover:text-pickem-gold transition-colors"
          >
            DRAFTEADOS PICK'EM
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pickem/picks"
              className="text-xs font-mono uppercase tracking-wider text-pickem-gold hover:underline"
            >
              Hacer Picks
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pickem-gold/10 border border-pickem-gold/30 text-pickem-gold font-mono text-xs uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Temporada 2026/27</span>
          </div>
          <h1 className="font-title text-4xl sm:text-5xl tracking-tight text-white mb-2">
            TABLA DE CLASIFICACIÓN
          </h1>
          <p className="font-sans text-sm text-pickem-muted max-w-md mx-auto">
            El ranking oficial de la comunidad de Buques. Acierta tus predicciones para escalar a la cima.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="w-8 h-8 text-pickem-gold animate-spin mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-pickem-muted">Cargando clasificación oficial...</p>
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="rounded-2xl border border-pickem-border bg-pickem-card/50 p-12 text-center backdrop-blur-sm">
            <Target className="w-12 h-12 text-pickem-muted mx-auto mb-4 opacity-50" />
            <h3 className="font-title text-xl text-white mb-2">AÚN NO HAY PUNTOS REGISTRADOS</h3>
            <p className="font-sans text-sm text-pickem-muted max-w-sm mx-auto mb-6">
              Las predicciones se resolverán conforme avance la temporada regular. ¡Completa tus picks para estar listo!
            </p>
            <Link
              href="/pickem/picks"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pickem-gold text-black font-title tracking-wider hover:bg-pickem-gold/90 transition-all uppercase"
            >
              <span>Hacer mis pronósticos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-pickem-border bg-pickem-card/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-pickem-border bg-pickem-surface/50 font-mono text-[11px] text-pickem-muted uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16 text-center">POS</th>
                    <th className="py-3.5 px-4">BUQUE</th>
                    <th className="py-3.5 px-4 text-center">ACIERTOS</th>
                    <th className="py-3.5 px-4 text-center">PRECISIÓN</th>
                    <th className="py-3.5 px-4 text-right">PUNTOS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pickem-border/50 text-sm">
                  {leaderboardData.map((row, index) => {
                    const isTop1 = index === 0;
                    const isTop2 = index === 1;
                    const isTop3 = index === 2;

                    return (
                      <tr
                        key={row.userId}
                        className={`hover:bg-pickem-surface/40 transition-colors ${
                          isTop1 ? 'bg-amber-500/5 font-medium' : ''
                        }`}
                      >
                        <td className="py-4 px-4 text-center">
                          {isTop1 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 font-title text-base">
                              1
                            </span>
                          ) : isTop2 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300/20 text-slate-300 font-title text-base">
                              2
                            </span>
                          ) : isTop3 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-600 font-title text-base">
                              3
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-pickem-muted">
                              {index + 1}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            href={`/pickem/profile?u=${row.username}`}
                            className="flex items-center gap-3 group"
                          >
                            <div className="w-8 h-8 rounded-full bg-pickem-surface border border-pickem-border flex items-center justify-center text-pickem-muted group-hover:text-pickem-gold group-hover:border-pickem-gold/50 transition-colors">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-sans font-medium text-white group-hover:text-pickem-gold transition-colors">
                                {row.displayName || row.username}
                              </div>
                              <div className="font-mono text-xs text-pickem-muted">
                                @{row.username}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-xs text-pickem-muted">
                          <span className="text-emerald-400 font-semibold">{row.correctPredictions}</span> / {row.resolvedPredictions}
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-xs text-pickem-muted">
                          {row.accuracy}%
                        </td>
                        <td className="py-4 px-4 text-right font-title text-xl text-pickem-gold tracking-wide">
                          {row.totalPoints}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
