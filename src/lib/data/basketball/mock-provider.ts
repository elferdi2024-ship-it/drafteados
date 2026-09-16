// filepath: src/lib/data/basketball/mock-provider.ts
/**
 * DRAFTEADOS NBA HUB — MOCK PROVIDER
 * Implementación de referencia para desarrollo offline y fallback resiliente.
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
import { 
  MOCK_TEAMS, 
  MOCK_PLAYERS, 
  MOCK_SCOREBOARD, 
  MOCK_STANDINGS, 
  MOCK_LEADERS 
} from "./mock-data";

export class MockProvider implements BasketballDataProvider {
  async getTeams(): Promise<Team[]> {
    return MOCK_TEAMS;
  }

  async getTeam(slugOrId: string): Promise<Team | null> {
    const query = slugOrId.toLowerCase();
    return (
      MOCK_TEAMS.find(
        (t) =>
          t.id === query ||
          t.slug.toLowerCase() === query ||
          t.abbreviation.toLowerCase() === query
      ) || null
    );
  }

  async getPlayers(params?: { search?: string; teamId?: string }): Promise<Player[]> {
    let result = MOCK_PLAYERS;
    if (params?.teamId) {
      result = result.filter((p) => p.teamId === params.teamId);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.lastName.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getRoster(teamIdOrSlug: string): Promise<Player[]> {
    const team = await this.getTeam(teamIdOrSlug);
    if (!team) return [];
    return this.getPlayers({ teamId: team.id });
  }

  async getTeamSchedule(teamIdOrSlug: string): Promise<{ recent: Game[]; upcoming: Game[] }> {
    const team = await this.getTeam(teamIdOrSlug);
    if (!team) return { recent: [], upcoming: [] };
    const games = await this.getGames({ teamId: team.id });
    return {
      recent: games.filter((g) => g.status === "final").slice(0, 5),
      upcoming: games.filter((g) => g.status === "scheduled").slice(0, 5),
    };
  }

  async getScoreboard(_date?: string): Promise<Game[]> {
    return MOCK_SCOREBOARD;
  }

  async getGames(params?: { startDate?: string; endDate?: string; teamId?: string; seasonType?: number }): Promise<Game[]> {
    let games = MOCK_SCOREBOARD;
    if (params?.teamId) {
      games = games.filter(
        (g) => g.homeTeam.id === params.teamId || g.awayTeam.id === params.teamId
      );
    }
    return games;
  }

  async getStandings(_season?: string): Promise<{ east: Standing[]; west: Standing[] }> {
    return MOCK_STANDINGS;
  }

  async getLeaders(stat: StatType, _season?: string, limit = 10): Promise<LeaderLine[]> {
    const lines = MOCK_LEADERS[stat] || MOCK_LEADERS.pts;
    return lines.slice(0, limit);
  }

  async getGame(gameId: string): Promise<(Game & { boxScore?: unknown }) | null> {
    const game = MOCK_SCOREBOARD.find((g) => g.id === gameId);
    if (!game) return null;
    return {
      ...game,
      boxScore: {
        attendance: 19156,
        leadChanges: 7,
        timesTied: 4,
      },
    };
  }
}
