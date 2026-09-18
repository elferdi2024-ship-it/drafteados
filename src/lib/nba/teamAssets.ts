/**
 * NBA team logos + brand colors
 *
 * Logos: CDN oficial usado por nba.com (Akamai)
 * Pattern:
 *   https://cdn.nba.com/logos/nba/{TEAM_ID}/primary/L/logo.svg
 *   https://cdn.nba.com/logos/nba/{TEAM_ID}/global/L/logo.svg  (alt)
 *
 * TEAM_ID = NBA teamId (10 dígitos, ej. Nets 1610612751)
 *
 * Legal: logos © NBA. Uso editorial/fan sites suele tolerarse;
 * para producto comercial revisá política de marca NBA.
 */

export type TeamBrand = {
  tricode: string;
  slug: string;
  name: string;
  teamId: number;
  /** Primary brand hex */
  primary: string;
  /** Secondary brand hex */
  secondary: string;
  /** Text on primary (usually #fff or #000) */
  onPrimary: string;
};

/** 30 franquicias — IDs oficiales NBA */
export const NBA_TEAMS: Record<string, TeamBrand> = {
  ATL: {
    tricode: "ATL",
    slug: "hawks",
    name: "Atlanta Hawks",
    teamId: 1610612737,
    primary: "#E03A3E",
    secondary: "#C1D32F",
    onPrimary: "#FFFFFF",
  },
  BOS: {
    tricode: "BOS",
    slug: "celtics",
    name: "Boston Celtics",
    teamId: 1610612738,
    primary: "#007A33",
    secondary: "#BA9653",
    onPrimary: "#FFFFFF",
  },
  BKN: {
    tricode: "BKN",
    slug: "nets",
    name: "Brooklyn Nets",
    teamId: 1610612751,
    primary: "#000000",
    secondary: "#FFFFFF",
    onPrimary: "#FFFFFF",
  },
  CHA: {
    tricode: "CHA",
    slug: "hornets",
    name: "Charlotte Hornets",
    teamId: 1610612766,
    primary: "#1D1160",
    secondary: "#00788C",
    onPrimary: "#FFFFFF",
  },
  CHI: {
    tricode: "CHI",
    slug: "bulls",
    name: "Chicago Bulls",
    teamId: 1610612741,
    primary: "#CE1141",
    secondary: "#000000",
    onPrimary: "#FFFFFF",
  },
  CLE: {
    tricode: "CLE",
    slug: "cavaliers",
    name: "Cleveland Cavaliers",
    teamId: 1610612739,
    primary: "#860038",
    secondary: "#FDBB30",
    onPrimary: "#FFFFFF",
  },
  DAL: {
    tricode: "DAL",
    slug: "mavericks",
    name: "Dallas Mavericks",
    teamId: 1610612742,
    primary: "#00538C",
    secondary: "#002B5E",
    onPrimary: "#FFFFFF",
  },
  DEN: {
    tricode: "DEN",
    slug: "nuggets",
    name: "Denver Nuggets",
    teamId: 1610612743,
    primary: "#0E2240",
    secondary: "#FEC524",
    onPrimary: "#FFFFFF",
  },
  DET: {
    tricode: "DET",
    slug: "pistons",
    name: "Detroit Pistons",
    teamId: 1610612765,
    primary: "#C8102E",
    secondary: "#1D42BA",
    onPrimary: "#FFFFFF",
  },
  GSW: {
    tricode: "GSW",
    slug: "warriors",
    name: "Golden State Warriors",
    teamId: 1610612744,
    primary: "#1D428A",
    secondary: "#FFC72C",
    onPrimary: "#FFFFFF",
  },
  HOU: {
    tricode: "HOU",
    slug: "rockets",
    name: "Houston Rockets",
    teamId: 1610612745,
    primary: "#CE1141",
    secondary: "#000000",
    onPrimary: "#FFFFFF",
  },
  IND: {
    tricode: "IND",
    slug: "pacers",
    name: "Indiana Pacers",
    teamId: 1610612754,
    primary: "#002D62",
    secondary: "#FDBB30",
    onPrimary: "#FFFFFF",
  },
  LAC: {
    tricode: "LAC",
    slug: "clippers",
    name: "LA Clippers",
    teamId: 1610612746,
    primary: "#C8102E",
    secondary: "#1D428A",
    onPrimary: "#FFFFFF",
  },
  LAL: {
    tricode: "LAL",
    slug: "lakers",
    name: "Los Angeles Lakers",
    teamId: 1610612747,
    primary: "#552583",
    secondary: "#FDB927",
    onPrimary: "#FFFFFF",
  },
  MEM: {
    tricode: "MEM",
    slug: "grizzlies",
    name: "Memphis Grizzlies",
    teamId: 1610612763,
    primary: "#5D76A9",
    secondary: "#12173F",
    onPrimary: "#FFFFFF",
  },
  MIA: {
    tricode: "MIA",
    slug: "heat",
    name: "Miami Heat",
    teamId: 1610612748,
    primary: "#98002E",
    secondary: "#F9A01B",
    onPrimary: "#FFFFFF",
  },
  MIL: {
    tricode: "MIL",
    slug: "bucks",
    name: "Milwaukee Bucks",
    teamId: 1610612749,
    primary: "#00471B",
    secondary: "#EEE1C6",
    onPrimary: "#FFFFFF",
  },
  MIN: {
    tricode: "MIN",
    slug: "timberwolves",
    name: "Minnesota Timberwolves",
    teamId: 1610612750,
    primary: "#0C2340",
    secondary: "#236192",
    onPrimary: "#FFFFFF",
  },
  NOP: {
    tricode: "NOP",
    slug: "pelicans",
    name: "New Orleans Pelicans",
    teamId: 1610612740,
    primary: "#0C2340",
    secondary: "#C8102E",
    onPrimary: "#FFFFFF",
  },
  NYK: {
    tricode: "NYK",
    slug: "knicks",
    name: "New York Knicks",
    teamId: 1610612752,
    primary: "#006BB6",
    secondary: "#F58426",
    onPrimary: "#FFFFFF",
  },
  OKC: {
    tricode: "OKC",
    slug: "thunder",
    name: "Oklahoma City Thunder",
    teamId: 1610612760,
    primary: "#007AC1",
    secondary: "#EF3B24",
    onPrimary: "#FFFFFF",
  },
  ORL: {
    tricode: "ORL",
    slug: "magic",
    name: "Orlando Magic",
    teamId: 1610612753,
    primary: "#0077C0",
    secondary: "#C4CED4",
    onPrimary: "#FFFFFF",
  },
  PHI: {
    tricode: "PHI",
    slug: "76ers",
    name: "Philadelphia 76ers",
    teamId: 1610612755,
    primary: "#006BB6",
    secondary: "#ED174C",
    onPrimary: "#FFFFFF",
  },
  PHX: {
    tricode: "PHX",
    slug: "suns",
    name: "Phoenix Suns",
    teamId: 1610612756,
    primary: "#1D1160",
    secondary: "#E56020",
    onPrimary: "#FFFFFF",
  },
  POR: {
    tricode: "POR",
    slug: "blazers",
    name: "Portland Trail Blazers",
    teamId: 1610612757,
    primary: "#E03A3E",
    secondary: "#000000",
    onPrimary: "#FFFFFF",
  },
  SAC: {
    tricode: "SAC",
    slug: "kings",
    name: "Sacramento Kings",
    teamId: 1610612758,
    primary: "#5A2D81",
    secondary: "#63727A",
    onPrimary: "#FFFFFF",
  },
  SAS: {
    tricode: "SAS",
    slug: "spurs",
    name: "San Antonio Spurs",
    teamId: 1610612759,
    primary: "#C4CED4",
    secondary: "#000000",
    onPrimary: "#000000",
  },
  TOR: {
    tricode: "TOR",
    slug: "raptors",
    name: "Toronto Raptors",
    teamId: 1610612761,
    primary: "#CE1141",
    secondary: "#000000",
    onPrimary: "#FFFFFF",
  },
  UTA: {
    tricode: "UTA",
    slug: "jazz",
    name: "Utah Jazz",
    teamId: 1610612762,
    primary: "#002B5C",
    secondary: "#00471B",
    onPrimary: "#FFFFFF",
  },
  WAS: {
    tricode: "WAS",
    slug: "wizards",
    name: "Washington Wizards",
    teamId: 1610612764,
    primary: "#002B5C",
    secondary: "#E31837",
    onPrimary: "#FFFFFF",
  },
};

