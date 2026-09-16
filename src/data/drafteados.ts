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
  iconName: "ShoppingBag" | "Plane" | "Mic" | "Trophy" | "Flame" | "Activity";
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
  number: string;
  name: string;
  role: string;
  tagline: string;
  handle: string;
  bio: string;
  avatar: string;
  quote: string;
  specialties: string[];
}

export interface PressMilestone {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  location?: string;
  highlight?: string;
}

// Backward compatibility interface
export interface CommunityTestimonial {
  id: string;
  author: string;
  location: string;
  roleBadge: string;
  quote: string;
  timeWithUs: string;
}

export const BUQUE_ORIGIN = {
  title: "¿Qué significa ser un Buque?",
  subtitle: "El origen de nuestra comunidad",
  story:
    "El término surge de manera orgánica en la cultura interna de Drafteados, inspirado en el jugador de la NBA Devin Booker. Después de analizar una de sus actuaciones, su apellido derivó coloquialmente de “Booker” a “Buque”, asociando la figura del basquetbolista con una idea clara: grandeza y liderazgo. Con el tiempo, el término trascendió la pista y se consolidó como el símbolo oficial de nuestra identidad.",
  highlight: "+880.000 personas forman hoy la comunidad en más de 70 países.",
};

export const FOUNDERS: FounderItem[] = [
  {
    number: "01",
    name: "José Sáenz de Tejada",
    role: "Cofundador de Drafteados",
    tagline: "Pizarra & Rigor Táctico",
    handle: "@josesaenz",
    bio: "Especialista en análisis táctico, sistemas de juego y scouting del NBA Draft. Analiza cada madrugada la mejor liga de baloncesto del mundo desde 2017, desgranando rotaciones, defensas y talento joven con rigor y contexto.",
    avatar: "/images/jose.jpg",
    quote: "Drafteados nació para explicar el juego con pasión y criterio. Tratamos la NBA con el respeto y la profundidad que merece.",
    specialties: ["Sistemas & Playbooks", "Scouting NBA Draft", "Pizarra Táctica", "Análisis Avanzado"],
  },
  {
    number: "02",
    name: "Sergio Andrés Chacón",
    role: "Cofundador de Drafteados",
    tagline: "Voz & Conexión Directa",
    handle: "@sergioandres",
    bio: "Comunicación directa, coberturas en pista en Estados Unidos y el pulso diario de las franquicias de la NBA. Conecta a la comunidad hispanohablante con las historias, protagonistas y el debate apasionado del baloncesto.",
    avatar: "/images/sergio.jpg",
    quote: "Subirse al Buque es saber que nunca vas a ver la NBA solo. Somos una comunidad que comparte la misma pasión en más de 70 países.",
    specialties: ["Coberturas en Pista", "Debate & Actualidad", "Comunidad Global", "Cultura del Juego"],
  },
];

