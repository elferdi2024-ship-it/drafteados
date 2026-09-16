// filepath: src/components/pickem/PlayerSelector.tsx
"use client";

import { useState, useMemo } from 'react';
import { Search, X, Check, User } from 'lucide-react';
import { getCommunityPercentage, isUnderdogPick } from '@/lib/pickem/community';
import { getPlayerNbaId, getPlayerHeadshotUrl } from '@/lib/basketball/nbaIds';

export interface PlayerOption {
  id: string;
  displayName: string;
  position: string | null;
  jerseyNumber: string | null;
  team?: {
    id: string;
    name: string;
    abbreviation: string;
    primaryColor: string | null;
  } | null;
}

interface PlayerSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (player: PlayerOption) => void;
  selectedPlayerId?: string | null;
  title: string;
  categorySlug: string;
  players: PlayerOption[];
}

export function PlayerSelector({
  isOpen,
  onClose,
  onSelect,
  selectedPlayerId,
  title,
  categorySlug,
  players,
}: PlayerSelectorProps) {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch = p.displayName.toLowerCase().includes(search.toLowerCase()) ||
        p.team?.name.toLowerCase().includes(search.toLowerCase()) ||
        p.team?.abbreviation.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (positionFilter === 'ALL') return true;
      if (positionFilter === 'GUARD' && p.position?.toLowerCase().includes('guard')) return true;
      if (positionFilter === 'WING' && p.position?.toLowerCase().includes('wing')) return true;
      if (positionFilter === 'BIG' && (p.position?.toLowerCase().includes('big') || p.position?.toLowerCase().includes('center'))) return true;

      return false;
    });
  }, [players, search, positionFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full sm:max-w-xl bg-[#121212] border border-white/10 rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[90vh] sm:max-h-[84vh] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141414]">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-[#FF5A1F] tracking-widest block">
              ELEGÍ JUGADOR
            </span>
            <h3 className="font-title text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8B8B8B] hover:text-white p-2 rounded-xl transition-colors bg-white/5"
            aria-label="Cerrar selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buscador y Filtros */}
        <div className="p-4 space-y-3 bg-[#0d0d0d] border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar estrella (ej: Doncic, SGA, Edwards, Curry, Tatum)..."
              autoFocus
              className="w-full bg-[#181818] border border-white/10 focus:border-[#FF5A1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#666666] outline-none transition-colors"
            />
          </div>

          {/* Pestañas de posición */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: 'ALL', label: 'TODOS' },
              { id: 'GUARD', label: 'BASES' },
              { id: 'WING', label: 'ALEROS' },
              { id: 'BIG', label: 'PÍVOTS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPositionFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg font-title text-sm tracking-wider uppercase transition-colors shrink-0 ${
                  positionFilter === tab.id
                    ? 'bg-[#FF5A1F] text-white shadow-sm'
                    : 'bg-[#181818] text-[#8B8B8B] hover:text-[#F5F5F5] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Jugadores con Heatmap Visual */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-white/[0.04]">
          {filteredPlayers.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#8B8B8B]">
              No se encontraron jugadores para esa búsqueda.
            </div>
          ) : (
            filteredPlayers.map((player) => {
              const isSelected = selectedPlayerId === player.id;
              const consensus = getCommunityPercentage(categorySlug, player.displayName);
              const isUnderdog = isUnderdogPick(categorySlug, player.displayName);

              const nbaId = getPlayerNbaId(player.displayName);

              return (
                <button
                  key={player.id}
                  onClick={() => {
                    onSelect(player);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
                    isSelected
                      ? 'bg-[#FF5A1F]/15 border border-[#FF5A1F]/50 shadow-md'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border shadow-sm relative"
                      style={{
                        backgroundColor: player.team?.primaryColor ? `${player.team.primaryColor}20` : '#1c1c1c',
                        borderColor: player.team?.primaryColor ? `${player.team.primaryColor}60` : '#333333',
                      }}
                    >
                      {nbaId ? (
                        <img
                          src={getPlayerHeadshotUrl(nbaId, '260x190')}
                          alt={player.displayName}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : player.jerseyNumber ? (
                        <span 
                          className="font-title text-sm font-black"
                          style={{ color: player.team?.primaryColor || '#FFFFFF' }}
                        >
                          #{player.jerseyNumber}
                        </span>
                      ) : (
                        <User className="w-4 h-4 text-white/70" />
                      )}
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#F5F5F5] truncate tracking-wide">
                          {player.displayName}
                        </span>
                        {isUnderdog && (
                          <span className="text-[9px] font-mono font-bold text-[#FBBF24] border border-[#FBBF24]/30 px-1.5 py-0.5 rounded tracking-wider shrink-0">
                            x1.5 PTS
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#8B8B8B] flex items-center gap-2 mt-0.5 font-medium">
                        <span className="font-bold text-white/80">{player.team?.abbreviation || 'NBA'}</span>
                        <span>•</span>
                        <span>
                          {player.position === 'Guard' ? 'Base' : 
                           player.position === 'Wing' ? 'Alero' : 
                           player.position === 'Big' ? 'Pívot' : player.position}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Heatmap & Selection State */}
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <div className="text-right w-16">
                      <div className="font-title text-sm text-[#E4E4E7] font-bold">
                        {consensus}%
                      </div>
                      {/* Mini Heatmap Consensus Bar */}
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-[#FF5A1F]"
                          style={{ width: `${Math.min(100, consensus * 2)}%` }}
                        />
                      </div>
                      <div className="text-[9px] uppercase font-bold text-[#71717A] tracking-wider mt-0.5">
                        Consenso
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
