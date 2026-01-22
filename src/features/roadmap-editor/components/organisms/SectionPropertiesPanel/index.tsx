'use client';

import { useState } from 'react';

import { ColorPicker } from '../../atoms/ColorPicker';
import { EditorInput } from '../../atoms/EditorInput';
import { CollapseSection } from '../../molecules/CollapseSection';

interface SectionPropertiesPanelProps {
  sectionId: string;
  title: string;
  backgroundColor: string;
  borderColor: string;
  onTitleChange: (title: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onBorderColorChange: (color: string) => void;
  onDelete?: () => void;
}

export function SectionPropertiesPanel({
  sectionId,
  title,
  backgroundColor,
  borderColor,
  onTitleChange,
  onBackgroundColorChange,
  onBorderColorChange,
  onDelete,
}: SectionPropertiesPanelProps) {
  const [recentColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  return (
    <div className="w-68 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Section Properties</h3>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Delete section"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Basic Info Section */}
      <CollapseSection title="Basic Info" defaultOpen>
        <EditorInput
          label="Section ID"
          value={sectionId}
          disabled
          className="bg-neutral-50"
          aria-label="Section ID (read-only)"
        />
        <EditorInput
          label="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter section title"
          maxLength={100}
        />
      </CollapseSection>

      {/* Style Section */}
      <CollapseSection title="Style" defaultOpen>
        <ColorPicker
          label="Background Color"
          value={backgroundColor}
          onChange={onBackgroundColorChange}
          recentColors={recentColors}
        />
        <ColorPicker
          label="Border Color"
          value={borderColor}
          onChange={onBorderColorChange}
          recentColors={recentColors}
        />
      </CollapseSection>
    </div>
  );
}
