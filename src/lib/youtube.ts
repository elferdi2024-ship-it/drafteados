// filepath: src/lib/youtube.ts
import { LATEST_VIDEOS, VideoItem } from "@/data/drafteados";

const DRAFTEADOS_CHANNEL_ID = "UCJ_...";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY;

export interface YouTubeApiResponse {
  videos: VideoItem[];
  source: "api" | "fallback";
  lastUpdated: string;
}

export async function getLatestVideos(maxResults = 10): Promise<YouTubeApiResponse> {
  if (!API_KEY) {
    return {
      videos: LATEST_VIDEOS.slice(0, maxResults),
      source: "fallback",
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${DRAFTEADOS_CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return {
        videos: LATEST_VIDEOS.slice(0, maxResults),
        source: "fallback",
        lastUpdated: new Date().toISOString(),
      };
    }

    const data = await res.json();
    const items = data.items || [];

    if (items.length === 0) {
      return {
        videos: LATEST_VIDEOS.slice(0, maxResults),
        source: "fallback",
        lastUpdated: new Date().toISOString(),
      };
    }

    const videos: VideoItem[] = items.map((item: any) => {
      const vidId = item.id?.videoId || item.id;
      const snippet = item.snippet || {};
      const title = snippet.title || "";

      let category = "Análisis NBA";
      if (/3\+1|podcast|daimiel|calder[oó]n/i.test(title)) category = "3+1 Podcast";
      else if (/debate|pol[eé]mica|vs|futuro/i.test(title)) category = "Debates";
      else if (/scout|rookie|draft|talento/i.test(title)) category = "Scouting";

      return {
        id: vidId,
        title,
        description: snippet.description || "Contenido oficial de la Casa Drafteados.",
        duration: "20:00",
        views: 120000,
        date: snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString("es-ES") : "Reciente",
        category,
        thumbnail:
          snippet.thumbnails?.maxres?.url ||
          snippet.thumbnails?.high?.url ||
          `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`,
        youtubeUrl: `https://www.youtube.com/watch?v=${vidId}`,
      };
    });

    return {
      videos,
      source: "api",
      lastUpdated: new Date().toISOString(),
    };
  } catch {
    return {
      videos: LATEST_VIDEOS.slice(0, maxResults),
      source: "fallback",
      lastUpdated: new Date().toISOString(),
    };
  }
}
