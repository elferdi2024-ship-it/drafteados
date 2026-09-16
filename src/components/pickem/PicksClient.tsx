// filepath: src/components/pickem/PicksClient.tsx
"use client";

import { useState, useEffect, useTransition, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Check, 
  ChevronRight, 
  AlertCircle, 
  Loader2, 
  User, 
  Sparkles,
  Flame,
  Trophy
} from 'lucide-react';
import { PlayerSelector, type PlayerOption } from './PlayerSelector';
import { TeamSelector, type TeamOption } from './TeamSelector';
import { AuthModal } from './AuthModal';
import { ProgressHUD } from './ProgressHUD';
import { LockModal } from './LockModal';
import { savePickAction, lockPicksAction } from '@/lib/pickem/actions';
import { isUnderdogPick, calculatePotentialPoints } from '@/lib/pickem/community';
import { getGuestPicks, saveGuestPicks, clearGuestPicks } from '@/lib/pickem/storage';
import { PredictionCard } from './PredictionCard';
import { getPlayerNbaId, getTeamNbaId } from '@/lib/basketball/nbaIds';
import { createClient } from '@/lib/supabase/client';

interface PredictionTypeItem {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: 'STATS' | 'AWARDS' | 'TEAMS' | 'FINALS';
  selectionType: 'player' | 'team';
  points: number;
  sortOrder: number;
}

interface ExistingPick {
  predictionTypeId: string;
  playerId: string | null;
  teamId: string | null;
  status: 'OPEN' | 'LOCKED' | 'CORRECT' | 'INCORRECT' | 'VOID';
}

interface PicksClientProps {
  season: {
    id: string;
    name: string;
    status: string;
    lockAt: string | null;
  };
  predictionTypes: PredictionTypeItem[];
  players: PlayerOption[];
  teams: TeamOption[];
  existingPicks: ExistingPick[];
  isLoggedIn: boolean;
}

const CATEGORY_META = {
  STATS: {
    label: 'ESTADÍSTICAS',
    badge: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30',
    accent: '#3B82F6',
  },
  AWARDS: {
    label: 'PREMIOS',
    badge: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
    accent: '#F59E0B',
  },
  TEAMS: {
    label: 'EQUIPOS',
    badge: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30',
    accent: '#10B981',
  },
  FINALS: {
    label: 'FINAL',
    badge: 'text-[#FF5A1F] bg-[#FF5A1F]/10 border-[#FF5A1F]/30',
    accent: '#FF5A1F',
  },
};

