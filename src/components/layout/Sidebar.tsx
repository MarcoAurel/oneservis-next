'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  rol: string;
}

export default function Sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Menú según rol - COMPLETAMENTE DINÁMICO
  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      { href: '/general', label: 'Dashboard', icon: '🏠' }
    ];

    if (user.rol === 'administrador') {
      return [
        { href: '/admin', label: 'Panel Admin', icon: '👨‍💼' },
        ...baseItems,
        { href: '/ordenes', label: 'Órdenes de Trabajo', icon: '📋' },
        { href: '/equipos', label: 'Equipos', icon: '🔧' },
        { href: '/usuarios', label: 'Usuarios', icon: '👥' },
        { href: '/reportes', label: 'Reportes', icon: '📊' },
        { href: '/configuracion', label: 'Configuración', icon: '⚙️' },
      ];
    }

    if (user.rol === 'tecnico') {
      return [
        { href: '/tecnico', label: 'Dashboard Técnico', icon: '🔧' },
        ...baseItems,
        { href: '/ordenes', label: 'Órdenes de Trabajo', icon: '📋' },
        { href: '/equipos', label: 'Equipos', icon: '🔧' },
        { href: '/preventivos', label: 'Preventivos', icon: '🛡️' },
        { href: '/correctivos', label: 'Correctivos', icon: '🔨' },
      ];
    }

    if (user.rol === 'usuario') {
      // Usuario SOLO ve el dashboard general - SIN OTRAS OPCIONES
      return [
        { href: '/general', label: 'Mis Solicitudes', icon: '📝' }
      ];
    }

    return baseItems;
  };

  if (!user) {
    return (
      <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded"></div>
          <div className="space-y-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-10 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div>
            <div className="font-bold text-lg text-white">OneServis</div>
            <div className="text-xs text-gray-400">Sistema de Gestión</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {getMenuItems().map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-orange-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Información del rol */}
      <div className="mt-8 p-3 bg-gray-800 rounded-lg">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Rol Actual</div>
        <div className="text-sm font-medium text-white capitalize">
          {user.rol === 'administrador' && '👨‍💼 Administrador'}
          {user.rol === 'tecnico' && '🔧 Técnico'}
          {user.rol === 'usuario' && '👤 Usuario Final'}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-xs text-gray-400 text-center">
          v1.0.0 - OneServis SPA
        </div>
      </div>
    </div>
  );
}