'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(user);
      const currentPath = pathname;

      // Verificar permisos de ruta según rol - LÓGICA CORREGIDA
      const hasPermission = checkRoutePermission(userData.rol, currentPath);
      
      if (!hasPermission) {
        // Redirigir a dashboard apropiado según rol
        const defaultRoute = getDefaultRouteForRole(userData.rol);
        router.push(defaultRoute);
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      router.push('/login');
    }
  }, [router, pathname]);

  // Función para verificar permisos de ruta - COMPLETAMENTE CORREGIDA
  function checkRoutePermission(userRole: string, path: string): boolean {
    // Definir rutas específicas para cada rol
    const rolePermissions = {
      'administrador': {
        // El admin puede acceder a TODO
        allowedPaths: [
          '/admin',           // Panel Admin específico
          '/general',         // Dashboard general  
          '/ordenes',         // Órdenes de trabajo
          '/equipos',         // Gestión de equipos
          '/usuarios',        // Gestión de usuarios
          '/reportes',        // Reportes y estadísticas
          '/configuracion',   // Configuración del sistema
          '/tecnico'          // También puede ver vista técnica
        ],
        defaultPath: '/admin'
      },
      'tecnico': {
        // El técnico accede a su área y funciones operativas
        allowedPaths: [
          '/tecnico',         // Dashboard técnico
          '/general',         // Dashboard general
          '/ordenes',         // Ver y gestionar órdenes
          '/equipos',         // Ver equipos (sin crear/eliminar)
          '/preventivos',     // Mantenimientos preventivos
          '/correctivos'      // Mantenimientos correctivos
        ],
        defaultPath: '/tecnico'
      },
      'usuario': {
        // Usuario final SOLO dashboard general - sin acceso a otras secciones
        allowedPaths: [
          '/general'          // ÚNICAMENTE dashboard general
        ],
        defaultPath: '/general'
      }
    };

    const userPermissions = rolePermissions[userRole as keyof typeof rolePermissions];
    
    if (!userPermissions) {
      console.log(`Rol no reconocido: ${userRole}`);
      return false;
    }

    // Verificar si la ruta actual está permitida
    const isAllowed = userPermissions.allowedPaths.some(allowedPath => 
      path.startsWith(allowedPath)
    );

    if (!isAllowed) {
      console.log(`Acceso denegado para rol ${userRole} a ruta ${path}`);
      console.log(`Rutas permitidas:`, userPermissions.allowedPaths);
    }

    return isAllowed;
  }

  // Función para obtener ruta por defecto según rol - MEJORADA
  function getDefaultRouteForRole(role: string): string {
    const defaultRoutes = {
      'administrador': '/admin',
      'tecnico': '/tecnico', 
      'usuario': '/general'
    };

    return defaultRoutes[role as keyof typeof defaultRoutes] || '/general';
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Se redirige en useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          <Header />
          
          {/* Área de contenido */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}