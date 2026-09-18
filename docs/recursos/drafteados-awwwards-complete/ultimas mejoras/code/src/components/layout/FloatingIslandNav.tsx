"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface NavItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface FloatingIslandNavProps {
  items: NavItem[];
  liveCount?: number;
  logoHref?: string;
  logo?: React.ReactNode;
  cta?: React.ReactNode;
  className?: string;
}

/**
 * Floating glass nav — Awwwards-oriented shell.
 * Fixed top center. Wire logo as SVG/img via `logo` prop.
 */
export function FloatingIslandNav({
  items,
  liveCount = 0,
  logoHref = "/",
  logo,
  cta,
  className,
}: FloatingIslandNavProps) {
  return (
    <nav
      aria-label="Principal"
      className={cn(
        "fixed left-1/2 top-6 z-50 flex h-14 -translate-x-1/2 items-center gap-5",
        "rounded-full border border-[var(--color-border-subtle)] px-3 pl-4",
        "bg-[color-mix(in_srgb,var(--color-surface-1)_82%,transparent)]",
        "shadow-[0_20px_40px_rgba(0,0,0,0.35)]",
        "backdrop-blur-[20px] backdrop-saturate-150",
        "max-w-[calc(100vw-2rem)]",
        className
      )}
    >
      <Link
        href={logoHref}
        className="flex shrink-0 items-center gap-2 text-[var(--color-text-primary)]"
      >
        {logo ?? (
          <span className="font-display text-lg tracking-wide text-[var(--color-brand-primary)]">
            D
          </span>
        )}
      </Link>

      <span
        className="hidden h-5 w-px bg-[var(--color-border-subtle)] sm:block"
        aria-hidden
      />

      <ul className="hidden items-center gap-1 md:flex">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                item.active
                  ? "bg-[var(--color-brand-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {liveCount > 0 ? (
        <Badge type="live" className="hidden sm:inline-flex">
          {liveCount} en vivo
        </Badge>
      ) : null}

      <div className="ml-auto flex items-center gap-2">
        {cta ?? (
          <Button variant="primary" size="sm" asChild={false}>
            Pick&apos;em
          </Button>
        )}
      </div>
    </nav>
  );
}
