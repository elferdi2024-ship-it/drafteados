import { Navbar } from "@/components/layout/Navbar";
import { HeroCanvasScrub } from "@/components/hero/HeroCanvasScrub";
import { SocialMarqueeStrip } from "@/components/sections/SocialMarqueeStrip";
import { NbaHubTeaser } from "@/components/sections/NbaHubTeaser";
import { LatestContent } from "@/components/sections/LatestContent";
import { UniverseSection } from "@/components/sections/UniverseSection";
import { CommunityBuque } from "@/components/sections/CommunityBuque";
import { BrandPartners } from "@/components/sections/BrandPartners";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground transition-colors duration-300 min-h-screen overflow-x-clip">
      {/* Fixed Glassmorphism Navigation */}
      <Navbar />

      {/* Hero with 60 FPS 2D Canvas Scrubbing */}
      <HeroCanvasScrub />

      {/* Transición Elegante: Marquee Infinito de Redes y Canales Oficiales */}
      <SocialMarqueeStrip />

      {/* Nueva Sección Oficial: NBA Hub & Marcadores en Vivo */}
      <NbaHubTeaser />

      {/* Narrative Section 2: Últimos Contenidos */}
      <LatestContent />

      {/* Narrative Section 3: Ecosistema Universo Drafteados */}
      <UniverseSection />

      {/* Narrative Section 4: Somos Buques (Comunidad & Manifiesto) */}
      <CommunityBuque />

      {/* Narrative Section 5: Colabora / Marcas */}
      <BrandPartners />

      {/* Footer Oficial */}
      <Footer />
    </main>
  );
}
