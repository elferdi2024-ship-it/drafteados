// filepath: src/lib/basketball/nbaIds.ts

/**
 * Official NBA IDs for Teams (30 franchises)
 * Used to fetch official SVG logos: https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg
 */
export const NBA_TEAM_IDS: Record<string, number> = {
  // Atlanta Hawks
  ATL: 1610612737,
  hawks: 1610612737,
  Hawks: 1610612737,
  'Atlanta Hawks': 1610612737,

  // Boston Celtics
  BOS: 1610612738,
  celtics: 1610612738,
  Celtics: 1610612738,
  'Boston Celtics': 1610612738,

  // Cleveland Cavaliers
  CLE: 1610612739,
  cavaliers: 1610612739,
  cavs: 1610612739,
  'Cleveland Cavaliers': 1610612739,

  // New Orleans Pelicans
  NOP: 1610612740,
  NO: 1610612740,
  pelicans: 1610612740,
  'New Orleans Pelicans': 1610612740,

  // Chicago Bulls
  CHI: 1610612741,
  bulls: 1610612741,
  'Chicago Bulls': 1610612741,

  // Dallas Mavericks
  DAL: 1610612742,
  mavericks: 1610612742,
  mavs: 1610612742,
  'Dallas Mavericks': 1610612742,

  // Denver Nuggets
  DEN: 1610612743,
  nuggets: 1610612743,
  'Denver Nuggets': 1610612743,

  // Golden State Warriors
  GSW: 1610612744,
  GS: 1610612744,
  warriors: 1610612744,
  'Golden State Warriors': 1610612744,

  // Houston Rockets
  HOU: 1610612745,
  rockets: 1610612745,
  'Houston Rockets': 1610612745,

  // LA Clippers
  LAC: 1610612746,
  clippers: 1610612746,
  'LA Clippers': 1610612746,
  'Los Angeles Clippers': 1610612746,

  // Los Angeles Lakers
  LAL: 1610612747,
  lakers: 1610612747,
  'Los Angeles Lakers': 1610612747,

  // Miami Heat
  MIA: 1610612748,
  heat: 1610612748,
  'Miami Heat': 1610612748,

  // Milwaukee Bucks
  MIL: 1610612749,
  bucks: 1610612749,
  'Milwaukee Bucks': 1610612749,

  // Minnesota Timberwolves
  MIN: 1610612750,
  timberwolves: 1610612750,
  wolves: 1610612750,
  'Minnesota Timberwolves': 1610612750,

  // Brooklyn Nets
  BKN: 1610612751,
  nets: 1610612751,
  'Brooklyn Nets': 1610612751,

  // New York Knicks
  NYK: 1610612752,
  NY: 1610612752,
  knicks: 1610612752,
  Knicks: 1610612752,
  'New York Knicks': 1610612752,
  'New York': 1610612752,

  // Orlando Magic
  ORL: 1610612753,
  magic: 1610612753,
  'Orlando Magic': 1610612753,

  // Indiana Pacers
  IND: 1610612754,
  pacers: 1610612754,
  'Indiana Pacers': 1610612754,

  // Philadelphia 76ers
  PHI: 1610612755,
  sixers: 1610612755,
  '76ers': 1610612755,
  'Philadelphia 76ers': 1610612755,

  // Phoenix Suns
  PHX: 1610612756,
  suns: 1610612756,
  'Phoenix Suns': 1610612756,

  // Portland Trail Blazers
  POR: 1610612757,
  blazers: 1610612757,
  'Portland Trail Blazers': 1610612757,

  // Sacramento Kings
  SAC: 1610612758,
  kings: 1610612758,
  'Sacramento Kings': 1610612758,

  // San Antonio Spurs
  SAS: 1610612759,
  SA: 1610612759,
  spurs: 1610612759,
  Spurs: 1610612759,
  'San Antonio Spurs': 1610612759,
  'San Antonio': 1610612759,

  // Oklahoma City Thunder
  OKC: 1610612760,
  thunder: 1610612760,
  'Oklahoma City Thunder': 1610612760,

  // Toronto Raptors
  TOR: 1610612761,
  raptors: 1610612761,
  'Toronto Raptors': 1610612761,

  // Utah Jazz
  UTA: 1610612762,
  UTAH: 1610612762,
  jazz: 1610612762,
  'Utah Jazz': 1610612762,

  // Memphis Grizzlies
  MEM: 1610612763,
  grizzlies: 1610612763,
  'Memphis Grizzlies': 1610612763,

  // Washington Wizards
  WAS: 1610612764,
  WSH: 1610612764,
  wizards: 1610612764,
  'Washington Wizards': 1610612764,

  // Detroit Pistons
  DET: 1610612765,
  pistons: 1610612765,
  'Detroit Pistons': 1610612765,

  // Charlotte Hornets
  CHA: 1610612766,
  hornets: 1610612766,
  'Charlotte Hornets': 1610612766,
};

