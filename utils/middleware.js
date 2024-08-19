import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req) {
  const token = req.cookies.get('user');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const user = await verifyToken(token);

  if (!user || user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// El middleware sólo se aplica 
export const config = {
  matcher: ['/dashboard/:path*'],
};
