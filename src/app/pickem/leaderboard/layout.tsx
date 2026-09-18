import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ranking Pick'em | Drafteados",
  description:
    "Tabla de clasificación oficial de Drafteados Pick'em NBA 2026/27 en tiempo real. Puntos acumulados, aciertos y ranking de la comunidad.",
  path: "/pickem/leaderboard",
  image: `${SITE_URL}/images/og-pickem.jpg`,
});

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
