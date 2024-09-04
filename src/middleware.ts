import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { searchUserAuthenticated } from './data/data';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  
  const authPromise = searchUserAuthenticated();
  event.waitUntil(authPromise);
  
  const auth = await authPromise;
  console.log(auth)
  if (auth.statusCode === 401) {
    console.log('Redirigiendo debido a falta de autorización');
    return NextResponse.redirect(new URL('/404', req.url));
  }
  if (!auth.user) {
    console.log('Roles del usuario no están definidos o no es un array:', auth.user);
    return NextResponse.redirect(new URL(`/${JSON.stringify(auth)}`, req.url));
  }
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // if (auth.statusCode === 401 || auth.statusCode === 404) {
    //   console.log('Redirigiendo a la página de inicio debido a statusCode:', auth.statusCode);
    //   return NextResponse.redirect(new URL('/about', req.url));
    // }
    // if (!auth || !auth.user) {
    //   console.log('Datos de autenticación incompletos o error en la respuesta:', auth);
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
    const isAdmin = auth.user.roles.some((role: { name: string }) => role.name === 'admin');
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

