import { useState } from 'react';

import { EdgePropertiesPanel } from '@/features/roadmap-editor/components/organisms/EdgePropertiesPanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/EdgePropertiesPanel',
  component: EdgePropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EdgePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [color, setColor] = useState('#6b7280');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [label, setLabel] = useState('');

  return (
    <EdgePropertiesPanel
      edgeId="edge-1"
      color={color}
      strokeWidth={strokeWidth}
      label={label}
      onColorChange={setColor}
      onStrokeWidthChange={setStrokeWidth}
      onLabelChange={setLabel}
    />
  );
};

export const Default: Story = {
  args: {
    edgeId: 'edge-1',
    color: '#6b7280',
    strokeWidth: 2,
    label: '',
    onColorChange: () => {},
    onStrokeWidthChange: () => {},
    onLabelChange: () => {},
  },
  render: DefaultComponent,
};

const WithLabelComponent = () => {
  const [color, setColor] = useState('#3b82f6');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [label, setLabel] = useState('Next step');

  return (
    <EdgePropertiesPanel
      edgeId="edge-2"
      color={color}
      strokeWidth={strokeWidth}
      label={label}
      onColorChange={setColor}
      onStrokeWidthChange={setStrokeWidth}
      onLabelChange={setLabel}
      onDelete={() => alert('Delete clicked')}
    />
  );
};

export const WithLabel: Story = {
  args: {
    edgeId: 'edge-2',
    color: '#3b82f6',
    strokeWidth: 3,
    label: 'Next step',
    onColorChange: () => {},
    onStrokeWidthChange: () => {},
    onLabelChange: () => {},
    onDelete: () => {},
  },
  render: WithLabelComponent,
};

const ThickEdgeComponent = () => {
  const [color, setColor] = useState('#ef4444');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [label, setLabel] = useState('Critical path');

  return (
    <EdgePropertiesPanel
      edgeId="edge-3"
      color={color}
      strokeWidth={strokeWidth}
      label={label}
      onColorChange={setColor}
      onStrokeWidthChange={setStrokeWidth}
      onLabelChange={setLabel}
      onDelete={() => alert('Delete clicked')}
    />
  );
};

export const ThickEdge: Story = {
  args: {
    edgeId: 'edge-3',
    color: '#ef4444',
    strokeWidth: 5,
    label: 'Critical path',
    onColorChange: () => {},
    onStrokeWidthChange: () => {},
    onLabelChange: () => {},
    onDelete: () => {},
  },
  render: ThickEdgeComponent,
};

const ThinEdgeComponent = () => {
  const [color, setColor] = useState('#9ca3af');
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [label, setLabel] = useState('Optional');

  return (
    <EdgePropertiesPanel
      edgeId="edge-4"
      color={color}
      strokeWidth={strokeWidth}
      label={label}
      onColorChange={setColor}
      onStrokeWidthChange={setStrokeWidth}
      onLabelChange={setLabel}
    />
  );
};

export const ThinEdge: Story = {
  args: {
    edgeId: 'edge-4',
    color: '#9ca3af',
    strokeWidth: 1,
    label: 'Optional',
    onColorChange: () => {},
    onStrokeWidthChange: () => {},
    onLabelChange: () => {},
  },
  render: ThinEdgeComponent,
};
