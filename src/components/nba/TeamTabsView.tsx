// filepath: src/components/nba/TeamTabsView.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Calendar, TrendingUp, DollarSign, Search, Trophy, CheckCircle2, XCircle } from "lucide-react";
import type { Team, Standing, Player, Game } from "@/types/basketball";
import { TeamLogo } from "./TeamLogo";
import { GameCard } from "./GameCard";
import { PlayerHeadshot } from "./PlayerHeadshot";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";
import { getTeamBySlug, getTeamByTricode } from "@/lib/nba/teamAssets";

function mapGameToCardProps(game: Game) {
  const awayNbaId = getTeamNbaId(game.awayTeam.abbreviation, game.awayTeam.name);
  const homeNbaId = getTeamNbaId(game.homeTeam.abbreviation, game.homeTeam.name);

  let statusLabel = "Programado";
  if (game.status === "live") {
    statusLabel = `${game.period ? `${game.period}Q` : "EN VIVO"} ${game.clock || ""}`.trim();
  } else if (game.status === "final") {
    statusLabel = "Final";
  }

  return {
    status: (game.status === "live" ? "live" : game.status === "final" ? "final" : "scheduled") as "live" | "final" | "scheduled",
    statusLabel,
    date: game.date,
    broadcast: game.broadcast,
    arena: game.arena,
    href: `/nba/partido/${game.id}`,
    away: {
      tricode: game.awayTeam.abbreviation,
      name: game.awayTeam.name,
      record: game.awayRecord,
      logoUrl: awayNbaId ? getTeamLogoUrl(awayNbaId) : undefined,
      score: game.awayScore,
    },
    home: {
      tricode: game.homeTeam.abbreviation,
      name: game.homeTeam.name,
      record: game.homeRecord,
      logoUrl: homeNbaId ? getTeamLogoUrl(homeNbaId) : undefined,
      score: game.homeScore,
    },
  };
}

interface TeamTabsViewProps {
  team: Team;
  teamStanding?: Standing;
  recent: Game[];
  upcoming: Game[];
  roster: Player[];
}

function formatPosition(pos?: string): string {
  if (!pos) return "Jugador";
  const p = pos.toUpperCase().trim();
  if (p === "PG") return "Base";
  if (p === "SG") return "Escolta";
  if (p === "G") return "Base / Escolta";
  if (p === "SF") return "Alero";
  if (p === "PF") return "Ala-Pívot";
  if (p === "F") return "Alero / Ala-Pívot";
  if (p === "C") return "Pívot";
  return pos;
}

function getSalaryTierClass(tier?: string): string {
  switch (tier) {
    case "Supermax":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    case "Estrella":
      return "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30";
    case "Titular":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
    case "Rotación":
      return "bg-[var(--hub-surface-2)] text-[var(--hub-text-muted)] border-[var(--hub-border)]";
    default:
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  }
}

