'use client';

import { useReactFlow } from '@xyflow/react';
import { useAtomValue } from 'jotai';

import { remoteCursorsAtom, type RemoteCursor } from '../../../stores/editor-atoms';

type CursorState = RemoteCursor['state'];

/** userId 문자열을 해시해서 HSL 색상 반환 */
function getUserColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

/** state에 따른 커서 opacity 조정 */
function getCursorOpacity(state: CursorState): number {
  if (state === 'EDITING') return 0.6;
  return 1;
}

/** state에 따른 커서 scale */
function getCursorScale(state: CursorState): number {
  if (state === 'DRAGGING') return 1.2;
  if (state === 'SELECTING') return 1.1;
  return 1;
}

/**
 * 다른 유저의 원격 커서를 캔버스 위에 오버레이 렌더링.
 * ReactFlow viewport 좌표 → 스크린 좌표로 변환하여 절대 위치 표시.
 */
export function RemoteCursors() {
  const remoteCursors = useAtomValue(remoteCursorsAtom);
  const { flowToScreenPosition } = useReactFlow();

  if (remoteCursors.size === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from(remoteCursors.entries()).map(([userId, cursor]) => {
        const screenPos = flowToScreenPosition({ x: cursor.x, y: cursor.y });
        const color = getUserColor(userId);
        const opacity = getCursorOpacity(cursor.state);
        const scale = getCursorScale(cursor.state);

        return (
          <div
            key={userId}
            className="absolute"
            style={{
              left: screenPos.x,
              top: screenPos.y,
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              transition: 'left 50ms linear, top 50ms linear',
              zIndex: 50,
            }}
          >
            {/* 커서 화살표 아이콘 */}
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.5L0.5 16.5L4.5 12.5L7.5 19.5L9.5 18.5L6.5 11.5L12.5 11.5L0.5 0.5Z"
                fill={color}
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            {/* 유저 이름 라벨 */}
            <div
              className="-mt-1 ml-3 rounded px-1.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: color, whiteSpace: 'nowrap' }}
            >
              {cursor.userName}
            </div>
          </div>
        );
      })}
    </div>
  );
}
