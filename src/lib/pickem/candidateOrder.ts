// filepath: src/lib/pickem/candidateOrder.ts
/**
 * DRAFTEADOS PICK'EM — ORDEN DE RELEVANCIA Y NOVICIOS POR CATEGORÍA
 * Temporada oficial: 2026/27
 * Clase novatos oficial: 2026 NBA Draft (Dybantsa, Peterson, Boozer, Wilson, Wagler...)
 */

export interface RookieOption {
  id: string;
  displayName: string;
  position: string;
  jerseyNumber: string;
  team: {
    id: string;
    name: string;
    abbreviation: string;
    primaryColor: string;
  };
}

// 1. Novatos oficiales 2026/27 elegibles para ROY (Draft NBA 2026)
export const OFFICIAL_ROOKIES: string[] = [
  "Darryn Peterson",
  "Cameron Boozer",
  "AJ Dybantsa",
  "Caleb Wilson",
  "Keaton Wagler",
  "Darius Acuff Jr.",
  "Mikel Brown Jr.",
  "Brayden Burries",
  "Yaxel Lendeborg",
  "Cayden Boozer",
  "Koa Peat",
  "Bryson Tiller",
  "Jalen Haralson",
  "Isiah Harwell",
  "Meleek Thomas",
  "Chris Cenac Jr.",
  "Tounde Yessoufou",
  "Neoklis Avdalas",
  "Ben Saraf",
  "Hannes Steinbach",
  "Nolan Traore",
  "Hugo Gonzalez",
  "Egor Demin",
  "Rocco Zikarsky",
  "Kasparas Jakucionis",
  "Collin Murray-Boyles",
  "Noa Essengue",
  "Kon Knueppel",
  "Liam McNeeley",
  "Derik Queen",
];

// 2. Opciones de novatos 2026/27 con datos de equipo para fallback offline/inmediato
export const ROOKIE_PLAYER_OPTIONS: RookieOption[] = [
  {
    id: "rookie-peterson-2026",
    displayName: "Darryn Peterson",
    position: "Guard",
    jerseyNumber: "1",
    team: { id: "uta", name: "Utah Jazz", abbreviation: "UTA", primaryColor: "#002B5C" },
  },
  {
    id: "rookie-boozer-2026",
    displayName: "Cameron Boozer",
    position: "Big",
    jerseyNumber: "12",
    team: { id: "mem", name: "Memphis Grizzlies", abbreviation: "MEM", primaryColor: "#5D76A9" },
  },
  {
    id: "rookie-dybantsa-2026",
    displayName: "AJ Dybantsa",
    position: "Wing",
    jerseyNumber: "3",
    team: { id: "was", name: "Washington Wizards", abbreviation: "WAS", primaryColor: "#002B5C" },
  },
  {
    id: "rookie-wilson-2026",
    displayName: "Caleb Wilson",
    position: "Wing",
    jerseyNumber: "8",
    team: { id: "chi", name: "Chicago Bulls", abbreviation: "CHI", primaryColor: "#CE1141" },
  },
  {
    id: "rookie-wagler-2026",
    displayName: "Keaton Wagler",
    position: "Guard",
    jerseyNumber: "5",
    team: { id: "lac", name: "LA Clippers", abbreviation: "LAC", primaryColor: "#C8102E" },
  },
  {
    id: "rookie-acuff-2026",
    displayName: "Darius Acuff Jr.",
    position: "Guard",
    jerseyNumber: "0",
    team: { id: "det", name: "Detroit Pistons", abbreviation: "DET", primaryColor: "#1D42BA" },
  },
  {
    id: "rookie-brown-2026",
    displayName: "Mikel Brown Jr.",
    position: "Guard",
    jerseyNumber: "2",
    team: { id: "bkn", name: "Brooklyn Nets", abbreviation: "BKN", primaryColor: "#000000" },
  },
  {
    id: "rookie-burries-2026",
    displayName: "Brayden Burries",
    position: "Guard",
    jerseyNumber: "11",
    team: { id: "por", name: "Portland Trail Blazers", abbreviation: "POR", primaryColor: "#E03A3E" },
  },
  {
    id: "rookie-lendeborg-2026",
    displayName: "Yaxel Lendeborg",
    position: "Big",
    jerseyNumber: "21",
    team: { id: "sas", name: "San Antonio Spurs", abbreviation: "SAS", primaryColor: "#C4CED4" },
  },
  {
    id: "rookie-cboozer-2026",
    displayName: "Cayden Boozer",
    position: "Guard",
    jerseyNumber: "4",
    team: { id: "mia", name: "Miami Heat", abbreviation: "MIA", primaryColor: "#98002E" },
  },
  {
    id: "rookie-peat-2026",
    displayName: "Koa Peat",
    position: "Wing",
    jerseyNumber: "14",
    team: { id: "tor", name: "Toronto Raptors", abbreviation: "TOR", primaryColor: "#CE1141" },
  },
  {
    id: "rookie-tiller-2026",
    displayName: "Bryson Tiller",
    position: "Wing",
    jerseyNumber: "7",
    team: { id: "cha", name: "Charlotte Hornets", abbreviation: "CHA", primaryColor: "#1D1160" },
  },
  {
    id: "rookie-haralson-2026",
    displayName: "Jalen Haralson",
    position: "Wing",
    jerseyNumber: "10",
    team: { id: "ind", name: "Indiana Pacers", abbreviation: "IND", primaryColor: "#002D62" },
  },
  {
    id: "rookie-harwell-2026",
    displayName: "Isiah Harwell",
    position: "Guard",
    jerseyNumber: "6",
    team: { id: "orl", name: "Orlando Magic", abbreviation: "ORL", primaryColor: "#0077C0" },
  },
  {
    id: "rookie-thomas-2026",
    displayName: "Meleek Thomas",
    position: "Guard",
    jerseyNumber: "13",
    team: { id: "hou", name: "Houston Rockets", abbreviation: "HOU", primaryColor: "#CE1141" },
  },
];

