// filepath: src/app/nba/lideres/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { LeadersClient } from "./LeadersClient";

export const revalidate = 300;

export const metadata = {
  title: "Líderes Estadísticos NBA 2026/27 · Puntos, Asistencias, Rebotes | Drafteados",
  description: "Los máximos anotadores, pasadores, taponadores y triplistas de la temporada regular NBA 2026/27.",
};

export default async function LeadersPage() {
  const [pts, ast, reb, blk, stl, fg3m] = await Promise.all([
    basketball.getLeaders("pts", "2026-27", 15),
    basketball.getLeaders("ast", "2026-27", 15),
    basketball.getLeaders("reb", "2026-27", 15),
    basketball.getLeaders("blk", "2026-27", 15),
    basketball.getLeaders("stl", "2026-27", 15),
    basketball.getLeaders("fg3m", "2026-27", 15),
  ]);

  const allLeaders = {
    pts,
    ast,
    reb,
    blk,
    stl,
    fg3m,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--hub-border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>PRETEMPORADA 2026/27</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1
              className="text-4xl sm:text-6xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              LÍDERES
            </h1>
            <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-1.5 font-normal">
              Estadísticas individuales de referencia histórica (2025/26) previas al salto inicial de la nueva temporada 2026/27.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-xs font-mono text-[var(--hub-text-muted)] shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Ref. Temporada 2025/26</span>
          </div>
        </div>
      </header>

      {/* Pre-season notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-[var(--hub-text-muted)] flex items-start gap-2.5">
        <span className="font-bold text-amber-500 uppercase tracking-wider shrink-0 font-mono">
          PRETEMPORADA:
        </span>
        <span>
          Las métricas mostradas reflejan los líderes consolidados de la última temporada regular (2025/26). A partir del 20 de octubre de 2026, los promedios se actualizarán automáticamente noche a noche con los partidos oficiales de la temporada 2026/27.
        </span>
      </div>

      {/* Interactive Leaders Table with Tabs */}
      <LeadersClient initialLeaders={allLeaders} />
    </div>
  );
}
