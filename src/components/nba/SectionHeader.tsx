// filepath: src/components/nba/SectionHeader.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  actionHref,
  actionLabel,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 ${className}`}>
      <div>
        {eyebrow && (
          <span className="text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase block mb-1">
            {eyebrow}
          </span>
        )}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] mt-1 max-w-xl font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] transition-colors uppercase tracking-wider shrink-0"
        >
          <span>{actionLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
