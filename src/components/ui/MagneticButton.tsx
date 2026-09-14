"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  onClick,
  target,
  rel,
  magneticStrength = 0.25,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({
      x: middleX * magneticStrength,
      y: middleY * magneticStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none overflow-hidden group cursor-pointer";

  const variants = {
    primary:
      "bg-[#FF5A1F] text-white font-semibold hover:bg-[#FF6D38] shadow-[0_4px_25px_rgba(255,90,31,0.35)] hover:shadow-[0_6px_35px_rgba(255,90,31,0.5)] active:scale-[0.98]",
    secondary:
      "bg-white/10 text-white backdrop-blur-md border border-white/15 hover:bg-white/20 hover:border-white/30",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-[#FF5A1F] hover:text-[#FF5A1F]",
    ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs tracking-wider uppercase px-4 py-2 gap-1.5",
    md: "text-sm tracking-wide px-6 py-3 gap-2",
    lg: "text-base tracking-wide font-semibold px-8 py-4 gap-2.5",
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.2 }}
      className="inline-block"
      data-magnetic="true"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
