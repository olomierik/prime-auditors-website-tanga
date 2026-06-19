export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'parent' | 'student';
export type UserStatus = 'active' | 'inactive' | 'pending_consent' | 'suspended';
export type Language = 'en' | 'sw';

export interface School {
  id: string;
  name: string;
  slug: string;
  country: string;
  locale: string;
  address?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  student_teacher_messaging: boolean;
  student_classmate_channels: boolean;
  status: 'active' | 'suspended' | 'trial';
  billing_status: 'trial' | 'active' | 'past_due' | 'cancelled';
  created_at: string;
}

export interface Profile {
  id: string;
  school_id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  language_pref: Language;
  status: UserStatus;
  mfa_enabled: boolean;
  last_seen_at?: string;
  created_at: string;
}

export interface Student {
  id: string;
  profile_id: string;
  school_id: string;
  admission_number?: string;
  date_of_birth?: string;
  enrollment_status: 'active' | 'graduated' | 'withdrawn' | 'suspended';
  enrollment_start: string;
  enrollment_end?: string;
  profile?: Profile;
}

export interface Guardian {
  id: string;
  profile_id: string;
  school_id: string;
  relationship: 'parent' | 'guardian' | 'other';
  profile?: Profile;
}

export interface ParentalConsent {
  id: string;
  student_id: string;
  guardian_id: string;
  school_id: string;
  scope: string;
  version: number;
  granted_at?: string;
  revoked_at?: string;
  grant_method: string;
  created_at: string;
}

export interface Class {
  id: string;
  school_id: string;
  name: string;
  grade_level?: string;
  term?: string;
  academic_year: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  class_id: string;
  school_id: string;
  enrolled_at: string;
  status: 'active' | 'completed' | 'withdrawn';
  student?: Student;
  class?: Class;
}

export interface Announcement {
  id: string;
  school_id: string;
  class_id?: string;
  author_id: string;
  title: string;
  body: string;
  pinned: boolean;
  published_at: string;
  expires_at?: string;
  author?: Profile;
  class?: Class;
}

export interface Assignment {
  id: string;
  school_id: string;
  class_id: string;
  teacher_id: string;
  title: string;
  description?: string;
  due_date?: string;
  max_score?: number;
  allow_late_submission: boolean;
  created_at: string;
  class?: Class;
  teacher?: Profile;
  submission?: Submission;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  school_id: string;
  body?: string;
  submitted_at: string;
  is_late: boolean;
  score?: number;
  feedback?: string;
  graded_at?: string;
  status: 'draft' | 'submitted' | 'graded' | 'returned';
  student?: Student;
}

export interface AttendanceRecord {
  id: string;
  school_id: string;
  class_id: string;
  student_id: string;
  teacher_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  student?: Student;
}

export interface CalendarEvent {
  id: string;
  school_id: string;
  class_id?: string;
  author_id: string;
  title: string;
  description?: string;
  event_type: 'event' | 'exam' | 'holiday' | 'deadline' | 'meeting';
  start_at: string;
  end_at?: string;
  all_day: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  school_id: string;
  sender_id: string;
  body: string;
  attachment_url?: string;
  is_deleted: boolean;
  created_at: string;
  sender?: Profile;
}

export interface Conversation {
  id: string;
  school_id: string;
  conversation_type: 'direct' | 'group';
  subject?: string;
  created_at: string;
  updated_at: string;
  participants?: Profile[];
  last_message?: Message;
  unread_count?: number;
}

export interface AuditLog {
  id: string;
  school_id: string;
  actor_id?: string;
  actor_role?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  actor?: Profile;
}

export interface InviteToken {
  id: string;
  school_id: string;
  email?: string;
  phone?: string;
  role: UserRole;
  intended_profile_data?: Record<string, unknown>;
  token: string;
  expires_at: string;
  used_at?: string;
  created_at: string;
}
