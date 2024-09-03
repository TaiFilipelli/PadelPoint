import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { searchUserAuthenticated } from './data/data';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const authPromise = searchUserAuthenticated();
  event.waitUntil(authPromise);

  const auth = await authPromise;


  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (auth.statusCode === 401 || auth.statusCode === 404) {
      console.log('Redirigiendo a la página de inicio debido a statusCode:', auth.statusCode);
      return NextResponse.redirect(new URL('/', req.url));
    }

    const isAdmin = auth.user.roles.some((role: { id: number }) => role.id === 2);
    if (!isAdmin) {
      console.log('Redirigiendo a la página de inicio debido a falta de rol de admin');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

