import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
];

// Rutas de autenticación (no accesibles si ya está autenticado)
const authRoutes = [
  '/login',
  '/register',
];

// Función simple para verificar si hay token de autenticación
function hasAuthToken(request: NextRequest): boolean {
  const token = request.cookies.get('auth-token')?.value;
  return !!token;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar si la ruta es de la API
  if (pathname.startsWith('/api/')) {
    // Rutas públicas de la API (no requieren autenticación)
    const publicApiRoutes = [
      '/api/auth/login',
      '/api/auth/register',
    ];

    // Si es una ruta pública, continuar
    if (publicApiRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // Para otras rutas de API, verificar token básico
    if (!hasAuthToken(request)) {
      return NextResponse.json(
        { success: false, message: 'No autenticado' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }
  
  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Verificar si es una ruta de autenticación
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute || isAuthRoute) {
    const hasToken = hasAuthToken(request);
    
    // Si la ruta está protegida y no hay token, redirigir al home
    if (isProtectedRoute && !hasToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Si es una ruta de auth y ya tiene token, redirigir al dashboard
    if (isAuthRoute && hasToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
}; 