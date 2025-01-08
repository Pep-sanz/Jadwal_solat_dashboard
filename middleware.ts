import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// import { url } from 'inspector';

export function middleware(req: NextRequest) {
  const cookieStore = cookies().get(process?.env?.COOKIE_NAME as string)?.value;
  const currentPathname = req?.nextUrl.pathname;

  if (currentPathname == '/') {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const pathAllowedUnSignin = ['/sign-in', '/forgot-password'];
  if (pathAllowedUnSignin.includes(currentPathname) && cookieStore) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const pathAfterSignin = [
    '/dashboard/*',
    '/master-data/*',
    'invoice/*',
    'complaint/*',
  ];

  if (pathAfterSignin.includes(currentPathname) && !cookieStore) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}
