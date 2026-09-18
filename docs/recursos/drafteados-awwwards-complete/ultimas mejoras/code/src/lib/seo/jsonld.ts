import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "./config";

/** Serialize JSON-LD for <script type="application/ld+json"> */
export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.youtube.com/@DrafteadosNBA",
      "https://www.instagram.com/drafteados/",
      "https://x.com/drafteados",
      "https://www.tiktok.com/@drafteados",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "es",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export interface SportsEventInput {
  name: string;
  startDate: string; // ISO
  url: string;
  homeTeam: string;
  awayTeam: string;
  locationName?: string;
  status?: "EventScheduled" | "EventInProgress" | "EventCompleted";
}

export function sportsEventJsonLd(event: SportsEventInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.name,
    startDate: event.startDate,
    url: event.url,
    eventStatus: `https://schema.org/${event.status || "EventScheduled"}`,
    sport: "Basketball",
    competitor: [
      { "@type": "SportsTeam", name: event.awayTeam },
      { "@type": "SportsTeam", name: event.homeTeam },
    ],
    location: event.locationName
      ? { "@type": "Place", name: event.locationName }
      : undefined,
    organizer: { "@type": "Organization", name: "NBA" },
  };
}

export function sportsTeamJsonLd(input: {
  name: string;
  url: string;
  logo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: input.name,
    url: input.url,
    sport: "Basketball",
    logo: input.logo,
    memberOf: { "@type": "SportsOrganization", name: "NBA" },
  };
}
