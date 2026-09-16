// filepath: src/components/pickem/PredictionCard.tsx
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Flame, Sparkles, User } from 'lucide-react';
import { getPlayerHeadshotUrl, getTeamLogoUrl } from '@/lib/basketball/nbaIds';

export interface PredictionCardProps {
  prediction: {
    id: number | string;
    slug: string;
    name: string;
    category: string;
    points: number;
    seriesNumber: string;
    description?: string;
  };
  selectedPlayer?: {
    id: string;
    name: string;
    nba_id: number | null;
    team_abbreviation: string;
    team_primary_color: string;
  } | null;
  selectedTeam?: {
    id: string;
    name: string;
    abbreviation: string;
    nba_team_id: number;
    primary_color: string;
  } | null;
  isLocked?: boolean;
  isUnderdog?: boolean;
  onSelect?: () => void;
  href?: string;
}

export function PredictionCard({
  prediction,
  selectedPlayer,
  selectedTeam,
  isLocked = false,
  isUnderdog = false,
  onSelect,
  href,
}: PredictionCardProps) {
  const hasSelection = Boolean(selectedPlayer || selectedTeam);
  const seriesNumClean = prediction.seriesNumber.replace('#', '');

  // Team accent color
  const accentColor = selectedPlayer?.team_primary_color || selectedTeam?.primary_color || '#FF5A1F';

  const CardContent = (
    <div
      onClick={!isLocked && onSelect ? onSelect : undefined}
      className={cn(
        'relative w-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 select-none cursor-pointer group',
        'bg-white dark:bg-[#141416] border',
        hasSelection
          ? 'border-black/20 dark:border-white/20 shadow-md'
          : 'border-black/10 dark:border-white/10 hover:border-[#FF5A1F] dark:hover:border-[#FF5A1F]',
        isLocked && 'opacity-90 cursor-default',
        'min-h-[210px] sm:min-h-[250px]'
      )}
      style={{
        boxShadow: hasSelection
          ? `0 8px 25px -6px ${accentColor}30`
          : undefined,
      }}
    >
      {/* Accent top line if selected */}
      {hasSelection && (
        <div
          className="absolute top-0 left-4 right-4 h-[2px] rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}

      {/* 1. HEADER: TÍTULO DEL PICK PRIMERO Y DESTACADO (EJ: MÁXIMO ANOTADOR) */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#FF5A1F] uppercase">
            {prediction.category} &bull; #{seriesNumClean}
          </span>
          <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-300 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">
            {prediction.points} PTS
          </span>
        </div>

        {/* Nombre del galardón bien grande y arriba */}
        <h3
          className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white uppercase tracking-tight leading-tight group-hover:text-[#FF5A1F] transition-colors"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {prediction.name}
        </h3>
      </div>

      {/* 2. CONTENIDO CENTRAL: SELECCIONADO O VACÍO */}
      <div className="relative z-10 my-3 flex-1 flex items-center">
        {hasSelection ? (
          <div className="w-full flex items-center justify-between gap-3 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl p-3 border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              {/* Thumbnail jugador o franquicia */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-black/10 dark:border-white/10">
                {selectedPlayer?.nba_id ? (
                  <img
                    src={getPlayerHeadshotUrl(selectedPlayer.nba_id)}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : selectedTeam?.nba_team_id ? (
                  <img
                    src={getTeamLogoUrl(selectedTeam.nba_team_id)}
                    alt={selectedTeam.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <User className="w-6 h-6 text-zinc-400" />
                )}
              </div>

              {/* Datos del seleccionado */}
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold text-[#FF5A1F] uppercase tracking-wider block">
                  {selectedPlayer?.team_abbreviation || selectedTeam?.abbreviation || 'NBA'}
                </span>
                <div
                  className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white uppercase tracking-tight truncate leading-none mt-0.5"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  {selectedPlayer?.name || selectedTeam?.name}
                </div>
                {isUnderdog && (
                  <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mt-1 inline-block">
                    SORPRESA &times;1.5
                  </span>
                )}
              </div>
            </div>

            {/* Botón cambiar */}
            {!isLocked && onSelect && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
                className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-[#FF5A1F] hover:text-white hover:border-[#FF5A1F] text-zinc-800 dark:text-zinc-200 transition-colors shrink-0 cursor-pointer"
              >
                Cambiar
              </button>
            )}
          </div>
        ) : (
          /* Estado sin seleccionar: botón claro y visible */
          <div className="w-full py-4 px-3 rounded-xl border border-dashed border-black/20 dark:border-white/20 hover:border-[#FF5A1F] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-[#FF5A1F]/5 transition-colors flex items-center justify-between gap-2">
            <span
              className="text-sm sm:text-base font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider group-hover:text-[#FF5A1F] transition-colors"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              + TOCAR PARA ELEGIR
            </span>
            <span className="text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              PENDIENTE
            </span>
          </div>
        )}
      </div>

      {/* Sello de Bloqueo si está sellado */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-30 pointer-events-none">
          <span
            className="text-2xl sm:text-3xl font-black text-white border-2 border-white px-4 py-1 rounded-lg uppercase rotate-[-6deg]"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            SELLADO
          </span>
        </div>
      )}
    </div>
  );

  if (href && !onSelect) {
    return (
      <Link href={href} className="block w-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
