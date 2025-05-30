
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon,
  Users,
  Bell,
  Palette,
  Shield,
  Building,
  Save,
  Plus,
  Trash2,
  Edit,
  UserPlus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Configurações da empresa
  const [companySettings, setCompanySettings] = useState({
    name: user?.companyName || 'Empresa Demo',
    description: 'Empresa de tecnologia focada em soluções inovadoras',
    website: 'https://www.empresa.com',
    phone: '(11) 3000-0000',
    address: 'Av. Paulista, 1000 - São Paulo, SP'
  });

  // Configurações de notificação
  const [notificationSettings, setNotificationSettings] = useState({
    emailCandidateApplication: true,
    emailInterviewReminder: true,
    emailStatusChange: false,
    pushNotifications: true,
    weeklyReport: true
  });

  // Etapas do pipeline
  const [pipelineStages, setPipelineStages] = useState([
    { id: '1', name: 'Triagem', color: 'blue', active: true },
    { id: '2', name: 'Entrevista', color: 'yellow', active: true },
    { id: '3', name: 'Teste Técnico', color: 'orange', active: true },
    { id: '4', name: 'Proposta', color: 'purple', active: true },
    { id: '5', name: 'Contratado', color: 'green', active: true }
  ]);

  // Usuários da empresa
  const [users, setUsers] = useState([
    { id: '1', name: 'Admin Sistema', email: 'admin@demo.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Maria RH', email: 'maria@demo.com', role: 'hr', status: 'active' },
    { id: '3', name: 'João Gestor', email: 'joao@demo.com', role: 'manager', status: 'active' }
  ]);

  const [newStage, setNewStage] = useState({ name: '', color: 'blue' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'hr' });

  const handleSaveCompanySettings = async () => {
    setIsLoading(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Configurações salvas!",
      description: "As configurações da empresa foram atualizadas com sucesso",
    });
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Notificações atualizadas!",
      description: "Suas preferências de notificação foram salvas",
    });
  };

  const addPipelineStage = () => {
    if (!newStage.name.trim()) return;
    
    const stage = {
      id: Date.now().toString(),
      name: newStage.name,
      color: newStage.color,
      active: true
    };
    
    setPipelineStages([...pipelineStages, stage]);
    setNewStage({ name: '', color: 'blue' });
    
    toast({
      title: "Etapa adicionada!",
      description: `A etapa "${stage.name}" foi criada`,
    });
  };

  const removePipelineStage = (stageId: string) => {
    setPipelineStages(pipelineStages.filter(stage => stage.id !== stageId));
    toast({
      title: "Etapa removida",
      description: "A etapa foi removida do pipeline",
    });
  };

  const addUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    
    const user = {
      id: Date.now().toString(),
      ...newUser,
      status: 'active'
    };
    
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'hr' });
    
    toast({
      title: "Usuário adicionado!",
      description: `${user.name} foi convidado para a plataforma`,
    });
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'hr': return 'RH';
      case 'manager': return 'Gestor';
      default: return 'Colaborador';
    }
  };

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      orange: 'bg-orange-100 text-orange-800',
      purple: 'bg-purple-100 text-purple-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações da sua empresa e da plataforma</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Pipeline</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* Configurações da Empresa */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Configure os dados básicos da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={companySettings.description}
                  onChange={(e) => setCompanySettings({...companySettings, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveCompanySettings} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestão de Usuários */}
        <TabsContent value="users">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários da Empresa</CardTitle>
                <CardDescription>
                  Gerencie os usuários que têm acesso à plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">
                          {getRoleLabel(user.role)}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          Ativo
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Convidar Novo Usuário</CardTitle>
                <CardDescription>
                  Adicione um novo membro à sua equipe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Nome</Label>
                    <Input
                      id="userName"
                      placeholder="Nome completo"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">E-mail</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="email@empresa.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userRole">Perfil</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">RH</SelectItem>
                        <SelectItem value="manager">Gestor</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={addUser}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Convidar Usuário
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configurações do Pipeline */}
        <TabsContent value="pipeline">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Etapas do Pipeline</CardTitle>
                <CardDescription>
                  Personalize as etapas do seu processo seletivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineStages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-500">
                          {index + 1}
                        </span>
                        <Badge className={getColorClass(stage.color)}>
                          {stage.name}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={stage.active} />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removePipelineStage(stage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adicionar Nova Etapa</CardTitle>
                <CardDescription>
                  Crie uma nova etapa para o seu pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="stageName">Nome da Etapa</Label>
                    <Input
                      id="stageName"
                      placeholder="Ex: Entrevista Final"
                      value={newStage.name}
                      onChange={(e) => setNewStage({...newStage, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stageColor">Cor</Label>
                    <Select value={newStage.color} onValueChange={(value) => setNewStage({...newStage, color: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Azul</SelectItem>
                        <SelectItem value="yellow">Amarelo</SelectItem>
                        <SelectItem value="orange">Laranja</SelectItem>
                        <SelectItem value="purple">Roxo</SelectItem>
                        <SelectItem value="green">Verde</SelectItem>
                        <SelectItem value="red">Vermelho</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={addPipelineStage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Etapa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configurações de Notificação */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure quando e como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Nova candidatura recebida</h4>
                    <p className="text-sm text-gray-600">Receba um e-mail quando alguém se candidatar</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailCandidateApplication}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailCandidateApplication: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Lembrete de entrevista</h4>
                    <p className="text-sm text-gray-600">Receba lembretes antes das entrevistas agendadas</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailInterviewReminder}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailInterviewReminder: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Mudança de status</h4>
                    <p className="text-sm text-gray-600">Notificações quando candidatos mudam de etapa</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailStatusChange}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailStatusChange: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Notificações push</h4>
                    <p className="text-sm text-gray-600">Receba notificações em tempo real no navegador</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, pushNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Relatório semanal</h4>
                    <p className="text-sm text-gray-600">Resumo semanal das atividades de RH</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, weeklyReport: checked})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Segurança */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Gerencie as configurações de segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Alterar Senha</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <Input type="password" placeholder="Senha atual" />
                      <Input type="password" placeholder="Nova senha" />
                      <Input type="password" placeholder="Confirmar nova senha" />
                    </div>
                    <Button className="mt-2" variant="outline">
                      Atualizar Senha
                    </Button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">Autenticação de dois fatores</h4>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                    </div>
                    <Button variant="outline">
                      Configurar 2FA
                    </Button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">Sessões ativas</h4>
                      <p className="text-sm text-gray-600">Gerencie onde você está conectado</p>
                    </div>
                    <Button variant="outline">
                      Ver Sessões
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conformidade</CardTitle>
                <CardDescription>
                  Configurações relacionadas à LGPD e privacidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Log de auditoria</h4>
                      <p className="text-sm text-gray-600">Registrar todas as ações dos usuários</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Retenção de dados</h4>
                      <p className="text-sm text-gray-600">Excluir dados automaticamente após período definido</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Consentimento LGPD</h4>
                      <p className="text-sm text-gray-600">Solicitar consentimento aos candidatos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
