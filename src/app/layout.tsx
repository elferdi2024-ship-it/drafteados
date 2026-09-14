import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
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

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://drafteados.com"),
  title: "Drafteados | Tu Casa NBA - Web Oficial",
  description:
    "La comunidad que vive el baloncesto como nadie. Análisis táctico de la NBA, debates sin filtro, 3+1 Podcast con Antoni Daimiel y José Manuel Calderón, viajes a EE.UU. y Buques Club.",
  keywords: [
    "Drafteados",
    "NBA",
    "Baloncesto",
    "Tu Casa NBA",
    "Buques",
    "3+1 Podcast",
    "Antoni Daimiel",
    "José Manuel Calderón",
  ],
  authors: [{ name: "Drafteados" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Drafteados | Tu Casa NBA",
    description: "La comunidad que vive el baloncesto como nadie.",
    url: "https://drafteados.com",
    siteName: "Drafteados",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "Drafteados Logo",
      },
    ],
    locale: "es_ES",
    type: "website",
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
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} dark`}
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
