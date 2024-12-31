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

    console.log(token)

    if (!token) {
      return NextResponse.redirect(new URL('/404', req.url));
    }

    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);

      console.log(decodedToken);

      const roles = decodedToken.roles || [];
      const isAdmin = roles.some((role) => role.name === 'admin');

      if (!isAdmin) {
        return NextResponse.redirect(new URL('/404', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error(error)
      return NextResponse.redirect(new URL('/404', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};