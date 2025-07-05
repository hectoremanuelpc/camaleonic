import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/server-auth';

/**
 * Middleware para proteger rutas de la API
 * @param request Solicitud HTTP
 * @returns Respuesta HTTP o undefined para continuar
 */
export async function apiAuthMiddleware(request: NextRequest) {
  // Verificar si la ruta es de la API
  const { pathname } = request.nextUrl;
  
  // Si no es una ruta de la API, continuar
  if (!pathname.startsWith('/api/')) {
    return;
  }

  // Rutas públicas de la API (no requieren autenticación)
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
  ];

  // Si es una ruta pública, continuar
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return;
  }

  try {
    // Verificar autenticación
    const user = await getServerUser();
    
    // Si no hay usuario, devolver error 401
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'No autenticado' },
        { status: 401 }
      );
    }

    // Si hay usuario, continuar
    return;
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return NextResponse.json(
      { success: false, message: 'Error de autenticación' },
      { status: 500 }
    );
  }
} 