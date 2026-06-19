-- ============================================================
-- ShuleConnect MVP Schema
-- Multi-tenant school network — closed, child-safe, GDPR-K
-- ============================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- SCHOOLS (tenants)
-- ============================================================
create table if not exists public.schools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  country text not null default 'TZ',
  locale text not null default 'sw',
  address text,
  phone text,
  email text,
  logo_url text,
  -- Policy toggles
  student_teacher_messaging boolean not null default false,
  student_classmate_channels boolean not null default false,
  -- Status
  status text not null default 'active' check (status in ('active','suspended','trial')),
  billing_status text not null default 'trial' check (billing_status in ('trial','active','past_due','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  role text not null check (role in ('super_admin','school_admin','teacher','parent','student')),
  full_name text not null,
  phone text,
  avatar_url text,
  language_pref text not null default 'en' check (language_pref in ('en','sw')),
  status text not null default 'active' check (status in ('active','inactive','pending_consent','suspended')),
  mfa_enabled boolean not null default false,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_school_role on public.profiles(school_id, role);
create index idx_profiles_school_status on public.profiles(school_id, status);

-- ============================================================
-- STUDENTS
-- ============================================================
create table if not exists public.students (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  admission_number text,
  date_of_birth date,
  enrollment_status text not null default 'active' check (enrollment_status in ('active','graduated','withdrawn','suspended')),
  enrollment_start date not null default current_date,
  enrollment_end date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(school_id, admission_number)
);

create index idx_students_school on public.students(school_id);

-- ============================================================
-- GUARDIANS
-- ============================================================
create table if not exists public.guardians (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  relationship text not null default 'parent' check (relationship in ('parent','guardian','other')),
  created_at timestamptz not null default now()
);

-- Student ↔ Guardian link
create table if not exists public.student_guardians (
  student_id uuid not null references public.students(id) on delete cascade,
  guardian_id uuid not null references public.guardians(id) on delete cascade,
  is_primary boolean not null default false,
  primary key (student_id, guardian_id)
);

create index idx_student_guardians_guardian on public.student_guardians(guardian_id);

-- ============================================================
-- PARENTAL CONSENT (immutable append-only)
-- ============================================================
create table if not exists public.parental_consents (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id) on delete cascade,
  guardian_id uuid not null references public.guardians(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  scope text not null default 'full_access',
  version integer not null default 1,
  granted_at timestamptz,
  revoked_at timestamptz,
  grant_method text not null default 'digital_otp' check (grant_method in ('digital_otp','paper_scan','admin_manual')),
  ip_address inet,
  user_agent text,
  notes text,
  created_at timestamptz not null default now()
);

create index idx_consents_student on public.parental_consents(student_id);
create index idx_consents_guardian on public.parental_consents(guardian_id);
create index idx_consents_school on public.parental_consents(school_id);

-- ============================================================
-- CLASSES
-- ============================================================
create table if not exists public.classes (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  name text not null,
  grade_level text,
  term text,
  academic_year text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_classes_school on public.classes(school_id);

-- Teachers assigned to classes
create table if not exists public.class_teachers (
  class_id uuid not null references public.classes(id) on delete cascade,
  teacher_profile_id uuid not null references public.profiles(id) on delete cascade,
  is_primary boolean not null default false,
  primary key (class_id, teacher_profile_id)
);

-- Student enrollments in classes
create table if not exists public.enrollments (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','completed','withdrawn')),
  unique(student_id, class_id)
);

create index idx_enrollments_class on public.enrollments(class_id);
create index idx_enrollments_student on public.enrollments(student_id);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
create table if not exists public.announcements (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,  -- null = school-wide
  author_id uuid not null references public.profiles(id),
  title text not null,
  body text not null,
  pinned boolean not null default false,
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_announcements_school on public.announcements(school_id, published_at desc);
create index idx_announcements_class on public.announcements(class_id, published_at desc);

-- ============================================================
-- ASSIGNMENTS
-- ============================================================
create table if not exists public.assignments (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id),
  title text not null,
  description text,
  due_date timestamptz,
  max_score numeric(5,2),
  allow_late_submission boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_assignments_class on public.assignments(class_id, due_date);
create index idx_assignments_school on public.assignments(school_id);

-- Assignment attachments
create table if not exists public.assignment_attachments (
  id uuid primary key default uuid_generate_v4(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  file_size integer,
  mime_type text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- SUBMISSIONS
-- ============================================================
create table if not exists public.submissions (
  id uuid primary key default uuid_generate_v4(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  body text,
  submitted_at timestamptz not null default now(),
  is_late boolean not null default false,
  score numeric(5,2),
  feedback text,
  graded_at timestamptz,
  graded_by uuid references public.profiles(id),
  status text not null default 'submitted' check (status in ('draft','submitted','graded','returned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(assignment_id, student_id)
);

create index idx_submissions_assignment on public.submissions(assignment_id);
create index idx_submissions_student on public.submissions(student_id);

create table if not exists public.submission_attachments (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  file_size integer,
  mime_type text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ATTENDANCE
-- ============================================================
create table if not exists public.attendance (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id),
  date date not null,
  status text not null check (status in ('present','absent','late','excused')),
  notes text,
  created_at timestamptz not null default now(),
  unique(class_id, student_id, date)
);

create index idx_attendance_class_date on public.attendance(class_id, date);
create index idx_attendance_student on public.attendance(student_id, date);
create index idx_attendance_school on public.attendance(school_id, date);

-- ============================================================
-- CALENDAR EVENTS
-- ============================================================
create table if not exists public.calendar_events (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  author_id uuid not null references public.profiles(id),
  title text not null,
  description text,
  event_type text not null default 'event' check (event_type in ('event','exam','holiday','deadline','meeting')),
  start_at timestamptz not null,
  end_at timestamptz,
  all_day boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_calendar_school on public.calendar_events(school_id, start_at);

-- ============================================================
-- CONVERSATIONS & MESSAGES (scoped, firewall-enforced)
-- ============================================================
create table if not exists public.conversations (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  conversation_type text not null default 'direct' check (conversation_type in ('direct','group')),
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  joined_at timestamptz not null default now(),
  last_read_at timestamptz,
  primary key (conversation_id, profile_id)
);

create index idx_conv_participants_profile on public.conversation_participants(profile_id);

create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null,
  attachment_url text,
  attachment_name text,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_messages_conversation on public.messages(conversation_id, created_at desc);

-- Communication allow-list (server-side firewall)
-- Defines which role pairs can message each other
create table if not exists public.allowed_message_pairs (
  school_id uuid not null references public.schools(id) on delete cascade,
  from_role text not null,
  to_role text not null,
  enabled boolean not null default true,
  primary key (school_id, from_role, to_role)
);

-- ============================================================
-- AUDIT LOG (append-only, no updates/deletes)
-- ============================================================
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references public.schools(id),
  actor_id uuid references public.profiles(id),
  actor_role text,
  action text not null,
  resource_type text,
  resource_id uuid,
  metadata jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index idx_audit_school on public.audit_logs(school_id, created_at desc);
create index idx_audit_actor on public.audit_logs(actor_id, created_at desc);

-- Prevent any updates or deletes on audit_logs
create or replace rule audit_no_update as on update to public.audit_logs do instead nothing;
create or replace rule audit_no_delete as on delete to public.audit_logs do instead nothing;

-- ============================================================
-- MODERATION CASES
-- ============================================================
create table if not exists public.moderation_cases (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  reporter_id uuid references public.profiles(id),
  resource_type text not null,
  resource_id uuid not null,
  reason text,
  status text not null default 'open' check (status in ('open','under_review','resolved','escalated')),
  reviewer_id uuid references public.profiles(id),
  resolution text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_moderation_school on public.moderation_cases(school_id, status);

-- ============================================================
-- INVITE TOKENS (no public sign-up — invite-only)
-- ============================================================
create table if not exists public.invite_tokens (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  email text,
  phone text,
  role text not null,
  intended_profile_data jsonb,
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  expires_at timestamptz not null default (now() + interval '7 days'),
  used_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create index idx_invites_token on public.invite_tokens(token);
create index idx_invites_school on public.invite_tokens(school_id);

-- ============================================================
-- SEED: Default allowed message pairs for new schools
-- (applied per-school via function)
-- ============================================================
create or replace function public.seed_allowed_message_pairs(p_school_id uuid)
returns void language plpgsql as $$
begin
  insert into public.allowed_message_pairs (school_id, from_role, to_role) values
    (p_school_id, 'teacher', 'parent'),
    (p_school_id, 'parent', 'teacher'),
    (p_school_id, 'school_admin', 'teacher'),
    (p_school_id, 'teacher', 'school_admin'),
    (p_school_id, 'school_admin', 'parent'),
    (p_school_id, 'parent', 'school_admin')
  on conflict do nothing;
end;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.guardians enable row level security;
alter table public.student_guardians enable row level security;
alter table public.parental_consents enable row level security;
alter table public.classes enable row level security;
alter table public.class_teachers enable row level security;
alter table public.enrollments enable row level security;
alter table public.announcements enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.attendance enable row level security;
alter table public.calendar_events enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.audit_logs enable row level security;
alter table public.moderation_cases enable row level security;
alter table public.invite_tokens enable row level security;

-- Helper: get current user's school_id
create or replace function public.my_school_id()
returns uuid language sql stable as $$
  select school_id from public.profiles where id = auth.uid()
$$;

-- Helper: get current user's role
create or replace function public.my_role()
returns text language sql stable as $$
  select role from public.profiles where id = auth.uid()
$$;

-- PROFILES: users see only their own tenant
create policy "profiles_tenant_isolation" on public.profiles
  for all using (school_id = public.my_school_id());

-- SCHOOLS: users see only their school
create policy "schools_tenant_isolation" on public.schools
  for select using (id = public.my_school_id());

-- STUDENTS: scoped to school
create policy "students_tenant" on public.students
  for all using (school_id = public.my_school_id());

-- GUARDIANS: scoped to school
create policy "guardians_tenant" on public.guardians
  for all using (school_id = public.my_school_id());

-- PARENTAL CONSENTS: scoped to school
create policy "consents_tenant" on public.parental_consents
  for all using (school_id = public.my_school_id());

-- CLASSES: scoped to school
create policy "classes_tenant" on public.classes
  for all using (school_id = public.my_school_id());

-- ANNOUNCEMENTS: scoped to school
create policy "announcements_tenant" on public.announcements
  for all using (school_id = public.my_school_id());

-- ASSIGNMENTS: scoped to school
create policy "assignments_tenant" on public.assignments
  for all using (school_id = public.my_school_id());

-- SUBMISSIONS: scoped to school
create policy "submissions_tenant" on public.submissions
  for all using (school_id = public.my_school_id());

-- ATTENDANCE: scoped to school
create policy "attendance_tenant" on public.attendance
  for all using (school_id = public.my_school_id());

-- CALENDAR: scoped to school
create policy "calendar_tenant" on public.calendar_events
  for all using (school_id = public.my_school_id());

-- CONVERSATIONS: scoped to school
create policy "conversations_tenant" on public.conversations
  for all using (school_id = public.my_school_id());

-- CONVERSATION PARTICIPANTS: only participants can see
create policy "conv_participants_own" on public.conversation_participants
  for all using (school_id = public.my_school_id() and profile_id = auth.uid());

-- MESSAGES: only conversation participants can read
create policy "messages_participants_only" on public.messages
  for select using (
    school_id = public.my_school_id() and
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.profile_id = auth.uid()
    )
  );

create policy "messages_send" on public.messages
  for insert with check (
    school_id = public.my_school_id() and
    sender_id = auth.uid()
  );

-- AUDIT LOGS: admins of same school only
create policy "audit_admin_only" on public.audit_logs
  for select using (
    school_id = public.my_school_id() and
    public.my_role() in ('school_admin','super_admin')
  );

create policy "audit_insert_any" on public.audit_logs
  for insert with check (school_id = public.my_school_id());

-- MODERATION: admins only
create policy "moderation_admin" on public.moderation_cases
  for all using (
    school_id = public.my_school_id() and
    public.my_role() in ('school_admin','super_admin')
  );

create policy "moderation_report" on public.moderation_cases
  for insert with check (school_id = public.my_school_id());

-- INVITES: admins only
create policy "invites_admin" on public.invite_tokens
  for all using (
    school_id = public.my_school_id() and
    public.my_role() in ('school_admin','super_admin')
  );

-- ============================================================
-- UPDATED_AT trigger helper
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_schools before update on public.schools for each row execute function public.set_updated_at();
create trigger set_updated_at_profiles before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_updated_at_classes before update on public.classes for each row execute function public.set_updated_at();
create trigger set_updated_at_announcements before update on public.announcements for each row execute function public.set_updated_at();
create trigger set_updated_at_assignments before update on public.assignments for each row execute function public.set_updated_at();
create trigger set_updated_at_submissions before update on public.submissions for each row execute function public.set_updated_at();
create trigger set_updated_at_conversations before update on public.conversations for each row execute function public.set_updated_at();
