import type { Meta, StoryObj } from '@storybook/react';
import { MousePointer, Square, Type } from 'lucide-react';

import { ToolbarButton } from './index';

const meta = {
  title: 'Editor/Atoms/ToolbarButton',
  component: ToolbarButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolbarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: false,
    onClick: () => console.log('Select clicked'),
  },
};

export const SelectActive: Story = {
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: true,
    onClick: () => console.log('Select clicked'),
  },
};

export const Node: Story = {
  args: {
    icon: <Square size={20} />,
    label: '노드',
    isActive: false,
    onClick: () => console.log('Node clicked'),
  },
};

export const Text: Story = {
  args: {
    icon: <Type size={20} />,
    label: '텍스트',
    isActive: false,
    onClick: () => console.log('Text clicked'),
  },
};

export const ToolbarGroup: Story = {
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: true,
    onClick: () => {},
  },
  render: () => (
    <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-2">
      <ToolbarButton icon={<MousePointer size={20} />} label="선택" isActive onClick={() => {}} />
      <ToolbarButton icon={<Square size={20} />} label="노드" isActive={false} onClick={() => {}} />
      <ToolbarButton icon={<Type size={20} />} label="텍스트" isActive={false} onClick={() => {}} />
    </div>
  ),
};
