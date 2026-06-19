import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe } from 'lucide-react';
import { toast } from 'sonner';
import i18n from '@/i18n';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { profile, school, refreshProfile } = useAuth();
  const { logAction } = useAuditLog();
  const qc = useQueryClient();

  const [studentTeacherMsg, setStudentTeacherMsg] = React.useState(school?.student_teacher_messaging ?? false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (profile?.role !== 'school_admin' && profile?.role !== 'super_admin') return;
      const { error } = await supabase
        .from('schools')
        .update({ student_teacher_messaging: studentTeacherMsg })
        .eq('id', profile.school_id);
      if (error) throw error;
      // Update allowed_message_pairs accordingly
      if (studentTeacherMsg) {
        await (supabase as any).from('allowed_message_pairs').upsert([
          { school_id: profile.school_id, from_role: 'student', to_role: 'teacher', enabled: true },
          { school_id: profile.school_id, from_role: 'teacher', to_role: 'student', enabled: true },
        ]);
      } else {
        await (supabase as any).from('allowed_message_pairs')
          .update({ enabled: false })
          .eq('school_id', profile.school_id)
          .in('from_role', ['student'])
          .in('to_role', ['teacher']);
      }
    },
    onSuccess: () => {
      logAction('SCHOOL_SETTINGS_UPDATED', 'school', profile?.school_id);
      refreshProfile();
      toast.success(t('common.save'));
    },
    onError: () => toast.error(t('common.error')),
  });

  const changeLanguage = async (lang: string) => {
    i18n.changeLanguage(lang);
    if (profile) {
      await supabase.from('profiles').update({ language_pref: lang }).eq('id', profile.id);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5" />
        <h1 className="text-xl font-bold">{t('settings.title')}</h1>
      </div>

      {/* Language */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4" /> {t('settings.language')}</CardTitle></CardHeader>
        <CardContent>
          <Select defaultValue={profile?.language_pref ?? 'en'} onValueChange={changeLanguage}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="sw">Kiswahili</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* School settings — admin only */}
      {(profile?.role === 'school_admin' || profile?.role === 'super_admin') && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">{t('settings.school')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t('settings.student_teacher_msg')}</Label>
                <p className="text-xs text-gray-500 mt-0.5">Allow students to message their teachers directly</p>
              </div>
              <Switch checked={studentTeacherMsg} onCheckedChange={setStudentTeacherMsg} />
            </div>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="w-full sm:w-auto">
              {saveMutation.isPending ? t('common.loading') : t('settings.save')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
