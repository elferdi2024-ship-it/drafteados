"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Target, Award, CheckCircle2, XCircle, ArrowLeft, User, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function ProfileContent() {
  const searchParams = useSearchParams();
  const requestedUsername = searchParams.get('u') || searchParams.get('username');

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalPoints: 0,
    correctPredictions: 0,
    resolvedPredictions: 0,
    accuracy: 0,
    rank: '-',
  });
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const supabase = createClient();

      let targetUser = requestedUsername;
      if (!targetUser || targetUser === 'me') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: myProfile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();
          targetUser = myProfile?.username || 'buque';
        } else {
          targetUser = 'buque';
        }
      }

      // Fetch profile by username
      const { data: prof } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, created_at')
        .eq('username', targetUser)
        .maybeSingle();

      if (!prof) {
        setLoading(false);
        return;
      }

      setProfile(prof);

      // Fetch season
      const { data: seasons } = await supabase
        .from('seasons')
        .select('id, name')
        .eq('name', '2026/27')
        .limit(1);

      const season = seasons?.[0];

      if (season) {
        // Fetch stats
        const { data: lbEntry } = await supabase
          .from('leaderboard')
          .select('*')
          .eq('user_id', prof.id)
          .eq('season_id', season.id)
          .maybeSingle();

        if (lbEntry) {
          const { count } = await supabase
            .from('leaderboard')
            .select('*', { count: 'exact', head: true })
            .eq('season_id', season.id)
            .gt('total_points', lbEntry.total_points || 0);

          setStats({
            totalPoints: lbEntry.total_points || 0,
            correctPredictions: lbEntry.correct_predictions || 0,
            resolvedPredictions: lbEntry.resolved_predictions || 0,
            accuracy: Number(lbEntry.accuracy) || 0,
            rank: `#${(count || 0) + 1}`,
          });
        }

        // Fetch predictions
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
              jersey_number
            ),
            teams:team_id (
              name,
              abbreviation
            )
          `)
          .eq('user_id', prof.id)
          .eq('season_id', season.id);

        if (rawPicks) {
          const mapped = rawPicks.map((rp: any) => {
            const pt = Array.isArray(rp.prediction_types) ? rp.prediction_types[0] : rp.prediction_types;
            const pl = Array.isArray(rp.players) ? rp.players[0] : rp.players;
            const tm = Array.isArray(rp.teams) ? rp.teams[0] : rp.teams;

            let sName = 'Sin selección';
            let sSub = '';

            if (pl) {
              sName = pl.display_name;
              sSub = `${pl.position || ''} • #${pl.jersey_number || ''}`.trim();
            } else if (tm) {
              sName = tm.name;
              sSub = tm.abbreviation || '';
            }

            return {
              id: rp.id,
              pointsAwarded: rp.points_awarded || 0,
              status: rp.status,
              typeName: pt?.name || 'Predicción',
              category: pt?.category || 'GENERAL',
              points: pt?.points || 0,
              selectionName: sName,
              selectionSub: sSub,
            };
          });
          setPredictions(mapped);
        }
      }

      setLoading(false);
    }

    loadProfile();
  }, [requestedUsername]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pickem-bg flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-pickem-gold animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-pickem-muted">Cargando perfil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-pickem-bg flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-title text-4xl text-white mb-2">BUQUE NO ENCONTRADO</h1>
        <p className="font-sans text-sm text-pickem-muted mb-6">El usuario especificado no existe o no tiene perfil público.</p>
        <Link href="/pickem/leaderboard" className="px-6 py-3 bg-pickem-gold text-black font-title tracking-wider rounded-xl uppercase">
          Ver Clasificación
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pickem-bg text-white pb-24">
      {/* Header / Nav */}
      <div className="border-b border-pickem-border bg-pickem-card/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/pickem/leaderboard"
            className="flex items-center gap-2 text-pickem-muted hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tabla de Clasificación</span>
          </Link>
          <div className="font-mono text-xs text-pickem-gold">TEMPORADA 2026/27</div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        {/* Profile Card */}
        <div className="relative rounded-2xl border border-pickem-border bg-gradient-to-b from-pickem-card/80 to-pickem-card/40 p-6 md:p-8 backdrop-blur-md mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pickem-gold/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-24 h-24 rounded-2xl bg-pickem-surface border-2 border-pickem-border flex items-center justify-center text-pickem-gold shadow-xl">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <User className="w-12 h-12 text-pickem-muted" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="font-title text-3xl md:text-4xl tracking-tight text-white uppercase">
                  {profile.display_name || profile.username}
                </h1>
                <span className="self-center px-2.5 py-0.5 rounded-full bg-pickem-gold/10 border border-pickem-gold/30 text-pickem-gold font-mono text-xs uppercase tracking-wider">
                  @{profile.username}
                </span>
              </div>
              <p className="font-mono text-xs text-pickem-muted">
                Tripulante del Buque desde {new Date(profile.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Rank badge */}
            <div className="flex flex-col items-center md:items-end justify-center bg-pickem-surface/60 border border-pickem-border/60 rounded-xl px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-pickem-muted mb-1">Rango Oficial</span>
              <span className="font-title text-3xl text-pickem-gold tracking-wider">{stats.rank}</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-pickem-border/50">
            <div className="bg-pickem-surface/40 rounded-xl p-3.5 border border-pickem-border/40">
              <div className="flex items-center gap-2 text-pickem-gold text-xs font-mono mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>PUNTOS TOTALES</span>
              </div>
              <span className="font-title text-2xl text-white tracking-wide">{stats.totalPoints}</span>
            </div>

            <div className="bg-pickem-surface/40 rounded-xl p-3.5 border border-pickem-border/40">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ACERTADAS</span>
              </div>
              <span className="font-title text-2xl text-white tracking-wide">{stats.correctPredictions}</span>
            </div>

            <div className="bg-pickem-surface/40 rounded-xl p-3.5 border border-pickem-border/40">
              <div className="flex items-center gap-2 text-pickem-muted text-xs font-mono mb-1">
                <Target className="w-3.5 h-3.5" />
                <span>RESUELTAS</span>
              </div>
              <span className="font-title text-2xl text-white tracking-wide">{stats.resolvedPredictions}/13</span>
            </div>

            <div className="bg-pickem-surface/40 rounded-xl p-3.5 border border-pickem-border/40">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>PRECISIÓN</span>
              </div>
              <span className="font-title text-2xl text-white tracking-wide">{stats.accuracy}%</span>
            </div>
          </div>
        </div>

        {/* User Predictions List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-title text-xl text-white tracking-wide uppercase">PRONÓSTICOS DE LA TEMPORADA</h2>
            <span className="font-mono text-xs text-pickem-muted">{predictions.length}/13 Registrados</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {predictions.map((p) => (
              <div 
                key={p.id}
                className="flex items-center justify-between p-4 rounded-xl border border-pickem-border/70 bg-pickem-card/50 backdrop-blur-sm"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase text-pickem-muted tracking-wider block mb-1">
                    {p.category} • {p.typeName}
                  </span>
                  <p className="font-sans font-semibold text-white text-sm">
                    {p.selectionName}
                  </p>
                  {p.selectionSub && (
                    <span className="font-mono text-xs text-pickem-muted/80">{p.selectionSub}</span>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-xs text-pickem-gold font-bold">+{p.points} PTS</span>
                  {p.status === 'CORRECT' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Acertado
                    </span>
                  ) : p.status === 'INCORRECT' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-red-400">
                      <XCircle className="w-3 h-3" /> Fallado
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase text-pickem-muted">En juego</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-pickem-bg flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-pickem-gold animate-spin mb-4" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
