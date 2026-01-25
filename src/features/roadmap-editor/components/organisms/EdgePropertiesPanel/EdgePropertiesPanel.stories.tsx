import { Provider } from 'jotai';

import { EdgePropertiesPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { Edge } from '@xyflow/react';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/EdgePropertiesPanel',
  component: EdgePropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <div className="h-[400px] w-[320px] border border-slate-200 bg-white">
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof EdgePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseEdge: Edge = {
  id: 'Line_1',
  source: 'node-1',
  target: 'node-2',
  data: {
    isLocked: false,
  },
  style: {
    stroke: '#000000',
    strokeWidth: 1,
  },
};

export const Default: Story = {
  args: {
    edge: baseEdge,
  },
};

export const Locked: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_2',
      data: {
        isLocked: true,
      },
    },
  },
};

export const Dashed: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_3',
      style: {
        stroke: '#000000',
        strokeWidth: 1,
        strokeDasharray: '5 5',
      },
    },
  },
};

export const ThickLine: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_4',
      style: {
        stroke: '#000000',
        strokeWidth: 3,
      },
    },
  },
};

export const BlueEdge: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_5',
      style: {
        stroke: '#155dfc',
        strokeWidth: 1,
      },
    },
  },
};

export const PurpleEdge: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_6',
      style: {
        stroke: '#9810fa',
        strokeWidth: 1,
      },
    },
  },
};

export const RedDashedThick: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_7',
      style: {
        stroke: '#ec003f',
        strokeWidth: 2,
        strokeDasharray: '5 5',
      },
    },
  },
};

export const OrangeEdge: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_8',
      style: {
        stroke: '#fe7a00',
        strokeWidth: 1,
      },
    },
  },
};
