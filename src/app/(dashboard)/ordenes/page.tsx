'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrdenTrabajo {
  id: number;
  numero: string;
  equipoCodigo: string;
  descripcion: string;
  estado: 'pendiente' | 'asignada' | 'en_progreso' | 'completada' | 'cancelada';
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  tipoTrabajo: 'preventivo' | 'correctivo' | 'instalacion' | 'retiro';
  fechaCreacion: string;
  fechaVencimiento?: string;
  tecnico?: string;
  institucion: string;
}

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState<OrdenTrabajo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    estado: '',
    prioridad: '',
    tipo: ''
  });

  useEffect(() => {
    // Simular datos de órdenes
    const ordenesDemo: OrdenTrabajo[] = [
      {
        id: 1,
        numero: 'OT-2025-001',
        equipoCodigo: 'CAMA-228',
        descripcion: 'Mantenimiento preventivo trimestral',
        estado: 'pendiente',
        prioridad: 'media',
        tipoTrabajo: 'preventivo',
        fechaCreacion: '2025-07-21T10:00:00Z',
        fechaVencimiento: '2025-07-25',
        institucion: 'Hospital Dr. Juan Noé Crevani'
      },
      {
        id: 2,
        numero: 'OT-2025-002',
        equipoCodigo: 'CAMA-268',
        descripcion: 'Reparación sistema eléctrico',
        estado: 'en_progreso',
        prioridad: 'alta',
        tipoTrabajo: 'correctivo',
        fechaCreacion: '2025-07-20T14:30:00Z',
        tecnico: 'Juan Pérez',
        institucion: 'Hospital Dr. Juan Noé Crevani'
      },
      {
        id: 3,
        numero: 'OT-2025-003',
        equipoCodigo: 'MON-034',
        descripcion: 'Instalación nuevo monitor',
        estado: 'completada',
        prioridad: 'media',
        tipoTrabajo: 'instalacion',
        fechaCreacion: '2025-07-19T09:15:00Z',
        tecnico: 'María García',
        institucion: 'UNO Salud Dental Arica'
      }
    ];

    setTimeout(() => {
      setOrdenes(ordenesDemo);
      setLoading(false);
    }, 1000);
  }, []);

  const getEstadoColor = (estado: string) => {
    const colores = {
      'pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'asignada': 'bg-blue-100 text-blue-800 border-blue-200',
      'en_progreso': 'bg-orange-100 text-orange-800 border-orange-200',
      'completada': 'bg-green-100 text-green-800 border-green-200',
      'cancelada': 'bg-red-100 text-red-800 border-red-200'
    };
    return colores[estado as keyof typeof colores] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPrioridadColor = (prioridad: string) => {
    const colores = {
      'baja': 'text-gray-600',
      'media': 'text-blue-600',
      'alta': 'text-orange-600',
      'critica': 'text-red-600'
    };
    return colores[prioridad as keyof typeof colores] || 'text-gray-600';
  };

  const formatFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const ordenesFiltradas = ordenes.filter(orden => {
    return (
      (!filtros.estado || orden.estado === filtros.estado) &&
      (!filtros.prioridad || orden.prioridad === filtros.prioridad) &&
      (!filtros.tipo || orden.tipoTrabajo === filtros.tipo)
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Órdenes de Trabajo</h1>
          <div className="animate-pulse h-10 bg-gray-200 rounded w-40"></div>
        </div>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Órdenes de Trabajo
          </h1>
          <p className="text-gray-600 mt-2">
            Gestión de solicitudes de mantenimiento y servicio técnico
          </p>
        </div>
        <Link
          href="/ordenes/nueva"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          + Nueva Orden
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="asignada">Asignada</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => setFiltros(prev => ({ ...prev, prioridad: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todas las prioridades</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todos los tipos</option>
              <option value="preventivo">Preventivo</option>
              <option value="correctivo">Correctivo</option>
              <option value="instalacion">Instalación</option>
              <option value="retiro">Retiro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{ordenes.length}</div>
          <div className="text-sm text-gray-500">Total Órdenes</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {ordenes.filter(o => o.estado === 'pendiente').length}
          </div>
          <div className="text-sm text-gray-500">Pendientes</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {ordenes.filter(o => o.estado === 'en_progreso').length}
          </div>
          <div className="text-sm text-gray-500">En Progreso</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {ordenes.filter(o => o.estado === 'completada').length}
          </div>
          <div className="text-sm text-gray-500">Completadas</div>
        </div>
      </div>

      {/* Lista de órdenes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Órdenes Activas ({ordenesFiltradas.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {ordenesFiltradas.map((orden) => (
            <div key={orden.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {orden.numero}
                    </h4>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getEstadoColor(orden.estado)}`}>
                      {orden.estado.charAt(0).toUpperCase() + orden.estado.slice(1).replace('_', ' ')}
                    </span>
                    <span className={`text-sm font-medium ${getPrioridadColor(orden.prioridad)}`}>
                      ● {orden.prioridad.charAt(0).toUpperCase() + orden.prioridad.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 mb-3 font-medium">
                    {orden.descripcion}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Equipo:</span> {orden.equipoCodigo}
                    </div>
                    <div>
                      <span className="font-medium">Tipo:</span> {orden.tipoTrabajo.charAt(0).toUpperCase() + orden.tipoTrabajo.slice(1)}
                    </div>
                    <div>
                      <span className="font-medium">Creada:</span> {formatFecha(orden.fechaCreacion)}
                    </div>
                    {orden.tecnico && (
                      <div>
                        <span className="font-medium">Técnico:</span> {orden.tecnico}
                      </div>
                    )}
                    {orden.fechaVencimiento && (
                      <div>
                        <span className="font-medium">Vencimiento:</span> {formatFecha(orden.fechaVencimiento)}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Institución:</span> {orden.institucion}
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors">
                    Ver Detalles
                  </button>
                  {orden.estado === 'pendiente' && (
                    <button className="px-4 py-2 bg-orange-100 text-orange-700 text-sm rounded-lg hover:bg-orange-200 transition-colors">
                      Asignar
                    </button>
                  )}
                  {orden.estado === 'en_progreso' && (
                    <button className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 transition-colors">
                      Completar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {ordenesFiltradas.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay órdenes</h3>
            <p>No se encontraron órdenes con los filtros seleccionados.</p>
            <Link
              href="/ordenes/nueva"
              className="inline-block mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Crear Primera Orden
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}