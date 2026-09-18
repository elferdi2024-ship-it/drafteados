// filepath: src/app/nba/clasificacion/page.tsx
import Link from "next/link";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";
import { PageHeader, Callout } from "@/components/ui";
import { StandingsRow, StandingsTableHead, TeamLogo, type StandingsTeam } from "@/components/nba";
import {
  Info,
  Trophy,
  Medal,
  ChevronRight,
} from "lucide-react";

import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Clasificación NBA | Este y Oeste",
  description:
    "Tabla de posiciones oficial de la NBA 2026/27. Conferencia Este y Oeste, balances, rachas y zona de playoffs en Drafteados.",
  path: "/nba/clasificacion",
  image: `${SITE_URL}/images/og-nba.png`,
});

function tierFor(rank: number): "playoffs" | "play-in" | "lottery" {
  if (rank <= 6) return "playoffs";
  if (rank <= 10) return "play-in";
  return "lottery";
}

function mapStandingToTeam(item: any): StandingsTeam {
  const nbaId = getTeamNbaId(item.team.abbreviation, item.team.name);
  return {
    rank: item.conferenceRank,
    tricode: item.team.abbreviation,
    name: item.team.name,
    logoUrl: nbaId ? getTeamLogoUrl(nbaId) : undefined,
    wins: item.wins,
    losses: item.losses,
    pct: `.${Math.round(item.winPct * 1000)}`,
    gb: item.gamesBack === 0 ? "-" : String(item.gamesBack),
    streak: item.streak,
    l10: item.roadRecord || item.homeRecord,
  };
}

export default async function StandingsPage() {
  const standings = await basketball.getStandings();

  // IDs para logotipos oficiales NBA (Campeón: New York Knicks, Subcampeón: San Antonio Spurs)
  const knicksLogo = getTeamLogoUrl(getTeamNbaId("NYK"));
  const spursLogo = getTeamLogoUrl(getTeamNbaId("SAS"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "NBA Hub", path: "/nba" },
          { name: "Clasificación", path: "/nba/clasificacion" },
        ])}
      />
      {/* PageHeader (DRAF-011 + COPY_DECK.md) */}
      <PageHeader
        eyebrow="NBA HUB · LOS BUQUES · TEMPORADA 2026/27"
        title="Clasificación"
        description="Tabla actual · Este y Oeste."
      />

      {/* Callout Pretemporada */}
      <Callout variant="warning" title="Pretemporada">
        Pretemporada · Los resultados no cuentan para la clasificación oficial.
      </Callout>

      {/* Cuadro de Honor Oficial: Campeón Vigente New York Knicks y Subcampeón San Antonio Spurs */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-[var(--hub-text-secondary)] uppercase">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>CUADRO DE HONOR · FINALISTAS 2026 · NARRATIVA BUQUES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campeón Vigente: New York Knicks */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[var(--hub-surface)] to-[#006BB6]/10 p-5 sm:p-6 shadow-sm transition-all hover:border-amber-500/60">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <TeamLogo tricode="NYK" name="New York Knicks" size={56} className="shrink-0" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    CAMPEÓN NBA · NARRATIVA BUQUES
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
                <TeamLogo tricode="SAS" name="San Antonio Spurs" size={56} className="shrink-0" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-slate-500/15 text-slate-600 dark:text-slate-300 border border-slate-500/20 mb-1">
                    <Medal className="w-3 h-3 text-slate-400" />
                    SUBCAMPEÓN · NARRATIVA BUQUES
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
              <StandingsTableHead />
              <tbody>
                {standings.east.map((item) => (
                  <StandingsRow
                    key={item.team.id}
                    team={mapStandingToTeam(item)}
                    tier={tierFor(item.conferenceRank)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="pt-3 border-t border-[var(--hub-border)] flex items-center justify-between text-[11px] font-mono text-[var(--hub-text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-state-win)]" /> Playoffs directos (1-6)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" /> Play-In (7-10)
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
              <StandingsTableHead />
              <tbody>
                {standings.west.map((item) => (
                  <StandingsRow
                    key={item.team.id}
                    team={mapStandingToTeam(item)}
                    tier={tierFor(item.conferenceRank)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="pt-3 border-t border-[var(--hub-border)] flex items-center justify-between text-[11px] font-mono text-[var(--hub-text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-state-win)]" /> Playoffs directos (1-6)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" /> Play-In (7-10)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
