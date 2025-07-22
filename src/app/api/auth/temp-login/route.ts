import { NextRequest, NextResponse } from 'next/server'
import { signJWT, SessionPayload } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('🔍 Temp login attempt:', { email, passwordLength: password?.length })

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Llamar a tu API PHP temporal
    console.log('📡 Calling TEMP PHP API...')
    
    const phpResponse = await fetch('https://oneservis.cl/api/auth/temp-login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    console.log('📡 Temp PHP Response status:', phpResponse.status)
    
    const phpData = await phpResponse.json()
    console.log('📡 Temp PHP Response data:', phpData)

    if (!phpResponse.ok || !phpData.success) {
      console.log('❌ Temp login failed:', phpData.error)
      return NextResponse.json(
        { error: phpData.error || 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    const user = phpData.user
    console.log('✅ Temp login successful for user:', user.email)

    // Crear session payload
    const sessionPayload: SessionPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    // Generar JWT
    const token = signJWT(sessionPayload, '7d')

    // Determinar redirección según rol
    let redirectTo = '/general' // default
    if (user.role === 'administrador') {
      redirectTo = '/admin'
    } else if (user.role === 'tecnico') {
      redirectTo = '/tecnico'
    } else {
      redirectTo = '/general'
    }

    console.log('🔄 Redirecting to:', redirectTo)

    // Crear response con cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      redirectTo,
      note: 'USANDO LOGIN TEMPORAL'
    })

    // Establecer cookie con el token
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    })

    return response

  } catch (error) {
    console.error('💥 Error en temp login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}