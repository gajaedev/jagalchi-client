import { useState } from 'react';

type AlignmentType = 'left' | 'center-h' | 'right' | 'top' | 'center-v' | 'bottom';

interface UseMultiSelectionParams {
  onAlign?: (type: AlignmentType) => void;
  onSpacingChange?: (spacing: number) => void;
}

export function useMultiSelection({ onAlign, onSpacingChange }: UseMultiSelectionParams) {
  const [spacing, setSpacing] = useState('Mixed');
  const [title, setTitle] = useState('Mixed');
  const [description, setDescription] = useState('Mixed');
  const [color, setColor] = useState('#3B82F6');

  const alignmentButtons = [
    { type: 'left' as const, label: '왼쪽 정렬' },
    { type: 'center-h' as const, label: '수평 중앙' },
    { type: 'right' as const, label: '오른쪽 정렬' },
    { type: 'top' as const, label: '상단 정렬' },
    { type: 'center-v' as const, label: '수직 중앙' },
    { type: 'bottom' as const, label: '하단 정렬' },
  ];

  const handleAlign = (type: AlignmentType) => {
    onAlign?.(type);
  };

  const handleSpacingChange = (value: string) => {
    setSpacing(value);
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onSpacingChange?.(numValue);
    }
  };

  return {
    spacing,
    setSpacing: handleSpacingChange,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    alignmentButtons,
    handleAlign,
  };
}
