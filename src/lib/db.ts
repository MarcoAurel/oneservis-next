// Ya no necesitamos configuración MySQL directa
// Usamos API PHP como puente

// Solo mantener los tipos para TypeScript
export interface User {
  id: number
  email: string
  password_hash: string  
  full_name: string      
  role: 'administrador' | 'tecnico' | 'usuario'  
  active: boolean
  created_at: Date
  updated_at: Date
}

// Test de conexión ahora es a la API PHP
export const testConnection = async () => {
  try {
    const response = await fetch('https://oneservis.cl/api/auth/test.php')
    const data = await response.json()
    
    if (data.success) {
      console.log('✅ Conexión a API PHP exitosa')
      return true
    } else {
      console.error('❌ Error en API PHP:', data.error)
      return false
    }
  } catch (error) {
    console.error('❌ Error conectando a API PHP:', error)
    return false
  }
}