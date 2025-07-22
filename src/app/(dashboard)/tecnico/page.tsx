export default function TecnicoDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Técnico
        </h1>
        <div className="text-sm text-gray-500">
          Órdenes de Trabajo Asignadas
        </div>
      </div>

      {/* Mis órdenes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">5</div>
            <div className="text-sm text-gray-500">Órdenes Pendientes</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-500">Completadas Este Mes</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-500">En Progreso</div>
          </div>
        </div>
      </div>

      {/* Órdenes asignadas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Órdenes Asignadas
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">#130209 - CAMA-228</div>
                <div className="text-sm text-gray-500">Reparar cama eléctrica</div>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Pendiente
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">#130196 - CAMA-009</div>
                <div className="text-sm text-gray-500">Cable cortado de la cama</div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                En Progreso
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}