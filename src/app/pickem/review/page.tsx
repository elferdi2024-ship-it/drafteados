import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Revisá tus Picks",
  description: "Resumen de tus 13 selecciones antes del cierre de temporada.",
  path: "/pickem/review",
  noIndex: true,
});

export default function ReviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageHeader
        eyebrow="TEMPORADA NBA 2026/27 · PRONÓSTICO OFICIAL"
        title="Revisá tus Picks"
        description="Resumen de tus 13 selecciones antes del cierre de temporada."
        actions={
          <Link
            href="/pickem/picks"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a los Picks</span>
          </Link>
        }
      />
      <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-12 text-center">
        <CheckCircle2 className="w-12 h-12 text-[var(--color-brand-primary)] mx-auto mb-4 opacity-80" />
        <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-2 uppercase">
          Tus selecciones están seguras
        </h2>
        <p className="font-sans text-sm text-[var(--color-text-muted)] max-w-md mx-auto mb-6">
          Podés editar tus pronósticos las veces que quieras mientras la temporada esté abierta antes del salto inicial.
        </p>
        <Link
          href="/pickem/picks"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white font-display text-lg tracking-wider transition-all uppercase"
        >
          <span>Ir al Tablero de Picks</span>
        </Link>
      </div>
    </div>
  );
}

