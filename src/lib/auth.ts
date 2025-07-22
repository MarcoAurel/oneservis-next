import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

// JWT utilities
export const signJWT = (payload: any, expiresIn: string = '7d') => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn })
}

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    return null
  }
}

// Password utilities
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

// Session payload type (ajustado a tu estructura)
export interface SessionPayload {
  userId: number
  email: string
  name: string
  role: 'administrador' | 'tecnico' | 'usuario'  // Tus roles reales
}

// Obtener usuario desde el token (para middleware y páginas)
export const getUserFromRequest = (request: NextRequest): SessionPayload | null => {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) return null
    
    const payload = verifyJWT(token) as SessionPayload
    return payload
  } catch (error) {
    return null
  }
}

// Verificar si usuario tiene el rol necesario
export const hasRole = (user: SessionPayload | null, allowedRoles: string[]): boolean => {
  if (!user) return false
  return allowedRoles.includes(user.role)
}