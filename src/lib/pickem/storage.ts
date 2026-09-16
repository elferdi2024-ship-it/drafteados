// filepath: src/lib/pickem/storage.ts
/**
 * Helper para manejo de predicciones en modo invitado (localStorage)
 * y migración automática cuando el usuario inicia sesión.
 */

const STORAGE_KEY_PREFIX = 'drafteados_picks_v2_';

export interface LocalPickMap {
  [predictionTypeId: string]: {
    playerId?: string | null;
    teamId?: string | null;
  };
}

export function getStorageKey(seasonId: string): string {
  return `${STORAGE_KEY_PREFIX}${seasonId}`;
}

export function getGuestPicks(seasonId: string): LocalPickMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(getStorageKey(seasonId));
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveGuestPicks(seasonId: string, picks: LocalPickMap): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(seasonId), JSON.stringify(picks));
  } catch {}
}

export function clearGuestPicks(seasonId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(getStorageKey(seasonId));
  } catch {}
}

export function hasGuestPicks(seasonId: string): boolean {
  const picks = getGuestPicks(seasonId);
  return Object.keys(picks).length > 0;
}
