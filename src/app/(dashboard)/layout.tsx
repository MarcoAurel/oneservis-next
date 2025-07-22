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

      // Verificar permisos de ruta según rol
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

  // Función para verificar permisos de ruta - ARREGLADA
  function checkRoutePermission(userRole: string, path: string): boolean {
    const rolePermissions = {
      'administrador': ['/admin', '/tecnico', '/general'],
      'tecnico': ['/tecnico', '/general'],
      'usuario': ['/general']
    };

    const allowedPaths = rolePermissions[userRole as keyof typeof rolePermissions] || [];
    
    // ARREGLO: startsWith (no startWith)
    return allowedPaths.some(allowedPath => path.startsWith(allowedPath));
  }

  // Función para obtener ruta por defecto según rol
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