
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Building, Save } from 'lucide-react';

interface CompanyData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}

const CompanySetup = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>({
    nome: user?.company?.nome || '',
    email: user?.company?.email || '',
    telefone: user?.company?.telefone || '',
    endereco: user?.company?.endereco || '',
    cnpj: user?.company?.cnpj || ''
  });

  const handleSave = async () => {
    if (!user?.company?.id) {
      toast({
        title: "Erro",
        description: "Empresa não encontrada",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('empresas')
        .update({
          nome: companyData.nome,
          email: companyData.email,
          telefone: companyData.telefone,
          endereco: companyData.endereco,
          cnpj: companyData.cnpj,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.company.id);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Dados da empresa atualizados com sucesso"
      });
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar dados da empresa",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Configurações da Empresa</span>
        </CardTitle>
        <CardDescription>
          Configure as informações básicas da sua empresa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Empresa</Label>
            <Input
              id="nome"
              value={companyData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Nome da empresa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              value={companyData.cnpj}
              onChange={(e) => handleInputChange('cnpj', e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={companyData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contato@empresa.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={companyData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              placeholder="(11) 9999-9999"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Textarea
            id="endereco"
            value={companyData.endereco}
            onChange={(e) => handleInputChange('endereco', e.target.value)}
            placeholder="Endereço completo da empresa"
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySetup;