/**
 * Official NBA IDs for Active Players
 * Headshots: https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png
 */
export const NBA_PLAYER_IDS: Record<string, number> = {
  // Superestrellas & Líderes
  'LeBron James': 2544,
  'Stephen Curry': 201939,
  'Shai Gilgeous-Alexander': 1628983,
  'Nikola Jokic': 203999,
  'Nikola Jokić': 203999,
  'Luka Doncic': 1629029,
  'Luka Dončić': 1629029,
  'Jayson Tatum': 1628369,
  'Giannis Antetokounmpo': 203507,
  'Anthony Edwards': 1630162,
  'Victor Wembanyama': 1641705,
  'Kevin Durant': 201142,
  'Joel Embiid': 203954,
  'Anthony Davis': 203076,
  'Devin Booker': 1626164,
  'Donovan Mitchell': 1628378,
  'Jimmy Butler': 202710,
  'Jaylen Brown': 1627759,
  'Bam Adebayo': 1628389,
  'Tyrese Haliburton': 1630169,
  'Jalen Brunson': 1628973,
  'Damian Lillard': 203081,
  'Trae Young': 1629027,
  'Ja Morant': 1629630,
  'Zion Williamson': 1629627,
  'Paolo Banchero': 1631094,
  'Chet Holmgren': 1631096,
  'Domantas Sabonis': 1627734,
  "De'Aaron Fox": 1628368,
  'Lauri Markkanen': 1628374,
  'Karl-Anthony Towns': 1626157,
  'Rudy Gobert': 203497,
  'Kyrie Irving': 202681,
  'Paul George': 202331,
  'Kawhi Leonard': 202695,
  'James Harden': 201935,
  'Tyrese Maxey': 1630178,
  'Scottie Barnes': 1630567,
  'Franz Wagner': 1630532,
  'Cade Cunningham': 1630595,
  'Jalen Williams': 1631114,
  'Alperen Sengun': 1630578,
  'Alperen Şengün': 1630578,
  'Mikal Bridges': 1628969,
  'Derrick White': 1628401,
  'Jrue Holiday': 201950,
  'Kristaps Porzingis': 204001,
  'Kristaps Porziņģis': 204001,
  'Jamal Murray': 1627750,
  'Michael Porter Jr.': 1629008,
  'Aaron Gordon': 203932,
  'Austin Reaves': 1630559,
  "D'Angelo Russell": 1626156,
  'Klay Thompson': 202691,
  'Draymond Green': 203110,
  'Pascal Siakam': 1627783,
  'Myles Turner': 1626167,
  'OG Anunoby': 1628384,
  'Josh Hart': 1628404,
  'Donte DiVincenzo': 1628978,
  'Tyler Herro': 1629639,
  'Terry Rozier': 1626179,
  'CJ McCollum': 203468,
  'Brandon Ingram': 1627742,
  'Dejounte Murray': 1627749,
  'Jaren Jackson Jr.': 1628991,
  'Desmond Bane': 1630217,
  'Marcus Smart': 203935,
  'Zach LaVine': 203897,
  'Coby White': 1629632,
  'Nikola Vucevic': 202696,
  'Nikola Vučević': 202696,
  'Fred VanVleet': 1627832,
  'Jalen Green': 1630224,
  'Jabari Smith Jr.': 1631095,
  'Amen Thompson': 1641708,
  'Ausar Thompson': 1641709,
  'Brandon Miller': 1641706,
  'LaMelo Ball': 1630163,
  'Miles Bridges': 1628970,
  'Mark Williams': 1631109,

  // Novatos Destacados (Draft 2024)
  'Zaccharie Risacher': 1642258,
  'Alex Sarr': 1642259,
  'Reed Sheppard': 1642261,
  'Stephon Castle': 1642264,
  'Ron Holland II': 1642263,
  'Tidjane Salaun': 1642265,
  'Donovan Clingan': 1642266,
  'Rob Dillingham': 1642268,
  'Zach Edey': 1641713,
  'Cody Williams': 1642262,
  'Matas Buzelis': 1642260,
  'Dalton Knecht': 1642261,
  "Kel'el Ware": 1642276,
  'Jared McCain': 1642272,
  'Tristan da Silva': 1642280,
  'Carlton Carrington': 1642267,

  // Jugadores Clave de Plantilla
  'Alex Caruso': 1627936,
  'Isaiah Hartenstein': 1628392,
  'Lu Dort': 1629652,
  'Luguentz Dort': 1629652,
  'Bradley Beal': 203078,
  'Jusuf Nurkic': 203994,
  'Jusuf Nurkić': 203994,
  'Grayson Allen': 1628960,
  'Norman Powell': 1626181,
  'Ivica Zubac': 1627826,
  'Terance Mann': 1629611,
  'Deandre Ayton': 1629028,
  'Jerami Grant': 203924,
  'Anfernee Simons': 1629014,
  'Scoot Henderson': 1630703,
  'Shaedon Sharpe': 1631101,
  'Deni Avdija': 1630166,
  'Malcolm Brogdon': 1627763,
  'Kyle Kuzma': 1628398,
  'Jordan Poole': 1629673,
  'Jonas Valanciunas': 202685,
  'Jonas Valančiūnas': 202685,
  'Corey Kispert': 1630557,
  'Bilal Coulibaly': 1641731,
  'Jalen Suggs': 1630591,
  'Wendell Carter Jr.': 1628976,
  'Jonathan Isaac': 1628371,
  'Cole Anthony': 1630175,
  'Darius Garland': 1629636,
  'Evan Mobley': 1630596,
  'Jarrett Allen': 1628386,
  'Max Strus': 1629622,
  'Caris LeVert': 1627747,
  'Immanuel Quickley': 1630193,
  'RJ Barrett': 1629628,
  'Jakob Poeltl': 1627751,
  'Gradey Dick': 1641711,
  'Kelly Olynyk': 203482,
  'Bruce Brown': 1628971,
  'Cam Thomas': 1630560,
  'Nic Claxton': 1629651,
  'Cameron Johnson': 1629661,
  'Dennis Schroder': 203471,
  'Dennis Schröder': 203471,
  'Bojan Bogdanovic': 202711,
  'Bojan Bogdanović': 202711,
  'Jaden McDaniels': 1630183,
  'Naz Reid': 1629675,
  'Mike Conley': 201144,
  'Nickeil Alexander-Walker': 1629638,
  'Malik Monk': 1628370,
  'Keegan Murray': 1631099,
  'Keon Ellis': 1631165,
  'Kevin Huerter': 1628989,
  'Trey Murphy III': 1630530,
  'Herbert Jones': 1630529,
  'Dyson Daniels': 1630700,
  'Brook Lopez': 201572,
  'Bobby Portis': 1626171,
  'Gary Trent Jr.': 1629018,
  'Collin Sexton': 1629012,
  'Keyonte George': 1641718,
  'John Collins': 1628381,
  'Walker Kessler': 1631219,
  'Jordan Clarkson': 203903,
  'Jalen Duren': 1631105,
  'Jaden Ivey': 1631093,
  'Tobias Harris': 202699,
  'Tim Hardaway Jr.': 203501,
  'Paul Reed': 1630194,
  'Kyle Lowry': 200768,
  'Kelly Oubre Jr.': 1626162,
  'Eric Gordon': 201569,
  'Jaime Jaquez Jr.': 1631170,
  'Nikola Jovic': 1631107,
  'Nikola Jović': 1631107,
  'Duncan Robinson': 1629130,
  'Clint Capela': 203991,
  'Bogdan Bogdanovic': 203992,
  'Bogdan Bogdanović': 203992,
  'Jalen Johnson': 1630552,
  'Onyeka Okongwu': 1630168,
  'Keldon Johnson': 1629640,
  'Devin Vassell': 1630170,
  'Jeremy Sochan': 1631110,
  'Harrison Barnes': 203084,
  'Chris Paul': 101108,
  'Tre Jones': 1630200,
  'Zach Collins': 1628380,
  'Tari Eason': 1631106,
  'Cam Whitmore': 1641715,
  'Steven Adams': 203500,
  'Dillon Brooks': 1628415,
  'Daniel Gafford': 1629655,
  'Dereck Lively II': 1641726,
  'P.J. Washington': 1629023,
  'Naji Marshall': 1630230,
  'Quentin Grimes': 1629656,
  'Jonathan Kuminga': 1630228,
  'Brandin Podziemski': 1641764,
  'Trayce Jackson-Davis': 1631218,
  'Moses Moody': 1630541,
  'Buddy Hield': 1627741,
  'Kyle Anderson': 203937,
  "De'Anthony Melton": 1629001,
  'Aaron Nesmith': 1630174,
  'Andrew Nembhard': 1629614,
  'Bennedict Mathurin': 1631097,
  'Obi Toppin': 1630167,
  'T.J. McConnell': 204456,
  'Payton Pritchard': 1630202,
  'Sam Hauser': 1630573,
  'Al Horford': 201143,
  'Christian Braun': 1631128,
  'Peyton Watson': 1631212,
  'Russell Westbrook': 201566,
  'Julian Strawther': 1641723,
  'Dario Saric': 203967,
  'Ayo Dosunmu': 1630245,
  'Patrick Williams': 1630172,
  'Josh Giddey': 1630581,
};

