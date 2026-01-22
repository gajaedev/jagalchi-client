'use client';

import { useState } from 'react';

import { ColorPicker } from '../../atoms/ColorPicker';
import { EditorInput } from '../../atoms/EditorInput';
import { CollapseSection } from '../../molecules/CollapseSection';

interface EdgeData {
  id: string;
  label?: string;
  color: string;
  strokeWidth: number;
}

interface EdgePropertiesPanelProps {
  // Single edge mode
  edgeId?: string;
  label?: string;
  color?: string;
  strokeWidth?: number;
  onLabelChange?: (label: string) => void;
  onColorChange?: (color: string) => void;
  onStrokeWidthChange?: (width: number) => void;
  onDelete?: () => void;
  // Multi-select mode
  isMultiSelect?: boolean;
  selectedEdges?: EdgeData[];
  onBulkColorChange?: (color: string) => void;
  onBulkStrokeWidthChange?: (width: number) => void;
  onBulkDelete?: () => void;
}

export function EdgePropertiesPanel({
  edgeId,
  label = '',
  color = '#3b82f6',
  strokeWidth = 2,
  onLabelChange,
  onColorChange,
  onStrokeWidthChange,
  onDelete,
  isMultiSelect = false,
  selectedEdges = [],
  onBulkColorChange,
  onBulkStrokeWidthChange,
  onBulkDelete,
}: EdgePropertiesPanelProps) {
  const [recentColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  // Mixed state detection
  const colors = selectedEdges.map((edge) => edge.color);
  const strokeWidths = selectedEdges.map((edge) => edge.strokeWidth);
  const uniqueColors = new Set(colors);
  const uniqueStrokeWidths = new Set(strokeWidths);
  const isColorMixed = uniqueColors.size > 1;
  const isStrokeWidthMixed = uniqueStrokeWidths.size > 1;

  // Multi-select mode
  if (isMultiSelect && selectedEdges.length > 0) {
    return (
      <div className="w-68 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">
            Edge Properties ({selectedEdges.length})
          </h3>
          {onBulkDelete && (
            <button
              type="button"
              onClick={onBulkDelete}
              className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
              aria-label="Delete all selected edges"
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

        {/* Bulk Edit Style */}
        <CollapseSection title="Bulk Edit Style" defaultOpen>
          <div className="space-y-3">
            {/* Color Picker with mixed state */}
            <div className="flex flex-col gap-2">
              <ColorPicker
                label={isColorMixed ? 'Stroke Color (Mixed)' : 'Stroke Color'}
                value={color}
                onChange={(newColor) => onBulkColorChange?.(newColor)}
                recentColors={recentColors}
              />
              {isColorMixed && (
                <p className="text-xs text-neutral-500">
                  Selected edges have different colors. Changing will apply to all.
                </p>
              )}
            </div>

            {/* Stroke Width with mixed state */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-neutral-700" htmlFor="bulk-stroke-width">
                {isStrokeWidthMixed ? 'Stroke Width (Mixed)' : 'Stroke Width'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="bulk-stroke-width"
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={strokeWidth}
                  onChange={(e) => onBulkStrokeWidthChange?.(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-8 text-center text-sm text-neutral-700">{strokeWidth}px</span>
              </div>
              {isStrokeWidthMixed && (
                <p className="text-xs text-neutral-500">
                  Selected edges have different stroke widths. Changing will apply to all.
                </p>
              )}
            </div>
          </div>
        </CollapseSection>

        {/* Selected Edges List */}
        <CollapseSection title="Selected Edges" defaultOpen={false}>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {selectedEdges.map((edge) => (
              <div
                key={edge.id}
                className="flex items-center justify-between rounded-md border border-neutral-200 p-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-neutral-900">{edge.id}</span>
                  {edge.label && <span className="text-xs text-neutral-700">{edge.label}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full border border-neutral-300"
                    style={{ backgroundColor: edge.color }}
                    aria-label={`Color: ${edge.color}`}
                  />
                  <span className="text-xs text-neutral-700">{edge.strokeWidth}px</span>
                </div>
              </div>
            ))}
          </div>
        </CollapseSection>
      </div>
    );
  }

  // Single edge mode
  return (
    <div className="w-68 space-y-5">
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
          onChange={(e) => onLabelChange?.(e.target.value)}
          placeholder="Enter edge label (optional)"
          maxLength={50}
        />
      </CollapseSection>

      {/* Style Section */}
      <CollapseSection title="Style" defaultOpen>
        <ColorPicker
          label="Stroke Color"
          value={color}
          onChange={(newColor) => onColorChange?.(newColor)}
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
              onChange={(e) => onStrokeWidthChange?.(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-8 text-center text-sm text-neutral-700">{strokeWidth}px</span>
          </div>
        </div>
      </CollapseSection>
    </div>
  );
}
