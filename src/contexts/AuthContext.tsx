import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Profile, School, UserRole } from '@/types';
import i18n from '@/i18n';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  school: School | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signInWithOtp: (contact: string, type: 'email' | 'phone') => Promise<void>;
  verifyOtp: (contact: string, token: string, type: 'email' | 'phone') => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
  canMessage: (recipientRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null, session: null, profile: null, school: null, loading: true,
  });

  const loadProfile = useCallback(async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles').select('*').eq('id', userId).single();
    if (!profile) return null;
    const { data: school } = await supabase
      .from('schools').select('*').eq('id', profile.school_id).single();
    if (profile.language_pref) i18n.changeLanguage(profile.language_pref);
    return { profile, school };
  }, []);

  const refreshProfile = useCallback(async () => {
    const userId = state.user?.id;
    if (!userId) return;
    const result = await loadProfile(userId);
    if (result) setState(prev => ({
      ...prev,
      profile: result.profile as unknown as Profile,
      school: result.school as unknown as School
    }));
  }, [state.user?.id, loadProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const result = await loadProfile(session.user.id);
        setState({ user: session.user, session, loading: false,
          profile: result?.profile as unknown as Profile ?? null,
          school: result?.school as unknown as School ?? null });
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const result = await loadProfile(session.user.id);
        setState({ user: session.user, session, loading: false,
          profile: result?.profile as unknown as Profile ?? null,
          school: result?.school as unknown as School ?? null });
      } else {
        setState({ user: null, session: null, profile: null, school: null, loading: false });
      }
    });
    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signInWithOtp = async (contact: string, type: 'email' | 'phone') => {
    const { error } = await supabase.auth.signInWithOtp(
      type === 'email' ? { email: contact } : { phone: contact }
    );
    if (error) throw error;
  };

  const verifyOtp = async (contact: string, token: string, type: 'email' | 'phone') => {
    const { error } = await supabase.auth.verifyOtp(
      type === 'email'
        ? { email: contact, token, type: 'email' }
        : { phone: contact, token, type: 'sms' }
    );
    if (error) throw error;
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  const hasRole = (...roles: UserRole[]) =>
    state.profile ? roles.includes(state.profile.role) : false;

  const canMessage = (recipientRole: UserRole): boolean => {
    const myRole = state.profile?.role;
    if (!myRole) return false;
    const allowed: Record<string, UserRole[]> = {
      teacher: ['parent', 'student', 'school_admin'],
      parent: ['teacher', 'school_admin'],
      school_admin: ['teacher', 'parent', 'student'],
      student: ['teacher'],
    };
    return (allowed[myRole] ?? []).includes(recipientRole);
  };

  return (
    <AuthContext.Provider value={{ ...state, signInWithOtp, verifyOtp, signOut, refreshProfile, hasRole, canMessage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
