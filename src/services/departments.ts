
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Department = Tables<'departamentos'>;

export const departmentsService = {
  // Buscar todos os departamentos da empresa
  async getDepartments(): Promise<Department[]> {
    const { data, error } = await supabase
      .from('departamentos')
      .select('*')
      .eq('ativo', true)
      .order('nome');

    if (error) {
      console.error('Erro ao buscar departamentos:', error);
      throw error;
    }

    return data || [];
  }
};
