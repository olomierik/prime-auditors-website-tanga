export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string; name: string; slug: string; country: string; locale: string;
          address: string | null; phone: string | null; email: string | null; logo_url: string | null;
          student_teacher_messaging: boolean; student_classmate_channels: boolean;
          status: string; billing_status: string; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['schools']['Row']> & { name: string; slug: string };
        Update: Partial<Database['public']['Tables']['schools']['Row']>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string; school_id: string; role: string; full_name: string;
          phone: string | null; avatar_url: string | null; language_pref: string;
          status: string; mfa_enabled: boolean; last_seen_at: string | null;
          created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { school_id: string; role: string; full_name: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
        Relationships: [{ foreignKeyName: 'profiles_id_fkey'; columns: ['id']; referencedRelation: 'users'; referencedColumns: ['id'] }];
      };
      students: {
        Row: {
          id: string; profile_id: string; school_id: string;
          admission_number: string | null; date_of_birth: string | null;
          enrollment_status: string; enrollment_start: string; enrollment_end: string | null;
          created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['students']['Row']> & { profile_id: string; school_id: string };
        Update: Partial<Database['public']['Tables']['students']['Row']>;
        Relationships: [];
      };
      guardians: {
        Row: { id: string; profile_id: string; school_id: string; relationship: string; created_at: string };
        Insert: Partial<Database['public']['Tables']['guardians']['Row']> & { profile_id: string; school_id: string };
        Update: Partial<Database['public']['Tables']['guardians']['Row']>;
        Relationships: [];
      };
      student_guardians: {
        Row: { student_id: string; guardian_id: string; is_primary: boolean };
        Insert: { student_id: string; guardian_id: string; is_primary?: boolean };
        Update: Partial<Database['public']['Tables']['student_guardians']['Row']>;
        Relationships: [];
      };
      parental_consents: {
        Row: {
          id: string; student_id: string; guardian_id: string; school_id: string;
          scope: string; version: number; granted_at: string | null; revoked_at: string | null;
          grant_method: string; ip_address: string | null; user_agent: string | null;
          notes: string | null; created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['parental_consents']['Row']> & { student_id: string; guardian_id: string; school_id: string };
        Update: Partial<Database['public']['Tables']['parental_consents']['Row']>;
        Relationships: [];
      };
      classes: {
        Row: {
          id: string; school_id: string; name: string; grade_level: string | null;
          term: string | null; academic_year: string; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['classes']['Row']> & { school_id: string; name: string; academic_year: string };
        Update: Partial<Database['public']['Tables']['classes']['Row']>;
        Relationships: [];
      };
      class_teachers: {
        Row: { class_id: string; teacher_profile_id: string; is_primary: boolean };
        Insert: { class_id: string; teacher_profile_id: string; is_primary?: boolean };
        Update: Partial<Database['public']['Tables']['class_teachers']['Row']>;
        Relationships: [];
      };
      enrollments: {
        Row: {
          id: string; student_id: string; class_id: string; school_id: string;
          enrolled_at: string; status: string;
        };
        Insert: Partial<Database['public']['Tables']['enrollments']['Row']> & { student_id: string; class_id: string; school_id: string };
        Update: Partial<Database['public']['Tables']['enrollments']['Row']>;
        Relationships: [];
      };
      announcements: {
        Row: {
          id: string; school_id: string; class_id: string | null; author_id: string;
          title: string; body: string; pinned: boolean;
          published_at: string; expires_at: string | null; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['announcements']['Row']> & { school_id: string; author_id: string; title: string; body: string };
        Update: Partial<Database['public']['Tables']['announcements']['Row']>;
        Relationships: [];
      };
      assignments: {
        Row: {
          id: string; school_id: string; class_id: string; teacher_id: string;
          title: string; description: string | null; due_date: string | null;
          max_score: number | null; allow_late_submission: boolean; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['assignments']['Row']> & { school_id: string; class_id: string; teacher_id: string; title: string };
        Update: Partial<Database['public']['Tables']['assignments']['Row']>;
        Relationships: [];
      };
      submissions: {
        Row: {
          id: string; assignment_id: string; student_id: string; school_id: string;
          body: string | null; submitted_at: string; is_late: boolean;
          score: number | null; feedback: string | null; graded_at: string | null;
          graded_by: string | null; status: string; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['submissions']['Row']> & { assignment_id: string; student_id: string; school_id: string };
        Update: Partial<Database['public']['Tables']['submissions']['Row']>;
        Relationships: [];
      };
      attendance: {
        Row: {
          id: string; school_id: string; class_id: string; student_id: string;
          teacher_id: string; date: string; status: string; notes: string | null; created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['attendance']['Row']> & { school_id: string; class_id: string; student_id: string; teacher_id: string; date: string; status: string };
        Update: Partial<Database['public']['Tables']['attendance']['Row']>;
        Relationships: [];
      };
      calendar_events: {
        Row: {
          id: string; school_id: string; class_id: string | null; author_id: string;
          title: string; description: string | null; event_type: string;
          start_at: string; end_at: string | null; all_day: boolean; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['calendar_events']['Row']> & { school_id: string; author_id: string; title: string; event_type: string; start_at: string };
        Update: Partial<Database['public']['Tables']['calendar_events']['Row']>;
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string; school_id: string; conversation_type: string;
          subject: string | null; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['conversations']['Row']> & { school_id: string };
        Update: Partial<Database['public']['Tables']['conversations']['Row']>;
        Relationships: [];
      };
      conversation_participants: {
        Row: {
          conversation_id: string; profile_id: string; school_id: string;
          joined_at: string; last_read_at: string | null;
        };
        Insert: { conversation_id: string; profile_id: string; school_id: string; joined_at?: string; last_read_at?: string | null };
        Update: Partial<Database['public']['Tables']['conversation_participants']['Row']>;
        Relationships: [];
      };
      messages: {
        Row: {
          id: string; conversation_id: string; school_id: string; sender_id: string;
          body: string; attachment_url: string | null; attachment_name: string | null;
          is_deleted: boolean; created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['messages']['Row']> & { conversation_id: string; school_id: string; sender_id: string; body: string };
        Update: Partial<Database['public']['Tables']['messages']['Row']>;
        Relationships: [];
      };
      allowed_message_pairs: {
        Row: { school_id: string; from_role: string; to_role: string; enabled: boolean };
        Insert: { school_id: string; from_role: string; to_role: string; enabled?: boolean };
        Update: Partial<Database['public']['Tables']['allowed_message_pairs']['Row']>;
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string; school_id: string | null; actor_id: string | null; actor_role: string | null;
          action: string; resource_type: string | null; resource_id: string | null;
          metadata: Json | null; ip_address: string | null; created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['audit_logs']['Row']> & { action: string };
        Update: never;
        Relationships: [];
      };
      moderation_cases: {
        Row: {
          id: string; school_id: string; reporter_id: string | null; resource_type: string;
          resource_id: string; reason: string | null; status: string; reviewer_id: string | null;
          resolution: string | null; resolved_at: string | null; created_at: string; updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['moderation_cases']['Row']> & { school_id: string; resource_type: string; resource_id: string };
        Update: Partial<Database['public']['Tables']['moderation_cases']['Row']>;
        Relationships: [];
      };
      invite_tokens: {
        Row: {
          id: string; school_id: string; email: string | null; phone: string | null;
          role: string; intended_profile_data: Json | null; token: string;
          expires_at: string; used_at: string | null; created_by: string | null; created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['invite_tokens']['Row']> & { school_id: string; role: string };
        Update: Partial<Database['public']['Tables']['invite_tokens']['Row']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      my_school_id: { Args: Record<string, never>; Returns: string };
      my_role: { Args: Record<string, never>; Returns: string };
      seed_allowed_message_pairs: { Args: { p_school_id: string }; Returns: void };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
