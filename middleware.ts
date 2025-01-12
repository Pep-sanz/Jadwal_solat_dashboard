import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req: NextRequest) {
  const accessToken = cookies().get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string,
  )?.value;
  const { pathname } = req.nextUrl;

  // Daftar jalur yang tidak memerlukan autentikasi
  const publicPaths = ['/sign-in', '/forgot-password', '/sign-up'];

  // Jika pengguna mencoba mengakses jalur publik tetapi sudah login, arahkan ke dashboard
  if (publicPaths.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Jika pengguna mencoba mengakses halaman yang memerlukan autentikasi tetapi tidak login
  const protectedPaths = ['/mosque/*', '/dashboard/*'];
  const isProtectedPath = protectedPaths.some((protectedPath) =>
    pathname.startsWith(protectedPath),
  );

  if (isProtectedPath && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Jika pengguna mengakses root tanpa login, arahkan ke halaman sign-in
  if (pathname === '/' && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Jika tidak ada kondisi yang terpenuhi, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}
