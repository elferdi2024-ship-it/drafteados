"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "live";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-primary)] text-white border-transparent hover:bg-[var(--color-brand-hover)] hover:-translate-y-px hover:shadow-[var(--shadow-glow-orange)] active:scale-[0.98] active:bg-[var(--orange-700)]",
  secondary:
    "bg-[var(--color-surface-2)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-3)]",
  outline:
    "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)]",
  ghost:
    "bg-[var(--color-brand-soft)] text-[var(--color-brand-primary)] border-transparent hover:bg-[var(--color-brand-primary)] hover:text-white",
  live:
    "bg-[var(--color-state-live)] text-white border-transparent hover:brightness-110 shadow-[var(--shadow-glow-live)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs font-bold gap-1.5 rounded-[var(--radius-sm)]",
  md: "h-11 px-5 text-sm font-semibold gap-2 rounded-[var(--radius-sm)]",
  lg: "h-[52px] px-7 text-base font-bold gap-2.5 rounded-[var(--radius-md)]",
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
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center font-sans transition-all",
          "duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
          "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
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
      </button>
    );
  }
);

Button.displayName = "Button";
