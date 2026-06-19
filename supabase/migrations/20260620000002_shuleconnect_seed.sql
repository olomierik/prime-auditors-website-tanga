-- ============================================================
-- ShuleConnect Demo Seed — Elohim Education Centre, Tanga
-- ============================================================

-- Seed school
insert into public.schools (
  id, name, slug, country, locale, address, phone, email,
  student_teacher_messaging, status, billing_status
) values (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Elohim Education Centre',
  'elohim-tanga',
  'TZ', 'sw',
  'Tanga, Tanzania',
  '+255 000 000 000',
  'admin@elohim.ac.tz',
  true, 'active', 'trial'
) on conflict (id) do nothing;

-- Seed allowed message pairs
select public.seed_allowed_message_pairs('a1b2c3d4-0000-0000-0000-000000000001');

-- Add student-teacher pair (enabled by school toggle)
insert into public.allowed_message_pairs (school_id, from_role, to_role) values
  ('a1b2c3d4-0000-0000-0000-000000000001', 'student', 'teacher'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'teacher', 'student')
on conflict do nothing;

-- Classes
insert into public.classes (id, school_id, name, grade_level, term, academic_year) values
  ('c0000001-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Form 1 A', 'Form 1', 'Term 2', '2026'),
  ('c0000002-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Form 2 B', 'Form 2', 'Term 2', '2026'),
  ('c0000003-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Standard 5', 'Standard 5', 'Term 2', '2026')
on conflict do nothing;

-- Sample calendar events
insert into public.calendar_events (
  school_id, author_id, title, event_type, start_at, end_at, all_day, description
) select
  'a1b2c3d4-0000-0000-0000-000000000001',
  p.id,
  'Term 2 Exams Begin',
  'exam',
  '2026-08-10 08:00:00+03',
  '2026-08-15 17:00:00+03',
  false,
  'Mid-term examinations for all classes'
from public.profiles p
where p.school_id = 'a1b2c3d4-0000-0000-0000-000000000001'
  and p.role = 'school_admin'
limit 1;

insert into public.calendar_events (
  school_id, author_id, title, event_type, start_at, all_day, description
) select
  'a1b2c3d4-0000-0000-0000-000000000001',
  p.id,
  'Eid al-Adha Holiday',
  'holiday',
  '2026-06-26 00:00:00+03',
  true,
  'Public holiday — school closed'
from public.profiles p
where p.school_id = 'a1b2c3d4-0000-0000-0000-000000000001'
  and p.role = 'school_admin'
limit 1;
