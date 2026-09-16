import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
  metadataBase: new URL("https://drafteados.com"),
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
  authors: [{ name: "Drafteados", url: "https://drafteados.com" }],
  creator: "Drafteados",
  publisher: "Drafteados",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Drafteados · Tu Casa NBA | La Comunidad de los Buques",
    description:
      "La comunidad que vive el baloncesto como nadie. Marcadores en vivo, clasificación Este/Oeste, podcast 3+1, pronósticos oficiales y experiencias.",
    url: "https://drafteados.com",
    siteName: "Drafteados",
    images: [
      {
        url: "/images/og-main.png",
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
      "La comunidad que vive el baloncesto como nadie. Marcadores en vivo, podcast 3+1 y análisis diario.",
    site: "@drafteados",
    creator: "@drafteados",
    images: ["/images/og-main.png"],
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
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="light"){document.documentElement.classList.remove("dark");}else if(s==="dark"){document.documentElement.classList.add("dark");}else if(!d){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen selection:bg-[#FF5A1F] selection:text-white font-sans antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
