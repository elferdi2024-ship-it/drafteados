// filepath: src/app/nba/partido/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Tv,
  Flame,
  BarChart3,
  Users,
  History,
  Trophy,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { LiveBadge } from "@/components/nba/LiveBadge";
import { TeamLogo } from "@/components/nba/TeamLogo";
import { getTeamBySlug, getTeamByTricode } from "@/lib/nba/teamAssets";
import type { Standing, Game, Player } from "@/types/basketball";

import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, sportsEventJsonLd } from "@/lib/seo/jsonld";

export const revalidate = 60;

export async function generateStaticParams() {
  const games = await basketball.getGames({});
  return games.map((g) => ({ id: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const game = await basketball.getGame(id);
  if (!game) {
    return buildMetadata({
      title: "Partido no encontrado",
      description: "El partido solicitado no está disponible en Drafteados.",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${game.awayTeam.name} vs ${game.homeTeam.name} | Previa y Estadísticas NBA`,
    description: `Previa oficial de ${game.awayTeam.name} vs ${game.homeTeam.name} en Drafteados. Horarios España y EE.UU., comparativa técnica, rotación probable y claves del enfrentamiento.`,
    path: `/nba/partido/${id}`,
    image: `${SITE_URL}/images/og-nba.png`,
  });
}

function formatDualTime(dateStr?: string) {
  if (!dateStr) {
    return {
      es: "Hora por confirmar",
      et: "TBD ET",
      dateFull: "Fecha por confirmar",
    };
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return {
      es: "Hora por confirmar",
      et: "TBD ET",
      dateFull: dateStr,
    };
  }

  const esTime = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

  const etTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);

  const dateFull = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  return {
    es: `${esTime}h Peninsular`,
    et: `${etTime} ET`,
    dateFull: dateFull.charAt(0).toUpperCase() + dateFull.slice(1),
  };
}

function translatePosition(pos?: string): string {
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

function generateMatchNarrative({
  awayTeam,
  homeTeam,
  awayStanding,
  homeStanding,
}: {
  awayTeam: Game["awayTeam"];
  homeTeam: Game["homeTeam"];
  awayStanding?: Standing;
  homeStanding?: Standing;
}): string[] {
  const bullets: string[] = [];
  const sameConf = awayTeam.conference === homeTeam.conference;
  const sameDiv =
    awayTeam.division && homeTeam.division && awayTeam.division === homeTeam.division;

  if (sameConf && awayStanding && homeStanding) {
    if (sameDiv) {
      bullets.push(
        `Duelo divisional en la división ${awayTeam.division}: choque directo entre el #${awayStanding.conferenceRank} (${awayTeam.name}) y el #${homeStanding.conferenceRank} (${homeTeam.name}) con valor de desempate hacia postemporada.`
      );
    } else {
      bullets.push(
        `Choque directo en la Conferencia ${awayTeam.conference === "East" ? "Este" : "Oeste"}: ${awayTeam.name} (#${awayStanding.conferenceRank}) visita el feudo de ${homeTeam.name} (#${homeStanding.conferenceRank}).`
      );
    }
  } else if (!sameConf && awayStanding && homeStanding) {
    bullets.push(
      `Cruce interconferencia Este vs Oeste: ${awayTeam.name} (#${awayStanding.conferenceRank} en su tabla) pone a prueba la solidez de ${homeTeam.name} (#${homeStanding.conferenceRank}).`
    );
  }

  if (awayStanding?.streak || homeStanding?.streak) {
    const awayW = awayStanding?.streak?.startsWith("W");
    const homeW = homeStanding?.streak?.startsWith("W");
    if (awayW && homeW) {
      bullets.push(
        `Ambos equipos defienden racha positiva de victorias (${awayTeam.abbreviation}: ${awayStanding?.streak} · ${homeTeam.abbreviation}: ${homeStanding?.streak}).`
      );
    } else if (awayW && !homeW) {
      bullets.push(
        `${awayTeam.name} llega con inercia ganadora (${awayStanding?.streak}), mientras que ${homeTeam.name} buscará reaccionar ante su afición tras su último tropiezo.`
      );
    } else if (!awayW && homeW) {
      bullets.push(
        `${homeTeam.name} defiende su fortaleza como local con racha de ${homeStanding?.streak}, frente a unos ${awayTeam.name} necesitados de dar un golpe sobre la mesa.`
      );
    }
  }

  if (homeStanding?.homeRecord || awayStanding?.roadRecord) {
    bullets.push(
      `Factor cancha: ${homeTeam.name} registra un balance de ${homeStanding?.homeRecord || "solidez"} en su pabellón, frente al ${awayStanding?.roadRecord || "registro"} a domicilio de ${awayTeam.name}.`
    );
  }

  bullets.push(
    `Primer asalto de la serie regular 2026/27 entre ambas franquicias, determinante para la clasificación final de temporada.`
  );

  return bullets.slice(0, 3);
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await basketball.getGame(id);

  if (!game) {
    notFound();
  }

  const [standings, awaySchedule, homeSchedule, awayRoster, homeRoster] = await Promise.all([
    basketball.getStandings(),
    basketball.getTeamSchedule(game.awayTeam.slug),
    basketball.getTeamSchedule(game.homeTeam.slug),
    basketball.getRoster(game.awayTeam.slug),
    basketball.getRoster(game.homeTeam.slug),
  ]);

  const allStandings = [...standings.east, ...standings.west];
  const awayStanding = allStandings.find(
    (s) =>
      s.team.id === game.awayTeam.id ||
      s.team.slug === game.awayTeam.slug ||
      s.team.abbreviation === game.awayTeam.abbreviation
  );
  const homeStanding = allStandings.find(
    (s) =>
      s.team.id === game.homeTeam.id ||
      s.team.slug === game.homeTeam.slug ||
      s.team.abbreviation === game.homeTeam.abbreviation
  );

  const awayBrand = getTeamBySlug(game.awayTeam.slug) || getTeamByTricode(game.awayTeam.abbreviation);
  const homeBrand = getTeamBySlug(game.homeTeam.slug) || getTeamByTricode(game.homeTeam.abbreviation);
  const awayPrimary = awayBrand?.primary || game.awayTeam.primaryColor || "#007A33";
  const homePrimary = homeBrand?.primary || game.homeTeam.primaryColor || "#860038";

  const isLive = game.status === "live";
  const isFinal = game.status === "final";
  const awayWon = isFinal && (game.awayScore ?? 0) > (game.homeScore ?? 0);
  const homeWon = isFinal && (game.homeScore ?? 0) > (game.awayScore ?? 0);

  const { es: timeEs, et: timeEt, dateFull } = formatDualTime(game.date);
  const narrativeBullets = generateMatchNarrative({
    awayTeam: game.awayTeam,
    homeTeam: game.homeTeam,
    awayStanding,
    homeStanding,
  });

  const awayTopPlayers = (awayRoster || []).slice(0, 5);
  const homeTopPlayers = (homeRoster || []).slice(0, 5);

  const awayRecent = (awaySchedule?.recent || []).slice(0, 3);
  const awayUpcoming = (awaySchedule?.upcoming || []).slice(0, 3);
  const homeRecent = (homeSchedule?.recent || []).slice(0, 3);
  const homeUpcoming = (homeSchedule?.upcoming || []).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "NBA Hub", path: "/nba" },
            { name: "Calendario", path: "/nba/calendario" },
            {
              name: `${game.awayTeam.abbreviation} vs ${game.homeTeam.abbreviation}`,
              path: `/nba/partido/${id}`,
            },
          ]),
          sportsEventJsonLd({
            name: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
            startDate: game.date ? `${game.date}T00:00:00Z` : new Date().toISOString(),
            url: `${SITE_URL}/nba/partido/${id}`,
            homeTeam: game.homeTeam.name,
            awayTeam: game.awayTeam.name,
            locationName: game.arena || undefined,
            status: isLive ? "EventInProgress" : isFinal ? "EventCompleted" : "EventScheduled",
          }),
        ]}
      />

      {/* Nav back bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/nba/calendario"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL CALENDARIO</span>
        </Link>
        <span className="font-mono text-xs text-[var(--hub-text-muted)] uppercase tracking-wider font-semibold">
          TEMPORADA REGULAR 2026/27
        </span>
      </div>

      <h1 className="sr-only">
        {game.awayTeam.name} vs {game.homeTeam.name} — Previa, Estadísticas y Horarios NBA
      </h1>

      {/* 1. HERO DEL PARTIDO (Atmósfera split, logos grandes y doble huso horario) */}
      <div
        className="rounded-3xl border border-[var(--hub-border)] p-6 sm:p-10 shadow-sm relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${awayPrimary}15 0%, var(--hub-surface) 48%, var(--hub-surface) 52%, ${homePrimary}15 100%)`,
        }}
      >
        {isLive && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--hub-accent)] to-emerald-400" />
        )}

        {/* Top bar: Estado, fecha y pabellón */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hub-border)] pb-4 mb-8 text-xs">
          <div className="flex items-center gap-3">
            <LiveBadge status={game.status} period={game.period} clock={game.clock} />
            <div className="flex items-center gap-1.5 text-[var(--hub-text-secondary)] font-mono font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[var(--hub-accent)]" />
              <span>{dateFull}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[var(--hub-text-muted)]">
            {game.arena && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--hub-text-dim)]" />
                <span>{game.arena}</span>
              </div>
            )}
            {game.broadcast && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[var(--hub-surface-2)] border border-[var(--hub-border)]">
                <Tv className="w-3 h-3 text-[var(--hub-accent)]" />
                <span>{game.broadcast}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scoreboard / Faceoff Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Away Team (Col 1..5) */}
          <div className="lg:col-span-5 flex items-center gap-5 sm:gap-6 justify-start">
            <TeamLogo
              tricode={game.awayTeam.abbreviation}
              slug={game.awayTeam.slug}
              name={game.awayTeam.name}
              primaryColor={awayPrimary}
              size={80}
              className="drop-shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-[var(--hub-text-muted)]">
                  VISITANTE
                </span>
                {awayStanding && (
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      color: awayPrimary,
                      borderColor: `${awayPrimary}40`,
                      backgroundColor: `${awayPrimary}10`,
                    }}
                  >
                    #{awayStanding.conferenceRank} {game.awayTeam.conference.toUpperCase()}
                  </span>
                )}
              </div>
              <Link
                href={`/nba/equipo/${game.awayTeam.slug}`}
                className="group block"
              >
                <h2
                  className={`text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none group-hover:text-[var(--hub-accent)] transition-colors ${
                    awayWon ? "text-[var(--hub-text)]" : "text-[var(--hub-text)]"
                  }`}
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {game.awayTeam.name}
                </h2>
              </Link>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-[var(--hub-text-secondary)]">
                <span>Sigla: <strong>{game.awayTeam.abbreviation}</strong></span>
                {awayStanding && (
                  <>
                    <span>·</span>
                    <span>Récord: <strong className="text-[var(--hub-text)]">{awayStanding.wins}-{awayStanding.losses}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Center: Marcador o VS + Doble Huso Horario (Col 6..7) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 text-center">
            {isLive || isFinal ? (
              <div className="flex items-center justify-center gap-4">
                <span
                  className={`text-5xl sm:text-6xl font-black tabular-nums ${
                    awayWon ? "text-[var(--hub-accent)]" : "text-[var(--hub-text)]"
                  }`}
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {game.awayScore ?? "–"}
                </span>
                <span className="text-2xl font-mono text-[var(--hub-text-dim)]">-</span>
                <span
                  className={`text-5xl sm:text-6xl font-black tabular-nums ${
                    homeWon ? "text-[var(--hub-accent)]" : "text-[var(--hub-text)]"
                  }`}
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {game.homeScore ?? "–"}
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  className="text-3xl sm:text-4xl font-black text-[var(--hub-accent)] tracking-wider"
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  VS
                </div>
              </div>
            )}

            {/* Doble Horario (ES Peninsular / ET US) */}
            <div className="mt-3 inline-flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--hub-text)]">
                <Clock className="w-3.5 h-3.5 text-[var(--hub-accent)]" />
                <span>{timeEs}</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                {timeEt}
              </span>
            </div>
          </div>

          {/* Home Team (Col 8..12) */}
          <div className="lg:col-span-5 flex items-center gap-5 sm:gap-6 justify-start lg:justify-end lg:flex-row-reverse text-left lg:text-right">
            <TeamLogo
              tricode={game.homeTeam.abbreviation}
              slug={game.homeTeam.slug}
              name={game.homeTeam.name}
              primaryColor={homePrimary}
              size={80}
              className="drop-shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 justify-start lg:justify-end">
                {homeStanding && (
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      color: homePrimary,
                      borderColor: `${homePrimary}40`,
                      backgroundColor: `${homePrimary}10`,
                    }}
                  >
                    #{homeStanding.conferenceRank} {game.homeTeam.conference.toUpperCase()}
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-[var(--hub-text-muted)]">
                  LOCAL
                </span>
              </div>
              <Link
                href={`/nba/equipo/${game.homeTeam.slug}`}
                className="group block"
              >
                <h2
                  className={`text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none group-hover:text-[var(--hub-accent)] transition-colors ${
                    homeWon ? "text-[var(--hub-text)]" : "text-[var(--hub-text)]"
                  }`}
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {game.homeTeam.name}
                </h2>
              </Link>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-[var(--hub-text-secondary)] justify-start lg:justify-end">
                {homeStanding && (
                  <>
                    <span>Récord: <strong className="text-[var(--hub-text)]">{homeStanding.wins}-{homeStanding.losses}</strong></span>
                    <span>·</span>
                  </>
                )}
                <span>Sigla: <strong>{game.homeTeam.abbreviation}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. POR QUÉ VER ESTE PARTIDO (Narrativa factual generada por reglas sin IA slop) */}
      <section className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[var(--hub-border)] pb-3">
          <Flame className="w-5 h-5 text-[var(--hub-accent)]" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[var(--hub-accent)] tracking-widest uppercase block">
              CLAVES DEL PARTIDO · NARRATIVA BUQUES
            </span>
            <h3
              className="text-xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              ¿Por qué seguir este enfrentamiento?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {narrativeBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-[var(--hub-accent)]/15 text-[var(--hub-accent)] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-[var(--hub-text-secondary)] leading-relaxed font-sans">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPARATIVA TÉCNICA CARA A CARA (Stat Bars duales con colores de franquicia) */}
      <section className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-[var(--hub-accent)]" />
            <h3
              className="text-xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              Comparativa Cara a Cara
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--hub-text-muted)] font-semibold">
            Temporada regular 2026/27
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: awayPrimary }} />
            <span className="text-[var(--hub-text)]">{game.awayTeam.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--hub-text)]">{game.homeTeam.name}</span>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: homePrimary }} />
          </div>
        </div>

        {/* Comparative Metric Rows */}
        <div className="space-y-4">
          {/* Row 1: Victorias - Derrotas */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-sm font-black text-[var(--hub-text)]">
                {awayStanding ? `${awayStanding.wins}-${awayStanding.losses}` : "–"}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[var(--hub-text-dim)]">
                BALANCE (W - L)
              </span>
              <span className="text-sm font-black text-[var(--hub-text)]">
                {homeStanding ? `${homeStanding.wins}-${homeStanding.losses}` : "–"}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[var(--hub-surface-2)] flex overflow-hidden">
              <div
                style={{
                  width: `${
                    awayStanding && homeStanding
                      ? (awayStanding.wins / (awayStanding.wins + homeStanding.wins || 1)) * 100
                      : 50
                  }%`,
                  backgroundColor: awayPrimary,
                }}
                className="transition-all duration-500"
              />
              <div
                style={{
                  width: `${
                    awayStanding && homeStanding
                      ? (homeStanding.wins / (awayStanding.wins + homeStanding.wins || 1)) * 100
                      : 50
                  }%`,
                  backgroundColor: homePrimary,
                }}
                className="transition-all duration-500"
              />
            </div>
          </div>

          {/* Row 2: Win % */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-sm font-black text-[var(--hub-text)]">
                {awayStanding ? `${(awayStanding.winPct * 100).toFixed(1)}%` : "–"}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[var(--hub-text-dim)]">
                EFECTIVIDAD (% VICTORIAS)
              </span>
              <span className="text-sm font-black text-[var(--hub-text)]">
                {homeStanding ? `${(homeStanding.winPct * 100).toFixed(1)}%` : "–"}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[var(--hub-surface-2)] flex overflow-hidden">
              <div
                style={{
                  width: `${
                    awayStanding && homeStanding
                      ? (awayStanding.winPct / (awayStanding.winPct + homeStanding.winPct || 1)) * 100
                      : 50
                  }%`,
                  backgroundColor: awayPrimary,
                }}
                className="transition-all duration-500"
              />
              <div
                style={{
                  width: `${
                    awayStanding && homeStanding
                      ? (homeStanding.winPct / (awayStanding.winPct + homeStanding.winPct || 1)) * 100
                      : 50
                  }%`,
                  backgroundColor: homePrimary,
                }}
                className="transition-all duration-500"
              />
            </div>
          </div>

          {/* Row 3: Posición Conferencia */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-sm font-black text-[var(--hub-text)]">
                #{awayStanding?.conferenceRank || "–"} {game.awayTeam.conference}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[var(--hub-text-dim)]">
                RANKING CONFERENCIA
              </span>
              <span className="text-sm font-black text-[var(--hub-text)]">
                #{homeStanding?.conferenceRank || "–"} {game.homeTeam.conference}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[var(--hub-surface-2)] flex overflow-hidden">
              <div
                style={{
                  width: `${
                    awayStanding && homeStanding
                      ? ((16 - (awayStanding.conferenceRank || 8)) /
                          (32 - (awayStanding.conferenceRank + homeStanding.conferenceRank || 16))) *
                        100
                      : 50
                  }%`,
                  backgroundColor: awayPrimary,
                }}
                className="transition-all duration-500"
              />
              <div
                style={{
                  width: `${
                    awayStanding && homeStanding
                      ? ((16 - (homeStanding.conferenceRank || 8)) /
                          (32 - (awayStanding.conferenceRank + homeStanding.conferenceRank || 16))) *
                        100
                      : 50
                  }%`,
                  backgroundColor: homePrimary,
                }}
                className="transition-all duration-500"
              />
            </div>
          </div>

          {/* Row 4: Racha & Rendimiento */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--hub-border)]">
            <div className="p-3.5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)]">
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase block">
                RACHA Y FORMA · {game.awayTeam.abbreviation}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-black font-mono text-[var(--hub-text)]">
                  {awayStanding?.streak || "–"}
                </span>
                <span className="text-xs font-mono text-[var(--hub-text-muted)]">
                  (Fuera: {awayStanding?.roadRecord || "–"})
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-right">
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase block">
                RACHA Y FORMA · {game.homeTeam.abbreviation}
              </span>
              <div className="flex items-center gap-2 justify-end mt-1">
                <span className="text-xs font-mono text-[var(--hub-text-muted)]">
                  (En Casa: {homeStanding?.homeRecord || "–"})
                </span>
                <span className="text-lg font-black font-mono text-[var(--hub-text)]">
                  {homeStanding?.streak || "–"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROBABLE QUINTETO / ROTACIÓN DESTACADA */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <Users className="w-5 h-5 text-[var(--hub-accent)]" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[var(--hub-accent)] tracking-widest uppercase block">
              ROTACIÓN DESTACADA · JUGADORES CLAVE
            </span>
            <h3
              className="text-xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              Duelo de Figuras y Quintetos de Referencia
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Away Team Rotation */}
          <div className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-3">
              <div className="flex items-center gap-2.5">
                <TeamLogo tricode={game.awayTeam.abbreviation} size={28} />
                <span className="font-bold text-sm text-[var(--hub-text)]">
                  {game.awayTeam.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                ROTACIÓN RECIENTE
              </span>
            </div>

            <div className="space-y-2.5">
              {awayTopPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] hover:border-[var(--hub-border-hover)] transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[var(--hub-surface)] border border-[var(--hub-border)] shrink-0 flex items-center justify-center">
                      {player.headshotUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={player.headshotUrl}
                          alt={player.fullName}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-[var(--hub-text-dim)]">
                          #{player.jerseyNumber || "–"}
                        </span>
                      )}
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-xs sm:text-sm text-[var(--hub-text)] truncate block">
                        {player.fullName}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--hub-text-muted)] uppercase">
                        #{player.jerseyNumber || "0"} · {translatePosition(player.position)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-[var(--hub-accent)] block">
                      {player.salaryFormatted || "Titular"}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                      {player.salaryTier || "NBA"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Home Team Rotation */}
          <div className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-3">
              <div className="flex items-center gap-2.5">
                <TeamLogo tricode={game.homeTeam.abbreviation} size={28} />
                <span className="font-bold text-sm text-[var(--hub-text)]">
                  {game.homeTeam.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                ROTACIÓN RECIENTE
              </span>
            </div>

            <div className="space-y-2.5">
              {homeTopPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] hover:border-[var(--hub-border-hover)] transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[var(--hub-surface)] border border-[var(--hub-border)] shrink-0 flex items-center justify-center">
                      {player.headshotUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={player.headshotUrl}
                          alt={player.fullName}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-[var(--hub-text-dim)]">
                          #{player.jerseyNumber || "–"}
                        </span>
                      )}
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-xs sm:text-sm text-[var(--hub-text)] truncate block">
                        {player.fullName}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--hub-text-muted)] uppercase">
                        #{player.jerseyNumber || "0"} · {translatePosition(player.position)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-[var(--hub-accent)] block">
                      {player.salaryFormatted || "Titular"}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                      {player.salaryTier || "NBA"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FIXTURE DE CALENDARIO (Últimos 3 y Próximos 3) */}
      <section className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[var(--hub-border)] pb-3">
          <History className="w-5 h-5 text-[var(--hub-accent)]" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[var(--hub-accent)] tracking-widest uppercase block">
              CONTEXTO DE CALENDARIO · ÚLTIMOS Y PRÓXIMOS
            </span>
            <h3
              className="text-xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              Carga de Partidos y Momento de Temporada
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Away Team Fixture */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[var(--hub-text)] uppercase block">
              {game.awayTeam.name}
            </span>

            {/* Recent */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                ÚLTIMOS PARTIDOS
              </span>
              {awayRecent.length > 0 ? (
                awayRecent.map((g) => {
                  const isHome = g.homeTeam.abbreviation === game.awayTeam.abbreviation;
                  const opp = isHome ? g.awayTeam : g.homeTeam;
                  const won =
                    g.status === "final" &&
                    ((isHome && (g.homeScore ?? 0) > (g.awayScore ?? 0)) ||
                      (!isHome && (g.awayScore ?? 0) > (g.homeScore ?? 0)));
                  return (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <TeamLogo tricode={opp.abbreviation} size={20} />
                        <span className="font-mono text-[var(--hub-text)]">
                          {isHome ? "vs" : "@"} {opp.abbreviation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[var(--hub-text-muted)]">
                          {g.awayScore ?? "-"} - {g.homeScore ?? "-"}
                        </span>
                        {g.status === "final" && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              won
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {won ? "W" : "L"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 rounded-xl bg-[var(--hub-surface-2)] text-xs font-mono text-[var(--hub-text-muted)]">
                  Semana inaugural 2026/27 (Inicio de competición)
                </div>
              )}
            </div>

            {/* Upcoming */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                PRÓXIMOS COMPROMISOS
              </span>
              {awayUpcoming.length > 0 ? (
                awayUpcoming.map((g) => {
                  const isHome = g.homeTeam.abbreviation === game.awayTeam.abbreviation;
                  const opp = isHome ? g.awayTeam : g.homeTeam;
                  return (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <TeamLogo tricode={opp.abbreviation} size={20} />
                        <span className="font-mono text-[var(--hub-text)]">
                          {isHome ? "vs" : "@"} {opp.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--hub-accent)] font-semibold">
                        {g.time || "Programado"}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 rounded-xl bg-[var(--hub-surface-2)] text-xs font-mono text-[var(--hub-text-muted)]">
                  Sin partidos inmediatos programados
                </div>
              )}
            </div>
          </div>

          {/* Home Team Fixture */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[var(--hub-text)] uppercase block">
              {game.homeTeam.name}
            </span>

            {/* Recent */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                ÚLTIMOS PARTIDOS
              </span>
              {homeRecent.length > 0 ? (
                homeRecent.map((g) => {
                  const isHome = g.homeTeam.abbreviation === game.homeTeam.abbreviation;
                  const opp = isHome ? g.awayTeam : g.homeTeam;
                  const won =
                    g.status === "final" &&
                    ((isHome && (g.homeScore ?? 0) > (g.awayScore ?? 0)) ||
                      (!isHome && (g.awayScore ?? 0) > (g.homeScore ?? 0)));
                  return (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <TeamLogo tricode={opp.abbreviation} size={20} />
                        <span className="font-mono text-[var(--hub-text)]">
                          {isHome ? "vs" : "@"} {opp.abbreviation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[var(--hub-text-muted)]">
                          {g.awayScore ?? "-"} - {g.homeScore ?? "-"}
                        </span>
                        {g.status === "final" && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              won
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {won ? "W" : "L"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 rounded-xl bg-[var(--hub-surface-2)] text-xs font-mono text-[var(--hub-text-muted)]">
                  Semana inaugural 2026/27 (Inicio de competición)
                </div>
              )}
            </div>

            {/* Upcoming */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                PRÓXIMOS COMPROMISOS
              </span>
              {homeUpcoming.length > 0 ? (
                homeUpcoming.map((g) => {
                  const isHome = g.homeTeam.abbreviation === game.homeTeam.abbreviation;
                  const opp = isHome ? g.awayTeam : g.homeTeam;
                  return (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <TeamLogo tricode={opp.abbreviation} size={20} />
                        <span className="font-mono text-[var(--hub-text)]">
                          {isHome ? "vs" : "@"} {opp.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--hub-accent)] font-semibold">
                        {g.time || "Programado"}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 rounded-xl bg-[var(--hub-surface-2)] text-xs font-mono text-[var(--hub-text-muted)]">
                  Sin partidos inmediatos programados
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACTO EN EL PICK'EM / CTA DE CIERRE */}
      <div className="rounded-3xl border border-[var(--hub-accent)]/25 bg-[var(--hub-surface-2)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[var(--hub-accent)]" />
            <span className="text-xs font-mono font-bold uppercase text-[var(--hub-accent)] tracking-wider">
              IMPACTO EN TU BOLETA DE PICKS
            </span>
          </div>
          <p className="text-base text-[var(--hub-text)] font-bold">
            ¿Tenés a jugadores o al equipo de {game.awayTeam.name} o {game.homeTeam.name} en tus 13 pronósticos?
          </p>
          <p className="text-xs sm:text-sm text-[var(--hub-text-muted)]">
            El resultado de esta noche y las actuaciones individuales inciden de inmediato en las carreras de MVP, Máximo Anotador y Campeón de Conferencia.
          </p>
        </div>

        <Link
          href="/pickem/picks"
          className="px-6 py-3 rounded-2xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
        >
          <span>REVISAR MIS PICKS</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
