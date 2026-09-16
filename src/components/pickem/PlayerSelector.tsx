// filepath: src/components/pickem/PlayerSelector.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Search, X, Check, User, Clock, Flame } from 'lucide-react';
import { isUnderdogPick } from '@/lib/pickem/community';
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

const RECENT_KEY = 'drafteados_pickem_recent_players';

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
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');
  const [recentPlayerIds, setRecentPlayerIds] = useState<string[]>([]);

  // 180ms debounce para búsqueda ultra fluida
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 180);
    return () => clearTimeout(timer);
  }, [search]);

  // Cargar jugadores recientes de localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        setRecentPlayerIds(JSON.parse(stored));
      }
    } catch {
      // Silently fail if localStorage is disabled
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (player: PlayerOption) => {
    try {
      const nextRecent = [player.id, ...recentPlayerIds.filter((id) => id !== player.id)].slice(0, 10);
      setRecentPlayerIds(nextRecent);
      localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
    } catch {
      // Ignore
    }
    onSelect(player);
    onClose();
  };

  const filteredPlayers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return players.filter((p) => {
      // Filtro de recientes
      if (positionFilter === 'RECENT') {
        if (!recentPlayerIds.includes(p.id)) return false;
      }

      // Filtro de posición
      if (positionFilter === 'GUARD' && !p.position?.toLowerCase().includes('guard')) return false;
      if (positionFilter === 'WING' && !p.position?.toLowerCase().includes('wing')) return false;
      if (positionFilter === 'BIG' && !(p.position?.toLowerCase().includes('big') || p.position?.toLowerCase().includes('center'))) return false;

      // Filtro de texto debounced
      if (!query) return true;
      return (
        p.displayName.toLowerCase().includes(query) ||
        (p.team?.name && p.team.name.toLowerCase().includes(query)) ||
        (p.team?.abbreviation && p.team.abbreviation.toLowerCase().includes(query))
      );
    });
  }, [players, debouncedSearch, positionFilter, recentPlayerIds]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-xl bg-[#121212] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-3xl flex flex-col max-h-[92vh] sm:max-h-[85vh] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile touch indicator bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Encabezado */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#141414] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase font-black text-[#FF5A1F] tracking-widest block">
                ¿A QUIÉN TE JUGÁS?
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-[11px] font-mono text-zinc-400">BOLETA OFICIAL</span>
            </div>
            <h3 className="font-title text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight leading-tight mt-0.5">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8B8B8B] hover:text-white p-2 rounded-xl transition-colors bg-white/5 cursor-pointer"
            aria-label="Cerrar selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buscador debounced y Filtros rápidos */}
        <div className="p-4 space-y-3 bg-[#0d0d0d] border-b border-white/10 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar candidato (ej: Doncic, SGA, Edwards, Curry)..."
              autoFocus
              className="w-full bg-[#181818] border border-white/10 focus:border-[#FF5A1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#666666] outline-none transition-colors"
            />
          </div>

          {/* Pestañas de posición y recientes */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: 'ALL', label: 'TODOS' },
              { id: 'GUARD', label: 'BASES' },
              { id: 'WING', label: 'ALEROS' },
              { id: 'BIG', label: 'PÍVOTS' },
              ...(recentPlayerIds.length > 0 ? [{ id: 'RECENT', label: 'RECIENTES' }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPositionFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg font-title text-sm tracking-wider uppercase transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  positionFilter === tab.id
                    ? 'bg-[#FF5A1F] text-white shadow-sm'
                    : 'bg-[#181818] text-[#8B8B8B] hover:text-[#F5F5F5] border border-white/5'
                }`}
              >
                {tab.id === 'RECENT' && <Clock className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Jugadores (Consenso oculto para evitar sesgo de confirmación) */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-white/[0.04]">
          {filteredPlayers.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#8B8B8B] space-y-2">
              <p className="font-semibold text-zinc-300">No encontramos candidatos para esa búsqueda.</p>
              <p className="text-xs text-zinc-500">Probá con otro apellido o limpiá el filtro de posición.</p>
            </div>
          ) : (
            filteredPlayers.map((player) => {
              const isSelected = selectedPlayerId === player.id;
              const isUnderdog = isUnderdogPick(categorySlug, player.displayName);
              const nbaId = getPlayerNbaId(player.displayName);

              return (
                <button
                  key={player.id}
                  onClick={() => handleSelect(player)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF5A1F]/15 border border-[#FF5A1F]/50 shadow-md'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border shadow-sm relative"
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
                        <User className="w-5 h-5 text-white/70" />
                      )}
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-[#F5F5F5] truncate tracking-wide">
                          {player.displayName}
                        </span>
                      </div>

                      <div className="text-xs text-[#8B8B8B] flex items-center gap-2 mt-0.5 font-medium">
                        <span className="font-bold text-white/90">{player.team?.abbreviation || 'NBA'}</span>
                        <span>•</span>
                        <span>
                          {player.position === 'Guard' ? 'Base' : 
                           player.position === 'Wing' ? 'Alero' : 
                           player.position === 'Big' ? 'Pívot' : player.position || 'Jugador'}
                        </span>
                        {player.jerseyNumber && (
                          <>
                            <span>•</span>
                            <span>#{player.jerseyNumber}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Estado de selección e indicador Underdog */}
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    {isUnderdog && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-2 py-1 rounded-md tracking-wider">
                        <Flame className="w-3 h-3 text-[#FBBF24]" />
                        <span>x1.5 PTS</span>
                      </span>
                    )}

                    {isSelected ? (
                      <div className="w-8 h-8 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                        <span className="text-xs font-mono font-bold">+</span>
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
