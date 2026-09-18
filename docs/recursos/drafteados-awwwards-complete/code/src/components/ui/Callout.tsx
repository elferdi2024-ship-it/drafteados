import * as React from "react";
import { cn } from "@/lib/cn";

export type CalloutVariant = "info" | "warning" | "brand";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CalloutVariant;
  title?: string;
}

const variantClasses: Record<CalloutVariant, string> = {
  info: "border-l-[var(--color-conf-east)] bg-[color-mix(in_srgb,var(--color-conf-east)_8%,transparent)]",
  warning:
    "border-l-[var(--color-brand-primary)] bg-[var(--color-brand-soft)]",
  brand:
    "border-l-[var(--color-brand-primary)] bg-[var(--color-brand-soft)]",
};

export function Callout({
  className,
  variant = "warning",
  title,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] border-l-4 px-4 py-3",
        "text-sm text-[var(--color-text-secondary)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {title ? (
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          {title}
        </p>
      ) : null}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
