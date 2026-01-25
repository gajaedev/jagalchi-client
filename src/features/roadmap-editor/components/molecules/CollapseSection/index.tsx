'use client';

import { memo } from 'react';

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
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 섹션 헤더 컴포넌트
 *
 * Figma 디자인 기반:
 * - Node ID: 4534:12922 (첨부 자료 섹션)
 * - 단순한 제목 + 콘텐츠
 * - 접기/펼치기 기능 없음
 */
export const CollapseSection = memo(function CollapseSection({
  title,
  children,
  className,
}: CollapseSectionProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p className="text-sm leading-[21px] font-medium tracking-[0.07px] text-slate-900">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
});
