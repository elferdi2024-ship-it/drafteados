// filepath: src/types/buques-recap.ts

export type BuquesSpeaker = "sergio" | "jose" | "ambos" | string;

export interface BuquesQuote {
  text: string;
  speaker: BuquesSpeaker;
}

export interface BuquesAddition {
  player: string;
  type: "trade" | "FA" | "draft" | string;
  note: string;
  name_uncertain?: boolean;
}

export interface BuquesDeparture {
  player: string;
  type: "trade" | "FA" | "draft" | string;
  note: string;
  name_uncertain?: boolean;
}

export interface BuquesFeaturedPlayer {
  name: string;
  role: "estrella" | "duda" | "proyecto" | string;
  line: string;
}

export interface BuquesRecap {
  team_name: string;
  tricode: string;
  slug: string;
  season: string;
  video_type?: string;
  youtube_url: string;
  youtube_id?: string;
  title: string;
  one_liner: string;
  analysis: string;
  personality_lines?: BuquesQuote[];
  why_it_matters?: string[];
  additions?: BuquesAddition[];
  departures?: BuquesDeparture[];
  featured_players?: BuquesFeaturedPlayer[];
  pickem_angles?: string[];
  quotes?: BuquesQuote[];
  cta_youtube?: string;
  eyebrow?: string;
  confidence?: string;
  gaps?: string;
}
