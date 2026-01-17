'use client';

import { memo } from 'react';

import { EDITOR_MESSAGES } from '@/constants/messages';
import { getTextColor } from '@/features/roadmap-editor/constants/node-colors';
import type { JagalchiTextData } from '@/features/roadmap-editor/types/editor.types';
import { cn } from '@/lib/utils';

interface JagalchiTextProps {
  data: JagalchiTextData;
}

export const JagalchiText = memo(function JagalchiText({ data }: JagalchiTextProps) {
  const textColor = getTextColor(data.variant);
  const displayContent = data.content || EDITOR_MESSAGES.FLOW_TEXT_DEFAULT_CONTENT;

  return (
    <div
      className={cn('min-w-[80px] px-1 transition-colors', textColor)}
      style={{
        fontSize: `${data.fontSize}px`,
        fontWeight: data.fontWeight === 'bold' ? 600 : 400,
      }}
    >
      {displayContent}
    </div>
  );
});
