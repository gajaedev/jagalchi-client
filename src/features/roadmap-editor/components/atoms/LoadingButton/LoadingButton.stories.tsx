import type { Meta, StoryObj } from '@storybook/react';

import { LoadingButton } from './index';

const meta = {
  title: 'Editor/Atoms/LoadingButton',
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
    children: 'AI 추천 받기',
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    children: 'AI 추천 받기',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'AI 추천 받기',
    isLoading: false,
    disabled: true,
  },
};

export const LoadingWithLongText: Story = {
  args: {
    children: 'AI가 자료를 추천하고 있습니다...',
    isLoading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'AI 추천 받기',
    isLoading: false,
    className: 'w-full',
  },
  render: (args) => (
    <div className="w-[208px]">
      <LoadingButton {...args} />
    </div>
  ),
};
