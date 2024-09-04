import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { searchUserAuthenticated } from './data/data';

// const checkIfAdmin = async () => {
//   const data = await searchUserAuthenticated();
//   if (!data) {
//     return NextResponse.json({
//       message: 'ERROR FETCHEANDO DATA',
//       dataError: data,
//     });
//   }
//   if (!data.user) {
//     return NextResponse.json({
//       message: 'NO HAY PERMISOS',
//       statusCode: data.statusCode,
//       dataError: data,
//     });
//   }
//   if (!data.user.roles.some((role: { name: string }) => role.name === 'admin')) {
//     return NextResponse.json({
//       message: 'NO TIENE LOS PERMISOS NECESARIOS PARA ENTRAR ACÁ',
//       statusCode: data.statusCode,
//       dataError: data,
//     });
//   }
//   return NextResponse.next();
// };

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // if (pathname.startsWith('/dashboard')) {
  //   const response = await checkIfAdmin();
  //   if (response.status === 200) {
  //     return response;
  //   }
  //   return response; 
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