/** Alias tricodes comunes (NETS → BKN, etc.) */
const TRICODE_ALIASES: Record<string, string> = {
  NETS: "BKN",
  BRK: "BKN",
  GS: "GSW",
  NO: "NOP",
  NY: "NYK",
  SA: "SAS",
  PHO: "PHX",
  WSH: "WAS",
  UTAH: "UTA",
};

export function normalizeTricode(input: string): string {
  const t = input.trim().toUpperCase();
  return TRICODE_ALIASES[t] || t;
}

export function getTeamByTricode(tricode: string): TeamBrand | undefined {
  return NBA_TEAMS[normalizeTricode(tricode)];
}

export function getTeamBySlug(slug: string): TeamBrand | undefined {
  const s = slug.toLowerCase().replace(/^\//, "");
  return Object.values(NBA_TEAMS).find(
    (t) => t.slug === s || t.tricode.toLowerCase() === s
  );
}

export const ESPN_TRICODE_MAP: Record<string, string> = {
  ATL: "atl",
  BOS: "bos",
  BKN: "bkn",
  CHA: "cha",
  CHI: "chi",
  CLE: "cle",
  DAL: "dal",
  DEN: "den",
  DET: "det",
  GSW: "gsw",
  GS: "gsw",
  HOU: "hou",
  IND: "ind",
  LAC: "lac",
  LAL: "lal",
  MEM: "mem",
  MIA: "mia",
  MIL: "mil",
  MIN: "min",
  NOP: "no",
  NO: "no",
  NYK: "nyk",
  NY: "nyk",
  OKC: "okc",
  ORL: "orl",
  PHI: "phi",
  PHX: "phx",
  POR: "por",
  SAC: "sac",
  SAS: "sas",
  SA: "sas",
  TOR: "tor",
  UTA: "utah",
  UTAH: "utah",
  WAS: "was",
  WSH: "was",
};

export function getEspnLogoByTricode(tricode: string): string {
  const norm = normalizeTricode(tricode);
  const espnCode = ESPN_TRICODE_MAP[norm] || norm.toLowerCase();
  return `https://a.espncdn.com/i/teamlogos/nba/500/${espnCode}.png`;
}

/**
 * URL logo oficial alta resolución (500x500 PNG con transparencia sin CORS/HTTP2 protocol errors)
 * Fallback transparente de cdn.nba.com a ESPN CDN estable
 */
export function getNbaLogoUrl(
  teamIdOrTricodeOrSlug: number | string,
  _variant: "primary" | "global" = "primary"
): string {
  if (typeof teamIdOrTricodeOrSlug === "number") {
    const found = Object.values(NBA_TEAMS).find((t) => t.teamId === teamIdOrTricodeOrSlug);
    if (found) return getEspnLogoByTricode(found.tricode);
  }

  const str = String(teamIdOrTricodeOrSlug).trim();
  const num = parseInt(str, 10);
  if (!isNaN(num) && num > 1000000000) {
    const found = Object.values(NBA_TEAMS).find((t) => t.teamId === num);
    if (found) return getEspnLogoByTricode(found.tricode);
  }

  const team = getTeamByTricode(str) || getTeamBySlug(str);
  if (team) {
    return getEspnLogoByTricode(team.tricode);
  }

  return getEspnLogoByTricode(str);
}

/** ESPN CDN alternativo (PNG) — backup si SVG falla */
export function getEspnLogoUrl(teamId: number, size: 50 | 100 | 500 = 100): string {
  return `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${teamId}.png`.replace(
    "/500/",
    `/${size}/`
  );
}

/**
 * Headshot jugador (CDN nba.com)
 * playerId = NBA personId
 */
export function getNbaHeadshotUrl(playerId: number, size: 260 | 1040 = 260): string {
  return `https://cdn.nba.com/headshots/nba/latest/${size}x${size}/${playerId}.png`;
}
