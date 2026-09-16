// filepath: src/app/nba/calendario/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { ScoreboardCard } from "@/components/nba/ScoreboardCard";

export const revalidate = 300;

export default async function CalendarPage() {
  const games = await basketball.getGames({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>TEMPORADA 2026/27</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          CALENDARIO
        </h1>
        <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-1.5 font-normal">
          Toda la temporada. Programación oficial de partidos y resultados acumulados.
        </p>
      </header>

      {/* Grid of games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {games.map((game) => (
          <ScoreboardCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