/**
 * Resolves the official NBA headshot URL (served via cached server proxy)
 */
export function getPlayerHeadshotUrl(nbaId: number | null | undefined, size: '1040x760' | '260x190' = '1040x760'): string {
  if (!nbaId) return '/fallback-player.png';
  const dimension = size === '260x190' ? '260x190' : '1040x760';
  return `https://cdn.nba.com/headshots/nba/latest/${dimension}/${nbaId}.png`;
}

/**
 * Resolves official NBA team logo SVG (served via direct official NBA CDN)
 */
export function getTeamLogoUrl(nbaTeamId: number | null | undefined): string {
  if (!nbaTeamId) return '/fallback-team.svg';
  return `https://cdn.nba.com/logos/nba/${nbaTeamId}/global/L/logo.svg`;
}

/**
 * Returns the official NBA player ID by player name
 */
export function getPlayerNbaId(name: string): number | null {
  if (!name) return null;
  // Exact match
  if (NBA_PLAYER_IDS[name]) return NBA_PLAYER_IDS[name];

  // Normalized search (remove diacritics / lowercase)
  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  for (const [key, id] of Object.entries(NBA_PLAYER_IDS)) {
    const keyNorm = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    if (keyNorm === normalized || keyNorm.includes(normalized) || normalized.includes(keyNorm)) {
      return id;
    }
  }

  return null;
}

/**
 * Returns the official NBA team ID by team abbreviation or name
 */
export function getTeamNbaId(abbreviationOrName?: string | null, fallbackName?: string | null): number {
  const candidates = [abbreviationOrName, fallbackName].filter(Boolean) as string[];
  if (candidates.length === 0) return 1610612752; // Default to New York Knicks (2026 Champion)

  for (const candidate of candidates) {
    const clean = candidate.trim();
    const upper = clean.toUpperCase();
    const lower = clean.toLowerCase();

    // 1. Direct key match (case sensitive, uppercase, lowercase)
    if (NBA_TEAM_IDS[upper]) return NBA_TEAM_IDS[upper];
    if (NBA_TEAM_IDS[clean]) return NBA_TEAM_IDS[clean];
    if (NBA_TEAM_IDS[lower]) return NBA_TEAM_IDS[lower];

    // 2. Case-insensitive exact & partial matching
    for (const [key, id] of Object.entries(NBA_TEAM_IDS)) {
      const keyLower = key.toLowerCase();
      if (keyLower === lower) return id;
      if (lower.length >= 3 && (lower.includes(keyLower) || keyLower.includes(lower))) {
        return id;
      }
    }
  }

  return 1610612752; // Default to New York Knicks
}
