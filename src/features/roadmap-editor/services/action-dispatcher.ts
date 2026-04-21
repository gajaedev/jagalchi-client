import { nanoid } from 'nanoid';

import { publishStomp } from '@/lib/stomp-client';

type ActionType = 'CREATE' | 'EDIT' | 'DELETE' | 'UNDO' | 'REDO';
type PayloadType = 'INFO' | 'MOVE' | 'SCALE' | 'LOCK' | 'COPY';
type TargetType = 'NODE' | 'GROUP' | 'SECTION' | 'EDGE' | 'TEXT' | 'RESOURCE';

interface ActionTarget {
  type: TargetType;
  object: string;
  tempId?: string;
  nodeId?: number;
}

interface ActionState {
  x?: number;
  y?: number;
  label?: string;
  locked?: boolean;
  metadata?: Record<string, unknown>;
}

interface ActionPayload {
  type: PayloadType;
  target: ActionTarget;
  prev?: ActionState | null;
  next?: ActionState | null;
  data?: Record<string, unknown> | null;
}

interface StompAction {
  actionId: string;
  roadmap: string;
  action: ActionType;
  payload: ActionPayload | null;
}

/** 전송 대기 중인 액션 (ACK 미수신) */
const pendingActions = new Map<string, StompAction>();
const MAX_PENDING_ACTIONS = 500;

/** 현재 사용자 정보 (SEND 헤더용) */
let currentUserId: string | null = null;
let currentUserRole: string | null = null;

/** 사용자 정보 설정 (CONNECT 후 호출) */
export function setCurrentUser(userId: string, userRole: string): void {
  currentUserId = userId;
  currentUserRole = userRole;
}

/** 액션 전송 */
export function dispatchAction(
  roadmapId: string,
  action: ActionType,
  payload: ActionPayload | null = null,
): string {
  const actionId = nanoid();

  const stompAction: StompAction = {
    actionId,
    roadmap: roadmapId,
    action,
    payload,
  };

  // 대기 큐 오버플로우 방지 — 가장 오래된 액션 제거 (NACK 롤백 불가 경고)
  if (pendingActions.size >= MAX_PENDING_ACTIONS) {
    const oldestKey = pendingActions.keys().next().value;
    if (oldestKey) {
      // eslint-disable-next-line no-console
      console.warn(
        `[action-dispatcher] pendingActions overflow: dropping actionId=${oldestKey}. ` +
          'NACK rollback for this action will be silently skipped.',
      );
      pendingActions.delete(oldestKey);
    }
  }

  pendingActions.set(actionId, stompAction);

  const headers: Record<string, string> = {};
  if (currentUserId) headers['X-User-ID'] = currentUserId;
  if (currentUserRole) headers['X-User-Role'] = currentUserRole;

  publishStomp(
    `/app/roadmap/${roadmapId}/action`,
    stompAction as unknown as Record<string, unknown>,
    headers,
  );

  return actionId;
}

/** ACK 처리 — 대기 목록에서 제거 */
export function handleAck(actionId: string): boolean {
  return pendingActions.delete(actionId);
}

/** NACK 처리 — 대기 목록에서 제거 + 에러 정보 반환 */
export function handleNack(actionId: string): {
  action: StompAction | undefined;
  isFound: boolean;
} {
  const action = pendingActions.get(actionId);
  pendingActions.delete(actionId);
  return { action, isFound: !!action };
}

/** 대기 중인 액션 수 */
export function getPendingCount(): number {
  return pendingActions.size;
}

/** 커서 위치 전송 */
export function sendCursorPosition(
  roadmapId: string,
  position: { userId: number; userName: string; x: number; y: number },
): void {
  const headers: Record<string, string> = {};
  if (currentUserId) headers['X-User-ID'] = currentUserId;

  publishStomp(
    `/app/roadmap/${roadmapId}/cursor`,
    {
      ...position,
      timestamp: Date.now(),
      state: 'NORMAL',
      targetId: null,
    },
    headers,
  );
}

/** 커서 숨기기 전송 — 사용자가 캔버스를 떠날 때 호출 */
export function sendCursorHide(roadmapId: string): void {
  const headers: Record<string, string> = {};
  if (currentUserId) headers['X-User-ID'] = currentUserId;

  publishStomp(`/app/roadmap/${roadmapId}/cursor/hide`, {}, headers);
}

export type {
  StompAction,
  ActionPayload,
  ActionState,
  ActionType,
  PayloadType,
  TargetType,
  ActionTarget,
};
