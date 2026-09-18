import * as React from "react";
import { cn } from "@/lib/cn";

export interface PageHeaderProps {
  /** Small context line e.g. "NBA HUB · LOS BUQUES · TEMPORADA 2026/27" */
  eyebrow?: string;
  title: string;
  /** One line max. Information, not slogan. */
  description?: string;
  /** Right-side actions (filters, CTAs) */
  actions?: React.ReactNode;
  className?: string;
  /** Use display font (Bebas) for title — Hub page titles */
  displayTitle?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
  displayTitle = true,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        "mb-8 md:mb-10",
        className
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "text-[var(--color-text-primary)]",
            displayTitle
              ? "font-display text-4xl md:text-5xl leading-[0.95] tracking-wide"
              : "font-sans text-3xl md:text-4xl font-bold tracking-tight"
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
