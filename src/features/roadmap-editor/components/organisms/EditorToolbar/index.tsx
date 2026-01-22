'use client';

import { cn } from '@/lib/utils';

import { EditorDivider } from '../../atoms/EditorDivider';
import { ToolbarButton } from '../../atoms/ToolbarButton';

interface Tool {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface EditorToolbarProps {
  tools: Tool[];
  className?: string;
}

export function EditorToolbar({ tools, className }: EditorToolbarProps) {
  // Group tools by separating them with dividers
  // Assuming tools array can have a special "divider" tool
  const renderTools = () => {
    return tools.map((tool, index) => {
      if (tool.id === 'divider') {
        return (
          <EditorDivider
            key={`divider-${index}`}
            orientation="horizontal"
            className="my-2"
            aria-label="Toolbar section divider"
          />
        );
      }

      return (
        <ToolbarButton
          key={tool.id}
          icon={tool.icon}
          label={tool.label}
          isActive={tool.isActive}
          onClick={tool.onClick}
        />
      );
    });
  };

  return (
    <aside
      className={cn(
        'bg-neutral-0 flex w-14 flex-col items-center gap-2 border-r border-neutral-200 py-4',
        className,
      )}
      role="toolbar"
      aria-label="Editor toolbar"
    >
      {renderTools()}
    </aside>
  );
}
