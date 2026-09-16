// filepath: src/types/basketball.ts

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  conference: "East" | "West";
  division: string;
  slug: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  teamId?: string;
  position?: string;
  jerseyNumber?: string;
  headshotUrl?: string;
}

export type GameStatus = "scheduled" | "live" | "final" | "postponed";

export interface Game {
  id: string;
  date: string; // ISO
  status: GameStatus;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  period?: number;
  clock?: string;
  arena?: string;
}

export interface Standing {
  team: Team;
  wins: number;
  losses: number;
  winPct: number;
  conferenceRank: number;
  gamesBack?: number;
  homeRecord?: string;
  roadRecord?: string;
  streak?: string;
}

export type StatType = "pts" | "ast" | "reb" | "stl" | "blk" | "fg3m" | string;

export interface LeaderLine {
  player: Player;
  team: Team;
  value: number;
  rank: number;
  stat: StatType;
}

export interface BasketballDataProvider {
  getTeams(): Promise<Team[]>;
  getTeam(slugOrId: string): Promise<Team | null>;
  getPlayers(params?: { search?: string; teamId?: string }): Promise<Player[]>;
  getScoreboard(date?: string): Promise<Game[]>;
  getGames(params?: { startDate?: string; endDate?: string; teamId?: string }): Promise<Game[]>;
  getStandings(season?: string): Promise<{ east: Standing[]; west: Standing[] }>;
  getLeaders(stat: StatType, season?: string, limit?: number): Promise<LeaderLine[]>;
  getGame(gameId: string): Promise<(Game & { boxScore?: unknown }) | null>;
}
