import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  roles: { id: number; name: string }[];
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userToken = req.cookies.get('user')?.value;
  const refreshToken = req.cookies.get('refresh')?.value;

  if(!userToken && refreshToken){

      try{
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          credentials:'include'
        });
      } catch(error){
        console.error('Error trying to update session:',error);
      }
      
  }else{
    console.error('No session found');
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(userToken);
    const roles = decodedToken.roles || [];
    const isAdmin = roles.some((role) => role.name === 'admin');

    if (pathname.startsWith('/dashboard') && !isAdmin) {
      return NextResponse.redirect(new URL('/404', req.url));
    }

    return NextResponse.next();

  } catch (error) {
    console.error('Error decoding token:', error);
    return NextResponse.redirect(new URL('/404', req.url));
  }
}

export const config = {
  matcher: ['/','/dashboard/:path*'],
};