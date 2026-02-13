import { Provider } from 'jotai';

import { EdgePropertiesPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { Edge } from '@xyflow/react';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/EdgePropertiesPanel',
  component: EdgePropertiesPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <div className="flex h-screen justify-end">
          <aside className="h-full w-[272px] border-l bg-white">
            <Story />
          </aside>
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
  style: {
    stroke: '#000000',
  },
};

export const Default: Story = {
  args: {
    edge: baseEdge,
  },
};

export const Dashed: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_2',
      style: {
        stroke: '#000000',
        strokeDasharray: '5 5',
      },
    },
  },
};

export const Dotted: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_3',
      style: {
        stroke: '#000000',
        strokeDasharray: '2 2',
      },
    },
  },
};

export const BlueEdge: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_4',
      style: {
        stroke: '#155dfc',
      },
    },
  },
};

export const PurpleEdge: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_5',
      style: {
        stroke: '#9810fa',
      },
    },
  },
};

export const RedDashed: Story = {
  args: {
    edge: {
      ...baseEdge,
      id: 'Line_6',
      style: {
        stroke: '#ec003f',
        strokeDasharray: '5 5',
      },
    },
  },
};
