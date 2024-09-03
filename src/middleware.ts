import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { searchUserAuthenticated } from 'src/data/data';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

  const authPromise = await searchUserAuthenticated();

  event.waitUntil(authPromise);

  const auth = await authPromise;

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if(auth.statusCode === 401 || auth.statusCode === 404){return NextResponse.redirect(new URL('/', req.url))}
    
    if (!auth.user || !auth.user.roles.includes('admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/:path*'],
};
