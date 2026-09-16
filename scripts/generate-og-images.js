// filepath: scripts/generate-og-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. OG Main Banner (1200x630)
const svgMain = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0A0C" />
      <stop offset="50%" stop-color="#121216" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF5A1F" />
      <stop offset="100%" stop-color="#FF7A3D" />
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#FF5A1F" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FF5A1F" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect x="0" y="0" width="1200" height="6" fill="url(#orangeGrad)" />

  <g transform="translate(90, 80)">
    <rect x="0" y="0" width="230" height="34" rx="17" fill="#FF5A1F" fill-opacity="0.15" stroke="#FF5A1F" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="115" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#FF5A1F" text-anchor="middle" letter-spacing="2.5">TU CASA NBA · DESDE 2017</text>

    <text x="0" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="90" font-weight="900" fill="#FFFFFF" letter-spacing="-2">DRAFTEADOS</text>
    
    <text x="0" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="700" fill="#FF5A1F" letter-spacing="-0.5">LA COMUNIDAD QUE VIVE EL BALONCESTO COMO NADIE</text>

    <text x="0" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#A0A0AB">
      <tspan x="0" dy="0">El cuartel general para los Buques: NBA en directo, clasificación en tiempo real,</tspan>
      <tspan x="0" dy="30">podcast 3+1, pronósticos oficiales, plantillas completas y contenidos diarios.</tspan>
    </text>

    <g transform="translate(0, 360)">
      <rect x="0" y="0" width="190" height="52" rx="12" fill="#18181D" stroke="#2B2B33" stroke-width="1.5" />
      <text x="95" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">🏀 NBA HUB EN VIVO</text>

      <rect x="210" y="0" width="180" height="52" rx="12" fill="#18181D" stroke="#2B2B33" stroke-width="1.5" />
      <text x="300" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">🎙️ 3+1 PODCAST</text>

      <rect x="410" y="0" width="190" height="52" rx="12" fill="#18181D" stroke="#2B2B33" stroke-width="1.5" />
      <text x="505" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">🔥 PICK&apos;EM OFICIAL</text>

      <rect x="620" y="0" width="180" height="52" rx="12" fill="#18181D" stroke="#2B2B33" stroke-width="1.5" />
      <text x="710" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">✈️ EXPERIENCIAS</text>
    </g>

    <g transform="translate(800, 372)">
      <text x="220" y="20" font-family="monospace" font-size="18" font-weight="700" fill="#71717A" text-anchor="end">DRAFTEADOS.COM</text>
    </g>
  </g>
</svg>
`;

// 2. OG NBA Hub Banner (1200x630)
const svgNba = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="nbaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08090C" />
      <stop offset="50%" stop-color="#10131A" />
      <stop offset="100%" stop-color="#050608" />
    </linearGradient>
    <linearGradient id="nbaOrange" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF5A1F" />
      <stop offset="100%" stop-color="#FF3815" />
    </linearGradient>
    <radialGradient id="nbaGlow" cx="85%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FF5A1F" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FF5A1F" stop-opacity="0" />
    </radialGradient>
    <pattern id="nbaGrid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#nbaBg)" />
  <rect width="1200" height="630" fill="url(#nbaGrid)" />
  <rect width="1200" height="630" fill="url(#nbaGlow)" />
  <rect x="0" y="0" width="1200" height="6" fill="url(#nbaOrange)" />

  <g transform="translate(90, 75)">
    <rect x="0" y="0" width="260" height="34" rx="17" fill="#FF5A1F" fill-opacity="0.15" stroke="#FF5A1F" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="130" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#FF5A1F" text-anchor="middle" letter-spacing="2.5">NBA HUB · LOS BUQUES</text>

    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="82" font-weight="900" fill="#FFFFFF" letter-spacing="-2">HOY EN LA NBA</text>
    
    <text x="0" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#FF5A1F" letter-spacing="-0.5">RESULTADOS · CLASIFICACIÓN · CALENDARIO · PLANTILLAS</text>

    <text x="0" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#A0A0AB">
      <tspan x="0" dy="0">El pulso diario de las 30 franquicias. Marcadores oficiales, estadísticas en tiempo real,</tspan>
      <tspan x="0" dy="30">campeón vigente NY Knicks y seguimiento completo de la temporada 2026/27.</tspan>
    </text>

    <g transform="translate(0, 345)">
      <rect x="0" y="0" width="1020" height="90" rx="16" fill="#14161E" stroke="#252A36" stroke-width="1.5" />
      
      <g transform="translate(40, 24)">
        <text x="0" y="16" font-family="monospace" font-size="11" font-weight="700" fill="#71717A" letter-spacing="1.5">CAMPEÓN VIGENTE</text>
        <text x="0" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF">NEW YORK KNICKS 🏆</text>
      </g>

      <line x1="330" y1="20" x2="330" y2="70" stroke="#252A36" stroke-width="1.5" />

      <g transform="translate(370, 24)">
        <text x="0" y="16" font-family="monospace" font-size="11" font-weight="700" fill="#71717A" letter-spacing="1.5">SUBCAMPEÓN 2026</text>
        <text x="0" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF">SAN ANTONIO SPURS</text>
      </g>

      <line x1="680" y1="20" x2="680" y2="70" stroke="#252A36" stroke-width="1.5" />

      <g transform="translate(720, 24)">
        <text x="0" y="16" font-family="monospace" font-size="11" font-weight="700" fill="#71717A" letter-spacing="1.5">TEMPORADA REGULAR</text>
        <text x="0" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FF5A1F">2026 / 2027</text>
      </g>
    </g>
  </g>
</svg>
`;

