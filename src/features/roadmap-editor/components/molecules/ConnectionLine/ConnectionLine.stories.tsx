import type { Meta, StoryObj } from '@storybook/react';
import { Position } from '@xyflow/react';

import { ConnectionLine } from '.';

const meta = {
  title: 'Roadmap-Editor/Molecules/ConnectionLine',
  component: ConnectionLine,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <svg width="600" height="400" style={{ border: '1px solid #ccc' }}>
          <Story />
        </svg>
      );
    },
  ],
} satisfies Meta<typeof ConnectionLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fromX: 100,
    fromY: 100,
    toX: 400,
    toY: 300,
  },
};

export const ShortDistance: Story = {
  args: {
    fromX: 100,
    fromY: 100,
    toX: 130,
    toY: 130,
  },
};

export const LongDistance: Story = {
  args: {
    fromX: 50,
    fromY: 50,
    toX: 500,
    toY: 350,
  },
};

export const Vertical: Story = {
  args: {
    fromX: 300,
    fromY: 50,
    toX: 300,
    toY: 350,
  },
};

export const Horizontal: Story = {
  args: {
    fromX: 50,
    fromY: 200,
    toX: 550,
    toY: 200,
  },
};

export const DiagonalUpward: Story = {
  args: {
    fromX: 100,
    fromY: 300,
    toX: 400,
    toY: 100,
  },
};

export const DiagonalDownward: Story = {
  args: {
    fromX: 100,
    fromY: 100,
    toX: 400,
    toY: 300,
  },
};

export const WithCustomPositions: Story = {
  args: {
    fromX: 100,
    fromY: 100,
    toX: 400,
    toY: 300,
    fromPosition: Position.Right,
    toPosition: Position.Left,
  },
};

export const RightToLeft: Story = {
  args: {
    fromX: 400,
    fromY: 200,
    toX: 100,
    toY: 200,
    fromPosition: Position.Left,
    toPosition: Position.Right,
  },
};

export const TopToBottom: Story = {
  args: {
    fromX: 300,
    fromY: 50,
    toX: 300,
    toY: 350,
    fromPosition: Position.Bottom,
    toPosition: Position.Top,
  },
};
