// filepath: src/app/nba/page.tsx
import Link from "next/link";
import { ArrowRight, Trophy, Flame, AlertCircle, Info, Calendar, Users, BarChart3 } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { ScoreboardCard } from "@/components/nba/ScoreboardCard";
import { SectionHeader } from "@/components/nba/SectionHeader";
import { MiniStandings } from "@/components/nba/MiniStandings";
import { MiniLeaders } from "@/components/nba/MiniLeaders";
import { CountdownClock } from "@/components/nba/CountdownClock";

export const revalidate = 60;

export const metadata = {
  title: "NBA Hub · Los Buques | Drafteados",
  description:
    "El cuartel general de la NBA para los Buques. Marcadores en directo, clasificación Este y Oeste, calendario de la temporada regular y estadísticas.",
};

export default async function NbaHubPage() {
  const [games, standings, ptsLeaders, astLeaders, rebLeaders, fg3mLeaders] = await Promise.all([
    basketball.getScoreboard(),
    basketball.getStandings(),
    basketball.getLeaders("pts", "2026-27", 6),
    basketball.getLeaders("ast", "2026-27", 6),
    basketball.getLeaders("reb", "2026-27", 6),
    basketball.getLeaders("fg3m", "2026-27", 6),
  ]);

  const liveGames = games.filter((g) => g.status === "live");
  const upcomingGames = games.filter((g) => g.status === "scheduled");
  const finalGames = games.filter((g) => g.status === "final");

  const leadersDict = {
    pts: ptsLeaders,
    ast: astLeaders,
    reb: rebLeaders,
    fg3m: fg3mLeaders,
  };

  const todayStr = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Header */}
      <header className="border-b border-[var(--hub-border)] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span className="capitalize">{todayStr}</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)", letterSpacing: "-0.03em" }}
        >
          HOY EN LA NBA
        </h1>
        <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-2.5 max-w-2xl font-normal leading-relaxed">
          Resultados, marcadores oficiales y el pulso diario de la mejor liga del mundo con la mirada de Drafteados.
        </p>

        {/* Barra de Acceso Rápido Editorial */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 text-xs font-mono font-bold">
          <Link
            href="/nba/clasificacion"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)] text-[var(--hub-text)] hover:text-[var(--hub-accent)] transition-colors shrink-0"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>CLASIFICACIÓN (KNICKS 🏆)</span>
          </Link>
          <Link
            href="/nba/calendario"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)] text-[var(--hub-text)] hover:text-[var(--hub-accent)] transition-colors shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--hub-accent)]" />
            <span>CALENDARIO (50+ PARTIDOS)</span>
          </Link>
          <Link
            href="/nba/equipos"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)] text-[var(--hub-text)] hover:text-[var(--hub-accent)] transition-colors shrink-0"
          >
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>30 FRANQUICIAS</span>
          </Link>
          <Link
            href="/nba/lideres"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)] text-[var(--hub-text)] hover:text-[var(--hub-accent)] transition-colors shrink-0"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
            <span>LÍDERES</span>
          </Link>
          <Link
            href="/pickem"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--hub-accent)]/30 bg-[var(--hub-accent-soft)] hover:bg-[var(--hub-accent)] text-[var(--hub-accent)] hover:text-white transition-colors shrink-0 ml-auto"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>PICK&apos;EM OFICIAL</span>
          </Link>
        </nav>
      </header>

      {/* Reloj Cuenta Regresiva Salto Inicial 2026/27 */}
      <CountdownClock />

      {/* Banner de Contexto de Temporada */}
      <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-5 flex items-start sm:items-center gap-3.5 shadow-sm">
        <Info className="w-5 h-5 text-[var(--hub-accent)] shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs sm:text-sm text-[var(--hub-text-muted)] leading-relaxed">
          <strong className="text-[var(--hub-text)] font-semibold">Temporada Regular 2026/27: </strong>
          El Opening Night oficial arranca el <strong>20 de octubre de 2026</strong>. Mientras tanto, el hub presenta la cartelera completa de la primera semana, los balances históricos consolidados y las plantillas oficiales con contratos actualizados.
        </div>
      </div>

      {/* 1. Partidos / Calendario de la Jornada */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="CALENDARIO OFICIAL · SEMANA INAUGURAL"
          title="Partidos de la jornada"
          subtitle="Horarios oficiales para España peninsular y horario local estadounidense."
          actionHref="/nba/calendario"
          actionLabel="Ver Calendario Completo"
        />

        {games.length === 0 ? (
          <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-12 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-[var(--hub-accent)] mx-auto" />
            <p className="font-bold text-lg text-[var(--hub-text)]">
              No hay partidos en juego en este momento.
            </p>
            <p className="text-sm text-[var(--hub-text-muted)]">
              Disfrutá el descanso, Buque. Consultá la cartelera de la semana inaugural o revisá tus predicciones en el Pick&apos;em.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Live games if any */}
            {liveGames.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
            {/* Upcoming games */}
            {upcomingGames.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
            {/* Final games */}
            {finalGames.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* 2. Grid Clasificación Rápida & Líderes */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <MiniStandings standings={standings} limit={6} />
        <MiniLeaders leaders={leadersDict} limit={6} />
      </section>

      {/* 3. Call to Action Editorial hacia Pick'em */}
      <section className="rounded-3xl border border-[var(--hub-accent)]/40 bg-gradient-to-r from-[var(--hub-accent)]/10 via-[var(--hub-surface)] to-[var(--hub-surface)] p-6 sm:p-10 shadow-[var(--hub-shadow)] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[var(--hub-accent-soft)] text-[var(--hub-accent)] border border-[var(--hub-accent)]/20">
            <Flame className="w-3.5 h-3.5" />
            <span>PRONÓSTICO OFICIAL · TEMPORADA 2026/27</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--hub-font-display)", letterSpacing: "-0.03em" }}
          >
            ¿TUS PICKS TODAVÍA VIVEN?
          </h2>

          <p className="text-sm sm:text-base text-[var(--hub-text-muted)] font-normal leading-relaxed">
            Cada actuación individual y cada balance semanal alteran el ranking oficial de los Buques. Asegurá tus 13 predicciones antes de que se selle definitivamente la boleta de la temporada.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/pickem"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              <span>Ir a Pick&apos;em Oficial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pickem/leaderboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)] hover:border-[var(--hub-accent)] text-[var(--hub-text)] font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-98"
            >
              <Trophy className="w-3.5 h-3.5 text-[var(--hub-accent)]" />
              <span>Ver Ranking de la Comunidad</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "Drafteados NBA Hub",
            "url": "https://drafteados.com/nba",
            "description": "El hub oficial de la NBA en español para los Buques. Marcadores en vivo, clasificación Este/Oeste y estadísticas.",
            "sport": "Basketball",
          }),
        }}
      />
    </div>
  );
}
