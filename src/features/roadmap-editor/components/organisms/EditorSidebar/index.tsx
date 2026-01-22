'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

interface EditorSidebarProps {
  children: React.ReactNode;
  side?: 'left' | 'right';
  defaultOpen?: boolean;
  className?: string;
}

export function EditorSidebar({
  children,
  side = 'right',
  defaultOpen = true,
  className,
}: EditorSidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-neutral-0 border-neutral-200 transition-all duration-300',
          side === 'left' ? 'border-r' : 'border-l',
          isOpen ? 'w-68' : 'w-0',
          className,
        )}
        aria-label="Editor sidebar"
        aria-hidden={!isOpen}
      >
        {isOpen && <div className="h-full overflow-y-auto p-4">{children}</div>}
      </aside>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'bg-neutral-0 focus:ring-primary-500 absolute top-1/2 z-10 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50 focus:ring-2 focus:outline-none',
          side === 'left' ? (isOpen ? 'left-68' : 'left-0') : isOpen ? 'right-68' : 'right-0',
        )}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        <svg
          className={cn(
            'h-4 w-4 text-neutral-700 transition-transform',
            side === 'left'
              ? isOpen
                ? '-rotate-90'
                : 'rotate-90'
              : isOpen
                ? 'rotate-90'
                : '-rotate-90',
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </>
  );
}
