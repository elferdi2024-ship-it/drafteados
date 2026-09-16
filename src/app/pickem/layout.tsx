import type { Metadata } from 'next';
import { PickemHeader } from '@/components/pickem/PickemHeader';

export const metadata: Metadata = {
  title: "Drafteados Pick'em | ¿Quién sabe más de NBA?",
  description: 'Hacé tus 13 predicciones para la temporada NBA 2026/27. Competí contra los Buques y demostrá que sabés más que nadie.',
};

export default function PickemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#080808] min-h-screen text-[#F5F5F5] font-sans selection:bg-[#FF5A1F] selection:text-white">
      <PickemHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
