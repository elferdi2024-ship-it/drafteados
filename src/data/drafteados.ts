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
}

export interface CommunityMetric {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export const LATEST_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "¿Quién frena a estos Boston Celtics? Análisis táctico de la máquina verde",
    description: "Desglosamos al detalle el spacing, la defensa de cambios automáticos y por qué nadie encuentra la fórmula para pararlos.",
    duration: "24:18",
    views: 184000,
    date: "Hace 2 días",
    category: "Análisis Táctico",
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@Drafteados",
    featured: true,
  },
  {
    id: "vid-2",
    title: "El dilema de LeBron James y los Lakers de cara al cierre de temporada",
    description: "Rotaciones, minutos de descanso y las opciones reales de competir en un Oeste salvaje.",
    duration: "19:45",
    views: 245000,
    date: "Hace 4 días",
    category: "Debate Caliente",
    thumbnail: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@Drafteados",
  },
  {
    id: "vid-3",
    title: "Wembanyama está rompiendo las leyes de la física en San Antonio",
    description: "Tapones imposibles, triples a la carrera y una evolución que da miedo. Esto es solo el principio.",
    duration: "22:10",
    views: 312000,
    date: "Hace 6 días",
    category: "Estrellas NBA",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@Drafteados",
  },
  {
    id: "vid-4",
    title: "3+1 Podcast Ep. 84: Daimiel, Calderón y la locura de la Conferencia Oeste",
    description: "Mesa redonda de lujo analizando a OKC Thunder, Minnesota y los candidatos sorpresa.",
    duration: "58:30",
    views: 198000,
    date: "Hace 1 semana",
    category: "3+1 Podcast",
    thumbnail: "https://images.unsplash.com/photo-1505666287802-9da1c3ce6957?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@Drafteados",
  },
  {
    id: "vid-5",
    title: "Los tapados del Draft 2026: 5 nombres que van a sorprender a todos",
    description: "Scouting a fondo del talento universitario y europeo antes de la noche del Draft.",
    duration: "27:04",
    views: 142000,
    date: "Hace 1 semana",
    category: "Scouting & Draft",
    thumbnail: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@Drafteados",
  },
  {
    id: "vid-6",
    title: "¿Es este el final de la era de los Golden State Warriors?",
    description: "Stephen Curry contra el paso del tiempo, decisiones de front office y futuro de la franquicia.",
    duration: "21:55",
    views: 267000,
    date: "Hace 2 semanas",
    category: "Especial Franquicias",
    thumbnail: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@Drafteados",
  },
];

export const UNIVERSE_ITEMS: UniverseItem[] = [
  {
    id: "buques-club",
    title: "Buques Club",
    badge: "Streetwear Exclusivo",
    description: "La ropa oficial de la comunidad. Drops limitados de alta calidad para los que viven esto de verdad.",
    ctaText: "Visitar la tienda",
    ctaLink: "#tienda",
    tag: "Drop 04 Disponible",
    gradient: "from-orange-500/20 via-orange-600/5 to-transparent",
    iconName: "ShoppingBag",
    stats: "Prendas 100% algodón orgánico 320gsm",
    accentColor: "#FF5A1F",
  },
  {
    id: "viajes-usa",
    title: "Viajes a EE.UU.",
    badge: "Experiencias Inmersivas",
    description: "Vive la NBA desde dentro. Viajes organizados a Nueva York, Los Ángeles y Boston con entradas a pie de pista y sorpresas.",
    ctaText: "Descubrir próximos viajes",
    ctaLink: "#viajes",
    tag: "Temporada 2026",
    gradient: "from-blue-600/20 via-cyan-600/5 to-transparent",
    iconName: "Plane",
    stats: "+500 Buques ya han viajado con nosotros",
    accentColor: "#38BDF8",
  },
  {
    id: "podcast-3mas1",
    title: "3+1 Podcast",
    badge: "Formato Estrella",
    description: "Antoni Daimiel, José Manuel Calderón y Drafteados. El podcast que marca el ritmo y el análisis de la mejor liga del mundo.",
    ctaText: "Escuchar ahora",
    ctaLink: "https://open.spotify.com",
    tag: "Nuevo episodio cada martes",
    gradient: "from-emerald-600/20 via-teal-600/5 to-transparent",
    iconName: "Mic",
    stats: "Top 5 Podcasts Deportes España",
    accentColor: "#10B981",
  },
  {
    id: "campus-eventos",
    title: "Campus & Eventos",
    badge: "Cancha & Comunidad",
    description: "Formamos la próxima generación de jugadores y creamos quedadas y torneos que solo los verdaderos Buques entienden.",
    ctaText: "Ver experiencias",
    ctaLink: "#campus",
    tag: "Edición Verano 2026",
    gradient: "from-purple-600/20 via-indigo-600/5 to-transparent",
    iconName: "Trophy",
    stats: "+1.200 participantes acumulados",
    accentColor: "#A855F7",
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
  { name: "Contenidos", href: "#contenidos" },
  { name: "Universo", href: "#universo" },
  { name: "Comunidad", href: "#comunidad" },
  { name: "Viajes", href: "#viajes" },
  { name: "Tienda", href: "#tienda" },
  { name: "Contacto", href: "#contacto" },
];

export const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://www.youtube.com/@Drafteados", handle: "@Drafteados" },
  { name: "Instagram", href: "https://www.instagram.com/drafteados", handle: "@drafteados" },
  { name: "TikTok", href: "https://www.tiktok.com/@drafteados", handle: "@drafteados" },
  { name: "X (Twitter)", href: "https://x.com/drafteados", handle: "@drafteados" },
  { name: "Spotify", href: "https://open.spotify.com", handle: "3+1 Podcast" },
];
