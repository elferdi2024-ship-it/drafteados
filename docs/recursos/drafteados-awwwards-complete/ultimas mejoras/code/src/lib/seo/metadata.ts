import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_LOCALE,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
} from "./config";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Canonical metadata helper for App Router pages.
 * Title should already include brand or will be templated by root layout.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const cleanDescription =
    description.length > 160 ? `${description.slice(0, 157)}…` : description;

  return {
    title,
    description: cleanDescription,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      title,
      description: cleanDescription,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription,
      images: [image],
      creator: TWITTER_HANDLE,
    },
  };
}

/** Root layout template suggestion */
export const rootMetadataBase: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Análisis, directos y la comunidad NBA en español. Marcadores, calendario, Pick'em y más.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
  },
};
