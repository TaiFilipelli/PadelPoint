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
      console.log('No se encontró token de usuario. Buscando bandera en LS...');
      const logFlag = localStorage.getItem('isLogged');
      const admFlag = localStorage.getItem('iA');

      if(logFlag && admFlag){
        console.log('Bandera encontrada en LS. Redireccionando...');
        return NextResponse.next();
      }else{
        return NextResponse.redirect(new URL('/404', req.url));
      }
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