// 3. Ranking oficial de candidatos prioritarios por categoría (basado en temporada anterior)
export const CATEGORY_PRIORITY_ORDER: Record<string, string[]> = {
  // 1. Máximo Anotador
  scoring_leader: [
    "Luka Dončić",
    "Luka Doncic",
    "Giannis Antetokounmpo",
    "Shai Gilgeous-Alexander",
    "Joel Embiid",
    "Jalen Brunson",
    "Kevin Durant",
    "Devin Booker",
    "Jayson Tatum",
    "De'Aaron Fox",
    "Stephen Curry",
    "Anthony Edwards",
    "Donovan Mitchell",
    "Nikola Jokić",
    "Nikola Jokic",
    "Damian Lillard",
    "Anthony Davis",
    "LeBron James",
    "Trae Young",
    "Kyrie Irving",
    "Tyrese Maxey",
    "Zion Williamson",
    "Ja Morant",
    "Paolo Banchero",
    "Victor Wembanyama",
    "DeMar DeRozan",
    "LaMelo Ball",
  ],

  // 2. Líder en Asistencias
  assists_leader: [
    "Tyrese Haliburton",
    "Trae Young",
    "Luka Dončić",
    "Luka Doncic",
    "Nikola Jokić",
    "Nikola Jokic",
    "James Harden",
    "LeBron James",
    "Domantas Sabonis",
    "Fred VanVleet",
    "Chris Paul",
    "Damian Lillard",
    "Jalen Brunson",
    "Shai Gilgeous-Alexander",
    "Ja Morant",
    "LaMelo Ball",
    "Cade Cunningham",
    "Darius Garland",
    "Russell Westbrook",
    "D'Angelo Russell",
  ],

  // 3. Líder en Rebotes
  rebounds_leader: [
    "Domantas Sabonis",
    "Rudy Gobert",
    "Anthony Davis",
    "Nikola Jokić",
    "Nikola Jokic",
    "Giannis Antetokounmpo",
    "Victor Wembanyama",
    "Bam Adebayo",
    "Clint Capela",
    "Jarrett Allen",
    "Jalen Duren",
    "Jusuf Nurkić",
    "Karl-Anthony Towns",
    "Joel Embiid",
    "Chet Holmgren",
    "Alperen Şengün",
    "Ivica Zubac",
    "Deandre Ayton",
    "Jonas Valančiūnas",
  ],

  // 4. Líder en Triples
  three_point_leader: [
    "Stephen Curry",
    "Luka Dončić",
    "Luka Doncic",
    "Donte DiVincenzo",
    "Klay Thompson",
    "Paul George",
    "Coby White",
    "Bogdan Bogdanović",
    "Damian Lillard",
    "Donovan Mitchell",
    "Anthony Edwards",
    "Jayson Tatum",
    "Buddy Hield",
    "LaMelo Ball",
    "Trae Young",
    "CJ McCollum",
    "Anfernee Simons",
    "Malik Beasley",
    "Duncan Robinson",
  ],

  // 5. Líder en Robos
  steals_leader: [
    "De'Aaron Fox",
    "Shai Gilgeous-Alexander",
    "Alex Caruso",
    "Herbert Jones",
    "Dyson Daniels",
    "Kawhi Leonard",
    "Donovan Mitchell",
    "Anthony Edwards",
    "Paul George",
    "Luka Dončić",
    "Luka Doncic",
    "Nikola Jokić",
    "Nikola Jokic",
    "Marcus Smart",
    "OG Anunoby",
    "Jimmy Butler",
    "Gary Trent Jr.",
    "Matisse Thybulle",
  ],

  // 6. Líder en Tapones
  blocks_leader: [
    "Victor Wembanyama",
    "Walker Kessler",
    "Brook Lopez",
    "Anthony Davis",
    "Chet Holmgren",
    "Daniel Gafford",
    "Rudy Gobert",
    "Myles Turner",
    "Nic Claxton",
    "Jaren Jackson Jr.",
    "Bam Adebayo",
    "Kristaps Porziņģis",
    "Derrick White",
    "Jarrett Allen",
    "Dereck Lively II",
  ],

  // 7. MVP de la Temporada
  mvp: [
    "Nikola Jokić",
    "Nikola Jokic",
    "Luka Dončić",
    "Luka Doncic",
    "Shai Gilgeous-Alexander",
    "Giannis Antetokounmpo",
    "Jayson Tatum",
    "Anthony Edwards",
    "Joel Embiid",
    "Jalen Brunson",
    "Kevin Durant",
    "Stephen Curry",
    "LeBron James",
    "Anthony Davis",
    "Devin Booker",
    "Donovan Mitchell",
    "Victor Wembanyama",
    "Ja Morant",
    "Tyrese Haliburton",
    "Jimmy Butler",
  ],

  // 8. Defensor del Año (DPOY)
  dpoy: [
    "Victor Wembanyama",
    "Rudy Gobert",
    "Bam Adebayo",
    "Anthony Davis",
    "Jrue Holiday",
    "Herbert Jones",
    "Chet Holmgren",
    "Jaren Jackson Jr.",
    "OG Anunoby",
    "Derrick White",
    "Alex Caruso",
    "Lu Dort",
    "Giannis Antetokounmpo",
    "Evan Mobley",
    "Marcus Smart",
    "Draymond Green",
    "Jarrett Allen",
    "Jaden McDaniels",
  ],

  // 9. Novato del Año (ROY 2026/27)
  roy: OFFICIAL_ROOKIES,

  // Franquicias prioritarias para títulos y mejor récord
  teams_priority: [
    "BOS", // Boston Celtics
    "OKC", // Oklahoma City Thunder
    "DEN", // Denver Nuggets
    "MIN", // Minnesota Timberwolves
    "DAL", // Dallas Mavericks
    "NYK", // New York Knicks
    "MIL", // Milwaukee Bucks
    "CLE", // Cleveland Cavaliers
    "PHI", // Philadelphia 76ers
    "PHX", // Phoenix Suns
    "IND", // Indiana Pacers
    "LAL", // Los Angeles Lakers
    "ORL", // Orlando Magic
    "SAC", // Sacramento Kings
    "GSW", // Golden State Warriors
    "MIA", // Miami Heat
    "NOP", // New Orleans Pelicans
    "HOU", // Houston Rockets
    "MEM", // Memphis Grizzlies
    "SAS", // San Antonio Spurs
    "LAC", // Los Angeles Clippers
  ],
};

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Ordena y filtra jugadores según la categoría:
 * - Para 'roy': Filtra estrictamente a novatos oficiales 2026/27.
 * - Para el resto: Mantiene a todos los jugadores pero sitúa en la cima a los líderes
 *   reales de la temporada anterior.
 */
