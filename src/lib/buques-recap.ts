// filepath: src/lib/buques-recap.ts
import type { BuquesRecap } from "@/types/buques-recap";

/**
 * Carga la narrativa editorial de los Buques para una franquicia.
 * Utiliza import dinámico y retorna null si no existe archivo para el slug.
 */
export async function getBuquesRecap(slug: string): Promise<BuquesRecap | null> {
  if (!slug) return null;

  const normalizedSlug = slug.toLowerCase().trim();

  try {
    const recapModule = await import(`@/data/buques-recaps/${normalizedSlug}.json`);
    return (recapModule.default ?? recapModule) as BuquesRecap;
  } catch {
    return null;
  }
}
