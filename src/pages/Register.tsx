import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

const Register = () => {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('invite');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    role: 'admin' as 'admin' | 'hr' | 'manager' | 'employee'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteData, setInviteData] = useState<any>(null);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Verificar convite se token estiver presente
  useEffect(() => {
    if (inviteToken) {
      checkInvite();
    }
  }, [inviteToken]);

  const checkInvite = async () => {
    try {
      const { data, error } = await supabase
        .from('convites_usuarios')
        .select('*, empresas(nome)')
        .eq('token', inviteToken)
        .eq('usado', false)
        .gt('data_expiracao', new Date().toISOString())
        .single();

      if (error || !data) {
        setError('Convite inválido ou expirado');
        return;
      }

      setInviteData(data);
      setFormData(prev => ({
        ...prev,
        name: data.nome,
        email: data.email,
        role: data.role as 'admin' | 'hr' | 'manager' | 'employee',
        companyName: data.empresas?.nome || ''
      }));
    } catch (error) {
      console.error('Erro ao verificar convite:', error);
      setError('Erro ao verificar convite');
    }
  };

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    if (!inviteToken && !formData.companyName) {
      setError('Nome da empresa é obrigatório');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        role: formData.role,
        inviteToken: inviteToken || undefined
      });
      
      if (error) {
        setError(error);
        toast({
          title: "Erro no registro",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registro realizado com sucesso!",
          description: inviteToken ? "Bem-vindo à equipe!" : "Verifique seu e-mail para confirmar a conta.",
        });
        navigate('/login');
      }
    } catch (error) {
      const errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      setError(errorMessage);
      toast({
        title: "Erro no registro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Plataforma</h1>
              <p className="text-xl text-white/90 font-medium">Pessoas</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Comece a transformar o RH da sua empresa hoje
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Crie sua conta e descubra como nossa plataforma pode revolucionar 
              seus processos de recrutamento e gestão de pessoas.
            </p>
          </div>
        </div>
        
        {/* Illustration */}
        <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Equipe colaborativa trabalhando em gestão de RH"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Plataforma</h1>
                <p className="text-lg text-primary font-medium">Pessoas</p>
              </div>
            </div>
          </div>

          {/* Back to landing */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {inviteToken ? 'Aceitar Convite' : 'Crie sua conta'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {inviteToken ? `Você foi convidado para fazer parte de ${inviteData?.empresas?.nome}` : 'Preencha os dados para começar'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                    disabled={!!inviteToken}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                    disabled={!!inviteToken}
                    required
                  />
                </div>

                {!inviteToken && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-700 font-medium">Nome da empresa</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Nome da sua empresa"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                      required
                    />
                  </div>
                )}

                {!inviteToken && (
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-700 font-medium">Seu papel</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-primary rounded-xl">
                        <SelectValue placeholder="Selecione seu papel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="hr">RH</SelectItem>
                        <SelectItem value="manager">Gestor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {inviteToken ? 'Aceitar Convite' : 'Criar conta'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
