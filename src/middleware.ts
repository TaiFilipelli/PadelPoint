import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  roles: { id: number; name: string }[];
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if(pathname.startsWith('/dashboard')){

    const userToken = req.cookies.get('user')?.value;

    if(!userToken){
      console.log('No se encontró token de usuario. Buscando banderas de sesión...');
      const isLogged = req.cookies.get('isLogged')?.value;
      const isAdmin = req.cookies.get('isAdmin')?.value;

      if(!isLogged && isLogged !== 'true'){
        console.log('No está logeado. Redireccionando...');
        return NextResponse.redirect(new URL('/404', req.url));
      }
      if(!isAdmin && isAdmin !== 'true'){
        console.log('No es admin. Redireccionando...');
        return NextResponse.redirect(new URL('/404', req.url));
      }
      return NextResponse.next();
    }else{

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
}

export const config = {
  matcher: ['/dashboard/:path*'],
};