'use client';

import { useState, useEffect } from 'react';

interface MisSolicitudes {
  id: number;
  numero: string;
  descripcion: string;
  estado: 'pendiente' | 'en_revision' | 'asignada' | 'en_progreso' | 'completada';
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  fechaCreacion: string;
  equipoCodigo?: string;
  fechaEstimada?: string;
}

interface User {
  nombre?: string;
  apellido?: string;
  email?: string;
  rol?: string;
}

interface NewSolicitudForm {
  descripcion: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  equipoCodigo: string;
}

export default function GeneralDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [solicitudes, setSolicitudes] = useState<MisSolicitudes[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSolicitud, setNewSolicitud] = useState<NewSolicitudForm>({
    descripcion: '',
    prioridad: 'media',
    equipoCodigo: ''
  });

  useEffect(() => {
    // Obtener datos del usuario
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Simular solicitudes del usuario
    setSolicitudes([
      {
        id: 1,
        numero: 'SOL-001',
        descripcion: 'Problema con equipo CAMA-066 - no responde el control',
        estado: 'en_revision',
        prioridad: 'media',
        fechaCreacion: '2025-07-20T10:30:00Z',
        equipoCodigo: 'CAMA-066',
        fechaEstimada: '2025-07-23'
      },
      {
        id: 2,
        numero: 'SOL-002',
        descripcion: 'Solicitud de mantenimiento preventivo para monitor',
        estado: 'completada',
        prioridad: 'baja',
        fechaCreacion: '2025-07-15T14:20:00Z',
        equipoCodigo: 'MON-012',
        fechaEstimada: '2025-07-18'
      },
      {
        id: 3,
        numero: 'SOL-003',
        descripcion: 'Equipo hace ruido extraño durante operación',
        estado: 'asignada',
        prioridad: 'alta',
        fechaCreacion: '2025-07-21T08:15:00Z',
        equipoCodigo: 'BOMB-008',
        fechaEstimada: '2025-07-22'
      }
    ]);
  }, []);

  const getEstadoColor = (estado: string) => {
    const colores = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'en_revision': 'bg-blue-100 text-blue-800',
      'asignada': 'bg-purple-100 text-purple-800',
      'en_progreso': 'bg-orange-100 text-orange-800',
      'completada': 'bg-green-100 text-green-800'
    };
    return colores[estado as keyof typeof colores] || 'bg-gray-100 text-gray-800';
  };

  const getPrioridadColor = (prioridad: string) => {
    const colores = {
      'baja': 'bg-gray-100 text-gray-700',
      'media': 'bg-blue-100 text-blue-700',
      'alta': 'bg-orange-100 text-orange-700',
      'critica': 'bg-red-100 text-red-700'
    };
    return colores[prioridad as keyof typeof colores] || 'bg-gray-100 text-gray-700';
  };

  const formatEstado = (estado: string) => {
    const estados = {
      'pendiente': 'Pendiente',
      'en_revision': 'En Revisión',
      'asignada': 'Asignada',
      'en_progreso': 'En Progreso',
      'completada': 'Completada'
    };
    return estados[estado as keyof typeof estados] || estado;
  };

  const formatPrioridad = (prioridad: string) => {
    const prioridades = {
      'baja': 'Baja',
      'media': 'Media',
      'alta': 'Alta',
      'critica': 'Crítica'
    };
    return prioridades[prioridad as keyof typeof prioridades] || prioridad;
  };

  const formatTiempo = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const hoy = new Date();
    const diferencia = Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 3600 * 24));
    
    if (diferencia === 0) return 'Hoy';
    if (diferencia === 1) return 'Ayer';
    return `Hace ${diferencia} días`;
  };

  const handleCreateSolicitud = async () => {
    if (!newSolicitud.descripcion.trim()) {
      alert('Por favor ingresa una descripción');
      return;
    }

    const nuevaSolicitud: MisSolicitudes = {
      id: Date.now(),
      numero: `SOL-${String(solicitudes.length + 1).padStart(3, '0')}`,
      descripcion: newSolicitud.descripcion,
      estado: 'pendiente',
      prioridad: newSolicitud.prioridad,
      fechaCreacion: new Date().toISOString(),
      equipoCodigo: newSolicitud.equipoCodigo || undefined
    };

    setSolicitudes(prev => [nuevaSolicitud, ...prev]);
    setNewSolicitud({ descripcion: '', prioridad: 'media', equipoCodigo: '' });
    setShowCreateModal(false);
  };

  // Estadísticas rápidas
  const totalSolicitudes = solicitudes.length;
  const pendientes = solicitudes.filter(s => ['pendiente', 'en_revision', 'asignada'].includes(s.estado)).length;
  const completadas = solicitudes.filter(s => s.estado === 'completada').length;
  const enProceso = solicitudes.filter(s => s.estado === 'en_progreso').length;

  return (
    <div className="space-y-6">
      {/* Header personalizado */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              ¡Hola, {user?.nombre || 'Usuario'}!
            </h1>
            <p className="text-green-100 mt-2">
              Gestiona tus solicitudes de mantenimiento y soporte técnico
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalSolicitudes}</div>
            <div className="text-green-100">Mis Solicitudes</div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-blue-600">{totalSolicitudes}</div>
          <div className="text-sm text-gray-500">Total Solicitudes</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-yellow-600">{pendientes}</div>
          <div className="text-sm text-gray-500">Pendientes</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-orange-600">{enProceso}</div>
          <div className="text-sm text-gray-500">En Proceso</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-green-600">{completadas}</div>
          <div className="text-sm text-gray-500">Completadas</div>
        </div>
      </div>

      {/* Crear nueva solicitud */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Nueva Solicitud de Servicio</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            + Nueva Solicitud
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl mb-2">🔧</div>
            <div className="font-medium text-gray-900">Mantenimiento</div>
            <div className="text-sm text-gray-600">Solicitar reparación o mantenimiento</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium text-gray-900">Inspección</div>
            <div className="text-sm text-gray-600">Solicitar revisión técnica</div>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
            <div className="text-2xl mb-2">🆘</div>
            <div className="font-medium text-gray-900">Emergencia</div>
            <div className="text-sm text-gray-600">Reporte urgente de problema</div>
          </div>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Mis Solicitudes ({solicitudes.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {solicitudes.map((solicitud) => (
            <div key={solicitud.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Solicitud #{solicitud.numero}
                    </h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(solicitud.estado)}`}>
                      {formatEstado(solicitud.estado)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadColor(solicitud.prioridad)}`}>
                      {formatPrioridad(solicitud.prioridad)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{solicitud.descripcion}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div>
                      <strong>Creada:</strong> {formatTiempo(solicitud.fechaCreacion)}
                    </div>
                    {solicitud.equipoCodigo && (
                      <div>
                        <strong>Equipo:</strong> {solicitud.equipoCodigo}
                      </div>
                    )}
                    {solicitud.fechaEstimada && (
                      <div>
                        <strong>Fecha estimada:</strong> {new Date(solicitud.fechaEstimada).toLocaleDateString('es-CL')}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors">
                    Ver Detalles
                  </button>
                  {solicitud.estado === 'pendiente' && (
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {solicitudes.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes solicitudes</h3>
            <p>Crea tu primera solicitud de mantenimiento o soporte técnico.</p>
          </div>
        )}
      </div>

      {/* Modal para crear solicitud - ESTILOS CORREGIDOS */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Solicitud de Servicio</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Equipo (Opcional)
                </label>
                <input
                  type="text"
                  value={newSolicitud.equipoCodigo}
                  onChange={(e) => setNewSolicitud(prev => ({ ...prev, equipoCodigo: e.target.value }))}
                  placeholder="Ej: CAMA-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridad
                </label>
                <select
                  value={newSolicitud.prioridad}
                  onChange={(e) => setNewSolicitud(prev => ({ 
                    ...prev, 
                    prioridad: e.target.value as NewSolicitudForm['prioridad']
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del Problema
                </label>
                <textarea
                  value={newSolicitud.descripcion}
                  onChange={(e) => setNewSolicitud(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={4}
                  placeholder="Describe el problema o servicio requerido..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-500 resize-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateSolicitud}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
              >
                Crear Solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}