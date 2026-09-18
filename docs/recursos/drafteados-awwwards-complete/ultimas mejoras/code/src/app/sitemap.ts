import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

/**
 * Dynamic sitemap — extend with real team slugs from your data layer.
 * Example: import { getAllTeamSlugs } from "@/lib/data/..."
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
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
      priority: 0.7,
    },
  ];

  // TODO: map 30 teams
  // const teams = await getAllTeamSlugs();
  // const teamRoutes = teams.map((slug) => ({
  //   url: `${SITE_URL}/nba/equipo/${slug}`,
  //   lastModified: now,
  //   changeFrequency: "daily" as const,
  //   priority: 0.75,
  // }));

  return [...staticRoutes];
}
