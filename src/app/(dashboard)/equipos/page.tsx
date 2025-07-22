'use client';

import { useState } from 'react';

interface Equipo {
  id: number;
  codigo: string;
  tipo: string;
  marca: string;
  modelo: string;
  estado: 'operativo' | 'mantenimiento' | 'fuera_servicio';
  institucion: string;
  ubicacion: string;
  ultimoMantenimiento?: string;
}

export default function EquiposPage() {
  const [equipos] = useState<Equipo[]>([
    {
      id: 1,
      codigo: 'CAMA-228',
      tipo: 'Cama Eléctrica',
      marca: 'Hill Rom',
      modelo: 'P750',
      estado: 'operativo',
      institucion: 'Hospital Dr. Juan Noé Crevani',
      ubicacion: 'Pabellón 2',
      ultimoMantenimiento: '2025-01-15'
    },
    {
      id: 2,
      codigo: 'CAMA-268',
      tipo: 'Cama Eléctrica', 
      marca: 'Kaneway',
      modelo: 'S/M',
      estado: 'mantenimiento',
      institucion: 'Hospital Dr. Juan Noé Crevani',
      ubicacion: 'Bodega',
      ultimoMantenimiento: '2024-12-20'
    },
    {
      id: 3,
      codigo: 'CAMA-009',
      tipo: 'Cama Eléctrica',
      marca: 'Promisa',
      modelo: 'S/M',
      estado: 'operativo',
      institucion: 'Hospital Dr. Juan Noé Crevani',
      ubicacion: 'Sala 15',
      ultimoMantenimiento: '2025-01-10'
    }
  ]);

  const [filtro, setFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos');

  const equiposFiltrados = equipos.filter(equipo => {
    const matchTexto = equipo.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
                      equipo.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
                      equipo.marca.toLowerCase().includes(filtro.toLowerCase());
    
    const matchEstado = estadoFiltro === 'todos' || equipo.estado === estadoFiltro;
    
    return matchTexto && matchEstado;
  });

  const getEstadoBadge = (estado: string) => {
    const badges = {
      'operativo': 'bg-green-100 text-green-800',
      'mantenimiento': 'bg-yellow-100 text-yellow-800',
      'fuera_servicio': 'bg-red-100 text-red-800'
    };
    return badges[estado as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const formatEstado = (estado: string) => {
    const estados = {
      'operativo': 'Operativo',
      'mantenimiento': 'En Mantenimiento',
      'fuera_servicio': 'Fuera de Servicio'
    };
    return estados[estado as keyof typeof estados] || estado;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Equipos
        </h1>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
          + Nuevo Equipo
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Equipo
            </label>
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Código, tipo, marca..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="operativo">Operativo</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="fuera_servicio">Fuera de Servicio</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFiltro('');
                setEstadoFiltro('todos');
              }}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{equipos.length}</div>
          <div className="text-sm text-gray-500">Total Equipos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {equipos.filter(e => e.estado === 'operativo').length}
          </div>
          <div className="text-sm text-gray-500">Operativos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {equipos.filter(e => e.estado === 'mantenimiento').length}
          </div>
          <div className="text-sm text-gray-500">En Mantenimiento</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-red-600">
            {equipos.filter(e => e.estado === 'fuera_servicio').length}
          </div>
          <div className="text-sm text-gray-500">Fuera de Servicio</div>
        </div>
      </div>

      {/* Lista de equipos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Equipos Registrados ({equiposFiltrados.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo / Modelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Mant.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equiposFiltrados.map((equipo) => (
                <tr key={equipo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{equipo.codigo}</div>
                    <div className="text-sm text-gray-500">{equipo.marca}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{equipo.tipo}</div>
                    <div className="text-sm text-gray-500">{equipo.modelo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadge(equipo.estado)}`}>
                      {formatEstado(equipo.estado)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{equipo.ubicacion}</div>
                    <div className="text-xs text-gray-500">{equipo.institucion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipo.ultimoMantenimiento || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-orange-600 hover:text-orange-700">
                      Ver
                    </button>
                    <button className="text-blue-600 hover:text-blue-700">
                      Editar
                    </button>
                    <button className="text-green-600 hover:text-green-700">
                      Mantenimiento
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {equiposFiltrados.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No se encontraron equipos con los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
}