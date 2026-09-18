// filepath: src/components/pickem/TeamSelector.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Search, X, Check, Flame, Trophy, AlertCircle } from 'lucide-react';
import { isUnderdogPick } from '@/lib/pickem/community';
import { getTeamNbaId, getTeamLogoUrl } from '@/lib/basketball/nbaIds';
import { sortTeamsForCategory } from '@/lib/pickem/candidateOrder';
import { cn } from '@/lib/cn';
import { TeamLogo } from '@/components/nba/TeamLogo';

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
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [conferenceFilter, setConferenceFilter] = useState<string>(
    conferenceConstraint || 'ALL'
  );

  const isNbaFinals = categorySlug === 'nba_champion' || categorySlug === 'nba-champion';

  // 180ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 180);
    return () => clearTimeout(timer);
  }, [search]);

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

  // Ordenar franquicias priorizando contendientes y candidatos lógicos
  const baseTeams = useMemo(() => {
    if (isNbaFinals) {
      return teams;
    }
    return sortTeamsForCategory(teams, categorySlug);
  }, [teams, categorySlug, isNbaFinals]);

  const filteredTeams = useMemo(() => {
    if (isNbaFinals) {
      // Estrictamente las opciones de finalistas provistas (Este y Oeste)
      return teams;
    }

    const query = debouncedSearch.trim().toLowerCase();

    return baseTeams.filter((t) => {
      if (conferenceConstraint && t.conference !== conferenceConstraint) {
        return false;
      }

      if (conferenceFilter === 'East' && t.conference !== 'East') return false;
      if (conferenceFilter === 'West' && t.conference !== 'West') return false;

      if (!query) return true;
      return (
        t.name.toLowerCase().includes(query) ||
        t.abbreviation.toLowerCase().includes(query)
      );
    });
  }, [baseTeams, debouncedSearch, conferenceFilter, conferenceConstraint, isNbaFinals, teams]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-xl bg-[#121212] border-t sm:border border-white/10 rounded-t-[2.25rem] sm:rounded-3xl flex flex-col h-[92dvh] max-h-[92dvh] sm:h-[85vh] sm:max-h-[85vh] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile touch indicator bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-3 sm:hidden shrink-0" />

        {/* Encabezado */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#141414] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[11px] font-mono uppercase font-black tracking-widest block",
                  isNbaFinals ? "text-[#FF5A1F]" : "text-[#10B981]"
                )}
              >
                {isNbaFinals
                  ? "FINALES DE LA NBA · DUELO POR EL ANILLO"
                  : `¿A QUIÉN LE TENÉS FE? ${conferenceConstraint ? `(${conferenceConstraint === 'East' ? 'ESTE' : 'OESTE'})` : ''}`}
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-[11px] font-mono text-zinc-400">
                {isNbaFinals ? "LOS 2 CAMPEONES DE CONFERENCIA" : "FRANQUICIAS OFICIALES"}
              </span>
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

        {/* Buscador y Filtros de Conferencia: ocultos en las Finales porque solo son los 2 finalistas */}
        {!isNbaFinals ? (
          <div className="p-4 space-y-3 bg-[#0d0d0d] border-b border-white/10 shrink-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar franquicia o sigla (Celtics, BOS, Lakers, OKC)..."
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
                    className={`px-3.5 py-1.5 rounded-lg font-title text-sm tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
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
        ) : (
          <div className="p-4 bg-[#0d0d0d] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
              <Trophy className="w-4 h-4 text-[#FF5A1F] shrink-0" />
              <span>
                {filteredTeams.length === 2 ? (
                  <>
                    Elegí al ganador entre tu <strong className="text-[#3B82F6]">Campeón del Este</strong> y tu <strong className="text-[#A855F7]">Campeón del Oeste</strong>:
                  </>
                ) : (
                  'El Campeón de la NBA se define estrictamente entre los 2 campeones de conferencia.'
                )}
              </span>
            </div>
          </div>
        )}

        {/* Lista de Equipos */}
        <div className="flex-1 overflow-y-auto p-3.5 pb-20 sm:pb-4 divide-y divide-white/[0.04] overscroll-contain">
          {isNbaFinals && filteredTeams.length < 2 ? (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center mx-auto text-[#FF5A1F] shadow-lg">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="font-title text-2xl text-white tracking-wide uppercase">
                  {filteredTeams.length === 0
                    ? 'Finalistas no definidos'
                    : 'Falta un Campeón de Conferencia'}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {filteredTeams.length === 0
                    ? 'Para elegir al Campeón de la NBA, primero debés seleccionar al Campeón del Este y al Campeón del Oeste en sus respectivas categorías.'
                    : `Ya seleccionaste a ${filteredTeams[0].name} como Campeón del ${filteredTeams[0].conference === 'East' ? 'Este' : 'Oeste'}. Completá el ganador de la otra conferencia para enfrentar a los dos finalistas.`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-sm tracking-wider uppercase transition-colors shadow-md cursor-pointer"
              >
                Ir a completar conferencias
              </button>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#8B8B8B] space-y-2">
              <p className="font-semibold text-zinc-300">No encontramos franquicias para esa búsqueda.</p>
              <p className="text-xs text-zinc-500">Probá con el nombre completo o la sigla de 3 letras.</p>
            </div>
          ) : (
            filteredTeams.map((team, idx) => {
              const isSelected = selectedTeamId === team.id;
              const isUnderdog = isUnderdogPick(categorySlug, team.abbreviation);
              const nbaTeamId = getTeamNbaId(team.abbreviation);
              const logoUrl = getTeamLogoUrl(nbaTeamId);

              return (
                <div key={team.id} className="space-y-3">
                  {isNbaFinals && idx === 1 && (
                    <div className="py-2 flex items-center justify-center gap-3">
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="font-title text-xs sm:text-sm tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 px-3 py-1 rounded-full uppercase">
                        VS
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onSelect(team);
                      onClose();
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left cursor-pointer active:scale-[0.99]",
                      isSelected
                        ? isNbaFinals
                          ? "bg-[#FF5A1F]/15 border border-[#FF5A1F]/60 shadow-lg shadow-[#FF5A1F]/10"
                          : "bg-[#10B981]/15 border border-[#10B981]/50 shadow-md"
                        : "hover:bg-white/[0.04] border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <TeamLogo
                        tricode={team.abbreviation}
                        name={team.name}
                        primaryColor={team.primaryColor || undefined}
                        size={44}
                        className="shrink-0"
                      />

                      <div className="truncate">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm sm:text-base text-[#F5F5F5] truncate tracking-wide">
                            {team.name}
                          </span>
                          {isNbaFinals && (
                            <span
                              className={cn(
                                "text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0",
                                team.conference === 'East'
                                  ? "bg-[#3B82F6]/15 text-[#60A5FA] border-[#3B82F6]/40"
                                  : "bg-[#A855F7]/15 text-[#C084FC] border-[#A855F7]/40"
                              )}
                            >
                              {team.conference === 'East' ? 'Campeón del Este' : 'Campeón del Oeste'}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-[#8B8B8B] flex items-center gap-2 mt-0.5 font-medium">
                          <span className="font-bold text-white/90">
                            {team.abbreviation}
                          </span>
                          <span>•</span>
                          <span>
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

                    {/* Estado de selección e indicador Underdog */}
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      {isUnderdog && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-2 py-1 rounded-md tracking-wider">
                          <Flame className="w-3 h-3 text-[#FBBF24]" />
                          <span>x1.5 PTS</span>
                        </span>
                      )}

                      {isSelected ? (
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md",
                            isNbaFinals ? "bg-[#FF5A1F]" : "bg-[#10B981]"
                          )}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                          <span className="text-xs font-mono font-bold">+</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
