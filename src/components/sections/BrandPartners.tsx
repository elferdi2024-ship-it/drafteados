"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, Handshake, Building2, Video, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 45, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 85%",
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
      className="relative z-20 py-24 sm:py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#141416] dark:to-[#0D0D0E] border border-black/10 dark:border-white/10 p-8 sm:p-14 lg:p-20 overflow-hidden shadow-xl dark:shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF5A1F]/15 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column */}
            <div ref={leftColRef} className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-bold uppercase tracking-widest mb-4">
                <Handshake className="w-4 h-4" />
                ALIANZAS &amp; PATROCINIOS DE IMPACTO
              </div>

              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none"
                style={{ fontFamily: "var(--font-title)" }}
              >
                ¿Construimos algo juntos?
              </h2>

              <p className="mt-5 text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                Marcas, creadores, clubes y proyectos deportivos. No hacemos publicidad invasiva: co-creamos narrativas de alto valor que respetan y suman a la mayor comunidad de baloncesto en español.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/10 flex items-center justify-center text-[#FF5A1F] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-bold text-sm sm:text-base">
                      Marcas &amp; Patrocinios
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Integraciones orgánicas de alto valor con una de las audiencias más leales de habla hispana.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-bold text-sm sm:text-base">
                      Creadores &amp; Colaboraciones
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Episodios compartidos, directos en pista y eventos en directo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="mailto:info@drafteados.com"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#FF5A1F]/50 hover:bg-[#FF5A1F]/5 text-zinc-700 dark:text-zinc-200 hover:text-[#FF5A1F] dark:hover:text-white transition-all text-xs sm:text-sm font-medium"
                >
                  <Mail className="w-4 h-4 text-[#FF5A1F]" />
                  <span>Contacto directo: <strong className="text-zinc-900 dark:text-white">info@drafteados.com</strong></span>
                </a>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div ref={formCardRef} className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-xl">
                {formSubmitted ? (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold uppercase text-zinc-900 dark:text-white"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      Mensaje Recibido
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm max-w-sm">
                      Gracias por contactar con la Casa Drafteados. Nuestro equipo
                      revisará tu propuesta y te responderá en menos de 48h.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 text-xs text-[#FF5A1F] hover:underline cursor-pointer"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2 p-1 bg-black/5 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5">
                      {[
                        { id: "marca", label: "Marca" },
                        { id: "creador", label: "Creador" },
                        { id: "prensa", label: "Prensa / Otro" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPartnerType(type.id)}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            partnerType === type.id
                              ? "bg-[#FF5A1F] text-white shadow-sm"
                              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                        Nombre / Organización
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Lucas García / Nike Basketball"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-[#FF5A1F] text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                        Email Corporativo / Personal
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-[#FF5A1F] text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                        Tu Idea o Proyecto
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Cuéntanos brevemente qué tienes en mente..."
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-[#FF5A1F] text-sm resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6D38] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-[0_4px_25px_rgba(255,90,31,0.4)] active:scale-[0.99] cursor-pointer"
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
      </div>
    </section>
  );
}
