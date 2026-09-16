import type { Metadata } from 'next';
import { PickemHeader } from '@/components/pickem/PickemHeader';
import { MobileAppNavigation } from '@/components/pickem/MobileAppNavigation';

export const metadata: Metadata = {
  title: "Drafteados Pick'em | Pronósticos Oficiales NBA",
  description: 'Hacé tus 13 predicciones para la temporada NBA 2026/27 con cromos de colección. Competí contra la comunidad de Buques.',
};

export default function PickemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen font-sans selection:bg-[#FF5A1F] selection:text-white pb-20 md:pb-0">
      <PickemHeader />
      <main className="pt-16 sm:pt-18">
        {children}
      </main>
      <MobileAppNavigation />
    </div>
  );
}
