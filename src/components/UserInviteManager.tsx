
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Users, Mail, Clock, CheckCircle } from 'lucide-react';

interface Invite {
  id: string;
  email: string;
  nome: string;
  role: string;
  usado: boolean;
  data_expiracao: string;
  created_at: string;
}

const UserInviteManager = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [newInvite, setNewInvite] = useState({
    email: '',
    nome: '',
    role: 'employee'
  });

  const loadInvites = async () => {
    if (!user?.company?.id) return;

    try {
      const { data, error } = await supabase
        .from('convites_usuarios')
        .select('*')
        .eq('empresa_id', user.company.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvites(data || []);
    } catch (error) {
      console.error('Erro ao carregar convites:', error);
    }
  };

  useEffect(() => {
    loadInvites();
  }, [user?.company?.id]);

  const sendInvite = async () => {
    if (!user?.company?.id || !newInvite.email || !newInvite.nome) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Gerar token único
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('generate_invite_token');

      if (tokenError) throw tokenError;

      // Criar convite
      const { error } = await supabase
        .from('convites_usuarios')
        .insert({
          empresa_id: user.company.id,
          email: newInvite.email,
          nome: newInvite.nome,
          role: newInvite.role,
          token: tokenData,
          criado_por: user.id
        });

      if (error) throw error;

      // Criar link de convite
      const inviteLink = `${window.location.origin}/register?invite=${tokenData}`;
      
      // Por enquanto, vamos apenas mostrar o link (futuramente enviar por email)
      toast({
        title: "Convite criado!",
        description: `Link de convite: ${inviteLink}`,
        duration: 10000
      });

      setNewInvite({ email: '', nome: '', role: 'employee' });
      loadInvites();
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar convite",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'hr': return 'RH';
      case 'manager': return 'Gestor';
      case 'employee': return 'Colaborador';
      default: return role;
    }
  };

  const getStatusBadge = (invite: Invite) => {
    if (invite.usado) {
      return <Badge className="bg-green-100 text-green-800">Usado</Badge>;
    }
    
    const isExpired = new Date(invite.data_expiracao) < new Date();
    if (isExpired) {
      return <Badge variant="destructive">Expirado</Badge>;
    }
    
    return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Formulário de Convite */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Convidar Novo Usuário</span>
          </CardTitle>
          <CardDescription>
            Envie um convite para um novo membro da equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={newInvite.nome}
                onChange={(e) => setNewInvite({...newInvite, nome: e.target.value})}
                placeholder="Nome do usuário"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={newInvite.email}
                onChange={(e) => setNewInvite({...newInvite, email: e.target.value})}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Perfil</Label>
              <Select value={newInvite.role} onValueChange={(value) => setNewInvite({...newInvite, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Colaborador</SelectItem>
                  <SelectItem value="hr">RH</SelectItem>
                  <SelectItem value="manager">Gestor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={sendInvite} disabled={isLoading}>
              <Mail className="h-4 w-4 mr-2" />
              {isLoading ? 'Enviando...' : 'Enviar Convite'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Convites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Convites Enviados</span>
          </CardTitle>
          <CardDescription>
            Acompanhe o status dos convites enviados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invites.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum convite enviado ainda</p>
          ) : (
            <div className="space-y-4">
              {invites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">
                        {invite.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{invite.nome}</h4>
                      <p className="text-sm text-gray-600">{invite.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">
                      {getRoleLabel(invite.role)}
                    </Badge>
                    {getStatusBadge(invite)}
                    <div className="text-xs text-gray-500">
                      {invite.usado ? (
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Aceito
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Expira em {new Date(invite.data_expiracao).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInviteManager;
