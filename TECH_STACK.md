# Stack Tecnológico — Drafteados ("Tu Casa NBA")

> **Documento de Arquitectura y Especificación Técnica**  
> **Versión:** 2.0  
> **Última Actualización:** Septiembre 2026  
> **Estado:** Producción / Cloudflare Pages

---

## 1. Visión General de Arquitectura

El proyecto **Drafteados** está construido bajo un paradigma de **Ultra-High Performance Static Export (SSG)** para despliegue en redes de borde (**Edge CDN de Cloudflare Pages**). Combina renderizado estático instantáneo con capas interactivas aisladas de alto rendimiento (Scrollytelling a 60 FPS, Canvas 2D acelerado por hardware y scroll suave desktop).

```
┌────────────────────────────────────────────────────────┐
│               Cloudflare Pages (Global CDN)            │
└───────────────────────────┬────────────────────────────┘
                            │ Static Assets & HTML
┌───────────────────────────▼────────────────────────────┐
│                    Next.js 16 (SSG)                    │
│   • App Router         • Bebas Neue / Jakarta Fonts    │
│   • Zero Hydration Lag • Static HTML Export            │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│               Interactive Client Leaves                │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ HeroCanvasScrub (2D)  │   │ GSAP + Lenis Smooth  │  │
│  │ 240-Frames 60FPS Sync │   │ Desktop Motion Sync  │  │
│  └───────────────────────┘   └──────────────────────┘  │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ Infinite Marquee      │   │ Editorial UI Systems │  │
│  │ Social & Channels     │   │ Zero AI-Slop Design  │  │
│  └───────────────────────┘   └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Core Framework & Lenguajes

| Tecnología | Versión | Propósito & Justificación Técnica |
| :--- | :--- | :--- |
| **Next.js (App Router)** | `16.3.5` | Framework base con compilador Turbopack. Configurado en modo `output: "export"` para generar bundles estáticos puros sin sobrecarga de servidor Node.js. |
| **React** | `19.2.8` | Versión moderna con soporte para Concurrent Rendering, Server Components donde aplica y optimización en hooks reactivos (`useCallback`, `useRef`). |
| **React DOM** | `19.2.8` | Renderer DOM optimizado para React 19. |
| **TypeScript** | `^5.x` | Tipado estático estricto en todo el codebase. Sin uso de `any`. Interfaces explícitas para componentes, tipado de eventos táctiles/scroll y APIs de Canvas. |
| **Turbopack** | Nativo en Next.js | Motor de compilación incremental ultrarrápido (tiempos de build < 900ms para producción). |

---

## 3. Estilos, Tokens & Sistema de Diseño

| Tecnología | Versión | Propósito & Implementación |
| :--- | :--- | :--- |
| **Tailwind CSS** | `^4.x` | Motor CSS basado en la nueva arquitectura de PostCSS (`@tailwindcss/postcss`), utilizando `@theme inline` en `globals.css` para zero-runtime overhead. |
| **Variables Semánticas** | Nativo CSS | Tokens de color centralizados: `--color-brand: #FF5A1F` (Naranja Baloncesto), `--background: #0A0A0A` (Dark) / `#FAFAFA` (Light), `--color-surface`, `--color-border`. |
| **clsx & tailwind-merge** | `2.1.1` / `3.7.0` | Helper utilitario `cn()` para resolución limpia y sin colisiones de clases condicionales. |
| **Dark Mode Nativo** | Script Inline | Detección y aplicación instantánea de tema en `<head>` (`localStorage` + `prefers-color-scheme`) sin parpadeo (FOUC) ni retraso de hidratación. |

### Tipografía Optimizada (`next/font/google`)
- **`Bebas Neue` (Variable: `--font-title`)**: Tipografía de display condensada y potente, inspirada en las portadas de Slam Magazine y rotulación oficial NBA.
- **`Plus Jakarta Sans` (Variable: `--font-sans`)**: Tipografía geométrica neutra con excelente legibilidad en cuerpos de texto y microcopy.
- **`font-mono` (System Mono)**: Utilizada para kickers editoriales, auditorías de métricas (`+880K`, `+100M`) y etiquetas de sistema.

---

## 4. Motores de Animación, Física y Scrollytelling

### 4.1. Motor Canvas 2D para Hero Scrollytelling (`HeroCanvasScrub.tsx`)
- **Arquitectura de Fotogramas**: 240 fotogramas JPEG pre-renderizados en `/frames/frame_0001.jpg` a `frame_0240.jpg`.
- **Preloader Escalonado (Tiered Preloader Engine)**:
  1. *Fase LCP*: Carga inmediata del Frame 0 y visualización de poster Next/Image con `priority`.
  2. *Fase Skeleton*: Carga concurrente (6 workers) de 1 de cada 5 frames (fotogramas clave) para permitir interacción fluida antes de la descarga total.
  3. *Fase Background*: Carga del resto de frames mediante workers de baja prioridad.
  4. *Priority Window Preload*: Precarga dinámica anticipada de `+18 / -8` fotogramas alrededor de la posición actual del cursor/scroll.
- **Renderizado de Alta Densidad (High-DPI 2D)**:
  - Compensación matemática con DPR (`Math.min(devicePixelRatio, 2)`).
  - Algoritmo de escalado `object-fit: cover` en context 2D con centrado exacto.
  - Contexto opaco (`{ alpha: false }`) con `imageSmoothingQuality: "high"` para máximo rendimiento en GPU.
