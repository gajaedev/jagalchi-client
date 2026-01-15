import { EDITOR_MESSAGES } from '@/constants/messages';
import type { FlowTextData } from '@/features/editor/types/editor.types';
import { getFlowNodeClasses } from '@/features/editor/utils';
import { cn } from '@/lib/utils';

interface FlowTextProps {
  data: FlowTextData;
  selected?: boolean;
}

/**
 * React Flow custom text component
 * Simple text label with customizable font size and weight
 * No border or connection handles
 */
export function FlowText({ data, selected }: FlowTextProps) {
  const { variant, state, content, fontSize = 14, fontWeight = 'normal' } = data;
  const textState = selected ? 'focus' : state;
  const colors = getFlowNodeClasses(variant, textState);

  const displayContent = content || EDITOR_MESSAGES.FLOW_TEXT_DEFAULT_CONTENT;

  return (
    <div
      className={cn('min-w-[80px] px-1 transition-colors', colors.text)}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight === 'bold' ? 600 : 400,
      }}
    >
      {displayContent}
    </div>
  );
}
