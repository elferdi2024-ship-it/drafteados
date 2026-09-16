// filepath: src/app/nba/calendario/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { CalendarClient } from "@/components/nba/CalendarClient";

export const revalidate = 300;

export const metadata = {
  title: "Calendario NBA 2026/27 · Partidos y Horarios Oficiales | Drafteados",
  description: "Programación completa de la temporada NBA 2026/27 con filtros por conferencia y equipo.",
};

export default async function CalendarPage() {
  const [games, teams] = await Promise.all([
    basketball.getGames({}),
    basketball.getTeams(),
  ]);

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
          Toda la temporada. Programación oficial de partidos, horarios y resultados acumulados con la mirada de los Buques.
        </p>
      </header>

      {/* Interactive Calendar Client */}
      <CalendarClient initialGames={games} teams={teams} />
    </div>
  );
}
