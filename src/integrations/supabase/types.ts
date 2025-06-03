export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      auditoria: {
        Row: {
          acao: string
          created_at: string | null
          dados_anteriores: Json | null
          dados_novos: Json | null
          empresa_id: string | null
          id: string
          ip_address: unknown | null
          registro_id: string
          tabela: string
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          acao: string
          created_at?: string | null
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          empresa_id?: string | null
          id?: string
          ip_address?: unknown | null
          registro_id: string
          tabela: string
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          created_at?: string | null
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          empresa_id?: string | null
          id?: string
          ip_address?: unknown | null
          registro_id?: string
          tabela?: string
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auditoria_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      candidatos: {
        Row: {
          cpf: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string
          empresa_id: string | null
          endereco: string | null
          foto_url: string | null
          id: string
          linkedin: string | null
          nome: string
          portfolio: string | null
          resumo: string | null
          senha_hash: string | null
          sobrenome: string | null
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email: string
          empresa_id?: string | null
          endereco?: string | null
          foto_url?: string | null
          id?: string
          linkedin?: string | null
          nome: string
          portfolio?: string | null
          resumo?: string | null
          senha_hash?: string | null
          sobrenome?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string
          empresa_id?: string | null
          endereco?: string | null
          foto_url?: string | null
          id?: string
          linkedin?: string | null
          nome?: string
          portfolio?: string | null
          resumo?: string | null
          senha_hash?: string | null
          sobrenome?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidatos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      candidatos_pipeline: {
        Row: {
          candidato_id: string
          created_at: string | null
          data_movimentacao: string | null
          etapa_id: string
          id: string
          observacao: string | null
          responsavel_id: string | null
          score_avaliacao: number | null
          vaga_id: string
        }
        Insert: {
          candidato_id: string
          created_at?: string | null
          data_movimentacao?: string | null
          etapa_id: string
          id?: string
          observacao?: string | null
          responsavel_id?: string | null
          score_avaliacao?: number | null
          vaga_id: string
        }
        Update: {
          candidato_id?: string
          created_at?: string | null
          data_movimentacao?: string | null
          etapa_id?: string
          id?: string
          observacao?: string | null
          responsavel_id?: string | null
          score_avaliacao?: number | null
          vaga_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidatos_pipeline_candidato_id_fkey"
            columns: ["candidato_id"]
            isOneToOne: false
            referencedRelation: "candidatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidatos_pipeline_etapa_id_fkey"
            columns: ["etapa_id"]
            isOneToOne: false
            referencedRelation: "pipeline_etapas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidatos_pipeline_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidatos_pipeline_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      departamentos: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          empresa_id: string | null
          gestor_id: string | null
          id: string
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          gestor_id?: string | null
          id?: string
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          gestor_id?: string | null
          id?: string
          nome?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departamentos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departamentos_gestor_id_fkey"
            columns: ["gestor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos_candidato: {
        Row: {
          candidato_id: string
          created_at: string | null
          id: string
          nome: string
          tamanho: number | null
          tipo: string | null
          url: string
        }
        Insert: {
          candidato_id: string
          created_at?: string | null
          id?: string
          nome: string
          tamanho?: number | null
          tipo?: string | null
          url: string
        }
        Update: {
          candidato_id?: string
          created_at?: string | null
          id?: string
          nome?: string
          tamanho?: number | null
          tipo?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_candidato_candidato_id_fkey"
            columns: ["candidato_id"]
            isOneToOne: false
            referencedRelation: "candidatos"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          ativo: boolean | null
          cnpj: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      entrevistas: {
        Row: {
          avaliacao: string | null
          candidato_id: string
          created_at: string | null
          data_hora: string
          empresa_id: string
          gestor_id: string | null
          id: string
          link_videochamada: string | null
          modo: string | null
          observacoes: string | null
          recrutador_id: string
          status: string | null
          updated_at: string | null
          vaga_id: string
        }
        Insert: {
          avaliacao?: string | null
          candidato_id: string
          created_at?: string | null
          data_hora: string
          empresa_id: string
          gestor_id?: string | null
          id?: string
          link_videochamada?: string | null
          modo?: string | null
          observacoes?: string | null
          recrutador_id: string
          status?: string | null
          updated_at?: string | null
          vaga_id: string
        }
        Update: {
          avaliacao?: string | null
          candidato_id?: string
          created_at?: string | null
          data_hora?: string
          empresa_id?: string
          gestor_id?: string | null
          id?: string
          link_videochamada?: string | null
          modo?: string | null
          observacoes?: string | null
          recrutador_id?: string
          status?: string | null
          updated_at?: string | null
          vaga_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entrevistas_candidato_id_fkey"
            columns: ["candidato_id"]
            isOneToOne: false
            referencedRelation: "candidatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrevistas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrevistas_gestor_id_fkey"
            columns: ["gestor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrevistas_recrutador_id_fkey"
            columns: ["recrutador_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrevistas_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_etapas: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: string | null
          id: string
          nome: string
          obrigatoria: boolean | null
          ordem: number
          updated_at: string | null
          vaga_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          nome: string
          obrigatoria?: boolean | null
          ordem: number
          updated_at?: string | null
          vaga_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          nome?: string
          obrigatoria?: boolean | null
          ordem?: number
          updated_at?: string | null
          vaga_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_etapas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_etapas_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      questoes_teste: {
        Row: {
          alternativas: Json | null
          created_at: string | null
          enunciado: string
          id: string
          ordem: number
          peso: number | null
          resposta_correta: string | null
          teste_id: string
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          alternativas?: Json | null
          created_at?: string | null
          enunciado: string
          id?: string
          ordem: number
          peso?: number | null
          resposta_correta?: string | null
          teste_id: string
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          alternativas?: Json | null
          created_at?: string | null
          enunciado?: string
          id?: string
          ordem?: number
          peso?: number | null
          resposta_correta?: string | null
          teste_id?: string
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questoes_teste_teste_id_fkey"
            columns: ["teste_id"]
            isOneToOne: false
            referencedRelation: "testes"
            referencedColumns: ["id"]
          },
        ]
      }
      respostas_teste: {
        Row: {
          correta: boolean | null
          created_at: string | null
          data_resposta: string | null
          id: string
          questao_id: string
          resposta_dada: string | null
          teste_aplicado_id: string
        }
        Insert: {
          correta?: boolean | null
          created_at?: string | null
          data_resposta?: string | null
          id?: string
          questao_id: string
          resposta_dada?: string | null
          teste_aplicado_id: string
        }
        Update: {
          correta?: boolean | null
          created_at?: string | null
          data_resposta?: string | null
          id?: string
          questao_id?: string
          resposta_dada?: string | null
          teste_aplicado_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "respostas_teste_questao_id_fkey"
            columns: ["questao_id"]
            isOneToOne: false
            referencedRelation: "questoes_teste"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respostas_teste_teste_aplicado_id_fkey"
            columns: ["teste_aplicado_id"]
            isOneToOne: false
            referencedRelation: "testes_aplicados"
            referencedColumns: ["id"]
          },
        ]
      }
      testes: {
        Row: {
          ativo: boolean | null
          configuracoes: Json | null
          created_at: string | null
          descricao: string | null
          empresa_id: string
          id: string
          nome: string
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          descricao?: string | null
          empresa_id: string
          id?: string
          nome: string
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string
          id?: string
          nome?: string
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      testes_aplicados: {
        Row: {
          candidato_id: string
          comentarios: string | null
          created_at: string | null
          data_aplicacao: string | null
          data_finalizacao: string | null
          id: string
          link_acesso: string | null
          score: number | null
          status: string | null
          teste_id: string
          updated_at: string | null
          vaga_id: string
        }
        Insert: {
          candidato_id: string
          comentarios?: string | null
          created_at?: string | null
          data_aplicacao?: string | null
          data_finalizacao?: string | null
          id?: string
          link_acesso?: string | null
          score?: number | null
          status?: string | null
          teste_id: string
          updated_at?: string | null
          vaga_id: string
        }
        Update: {
          candidato_id?: string
          comentarios?: string | null
          created_at?: string | null
          data_aplicacao?: string | null
          data_finalizacao?: string | null
          id?: string
          link_acesso?: string | null
          score?: number | null
          status?: string | null
          teste_id?: string
          updated_at?: string | null
          vaga_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "testes_aplicados_candidato_id_fkey"
            columns: ["candidato_id"]
            isOneToOne: false
            referencedRelation: "candidatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testes_aplicados_teste_id_fkey"
            columns: ["teste_id"]
            isOneToOne: false
            referencedRelation: "testes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testes_aplicados_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          email: string
          empresa_id: string | null
          id: string
          is_admin: boolean | null
          nome: string
          role: string | null
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          email: string
          empresa_id?: string | null
          id: string
          is_admin?: boolean | null
          nome: string
          role?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string
          empresa_id?: string | null
          id?: string
          is_admin?: boolean | null
          nome?: string
          role?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      vagas: {
        Row: {
          beneficios: string | null
          created_at: string | null
          data_abertura: string | null
          data_fechamento: string | null
          departamento_id: string | null
          descricao: string
          empresa_id: string
          gestor_id: string | null
          id: string
          local: string | null
          requisitos: string | null
          salario: string | null
          status: string | null
          tipo_contratacao: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          beneficios?: string | null
          created_at?: string | null
          data_abertura?: string | null
          data_fechamento?: string | null
          departamento_id?: string | null
          descricao: string
          empresa_id: string
          gestor_id?: string | null
          id?: string
          local?: string | null
          requisitos?: string | null
          salario?: string | null
          status?: string | null
          tipo_contratacao?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          beneficios?: string | null
          created_at?: string | null
          data_abertura?: string | null
          data_fechamento?: string | null
          departamento_id?: string | null
          descricao?: string
          empresa_id?: string
          gestor_id?: string | null
          id?: string
          local?: string | null
          requisitos?: string | null
          salario?: string | null
          status?: string | null
          tipo_contratacao?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vagas_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vagas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vagas_gestor_id_fkey"
            columns: ["gestor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
