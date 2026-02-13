import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';

import { JagalchiSection } from '.';

import type { JagalchiSectionData } from '../../../types/editor.types';
import type { Node } from '@xyflow/react';

const meta = {
  title: 'Roadmap-Editor/Molecules/JagalchiSection',
  component: JagalchiSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { args } = context;
      const nodes: Node[] = [
        {
          id: 'section-1',
          type: 'jagalchiSection',
          position: { x: 0, y: 0 },
          data: args.data,
          style: { width: 400, height: 300 },
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '600px', height: '500px' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={{
                  jagalchiSection: (props) => (
                    <JagalchiSection {...props} selected={args.selected ?? false} />
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
} satisfies Meta<typeof JagalchiSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData: JagalchiSectionData = {
  title: 'Sample Section',
  variant: 'white',
  isLocked: false,
};

export const White: Story = {
  args: {
    id: 'section-1',
    data: defaultData,
    selected: false,
  },
};

export const Blue: Story = {
  args: {
    id: 'section-2',
    data: { ...defaultData, title: 'Blue Section', variant: 'blue' },
    selected: false,
  },
};

export const Purple: Story = {
  args: {
    id: 'section-3',
    data: { ...defaultData, title: 'Purple Section', variant: 'purple' },
    selected: false,
  },
};

export const Red: Story = {
  args: {
    id: 'section-4',
    data: { ...defaultData, title: 'Red Section', variant: 'red' },
    selected: false,
  },
};

export const Orange: Story = {
  args: {
    id: 'section-5',
    data: { ...defaultData, title: 'Orange Section', variant: 'orange' },
    selected: false,
  },
};

export const Black: Story = {
  args: {
    id: 'section-6',
    data: { ...defaultData, title: 'Black Section', variant: 'black' },
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    id: 'section-7',
    data: { ...defaultData, title: 'Selected Section' },
    selected: true,
  },
};

export const DefaultTitle: Story = {
  args: {
    id: 'section-8',
    data: { title: '', variant: 'white', isLocked: false },
    selected: false,
  },
};

export const LargeSize: Story = {
  args: {
    id: 'section-9',
    data: { ...defaultData, title: 'Large Section' },
    selected: false,
  },
  decorators: [
    (Story, context) => {
      const { args } = context;
      const nodes: Node[] = [
        {
          id: 'section-9',
          type: 'jagalchiSection',
          position: { x: 0, y: 0 },
          data: args.data,
          style: { width: 600, height: 400 },
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '800px', height: '600px' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={{
                  jagalchiSection: (props) => (
                    <JagalchiSection {...props} selected={args.selected ?? false} />
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
};
