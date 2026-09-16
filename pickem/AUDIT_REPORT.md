# DRAFTEADOS PICK'EM — AUDIT REPORT
**Mission 01 — Project Audit & Architecture**  
Versión 1.0 — Read-Only  
Fecha: 15 de septiembre de 2026  
Sitio auditado: https://drafteados.elferdi2024.workers.dev/  
Dominio oficial de referencia: https://www.drafteados.com/

---

## 1. Resumen Ejecutivo

El sitio actual de Drafteados es una **landing de marketing premium** de alta calidad visual. No es una aplicación con usuarios, predicciones ni datos NBA en tiempo real. 

Pick’em debe construirse como **módulo nuevo** dentro del mismo proyecto Next.js, accesible como pestaña/sección (`/pickem`), sin tocar la experiencia de marketing actual.

**Veredicto general**  
- Stack actual: sólido y moderno → reutilizable.  
- Branding y tono: excelentes → deben preservarse al 100 %.  
- Funcionalidad social / auth / datos: inexistente → hay que construir desde cero.  
- Los documentos generados por ChatGPT (Master Build Pack) son técnicamente muy buenos pero **sobredimensionados** para un MVP. Se recomienda un alcance más realista de 12-14 predicciones.

---

## 2. Stack Actual (Fuente de Verdad)

| Capa              | Tecnología                          | Evidencia |
|-------------------|-------------------------------------|---------|
| Framework         | Next.js (App Router + Turbopack)   | Chunks `/_next/static/chunks/`, Turbopack |
| Lenguaje          | TypeScript                         | Inferido por estructura moderna |
| Estilos           | Tailwind CSS                       | Clases utility abundantes |
| Animaciones       | GSAP (probable) + CSS transforms   | Estilos de transform en secciones |
| Fuentes           | Bebas Neue (display) + Plus Jakarta Sans (UI) | CSS variables y computed styles |
| Color de marca    | `#FF5A1F` (naranja Drafteados)     | `selection:bg-[#FF5A1F]`, acentos |
| Deployment        | Cloudflare Workers (workers.dev)   | Dominio actual |
| Auth              | **Ninguna**                        | No hay login, cookies de sesión ni providers |
| Base de datos     | **Ninguna visible**                | No hay Supabase, Firebase ni API propia |
| Datos NBA         | **Ninguno**                        | Solo links a YouTube y redes |
| Estado global     | Mínimo / local                     | Landing estática + motion |

**Conclusión de stack**: Perfecto punto de partida. No hay deuda técnica pesada ni librerías problemáticas.

---

## 3. Estructura de Rutas Actual

| Ruta                          | Tipo       | Función                          | Estado     | Reutilizable para Pick’em |
|-------------------------------|------------|----------------------------------|------------|---------------------------|
| `/`                           | Pública    | Hero + marketing completo        | Existente  | No (no tocar)             |
| `/#contenidos`                | Ancla      | Últimos vídeos                   | Existente  | No                        |
| `/#universo`                  | Ancla      | Buques Club, 3+1, Viajes         | Existente  | No                        |
| `/#comunidad`                 | Ancla      | Stats de comunidad + storytelling| Existente  | Parcial (copy e identidad)|
| `/#contacto`                  | Ancla      | Contacto                         | Existente  | No                        |
| Links externos                | -          | YouTube, Spotify, Trip Double, Buques Club | Existente | No                    |

**No existen** rutas de aplicación (`/app`, `/dashboard`, `/profile`, `/leaderboard`, etc.).

---

## 4. Auditoría de la Sección Comunidad

La sección `#comunidad` es **puramente de marketing**:

- Contadores (suscriptores, países, etc.)
- Explicación del término “Buque”
- Mensaje emocional de agradecimiento
- No hay autenticación
- No hay perfiles de usuario
- No hay posts, comentarios ni ranking
- No hay sistema social real

**Análisis de reutilización**

| Qué                          | Reutilizar | Motivo |
|------------------------------|------------|--------|
| Tono y lenguaje (“Buques”)   | Sí         | Identidad de marca |
| Paleta de colores            | Sí         | Coherencia visual |
| Tipografía                   | Sí         | Coherencia visual |
| Componentes de cards/stats   | Parcial    | Adaptar, no copiar |
| Lógica de comunidad          | No         | No existe lógica |
| Sistema de usuarios          | No         | No existe |

