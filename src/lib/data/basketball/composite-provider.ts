// filepath: src/lib/data/basketball/composite-provider.ts
/**
 * DRAFTEADOS NBA HUB — COMPOSITE DATA PROVIDER
 * Proveedor principal de datos para la aplicación.
 * Orquesta cache con TTL y delega a los proveedores (Mock hoy, APIs free en Fase 1, APIs pagas en el futuro).
 */

import type { 
  BasketballDataProvider, 
  Team, 
  Player, 
  Game, 
  Standing, 
  LeaderLine, 
  StatType 
} from "./types";
import { MockProvider } from "./mock-provider";
import { hubCache } from "./cache";

export class CompositeProvider implements BasketballDataProvider {
  private mock = new MockProvider();

  async getScoreboard(date?: string): Promise<Game[]> {
    const key = `scoreboard:${date ?? "today"}`;
    // Scoreboard TTL: 60 segundos
    return hubCache.getOrSet(key, 60, async () => {
      try {
        return await this.mock.getScoreboard(date);
      } catch {
        return this.mock.getScoreboard(date);
      }
    });
  }

  async getStandings(season = "2026-27"): Promise<{ east: Standing[]; west: Standing[] }> {
    const key = `standings:${season}`;
    // Standings TTL: 600 segundos (10 minutos)
    return hubCache.getOrSet(key, 600, async () => {
      try {
        return await this.mock.getStandings(season);
      } catch {
        return this.mock.getStandings(season);
      }
    });
  }

  async getLeaders(stat: StatType = "pts", season = "2026-27", limit = 10): Promise<LeaderLine[]> {
    const key = `leaders:${stat}:${season}:${limit}`;
    // Leaders TTL: 900 segundos (15 minutos)
    return hubCache.getOrSet(key, 900, async () => {
      try {
        return await this.mock.getLeaders(stat, season, limit);
      } catch {
        return this.mock.getLeaders(stat, season, limit);
      }
    });
  }

  async getTeams(): Promise<Team[]> {
    const key = "teams:all";
    // Teams TTL: 86400 segundos (24 horas)
    return hubCache.getOrSet(key, 86400, async () => {
      return this.mock.getTeams();
    });
  }

  async getTeam(slugOrId: string): Promise<Team | null> {
    const key = `team:${slugOrId}`;
    return hubCache.getOrSet(key, 86400, async () => {
      return this.mock.getTeam(slugOrId);
    });
  }

  async getPlayers(params?: { search?: string; teamId?: string }): Promise<Player[]> {
    const key = `players:${params?.teamId || "all"}:${params?.search || ""}`;
    return hubCache.getOrSet(key, 3600, async () => {
      return this.mock.getPlayers(params);
    });
  }

  async getGames(params?: { startDate?: string; endDate?: string; teamId?: string }): Promise<Game[]> {
    const key = `games:${params?.startDate || ""}:${params?.endDate || ""}:${params?.teamId || "all"}`;
    return hubCache.getOrSet(key, 300, async () => {
      return this.mock.getGames(params);
    });
  }

  async getGame(gameId: string): Promise<(Game & { boxScore?: unknown }) | null> {
    const key = `game:${gameId}`;
    return hubCache.getOrSet(key, 60, async () => {
      return this.mock.getGame(gameId);
    });
  }
}

export const basketball = new CompositeProvider();
