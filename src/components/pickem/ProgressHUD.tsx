// filepath: src/components/pickem/ProgressHUD.tsx
"use client";

import { Lock, Flame, Sparkles } from 'lucide-react';

interface ProgressHUDProps {
  seasonName: string;
  completedCount: number;
  totalCount: number;
  potentialPoints: number;
  underdogCount: number;
  isLocked: boolean;
  selectedCategoryTab: string;
  onSelectCategoryTab: (tab: string) => void;
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
}: ProgressHUDProps) {
  const percentage = Math.round((completedCount / totalCount) * 100);
  const allCompleted = completedCount === totalCount;

  return (
    <div className="sticky top-16 z-30 bg-[#090909]/95 backdrop-blur-2xl border-b border-white/10 py-3.5 px-4 sm:px-8 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Title & Season */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-title text-2xl sm:text-3xl tracking-tight text-[#F5F5F5] uppercase font-black">
              {isLocked ? 'PREDICCIONES SELLADAS' : 'MIS 13 PREDICCIONES'}
            </h1>
            {isLocked ? (
              <span className="flex items-center gap-1.5 stamp-badge font-title text-xs px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                <Lock className="w-3 h-3" /> SELLADO
              </span>
            ) : (
              <span className="bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 text-[#FF5A1F] font-title text-xs px-3 py-0.5 rounded-full font-bold uppercase tracking-wider">
                TEMPORADA {seasonName}
              </span>
            )}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-0.5 font-medium">
            {isLocked
              ? 'Tus pronósticos están sellados oficialmente. El ranking se actualiza noche a noche con cada resultado.'
              : 'Elegí a tus candidatos. Si te la jugás por elecciones audaces (<15% consenso), sumás el multiplicador Sorpresa x1.5.'}
          </p>
        </div>

        {/* Right: Broadcast Arena Stats Pills */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Potential Points Pill */}
          <div className="bg-[#141414] border border-white/15 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-inner">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF5A1F]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-title text-2xl text-white leading-none flex items-center gap-1 font-black">
                <span>{potentialPoints}</span>
                <span className="text-xs text-[#FF5A1F] font-bold">PTS</span>
              </div>
              <div className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                <span>PUNTOS POTENCIALES</span>
                {underdogCount > 0 && (
                  <span className="badge-underdog text-[9px] px-1.5 py-0.2 rounded font-black text-[#FBBF24]">
                    +{underdogCount} x1.5
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Counter */}
          <div className="flex items-center gap-3 bg-[#141414] border border-white/15 rounded-2xl px-4 py-2 shadow-inner">
            <div className="text-right">
              <div className="font-title text-2xl text-white leading-none font-black">
                <span className="text-[#FF5A1F]">{completedCount}</span>
                <span className="text-[#666666]">/</span>
                <span>{totalCount}</span>
              </div>
              <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold mt-0.5">
                PICKS LISTOS
              </div>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center font-title text-sm font-black shadow-inner">
              <span className={allCompleted ? 'text-[#10B981]' : 'text-[#FF5A1F]'}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 13-Segment Tactical Arena Gauge */}
      <div className="max-w-6xl mx-auto mt-3.5 flex gap-1 sm:gap-1.5 w-full">
        {Array.from({ length: totalCount }).map((_, i) => {
          const isFilled = i < completedCount;
          return (
            <div
              key={i}
              className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                isFilled
                  ? 'bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.6)]'
                  : 'bg-white/10'
              }`}
            />
          );
        })}
      </div>

      {/* Segmented Category Filter Tabs */}
      <div className="max-w-6xl mx-auto mt-3.5 flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { id: 'ALL', label: 'TODAS (13)' },
          { id: 'STATS', label: 'ESTADÍSTICAS (6)' },
          { id: 'AWARDS', label: 'GALARDONES (3)' },
          { id: 'TEAMS', label: 'FRANQUICIAS (3)' },
          { id: 'FINALS', label: 'FINAL NBA (1)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectCategoryTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-title text-xs sm:text-sm tracking-wider uppercase transition-all shrink-0 font-bold border ${
              selectedCategoryTab === tab.id
                ? 'bg-[#FF5A1F] text-white border-[#FF7A35] shadow-[0_0_15px_rgba(255,90,31,0.45)]'
                : 'bg-[#141414] text-[#8B8B8B] hover:text-white hover:bg-[#1e1e1e] border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
