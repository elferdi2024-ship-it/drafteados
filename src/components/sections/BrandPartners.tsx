// filepath: src/components/sections/BrandPartners.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, ArrowUpRight, MapPin, Mail, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BrandPartners() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState<"marca" | "creador" | "prensa" | "otro">("marca");
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
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 92%",
              once: true,
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
            duration: 0.9,
            delay: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 92%",
              once: true,
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
      className="relative z-20 py-16 sm:py-24 lg:py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden content-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white dark:bg-[#111113] border border-black/8 dark:border-white/10 p-5 sm:p-10 lg:p-14 overflow-hidden shadow-sm dark:shadow-2xl">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF5A1F]/10 rounded-full blur-[140px] pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Narrative Column */}
            <div ref={leftColRef} className="lg:col-span-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-3 sm:mb-4">
                <span className="w-2 h-0.5 bg-[#FF5A1F]" />
                <span>04 &bull; CONTACTO &bull; ALIANZAS</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Crezcamos Juntos
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                ¿Eres una marca y quieres trabajar con nosotros? ¿Eres un creador de contenido y buscas colaboraciones? Seas quién seas, estamos encantados de hablar contigo.
              </p>

              {/* Editorial Points */}
              <div className="mt-6 sm:mt-8 space-y-3.5 border-t border-black/5 dark:border-white/8 pt-5 sm:pt-6">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A1F] mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wide font-mono">
                      Marcas &amp; Patrocinios
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      Integraciones orgánicas y proyectos a medida ante una audiencia fiel de más de 880.000 aficionados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wide font-mono">
                      Creadores &amp; Colaboraciones
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      Episodios especiales en YouTube, podcast 3+1 y presencia in situ en los mayores eventos NBA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Access Box */}
              <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/6 dark:border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">
                    Contacto directo oficial
                  </span>
                  <a
                    href="mailto:info@drafteados.com"
                    className="text-base font-bold text-zinc-900 dark:text-white hover:text-[#FF5A1F] transition-colors inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-4 h-4 text-[#FF5A1F]" />
                    <span>info@drafteados.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 border-black/5 dark:border-white/5 pt-2 sm:pt-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">
                    Ubicación
                  </span>
                  <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 flex items-center sm:justify-end gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>Madrid, España</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div ref={formCardRef} className="lg:col-span-6 w-full">
              {formSubmitted ? (
                <div className="py-12 sm:py-16 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold uppercase text-zinc-900 dark:text-white"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Mensaje Recibido
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm max-w-sm">
                    Gracias por contactar con Drafteados. Nuestro equipo revisará tu propuesta y te responderá a la brevedad.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-5 text-xs font-mono font-bold text-[#FF5A1F] hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    Enviar otro mensaje &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Segmented Control for Partner Type */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Tipo de propuesta
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "marca", label: "Marca" },
                        { id: "creador", label: "Creador" },
                        { id: "prensa", label: "Prensa" },
                        { id: "otro", label: "Otro" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPartnerType(tab.id as any)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                            partnerType === tab.id
                              ? "bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm"
                              : "bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 border-black/10 dark:border-white/10 hover:border-[#FF5A1F]/50"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Nombre u Organización
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre o empresa"
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-3.5 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Email de contacto
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-3.5 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Mensaje o Idea
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cuéntanos brevemente qué tienes en mente..."
                      className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 rounded-xl px-3.5 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6D38] active:scale-[0.98] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-[0_6px_25px_rgba(255,90,31,0.35)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Propuesta</span>
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
