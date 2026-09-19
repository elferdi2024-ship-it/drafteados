import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bebas_Neue, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider, themeInitScript } from "@/components/theme";
import { TimezoneProvider, timezoneInitScript } from "@/components/time";
import { SITE_URL } from "@/lib/seo/config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Drafteados | Tu Casa NBA",
    template: "%s | Drafteados",
  },
  description:
    "El cuartel general para los Buques de la NBA desde 2017. Marcadores en directo, clasificación, calendario, plantillas oficiales, 3+1 Podcast y Pick'em.",
  keywords: [
    "Drafteados",
    "NBA",
    "Baloncesto",
    "Tu Casa NBA",
    "Los Buques",
    "3+1 Podcast",
    "Antoni Daimiel",
    "José Manuel Calderón",
    "Resultados NBA",
    "Clasificación NBA",
    "Pick'em NBA",
  ],
  authors: [{ name: "Drafteados", url: SITE_URL }],
  creator: "Drafteados",
  publisher: "Drafteados",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Drafteados · Tu Casa NBA",
    description:
      "El cuartel general para los Buques de la NBA. Marcadores en directo, clasificación, calendario, plantillas oficiales, podcast 3+1 y Pick'em.",
    url: SITE_URL,
    siteName: "Drafteados",
    images: [
      {
        url: `${SITE_URL}/images/og-main.png`,
        secureUrl: `${SITE_URL}/images/og-main.png`,
        width: 1200,
        height: 630,
        alt: "Drafteados · Tu Casa NBA",
        type: "image/png",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drafteados · Tu Casa NBA",
    description:
      "El cuartel general para los Buques de la NBA. Marcadores en directo, clasificación, calendario, plantillas oficiales, podcast 3+1 y Pick'em.",
    site: "@drafteados",
    creator: "@drafteados",
    images: [`${SITE_URL}/images/og-main.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="image_src" href={`${SITE_URL}/images/og-main.png`} />
        <Script
          id="theme-tz-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeInitScript + "\n" + timezoneInitScript,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen selection:bg-[#FF5A1F] selection:text-white font-sans antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <ThemeProvider>
          <TimezoneProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              {children}
            </SmoothScrollProvider>
          </TimezoneProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
