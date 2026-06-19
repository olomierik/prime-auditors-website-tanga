// @ts-nocheck
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AttendanceRecord, Class, Student } from '@/types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// ── Types ─────────────────────────────────────────────────────────────────────

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

interface StudentAttendanceDraft {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  existingId?: string;
}

// ── Status helpers ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  AttendanceStatus,
  { label: string; icon: React.ReactNode; activeClass: string; ringClass: string }
> = {
  present: {
    label: 'attendance.status.present',
    icon: <CheckCircle2 className="h-4 w-4" />,
    activeClass: 'bg-green-500 text-white border-green-500',
    ringClass: 'ring-green-300',
  },
  absent: {
    label: 'attendance.status.absent',
    icon: <XCircle className="h-4 w-4" />,
    activeClass: 'bg-red-500 text-white border-red-500',
    ringClass: 'ring-red-300',
  },
  late: {
    label: 'attendance.status.late',
    icon: <Clock className="h-4 w-4" />,
    activeClass: 'bg-yellow-500 text-white border-yellow-500',
    ringClass: 'ring-yellow-300',
  },
  excused: {
    label: 'attendance.status.excused',
    icon: <ShieldCheck className="h-4 w-4" />,
    activeClass: 'bg-blue-500 text-white border-blue-500',
    ringClass: 'ring-blue-300',
  },
};

function StatusBadgeDisplay({ status }: { status: AttendanceStatus }) {
  const { t } = useTranslation();
  const cfg = STATUS_CONFIG[status];
  return (
    <Badge className={`${cfg.activeClass} gap-1 text-xs`}>
      {cfg.icon}
      {t(cfg.label)}
    </Badge>
  );
}

// ── Attendance rate ───────────────────────────────────────────────────────────

function AttendanceRateBadge({ records }: { records: AttendanceRecord[] }) {
  const { t } = useTranslation();
  if (records.length === 0) return null;
  const present = records.filter((r) => r.status === 'present' || r.status === 'late').length;
  const rate = Math.round((present / records.length) * 100);
  const color = rate >= 90 ? 'text-green-600' : rate >= 75 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="flex items-center gap-2">
      <BarChart3 className="h-4 w-4 text-muted-foreground" />
      <span className={`text-lg font-bold ${color}`}>{rate}%</span>
      <span className="text-sm text-muted-foreground">{t('attendance.attendanceRate')}</span>
    </div>
  );
}

// ── Teacher view ──────────────────────────────────────────────────────────────

interface TeacherViewProps {
  schoolId: string;
  teacherId: string;
  teacherRole: string;
  classes: Class[];
}

