import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { HeroVideoScrub } from "@/components/hero/HeroVideoScrub";

// Lazy loaded below-the-fold sections for optimized LCP and lightweight initial payload
const LatestContent = dynamic(
  () =>
    import("@/components/sections/LatestContent").then(
      (mod) => mod.LatestContent
    ),
  {
    loading: () => (
      <div className="h-96 w-full bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF5A1F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const UniverseSection = dynamic(
  () =>
    import("@/components/sections/UniverseSection").then(
      (mod) => mod.UniverseSection
    ),
  {
    loading: () => (
      <div className="h-96 w-full bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF5A1F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const CommunityBuque = dynamic(
  () =>
    import("@/components/sections/CommunityBuque").then(
      (mod) => mod.CommunityBuque
    ),
  {
    loading: () => (
      <div className="h-96 w-full bg-[#0B0B0C]" />
    ),
  }
);

const BrandPartners = dynamic(
  () =>
    import("@/components/sections/BrandPartners").then(
      (mod) => mod.BrandPartners
    ),
  {
    loading: () => (
      <div className="h-96 w-full bg-[#0A0A0A]" />
    ),
  }
);

const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  {
    loading: () => (
      <div className="h-64 w-full bg-[#070708]" />
    ),
  }
);

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] text-white min-h-screen">
      {/* Fixed Glassmorphism Navigation */}
      <Navbar />

      {/* Hero with GSAP ScrollTrigger Video Scrubbing (Critical LCP Zone) */}
      <HeroVideoScrub />

      {/* Narrative Section 2: Últimos Contenidos */}
      <LatestContent />

      {/* Narrative Section 3: Universo Drafteados (2x2 Cards) */}
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
