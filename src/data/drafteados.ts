// filepath: src/data/drafteados.ts

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
  statusBadge?: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  tag: string;
  gradient: string;
  iconName: "ShoppingBag" | "Plane" | "Mic" | "Trophy";
  stats?: string;
  accentColor: string;
  external?: boolean;
  image: string;
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

export interface CommunityTestimonial {
  id: string;
  author: string;
  location: string;
  roleBadge: string;
  quote: string;
  timeWithUs: string;
}

export const FOUNDERS: FounderItem[] = [
  {
    name: "José Sáenz de Tejada",
    role: "Cofundador & La Pizarra de la Madrugada",
    handle: "@josesaenz",
    bio: "El rigor táctico que no duerme. Lleva desde 2017 desgranando sistemas, bloqueos ciegos y defensas zonales en el salón de casa con una taza de café a las cuatro de la madrugada. Si un rookie hace un corte inteligente en la puerta de atrás, Jose ya tiene el análisis listo.",
    avatar: "/images/jose.jpg",
    quote: "Drafteados es el refugio de los que nos quedamos despiertos a deshoras para ver botar un balón. Aquí no hay postureo: se viene a amar el baloncesto con respeto y criterio.",
  },
  {
    name: "Sergio Andrés Chacón",
    role: "Cofundador & El Alma del Buque",
    handle: "@sergioandres",
    bio: "La emoción pura, el debate sin filtros y la complicidad directa con el chat. Sergio conecta con cada Buque como si estuviera viendo el partido en el sofá de al lado. Defiende a su gente, sufre con las derrotas y celebra cada canasta agónica con el corazón en la mano.",
    avatar: "/images/sergio.jpg",
    quote: "Subirse al Buque no es suscribirse a un canal: es saber que nunca más vas a ver un partido de la NBA en soledad. En este barco remamos todos juntos, ganen o pierdan.",
  },
];

export const LATEST_VIDEOS: VideoItem[] = [
  {
    id: "ms8NxjBHfkI",
    title: "¡ASÍ SERÁ LA TEMPORADA NBA SEGÚN LOS EXPERTOS! MVP, Campeón, Rookie del año…",
    description: "Pronósticos atrevidos, candidatos al anillo y el debate definitivo de la temporada con todo el equipo de la Casa.",
    duration: "26:40",
    views: 184000,
    date: "Destacado",
    category: "Análisis NBA",
    thumbnail: "https://i.ytimg.com/vi/ms8NxjBHfkI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ms8NxjBHfkI",
    featured: true,
  },
  {
    id: "MrhdFvSAWi4",
    title: "¿DUDAS CON EL FUTURO DE CURRY? ¿KAWHI SE VA DE ROSITAS?",
    description: "Análisis sin filtros de la encrucijada en Warriors y Clippers en un Salvaje Oeste sin piedad.",
    duration: "22:15",
    views: 142000,
    date: "Hace 2 días",
    category: "Debates",
    thumbnail: "https://i.ytimg.com/vi/MrhdFvSAWi4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=MrhdFvSAWi4",
  },
  {
    id: "Pc_-JOvRRv0",
    title: "¡ANTONI DAIMIEL SE CONFIESA! Errores, consejos de Montes, ¿volverá a la NBA?",
    description: "Una charla íntima, histórica y sin precedentes con la voz eterna del baloncesto estadounidense en España.",
    duration: "48:10",
    views: 310000,
    date: "Hace 4 días",
    category: "3+1 Podcast",
    thumbnail: "https://i.ytimg.com/vi/Pc_-JOvRRv0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Pc_-JOvRRv0",
    featured: true,
  },
  {
    id: "DC0P4CrEChw",
    title: "¿CUÁNTOS PARTIDOS GANARÁN LOS 15 EQUIPOS DEL OESTE?",
    description: "Tier list exhaustivo y predicción victoria a victoria de la conferencia más despiadada del planeta.",
    duration: "34:20",
    views: 215000,
    date: "Hace 6 días",
    category: "Análisis NBA",
    thumbnail: "https://i.ytimg.com/vi/DC0P4CrEChw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=DC0P4CrEChw",
  },
  {
    id: "i0fV6NAXFfw",
    title: "¿CUÁNTOS PARTIDOS GANARÁN LOS 15 EQUIPOS DEL ESTE?",
    description: "Radiografía franquicia a franquicia: rotaciones, defensas y quién puede destronar a los campeones Celtics.",
    duration: "31:45",
    views: 198000,
    date: "Hace 1 semana",
    category: "Análisis NBA",
    thumbnail: "https://i.ytimg.com/vi/i0fV6NAXFfw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=i0fV6NAXFfw",
  },
  {
    id: "P8oqq0CTo7s",
    title: "¡ESPECIAL CON DAIMIEL! Contesta a todo: su carrera, NBA, ofertas de trabajo...",
    description: "Segunda entrega especial con Antoni Daimiel respondiendo las preguntas directas de la tripulación.",
    duration: "42:05",
    views: 260000,
    date: "Hace 1 semana",
    category: "3+1 Podcast",
    thumbnail: "https://i.ytimg.com/vi/P8oqq0CTo7s/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=P8oqq0CTo7s",
  },
  {
    id: "snRMM2lJx1Y",
    title: "¿QUIÉN ES EL PRÓXIMO WEMBY? BUSCANDO LAS ESTRELLAS DEL FUTURO",
    description: "Scouting de prospectos universitarios e internacionales llamados a revolucionar el juego los próximos 10 años.",
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
    description: "Debates calientes de vestuario, rumores de traspaso en el Trade Deadline y choque de opiniones.",
    duration: "25:30",
    views: 220000,
    date: "Hace 2 semanas",
    category: "Debates",
    thumbnail: "https://i.ytimg.com/vi/FXsyqMDvBzY/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=FXsyqMDvBzY",
  },
];

