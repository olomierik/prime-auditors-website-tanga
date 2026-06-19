// @ts-nocheck
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  CheckCircle2,
  ShieldCheck,
  Database,
  Users,
  BookOpen,
  MessageSquare,
  XCircle,
  Loader2,
  UserCheck,
} from 'lucide-react';
import type { ParentalConsent, Student, Profile } from '@/types';

// ────────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────────
interface ConsentWithStudent extends ParentalConsent {
  student: Student & { profile: Profile };
}

// ────────────────────────────────────────────────────────────────────────────────
// Data points listed to the guardian
// ────────────────────────────────────────────────────────────────────────────────
const DATA_POINTS = [
  { icon: <UserCheck className="w-4 h-4" />, key: 'consent.data.attendance' },
  { icon: <BookOpen className="w-4 h-4" />, key: 'consent.data.grades' },
  { icon: <MessageSquare className="w-4 h-4" />, key: 'consent.data.messages' },
  { icon: <Database className="w-4 h-4" />, key: 'consent.data.profile' },
];

const CONSENT_SCOPE = 'attendance,grades,messages,profile';
const CONSENT_VERSION = 1;

export default function ConsentPage() {
  const { t } = useTranslation();
  const { user, profile, school, refreshProfile } = useAuth();
  const { logAction } = useAuditLog();
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);

  // ── Fetch all children linked to this guardian, with their consent records ──
  const { data: consents, isLoading } = useQuery({
    queryKey: ['parental-consents', user?.id],
    enabled: !!user && !!profile,
    queryFn: async () => {
      // 1. Get guardian record for the current user
      const { data: guardian, error: gErr } = await supabase
        .from('guardians')
        .select('id, school_id')
        .eq('profile_id', user!.id)
        .single();
      if (gErr || !guardian) return [];

      // 2. Get all students linked via parental_consents (or all in school as child)
      const { data: rows, error: cErr } = await supabase
        .from('parental_consents')
        .select(`
          *,
          student:students(
            *,
            profile:profiles(*)
          )
        `)
        .eq('guardian_id', guardian.id)
        .eq('school_id', guardian.school_id)
        .order('created_at', { ascending: true });

      if (cErr) throw cErr;
      return (rows ?? []) as ConsentWithStudent[];
    },
  });

  // ── Grant consent mutation ────────────────────────────────────────────────────
  const grantMutation = useMutation({
    mutationFn: async (consentId: string) => {
      const now = new Date().toISOString();

      // 1. Find the consent record to get student_id
      const consent = consents?.find(c => c.id === consentId);
      if (!consent) throw new Error('Consent record not found');

      // 2. Update parental_consents record
      const { error: updateErr } = await supabase
        .from('parental_consents')
        .update({ granted_at: now })
        .eq('id', consentId);
      if (updateErr) throw updateErr;

      // 3. Update student profile status to 'active'
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ status: 'active' })
        .eq('id', consent.student.profile_id);
      if (profileErr) throw profileErr;

      // 4. Audit log
      await logAction(
        'PARENTAL_CONSENT_GRANTED',
        'parental_consents',
        consentId,
        { student_id: consent.student_id, scope: CONSENT_SCOPE, version: CONSENT_VERSION }
      );
    },
    onSuccess: async () => {
      setActionError(null);
      await queryClient.invalidateQueries({ queryKey: ['parental-consents'] });
      await refreshProfile();
    },
    onError: (err: Error) => {
      setActionError(err.message);
    },
  });

  // ── Revoke consent mutation ───────────────────────────────────────────────────
  const revokeMutation = useMutation({
    mutationFn: async (consentId: string) => {
      const now = new Date().toISOString();
      const consent = consents?.find(c => c.id === consentId);
      if (!consent) throw new Error('Consent record not found');

      const { error: updateErr } = await supabase
        .from('parental_consents')
        .update({ revoked_at: now, granted_at: null })
        .eq('id', consentId);
      if (updateErr) throw updateErr;

      // Set the child's profile back to pending_consent
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ status: 'pending_consent' })
        .eq('id', consent.student.profile_id);
      if (profileErr) throw profileErr;

      await logAction(
        'PARENTAL_CONSENT_REVOKED',
        'parental_consents',
        consentId,
        { student_id: consent.student_id }
      );
    },
    onSuccess: async () => {
      setActionError(null);
      await queryClient.invalidateQueries({ queryKey: ['parental-consents'] });
      await refreshProfile();
    },
    onError: (err: Error) => {
      setActionError(err.message);
    },
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto text-primary-foreground">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('consent.title')}</h1>
          {school && (
            <p className="text-sm text-muted-foreground">{school.name}</p>
          )}
        </div>

        {/* What data is collected */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('consent.dataTitle')}</CardTitle>
            <CardDescription>{t('consent.dataDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {DATA_POINTS.map(dp => (
              <div key={dp.key} className="flex items-center gap-3 text-sm">
                <span className="text-primary">{dp.icon}</span>
                <span>{t(dp.key)}</span>
              </div>
            ))}
            <div className="mt-4 flex items-start gap-2 rounded-md bg-muted p-3 text-xs text-muted-foreground">
              <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{t('consent.assurance')}</span>
            </div>
          </CardContent>
        </Card>

        {actionError && (
          <Alert variant="destructive">
            <AlertDescription>{actionError}</AlertDescription>
          </Alert>
        )}

        {/* Consent cards per child */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : consents && consents.length > 0 ? (
          <div className="space-y-4">
            {consents.map(consent => {
              const isGranted = !!consent.granted_at && !consent.revoked_at;
              const childName = consent.student?.profile?.full_name ?? t('consent.unknownChild');
              return (
                <Card key={consent.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{childName}</p>
                        <div className="flex items-center gap-2">
                          {isGranted ? (
                            <Badge variant="default" className="gap-1 text-xs">
                              <CheckCircle2 className="w-3 h-3" />
                              {t('consent.status.granted')}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="gap-1 text-xs">
                              <XCircle className="w-3 h-3" />
                              {t('consent.status.pending')}
                            </Badge>
                          )}
                        </div>
                        {isGranted && consent.granted_at && (
                          <p className="text-xs text-muted-foreground">
                            {t('consent.grantedAt', {
                              date: new Date(consent.granted_at).toLocaleDateString(),
                            })}
                          </p>
                        )}
                        {consent.revoked_at && (
                          <p className="text-xs text-destructive">
                            {t('consent.revokedAt', {
                              date: new Date(consent.revoked_at).toLocaleDateString(),
                            })}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {!isGranted && (
                          <Button
                            size="sm"
                            onClick={() => grantMutation.mutate(consent.id)}
                            disabled={grantMutation.isPending}
                          >
                            {grantMutation.isPending && grantMutation.variables === consent.id ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            )}
                            {t('consent.grant')}
                          </Button>
                        )}

                        {isGranted && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive border-destructive hover:bg-destructive/10"
                                disabled={revokeMutation.isPending}
                              >
                                {revokeMutation.isPending && revokeMutation.variables === consent.id ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {t('consent.revoke')}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t('consent.revokeTitle')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t('consent.revokeDesc', { name: childName })}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => revokeMutation.mutate(consent.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {t('consent.revokeConfirm')}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              {t('consent.noChildren')}
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-muted-foreground">
          {t('consent.footer')}
        </p>
      </div>
    </div>
  );
}
