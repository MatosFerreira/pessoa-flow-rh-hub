
import React, { useState, useEffect } from 'react';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Loader2, ArrowLeft, AlertCircle, Code } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SimpleLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devMode, setDevMode] = useState(false);
  const { login, isAuthenticated } = useSimpleAuth();
  const navigate = useNavigate();

  // Verificar se está em modo dev
  useEffect(() => {
    const isDev = import.meta.env.VITE_DEV_MODE === 'true';
    setDevMode(isDev);
  }, []);

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

    try {
      const loginPassword = devMode && password === '' ? 'dev' : password;
      const { error } = await login(username, loginPassword);
      
      if (error) {
        setError(error);
        toast({
          title: "Erro no login",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à Plataforma Pessoas",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      setError(errorMessage);
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testUsers = [
    { username: 'admin', role: 'Administrador', access: 'Acesso total' },
    { username: 'gestor', role: 'Gestor', access: 'Gestão e relatórios' },
    { username: 'rh', role: 'RH', access: 'Recrutamento e seleção' },
    { username: 'colaborador', role: 'Colaborador', access: 'Portal do colaborador' }
  ];

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
              Sistema Simplificado
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Login simplificado com controle de permissões por perfil.
              Use as credenciais de teste para explorar diferentes níveis de acesso.
            </p>
          </div>

          {/* Test Users Info */}
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Usuários de Teste</h3>
            <div className="space-y-3">
              {testUsers.map((user) => (
                <div key={user.username} className="bg-white/10 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{user.username}</p>
                      <p className="text-sm text-white/80">{user.role}</p>
                    </div>
                    <p className="text-xs text-white/70">{user.access}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/80 mt-4">Senha: <span className="font-mono bg-white/20 px-2 py-1 rounded">1234</span></p>
            {devMode && (
              <div className="flex items-center mt-3 text-yellow-200">
                <Code className="h-4 w-4 mr-2" />
                <p className="text-sm">Modo Dev: Login sem senha ativo</p>
              </div>
            )}
          </div>
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
                Login Simplificado
              </CardTitle>
              <CardDescription className="text-gray-600">
                {devMode ? 'Modo desenvolvedor ativo' : 'Faça login com suas credenciais'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {devMode && (
                <Alert>
                  <Code className="h-4 w-4" />
                  <AlertDescription>
                    Modo dev: Selecione um usuário e deixe a senha em branco para login automático
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    {devMode ? 'Usuário' : 'Nome de usuário'}
                  </Label>
                  {devMode ? (
                    <Select value={username} onValueChange={setUsername}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione um usuário de teste" />
                      </SelectTrigger>
                      <SelectContent>
                        {testUsers.map((user) => (
                          <SelectItem key={user.username} value={user.username}>
                            {user.username} - {user.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="username"
                      type="text"
                      placeholder="Digite seu usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                      required
                    />
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Senha {devMode && '(opcional em modo dev)'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={devMode ? "Deixe em branco para modo dev ou use 1234" : "Digite sua senha"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                    required={!devMode}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={isLoading || (!username || (!password && !devMode))}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Entrar
                </Button>
              </form>

              {!devMode && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Usuários de teste disponíveis:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {testUsers.map((user) => (
                        <div key={user.username} className="bg-gray-50 p-2 rounded">
                          <p className="font-medium">{user.username}</p>
                          <p className="text-gray-500">{user.role}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Senha para todos: 1234</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
