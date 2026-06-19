import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useOfflineSync } from './useOfflineSync';

export function useAuditLog() {
  const { user, profile } = useAuth();
  const { queueAction } = useOfflineSync();

  const logAction = useCallback(
    async (
      action: string,
      resourceType?: string,
      resourceId?: string,
      metadata?: Record<string, unknown>
    ): Promise<void> => {
      if (!user || !profile) return;

      const record = {
        school_id: profile.school_id,
        actor_id: user.id,
        actor_role: profile.role,
        action,
        resource_type: resourceType ?? null,
        resource_id: resourceId ?? null,
        metadata: metadata ?? null,
      };

      const key = `audit_${action}_${Date.now()}`;

      queueAction(key, async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any).from('audit_logs').insert(record);
        if (error) {
          console.error('[useAuditLog] Failed to insert audit log:', error.message);
          throw error;
        }
      });
    },
    [user, profile, queueAction]
  );

  return { logAction };
}
