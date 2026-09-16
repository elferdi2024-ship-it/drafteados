// filepath: src/components/pickem/CountdownLockBanner.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Lock, Clock, AlertTriangle } from "lucide-react";

interface CountdownLockBannerProps {
  targetDate?: string | Date;
  compact?: boolean;
  className?: string;
}

interface TimeLeft {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLocked: boolean;
}

// Fecha predeterminada de apertura NBA 2026/27 para el cierre oficial de picks
const DEFAULT_LOCK_DATE = "2026-10-22T23:59:59Z";

function calculateTimeLeft(target: string | Date): TimeLeft {
  const targetTime = new Date(target).getTime();
  const now = new Date().getTime();
  const totalMs = targetTime - now;

  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLocked: true,
    };
  }

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isLocked: false,
  };
}

export function CountdownLockBanner({
  targetDate = DEFAULT_LOCK_DATE,
  compact = false,
  className = "",
}: CountdownLockBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const { totalMs, days, hours, minutes, seconds, isLocked } = timeLeft;
  const isLast24Hours = totalMs > 0 && totalMs < 24 * 60 * 60 * 1000;
  const isLast7Days = totalMs > 0 && totalMs < 7 * 24 * 60 * 60 * 1000;

  // Estado 1: LOCK ACTIVO (Tiempo agotado)
  if (isLocked) {
    return (
      <div
        className={`w-full bg-red-500/10 dark:bg-red-950/40 border border-red-500/30 rounded-2xl p-3 sm:p-4 text-center shadow-lg ${className}`}
      >
        <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-mono text-xs font-bold uppercase tracking-widest">
          <Lock className="w-4 h-4 text-red-500" />
          <span>LOCK ACTIVO &bull; NO SE PUEDEN MODIFICAR PICKS</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          La temporada regular ya comenzó. Las 13 predicciones están selladas para el ranking oficial.
        </p>
      </div>
    );
  }

  // Versión Compacta (para cabecera o barra fija de picks)
  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border text-xs font-mono transition-all duration-300 shadow-sm ${
          isLast24Hours
            ? "bg-[#FF5A1F]/15 border-[#FF5A1F] text-zinc-950 dark:text-white shadow-[0_0_20px_rgba(255,90,31,0.35)] animate-pulse"
            : isLast7Days
            ? "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300"
            : "bg-white dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-300"
        } ${className}`}
      >
        <div className="flex items-center gap-1.5">
          {isLast24Hours ? (
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF5A1F]" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" />
          )}
          <span className="font-bold uppercase tracking-wider text-[11px]">
            {isLast24Hours ? "ÚLTIMAS HORAS:" : "CIERRE DE PICKS:"}
          </span>
        </div>

        <div className="flex items-center gap-1 font-bold text-zinc-950 dark:text-white tracking-wider">
          {days > 0 && <span>{days}d</span>}
          <span>{String(hours).padStart(2, "0")}h</span>
          <span>:</span>
          <span>{String(minutes).padStart(2, "0")}m</span>
          <span>:</span>
          <span className="text-[#FF5A1F]">{String(seconds).padStart(2, "0")}s</span>
        </div>
      </div>
    );
  }

  // Versión Prominente (para la Landing Page y el Tablero)
  return (
    <div
      className={`w-full rounded-2xl sm:rounded-3xl border p-4 sm:p-6 transition-all duration-300 ${
        isLast24Hours
          ? "bg-[#FF5A1F]/[0.07] dark:bg-gradient-to-b dark:from-[#FF5A1F]/20 dark:via-[#0A0A0A]/90 dark:to-[#0A0A0A] border-[#FF5A1F] shadow-lg shadow-[#FF5A1F]/15"
          : isLast7Days
          ? "bg-amber-500/[0.06] dark:bg-gradient-to-b dark:from-amber-500/10 dark:via-[#0A0A0A]/80 dark:to-[#0A0A0A] border-amber-500/40 shadow-sm"
          : "bg-white dark:bg-[#121214] border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Lado izquierdo: Alerta y Mensaje */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              isLast24Hours
                ? "bg-[#FF5A1F]/20 border-[#FF5A1F] text-[#FF5A1F] shadow-[0_0_15px_rgba(255,90,31,0.4)]"
                : isLast7Days
                ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400"
                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#FF5A1F]"
            }`}
          >
            {isLast24Hours ? (
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            ) : (
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5A1F]" />
            )}
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span
                className={`text-[10px] sm:text-xs font-mono font-black tracking-[0.2em] uppercase ${
                  isLast24Hours
                    ? "text-[#FF5A1F] animate-pulse"
                    : isLast7Days
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-[#FF5A1F]"
                }`}
              >
                {isLast24Hours
                  ? "ÚLTIMAS HORAS PARA BANCÁRTELA"
                  : isLast7Days
                  ? "CUENTA REGRESIVA AL LOCK DE LA TEMPORADA"
                  : "TIEMPO RESTANTE PARA MODIFICAR PICKS"}
              </span>
            </div>
            <h4
              className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-0.5"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Cierre Oficial al Tip-Off NBA
            </h4>
          </div>
        </div>

        {/* Lado derecho: Cifras del Countdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Días */}
          <div className="flex flex-col items-center bg-zinc-100 dark:bg-black/70 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-sm">
            <span
              className="font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white leading-none tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              {String(days).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
              DÍAS
            </span>
          </div>

          <span className="text-zinc-400 dark:text-zinc-600 font-bold text-lg -mt-3">:</span>

          {/* Horas */}
          <div className="flex flex-col items-center bg-zinc-100 dark:bg-black/70 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-sm">
            <span
              className="font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white leading-none tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              {String(hours).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
              HORAS
            </span>
          </div>

          <span className="text-zinc-400 dark:text-zinc-600 font-bold text-lg -mt-3">:</span>

          {/* Minutos */}
          <div className="flex flex-col items-center bg-zinc-100 dark:bg-black/70 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-sm">
            <span
              className="font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white leading-none tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              {String(minutes).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
              MIN
            </span>
          </div>

          <span className="text-zinc-400 dark:text-zinc-600 font-bold text-lg -mt-3">:</span>

          {/* Segundos */}
          <div className="flex flex-col items-center bg-[#FF5A1F]/10 dark:bg-black/70 border border-[#FF5A1F]/40 dark:border-[#FF5A1F]/50 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-[0_0_15px_rgba(255,90,31,0.2)]">
            <span
              className="font-black text-2xl sm:text-3xl text-[#FF5A1F] leading-none tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              {String(seconds).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-black tracking-widest text-[#FF5A1F] uppercase mt-0.5">
              SEG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
