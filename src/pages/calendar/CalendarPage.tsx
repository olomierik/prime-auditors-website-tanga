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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CalendarDays, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths } from 'date-fns';
import type { CalendarEvent } from '@/types';

const eventColors: Record<string, string> = {
  exam: 'bg-red-500',
  holiday: 'bg-green-500',
  meeting: 'bg-purple-500',
  deadline: 'bg-orange-500',
  event: 'bg-blue-500',
};

const eventBadgeColors: Record<string, string> = {
  exam: 'bg-red-100 text-red-700',
  holiday: 'bg-green-100 text-green-700',
  meeting: 'bg-purple-100 text-purple-700',
  deadline: 'bg-orange-100 text-orange-700',
  event: 'bg-blue-100 text-blue-700',
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  event_type: z.enum(['event', 'exam', 'holiday', 'deadline', 'meeting']),
  start_at: z.string().min(1),
  end_at: z.string().optional(),
  all_day: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function CalendarPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const qc = useQueryClient();
  const { logAction } = useAuditLog();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const canCreate = profile?.role === 'school_admin' || profile?.role === 'teacher';

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const { data: events = [] } = useQuery({
    queryKey: ['calendar-events', profile?.school_id, format(currentMonth, 'yyyy-MM')],
    queryFn: async () => {
      const { data } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('school_id', profile!.school_id)
        .gte('start_at', monthStart.toISOString())
        .lte('start_at', monthEnd.toISOString())
        .order('start_at');
      return (data ?? []) as CalendarEvent[];
    },
    enabled: !!profile,
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { event_type: 'event', all_day: false },
  });
  const allDay = watch('all_day');

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await (supabase as any).from('calendar_events').insert({
        ...data,
        school_id: profile!.school_id,
        author_id: profile!.id,
        end_at: data.end_at || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['calendar-events'] });
      logAction('CALENDAR_EVENT_CREATED', 'calendar_event');
      setDialogOpen(false);
      reset();
    },
  });

  const dayEvents = (day: Date) => events.filter(e => isSameDay(parseISO(e.start_at), day));
  const selectedDayEvents = selectedDay ? dayEvents(selectedDay) : [];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <CalendarDays className="w-5 h-5" /> {t('calendar.title')}
        </h1>
        {canCreate && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> {t('calendar.new_event')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{t('calendar.new_event')}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(d => createMutation.mutate(d))} className="space-y-3 pt-2">
                <div>
                  <Label>{t('calendar.form.title')}</Label>
                  <Input className="mt-1" {...register('title')} />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{t('common.required')}</p>}
                </div>
                <div>
                  <Label>{t('calendar.form.type')}</Label>
                  <Select defaultValue="event" onValueChange={v => setValue('event_type', v as FormData['event_type'])}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(['event','exam','holiday','deadline','meeting'] as const).map(type => (
                        <SelectItem key={type} value={type}>{t(`calendar.event_types.${type}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="all_day" checked={allDay} onCheckedChange={v => setValue('all_day', v)} />
                  <Label htmlFor="all_day">{t('calendar.form.all_day')}</Label>
                </div>
                <div>
                  <Label>{t('calendar.form.start')}</Label>
                  <Input className="mt-1" type={allDay ? 'date' : 'datetime-local'} {...register('start_at')} />
                </div>
                {!allDay && (
                  <div>
                    <Label>{t('calendar.form.end')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
                    <Input className="mt-1" type="datetime-local" {...register('end_at')} />
                  </div>
                )}
                <div>
                  <Label>{t('calendar.form.description')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
                  <Textarea className="mt-1" rows={2} {...register('description')} />
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? t('common.loading') : t('calendar.form.submit')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(m => subMonths(m, 1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(m => addMonths(m, 1))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 mb-2">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center text-xs text-gray-400 py-1 font-medium">{d}</div>
            ))}
          </div>
          {/* Fill leading empty days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {days.map(day => {
              const dayEvts = dayEvents(day);
              const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
              const isToday = isSameDay(day, new Date());
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(isSameDay(day, selectedDay ?? new Date('1900')) ? null : day)}
                  className={`relative min-h-[2.5rem] p-1 rounded-lg text-sm transition-colors ${
                    isSelected ? 'bg-blue-100 dark:bg-blue-900/40 font-semibold' :
                    isToday ? 'ring-2 ring-blue-500' :
                    'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className={`block text-center text-xs mb-0.5 ${isToday ? 'font-bold text-blue-600' : ''}`}>
                    {format(day, 'd')}
                  </span>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {dayEvts.slice(0, 3).map(e => (
                      <span key={e.id} className={`w-1.5 h-1.5 rounded-full ${eventColors[e.event_type]}`} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected day events */}
      {selectedDay && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{format(selectedDay, 'EEEE, d MMMM yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length === 0
              ? <p className="text-sm text-gray-400">{t('calendar.no_events')}</p>
              : <div className="space-y-2">
                  {selectedDayEvents.map(e => (
                    <div key={e.id} className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 ${eventBadgeColors[e.event_type]}`}>
                        {t(`calendar.event_types.${e.event_type}`)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{e.title}</p>
                        {e.description && <p className="text-xs text-gray-500 mt-0.5">{e.description}</p>}
                        {!e.all_day && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {format(parseISO(e.start_at), 'HH:mm')}
                            {e.end_at && ` – ${format(parseISO(e.end_at), 'HH:mm')}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            }
          </CardContent>
        </Card>
      )}
    </div>
  );
}
