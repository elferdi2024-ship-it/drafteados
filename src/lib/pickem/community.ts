// filepath: src/lib/pickem/community.ts

/**
 * Porcentajes de consenso de la comunidad (Heatmap)
 * y cálculo de Underdog (x1.5 puntos para elecciones audaces con < 15% de consenso).
 */

export interface CommunityVote {
  targetId: string; // player display_name o team abbreviation
  percentage: number;
}

export const COMMUNITY_CONSENSUS: Record<string, CommunityVote[]> = {
  // 1. Máximo Anotador
  scoring_leader: [
    { targetId: 'Luka Doncic', percentage: 38 },
    { targetId: 'Shai Gilgeous-Alexander', percentage: 24 },
    { targetId: 'Giannis Antetokounmpo', percentage: 16 },
    { targetId: 'Joel Embiid', percentage: 11 },
    { targetId: 'Anthony Edwards', percentage: 6 },
    { targetId: 'Jayson Tatum', percentage: 5 },
  ],
  // 2. Asistencias
  assists_leader: [
    { targetId: 'Tyrese Haliburton', percentage: 41 },
    { targetId: 'Trae Young', percentage: 26 },
    { targetId: 'Luka Doncic', percentage: 18 },
    { targetId: 'Nikola Jokic', percentage: 10 },
    { targetId: 'Chris Paul', percentage: 5 },
  ],
  // 3. Rebotes
  rebounds_leader: [
    { targetId: 'Domantas Sabonis', percentage: 44 },
    { targetId: 'Nikola Jokic', percentage: 22 },
    { targetId: 'Rudy Gobert', percentage: 15 },
    { targetId: 'Anthony Davis', percentage: 12 },
    { targetId: 'Victor Wembanyama', percentage: 7 },
  ],
  // 4. Triples
  three_point_leader: [
    { targetId: 'Stephen Curry', percentage: 52 },
    { targetId: 'Buddy Hield', percentage: 17 },
    { targetId: 'Luka Doncic', percentage: 14 },
    { targetId: 'Donovan Mitchell', percentage: 10 },
    { targetId: 'Klay Thompson', percentage: 7 },
  ],
  // 5. Robos
  steals_leader: [
    { targetId: 'De\'Aaron Fox', percentage: 31 },
    { targetId: 'Shai Gilgeous-Alexander', percentage: 29 },
    { targetId: 'Alex Caruso', percentage: 18 },
    { targetId: 'Dyson Daniels', percentage: 14 },
    { targetId: 'Herbert Jones', percentage: 8 },
  ],
  // 6. Tapones
  blocks_leader: [
    { targetId: 'Victor Wembanyama', percentage: 68 },
    { targetId: 'Walker Kessler', percentage: 14 },
    { targetId: 'Chet Holmgren', percentage: 10 },
    { targetId: 'Anthony Davis', percentage: 5 },
    { targetId: 'Brook Lopez', percentage: 3 },
  ],
  // 7. MVP
  mvp: [
    { targetId: 'Luka Doncic', percentage: 36 },
    { targetId: 'Nikola Jokic', percentage: 28 },
    { targetId: 'Shai Gilgeous-Alexander', percentage: 19 },
    { targetId: 'Jayson Tatum', percentage: 11 },
    { targetId: 'Giannis Antetokounmpo', percentage: 6 },
  ],
  // 8. DPOY
  dpoy: [
    { targetId: 'Victor Wembanyama', percentage: 58 },
    { targetId: 'Rudy Gobert', percentage: 19 },
    { targetId: 'Bam Adebayo', percentage: 13 },
    { targetId: 'Anthony Davis', percentage: 7 },
    { targetId: 'Jrue Holiday', percentage: 3 },
  ],
  // 9. ROY
  roy: [
    { targetId: 'Reed Sheppard', percentage: 33 },
    { targetId: 'Zaccharie Risacher', percentage: 24 },
    { targetId: 'Stephon Castle', percentage: 19 },
    { targetId: 'Zach Edey', percentage: 14 },
    { targetId: 'Alex Sarr', percentage: 10 },
  ],
  // 10. Mejor Récord
  best_record: [
    { targetId: 'BOS', percentage: 48 },
    { targetId: 'OKC', percentage: 27 },
    { targetId: 'NYK', percentage: 12 },
    { targetId: 'DEN', percentage: 8 },
    { targetId: 'DAL', percentage: 5 },
  ],
  // 11. Campeón Este
  east_champion: [
    { targetId: 'BOS', percentage: 56 },
    { targetId: 'NYK', percentage: 24 },
    { targetId: 'PHI', percentage: 11 },
    { targetId: 'MIL', percentage: 6 },
    { targetId: 'IND', percentage: 3 },
  ],
  // 12. Campeón Oeste
  west_champion: [
    { targetId: 'OKC', percentage: 34 },
    { targetId: 'DAL', percentage: 29 },
    { targetId: 'DEN', percentage: 21 },
    { targetId: 'MIN', percentage: 10 },
    { targetId: 'PHO', percentage: 6 },
  ],
  // 13. Campeón NBA
  nba_champion: [
    { targetId: 'BOS', percentage: 44 },
    { targetId: 'OKC', percentage: 22 },
    { targetId: 'DAL', percentage: 16 },
    { targetId: 'NYK', percentage: 11 },
    { targetId: 'DEN', percentage: 7 },
  ],
};

/**
 * Obtiene el porcentaje de votos de la comunidad para un jugador o franquicia.
 */
export function getCommunityPercentage(categorySlug: string, identifier: string): number {
  const votes = COMMUNITY_CONSENSUS[categorySlug];
  if (!votes) return 5;
  const match = votes.find((v) => v.targetId.toLowerCase() === identifier.toLowerCase());
  return match ? match.percentage : 4; // Si no está en el top, tiene un ~4% (Underdog garantizado)
}

/**
 * Determina si una selección califica como Underdog (< 15% de consenso).
 */
export function isUnderdogPick(categorySlug: string, identifier: string): boolean {
  return getCommunityPercentage(categorySlug, identifier) < 15;
}

/**
 * Calcula los puntos potenciales totales considerando el multiplicador 1.5x de Underdog.
 */
export function calculatePotentialPoints(
  basePoints: number,
  isUnderdog: boolean
): number {
  return isUnderdog ? Math.round(basePoints * 1.5) : basePoints;
}
