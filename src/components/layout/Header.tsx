'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'administrador' | 'tecnico' | 'usuario';
  institucion?: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Función para formatear el rol en español
  const formatRole = (role: string) => {
    const roles = {
      'administrador': 'Administrador',
      'tecnico': 'Técnico',
      'usuario': 'Usuario Final'
    };
    return roles[role as keyof typeof roles] || role;
  };

  // Obtener iniciales del usuario
  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.nombre?.charAt(0) || '';
    const lastName = user.apellido?.charAt(0) || '';
    return (firstName + lastName).toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Si no hay usuario, mostrar loading
  if (!user) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Título y breadcrumb */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard {formatRole(user.rol)}
          </h1>
        </div>

        {/* Usuario y acciones */}
        <div className="flex items-center space-x-4">
          {/* Información del usuario */}
          <div className="flex items-center space-x-3">
            {/* Avatar con iniciales */}
            <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
              {getUserInitials()}
            </div>
            
            {/* Datos del usuario */}
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                {user.nombre} {user.apellido}
              </p>
              <p className="text-gray-500">
                {formatRole(user.rol)}
              </p>
            </div>
          </div>

          {/* Separador */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Botones de acción - SIN ICONOS EXTERNOS */}
          <div className="flex items-center space-x-2">
            {/* Botón de configuración */}
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              ⚙️
            </button>

            {/* Botón de perfil */}
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              👤
            </button>

            {/* Botón de logout */}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Cerrar sesión"
            >
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      {user.institucion && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Institución:</span> {user.institucion}
          </p>
        </div>
      )}
    </header>
  );
}