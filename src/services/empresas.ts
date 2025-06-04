import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Empresa = Tables<'empresas'>;
export type EmpresaInsert = TablesInsert<'empresas'>;

export const empresasService = {
  // Criar nova empresa e vincular ao usuário
  async createAndLinkEmpresa(empresa: Omit<EmpresaInsert, 'id'>): Promise<Empresa> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Usuário não autenticado');

      // Primeiro, criar a empresa
      const { data: empresaData, error: empresaError } = await supabase
        .from('empresas')
        .insert(empresa)
        .select()
        .single();

      if (empresaError) {
        console.error('Erro ao criar empresa:', empresaError);
        throw empresaError;
      }

      // Depois, criar ou atualizar o registro do usuário
      const { error: userError } = await supabase
        .from('usuarios')
        .upsert({
          id: user.id,
          nome: user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário',
          email: user.email || '',
          empresa_id: empresaData.id,
          role: 'admin'
        });

      if (userError) {
        // Se falhar ao vincular usuário, deletar a empresa criada
        await supabase
          .from('empresas')
          .delete()
          .eq('id', empresaData.id);
        
        console.error('Erro ao vincular usuário:', userError);
        throw userError;
      }

      return empresaData;
    } catch (error) {
      console.error('Erro ao criar e vincular empresa:', error);
      throw error;
    }
  },

  // Buscar empresa do usuário atual
  async getEmpresaAtual(): Promise<Empresa | null> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return null;

      // Buscar diretamente da tabela de empresas usando join
      const { data, error } = await supabase
        .from('usuarios')
        .select(`
          empresa:empresas(*)
        `)
        .eq('id', user.id)
        .single();

      if (error || !data?.empresa) {
        console.error('Erro ao buscar empresa:', error);
        return null;
      }

      return data.empresa;
    } catch (error) {
      console.error('Erro ao buscar empresa atual:', error);
      return null;
    }
  }
}; 