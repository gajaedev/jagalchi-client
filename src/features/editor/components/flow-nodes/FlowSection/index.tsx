import { EDITOR_MESSAGES } from '@/constants/messages';
import type { FlowSectionData } from '@/features/editor/types/editor.types';
import { getFlowNodeClasses } from '@/features/editor/utils';
import { cn } from '@/lib/utils';

interface FlowSectionProps {
  data: FlowSectionData;
  selected?: boolean;
}

/**
 * React Flow custom section component
 * Container element with title badge and empty content area
 * No connection handles
 */
export function FlowSection({ data, selected }: FlowSectionProps) {
  const { variant, state, title } = data;
  const sectionState = selected ? 'focus' : state;
  const colors = getFlowNodeClasses(variant, sectionState);

  const displayTitle = title || EDITOR_MESSAGES.FLOW_SECTION_DEFAULT_TITLE;

  return (
    <div className="flex w-[200px] flex-col items-start gap-1">
      {/* Title Badge */}
      <div
        className={cn(
          'flex items-center justify-center rounded px-2 py-1 text-sm font-medium',
          colors.badge,
        )}
      >
        {displayTitle}
      </div>

      {/* Empty Container */}
      <div
        className={cn(
          'bg-background h-[200px] w-full rounded-lg border-2 transition-colors',
          colors.border,
          sectionState === 'focus' && 'relative',
        )}
      >
        {/* Focus State Corner Handles */}
        {sectionState === 'focus' && (
          <>
            <div className="bg-background absolute -top-1.5 -left-1.5 h-3 w-3 rounded-sm border-2 border-blue-600" />
            <div className="bg-background absolute -top-1.5 -right-1.5 h-3 w-3 rounded-sm border-2 border-blue-600" />
            <div className="bg-background absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-sm border-2 border-blue-600" />
            <div className="bg-background absolute -right-1.5 -bottom-1.5 h-3 w-3 rounded-sm border-2 border-blue-600" />
          </>
        )}
      </div>
    </div>
  );
}
