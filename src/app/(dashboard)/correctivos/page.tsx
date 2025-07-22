'use client';

import { useState, useEffect } from 'react';

interface MantenimientoCorrectivo {
  id: number;
  numero: string;
  equipoCodigo: string;
  tipoEquipo: string;
  problema: string;
  fechaReporte: string;
  fechaAsignacion?: string;
  fechaCompletado?: string;
  estado: 'reportado' | 'asignado' | 'en_progreso' | 'completado' | 'cancelado';
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  tecnico?: string;
  institucion: string;
  ubicacion: string;
  costoEstimado?: number;
}

export default function CorrectivosPage() {
  const [correctivos, setCorrectivos] = useState<MantenimientoCorrectivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    estado: '',
    prioridad: '',
    tecnico: ''
  });

  useEffect(() => {
    // Simular datos de mantenimientos correctivos
    const correctivosDemo: MantenimientoCorrectivo[] = [
      {
        id: 1,
        numero: 'COR-2025-001',
        equipoCodigo: 'CAMA-228',
        tipoEquipo: 'Cama Eléctrica',
        problema: 'No responde el control remoto, botones sin funcionamiento',
        fechaReporte: '2025-07-20T09:30:00Z',
        fechaAsignacion: '2025-07-20T14:00:00Z',
        estado: 'en_progreso',
        prioridad: 'alta',
        tecnico: 'Juan Pérez',
        institucion: 'Hospital Dr. Juan Noé Crevani',
        ubicacion: 'Pabellón 2',
        costoEstimado: 45000
      },
      {
        id: 2,
        numero: 'COR-2025-002',
        equipoCodigo: 'MON-034',
        tipoEquipo: 'Monitor',
        problema: 'Pantalla con líneas intermitentes, posible falla en display',
        fechaReporte: '2025-07-21T08:15:00Z',
        estado: 'reportado',
        prioridad: 'media',
        institucion: 'UNO Salud Dental Arica',
        ubicacion: 'Consulta 3',
        costoEstimado: 85000
      },
      {
        id: 3,
        numero: 'COR-2025-003',
        equipoCodigo: 'BOMB-008',
        tipoEquipo: 'Bomba de Infusión',
        problema: 'Alarma constante sin motivo aparente',
        fechaReporte: '2025-07-19T16:45:00Z',
        fechaAsignacion: '2025-07-19T17:00:00Z',
        fechaCompletado: '2025-07-20T11:30:00Z',
        estado: 'completado',
        prioridad: 'critica',
        tecnico: 'María García',
        institucion: 'Hospital Dr. Juan Noé Crevani',
        ubicacion: 'UCI',
        costoEstimado: 25000
      },
      {
        id: 4,
        numero: 'COR-2025-004',
        equipoCodigo: 'VENT-005',
        tipoEquipo: 'Ventilador',
        problema: 'Ruido extraño durante operación, vibración anormal',
        fechaReporte: '2025-07-21T11:20:00Z',
        fechaAsignacion: '2025-07-21T12:00:00Z',
        estado: 'asignado',
        prioridad: 'alta',
        tecnico: 'Carlos López',
        institucion: 'Hospital Dr. Juan Noé Crevani',
        ubicacion: 'UCI',
        costoEstimado: 120000
      }
    ];

    setTimeout(() => {
      setCorrectivos(correctivosDemo);
      setLoading(false);
    }, 1000);
  }, []);

  const getEstadoColor = (estado: string) => {
    const colores = {
      'reportado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'asignado': 'bg-blue-100 text-blue-800 border-blue-200',
      'en_progreso': 'bg-orange-100 text-orange-800 border-orange-200',
      'completado': 'bg-green-100 text-green-800 border-green-200',
      'cancelado': 'bg-red-100 text-red-800 border-red-200'
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPeso = (cantidad: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(cantidad);
  };

  const calcularTiempoRespuesta = (fechaReporte: string, fechaAsignacion?: string) => {
    if (!fechaAsignacion) return null;
    
    const reporte = new Date(fechaReporte);
    const asignacion = new Date(fechaAsignacion);
    const diferencia = Math.round((asignacion.getTime() - reporte.getTime()) / (1000 * 3600)); // horas
    
    if (diferencia < 1) return 'Menos de 1 hora';
    if (diferencia === 1) return '1 hora';
    if (diferencia < 24) return `${diferencia} horas`;
    
    const dias = Math.round(diferencia / 24);
    return `${dias} ${dias === 1 ? 'día' : 'días'}`;
  };

  const correctivosFiltrados = correctivos.filter(correctivo => {
    return (
      (!filtros.estado || correctivo.estado === filtros.estado) &&
      (!filtros.prioridad || correctivo.prioridad === filtros.prioridad) &&
      (!filtros.tecnico || correctivo.tecnico?.toLowerCase().includes(filtros.tecnico.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Mantenimientos Correctivos</h1>
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
            Mantenimientos Correctivos
          </h1>
          <p className="text-gray-600 mt-2">
            Gestión de reparaciones y correcciones de equipos
          </p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
          + Reportar Problema
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{correctivos.length}</div>
          <div className="text-sm text-gray-500">Total Correctivos</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {correctivos.filter(c => c.estado === 'reportado').length}
          </div>
          <div className="text-sm text-gray-500">Reportados</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {correctivos.filter(c => c.estado === 'asignado').length}
          </div>
          <div className="text-sm text-gray-500">Asignados</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {correctivos.filter(c => c.estado === 'en_progreso').length}
          </div>
          <div className="text-sm text-gray-500">En Progreso</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {correctivos.filter(c => c.estado === 'completado').length}
          </div>
          <div className="text-sm text-gray-500">Completados</div>
        </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Todos los estados</option>
              <option value="reportado">Reportado</option>
              <option value="asignado">Asignado</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => setFiltros(prev => ({ ...prev, prioridad: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
              Técnico
            </label>
            <input
              type="text"
              value={filtros.tecnico}
              onChange={(e) => setFiltros(prev => ({ ...prev, tecnico: e.target.value }))}
              placeholder="Buscar por técnico..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de correctivos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Correctivos Activos ({correctivosFiltrados.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {correctivosFiltrados.map((correctivo) => {
            const tiempoRespuesta = calcularTiempoRespuesta(correctivo.fechaReporte, correctivo.fechaAsignacion);
            
            return (
              <div key={correctivo.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {correctivo.numero}
                      </h4>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getEstadoColor(correctivo.estado)}`}>
                        {correctivo.estado.charAt(0).toUpperCase() + correctivo.estado.slice(1).replace('_', ' ')}
                      </span>
                      <span className={`text-sm font-medium ${getPrioridadColor(correctivo.prioridad)}`}>
                        ● {correctivo.prioridad.charAt(0).toUpperCase() + correctivo.prioridad.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-gray-800 font-medium">
                        {correctivo.equipoCodigo} - {correctivo.tipoEquipo}
                      </div>
                      <div className="text-gray-600 mt-1">
                        {correctivo.problema}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Reportado:</span> {formatFecha(correctivo.fechaReporte)}
                      </div>
                      {correctivo.fechaAsignacion && (
                        <div>
                          <span className="font-medium">Asignado:</span> {formatFecha(correctivo.fechaAsignacion)}
                          {tiempoRespuesta && (
                            <div className="text-xs text-gray-500">Tiempo respuesta: {tiempoRespuesta}</div>
                          )}
                        </div>
                      )}
                      {correctivo.fechaCompletado && (
                        <div>
                          <span className="font-medium">Completado:</span> {formatFecha(correctivo.fechaCompletado)}
                        </div>
                      )}
                      {correctivo.tecnico && (
                        <div>
                          <span className="font-medium">Técnico:</span> {correctivo.tecnico}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Ubicación:</span> {correctivo.ubicacion}
                      </div>
                      {correctivo.costoEstimado && (
                        <div>
                          <span className="font-medium">Costo estimado:</span> {formatPeso(correctivo.costoEstimado)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col space-y-2">
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors">
                      Ver Detalles
                    </button>
                    {correctivo.estado === 'reportado' && (
                      <button className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm rounded-lg hover:bg-yellow-200 transition-colors">
                        Asignar Técnico
                      </button>
                    )}
                    {correctivo.estado === 'asignado' && (
                      <button className="px-4 py-2 bg-orange-100 text-orange-700 text-sm rounded-lg hover:bg-orange-200 transition-colors">
                        Iniciar Trabajo
                      </button>
                    )}
                    {correctivo.estado === 'en_progreso' && (
                      <button className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 transition-colors">
                        Marcar Completado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {correctivosFiltrados.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">🔨</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay correctivos</h3>
            <p>No se encontraron mantenimientos correctivos con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}