export function sortPlayersForCategory<T extends { displayName: string }>(
  players: T[],
  categorySlug: string
): T[] {
  const isRoy = categorySlug === "roy";
  const priorityList = CATEGORY_PRIORITY_ORDER[categorySlug] || [];
  const normalizedPriority = priorityList.map(normalizeName);
  const normalizedRookies = OFFICIAL_ROOKIES.map(normalizeName);

  if (isRoy) {
    // Filtrar estrictamente solo novatos legítimos de la clase 2026/27
    const rookiesOnly = players.filter((p) => {
      const norm = normalizeName(p.displayName);
      return normalizedRookies.some((r) => norm.includes(r) || r.includes(norm));
    });

    return [...rookiesOnly].sort((a, b) => {
      const normA = normalizeName(a.displayName);
      const normB = normalizeName(b.displayName);
      const indexA = normalizedPriority.findIndex((p) => normA.includes(p) || p.includes(normA));
      const indexB = normalizedPriority.findIndex((p) => normB.includes(p) || p.includes(normB));

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.displayName.localeCompare(b.displayName);
    });
  }

  // Resto de categorías: todos los jugadores disponibles pero con los líderes arriba
  return [...players].sort((a, b) => {
    const normA = normalizeName(a.displayName);
    const normB = normalizeName(b.displayName);

    const indexA = normalizedPriority.findIndex((p) => normA.includes(p) || p.includes(normA));
    const indexB = normalizedPriority.findIndex((p) => normB.includes(p) || p.includes(normB));

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    return a.displayName.localeCompare(b.displayName);
  });
}

/**
 * Ordena las franquicias dando prioridad a los contendientes principales
 */
export function sortTeamsForCategory<T extends { abbreviation: string; name: string }>(
  teams: T[],
  _categorySlug?: string
): T[] {
  const priority = CATEGORY_PRIORITY_ORDER.teams_priority;

  return [...teams].sort((a, b) => {
    const indexA = priority.indexOf(a.abbreviation);
    const indexB = priority.indexOf(b.abbreviation);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    return a.name.localeCompare(b.name);
  });
}
