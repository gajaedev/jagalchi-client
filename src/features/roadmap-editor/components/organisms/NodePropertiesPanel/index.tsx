'use client';

import { useState } from 'react';

import { ColorPicker } from '../../atoms/ColorPicker';
import { EditorInput } from '../../atoms/EditorInput';
import { CollapseSection } from '../../molecules/CollapseSection';

interface NodePropertiesPanelProps {
  nodeId: string;
  title: string;
  description?: string;
  color: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onColorChange: (color: string) => void;
  onDelete?: () => void;
}

export function NodePropertiesPanel({
  nodeId,
  title,
  description = '',
  color,
  onTitleChange,
  onDescriptionChange,
  onColorChange,
  onDelete,
}: NodePropertiesPanelProps) {
  const [recentColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  return (
    <div className="w-68 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Node Properties</h3>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Delete node"
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
          label="Node ID"
          value={nodeId}
          disabled
          className="bg-neutral-50"
          aria-label="Node ID (read-only)"
        />
        <EditorInput
          label="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter node title"
          maxLength={100}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-700" htmlFor="node-description">
            Description
          </label>
          <textarea
            id="node-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Enter node description"
            maxLength={500}
            rows={4}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-1 focus:outline-none"
          />
        </div>
      </CollapseSection>

      {/* Style Section */}
      <CollapseSection title="Style" defaultOpen>
        <ColorPicker
          label="Background Color"
          value={color}
          onChange={onColorChange}
          recentColors={recentColors}
        />
      </CollapseSection>
    </div>
  );
}
