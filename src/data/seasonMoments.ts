// filepath: src/data/seasonMoments.ts

export interface SeasonMoment {
  id: string;
  title: string;
  subtitle: string;
  dateStr: string;
  approximateDate: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  badge: string;
  summary: string;
  buquesCallout: string;
  categoriesInPlay: string[];
}

export const SEASON_MOMENTS_2026: SeasonMoment[] = [
  {
    id: 'lock_opening_night',
    title: 'Cierre de Boleta & Noche Inaugural',
    subtitle: 'El momento de la verdad',
    dateStr: '2026-10-22',
    approximateDate: 'Octubre 2026',
    status: 'ACTIVE',
    badge: 'LOCK TOTAL',
    summary: 'Se cierran las predicciones de forma definitiva al pitar el primer balón al aire. Nadie más puede tocar su boleta.',
    buquesCallout: 'A partir de acá, bancátela con los Buques. Cada punto en el ranking se disputa posesión a posesión.',
    categoriesInPlay: ['scoring_leader', 'assists_leader', 'rebounds_leader', 'three_point_leader', 'steals_leader', 'blocks_leader', 'mvp', 'dpoy', 'roy', 'best_record', 'east_champion', 'west_champion', 'nba_champion'],
  },
  {
    id: 'all_star_checkpoint',
    title: 'Recap de Mitad de Temporada (All-Star)',
    subtitle: 'Primer balance oficial',
    dateStr: '2027-02-14',
    approximateDate: 'Febrero 2027',
    status: 'UPCOMING',
    badge: 'ALL-STAR BREAK',
    summary: 'Revisión del top de la tabla de posiciones con el 50% de la temporada disputada. ¿Quiénes sostienen el ritmo?',
    buquesCallout: 'Si tus underdogs están dando la sorpresa, es hora de fildear el ranking y mandar capturas al grupo.',
    categoriesInPlay: ['mvp', 'scoring_leader', 'blocks_leader'],
  },
  {
    id: 'trade_deadline_shakeup',
    title: 'Trade Deadline & Recta Final',
    subtitle: 'El sacudón del mercado',
    dateStr: '2027-02-05',
    approximateDate: 'Febrero 2027',
    status: 'UPCOMING',
    badge: 'TRADE DEADLINE',
    summary: 'Los traspasos sacuden rotaciones y candidaturas de equipos y máximos anotadores para la recta final.',
    buquesCallout: 'El análisis caliente de Drafteados sobre cómo los canjes impactan tus boletas selladas.',
    categoriesInPlay: ['east_champion', 'west_champion', 'best_record'],
  },
  {
    id: 'regular_season_finale',
    title: 'Cierre de Temporada Regular',
    subtitle: 'Resolución de 8 categorías',
    dateStr: '2027-04-12',
    approximateDate: 'Abril 2027',
    status: 'UPCOMING',
    badge: 'PREMIOS & STATS',
    summary: 'Fin de la fase regular. Se definen automáticamente las 6 coronas estadísticas y los líderes individuales.',
    buquesCallout: 'El momento del gran salto en la clasificación. Solo quedan en juego los Playoffs y el anillo.',
    categoriesInPlay: ['scoring_leader', 'assists_leader', 'rebounds_leader', 'three_point_leader', 'steals_leader', 'blocks_leader', 'best_record'],
  },
  {
    id: 'nba_finals_crowning',
    title: 'Finales NBA & Coronación de los Buques',
    subtitle: 'La gloria máxima',
    dateStr: '2027-06-20',
    approximateDate: 'Junio 2027',
    status: 'UPCOMING',
    badge: 'EL ANILLO',
    summary: 'Se define el Campeón NBA y se corona al número 1 absoluto del ranking global de Drafteados.',
    buquesCallout: 'El Buque campeón de la temporada se lleva la gloria eterna y el reconocimiento de toda la comunidad.',
    categoriesInPlay: ['nba_champion', 'east_champion', 'west_champion'],
  },
];

export function getSeasonMoments(): SeasonMoment[] {
  return SEASON_MOMENTS_2026;
}

export function getCurrentMoment(): SeasonMoment {
  return SEASON_MOMENTS_2026.find((m) => m.status === 'ACTIVE') || SEASON_MOMENTS_2026[0];
}