import { LoadingButton } from '@/features/roadmap-editor/components/atoms/LoadingButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Atoms/LoadingButton',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '로드맵 생성하기',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    loadingText: '생성중',
    children: '로드맵 생성하기',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '로드맵 생성하기',
  },
};
