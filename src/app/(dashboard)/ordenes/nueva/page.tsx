'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormDataOrden {
  equipoCodigo: string;
  descripcion: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  tipoTrabajo: 'preventivo' | 'correctivo' | 'instalacion' | 'retiro';
  fechaVencimiento: string;
  observaciones: string;
  imagenes: File[];
}

export default function NuevaOrdenPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormDataOrden>({
    equipoCodigo: '',
    descripcion: '',
    prioridad: 'media',
    tipoTrabajo: 'correctivo',
    fechaVencimiento: '',
    observaciones: '',
    imagenes: []
  });

  // Equipos de ejemplo (en producción vendría de API)
  const equiposDisponibles = [
    'CAMA-001', 'CAMA-002', 'CAMA-003', 'CAMA-228', 'CAMA-268', 'CAMA-009',
    'MON-001', 'MON-002', 'BOMB-001', 'VENT-001', 'DEF-001'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      imagenes: [...prev.imagenes, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.equipoCodigo.trim()) {
      newErrors.equipoCodigo = 'Debe seleccionar un equipo';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    }
    if (formData.descripcion.length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateNumeroOrden = () => {
    // Generar número de orden automático
    const fecha = new Date();
    const año = fecha.getFullYear().toString().slice(-2);
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const numero = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${año}${mes}${numero}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const numeroOrden = generateNumeroOrden();
      
      // Simular creación de orden
      console.log('Creando orden:', {
        numero: numeroOrden,
        ...formData,
        fechaCreacion: new Date().toISOString(),
        estado: 'pendiente'
      });
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`¡Orden de trabajo #${numeroOrden} creada exitosamente!`);
      router.push('/ordenes');
      
    } catch (error) {
      console.error('Error al crear orden:', error);
      alert('Error al crear la orden. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Nueva Orden de Trabajo
          </h1>
          <p className="text-gray-600 mt-2">
            Crear una nueva solicitud de mantenimiento o servicio técnico
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Volver
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Información de la Solicitud</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipo a Intervenir *
              </label>
              <select
                name="equipoCodigo"
                value={formData.equipoCodigo}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 ${
                  errors.equipoCodigo ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="" className="text-gray-500">Seleccionar equipo</option>
                {equiposDisponibles.map(codigo => (
                  <option key={codigo} value={codigo} className="text-gray-900 bg-white">
                    {codigo}
                  </option>
                ))}
              </select>
              {errors.equipoCodigo && <p className="text-red-600 text-sm mt-1">{errors.equipoCodigo}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Si no encuentras el equipo, puedes registrarlo primero en la sección Equipos
              </p>
            </div>

            {/* Tipo de trabajo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Trabajo
              </label>
              <select
                name="tipoTrabajo"
                value={formData.tipoTrabajo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
              >
                <option value="correctivo" className="text-gray-900 bg-white">Mantenimiento Correctivo</option>
                <option value="preventivo" className="text-gray-900 bg-white">Mantenimiento Preventivo</option>
                <option value="instalacion" className="text-gray-900 bg-white">Instalación</option>
                <option value="retiro" className="text-gray-900 bg-white">Retiro de Equipo</option>
              </select>
            </div>

            {/* Prioridad - ESTILOS COMPLETAMENTE CORREGIDOS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridad
              </label>
              <select
                name="prioridad"
                value={formData.prioridad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
              >
                <option value="baja" className="text-gray-900 bg-white">
                  🔵 Baja - No urgente
                </option>
                <option value="media" className="text-gray-900 bg-white">
                  🟡 Media - Normal
                </option>
                <option value="alta" className="text-gray-900 bg-white">
                  🟠 Alta - Urgente
                </option>
                <option value="critica" className="text-gray-900 bg-white">
                  🔴 Crítica - Inmediata
                </option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {formData.prioridad === 'critica' && 'Atención requerida en menos de 4 horas'}
                {formData.prioridad === 'alta' && 'Atención requerida en 24 horas'}
                {formData.prioridad === 'media' && 'Atención requerida en 3-5 días'}
                {formData.prioridad === 'baja' && 'Atención requerida en 1-2 semanas'}
              </p>
            </div>

            {/* Fecha límite */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Límite (Opcional)
              </label>
              <input
                type="date"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleInputChange}
                min={today}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Descripción del Problema</h3>
          
          <div className="space-y-4">
            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Detallada *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe el problema o trabajo a realizar de manera detallada..."
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500 resize-none ${
                  errors.descripcion ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Mínimo 10 caracteres. Sea específico sobre el problema o requerimiento.
              </p>
            </div>

            {/* Observaciones adicionales */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones Adicionales
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows={3}
                placeholder="Información adicional, contexto, horarios preferidos, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Documentación (Opcional)</h3>
          
          <div className="space-y-4">
            {/* Subir imágenes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotografías del Problema
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Puedes subir múltiples imágenes para documentar el problema
              </p>
            </div>

            {/* Vista previa de imágenes */}
            {formData.imagenes.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Imágenes seleccionadas:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.imagenes.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <span className="text-2xl">📷</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Creando Orden...</span>
              </div>
            ) : (
              '📝 Crear Orden de Trabajo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}