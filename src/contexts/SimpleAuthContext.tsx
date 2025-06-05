
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
  id: string;
  username: string;
  nome: string;
  email: string;
  role: 'admin' | 'manager' | 'hr' | 'employee';
  empresa_id?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ error: string | null }>;
  logout: () => void;
  hasPermission: (requiredRole: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SimpleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há usuário logado no localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<{ error: string | null }> => {
    try {
      // Modo dev - permitir login sem senha apenas selecionando usuário
      const isDev = import.meta.env.VITE_DEV_MODE === 'true';
      
      if (isDev && password === 'dev') {
        // Em modo dev, buscar usuário apenas pelo username
        const { data, error } = await supabase
          .from('auth_usuarios')
          .select('*')
          .eq('username', username)
          .eq('ativo', true)
          .single();

        if (error || !data) {
          return { error: 'Usuário não encontrado no modo dev' };
        }

        const userData = {
          id: data.id,
          username: data.username,
          nome: data.nome,
          email: data.email,
          role: data.role as 'admin' | 'manager' | 'hr' | 'employee',
          empresa_id: data.empresa_id
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        return { error: null };
      }

      // Autenticação normal usando a função do banco
      const { data, error } = await supabase.rpc('authenticate_user', {
        input_username: username,
        input_password: password
      });

      if (error) {
        console.error('Erro na autenticação:', error);
        return { error: 'Erro no servidor de autenticação' };
      }

      if (!data?.success) {
        return { error: data?.message || 'Credenciais inválidas' };
      }

      const userData = {
        id: data.user.id,
        username: data.user.username,
        nome: data.user.nome,
        email: data.user.email,
        role: data.user.role as 'admin' | 'manager' | 'hr' | 'employee',
        empresa_id: data.user.empresa_id
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return { error: null };

    } catch (error) {
      console.error('Erro no login:', error);
      return { error: 'Erro inesperado no login' };
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  const hasPermission = (requiredRoles: string[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSimpleAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuth deve ser usado dentro de um SimpleAuthProvider');
  }
  return context;
};
