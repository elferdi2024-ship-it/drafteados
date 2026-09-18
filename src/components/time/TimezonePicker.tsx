// filepath: src/components/time/TimezonePicker.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { REGIONS, type RegionId } from "@/lib/time/regions";
import { useTimezone } from "./TimezoneContext";

export interface TimezonePickerProps {
  className?: string;
  /** Controlled optional */
  value?: RegionId;
  onChange?: (id: RegionId) => void;
  /** Show compact chip (flag + short label) vs full */
  compact?: boolean;
}

/**
 * Selector de región horaria con banderas de alta fidelidad.
 * Conectado a TimezoneContext global (persistencia permanente en localStorage y cookie).
 */
export function TimezonePicker({
  className,
  value,
  onChange,
  compact = true,
}: TimezonePickerProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { regionId, region, setRegionId } = useTimezone();

  const activeRegionId = value ?? regionId;
  const activeRegion = REGIONS.find((r) => r.id === activeRegionId) ?? region;

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  function select(id: RegionId) {
    setRegionId(id);
    onChange?.(id);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Zona horaria: ${activeRegion.label}`}
        className={cn(
          "inline-flex h-11 min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-border-subtle)]",
          "bg-[var(--color-surface-1)] px-3 text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer select-none",
          "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
          "transition-all duration-150 shadow-xs"
        )}
      >
        {/* Bandera con imagen CDN nítida + fallback a emoji */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeRegion.flagUrl}
          alt={activeRegion.label}
          width={20}
          height={14}
          className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs border border-black/10 dark:border-white/10"
          onError={(e) => {
            // Fallback to text flag if image fails
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />

        {!compact ? (
          <span className="text-xs sm:text-sm font-medium">{activeRegion.label}</span>
        ) : (
          <span className="text-xs font-bold tracking-wide font-mono uppercase">
            {activeRegion.shortLabel}
          </span>
        )}

        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          className={cn("opacity-60 transition-transform duration-150", open && "rotate-180")}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Elegir país o región horaria"
          className={cn(
            "absolute right-0 z-50 mt-2 max-h-72 w-64 overflow-y-auto rounded-[var(--radius-md)]",
            "border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] py-1.5 shadow-xl backdrop-blur-xl",
            "focus:outline-none"
          )}
        >
          <li className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)]/50 mb-1">
            Tu Zona Horaria (Persistente)
          </li>
          {REGIONS.filter((r) => r.id !== "ET").map((r) => (
            <li key={r.id} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={r.id === activeRegionId}
                onClick={() => select(r.id)}
                className={cn(
                  "flex min-h-[40px] w-full items-center justify-between px-3 py-2 text-left text-xs sm:text-sm cursor-pointer",
                  "hover:bg-[var(--color-surface-2)] transition-colors duration-100",
                  r.id === activeRegionId &&
                    "bg-[var(--color-brand-soft)] font-semibold text-[var(--color-brand-primary)]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.flagUrl}
                    alt=""
                    width={20}
                    height={14}
                    className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs border border-black/10 dark:border-white/10"
                  />
                  <span className="truncate text-[var(--color-text-primary)]">{r.label}</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase font-semibold">
                  {r.shortLabel}
                </span>
              </button>
            </li>
          ))}
          <li role="presentation" className="border-t border-[var(--color-border-subtle)]/50 mt-1 pt-1">
            {REGIONS.filter((r) => r.id === "ET").map((r) => (
              <button
                key={r.id}
                type="button"
                role="option"
                aria-selected={r.id === activeRegionId}
                onClick={() => select(r.id)}
                className={cn(
                  "flex min-h-[38px] w-full items-center justify-between px-3 py-2 text-left text-xs cursor-pointer",
                  "hover:bg-[var(--color-surface-2)] transition-colors duration-100 text-[var(--color-text-secondary)]",
                  r.id === activeRegionId &&
                    "bg-[var(--color-brand-soft)] font-semibold text-[var(--color-brand-primary)]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.flagUrl}
                    alt=""
                    width={20}
                    height={14}
                    className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs border border-black/10 dark:border-white/10"
                  />
                  <span className="truncate">{r.label}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase">
                  NBA Oficial
                </span>
              </button>
            ))}
          </li>
        </ul>
      ) : null}
    </div>
  );
}
