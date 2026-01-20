'use client';

import { memo } from 'react';

import { NodeResizer } from '@xyflow/react';
import { useSetAtom } from 'jotai';

import { EDITOR_MESSAGES } from '@/constants/messages';
import { getNodeColors } from '@/features/roadmap-editor/constants/node-colors';
import { nodesAtom } from '@/features/roadmap-editor/stores/editor-atoms';
import type {
  JagalchiSectionData,
  JagalchiSectionType,
} from '@/features/roadmap-editor/types/editor.types';
import { cn } from '@/lib/utils';

interface JagalchiSectionProps {
  id: string;
  data: JagalchiSectionData;
  selected?: boolean;
}

export const JagalchiSection = memo(function JagalchiSection({
  id,
  data,
  selected,
}: JagalchiSectionProps) {
  const setNodes = useSetAtom(nodesAtom);

  const handleResize = (_event: unknown, params: { width: number; height: number }) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? ({
              ...n,
              style: {
                ...n.style,
                width: params.width,
                height: params.height,
              },
            } as JagalchiSectionType)
          : n,
      ),
    );
  };
  const state = selected ? 'focus' : 'default';
  const colors = getNodeColors(data.variant, state);
  const displayTitle = data.title || EDITOR_MESSAGES.FLOW_SECTION_DEFAULT_TITLE;

  return (
    <div className="flex h-full w-full flex-col items-start gap-1">
      {/* 리사이즈 핸들 - 선택 시에만 표시 */}
      <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={200}
        onResize={handleResize}
        handleClassName="h-3! w-3! rounded-sm! border-2! border-blue-600! bg-background!"
      />

      {/* 타이틀 뱃지 */}
      <div
        className={cn(
          'flex items-center justify-center rounded px-2 py-1 text-sm font-medium',
          colors.badge,
        )}
      >
        {displayTitle}
      </div>

      {/* 빈 컨테이너 */}
      <div
        className={cn(
          'bg-background w-full flex-1 rounded-lg border-2 transition-colors',
          colors.border,
        )}
      />
    </div>
  );
});
