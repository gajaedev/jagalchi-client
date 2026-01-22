'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  recentColors?: string[];
  className?: string;
}

const DEFAULT_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
];

export function ColorPicker({
  label,
  value,
  onChange,
  recentColors = [],
  className,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative flex flex-col gap-1', className)}>
      {label && <label className="text-xs font-medium text-neutral-700">{label}</label>}

      {/* Color Preview Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:border-primary-500 focus:ring-primary-500 flex h-9 items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 focus:ring-1 focus:outline-none"
        aria-label="Pick a color"
      >
        <div
          className="h-5 w-5 rounded-full border-2 border-neutral-300"
          style={{ backgroundColor: value }}
        />
        <span className="font-mono text-sm uppercase">{value}</span>
      </button>

      {/* Color Picker Popover */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Popover */}
          <div className="bg-neutral-0 absolute top-full z-50 mt-2 w-60 rounded-lg border border-neutral-200 p-4 shadow-lg">
            {/* Custom Color Input */}
            <div className="mb-4">
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Custom Color
              </label>
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-9 w-full cursor-pointer rounded-md border border-neutral-300"
              />
            </div>

            {/* Preset Colors */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-neutral-700">
                Preset Colors
              </label>
              <div className="grid grid-cols-8 gap-2">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      onChange(color);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'h-6 w-6 rounded-md border-2 transition-transform hover:scale-110',
                      value === color ? 'border-primary-500' : 'border-neutral-300',
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Recent Colors */}
            {recentColors.length > 0 && (
              <div>
                <label className="mb-2 block text-xs font-medium text-neutral-700">
                  Recent Colors
                </label>
                <div className="flex gap-2">
                  {recentColors.map((color, index) => (
                    <button
                      key={`${color}-${index}`}
                      type="button"
                      onClick={() => {
                        onChange(color);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'h-6 w-6 rounded-md border-2 transition-transform hover:scale-110',
                        value === color ? 'border-primary-500' : 'border-neutral-300',
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={`Select recent color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
