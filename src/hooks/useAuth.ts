'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Tipos para el usuario
interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'administrador' | 'tecnico' | 'usuario';
  institucion?: string;
}

// Tipos para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// Crear el contexto con un nombre diferente para evitar conflictos
const UserAuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider del contexto de autenticación
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        // Guardar en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Actualizar estado
        setToken(data.token);
        setUser(data.user);
        
        return true;
      } else {
        console.error('Login failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Limpiar estado
    setToken(null);
    setUser(null);
    
    // Opcional: llamar a API de logout
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
    
    // Redirigir al login
    window.location.href = '/login';
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return React.createElement(
    UserAuthContext.Provider,
    { value: contextValue },
    children
  );
}

// Hook personalizado para usar el contexto
export function useAuth(): AuthContextType {
  const context = useContext(UserAuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Hook para verificar si el usuario está autenticado
export function useRequireAuth() {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);
  
  return { user, loading };
}

// Hook para verificar roles
export function useRequireRole(allowedRoles: string[]) {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        window.location.href = '/login';
        return;
      }
      
      if (!allowedRoles.includes(user.rol)) {
        // Redirigir según rol
        const defaultRoutes = {
          'administrador': '/admin',
          'tecnico': '/tecnico',
          'usuario': '/general'
        };
        
        const redirectTo = defaultRoutes[user.rol as keyof typeof defaultRoutes] || '/general';
        window.location.href = redirectTo;
      }
    }
  }, [user, loading, allowedRoles]);
  
  return { user, loading };
}