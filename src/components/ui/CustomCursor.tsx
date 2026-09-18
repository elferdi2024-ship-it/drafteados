"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for high-end fluid feel
  const springX = useSpring(cursorX, { damping: 26, stiffness: 380 });
  const springY = useSpring(cursorY, { damping: 26, stiffness: 380 });

  useEffect(() => {
    // Enable for fine-pointer desktop devices
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-magnetic]") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointerDevice || pathname !== "/") return null;

  return (
    <>
      {/* Outer subtle aura ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full border border-[#FF5A1F]/60"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : isClicking ? 20 : 28,
          height: isHovered ? 48 : isClicking ? 20 : 28,
          backgroundColor: isHovered
            ? "rgba(255, 90, 31, 0.15)"
            : isClicking
            ? "rgba(255, 90, 31, 0.3)"
            : "transparent",
          borderColor: isHovered || isClicking ? "#FF5A1F" : "rgba(255, 90, 31, 0.6)",
          boxShadow: isHovered
            ? "0 0 20px rgba(255, 90, 31, 0.45)"
            : "0 0 10px rgba(255, 90, 31, 0.2)",
          opacity: isVisible ? 1 : 0,
          transition:
            "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, opacity 0.15s ease",
        }}
      />
      {/* Center pinpoint */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-2 w-2 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.7 : 1,
          transition: "transform 0.1s ease, opacity 0.15s ease",
        }}
      />
    </>
  );
}
