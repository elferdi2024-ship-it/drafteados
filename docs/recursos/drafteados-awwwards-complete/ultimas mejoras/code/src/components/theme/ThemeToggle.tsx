"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

export interface ThemeToggleProps {
  className?: string;
  /** Show text label next to icon */
  showLabel?: boolean;
}

/**
 * Light / Dark toggle — brand default is light (drafteados.com).
 * Place in global header and Hub header.
 */
export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!ready}
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      title={theme === "light" ? "Modo oscuro" : "Modo claro"}
      className={cn(
        "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-sm)]",
        "border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)]",
        "text-[var(--color-text-primary)] transition-colors",
        "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
        "disabled:opacity-50",
        className
      )}
    >
      {theme === "light" ? (
        // moon → go dark
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 14.3A9 9 0 1 1 9.7 3 7 7 0 0 0 21 14.3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // sun → go light
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {showLabel ? (
        <span className="text-xs font-semibold uppercase tracking-wider">
          {theme === "light" ? "Oscuro" : "Claro"}
        </span>
      ) : null}
    </button>
  );
}
