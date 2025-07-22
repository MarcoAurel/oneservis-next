'use client';

import { useState, useEffect } from 'react';

interface MantenimientoPreventivo {
  id: number;
  equipoCodigo: string;
  tipoEquipo: string;
  ultimoMantenimiento: string;
  proximoMantenimiento: string;
  frecuencia: 'mensual' | 'trimestral' | 'semestral' | 'anual';
  estado: 'vigente' | 'vencido' | 'proximo' | 'completado';
  institucion: string;
  ubicacion: string;
}

export default function PreventivosPage() {
  const [mantenimientos, setMantenimientos] = useState<MantenimientoPreventivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    estado: '',
    frecuencia: '',
    institucion: ''
  });

  useEffect(() => {
    // Simular datos de mantenimientos preventivos
    const mantenimientosDemo: MantenimientoPreventivo[] = [
      {
        id: 1,
        equipoCodigo: 'CAMA-228',
        tipoEquipo: 'Cama Eléctrica',
        ultimoMantenimiento: '2024-10-15',
        proximoMantenimiento: '2025-01-15',
        frecuencia: 'trimestral',
        estado: 'vencido',
        institucion: 'Hospital Dr. Juan Noé Crevani',
        ubicacion: 'Pabellón 2'
      },
      {
        id: 2,
        equipoCodigo: 'CAMA-268',
        tipoEquipo: 'Cama Eléctrica',
        ultimoMantenimiento: '2024-12-20',
        proximoMantenimiento: '2025-03-20',
        frecuencia: 'trimestral',
        estado: 'vigente',
        institucion: 'Hospital Dr. Juan Noé Crevani',
        ubicacion: 'Bodega'
      },
      {
        id: 3,
        equipoCodigo: 'MON-034',
        tipoEquipo: 'Monitor',
        ultimoMantenimiento: '2024-11-10',
        proximoMantenimiento: '2025-08-10',
        frecuencia: 'anual',
        estado: 'vigente',
        institucion: 'UNO Salud Dental Arica',
        ubicacion: 'Consulta 3'
      },
      {
        id: 4,
        equipoCodigo: 'BOMB-008',
        tipoEquipo: 'Bomba de Infusión',
        ultimoMantenimiento: '2024-12-01',
        proximoMantenimiento: '2025-08-01',
        frecuencia: 'semestral',
        estado: 'proximo',
        institucion: 'Hospital Dr. Juan Noé Crevani',
        ubicacion: 'UCI'
      }
    ];

    setTimeout(() => {
      setMantenimientos(mantenimientosDemo);
      setLoading(false);
    }, 1000);
  }, []);

  const getEstadoColor = (estado: string) => {
    const colores = {
      'vigente': 'bg-green-100 text-green-800 border-green-200',
      'vencido': 'bg-red-100 text-red-800 border-red-200',
      'proximo': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'completado': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colores[estado as keyof typeof colores] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getFrecuenciaText = (frecuencia: string) => {
    const textos = {
      'mensual': 'Mensual',
      'trimestral': 'Trimestral',
      'semestral': 'Semestral',
      'anual': 'Anual'
    };
    return textos[frecuencia as keyof typeof textos] || frecuencia;
  };

  const formatFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calcularDiasRestantes = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const hoy = new Date();
    const diferencia = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
    return diferencia;
  };

  const mantenimientosFiltrados = mantenimientos.filter(mantenimiento => {
    return (
      (!filtros.estado || mantenimiento.estado === filtros.estado) &&
      (!filtros.frecuencia || mantenimiento.frecuencia === filtros.frecuencia) &&
      (!filtros.institucion || mantenimiento.institucion.toLowerCase().includes(filtros.institucion.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Mantenimientos Preventivos</h1>
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
            Mantenimientos Preventivos
          </h1>
          <p className="text-gray-600 mt-2">
            Planificación y seguimiento de mantenimientos programados
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          + Programar Mantenimiento
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{mantenimientos.length}</div>
          <div className="text-sm text-gray-500">Total Programados</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-red-600">
            {mantenimientos.filter(m => m.estado === 'vencido').length}
          </div>
          <div className="text-sm text-gray-500">Vencidos</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {mantenimientos.filter(m => m.estado === 'proximo').length}
          </div>
          <div className="text-sm text-gray-500">Próximos</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {mantenimientos.filter(m => m.estado === 'vigente').length}
          </div>
          <div className="text-sm text-gray-500">Vigentes</div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="vigente">Vigente</option>
              <option value="vencido">Vencido</option>
              <option value="proximo">Próximo</option>
              <option value="completado">Completado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frecuencia
            </label>
            <select
              value={filtros.frecuencia}
              onChange={(e) => setFiltros(prev => ({ ...prev, frecuencia: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las frecuencias</option>
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institución
            </label>
            <input
              type="text"
              value={filtros.institucion}
              onChange={(e) => setFiltros(prev => ({ ...prev, institucion: e.target.value }))}
              placeholder="Buscar por institución..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de mantenimientos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Mantenimientos Programados ({mantenimientosFiltrados.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mantenimientosFiltrados.map((mantenimiento) => {
            const diasRestantes = calcularDiasRestantes(mantenimiento.proximoMantenimiento);
            
            return (
              <div key={mantenimiento.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {mantenimiento.equipoCodigo}
                      </h4>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getEstadoColor(mantenimiento.estado)}`}>
                        {mantenimiento.estado.charAt(0).toUpperCase() + mantenimiento.estado.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {getFrecuenciaText(mantenimiento.frecuencia)}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 mb-3 font-medium">
                      {mantenimiento.tipoEquipo}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Último:</span> {formatFecha(mantenimiento.ultimoMantenimiento)}
                      </div>
                      <div>
                        <span className="font-medium">Próximo:</span> {formatFecha(mantenimiento.proximoMantenimiento)}
                        {diasRestantes <= 7 && diasRestantes > 0 && (
                          <span className="ml-2 text-yellow-600 font-medium">
                            ({diasRestantes} días)
                          </span>
                        )}
                        {diasRestantes <= 0 && (
                          <span className="ml-2 text-red-600 font-medium">
                            (Vencido)
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-medium">Ubicación:</span> {mantenimiento.ubicacion}
                      </div>
                      <div>
                        <span className="font-medium">Institución:</span> {mantenimiento.institucion}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col space-y-2">
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors">
                      Ver Detalles
                    </button>
                    {mantenimiento.estado === 'vencido' && (
                      <button className="px-4 py-2 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 transition-colors">
                        Ejecutar Ahora
                      </button>
                    )}
                    {mantenimiento.estado === 'proximo' && (
                      <button className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm rounded-lg hover:bg-yellow-200 transition-colors">
                        Programar
                      </button>
                    )}
                    {mantenimiento.estado === 'vigente' && (
                      <button className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 transition-colors">
                        Adelantar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {mantenimientosFiltrados.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">🛡️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay mantenimientos</h3>
            <p>No se encontraron mantenimientos con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}