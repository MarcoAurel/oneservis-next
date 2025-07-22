import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

// Usar require() para JWT para evitar problemas de tipado
const jwt = require('jsonwebtoken');

// JWT utilities - Versión con require()
export const signJWT = (payload: any, expiresIn: string = '7d'): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está configurado en las variables de entorno');
  }
  return jwt.sign(payload, secret, { expiresIn });
}

export const verifyJWT = (token: string): any => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

// Password utilities
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
}

// Session payload type (ajustado a tu estructura)
export interface SessionPayload {
  userId: number;
  email: string;
  name: string;
  role: 'administrador' | 'tecnico' | 'usuario';  // Tus roles reales
}

// Obtener usuario desde el token (para middleware y páginas)
export const getUserFromRequest = (request: NextRequest): SessionPayload | null => {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    
    const payload = verifyJWT(token);
    if (!payload || typeof payload === 'string') return null;
    
    // Verificar que el payload tiene la estructura correcta
    if (
      typeof payload === 'object' && 
      'userId' in payload && 
      'email' in payload && 
      'name' in payload && 
      'role' in payload
    ) {
      return payload as SessionPayload;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Verificar si usuario tiene el rol necesario
export const hasRole = (user: SessionPayload | null, allowedRoles: string[]): boolean => {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}