**Recomendación**: Mantener la sección Comunidad intacta. Pick’em debe sentirse como una **extensión natural** de la marca (“Ahora los Buques también predicen”), no como un reemplazo.

---

## 5. Design System Existente (Extraído)

### Colores reales
- Background oscuro principal: `#0A0A0A` / `#080808`
- Surface: `#111111` / `#151518`
- Accent: **`#FF5A1F`** (naranja oficial Drafteados)
- Texto principal: blanco / zinc-100
- Texto muted: zinc-400 / zinc-500
- Bordes: white/10 o black/8

### Tipografía
- Display / títulos: **Bebas Neue** (condensed, uppercase, tracking tight)
- UI / body: **Plus Jakarta Sans**
- Números: tabular (recomendado para scores y rankings)

### Componentes observados
- Botones con border-radius generoso y hover naranja
- Cards con bordes sutiles y sombras controladas
- Headers fijos con logo + navegación
- Secciones con scroll-snap / motion de entrada
- Dark mode preparado (clases `dark:`)

**Principio de diseño observado**: Editorial deportivo + premium + alto contraste. Evita glassmorphism excesivo y blobs genéricos. Esto alinea perfectamente con el Master Build Pack.

---

## 6. Fuente de Datos NBA Actual

**SOURCE OF TRUTH ACTUAL: NINGUNA**

No se encontró:
- Llamadas a BallDontLie, Sportradar, nba_api, ESPN, etc.
- JSON estáticos de jugadores/equipos
- Scraping
- Hardcoded player/team data

Todo el contenido relacionado con NBA es **editorial** (vídeos de YouTube).

---

## 7. Seguridad Actual

- No hay exposición visible de service roles ni API keys.
- No hay formularios de login.
- Variables de entorno no inspeccionables desde el cliente de forma peligrosa.
- Riesgo actual: bajo (es una landing estática).

---

## 8. Performance Observada

- Hero muy pesado visualmente (imagen de pista + overlays).
- Buen uso de fuentes con fallback.
- Next.js + Turbopack → buen punto de partida.
- Objetivo futuro: LCP < 2.5s, CLS < 0.1, INP < 200ms (especialmente en el flujo de picks).

---

## 9. Riesgos Identificados

| Riesgo                              | Probabilidad | Impacto | Severidad | Mitigación |
|-------------------------------------|--------------|---------|-----------|------------|
| Scope creep del Master Build Pack   | Alta         | Alto    | Alta      | Reducir a 12-14 predicciones + fases claras |
| Romper la landing actual            | Media        | Alto    | Alta      | Pick’em en rutas aisladas (`/pickem/*`) |
| Datos NBA incompletos en MVP        | Media        | Medio   | Media     | MockProvider primero + provider abstraction |
| Scoring incorrecto / duplicado      | Media        | Alto    | Alta      | Server-authoritative + idempotencia |
| Auth frágil en Cloudflare           | Baja         | Medio   | Media     | Supabase + @supabase/ssr |
| Over-engineering de admin           | Alta         | Medio   | Media     | Admin mínimo al principio |
| Pérdida de tono de marca            | Media        | Alto    | Alta      | Design tokens + copy review |

---

## 10. Oportunidades

1. El branding actual es **excelente** para un producto competitivo.
2. La audiencia ya existe y es altamente engaged (“Buques”).
3. El flujo Pick → Lock → Watch → Score → Rank → Share es natural para esta comunidad.
4. Cloudflare Pages + Supabase es una combinación moderna, barata y escalable.
5. Se puede lanzar un MVP atractivo y funcional en tiempo razonable sin reconstruir todo.

---

## 11. Conclusión de la Auditoría

**Estado del proyecto actual**: Landing de marketing de alta calidad.  
**Estado para Pick’em**: Base visual y de marca sólida. Capa de aplicación y datos = 0.

**Recomendación principal**:  
Construir Pick’em como **módulo modular** dentro del mismo repositorio Next.js, bajo la ruta `/pickem`, manteniendo la landing intacta y usando Supabase + Cloudflare Pages.

No implementar todavía.  
Esperar aprobación para Mission 02 (Foundation).

---

**Fin del AUDIT_REPORT.md**