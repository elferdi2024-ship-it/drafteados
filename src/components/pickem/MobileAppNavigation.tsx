"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Trophy, Lock, User } from "lucide-react";

export function MobileAppNavigation() {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Inicio",
      href: "/pickem",
      icon: Home,
      exact: true,
    },
    {
      name: "Picks",
      href: "/pickem/picks",
      icon: Flame,
      badge: "13",
    },
    {
      name: "Ranking",
      href: "/pickem/leaderboard",
      icon: Trophy,
    },
    {
      name: "Sobre",
      href: "/pickem/locked",
      icon: Lock,
    },
  ];

  return (
    <nav 
      aria-label="Navegación Móvil App"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-lg mx-auto"
    >
      <div className="bg-white/90 dark:bg-[#121212]/90 backdrop-blur-2xl border border-black/10 dark:border-white/15 rounded-3xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact 
            ? pathname === tab.href 
            : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`relative flex-1 py-2 flex flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? "text-[#FF5A1F] bg-[#FF5A1F]/10 dark:bg-[#FF5A1F]/15 font-bold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "scale-110" : "scale-100"} transition-transform`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#FF5A1F] text-white text-[9px] font-mono font-black rounded-full px-1 py-0.2 shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider leading-none">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
