# DRAFTEADOS PICK'EM — IMPLEMENTATION PLAN
**Mission 01 Output**  
Versión 1.0  
Temporada objetivo: NBA 2026/27  
Alcance MVP: 12-14 predicciones  
Hosting: Cloudflare Pages  
Auth + DB: Supabase  
Tono: 100 % Drafteados

---

## 1. Objetivo del MVP

Construir una experiencia de predicciones NBA que se sienta como **un juego competitivo de los Buques**, no como un formulario ni un dashboard.

Flujo principal:
```
DISCOVER → START → PICK → REVIEW → LOCK → WATCH → SCORE → RANK → SHARE
```

El usuario debe poder:
1. Entrar a `/pickem`
2. Registrarse / iniciar sesión (Google + email)
3. Completar 12-14 predicciones
4. Revisar y bloquear antes del deadline
5. Ver su puntuación y ranking
6. Compartir sus picks
7. Consultar su perfil

---

## 2. Alcance de Predicciones (MVP)

**12-14 predicciones recomendadas** (priorizadas por impacto y facilidad de resolución):

### Player Stats (6)
- Scoring Leader (PTS)
- Assists Leader (AST)
- Rebounds Leader (REB)
- Three-Point Leader (3PM)
- Steals Leader (STL)
- Blocks Leader (BLK)

### Awards (4-5)
- MVP
- DPOY
- ROY
- Sixth Man
- Most Improved (opcional)

### Teams / Conferences / Finals (3-4)
- Best Record
- East Champion
- West Champion
- NBA Champion

**Total objetivo: 13 predicciones**  
(Se puede subir a 14 si se incluye Finals Length o Worst Record).

Puntuación sugerida (ajustable):
- Stats leaders: 20 pts
- Awards: 20-30 pts
- Conference champions: 30 pts
- NBA Champion: 50 pts

---

## 3. Fases de Implementación

### Phase 0 — Preparación (ya hecha)
- Auditoría
- Decisiones de arquitectura
- Documentación

### Phase 1 — Foundation
- Crear estructura de carpetas `/app/pickem` y `components/pickem`
- Configurar Supabase (proyecto nuevo o existente)
- Setup de clientes `@supabase/ssr` (browser + server)
- Design tokens compartidos (colores, tipografía)
- Layout base de Pick’em con navegación propia

### Phase 2 — Database & Types
- Migraciones Supabase:
  - `profiles`
  - `seasons`
  - `teams`
  - `players`
  - `prediction_types`
  - `predictions`
  - `scoring_events`
- RLS policies
- Tipos TypeScript generados
- Seed de temporada 2026/27 + 13 prediction types + mock data

### Phase 3 — Data Provider Layer
- Interface `BasketballDataProvider`
- `MockProvider` completo (30 teams + 150+ players + stats mock)
- Normalizers + Zod schemas
- Asset resolver (headshots con fallback CSS)

### Phase 4 — Auth
- Google OAuth
- Email + password / magic link
- Middleware de protección de rutas `/pickem/*`
- Creación automática de `profile` al registrarse
- Username único

### Phase 5 — Prediction Engine (Core)
- Modelo de predicción
- Validación de selección
- Lock server-side (fecha de temporada)
- Scoring engine idempotente
- Resolución de predicciones
- Recálculo de leaderboard

### Phase 6 — UX del Flujo de Picks
- Landing `/pickem`
- Pantalla de predicciones con progreso
- Player Selector (modal/drawer mobile-first)
- Team Selector
- Review screen
- Lock screen + confirmación
- Post-lock state

### Phase 7 — Leaderboard & Profile
- Leaderboard global (vista o materializada)
- Perfil de usuario (`@username`, puntos, accuracy, rank)
- Estados vacíos y loading

### Phase 8 — Share
- Generación de share card (Satori / @vercel/og o equivalente compatible con Cloudflare)
- Formato 1080×1350
- Copy Drafteados + CTA “¿Podés ganarme?”

