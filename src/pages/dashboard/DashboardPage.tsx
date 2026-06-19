import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Bell, CalendarDays, Users, CheckSquare, Clock } from 'lucide-react';
import { format, isPast, parseISO } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function greeting(name: string, t: (k: string, o?: any) => string) {
  const h = new Date().getHours();
  if (h < 12) return t('dashboard.greeting_morning', { name });
  if (h < 17) return t('dashboard.greeting_afternoon', { name });
  return t('dashboard.greeting_evening', { name });
}

const eventColors: Record<string, string> = {
  exam: 'bg-red-100 text-red-700 border-red-200',
  holiday: 'bg-green-100 text-green-700 border-green-200',
  meeting: 'bg-purple-100 text-purple-700 border-purple-200',
  deadline: 'bg-orange-100 text-orange-700 border-orange-200',
  event: 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const { profile, school } = useAuth();

  const { data: announcements, isLoading: annLoading } = useQuery({
    queryKey: ['dashboard-announcements', profile?.school_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('announcements')
        .select('id, title, published_at, pinned, class_id')
        .eq('school_id', profile!.school_id)
        .order('pinned', { ascending: false })
        .order('published_at', { ascending: false })
        .limit(5);
      return data ?? [];
    },
    enabled: !!profile,
  });

  const { data: events, isLoading: evLoading } = useQuery({
    queryKey: ['dashboard-events', profile?.school_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('calendar_events')
        .select('id, title, event_type, start_at, all_day')
        .eq('school_id', profile!.school_id)
        .gte('start_at', new Date().toISOString())
        .order('start_at')
        .limit(5);
      return data ?? [];
    },
    enabled: !!profile,
  });

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats', profile?.school_id, profile?.role],
    queryFn: async () => {
      if (profile?.role === 'school_admin' || profile?.role === 'teacher') {
        const [{ count: students }, { count: classes }] = await Promise.all([
          (supabase as any).from('students').select('*', { count: 'exact', head: true }).eq('school_id', profile.school_id),
          (supabase as any).from('classes').select('*', { count: 'exact', head: true }).eq('school_id', profile.school_id),
        ]);
        return { students, classes };
      }
      return null;
    },
    enabled: !!profile,
  });

  if (!profile) return null;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {greeting(profile.full_name.split(' ')[0], t)}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{school?.name}</p>
      </div>

      {/* Stats row — admin/teacher only */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard icon={<Users className="w-5 h-5 text-blue-600" />}
            label={t('students.title')} value={stats.students ?? 0} color="blue" />
          <StatCard icon={<BookOpen className="w-5 h-5 text-purple-600" />}
            label={t('classes.title')} value={stats.classes ?? 0} color="purple" />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Recent Announcements */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4" />
              {t('announcements.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {annLoading ? <SkeletonList n={3} /> : announcements?.length === 0
              ? <Empty text={t('announcements.no_announcements')} />
              : announcements?.map(a => (
                <div key={a.id} className="flex items-start gap-2 py-1 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-gray-400">{format(parseISO(a.published_at), 'dd MMM yyyy')}</p>
                  </div>
                  {a.pinned && <Badge variant="outline" className="text-xs shrink-0">{t('announcements.pinned')}</Badge>}
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {t('dashboard.upcoming')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {evLoading ? <SkeletonList n={3} /> : events?.length === 0
              ? <Empty text={t('calendar.no_events')} />
              : events?.map(e => (
                <div key={e.id} className="flex items-center gap-2 py-1 border-b last:border-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${eventColors[e.event_type] ?? eventColors.event}`}>
                    {t(`calendar.event_types.${e.event_type}`)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{e.title}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {e.all_day ? format(parseISO(e.start_at), 'dd MMM') : format(parseISO(e.start_at), 'dd MMM, HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number | null; color: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-${color}-50`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value ?? '—'}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonList({ n }: { n: number }) {
  return <>{Array.from({ length: n }).map((_, i) => (
    <Skeleton key={i} className="h-10 w-full rounded" />
  ))}</>;
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-gray-400 py-3 text-center">{text}</p>;
}
