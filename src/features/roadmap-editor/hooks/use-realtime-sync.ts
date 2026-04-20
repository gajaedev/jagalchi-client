import { useCallback, useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { useStomp } from '@/hooks/use-stomp';

import { handleAck, handleNack } from '../services/action-dispatcher';
import { nodesAtom, edgesAtom, remoteCursorsAtom, type RemoteCursor } from '../stores/editor-atoms';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

const isRealtimeEnabled = process.env.NEXT_PUBLIC_REALTIME_ENABLED === 'true';

interface UseRealtimeSyncOptions {
  roadmapId: string;
  userId?: string;
  userRole?: string;
  isEnabled?: boolean;
}

/**
 * 에디터 실시간 동기화 훅.
 * STOMP 이벤트를 구독하여 원격 변경사항을 로컬 atom에 반영.
 * NEXT_PUBLIC_REALTIME_ENABLED=true 일 때만 활성화.
 */
export function useRealtimeSync({
  roadmapId,
  userId,
  userRole,
  isEnabled = true,
}: UseRealtimeSyncOptions) {
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  const setRemoteCursors = useSetAtom(remoteCursorsAtom);
  const { isConnected, subscribe } = useStomp({
    isAutoConnect: isRealtimeEnabled && isEnabled,
    userId,
    userRole,
    roadmapId,
  });

  // ACK 구독 — 액션 수락 응답 처리
  const handleAckMessage = useCallback((message: { body: string }) => {
    try {
      const data = JSON.parse(message.body) as { type?: string; actionId: string; status?: string };
      handleAck(data.actionId);
    } catch {
      /* invalid JSON — skip */
    }
  }, []);

  // NACK 구독 — 액션 거부 응답 처리
  const handleNackMessage = useCallback((message: { body: string }) => {
    try {
      const data = JSON.parse(message.body) as {
        actionId: string;
        actionType: string;
        errorCode: string;
        errorMessage: string;
      };
      const { isFound, action } = handleNack(data.actionId);
      if (!isFound) return;

      // 전역 이벤트로 공지 → 앱 레이어의 토스트/Sentry/롤백 reducer 가 수신.
      // 실제 롤백 로직은 리덕스 스타일 액션 스택 도입과 함께 #226 에서 처리.
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('jagalchi:realtime-nack', {
            detail: {
              actionId: data.actionId,
              actionType: data.actionType,
              errorCode: data.errorCode,
              errorMessage: data.errorMessage,
              action,
            },
          }),
        );
      }
    } catch {
      /* invalid JSON — skip */
    }
  }, []);

  // 스냅샷 구독 — 초기 전체 상태 수신
  const handleSnapshotMessage = useCallback(
    (message: { body: string }) => {
      try {
        const snapshot = JSON.parse(message.body) as {
          type: string;
          version: number;
          roadmapId: string;
          nodes: RoadmapNode[];
          edges: Edge[];
          sections: Record<string, unknown>[];
          orphanNodeIds: number[];
        };
        if (snapshot.type !== 'SNAPSHOT') return;
        setNodes(snapshot.nodes);
        setEdges(snapshot.edges);
        // sections, orphanNodeIds 는 전용 atom 미도입 상태.
        // 섹션 실시간 동기화는 #226 실시간 협업 MVP 에서 atom 과 함께 연결.
      } catch {
        /* invalid JSON — skip */
      }
    },
    [setNodes, setEdges],
  );

  // 커서 위치 구독
  const handleCursorsMessage = useCallback(
    (message: { body: string }) => {
      try {
        const data = JSON.parse(message.body) as {
          userId: number;
          userName: string;
          x: number;
          y: number;
          timestamp: number;
          state: RemoteCursor['state'];
          targetId: string | null;
        };
        setRemoteCursors((prev) => {
          const next = new Map(prev);
          next.set(String(data.userId), {
            userName: data.userName,
            x: data.x,
            y: data.y,
            state: data.state,
          });
          return next;
        });
      } catch {
        /* invalid JSON — skip */
      }
    },
    [setRemoteCursors],
  );

  const handleCursorsHideMessage = useCallback(
    (message: { body: string }) => {
      try {
        const data = JSON.parse(message.body) as { userId: number };
        setRemoteCursors((prev) => {
          const next = new Map(prev);
          next.delete(String(data.userId));
          return next;
        });
      } catch {
        /* invalid JSON — skip */
      }
    },
    [setRemoteCursors],
  );

  // 상태 이벤트 구독 — CREATE/EDIT/DELETE 브로드캐스트
  const handleStateEvent = useCallback(
    (message: { body: string }) => {
      let event: {
        type: string;
        eventId: string;
        sequence: number;
        payload: {
          type: string;
          target: { type: string; object: string };
          state?: Record<string, unknown>;
          deletedNode?: Record<string, unknown>;
        };
      };
      try {
        event = JSON.parse(message.body);
      } catch {
        return;
      }

      const { payload } = event;
      if (!payload?.target) return;

      const targetType = payload.target.type;
      const targetId = payload.target.object;

      if (targetType === 'NODE' || targetType === 'SECTION' || targetType === 'TEXT') {
        if (payload.deletedNode) {
          // 삭제 이벤트
          setNodes((prev) => prev.filter((node) => node.id !== targetId));
        } else {
          setNodes((prev) =>
            prev.map((node) => {
              if (node.id !== targetId) return node;
              const state = payload.state as Record<string, unknown> | undefined;
              return state ? ({ ...node, ...state } as RoadmapNode) : node;
            }),
          );
        }
      } else if (targetType === 'EDGE') {
        if (payload.deletedNode) {
          setEdges((prev) => prev.filter((edge) => edge.id !== targetId));
        } else {
          setEdges((prev) =>
            prev.map((edge) => {
              if (edge.id !== targetId) return edge;
              const state = payload.state as Record<string, unknown> | undefined;
              return state ? ({ ...edge, ...state } as Edge) : edge;
            }),
          );
        }
      }
    },
    [setNodes, setEdges],
  );

  // 구독 설정
  useEffect(() => {
    if (!isConnected || !isRealtimeEnabled || !isEnabled) return;

    const ackSub = subscribe('/user/queue/ack', handleAckMessage);
    const nackSub = subscribe('/user/queue/nack', handleNackMessage);
    const snapshotSub = subscribe('/user/queue/snapshot', handleSnapshotMessage);
    const stateSub = subscribe(`/topic/roadmap/${roadmapId}/state`, handleStateEvent);
    const cursorsSub = subscribe(`/topic/roadmap/${roadmapId}/cursors`, handleCursorsMessage);
    const cursorsHideSub = subscribe(
      `/topic/roadmap/${roadmapId}/cursors/hide`,
      handleCursorsHideMessage,
    );

    return () => {
      ackSub?.unsubscribe();
      nackSub?.unsubscribe();
      snapshotSub?.unsubscribe();
      stateSub?.unsubscribe();
      cursorsSub?.unsubscribe();
      cursorsHideSub?.unsubscribe();
    };
  }, [
    isConnected,
    roadmapId,
    isEnabled,
    subscribe,
    handleAckMessage,
    handleNackMessage,
    handleSnapshotMessage,
    handleStateEvent,
    handleCursorsMessage,
    handleCursorsHideMessage,
  ]);

  return { isConnected: isRealtimeEnabled && isConnected };
}
