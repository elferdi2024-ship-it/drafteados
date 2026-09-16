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
import { EspnProvider } from "./espn-provider";
import { hubCache } from "./cache";

export class CompositeProvider implements BasketballDataProvider {
  private espn = new EspnProvider();
  private mock = new MockProvider();

  async getScoreboard(date?: string): Promise<Game[]> {
    const key = `scoreboard:${date ?? "today"}`;
    // Scoreboard TTL: 60 segundos
    return hubCache.getOrSet(key, 60, async () => {
      try {
        const games = await this.espn.getScoreboard(date);
        if (games && games.length > 0) return games;
        return await this.mock.getScoreboard(date);
      } catch (err) {
        console.warn("[CompositeProvider] ESPN scoreboard failed, falling back to mock:", err);
        return this.mock.getScoreboard(date);
      }
    });
  }

  async getStandings(season = "2026-27"): Promise<{ east: Standing[]; west: Standing[] }> {
    const key = `standings:${season}`;
    // Standings TTL: 600 segundos (10 minutos)
    return hubCache.getOrSet(key, 600, async () => {
      try {
        const standings = await this.espn.getStandings(season);
        if (standings.east.length > 0 && standings.west.length > 0) {
          return standings;
        }
        return await this.mock.getStandings(season);
      } catch (err) {
        console.warn("[CompositeProvider] ESPN standings failed, falling back to mock:", err);
        return this.mock.getStandings(season);
      }
    });
  }

  async getLeaders(stat: StatType = "pts", season = "2026-27", limit = 10): Promise<LeaderLine[]> {
    const key = `leaders:${stat}:${season}:${limit}`;
    // Leaders TTL: 900 segundos (15 minutos)
    return hubCache.getOrSet(key, 900, async () => {
      try {
        const leaders = await this.espn.getLeaders(stat, season, limit);
        if (leaders && leaders.length > 0) return leaders;
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
      try {
        const teams = await this.espn.getTeams();
        if (teams && teams.length >= 30) return teams;
        return await this.mock.getTeams();
      } catch {
        return this.mock.getTeams();
      }
    });
  }

  async getTeam(slugOrId: string): Promise<Team | null> {
    const key = `team:${slugOrId}`;
    return hubCache.getOrSet(key, 86400, async () => {
      try {
        const team = await this.espn.getTeam(slugOrId);
        if (team) return team;
        return await this.mock.getTeam(slugOrId);
      } catch {
        return this.mock.getTeam(slugOrId);
      }
    });
  }

  async getPlayers(params?: { search?: string; teamId?: string }): Promise<Player[]> {
    const key = `players:${params?.teamId || "all"}:${params?.search || ""}`;
    return hubCache.getOrSet(key, 3600, async () => {
      return this.mock.getPlayers(params);
    });
  }

  async getRoster(teamIdOrSlug: string): Promise<Player[]> {
    const key = `roster:${teamIdOrSlug.toLowerCase()}`;
    // Roster TTL: 3600 segundos (1 hora)
    return hubCache.getOrSet(key, 3600, async () => {
      try {
        const roster = await this.espn.getRoster(teamIdOrSlug);
        if (roster && roster.length > 0) return roster;
        return await this.mock.getRoster(teamIdOrSlug);
      } catch (err) {
        console.warn("[CompositeProvider] ESPN getRoster failed, falling back to mock:", err);
        return this.mock.getRoster(teamIdOrSlug);
      }
    });
  }

  async getTeamSchedule(teamIdOrSlug: string): Promise<{ recent: Game[]; upcoming: Game[] }> {
    const key = `teamschedule:${teamIdOrSlug.toLowerCase()}`;
    // Schedule TTL: 300 segundos (5 minutos)
    return hubCache.getOrSet(key, 300, async () => {
      try {
        const schedule = await this.espn.getTeamSchedule(teamIdOrSlug);
        if (schedule && (schedule.recent.length > 0 || schedule.upcoming.length > 0)) {
          return schedule;
        }
        return await this.mock.getTeamSchedule(teamIdOrSlug);
      } catch (err) {
        console.warn("[CompositeProvider] ESPN getTeamSchedule failed, falling back to mock:", err);
        return this.mock.getTeamSchedule(teamIdOrSlug);
      }
    });
  }

  async getGames(params?: { startDate?: string; endDate?: string; teamId?: string; seasonType?: number }): Promise<Game[]> {
    const key = `games:${params?.startDate || ""}:${params?.endDate || ""}:${params?.teamId || "all"}:${params?.seasonType || "all"}`;
    return hubCache.getOrSet(key, 300, async () => {
      try {
        const games = await this.espn.getGames(params);
        if (games && games.length > 0) return games;
        return await this.mock.getGames(params);
      } catch {
        return this.mock.getGames(params);
      }
    });
  }

  async getGame(gameId: string): Promise<(Game & { boxScore?: unknown }) | null> {
    const key = `game:${gameId}`;
    return hubCache.getOrSet(key, 60, async () => {
      try {
        const game = await this.espn.getGame(gameId);
        if (game) return game;
        return await this.mock.getGame(gameId);
      } catch {
        return this.mock.getGame(gameId);
      }
    });
  }
}

export const basketball = new CompositeProvider();
