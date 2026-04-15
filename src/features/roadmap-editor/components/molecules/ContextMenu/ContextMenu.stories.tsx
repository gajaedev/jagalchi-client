import type { Meta, StoryObj } from '@storybook/react';

import { ContextMenu } from './index';

const meta = {
  title: 'Features/RoadmapEditor/Molecules/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Figma 매핑을 위해 Default 로 네이밍
export const Default: Story = {
  render: (args) => <ContextMenu {...args} />,
  args: {
    children: (
      <div className="flex h-40 w-64 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
        우클릭하여 컨텍스트 메뉴를 여세요.
      </div>
    ),
    onCopy: () => alert('Copied!'),
    onPaste: () => alert('Pasted!'),
    onDuplicate: () => alert('Duplicated!'),
    onDelete: () => alert('Deleted!'),
  },
};
