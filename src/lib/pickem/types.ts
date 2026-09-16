// filepath: src/lib/pickem/types.ts
import { z } from 'zod';

// ============================================================
// ENUMS
// ============================================================

export const PredictionStatus = {
  OPEN: 'OPEN',
  LOCKED: 'LOCKED',
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
  VOID: 'VOID',
} as const;
export type PredictionStatus = (typeof PredictionStatus)[keyof typeof PredictionStatus];

export const SeasonStatus = {
  PRESEASON: 'PRESEASON',
  OPEN: 'OPEN',
  LOCKED: 'LOCKED',
  REGULAR: 'REGULAR',
  PLAYOFFS: 'PLAYOFFS',
  COMPLETE: 'COMPLETE',
} as const;
export type SeasonStatus = (typeof SeasonStatus)[keyof typeof SeasonStatus];

export const PredictionCategory = {
  STATS: 'STATS',
  AWARDS: 'AWARDS',
  TEAMS: 'TEAMS',
  FINALS: 'FINALS',
} as const;
export type PredictionCategory = (typeof PredictionCategory)[keyof typeof PredictionCategory];

export const SelectionType = {
  PLAYER: 'player',
  TEAM: 'team',
} as const;
export type SelectionType = (typeof SelectionType)[keyof typeof SelectionType];

// ============================================================
// DOMAIN INTERFACES
// ============================================================

export interface Season {
  id: string;
  name: string;
  seasonYear: number;
  status: SeasonStatus;
  lockAt: string | null;
  startDate: string | null;
  regularEndDate: string | null;
  playoffsStartDate: string | null;
  finalsEndDate: string | null;
  rulesVersion: number;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  provider: string;
  providerTeamId: string;
  name: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  active: boolean;
}

export interface Player {
  id: string;
  provider: string;
  providerPlayerId: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  teamId: string | null;
  position: string | null;
  jerseyNumber: string | null;
  headshotUrl: string | null;
  active: boolean;
}

export interface PredictionType {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: PredictionCategory;
  phase: 'SEASON' | 'PLAYOFFS' | 'FINALS';
  selectionType: SelectionType;
  points: number;
  active: boolean;
  sortOrder: number;
  rulesJson: Record<string, unknown>;
}

