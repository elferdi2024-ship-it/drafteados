// filepath: src/app/nba/equipo/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { ScoreboardCard } from "@/components/nba/ScoreboardCard";
import { TeamLogo } from "@/components/nba/TeamLogo";
import type { Player, Game } from "@/types/basketball";

export const revalidate = 3600;

export async function generateStaticParams() {
  const teams = await basketball.getTeams();
  return teams.map((t) => ({ slug: t.slug }));
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

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await basketball.getTeam(slug);

  if (!team) {
    notFound();
  }

  const [teamSchedule, standings, roster] = await Promise.all([
    basketball.getTeamSchedule(team.slug),
    basketball.getStandings(),
    basketball.getRoster(team.slug),
  ]);

  const allStandings = [...standings.east, ...standings.west];
  const teamStanding = allStandings.find(
    (s) =>
      s.team.id === team.id ||
      s.team.slug === team.slug ||
      s.team.abbreviation === team.abbreviation
  );

  const { recent, upcoming } = teamSchedule;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <Link
        href="/nba/equipos"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER A EQUIPOS</span>
      </Link>

      {/* Team Header Banner */}
      <div
        className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        style={{
          borderLeftColor: team.primaryColor || undefined,
          borderLeftWidth: "6px",
        }}
      >
        <div className="flex items-center gap-5">
          <TeamLogo
            abbreviation={team.abbreviation}
            name={team.name}
            primaryColor={team.primaryColor}
            size="xl"
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--hub-accent)]">
                CONFERENCIA {team.conference.toUpperCase()} · DIVISIÓN {team.division.toUpperCase()}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              {team.name}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] font-mono mt-1.5">
              {team.city} · Sigla: {team.abbreviation} · {roster.length} Jugadores en Plantilla
            </p>
          </div>
        </div>

        {/* Record & Stats Badges */}
        {teamStanding && (
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 bg-[var(--hub-surface-2)] p-4 sm:p-5 rounded-2xl border border-[var(--hub-border)] shrink-0">
            <div className="text-center min-w-[70px]">
              <span
                className="text-3xl sm:text-4xl font-black text-[var(--hub-text)] block leading-none"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                {teamStanding.wins}-{teamStanding.losses}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                BALANCE (25/26)
              </span>
            </div>

            <div className="w-px h-10 bg-[var(--hub-border)]" />

            <div className="text-center min-w-[60px]">
              <span
                className="text-3xl sm:text-4xl font-black text-[var(--hub-accent)] block leading-none"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                #{teamStanding.conferenceRank}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                CONF. {team.conference.toUpperCase()}
              </span>
            </div>

            {teamStanding.homeRecord && (
              <>
                <div className="w-px h-10 bg-[var(--hub-border)] hidden sm:block" />
                <div className="text-center hidden sm:block">
                  <span className="text-lg font-mono font-bold text-[var(--hub-text)] block leading-none">
                    {teamStanding.homeRecord}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                    LOCAL
                  </span>
                </div>
              </>
            )}

            {teamStanding.streak && (
              <>
                <div className="w-px h-10 bg-[var(--hub-border)] hidden sm:block" />
                <div className="text-center hidden sm:block">
                  <span className="text-lg font-mono font-bold text-[var(--hub-accent)] block leading-none">
                    {teamStanding.streak}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                    RACHA
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Rendimiento Reciente: Últimos 5 Partidos */}
      {recent.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--hub-accent)]" />
              <h2
                className="text-xl sm:text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                FORMA RECIENTE · ÚLTIMOS {recent.length} PARTIDOS
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
              HISTÓRICO RECIENTE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
                      className={`text-[11px] font-mono font-black px-2 py-0.5 rounded ${
                        won
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {won ? "VICTORIA (W)" : "DERROTA (L)"}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                      {isHome ? "LOCAL" : "VISITANTE"}
                    </span>
                  </div>

                  <div className="my-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <TeamLogo
                        abbreviation={opponent.abbreviation}
                        name={opponent.name}
                        size="sm"
                      />
                      <span className="text-xs font-mono font-bold text-[var(--hub-text)] truncate">
                        {isHome ? "vs" : "@"} {opponent.abbreviation}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className="text-base font-mono font-black text-[var(--hub-text)] tabular-nums"
                      >
                        {teamScore ?? "-"} - {oppScore ?? "-"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--hub-border)] text-[10px] font-mono text-[var(--hub-text-dim)]">
                    {new Date(game.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Próximos Partidos Programados */}
      {upcoming.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--hub-accent)]" />
              <h2
                className="text-xl sm:text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                PRÓXIMOS PARTIDOS PROGRAMADOS (2026/27)
              </h2>
            </div>
            <Link
              href="/nba/calendario"
              className="text-xs font-mono font-bold text-[var(--hub-accent)] hover:underline uppercase"
            >
              VER CALENDARIO COMPLETO &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Callout Pick'em para la franquicia */}
      <div className="rounded-2xl border border-[var(--hub-accent)]/20 bg-[var(--hub-accent)]/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-mono font-bold text-[var(--hub-accent)] uppercase tracking-widest block">
            FRANQUICIA OFICIAL PICK'EM
          </span>
          <p className="text-sm text-[var(--hub-text)] font-semibold mt-0.5">
            ¿Tenés fe en que {team.name} gane su conferencia o pelee el anillo?
          </p>
        </div>
        <Link
          href="/pickem/picks"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-title text-sm uppercase tracking-wider transition-colors shrink-0"
        >
          <span>ELEGIR EN MIS PICKS</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Plantilla Oficial Completa */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--hub-border)] pb-3">
          <div>
            <h2
              className="text-2xl sm:text-4xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              PLANTILLA OFICIAL ({roster.length})
            </h2>
            <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] font-mono mt-0.5">
              Dorsales, salarios de la temporada y promedios individuales consolidados.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase shrink-0">
            TEMPORADA 2026/27
          </span>
        </div>

        {roster.length === 0 ? (
          <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-8 text-center text-sm text-[var(--hub-text-muted)]">
            No se pudo cargar la plantilla oficial en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {roster.map((player: Player) => (
              <div
                key={player.id}
                className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)]/50 transition-all shadow-sm group"
              >
                {/* Top: Avatar, Nombre y Posición */}
                <div className="flex items-start gap-3.5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--hub-surface-2)] border border-[var(--hub-border)] shrink-0 flex items-center justify-center">
                    {player.headshotUrl ? (
                      <img
                        src={player.headshotUrl}
                        alt={player.fullName}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-title text-xl font-black text-[var(--hub-text-muted)]">
                        {player.firstName[0]}
                      </span>
                    )}
                    {player.jerseyNumber && (
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded">
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

                {/* Bottom: Estadísticas individuales si las tiene */}
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
      </section>
    </div>
  );
}
