// filepath: src/lib/data/basketball/mock-data.ts
/**
 * DRAFTEADOS NBA HUB — MOCK DATA
 * Usar para desarrollo offline y como fallback.
 * Temporada de referencia: 2026/27
 */

import type { Team, Game, Standing, LeaderLine, Player } from "./types";

// ------------------------------------------------------------
// TEAMS (30)
// ------------------------------------------------------------

export const MOCK_TEAMS: Team[] = [
  // East - Atlantic
  { id: "1", name: "Boston Celtics", abbreviation: "BOS", city: "Boston", conference: "East", division: "Atlantic", slug: "celtics", primaryColor: "#007A33" },
  { id: "2", name: "Brooklyn Nets", abbreviation: "BKN", city: "Brooklyn", conference: "East", division: "Atlantic", slug: "nets", primaryColor: "#000000" },
  { id: "3", name: "New York Knicks", abbreviation: "NYK", city: "New York", conference: "East", division: "Atlantic", slug: "knicks", primaryColor: "#006BB6" },
  { id: "4", name: "Philadelphia 76ers", abbreviation: "PHI", city: "Philadelphia", conference: "East", division: "Atlantic", slug: "sixers", primaryColor: "#006BB6" },
  { id: "5", name: "Toronto Raptors", abbreviation: "TOR", city: "Toronto", conference: "East", division: "Atlantic", slug: "raptors", primaryColor: "#CE1141" },
  // East - Central
  { id: "6", name: "Chicago Bulls", abbreviation: "CHI", city: "Chicago", conference: "East", division: "Central", slug: "bulls", primaryColor: "#CE1141" },
  { id: "7", name: "Cleveland Cavaliers", abbreviation: "CLE", city: "Cleveland", conference: "East", division: "Central", slug: "cavaliers", primaryColor: "#860038" },
  { id: "8", name: "Detroit Pistons", abbreviation: "DET", city: "Detroit", conference: "East", division: "Central", slug: "pistons", primaryColor: "#C8102E" },
  { id: "9", name: "Indiana Pacers", abbreviation: "IND", city: "Indiana", conference: "East", division: "Central", slug: "pacers", primaryColor: "#002D62" },
  { id: "10", name: "Milwaukee Bucks", abbreviation: "MIL", city: "Milwaukee", conference: "East", division: "Central", slug: "bucks", primaryColor: "#00471B" },
  // East - Southeast
  { id: "11", name: "Atlanta Hawks", abbreviation: "ATL", city: "Atlanta", conference: "East", division: "Southeast", slug: "hawks", primaryColor: "#E03A3E" },
  { id: "12", name: "Charlotte Hornets", abbreviation: "CHA", city: "Charlotte", conference: "East", division: "Southeast", slug: "hornets", primaryColor: "#1D1160" },
  { id: "13", name: "Miami Heat", abbreviation: "MIA", city: "Miami", conference: "East", division: "Southeast", slug: "heat", primaryColor: "#98002E" },
  { id: "14", name: "Orlando Magic", abbreviation: "ORL", city: "Orlando", conference: "East", division: "Southeast", slug: "magic", primaryColor: "#0077C0" },
  { id: "15", name: "Washington Wizards", abbreviation: "WAS", city: "Washington", conference: "East", division: "Southeast", slug: "wizards", primaryColor: "#002B5C" },
  // West - Northwest
  { id: "16", name: "Denver Nuggets", abbreviation: "DEN", city: "Denver", conference: "West", division: "Northwest", slug: "nuggets", primaryColor: "#0E2240" },
  { id: "17", name: "Minnesota Timberwolves", abbreviation: "MIN", city: "Minnesota", conference: "West", division: "Northwest", slug: "timberwolves", primaryColor: "#0C2340" },
  { id: "18", name: "Oklahoma City Thunder", abbreviation: "OKC", city: "Oklahoma City", conference: "West", division: "Northwest", slug: "thunder", primaryColor: "#007AC1" },
  { id: "19", name: "Portland Trail Blazers", abbreviation: "POR", city: "Portland", conference: "West", division: "Northwest", slug: "blazers", primaryColor: "#E03A3E" },
  { id: "20", name: "Utah Jazz", abbreviation: "UTA", city: "Utah", conference: "West", division: "Northwest", slug: "jazz", primaryColor: "#002B5C" },
  // West - Pacific
  { id: "21", name: "Golden State Warriors", abbreviation: "GSW", city: "Golden State", conference: "West", division: "Pacific", slug: "warriors", primaryColor: "#1D428A" },
  { id: "22", name: "Los Angeles Clippers", abbreviation: "LAC", city: "Los Angeles", conference: "West", division: "Pacific", slug: "clippers", primaryColor: "#C8102E" },
  { id: "23", name: "Los Angeles Lakers", abbreviation: "LAL", city: "Los Angeles", conference: "West", division: "Pacific", slug: "lakers", primaryColor: "#552583" },
  { id: "24", name: "Phoenix Suns", abbreviation: "PHX", city: "Phoenix", conference: "West", division: "Pacific", slug: "suns", primaryColor: "#1D1160" },
  { id: "25", name: "Sacramento Kings", abbreviation: "SAC", city: "Sacramento", conference: "West", division: "Pacific", slug: "kings", primaryColor: "#5A2D81" },
  // West - Southwest
  { id: "26", name: "Dallas Mavericks", abbreviation: "DAL", city: "Dallas", conference: "West", division: "Southwest", slug: "mavericks", primaryColor: "#00538C" },
  { id: "27", name: "Houston Rockets", abbreviation: "HOU", city: "Houston", conference: "West", division: "Southwest", slug: "rockets", primaryColor: "#CE1141" },
  { id: "28", name: "Memphis Grizzlies", abbreviation: "MEM", city: "Memphis", conference: "West", division: "Southwest", slug: "grizzlies", primaryColor: "#5D76A9" },
  { id: "29", name: "New Orleans Pelicans", abbreviation: "NOP", city: "New Orleans", conference: "West", division: "Southwest", slug: "pelicans", primaryColor: "#0C2340" },
  { id: "30", name: "San Antonio Spurs", abbreviation: "SAS", city: "San Antonio", conference: "West", division: "Southwest", slug: "spurs", primaryColor: "#C4CED4" },
];

