import { EditorButton } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/RoadmapEditor/Atoms/EditorButton',
  component: EditorButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 이 이름이 `-Default` 스토리로 매핑됩니다 (Figma: EditorButton-Default)
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Loading: Story = {
  args: {
    children: 'Generating...',
    isLoading: true,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};
