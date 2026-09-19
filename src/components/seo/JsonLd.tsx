import { jsonLdScript } from "@/lib/seo/jsonld";

/** Server Component: inject JSON-LD without client JS */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}
