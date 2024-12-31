import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  roles: { id: number; name: string }[];
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('user')?.value;

    console.log("Token que devuelve el middleware", token);

    if (!token) {
      console.log("No encuentra el token");
      return NextResponse.redirect(new URL('/404', req.url));
    }

    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);

      console.log("Token decodeado, a ver:",decodedToken);

      const roles = decodedToken.roles || [];
      const isAdmin = roles.some((role) => role.name === 'admin');

      if (!isAdmin) {
        console.log("No es admin");
        return NextResponse.redirect(new URL('/404', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Error cacheado:", error);
      return NextResponse.redirect(new URL('/404', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};