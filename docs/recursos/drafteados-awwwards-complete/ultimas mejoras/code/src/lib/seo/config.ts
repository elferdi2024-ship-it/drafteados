/**
 * SEO site config — adjust SITE_URL to production domain
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.drafteados.com";

export const SITE_NAME = "Drafteados";
export const SITE_TAGLINE = "Tu casa NBA en español";
export const SITE_LOCALE = "es_ES";
export const TWITTER_HANDLE = "@Drafteados"; // adjust if needed

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;
/** Fallback path in /public if absolute URL not ready */
export const DEFAULT_OG_IMAGE_PATH = "/og/default.png";
