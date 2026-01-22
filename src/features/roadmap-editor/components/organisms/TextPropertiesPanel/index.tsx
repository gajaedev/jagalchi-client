'use client';

import { useState } from 'react';

import { ColorPicker } from '../../atoms/ColorPicker';
import { EditorInput } from '../../atoms/EditorInput';
import { CollapseSection } from '../../molecules/CollapseSection';

interface TextPropertiesPanelProps {
  textId: string;
  content: string;
  fontSize: number;
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  color: string;
  onContentChange: (content: string) => void;
  onFontSizeChange: (size: number) => void;
  onFontWeightChange: (weight: 'normal' | 'medium' | 'semibold' | 'bold') => void;
  onColorChange: (color: string) => void;
  onDelete?: () => void;
}

export function TextPropertiesPanel({
  textId,
  content,
  fontSize,
  fontWeight,
  color,
  onContentChange,
  onFontSizeChange,
  onFontWeightChange,
  onColorChange,
  onDelete,
}: TextPropertiesPanelProps) {
  const [recentColors] = useState<string[]>(['#111827', '#374151', '#6b7280', '#9ca3af']);

  return (
    <div className="w-68 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Text Properties</h3>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Delete text"
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
          label="Text ID"
          value={textId}
          disabled
          className="bg-neutral-50"
          aria-label="Text ID (read-only)"
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-700" htmlFor="text-content">
            Content
          </label>
          <textarea
            id="text-content"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter text content"
            maxLength={1000}
            rows={6}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-1 focus:outline-none"
          />
        </div>
      </CollapseSection>

      {/* Typography Section */}
      <CollapseSection title="Typography" defaultOpen>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-700" htmlFor="font-size">
            Font Size
          </label>
          <div className="flex items-center gap-2">
            <input
              id="font-size"
              type="range"
              min="12"
              max="48"
              step="2"
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-center text-sm text-neutral-700">{fontSize}px</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-700" htmlFor="font-weight">
            Font Weight
          </label>
          <select
            id="font-weight"
            value={fontWeight}
            onChange={(e) =>
              onFontWeightChange(e.target.value as 'normal' | 'medium' | 'semibold' | 'bold')
            }
            className="focus:border-primary-500 focus:ring-primary-500 h-9 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:ring-1 focus:outline-none"
          >
            <option value="normal">Normal (400)</option>
            <option value="medium">Medium (500)</option>
            <option value="semibold">Semibold (600)</option>
            <option value="bold">Bold (700)</option>
          </select>
        </div>
        <ColorPicker
          label="Text Color"
          value={color}
          onChange={onColorChange}
          recentColors={recentColors}
        />
      </CollapseSection>
    </div>
  );
}
