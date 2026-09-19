// filepath: src/components/nba/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hub-border)] bg-[var(--hub-surface)]/95 backdrop-blur-md text-[var(--hub-text)] shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer lg:bottom-8 lg:right-6"
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
