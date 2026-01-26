import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';

import { JagalchiNode } from '.';

import type { JagalchiNodeData } from '../../../types/editor.types';
import type { Node } from '@xyflow/react';

const meta = {
  title: 'Roadmap-Editor/Molecules/JagalchiNode',
  component: JagalchiNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { args } = context;
      const nodes: Node[] = [
        {
          id: 'node-1',
          type: 'jagalchiNode',
          position: { x: 0, y: 0 },
          data: args.data,
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '400px', height: '200px' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={{
                  jagalchiNode: (props) => (
                    <JagalchiNode {...props} selected={args.selected ?? false} />
                  ),
                }}
                fitView
              />
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof JagalchiNode>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData: JagalchiNodeData = {
  label: 'Sample Node',
  description: 'This is a sample node',
  variant: 'white',
  resources: [],
  isLocked: false,
};

export const White: Story = {
  args: {
    id: 'node-1',
    data: defaultData,
    selected: false,
  },
};

export const Blue: Story = {
  args: {
    id: 'node-2',
    data: { ...defaultData, label: 'Blue Node', variant: 'blue' },
    selected: false,
  },
};

export const Purple: Story = {
  args: {
    id: 'node-3',
    data: { ...defaultData, label: 'Purple Node', variant: 'purple' },
    selected: false,
  },
};

export const Red: Story = {
  args: {
    id: 'node-4',
    data: { ...defaultData, label: 'Red Node', variant: 'red' },
    selected: false,
  },
};

export const Orange: Story = {
  args: {
    id: 'node-5',
    data: { ...defaultData, label: 'Orange Node', variant: 'orange' },
    selected: false,
  },
};

export const Black: Story = {
  args: {
    id: 'node-6',
    data: { ...defaultData, label: 'Black Node', variant: 'black' },
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    id: 'node-7',
    data: { ...defaultData, label: 'Selected Node' },
    selected: true,
  },
};

export const LongLabel: Story = {
  args: {
    id: 'node-8',
    data: {
      ...defaultData,
      label: 'Very Long Node Label That Should Be Truncated',
    },
    selected: false,
  },
};

export const Locked: Story = {
  args: {
    id: 'node-9',
    data: { ...defaultData, label: 'Locked Node', isLocked: true },
    selected: false,
  },
};
