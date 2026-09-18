// filepath: src/components/ui/Button.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "live";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-primary)] text-white border border-transparent hover:bg-[var(--color-brand-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-orange)] active:scale-[0.98] active:bg-[var(--orange-700)] shadow-sm",
  secondary:
    "bg-[var(--color-surface-2)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-3)] active:scale-[0.98] shadow-xs",
  outline:
    "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--color-brand-primary)] border border-transparent hover:bg-[var(--color-brand-soft)] active:scale-[0.98]",
  live:
    "bg-[var(--color-state-live)] text-white border border-transparent hover:brightness-110 shadow-[var(--shadow-glow-live)] active:scale-[0.98]",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs font-bold gap-1.5 rounded-[var(--radius-sm)]",
  md: "h-11 min-h-[44px] px-5 text-sm font-semibold gap-2 rounded-[var(--radius-sm)]",
  lg: "h-[52px] min-h-[48px] px-7 text-base font-bold gap-2.5 rounded-[var(--radius-md)]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      type = "button",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseClasses = cn(
      "inline-flex items-center justify-center font-sans select-none cursor-pointer transition-all",
      "duration-[var(--duration-normal)] ease-[var(--ease-out)]",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
      "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
      buttonVariantClasses[variant],
      buttonSizeClasses[size],
      className
    );

    const innerContent = (
      <>
        {loading ? (
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            aria-hidden
          />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </>
    );

    if (href) {
      const isExternal = href.startsWith("http") || target === "_blank";
      if (isExternal) {
        return (
          <a
            href={href}
            target={target ?? "_blank"}
            rel={rel ?? "noopener noreferrer"}
            className={baseClasses}
          >
            {innerContent}
          </a>
        );
      }
      return (
        <Link href={href} className={baseClasses}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={baseClasses}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = "Button";
