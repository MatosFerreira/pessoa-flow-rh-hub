-- Criar função handle_updated_at se não existir
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Criar tabela jobs se não existir
do $$ 
declare
  v_exists boolean;
begin
  select exists (
    select from pg_tables 
    where schemaname = 'public' 
    and tablename = 'jobs'
  ) into v_exists;

  if not v_exists then
    -- Criar tabela
    create table public.jobs (
      id uuid default gen_random_uuid() primary key,
      title text not null,
      description text not null,
      requirements text[] not null,
      location text not null,
      salary text not null,
      benefits text[] not null,
      contract_type text not null,
      open_date timestamp with time zone not null default now(),
      close_date timestamp with time zone,
      status text not null default 'open'::text,
      department text not null,
      company text not null,
      created_at timestamp with time zone default now(),
      updated_at timestamp with time zone default now()
    );

    -- Criar índices
    create index jobs_status_idx on public.jobs(status);
    create index jobs_company_idx on public.jobs(company);
    create index jobs_department_idx on public.jobs(department);

    -- Habilitar RLS
    alter table public.jobs enable row level security;

    -- Criar políticas
    create policy "Permitir leitura pública"
      on public.jobs for select
      using (true);

    create policy "Permitir inserção para usuários autenticados"
      on public.jobs for insert
      with check (auth.role() = 'authenticated');

    create policy "Permitir atualização para usuários autenticados"
      on public.jobs for update
      using (auth.role() = 'authenticated');

    create policy "Permitir exclusão para usuários autenticados"
      on public.jobs for delete
      using (auth.role() = 'authenticated');

    -- Criar trigger
    create trigger handle_jobs_updated_at
      before update on public.jobs
      for each row
      execute function public.handle_updated_at();
  end if;
end $$; 