import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { UserPlus, CheckCircle, Clock, XCircle, Search } from 'lucide-react';

const enrollSchema = z.object({
  full_name: z.string().min(2),
  admission_number: z.string().optional(),
  date_of_birth: z.string().optional(),
  class_id: z.string().min(1),
  guardian_name: z.string().min(2),
  guardian_phone: z.string().min(8),
  guardian_relationship: z.enum(['parent', 'guardian', 'other']).default('parent'),
});
type EnrollForm = z.infer<typeof enrollSchema>;

const consentBadge: Record<string, React.ReactNode> = {
  active: <Badge className="bg-green-100 text-green-700 border-0"><CheckCircle className="w-3 h-3 mr-1" />Consented</Badge>,
  pending_consent: <Badge className="bg-yellow-100 text-yellow-700 border-0"><Clock className="w-3 h-3 mr-1" />Pending</Badge>,
  inactive: <Badge className="bg-gray-100 text-gray-600 border-0"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>,
  suspended: <Badge className="bg-red-100 text-red-700 border-0">Suspended</Badge>,
};

export default function StudentsPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const qc = useQueryClient();
  const { logAction } = useAuditLog();
  const [search, setSearch] = useState('');
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<EnrollForm>({
    resolver: zodResolver(enrollSchema),
    defaultValues: { guardian_relationship: 'parent' },
  });

  const { data: classes } = useQuery({
    queryKey: ['classes', profile?.school_id],
    queryFn: async () => {
      const { data } = await (supabase as any).from('classes').select('id, name').eq('school_id', profile!.school_id).order('name');
      return data ?? [];
    },
    enabled: !!profile,
  });

  const { data: students, isLoading } = useQuery({
    queryKey: ['students', profile?.school_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('students')
        .select(`
          id, admission_number, enrollment_status,
          profile:profiles(id, full_name, status, created_at),
          enrollments(class:classes(name))
        `)
        .eq('school_id', profile!.school_id)
        .order('created_at', { referencedTable: 'profiles', ascending: false });
      return data ?? [];
    },
    enabled: !!profile,
  });

  const filtered = (students ?? []).filter((s: any) =>
    !search || s.profile?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.admission_number?.includes(search)
  );

  const enroll = async (data: EnrollForm) => {
    if (!profile) return;
    setEnrollLoading(true);
    try {
      // Create guardian auth user + profile (invite flow)
      const guardianEmail = `guardian_${Date.now()}@placeholder.shuleconnect.internal`;
      const { data: guardianAuth, error: gAuthErr } = await supabase.auth.admin
        ? { data: null, error: new Error('Use invite flow in production') }
        : { data: null, error: new Error('Invite flow required') };

      // For MVP: insert invite token for guardian, create student profile with pending_consent
      const { data: studentProfile } = await supabase.from('profiles').insert({
        school_id: profile.school_id,
        role: 'student',
        full_name: data.full_name,
        status: 'pending_consent',
        language_pref: 'sw',
      }).select('id').single();
      if (!studentProfile) throw new Error('Failed to create student profile');

      const { data: student } = await (supabase as any).from('students').insert({
        profile_id: studentProfile.id,
        school_id: profile.school_id,
        admission_number: data.admission_number || null,
        date_of_birth: data.date_of_birth || null,
        enrollment_status: 'active',
      }).select('id').single();
      if (!student) throw new Error('Failed to create student');

      // Enroll in class
      await (supabase as any).from('enrollments').insert({
        student_id: student.id,
        class_id: data.class_id,
        school_id: profile.school_id,
      });

      // Create invite token for guardian
      await (supabase as any).from('invite_tokens').insert({
        school_id: profile.school_id,
        phone: data.guardian_phone,
        role: 'parent',
        intended_profile_data: {
          full_name: data.guardian_name,
          relationship: data.guardian_relationship,
          student_id: student.id,
        },
        created_by: profile.id,
      });

      logAction('STUDENT_ENROLLED', 'student', student.id, { name: data.full_name });
      qc.invalidateQueries({ queryKey: ['students'] });
      setEnrollOpen(false);
      reset();
    } catch (err) {
      console.error('Enroll error:', err);
    } finally {
      setEnrollLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('students.title')}</h1>
        <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><UserPlus className="w-4 h-4 mr-1" /> {t('students.add')}</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{t('students.add')}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(enroll)} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>{t('students.form.full_name')}</Label>
                  <Input className="mt-1" {...register('full_name')} />
                  {errors.full_name && <p className="text-red-500 text-xs mt-1">{t('common.required')}</p>}
                </div>
                <div>
                  <Label>{t('students.form.admission_number')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
                  <Input className="mt-1" {...register('admission_number')} />
                </div>
                <div>
                  <Label>{t('students.form.date_of_birth')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
                  <Input className="mt-1" type="date" {...register('date_of_birth')} />
                </div>
              </div>
              <div>
                <Label>{t('students.form.class')}</Label>
                <Select onValueChange={v => setValue('class_id', v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder={t('common.none')} /></SelectTrigger>
                  <SelectContent>
                    {classes?.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.class_id && <p className="text-red-500 text-xs mt-1">{t('common.required')}</p>}
              </div>
              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-2">{t('students.guardian')}</p>
                <div className="space-y-2">
                  <div>
                    <Label>{t('students.form.guardian_name')}</Label>
                    <Input className="mt-1" {...register('guardian_name')} />
                    {errors.guardian_name && <p className="text-red-500 text-xs mt-1">{t('common.required')}</p>}
                  </div>
                  <div>
                    <Label>{t('students.form.guardian_phone')}</Label>
                    <Input className="mt-1" placeholder="+255..." {...register('guardian_phone')} />
                    {errors.guardian_phone && <p className="text-red-500 text-xs mt-1">{t('common.required')}</p>}
                  </div>
                  <div>
                    <Label>{t('students.form.guardian_relationship')}</Label>
                    <Select defaultValue="parent" onValueChange={v => setValue('guardian_relationship', v as EnrollForm['guardian_relationship'])}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={enrollLoading}>
                {enrollLoading ? t('common.loading') : t('students.form.submit')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input className="pl-9" placeholder={t('common.search')} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-2">{[1,2,3,4,5].map(i => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">{t('students.no_students')}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('students.form.full_name')}</TableHead>
                    <TableHead className="hidden sm:table-cell">{t('students.admission_no')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('students.class')}</TableHead>
                    <TableHead>{t('students.consent_status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s: any) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.profile?.full_name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-gray-500 text-sm">{s.admission_number ?? '—'}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {s.enrollments?.[0]?.class?.name ?? '—'}
                      </TableCell>
                      <TableCell>{consentBadge[s.profile?.status] ?? <Badge variant="outline">{s.profile?.status}</Badge>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
