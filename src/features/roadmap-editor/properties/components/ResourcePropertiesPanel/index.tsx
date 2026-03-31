'use client';

import { memo } from 'react';

import { EditorInput } from '../EditorInput';
import { PanelHeader } from '../PanelHeader';

export interface ResourceData {
  id: string;
  title: string;
  url: string;
  isLocked?: boolean;
}

export interface ResourcePropertiesPanelProps {
  resource: ResourceData;
  onChange?: (changes: Partial<ResourceData>) => void;
}

/**
 * 특정 참고 자료 (Resource) 선택 시 나타나는 프로퍼티 패널
 */
export const ResourcePropertiesPanel = memo(function ResourcePropertiesPanel({
  resource,
  onChange,
}: ResourcePropertiesPanelProps) {
  const toggleLock = () => {
    onChange?.({ isLocked: !resource.isLocked });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <PanelHeader
        title={resource.title || '새 자료'}
        subtitle="참조 자료"
        isLocked={resource.isLocked || false}
        onToggleLock={toggleLock}
      />

      {/* Content */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <EditorInput
          label="자료 제목"
          value={resource.title}
          onChange={(value) => onChange?.({ title: value })}
          placeholder="자료의 관련 제목을 입력하세요"
          isDisabled={resource.isLocked}
        />

        <EditorInput
          label="URL 링크"
          value={resource.url}
          onChange={(value) => onChange?.({ url: value })}
          placeholder="https://example.com"
          isDisabled={resource.isLocked}
        />
      </div>
    </div>
  );
});
