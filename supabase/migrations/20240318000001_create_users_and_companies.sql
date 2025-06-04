-- Criar tabelas e configurações para empresas e usuários
do $$
declare
  v_empresas_exists boolean;
  v_usuarios_exists boolean;
begin
  -- Verificar existência das tabelas
  select exists (
    select from pg_tables 
    where schemaname = 'public' 
    and tablename = 'empresas'
  ) into v_empresas_exists;

  select exists (
    select from pg_tables 
    where schemaname = 'public' 
    and tablename = 'usuarios'
  ) into v_usuarios_exists;

  -- Criar tabela de empresas
  if not v_empresas_exists then
    create table public.empresas (
      id uuid default gen_random_uuid() primary key,
      nome text not null,
      cnpj text unique,
      created_at timestamp with time zone default now(),
      updated_at timestamp with time zone default now()
    );

    -- Habilitar RLS
    alter table public.empresas enable row level security;

    -- Criar trigger para updated_at
    create trigger handle_empresas_updated_at
      before update on public.empresas
      for each row
      execute function public.handle_updated_at();

    -- Criar políticas de acesso para empresas
    create policy "Permitir leitura para usuários autenticados"
      on public.empresas for select
      using (auth.role() = 'authenticated');

    create policy "Permitir inserção para usuários autenticados"
      on public.empresas for insert
      with check (auth.role() = 'authenticated');

    create policy "Permitir atualização para administradores da empresa"
      on public.empresas for update
      using (
        auth.role() = 'authenticated' and
        exists (
          select 1 from public.usuarios
          where usuarios.id = auth.uid()
          and usuarios.empresa_id = id
          and usuarios.role = 'admin'
        )
      );
  end if;

  -- Criar tabela de usuários
  if not v_usuarios_exists then
    create table public.usuarios (
      id uuid references auth.users on delete cascade primary key,
      nome text,
      email text unique,
      empresa_id uuid references public.empresas(id),
      role text not null default 'user',
      created_at timestamp with time zone default now(),
      updated_at timestamp with time zone default now()
    );

    -- Criar índices
    create index usuarios_empresa_id_idx on public.usuarios(empresa_id);
    create index usuarios_email_idx on public.usuarios(email);

    -- Habilitar RLS
    alter table public.usuarios enable row level security;

    -- Criar trigger para updated_at
    create trigger handle_usuarios_updated_at
      before update on public.usuarios
      for each row
      execute function public.handle_updated_at();

    -- Criar políticas de acesso para usuários
    create policy "Usuários podem ver e editar seus próprios dados"
      on public.usuarios
      for all
      using (auth.uid() = id);

    create policy "Administradores podem ver usuários da mesma empresa"
      on public.usuarios
      for select
      using (
        exists (
          select 1 from public.usuarios self
          where self.id = auth.uid()
          and self.empresa_id = usuarios.empresa_id
          and self.role = 'admin'
        )
      );
  end if;
end $$; 