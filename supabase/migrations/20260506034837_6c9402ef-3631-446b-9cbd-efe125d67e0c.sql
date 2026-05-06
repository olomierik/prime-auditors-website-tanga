
-- Roles enum + table
create type public.app_role as enum ('admin', 'investor');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  country text,
  created_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  unique (user_id, role)
);

create table public.investor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  full_name text not null,
  email text not null,
  phone text,
  country text,
  sector text,
  investment_size text,
  business_description text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.application_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid references public.investor_applications(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_size bigint,
  mime_type text,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_user_id uuid not null references auth.users(id) on delete cascade, -- the investor's user_id (groups conversation)
  sender_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);
create index on public.messages (conversation_user_id, created_at);

-- Security definer function for roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.investor_applications enable row level security;
alter table public.application_files enable row level security;
alter table public.messages enable row level security;

-- profiles policies
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins view all profiles" on public.profiles for select using (public.has_role(auth.uid(), 'admin'));
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- user_roles policies
create policy "Users view own roles" on public.user_roles for select using (auth.uid() = user_id);
create policy "Admins view all roles" on public.user_roles for select using (public.has_role(auth.uid(), 'admin'));

-- investor_applications policies
create policy "Users view own application" on public.investor_applications for select using (auth.uid() = user_id);
create policy "Admins view all applications" on public.investor_applications for select using (public.has_role(auth.uid(), 'admin'));
create policy "Users insert own application" on public.investor_applications for insert with check (auth.uid() = user_id);
create policy "Users update own application" on public.investor_applications for update using (auth.uid() = user_id);
create policy "Admins update applications" on public.investor_applications for update using (public.has_role(auth.uid(), 'admin'));

-- application_files policies
create policy "Users view own files" on public.application_files for select using (auth.uid() = user_id);
create policy "Admins view all files" on public.application_files for select using (public.has_role(auth.uid(), 'admin'));
create policy "Users insert own files" on public.application_files for insert with check (auth.uid() = user_id);
create policy "Users delete own files" on public.application_files for delete using (auth.uid() = user_id);

-- messages policies
create policy "Investor sees own conversation" on public.messages for select using (auth.uid() = conversation_user_id);
create policy "Admins see all messages" on public.messages for select using (public.has_role(auth.uid(), 'admin'));
create policy "Users send in own conversation" on public.messages for insert with check (
  auth.uid() = sender_id and (auth.uid() = conversation_user_id or public.has_role(auth.uid(), 'admin'))
);

-- Trigger: auto-create profile + assign role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''));

  if new.email = 'info@primeauditors.co.tz' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'investor') on conflict do nothing;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger app_updated before update on public.investor_applications
for each row execute function public.set_updated_at();

-- Realtime
alter publication supabase_realtime add table public.messages;

-- Storage bucket (private)
insert into storage.buckets (id, name, public) values ('investor-files', 'investor-files', false)
on conflict (id) do nothing;

create policy "Users upload to own folder" on storage.objects
for insert with check (bucket_id = 'investor-files' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users read own files" on storage.objects
for select using (bucket_id = 'investor-files' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Admins read all investor files" on storage.objects
for select using (bucket_id = 'investor-files' and public.has_role(auth.uid(), 'admin'));

create policy "Users delete own files storage" on storage.objects
for delete using (bucket_id = 'investor-files' and auth.uid()::text = (storage.foldername(name))[1]);