export const LATEST_VIDEOS: VideoItem[] = [
  {
    id: "aqJUm_Ol8os",
    title: "¡LA NUEVA APUESTA DE LOS WARRIORS! ¿Se equivocan? | Guía GSW 26-27",
    description: "¡Empieza la GUÍA NBA 2026/2027! Comenzamos con los Golden State Warriors y el análisis a fondo del nuevo rumbo.",
    duration: "24:30",
    views: 95000,
    date: "Hoy",
    category: "Análisis NBA",
    thumbnail: "https://i.ytimg.com/vi/aqJUm_Ol8os/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=aqJUm_Ol8os",
    featured: true,
  },
  {
    id: "ZS4F-l1de30",
    title: "¿CÓMO AFRONTARÁN LA TEMPORADA ESTAS 2 SUPERESTRELLAS?",
    description: "Shai Gilgeous-Alexander y Jalen Brunson ante su temporada más exigente en OKC y Knicks.",
    duration: "18:40",
    views: 110000,
    date: "Ayer",
    category: "Análisis NBA",
    thumbnail: "https://i.ytimg.com/vi/ZS4F-l1de30/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ZS4F-l1de30",
  },
  {
    id: "ms8NxjBHfkI",
    title: "¡ASÍ SERÁ LA TEMPORADA NBA SEGÚN LOS EXPERTOS! MVP, Campeón, Rookie del año…",
    description: "Pronósticos atrevidos, candidatos al anillo y el debate definitivo de la temporada con todo el equipo de la Casa.",
    duration: "26:40",
    views: 184000,
    date: "Hace 2 días",
    category: "Debates",
    thumbnail: "https://i.ytimg.com/vi/ms8NxjBHfkI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ms8NxjBHfkI",
  },
  {
    id: "Pc_-JOvRRv0",
    title: "¡ANTONI DAIMIEL SE CONFIESA! Errores, consejos de Montes, ¿volverá a la NBA?",
    description: "Una charla íntima, histórica y sin precedentes con la voz del baloncesto estadounidense en España.",
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
    description: "Tier list exhaustivo y predicción victoria a victoria de la conferencia más disputada.",
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
    description: "Scouting de prospectos universitarios e internacionales llamados a revolucionar el juego.",
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
    description: "Debates de vestuario, rumores de traspaso en el Trade Deadline y choque de opiniones.",
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
    badge: "Línea de Ropa Oficial",
    statusBadge: "EDICIÓN LIMITADA",
    description: "La marca de ropa oficial de los Buques para los Buques. Se distribuye mediante drops de edición limitada con diseños limpios y máxima atención a la calidad de las prendas.",
    ctaText: "Visita la Tienda",
    ctaLink: "https://www.buquesclub.com/",
    tag: "Drops Oficiales",
    gradient: "from-orange-500/20 via-orange-600/5 to-transparent",
    iconName: "ShoppingBag",
    stats: "Cápsulas de edición limitada • Diseños básicos",
    accentColor: "#FF5A1F",
    external: true,
    image: "/images/BUQUES CLUB.png",
  },
  {
    id: "podcast-3mas1",
    title: "3+1 Podcast",
    badge: "Con Daimiel & Calderón",
    statusBadge: "FORBES TOP 50",
    description: "El programa en español de referencia para los aficionados a la NBA con Antoni Daimiel y José Manuel Calderón. Reconocido por Forbes como uno de los 50 mejores proyectos originales.",
    ctaText: "Escuchar en Spotify",
    ctaLink: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX?si=gcWP5P2kS66uDI-Ikjoabw",
    tag: "Cada martes nuevo episodio",
    gradient: "from-emerald-600/20 via-teal-600/5 to-transparent",
    iconName: "Mic",
    stats: "Audiovisual en YouTube y plataformas de podcast",
    accentColor: "#10B981",
    external: true,
    image: "/images/TRES+UNO.png",
  },
  {
    id: "viajes-usa",
    title: "Viajes a EE.UU.",
    badge: "Vive la NBA en Directo",
    statusBadge: "EXPEDICIONES 2026",
    description: "Viajes organizados junto a Trip Double y José Manuel Calderón para vivir la experiencia NBA desde dentro, en ciudades como Los Ángeles, San Francisco, Nueva York y Miami.",
    ctaText: "Viaja con Nosotros",
    ctaLink: "https://tripdouble.com/es/drafteados/",
    tag: "Trip Double x Drafteados",
    gradient: "from-blue-600/20 via-cyan-600/5 to-transparent",
    iconName: "Plane",
    stats: "Entradas NBA, backstage y experiencias compartidas",
    accentColor: "#38BDF8",
    external: true,
    image: "/images/VIAJES.png",
  },
  {
    id: "nba-hub",
    title: "NBA Hub",
    badge: "Resultados & En Vivo",
    statusBadge: "NUEVO",
    description: "El pulso diario de la NBA al estilo Drafteados. Marcadores en directo, clasificación Este y Oeste, calendario oficial, plantillas completas y líderes estadísticos.",
    ctaText: "Entrar al Hub",
    ctaLink: "/nba",
    tag: "Resultados en Vivo",
    gradient: "from-[#FF5A1F]/30 via-orange-600/10 to-transparent",
    iconName: "Activity",
    stats: "Marcadores • Clasificación • Calendario • Rosters",
    accentColor: "#FF5A1F",
    external: false,
    image: "/images/logo.png",
  },
  {
    id: "pickem-nba",
    title: "Pick'em NBA",
    badge: "Juego Oficial",
    description: "La porra de la comunidad. Pronostica los 13 galardones de la temporada NBA, compite en el ranking global de Los Buques y demuestra cuánto sabes de la liga.",
    ctaText: "Jugar Pick'em",
    ctaLink: "/pickem",
    tag: "Temporada 2026/27",
    gradient: "from-amber-600/20 via-orange-600/5 to-transparent",
    iconName: "Trophy",
    stats: "13 Galardones • Ranking Oficial • 100% Gratuito",
    accentColor: "#FF5A1F",
    external: false,
    image: "/images/heropicekm.png",
  },
];

export const COMMUNITY_METRICS: CommunityMetric[] = [
  {
    id: "buques",
    value: 880,
    suffix: ".000+",
    label: "Buques en la Comunidad",
    description: "Seguidores en YouTube, Instagram, X, TikTok y Spotify.",
  },
  {
    id: "paises",
    value: 70,
    suffix: "+",
    label: "Países",
    description: "Una comunidad hispanohablante conectada en todo el mundo.",
  },
  {
    id: "youtube",
    value: 383,
    suffix: ".000+",
    label: "Suscriptores YouTube",
    description: "Canal de referencia de baloncesto en español desde 2017.",
  },
];

