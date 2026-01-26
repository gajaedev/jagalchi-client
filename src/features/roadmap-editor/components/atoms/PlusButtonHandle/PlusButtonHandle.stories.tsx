import type { Meta, StoryObj } from '@storybook/react';

import { PlusButtonHandle } from './index';

const meta = {
  title: 'Editor/Atoms/PlusButtonHandle',
  component: PlusButtonHandle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
} satisfies Meta<typeof PlusButtonHandle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    position: 'top',
    onCreateNode: () => console.log('Create node at top'),
  },
  render: (args) => (
    <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
  ),
};

export const Right: Story = {
  args: {
    position: 'right',
    onCreateNode: () => console.log('Create node at right'),
  },
  render: (args) => (
    <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
  ),
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    onCreateNode: () => console.log('Create node at bottom'),
  },
  render: (args) => (
    <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
  ),
};

export const Left: Story = {
  args: {
    position: 'left',
    onCreateNode: () => console.log('Create node at left'),
  },
  render: (args) => (
    <div className="relative flex h-[100px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle {...args} />
    </div>
  ),
};

export const AllDirections: Story = {
  args: {
    position: 'top',
    onCreateNode: () => {},
  },
  render: () => (
    <div className="relative flex h-[200px] w-[200px] items-center justify-center border border-dashed border-slate-300">
      <span className="text-slate-400">Node</span>
      <PlusButtonHandle position="top" onCreateNode={() => {}} />
      <PlusButtonHandle position="right" onCreateNode={() => {}} />
      <PlusButtonHandle position="bottom" onCreateNode={() => {}} />
      <PlusButtonHandle position="left" onCreateNode={() => {}} />
    </div>
  ),
};
