import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";
import { MOCK_TEAMS } from "@/lib/data/basketball/mock-data";

/**
 * Dynamic sitemap for Drafteados
 * Generates canonical URLs for home, Hub routes, public Pick'em, and all 30 NBA teams.
 */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/nba`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/nba/calendario`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nba/clasificacion`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nba/lideres`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/nba/equipos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/pickem`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pickem/leaderboard`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.75,
    },
  ];

  // 30 Franquicias Oficiales NBA
  const teamRoutes: MetadataRoute.Sitemap = MOCK_TEAMS.map((team) => ({
    url: `${SITE_URL}/nba/equipo/${team.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...teamRoutes];
}
