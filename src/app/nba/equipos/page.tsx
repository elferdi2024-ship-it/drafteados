// filepath: src/app/nba/equipos/page.tsx
import Link from "next/link";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { TeamLogo } from "@/components/nba/TeamLogo";

export const revalidate = 3600;

export default async function TeamsPage() {
  const teams = await basketball.getTeams();
  const eastTeams = teams.filter((t) => t.conference === "East");
  const westTeams = teams.filter((t) => t.conference === "West");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <header className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>FRANQUICIAS OFICIALES</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          EQUIPOS
        </h1>
        <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-1.5 font-normal">
          Los 30. Tocá uno y entrá a ver sus estadísticas, roster y calendario.
        </p>
      </header>

      {/* Este */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
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
              className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)]/50 transition-all hover:-translate-y-0.5 shadow-md"
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
                  <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
                    {team.division} · {team.city}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-[var(--hub-text-dim)] group-hover:text-[var(--hub-accent)] transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Oeste */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
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
              className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] hover:border-[var(--hub-accent)]/50 transition-all hover:-translate-y-0.5 shadow-md"
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
                  <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
                    {team.division} · {team.city}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-[var(--hub-text-dim)] group-hover:text-[var(--hub-accent)] transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
