import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { searchUserAuthenticated } from 'src/data/data';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        try {
            const result = await searchUserAuthenticated();
            
            const user = result.user;

            if (!user.roles || user.roles.length === 0 || !user.roles.includes('admin')) {
                return NextResponse.redirect(new URL('/', req.url));
            }

        } catch (error) {
            console.error('Error al verificar la autenticación del usuario:', error);
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
