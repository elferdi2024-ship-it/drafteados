"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Target, User, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { PageHeader } from '@/components/ui/PageHeader';

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
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] pb-24">
      <main className="max-w-4xl mx-auto px-4 pt-6 sm:pt-10">
        <PageHeader
          eyebrow="TEMPORADA NBA 2026/27 · PRONÓSTICO OFICIAL"
          title="Tabla de Clasificación"
          description="El ranking oficial de la comunidad de los Buques. Acierta tus predicciones para escalar a la cima."
          actions={
            <Link
              href="/pickem/picks"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Hacer Picks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="w-8 h-8 text-[var(--color-brand-primary)] animate-spin mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Cargando clasificación oficial...</p>
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-12 text-center">
            <Target className="w-12 h-12 text-[var(--color-text-dim)] mx-auto mb-4 opacity-50" />
            <h3 className="font-display text-2xl text-[var(--color-text-primary)] mb-2 uppercase">Aún no hay puntos registrados</h3>
            <p className="font-sans text-sm text-[var(--color-text-muted)] max-w-sm mx-auto mb-6">
              Las predicciones se resolverán conforme avance la temporada regular. ¡Completa tus picks para estar listo!
            </p>
            <Link
              href="/pickem/picks"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white font-display text-lg tracking-wider transition-all uppercase"
            >
              <span>Hacer mis pronósticos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-2)] font-mono text-[11px] text-[var(--color-text-dim)] uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16 text-center">POS</th>
                    <th className="py-3.5 px-4">BUQUE</th>
                    <th className="py-3.5 px-4 text-center">ACIERTOS</th>
                    <th className="py-3.5 px-4 text-center">PRECISIÓN</th>
                    <th className="py-3.5 px-4 text-right">PUNTOS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)] text-sm font-sans">
                  {leaderboardData.map((row, index) => {
                    const isTop1 = index === 0;
                    const isTop2 = index === 1;
                    const isTop3 = index === 2;

                    return (
                      <tr
                        key={row.userId}
                        className={`hover:bg-[var(--color-surface-2)] transition-colors ${
                          isTop1 ? 'bg-[var(--color-brand-soft)] font-medium' : ''
                        }`}
                      >
                        <td className="py-4 px-4 text-center">
                          {isTop1 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-brand-primary)] text-white font-display text-base">
                              1
                            </span>
                          ) : isTop2 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neutral-600 text-white font-display text-base">
                              2
                            </span>
                          ) : isTop3 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neutral-700 text-[var(--color-brand-primary)] font-display text-base">
                              3
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-[var(--color-text-dim)]">
                              {index + 1}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            href={`/pickem/profile?u=${row.username}`}
                            className="flex items-center gap-3 group"
                          >
                            <div className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] group-hover:border-[var(--color-border-accent)] transition-colors">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-sans font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                                {row.displayName || row.username}
                              </div>
                              <div className="font-mono text-xs text-[var(--color-text-dim)]">
                                @{row.username}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-xs text-[var(--color-text-muted)]">
                          <span className="text-[var(--color-state-win)] font-semibold">{row.correctPredictions}</span> / {row.resolvedPredictions}
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-xs text-[var(--color-text-muted)]">
                          {row.accuracy}%
                        </td>
                        <td className="py-4 px-4 text-right font-display text-xl text-[var(--color-brand-primary)] tracking-wide">
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
