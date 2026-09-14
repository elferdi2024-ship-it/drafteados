export interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  date: string;
  category: string;
  thumbnail: string;
  youtubeUrl: string;
  featured?: boolean;
}

export interface UniverseItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  tag: string;
  gradient: string;
  iconName: "ShoppingBag" | "Plane" | "Mic" | "Trophy";
  stats?: string;
  accentColor: string;
  external?: boolean;
}

export interface CommunityMetric {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export interface FounderItem {
  name: string;
  role: string;
  handle: string;
  bio: string;
  avatar: string;
  quote: string;
}

export const FOUNDERS: FounderItem[] = [
  {
    name: "José Sáenz de Tejada",
    role: "Cofundador & Análisis Táctico",
    handle: "@josesaenz",
    bio: "Puro baloncesto de madrugada. Pizarra, pizarra, scouting detallado y la pasión de quien lleva viviendo la NBA desde niño.",
    avatar: "/images/jose.jpg",
    quote: "Esto no es solo un canal, es la casa de los que no dormimos para ver botar el balón.",
  },
  {
    name: "Sergio Andrés Chacón",
    role: "Cofundador & Debate NBA",
    handle: "@sergioandres",
    bio: "Contexto histórico, el debate más caliente sin filtros y el latido incondicional de los Buques en cada directo.",
    avatar: "/images/sergio.jpg",
    quote: "Somos Buques navegando juntos. Más que seguidores, una familia de baloncesto.",
  },
];

export const LATEST_VIDEOS: VideoItem[] = [
  {
    id: "ms8NxjBHfkI",
    title: "¡ASÍ SERÁ LA TEMPORADA NBA SEGÚN LOS EXPERTOS! Mvp, Campeón, Rookie del año…",
    description: "Pronósticos atrevidos, candidatos al anillo y el debate definitivo de la temporada con todo el equipo de Drafteados.",
    duration: "26:40",
    views: 184000,
    date: "Nuevo",
    category: "Temporada NBA",
    thumbnail: "https://i.ytimg.com/vi/ms8NxjBHfkI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ms8NxjBHfkI",
    featured: true,
  },
  {
    id: "MrhdFvSAWi4",
    title: "¿DUDAS CON EL FUTURO DE CURRY? ¿KAWHI SE VA DE ROSITAS?",
    description: "Análisis sin tapujos de la situación crítica de Warriors y Clippers en un Oeste hipercompetitivo.",
    duration: "22:15",
    views: 142000,
    date: "Hace 2 días",
    category: "Debate Caliente",
    thumbnail: "https://i.ytimg.com/vi/MrhdFvSAWi4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=MrhdFvSAWi4",
  },
  {
    id: "Pc_-JOvRRv0",
    title: "¡ANTONI DAIMIEL SE CONFIESA! Errores, consejos de Montes, ¿volverá a la NBA?",
    description: "Charla íntima e histórica con la voz inconfundible de la NBA en España.",
    duration: "48:10",
    views: 310000,
    date: "Hace 4 días",
    category: "Especial Daimiel",
    thumbnail: "https://i.ytimg.com/vi/Pc_-JOvRRv0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Pc_-JOvRRv0",
  },
  {
    id: "DC0P4CrEChw",
    title: "¿CUÁNTOS PARTIDOS GANARÁN LOS 15 EQUIPOS DEL OESTE?",
    description: "Tier list exhaustivo y predicción récord a récord de la conferencia más salvaje.",
    duration: "34:20",
    views: 215000,
    date: "Hace 6 días",
    category: "Previa Oeste",
    thumbnail: "https://i.ytimg.com/vi/DC0P4CrEChw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=DC0P4CrEChw",
  },
  {
    id: "i0fV6NAXFfw",
    title: "¿CUÁNTOS PARTIDOS GANARÁN LOS 15 EQUIPOS DEL ESTE?",
    description: "Desglose franquicia a franquicia: ¿Quién puede derrocar a los campeones Celtics?",
    duration: "31:45",
    views: 198000,
    date: "Hace 1 semana",
    category: "Previa Este",
    thumbnail: "https://i.ytimg.com/vi/i0fV6NAXFfw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=i0fV6NAXFfw",
  },
  {
    id: "P8oqq0CTo7s",
    title: "¡ESPECIAL CON DAIMIEL! Contesta a todo: su carrera, NBA, ofertas de trabajo...",
    description: "Segunda entrega con Antoni Daimiel respondiendo las preguntas directas de los Buques.",
    duration: "42:05",
    views: 260000,
    date: "Hace 1 semana",
    category: "3+1 Especial",
    thumbnail: "https://i.ytimg.com/vi/P8oqq0CTo7s/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=P8oqq0CTo7s",
  },
  {
    id: "snRMM2lJx1Y",
    title: "¿QUIÉN ES EL PRÓXIMO WEMBY? BUSCANDO LAS ESTRELLAS DEL FUTURO",
    description: "Scouting de prospectos que revolucionarán el baloncesto mundial en los próximos drafts.",
    duration: "28:50",
    views: 175000,
    date: "Hace 2 semanas",
    category: "Scouting",
    thumbnail: "https://i.ytimg.com/vi/snRMM2lJx1Y/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=snRMM2lJx1Y",
  },
  {
    id: "FXsyqMDvBzY",
    title: "¡LÍO CON LAKERS Y CLIPPERS! ¿QUÉ PASA CON KAWHI Y DONCIC? ¿WESTBROOK TOP-5?",
    description: "Debates candentes de vestuario y análisis de los rumores de traspaso más polémicos.",
    duration: "25:30",
    views: 220000,
    date: "Hace 2 semanas",
    category: "Debate Caliente",
    thumbnail: "https://i.ytimg.com/vi/FXsyqMDvBzY/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=FXsyqMDvBzY",
  },
  {
    id: "LhcJTfTG5QA",
    title: "EL QUINTETO TITULAR DE LOS 15 EQUIPOS DEL OESTE",
    description: "Análisis quinteto a quinteto, roles tácticos y rotaciones clave de la conferencia.",
    duration: "29:15",
    views: 190000,
    date: "Hace 3 semanas",
    category: "Táctica NBA",
    thumbnail: "https://i.ytimg.com/vi/LhcJTfTG5QA/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=LhcJTfTG5QA",
  },
  {
    id: "XxfY5xHFf8g",
    title: "EL QUINTETO TITULAR DE LOS 15 EQUIPOS DEL ESTE",
    description: "Los 15 quintetos iniciales que lucharán por dominar la conferencia Este.",
    duration: "27:40",
    views: 185000,
    date: "Hace 3 semanas",
    category: "Táctica NBA",
    thumbnail: "https://i.ytimg.com/vi/XxfY5xHFf8g/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=XxfY5xHFf8g",
  },
];

export const UNIVERSE_ITEMS: UniverseItem[] = [
  {
    id: "buques-club",
    title: "Buques Club",
    badge: "Streetwear Exclusivo",
    description: "La ropa oficial de la comunidad. Drops limitados de alta calidad para los que viven esto de verdad.",
    ctaText: "Visitar la tienda",
    ctaLink: "https://www.buquesclub.com/",
    tag: "Drop 04 Disponible",
    gradient: "from-orange-500/20 via-orange-600/5 to-transparent",
    iconName: "ShoppingBag",
    stats: "Prendas 100% algodón orgánico 320gsm",
    accentColor: "#FF5A1F",
    external: true,
  },
  {
    id: "viajes-usa",
    title: "Viajes a EE.UU.",
    badge: "Experiencias Inmersivas",
    description: "Vive la NBA desde dentro. Viajes organizados a Nueva York, Los Ángeles y Boston con entradas a pie de pista y sorpresas.",
    ctaText: "Descubrir próximos viajes",
    ctaLink: "https://tripdouble.com/es/drafteados/",
    tag: "Temporada 2026",
    gradient: "from-blue-600/20 via-cyan-600/5 to-transparent",
    iconName: "Plane",
    stats: "+500 Buques ya han viajado con nosotros",
    accentColor: "#38BDF8",
    external: true,
  },
  {
    id: "podcast-3mas1",
    title: "3+1 Podcast",
    badge: "Formato Estrella",
    description: "Antoni Daimiel, José Manuel Calderón y Drafteados. El podcast que marca el ritmo y el análisis de la mejor liga del mundo.",
    ctaText: "Escuchar ahora",
    ctaLink: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX",
    tag: "Nuevo episodio cada martes",
    gradient: "from-emerald-600/20 via-teal-600/5 to-transparent",
    iconName: "Mic",
    stats: "Top 5 Podcasts Deportes España",
    accentColor: "#10B981",
    external: true,
  },
  {
    id: "campus-eventos",
    title: "Campus & Eventos",
    badge: "Cancha & Comunidad",
    description: "Formamos la próxima generación de jugadores y creamos quedadas y torneos que solo los verdaderos Buques entienden.",
    ctaText: "Ver experiencias",
    ctaLink: "https://tripdouble.com/es/drafteados/",
    tag: "Edición Verano 2026",
    gradient: "from-purple-600/20 via-indigo-600/5 to-transparent",
    iconName: "Trophy",
    stats: "+1.200 participantes acumulados",
    accentColor: "#A855F7",
    external: true,
  },
];

export const COMMUNITY_METRICS: CommunityMetric[] = [
  {
    id: "buques",
    value: 880,
    suffix: ".000+",
    label: "Buques en la Comunidad",
    description: "Aficionados que debaten, comparten y respiran baloncesto a diario.",
  },
  {
    id: "paises",
    value: 70,
    suffix: "+",
    label: "Países conectados",
    description: "Una pasión que cruza océanos y husos horarios en cada madrugada NBA.",
  },
  {
    id: "youtube",
    value: 380,
    suffix: ".000+",
    label: "Suscriptores en YouTube",
    description: "Cientos de millones de reproducciones y más de 8 años de constancia.",
  },
];

export const NAV_LINKS = [
  { name: "Contenidos", href: "#contenidos", external: false },
  { name: "Universo", href: "#universo", external: false },
  { name: "Comunidad", href: "#comunidad", external: false },
  { name: "Viajes", href: "https://tripdouble.com/es/drafteados/", external: true },
  { name: "Tienda", href: "https://www.buquesclub.com/", external: true },
  { name: "Contacto", href: "#contacto", external: false },
];

export const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://www.youtube.com/@DrafteadosNBA", handle: "@DrafteadosNBA" },
  { name: "Instagram", href: "https://www.instagram.com/drafteados/", handle: "@drafteados" },
  { name: "TikTok", href: "https://www.tiktok.com/@drafteados", handle: "@drafteados" },
  { name: "X (Twitter)", href: "https://x.com/drafteados", handle: "@drafteados" },
  { name: "Spotify", href: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX", handle: "3+1 Podcast" },
];
