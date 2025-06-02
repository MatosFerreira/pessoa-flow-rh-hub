
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsService, JobInsert, JobUpdate } from '@/services/jobs';
import { toast } from '@/hooks/use-toast';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: jobsService.getJobs,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (job: Omit<JobInsert, 'empresa_id'>) => jobsService.createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Vaga criada com sucesso!",
        description: "A nova vaga foi criada e está disponível.",
      });
    },
    onError: (error) => {
      console.error('Erro ao criar vaga:', error);
      toast({
        title: "Erro ao criar vaga",
        description: "Ocorreu um erro ao criar a vaga. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: JobUpdate }) =>
      jobsService.updateJob(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Vaga atualizada!",
        description: "As informações da vaga foram atualizadas.",
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar vaga:', error);
      toast({
        title: "Erro ao atualizar vaga",
        description: "Ocorreu um erro ao atualizar a vaga. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobsService.deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Vaga removida!",
        description: "A vaga foi removida com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar vaga:', error);
      toast({
        title: "Erro ao remover vaga",
        description: "Ocorreu um erro ao remover a vaga. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};
