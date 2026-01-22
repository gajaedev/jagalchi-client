import { useState } from 'react';

import { NodePropertiesPanel } from '@/features/roadmap-editor/components/organisms/NodePropertiesPanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/NodePropertiesPanel',
  component: NodePropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NodePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [title, setTitle] = useState('Learn React');
  const [description, setDescription] = useState('Master React fundamentals and hooks');
  const [color, setColor] = useState('#3b82f6');

  return (
    <NodePropertiesPanel
      nodeId="node-1"
      title={title}
      description={description}
      color={color}
      onTitleChange={setTitle}
      onDescriptionChange={setDescription}
      onColorChange={setColor}
    />
  );
};

export const Default: Story = {
  args: {
    nodeId: 'node-1',
    title: 'Learn React',
    description: 'Master React fundamentals and hooks',
    color: '#3b82f6',
    onTitleChange: () => {},
    onDescriptionChange: () => {},
    onColorChange: () => {},
  },
  render: DefaultComponent,
};

const WithDeleteComponent = () => {
  const [title, setTitle] = useState('Learn TypeScript');
  const [description, setDescription] = useState('Learn type system and advanced types');
  const [color, setColor] = useState('#10b981');

  return (
    <NodePropertiesPanel
      nodeId="node-2"
      title={title}
      description={description}
      color={color}
      onTitleChange={setTitle}
      onDescriptionChange={setDescription}
      onColorChange={setColor}
      onDelete={() => alert('Delete clicked')}
    />
  );
};

export const WithDelete: Story = {
  args: {
    nodeId: 'node-2',
    title: 'Learn TypeScript',
    description: 'Learn type system and advanced types',
    color: '#10b981',
    onTitleChange: () => {},
    onDescriptionChange: () => {},
    onColorChange: () => {},
    onDelete: () => {},
  },
  render: WithDeleteComponent,
};
