// filepath: src/components/pickem/PredictionCard.tsx
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Flame, User, Plus, ChevronRight, Users } from 'lucide-react';
import { getPlayerHeadshotUrl, getTeamLogoUrl, getTeamNbaId } from '@/lib/basketball/nbaIds';
import { getCommunityPercentage } from '@/lib/pickem/community';

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
    position?: string;
    jersey_number?: string;
  } | null;
  selectedTeam?: {
    id: string;
    name: string;
    abbreviation: string;
    nba_team_id: number;
    primary_color: string;
    conference?: 'East' | 'West';
  } | null;
  isLocked?: boolean;
  isUnderdog?: boolean;
  onSelect?: () => void;
  href?: string;
}

function getCategoryTheme(category: string) {
  const c = (category || '').toUpperCase();
  if (c.includes('ESTAD') || c.includes('STATS') || c.includes('LÍDER')) {
    return {
      badge: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30',
      accent: '#3B82F6',
    };
  }
  if (c.includes('PREMIO') || c.includes('AWARD') || c.includes('GALARD')) {
    return {
      badge: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
      accent: '#F59E0B',
    };
  }
  if (c.includes('EQUIPO') || c.includes('TEAM') || c.includes('FRANQUICIA')) {
    return {
      badge: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30',
      accent: '#10B981',
    };
  }
  return {
    badge: 'text-[#FF5A1F] bg-[#FF5A1F]/10 border-[#FF5A1F]/30',
    accent: '#FF5A1F',
  };
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
  const categoryTheme = getCategoryTheme(prediction.category);

  // Team accent color
  const accentColor = selectedPlayer?.team_primary_color || selectedTeam?.primary_color || '#FF5A1F';

  // Team ID for watermark background
  const watermarkTeamId = selectedTeam?.nba_team_id || (selectedPlayer?.team_abbreviation ? getTeamNbaId(selectedPlayer.team_abbreviation) : null);

  // Consensus percentage revealed ONLY after pick
  const identifier = selectedPlayer?.name || selectedTeam?.abbreviation || '';
  const consensus = hasSelection ? getCommunityPercentage(prediction.slug, identifier) : null;

  const CardContent = (
    <div
      onClick={!isLocked && onSelect ? onSelect : undefined}
      className={cn(
        'relative w-full rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 select-none cursor-pointer group overflow-hidden',
        'bg-white dark:bg-[#141416] border',
        hasSelection
          ? 'border-black/15 dark:border-white/15 shadow-lg dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)]'
          : 'border-black/10 dark:border-white/10 hover:border-[#FF5A1F] dark:hover:border-[#FF5A1F]',
        isLocked && 'opacity-90 cursor-default',
        'min-h-[210px] sm:min-h-[250px] md:min-h-[360px] lg:min-h-[380px]',
        'hover:-translate-y-1 hover:shadow-xl'
      )}
      style={{
        boxShadow: hasSelection
          ? `0 14px 35px -8px ${accentColor}25`
          : undefined,
      }}
    >
      {/* Accent top line if selected */}
      {hasSelection && (
        <div
          className="absolute top-0 left-4 right-4 md:left-6 md:right-6 h-[2px] md:h-[3px] rounded-full transition-all"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}80`,
          }}
        />
      )}

      {/* Marca de agua sutil del equipo en el fondo (Solo en PC) */}
      {hasSelection && watermarkTeamId && (
        <div
          className="hidden md:block absolute -right-8 -bottom-8 w-56 h-56 lg:w-64 lg:h-64 pointer-events-none select-none opacity-[0.05] dark:opacity-[0.07] filter grayscale contrast-150 rotate-[-12deg] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
          aria-hidden="true"
        >
          <img
            src={getTeamLogoUrl(watermarkTeamId)}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Ambient background glow if selected (PC) */}
      {hasSelection && (
        <div
          className="hidden md:block absolute inset-0 pointer-events-none opacity-35 dark:opacity-40 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background: `radial-gradient(ellipse at 85% 20%, ${accentColor}20 0%, transparent 65%)`,
          }}
        />
      )}

      {/* ============================================================ */}
      {/* MOBILE LAYOUT (< md) - Mantener intacto y compacto            */}
      {/* ============================================================ */}
      <div className="flex md:hidden flex-col justify-between flex-1 relative z-10">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#FF5A1F] uppercase">
              {prediction.category} &bull; #{seriesNumClean}
            </span>
            <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-300 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">
              {prediction.points} PTS
            </span>
          </div>

          <h3
            className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white uppercase tracking-tight leading-tight group-hover:text-[#FF5A1F] transition-colors"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {prediction.name}
          </h3>
        </div>

        <div className="my-3 flex-1 flex items-center">
          {hasSelection ? (
            <div className="w-full flex items-center justify-between gap-3 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl p-3 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3 min-w-0">
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
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {isUnderdog && (
                      <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider inline-block">
                        SORPRESA &times;1.5
                      </span>
                    )}
                    {consensus !== null && (
                      <span className="text-[9px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                        {consensus}% de los Buques
                      </span>
                    )}
                  </div>
                </div>
              </div>

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
      </div>

      {/* ============================================================ */}
      {/* DESKTOP LAYOUT (>= md) - Mayor tamaño, impacto y calidad     */}
      {/* ============================================================ */}
      <div className="hidden md:flex flex-col justify-between flex-1 relative z-10">
        {/* Header PC */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-2.5">
            {/* Category Pill */}
            <div
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border',
                categoryTheme.badge
              )}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: categoryTheme.accent }}
              />
              <span>
                {prediction.category} &bull; #{seriesNumClean}
              </span>
            </div>

            {/* Points & Underdog bonus */}
            <div className="flex items-center gap-1.5">
              {isUnderdog && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm animate-pulse">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>&times;1.5</span>
                </div>
              )}
              <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-200 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 shadow-sm">
                {prediction.points} PTS
              </span>
            </div>
          </div>

          {/* Title PC */}
          <h3
            className="text-2xl lg:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight leading-tight group-hover:text-[#FF5A1F] transition-colors"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {prediction.name}
          </h3>
          {prediction.description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
              {prediction.description}
            </p>
          )}
        </div>

        {/* Center / Showcase PC */}
        <div className="my-4 flex-1 flex flex-col justify-center">
          {hasSelection ? (
            <div className="relative rounded-2xl p-4 lg:p-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 overflow-hidden shadow-inner flex flex-col justify-between min-h-[210px] lg:min-h-[230px]">
              {/* Radial backlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background: `radial-gradient(circle at 80% 50%, ${accentColor}25 0%, transparent 70%)`,
                }}
              />

              {/* Main row: Information on left, Large visual on right */}
              <div className="relative z-10 flex items-center justify-between gap-4">
                {/* Details */}
                <div className="min-w-0 flex-1 space-y-2">
                  {/* Team badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span>{selectedPlayer?.team_abbreviation || selectedTeam?.abbreviation || 'NBA'}</span>
                    {selectedTeam?.conference && (
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">
                        · {selectedTeam.conference === 'East' ? 'ESTE' : 'OESTE'}
                      </span>
                    )}
                    {selectedPlayer?.position && (
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">
                        · {selectedPlayer.position}
                      </span>
                    )}
                  </div>

                  {/* Name (Full display, no truncation) */}
                  <div
                    className="text-2xl lg:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight leading-[1.05]"
                    style={{ fontFamily: 'var(--font-title)' }}
                  >
                    {selectedPlayer?.name || selectedTeam?.name}
                  </div>

                  {/* Underdog multiplier indicator & Community consensus */}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {isUnderdog && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        SORPRESA &times;1.5 ACTIVADA
                      </span>
                    )}
                    {consensus !== null && (
                      <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/5 dark:border-white/10">
                        El <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{consensus}%</strong> de los Buques también eligió este pick
                      </div>
                    )}
                  </div>
                </div>

                {/* Hero Showcase Graphic: Cutout for Player, High-Res SVG for Team */}
                <div className="relative shrink-0 flex items-center justify-center">
                  {selectedPlayer?.nba_id ? (
                    <div className="relative w-32 h-36 lg:w-36 lg:h-40 flex items-end justify-center">
                      <div
                        className="absolute inset-x-2 bottom-0 h-24 rounded-2xl opacity-25 filter blur-lg transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: accentColor }}
                      />
                      <img
                        src={getPlayerHeadshotUrl(selectedPlayer.nba_id, '1040x760')}
                        alt={selectedPlayer.name}
                        className="relative z-10 w-auto h-full max-h-40 object-contain object-bottom filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : selectedTeam?.nba_team_id ? (
                    <div className="relative w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full opacity-25 filter blur-xl transition-all duration-300 group-hover:opacity-45 group-hover:scale-125"
                        style={{ backgroundColor: accentColor }}
                      />
                      <img
                        src={getTeamLogoUrl(selectedTeam.nba_team_id)}
                        alt={selectedTeam.name}
                        className="relative z-10 w-24 h-24 lg:w-28 lg:h-28 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                      <User className="w-10 h-10 text-zinc-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom bar inside card: Cambiar action */}
              <div className="relative z-10 mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  SELECCIÓN OFICIAL
                </span>
                {!isLocked && onSelect && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect();
                    }}
                    className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-[#FF5A1F] hover:text-white hover:border-[#FF5A1F] text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span>Cambiar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty State PC: Gran slot interactivo con estética basketball */
            <div className="relative w-full min-h-[210px] lg:min-h-[230px] rounded-2xl border-2 border-dashed border-black/15 dark:border-white/15 group-hover:border-[#FF5A1F] bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-[#FF5A1F]/[0.04] transition-all duration-300 p-6 flex flex-col items-center justify-center text-center gap-3 overflow-hidden">
              {/* Basketball court watermark */}
              <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 flex items-center justify-center">
                <svg className="w-48 h-48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M 50 10 L 50 90" />
                  <path d="M 10 50 Q 50 50 90 50" />
                  <path d="M 22 22 Q 50 50 22 78" />
                  <path d="M 78 22 Q 50 50 78 78" />
                </svg>
              </div>

              {/* Plus icon */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 group-hover:bg-[#FF5A1F] group-hover:text-white text-zinc-400 dark:text-zinc-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* CTA Text */}
              <div className="relative z-10 space-y-1">
                <div
                  className="text-lg lg:text-xl font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 group-hover:text-[#FF5A1F] transition-colors"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  + ELEGIR CANDIDATO
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  Hacé click para abrir el listado oficial
                </div>
              </div>

              <span className="relative z-10 text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2.5 py-0.5 rounded-full">
                PENDIENTE
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Sello de Bloqueo si está sellado */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-2xl md:rounded-3xl flex items-center justify-center z-30 pointer-events-none">
          <span
            className="text-2xl sm:text-4xl font-black text-red-500 border-4 border-red-500/80 px-6 py-2 rounded-xl uppercase rotate-[-8deg] shadow-[0_0_30px_rgba(239,68,68,0.4)] tracking-wider"
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
