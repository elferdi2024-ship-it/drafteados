import { basketball } from "@/lib/data/basketball/composite-provider";
import { LeadersClient } from "./LeadersClient";
import { PageHeader, Callout } from "@/components/ui";

import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Líderes NBA | Stats de la temporada",
  description:
    "Los máximos anotadores, pasadores, reboteadores y triplistas de la NBA 2026/27. Estadísticas oficiales y rankings de temporada en Drafteados.",
  path: "/nba/lideres",
  image: `${SITE_URL}/images/og-nba.png`,
});

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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "NBA Hub", path: "/nba" },
          { name: "Líderes", path: "/nba/lideres" },
        ])}
      />
      {/* PageHeader (DRAF-011 + COPY_DECK.md) */}
      <PageHeader
        eyebrow="NBA HUB · LOS BUQUES · PRETEMPORADA 2026/27"
        title="Líderes"
        description="Líderes de la última temporada regular."
      />

      {/* Callout de datos de referencia (DRAF-013) */}
      <Callout variant="warning">
        Datos de la temporada 2025/26. Se actualizan al inicio de la temporada regular.
      </Callout>

      {/* Interactive Leaders Table with Tabs */}
      <LeadersClient initialLeaders={allLeaders} />
    </div>
  );
}
