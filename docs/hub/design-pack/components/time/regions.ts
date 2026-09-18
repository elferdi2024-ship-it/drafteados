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
  },
  {
    id: "AR",
    label: "Argentina",
    shortLabel: "AR",
    tz: "America/Argentina/Buenos_Aires",
    flag: "🇦🇷",
  },
  {
    id: "UY",
    label: "Uruguay",
    shortLabel: "UY",
    tz: "America/Montevideo",
    flag: "🇺🇾",
  },
  {
    id: "CL",
    label: "Chile",
    shortLabel: "CL",
    tz: "America/Santiago",
    flag: "🇨🇱",
  },
  {
    id: "CO",
    label: "Colombia",
    shortLabel: "CO",
    tz: "America/Bogota",
    flag: "🇨🇴",
  },
  {
    id: "MX",
    label: "México",
    shortLabel: "MX",
    tz: "America/Mexico_City",
    flag: "🇲🇽",
    hour12: true,
  },
  {
    id: "PE",
    label: "Perú",
    shortLabel: "PE",
    tz: "America/Lima",
    flag: "🇵🇪",
  },
  {
    id: "VE",
    label: "Venezuela",
    shortLabel: "VE",
    tz: "America/Caracas",
    flag: "🇻🇪",
  },
  {
    id: "BR",
    label: "Brasil (SP)",
    shortLabel: "BR",
    tz: "America/Sao_Paulo",
    flag: "🇧🇷",
  },
  {
    id: "ET",
    label: "EE.UU. (Este)",
    shortLabel: "ET",
    tz: "America/New_York",
    flag: "🇺🇸",
    hour12: true,
  },
];

const STORAGE_KEY = "drafteados-tz-region";

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
    // rough offsets
    if (tz.startsWith("Europe/")) return "ES";
    if (tz.includes("Argentina")) return "AR";
    if (tz.includes("Mexico")) return "MX";
  } catch {
    /* ignore */
  }
  return "ES";
}

export function readStoredRegionId(): RegionId | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v && REGIONS.some((r) => r.id === v)) return v as RegionId;
  return null;
}

export function storeRegionId(id: RegionId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, id);
}

export function resolveRegionId(): RegionId {
  return readStoredRegionId() ?? detectDefaultRegionId();
}

export interface FormattedGameTime {
  /** Primary line for UI e.g. "dom, 4 oct, 21:00" */
  local: string;
  /** Time only e.g. "21:00" */
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
