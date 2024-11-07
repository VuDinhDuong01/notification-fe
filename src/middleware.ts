import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('user_id');
  const currentPath = request.nextUrl.pathname;
  console.log("cookie:", cookie)
  if (cookie && currentPath !== '/user') {
    return NextResponse.redirect(new URL('/user', request.url));
  }

  if (!cookie && currentPath !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/user", "/"],
};
