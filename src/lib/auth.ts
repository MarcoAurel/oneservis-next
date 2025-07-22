/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

// Importar jwt usando require para evitar problemas de tipos
const jwt = require('jsonwebtoken');

// Tipos específicos para JWT
interface JWTPayload {
  [key: string]: string | number | boolean | undefined;
  userId?: number;
  email?: string;
  name?: string;
  role?: string;
}

// JWT utilities con tipado flexible
export const signJWT = (payload: JWTPayload | Record<string, unknown>, expiresIn: string = '7d'): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está configurado en las variables de entorno');
  }
  
  try {
    // Type assertion para evitar problemas de compilación
    return jwt.sign(payload, secret, { expiresIn }) as string;
  } catch (error) {
    console.error('Error signing JWT:', error);
    throw new Error('Error al crear token JWT');
  }
}

export const verifyJWT = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }
    
    // Type assertion para el resultado
    const decoded = jwt.verify(token, secret) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}

// Password utilities con tipos explícitos
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
}

// Session payload type que extiende JWTPayload para compatibilidad
export interface SessionPayload extends JWTPayload {
  userId: number;
  email: string;
  name: string;
  role: 'administrador' | 'tecnico' | 'usuario';
}

// Función helper para validar estructura del payload
const isValidSessionPayload = (payload: JWTPayload | null): payload is SessionPayload => {
  if (!payload) return false;
  
  return (
    typeof payload.userId === 'number' &&
    typeof payload.email === 'string' &&
    typeof payload.name === 'string' &&
    typeof payload.role === 'string' &&
    ['administrador', 'tecnico', 'usuario'].includes(payload.role as string)
  );
}

// Obtener usuario desde el token (para middleware y páginas)
export const getUserFromRequest = (request: NextRequest): SessionPayload | null => {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    
    const payload = verifyJWT(token);
    if (!payload) return null;
    
    // Usar función helper para validación de tipos
    if (isValidSessionPayload(payload)) {
      return payload;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
}

// Verificar si usuario tiene el rol necesario
export const hasRole = (user: SessionPayload | null, allowedRoles: string[]): boolean => {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}