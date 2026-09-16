// filepath: src/app/nba/clasificacion/page.tsx
import Link from "next/link";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";
import {
  Info,
  Trophy,
  Medal,
  Flame,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Clasificación NBA 2026/27 · Conferencia Este y Oeste | Drafteados",
  description:
    "Tabla de posiciones oficial de la NBA 2026/27. Campeón vigente Celtics, subcampeón Mavericks, foco especial NY Knicks y zona de playoffs con la mirada de los Buques.",
};

export default async function StandingsPage() {
  const standings = await basketball.getStandings();

  // IDs para logotipos oficiales NBA
  const celticsLogo = getTeamLogoUrl(getTeamNbaId("BOS"));
  const mavsLogo = getTeamLogoUrl(getTeamNbaId("DAL"));
  const knicksLogo = getTeamLogoUrl(getTeamNbaId("NYK"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--hub-border)] pb-6">
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
            Pretemporada 2026/27
          </span>
        </div>
      </header>

      {/* Cuadro de Honor: Campeón y Subcampeón */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--hub-text-muted)] uppercase">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>CUADRO DE HONOR · VIGENTES FINALISTAS NBA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campeón: Boston Celtics */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[var(--hub-surface)] to-emerald-500/10 p-5 sm:p-6 shadow-sm transition-all hover:border-amber-500/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-2 bg-[var(--hub-surface-2)] border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                  {celticsLogo ? (
                    <img
                      src={celticsLogo}
                      alt="Boston Celtics"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono font-bold text-base">BOS</span>
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    CAMPEÓN VIGENTE NBA
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-black text-[var(--hub-text)] tracking-tight uppercase"
                    style={{ fontFamily: "var(--hub-font-display)" }}
                  >
                    BOSTON CELTICS
                  </h3>
                  <p className="text-xs text-[var(--hub-text-muted)] font-mono">
                    Banner 18 · Finales NBA 4-1 vs Dallas
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <span className="text-2xl font-black font-mono text-[var(--hub-text)]">64-18</span>
                <span className="block text-[11px] font-mono text-emerald-500 font-semibold">.780 WIN%</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--hub-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[var(--hub-text-muted)]">
                <strong className="text-[var(--hub-text)]">Líderes:</strong> Jaylen Brown (FMVP), Jayson Tatum, Jrue Holiday
              </div>
              <Link
                href="/nba/equipo/celtics"
                className="inline-flex items-center gap-1 font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Ver Plantilla Campeona <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Subcampeón: Dallas Mavericks */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-[var(--hub-surface)] to-slate-500/10 p-5 sm:p-6 shadow-sm transition-all hover:border-blue-500/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-2 bg-[var(--hub-surface-2)] border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner">
                  {mavsLogo ? (
                    <img
                      src={mavsLogo}
                      alt="Dallas Mavericks"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono font-bold text-base">DAL</span>
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 mb-1">
                    <Medal className="w-3 h-3 text-blue-500" />
                    SUBCAMPEÓN NBA · CAMPEÓN OESTE
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-black text-[var(--hub-text)] tracking-tight uppercase"
                    style={{ fontFamily: "var(--hub-font-display)" }}
                  >
                    DALLAS MAVERICKS
                  </h3>
                  <p className="text-xs text-[var(--hub-text-muted)] font-mono">
                    Campeón Conferencia Oeste 2024
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <span className="text-2xl font-black font-mono text-[var(--hub-text)]">50-32</span>
                <span className="block text-[11px] font-mono text-blue-500 font-semibold">.610 WIN%</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--hub-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[var(--hub-text-muted)]">
                <strong className="text-[var(--hub-text)]">Líderes:</strong> Luka Dončić, Kyrie Irving, Klay Thompson
              </div>
              <Link
                href="/nba/equipo/mavericks"
                className="inline-flex items-center gap-1 font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver Plantilla Mavs <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Foco Editorial Destacado: New York Knicks */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-[#006BB6]/40 bg-gradient-to-r from-[#006BB6]/15 via-[var(--hub-surface)] to-[#F58426]/15 p-6 sm:p-8 shadow-[var(--hub-shadow)]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F58426]/20 text-[#F58426] border border-[#F58426]/30 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              FOCO EDITORIAL DRAFTEADOS · CONTENDER WATCH
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-[var(--hub-surface-2)] border border-[#006BB6]/40 flex items-center justify-center shrink-0 shadow-md">
                {knicksLogo ? (
                  <img
                    src={knicksLogo}
                    alt="New York Knicks"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-mono font-bold text-xl text-[#006BB6]">NYK</span>
                )}
              </div>
              <div>
                <h2
                  className="text-2xl sm:text-4xl font-black text-[var(--hub-text)] tracking-tight uppercase"
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  NEW YORK KNICKS: APUESTA TOTAL POR EL ANILLO
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#006BB6] dark:text-[#60a5fa] font-bold">
                  Conferencia Este · Récord Previo 50-32 (2º Cabeza de Serie)
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[var(--hub-text-muted)] leading-relaxed">
              El Madison Square Garden entra en fase de máxima exigencia. Con la llegada bomba de{" "}
              <strong className="text-[var(--hub-text)]">Karl-Anthony Towns</strong> sumada a la química
              ganadora de <strong className="text-[var(--hub-text)]">Villanova</strong> (Jalen Brunson, Mikal Bridges, Josh Hart)
              y la defensa élite de OG Anunoby, Nueva York se postula como la gran amenaza al trono de Boston.
            </p>

            {/* Badges de características */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)]/60 text-xs">
                <span className="font-bold text-[var(--hub-text)] block">🌟 All-Star Core</span>
                <span className="text-[var(--hub-text-muted)] text-[11px]">Jalen Brunson & KAT</span>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)]/60 text-xs">
                <span className="font-bold text-[var(--hub-text)] block">🛡️ Muralla Defensiva</span>
                <span className="text-[var(--hub-text-muted)] text-[11px]">Mikal Bridges & OG Anunoby</span>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)]/60 text-xs">
                <span className="font-bold text-[var(--hub-text)] block">🗽 Villanova Connection</span>
                <span className="text-[var(--hub-text-muted)] text-[11px]">Brunson, Bridges & Hart</span>
              </div>
            </div>
          </div>

          {/* Acciones directas */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-56">
            <Link
              href="/nba/equipo/knicks"
              className="px-4 py-3 rounded-xl bg-[#006BB6] hover:bg-[#005596] text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>Ver Plantilla Knicks</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pickem/picks"
              className="px-4 py-3 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)] hover:bg-[var(--hub-surface)] text-[var(--hub-text)] font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Flame className="w-4 h-4 text-[#F58426]" />
              <span>Picks de New York</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner de Contexto Temporada */}
      <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex items-start sm:items-center gap-3 shadow-sm">
        <Info className="w-5 h-5 text-[var(--hub-accent)] shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs text-[var(--hub-text-muted)] leading-relaxed">
          <strong className="text-[var(--hub-text)] font-semibold">Datos de Referencia Histórica (Temporada 2025/26): </strong>
          La temporada regular 2026/27 arranca el <strong>20 de octubre de 2026</strong>. Mientras tanto, las tablas reflejan los registros previos de referencia ordenados por porcentaje de victoria (Win %) y se reiniciarán a 0-0 sincronizadamente con el primer partido.
        </div>
      </div>

      {/* Grid Este & Oeste */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conferencia Este */}
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-6 shadow-[var(--hub-shadow)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-3">
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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-mono text-[var(--hub-text-dim)] border-b border-[var(--hub-border)] uppercase">
                  <th className="py-2.5 pl-2 w-8 text-center">#</th>
                  <th className="py-2.5 px-2">EQUIPO</th>
                  {/* Vista móvil simplificada para evitar solapamiento */}
                  <th className="py-2.5 px-2 text-right sm:hidden">V-D</th>
                  <th className="py-2.5 px-2 text-right sm:hidden">%</th>
                  {/* Vista desktop completa */}
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">W</th>
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">L</th>
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">PCT</th>
                  <th className="py-2.5 px-2 sm:px-3 text-right pr-2">RACHA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hub-border)] text-xs font-mono">
                {standings.east.map((item) => {
                  const nbaId = getTeamNbaId(item.team.abbreviation);
                  const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;
                  const isTop6 = item.conferenceRank <= 6;
                  const isPlayIn = item.conferenceRank > 6 && item.conferenceRank <= 10;
                  const teamSlug = item.team.slug || item.team.abbreviation.toLowerCase();

                  return (
                    <tr
                      key={item.team.id}
                      className="hover:bg-[var(--hub-surface-2)] transition-colors group"
                    >
                      <td className="py-2.5 pl-2 text-center font-bold text-[var(--hub-text-dim)]">
                        {item.conferenceRank}
                      </td>
                      <td className="py-2.5 px-2">
                        <Link
                          href={`/nba/equipo/${teamSlug}`}
                          className="flex items-center gap-2 group-hover:text-[var(--hub-accent)] transition-colors"
                        >
                          <div className="w-6 h-6 rounded flex items-center justify-center p-0.5 bg-[var(--hub-surface-2)] border border-[var(--hub-border)] shrink-0">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={item.team.name}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-[10px]">{item.team.abbreviation}</span>
                            )}
                          </div>
                          <span className="font-sans font-bold text-xs sm:text-sm text-[var(--hub-text)] truncate max-w-[120px] sm:max-w-[200px]">
                            {item.team.name}
                          </span>
                          {isTop6 && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                              title="Playoffs Directos (Top 6)"
                            />
                          )}
                          {isPlayIn && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                              title="Play-In (7-10)"
                            />
                          )}
                        </Link>
                      </td>

                      {/* Móvil: V-D compactado */}
                      <td className="py-2.5 px-2 text-right font-bold text-[var(--hub-text)] tabular-nums sm:hidden whitespace-nowrap">
                        {item.wins}-{item.losses}
                      </td>
                      <td className="py-2.5 px-2 text-right text-[var(--hub-text-dim)] tabular-nums sm:hidden whitespace-nowrap">
                        .{Math.round(item.winPct * 1000)}
                      </td>

                      {/* Desktop: Columnas individuales */}
                      <td className="py-2.5 px-3 text-right font-bold text-[var(--hub-text)] tabular-nums hidden sm:table-cell">
                        {item.wins}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--hub-text-muted)] tabular-nums hidden sm:table-cell">
                        {item.losses}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--hub-text-dim)] tabular-nums hidden sm:table-cell">
                        .{Math.round(item.winPct * 1000)}
                      </td>

                      {/* Racha */}
                      <td className="py-2.5 px-2 sm:px-3 text-right pr-2 whitespace-nowrap">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            item.streak?.startsWith("W")
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-red-500/15 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {item.streak || "-"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="pt-3 border-t border-[var(--hub-border)] flex items-center justify-between text-[11px] font-mono text-[var(--hub-text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Playoffs directos (1-6)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Play-In (7-10)
              </span>
            </div>
          </div>
        </div>

        {/* Conferencia Oeste */}
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-6 shadow-[var(--hub-shadow)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--hub-border)] pb-3">
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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-mono text-[var(--hub-text-dim)] border-b border-[var(--hub-border)] uppercase">
                  <th className="py-2.5 pl-2 w-8 text-center">#</th>
                  <th className="py-2.5 px-2">EQUIPO</th>
                  {/* Vista móvil simplificada */}
                  <th className="py-2.5 px-2 text-right sm:hidden">V-D</th>
                  <th className="py-2.5 px-2 text-right sm:hidden">%</th>
                  {/* Vista desktop completa */}
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">W</th>
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">L</th>
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">PCT</th>
                  <th className="py-2.5 px-2 sm:px-3 text-right pr-2">RACHA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hub-border)] text-xs font-mono">
                {standings.west.map((item) => {
                  const nbaId = getTeamNbaId(item.team.abbreviation);
                  const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;
                  const isTop6 = item.conferenceRank <= 6;
                  const isPlayIn = item.conferenceRank > 6 && item.conferenceRank <= 10;
                  const teamSlug = item.team.slug || item.team.abbreviation.toLowerCase();

                  return (
                    <tr
                      key={item.team.id}
                      className="hover:bg-[var(--hub-surface-2)] transition-colors group"
                    >
                      <td className="py-2.5 pl-2 text-center font-bold text-[var(--hub-text-dim)]">
                        {item.conferenceRank}
                      </td>
                      <td className="py-2.5 px-2">
                        <Link
                          href={`/nba/equipo/${teamSlug}`}
                          className="flex items-center gap-2 group-hover:text-[var(--hub-accent)] transition-colors"
                        >
                          <div className="w-6 h-6 rounded flex items-center justify-center p-0.5 bg-[var(--hub-surface-2)] border border-[var(--hub-border)] shrink-0">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={item.team.name}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-[10px]">{item.team.abbreviation}</span>
                            )}
                          </div>
                          <span className="font-sans font-bold text-xs sm:text-sm text-[var(--hub-text)] truncate max-w-[120px] sm:max-w-[200px]">
                            {item.team.name}
                          </span>
                          {isTop6 && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                              title="Playoffs Directos (Top 6)"
                            />
                          )}
                          {isPlayIn && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                              title="Play-In (7-10)"
                            />
                          )}
                        </Link>
                      </td>

                      {/* Móvil: V-D compactado */}
                      <td className="py-2.5 px-2 text-right font-bold text-[var(--hub-text)] tabular-nums sm:hidden whitespace-nowrap">
                        {item.wins}-{item.losses}
                      </td>
                      <td className="py-2.5 px-2 text-right text-[var(--hub-text-dim)] tabular-nums sm:hidden whitespace-nowrap">
                        .{Math.round(item.winPct * 1000)}
                      </td>

                      {/* Desktop: Columnas individuales */}
                      <td className="py-2.5 px-3 text-right font-bold text-[var(--hub-text)] tabular-nums hidden sm:table-cell">
                        {item.wins}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--hub-text-muted)] tabular-nums hidden sm:table-cell">
                        {item.losses}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--hub-text-dim)] tabular-nums hidden sm:table-cell">
                        .{Math.round(item.winPct * 1000)}
                      </td>

                      {/* Racha */}
                      <td className="py-2.5 px-2 sm:px-3 text-right pr-2 whitespace-nowrap">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            item.streak?.startsWith("W")
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-red-500/15 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {item.streak || "-"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="pt-3 border-t border-[var(--hub-border)] flex items-center justify-between text-[11px] font-mono text-[var(--hub-text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Playoffs directos (1-6)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Play-In (7-10)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
