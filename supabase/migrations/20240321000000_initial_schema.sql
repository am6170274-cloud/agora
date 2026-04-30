-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  wallet_address text unique,
  balance numeric default 0,
  updated_at timestamp with time zone default now()
);

-- Set up Row Level Security for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create projects table
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  creator_id uuid references public.profiles(id) on delete set null,
  creator_name text,
  description text,
  type text check (type in ('startup', 'music', 'art')),
  equity numeric,
  raised numeric default 0,
  goal numeric,
  image_url text,
  moderation_status text default 'pending' check (moderation_status in ('verified', 'pending', 'flagged')),
  price numeric,
  credibility_score integer default 0,
  created_at timestamp with time zone default now()
);

-- Set up Row Level Security for projects
alter table public.projects enable row level security;

create policy "Projects are viewable by everyone"
  on public.projects for select
  using ( true );

create policy "Authenticated users can create projects"
  on public.projects for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own projects"
  on public.projects for update
  using ( auth.uid() = creator_id );

-- Create audit_reports table
create table if not exists public.audit_reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  project_name text not null,
  score integer,
  status text check (status in ('Safe', 'Caution', 'High Risk')),
  created_at timestamp with time zone default now()
);

-- Set up Row Level Security for audit_reports
alter table public.audit_reports enable row level security;

create policy "Users can view their own audit reports"
  on public.audit_reports for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own audit reports"
  on public.audit_reports for insert
  with check ( auth.uid() = user_id );

-- Create wallet_logs table
create table if not exists public.wallet_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  event text not null,
  created_at timestamp with time zone default now()
);

-- Set up Row Level Security for wallet_logs
alter table public.wallet_logs enable row level security;

create policy "Users can view their own wallet logs"
  on public.wallet_logs for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own wallet logs"
  on public.wallet_logs for insert
  with check ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security充分;

-- Trigger to call handle_new_user on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed data for projects (using the mock data from the app)
insert into public.projects (id, title, creator_name, credibility_score, description, type, equity, raised, goal, image_url, moderation_status, price)
values 
  ('11111111-1111-1111-1111-111111111111', 'NeuroLink AI', 'Dr. Aris Thorne', 98, 'Next-gen neural interface for seamless AI-human collaboration. Raising seed round for clinical trials.', 'startup', 10, 450000, 1000000, 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/startup-bg-b5f109de-1777545109367.webp', 'verified', 0.5),
  ('22222222-2222-2222-2222-222222222222', 'Ethereal Echoes', 'Luna V', 92, 'Generative ambient soundscape NFT collection. AI-mastered audio files included.', 'music', null, null, null, 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/music-nft-a46695f2-1777545108613.webp', 'verified', 0.15),
  ('33333333-3333-3333-3333-333333333333', 'Quantum Flow #4', 'Koda Wright', 85, 'Looping digital masterpiece exploring the concept of time and quantum flux.', 'art', null, null, null, 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/fine-art-3b90637d-1777545108727.webp', 'verified', 2.1)
on conflict (id) do nothing;