export function TeamTabsView({
  team,
  teamStanding,
  recent,
  upcoming,
  roster,
}: TeamTabsViewProps) {
  const [activeTab, setActiveTab] = useState<"ROSTER" | "GAMES" | "STATS">("ROSTER");
  const [positionFilter, setPositionFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [gamesSubTab, setGamesSubTab] = useState<"UPCOMING" | "RECENT">("UPCOMING");

  const brand = getTeamBySlug(team.slug) || getTeamByTricode(team.abbreviation);
  const brandPrimary = brand?.primary || team.primaryColor || "#FF5A1F";
  const brandOnPrimary = brand?.onPrimary || "#FFFFFF";

  // Filtered Roster
  const filteredRoster = useMemo(() => {
    return roster.filter((p) => {
      // Posición
      if (positionFilter !== "ALL") {
        const pos = (p.position || "").toUpperCase();
        if (positionFilter === "G" && !pos.includes("G")) return false;
        if (positionFilter === "F" && !pos.includes("F")) return false;
        if (positionFilter === "C" && !pos.includes("C")) return false;
      }
      // Búsqueda
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        p.fullName.toLowerCase().includes(q) ||
        (p.jerseyNumber && p.jerseyNumber.includes(q))
      );
    });
  }, [roster, positionFilter, searchQuery]);

  // Total payroll estimate
  const totalPayroll = useMemo(() => {
    const sum = roster.reduce((acc, p) => acc + (p.salary || 0), 0);
    return sum > 0 ? (sum / 1_000_000).toFixed(1) : null;
  }, [roster]);

  return (
    <div className="space-y-6">
      {/* Sticky Tab Menu Header */}
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[var(--hub-bg)]/95 backdrop-blur-md py-2 border-b border-[var(--hub-border)]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("ROSTER")}
            style={
              activeTab === "ROSTER"
                ? {
                    backgroundColor: brandPrimary,
                    color: brandOnPrimary,
                    borderColor: brandPrimary,
                  }
                : undefined
            }
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === "ROSTER"
                ? "shadow-md"
                : "bg-[var(--hub-surface)] text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>PLANTILLA</span>
            <span
              style={
                activeTab === "ROSTER"
                  ? { backgroundColor: `${brandOnPrimary}25`, color: brandOnPrimary }
                  : undefined
              }
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                activeTab === "ROSTER"
                  ? ""
                  : "bg-[var(--hub-surface-2)] text-[var(--hub-text-dim)]"
              }`}
            >
              {roster.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("GAMES")}
            style={
              activeTab === "GAMES"
                ? {
                    backgroundColor: brandPrimary,
                    color: brandOnPrimary,
                    borderColor: brandPrimary,
                  }
                : undefined
            }
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === "GAMES"
                ? "shadow-md"
                : "bg-[var(--hub-surface)] text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>PARTIDOS</span>
            <span
              style={
                activeTab === "GAMES"
                  ? { backgroundColor: `${brandOnPrimary}25`, color: brandOnPrimary }
                  : undefined
              }
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                activeTab === "GAMES"
                  ? ""
                  : "bg-[var(--hub-surface-2)] text-[var(--hub-text-dim)]"
              }`}
            >
              {upcoming.length + recent.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("STATS")}
            style={
              activeTab === "STATS"
                ? {
                    backgroundColor: brandPrimary,
                    color: brandOnPrimary,
                    borderColor: brandPrimary,
                  }
                : undefined
            }
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === "STATS"
                ? "shadow-md"
                : "bg-[var(--hub-surface)] text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>ESTADÍSTICAS & PICKS</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PLANTILLA */}
      {activeTab === "ROSTER" && (
        <div className="space-y-5">
          {/* Sub-toolbar de Plantilla: Filtros y Búsqueda */}
          <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            {/* Position filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
              {[
                { id: "ALL", label: `TODOS (${roster.length})` },
                { id: "G", label: "BASES / ESCOLTAS" },
                { id: "F", label: "ALEROS" },
                { id: "C", label: "PÍVOTS" },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setPositionFilter(pos.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors shrink-0 cursor-pointer ${
                    positionFilter === pos.id
                      ? "bg-[var(--hub-accent)] text-white"
                      : "bg-[var(--hub-surface-2)] text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--hub-text-dim)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar jugador o dorsal..."
                className="w-full bg-[var(--hub-surface-2)] border border-[var(--hub-border)] focus:border-[var(--hub-accent)] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[var(--hub-text)] placeholder-[var(--hub-text-dim)] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Mass payroll note if available */}
          {totalPayroll && (
            <div className="flex items-center justify-between text-xs font-mono text-[var(--hub-text-dim)] px-1">
              <span>MOSTRANDO {filteredRoster.length} DE {roster.length} JUGADORES</span>
              <span>MASA SALARIAL ESTIMADA: <strong className="text-[var(--hub-text)] font-black">${totalPayroll}M</strong></span>
            </div>
          )}

          {/* Roster Grid */}
          {filteredRoster.length === 0 ? (
            <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-10 text-center text-sm text-[var(--hub-text-muted)]">
              No se encontraron jugadores con ese filtro.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredRoster.map((player) => (
                <div
                  key={player.id}
                  className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)]/50 transition-all shadow-sm group"
                >
                  {/* Top: Avatar, Nombre y Posición */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <PlayerHeadshot
                        name={player.fullName}
                        headshotUrl={player.headshotUrl}
                        tricode={team.abbreviation}
                        size={56}
                        className="shadow-sm"
                      />
                      {player.jerseyNumber && (
                        <span className="absolute -bottom-1 -right-1 bg-black/85 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                          #{player.jerseyNumber}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base text-[var(--hub-text)] group-hover:text-[var(--hub-accent)] transition-colors truncate">
                        {player.fullName}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono font-semibold text-[var(--hub-text-muted)] uppercase">
                          {formatPosition(player.position)}
                        </span>
                        {player.age && (
                          <>
                            <span className="text-[var(--hub-text-dim)]">•</span>
                            <span className="text-xs font-mono text-[var(--hub-text-dim)]">
                              {player.age} años
                            </span>
                          </>
                        )}
                      </div>
                      {(player.height || player.weight) && (
                        <span className="text-[11px] font-mono text-[var(--hub-text-dim)] block mt-0.5">
                          {[player.height, player.weight].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle: Contrato / Salario */}
                  <div className="mt-3 pt-3 border-t border-[var(--hub-border)] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--hub-text-dim)]">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      <span>CONTRATO:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[var(--hub-text)]">
                        {player.salaryFormatted || "Contrato NBA"}
                      </span>
                      {player.salaryTier && (
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getSalaryTierClass(
                            player.salaryTier
                          )}`}
                        >
                          {player.salaryTier}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Estadísticas individuales */}
                  <div className="mt-3 pt-2.5 border-t border-[var(--hub-border)] bg-[var(--hub-surface-2)] -mx-4 -mb-4 p-3 rounded-b-2xl">
                    {player.stats && Object.keys(player.stats).length > 0 ? (
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block">
                            PTS
                          </span>
                          <span className="font-mono font-black text-sm text-[var(--hub-accent)]">
                            {player.stats.pts !== undefined ? player.stats.pts.toFixed(1) : "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block">
                            REB
                          </span>
                          <span className="font-mono font-bold text-xs text-[var(--hub-text)]">
                            {player.stats.reb !== undefined ? player.stats.reb.toFixed(1) : "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block">
                            AST
                          </span>
                          <span className="font-mono font-bold text-xs text-[var(--hub-text)]">
                            {player.stats.ast !== undefined ? player.stats.ast.toFixed(1) : "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block">
                            FG%
                          </span>
                          <span className="font-mono font-bold text-xs text-[var(--hub-text)]">
                            {player.stats.fgPct !== undefined ? `${player.stats.fgPct.toFixed(1)}%` : "-"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-0.5">
                        <span className="text-[11px] font-mono text-[var(--hub-text-dim)]">
                          Novato / Incorporación reciente · Sin minutos oficiales 25/26
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PARTIDOS & RESULTADOS */}
      {activeTab === "GAMES" && (
        <div className="space-y-6">
          {/* Sub-selector de Partidos */}
          <div className="flex items-center gap-2 p-1.5 bg-[var(--hub-surface-2)] rounded-xl border border-[var(--hub-border)] w-fit">
            <button
              onClick={() => setGamesSubTab("UPCOMING")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                gamesSubTab === "UPCOMING"
                  ? "bg-[var(--hub-surface)] text-[var(--hub-text)] shadow-sm"
                  : "text-[var(--hub-text-muted)] hover:text-[var(--hub-text)]"
              }`}
            >
              PRÓXIMOS PARTIDOS ({upcoming.length})
            </button>
            <button
              onClick={() => setGamesSubTab("RECENT")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                gamesSubTab === "RECENT"
                  ? "bg-[var(--hub-surface)] text-[var(--hub-text)] shadow-sm"
                  : "text-[var(--hub-text-muted)] hover:text-[var(--hub-text)]"
              }`}
            >
              FORMA RECIENTE ({recent.length})
            </button>
          </div>

          {/* Próximos Partidos */}
          {gamesSubTab === "UPCOMING" && (
            <div className="space-y-4">
              {upcoming.length === 0 ? (
                <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-8 text-center text-sm text-[var(--hub-text-muted)]">
                  No hay partidos inmediatamente programados.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcoming.map((game) => (
                    <GameCard key={game.id} {...mapGameToCardProps(game)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Forma Reciente (Últimos 5) */}
          {gamesSubTab === "RECENT" && (
            <div className="space-y-4">
              {recent.length === 0 ? (
                <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-8 text-center text-sm text-[var(--hub-text-muted)]">
                  No hay registro de partidos recientes para esta franquicia.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {recent.map((game) => {
                    const isHome =
                      game.homeTeam.id === team.id ||
                      game.homeTeam.abbreviation === team.abbreviation ||
                      game.homeTeam.slug === team.slug;

                    const opponent = isHome ? game.awayTeam : game.homeTeam;
                    const teamScore = isHome ? game.homeScore : game.awayScore;
                    const oppScore = isHome ? game.awayScore : game.homeScore;
                    const won = teamScore !== undefined && oppScore !== undefined && teamScore > oppScore;

                    return (
                      <div
                        key={game.id}
                        className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)]/40 transition-colors shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-mono font-black px-2 py-0.5 rounded ${
                              won
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                            }`}
                          >
                            {won ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>VICTORIA</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" />
                                <span>DERROTA</span>
                              </>
                            )}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                            {isHome ? "LOCAL" : "VISITANTE"}
                          </span>
                        </div>

                        <div className="my-2 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <TeamLogo
                              abbreviation={opponent.abbreviation}
                              name={opponent.name}
                              size="md"
                            />
                            <div>
                              <span className="text-xs font-mono font-bold text-[var(--hub-text)] block truncate">
                                {isHome ? "vs" : "@"} {opponent.name}
                              </span>
                              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                                {opponent.conference} · {opponent.abbreviation}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-lg font-mono font-black text-[var(--hub-text)] tabular-nums">
                              {teamScore ?? "-"} - {oppScore ?? "-"}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[var(--hub-border)] text-[10px] font-mono text-[var(--hub-text-dim)]">
                          {new Date(game.date).toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ESTADÍSTICAS & PICKS */}
      {activeTab === "STATS" && (
        <div className="space-y-6">
          {/* Card de Rendimiento Global */}
          {teamStanding && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 text-center">
                <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase block">
                  RÉCORD OFICIAL
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[var(--hub-text)] block mt-1">
                  {teamStanding.wins}-{teamStanding.losses}
                </span>
                <span className="text-[10px] font-mono text-[var(--hub-accent)] block mt-0.5">
                  {(teamStanding.winPct * 100).toFixed(1)}% Victorias
                </span>
              </div>

              <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 text-center">
                <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase block">
                  PUESTO CONFERENCIA
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[var(--hub-accent)] block mt-1">
                  #{teamStanding.conferenceRank}
                </span>
                <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block mt-0.5">
                  {teamStanding.gamesBack ? `${teamStanding.gamesBack} GB` : "Líder"}
                </span>
              </div>

              <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 text-center">
                <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase block">
                  RÉCORD LOCAL
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[var(--hub-text)] block mt-1">
                  {teamStanding.homeRecord || "0-0"}
                </span>
                <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block mt-0.5">
                  Pabellón Local
                </span>
              </div>

              <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 text-center">
                <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase block">
                  RÉCORD VISITANTE
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[var(--hub-text)] block mt-1">
                  {teamStanding.roadRecord || "0-0"}
                </span>
                <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block mt-0.5">
                  Fuera de Casa
                </span>
              </div>
            </div>
          )}

          {/* Callout Pick'em para la franquicia */}
          <div className="rounded-2xl border border-[var(--hub-accent)]/25 bg-[var(--hub-accent)]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[var(--hub-accent)]" />
                <span className="text-xs font-mono font-bold text-[var(--hub-accent)] uppercase tracking-wider">
                  FRANQUICIA OFICIAL PICK'EM 2026/27
                </span>
              </div>
              <h4 className="text-lg font-bold text-[var(--hub-text)]">
                ¿Tenés fe en que {team.name} gane su conferencia o pelee el anillo?
              </h4>
              <p className="text-xs text-[var(--hub-text-muted)] max-w-xl">
                Pronosticá el destino de {team.name} en la mesa oficial de picks de los Buques antes del salto inicial de la temporada regular.
              </p>
            </div>
            <Link
              href="/pickem/picks"
              className="px-5 py-3 rounded-xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
            >
              ELEGIR EN MIS PICKS &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}