export interface Prediction {
  id: string;
  seasonId: string;
  predictionTypeId: string;
  userId: string;
  playerId: string | null;
  teamId: string | null;
  selectedValue: string | null;
  status: PredictionStatus;
  lockedAt: string | null;
  pointsAwarded: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScoringEvent {
  id: string;
  predictionId: string;
  userId: string;
  eventType: string;
  points: number;
  reason: string | null;
  resolutionVersion: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  seasonId: string;
  totalPoints: number;
  correctPredictions: number;
  resolvedPredictions: number;
  accuracy: number;
  rank?: number;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// EXTENDED TYPES (UI-specific)
// ============================================================

/** Prediction with joined type info + selection display names */
export interface PredictionWithDetails extends Prediction {
  predictionType: PredictionType;
  player?: Player | null;
  team?: Team | null;
}

/** Category metadata for UI rendering */
export interface CategoryMeta {
  key: PredictionCategory;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const CATEGORY_META: Record<PredictionCategory, CategoryMeta> = {
  STATS: {
    key: 'STATS',
    label: 'Player Stats',
    color: 'text-cat-stats',
    bgColor: 'bg-cat-stats/10',
    borderColor: 'border-cat-stats/30',
  },
  AWARDS: {
    key: 'AWARDS',
    label: 'Awards',
    color: 'text-cat-awards',
    bgColor: 'bg-cat-awards/10',
    borderColor: 'border-cat-awards/30',
  },
  TEAMS: {
    key: 'TEAMS',
    label: 'Teams',
    color: 'text-cat-teams',
    bgColor: 'bg-cat-teams/10',
    borderColor: 'border-cat-teams/30',
  },
  FINALS: {
    key: 'FINALS',
    label: 'Finals',
    color: 'text-cat-finals',
    bgColor: 'bg-cat-finals/10',
    borderColor: 'border-cat-finals/30',
  },
};

// ============================================================
// ZOD SCHEMAS (Validation)
// ============================================================

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(24, 'Username must be 24 characters or less')
  .regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores');

export const predictionSubmitSchema = z.object({
  predictionTypeId: z.string().uuid('Invalid prediction type'),
  seasonId: z.string().uuid('Invalid season'),
  playerId: z.string().uuid('Invalid player').nullable().optional(),
  teamId: z.string().uuid('Invalid team').nullable().optional(),
  selectedValue: z.string().nullable().optional(),
}).refine(
  (data) => data.playerId || data.teamId || data.selectedValue,
  { message: 'Tenés que elegir algo, Buque.' }
);

export const lockPredictionsSchema = z.object({
  seasonId: z.string().uuid('Invalid season'),
});

export const profileUpdateSchema = z.object({
  username: usernameSchema.optional(),
  displayName: z.string().min(1).max(50).optional(),
});

// ============================================================
// PREDICTION TYPE CATALOG (static for UI)
// ============================================================

export const PREDICTION_CATALOG: Array<{
  slug: string;
  name: string;
  description: string;
  category: PredictionCategory;
  selectionType: SelectionType;
  points: number;
  sortOrder: number;
}> = [
  { slug: 'scoring_leader', name: 'Máximo Anotador', description: '¿Quién anota más puntos por partido en temporada regular?', category: 'STATS', selectionType: 'player', points: 25, sortOrder: 1 },
  { slug: 'assists_leader', name: 'Líder en Asistencias', description: 'El cerebro de la cancha. ¿Quién reparte más pases de gol?', category: 'STATS', selectionType: 'player', points: 20, sortOrder: 2 },
  { slug: 'rebounds_leader', name: 'Líder en Rebotes', description: 'Dueño de los tableros. Mayor promedio de rebotes por noche.', category: 'STATS', selectionType: 'player', points: 15, sortOrder: 3 },
  { slug: 'three_point_leader', name: 'Líder en Triples', description: 'El francotirador. ¿Quién mete más triples en la temporada?', category: 'STATS', selectionType: 'player', points: 15, sortOrder: 4 },
  { slug: 'steals_leader', name: 'Líder en Robos', description: 'Manos rápidas. ¿Quién recupera más balones de la NBA?', category: 'STATS', selectionType: 'player', points: 15, sortOrder: 5 },
  { slug: 'blocks_leader', name: 'Líder en Tapones', description: 'El protector del aro. Mayor promedio de bloqueos de la liga.', category: 'STATS', selectionType: 'player', points: 15, sortOrder: 6 },
  { slug: 'mvp', name: 'MVP de la Temporada', description: 'El galardón supremo. Trofeo Michael Jordan al más determinante.', category: 'AWARDS', selectionType: 'player', points: 40, sortOrder: 7 },
  { slug: 'dpoy', name: 'Defensor del Año', description: 'El candado defensivo. Trofeo Hakeem Olajuwon.', category: 'AWARDS', selectionType: 'player', points: 30, sortOrder: 8 },
  { slug: 'roy', name: 'Novato del Año', description: 'La joya de primer año. Trofeo Wilt Chamberlain.', category: 'AWARDS', selectionType: 'player', points: 25, sortOrder: 9 },
  { slug: 'best_record', name: 'Mejor Récord Global', description: 'Franquicia con más victorias tras los 82 partidos de regular season.', category: 'TEAMS', selectionType: 'team', points: 25, sortOrder: 10 },
  { slug: 'east_champion', name: 'Campeón del Este', description: 'Ganador de las Finales de la Conferencia Este.', category: 'TEAMS', selectionType: 'team', points: 35, sortOrder: 11 },
  { slug: 'west_champion', name: 'Campeón del Oeste', description: 'Ganador de las Finales de la Conferencia Oeste.', category: 'TEAMS', selectionType: 'team', points: 35, sortOrder: 12 },
  { slug: 'nba_champion', name: 'Campeón de la NBA', description: 'El anillo de campeón. Trofeo Larry O\'Brien en lo más alto.', category: 'FINALS', selectionType: 'team', points: 50, sortOrder: 13 },
];

export const MAX_POINTS = PREDICTION_CATALOG.reduce((sum, p) => sum + p.points, 0);
export const TOTAL_PREDICTIONS = PREDICTION_CATALOG.length;
