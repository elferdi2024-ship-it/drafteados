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

export const LATEST_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "El experimento de Boston Celtics y por qué nadie los puede frenar en el Este",
    description: "Desglosamos al detalle el spacing ofensivo de Mazzulla, la versatilidad de Porziņģis y por qué los rivales colapsan ante su tiro exterior.",
    duration: "24:18",
    views: 184000,
    date: "Hace 2 días",
    category: "Análisis Táctico",
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@DrafteadosNBA/videos",
    featured: true,
  },
  {
    id: "vid-2",
    title: "¿Puede Luka Dončić ser el MVP con estos números históricos en Dallas?",
    description: "Triple-dobles con porcentajes absurdos, el impacto de Kyrie Irving al lado y las opciones reales de competir por el anillo en el Oeste.",
    duration: "19:45",
    views: 245000,
    date: "Hace 4 días",
    category: "Debate Caliente",
    thumbnail: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@DrafteadosNBA/videos",
  },
  {
    id: "vid-3",
    title: "Victor Wembanyama está cambiando la historia de la NBA delante de nuestros ojos",
    description: "Tapones en el perímetro, triples en transición y una evolución táctica con Chris Paul que asusta al resto de franquicias de la liga.",
    duration: "22:10",
    views: 312000,
    date: "Hace 6 días",
    category: "Estrellas NBA",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@DrafteadosNBA/videos",
  },
  {
    id: "vid-4",
    title: "3+1 Podcast con Daimiel y Calderón: El Oeste más salvaje en 20 años",
    description: "Mesa redonda con Antoni Daimiel y José Manuel Calderón diseccionando a OKC Thunder, Wolves, Nuggets y los tapados de los Playoffs.",
    duration: "58:30",
    views: 198000,
    date: "Hace 1 semana",
    category: "3+1 Podcast",
    thumbnail: "https://images.unsplash.com/photo-1505666287802-9da1c3ce6957?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX",
  },
  {
    id: "vid-5",
    title: "Scouting Draft 2026: Los 5 talentos universitarios que cambiarán la liga",
    description: "Análisis técnico de perfiles físicos, tiro tras bote y lecturas defensivas de las promesas que dominarán la próxima década en la NBA.",
    duration: "27:04",
    views: 142000,
    date: "Hace 1 semana",
    category: "Scouting & Draft",
    thumbnail: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@DrafteadosNBA/videos",
  },
  {
    id: "vid-6",
    title: "La reconstrucción de los Warriors: ¿Cuál es el plan definitivo con Stephen Curry?",
    description: "Gestión de salarios, decisiones de front office y el dilema de exprimir la ventana competitiva de una leyenda viva del baloncesto.",
    duration: "21:55",
    views: 267000,
    date: "Hace 2 semanas",
    category: "Especial Franquicias",
    thumbnail: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&w=800&q=75",
    youtubeUrl: "https://www.youtube.com/@DrafteadosNBA/videos",
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
