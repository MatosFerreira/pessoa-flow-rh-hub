import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { empresasService } from '@/services/empresas';
import { toast } from '@/hooks/use-toast';

export const useEmpresa = () => {
  return useQuery({
    queryKey: ['empresa'],
    queryFn: empresasService.getEmpresaAtual,
  });
};

export const useCreateEmpresa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: empresasService.createAndLinkEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresa'] });
      toast({
        title: "Empresa criada com sucesso!",
        description: "Sua empresa foi criada e vinculada à sua conta.",
      });
    },
    onError: (error) => {
      console.error('Erro ao criar empresa:', error);
      toast({
        title: "Erro ao criar empresa",
        description: "Ocorreu um erro ao criar a empresa. Tente novamente.",
        variant: "destructive",
      });
    },
  });
}; 