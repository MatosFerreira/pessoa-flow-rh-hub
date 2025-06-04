import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Job = Tables<'vagas'>;
export type JobInsert = TablesInsert<'vagas'>;
export type JobUpdate = TablesUpdate<'vagas'>;

export interface JobWithRelations extends Job {
  departamentos?: {
    nome: string;
  };
  gestor?: {
    nome: string;
  };
  _count?: {
    candidatos_pipeline: number;
  };
}

export const jobsService = {
  // Buscar todas as vagas da empresa do usuário
  async getJobs(): Promise<JobWithRelations[]> {
    try {
      // Buscar primeiro o perfil do usuário para obter a empresa
      const { data: userProfile, error: userError } = await supabase
        .from('usuarios')
        .select('empresa_id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (userError) {
        console.error('Erro ao buscar perfil do usuário:', userError);
        return [];
      }

      if (!userProfile?.empresa_id) {
        console.log('Usuário não tem empresa associada');
        return [];
      }

      const { data, error } = await supabase
        .from('vagas')
        .select(`
          *,
          departamentos(nome),
          gestor:usuarios!vagas_gestor_id_fkey(nome)
        `)
        .eq('empresa_id', userProfile.empresa_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar vagas:', error);
        return [];
      }

      // Para cada vaga, buscar contagem de candidatos
      const jobsWithCounts = await Promise.all(
        (data || []).map(async (job) => {
          try {
            const { count } = await supabase
              .from('candidatos_pipeline')
              .select('*', { count: 'exact', head: true })
              .eq('vaga_id', job.id);

            return {
              ...job,
              _count: {
                candidatos_pipeline: count || 0
              }
            };
          } catch (error) {
            console.error('Erro ao buscar contagem de candidatos:', error);
            return {
              ...job,
              _count: {
                candidatos_pipeline: 0
              }
            };
          }
        })
      );

      return jobsWithCounts;
    } catch (error) {
      console.error('Erro inesperado ao buscar vagas:', error);
      return [];
    }
  },

  // Criar nova vaga
  async createJob(job: Omit<JobInsert, 'empresa_id'>): Promise<Job> {
    // Buscar empresa_id do usuário atual
    const { data: userData } = await supabase
      .from('usuarios')
      .select('empresa_id')
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
      .single();

    if (!userData?.empresa_id) {
      throw new Error('Usuário não está associado a uma empresa');
    }

    const { data, error } = await supabase
      .from('vagas')
      .insert({
        ...job,
        empresa_id: userData.empresa_id
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar vaga:', error);
      throw error;
    }

    return data;
  },

  // Atualizar vaga
  async updateJob(id: string, updates: JobUpdate): Promise<Job> {
    const { data, error } = await supabase
      .from('vagas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw error;
    }

    return data;
  },

  // Deletar vaga
  async deleteJob(id: string): Promise<void> {
    const { error } = await supabase
      .from('vagas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar vaga:', error);
      throw error;
    }
  },

  // Buscar vaga por ID
  async getJobById(id: string): Promise<JobWithRelations | null> {
    const { data, error } = await supabase
      .from('vagas')
      .select(`
        *,
        departamentos(nome),
        gestor:usuarios!vagas_gestor_id_fkey(nome)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar vaga:', error);
      return null;
    }

    return data;
  }
};