// ------------------------------------------------------------
// PLAYERS (sample — expand as needed)
// ------------------------------------------------------------

export const MOCK_PLAYERS: Player[] = [
  { id: "p1", firstName: "Luka", lastName: "Dončić", fullName: "Luka Dončić", teamId: "26", position: "PG" },
  { id: "p2", firstName: "Shai", lastName: "Gilgeous-Alexander", fullName: "Shai Gilgeous-Alexander", teamId: "18", position: "PG" },
  { id: "p3", firstName: "Nikola", lastName: "Jokić", fullName: "Nikola Jokić", teamId: "16", position: "C" },
  { id: "p4", firstName: "Jayson", lastName: "Tatum", fullName: "Jayson Tatum", teamId: "1", position: "SF" },
  { id: "p5", firstName: "Giannis", lastName: "Antetokounmpo", fullName: "Giannis Antetokounmpo", teamId: "10", position: "PF" },
  { id: "p6", firstName: "Anthony", lastName: "Edwards", fullName: "Anthony Edwards", teamId: "17", position: "SG" },
  { id: "p7", firstName: "Victor", lastName: "Wembanyama", fullName: "Victor Wembanyama", teamId: "30", position: "C" },
  { id: "p8", firstName: "Stephen", lastName: "Curry", fullName: "Stephen Curry", teamId: "21", position: "PG" },
  { id: "p9", firstName: "Tyrese", lastName: "Haliburton", fullName: "Tyrese Haliburton", teamId: "9", position: "PG" },
  { id: "p10", firstName: "Domantas", lastName: "Sabonis", fullName: "Domantas Sabonis", teamId: "25", position: "C" },
  { id: "p11", firstName: "Bam", lastName: "Adebayo", fullName: "Bam Adebayo", teamId: "13", position: "C" },
  { id: "p12", firstName: "Jalen", lastName: "Brunson", fullName: "Jalen Brunson", teamId: "3", position: "PG" },
];

