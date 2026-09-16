"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LockedViewClient } from '@/components/pickem/LockedViewClient';
import { isUnderdogPick, calculatePotentialPoints } from '@/lib/pickem/community';
import { Loader2 } from 'lucide-react';

export default function LockedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    username: string;
    userPicks: any[];
    potentialPoints: number;
  }>({
    username: 'buque',
    userPicks: [],
    potentialPoints: 0,
  });

  useEffect(() => {
    async function loadLocked() {
      setLoading(true);
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();

      const { data: seasons } = await supabase
        .from('seasons')
        .select('id, name')
        .eq('name', '2026/27')
        .limit(1);

      const season = seasons?.[0];

      let username = 'buque';
      if (user) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        if (prof?.username) {
          username = prof.username;
        }
      }

      let userPicks: any[] = [];
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
              jersey_number
            ),
            teams:team_id (
              name,
              abbreviation
            )
          `)
          .eq('user_id', user.id)
          .eq('season_id', season.id);

        if (rawPicks && rawPicks.length > 0) {
          userPicks = rawPicks.map((rp: any) => {
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

            const selectionId = rp.player_id || rp.team_id || '';
            const underdog = pt ? isUnderdogPick(pt.slug, selectionId) : false;

            return {
              id: rp.id,
              pointsAwarded: rp.points_awarded || 0,
              status: rp.status,
              typeName: pt?.name || 'Predicción',
              category: pt?.category || 'GENERAL',
              points: pt?.points || 0,
              selectionName: sName,
              selectionSub: sSub,
              isUnderdog: underdog,
            };
          });

          potentialPoints = userPicks.reduce(
            (acc, p) => acc + calculatePotentialPoints(p.points, Boolean(p.isUnderdog)),
            0
          );
        }
      }

      setData({
        username,
        userPicks,
        potentialPoints,
      });
      setLoading(false);
    }

    loadLocked();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-pickem-bg flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-pickem-gold animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-pickem-muted">Cargando sobre sellado...</p>
      </div>
    );
  }

  if (data.userPicks.length === 0) {
    return (
      <div className="min-h-screen bg-pickem-bg flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-title text-3xl text-white mb-2">NO TIENES PRONÓSTICOS SELLADOS</h2>
        <p className="font-sans text-sm text-pickem-muted mb-6">Completa tus 13 predicciones y sella tu sobre para acceder aquí.</p>
        <Link href="/pickem/picks" className="px-6 py-3 bg-pickem-gold text-black font-title tracking-wider rounded-xl uppercase">
          Ir al tablero de picks
        </Link>
      </div>
    );
  }

  return (
    <LockedViewClient
      username={data.username}
      userPicks={data.userPicks}
      potentialPoints={data.potentialPoints}
    />
  );
}
