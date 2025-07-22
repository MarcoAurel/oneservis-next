import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo aplicar middleware a rutas del dashboard
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/tecnico') || 
      request.nextUrl.pathname.startsWith('/general')) {
    
    // En el lado del servidor no podemos acceder a localStorage
    // Verificación de autenticación se hace en el cliente (layout.tsx)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/tecnico/:path*', '/general/:path*']
};