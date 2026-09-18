// filepath: src/components/nba/CountdownClock.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import { GameTime } from "@/components/time/GameTime";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Opening Night 2026/27: Martes 20 de Octubre 2026, 19:30 ET / 23:30 UTC
const OPENING_NIGHT_ISO = "2026-10-20T23:30:00Z";

export function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 34,
    hours: 8,
    minutes: 42,
    seconds: 15,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const target = new Date(OPENING_NIGHT_ISO).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isExpired) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
        <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
          ¡TEMPORADA REGULAR 2026/27 EN JUEGO!
        </span>
      </div>
    );
  }

  const units = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <div className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-8 shadow-[var(--hub-shadow)] relative overflow-hidden transition-colors">
      {/* Subtle Glow Background */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--hub-accent)]/10 blur-3xl pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Column: Context */}
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-widest text-[var(--hub-accent)] uppercase bg-[var(--hub-accent-soft)] border border-[var(--hub-accent)]/25">
              <Clock className="w-3.5 h-3.5" />
              <span>OPENING NIGHT · 20 OCTUBRE 2026</span>
            </div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--hub-surface-2)] border border-[var(--hub-border)]">
              <GameTime iso={OPENING_NIGHT_ISO} size="sm" showEt={true} />
            </div>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[var(--hub-text)] tracking-tight leading-none"
            style={{ fontFamily: "var(--hub-font-display)" }}
          >
            Cuenta regresiva · Temporada 2026/27
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[var(--hub-text-secondary)] font-normal leading-relaxed">
            La temporada regular arranca oficialmente el 20 de octubre con los vigentes campeones New York Knicks defendiendo su corona.
          </p>
        </div>

        {/* Right Column: Clock Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 shrink-0">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] min-w-[64px] sm:min-w-[80px]"
            >
              <span
                className="text-2xl sm:text-4xl font-black text-[var(--hub-text)] tabular-nums leading-none font-mono"
              >
                {mounted ? String(unit.value).padStart(2, "0") : "--"}
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold text-[var(--hub-text-muted)] uppercase tracking-wider mt-1.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