export const UNIVERSE_ITEMS: UniverseItem[] = [
  {
    id: "buques-club",
    title: "Buques Club",
    badge: "Streetwear & Identidad",
    statusBadge: "DROP ACTIVO",
    description: "La piel de nuestra comunidad. Cápsulas de ropa de edición limitada confeccionadas en 320gsm para los que llevan el baloncesto en el pecho.",
    ctaText: "Explorar Drop Oficial",
    ctaLink: "https://www.buquesclub.com/",
    tag: "Colección Otoño / Invierno",
    gradient: "from-orange-500/20 via-orange-600/5 to-transparent",
    iconName: "ShoppingBag",
    stats: "100% Algodón orgánico premium • Envíos globales",
    accentColor: "#FF5A1F",
    external: true,
    image: "/images/BUQUES CLUB.png",
  },
  {
    id: "podcast-3mas1",
    title: "3+1 Podcast",
    badge: "Tertulia con Leyendas",
    statusBadge: "NUEVO CADA MARTES",
    description: "Antoni Daimiel, José Manuel Calderón, José y Sergio. La tertulia de referencia donde la táctica de élite se mezcla con anécdotas irrepetibles.",
    ctaText: "Escuchar en Spotify",
    ctaLink: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX",
    tag: "Spotify & Apple Podcasts",
    gradient: "from-emerald-600/20 via-teal-600/5 to-transparent",
    iconName: "Mic",
    stats: "Top 5 Podcast Deportivo en España",
    accentColor: "#10B981",
    external: true,
    image: "/images/TRES+UNO.png",
  },
  {
    id: "viajes-usa",
    title: "Viajes NBA a EE.UU.",
    badge: "Experiencia a Pie de Pista",
    statusBadge: "PLAZAS 2026",
    description: "El viaje de tu vida en Nueva York, Los Ángeles y Boston con José, Sergio y el equipo de Drafteados. Asientos VIP, accesos exclusivos y backstage.",
    ctaText: "Ver Próxima Expedición",
    ctaLink: "https://tripdouble.com/es/drafteados/",
    tag: "TripDouble x Drafteados",
    gradient: "from-blue-600/20 via-cyan-600/5 to-transparent",
    iconName: "Plane",
    stats: "+500 Buques han vivido la NBA con nosotros",
    accentColor: "#38BDF8",
    external: true,
    image: "/images/VIAJES.png",
  },
];

export const COMMUNITY_METRICS: CommunityMetric[] = [
  {
    id: "buques",
    value: 880,
    suffix: ".000+",
    label: "Buques en la Tripulación",
    description: "Una comunidad global que no se pierde un debate ni una madrugada de partidos.",
  },
  {
    id: "views",
    value: 15,
    suffix: "M+",
    label: "Impactos Mensuales",
    description: "Millones de minutos de baloncesto consumidos cada mes a través de todas nuestras plataformas.",
  },
  {
    id: "horas",
    value: 2400,
    suffix: "+",
    label: "Horas de Baloncesto",
    description: "Desde 2017 subiendo al barco cada día con rigor, respeto y amor por el juego.",
  },
];

export const COMMUNITY_TESTIMONIALS: CommunityTestimonial[] = [
  {
    id: "test-1",
    author: "Marcos R.",
    location: "Madrid",
    roleBadge: "Buque desde 2018",
    quote: "Viajé con ellos a Nueva York el año pasado. Ver un partido en el Garden teniendo a José y Sergio al lado explicando cada jugada es una experiencia que no se puede comprar.",
    timeWithUs: "Viaje NY 2024",
  },
  {
    id: "test-2",
    author: "Camila V.",
    location: "Buenos Aires",
    roleBadge: "Comunidad Madrugada",
    quote: "En Argentina los partidos terminan a las tres de la mañana. Saber que abres el chat de Drafteados y hay miles de personas con la misma pasión te hace sentir que nunca estás sola.",
    timeWithUs: "Miembro Activa",
  },
  {
    id: "test-3",
    author: "Jordi P.",
    location: "Barcelona",
    roleBadge: "Oyente 3+1",
    quote: "El podcast con Daimiel y Calderón es lo mejor que le ha pasado a la divulgación deportiva en español. Baloncesto de verdad sin el show barato de la tele.",
    timeWithUs: "Top Fan Spotify",
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
