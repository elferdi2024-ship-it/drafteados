"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

/**
 * Modern luxury theme toggle pill designed for Drafteados Awwwards standards.
 * Clean, compact, zero layout-shift, no text spill.
 */
export function ThemeToggle({ className, size = "sm" }: ThemeToggleProps) {
  const { theme, toggleTheme, isMounted } = useTheme();

  const isDark = isMounted ? theme === "dark" : false;
  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "group relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer overflow-hidden select-none shrink-0",
        "border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]",
        size === "sm" ? "w-8 h-8 sm:w-9 sm:h-9" : "w-10 h-10",
        isDark
          ? "bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-700 hover:border-[#FF5A1F]/60 text-amber-400 backdrop-blur-md shadow-sm"
          : "bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 hover:border-[#FF5A1F]/60 text-zinc-800 backdrop-blur-md shadow-sm",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Sun Icon (shown when dark to switch to light) */}
        <Sun
          className={cn(
            "w-4 h-4 text-amber-400 transition-all duration-300 transform absolute",
            isDark
              ? "rotate-0 scale-100 opacity-100 group-hover:rotate-45"
              : "rotate-90 scale-0 opacity-0 pointer-events-none"
          )}
          aria-hidden="true"
        />

        {/* Moon Icon (shown when light to switch to dark) */}
        <Moon
          className={cn(
            "w-4 h-4 text-zinc-700 transition-all duration-300 transform absolute",
            isDark
              ? "-rotate-90 scale-0 opacity-0 pointer-events-none"
              : "rotate-0 scale-100 opacity-100 group-hover:-rotate-12"
          )}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
