import { ToolbarButton } from '@/features/roadmap-editor/components/atoms/ToolbarButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Atoms/ToolbarButton',
  component: ToolbarButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolbarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 3L17 3L17 17L3 17Z" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const MoveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3L10 17M3 10L17 10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Default: Story = {
  args: {
    icon: <SelectIcon />,
    label: 'Select tool',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    icon: <SelectIcon />,
    label: 'Select tool',
    isActive: true,
  },
};

export const Primary: Story = {
  args: {
    icon: <MoveIcon />,
    label: 'Move tool',
    variant: 'primary',
    isActive: false,
  },
};

export const PrimaryActive: Story = {
  args: {
    icon: <MoveIcon />,
    label: 'Move tool',
    variant: 'primary',
    isActive: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: <SelectIcon />,
    label: 'Disabled tool',
    isActive: false,
    disabled: true,
  },
};
