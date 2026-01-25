'use client';

import { memo, useState } from 'react';

import { ChevronDown, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CollapseSectionProps {
  /**
   * 섹션 제목
   */
  title: string;
  /**
   * 섹션 내용
   */
  children: React.ReactNode;
  /**
   * 기본 펼침 상태
   */
  defaultOpen?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 접기/펼치기 가능한 섹션 컴포넌트
 *
 * 용도:
 * - 노드 속성 패널의 "자료" 섹션 등
 * - 긴 콘텐츠를 숨기고 보여주기
 */
export const CollapseSection = memo(function CollapseSection({
  title,
  children,
  defaultOpen = true,
  className,
}: CollapseSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-700"
        aria-expanded={isOpen}
        aria-label={isOpen ? `${title} 섹션 접기` : `${title} 섹션 펼치기`}
      >
        {isOpen ? (
          <ChevronDown className="size-4 shrink-0 text-slate-600" />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-slate-600" />
        )}
        <span>{title}</span>
      </button>

      {/* Content */}
      {isOpen && <div className="flex flex-col gap-3 pt-2">{children}</div>}
    </div>
  );
});
