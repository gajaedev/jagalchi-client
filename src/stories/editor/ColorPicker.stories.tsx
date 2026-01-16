import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ColorPicker } from '@/features/editor/components/atoms/ColorPicker';

const meta = {
  title: 'Editor/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 ColorPicker with 5 preset colors
 */
function DefaultStory() {
  const [color, setColor] = useState('#3B82F6');

  return (
    <div className="space-y-4">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Selected:</span>
        <div className="h-8 w-8 rounded border" style={{ backgroundColor: color }} />
        <span className="font-mono text-sm">{color}</span>
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {
    value: '#3B82F6',
    onChange: () => {},
  },
  render: () => <DefaultStory />,
};

/**
 * 커스텀 색상 프리셋을 사용하는 ColorPicker
 */
function WithCustomColorsStory() {
  const [color, setColor] = useState('#FF6B6B');
  const customColors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
  ];

  return (
    <div className="space-y-4">
      <ColorPicker value={color} onChange={setColor} presetColors={customColors} />
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Selected:</span>
        <div className="h-8 w-8 rounded border" style={{ backgroundColor: color }} />
        <span className="font-mono text-sm">{color}</span>
      </div>
    </div>
  );
}

export const WithCustomColors: Story = {
  args: {
    value: '#FF6B6B',
    onChange: () => {},
  },
  render: () => <WithCustomColorsStory />,
};

/**
 * 다크 테마에서의 ColorPicker
 */
function DarkThemeStory() {
  const [color, setColor] = useState('#8B5CF6');

  return (
    <div className="space-y-4">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Selected:</span>
        <div className="h-8 w-8 rounded border" style={{ backgroundColor: color }} />
        <span className="font-mono text-sm">{color}</span>
      </div>
    </div>
  );
}

export const DarkTheme: Story = {
  args: {
    value: '#8B5CF6',
    onChange: () => {},
  },
  render: () => <DarkThemeStory />,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 3자리 HEX 코드 지원
 */
function ThreeDigitHexStory() {
  const [color, setColor] = useState('#F0F');

  return (
    <div className="space-y-4">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Selected:</span>
          <div className="h-8 w-8 rounded border" style={{ backgroundColor: color }} />
          <span className="font-mono text-sm">{color}</span>
        </div>
        <p className="text-muted-foreground text-xs">3자리 HEX 코드도 지원합니다 (예: #F0F)</p>
      </div>
    </div>
  );
}

export const ThreeDigitHex: Story = {
  args: {
    value: '#F0F',
    onChange: () => {},
  },
  render: () => <ThreeDigitHexStory />,
};
