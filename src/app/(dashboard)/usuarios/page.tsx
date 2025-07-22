'use client';

import { useState, useEffect } from 'react';

interface Usuario {
  id: number;
  email: string;
  full_name: string;
  role: 'administrador' | 'tecnico' | 'usuario';
  active: boolean;
  created_at: string;
  last_login?: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroRol, setFiltroRol] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Simular carga de usuarios (reemplazar con API real)
    setTimeout(() => {
      setUsuarios([
        {
          id: 1,
          email: 'admin@oneservis.cl',
          full_name: 'Administrador Sistema',
          role: 'administrador',
          active: true,
          created_at: '2025-01-15T10:30:00Z',
          last_login: '2025-07-21T08:15:00Z'
        },
        {
          id: 2,
          email: 'carlos.mendoza@oneservis.cl',
          full_name: 'Carlos Mendoza',
          role: 'tecnico',
          active: true,
          created_at: '2025-01-20T14:22:00Z',
          last_login: '2025-07-20T16:45:00Z'
        },
        {
          id: 3,
          email: 'mario.berrios@oneservis.cl',
          full_name: 'Mario Berríos Heraldo',
          role: 'tecnico',
          active: true,
          created_at: '2025-02-01T09:15:00Z',
          last_login: '2025-07-19T12:30:00Z'
        },
        {
          id: 4,
          email: 'maria.gonzalez@hospital.cl',
          full_name: 'María González',
          role: 'usuario',
          active: true,
          created_at: '2025-02-15T11:45:00Z',
          last_login: '2025-07-21T07:20:00Z'
        },
        {
          id: 5,
          email: 'hector.tripayan@oneservis.cl',
          full_name: 'Héctor Tripayán',
          role: 'usuario',
          active: false,
          created_at: '2025-03-01T16:10:00Z',
          last_login: '2025-07-15T14:55:00Z'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchRol = filtroRol === 'todos' || usuario.role === filtroRol;
    const matchEstado = filtroEstado === 'todos' || 
      (filtroEstado === 'activo' && usuario.active) ||
      (filtroEstado === 'inactivo' && !usuario.active);
    const matchBusqueda = busqueda === '' || 
      usuario.full_name.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase());
    
    return matchRol && matchEstado && matchBusqueda;
  });

  const getRolBadge = (rol: string) => {
    const badges = {
      'administrador': 'bg-purple-100 text-purple-800',
      'tecnico': 'bg-blue-100 text-blue-800',
      'usuario': 'bg-green-100 text-green-800'
    };
    return badges[rol as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const formatRol = (rol: string) => {
    const roles = {
      'administrador': 'Administrador',
      'tecnico': 'Técnico',
      'usuario': 'Usuario Final'
    };
    return roles[rol as keyof typeof roles] || rol;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularTiempoUltimoLogin = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    
    const ahora = new Date();
    const login = new Date(dateString);
    const diferencia = Math.floor((ahora.getTime() - login.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diferencia === 0) return 'Hoy';
    if (diferencia === 1) return 'Ayer';
    if (diferencia < 7) return `Hace ${diferencia} días`;
    if (diferencia < 30) return `Hace ${Math.floor(diferencia / 7)} semanas`;
    return `Hace ${Math.floor(diferencia / 30)} meses`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <div className="animate-pulse h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Usuarios
        </h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          + Nuevo Usuario
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{usuarios.length}</div>
          <div className="text-sm text-gray-500">Total Usuarios</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {usuarios.filter(u => u.active).length}
          </div>
          <div className="text-sm text-gray-500">Activos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {usuarios.filter(u => u.role === 'tecnico').length}
          </div>
          <div className="text-sm text-gray-500">Técnicos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {usuarios.filter(u => u.role === 'administrador').length}
          </div>
          <div className="text-sm text-gray-500">Administradores</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Usuario
            </label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Nombre o email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="todos">Todos los roles</option>
              <option value="administrador">Administrador</option>
              <option value="tecnico">Técnico</option>
              <option value="usuario">Usuario Final</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="todos">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setBusqueda('');
                setFiltroRol('todos');
                setFiltroEstado('todos');
              }}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Usuarios Registrados ({usuariosFiltrados.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{usuario.full_name}</div>
                      <div className="text-sm text-gray-500">{usuario.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRolBadge(usuario.role)}`}>
                      {formatRol(usuario.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      usuario.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calcularTiempoUltimoLogin(usuario.last_login)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(usuario.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-orange-600 hover:text-orange-700">
                      Editar
                    </button>
                    <button className={`${
                      usuario.active 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-green-600 hover:text-green-700'
                    }`}>
                      {usuario.active ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosFiltrados.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No se encontraron usuarios con los filtros aplicados.
          </div>
        )}
      </div>

      {/* Modal placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Crear Nuevo Usuario</h3>
            <p className="text-gray-600 mb-4">Formulario de creación de usuario (próximamente)</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}