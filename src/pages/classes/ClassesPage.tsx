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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Plus, Users } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1),
  grade_level: z.string().optional(),
  term: z.string().optional(),
  academic_year: z.string().min(4),
});
type FormData = z.infer<typeof schema>;

export default function ClassesPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const qc = useQueryClient();
  const { logAction } = useAuditLog();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { academic_year: new Date().getFullYear().toString() },
  });

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes-detail', profile?.school_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('classes')
        .select(`
          id, name, grade_level, term, academic_year,
          class_teachers(teacher:profiles(full_name)),
          enrollments(id)
        `)
        .eq('school_id', profile!.school_id)
        .order('name');
      return data ?? [];
    },
    enabled: !!profile,
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await (supabase as any).from('classes').insert({ ...data, school_id: profile!.school_id });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['classes-detail'] });
      qc.invalidateQueries({ queryKey: ['classes'] });
      logAction('CLASS_CREATED', 'class');
      setOpen(false);
      reset();
    },
  });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2"><BookOpen className="w-5 h-5" /> {t('classes.title')}</h1>
        {(profile?.role === 'school_admin' || profile?.role === 'teacher') && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> {t('classes.add')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{t('classes.add')}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(d => createMutation.mutate(d))} className="space-y-3 pt-2">
                <div>
                  <Label>{t('classes.form.name')}</Label>
                  <Input className="mt-1" {...register('name')} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{t('common.required')}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{t('classes.form.grade_level')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
                    <Input className="mt-1" placeholder="Form 1" {...register('grade_level')} />
                  </div>
                  <div>
                    <Label>{t('classes.form.term')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
                    <Input className="mt-1" placeholder="Term 2" {...register('term')} />
                  </div>
                </div>
                <div>
                  <Label>{t('classes.form.academic_year')}</Label>
                  <Input className="mt-1" {...register('academic_year')} />
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? t('common.loading') : t('classes.form.submit')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : classes?.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-20" />
          <p className="text-sm">{t('classes.no_classes')}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(classes ?? []).map((c: any) => (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    {c.grade_level && <p className="text-xs text-gray-400 mt-0.5">{c.grade_level}</p>}
                    {c.term && <p className="text-xs text-gray-400">{c.term} · {c.academic_year}</p>}
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {t('classes.students_count', { count: c.enrollments?.length ?? 0 })}
                  </span>
                </div>
                {c.class_teachers?.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {c.class_teachers.map((ct: any) => ct.teacher?.full_name).filter(Boolean).join(', ')}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
