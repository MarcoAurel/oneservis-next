export default function GeneralDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard General
        </h1>
        <div className="text-sm text-gray-500">
          OneServis - Sistema de Gestión
        </div>
      </div>

      {/* Mis solicitudes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-500">Solicitudes Activas</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-500">Resueltas Este Mes</div>
          </div>
        </div>
      </div>

      {/* Crear nueva solicitud */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Nueva Solicitud de Servicio
        </h3>
        <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
          + Crear Solicitud
        </button>
      </div>

      {/* Mis solicitudes recientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Mis Solicitudes
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Solicitud #001</div>
                <div className="text-sm text-gray-500">Problema con equipo CAMA-066</div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                En Revisión
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Solicitud #002</div>
                <div className="text-sm text-gray-500">Mantenimiento preventivo</div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Completada
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}