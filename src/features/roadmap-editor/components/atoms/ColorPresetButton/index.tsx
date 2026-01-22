'use client';

import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ColorPresetButtonProps {
  hex: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorPresetButton = memo(function ColorPresetButton({
  hex,
  label,
  isSelected,
  onClick,
}: ColorPresetButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'h-8 w-8 rounded border-2 transition-all',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
      )}
      style={{ backgroundColor: hex }}
      onClick={onClick}
      aria-label={label}
    />
  );
});
