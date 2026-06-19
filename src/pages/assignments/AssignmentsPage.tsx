// @ts-nocheck
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, isPast } from 'date-fns';
import {
  BookOpen,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  ChevronRight,
  FileText,
} from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Assignment, Class, Submission, Student } from '@/types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

// ── Schemas ───────────────────────────────────────────────────────────────────

const assignmentSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().optional(),
  class_id: z.string().min(1),
  due_date: z.string().optional(),
  max_score: z.coerce.number().min(1).max(1000).optional(),
  allow_late_submission: z.boolean().default(false),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

const submissionSchema = z.object({
  body: z.string().min(1, 'Please enter your answer'),
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

const gradeSchema = z.object({
  score: z.coerce.number().min(0).max(10000),
  feedback: z.string().optional(),
});

type GradeFormValues = z.infer<typeof gradeSchema>;

// ── Helpers ───────────────────────────────────────────────────────────────────

async function insertAuditLog(
  schoolId: string,
  actorId: string,
  actorRole: string,
  action: string,
  resourceId: string,
  resourceType: string,
) {
  await (supabase as any).from('audit_logs').insert({
    school_id: schoolId,
    actor_id: actorId,
    actor_role: actorRole,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
  });
}

function isOverdue(assignment: Assignment, submission?: Submission | null) {
  if (!assignment.due_date) return false;
  if (submission?.status === 'submitted' || submission?.status === 'graded') return false;
  return isPast(new Date(assignment.due_date));
}

// ── Skeletons ─────────────────────────────────────────────────────────────────

function AssignmentSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3 mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
    </Card>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ submission, assignment }: { submission?: Submission | null; assignment: Assignment }) {
  const { t } = useTranslation();

  if (submission?.status === 'graded') {
    return (
      <Badge className="bg-blue-500 text-white gap-1">
        <Star className="h-3 w-3" />
        {t('assignments.status.graded')} {submission.score !== undefined ? `· ${submission.score}` : ''}
      </Badge>
    );
  }
  if (submission?.status === 'submitted') {
    return (
      <Badge className="bg-green-500 text-white gap-1">
        <CheckCircle2 className="h-3 w-3" />
        {t('assignments.status.submitted')}
      </Badge>
    );
  }
  if (isOverdue(assignment, submission)) {
    return (
      <Badge className="bg-red-500 text-white gap-1">
        <AlertCircle className="h-3 w-3" />
        {t('assignments.status.overdue')}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1">
      <Clock className="h-3 w-3" />
      {t('assignments.status.pending')}
    </Badge>
  );
}

// ── New Assignment Dialog ─────────────────────────────────────────────────────

interface NewAssignmentDialogProps {
  schoolId: string;
  teacherId: string;
  teacherRole: string;
  classes: Class[];
  onCreated: () => void;
}

function NewAssignmentDialog({
  schoolId,
  teacherId,
  teacherRole,
  classes,
  onCreated,
}: NewAssignmentDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: { allow_late_submission: false },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AssignmentFormValues) => {
      const { data, error } = await supabase
        .from('assignments')
        .insert({
          school_id: schoolId,
          teacher_id: teacherId,
          title: values.title,
          description: values.description || null,
          class_id: values.class_id,
          due_date: values.due_date || null,
          max_score: values.max_score || null,
          allow_late_submission: values.allow_late_submission,
        })
        .select('id')
        .single();
      if (error) throw error;
      await insertAuditLog(schoolId, teacherId, teacherRole, 'ASSIGNMENT_CREATED', data.id, 'assignment');
      return data;
    },
    onSuccess: () => {
      toast({ title: t('assignments.created') });
      form.reset();
      setOpen(false);
      onCreated();
    },
    onError: (err: Error) => {
      toast({ title: t('common.error'), description: err.message, variant: 'destructive' });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          {t('assignments.new')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>{t('assignments.new')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((v) => mutate(v))} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignments.fields.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('assignments.fields.titlePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignments.fields.description')}</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder={t('assignments.fields.descriptionPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignments.fields.class')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('assignments.fields.classPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('assignments.fields.dueDate')}</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('assignments.fields.maxScore')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="allow_late_submission"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">{t('assignments.fields.allowLate')}</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? t('common.saving') : t('common.create')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// ── Teacher Detail Sheet (submissions + grading) ──────────────────────────────

interface TeacherDetailSheetProps {
  assignment: Assignment;
  schoolId: string;
  teacherId: string;
  teacherRole: string;
  open: boolean;
  onClose: () => void;
}

function TeacherDetailSheet({ assignment, schoolId, teacherId, teacherRole, open, onClose }: TeacherDetailSheetProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [gradingId, setGradingId] = useState<string | null>(null);

  const { data: submissions = [], isLoading } = useQuery<(Submission & { student: Student })[]>({
    queryKey: ['submissions', assignment.id],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('submissions')
        .select('*, student:students(*, profile:profiles(*))')
        .eq('assignment_id', assignment.id);
      if (error) throw error;
      return (data as unknown as (Submission & { student: Student })[]) ?? [];
    },
  });

  const gradeForm = useForm<GradeFormValues>({
    resolver: zodResolver(gradeSchema),
    defaultValues: { score: 0, feedback: '' },
  });

  const { mutate: gradeSubmission, isPending: grading } = useMutation({
    mutationFn: async ({ submissionId, values }: { submissionId: string; values: GradeFormValues }) => {
      const { error } = await supabase
        .from('submissions')
        .update({
          score: values.score,
          feedback: values.feedback || null,
          graded_at: new Date().toISOString(),
          graded_by: teacherId,
          status: 'graded',
        })
        .eq('id', submissionId);
      if (error) throw error;
      await insertAuditLog(schoolId, teacherId, teacherRole, 'SUBMISSION_GRADED', submissionId, 'submission');
    },
    onSuccess: () => {
      toast({ title: t('assignments.graded') });
      setGradingId(null);
      gradeForm.reset();
      queryClient.invalidateQueries({ queryKey: ['submissions', assignment.id] });
    },
    onError: (err: Error) => {
      toast({ title: t('common.error'), description: err.message, variant: 'destructive' });
    },
  });

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{assignment.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {assignment.description && (
            <p className="text-sm text-muted-foreground">{assignment.description}</p>
          )}
          {assignment.due_date && (
            <p className="text-xs text-muted-foreground">
              {t('assignments.dueDate')}: {format(new Date(assignment.due_date), 'PPP p')}
            </p>
          )}

          <Separator />
          <h3 className="font-semibold text-sm">
            {t('assignments.submissions')} ({submissions.length})
          </h3>

          {isLoading && <Skeleton className="h-20 w-full" />}

          {!isLoading && submissions.length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">{t('assignments.noSubmissions')}</p>
          )}

          {submissions.map((sub) => (
            <Card key={sub.id} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">
                  {sub.student?.profile?.full_name ?? t('common.unknown')}
                </span>
                {sub.status === 'graded' ? (
                  <Badge className="bg-blue-500 text-white">{t('assignments.status.graded')} · {sub.score}</Badge>
                ) : (
                  <Badge className="bg-green-500 text-white">{t('assignments.status.submitted')}</Badge>
                )}
              </div>
              {sub.body && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{sub.body}</p>}
              <p className="text-xs text-muted-foreground mb-2">
                {format(new Date(sub.submitted_at), 'PPP p')}
                {sub.is_late && <span className="ml-2 text-yellow-600">{t('assignments.late')}</span>}
              </p>

              {gradingId === sub.id ? (
                <Form {...gradeForm}>
                  <form
                    onSubmit={gradeForm.handleSubmit((v) => gradeSubmission({ submissionId: sub.id, values: v }))}
                    className="space-y-2 mt-2"
                  >
                    <FormField
                      control={gradeForm.control}
                      name="score"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('assignments.fields.score')} {assignment.max_score ? `/ ${assignment.max_score}` : ''}</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={gradeForm.control}
                      name="feedback"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('assignments.fields.feedback')}</FormLabel>
                          <FormControl>
                            <Textarea rows={2} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" disabled={grading}>
                        {grading ? t('common.saving') : t('assignments.grade')}
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => setGradingId(null)}>
                        {t('common.cancel')}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                sub.status !== 'graded' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setGradingId(sub.id);
                      gradeForm.reset({ score: 0, feedback: '' });
                    }}
                  >
                    {t('assignments.grade')}
                  </Button>
                )
              )}
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Student Detail Sheet ──────────────────────────────────────────────────────

interface StudentDetailSheetProps {
  assignment: Assignment;
  studentId: string;
  studentRole: string;
  schoolId: string;
  existingSubmission?: Submission | null;
  open: boolean;
  onClose: () => void;
}

function StudentDetailSheet({
  assignment,
  studentId,
  studentRole,
  schoolId,
  existingSubmission,
  open,
  onClose,
}: StudentDetailSheetProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: { body: existingSubmission?.body ?? '' },
  });

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (values: SubmissionFormValues) => {
      const isLate = assignment.due_date ? isPast(new Date(assignment.due_date)) : false;
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          assignment_id: assignment.id,
          student_id: studentId,
          school_id: schoolId,
          body: values.body,
          submitted_at: new Date().toISOString(),
          is_late: isLate,
          status: 'submitted',
        })
        .select('id')
        .single();
      if (error) throw error;
      await insertAuditLog(schoolId, studentId, studentRole, 'SUBMISSION_CREATED', data.id, 'submission');
    },
    onSuccess: () => {
      toast({ title: t('assignments.submitted') });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      onClose();
    },
    onError: (err: Error) => {
      toast({ title: t('common.error'), description: err.message, variant: 'destructive' });
    },
  });

  const alreadySubmitted = existingSubmission?.status === 'submitted' || existingSubmission?.status === 'graded';

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{assignment.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {assignment.description && (
            <p className="text-sm text-muted-foreground">{assignment.description}</p>
          )}
          {assignment.due_date && (
            <p className="text-xs text-muted-foreground">
              {t('assignments.dueDate')}: {format(new Date(assignment.due_date), 'PPP p')}
            </p>
          )}
          {assignment.max_score && (
            <p className="text-xs text-muted-foreground">
              {t('assignments.maxScore')}: {assignment.max_score}
            </p>
          )}

          <Separator />

          {existingSubmission?.status === 'graded' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4 space-y-1">
                <p className="font-semibold text-blue-800">
                  {t('assignments.yourGrade')}: {existingSubmission.score} / {assignment.max_score ?? '—'}
                </p>
                {existingSubmission.feedback && (
                  <p className="text-sm text-blue-700">{existingSubmission.feedback}</p>
                )}
              </CardContent>
            </Card>
          )}

          {alreadySubmitted && existingSubmission?.status !== 'graded' && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <p className="text-green-800 font-medium">{t('assignments.alreadySubmitted')}</p>
                {existingSubmission?.body && (
                  <p className="text-sm text-green-700 mt-1 line-clamp-3">{existingSubmission.body}</p>
                )}
              </CardContent>
            </Card>
          )}

          {!alreadySubmitted && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit((v) => submit(v))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('assignments.yourAnswer')}</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder={t('assignments.answerPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-xs text-muted-foreground">{t('assignments.fileHint')}</p>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? t('common.submitting') : t('assignments.submit')}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Assignment Card ───────────────────────────────────────────────────────────

interface AssignmentCardProps {
  assignment: Assignment;
  role: string;
  studentId?: string;
  schoolId: string;
  onClick: () => void;
}

function AssignmentCard({ assignment, role, onClick }: AssignmentCardProps) {
  const { t } = useTranslation();
  const isTeacher = role === 'teacher' || role === 'school_admin' || role === 'super_admin';
  const overdue = isOverdue(assignment, assignment.submission);

  return (
    <Card
      className={`w-full cursor-pointer transition-shadow hover:shadow-md ${overdue ? 'border-red-300' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold">{assignment.title}</CardTitle>
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge variant="secondary" className="text-xs">{assignment.class?.name}</Badge>
          {!isTeacher && <StatusBadge submission={assignment.submission} assignment={assignment} />}
          {isTeacher && overdue && (
            <Badge className="bg-red-500 text-white text-xs">{t('assignments.status.overdue')}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {assignment.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{assignment.description}</p>
        )}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {assignment.due_date && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {format(new Date(assignment.due_date), 'PPP')}
            </span>
          )}
          {assignment.max_score && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {assignment.max_score} {t('assignments.points')}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AssignmentsPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  const isTeacher =
    profile?.role === 'teacher' ||
    profile?.role === 'school_admin' ||
    profile?.role === 'super_admin';
  const isStudent = profile?.role === 'student';
  const isParent = profile?.role === 'parent';

  // Fetch classes for teacher form
  const { data: classes = [] } = useQuery<Class[]>({
    queryKey: ['classes', profile?.school_id],
    enabled: !!profile?.school_id && isTeacher,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('school_id', profile!.school_id)
        .order('name');
      if (error) throw error;
      return (data as unknown as Class[]) ?? [];
    },
  });

  // Fetch student record for students/parents
  const { data: studentRecord } = useQuery({
    queryKey: ['student-record', profile?.id],
    enabled: !!profile && (isStudent || isParent),
    queryFn: async () => {
      if (isStudent) {
        const { data } = await supabase
          .from('students')
          .select('id')
          .eq('profile_id', profile!.id)
          .single();
        return data;
      }
      if (isParent) {
        // get first child
        const { data: guardian } = await supabase
          .from('guardians')
          .select('id')
          .eq('profile_id', profile!.id)
          .single();
        if (!guardian) return null;
        const { data: link } = await supabase
          .from('student_guardians' as any)
          .select('student_id')
          .eq('guardian_id', guardian.id)
          .limit(1)
          .single();
        return link ? { id: link.student_id } : null;
      }
      return null;
    },
  });

  // Fetch assignments
  const { data: assignments = [], isLoading } = useQuery<Assignment[]>({
    queryKey: ['assignments', profile?.school_id, profile?.id, profile?.role],
    enabled: !!profile?.school_id,
    queryFn: async () => {
      if (isTeacher) {
        const { data, error } = await supabase
          .from('assignments')
          .select('*, class:classes(*)')
          .eq('school_id', profile!.school_id)
          .eq('teacher_id', profile!.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        return (data as unknown as Assignment[]) ?? [];
      }

      if ((isStudent || isParent) && studentRecord) {
        const sid = studentRecord.id;
        setStudentId(sid);
        // get enrollments
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('class_id')
          .eq('student_id', sid)
          .eq('status', 'active');

        const classIds = (enrollments ?? []).map((e: { class_id: string }) => e.class_id);
        if (classIds.length === 0) return [];

        const { data, error } = await supabase
          .from('assignments')
          .select('*, class:classes(*)')
          .in('class_id', classIds)
          .order('due_date', { ascending: true });
        if (error) throw error;

        // Attach own submission
        const assignmentIds = (data ?? []).map((a: { id: string }) => a.id);
        const { data: submissions } = await supabase
          .from('submissions')
          .select('*')
          .eq('student_id', sid)
          .in('assignment_id', assignmentIds);

        const subMap = new Map((submissions ?? []).map((s: Submission) => [s.assignment_id, s]));
        return (data as unknown as Assignment[]).map((a) => ({
          ...a,
          submission: subMap.get(a.id) ?? null,
        }));
      }
      return [];
    },
  });

  const refetch = () => queryClient.invalidateQueries({ queryKey: ['assignments'] });

  const resolvedStudentId = isStudent || isParent ? studentId ?? studentRecord?.id ?? '' : '';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{t('assignments.title')}</h1>
          </div>
          {isTeacher && profile && (
            <NewAssignmentDialog
              schoolId={profile.school_id}
              teacherId={profile.id}
              teacherRole={profile.role}
              classes={classes}
              onCreated={refetch}
            />
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            <AssignmentSkeleton />
            <AssignmentSkeleton />
            <AssignmentSkeleton />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && assignments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <FileText className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">{t('assignments.empty.title')}</p>
            <p className="text-sm text-muted-foreground">{t('assignments.empty.description')}</p>
          </div>
        )}

        {/* List */}
        {!isLoading && assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            role={profile?.role ?? ''}
            studentId={resolvedStudentId}
            schoolId={profile?.school_id ?? ''}
            onClick={() => setSelectedAssignment(assignment)}
          />
        ))}
      </div>

      {/* Teacher detail sheet */}
      {isTeacher && selectedAssignment && profile && (
        <TeacherDetailSheet
          assignment={selectedAssignment}
          schoolId={profile.school_id}
          teacherId={profile.id}
          teacherRole={profile.role}
          open={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}

      {/* Student / Parent detail sheet */}
      {(isStudent || isParent) && selectedAssignment && profile && (
        <StudentDetailSheet
          assignment={selectedAssignment}
          studentId={resolvedStudentId}
          studentRole={profile.role}
          schoolId={profile.school_id}
          existingSubmission={selectedAssignment.submission}
          open={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}
