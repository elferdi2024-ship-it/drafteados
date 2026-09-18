import Link from "next/link";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { TeamLogo } from "@/components/nba/TeamLogo";
import { PageHeader } from "@/components/ui";

import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Equipos NBA | Las 30 franquicias",
  description:
    "Las 30 franquicias de la NBA. Plantillas completas con salarios, resultados recientes, calendarios y estadísticas de Conferencia Este y Oeste en Drafteados.",
  path: "/nba/equipos",
  image: `${SITE_URL}/images/og-nba.png`,
});

export default async function TeamsPage() {
  const teams = await basketball.getTeams();
  const eastTeams = teams.filter((t) => t.conference === "East");
  const westTeams = teams.filter((t) => t.conference === "West");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "NBA Hub", path: "/nba" },
          { name: "Equipos", path: "/nba/equipos" },
        ])}
      />
      {/* PageHeader (DRAF-011 + COPY_DECK.md) */}
      <PageHeader
        eyebrow="NBA HUB · LOS BUQUES · FRANQUICIAS"
        title="Equipos"
        description="Las 30 franquicias · Roster, stats y calendario."
      />

      {/* Este */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--hub-border)] pb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--hub-east)]" />
          <h2
            className="text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight"
            style={{ fontFamily: "var(--hub-font-display)" }}
          >
            CONFERENCIA ESTE (15)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eastTeams.map((team) => (
            <Link
              key={team.id}
              href={`/nba/equipo/${team.slug}`}
              className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)]/50 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <TeamLogo
                  abbreviation={team.abbreviation}
                  name={team.name}
                  primaryColor={team.primaryColor}
                  size="lg"
                />

                <div className="truncate">
                  <span className="font-bold text-base text-[var(--hub-text)] truncate block group-hover:text-[var(--hub-accent)] transition-colors">
                    {team.name}
                  </span>
                  <span className="text-xs font-sans text-[var(--hub-text-muted)] uppercase">
                    {team.division} · {team.city}
                  </span>
                </div>
              </div>

              <span className="font-sans text-xs font-bold text-[var(--hub-text-muted)] group-hover:text-[var(--hub-accent)] transition-colors pr-1">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Oeste */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--hub-border)] pb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--hub-west)]" />
          <h2
            className="text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight"
            style={{ fontFamily: "var(--hub-font-display)" }}
          >
            CONFERENCIA OESTE (15)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {westTeams.map((team) => (
            <Link
              key={team.id}
              href={`/nba/equipo/${team.slug}`}
              className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)]/50 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <TeamLogo
                  abbreviation={team.abbreviation}
                  name={team.name}
                  primaryColor={team.primaryColor}
                  size="lg"
                />

                <div className="truncate">
                  <span className="font-bold text-base text-[var(--hub-text)] truncate block group-hover:text-[var(--hub-accent)] transition-colors">
                    {team.name}
                  </span>
                  <span className="text-xs font-sans text-[var(--hub-text-muted)] uppercase">
                    {team.division} · {team.city}
                  </span>
                </div>
              </div>

              <span className="font-sans text-xs font-bold text-[var(--hub-text-muted)] group-hover:text-[var(--hub-accent)] transition-colors pr-1">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
