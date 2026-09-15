// filepath: src/components/sections/BrandPartners.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BrandPartners() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState("marca");
  const [message, setMessage] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setFormSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative z-20 py-20 sm:py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden content-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white dark:bg-[#111113] border border-black/8 dark:border-white/10 p-6 sm:p-12 lg:p-16 overflow-hidden shadow-sm dark:shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF5A1F]/10 rounded-full blur-[140px] pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div ref={leftColRef} className="lg:col-span-6">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-4">
                <span className="w-2 h-0.5 bg-[#FF5A1F]" />
                <span>04 &bull; CONTACTO &amp; ALIANZAS</span>
              </div>

              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none"
                style={{ fontFamily: "var(--font-title)" }}
              >
                ¿Hacemos algo juntos?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                Marcas, creadores y proyectos deportivos. No hacemos publicidad invasiva ni menciones vacías: co-creamos narrativas de alto valor que suman a la mayor comunidad de baloncesto en español.
              </p>

              {/* Editorial Points */}
              <div className="mt-8 space-y-4 border-t border-black/5 dark:border-white/8 pt-6">
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                    Marcas &amp; Patrocinios
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 pl-3.5">
                    Integraciones orgánicas y campañas a medida con una audiencia de más de 880.000 aficionados fieles.
                  </p>
                </div>

                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    Creadores &amp; Colaboraciones
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 pl-3.5">
                    Episodios especiales, directos en pista y presencia en los mayores eventos de la temporada NBA.
                  </p>
                </div>
              </div>

              {/* Direct Access Box */}
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/6 dark:border-white/8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block mb-1">
                  Contacto directo para agencias y marcas
                </span>
                <a
                  href="mailto:info@drafteados.com"
                  className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white hover:text-[#FF5A1F] transition-colors inline-flex items-center gap-2"
                >
                  <span>info@drafteados.com</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF5A1F]" />
                </a>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Revisamos cada mensaje en menos de 48 horas laborables.
                </p>
              </div>
            </div>

            {/* Right Contact Form Column - Clean, Spacious, Native */}
            <div ref={formCardRef} className="lg:col-span-6 w-full">
              {formSubmitted ? (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3
                    className="text-3xl sm:text-4xl font-bold uppercase text-zinc-900 dark:text-white"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Mensaje Recibido
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm max-w-sm">
                    Gracias por contactar con la Casa Drafteados. Nuestro equipo revisará tu propuesta y te responderá a la brevedad.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 text-xs font-bold text-[#FF5A1F] hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    Enviar otro mensaje &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Select Partner Type */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Tipo de alianza
                    </label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-4 py-3.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF5A1F] transition-colors cursor-pointer"
                    >
                      <option value="marca" className="bg-white dark:bg-[#18181B] text-zinc-900 dark:text-white">
                        Marca o Patrocinio Comercial
                      </option>
                      <option value="creador" className="bg-white dark:bg-[#18181B] text-zinc-900 dark:text-white">
                        Creador o Colaboración de Contenido
                      </option>
                      <option value="prensa" className="bg-white dark:bg-[#18181B] text-zinc-900 dark:text-white">
                        Prensa o Cobertura de Medios
                      </option>
                      <option value="otro" className="bg-white dark:bg-[#18181B] text-zinc-900 dark:text-white">
                        Otra propuesta
                      </option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Nombre u Organización
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre o empresa"
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-4 py-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Email de contacto
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-4 py-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Mensaje o Idea del proyecto
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cuéntanos brevemente qué tienes en mente..."
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-4 py-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6D38] active:scale-[0.98] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-[0_6px_25px_rgba(255,90,31,0.35)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar propuesta</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
