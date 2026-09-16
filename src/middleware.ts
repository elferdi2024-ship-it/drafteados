// filepath: src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/** Routes that strictly require authentication */
const PROTECTED_ROUTES = [
  '/pickem/locked',
];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Only process /pickem routes
  if (!pathname.startsWith('/pickem')) {
    return supabaseResponse;
  }

  // Redirect unauthenticated users ONLY from strictly protected routes
  if (isProtectedRoute(pathname) && !user) {
    const loginUrl = new URL('/pickem/picks', request.url);
    loginUrl.searchParams.set('login', 'true');
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
