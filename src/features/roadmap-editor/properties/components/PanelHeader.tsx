'use client';

import { Lock, Unlock } from 'lucide-react';

interface PanelHeaderProps {
  title: string;
  subtitle: string;
  isLocked: boolean;
  onToggleLock: () => void;
}

/**
 * PropertiesPanel용 공통 헤더 컴포넌트
 *
 * - 제목 + 부제목 표시
 * - Lock/Unlock 토글 버튼
 */
export function PanelHeader({ title, subtitle, isLocked, onToggleLock }: PanelHeaderProps) {
  return (
    <div
      className="flex items-center justify-between gap-4 border-b border-slate-200 p-4"
      data-testid="properties-panel-header"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        <p className="text-xs text-slate-950">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onToggleLock}
        className="rounded-sm p-1 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
        aria-label={isLocked ? '잠금 해제' : '잠금'}
      >
        {isLocked ? (
          <Lock className="h-[13px] w-[13px] text-slate-950" />
        ) : (
          <Unlock className="h-[13px] w-[13px] text-slate-950" />
        )}
      </button>
    </div>
  );
}
