# DRAFTEADOS PICK'EM — ARCHITECTURE DECISION RECORDS (ADRs)
**Mission 01 Output**  
Versión 1.0

---

## ADR-001 — Dónde vive Pick’em

**Estado**: Aceptado  

**Contexto**  
El sitio actual es una landing de marketing de alta calidad. Hay que añadir un producto nuevo (Pick’em) sin destruir lo existente.

**Decisión**  
Pick’em se implementa como **módulo dentro del mismo proyecto Next.js**, bajo la ruta `/pickem` y subrutas (`/pickem/season`, `/pickem/leaderboard`, etc.).

**Consecuencias**
- Ventajas: mismos design tokens, mismo deploy, coherencia de marca, menos overhead.
- Desventajas: hay que ser disciplinado para no contaminar la landing.
- Mitigación: carpetas y layouts claramente separados.

**Alternativas consideradas**
- Proyecto separado / subdominio → más aislamiento pero más fricción de marca y deploy.
- Micro-frontend → overkill para este tamaño.

---

## ADR-002 — Proveedor de datos NBA

**Estado**: Aceptado  

**Contexto**  
Se necesitan jugadores, equipos y (más adelante) estadísticas y resultados reales.

**Decisión**
1. MVP y desarrollo: **MockProvider** completo y realista.
2. Bootstrap de datos reales: BallDontLie o nba_api (solo server-side).
3. Producción a medio plazo: Sportradar (cuando el producto justifique el coste).

**Consecuencias**
- Desarrollo offline 100 % posible.
- No se depende de rate limits ni de APIs inestables en el día 1.
- Se puede cambiar de proveedor sin tocar la UI ni el scoring.

---

## ADR-003 — Abstracción BasketballDataProvider

**Estado**: Aceptado  

**Contexto**  
Evitar acoplar el código a un proveedor concreto.

**Decisión**  
Crear la interface `BasketballDataProvider` desde el primer día e implementar primero el MockProvider.

**Consecuencias**
- Código más limpio y testeable.
- Facilita futuras migraciones de datos.
- Pequeño overhead inicial que se paga solo.

---

## ADR-004 — Dónde vive el scoring

**Estado**: Aceptado  

**Contexto**  
El scoring debe ser confiable, auditable e imposible de manipular desde el cliente.

**Decisión**  
El scoring es **100 % server-authoritative**.  
Vive en `lib/pickem/scoring.ts` + tablas `predictions` y `scoring_events`.  
El cliente nunca envía ni calcula puntos finales.

**Consecuencias**
- Seguridad alta.
- Posibilidad de recalcular todo.
- Necesita buen diseño de idempotencia.

---

## ADR-005 — Cómo se bloquean las predicciones

**Estado**: Aceptado  

**Contexto**  
Hay que impedir cambios después del deadline.

**Decisión**
- Fecha de lock almacenada en la tabla `seasons` (o por `prediction_type` si en el futuro se necesita granularidad).
- El frontend muestra estado LOCKED.
- La seguridad real es validación server-side en el momento del lock y en cualquier intento de modificación posterior.
- Una vez `status = LOCKED`, solo el sistema de resolución puede cambiar el estado.

**Consecuencias**
- Imposible hacer trampa cambiando el cliente.
- Flujo claro para el usuario (“Ahora bancátela”).

---

## ADR-006 — Cómo se almacenan los resultados

**Estado**: Aceptado  

**Contexto**  
Hay que poder resolver la temporada de forma confiable y recalcular si es necesario.

**Decisión**
- Resultados oficiales se cargan (manual o por sync) en tablas de stats / standings / awards.
- La resolución genera `scoring_events` (append-only) y actualiza `predictions`.
- Se guarda `raw_data` cuando viene de providers para auditoría.

**Consecuencias**
- Trazabilidad completa.
- Posibilidad de re-score si hay correcciones oficiales.

---

## ADR-007 — Cómo se integra la autenticación

**Estado**: Aceptado  

