// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//     console.log('🌐 middleware activated:', request.nextUrl.pathname);

//     const token = request.cookies.get('token')?.value;

//     const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
//     const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

//     if (isAuthPage && token) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }

//     if (isDashboardPage && !token) {
//         return NextResponse.redirect(new URL('/auth', request.url));
//     }

//     return NextResponse.next();
// }


// export const config = {
//     matcher: ['/dashboard/:path*', '/auth/:path*'],
// };
