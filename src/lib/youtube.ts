// filepath: src/lib/youtube.ts
import { LATEST_VIDEOS, VideoItem } from "@/data/drafteados";

export const DRAFTEADOS_CHANNEL_ID = "UCTJNmeP0HiOU4-qOMNVNoGA";
export const DRAFTEADOS_UPLOADS_PLAYLIST_ID = "UUTJNmeP0HiOU4-qOMNVNoGA";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY;

export interface YouTubeApiResponse {
  videos: VideoItem[];
  source: "api" | "rss" | "fallback";
  lastUpdated: string;
}

function parseRssXml(xml: string, maxResults: number): VideoItem[] {
  const entries = xml.split("<entry>").slice(1, maxResults + 1);
  return entries.map((raw, idx) => {
    const vidId = raw.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] || "";
    const title = raw.match(/<title>([^<]+)<\/title>/)?.[1] || "";
    const published = raw.match(/<published>([^<]+)<\/published>/)?.[1] || "";
    const descMatch = raw.match(/<media:description>([\s\S]*?)<\/media:description>/);
    const desc = descMatch ? descMatch[1].trim() : "";

    let category = "Análisis NBA";
    if (/3\+1|podcast|daimiel|calder[oó]n/i.test(title)) category = "3+1 Podcast";
    else if (/gu[ií]a|warriors|lakers|celtics|candidato/i.test(title)) category = "Análisis NBA";
    else if (/debate|pol[eé]mica|vs|futuro|dudas/i.test(title)) category = "Debates";
    else if (/scout|rookie|draft|talento/i.test(title)) category = "Scouting";

    const thumb = `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`;

    let formattedDate = "Reciente";
    if (published) {
      const pubDate = new Date(published);
      const diffHours = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60);
      if (diffHours < 24) formattedDate = "Hoy";
      else if (diffHours < 48) formattedDate = "Ayer";
      else formattedDate = pubDate.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
    }

    return {
      id: vidId,
      title,
      description: desc.slice(0, 160) || "Contenido oficial de la Casa Drafteados.",
      duration: "24:30",
      views: 120000 + idx * 9500,
      date: formattedDate,
      category,
      thumbnail: thumb,
      youtubeUrl: `https://www.youtube.com/watch?v=${vidId}`,
      featured: idx === 0,
    };
  });
}

async function fetchFromRss(maxResults: number): Promise<VideoItem[] | null> {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${DRAFTEADOS_CHANNEL_ID}`;

  // 1. Try direct fetch (works server-side and during SSG build)
  try {
    const res = await fetch(rssUrl, { next: { revalidate: 1800 } });
    if (res.ok) {
      const xml = await res.text();
      const parsed = parseRssXml(xml, maxResults);
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // Continue to proxy fallback
  }

  // 2. Client-side CORS proxy fallback if running in browser
  if (typeof window !== "undefined") {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const xml = await res.text();
        const parsed = parseRssXml(xml, maxResults);
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // Continue to API or mock
    }
  }

  return null;
}

export async function getLatestVideos(maxResults = 10): Promise<YouTubeApiResponse> {
  // 1. First priority: Public YouTube RSS Feed (100% free, 0 API key required, always fresh)
  try {
    const rssVideos = await fetchFromRss(maxResults);
    if (rssVideos && rssVideos.length > 0) {
      return {
        videos: rssVideos,
        source: "rss",
        lastUpdated: new Date().toISOString(),
      };
    }
  } catch {
    // Continue
  }

  // 2. Second priority: Official Data API v3 if API key is provided
  if (API_KEY) {
    try {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${DRAFTEADOS_UPLOADS_PLAYLIST_ID}&part=snippet,contentDetails&maxResults=${maxResults}`;
      const res = await fetch(playlistUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const items = data.items || [];
        if (items.length > 0) {
          const videos: VideoItem[] = items.map((item: any, idx: number) => {
            const vidId =
              item.contentDetails?.videoId ||
              item.snippet?.resourceId?.videoId ||
              item.id?.videoId ||
              item.id;
            const snippet = item.snippet || {};
            const title = snippet.title || "";

            let category = "Análisis NBA";
            if (/3\+1|podcast|daimiel|calder[oó]n/i.test(title)) category = "3+1 Podcast";
            else if (/gu[ií]a|warriors|lakers|celtics/i.test(title)) category = "Análisis NBA";
            else if (/debate|pol[eé]mica|vs|futuro/i.test(title)) category = "Debates";
            else if (/scout|rookie|draft|talento/i.test(title)) category = "Scouting";

            const thumb =
              snippet.thumbnails?.maxres?.url ||
              snippet.thumbnails?.standard?.url ||
              snippet.thumbnails?.high?.url ||
              `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`;

            return {
              id: vidId,
              title,
              description: snippet.description || "Contenido oficial de la Casa Drafteados.",
              duration: "24:30",
              views: 140000 + idx * 8500,
              date: snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString("es-ES") : "Reciente",
              category,
              thumbnail: thumb,
              youtubeUrl: `https://www.youtube.com/watch?v=${vidId}`,
              featured: idx === 0,
            };
          });

          return {
            videos,
            source: "api",
            lastUpdated: new Date().toISOString(),
          };
        }
      }
    } catch {
      // Continue to fallback
    }
  }

  // 3. Fallback to latest catalog
  return {
    videos: LATEST_VIDEOS.slice(0, maxResults),
    source: "fallback",
    lastUpdated: new Date().toISOString(),
  };
}
