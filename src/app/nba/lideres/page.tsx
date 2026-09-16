// filepath: src/app/nba/lideres/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { LeadersClient } from "./LeadersClient";

export const revalidate = 300;

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
      <header className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>TEMPORADA REGULAR 2026/27</span>
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
              Quién está rompiéndola esta temporada. Las estadísticas que definen a los mejores.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--hub-text-dim)] shrink-0">
            Actualizado hace 15 min
          </span>
        </div>
      </header>

      {/* Interactive Leaders Table with Tabs */}
      <LeadersClient initialLeaders={allLeaders} />
    </div>
  );
}
