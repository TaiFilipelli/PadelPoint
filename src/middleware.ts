import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  roles: { id: number; name: string }[];
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // const refreshToken = req.cookies.get('refresh')?.value;
  
  if(pathname.startsWith('/dashboard')){

    const userToken = req.cookies.get('user')?.value;
    if(!userToken){
      console.log()
      return NextResponse.redirect(new URL('/404', req.url));
    }

    try {
        const decodedToken = jwtDecode<CustomJwtPayload>(userToken);
        const roles = decodedToken.roles || [];
        const isAdmin = roles.some((role) => role.name === 'admin');
    
        if (!isAdmin) {
          return NextResponse.redirect(new URL('/404', req.url));
        }
    
        return NextResponse.next();
    
    } catch (error) {
      
      return NextResponse.redirect(new URL('/404', req.url));
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};