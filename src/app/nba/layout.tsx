// filepath: src/app/nba/layout.tsx
import type { Metadata } from "next";
import { HubNav } from "@/components/nba/HubNav";

export const metadata: Metadata = {
  title: "NBA Hoy · Resultados, Partidos en Vivo y Estadísticas | Drafteados",
  description: "El centro de comando de la NBA para los Buques. Marcadores en directo, partidos de hoy, clasificación Este/Oeste y líderes de temporada.",
  keywords: [
    "NBA en vivo",
    "partidos NBA hoy",
    "resultados NBA",
    "clasificacion NBA",
    "lideres NBA",
    "Drafteados NBA",
    "Los Buques",
  ],
  openGraph: {
    title: "NBA Hub de los Buques · Resultados y Marcadores en Vivo",
    description: "Seguí la jornada NBA con el análisis y la mirada de Drafteados. Partidos en directo, tabla de posiciones y líderes.",
    url: "https://drafteados.com/nba",
    siteName: "Drafteados",
    type: "website",
  },
};

export default function NbaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--hub-bg)] text-[var(--hub-text)] font-sans antialiased selection:bg-[var(--hub-accent)] selection:text-white pb-16">
      <HubNav />
      {children}
    </div>
  );
}