export const SOCIAL_COMMUNITY_STATS = [
  { platform: "YouTube", count: "+383.000", label: "Suscriptores", href: "https://www.youtube.com/@DrafteadosNBA" },
  { platform: "Instagram", count: "+197.000", label: "Seguidores", href: "https://www.instagram.com/drafteados/" },
  { platform: "X (Twitter)", count: "+180.000", label: "Seguidores", href: "https://x.com/drafteados" },
  { platform: "TikTok", count: "+121.000", label: "Seguidores", href: "https://www.tiktok.com/@drafteados" },
];

export const PRESS_MILESTONES: PressMilestone[] = [
  {
    id: "press-rialto",
    date: "Junio 2026",
    category: "Evento en Vivo",
    title: "Gran cierre de 3+1 en el Teatro Rialto de Madrid",
    summary: "El podcast producido por Drafteados finalizó temporada con un directo especial en la Gran Vía ante 1.000 personas junto a Antoni Daimiel y José Manuel Calderón.",
    location: "Madrid, Gran Vía",
    highlight: "1.000 Buques en directo",
  },
  {
    id: "press-doncic",
    date: "Junio 2026",
    category: "Entrevista Exclusiva",
    title: "Luka Dončić con Drafteados: “Ya nada me sorprende de LeBron”",
    summary: "La estrella eslovena conversó mano a mano con José y Sergio durante su visita a Madrid sobre su objetivo del anillo y sus inicios en España con 13 años.",
    location: "Madrid",
    highlight: "Entrevista exclusiva",
  },
  {
    id: "press-finals",
    date: "Junio 2026",
    category: "Cobertura NBA",
    title: "Cobertura de las Finales NBA in situ en Estados Unidos",
    summary: "Por cuarto año consecutivo, Drafteados se desplaza a las ciudades finalistas para una cobertura especial desde primera línea del mayor evento del baloncesto.",
    location: "Estados Unidos",
    highlight: "4º año consecutivo",
  },
  {
    id: "press-wemby",
    date: "Marzo 2026",
    category: "A Pie de Pista",
    title: "Drafteados pregunta a Victor Wembanyama",
    summary: "Tras el partido ante Miami Heat, el fenómeno de San Antonio Spurs analiza su impacto en pista y defiende su candidatura en la carrera por el MVP.",
    location: "Miami, Florida",
    highlight: "Rueda de prensa oficial",
  },
  {
    id: "press-hugo",
    date: "Abril 2026",
    category: "Especial Rookie",
    title: "24 horas con Hugo González en Boston Celtics",
    summary: "Contenido exclusivo con el rookie de los Celtics que aborda su adaptación, anécdotas y los detalles de su primera experiencia en la NBA.",
    location: "Boston, Massachusetts",
    highlight: "Acceso exclusivo",
  },
  {
    id: "press-jordi",
    date: "Marzo 2026",
    category: "3+1 Especial",
    title: "Jordi Fernández desde el Brooklyn Nets Training Center",
    summary: "El primer entrenador español en la historia de la NBA charla con Drafteados y Antoni Daimiel sobre el valor de los comienzos y las diferencias con Europa.",
    location: "Nueva York",
    highlight: "Brooklyn Nets Facility",
  },
];

// Fallback compatibility
export const COMMUNITY_TESTIMONIALS: CommunityTestimonial[] = PRESS_MILESTONES.slice(0, 3).map((p) => ({
  id: p.id,
  author: p.title,
  location: p.location || "Drafteados",
  roleBadge: p.category,
  quote: p.summary,
  timeWithUs: p.date,
}));

export const NAV_LINKS = [
  { name: "NBA Hub", href: "/nba", external: false },
  { name: "Pick'em NBA", href: "/pickem", external: false, isPickem: true, badge: "NUEVO" },
  { name: "¿Qué Hacemos?", href: "/#contenidos", external: false },
  { name: "Universo", href: "/#universo", external: false },
  { name: "Comunidad", href: "/#comunidad", external: false },
  { name: "Viajes NBA", href: "https://tripdouble.com/es/drafteados/", external: true },
  { name: "Buques Club", href: "https://www.buquesclub.com/", external: true },
  { name: "Contacto", href: "/#contacto", external: false },
];

export const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://www.youtube.com/@DrafteadosNBA", handle: "@DrafteadosNBA" },
  { name: "Instagram", href: "https://www.instagram.com/drafteados/", handle: "@drafteados" },
  { name: "TikTok", href: "https://www.tiktok.com/@drafteados", handle: "@drafteados" },
  { name: "X (Twitter)", href: "https://x.com/drafteados", handle: "@drafteados" },
  { name: "Spotify", href: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX", handle: "3+1 Podcast" },
];
