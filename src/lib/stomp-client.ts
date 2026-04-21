import { Client } from '@stomp/stompjs';

import { getAccessToken } from '@/api/client';

import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ??
  (process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:8082/ws/roadmap');

if (!WS_URL && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn('[stomp] NEXT_PUBLIC_WS_URL is not set. Real-time features will be disabled.');
}

let client: Client | null = null;
let isConnecting = false;
let consumerCount = 0;
let disconnectingPromise: Promise<void> | null = null;

type MessageHandler = (message: IMessage) => void;
type ErrorHandler = (frame: IFrame) => void;

interface StompClientOptions {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: ErrorHandler;
  /** CONNECT 시 전달할 사용자 정보 */
  userId?: string;
  userRole?: string;
  roadmapId?: string;
}

/** STOMP 클라이언트 싱글톤 생성/재사용 */
export function getStompClient(options?: StompClientOptions): Client {
  if (client?.connected) return client;
  if (isConnecting && client) return client;

  isConnecting = true;

  client = new Client({
    brokerURL: WS_URL,
    connectHeaders: {},
    reconnectDelay: 3000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,

    onConnect: () => {
      isConnecting = false;
      options?.onConnect?.();
    },

    onDisconnect: () => {
      isConnecting = false;
      options?.onDisconnect?.();
    },

    onStompError: (frame) => {
      isConnecting = false;
      options?.onError?.(frame);
    },

    beforeConnect: () => {
      const token = getAccessToken();
      if (client) {
        client.connectHeaders = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options?.userId ? { 'X-User-ID': options.userId } : {}),
          ...(options?.userRole ? { 'X-User-Role': options.userRole } : {}),
          ...(options?.roadmapId ? { 'X-Roadmap-ID': options.roadmapId } : {}),
        };
      }
    },
  });

  return client;
}

/** STOMP 연결 활성화 — 진행 중인 disconnect가 있으면 완료 후 연결 */
export async function connectStomp(options?: StompClientOptions): Promise<void> {
  if (disconnectingPromise) {
    await disconnectingPromise;
  }
  consumerCount++;
  const c = getStompClient(options);
  if (!c.active) {
    c.activate();
  }
}

/** STOMP 연결 해제 — 마지막 소비자가 해제할 때만 실제 disconnect */
export function disconnectStomp(): Promise<void> {
  consumerCount = Math.max(0, consumerCount - 1);
  if (consumerCount > 0) return Promise.resolve();

  disconnectingPromise = (async () => {
    if (client?.active) {
      await client.deactivate();
    }
    client = null;
    isConnecting = false;
    disconnectingPromise = null;
  })();

  return disconnectingPromise;
}

/** 토픽 구독 */
export function subscribeStomp(
  destination: string,
  callback: MessageHandler,
): StompSubscription | null {
  if (!client?.connected) return null;
  return client.subscribe(destination, callback);
}

/** 메시지 전송 (헤더 지원) */
export function publishStomp(
  destination: string,
  body: Record<string, unknown>,
  headers?: Record<string, string>,
): void {
  if (!client?.connected) return;
  client.publish({
    destination,
    headers,
    body: JSON.stringify(body),
  });
}

export type { MessageHandler, StompClientOptions };
