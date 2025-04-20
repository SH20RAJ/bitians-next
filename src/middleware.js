import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Define auth paths that should redirect to feed when authenticated
  const authPaths = ['/auth/signin', '/auth/signup'];

  // Define protected paths that require authentication
  const protectedPaths = ['/feed', '/messages', '/notifications', '/profile', '/settings'];

  const path = request.nextUrl.pathname;

  // If the user is authenticated and trying to access auth pages, redirect to feed
  if (isAuthenticated && authPaths.some(authPath => path.startsWith(authPath))) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // If the user is not authenticated and trying to access protected pages, redirect to sign-in
  if (!isAuthenticated && protectedPaths.some(protectedPath => path.startsWith(protectedPath))) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
