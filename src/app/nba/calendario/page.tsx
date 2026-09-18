import { basketball } from "@/lib/data/basketball/composite-provider";
import { CalendarClient } from "@/components/nba/CalendarClient";
import { PageHeader } from "@/components/ui";

import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Calendario NBA 2026/27 | Horarios España y EE.UU.",
  description:
    "Todos los partidos de la temporada NBA 2026/27. Horarios para España peninsular y EE.UU., filtros por conferencia y cartelera completa.",
  path: "/nba/calendario",
  image: `${SITE_URL}/images/og-nba.png`,
});

export default async function CalendarPage() {
  const [games, teams] = await Promise.all([
    basketball.getGames({}),
    basketball.getTeams(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "NBA Hub", path: "/nba" },
          { name: "Calendario", path: "/nba/calendario" },
        ])}
      />
      <PageHeader
        eyebrow="NBA HUB · LOS BUQUES · TEMPORADA 2026/27"
        title="Calendario"
        description="Todos los partidos · Horarios España y EE.UU."
      />

      {/* Interactive Calendar Client */}
      <CalendarClient initialGames={games} teams={teams} />
    </div>
  );
}
