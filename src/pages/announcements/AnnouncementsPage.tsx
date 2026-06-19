import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Pin, Megaphone, Plus, CalendarDays, User } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Announcement, Class } from '@/types';

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

// ── Schema ──────────────────────────────────────────────────────────────────

const announcementSchema = z.object({
  title: z.string().min(2).max(200),
  body: z.string().min(5),
  class_id: z.string().optional(),
  pinned: z.boolean().default(false),
  expires_at: z.string().optional(),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

// ── Helpers ──────────────────────────────────────────────────────────────────

function insertAuditLog(
  schoolId: string,
  actorId: string,
  actorRole: string,
  action: string,
  resourceId: string,
) {
  return (supabase as any).from('audit_logs').insert({
    school_id: schoolId,
    actor_id: actorId,
    actor_role: actorRole,
    action,
    resource_type: 'announcement',
    resource_id: resourceId,
  });
}

// ── Card skeleton ─────────────────────────────────────────────────────────────

function AnnouncementSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3 mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

// ── New Announcement Dialog ───────────────────────────────────────────────────

interface NewAnnouncementDialogProps {
  schoolId: string;
  authorId: string;
  authorRole: string;
  classes: Class[];
  onCreated: () => void;
}

function NewAnnouncementDialog({
  schoolId,
  authorId,
  authorRole,
  classes,
  onCreated,
}: NewAnnouncementDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: { title: '', body: '', pinned: false },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AnnouncementFormValues) => {
      const { data, error } = await supabase
        .from('announcements')
        .insert({
          school_id: schoolId,
          author_id: authorId,
          title: values.title,
          body: values.body,
          pinned: values.pinned,
          class_id: values.class_id || null,
          expires_at: values.expires_at || null,
          published_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) throw error;

      await insertAuditLog(schoolId, authorId, authorRole, 'ANNOUNCEMENT_CREATED', data.id);
      return data;
    },
    onSuccess: () => {
      toast({ title: t('announcements.created') });
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
          {t('announcements.new')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>{t('announcements.new')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((v) => mutate(v))} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('announcements.fields.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('announcements.fields.titlePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('announcements.fields.body')}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder={t('announcements.fields.bodyPlaceholder')}
                      {...field}
                    />
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
                  <FormLabel>{t('announcements.fields.audience')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('announcements.fields.audiencePlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="school_wide">{t('announcements.schoolWide')}</SelectItem>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expires_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('announcements.fields.expiresAt')}</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pinned"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">{t('announcements.fields.pinned')}</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? t('common.saving') : t('common.publish')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// ── Announcement Card ─────────────────────────────────────────────────────────

function AnnouncementCard({ ann }: { ann: Announcement }) {
  const { t } = useTranslation();

  return (
    <Card className={`w-full transition-shadow hover:shadow-md ${ann.pinned ? 'border-primary/50 bg-primary/5' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <CardTitle className="text-base font-semibold leading-snug">{ann.title}</CardTitle>
          <div className="flex gap-1 flex-shrink-0 flex-wrap">
            {ann.pinned && (
              <Badge variant="default" className="gap-1 text-xs">
                <Pin className="h-3 w-3" />
                {t('announcements.pinned')}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {ann.class ? ann.class.name : t('announcements.schoolWide')}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {ann.author?.full_name ?? t('common.unknown')}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {format(new Date(ann.published_at), 'PPP')}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{ann.body}</p>
      </CardContent>
    </Card>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AnnouncementsPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const canCreate =
    profile?.role === 'teacher' ||
    profile?.role === 'school_admin' ||
    profile?.role === 'super_admin';

  // Fetch announcements
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ['announcements', profile?.school_id],
    enabled: !!profile?.school_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*, author:profiles(*), class:classes(*)')
        .eq('school_id', profile!.school_id)
        .order('pinned', { ascending: false })
        .order('published_at', { ascending: false });

      if (error) throw error;
      return (data as unknown as Announcement[]) ?? [];
    },
  });

  // Fetch classes for the new announcement form
  const { data: classes = [] } = useQuery<Class[]>({
    queryKey: ['classes', profile?.school_id],
    enabled: !!profile?.school_id && canCreate,
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

  const refetch = () => queryClient.invalidateQueries({ queryKey: ['announcements', profile?.school_id] });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{t('announcements.title')}</h1>
          </div>
          {canCreate && profile && (
            <NewAnnouncementDialog
              schoolId={profile.school_id}
              authorId={profile.id}
              authorRole={profile.role}
              classes={classes}
              onCreated={refetch}
            />
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            <AnnouncementSkeleton />
            <AnnouncementSkeleton />
            <AnnouncementSkeleton />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && announcements?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <Megaphone className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">{t('announcements.empty.title')}</p>
            <p className="text-sm text-muted-foreground">{t('announcements.empty.description')}</p>
          </div>
        )}

        {/* List */}
        {!isLoading && announcements && announcements.length > 0 && (
          <div className="space-y-3">
            {announcements.map((ann) => (
              <AnnouncementCard key={ann.id} ann={ann} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
