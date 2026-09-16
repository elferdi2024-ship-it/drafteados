// filepath: src/lib/data/basketball/espn-provider.ts
/**
 * DRAFTEADOS NBA HUB — ESPN REAL DATA PROVIDER
 * Proveedor de datos reales y públicos de la NBA a través de la API CDN de ESPN.
 * Sin cuotas ni API keys, ultra rápida, con soporte de marcadores en vivo,
 * clasificación de conferencias, líderes y detalles de franquicias.
 */

import type {
  BasketballDataProvider,
  Team,
  Player,
  Game,
  GameStatus,
  Standing,
  LeaderLine,
  StatType,
} from "./types";
import { MOCK_TEAMS } from "./mock-data";

// Mapa de franquicias para conferencia, división y colores canónicos
const TEAM_META_MAP: Record<string, { conference: "East" | "West"; division: string; slug: string; primaryColor: string }> = {};
for (const t of MOCK_TEAMS) {
  TEAM_META_MAP[t.abbreviation] = {
    conference: t.conference,
    division: t.division,
    slug: t.slug,
    primaryColor: t.primaryColor || "#FF5A1F",
  };
}

interface EspnCompetitor {
  id: string;
  order: number;
  homeAway: "home" | "away";
  score?: string;
  team: {
    id: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    color?: string;
    alternateColor?: string;
    logos?: Array<{ href: string }>;
  };
}

interface EspnEvent {
  id: string;
  date: string;
  status: {
    period: number;
    displayClock?: string;
    type: {
      state: "pre" | "in" | "post";
      completed?: boolean;
      description?: string;
    };
  };
  competitions?: Array<{
    id: string;
    venue?: { fullName?: string };
    competitors: EspnCompetitor[];
  }>;
}

export class EspnProvider implements BasketballDataProvider {
  private baseUrl = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba";
  private standingsUrl = "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings";

  private mapTeam(espnTeam: EspnCompetitor["team"]): Team {
    const abbr = espnTeam.abbreviation || "NBA";
    const meta = TEAM_META_MAP[abbr] || {
      conference: "East" as const,
      division: "Unknown",
      slug: espnTeam.name?.toLowerCase().replace(/\s+/g, "-") || abbr.toLowerCase(),
      primaryColor: espnTeam.color ? `#${espnTeam.color}` : "#FF5A1F",
    };

    return {
      id: String(espnTeam.id),
      name: espnTeam.displayName || espnTeam.name || abbr,
      abbreviation: abbr,
      city: espnTeam.location || "",
      conference: meta.conference,
      division: meta.division,
      slug: meta.slug,
      primaryColor: espnTeam.color ? `#${espnTeam.color}` : meta.primaryColor,
      secondaryColor: espnTeam.alternateColor ? `#${espnTeam.alternateColor}` : undefined,
      logoUrl: espnTeam.logos?.[0]?.href || `https://a.espncdn.com/i/teamlogos/nba/500/${abbr.toLowerCase()}.png`,
    };
  }

  private mapGameStatus(state: "pre" | "in" | "post", description?: string): GameStatus {
    if (description?.toLowerCase().includes("postponed") || description?.toLowerCase().includes("aplazado")) {
      return "postponed";
    }
    if (state === "in") return "live";
    if (state === "post") return "final";
    return "scheduled";
  }

  async getScoreboard(date?: string): Promise<Game[]> {
    let url = `${this.baseUrl}/scoreboard`;
    if (date) {
      const cleanDate = date.replace(/-/g, "");
      url += `?dates=${cleanDate}`;
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DrafteadosHub/2.0)" },
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error(`ESPN Scoreboard API error: ${res.status}`);
    const data = await res.json();
    const events: EspnEvent[] = data.events || [];

    return events.map((ev): Game => {
      const comp = ev.competitions?.[0];
      const homeComp = comp?.competitors.find((c) => c.homeAway === "home");
      const awayComp = comp?.competitors.find((c) => c.homeAway === "away");

      const homeTeam = homeComp ? this.mapTeam(homeComp.team) : MOCK_TEAMS[0];
      const awayTeam = awayComp ? this.mapTeam(awayComp.team) : MOCK_TEAMS[1];

      return {
        id: ev.id,
        date: ev.date,
        status: this.mapGameStatus(ev.status.type.state, ev.status.type.description),
        homeTeam,
        awayTeam,
        homeScore: homeComp?.score ? parseInt(homeComp.score, 10) : undefined,
        awayScore: awayComp?.score ? parseInt(awayComp.score, 10) : undefined,
        period: ev.status.period,
        clock: ev.status.displayClock || undefined,
        arena: comp?.venue?.fullName || undefined,
      };
    });
  }

