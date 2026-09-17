// filepath: src/app/nba/lideres/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { LeadersClient } from "./LeadersClient";

import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Líderes Estadísticos NBA 2026/27 · Puntos, Asistencias, Rebotes",
  description:
    "Los máximos anotadores, pasadores, reboteadores y triplistas de la NBA 2026/27 con estadísticas detalladas y rankings oficiales.",
  openGraph: {
    title: "Líderes Estadísticos NBA 2026/27 | Drafteados",
    description:
      "Rankings oficiales de la NBA: líderes en puntos por partido (PPG), asistencias (APG), rebotes (RPG) y triples anotados (3PM).",
    url: "https://drafteados.com/nba/lideres",
    siteName: "Drafteados",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/og-nba.png",
        width: 1200,
        height: 630,
        alt: "Líderes NBA · Drafteados",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Líderes Estadísticos NBA 2026/27 | Drafteados",
    description:
      "Rankings en vivo de anotadores, pasadores y reboteadores de la NBA.",
    site: "@drafteados",
    creator: "@drafteados",
    images: ["/images/og-nba.png"],
  },
};

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
      {/* Header */}
      <header className="border-b border-[var(--hub-border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>PRETEMPORADA 2026/27</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1
              className="text-4xl sm:text-6xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              LÍDERES
            </h1>
            <p className="text-sm sm:text-base text-[var(--hub-text-secondary)] mt-1.5 font-normal">
              Líderes de la última temporada regular (2025/26).
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-xs font-sans font-semibold text-[var(--hub-text-muted)] shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Ref. Temporada 2025/26</span>
          </div>
        </div>
      </header>

      {/* Pre-season notice callout */}
      <div className="rounded-2xl border-l-4 border-l-[var(--hub-accent)] border border-[var(--hub-border)] bg-[var(--hub-accent-soft)] px-5 py-4 text-xs sm:text-sm text-[var(--hub-text-secondary)] flex items-start gap-3 shadow-sm">
        <span className="font-bold text-[var(--hub-accent)] uppercase tracking-wider shrink-0 font-sans text-xs">
          ACTUALIZACIÓN:
        </span>
        <span className="leading-relaxed">
          Datos de la temporada 2025/26. Se actualizarán automáticamente noche a noche con el inicio de la temporada regular (20 de octubre).
        </span>
      </div>

      {/* Interactive Leaders Table with Tabs */}
      <LeadersClient initialLeaders={allLeaders} />
    </div>
  );
}
