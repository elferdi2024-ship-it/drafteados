// filepath: src/app/nba/page.tsx
import Link from "next/link";
import { ArrowRight, Trophy, Flame, AlertCircle } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { ScoreboardCard } from "@/components/nba/ScoreboardCard";
import { SectionHeader } from "@/components/nba/SectionHeader";
import { MiniStandings } from "@/components/nba/MiniStandings";
import { MiniLeaders } from "@/components/nba/MiniLeaders";

export const revalidate = 60;

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Header */}
      <header className="border-b border-white/[0.08] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span className="capitalize">{todayStr}</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          HOY EN LA NBA
        </h1>
        <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-2 max-w-2xl font-normal">
          Resultados, partidos en vivo y lo que importa de la jornada con la mirada oficial de Drafteados.
        </p>
      </header>

      {/* 1. Partidos de Hoy */}
      <section>
        <SectionHeader
          eyebrow="SCOREBOARD OFICIAL"
          title="Partidos de hoy"
          subtitle="En vivo, próximos y finalizados de la jornada regular."
          actionHref="/nba/calendario"
          actionLabel="Ver Calendario Completo"
        />

        {games.length === 0 ? (
          <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-12 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-[var(--hub-accent)] mx-auto" />
            <p className="font-bold text-lg text-[var(--hub-text)]">
              No hay partidos programados para hoy.
            </p>
            <p className="text-sm text-[var(--hub-text-muted)]">
              Disfrutá el día libre, Buque. Revisá la clasificación o tus predicciones mientras tanto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Live games first */}
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

      {/* 3. Call to Action Contextual hacia Pick'em */}
      <section className="rounded-3xl border border-[var(--hub-accent)]/30 bg-gradient-to-br from-[#16120e] via-[var(--hub-surface)] to-[var(--hub-surface-2)] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow accent in background */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[var(--hub-accent)]/15 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[var(--hub-accent)]/10 text-[var(--hub-accent)] border border-[var(--hub-accent)]/20">
            <Flame className="w-3.5 h-3.5" />
            <span>PRONÓSTICO OFICIAL DE LA TEMPORADA</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--hub-font-display)" }}
          >
            ¿TUS PICKS TODAVÍA VIVEN?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Cada actuación y cada victoria de esta noche mueve puntos en el ranking oficial de los Buques. Asegurá tus 13 elecciones antes de que se selle la boleta.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link
              href="/pickem"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-title text-xl tracking-wider uppercase transition-all shadow-lg shadow-[var(--hub-accent)]/30 active:scale-95 cursor-pointer"
            >
              <span>IR A PICK&apos;EM</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/pickem/leaderboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors border border-white/10"
            >
              <Trophy className="w-4 h-4 text-[var(--hub-accent)]" />
              <span>TABLA DE POSICIONES</span>
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