export function PicksClient({
  season,
  predictionTypes,
  players,
  teams,
  existingPicks,
  isLoggedIn,
}: PicksClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [picks, setPicks] = useState<Record<string, { playerId?: string | null; teamId?: string | null }>>({});
  const [isLocked, setIsLocked] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('ALL');

  const [activeType, setActiveType] = useState<PredictionTypeItem | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [lockError, setLockError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const teamMap = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);

  // Sincronización inicial y migración limpia de invitado -> registrado
  useEffect(() => {
    const initialMap: Record<string, { playerId?: string | null; teamId?: string | null }> = {};
    let anyLocked = false;

    if (existingPicks.length > 0) {
      for (const p of existingPicks) {
        initialMap[p.predictionTypeId] = { playerId: p.playerId, teamId: p.teamId };
        if (p.status === 'LOCKED') anyLocked = true;
      }
      setPicks(initialMap);
      setIsLocked(anyLocked);
      // Limpiar datos locales una vez respaldados
      clearGuestPicks(season.id);
    } else {
      const guestPicks = getGuestPicks(season.id);
      if (Object.keys(guestPicks).length > 0) {
        setPicks(guestPicks);

        // Si el usuario acaba de iniciar sesión y tenía picks de invitado, migrarlos a Supabase
        if (isLoggedIn) {
          startTransition(async () => {
            for (const [typeId, sel] of Object.entries(guestPicks)) {
              if (sel.playerId || sel.teamId) {
                await savePickAction({
                  seasonId: season.id,
                  predictionTypeId: typeId,
                  playerId: sel.playerId,
                  teamId: sel.teamId,
                });
              }
            }
            clearGuestPicks(season.id);
            showToast('¡Tus pronósticos de invitado se guardaron en tu cuenta!');
          });
        }
      }
    }
  }, [existingPicks, season.id, isLoggedIn]);

  // Si el usuario ya está autenticado en el navegador, cargar sus picks en vivo desde Supabase
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from('predictions')
          .select('prediction_type_id, player_id, team_id, status')
          .eq('user_id', user.id)
          .eq('season_id', season.id)
          .then(({ data: userPicks }) => {
            if (userPicks && userPicks.length > 0) {
              const loaded: Record<string, { playerId?: string | null; teamId?: string | null }> = {};
              let anyLocked = false;
              for (const p of userPicks) {
                loaded[p.prediction_type_id] = { playerId: p.player_id, teamId: p.team_id };
                if (p.status === 'LOCKED') anyLocked = true;
              }
              setPicks(loaded);
              setIsLocked(anyLocked);
            }
          });
      }
    });
  }, [season.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectPlayer = (player: PlayerOption) => {
    if (!activeType || isLocked) return;

    const newPicks = {
      ...picks,
      [activeType.id]: { playerId: player.id },
    };
    setPicks(newPicks);
    saveGuestPicks(season.id, newPicks);

    if (isLoggedIn) {
      startTransition(async () => {
        const res = await savePickAction({
          seasonId: season.id,
          predictionTypeId: activeType.id,
          playerId: player.id,
        });
        if (!res.success) {
          showToast(res.error || 'Error al guardar');
        } else {
          showToast(`Guardado: ${player.displayName}`);
        }
      });
    } else {
      showToast(`Guardado en el navegador. Iniciá sesión para asegurar tus puntos.`);
    }

    setActiveType(null);
  };

  const handleSelectTeam = (team: TeamOption) => {
    if (!activeType || isLocked) return;

    const newPicks = {
      ...picks,
      [activeType.id]: { teamId: team.id },
    };
    setPicks(newPicks);
    saveGuestPicks(season.id, newPicks);

    if (isLoggedIn) {
      startTransition(async () => {
        const res = await savePickAction({
          seasonId: season.id,
          predictionTypeId: activeType.id,
          teamId: team.id,
        });
        if (!res.success) {
          showToast(res.error || 'Error al guardar');
        } else {
          showToast(`Guardado: ${team.name}`);
        }
      });
    } else {
      showToast(`Guardado en el navegador. Iniciá sesión para asegurar tus puntos.`);
    }

    setActiveType(null);
  };

  const completedCount = Object.keys(picks).filter(
    (k) => picks[k]?.playerId || picks[k]?.teamId
  ).length;

  const allCompleted = completedCount === predictionTypes.length;

  // Cálculo dinámico de Puntos Potenciales y Underdogs seleccionados
  const { potentialPoints, underdogCount } = useMemo(() => {
    let total = 0;
    let underdogs = 0;

    for (const pt of predictionTypes) {
      const current = picks[pt.id];
      if (!current) continue;

      let isUnderdog = false;

      if (current.playerId) {
        const p = playerMap.get(current.playerId);
        if (p) {
          isUnderdog = isUnderdogPick(pt.slug, p.displayName);
        }
      } else if (current.teamId) {
        const t = teamMap.get(current.teamId);
        if (t) {
          isUnderdog = isUnderdogPick(pt.slug, t.abbreviation);
        }
      }

      if (isUnderdog) underdogs++;
      total += calculatePotentialPoints(pt.points, isUnderdog);
    }

    return { potentialPoints: total, underdogCount: underdogs };
  }, [picks, predictionTypes, playerMap, teamMap]);

  const handleLockConfirmation = () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    setLockError(null);
    setLockModalOpen(true);
  };

  const executeLock = async () => {
    startTransition(async () => {
      const res = await lockPicksAction(season.id);
      if (res.success) {
        setIsLocked(true);
        setLockModalOpen(false);
        clearGuestPicks(season.id);
        router.push('/pickem/locked');
      } else {
        setLockError(res.error || 'No se pudo bloquear la predicción.');
      }
    });
  };

  const getConferenceConstraint = (slug: string): 'East' | 'West' | undefined => {
    if (slug === 'east_champion') return 'East';
    if (slug === 'west_champion') return 'West';
    return undefined;
  };

  const filteredPredictions = predictionTypes.filter((pt) => {
    if (selectedCategoryTab === 'ALL') return true;
    return pt.category === selectedCategoryTab;
  });

  return (
    <div className="min-h-screen bg-[#080808] pb-36 text-[#F5F5F5] selection:bg-[#FF5A1F] selection:text-white">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#161616] border border-[#FF5A1F]/50 text-[#F5F5F5] text-xs font-semibold px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* FIXED PROGRESS HUD */}
      <ProgressHUD
        seasonName={season.name}
        completedCount={completedCount}
        totalCount={predictionTypes.length}
        potentialPoints={potentialPoints}
        underdogCount={underdogCount}
        isLocked={isLocked}
        selectedCategoryTab={selectedCategoryTab}
        onSelectCategoryTab={setSelectedCategoryTab}
      />

      {/* CARDS GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 space-y-4">
        {!isLoggedIn && (
          <div className="p-4 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#FF5A1F] shrink-0" />
              <div className="text-xs sm:text-sm text-[#F5F5F5]">
                <span className="font-bold">Modo invitado activo.</span> Tus elecciones se guardan automáticamente en tu navegador. Iniciá sesión para competir en el ranking global.
              </div>
            </div>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="shrink-0 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-sm tracking-wider px-5 py-2.5 rounded-xl transition-colors shadow-md"
            >
              INICIAR SESIÓN
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPredictions.map((type) => {
            const currentPick = picks[type.id];
            const selectedPlayer = currentPick?.playerId ? playerMap.get(currentPick.playerId) : null;
            const selectedTeam = currentPick?.teamId ? teamMap.get(currentPick.teamId) : null;
            const meta = CATEGORY_META[type.category];

            let isUnderdog = false;
            if (selectedPlayer) {
              isUnderdog = isUnderdogPick(type.slug, selectedPlayer.displayName);
            } else if (selectedTeam) {
              isUnderdog = isUnderdogPick(type.slug, selectedTeam.abbreviation);
            }

            const cardPoints = calculatePotentialPoints(type.points, isUnderdog);

            return (
              <PredictionCard
                key={type.id}
                prediction={{
                  id: type.id,
                  slug: type.slug,
                  name: type.name,
                  category: meta.label,
                  points: cardPoints,
                  seriesNumber: `#${String(type.sortOrder).padStart(2, '0')}`,
                  description: type.description || undefined,
                }}
                selectedPlayer={selectedPlayer ? {
                  id: selectedPlayer.id,
                  name: selectedPlayer.displayName,
                  nba_id: getPlayerNbaId(selectedPlayer.displayName),
                  team_abbreviation: selectedPlayer.team?.abbreviation || 'NBA',
                  team_primary_color: selectedPlayer.team?.primaryColor || '#FF5A1F',
                } : null}
                selectedTeam={selectedTeam ? {
                  id: selectedTeam.id,
                  name: selectedTeam.name,
                  abbreviation: selectedTeam.abbreviation,
                  nba_team_id: getTeamNbaId(selectedTeam.abbreviation),
                  primary_color: selectedTeam.primaryColor || '#10B981',
                } : null}
                isLocked={isLocked}
                isUnderdog={isUnderdog}
                onSelect={() => !isLocked && setActiveType(type)}
              />
            );
          })}
        </div>
        </div>

        {/* FLOATING ACTION HUD */}
        {!isLocked && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border-t border-white/10 p-3.5 sm:p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs">
                <div className="font-title text-lg sm:text-xl text-[#F5F5F5] tracking-wide flex items-center gap-2">
                  <span>{allCompleted ? '¡13/13 PREDICCIONES LISTAS!' : `FALTAN ${predictionTypes.length - completedCount} PREDICCIONES`}</span>
                  {underdogCount > 0 && (
                    <span className="badge-underdog text-[10px] px-2.5 py-0.5 rounded-md font-sans font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FBBF24]" />
                      +{underdogCount} Sorpresa x1.5
                    </span>
                  )}
                </div>
                <div className="text-[#8B8B8B] text-xs">
                  {allCompleted 
                    ? 'Bloqueá oficialmente para sellar tus puntos en el ranking.' 
                    : 'Completá todos los campos para poder sellar tu jugada.'}
                </div>
              </div>

              <button
                onClick={handleLockConfirmation}
                disabled={!allCompleted || isPending}
                className="bg-[#FF5A1F] hover:bg-[#FF6B35] disabled:opacity-40 disabled:hover:bg-[#FF5A1F] text-white font-title text-lg sm:text-2xl tracking-wider px-6 sm:px-10 py-3 sm:py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(255,90,31,0.4)]"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>SELLAR PREDICCIONES</span>
                    <Lock className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      {/* MODAL SELECTOR JUGADOR CON HEATMAP */}
      {activeType && activeType.selectionType === 'player' && (
        <PlayerSelector
          isOpen={true}
          onClose={() => setActiveType(null)}
          onSelect={handleSelectPlayer}
          selectedPlayerId={picks[activeType.id]?.playerId}
          title={activeType.name}
          categorySlug={activeType.slug}
          players={players}
        />
      )}

      {/* MODAL SELECTOR EQUIPO CON HEATMAP */}
      {activeType && activeType.selectionType === 'team' && (
        <TeamSelector
          isOpen={true}
          onClose={() => setActiveType(null)}
          onSelect={handleSelectTeam}
          selectedTeamId={picks[activeType.id]?.teamId}
          title={activeType.name}
          categorySlug={activeType.slug}
          conferenceConstraint={getConferenceConstraint(activeType.slug)}
          teams={teams}
        />
      )}

      {/* MODAL DE CONFIRMACIÓN CON CONFETI */}
      <LockModal
        isOpen={lockModalOpen}
        onClose={() => setLockModalOpen(false)}
        onConfirm={executeLock}
        isPending={isPending}
        lockError={lockError}
        potentialPoints={potentialPoints}
        underdogCount={underdogCount}
      />

      {/* MODAL DE ACCESO */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirectTo="/pickem/picks"
      />
    </div>
  );
}
