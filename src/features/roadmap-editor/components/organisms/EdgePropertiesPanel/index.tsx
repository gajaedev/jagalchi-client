'use client';

import { useState } from 'react';

import { ColorPicker } from '../../atoms/ColorPicker';
import { EditorInput } from '../../atoms/EditorInput';
import { CollapseSection } from '../../molecules/CollapseSection';

interface EdgePropertiesPanelProps {
  edgeId: string;
  label?: string;
  color: string;
  strokeWidth: number;
  onLabelChange: (label: string) => void;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onDelete?: () => void;
}

export function EdgePropertiesPanel({
  edgeId,
  label = '',
  color,
  strokeWidth,
  onLabelChange,
  onColorChange,
  onStrokeWidthChange,
  onDelete,
}: EdgePropertiesPanelProps) {
  const [recentColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  return (
    <div className="w-80 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Edge Properties</h3>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Delete edge"
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
          label="Edge ID"
          value={edgeId}
          disabled
          className="bg-neutral-50"
          aria-label="Edge ID (read-only)"
        />
        <EditorInput
          label="Label"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Enter edge label (optional)"
          maxLength={50}
        />
      </CollapseSection>

      {/* Style Section */}
      <CollapseSection title="Style" defaultOpen>
        <ColorPicker
          label="Stroke Color"
          value={color}
          onChange={onColorChange}
          recentColors={recentColors}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-700" htmlFor="stroke-width">
            Stroke Width
          </label>
          <div className="flex items-center gap-2">
            <input
              id="stroke-width"
              type="range"
              min="1"
              max="8"
              step="1"
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-8 text-center text-sm text-neutral-700">{strokeWidth}px</span>
          </div>
        </div>
      </CollapseSection>
    </div>
  );
}
