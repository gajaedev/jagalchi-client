import { useState, useEffect } from 'react';

import { HexColorPicker } from 'react-colorful';
// import 'react-colorful/dist/index.css'; // CSS file doesn't exist in package

import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  className?: string;
}

const DEFAULT_COLORS = ['#000000', '#3B82F6', '#8B5CF6', '#EF4444', '#F97316'];

export function ColorPicker({
  value,
  onChange,
  presetColors = DEFAULT_COLORS,
  className,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value);

  // Sync internal state with external value prop
  useEffect(() => {
    setCurrentColor(value);
  }, [value]);

  const handleChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange(newColor);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* 5색 프리셋 */}
      <div className="flex gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleChange(color)}
            className={cn(
              'h-8 w-8 rounded-full border-2 transition-all',
              currentColor.toLowerCase() === color.toLowerCase()
                ? 'ring-primary ring-2 ring-offset-2'
                : 'border-gray-300 hover:scale-110',
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>

      {/* 2D 그라디언트 피커 */}
      <div className="space-y-2">
        <p className="text-sm font-medium">커스텀</p>
        <HexColorPicker color={currentColor} onChange={handleChange} />
      </div>
    </div>
  );
}
