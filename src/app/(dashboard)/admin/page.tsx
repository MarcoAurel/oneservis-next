'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalEquipos: number;
  equiposActivos: number;
  equiposMantenimiento: number;
  equiposFueraServicio: number;
  ordenesCompletadas: number;
  ordenesPendientes: number;
  usuariosActivos: number;
  actividadReciente: Array<{
    id: number;
    mensaje: string;
    tiempo: string;
    tipo: string;
  }>;
  debug?: {
    total_equipos_bd: number;
    ordenes_en_bd: string;
    usuarios_en_bd: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.data);
        } else {
          setError('Error al cargar estadísticas');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Función para obtener color del punto según tipo de actividad
  const getActivityColor = (tipo: string) => {
    switch (tipo) {
      case 'completada': return 'bg-green-500';
      case 'asignada': return 'bg-blue-500';
      case 'nueva': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Panel de Administración
        </h1>
        <div className="text-sm text-gray-500">
          OneServis SPA - Sistema de Gestión
        </div>
      </div>

      {/* Cards de estadísticas - DATOS REALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📋</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Equipos
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats?.totalEquipos || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">✅</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Equipos Activos
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats?.equiposActivos || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">⏳</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  En Mantenimiento
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats?.equiposMantenimiento || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">👥</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Usuarios Activos
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats?.usuariosActivos || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de equipos por estado */}
      {stats && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Estado de Equipos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.equiposActivos}
              </div>
              <div className="text-sm text-green-700">Activos</div>
              <div className="text-xs text-gray-500">
                {stats.totalEquipos > 0 ? Math.round((stats.equiposActivos / stats.totalEquipos) * 100) : 0}% del total
              </div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.equiposMantenimiento}
              </div>
              <div className="text-sm text-yellow-700">En Mantenimiento</div>
              <div className="text-xs text-gray-500">
                {stats.totalEquipos > 0 ? Math.round((stats.equiposMantenimiento / stats.totalEquipos) * 100) : 0}% del total
              </div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {stats.equiposFueraServicio}
              </div>
              <div className="text-sm text-red-700">Fuera de Servicio</div>
              <div className="text-xs text-gray-500">
                {stats.totalEquipos > 0 ? Math.round((stats.equiposFueraServicio / stats.totalEquipos) * 100) : 0}% del total
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Acciones rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🆕</div>
              <div className="font-medium text-gray-900">Nuevo Equipo</div>
              <div className="text-sm text-gray-500">Registrar equipo médico</div>
            </div>
          </button>
          
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-medium text-gray-900">Nueva Orden</div>
              <div className="text-sm text-gray-500">Crear orden de trabajo</div>
            </div>
          </button>
          
          <button 
            onClick={() => {
              setLoading(true);
              window.location.reload();
            }}
            disabled={loading}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{loading ? '⏳' : '🔄'}</div>
              <div className="font-medium text-gray-900">
                {loading ? 'Cargando...' : 'Actualizar'}
              </div>
              <div className="text-sm text-gray-500">
                {loading ? 'Obteniendo datos...' : 'Refrescar estadísticas reales'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Actividad reciente - DATOS REALES */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Actividad Reciente
          </h3>
          {stats?.debug && (
            <div className="text-xs text-gray-400">
              BD: {stats.debug.total_equipos_bd} equipos, {stats.debug.usuarios_en_bd} usuarios
            </div>
          )}
        </div>
        <div className="space-y-3">
          {stats?.actividadReciente?.length ? (
            stats.actividadReciente.map((actividad) => (
              <div key={actividad.id} className="flex items-center space-x-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${getActivityColor(actividad.tipo)}`}></div>
                <span className="text-gray-500">{actividad.tiempo}</span>
                <span className="text-gray-900">{actividad.mensaje}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">No hay actividad reciente</div>
          )}
        </div>
      </div>
    </div>
  );
}