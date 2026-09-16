// filepath: src/app/nba/clasificacion/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";

export const revalidate = 300;

export const metadata = {
  title: "Clasificación NBA 2026/27 · Conferencia Este y Oeste | Drafteados",
  description: "Tabla de posiciones oficial de la NBA 2026/27. Récords, rachas y zona de playoffs de los 30 equipos con la mirada de los Buques.",
};

export default async function StandingsPage() {
  const standings = await basketball.getStandings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>TEMPORADA 2026/27</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1
              className="text-4xl sm:text-6xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              CLASIFICACIÓN
            </h1>
            <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-1.5 font-normal">
              Así está la tabla. Sin filtros de la NBA, con la mirada de los Buques.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--hub-text-dim)] shrink-0">
            Actualizado hace 5 min
          </span>
        </div>
      </header>

      {/* Grid Este & Oeste */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conferencia Este */}
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2
              className="text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              CONFERENCIA ESTE
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--hub-east)] bg-[var(--hub-east)]/10 px-2 py-0.5 rounded border border-[var(--hub-east)]/30">
              15 EQUIPOS
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-mono text-[var(--hub-text-dim)] border-b border-white/5 uppercase">
                  <th className="py-2 pl-2 w-8">#</th>
                  <th className="py-2">EQUIPO</th>
                  <th className="py-2 text-right">W</th>
                  <th className="py-2 text-right">L</th>
                  <th className="py-2 text-right">PCT</th>
                  <th className="py-2 text-right pr-2">RACHA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
                {standings.east.map((item) => {
                  const nbaId = getTeamNbaId(item.team.abbreviation);
                  const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;
                  const isTop6 = item.conferenceRank <= 6;
                  const isPlayIn = item.conferenceRank > 6 && item.conferenceRank <= 10;

                  return (
                    <tr key={item.team.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 pl-2 font-bold text-[var(--hub-text-dim)]">
                        {item.conferenceRank}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded flex items-center justify-center p-0.5 bg-[#18181a] border border-white/10 shrink-0">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={item.team.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span>{item.team.abbreviation}</span>
                            )}
                          </div>
                          <span className="font-sans font-bold text-sm text-[var(--hub-text)] truncate">
                            {item.team.name}
                          </span>
                          {isTop6 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Zona de Playoffs Directos" />
                          )}
                          {isPlayIn && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title="Zona de Play-In" />
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-bold text-[var(--hub-text)]">{item.wins}</td>
                      <td className="py-2.5 text-right text-[var(--hub-text-muted)]">{item.losses}</td>
                      <td className="py-2.5 text-right text-[var(--hub-text-dim)]">
                        .{Math.round(item.winPct * 1000)}
                      </td>
                      <td className="py-2.5 text-right pr-2">
                        <span className={item.streak?.startsWith("W") ? "text-emerald-400 font-bold" : "text-red-400"}>
                          {item.streak}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conferencia Oeste */}
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2
              className="text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              CONFERENCIA OESTE
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--hub-west)] bg-[var(--hub-west)]/10 px-2 py-0.5 rounded border border-[var(--hub-west)]/30">
              15 EQUIPOS
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-mono text-[var(--hub-text-dim)] border-b border-white/5 uppercase">
                  <th className="py-2 pl-2 w-8">#</th>
                  <th className="py-2">EQUIPO</th>
                  <th className="py-2 text-right">W</th>
                  <th className="py-2 text-right">L</th>
                  <th className="py-2 text-right">PCT</th>
                  <th className="py-2 text-right pr-2">RACHA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
                {standings.west.map((item) => {
                  const nbaId = getTeamNbaId(item.team.abbreviation);
                  const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;
                  const isTop6 = item.conferenceRank <= 6;
                  const isPlayIn = item.conferenceRank > 6 && item.conferenceRank <= 10;

                  return (
                    <tr key={item.team.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 pl-2 font-bold text-[var(--hub-text-dim)]">
                        {item.conferenceRank}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded flex items-center justify-center p-0.5 bg-[#18181a] border border-white/10 shrink-0">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={item.team.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span>{item.team.abbreviation}</span>
                            )}
                          </div>
                          <span className="font-sans font-bold text-sm text-[var(--hub-text)] truncate">
                            {item.team.name}
                          </span>
                          {isTop6 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Zona de Playoffs Directos" />
                          )}
                          {isPlayIn && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title="Zona de Play-In" />
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-bold text-[var(--hub-text)]">{item.wins}</td>
                      <td className="py-2.5 text-right text-[var(--hub-text-muted)]">{item.losses}</td>
                      <td className="py-2.5 text-right text-[var(--hub-text-dim)]">
                        .{Math.round(item.winPct * 1000)}
                      </td>
                      <td className="py-2.5 text-right pr-2">
                        <span className={item.streak?.startsWith("W") ? "text-emerald-400 font-bold" : "text-red-400"}>
                          {item.streak}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
