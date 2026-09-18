/**
 * DRAFTEADOS — HERO SCROLL SCRUBBING PERFORMANCE AUDITOR
 * Pega este script en la consola de Chrome DevTools (F12) en la home (/)
 * para monitorear en tiempo real FPS, frame drops, latencia de renderizado
 * y memoria utilizada durante el scroll del Hero.
 */

(function runHeroScrollAuditor() {
  const canvas = document.querySelector("#hero-canvas-section canvas");
  const heroSection = document.getElementById("hero-canvas-section");

  if (!canvas || !heroSection) {
    console.error("❌ No se encontró el componente HeroCanvasScrub (#hero-canvas-section)");
    return;
  }

  console.log("%c🏀 DRAFTEADOS — AUDITOR DE SCROLL HERO ACTIVADO", "color: #FF5A1F; font-size: 16px; font-weight: bold;");
  console.log("Desliza hacia abajo y arriba por el hero para capturar métricas en tiempo real...");

  let frameCount = 0;
  let lastTime = performance.now();
  let fpsHistory = [];
  let droppedFrames = 0;
  let maxDrawLatency = 0;

  // HUD Visual Overlay
  const hud = document.createElement("div");
  hud.id = "hero-audit-hud";
  Object.assign(hud.style, {
    position: "fixed",
    top: "80px",
    right: "20px",
    zIndex: "999999",
    background: "rgba(10, 10, 10, 0.90)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 90, 31, 0.4)",
    borderRadius: "12px",
    padding: "14px 18px",
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontSize: "12px",
    lineHeight: "1.6",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    pointerEvents: "none",
    minWidth: "220px",
  });
  document.body.appendChild(hud);

  let active = true;

  function measureLoop(now) {
    if (!active) return;
    frameCount++;
    const delta = now - lastTime;

    if (delta >= 1000) {
      const currentFPS = Math.round((frameCount * 1000) / delta);
      fpsHistory.push(currentFPS);
      if (fpsHistory.length > 30) fpsHistory.shift();

      if (currentFPS < 55) {
        droppedFrames += (60 - currentFPS);
      }

      const avgFPS = Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length);
      const fpsColor = currentFPS >= 58 ? "#10B981" : currentFPS >= 45 ? "#F59E0B" : "#EF4444";

      const memory = window.performance?.memory ? (window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1) + " MB" : "N/A";

      hud.innerHTML = `
        <div style="font-weight: bold; color: #FF5A1F; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; margin-bottom: 6px;">
          HERO SCROLL TELEMETRY
        </div>
        <div>FPS Instantáneo: <span style="color:${fpsColor}; font-weight:bold; font-size:14px;">${currentFPS}</span></div>
        <div>FPS Promedio: <span style="font-weight:bold;">${avgFPS}</span></div>
        <div>Frames Caídos: <span style="color:${droppedFrames > 10 ? '#EF4444' : '#10B981'};">${droppedFrames}</span></div>
        <div>JS Heap RAM: <span>${memory}</span></div>
        <div>Canvas Buffer: <span>${canvas.width}x${canvas.height}</span></div>
        <div style="font-size: 10px; color: #888; margin-top: 6px;">Pulsa ESC para detener auditoría</div>
      `;

      frameCount = 0;
      lastTime = now;
    }

    requestAnimationFrame(measureLoop);
  }

  requestAnimationFrame(measureLoop);

  window.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") {
      active = false;
      hud.remove();
      window.removeEventListener("keydown", onEsc);
      console.log("%c🛑 Auditoría del Hero finalizada.", "color: #FF5A1F; font-weight: bold;");
    }
  });
})();
