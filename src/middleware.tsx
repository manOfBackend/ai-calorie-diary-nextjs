import { NextResponse, type NextRequest } from 'next/server';

import { auth } from '@/auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return null;
  }

  if (!isLoggedIn && !request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return null;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
