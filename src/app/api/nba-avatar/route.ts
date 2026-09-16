// filepath: src/app/api/nba-avatar/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const size = searchParams.get('size') === 'thumb' ? '260x190' : '1040x760';

  if (!id) {
    return new NextResponse('Missing player id', { status: 400 });
  }

  const nbaUrl = `https://cdn.nba.com/headshots/nba/latest/${size}/${id}.png`;

  try {
    const res = await fetch(nbaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      next: { revalidate: 86400 * 7 }, // Cache 7 days
    });

    if (!res.ok) {
      return new NextResponse('Player headshot not found', { status: res.status });
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching NBA headshot:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
