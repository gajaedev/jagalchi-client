import { useCallback, useEffect, useRef, useState } from 'react';

import { connectStomp, disconnectStomp, subscribeStomp, publishStomp } from '@/lib/stomp-client';
import type { MessageHandler } from '@/lib/stomp-client';

import type { StompSubscription } from '@stomp/stompjs';

interface UseStompOptions {
  /** 자동 연결 여부 (기본: true) */
  isAutoConnect?: boolean;
  /** CONNECT 헤더: X-User-ID */
  userId?: string;
  /** CONNECT 헤더: X-User-Role */
  userRole?: string;
  /** CONNECT 헤더: X-Roadmap-ID */
  roadmapId?: string;
}

interface UseStompReturn {
  isConnected: boolean;
  subscribe: (destination: string, callback: MessageHandler) => StompSubscription | null;
  publish: (destination: string, body: Record<string, unknown>) => void;
  connect: () => void;
  disconnect: () => void;
}

/**
 * STOMP WebSocket 연결 라이프사이클 관리 훅.
 * 컴포넌트 마운트 시 연결, 언마운트 시 해제.
 */
export function useStomp({
  isAutoConnect = true,
  userId,
  userRole,
  roadmapId,
}: UseStompOptions = {}): UseStompReturn {
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionsRef = useRef<StompSubscription[]>([]);

  const connect = useCallback(() => {
    connectStomp({
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
      onError: () => setIsConnected(false),
      userId,
      userRole,
      roadmapId,
    });
  }, [userId, userRole, roadmapId]);

  const disconnect = useCallback(() => {
    subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
    subscriptionsRef.current = [];
    disconnectStomp();
    setIsConnected(false);
  }, []);

  const subscribe = useCallback((destination: string, callback: MessageHandler) => {
    const sub = subscribeStomp(destination, callback);
    if (sub) {
      subscriptionsRef.current.push(sub);
    }
    return sub;
  }, []);

  const publish = useCallback((destination: string, body: Record<string, unknown>) => {
    publishStomp(destination, body);
  }, []);

  useEffect(() => {
    if (isAutoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [isAutoConnect, connect, disconnect]);

  return { isConnected, subscribe, publish, connect, disconnect };
}
