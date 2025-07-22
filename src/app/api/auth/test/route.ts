import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🧪 Testing connection to PHP API...')
    
    // Primero probar un test simple sin BD
    const simpleResponse = await fetch('https://oneservis.cl/api/auth/simple-test.php', {
      method: 'GET',
      headers: {
        'User-Agent': 'NextJS-Test'
      }
    })
    
    console.log('📡 Simple test response status:', simpleResponse.status)
    
    const simpleData = await simpleResponse.json()
    console.log('📡 Simple test data:', simpleData)
    
    return NextResponse.json({
      success: true,
      message: 'Test desde Next.js → PHP',
      phpResponse: simpleData,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('💥 Error en test:', error)
    return NextResponse.json({
      success: false,
      error: 'Error en test de conexión',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}