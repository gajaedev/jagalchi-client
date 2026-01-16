import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from '@/features/editor/components/atoms/ColorPicker';

const meta = {
  title: 'Editor/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#3B82F6',
    onChange: (color) => console.log(color),
  },
};

export const CustomPresets: Story = {
  args: {
    value: '#FF6B6B',
    onChange: (color) => console.log(color),
    presetColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
  },
};

export const BlackSelected: Story = {
  args: {
    value: '#000000',
    onChange: (color) => console.log(color),
  },
};

export const PurpleSelected: Story = {
  args: {
    value: '#8B5CF6',
    onChange: (color) => console.log(color),
  },
};