// 3. OG Pick'em Banner (1200x630)
const svgPickem = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pickBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0906" />
      <stop offset="50%" stop-color="#14110A" />
      <stop offset="100%" stop-color="#070604" />
    </linearGradient>
    <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF5A1F" />
      <stop offset="100%" stop-color="#FF9500" />
    </linearGradient>
    <radialGradient id="pickGlow" cx="80%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FF5A1F" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#FF5A1F" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#pickBg)" />
  <rect width="1200" height="630" fill="url(#pickGlow)" />
  <rect x="0" y="0" width="1200" height="6" fill="url(#fireGrad)" />

  <g transform="translate(90, 80)">
    <rect x="0" y="0" width="280" height="34" rx="17" fill="#FF5A1F" fill-opacity="0.15" stroke="#FF5A1F" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="140" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#FF5A1F" text-anchor="middle" letter-spacing="2">PRONÓSTICO OFICIAL · 2026/27</text>

    <text x="0" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="86" font-weight="900" fill="#FFFFFF" letter-spacing="-2">PICK&apos;EM NBA</text>
    <text x="0" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="700" fill="#FF9500" letter-spacing="-0.5">DEMUESTRA CUÁNTO SABES DE BASKET</text>

    <text x="0" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#A0A0AB">
      <tspan x="0" dy="0">13 predicciones clave de la temporada: Campeón, MVP, ROY, DPOY y sorpresas.</tspan>
      <tspan x="0" dy="30">Suma puntos con cada acierto y sube en el ranking de la comunidad.</tspan>
    </text>

    <g transform="translate(0, 350)">
      <rect x="0" y="0" width="200" height="56" rx="14" fill="#FF5A1F" />
      <text x="100" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">JUGAR AHORA</text>

      <rect x="220" y="0" width="240" height="56" rx="14" fill="#1C1814" stroke="#33281E" stroke-width="1.5" />
      <text x="340" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#E4E4E7" text-anchor="middle" letter-spacing="1">🏆 LEADERBOARD EN VIVO</text>
    </g>
  </g>
</svg>
`;

async function main() {
  console.log('Generating OpenGraph images...');
  await sharp(Buffer.from(svgMain)).png({ quality: 95 }).toFile(path.join(outDir, 'og-main.png'));
  await sharp(Buffer.from(svgNba)).png({ quality: 95 }).toFile(path.join(outDir, 'og-nba.png'));
  await sharp(Buffer.from(svgPickem)).png({ quality: 95 }).toFile(path.join(outDir, 'og-pickem.png'));
  console.log('OpenGraph images generated successfully in public/images/!');
}

main().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
