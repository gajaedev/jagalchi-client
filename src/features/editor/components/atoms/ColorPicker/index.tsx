'use client';

import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  className?: string;
}

const DEFAULT_COLORS = [
  '#000000', // Black
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EF4444', // Red
  '#F97316', // Orange
];

/**
 * ColorPicker component with preset colors and custom HEX input
 * @param value - Current color value (HEX format)
 * @param onChange - Callback when color changes
 * @param presetColors - Custom preset colors (defaults to 5 standard colors)
 * @param className - Additional CSS classes
 */
export function ColorPicker({
  value,
  onChange,
  presetColors = DEFAULT_COLORS,
  className,
}: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handlePresetClick = (color: string) => {
    setHexInput(color);
    onChange(color);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setHexInput(input);

    // Validate HEX format
    const hexPattern = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;
    if (hexPattern.test(input)) {
      onChange(input);
    }
  };

  const handleHexBlur = () => {
    // Revert to current value if invalid
    const hexPattern = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;
    if (!hexPattern.test(hexInput)) {
      setHexInput(value);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setHexInput(color);
    onChange(color);
  };

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Preset Colors */}
      <div className="flex gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handlePresetClick(color)}
            className={cn(
              'h-8 w-8 rounded-full transition-all',
              'hover:scale-110',
              value === color && 'ring-primary ring-2 ring-offset-2',
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select ${color}`}
          />
        ))}
      </div>

      {/* HEX Input */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          onBlur={handleHexBlur}
          placeholder="#3B82F6"
          className="font-mono text-sm uppercase"
          maxLength={7}
        />
        <button
          type="button"
          onClick={openColorPicker}
          className="border-input hover:bg-accent flex h-9 w-9 shrink-0 items-center justify-center rounded border transition-colors"
          aria-label="Open color picker"
        >
          <div className="h-5 w-5 rounded" style={{ backgroundColor: value }} />
        </button>
      </div>

      {/* Hidden HTML Color Picker */}
      <input
        ref={colorInputRef}
        type="color"
        value={value}
        onChange={handleColorPickerChange}
        className="sr-only"
        aria-hidden="true"
      />
    </div>
  );
}