// ------------------------------------------------------------
// SCOREBOARD (sample day)
// ------------------------------------------------------------

const getTeam = (abbr: string) => MOCK_TEAMS.find((t) => t.abbreviation === abbr)!;

export const MOCK_SCOREBOARD: Game[] = [
  {
    id: "g-20261020-bos-nyk",
    date: "2026-10-20T23:30:00Z", // 01:30h peninsular española (21 Oct) / 19:30 ET
    status: "scheduled",
    homeTeam: getTeam("BOS"),
    awayTeam: getTeam("NYK"),
    arena: "TD Garden (Boston) · Ceremonia del Anillo",
  },
  {
    id: "g-20261020-lal-min",
    date: "2026-10-21T02:00:00Z", // 04:00h peninsular española (21 Oct) / 22:00 ET
    status: "scheduled",
    homeTeam: getTeam("LAL"),
    awayTeam: getTeam("MIN"),
    arena: "Crypto.com Arena (Los Angeles)",
  },
  {
    id: "g-20261021-phi-mil",
    date: "2026-10-21T23:00:00Z", // 01:00h peninsular española (22 Oct) / 19:00 ET
    status: "scheduled",
    homeTeam: getTeam("PHI"),
    awayTeam: getTeam("MIL"),
    arena: "Wells Fargo Center (Philadelphia)",
  },
  {
    id: "g-20261021-mia-ind",
    date: "2026-10-21T23:30:00Z", // 01:30h peninsular española (22 Oct) / 19:30 ET
    status: "scheduled",
    homeTeam: getTeam("MIA"),
    awayTeam: getTeam("IND"),
    arena: "Kaseya Center (Miami)",
  },
  {
    id: "g-20261021-dal-gsw",
    date: "2026-10-22T01:30:00Z", // 03:30h peninsular española (22 Oct) / 21:30 ET
    status: "scheduled",
    homeTeam: getTeam("DAL"),
    awayTeam: getTeam("GSW"),
    arena: "American Airlines Center (Dallas)",
  },
  {
    id: "g-20261021-okc-den",
    date: "2026-10-22T02:00:00Z", // 04:00h peninsular española (22 Oct) / 22:00 ET
    status: "scheduled",
    homeTeam: getTeam("OKC"),
    awayTeam: getTeam("DEN"),
    arena: "Paycom Center (Oklahoma City)",
  },
  {
    id: "g-20261022-lac-phx",
    date: "2026-10-23T02:30:00Z", // 04:30h peninsular española (23 Oct) / 22:30 ET
    status: "scheduled",
    homeTeam: getTeam("LAC"),
    awayTeam: getTeam("PHX"),
    arena: "Intuit Dome (Inglewood)",
  },
  {
    id: "g-20261023-cle-chi",
    date: "2026-10-23T23:30:00Z", // 01:30h peninsular española (24 Oct) / 19:30 ET
    status: "scheduled",
    homeTeam: getTeam("CLE"),
    awayTeam: getTeam("CHI"),
    arena: "Rocket Mortgage FieldHouse (Cleveland)",
  },
];

// ------------------------------------------------------------
// STANDINGS (simplified)
// ------------------------------------------------------------

function makeStanding(abbr: string, wins: number, losses: number, rank: number, streak: string): Standing {
  const t = getTeam(abbr);
  return {
    team: t,
    wins,
    losses,
    winPct: Number((wins / (wins + losses)).toFixed(3)),
    conferenceRank: rank,
    gamesBack: rank === 1 ? 0 : undefined,
    streak,
  };
}

