'use client';

import { memo, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface ContextMenuItem {
  /**
   * 메뉴 항목 ID
   */
  id: string;
  /**
   * 메뉴 항목 레이블
   */
  label: string;
  /**
   * 메뉴 항목 아이콘 (선택사항)
   */
  icon?: React.ReactNode;
  /**
   * 클릭 핸들러
   */
  onClick: () => void;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 구분선 표시 여부 (이 항목 아래에 구분선 추가)
   */
  divider?: boolean;
}

interface ContextMenuProps {
  /**
   * 메뉴 항목 리스트
   */
  items: ContextMenuItem[];
  /**
   * 메뉴 X 위치 (픽셀)
   */
  x: number;
  /**
   * 메뉴 Y 위치 (픽셀)
   */
  y: number;
  /**
   * 메뉴 닫기 핸들러
   */
  onClose: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 우클릭 컨텍스트 메뉴 컴포넌트
 *
 * 용도:
 * - 캔버스에서 노드 우클릭
 * - 노드/엣지 편집/삭제 메뉴
 */
export const ContextMenu = memo(function ContextMenu({
  items,
  x,
  y,
  onClose,
  className,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // ESC 키로 메뉴 닫기
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={cn(
        'fixed z-50 min-w-[180px] rounded-lg border border-slate-200 bg-white p-1 shadow-md',
        className,
      )}
      style={{ left: `${x}px`, top: `${y}px` }}
      role="menu"
      aria-orientation="vertical"
    >
      {items.map((item, index) => (
        <div key={item.id}>
          <button
            type="button"
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={item.disabled}
            className={cn(
              'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
              item.disabled
                ? 'cursor-not-allowed text-slate-400'
                : 'text-slate-900 hover:bg-slate-100',
            )}
            role="menuitem"
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
          {item.divider && index < items.length - 1 && (
            <div className="my-1 h-px bg-slate-200" role="separator" />
          )}
        </div>
      ))}
    </div>
  );
});
