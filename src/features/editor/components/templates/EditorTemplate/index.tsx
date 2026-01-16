'use client';

import { cn } from '@/lib/utils';

interface EditorTemplateProps {
  children: React.ReactNode; // Canvas
  header?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode; // Fixed right panel
}

const HEADER_HEIGHT = 56; // px

export function EditorTemplate({ children, header, toolbar, sidebar }: EditorTemplateProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Header - Fixed top */}
      {header && (
        <div className="bg-background fixed top-0 right-0 left-0 z-40 border-b">{header}</div>
      )}

      {/* Canvas + Sidebar area */}
      <div
        className={cn('absolute inset-0 flex', header && `top-[${HEADER_HEIGHT}px]`)}
        style={header ? { top: `${HEADER_HEIGHT}px` } : undefined}
      >
        {/* Canvas - Left expanding */}
        <div className="relative flex-1">{children}</div>

        {/* Sidebar - Right fixed panel */}
        {sidebar && (
          <div className="bg-background w-[320px] overflow-y-auto border-l">{sidebar}</div>
        )}
      </div>

      {/* Toolbar - Bottom center */}
      {toolbar && <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">{toolbar}</div>}
    </div>
  );
}
