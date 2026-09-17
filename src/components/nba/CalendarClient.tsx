// filepath: src/components/nba/CalendarClient.tsx
"use client";

import { useState, useMemo } from "react";
import type { Game, Team } from "@/types/basketball";
import { ScoreboardCard } from "./ScoreboardCard";
import { Search, Filter, Calendar as CalendarIcon, AlertCircle } from "lucide-react";

interface CalendarClientProps {
  initialGames: Game[];
  teams: Team[];
}

export function CalendarClient({ initialGames, teams }: CalendarClientProps) {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedTeam, setSelectedTeam] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialGames.filter((game) => {
      // Filtro de fase / estado / conferencia
      if (filterType === "LIVE" && game.status !== "live") return false;
      if (filterType === "FINAL" && game.status !== "final") return false;
      if (filterType === "OPENING") {
        const gameTime = new Date(game.date).getTime();
        const start = new Date("2026-10-20T00:00:00Z").getTime();
        const end = new Date("2026-10-27T12:00:00Z").getTime();
        if (gameTime < start || gameTime > end) return false;
      }
      if (filterType === "PRESEASON") {
        const gameTime = new Date(game.date).getTime();
        const startOpening = new Date("2026-10-20T00:00:00Z").getTime();
        if (gameTime >= startOpening && !game.isPreseason) return false;
      }
      if (filterType === "EAST" && game.homeTeam.conference !== "East" && game.awayTeam.conference !== "East") return false;
      if (filterType === "WEST" && game.homeTeam.conference !== "West" && game.awayTeam.conference !== "West") return false;

      // Filtro por franquicia específica
      if (selectedTeam !== "ALL") {
        const teamMatch = game.homeTeam.abbreviation === selectedTeam || 
                          game.awayTeam.abbreviation === selectedTeam ||
                          game.homeTeam.id === selectedTeam ||
                          game.awayTeam.id === selectedTeam;
        if (!teamMatch) return false;
      }

      // Filtro de texto libre (nombre equipo, ciudad o arena)
      if (!query) return true;
      return (
        game.homeTeam.name.toLowerCase().includes(query) ||
        game.awayTeam.name.toLowerCase().includes(query) ||
        game.homeTeam.city.toLowerCase().includes(query) ||
        game.awayTeam.city.toLowerCase().includes(query) ||
        (game.arena && game.arena.toLowerCase().includes(query))
      );
    });
  }, [initialGames, filterType, selectedTeam, search]);

  // Group filtered games by calendar date string
  const groupedGames = useMemo(() => {
    const groups: { [dateStr: string]: Game[] } = {};
    for (const game of filteredGames) {
      let dateKey = "Fecha por confirmar";
      if (game.date) {
        const d = new Date(game.date);
        if (!isNaN(d.getTime())) {
          dateKey = new Intl.DateTimeFormat("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(d);
          dateKey = dateKey.charAt(0).toUpperCase() + dateKey.slice(1);
        }
      }
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(game);
    }
    return groups;
  }, [filteredGames]);

  return (
    <div className="space-y-8">
      {/* Controles interactivos y filtros */}
      <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-5 space-y-4 shadow-[var(--hub-shadow)]">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Buscador */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--hub-text-dim)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por equipo, ciudad o pabellón..."
              className="w-full bg-[var(--hub-surface-2)] border border-[var(--hub-border)] focus:border-[var(--hub-accent)] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[var(--hub-text)] placeholder-[var(--hub-text-dim)] outline-none transition-colors"
            />
          </div>

          {/* Selector de Franquicia */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[var(--hub-text-dim)] shrink-0 hidden sm:block" />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full sm:w-56 bg-[var(--hub-surface-2)] border border-[var(--hub-border)] focus:border-[var(--hub-accent)] rounded-xl px-3 py-2 text-xs sm:text-sm text-[var(--hub-text)] outline-none transition-colors font-mono cursor-pointer"
            >
              <option value="ALL">Todas las Franquicias (30)</option>
              <optgroup label="Conferencia Este">
                {teams.filter(t => t.conference === "East").map(t => (
                  <option key={t.id} value={t.abbreviation}>{t.name} ({t.abbreviation})</option>
                ))}
              </optgroup>
              <optgroup label="Conferencia Oeste">
                {teams.filter(t => t.conference === "West").map(t => (
                  <option key={t.id} value={t.abbreviation}>{t.name} ({t.abbreviation})</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Pestañas de estado / conferencia */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar border-t border-[var(--hub-border)] pt-3">
          {[
            { id: "ALL", label: "TODOS LOS PARTIDOS" },
            { id: "OPENING", label: "SEMANA INAUGURAL (20-26 OCT)" },
            { id: "PRESEASON", label: "PRETEMPORADA" },
            { id: "EAST", label: "CONFERENCIA ESTE" },
            { id: "WEST", label: "CONFERENCIA OESTE" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                filterType === tab.id
                  ? "bg-[var(--hub-accent)] text-white shadow-sm"
                  : "bg-[var(--hub-surface-2)] text-[var(--hub-text-secondary)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resumen de resultados */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--hub-text-dim)] px-1">
        <span>MOSTRANDO {filteredGames.length} PARTIDOS PROGRAMADOS</span>
        {(search || filterType !== "ALL" || selectedTeam !== "ALL") && (
          <button
            onClick={() => {
              setSearch("");
              setFilterType("ALL");
              setSelectedTeam("ALL");
            }}
            className="text-[var(--hub-accent)] hover:underline cursor-pointer font-semibold"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid de Partidos Agrupados por Fecha Exacta */}
      {filteredGames.length === 0 ? (
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-12 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-[var(--hub-accent)] mx-auto" />
          <p className="font-bold text-lg text-[var(--hub-text)]">
            No encontramos partidos con esos filtros.
          </p>
          <p className="text-sm text-[var(--hub-text-muted)]">
            Probá seleccionando otra franquicia o reseteando los filtros de conferencia.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedGames).map(([dateLabel, gamesInGroup]) => (
            <div key={dateLabel} className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[var(--hub-border)] pb-2.5">
                <CalendarIcon className="w-4 h-4 text-[var(--hub-accent)]" />
                <h2 className="text-sm font-mono font-bold text-[var(--hub-text)] uppercase tracking-wider">
                  {dateLabel}
                </h2>
                <span className="text-[11px] font-mono text-[var(--hub-text-dim)]">
                  &bull; {gamesInGroup.length} {gamesInGroup.length === 1 ? "partido programado" : "partidos programados"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {gamesInGroup.map((game) => (
                  <ScoreboardCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
