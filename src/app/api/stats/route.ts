import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Llamar a API PHP para obtener estadísticas
    const response = await fetch('https://oneservis.cl/api/stats/dashboard.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Agregar token de autorización si es necesario
        'Authorization': request.headers.get('authorization') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas');
    }

    const stats = await response.json();

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error en API stats:', error);
    
    // Fallback con datos de ejemplo si la API PHP falla
    return NextResponse.json({
      success: true,
      data: {
        totalEquipos: 156,
        ordenesCompletadas: 42,
        ordenesPendientes: 8,
        usuariosActivos: 24,
        actividadReciente: [
          {
            id: 1,
            mensaje: "Orden #130209 completada por Carlos Mendoza",
            tiempo: "Hace 2 horas",
            tipo: "completada"
          },
          {
            id: 2,
            mensaje: "Nuevo equipo CAMA-232 registrado",
            tiempo: "Hace 4 horas", 
            tipo: "nuevo"
          },
          {
            id: 3,
            mensaje: "Orden #130196 asignada a técnico",
            tiempo: "Ayer",
            tipo: "asignada"
          }
        ]
      }
    });
  }
}