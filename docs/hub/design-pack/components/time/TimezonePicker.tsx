"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  REGIONS,
  type RegionId,
  resolveRegionId,
  storeRegionId,
  getRegion,
} from "@/lib/time/regions";

export interface TimezonePickerProps {
  className?: string;
  /** Controlled optional */
  value?: RegionId;
  onChange?: (id: RegionId) => void;
  /** Show full label in list */
  compact?: boolean;
}

/**
 * Selector de región horaria con banderas.
 * Persiste en localStorage y notifica al padre para re-render de horas.
 */
export function TimezonePicker({
  className,
  value,
  onChange,
  compact = true,
}: TimezonePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [regionId, setRegionId] = React.useState<RegionId>("ES");

  React.useEffect(() => {
    setRegionId(value ?? resolveRegionId());
  }, [value]);

  const region = getRegion(regionId);

  function select(id: RegionId) {
    setRegionId(id);
    storeRegionId(id);
    onChange?.(id);
    setOpen(false);
    // Notify app-wide listeners (GameTime hooks)
    window.dispatchEvent(
      new CustomEvent("drafteados:tz-change", { detail: { regionId: id } })
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Zona horaria: ${region.label}`}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)]",
          "bg-[var(--color-surface-1)] px-3 text-sm font-semibold text-[var(--color-text-primary)]",
          "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
          "transition-colors duration-150"
        )}
      >
        <span aria-hidden className="text-base leading-none">
          {region.flag}
        </span>
        {!compact ? <span>{region.label}</span> : (
          <span className="text-xs font-bold tracking-wide">{region.shortLabel}</span>
        )}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="opacity-60">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label="Elegir país o región"
            className={cn(
              "absolute right-0 z-50 mt-2 max-h-72 w-56 overflow-auto rounded-[var(--radius-md)]",
              "border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] py-1 shadow-lg"
            )}
          >
            {REGIONS.filter((r) => r.id !== "ET").map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={r.id === regionId}
                  onClick={() => select(r.id)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm",
                    "hover:bg-[var(--color-surface-2)]",
                    r.id === regionId && "bg-[var(--color-brand-soft)] font-semibold"
                  )}
                >
                  <span className="text-base">{r.flag}</span>
                  <span className="text-[var(--color-text-primary)]">{r.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
