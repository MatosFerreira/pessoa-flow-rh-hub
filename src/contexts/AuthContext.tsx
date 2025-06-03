
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

type UserProfile = Tables<'usuarios'>;
type Company = Tables<'empresas'>;

interface AuthUser extends User {
  profile?: UserProfile;
  company?: Company;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (data: RegisterData) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  companyName: string;
  role?: 'admin' | 'hr' | 'manager';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('usuarios')
        .select(`
          *,
          empresa:empresas(*)
        `)
        .eq('id', userId)
        .single();

      return profile;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  };

  // Configurar listener de autenticação
  useEffect(() => {
    // Listener para mudanças de estado de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        
        setSession(session);
        
        if (session?.user) {
          // Buscar perfil do usuário quando autenticado
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            
            setUser({
              ...session.user,
              profile: profile,
              company: profile?.empresa as Company
            });
            setIsAuthenticated(true);
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      }
    );

    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('Sessão inicial encontrada:', session);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro no login:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro no login:', error);
      return { error: 'Erro inesperado no login' };
    }
  };

  const register = async (data: RegisterData): Promise<{ error: string | null }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: data.name,
            companyName: data.companyName,
            role: data.role || 'admin'
          }
        }
      });

      if (error) {
        console.error('Erro no registro:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { error: 'Erro inesperado no registro' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated, 
      isLoading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