- **Filtro de Contraste Broadcast**:
  - Filtro CSS calibrado `[filter:contrast(1.03)_saturate(1.06)]` para máxima nitidez de la pista de madera sin velos oscuros opacos.
  - Scrims radiales localizados exclusivamente detrás de los textos para legibilidad 100% sin degradar el estadio.
- **Doble Arquitectura de Scroll (Desktop vs Mobile)**:
  - **Desktop**: Driver de `220vh` sincronizado con **GSAP ScrollTrigger** y **Lenis**.
  - **Mobile**: Driver optimizado de `160vh` (~480px de scroll efectivo) con salida en **1-2 swipes**. Anclaje mediante estado `fixed/absolute` nativo que evita bugs de CSS `position: sticky` en Android / Xiaomi HyperOS / iOS.

### 4.2. Motores de Animación y Scroll Suave
| Librería | Versión | Implementación |
| :--- | :--- | :--- |
| **GSAP (GreenSock)** | `^3.15.0` | Orquestación de timelines de entrada, sincronización de scrub y binding del ticker. |
| **GSAP ScrollTrigger** | `^3.15.0` | Control de progreso de scroll en desktop y triggers de entrada por sección. |
| **Lenis** | `^1.3.26` | Scroll inercial suave para desktop (`duration: 1.15`, curva exponencial). **Aislado en móvil**: desactivado en touch screens para preservar el scroll nativo de 120Hz del compositor del sistema operativo. |
| **Framer Motion** | `^13.3.0` | Utilizado en microinteracciones y carruseles fluidos (`InfiniteSlider` de canales y redes). |
| **react-use-measure** | `^2.1.7` | Medición reactiva de dimensiones para sliders y elementos dinámicos. |
| **canvas-confetti** | `^1.9.4` | Efectos de celebración para eventos interactivos del club de fans / comunidad. |

---

## 5. Componentes de UI & Experiencia de Usuario (Anti-AI Slop)

- **Eliminación de Píldoras Genéricas**: Cero pastillas redondas (`rounded-full`) con emojis o iconos genéricos de IA (`Sparkles`, `Flame`). Sustitución por diseño editorial deportivo de alta gama (Nike, Slam, The Ringer): kickers numerados, líneas finas delimitadoras y tipografía mono.
- **Sección de Contacto Optimizada para Mobile (`BrandPartners.tsx`)**:
  - Contenedor plano sin doble anidamiento que libera 112px de ancho utilizable en teléfonos.
  - Selector nativo accesible `<select>` para tipo de alianza.
  - Acceso directo por protocolo `mailto:` preformateado a `info@drafteados.com`.
- **Marquee Infinito de Canales (`SocialMarqueeStrip.tsx`)**:
  - Tira horizontal de enlaces oficiales (YouTube, 3+1 Podcast, Buques Club, X, Instagram, TripDouble).
  - Desaceleración en hover (`durationOnHover: 80s`).
- **Cursor Magnético & Botones Hápticos**:
  - `MagneticButton`: Atracción con física de resorte al acercar el cursor en desktop.
  - `CustomCursor`: Trailing cursor con aceleración fluida y mezcla de color en elementos interactivos.

---

## 6. Iconografía y Assets

| Recurso | Tipo | Detalle |
| :--- | :--- | :--- |
| **Lucide React** | `^1.46.0` | Iconos vectoriales limpios y funcionales (`Send`, `Mail`, `Users`, `CheckCircle2`, `ExternalLink`, etc.). |
| **Custom SVG Icons** | Componentes React | Iconos vectoriales de marca personalizados (`YoutubeIcon`, `SpotifyIcon`, `InstagramIcon`, `TwitterXIcon`). |
| **Next/Image** | Optimizado | Carga con placeholders, control de calidad y priority en recursos críticos (Posters LCP). |

---

## 7. Infraestructura, DevOps & Testing

| Área | Herramienta | Configuración |
| :--- | :--- | :--- |
| **Hosting & Edge** | **Cloudflare Pages** | Despliegue estático global con ultra-baja latencia y HTTP/3. |
| **CLI de Despliegue** | **Wrangler** | Scripts configurados en `package.json`: `pages:build` y `pages:deploy`. |
| **Control de Versiones** | **Git / GitHub** | Repositorio remoto `origin/main` conectado con CI/CD automático a Cloudflare. |
| **E2E Visual Testing** | **Playwright** (`^1.63.0`) | Pruebas visuales automatizadas en viewports móviles reales (Google Pixel 7 / iPhone) y desktop (1440x900) para verificar renders y distancias de scroll. |
| **Linter** | **ESLint 9** (`eslint-config-next`) | Reglas estándar de Next.js y TypeScript para evitar memory leaks y dependencias cíclicas. |

---

## 8. Métricas de Rendimiento & Core Web Vitals

- **LCP (Largest Contentful Paint)**: `< 1.2s` (garantizado por el poster inicial inline `/frames/frame_0001.jpg` con prioridad de carga).
- **CLS (Cumulative Layout Shift)**: `0.00` (todos los contenedores cuentan con dimensiones de viewport fijas o aspect-ratios reservados).
- **FID / INP (Interaction to Next Paint)**: `< 50ms` (cero bloqueo en el hilo principal gracias al decoupling de eventos de scroll con RAF).
- **Consumo GPU**: Apagado automático del render loop (`visibility: hidden` + cese de RAF) cuando el usuario pasa la sección del Hero.
