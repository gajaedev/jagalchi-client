/* eslint-disable no-console */
import { useState } from 'react';

import { MultiSelectPanel } from '@/features/roadmap-editor/components/organisms/MultiSelectPanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/MultiSelectPanel',
  component: MultiSelectPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelectPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [items] = useState([
    { id: 'node-1', type: 'node' as const, title: 'Getting Started', color: '#3b82f6' },
    { id: 'node-2', type: 'node' as const, title: 'Advanced Topics', color: '#10b981' },
    { id: 'edge-1', type: 'edge' as const, title: 'Connect' },
  ]);

  return (
    <div className="w-[272px]">
      <MultiSelectPanel
        selectedItems={items}
        onColorChange={(color) => console.log('Color changed:', color)}
        onDelete={() => console.log('Delete all clicked')}
        onClear={() => console.log('Clear clicked')}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    selectedItems: [
      { id: 'node-1', type: 'node', title: 'Getting Started', color: '#3b82f6' },
      { id: 'node-2', type: 'node', title: 'Advanced Topics', color: '#10b981' },
      { id: 'edge-1', type: 'edge', title: 'Connect' },
    ],
    onColorChange: () => {},
    onDelete: () => {},
    onClear: () => {},
  },
  render: DefaultComponent,
};

const MixedColorsComponent = () => {
  const [items] = useState([
    { id: 'node-1', type: 'node' as const, title: 'Node 1', color: '#3b82f6' },
    { id: 'node-2', type: 'node' as const, title: 'Node 2', color: '#10b981' },
    { id: 'node-3', type: 'node' as const, title: 'Node 3', color: '#f59e0b' },
    { id: 'section-1', type: 'section' as const, title: 'Section A', color: '#ef4444' },
  ]);

  return (
    <div className="w-[272px]">
      <MultiSelectPanel
        selectedItems={items}
        onColorChange={(color) => console.log('Color changed:', color)}
        onDelete={() => console.log('Delete all clicked')}
        onClear={() => console.log('Clear clicked')}
      />
    </div>
  );
};

export const MixedColors: Story = {
  args: {
    selectedItems: [
      { id: 'node-1', type: 'node', title: 'Node 1', color: '#3b82f6' },
      { id: 'node-2', type: 'node', title: 'Node 2', color: '#10b981' },
      { id: 'node-3', type: 'node', title: 'Node 3', color: '#f59e0b' },
      { id: 'section-1', type: 'section', title: 'Section A', color: '#ef4444' },
    ],
    onColorChange: () => {},
    onDelete: () => {},
    onClear: () => {},
  },
  render: MixedColorsComponent,
};

const SameColorComponent = () => {
  const [items] = useState([
    { id: 'node-1', type: 'node' as const, title: 'Node 1', color: '#3b82f6' },
    { id: 'node-2', type: 'node' as const, title: 'Node 2', color: '#3b82f6' },
    { id: 'node-3', type: 'node' as const, title: 'Node 3', color: '#3b82f6' },
  ]);

  return (
    <div className="w-[272px]">
      <MultiSelectPanel
        selectedItems={items}
        onColorChange={(color) => console.log('Color changed:', color)}
        onDelete={() => console.log('Delete all clicked')}
        onClear={() => console.log('Clear clicked')}
      />
    </div>
  );
};

export const SameColor: Story = {
  args: {
    selectedItems: [
      { id: 'node-1', type: 'node', title: 'Node 1', color: '#3b82f6' },
      { id: 'node-2', type: 'node', title: 'Node 2', color: '#3b82f6' },
      { id: 'node-3', type: 'node', title: 'Node 3', color: '#3b82f6' },
    ],
    onColorChange: () => {},
    onDelete: () => {},
    onClear: () => {},
  },
  render: SameColorComponent,
};

const ManyItemsComponent = () => {
  const [items] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: `item-${i}`,
      type: (i % 4 === 0 ? 'node' : i % 4 === 1 ? 'edge' : i % 4 === 2 ? 'section' : 'text') as
        | 'node'
        | 'edge'
        | 'section'
        | 'text',
      title: `Item ${i + 1}`,
      color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4],
    })),
  );

  return (
    <div className="w-[272px]">
      <MultiSelectPanel
        selectedItems={items}
        onColorChange={(color) => console.log('Color changed:', color)}
        onDelete={() => console.log('Delete all clicked')}
        onClear={() => console.log('Clear clicked')}
      />
    </div>
  );
};

export const ManyItems: Story = {
  args: {
    selectedItems: Array.from({ length: 15 }, (_, i) => ({
      id: `item-${i}`,
      type: (i % 4 === 0 ? 'node' : i % 4 === 1 ? 'edge' : i % 4 === 2 ? 'section' : 'text') as
        | 'node'
        | 'edge'
        | 'section'
        | 'text',
      title: `Item ${i + 1}`,
      color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4],
    })),
    onColorChange: () => {},
    onDelete: () => {},
    onClear: () => {},
  },
  render: ManyItemsComponent,
};
