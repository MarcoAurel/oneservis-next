'use client';

import { useState } from 'react';

interface ConfiguracionSistema {
  nombre: string;
  version: string;
  empresa: string;
  email: string;
  telefono: string;
  direccion: string;
  logoUrl: string;
  notificaciones: {
    emailAdmin: boolean;
    emailTecnicos: boolean;
    vencimientos: boolean;
    mantenimientosVencidos: boolean;
  };
  mantenimiento: {
    diasAvisoVencimiento: number;
    frecuenciaReportes: string;
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
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [config, setConfig] = useState<ConfiguracionSistema>({
    nombre: 'OneServis',
    version: '1.0.0',
    empresa: 'OneServis SPA',
    email: 'contacto@oneservis.cl',
    telefono: '+56 58 2234567',
    direccion: 'Arica, Chile',
    logoUrl: '',
    notificaciones: {
      emailAdmin: true,
      emailTecnicos: true,
      vencimientos: true,
      mantenimientosVencidos: true
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
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'notificaciones', label: 'Notificaciones', icon: '🔔' },
    { id: 'mantenimiento', label: 'Mantenimiento', icon: '🔧' },
    { id: 'seguridad', label: 'Seguridad', icon: '🔒' },
    { id: 'backup', label: 'Backup', icon: '💾' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof ConfiguracionSistema],
        [field]: value
      }
    }));
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
      alert('Error al guardar configuración');
    } finally {
      setLoading(false);
    }
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Sistema
          </label>
          <input
            type="text"
            value={config.nombre}
            onChange={(e) => setConfig(prev => ({ ...prev, nombre: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Versión
          </label>
          <input
            type="text"
            value={config.version}
            onChange={(e) => setConfig(prev => ({ ...prev, version: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Empresa
          </label>
          <input
            type="text"
            value={config.empresa}
            onChange={(e) => setConfig(prev => ({ ...prev, empresa: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email de Contacto
          </label>
          <input
            type="email"
            value={config.email}
            onChange={(e) => setConfig(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={config.telefono}
            onChange={(e) => setConfig(prev => ({ ...prev, telefono: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            value={config.direccion}
            onChange={(e) => setConfig(prev => ({ ...prev, direccion: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL del Logo
        </label>
        <input
          type="url"
          value={config.logoUrl}
          onChange={(e) => setConfig(prev => ({ ...prev, logoUrl: e.target.value }))}
          placeholder="https://ejemplo.com/logo.png"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </div>
  );

  const renderNotificacionesTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Notificaciones por Email</h4>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificaciones.emailAdmin}
              onChange={(e) => handleInputChange('notificaciones', 'emailAdmin', e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Notificar administradores por email</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificaciones.emailTecnicos}
              onChange={(e) => handleInputChange('notificaciones', 'emailTecnicos', e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Notificar técnicos por email</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificaciones.vencimientos}
              onChange={(e) => handleInputChange('notificaciones', 'vencimientos', e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Alertas de vencimientos próximos</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notificaciones.mantenimientosVencidos}
              onChange={(e) => handleInputChange('notificaciones', 'mantenimientosVencidos', e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Alertas de mantenimientos vencidos</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderMantenimientoTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Días de aviso antes del vencimiento
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={config.mantenimiento.diasAvisoVencimiento}
            onChange={(e) => handleInputChange('mantenimiento', 'diasAvisoVencimiento', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frecuencia de reportes automáticos
          </label>
          <select
            value={config.mantenimiento.frecuenciaReportes}
            onChange={(e) => handleInputChange('mantenimiento', 'frecuenciaReportes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="desactivado">Desactivado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hora de inicio laboral
          </label>
          <input
            type="time"
            value={config.mantenimiento.horasLaborales.inicio}
            onChange={(e) => handleInputChange('mantenimiento', 'horasLaborales', {
              ...config.mantenimiento.horasLaborales,
              inicio: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hora de fin laboral
          </label>
          <input
            type="time"
            value={config.mantenimiento.horasLaborales.fin}
            onChange={(e) => handleInputChange('mantenimiento', 'horasLaborales', {
              ...config.mantenimiento.horasLaborales,
              fin: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSeguridadTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiempo de sesión (minutos)
          </label>
          <input
            type="number"
            min="15"
            max="480"
            value={config.seguridad.sessionTimeout}
            onChange={(e) => handleInputChange('seguridad', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intentos de login antes de bloqueo
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={config.seguridad.intentosLogin}
            onChange={(e) => handleInputChange('seguridad', 'intentosLogin', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.seguridad.backupAutomatico}
            onChange={(e) => handleInputChange('seguridad', 'backupAutomatico', e.target.checked)}
            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="ml-2 text-sm text-gray-700">Backup automático diario</span>
        </label>
      </div>
    </div>
  );

  const renderBackupTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-blue-700">
          <strong>Backup Automático:</strong> {config.seguridad.backupAutomatico ? 'Activado' : 'Desactivado'}
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Acciones de Backup</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-left">
            <div className="text-green-600 text-2xl mb-2">💾</div>
            <div className="font-medium text-gray-900">Crear Backup Manual</div>
            <div className="text-sm text-gray-600">Generar backup inmediato de la base de datos</div>
          </button>

          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors text-left">
            <div className="text-blue-600 text-2xl mb-2">📁</div>
            <div className="font-medium text-gray-900">Ver Backups</div>
            <div className="text-sm text-gray-600">Listar y gestionar backups existentes</div>
          </button>

          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors text-left">
            <div className="text-orange-600 text-2xl mb-2">🔄</div>
            <div className="font-medium text-gray-900">Restaurar Backup</div>
            <div className="text-sm text-gray-600">Restaurar desde un backup anterior</div>
          </button>

          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left">
            <div className="text-purple-600 text-2xl mb-2">📊</div>
            <div className="font-medium text-gray-900">Exportar Datos</div>
            <div className="text-sm text-gray-600">Exportar datos en formato Excel/CSV</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab();
      case 'notificaciones': return renderNotificacionesTab();
      case 'mantenimiento': return renderMantenimientoTab();
      case 'seguridad': return renderSeguridadTab();
      case 'backup': return renderBackupTab();
      default: return renderGeneralTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Configuración del Sistema
        </h1>
        {saved && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <span>✅</span>
            <span>Configuración guardada</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Save button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Guardando...</span>
              </div>
            ) : (
              '💾 Guardar Configuración'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}