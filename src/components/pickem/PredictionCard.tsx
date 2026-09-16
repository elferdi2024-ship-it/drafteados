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

  // Split name for trading card typography (e.g. "Luka" and "Dončić")
  const nameParts = selectedPlayer?.name ? selectedPlayer.name.split(' ') : [];
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : selectedPlayer?.name || '';

  const CardContent = (
    <div
      className={cn(
        'relative aspect-[2/3] w-full rounded-2xl overflow-hidden cursor-pointer group select-none flex flex-col justify-between',
        'bg-[#080808] border',
        'transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,1)]',
        hasSelection 
          ? 'border-white/25 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.95)]' 
          : 'border-white/10 hover:border-[#FF5A1F]/70',
        isLocked && 'opacity-90 cursor-default hover:translate-y-0'
      )}
      style={{
        boxShadow: hasSelection
          ? `0 14px 40px -10px ${accentColor}35, inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.8)`
          : undefined,
      }}
      onClick={!isLocked && onSelect ? onSelect : undefined}
    >
      {/* Bisel metálico superior con color de franquicia / acento */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] z-30 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Marca de agua de fondo: Gran número de serie atlético */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-title text-[9.5rem] sm:text-[12rem] font-black text-white/[0.025] leading-none select-none tracking-tighter">
          {seriesNumClean}
        </span>
      </div>

      {/* HEADER DEL CROMO: Placa oficial de categoría y placa de puntos */}
      <div className="relative z-20 flex items-center justify-between p-3.5 sm:p-4 pb-0">
        <div className="flex items-center gap-2">
          {/* Placa oficial con acabado metálico */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border shadow-inner text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.18em]"
            style={{
              backgroundColor: '#141414',
              borderColor: hasSelection ? `${accentColor}60` : 'rgba(255,255,255,0.16)',
              color: '#F5F5F5',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 5px rgba(0,0,0,0.8)',
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]" 
              style={{ backgroundColor: accentColor, color: accentColor }} 
            />
            <span>{prediction.category}</span>
          </div>

          <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase font-bold">
            #{seriesNumClean}
          </span>
        </div>

        {/* Placa de puntuación */}
        <div className="flex items-center gap-1.5 bg-[#121212]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_3px_8px_rgba(0,0,0,0.6)]">
          <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
          <span className="font-title text-base font-black text-white tracking-wider leading-none">
            {prediction.points}
          </span>
          <span className="text-[9px] font-black text-[#A1A1AA] uppercase leading-none">
            PTS
          </span>
        </div>
      </div>

      {/* ZONA CENTRAL: HERO CUTOUT DEL JUGADOR O LOGO OFICIAL */}
      <div className="relative z-10 flex-1 w-full flex flex-col justify-end overflow-hidden px-2 pt-1">
        {hasSelection ? (
          <>
            {selectedPlayer ? (
              /* Hero Portrait del Jugador */
              <div className="relative w-full h-full flex items-end justify-center">
                {/* Resplandor atmosférico de franquicia en el fondo */}
                <div 
                  className="absolute bottom-4 inset-x-6 h-48 rounded-full blur-3xl pointer-events-none opacity-45 transition-opacity group-hover:opacity-70"
                  style={{ backgroundColor: accentColor }}
                />

                {/* Sigla gigante de franquicia de fondo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span 
                    className="font-title text-8xl sm:text-9xl font-black tracking-tighter"
                    style={{ color: `${accentColor}12` }}
                  >
                    {selectedPlayer.team_abbreviation}
                  </span>
                </div>

                {/* Foto Oficial NBA de alta resolución (1040x760) */}
                {selectedPlayer.nba_id ? (
                  <img
                    src={getPlayerHeadshotUrl(selectedPlayer.nba_id)}
                    alt={selectedPlayer.name}
                    className="relative z-10 w-auto h-full max-h-[250px] sm:max-h-[285px] object-contain object-bottom drop-shadow-[0_16px_28px_rgba(0,0,0,0.95)] filter contrast-[1.05] brightness-[1.02] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="relative z-10 w-24 h-24 rounded-2xl bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center text-white shadow-xl">
                            <span class="font-title text-3xl font-bold">${selectedPlayer.team_abbreviation}</span>
                            <span class="text-[9px] text-[#A1A1AA] uppercase mt-1">OFICIAL NBA</span>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div 
                    className="relative z-10 w-24 h-24 mb-6 rounded-2xl flex flex-col items-center justify-center border shadow-2xl"
                    style={{
                      backgroundColor: `${accentColor}25`,
                      borderColor: `${accentColor}70`,
                    }}
                  >
                    <User className="w-12 h-12 text-white/80" />
                    <span className="font-title text-base font-bold text-white mt-1">
                      {selectedPlayer.team_abbreviation}
                    </span>
                  </div>
                )}

                {/* Fundido inferior de camiseta */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent z-20 pointer-events-none" />
              </div>
            ) : selectedTeam ? (
              /* Logo Oficial de Franquicia (Centrado, monumental) */
              <div className="relative w-full h-full flex flex-col items-center justify-center py-4">
                <div 
                  className="absolute inset-6 rounded-full blur-3xl pointer-events-none opacity-35 group-hover:opacity-55 transition-opacity"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 p-2 flex items-center justify-center">
                  <img
                    src={getTeamLogoUrl(selectedTeam.nba_team_id)}
                    alt={selectedTeam.name}
                    className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          /* ESTADO VACÍO: Sobre Cerrado / Mystery Pack Coleccionable */
          <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8 group-hover:scale-105 transition-transform duration-300">
            {/* Emblema central de sobre sellado */}
            <div className="relative mb-3.5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/20 group-hover:border-[#FF5A1F] bg-gradient-to-b from-white/[0.04] to-black/60 flex items-center justify-center transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.7)] group-hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]">
                <span className="font-title text-4xl sm:text-5xl text-white/30 group-hover:text-[#FF5A1F] font-black transition-colors drop-shadow-md">
                  ?
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center font-bold text-xs shadow-lg border border-black/50">
                +
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-title text-base sm:text-lg text-white/80 group-hover:text-white uppercase font-black tracking-wider transition-colors">
                ELEGIR CANDIDATO
              </p>
              <div className="inline-flex items-center gap-1 text-[9px] text-[#A1A1AA] uppercase tracking-[0.22em] font-mono font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                SOBRE POR ABRIR
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PLACA INFERIOR EDITORIAL: Tipografía deportiva potente */}
      <div className="relative z-20 p-3 sm:p-3.5 pt-0">
        <div 
          className="bg-[#121212]/95 border rounded-xl p-3 shadow-xl backdrop-blur-md transition-colors"
          style={{
            borderColor: hasSelection ? `${accentColor}35` : 'rgba(255,255,255,0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.8)',
          }}
        >
          {hasSelection ? (
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                {selectedPlayer ? (
                  <>
                    {/* Primer nombre: claro, presente y en tracking extendido */}
                    {firstName && (
                      <div className="text-[11px] sm:text-xs font-mono font-black text-[#E4E4E7] uppercase tracking-[0.22em] leading-none mb-0.5 drop-shadow-sm truncate">
                        {firstName}
                      </div>
                    )}
                    {/* Apellido: protagonista rotundo, grande y condensado */}
                    <div className="font-title text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-[0.9] drop-shadow-[0_2px_8px_rgba(0,0,0,1)] truncate">
                      {lastName}
                    </div>
                  </>
                ) : selectedTeam ? (
                  <div className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_2px_8px_rgba(0,0,0,1)] truncate">
                    {selectedTeam.name}
                  </div>
                ) : null}

                {/* Franquicia & Badge Underdog */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span 
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded font-mono border shadow-sm"
                    style={{
                      backgroundColor: `${accentColor}25`,
                      borderColor: `${accentColor}50`,
                      color: accentColor,
                    }}
                  >
                    {selectedPlayer?.team_abbreviation || selectedTeam?.abbreviation}
                  </span>

                  {isUnderdog && (
                    <span className="badge-underdog text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5 text-[#FBBF24]" />
                      SORPRESA ×1.5
                    </span>
                  )}
                </div>
              </div>

              {/* Botón táctil para cambiar */}
              {!isLocked && onSelect && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                  className="shrink-0 text-[10px] font-title font-bold tracking-widest text-[#D4D4D8] hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 px-2.5 py-1.5 rounded-lg transition-colors uppercase shadow-sm"
                >
                  CAMBIAR
                </button>
              )}
            </div>
          ) : null}

          {/* Subtítulo de la predicción con mayor carácter */}
          <div className={cn(
            'flex items-center justify-between gap-2',
            hasSelection ? 'mt-2 pt-2 border-t border-white/10' : ''
          )}>
            <span className="font-title text-sm sm:text-base text-[#F5F5F5] uppercase tracking-wider font-black line-clamp-1">
              {prediction.name}
            </span>
            <span className="text-[10px] font-mono font-bold text-[#71717A] shrink-0">
              #{seriesNumClean}
            </span>
          </div>
        </div>

        {/* Sello Físico SELLADO */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center z-40 rounded-2xl animate-stamp">
            <div className="stamp-badge font-title text-4xl sm:text-5xl px-8 py-3 rounded-2xl uppercase font-black rotate-[-10deg]">
              SELLADO
            </div>
          </div>
        )}
      </div>

      {/* Efecto Foil Holográfico Deportivo al Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent z-30" />
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
