'use client';

import { useState, useEffect } from 'react';

// Interfaces de configuración
interface ConfiguracionSistema {
  general: {
    nombreSistema: string;
    institucionPrincipal: string;
    emailContacto: string;
    telefono: string;
  };
  notificaciones: {
    emailAlertas: boolean;
    emailReportes: boolean;
    frecuenciaReportes: 'diario' | 'semanal' | 'mensual';
  };
  mantenimiento: {
    diasAvisoVencimiento: number;
    frecuenciaReportes: 'semanal' | 'mensual';
    horasLaborales: {
      inicio: string;
      fin: string;
    };
  };
  seguridad: {
    sessionTimeout: number;
    intentosLogin: number;
    backupAutomatico: boolean;
  };
}

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [config, setConfig] = useState<ConfiguracionSistema>({
    general: {
      nombreSistema: 'OneServis SPA',
      institucionPrincipal: 'Hospital Dr. Juan Noé Crevani',
      emailContacto: 'admin@oneservis.cl',
      telefono: '+56 58 2205000'
    },
    notificaciones: {
      emailAlertas: true,
      emailReportes: true,
      frecuenciaReportes: 'semanal'
    },
    mantenimiento: {
      diasAvisoVencimiento: 7,
      frecuenciaReportes: 'semanal',
      horasLaborales: {
        inicio: '08:00',
        fin: '18:00'
      }
    },
    seguridad: {
      sessionTimeout: 60,
      intentosLogin: 3,
      backupAutomatico: true
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: '🏢' },
    { id: 'notificaciones', label: 'Notificaciones', icon: '🔔' },
    { id: 'mantenimiento', label: 'Mantenimiento', icon: '🔧' },
    { id: 'seguridad', label: 'Seguridad', icon: '🔒' },
    { id: 'backup', label: 'Backup', icon: '💾' }
  ];

  // Función corregida para manejar cambios de input - TIPADO ARREGLADO
  const handleInputChange = (section: keyof ConfiguracionSistema, field: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      
      // Manejo específico para cada sección
      if (section === 'general') {
        newConfig.general = {
          ...newConfig.general,
          [field]: value
        };
      } else if (section === 'notificaciones') {
        newConfig.notificaciones = {
          ...newConfig.notificaciones,
          [field]: value
        };
      } else if (section === 'mantenimiento') {
        if (field === 'horasLaborales') {
          newConfig.mantenimiento = {
            ...newConfig.mantenimiento,
            horasLaborales: {
              ...newConfig.mantenimiento.horasLaborales,
              ...value
            }
          };
        } else {
          newConfig.mantenimiento = {
            ...newConfig.mantenimiento,
            [field]: value
          };
        }
      } else if (section === 'seguridad') {
        newConfig.seguridad = {
          ...newConfig.seguridad,
          [field]: value
        };
      }
      
      return newConfig;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Configuración guardada:', config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      alert('Error al guardar configuración');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Configuración del Sistema
          </h1>
          <p className="text-gray-600 mt-2">
            Administra la configuración general del sistema OneServis
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Guardando...</span>
            </div>
          ) : saved ? (
            '✅ Guardado'
          ) : (
            '💾 Guardar Cambios'
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: General */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración General</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Sistema
                  </label>
                  <input
                    type="text"
                    value={config.general.nombreSistema}
                    onChange={(e) => handleInputChange('general', 'nombreSistema', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institución Principal
                  </label>
                  <input
                    type="text"
                    value={config.general.institucionPrincipal}
                    onChange={(e) => handleInputChange('general', 'institucionPrincipal', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    value={config.general.emailContacto}
                    onChange={(e) => handleInputChange('general', 'emailContacto', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={config.general.telefono}
                    onChange={(e) => handleInputChange('general', 'telefono', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Notificaciones */}
          {activeTab === 'notificaciones' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración de Notificaciones</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Alertas por Email</h4>
                    <p className="text-sm text-gray-500">Recibir notificaciones de eventos importantes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notificaciones.emailAlertas}
                    onChange={(e) => handleInputChange('notificaciones', 'emailAlertas', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Reportes por Email</h4>
                    <p className="text-sm text-gray-500">Recibir reportes periódicos del sistema</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.notificaciones.emailReportes}
                    onChange={(e) => handleInputChange('notificaciones', 'emailReportes', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frecuencia de Reportes
                  </label>
                  <select
                    value={config.notificaciones.frecuenciaReportes}
                    onChange={(e) => handleInputChange('notificaciones', 'frecuenciaReportes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    <option value="diario" className="text-gray-900 bg-white">Diario</option>
                    <option value="semanal" className="text-gray-900 bg-white">Semanal</option>
                    <option value="mensual" className="text-gray-900 bg-white">Mensual</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Mantenimiento */}
          {activeTab === 'mantenimiento' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración de Mantenimiento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Días de Aviso Vencimiento
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={config.mantenimiento.diasAvisoVencimiento}
                    onChange={(e) => handleInputChange('mantenimiento', 'diasAvisoVencimiento', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                  <p className="text-sm text-gray-500 mt-1">Días antes del vencimiento para enviar aviso</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frecuencia de Reportes
                  </label>
                  <select
                    value={config.mantenimiento.frecuenciaReportes}
                    onChange={(e) => handleInputChange('mantenimiento', 'frecuenciaReportes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    <option value="semanal" className="text-gray-900 bg-white">Semanal</option>
                    <option value="mensual" className="text-gray-900 bg-white">Mensual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora Inicio Laboral
                  </label>
                  <input
                    type="time"
                    value={config.mantenimiento.horasLaborales.inicio}
                    onChange={(e) => handleInputChange('mantenimiento', 'horasLaborales', {
                      inicio: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora Fin Laboral
                  </label>
                  <input
                    type="time"
                    value={config.mantenimiento.horasLaborales.fin}
                    onChange={(e) => handleInputChange('mantenimiento', 'horasLaborales', {
                      fin: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Seguridad */}
          {activeTab === 'seguridad' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración de Seguridad</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeout de Sesión (minutos)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="480"
                    value={config.seguridad.sessionTimeout}
                    onChange={(e) => handleInputChange('seguridad', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intentos de Login
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={config.seguridad.intentosLogin}
                    onChange={(e) => handleInputChange('seguridad', 'intentosLogin', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Backup Automático</h4>
                      <p className="text-sm text-gray-500">Realizar respaldos automáticos diarios</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.seguridad.backupAutomatico}
                      onChange={(e) => handleInputChange('seguridad', 'backupAutomatico', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Backup */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Gestión de Backups</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Backup Manual</h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Crear un respaldo completo del sistema ahora
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Crear Backup
                  </button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Último Backup</h4>
                  <p className="text-sm text-green-700 mb-2">
                    21/07/2025 - 03:00 AM
                  </p>
                  <p className="text-xs text-green-600">
                    Backup automático exitoso
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}