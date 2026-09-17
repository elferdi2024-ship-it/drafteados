// filepath: src/app/nba/clasificacion/page.tsx
import Link from "next/link";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";
import {
  Info,
  Trophy,
  Medal,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Clasificación NBA 2026/27 · Conferencia Este y Oeste",
  description:
    "Tabla de posiciones oficial de la NBA 2026/27. Campeón vigente New York Knicks, subcampeón San Antonio Spurs, rachas y zona de playoffs.",
  openGraph: {
    title: "Clasificación NBA 2026/27 · Conferencia Este y Oeste | Drafteados",
    description:
      "Tabla de posiciones oficial de la NBA con la mirada de los Buques. Balances, rachas, campeón NY Knicks y zona de playoffs.",
    url: "https://drafteados.com/nba/clasificacion",
    siteName: "Drafteados",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/og-nba.png",
        width: 1200,
        height: 630,
        alt: "Clasificación NBA · Drafteados",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clasificación NBA 2026/27 · Este y Oeste | Drafteados",
    description:
      "Tabla de posiciones oficial de la NBA. Campeón New York Knicks y subcampeón San Antonio Spurs.",
    site: "@drafteados",
    creator: "@drafteados",
    images: ["/images/og-nba.png"],
  },
};

export default async function StandingsPage() {
  const standings = await basketball.getStandings();

  // IDs para logotipos oficiales NBA (Campeón: New York Knicks, Subcampeón: San Antonio Spurs)
  const knicksLogo = getTeamLogoUrl(getTeamNbaId("NYK"));
  const spursLogo = getTeamLogoUrl(getTeamNbaId("SAS"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--hub-border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
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
            <p className="text-sm sm:text-base text-[var(--hub-text-secondary)] mt-1.5 font-normal">
              Tabla actual · Este y Oeste.
            </p>
          </div>
          <span className="text-xs font-sans font-semibold text-[var(--hub-text-muted)] bg-[var(--hub-surface-2)] px-3 py-1.5 rounded-lg border border-[var(--hub-border)] shrink-0">
            Pretemporada 2026/27
          </span>
        </div>
      </header>

      {/* Cuadro de Honor Oficial: Campeón Vigente New York Knicks y Subcampeón San Antonio Spurs */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-[var(--hub-text-secondary)] uppercase">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>CUADRO DE HONOR · FINALISTAS NBA 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campeón Vigente: New York Knicks */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[var(--hub-surface)] to-[#006BB6]/10 p-5 sm:p-6 shadow-sm transition-all hover:border-amber-500/60">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1.5 bg-[var(--hub-surface-2)] border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                  {knicksLogo ? (
                    <img
                      src={knicksLogo}
                      alt="New York Knicks"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono font-bold text-base text-[#006BB6]">NYK</span>
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    VIGENTE CAMPEÓN NBA
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-black text-[var(--hub-text)] tracking-tight uppercase"
                    style={{ fontFamily: "var(--hub-font-display)" }}
                  >
                    NEW YORK KNICKS
                  </h3>
                  <p className="text-xs text-[var(--hub-text-muted)]">
                    3er Anillo · Finales 4-1 vs San Antonio Spurs · MVP: Jalen Brunson
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <span className="text-2xl font-black font-mono text-[var(--hub-text)]">4 - 1</span>
                <span className="block text-[11px] font-sans text-amber-500 font-semibold">FINALES 2026</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--hub-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[var(--hub-text-secondary)]">
                <strong className="text-[var(--hub-text)]">Líderes:</strong> Jalen Brunson, Karl-Anthony Towns, Mikal Bridges
              </div>
              <Link
                href="/nba/equipo/knicks"
                className="inline-flex items-center gap-1 font-sans font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Ver Plantilla Campeona <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Subcampeón: San Antonio Spurs */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--hub-border)] bg-gradient-to-br from-[var(--hub-surface-2)] via-[var(--hub-surface)] to-slate-500/10 p-5 sm:p-6 shadow-sm transition-all hover:border-[var(--hub-border-hover)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1.5 bg-[var(--hub-surface-2)] border border-[var(--hub-border)] flex items-center justify-center shrink-0 shadow-inner">
                  {spursLogo ? (
                    <img
                      src={spursLogo}
                      alt="San Antonio Spurs"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono font-bold text-base">SAS</span>
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-slate-500/15 text-slate-600 dark:text-slate-300 border border-slate-500/20 mb-1">
                    <Medal className="w-3 h-3 text-slate-400" />
                    SUBCAMPEÓN NBA · CAMPEÓN OESTE
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-black text-[var(--hub-text)] tracking-tight uppercase"
                    style={{ fontFamily: "var(--hub-font-display)" }}
                  >
                    SAN ANTONIO SPURS
                  </h3>
                  <p className="text-xs text-[var(--hub-text-muted)]">
                    Campeón Conferencia Oeste 2026
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <span className="text-2xl font-black font-mono text-[var(--hub-text)]">OESTE</span>
                <span className="block text-[11px] font-sans text-slate-400 font-semibold">FINALISTA 2026</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--hub-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[var(--hub-text-secondary)]">
                <strong className="text-[var(--hub-text)]">Líderes:</strong> Victor Wembanyama, Chris Paul, Stephon Castle
              </div>
              <Link
                href="/nba/equipo/spurs"
                className="inline-flex items-center gap-1 font-sans font-semibold text-[var(--hub-text)] hover:underline"
              >
                Ver Plantilla Spurs <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de Contexto Temporada */}
      <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex items-start sm:items-center gap-3 shadow-sm">
        <Info className="w-5 h-5 text-[var(--hub-accent)] shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs text-[var(--hub-text-muted)] leading-relaxed">
          <strong className="text-[var(--hub-text)] font-semibold">Temporada Regular 2026/27: </strong>
          El Opening Night arranca el <strong>20 de octubre de 2026</strong>. Mientras tanto, las tablas reflejan los registros previos de referencia ordenados por porcentaje de victoria (Win %) y se reiniciarán a 0-0 sincronizadamente con el primer partido.
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
