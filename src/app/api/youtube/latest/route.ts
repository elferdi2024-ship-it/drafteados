// filepath: src/app/api/youtube/latest/route.ts
import { NextResponse } from "next/server";
import { getLatestVideos } from "@/lib/youtube";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const data = await getLatestVideos(10);
  return NextResponse.json(data);
}
