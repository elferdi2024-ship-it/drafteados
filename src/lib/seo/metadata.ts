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
 * Canonical metadata builder for Next.js App Router.
 * Generates absolute canonical URLs, Open Graph and Twitter cards.
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

  const resolvedImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const imageType = resolvedImage.endsWith(".png") ? "image/png" : "image/jpeg";

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
          url: resolvedImage,
          secureUrl: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
          type: imageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription,
      images: [resolvedImage],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
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
    "El cuartel general para los Buques de la NBA desde 2017. Marcadores en directo, clasificación, calendario, plantillas oficiales, 3+1 Podcast y Pick'em.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
  },
};
