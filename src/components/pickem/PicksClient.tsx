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
import { CountdownLockBanner } from './CountdownLockBanner';
import { savePickAction, lockPicksAction } from '@/lib/pickem/actions';
import { isUnderdogPick, calculatePotentialPoints } from '@/lib/pickem/community';
import { getGuestPicks, saveGuestPicks, clearGuestPicks } from '@/lib/pickem/storage';
import { PredictionCard } from './PredictionCard';
import { sortPlayersForCategory, ROOKIE_PLAYER_OPTIONS } from '@/lib/pickem/candidateOrder';
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

  const playerMap = useMemo(() => {
    const map = new Map<string, PlayerOption>();
    // Cargar novatos primero
    for (const r of ROOKIE_PLAYER_OPTIONS) {
      map.set(r.id, r);
    }
    // Cargar jugadores de la base de datos
    for (const p of players) {
      map.set(p.id, p);
    }
    return map;
  }, [players]);

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
          .select('prediction_type_id, player_id, team_id, selected_value, status')
          .eq('user_id', user.id)
          .eq('season_id', season.id)
          .then(({ data: userPicks }) => {
            if (userPicks && userPicks.length > 0) {
              const loaded: Record<string, { playerId?: string | null; teamId?: string | null }> = {};
              let anyLocked = false;
              for (const p of userPicks) {
                loaded[p.prediction_type_id] = { 
                  playerId: p.player_id || p.selected_value, 
                  teamId: p.team_id || (!p.player_id ? p.selected_value : null)
                };
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

  const eastChampType = useMemo(
    () => predictionTypes.find((pt) => pt.slug === 'east_champion' || pt.slug === 'east-champion'),
    [predictionTypes]
  );
  const westChampType = useMemo(
    () => predictionTypes.find((pt) => pt.slug === 'west_champion' || pt.slug === 'west-champion'),
    [predictionTypes]
  );
  const nbaChampType = useMemo(
    () => predictionTypes.find((pt) => pt.slug === 'nba_champion' || pt.slug === 'nba-champion'),
    [predictionTypes]
  );

  // Equipos seleccionados como campeones de conferencia
  const eastChampionTeam = useMemo(() => {
    if (!eastChampType) return null;
    const teamId = picks[eastChampType.id]?.teamId;
    return teamId ? teamMap.get(teamId) || null : null;
  }, [eastChampType, picks, teamMap]);

  const westChampionTeam = useMemo(() => {
    if (!westChampType) return null;
    const teamId = picks[westChampType.id]?.teamId;
    return teamId ? teamMap.get(teamId) || null : null;
  }, [westChampType, picks, teamMap]);

  // Lista dinámica para el selector:
  // Si la categoría es 'nba_champion', las ÚNICAS opciones son estrictamente los 2 finalistas
  const availableTeamsForActive = useMemo(() => {
    if (!activeType) return teams;
    const isNbaChamp = activeType.slug === 'nba_champion' || activeType.slug === 'nba-champion';
    if (isNbaChamp) {
      const finalists: TeamOption[] = [];
      if (eastChampionTeam) finalists.push(eastChampionTeam);
      if (westChampionTeam) finalists.push(westChampionTeam);
      return finalists;
    }
    return teams;
  }, [activeType, teams, eastChampionTeam, westChampionTeam]);

  // Salvaguarda de consistencia: si el Campeón NBA guardado ya no coincide con los finalistas
  useEffect(() => {
    if (!nbaChampType) return;
    const currentNbaTeamId = picks[nbaChampType.id]?.teamId;
    if (!currentNbaTeamId) return;

    const validIds: string[] = [];
    if (eastChampionTeam) validIds.push(eastChampionTeam.id);
    if (westChampionTeam) validIds.push(westChampionTeam.id);

    if (validIds.length > 0 && !validIds.includes(currentNbaTeamId)) {
      setPicks((prev) => {
        const next = { ...prev };
        delete next[nbaChampType.id];
        saveGuestPicks(season.id, next);
        return next;
      });

      if (isLoggedIn) {
        savePickAction({
          seasonId: season.id,
          predictionTypeId: nbaChampType.id,
          teamId: null,
        });
      }
    }
  }, [eastChampionTeam, westChampionTeam, nbaChampType, picks, season.id, isLoggedIn]);

  const handleSelectTeam = (team: TeamOption) => {
    if (!activeType || isLocked) return;

    const newPicks = {
      ...picks,
      [activeType.id]: { teamId: team.id },
    };

    // Si el usuario cambia el campeón del Este o del Oeste, resetear el Campeón NBA
    // si correspondía al equipo sustituido
    const isEast = activeType.slug === 'east_champion' || activeType.slug === 'east-champion';
    const isWest = activeType.slug === 'west_champion' || activeType.slug === 'west-champion';

    if ((isEast || isWest) && nbaChampType) {
      const currentNbaPick = picks[nbaChampType.id];
      const previousTeamId = picks[activeType.id]?.teamId;

      if (
        currentNbaPick?.teamId &&
        currentNbaPick.teamId === previousTeamId &&
        previousTeamId !== team.id
      ) {
        delete newPicks[nbaChampType.id];
        if (isLoggedIn) {
          startTransition(async () => {
            await savePickAction({
              seasonId: season.id,
              predictionTypeId: nbaChampType.id,
              teamId: null,
            });
          });
        }
        showToast(`Guardado: ${team.name}. Se reseteó el Campeón NBA al cambiar el finalista.`);
      }
    }

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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-[#161616] border border-[#FF5A1F] text-zinc-900 dark:text-[#F5F5F5] text-xs font-mono font-bold px-5 py-2.5 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-4">
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
        onOpenLockModal={handleLockConfirmation}
      />

      {/* CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <CountdownLockBanner targetDate={season.lockAt || undefined} />

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
              className="shrink-0 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-sm tracking-wider px-5 py-2.5 rounded-xl transition-colors shadow-md cursor-pointer"
            >
              INICIAR SESIÓN
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
            const isNbaChamp = type.slug === 'nba_champion' || type.slug === 'nba-champion';
            const finalsDefined = Boolean(eastChampionTeam && westChampionTeam);
            const dynamicDescription = isNbaChamp
              ? finalsDefined
                ? `Finalistas definidos: ${eastChampionTeam!.abbreviation} vs ${westChampionTeam!.abbreviation}. ¿Quién es el campeón?`
                : 'Requiere definir Campeón del Este y Campeón del Oeste primero.'
              : type.description || undefined;

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
                  description: dynamicDescription,
                }}
                selectedPlayer={selectedPlayer ? {
                  id: selectedPlayer.id,
                  name: selectedPlayer.displayName,
                  nba_id: getPlayerNbaId(selectedPlayer.displayName),
                  team_abbreviation: selectedPlayer.team?.abbreviation || 'NBA',
                  team_primary_color: selectedPlayer.team?.primaryColor || '#FF5A1F',
                  position: selectedPlayer.position || undefined,
                  jersey_number: selectedPlayer.jerseyNumber || undefined,
                } : null}
                selectedTeam={selectedTeam ? {
                  id: selectedTeam.id,
                  name: selectedTeam.name,
                  abbreviation: selectedTeam.abbreviation,
                  nba_team_id: getTeamNbaId(selectedTeam.abbreviation),
                  primary_color: selectedTeam.primaryColor || '#10B981',
                  conference: selectedTeam.conference,
                } : null}
                isLocked={isLocked}
                isUnderdog={isUnderdog}
                onSelect={() => {
                  if (isLocked) return;
                  if (isNbaChamp && !finalsDefined) {
                    if (!eastChampionTeam && !westChampionTeam) {
                      showToast('Elegí primero al Campeón del Este y al Campeón del Oeste.');
                    } else if (!eastChampionTeam) {
                      showToast('Elegí primero al Campeón del Este.');
                    } else {
                      showToast('Elegí primero al Campeón del Oeste.');
                    }
                  }
                  setActiveType(type);
                }}
              />
            );
          })}
        </div>
        </div>

        {/* FLOATING ACTION BAR */}
        {!isLocked && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 p-3 sm:p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] transition-colors">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div>
                <div
                  className="text-lg sm:text-xl text-zinc-950 dark:text-white uppercase tracking-tight font-black leading-none"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  {allCompleted ? "¡13/13 PREDICCIONES LISTAS!" : `FALTAN ${predictionTypes.length - completedCount} PREDICCIONES`}
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                  {allCompleted 
                    ? "Bloqueá oficialmente para sellar tus puntos en el ranking." 
                    : "Completá las 13 categorías para sellar tu jugada."}
                </div>
              </div>

              <button
                onClick={handleLockConfirmation}
                disabled={!allCompleted || isPending}
                className="bg-[#FF5A1F] hover:bg-[#FF6B35] disabled:opacity-40 disabled:hover:bg-[#FF5A1F] text-white font-title text-base sm:text-xl tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#FF5A1F]/25 cursor-pointer shrink-0"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>SELLAR PICKS</span>
                    <Lock className="w-4 h-4" />
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

      {/* MODAL SELECTOR EQUIPO CON HEATMAP (En Finales estrictamente los 2 finalistas) */}
      {activeType && activeType.selectionType === 'team' && (
        <TeamSelector
          isOpen={true}
          onClose={() => setActiveType(null)}
          onSelect={handleSelectTeam}
          selectedTeamId={picks[activeType.id]?.teamId}
          title={activeType.name}
          categorySlug={activeType.slug}
          conferenceConstraint={getConferenceConstraint(activeType.slug)}
          teams={availableTeamsForActive}
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