**Contexto**  
Se necesita identidad de usuario para predicciones, ranking y perfil.

**Decisión**
- **Supabase Auth**
- Providers MVP: Google + Email (password o magic link)
- Integración con Next.js vía `@supabase/ssr`
- Tabla pública `profiles` separada de `auth.users`
- Creación automática de profile al primer login/registro
- Username único obligatorio

**Consecuencias**
- Auth moderna, segura y con buen DX.
- Compatible con Cloudflare Pages.
- RLS natural sobre los datos de usuario.

---

## ADR-008 — Cómo se implementa el ranking

**Estado**: Aceptado  

**Contexto**  
El ranking es parte central de la experiencia competitiva.

**Decisión**
- Vista (o materializada) `leaderboard` que agrega `points_awarded` y aciertos por `user_id` + `season_id`.
- Orden principal: puntos totales.
- Secundario: accuracy / número de aciertos.
- Público (lectura).
- Perfil muestra rank global + stats personales.

**Consecuencias**
- Consultas simples y rápidas.
- Se puede optimizar después con materialización o cache si crece mucho.

---

## ADR-009 — Hosting y base de datos

**Estado**: Aceptado  

**Contexto**  
El sitio actual está en el ecosistema Cloudflare. Se busca simplicidad y bajo coste.

**Decisión**
- **Frontend + API routes**: Cloudflare Pages
- **Auth + PostgreSQL + Storage**: Supabase

**Razones**
- Cloudflare Pages mantiene el stack de despliegue actual.
- Supabase ofrece Auth + DB + RLS + Storage en un solo lugar, con excelente integración SSR.
- Combinación barata, escalable y moderna para este tamaño de producto.

**Alternativas descartadas**
- Solo Cloudflare (D1 + Workers Auth) → más trabajo y menos features de auth listas.
- Vercel + Supabase → también válido, pero se prioriza mantener Cloudflare.

---

## ADR-010 — Número de predicciones en MVP

**Estado**: Aceptado  

**Contexto**  
El Master Build Pack proponía 19. Se busca un MVP no engorroso pero completo.

**Decisión**  
**13 predicciones** (rango 12-14):

- 6 líderes estadísticos
- 4-5 awards
- 3-4 de equipos / conferencias / campeón

**Consecuencias**
- Experiencia más corta y divertida.
- Menos carga de resolución y de UI.
- Fácil de ampliar en temporadas siguientes.

---

## ADR-011 — Tono y voz de marca

**Estado**: Aceptado  

**Contexto**  
Drafteados tiene una identidad muy marcada.

**Decisión**  
Todo el copy, microcopy, estados de error, empty states y share cards deben estar escritos en **tono Drafteados**:

- Directo
- Competitivo
- Friendly
- Sports-aware
- Ligeramente provocativo
- Latino / “Buques”

Ejemplos de espíritu:
- «¿A quién te jugás?»
- «Te la jugaste.»
- «Ahora bancátela.»
- «You called it.»
- «Locked.»

**Consecuencias**
- Coherencia total con el resto del universo Drafteados.
- Mayor engagement emocional.

---

## Resumen de Decisiones Clave

| ADR | Decisión principal |
|-----|---------------------|
| 001 | Pick’em como módulo `/pickem` dentro del mismo proyecto |
| 002 | Mock primero → BallDontLie/nba_api → Sportradar |
| 003 | Provider abstraction desde día 1 |
| 004 | Scoring 100 % server-side |
| 005 | Lock server-side con fecha de temporada |
| 006 | Resultados + scoring_events auditables |
| 007 | Supabase Auth (Google + Email) |
| 008 | Leaderboard vía vista agregada |
| 009 | Cloudflare Pages + Supabase |
| 010 | 13 predicciones en MVP |
| 011 | Tono 100 % Drafteados |

---

**Fin de los ADRs**  
Estas decisiones quedan fijadas para la implementación. Cualquier cambio posterior requerirá un nuevo ADR.