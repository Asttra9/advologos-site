import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'advologos_admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // Protect /admin pages (allow /admin/login page through even without auth)
  if (pathname.startsWith('/admin')) {
    // Let unauthenticated users through — the client will handle showing login form
    // But block direct API calls without auth
    return NextResponse.next();
  }

  // Protect all /api/admin/* API routes (except /api/admin/auth)
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Não autorizado.' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
