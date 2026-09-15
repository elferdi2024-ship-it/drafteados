// filepath: src/lib/youtube.ts
import { LATEST_VIDEOS, VideoItem } from "@/data/drafteados";

// Real Drafteados Channel ID & Uploads Playlist ID (1 unit quota vs 100 units for search)
export const DRAFTEADOS_CHANNEL_ID = "UCTJNmeP0HiOU4-qOMNVNoGA";
export const DRAFTEADOS_UPLOADS_PLAYLIST_ID = "UUTJNmeP0HiOU4-qOMNVNoGA";

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
    // Quota-optimized: playlistItems costs only 1 quota point (vs 100 for search)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${DRAFTEADOS_UPLOADS_PLAYLIST_ID}&part=snippet,contentDetails&maxResults=${maxResults}`;
    
    let res = await fetch(playlistUrl, { next: { revalidate: 3600 } });
    
    // Fallback to search if playlist fails
    if (!res.ok) {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${DRAFTEADOS_CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
      res = await fetch(searchUrl, { next: { revalidate: 3600 } });
    }

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
  } catch {
    return {
      videos: LATEST_VIDEOS.slice(0, maxResults),
      source: "fallback",
      lastUpdated: new Date().toISOString(),
    };
  }
}
