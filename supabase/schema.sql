-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- 1. PROFILES (User accounts - synced with Clerk)
CREATE TABLE IF NOT EXISTS public.profiles (
  id text PRIMARY KEY, -- Matches Clerk User ID
  email text,
  user_type text NOT NULL DEFAULT 'end_user' CHECK (user_type IN ('creator', 'end_user')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);

-- 2. TEAMS (Workspaces for collaboration)
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  application_id uuid, -- Will reference apps table (added later to avoid circular dependency)
  created_by text REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_teams_app_id ON public.teams(application_id);

-- 3. TEAM MEMBERS (User-Team relationships)
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id text REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON public.team_members(user_id);

-- 4. FOLDERS (File system organization)
CREATE TABLE IF NOT EXISTS public.folders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  application_id uuid, -- Will reference apps table
  parent_id uuid REFERENCES public.folders(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_folders_team ON public.folders(team_id);
CREATE INDEX IF NOT EXISTS idx_folders_app_id ON public.folders(application_id);

-- 5. MESSAGES (Team collaboration)
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  application_id uuid, -- Will reference apps table
  user_id text REFERENCES public.profiles(id) ON DELETE SET NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_team ON public.messages(team_id);
CREATE INDEX IF NOT EXISTS idx_messages_app_id ON public.messages(application_id);

-- ============================================================================
-- APPLICATION TABLES
-- ============================================================================

-- 6. APPS (Micro-SaaS applications created by Creators)
CREATE TABLE IF NOT EXISTS public.apps (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  config jsonb NOT NULL DEFAULT '{}'::jsonb, -- The Builder Output (Resources, Fields, Flows)
  created_by text REFERENCES public.profiles(id) ON DELETE SET NULL,
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_apps_created_by ON public.apps(created_by);
CREATE INDEX IF NOT EXISTS idx_apps_published ON public.apps(published);

-- Now add foreign key constraints for application_id columns
ALTER TABLE public.teams ADD CONSTRAINT fk_teams_application 
  FOREIGN KEY (application_id) REFERENCES public.apps(id) ON DELETE CASCADE;

ALTER TABLE public.folders ADD CONSTRAINT fk_folders_application 
  FOREIGN KEY (application_id) REFERENCES public.apps(id) ON DELETE CASCADE;

ALTER TABLE public.messages ADD CONSTRAINT fk_messages_application 
  FOREIGN KEY (application_id) REFERENCES public.apps(id) ON DELETE CASCADE;

-- 7. RECORDS (Dynamic data instances for each app)
CREATE TABLE IF NOT EXISTS public.records (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  app_id uuid REFERENCES public.apps(id) ON DELETE CASCADE NOT NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  folder_id uuid REFERENCES public.folders(id) ON DELETE SET NULL,
  resource_name text NOT NULL, -- e.g., "file", "task", "invoice"
  data jsonb NOT NULL DEFAULT '{}'::jsonb, -- The actual data
  created_by text REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_records_app ON public.records(app_id);
CREATE INDEX IF NOT EXISTS idx_records_team ON public.records(team_id);
CREATE INDEX IF NOT EXISTS idx_records_resource ON public.records(resource_name);

-- ============================================================================
-- MONETIZATION TABLES (Phase 1)
-- ============================================================================

-- 8. CREATOR SUBSCRIPTIONS (Platform-level subscriptions for Creators)
CREATE TABLE IF NOT EXISTS public.creator_subscriptions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id text REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan text NOT NULL DEFAULT 'FREE' CHECK (plan IN ('FREE', 'PRO', 'ENTERPRISE')),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end timestamp with time zone,
  max_apps integer NOT NULL DEFAULT 1,
  features jsonb DEFAULT '{"premium_nodes": false, "custom_branding": false}'::jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_creator_subs_creator ON public.creator_subscriptions(creator_id);
CREATE INDEX IF NOT EXISTS idx_creator_subs_status ON public.creator_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_creator_subs_plan ON public.creator_subscriptions(plan);

-- 9. END-USER SUBSCRIPTIONS (App-level subscriptions for End-Users)
CREATE TABLE IF NOT EXISTS public.end_user_subscriptions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id uuid REFERENCES public.apps(id) ON DELETE CASCADE NOT NULL,
  end_user_id text REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan text NOT NULL,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'trialing', 'past_due')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(application_id, end_user_id)
);

CREATE INDEX IF NOT EXISTS idx_end_user_subs_app ON public.end_user_subscriptions(application_id);
CREATE INDEX IF NOT EXISTS idx_end_user_subs_user ON public.end_user_subscriptions(end_user_id);
CREATE INDEX IF NOT EXISTS idx_end_user_subs_status ON public.end_user_subscriptions(status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.end_user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Development Mode: Allow all access (Replace with proper policies in production)
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.profiles FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.teams FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.team_members FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.folders FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.messages FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.apps FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.records FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.creator_subscriptions FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.end_user_subscriptions FOR ALL USING (true);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apps_updated_at BEFORE UPDATE ON public.apps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_records_updated_at BEFORE UPDATE ON public.records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creator_subs_updated_at BEFORE UPDATE ON public.creator_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_end_user_subs_updated_at BEFORE UPDATE ON public.end_user_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. NOTIFICATIONS (In-app alerts)
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  app_id uuid REFERENCES public.apps(id) ON DELETE CASCADE NOT NULL,
  user_id text REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_app ON public.notifications(app_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Allow all access" ON public.notifications FOR ALL USING (true);
