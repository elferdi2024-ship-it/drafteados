// filepath: scripts/capture-pickem.mjs
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const SCREENSHOTS_DIR = 'C:/Users/PC/.gemini/antigravity/brain/aa1eec03-ef2f-4512-bf36-691f9fceb576/screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log('Iniciando Chromium...');
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 1. Landing Hero Desktop
  console.log('1. Navegando a /pickem (Desktop)...');
  await page.goto('http://localhost:3000/pickem', { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '01_landing_hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  // 2. Landing Grilla de Cromos Desktop
  const cardsHeading = page.locator('h2').filter({ hasText: '13 PREDICCIONES' });
  await cardsHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '02_landing_trading_cards.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 },
  });

  // 3. Flujo interactivo de picks Desktop
  console.log('2. Navegando a /pickem/picks...');
  await page.goto('http://localhost:3000/pickem/picks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // 4. Abrir Selector de Jugador
  console.log('3. Abriendo selector de jugador...');
  const firstCard = page.locator('text=ELEGIR CANDIDATO').first();
  await firstCard.click();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '04_player_selector_heatmap.png'),
  });

  // 5. Seleccionar Luka Doncic
  console.log('4. Seleccionando a Luka Doncic...');
  const lukaOption = page.locator('button').filter({ hasText: 'Luka Doncic' }).first();
  if (await lukaOption.isVisible()) {
    await lukaOption.click();
    await page.waitForTimeout(600);
  }

  // 6. Seleccionar un equipo
  console.log('5. Seleccionando franquicia...');
  const remainingCards = page.locator('text=ELEGIR CANDIDATO');
  const count = await remainingCards.count();
  if (count > 0) {
    // Click the last card (usually team/finals)
    await remainingCards.nth(count - 1).click();
    await page.waitForTimeout(600);
    const celticsOption = page.locator('button').filter({ hasText: 'Boston Celtics' }).first();
    if (await celticsOption.isVisible()) {
      await celticsOption.click();
      await page.waitForTimeout(600);
    }
  }

  // 7. Captura de estado con selecciones activas
  console.log('6. Capturando picks en progreso...');
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '05_picks_populated_hud.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 },
  });

  await context.close();

  // 8. Captura Mobile (390 x 844 iPhone 14)
  console.log('7. Capturando en vista móvil (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/pickem', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1400);
  await mobilePage.screenshot({
    path: path.join(SCREENSHOTS_DIR, '06_mobile_landing.png'),
  });

  await mobilePage.goto('http://localhost:3000/pickem/picks', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(SCREENSHOTS_DIR, '07_mobile_picks.png'),
  });

  await mobileContext.close();
  await browser.close();
  console.log('Todas las capturas finalizadas con éxito.');
}

run().catch((err) => {
  console.error('Error en la simulación:', err);
  process.exit(1);
});
