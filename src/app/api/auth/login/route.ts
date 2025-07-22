import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Llamar a API PHP en BlueHost para autenticación
    const response = await fetch('https://oneservis.cl/api/auth/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const userData = await response.json();

    // Crear JWT con datos completos del usuario
    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        rol: userData.rol,
        nombre: userData.nombre,
        apellido: userData.apellido,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Estructura de usuario completa (viene de PHP)
    const user = {
      id: userData.id,
      email: userData.email,
      nombre: userData.nombre || 'Usuario',
      apellido: userData.apellido || '',
      rol: userData.rol,
      institucion: userData.institucion || 'OneServis',
    };

    return NextResponse.json({
      success: true,
      token,
      user,
      message: 'Login exitoso'
    });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}