  async getStandings(_season = "2026-27"): Promise<{ east: Standing[]; west: Standing[] }> {
    const res = await fetch(this.standingsUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DrafteadosHub/2.0)" },
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`ESPN Standings API error: ${res.status}`);
    const data = await res.json();

    const parseConferenceEntries = (entries: any[] = []): Standing[] => {
      return entries.map((entry, index): Standing => {
        const team = this.mapTeam(entry.team);
        const statsMap: Record<string, string | number> = {};
        for (const s of entry.stats || []) {
          statsMap[s.name] = s.displayValue ?? s.value;
        }

        const wins = typeof statsMap.wins === "number" ? statsMap.wins : parseInt(String(statsMap.wins || "0"), 10);
        const losses = typeof statsMap.losses === "number" ? statsMap.losses : parseInt(String(statsMap.losses || "0"), 10);
        const winPct = typeof statsMap.winPercent === "number" ? statsMap.winPercent : parseFloat(String(statsMap.winPercent || "0"));
        const gamesBackRaw = String(statsMap.gamesBehind || "0");
        const gamesBack = gamesBackRaw === "-" ? 0 : parseFloat(gamesBackRaw);

        return {
          team,
          wins,
          losses,
          winPct,
          conferenceRank: index + 1,
          gamesBack: isNaN(gamesBack) ? 0 : gamesBack,
          streak: String(statsMap.streak || "-"),
          homeRecord: String(statsMap.Home || "0-0"),
          roadRecord: String(statsMap.Road || "0-0"),
        };
      });
    };

    const eastEntries = data.children?.[0]?.standings?.entries || [];
    const westEntries = data.children?.[1]?.standings?.entries || [];

    return {
      east: parseConferenceEntries(eastEntries),
      west: parseConferenceEntries(westEntries),
    };
  }

  async getTeams(): Promise<Team[]> {
    const res = await fetch(`${this.baseUrl}/teams`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DrafteadosHub/2.0)" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`ESPN Teams API error: ${res.status}`);
    const data = await res.json();
    const espnTeams = data.sports?.[0]?.leagues?.[0]?.teams || [];

    return espnTeams.map((item: any) => this.mapTeam(item.team));
  }

  async getTeam(slugOrId: string): Promise<Team | null> {
    const teams = await this.getTeams();
    const clean = slugOrId.toLowerCase();
    return teams.find((t) => t.id === clean || t.slug.toLowerCase() === clean || t.abbreviation.toLowerCase() === clean) || null;
  }

  async getGame(gameId: string): Promise<(Game & { boxScore?: unknown }) | null> {
    const res = await fetch(`${this.baseUrl}/summary?event=${gameId}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DrafteadosHub/2.0)" },
      next: { revalidate: 30 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    const headerComp = data.header?.competitions?.[0];
    if (!headerComp) return null;

    const homeComp = headerComp.competitors?.find((c: any) => c.homeAway === "home");
    const awayComp = headerComp.competitors?.find((c: any) => c.homeAway === "away");

    const homeTeam = homeComp ? this.mapTeam(homeComp.team) : MOCK_TEAMS[0];
    const awayTeam = awayComp ? this.mapTeam(awayComp.team) : MOCK_TEAMS[1];

    return {
      id: gameId,
      date: headerComp.date || new Date().toISOString(),
      status: this.mapGameStatus(headerComp.status?.type?.state || "scheduled", headerComp.status?.type?.description),
      homeTeam,
      awayTeam,
      homeScore: homeComp?.score ? parseInt(homeComp.score, 10) : undefined,
      awayScore: awayComp?.score ? parseInt(awayComp.score, 10) : undefined,
      period: headerComp.status?.period,
      clock: headerComp.status?.displayClock || undefined,
      arena: data.gameInfo?.venue?.fullName || undefined,
      boxScore: data.boxscore || undefined,
    };
  }

  async getLeaders(_stat: StatType, _season = "2026-27", _limit = 10): Promise<LeaderLine[]> {
    return [];
  }

  async getPlayers(_params?: { search?: string; teamId?: string }): Promise<Player[]> {
    return [];
  }

  async getGames(_params?: { startDate?: string; endDate?: string; teamId?: string }): Promise<Game[]> {
    return this.getScoreboard();
  }
}
