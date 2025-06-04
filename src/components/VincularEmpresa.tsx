import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Loader2 } from 'lucide-react';
import { useCreateEmpresa } from '@/hooks/useEmpresa';

export const VincularEmpresa = () => {
  const [empresa, setEmpresa] = useState({
    nome: '',
    cnpj: ''
  });

  const createEmpresaMutation = useCreateEmpresa();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empresa.nome || !empresa.cnpj) return;

    await createEmpresaMutation.mutateAsync(empresa);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <CardTitle>Vincular Empresa</CardTitle>
          <CardDescription>
            Para começar a usar o sistema, vincule sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Empresa *</Label>
              <Input
                id="nome"
                placeholder="Ex: Minha Empresa LTDA"
                value={empresa.nome}
                onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0001-00"
                value={empresa.cnpj}
                onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createEmpresaMutation.isPending}
            >
              {createEmpresaMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Vinculando...
                </>
              ) : (
                'Vincular Empresa'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}; 