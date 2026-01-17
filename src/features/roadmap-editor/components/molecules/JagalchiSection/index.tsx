'use client';

import { memo } from 'react';

import { NodeResizer } from '@xyflow/react';

import { EDITOR_MESSAGES } from '@/constants/messages';
import { getNodeColors } from '@/features/roadmap-editor/constants/node-colors';
import type { JagalchiSectionData } from '@/features/roadmap-editor/types/editor.types';
import { cn } from '@/lib/utils';

interface JagalchiSectionProps {
  data: JagalchiSectionData;
  selected?: boolean;
}

export const JagalchiSection = memo(function JagalchiSection({
  data,
  selected,
}: JagalchiSectionProps) {
  const state = selected ? 'focus' : 'default';
  const colors = getNodeColors(data.variant, state);
  const displayTitle = data.title || EDITOR_MESSAGES.FLOW_SECTION_DEFAULT_TITLE;

  return (
    <div className="flex min-h-[200px] min-w-[200px] flex-col items-start gap-1">
      {/* 리사이즈 핸들 - 선택 시에만 표시 */}
      <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={200}
        handleClassName="!h-3 !w-3 !rounded-sm !border-2 !border-blue-600 !bg-background"
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
          'bg-background h-full w-full rounded-lg border-2 transition-colors',
          colors.border,
        )}
      />
    </div>
  );
});
