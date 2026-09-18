/**
 * SEO site config — Drafteados
 * Canonical domain: NEXT_PUBLIC_SITE_URL or fallback
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://drafteados.com";

export const SITE_NAME = "Drafteados";
export const SITE_TAGLINE = "Tu Casa NBA en español";
export const SITE_LOCALE = "es_ES";
export const TWITTER_HANDLE = "@drafteados";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-main.png`;
export const DEFAULT_OG_IMAGE_PATH = "/images/og-main.png";
