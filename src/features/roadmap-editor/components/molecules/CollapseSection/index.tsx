'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

interface CollapseSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapseSection({
  title,
  children,
  defaultOpen = true,
  className,
}: CollapseSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border-b border-neutral-200 pb-5', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-3 flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} section`}
      >
        <span className="text-xs font-medium text-neutral-700">{title}</span>
        <svg
          className={cn('h-4 w-4 text-neutral-700 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  );
}
