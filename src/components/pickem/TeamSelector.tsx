// filepath: src/components/pickem/TeamSelector.tsx
"use client";

import { useState, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';
import { getCommunityPercentage, isUnderdogPick } from '@/lib/pickem/community';
import { getTeamNbaId, getTeamLogoUrl } from '@/lib/basketball/nbaIds';

export interface TeamOption {
  id: string;
  name: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division?: string | null;
  primaryColor: string | null;
  secondaryColor?: string | null;
}

interface TeamSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (team: TeamOption) => void;
  selectedTeamId?: string | null;
  title: string;
  categorySlug: string;
  conferenceConstraint?: 'East' | 'West';
  teams: TeamOption[];
}

export function TeamSelector({
  isOpen,
  onClose,
  onSelect,
  selectedTeamId,
  title,
  categorySlug,
  conferenceConstraint,
  teams,
}: TeamSelectorProps) {
  const [search, setSearch] = useState('');
  const [conferenceFilter, setConferenceFilter] = useState<string>(
    conferenceConstraint || 'ALL'
  );

  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      if (conferenceConstraint && t.conference !== conferenceConstraint) {
        return false;
      }

      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.abbreviation.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (conferenceFilter === 'ALL') return true;
      if (conferenceFilter === 'East' && t.conference === 'East') return true;
      if (conferenceFilter === 'West' && t.conference === 'West') return true;

      return false;
    });
  }, [teams, search, conferenceFilter, conferenceConstraint]);

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
            <span className="text-[11px] font-mono uppercase font-bold text-[#10B981] tracking-widest block">
              ELEGÍ FRANQUICIA {conferenceConstraint ? `(CONFERENCIA ${conferenceConstraint === 'East' ? 'ESTE' : 'OESTE'})` : ''}
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
              placeholder="Buscar franquicia o sigla (Celtics, BOS, Lakers, OKC)..."
              autoFocus
              className="w-full bg-[#181818] border border-white/10 focus:border-[#10B981] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#666666] outline-none transition-colors"
            />
          </div>

          {!conferenceConstraint && (
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {[
                { id: 'ALL', label: 'TODAS' },
                { id: 'East', label: 'ESTE' },
                { id: 'West', label: 'OESTE' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setConferenceFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-title text-sm tracking-wider uppercase transition-colors shrink-0 ${
                    conferenceFilter === tab.id
                      ? 'bg-[#10B981] text-white shadow-sm'
                      : 'bg-[#181818] text-[#8B8B8B] hover:text-[#F5F5F5] border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lista de Equipos con Heatmap */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-white/[0.04]">
          {filteredTeams.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#8B8B8B]">
              No se encontraron franquicias para esa búsqueda.
            </div>
          ) : (
            filteredTeams.map((team) => {
              const isSelected = selectedTeamId === team.id;
              const consensus = getCommunityPercentage(categorySlug, team.abbreviation);
              const isUnderdog = isUnderdogPick(categorySlug, team.abbreviation);

              const nbaTeamId = getTeamNbaId(team.abbreviation);
              const logoUrl = getTeamLogoUrl(nbaTeamId);

              return (
                <button
                  key={team.id}
                  onClick={() => {
                    onSelect(team);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
                    isSelected
                      ? 'bg-[#10B981]/15 border border-[#10B981]/50 shadow-md'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 border shrink-0 shadow-sm relative overflow-hidden"
                      style={{
                        backgroundColor: team.primaryColor ? `${team.primaryColor}20` : '#1c1c1c',
                        borderColor: team.primaryColor ? `${team.primaryColor}60` : '#333333',
                      }}
                    >
                      <img
                        src={logoUrl}
                        alt={team.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain drop-shadow"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#F5F5F5] truncate tracking-wide">
                          {team.name}
                        </span>
                        {isUnderdog && (
                          <span className="text-[9px] font-mono font-bold text-[#FBBF24] border border-[#FBBF24]/30 px-1.5 py-0.5 rounded tracking-wider shrink-0">
                            x1.5 PTS
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#8B8B8B] flex items-center gap-2 mt-0.5 font-medium">
                        <span className="font-bold text-white/80">
                          Conferencia {team.conference === 'East' ? 'Este' : 'Oeste'}
                        </span>
                        {team.division && (
                          <>
                            <span>•</span>
                            <span>{team.division}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Heatmap & Selection State */}
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <div className="text-right w-16">
                      <div className="font-title text-sm text-[#E4E4E7] font-bold">
                        {consensus}%
                      </div>
                      {/* Mini Heatmap Bar */}
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-[#10B981]"
                          style={{ width: `${Math.min(100, consensus * 2)}%` }}
                        />
                      </div>
                      <div className="text-[9px] uppercase font-bold text-[#71717A] tracking-wider mt-0.5">
                        Consenso
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-[#10B981] flex items-center justify-center text-white shadow-md">
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