function TeacherView({ schoolId, teacherId, teacherRole, classes }: TeacherViewProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [draft, setDraft] = useState<StudentAttendanceDraft[]>([]);

  // Fetch students in class
  const { data: students = [], isLoading: loadingStudents } = useQuery<Student[]>({
    queryKey: ['class-students', selectedClassId],
    enabled: !!selectedClassId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select('student:students(*, profile:profiles(*))')
        .eq('class_id', selectedClassId)
        .eq('status', 'active');
      if (error) throw error;
      return ((data ?? []).map((e: { student: Student }) => e.student).filter(Boolean)) as Student[];
    },
  });

  // Fetch existing attendance for this date/class
  const { data: existingRecords = [], isLoading: loadingExisting } = useQuery<AttendanceRecord[]>({
    queryKey: ['attendance', selectedClassId, selectedDate],
    enabled: !!selectedClassId && !!selectedDate,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('class_id', selectedClassId)
        .eq('date', selectedDate);
      if (error) throw error;
      return (data as unknown as AttendanceRecord[]) ?? [];
    },
    onSuccess: (records) => {
      // Pre-fill draft from existing records + fill missing students with 'present'
      const existingMap = new Map(records.map((r) => [r.student_id, r]));
      setDraft(
        students.map((s) => {
          const existing = existingMap.get(s.id);
          return {
            studentId: s.id,
            studentName: s.profile?.full_name ?? t('common.unknown'),
            status: (existing?.status as AttendanceStatus) ?? 'present',
            existingId: existing?.id,
          };
        }),
      );
    },
  } as Parameters<typeof useQuery>[0]);

  // When students load and no existing records yet, init draft
  useMemo(() => {
    if (students.length && existingRecords.length === 0 && !loadingExisting) {
      setDraft(
        students.map((s) => ({
          studentId: s.id,
          studentName: s.profile?.full_name ?? t('common.unknown'),
          status: 'present',
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students]);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setDraft((prev) =>
      prev.map((d) => (d.studentId === studentId ? { ...d, status } : d)),
    );
  };

  const { mutate: saveAttendance, isPending: saving } = useMutation({
    mutationFn: async () => {
      const rows = draft.map((d) => ({
        school_id: schoolId,
        class_id: selectedClassId,
        student_id: d.studentId,
        teacher_id: teacherId,
        date: selectedDate,
        status: d.status,
      }));

      const { error } = await supabase
        .from('attendance_records')
        .upsert(rows, { onConflict: 'class_id,student_id,date' });
      if (error) throw error;

      await (supabase as any).from('audit_logs').insert({
        school_id: schoolId,
        actor_id: teacherId,
        actor_role: teacherRole,
        action: 'ATTENDANCE_MARKED',
        resource_type: 'attendance',
        metadata: { class_id: selectedClassId, date: selectedDate, count: rows.length },
      });
    },
    onSuccess: () => {
      toast({ title: t('attendance.saved') });
      queryClient.invalidateQueries({ queryKey: ['attendance', selectedClassId, selectedDate] });
    },
    onError: (err: Error) => {
      toast({ title: t('common.error'), description: err.message, variant: 'destructive' });
    },
  });

  const isLoading = loadingStudents || loadingExisting;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>{t('attendance.date')}</Label>
              <Input
                type="date"
                value={selectedDate}
                max={today}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>{t('attendance.class')}</Label>
              <Select onValueChange={setSelectedClassId} value={selectedClassId}>
                <SelectTrigger>
                  <SelectValue placeholder={t('attendance.selectClass')} />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roster */}
      {selectedClassId && (
        <>
          {isLoading && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          )}

          {!isLoading && draft.length === 0 && (
            <p className="text-center text-muted-foreground py-10">{t('attendance.noStudents')}</p>
          )}

          {!isLoading && draft.length > 0 && (
            <div className="space-y-2">
              {draft.map((d) => (
                <Card key={d.studentId} className="px-4 py-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                    <span className="font-medium text-sm">{d.studentName}</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {(Object.keys(STATUS_CONFIG) as AttendanceStatus[]).map((status) => {
                        const cfg = STATUS_CONFIG[status];
                        const isActive = d.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setStatus(d.studentId, status)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium transition-all
                              ${isActive
                                ? `${cfg.activeClass} ring-2 ${cfg.ringClass}`
                                : 'border-border text-muted-foreground hover:bg-accent'
                              }`}
                          >
                            {cfg.icon}
                            {t(cfg.label)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                className="w-full mt-2"
                onClick={() => saveAttendance()}
                disabled={saving}
              >
                {saving ? t('common.saving') : t('attendance.saveAttendance')}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Student / Parent record view ──────────────────────────────────────────────

interface RecordViewProps {
  studentId: string;
  schoolId: string;
}

function StudentRecordView({ studentId, schoolId }: RecordViewProps) {
  const { t } = useTranslation();
  const now = new Date();
  const [rangeStart, setRangeStart] = useState(format(startOfMonth(now), 'yyyy-MM-dd'));
  const [rangeEnd, setRangeEnd] = useState(format(endOfMonth(now), 'yyyy-MM-dd'));

  const { data: records = [], isLoading } = useQuery<AttendanceRecord[]>({
    queryKey: ['attendance-records', studentId, rangeStart, rangeEnd],
    enabled: !!studentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*, class:classes(name)')
        .eq('student_id', studentId)
        .eq('school_id', schoolId)
        .gte('date', rangeStart)
        .lte('date', rangeEnd)
        .order('date', { ascending: false });
      if (error) throw error;
      return (data as unknown as AttendanceRecord[]) ?? [];
    },
  });

  return (
    <div className="space-y-4">
      {/* Date range */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>{t('common.from')}</Label>
              <Input type="date" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>{t('common.to')}</Label>
              <Input type="date" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {!isLoading && records.length > 0 && (
        <Card>
          <CardContent className="pt-4">
            <AttendanceRateBadge records={records} />
          </CardContent>
        </Card>
      )}

      {isLoading && <Skeleton className="h-48 w-full" />}

      {!isLoading && records.length === 0 && (
        <p className="text-center text-muted-foreground py-10">{t('attendance.noRecords')}</p>
      )}

      {!isLoading && records.length > 0 && (
        <Card>
          <CardContent className="pt-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('attendance.date')}</TableHead>
                  <TableHead>{t('attendance.class')}</TableHead>
                  <TableHead>{t('attendance.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-sm whitespace-nowrap">
                      {format(parseISO(r.date), 'EEE, MMM d')}
                    </TableCell>
                    <TableCell className="text-sm">
                      {(r as AttendanceRecord & { class?: { name: string } }).class?.name ?? '—'}
                    </TableCell>
                    <TableCell>
                      <StatusBadgeDisplay status={r.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Admin view ────────────────────────────────────────────────────────────────

interface AdminViewProps {
  schoolId: string;
  classes: Class[];
}

function AdminView({ schoolId, classes }: AdminViewProps) {
  const { t } = useTranslation();
  const now = new Date();
  const [selectedClassId, setSelectedClassId] = useState('');
  const [rangeStart, setRangeStart] = useState(format(startOfMonth(now), 'yyyy-MM-dd'));
  const [rangeEnd, setRangeEnd] = useState(format(endOfMonth(now), 'yyyy-MM-dd'));

  const { data: records = [], isLoading } = useQuery<AttendanceRecord[]>({
    queryKey: ['admin-attendance', selectedClassId, rangeStart, rangeEnd, schoolId],
    enabled: !!selectedClassId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*, student:students(*, profile:profiles(*))')
        .eq('class_id', selectedClassId)
        .eq('school_id', schoolId)
        .gte('date', rangeStart)
        .lte('date', rangeEnd)
        .order('date', { ascending: false });
      if (error) throw error;
      return (data as unknown as AttendanceRecord[]) ?? [];
    },
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>{t('attendance.class')}</Label>
              <Select onValueChange={setSelectedClassId} value={selectedClassId}>
                <SelectTrigger>
                  <SelectValue placeholder={t('attendance.selectClass')} />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>{t('common.from')}</Label>
              <Input type="date" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>{t('common.to')}</Label>
              <Input type="date" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading && <Skeleton className="h-48 w-full" />}

      {!isLoading && selectedClassId && records.length === 0 && (
        <p className="text-center text-muted-foreground py-10">{t('attendance.noRecords')}</p>
      )}

      {!isLoading && records.length > 0 && (
        <Card>
          <CardContent className="pt-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.name')}</TableHead>
                  <TableHead>{t('attendance.date')}</TableHead>
                  <TableHead>{t('attendance.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r) => {
                  const rec = r as AttendanceRecord & { student?: Student };
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="text-sm font-medium">
                        {rec.student?.profile?.full_name ?? t('common.unknown')}
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {format(parseISO(r.date), 'EEE, MMM d')}
                      </TableCell>
                      <TableCell>
                        <StatusBadgeDisplay status={r.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AttendancePage() {
  const { t } = useTranslation();
  const { profile } = useAuth();

  const isTeacher = profile?.role === 'teacher';
  const isAdmin = profile?.role === 'school_admin' || profile?.role === 'super_admin';
  const isStudent = profile?.role === 'student';
  const isParent = profile?.role === 'parent';

  // Fetch classes
  const { data: classes = [] } = useQuery<Class[]>({
    queryKey: ['classes', profile?.school_id],
    enabled: !!profile?.school_id && (isTeacher || isAdmin),
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

  // Fetch student id for student/parent
  const { data: studentRecord } = useQuery({
    queryKey: ['student-self', profile?.id, profile?.role],
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">{t('attendance.title')}</h1>
        </div>

        {(isTeacher) && profile && (
          <TeacherView
            schoolId={profile.school_id}
            teacherId={profile.id}
            teacherRole={profile.role}
            classes={classes}
          />
        )}

        {isAdmin && profile && (
          <AdminView schoolId={profile.school_id} classes={classes} />
        )}

        {(isStudent || isParent) && studentRecord?.id && profile && (
          <StudentRecordView studentId={studentRecord.id} schoolId={profile.school_id} />
        )}

        {(isStudent || isParent) && !studentRecord && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              <p>{t('attendance.noStudentLinked')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
