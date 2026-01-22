'use client';

import { useState } from 'react';

import { ColorPicker } from '../../atoms/ColorPicker';
import { CollapseSection } from '../../molecules/CollapseSection';

interface SelectedItem {
  id: string;
  type: 'node' | 'edge' | 'section' | 'text';
  title?: string;
}

interface MultiSelectPanelProps {
  selectedItems: SelectedItem[];
  onColorChange: (color: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export function MultiSelectPanel({
  selectedItems,
  onColorChange,
  onDelete,
  onClear,
}: MultiSelectPanelProps) {
  const [color, setColor] = useState('#3b82f6');
  const [recentColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onColorChange(newColor);
  };

  const nodeCount = selectedItems.filter((item) => item.type === 'node').length;
  const edgeCount = selectedItems.filter((item) => item.type === 'edge').length;
  const sectionCount = selectedItems.filter((item) => item.type === 'section').length;
  const textCount = selectedItems.filter((item) => item.type === 'text').length;

  return (
    <div className="w-80 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">
          Multi-Select ({selectedItems.length})
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
          aria-label="Clear selection"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Selection Summary */}
      <CollapseSection title="Selection Summary" defaultOpen>
        <div className="space-y-2 text-sm">
          {nodeCount > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-700">Nodes:</span>
              <span className="font-medium text-neutral-900">{nodeCount}</span>
            </div>
          )}
          {edgeCount > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-700">Edges:</span>
              <span className="font-medium text-neutral-900">{edgeCount}</span>
            </div>
          )}
          {sectionCount > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-700">Sections:</span>
              <span className="font-medium text-neutral-900">{sectionCount}</span>
            </div>
          )}
          {textCount > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-700">Texts:</span>
              <span className="font-medium text-neutral-900">{textCount}</span>
            </div>
          )}
        </div>
      </CollapseSection>

      {/* Bulk Actions */}
      <CollapseSection title="Bulk Actions" defaultOpen>
        <ColorPicker
          label="Apply Color to All"
          value={color}
          onChange={handleColorChange}
          recentColors={recentColors}
        />
        <button
          type="button"
          onClick={onDelete}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete All ({selectedItems.length})
        </button>
      </CollapseSection>

      {/* Selected Items List */}
      <CollapseSection title="Selected Items" defaultOpen={false}>
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md border border-neutral-200 p-2"
            >
              <div className="flex items-center gap-2">
                <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                  {item.type}
                </span>
                <span className="text-sm text-neutral-900">{item.title || item.id}</span>
              </div>
            </div>
          ))}
        </div>
      </CollapseSection>
    </div>
  );
}
