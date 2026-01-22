/* eslint-disable no-console */
import { useState } from 'react';

import { EdgePropertiesPanel } from '@/features/roadmap-editor/components/organisms/EdgePropertiesPanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/EdgePropertiesPanel Multi-Select',
  component: EdgePropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EdgePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const MixedPropertiesComponent = () => {
  const [selectedEdges] = useState([
    { id: 'edge-1', label: 'Step 1 → 2', color: '#3b82f6', strokeWidth: 2 },
    { id: 'edge-2', label: 'Step 2 → 3', color: '#10b981', strokeWidth: 3 },
    { id: 'edge-3', color: '#3b82f6', strokeWidth: 4 },
  ]);

  return (
    <div className="w-[272px]">
      <EdgePropertiesPanel
        isMultiSelect
        selectedEdges={selectedEdges}
        color="#3b82f6"
        strokeWidth={2}
        onBulkColorChange={(color) => console.log('Color changed:', color)}
        onBulkStrokeWidthChange={(width) => console.log('Width changed:', width)}
        onBulkDelete={() => console.log('Delete all clicked')}
      />
    </div>
  );
};

export const MixedProperties: Story = {
  args: {
    isMultiSelect: true,
    selectedEdges: [
      { id: 'edge-1', label: 'Step 1 → 2', color: '#3b82f6', strokeWidth: 2 },
      { id: 'edge-2', label: 'Step 2 → 3', color: '#10b981', strokeWidth: 3 },
      { id: 'edge-3', color: '#3b82f6', strokeWidth: 4 },
    ],
    color: '#3b82f6',
    strokeWidth: 2,
    onBulkColorChange: () => {},
    onBulkStrokeWidthChange: () => {},
    onBulkDelete: () => {},
  },
  render: MixedPropertiesComponent,
};

const SamePropertiesComponent = () => {
  const [selectedEdges] = useState([
    { id: 'edge-1', label: 'Connection 1', color: '#3b82f6', strokeWidth: 2 },
    { id: 'edge-2', label: 'Connection 2', color: '#3b82f6', strokeWidth: 2 },
    { id: 'edge-3', label: 'Connection 3', color: '#3b82f6', strokeWidth: 2 },
  ]);

  return (
    <div className="w-[272px]">
      <EdgePropertiesPanel
        isMultiSelect
        selectedEdges={selectedEdges}
        color="#3b82f6"
        strokeWidth={2}
        onBulkColorChange={(color) => console.log('Color changed:', color)}
        onBulkStrokeWidthChange={(width) => console.log('Width changed:', width)}
        onBulkDelete={() => console.log('Delete all clicked')}
      />
    </div>
  );
};

export const SameProperties: Story = {
  args: {
    isMultiSelect: true,
    selectedEdges: [
      { id: 'edge-1', label: 'Connection 1', color: '#3b82f6', strokeWidth: 2 },
      { id: 'edge-2', label: 'Connection 2', color: '#3b82f6', strokeWidth: 2 },
      { id: 'edge-3', label: 'Connection 3', color: '#3b82f6', strokeWidth: 2 },
    ],
    color: '#3b82f6',
    strokeWidth: 2,
    onBulkColorChange: () => {},
    onBulkStrokeWidthChange: () => {},
    onBulkDelete: () => {},
  },
  render: SamePropertiesComponent,
};

const ManyEdgesComponent = () => {
  const [selectedEdges] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: `edge-${i}`,
      label: i % 2 === 0 ? `Connection ${i + 1}` : undefined,
      color: ['#3b82f6', '#10b981', '#f59e0b'][i % 3],
      strokeWidth: (i % 3) + 2,
    })),
  );

  return (
    <div className="w-[272px]">
      <EdgePropertiesPanel
        isMultiSelect
        selectedEdges={selectedEdges}
        color="#3b82f6"
        strokeWidth={2}
        onBulkColorChange={(color) => console.log('Color changed:', color)}
        onBulkStrokeWidthChange={(width) => console.log('Width changed:', width)}
        onBulkDelete={() => console.log('Delete all clicked')}
      />
    </div>
  );
};

export const ManyEdges: Story = {
  args: {
    isMultiSelect: true,
    selectedEdges: Array.from({ length: 10 }, (_, i) => ({
      id: `edge-${i}`,
      label: i % 2 === 0 ? `Connection ${i + 1}` : undefined,
      color: ['#3b82f6', '#10b981', '#f59e0b'][i % 3],
      strokeWidth: (i % 3) + 2,
    })),
    color: '#3b82f6',
    strokeWidth: 2,
    onBulkColorChange: () => {},
    onBulkStrokeWidthChange: () => {},
    onBulkDelete: () => {},
  },
  render: ManyEdgesComponent,
};
