import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const currentPath = request.nextUrl.pathname;


  if (token && currentPath === '/login') {
    return NextResponse.redirect(new URL('/user', request.url)); 
  }

 
  if (!token && currentPath !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/login","/user","/","/form"],
};
