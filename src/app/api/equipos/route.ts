import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Obtener parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado');
    const tipo = searchParams.get('tipo');
    const institucion = searchParams.get('institucion');
    const search = searchParams.get('search');

    // Llamar a API PHP para obtener equipos
    const response = await fetch('https://oneservis.cl/api/equipos/list.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify({
        filters: {
          estado,
          tipo,
          institucion,
          search
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener equipos');
    }

    const equipos = await response.json();

    return NextResponse.json({
      success: true,
      data: equipos
    });

  } catch (error) {
    console.error('Error en API equipos:', error);
    
    // Fallback con datos de ejemplo
    return NextResponse.json({
      success: true,
      data: [
        {
          id: 1,
          codigo: 'CAMA-228',
          tipo: 'Cama Eléctrica',
          marca: 'Hill Rom',
          modelo: 'P750',
          serie: 'SR90XA0740',
          estado: 'activo',
          institucion: 'Hospital Dr. Juan Noé Crevani',
          ubicacion: 'Pabellón 2',
          fecha_ingreso: '2024-01-15',
          ultimo_mantenimiento: '2025-01-15'
        },
        {
          id: 2,
          codigo: 'CAMA-268',
          tipo: 'Cama Eléctrica',
          marca: 'Kaneway',
          modelo: 'S/M',
          serie: 'KW2017474',
          estado: 'mantenimiento',
          institucion: 'Hospital Dr. Juan Noé Crevani',
          ubicacion: 'Bodega',
          fecha_ingreso: '2024-02-01',
          ultimo_mantenimiento: '2024-12-20'
        },
        {
          id: 3,
          codigo: 'MON-034',
          tipo: 'Monitor',
          marca: 'Philips',
          modelo: 'MX800',
          serie: 'PH2025001',
          estado: 'activo',
          institucion: 'UNO Salud Dental Arica',
          ubicacion: 'Consulta 3',
          fecha_ingreso: '2024-03-10',
          ultimo_mantenimiento: '2025-01-10'
        }
      ]
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const equipoData = await request.json();

    // Validaciones básicas
    if (!equipoData.codigo || !equipoData.tipo || !equipoData.marca) {
      return NextResponse.json(
        { error: 'Campos obligatorios faltantes' },
        { status: 400 }
      );
    }

    // Llamar a API PHP para crear equipo
    const response = await fetch('https://oneservis.cl/api/equipos/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify(equipoData),
    });

    if (!response.ok) {
      throw new Error('Error al crear equipo');
    }

    const resultado = await response.json();

    return NextResponse.json({
      success: true,
      data: resultado,
      message: 'Equipo creado exitosamente'
    });

  } catch (error) {
    console.error('Error al crear equipo:', error);
    
    // Simular creación exitosa para demo
    return NextResponse.json({
      success: true,
      data: {
        id: Date.now(),
        ...await request.json(),
        created_at: new Date().toISOString()
      },
      message: 'Equipo creado exitosamente (demo)'
    });
  }
}