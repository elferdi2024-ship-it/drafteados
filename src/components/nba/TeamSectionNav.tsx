// filepath: src/components/nba/TeamSectionNav.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type TeamSectionId = "narrativa" | "plantilla" | "partidos" | "stats";

const SECTIONS: { id: TeamSectionId; label: string }[] = [
  { id: "narrativa", label: "Narrativa" },
  { id: "plantilla", label: "Plantilla" },
  { id: "partidos", label: "Partidos" },
  { id: "stats", label: "Stats & Picks" },
];

interface TeamSectionNavProps {
  /** Si no hay JSON Buques, ocultar Narrativa */
  hasNarrativa?: boolean;
  primaryColor?: string;
}

export function TeamSectionNav({
  hasNarrativa = true,
  primaryColor = "var(--color-brand-primary)",
}: TeamSectionNavProps) {
  const [active, setActive] = useState<TeamSectionId>(
    hasNarrativa ? "narrativa" : "plantilla"
  );
  const [stuck, setStuck] = useState(false);

  const items = SECTIONS.filter((s) => hasNarrativa || s.id !== "narrativa");

  useEffect(() => {
    // Sincronizar si el usuario cambia el tab directamente en TeamTabsView
    const handleTabChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "ROSTER") setActive("plantilla");
      if (detail === "GAMES") setActive("partidos");
      if (detail === "STATS") setActive("stats");
    };

    window.addEventListener("drafteados:team-tab-active", handleTabChange);

    const onScroll = () => {
      setStuck(window.scrollY > 260);

      const offset = 140;
      const narrativaEl = hasNarrativa ? document.getElementById("narrativa") : null;
      const tabsEl = document.getElementById("team-tabs");

      if (narrativaEl && tabsEl) {
        const tabsTop = tabsEl.getBoundingClientRect().top;
        const narrativaTop = narrativaEl.getBoundingClientRect().top;

        if (tabsTop <= offset) {
          // Ya estamos en la zona de tabs
          // El tab activo se mantiene con el estado actual de los tabs
        } else if (narrativaTop <= offset + 100) {
          setActive("narrativa");
        }
      } else if (narrativaEl) {
        if (narrativaEl.getBoundingClientRect().top <= offset) {
          setActive("narrativa");
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("drafteados:team-tab-active", handleTabChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasNarrativa]);

  function goTo(id: TeamSectionId) {
    setActive(id);

    if (id === "narrativa") {
      const el = document.getElementById("narrativa");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    // Para plantilla, partidos o stats: cambiar tab en TeamTabsView y hacer scroll a #team-tabs
    const tabMap: Record<string, "ROSTER" | "GAMES" | "STATS"> = {
      plantilla: "ROSTER",
      partidos: "GAMES",
      stats: "STATS",
    };

    const targetTab = tabMap[id];
    if (targetTab && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("drafteados:team-tab", { detail: targetTab })
      );
    }

    const tabsEl = document.getElementById("team-tabs");
    if (tabsEl) {
      const top = tabsEl.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <nav
      aria-label="Secciones del equipo"
      className={cn(
        "sticky top-16 sm:top-18 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 transition-shadow",
        stuck && "shadow-sm"
      )}
    >
      <div
        className={cn(
          "flex gap-1 overflow-x-auto no-scrollbar rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)]/95 backdrop-blur-md p-1.5 shadow-xs",
          "supports-[backdrop-filter]:bg-[var(--hub-surface)]/80"
        )}
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              className={cn(
                "shrink-0 rounded-xl px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wide transition-all cursor-pointer select-none",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
                !isActive &&
                  "text-[var(--hub-text-secondary)] hover:text-[var(--hub-text)] hover:bg-[var(--hub-surface-2)]"
              )}
              style={
                isActive
                  ? {
                      backgroundColor: primaryColor,
                      color: "#FFFFFF",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }
                  : undefined
              }
              aria-current={isActive ? "true" : undefined}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
