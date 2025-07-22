'use client';

import { useState } from 'react';

export default function ReportesPage() {
  const [selectedReport, setSelectedReport] = useState<string>('equipos');
  const [dateRange, setDateRange] = useState('ultimo_mes');

  const reportes = [
    {
      id: 'equipos',
      title: 'Inventario de Equipos',
      description: 'Estado y distribución de equipos médicos',
      icon: '📋'
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimientos',
      description: 'Historial y programación de mantenimientos',
      icon: '🔧'
    },
    {
      id: 'ordenes',
      title: 'Órdenes de Trabajo',
      description: 'Estadísticas de órdenes y tiempo de resolución',
      icon: '📝'
    },
    {
      id: 'tecnicos',
      title: 'Rendimiento Técnicos',
      description: 'Productividad y asignaciones por técnico',
      icon: '👨‍🔧'
    },
    {
      id: 'instituciones',
      title: 'Por Institución',
      description: 'Análisis por centro médico',
      icon: '🏥'
    }
  ];

  const estadisticasEquipos = {
    totalEquipos: 409,
    activos: 394,
    mantenimiento: 12,
    fueraServicio: 3,
    porTipo: [
      { tipo: 'Cama Eléctrica', cantidad: 285, porcentaje: 69.7 },
      { tipo: 'Monitor', cantidad: 45, porcentaje: 11.0 },
      { tipo: 'Bomba de Infusión', cantidad: 32, porcentaje: 7.8 },
      { tipo: 'Ventilador', cantidad: 28, porcentaje: 6.8 },
      { tipo: 'Otros', cantidad: 19, porcentaje: 4.7 }
    ],
    porInstitucion: [
      { institucion: 'Hospital Dr. Juan Noé Crevani', cantidad: 189, porcentaje: 46.2 },
      { institucion: 'Hospital de Yumbel', cantidad: 98, porcentaje: 24.0 },
      { institucion: 'UNO Salud Dental Arica', cantidad: 67, porcentaje: 16.4 },
      { institucion: 'Clínica San Carlos', cantidad: 55, porcentaje: 13.4 }
    ]
  };

  const estadisticasMantenimiento = {
    totalRealizados: 127,
    preventivos: 89,
    correctivos: 38,
    promedioDuracion: '2.3 días',
    proximosVencimientos: 23,
    equiposMasMantenimiento: [
      { equipo: 'CAMA-228', mantenimientos: 8, ultimoServicio: '2025-07-15' },
      { equipo: 'CAMA-196', mantenimientos: 6, ultimoServicio: '2025-07-10' },
      { equipo: 'MON-034', mantenimientos: 5, ultimoServicio: '2025-07-08' },
      { equipo: 'BOMB-012', mantenimientos: 4, ultimoServicio: '2025-07-05' }
    ]
  };

  const renderReporteEquipos = () => (
    <div className="space-y-6">
      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{estadisticasEquipos.totalEquipos}</div>
          <div className="text-blue-100">Total Equipos</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{estadisticasEquipos.activos}</div>
          <div className="text-green-100">Activos ({Math.round((estadisticasEquipos.activos/estadisticasEquipos.totalEquipos)*100)}%)</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{estadisticasEquipos.mantenimiento}</div>
          <div className="text-yellow-100">En Mantenimiento</div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
          <div className="text-3xl font-bold">{estadisticasEquipos.fueraServicio}</div>
          <div className="text-red-100">Fuera de Servicio</div>
        </div>
      </div>

      {/* Distribución por tipo */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Distribución por Tipo de Equipo</h3>
        <div className="space-y-3">
          {estadisticasEquipos.porTipo.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.tipo}</span>
                  <span className="text-sm text-gray-500">{item.cantidad} ({item.porcentaje}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{width: `${item.porcentaje}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribución por institución */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Distribución por Institución</h3>
        <div className="space-y-3">
          {estadisticasEquipos.porInstitucion.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.institucion}</span>
                  <span className="text-sm text-gray-500">{item.cantidad} ({item.porcentaje}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{width: `${item.porcentaje}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReporteMantenimiento = () => (
    <div className="space-y-6">
      {/* Estadísticas de mantenimiento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{estadisticasMantenimiento.totalRealizados}</div>
          <div className="text-sm text-gray-500">Total Realizados</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{estadisticasMantenimiento.preventivos}</div>
          <div className="text-sm text-gray-500">Preventivos</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">{estadisticasMantenimiento.correctivos}</div>
          <div className="text-sm text-gray-500">Correctivos</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{estadisticasMantenimiento.proximosVencimientos}</div>
          <div className="text-sm text-gray-500">Próximos Vencimientos</div>
        </div>
      </div>

      {/* Equipos con más mantenimientos */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Equipos con Más Mantenimientos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mantenimientos</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Último Servicio</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {estadisticasMantenimiento.equiposMasMantenimiento.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 font-medium text-gray-900">{item.equipo}</td>
                  <td className="px-4 py-2 text-gray-600">{item.mantenimientos}</td>
                  <td className="px-4 py-2 text-gray-600">{item.ultimoServicio}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Requiere Atención
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedReport) {
      case 'equipos':
        return renderReporteEquipos();
      case 'mantenimiento':
        return renderReporteMantenimiento();
      case 'ordenes':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reporte de Órdenes de Trabajo</h3>
            <p className="text-gray-600">Este reporte estará disponible próximamente</p>
          </div>
        );
      case 'tecnicos':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍🔧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Rendimiento de Técnicos</h3>
            <p className="text-gray-600">Este reporte estará disponible próximamente</p>
          </div>
        );
      case 'instituciones':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Análisis por Institución</h3>
            <p className="text-gray-600">Este reporte estará disponible próximamente</p>
          </div>
        );
      default:
        return renderReporteEquipos();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Reportes y Estadísticas
        </h1>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="ultima_semana">Última semana</option>
            <option value="ultimo_mes">Último mes</option>
            <option value="ultimo_trimestre">Último trimestre</option>
            <option value="ultimo_año">Último año</option>
          </select>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            📊 Exportar PDF
          </button>
        </div>
      </div>

      {/* Selector de reportes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Seleccionar Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {reportes.map((reporte) => (
            <button
              key={reporte.id}
              onClick={() => setSelectedReport(reporte.id)}
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                selectedReport === reporte.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{reporte.icon}</div>
              <div className="font-medium text-gray-900">{reporte.title}</div>
              <div className="text-sm text-gray-500 mt-1">{reporte.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido del reporte */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {reportes.find(r => r.id === selectedReport)?.title}
          </h3>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}