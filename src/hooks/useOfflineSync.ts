import { useState, useEffect, useCallback, useRef } from 'react';

export const OFFLINE_QUEUE_KEY = 'sc_offline_queue';

interface QueuedAction {
  key: string;
  serializedAt: string;
}

// We store the actual functions in memory; localStorage only stores keys + metadata
// so that on reconnect we can replay the in-memory queue in order.
const inMemoryQueue: Array<{ key: string; fn: () => Promise<void> }> = [];

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const drainingRef = useRef(false);

  const drainQueue = useCallback(async () => {
    if (drainingRef.current) return;
    if (inMemoryQueue.length === 0) {
      localStorage.removeItem(OFFLINE_QUEUE_KEY);
      return;
    }
    drainingRef.current = true;
    while (inMemoryQueue.length > 0) {
      const item = inMemoryQueue[0];
      try {
        await item.fn();
        inMemoryQueue.shift();
        // Update persisted queue
        const remaining: QueuedAction[] = inMemoryQueue.map(i => ({
          key: i.key,
          serializedAt: new Date().toISOString(),
        }));
        if (remaining.length > 0) {
          localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remaining));
        } else {
          localStorage.removeItem(OFFLINE_QUEUE_KEY);
        }
      } catch (err) {
        console.warn('[useOfflineSync] Failed to drain queued action:', item.key, err);
        break; // stop draining; will retry on next online event
      }
    }
    drainingRef.current = false;
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      drainQueue();
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // If we're already online at mount and there's something queued, drain it
    if (navigator.onLine && inMemoryQueue.length > 0) {
      drainQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [drainQueue]);

  const queueAction = useCallback(
    (key: string, fn: () => Promise<void>) => {
      if (navigator.onLine) {
        // Try immediately; if it fails, queue it
        fn().catch(err => {
          console.warn('[useOfflineSync] Action failed while online, queuing:', key, err);
          inMemoryQueue.push({ key, fn });
          const persisted: QueuedAction[] = inMemoryQueue.map(i => ({
            key: i.key,
            serializedAt: new Date().toISOString(),
          }));
          localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(persisted));
        });
      } else {
        inMemoryQueue.push({ key, fn });
        const persisted: QueuedAction[] = inMemoryQueue.map(i => ({
          key: i.key,
          serializedAt: new Date().toISOString(),
        }));
        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(persisted));
      }
    },
    []
  );

  return { isOnline, queueAction };
}
