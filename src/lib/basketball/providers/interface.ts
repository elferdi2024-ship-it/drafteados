// D:\PROYECTOS\drafteados\src\lib\basketball\providers\interface.ts
export interface PlayerQuery {
  teamId?: string;
  position?: 'Guard' | 'Wing' | 'Big' | string;
  search?: string;
  active?: boolean;
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  teamId: string;
  position: string;
  jerseyNumber: string;
  headshotUrl?: string;
}

export interface Standing {
  teamId: string;
  wins: number;
  losses: number;
  conferenceRank: number;
  divisionRank: number;
}

export interface PlayerSeasonStats {
  playerId: string;
  gamesPlayed: number;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  threePointersMade: number;
  fieldGoalPercentage: number;
}

export interface BasketballDataProvider {
  getTeams(): Promise<Team[]>;
  getPlayers(params?: PlayerQuery): Promise<Player[]>;
  getStandings(season: string): Promise<Standing[]>;
  getPlayerSeasonStats(season: string): Promise<PlayerSeasonStats[]>;
}
