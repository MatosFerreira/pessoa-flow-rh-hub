
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Department = Tables<'departamentos'>;

export const departmentsService = {
  // Buscar todos os departamentos da empresa
  async getDepartments(): Promise<Department[]> {
    // Buscar primeiro o perfil do usuário para obter a empresa
    const { data: userProfile } = await supabase
      .from('usuarios')
      .select('empresa_id')
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
      .single();

    if (!userProfile?.empresa_id) {
      console.log('Usuário não tem empresa associada');
      return [];
    }

    const { data, error } = await supabase
      .from('departamentos')
      .select('*')
      .eq('empresa_id', userProfile.empresa_id)
      .eq('ativo', true)
      .order('nome');

    if (error) {
      console.error('Erro ao buscar departamentos:', error);
      throw error;
    }

    return data || [];
  }
};
