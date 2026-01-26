import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';

import { JagalchiText } from '.';

import type { JagalchiTextData } from '../../../types/editor.types';
import type { Node } from '@xyflow/react';

const meta = {
  title: 'Roadmap-Editor/Molecules/JagalchiText',
  component: JagalchiText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { args } = context;
      const nodes: Node[] = [
        {
          id: 'text-1',
          type: 'jagalchiText',
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
                  jagalchiText: (props) => <JagalchiText {...props} />,
                }}
                fitView
              />
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof JagalchiText>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData: JagalchiTextData = {
  content: 'Sample Text',
  variant: 'black',
  fontSize: 14,
  fontWeight: 'normal',
  isLocked: false,
};

export const Default: Story = {
  args: {
    data: defaultData,
  },
};

export const Gray: Story = {
  args: {
    data: { ...defaultData, content: 'Gray Text', variant: 'gray' },
  },
};

export const Blue: Story = {
  args: {
    data: { ...defaultData, content: 'Blue Text', variant: 'blue' },
  },
};

export const Purple: Story = {
  args: {
    data: { ...defaultData, content: 'Purple Text', variant: 'purple' },
  },
};

export const Red: Story = {
  args: {
    data: { ...defaultData, content: 'Red Text', variant: 'red' },
  },
};

export const Orange: Story = {
  args: {
    data: { ...defaultData, content: 'Orange Text', variant: 'orange' },
  },
};

export const Black: Story = {
  args: {
    data: { ...defaultData, content: 'Black Text', variant: 'black' },
  },
};

export const LargeFont: Story = {
  args: {
    data: { ...defaultData, content: 'Large Font Text', fontSize: 24 },
  },
};

export const SmallFont: Story = {
  args: {
    data: { ...defaultData, content: 'Small Font Text', fontSize: 10 },
  },
};

export const BoldText: Story = {
  args: {
    data: { ...defaultData, content: 'Bold Text', fontWeight: 'bold' },
  },
};

export const DefaultContent: Story = {
  args: {
    data: { variant: 'black', fontSize: 14, fontWeight: 'normal', content: '', isLocked: false },
  },
};

export const LongText: Story = {
  args: {
    data: {
      ...defaultData,
      content: 'This is a very long text that might wrap to multiple lines',
    },
  },
};
