// filepath: src/app/api/nba-logo/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing team id', { status: 400 });
  }

  const nbaUrl = `https://cdn.nba.com/logos/nba/${id}/global/L/logo.svg`;

  try {
    const res = await fetch(nbaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/svg+xml,image/*,*/*;q=0.8',
      },
      next: { revalidate: 86400 * 30 }, // Cache 30 days
    });

    if (!res.ok) {
      return new NextResponse('Team logo not found', { status: res.status });
    }

    const svgText = await res.text();

    return new NextResponse(svgText, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching NBA logo:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
