import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const actionColors: Record<string, string> = {
  ANNOUNCEMENT_CREATED: 'bg-blue-100 text-blue-700',
  ASSIGNMENT_CREATED: 'bg-purple-100 text-purple-700',
  SUBMISSION_CREATED: 'bg-green-100 text-green-700',
  SUBMISSION_GRADED: 'bg-teal-100 text-teal-700',
  ATTENDANCE_MARKED: 'bg-orange-100 text-orange-700',
  PARENTAL_CONSENT_GRANTED: 'bg-green-100 text-green-700',
  PARENTAL_CONSENT_REVOKED: 'bg-red-100 text-red-700',
  MESSAGE_SENT: 'bg-gray-100 text-gray-700',
  STUDENT_ENROLLED: 'bg-blue-100 text-blue-700',
  BLOCKED_MESSAGE_ATTEMPT: 'bg-red-100 text-red-700',
};

export default function AuditLogPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [search, setSearch] = useState('');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['audit-logs', profile?.school_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('audit_logs')
        .select('*, actor:profiles(full_name, role)')
        .eq('school_id', profile!.school_id)
        .order('created_at', { ascending: false })
        .limit(200);
      return data ?? [];
    },
    enabled: !!profile && (profile.role === 'school_admin' || profile.role === 'super_admin'),
    refetchInterval: 30_000,
  });

  const filtered = (logs ?? []).filter((l: any) =>
    !search ||
    l.action?.toLowerCase().includes(search.toLowerCase()) ||
    l.actor?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    l.resource_type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-blue-600" />
        <h1 className="text-xl font-bold">{t('audit.title')}</h1>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input className="pl-9" placeholder={t('common.search')} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-4 space-y-2">{[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">{t('audit.no_logs')}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('audit.timestamp')}</TableHead>
                  <TableHead>{t('audit.actor')}</TableHead>
                  <TableHead>{t('audit.action')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('audit.resource')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l: any) => (
                  <TableRow key={l.id}>
                    <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                      {format(parseISO(l.created_at), 'dd MMM HH:mm:ss')}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{l.actor?.full_name ?? 'System'}</div>
                      {l.actor_role && <div className="text-xs text-gray-400">{t(`roles.${l.actor_role}`)}</div>}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${actionColors[l.action] ?? 'bg-gray-100 text-gray-600'}`}>
                        {l.action.replace(/_/g, ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-gray-400">
                      {l.resource_type && `${l.resource_type} ${l.resource_id?.slice(0, 8) ?? ''}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
