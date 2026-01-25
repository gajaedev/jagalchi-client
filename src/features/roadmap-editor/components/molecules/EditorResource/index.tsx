'use client';

import { memo } from 'react';

import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface EditorResourceProps {
  /**
   * 자료 제목 또는 URL
   */
  title: string;
  /**
   * 자료 링크 URL
   */
  url: string;
  /**
   * 클릭 핸들러
   */
  onClick?: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 에디터 자료 카드 컴포넌트
 *
 * Figma 디자인 기반:
 * - Node ID: 4630:4112
 * - 텍스트 + 외부 링크 아이콘
 * - Hover 시 배경색 변경
 */
export const EditorResource = memo(function EditorResource({
  title,
  url,
  onClick,
  className,
}: EditorResourceProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 rounded-sm p-1',
        'max-w-full',
        'transition-colors hover:bg-slate-100',
        className,
      )}
      aria-label={`자료 열기: ${title}`}
    >
      <p className="flex-1 overflow-hidden text-left text-sm font-medium text-ellipsis whitespace-nowrap text-slate-900">
        {title}
      </p>
      <ArrowUpRight className="size-4 shrink-0 text-slate-600" />
    </button>
  );
});