### Phase 9 — Admin Mínimo
- Ruta protegida `/admin/pickem` (solo service role / emails autorizados)
- Ver temporada, predicciones enviadas, resolver resultados, recalcular scores

### Phase 10 — Real Data (opcional en MVP)
- Conectar BallDontLie o nba_api solo para bootstrap de players/teams
- Sync jobs básicos (manual o cron)

### Phase 11 — QA & Polish
- Unit tests (scoring, lock, validation)
- E2E del flujo principal (Playwright)
- Mobile-first (390×844 como referencia)
- Motion con GSAP (entradas, selección, lock)
- Performance check

### Phase 12 — Launch
- Deploy a Cloudflare Pages
- Variables de entorno
- Monitoreo básico

---

## 4. Estructura de Carpetas Recomendada (dentro del repo actual)

```
app/
├── (marketing)/          ← landing actual (NO TOCAR)
├── pickem/
│   ├── page.tsx          ← landing Pick’em
│   ├── season/
│   ├── review/
│   ├── locked/
│   ├── leaderboard/
│   ├── profile/
│   └── layout.tsx
├── admin/
│   └── pickem/
└── api/
    └── pickem/           ← route handlers si hacen falta

components/
├── pickem/
│   ├── PredictionCard.tsx
│   ├── PlayerSelector.tsx
│   ├── TeamSelector.tsx
│   ├── ProgressBar.tsx
│   ├── LeaderboardTable.tsx
│   ├── ShareCard.tsx
│   └── ...
└── ui/                   ← componentes base reutilizables

lib/
├── supabase/
├── pickem/
│   ├── scoring.ts
│   ├── locking.ts
│   ├── rules.ts
│   └── types.ts
├── basketball/
│   ├── providers/
│   │   ├── interface.ts
│   │   ├── mock.ts
│   │   └── ...
│   └── normalize.ts
└── utils/

db/                       ← o supabase/migrations
├── migrations/
└── seeds/
```

---

## 5. Dependencias Recomendadas (no instalar todavía)

| Package                    | Propósito                          | Notas |
|----------------------------|------------------------------------|-------|
| `@supabase/supabase-js`    | Cliente Supabase                   | Obligatorio |
| `@supabase/ssr`            | Auth SSR con Next.js               | Obligatorio |
| `zod`                      | Validación de datos y schemas      | Obligatorio |
| `gsap`                     | Motion premium                     | Ya se usa / muy probable |
| `lucide-react`             | Iconos                             | Ligero y limpio |
| `@vercel/og` o `satori`    | Generación de share cards          | Evaluar compatibilidad Cloudflare |
| `vitest` + `playwright`    | Testing                            | Fase final |

---

## 6. Criterios de Aceptación del MVP

**Usuario**
- [ ] Puede registrarse e iniciar sesión
- [ ] Puede completar las 13 predicciones
- [ ] Puede revisar y bloquear
- [ ] No puede modificar después del lock
- [ ] Ve su ranking y puntos
- [ ] Puede compartir

**Backend**
- [ ] Scoring es server-authoritative
- [ ] No se pueden duplicar puntos
- [ ] RLS protege datos de usuario
- [ ] Admin puede resolver temporada

**Producto**
- [ ] Se siente como un juego, no como un formulario
- [ ] Mobile-first
- [ ] Tono 100 % Drafteados
- [ ] No rompe la landing actual

---

## 7. Estimación de Complejidad

**Media-Alta** para un MVP bien hecho.

Razones:
- Hay que construir auth + DB + scoring desde cero
- La UX de selección de jugadores debe ser excelente
- Share cards y leaderboard añaden complejidad

Con foco estricto en las 13 predicciones y sin ligas/playoffs/badges, es **manejable**.

---

## 8. Próximo Paso

Una vez aprobada esta planificación y los ADRs → **Mission 02: Foundation**  
(crear estructura, Supabase, tokens de diseño y layout base de `/pickem`).

---

**Fin del PICKEM_IMPLEMENTATION_PLAN.md**