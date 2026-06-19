import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Send, Plus, MessageSquare, ShieldCheck } from 'lucide-react';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import type { Profile } from '@/types';
import { cn } from '@/lib/utils';

function msgDateLabel(iso: string, t: (k: string) => string) {
  const d = parseISO(iso);
  if (isToday(d)) return t('messages.today');
  if (isYesterday(d)) return t('messages.yesterday');
  return format(d, 'dd MMM yyyy');
}

export default function MessagesPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const qc = useQueryClient();
  const { logAction } = useAuditLog();
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [msgText, setMsgText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch conversations where user is a participant
  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations', profile?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          last_read_at,
          conversations (
            id, subject, conversation_type, updated_at,
            messages (id, body, created_at, sender_id)
          )
        `)
        .eq('profile_id', profile!.id)
        .order('joined_at', { ascending: false });
      return (data ?? []).map((r: any) => ({
        ...r.conversations,
        last_read_at: r.last_read_at,
      }));
    },
    enabled: !!profile,
  });

  // Fetch messages in active conversation
  const { data: messages } = useQuery({
    queryKey: ['messages', activeConvId],
    queryFn: async () => {
      const { data } = await supabase
        .from('messages')
        .select('*, sender:profiles(id, full_name, role)')
        .eq('conversation_id', activeConvId!)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true });
      return data ?? [];
    },
    enabled: !!activeConvId,
    refetchInterval: 5000,
  });

  // Realtime subscription
  useEffect(() => {
    if (!activeConvId) return;
    const channel = supabase
      .channel(`messages-${activeConvId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        filter: `conversation_id=eq.${activeConvId}`,
      }, () => {
        qc.invalidateQueries({ queryKey: ['messages', activeConvId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activeConvId, qc]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMutation = useMutation({
    mutationFn: async (body: string) => {
      const { error } = await (supabase as any).from('messages').insert({
        conversation_id: activeConvId!,
        school_id: profile!.school_id,
        sender_id: profile!.id,
        body,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setMsgText('');
      qc.invalidateQueries({ queryKey: ['messages', activeConvId] });
      qc.invalidateQueries({ queryKey: ['conversations', profile?.id] });
      logAction('MESSAGE_SENT', 'conversation', activeConvId ?? undefined);
    },
  });

  const handleSend = () => {
    if (!msgText.trim() || !activeConvId) return;
    sendMutation.mutate(msgText.trim());
  };

  const activeConv = conversations?.find((c: any) => c.id === activeConvId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-0 md:gap-4 p-4 md:p-6 max-w-5xl mx-auto">
      {/* Sidebar */}
      <div className={cn(
        "md:w-72 flex-shrink-0 border rounded-lg overflow-hidden bg-white dark:bg-gray-900",
        activeConvId ? "hidden md:flex flex-col" : "flex flex-col w-full"
      )}>
        <div className="p-3 border-b flex items-center justify-between">
          <span className="font-semibold text-sm">{t('messages.title')}</span>
          <NewConversationDialog onCreated={(id) => { setActiveConvId(id); qc.invalidateQueries({ queryKey: ['conversations', profile?.id] }); }} />
        </div>
        <div className="flex-1 overflow-y-auto divide-y">
          {isLoading ? (
            <div className="p-3 space-y-2">
              {[1,2,3].map(i => <Skeleton key={i} className="h-14 w-full rounded" />)}
            </div>
          ) : conversations?.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              {t('messages.no_conversations')}
            </div>
          ) : conversations?.map((c: any) => {
            const lastMsg = c.messages?.[c.messages.length - 1];
            return (
              <button
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                className={cn(
                  "w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                  activeConvId === c.id && "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600"
                )}
              >
                <p className="text-sm font-medium truncate">{c.subject ?? t('messages.title')}</p>
                {lastMsg && (
                  <p className="text-xs text-gray-400 truncate mt-0.5">{lastMsg.body}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      {activeConvId ? (
        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
          <div className="p-3 border-b flex items-center gap-2">
            <button onClick={() => setActiveConvId(null)} className="md:hidden text-blue-600 text-sm">← {t('common.back')}</button>
            <span className="font-semibold text-sm flex-1">{activeConv?.subject ?? t('messages.title')}</span>
            <ShieldCheck className="w-4 h-4 text-green-500" aria-label="Scoped messaging" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages?.map((m: any) => {
              const isMe = m.sender_id === profile?.id;
              return (
                <div key={m.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                    isMe
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm"
                  )}>
                    {!isMe && (
                      <p className="text-xs font-medium mb-1 text-blue-600 dark:text-blue-400">
                        {m.sender?.full_name}
                      </p>
                    )}
                    <p className="whitespace-pre-wrap break-words">{m.body}</p>
                    <p className={cn("text-xs mt-1", isMe ? "text-blue-200" : "text-gray-400")}>
                      {format(parseISO(m.created_at), 'HH:mm')}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t flex gap-2">
            <Input
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
              placeholder={t('messages.type_message')}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!msgText.trim() || sendMutation.isPending} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 flex-col gap-2 border rounded-lg bg-white dark:bg-gray-900">
          <MessageSquare className="w-10 h-10 opacity-20" />
          <p className="text-sm">{t('messages.no_conversations')}</p>
        </div>
      )}
    </div>
  );
}

function NewConversationDialog({ onCreated }: { onCreated: (id: string) => void }) {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const { logAction } = useAuditLog();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch allowed recipients based on RBAC
  const { data: recipients } = useQuery({
    queryKey: ['msg-recipients', profile?.id, profile?.school_id],
    queryFn: async () => {
      // Get allowed roles from DB
      const { data: pairs } = await supabase
        .from('allowed_message_pairs')
        .select('to_role')
        .eq('school_id', profile!.school_id)
        .eq('from_role', profile!.role)
        .eq('enabled', true);
      const allowedRoles = (pairs ?? []).map((p: any) => p.to_role);
      if (!allowedRoles.length) return [];
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('school_id', profile!.school_id)
        .in('role', allowedRoles)
        .eq('status', 'active')
        .neq('id', profile!.id);
      return data ?? [];
    },
    enabled: !!profile && open,
  });

  const handleCreate = async () => {
    if (!recipientId || !profile) return;
    setLoading(true);
    try {
      const { data: conv } = await supabase
        .from('conversations')
        .insert({ school_id: profile.school_id, subject: subject || null })
        .select('id').single();
      if (!conv) throw new Error('Failed to create conversation');
      await (supabase as any).from('conversation_participants').insert([
        { conversation_id: conv.id, profile_id: profile.id, school_id: profile.school_id },
        { conversation_id: conv.id, profile_id: recipientId, school_id: profile.school_id },
      ]);
      logAction('CONVERSATION_CREATED', 'conversation', conv.id);
      onCreated(conv.id);
      setOpen(false);
      setSubject('');
      setRecipientId('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-7 px-2">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{t('messages.new')}</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label>{t('messages.to')}</Label>
            <Select value={recipientId} onValueChange={setRecipientId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={t('common.search')} />
              </SelectTrigger>
              <SelectContent>
                {!recipients?.length
                  ? <SelectItem value="_none" disabled>{t('messages.blocked')}</SelectItem>
                  : recipients.map((r: any) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.full_name} <span className="text-gray-400 text-xs ml-1">({t(`roles.${r.role}`)})</span>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t('messages.subject')} <span className="text-gray-400 text-xs">({t('common.optional')})</span></Label>
            <Input className="mt-1" value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <Button onClick={handleCreate} disabled={!recipientId || loading} className="w-full">
            {loading ? t('common.loading') : t('messages.new')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
