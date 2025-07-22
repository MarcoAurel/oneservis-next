'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  codigo: string;
  tipo: string;
  marca: string;
  modelo: string;
  serie: string;
  ubicacion: string;
  institucion: string;
  estado: 'activo' | 'mantenimiento' | 'fuera_servicio';
  observaciones: string;
}

export default function NuevoEquipoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    tipo: '',
    marca: '',
    modelo: '',
    serie: '',
    ubicacion: '',
    institucion: '',
    estado: 'activo',
    observaciones: ''
  });

  const tiposEquipo = [
    'Cama Eléctrica',
    'Monitor de Signos Vitales',
    'Bomba de Infusión',
    'Ventilador Mecánico',
    'Desfibrilador',
    'Electrocardiografo',
    'Oxímetro',
    'Compresor',
    'Aspirador',
    'Lámpara Quirúrgica',
    'Mesa Quirúrgica',
    'Incubadora',
    'Otro'
  ];

  const instituciones = [
    'Hospital Dr. Juan Noé Crevani',
    'Hospital de Yumbel',
    'UNO Salud Dental Arica',
    'Clínica San Carlos',
    'Centro Médico Integrado',
    'Otra'
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

  const generateCodigo = () => {
    if (formData.tipo) {
      // Generar código basado en el tipo de equipo
      const prefijos = {
        'Cama Eléctrica': 'CAMA',
        'Monitor de Signos Vitales': 'MON',
        'Bomba de Infusión': 'BOMB',
        'Ventilador Mecánico': 'VENT',
        'Desfibrilador': 'DEF',
        'Electrocardiografo': 'ECG',
        'Oxímetro': 'OXI',
        'Compresor': 'COMP',
        'Aspirador': 'ASP',
        'Lámpara Quirúrgica': 'LAMP',
        'Mesa Quirúrgica': 'MESA',
        'Incubadora': 'INCU'
      };
      
      const prefijo = prefijos[formData.tipo as keyof typeof prefijos] || 'EQ';
      const numero = Math.floor(Math.random() * 900) + 100; // Número aleatorio de 3 dígitos
      
      setFormData(prev => ({
        ...prev,
        codigo: `${prefijo}-${numero}`
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio';
    }
    if (!formData.tipo.trim()) {
      newErrors.tipo = 'El tipo de equipo es obligatorio';
    }
    if (!formData.marca.trim()) {
      newErrors.marca = 'La marca es obligatoria';
    }
    if (!formData.institucion.trim()) {
      newErrors.institucion = 'La institución es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular envío a API
      console.log('Creando equipo:', formData);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la llamada real a la API
      // const response = await fetch('/api/equipos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      alert('¡Equipo creado exitosamente!');
      router.push('/equipos');
      
    } catch (error) {
      console.error('Error al crear equipo:', error);
      alert('Error al crear el equipo. Intenta nuevamente.');
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
            Registrar Nuevo Equipo
          </h1>
          <p className="text-gray-600 mt-2">
            Completa la información del equipo médico a registrar
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
          <h3 className="text-lg font-medium text-gray-900 mb-6">Información Básica</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Código del equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código del Equipo *
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  placeholder="Ej: CAMA-001"
                  className={`flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.codigo ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={generateCodigo}
                  className="px-3 py-2 bg-orange-600 text-white rounded-r-lg hover:bg-orange-700 transition-colors"
                  disabled={!formData.tipo}
                >
                  🎲
                </button>
              </div>
              {errors.codigo && <p className="text-red-600 text-sm mt-1">{errors.codigo}</p>}
            </div>

            {/* Tipo de equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Equipo *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.tipo ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar tipo</option>
                {tiposEquipo.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {errors.tipo && <p className="text-red-600 text-sm mt-1">{errors.tipo}</p>}
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca *
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                placeholder="Ej: Hill Rom, Philips, GE"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.marca ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.marca && <p className="text-red-600 text-sm mt-1">{errors.marca}</p>}
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                placeholder="Ej: P750, Monitor X200"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Número de serie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Serie
              </label>
              <input
                type="text"
                name="serie"
                value={formData.serie}
                onChange={handleInputChange}
                placeholder="Ej: SN123456789"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado Inicial
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="activo">Activo</option>
                <option value="mantenimiento">En Mantenimiento</option>
                <option value="fuera_servicio">Fuera de Servicio</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Ubicación</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institución */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institución *
              </label>
              <select
                name="institucion"
                value={formData.institucion}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.institucion ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar institución</option>
                {instituciones.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
              {errors.institucion && <p className="text-red-600 text-sm mt-1">{errors.institucion}</p>}
            </div>

            {/* Ubicación específica */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación Específica
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                placeholder="Ej: Sala 15, Pabellón 2, UCI"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Observaciones</h3>
          
          <div>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              rows={4}
              placeholder="Información adicional, características especiales, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Guardando...</span>
              </div>
            ) : (
              '💾 Registrar Equipo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}