export const MOCK_STANDINGS = {
  east: [
    makeStanding("BOS", 12, 3, 1, "W4"),
    makeStanding("NYK", 11, 4, 2, "W2"),
    makeStanding("CLE", 10, 5, 3, "L1"),
    makeStanding("MIL", 9, 6, 4, "W1"),
    makeStanding("ORL", 9, 6, 5, "W3"),
    makeStanding("MIA", 8, 7, 6, "L2"),
    makeStanding("IND", 7, 8, 7, "W1"),
    makeStanding("PHI", 7, 8, 8, "L1"),
    makeStanding("ATL", 6, 9, 9, "L3"),
    makeStanding("CHI", 5, 10, 10, "W1"),
    makeStanding("DET", 5, 10, 11, "L2"),
    makeStanding("BKN", 4, 11, 12, "L4"),
    makeStanding("CHA", 3, 12, 13, "L1"),
    makeStanding("TOR", 3, 12, 14, "L5"),
    makeStanding("WAS", 2, 13, 15, "L8"),
  ],
  west: [
    makeStanding("OKC", 13, 2, 1, "W6"),
    makeStanding("DEN", 11, 4, 2, "W3"),
    makeStanding("MIN", 10, 5, 3, "W1"),
    makeStanding("DAL", 10, 5, 4, "L1"),
    makeStanding("PHX", 9, 6, 5, "W2"),
    makeStanding("GSW", 8, 7, 6, "L1"),
    makeStanding("LAL", 8, 7, 7, "W1"),
    makeStanding("SAC", 7, 8, 8, "L2"),
    makeStanding("LAC", 7, 8, 9, "W1"),
    makeStanding("NOP", 6, 9, 10, "L1"),
    makeStanding("HOU", 6, 9, 11, "W2"),
    makeStanding("MEM", 5, 10, 12, "L3"),
    makeStanding("POR", 4, 11, 13, "L2"),
    makeStanding("UTA", 3, 12, 14, "L4"),
    makeStanding("SAS", 3, 12, 15, "L1"),
  ],
};

// ------------------------------------------------------------
// LEADERS
// ------------------------------------------------------------

function makeLeader(playerId: string, stat: LeaderLine["stat"], value: number, rank: number): LeaderLine {
  const player = MOCK_PLAYERS.find((p) => p.id === playerId)!;
  const teamObj = MOCK_TEAMS.find((t) => t.id === player.teamId)!;
  return { player, team: teamObj, value, rank, stat };
}

export const MOCK_LEADERS: Record<string, LeaderLine[]> = {
  pts: [
    makeLeader("p1", "pts", 32.4, 1),
    makeLeader("p2", "pts", 31.1, 2),
    makeLeader("p4", "pts", 28.7, 3),
    makeLeader("p6", "pts", 27.9, 4),
    makeLeader("p5", "pts", 27.2, 5),
    makeLeader("p12", "pts", 26.8, 6),
    makeLeader("p3", "pts", 26.1, 7),
    makeLeader("p8", "pts", 25.4, 8),
  ],
  ast: [
    makeLeader("p9", "ast", 11.2, 1),
    makeLeader("p1", "ast", 9.8, 2),
    makeLeader("p3", "ast", 9.1, 3),
    makeLeader("p2", "ast", 6.4, 4),
    makeLeader("p12", "ast", 6.1, 5),
  ],
  reb: [
    makeLeader("p10", "reb", 13.4, 1),
    makeLeader("p3", "reb", 12.8, 2),
    makeLeader("p5", "reb", 11.1, 3),
    makeLeader("p7", "reb", 10.9, 4),
    makeLeader("p11", "reb", 10.2, 5),
  ],
  blk: [
    makeLeader("p7", "blk", 3.8, 1),
    makeLeader("p11", "blk", 1.9, 2),
    makeLeader("p5", "blk", 1.4, 3),
  ],
  stl: [
    makeLeader("p2", "stl", 2.1, 1),
    makeLeader("p6", "stl", 1.8, 2),
    makeLeader("p9", "stl", 1.6, 3),
  ],
  fg3m: [
    makeLeader("p8", "fg3m", 4.9, 1),
    makeLeader("p1", "fg3m", 3.6, 2),
    makeLeader("p4", "fg3m", 3.1, 3),
  ],
};
