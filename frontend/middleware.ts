import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('nexus_session');
  const { pathname } = request.nextUrl;

  // 1. Root redirect logic
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard/overview', request.url));
    }
    // If no token, render the landing page.
    return NextResponse.next();
  }

  // 2. Protected Sub-Tree Guards
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/projects') || pathname.startsWith('/settings')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    
    // In a real scenario, we'd also check if user is_new_user from the token payload.
    // For demonstration, if cookie has 'new_user=true', we route to onboarding.
    const isNewUser = request.cookies.get('is_new_user');
    if (isNewUser?.value === 'true') {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  // 3. Onboarding Guard
  if (pathname.startsWith('/onboarding')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    // If they aren't a new user, they shouldn't be here
    const isNewUser = request.cookies.get('is_new_user');
    if (isNewUser?.value !== 'true') {
      return NextResponse.redirect(new URL('/dashboard/overview', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/projects/:path*', '/settings/:path*', '/onboarding'],
};
