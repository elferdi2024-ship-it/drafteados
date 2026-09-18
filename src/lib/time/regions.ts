// filepath: src/lib/time/regions.ts
/**
 * Regiones horarias — audiencia Drafteados (España + Hispanoamérica)
 * Fuente de verdad del tip-off NBA: America/New_York (ET)
 */

export type RegionId =
  | "ES"
  | "AR"
  | "UY"
  | "CL"
  | "CO"
  | "MX"
  | "PE"
  | "VE"
  | "BR"
  | "ET";

export interface Region {
  id: RegionId;
  label: string;
  /** Short label for chips */
  shortLabel: string;
  tz: string;
  flag: string;
  countryCode: string;
  flagUrl: string;
  /** Prefer 12h clock (Mexico often) */
  hour12?: boolean;
}

export const REGIONS: Region[] = [
  {
    id: "ES",
    label: "España",
    shortLabel: "ES",
    tz: "Europe/Madrid",
    flag: "🇪🇸",
    countryCode: "es",
    flagUrl: "https://flagcdn.com/w40/es.png",
  },
  {
    id: "AR",
    label: "Argentina",
    shortLabel: "AR",
    tz: "America/Argentina/Buenos_Aires",
    flag: "🇦🇷",
    countryCode: "ar",
    flagUrl: "https://flagcdn.com/w40/ar.png",
  },
  {
    id: "UY",
    label: "Uruguay",
    shortLabel: "UY",
    tz: "America/Montevideo",
    flag: "🇺🇾",
    countryCode: "uy",
    flagUrl: "https://flagcdn.com/w40/uy.png",
  },
  {
    id: "CL",
    label: "Chile",
    shortLabel: "CL",
    tz: "America/Santiago",
    flag: "🇨🇱",
    countryCode: "cl",
    flagUrl: "https://flagcdn.com/w40/cl.png",
  },
  {
    id: "CO",
    label: "Colombia",
    shortLabel: "CO",
    tz: "America/Bogota",
    flag: "🇨🇴",
    countryCode: "co",
    flagUrl: "https://flagcdn.com/w40/co.png",
  },
  {
    id: "MX",
    label: "México",
    shortLabel: "MX",
    tz: "America/Mexico_City",
    flag: "🇲🇽",
    countryCode: "mx",
    flagUrl: "https://flagcdn.com/w40/mx.png",
    hour12: true,
  },
  {
    id: "PE",
    label: "Perú",
    shortLabel: "PE",
    tz: "America/Lima",
    flag: "🇵🇪",
    countryCode: "pe",
    flagUrl: "https://flagcdn.com/w40/pe.png",
  },
  {
    id: "VE",
    label: "Venezuela",
    shortLabel: "VE",
    tz: "America/Caracas",
    flag: "🇻🇪",
    countryCode: "ve",
    flagUrl: "https://flagcdn.com/w40/ve.png",
  },
  {
    id: "BR",
    label: "Brasil (SP)",
    shortLabel: "BR",
    tz: "America/Sao_Paulo",
    flag: "🇧🇷",
    countryCode: "br",
    flagUrl: "https://flagcdn.com/w40/br.png",
  },
  {
    id: "ET",
    label: "EE.UU. (Este)",
    shortLabel: "ET",
    tz: "America/New_York",
    flag: "🇺🇸",
    countryCode: "us",
    flagUrl: "https://flagcdn.com/w40/us.png",
    hour12: true,
  },
];

export const STORAGE_KEY = "drafteados-tz-region";

/** Map browser IANA tz → our region id */
const TZ_TO_REGION: Record<string, RegionId> = {
  "Europe/Madrid": "ES",
  "Europe/Barcelona": "ES",
  "Atlantic/Canary": "ES",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Argentina/Cordoba": "AR",
  "America/Montevideo": "UY",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "America/Mexico_City": "MX",
  "America/Cancun": "MX",
  "America/Monterrey": "MX",
  "America/Tijuana": "MX",
  "America/Lima": "PE",
  "America/Caracas": "VE",
  "America/Sao_Paulo": "BR",
  "America/New_York": "ET",
};

export function getRegion(id: RegionId | string): Region {
  return REGIONS.find((r) => r.id === id) ?? REGIONS[0];
}

export function detectDefaultRegionId(): RegionId {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TZ_TO_REGION[tz]) return TZ_TO_REGION[tz];
    if (tz.includes("Montevideo") || tz.includes("Uruguay")) return "UY";
    if (tz.includes("Argentina") || tz.includes("Buenos_Aires")) return "AR";
    if (tz.includes("Santiago") || tz.includes("Chile")) return "CL";
    if (tz.includes("Bogota") || tz.includes("Colombia")) return "CO";
    if (tz.includes("Mexico")) return "MX";
    if (tz.includes("Lima") || tz.includes("Peru")) return "PE";
    if (tz.includes("Caracas") || tz.includes("Venezuela")) return "VE";
    if (tz.includes("Sao_Paulo") || tz.includes("Brazil")) return "BR";
    if (tz.startsWith("Europe/")) return "ES";
  } catch {
    /* ignore */
  }
  return "ES";
}

export function readStoredRegionId(): RegionId | null {
  if (typeof window === "undefined") return null;
  try {
    // 1. Check localStorage
    const localVal = localStorage.getItem(STORAGE_KEY);
    if (localVal && REGIONS.some((r) => r.id === localVal)) {
      return localVal as RegionId;
    }
    // 2. Check HTML data attribute
    const attrVal = document.documentElement.getAttribute("data-tz");
    if (attrVal && REGIONS.some((r) => r.id === attrVal)) {
      return attrVal as RegionId;
    }
    // 3. Check Cookie
    const match = document.cookie.match(new RegExp(`(^|;\\s*)${STORAGE_KEY}=([^;]+)`));
    if (match && match[2] && REGIONS.some((r) => r.id === match[2])) {
      return match[2] as RegionId;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function storeRegionId(id: RegionId) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.setAttribute("data-tz", id);
    // Cookie persists for 1 year across all paths and subdomains
    document.cookie = `${STORAGE_KEY}=${id}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function resolveRegionId(): RegionId {
  return readStoredRegionId() ?? detectDefaultRegionId();
}

export interface FormattedGameTime {
  /** Primary line for UI e.g. "dom, 4 oct, 21:00" */
  local: string;
  /** Time only e.g. "21:00" or "9:00 PM" */
  localTime: string;
  /** Always ET reference e.g. "7:00 PM ET" */
  et: string;
  region: Region;
}

export function formatGameTime(
  isoDate: string | Date,
  regionId?: RegionId | string
): FormattedGameTime {
  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;
  const region = getRegion(regionId ?? "ES");
  const et = getRegion("ET");

  if (!date || isNaN(date.getTime())) {
    return {
      local: "Hora por confirmar",
      localTime: "TBD",
      et: "TBD ET",
      region,
    };
  }

  const local = new Intl.DateTimeFormat("es", {
    timeZone: region.tz,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: !!region.hour12,
  }).format(date);

  const localTime = new Intl.DateTimeFormat("es", {
    timeZone: region.tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !!region.hour12,
  }).format(date);

  const etStr =
    new Intl.DateTimeFormat("en-US", {
      timeZone: et.tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date) + " ET";

  return { local, localTime, et: etStr, region };
}
