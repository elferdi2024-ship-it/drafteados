// filepath: src/app/pickem/page.tsx
import Link from 'next/link';
import { Target, Lock, Eye, Trophy, CheckCircle2, ArrowRight, Flame, Sparkles, Shield } from 'lucide-react';
import { PredictionCard, type PredictionCardProps } from '@/components/pickem/PredictionCard';
import { PickemHero } from '@/components/pickem/PickemHero';

export default function PickemLandingPage() {
  const predictions: PredictionCardProps[] = [
    {
      prediction: { id: 1, slug: 'scoring-leader', name: 'Máximo Anotador', category: 'LÍDERES', points: 20, seriesNumber: '#01' },
      selectedPlayer: { id: 'p1', name: 'Luka Dončić', nba_id: 1629029, team_abbreviation: 'DAL', team_primary_color: '#00538C' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 2, slug: 'assists-leader', name: 'Líder en Asistencias', category: 'LÍDERES', points: 20, seriesNumber: '#02' },
      selectedPlayer: { id: 'p2', name: 'Tyrese Haliburton', nba_id: 1630169, team_abbreviation: 'IND', team_primary_color: '#002D62' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 3, slug: 'rebounds-leader', name: 'Líder en Rebotes', category: 'LÍDERES', points: 20, seriesNumber: '#03' },
      selectedPlayer: { id: 'p3', name: 'Domantas Sabonis', nba_id: 1627734, team_abbreviation: 'SAC', team_primary_color: '#5A2D81' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 4, slug: 'threes-leader', name: 'Líder en Triples', category: 'LÍDERES', points: 20, seriesNumber: '#04' },
      selectedPlayer: { id: 'p4', name: 'Stephen Curry', nba_id: 201939, team_abbreviation: 'GSW', team_primary_color: '#1D428A' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 5, slug: 'steals-leader', name: 'Líder en Robos', category: 'LÍDERES', points: 20, seriesNumber: '#05' },
      selectedPlayer: { id: 'p5', name: 'Shai Gilgeous-Alexander', nba_id: 1628983, team_abbreviation: 'OKC', team_primary_color: '#007AC1' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 6, slug: 'blocks-leader', name: 'Líder en Tapones', category: 'LÍDERES', points: 20, seriesNumber: '#06' },
      selectedPlayer: { id: 'p6', name: 'Victor Wembanyama', nba_id: 1641705, team_abbreviation: 'SAS', team_primary_color: '#C4CED4' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 7, slug: 'mvp', name: 'MVP de la Temporada', category: 'GALARDONES', points: 30, seriesNumber: '#07' },
      selectedPlayer: { id: 'p7', name: 'Nikola Jokić', nba_id: 203999, team_abbreviation: 'DEN', team_primary_color: '#0E2240' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 8, slug: 'dpoy', name: 'Defensor del Año', category: 'GALARDONES', points: 25, seriesNumber: '#08' },
      selectedPlayer: { id: 'p8', name: 'Bam Adebayo', nba_id: 1628389, team_abbreviation: 'MIA', team_primary_color: '#98002E' },
      isUnderdog: true,
      href: '/pickem/picks',
    },
    {
      prediction: { id: 9, slug: 'roty', name: 'Novato del Año', category: 'GALARDONES', points: 25, seriesNumber: '#09' },
      selectedPlayer: { id: 'p9', name: 'Alex Sarr', nba_id: 1642259, team_abbreviation: 'WAS', team_primary_color: '#002B5C' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 10, slug: 'best-record', name: 'Mejor Récord Global', category: 'FRANQUICIAS', points: 20, seriesNumber: '#10' },
      selectedTeam: { id: 't1', name: 'Boston Celtics', abbreviation: 'BOS', nba_team_id: 1610612738, primary_color: '#007A33' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 11, slug: 'east-champion', name: 'Campeón del Este', category: 'FRANQUICIAS', points: 30, seriesNumber: '#11' },
      selectedTeam: { id: 't2', name: 'New York Knicks', abbreviation: 'NYK', nba_team_id: 1610612752, primary_color: '#006BB6' },
      isUnderdog: true,
      href: '/pickem/picks',
    },
    {
      prediction: { id: 12, slug: 'west-champion', name: 'Campeón del Oeste', category: 'FRANQUICIAS', points: 30, seriesNumber: '#12' },
      selectedTeam: { id: 't3', name: 'Oklahoma City Thunder', abbreviation: 'OKC', nba_team_id: 1610612760, primary_color: '#007AC1' },
      href: '/pickem/picks',
    },
    {
      prediction: { id: 13, slug: 'nba-champion', name: 'Campeón de la NBA', category: 'EL ANILLO', points: 50, seriesNumber: '#13' },
      selectedTeam: { id: 't4', name: 'Boston Celtics', abbreviation: 'BOS', nba_team_id: 1610612738, primary_color: '#007A33' },
      href: '/pickem/picks',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-[#FF5A1F] selection:text-white">
      {/* HERO SECTION EDITORIAL ANIMADO */}
      <PickemHero />

      {/* CÓMO FUNCIONA (EDITORIAL SWISS PLAYBOOK) */}
      <section className="py-20 sm:py-28 bg-black/[0.02] dark:bg-[#0c0c0e] border-b border-black/10 dark:border-white/[0.08] relative transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
              <span className="w-2 h-0.5 bg-[#FF5A1F]" />
              <span>SISTEMA DE JUEGO</span>
              <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            </div>
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-zinc-950 dark:text-white"
              style={{ fontFamily: "var(--font-title)" }}
            >
              EL CAMINO HACIA EL ANILLO
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Cuatro tiempos para sellar tu legado en la comunidad más grande de la NBA en español.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                num: "01",
                title: "ELEGÍ TUS PICKS",
                desc: "13 pronósticos oficiales: líderes estadísticos, galardones individuales y campeones de conferencia.",
              },
              {
                num: "02",
                title: "BLOQUEÁ LA JUGADA",
                desc: "Confirmá tu quinteto y elecciones antes del salto inicial. Tras el cierre, el sistema bloquea ediciones.",
              },
              {
                num: "03",
                title: "VIVÍ CADA JORNADA",
                desc: "Puntuación en tiempo real sincronizada con las estadísticas oficiales de la NBA noche a noche.",
              },
              {
                num: "04",
                title: "RECLAMÁ EL ANILLO",
                desc: "Sumá puntos por acierto, activá multiplicadores underdog y peleá por el número uno del ranking.",
              },
            ].map((step) => (
              <div 
                key={step.num}
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141416] border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between transition-colors"
              >
                <div>
                  <div
                    className="text-5xl sm:text-6xl font-black text-[#FF5A1F] leading-none mb-4"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight uppercase mb-2"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLA DE LAS 13 PREDICCIONES */}
      <section className="py-20 sm:py-28 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-black/10 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-2">
                <span className="w-2 h-0.5 bg-[#FF5A1F]" />
                <span>CATEGORÍAS OFICIALES</span>
              </div>
              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 dark:text-white uppercase"
                style={{ fontFamily: "var(--font-title)" }}
              >
                13 PREDICCIONES
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-1">
                Elegí tus favoritos para la temporada regular y playoffs de la NBA.
              </p>
            </div>

            <Link
              href="/pickem/picks"
              className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white text-xl sm:text-2xl font-black tracking-wider px-7 py-3.5 rounded-xl transition-all hover:scale-105 uppercase"
              style={{ fontFamily: "var(--font-title)" }}
            >
              <span>JUGAR AHORA</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {predictions.map((pred, i) => (
              <PredictionCard key={i} {...pred} />
            ))}
          </div>

          <div className="text-center mt-16 pt-10 border-t border-black/10 dark:border-white/10">
            <Link
              href="/pickem/picks"
              className="inline-flex items-center justify-center gap-3 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white text-2xl sm:text-3xl font-black tracking-wider px-10 py-4.5 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-[#FF5A1F]/25 uppercase"
              style={{ fontFamily: "var(--font-title)" }}
            >
              <span>COMPLETAR MIS 13 PREDICCIONES</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN SOCIAL Y RANKING TEASER */}
      <section className="py-20 sm:py-28 bg-black/[0.02] dark:bg-[#0c0c0e] border-y border-black/10 dark:border-white/10 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
                <span className="w-2 h-0.5 bg-[#FF5A1F]" />
                <span>COMUNIDAD OFICIAL</span>
              </div>
              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 dark:text-white uppercase leading-[0.95]"
                style={{ fontFamily: "var(--font-title)" }}
              >
                COMPETÍ CONTRA<br />
                <span className="text-[#FF5A1F]">LOS BUQUES</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
                Tabla de posiciones en tiempo real calculada con cada partido de la temporada. Compartí tus pronósticos, compará aciertos y peleá por el primer puesto de la comunidad hispanohablante de NBA.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link 
                  href="/pickem/picks" 
                  className="inline-flex items-center justify-center bg-[#FF5A1F] hover:bg-[#FF7A45] text-white text-2xl font-black tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#FF5A1F]/20 uppercase"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  SUMARME AL JUEGO
                </Link>
                <Link 
                  href="/pickem/leaderboard" 
                  className="inline-flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/15 dark:border-white/15 text-zinc-950 dark:text-white text-2xl font-black tracking-wider px-8 py-3.5 rounded-xl transition-colors uppercase"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  TABLA COMPLETA
                </Link>
              </div>
            </div>
            
            {/* Podium Simulation Card */}
            <div className="bg-white dark:bg-[#141416] border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#FF5A1F]" />
                  <span
                    className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-wide uppercase"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    TOP 3 COMUNIDAD
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  TEMPORADA 2026/27
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Jose', points: 310, isBuque: true, medal: '01' },
                  { rank: 2, name: 'Sertxu', points: 285, isBuque: true, medal: '02' },
                  { rank: 3, name: 'ElPibeNBA', points: 280, isBuque: false, medal: '03' },
                ].map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      user.rank === 1 
                        ? 'bg-[#FF5A1F]/5 border-[#FF5A1F]/30 shadow-sm' 
                        : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xl font-black text-[#FF5A1F] leading-none"
                        style={{ fontFamily: "var(--font-title)" }}
                      >
                        {user.medal}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-base text-zinc-950 dark:text-white">{user.name}</span>
                          {user.isBuque && <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />}
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Buque Oficial</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-2xl font-black text-zinc-950 dark:text-white tabular-nums"
                        style={{ fontFamily: "var(--font-title)" }}
                      >
                        {user.points}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 ml-1 font-bold">PTS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="py-24 bg-background transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs uppercase font-black text-[#FF5A1F] tracking-widest">
              DUDAS FRECUENTES
            </span>
            <h2 className="font-title text-5xl tracking-tight text-zinc-900 dark:text-white uppercase">
              PREGUNTAS Y RESPUESTAS
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "¿Qué es Drafteados Pick'em?", a: "Es el juego de predicciones oficial de la comunidad de Drafteados. Elegís a tus favoritos para 13 categorías clave de la NBA antes de que empiece la temporada regular y competís por puntos y posición en el leaderboard." },
              { q: "¿Cuándo se cierran las predicciones?", a: "Se bloquean automáticamente antes del salto inicial del primer partido oficial de la temporada regular 2026/27. Después del cierre, no se aceptan modificaciones." },
              { q: "¿Cómo se calcula la puntuación?", a: "Líderes estadísticos: 20 puntos c/u. Premios individuales: entre 25 y 30 puntos. Campeones de conferencia: 30 puntos. Campeón del anillo NBA: 50 puntos. Máximo teórico: 320 puntos." },
              { q: "¿Puedo editar mis selecciones?", a: "Sí, podés cambiarlas las veces que quieras mientras la temporada esté en estado ABIERTO antes de la fecha límite." },
              { q: "¿Tiene algún costo participar?", a: "Es 100% gratuito para todos los Buques de España y Latinoamérica." },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-sm transition-colors">
                <h3 className="text-zinc-900 dark:text-white font-bold text-base mb-2">{faq.q}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA POSTER */}
      <section className="py-32 bg-gradient-to-b from-[#FF5A1F] to-[#E04810] text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-title text-6xl sm:text-8xl md:text-9xl tracking-tight text-white uppercase leading-[0.88] drop-shadow-md">
            ¿A QUIÉN TE JUGÁS?
          </h2>
          <p className="text-white/90 text-lg sm:text-xl font-medium max-w-xl mx-auto">
            13 categorías. 30 franquicias. Cientos de estrellas. Demostrá que sabés más que nadie.
          </p>
          <div className="pt-4">
            <Link 
              href="/pickem/picks" 
              className="inline-flex items-center justify-center bg-white text-[#080808] hover:bg-neutral-100 font-title text-3xl sm:text-4xl tracking-widest px-14 py-6 rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              HACÉ TUS PICKS AHORA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
