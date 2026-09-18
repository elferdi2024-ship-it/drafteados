// filepath: src/components/pickem/ProgressHUD.tsx
"use client";

import { Lock, Flame, CheckCircle2 } from 'lucide-react';

interface ProgressHUDProps {
  seasonName: string;
  completedCount: number;
  totalCount: number;
  potentialPoints: number;
  underdogCount: number;
  isLocked: boolean;
  selectedCategoryTab: string;
  onSelectCategoryTab: (tab: string) => void;
  onOpenLockModal?: () => void;
}

export function ProgressHUD({
  seasonName,
  completedCount,
  totalCount,
  potentialPoints,
  underdogCount,
  isLocked,
  selectedCategoryTab,
  onSelectCategoryTab,
  onOpenLockModal,
}: ProgressHUDProps) {
  const percentage = Math.round((completedCount / totalCount) * 100);
  const allCompleted = completedCount === totalCount;
  const missingCount = Math.max(0, totalCount - completedCount);

  return (
    <div className="relative z-10 bg-background border-b border-black/10 dark:border-white/10 py-6 px-4 sm:px-8 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Title & Kicker */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase mb-1">
            {isLocked ? (
              <>
                <span className="text-[#FF5A1F]">TEMPORADA {seasonName}</span>
                <span className="text-zinc-400">&bull;</span>
                <span className="text-emerald-500 font-black">SELLADO OFICIAL</span>
              </>
            ) : allCompleted ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-black bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ¡13/13 LISTO PARA SELLAR TU BOLETA!
              </span>
            ) : (
              <span className="text-[#FF5A1F]">
                FALTAN {missingCount} {missingCount === 1 ? 'PICK' : 'PICKS'} PARA COMPLETAR TU BOLETA
              </span>
            )}
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white uppercase leading-none"
            style={{ fontFamily: "var(--font-title)" }}
          >
            {isLocked ? "PREDICCIONES SELLADAS" : allCompleted ? "¡BOLETA COMPLETA!" : "MIS 13 PREDICCIONES"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-normal max-w-xl">
            {isLocked
              ? "Tus pronósticos están sellados oficialmente. El ranking se actualiza noche a noche con cada resultado."
              : allCompleted
              ? "Tus 13 predicciones están listas. Hacé click en 'Sellar Picks' para asegurar tu puesto en el ranking oficial de los Buques."
              : "Elegí a tus candidatos. Si te la jugás por elecciones audaces (<15% consenso), sumás el multiplicador Sorpresa x1.5."}
          </p>
        </div>

        {/* Right: Clean Stats & Sellar CTA */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Potential Points */}
          <div className="bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3 shadow-sm flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-3xl font-black text-zinc-950 dark:text-white leading-none"
                style={{ fontFamily: "var(--font-title)" }}
              >
                {potentialPoints}
              </span>
              <span className="text-xs text-[#FF5A1F] font-bold font-mono">PTS</span>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-bold uppercase tracking-wider mt-1">
              POTENCIALES {underdogCount > 0 && `(+${underdogCount} x1.5)`}
            </span>
          </div>

          {/* Progress Counter or Direct Sellar trigger */}
          {allCompleted && !isLocked && onOpenLockModal ? (
            <button
              onClick={onOpenLockModal}
              className="bg-[#FF5A1F] hover:bg-[#FF6B35] text-white px-5 py-3 rounded-2xl shadow-lg shadow-[#FF5A1F]/30 flex items-center gap-2.5 font-title text-xl tracking-wider cursor-pointer active:scale-95 transition-all duration-200 animate-pulse shrink-0"
            >
              <Lock className="w-5 h-5" />
              <span>SELLAR</span>
            </button>
          ) : (
            <div className="bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-3.5">
              <div className="flex flex-col text-right">
                <div
                  className="text-3xl font-black text-zinc-950 dark:text-white leading-none"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  <span className="text-[#FF5A1F]">{completedCount}</span>
                  <span className="text-zinc-400 font-normal">/</span>
                  <span>{totalCount}</span>
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-bold uppercase tracking-wider mt-1">
                  PICKS LISTOS
                </span>
              </div>

              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-black ${
                  allCompleted
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#FF5A1F]"
                }`}
                style={{ fontFamily: "var(--font-title)" }}
              >
                {percentage}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 13-Segment Progress Bar */}
      <div className="max-w-6xl mx-auto mt-4 flex gap-1.5 w-full">
        {Array.from({ length: totalCount }).map((_, i) => {
          const isFilled = i < completedCount;
          return (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-sm transition-all duration-300 ${
                isFilled
                  ? "bg-[#FF5A1F]"
                  : "bg-black/10 dark:bg-white/10"
              }`}
            />
          );
        })}
      </div>

      {/* Segmented Category Filter Tabs */}
      <div className="max-w-6xl mx-auto mt-4 flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { id: "ALL", label: "TODAS (13)" },
          { id: "STATS", label: "ESTADÍSTICAS (6)" },
          { id: "AWARDS", label: "GALARDONES (3)" },
          { id: "TEAMS", label: "FRANQUICIAS (3)" },
          { id: "FINALS", label: "FINAL NBA (1)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectCategoryTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all shrink-0 font-bold border cursor-pointer ${
              selectedCategoryTab === tab.id
                ? "bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm"
                : "bg-white dark:bg-[#121212] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border-black/10 dark:border-white/10"
            }`}
            style={{ fontFamily: "var(--font-title)" }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
