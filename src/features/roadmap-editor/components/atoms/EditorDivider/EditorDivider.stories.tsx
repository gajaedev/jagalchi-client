import type { Meta, StoryObj } from '@storybook/react';

import { EditorDivider } from './index';

const meta = {
  title: 'Editor/Atoms/EditorDivider',
  component: EditorDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-[200px]">
      <EditorDivider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="h-[100px]">
      <EditorDivider {...args} />
    </div>
  ),
};

export const InContent: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: () => (
    <div className="flex w-[240px] flex-col gap-4">
      <div>
        <p className="text-sm font-medium">노드 이름</p>
      </div>
      <EditorDivider orientation="horizontal" />
      <div>
        <p className="text-sm font-medium">기본 컬러</p>
      </div>
    </div>
  ),
};
