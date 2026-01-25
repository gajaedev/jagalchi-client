import { Provider } from 'jotai';

import { TextPropertiesPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { JagalchiTextType } from '../../../types/editor.types';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/TextPropertiesPanel',
  component: TextPropertiesPanel,
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
} satisfies Meta<typeof TextPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseText: JagalchiTextType = {
  id: 'Text_1',
  type: 'jagalchi-text',
  position: { x: 0, y: 0 },
  data: {
    content: '학습 목표',
    variant: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    isLocked: false,
  },
};

export const Default: Story = {
  args: {
    node: baseText,
  },
};

export const Locked: Story = {
  args: {
    node: {
      ...baseText,
      data: {
        ...baseText.data,
        isLocked: true,
      },
    },
  },
};

export const SmallText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_2',
      data: {
        ...baseText.data,
        fontSize: 12,
        variant: 'gray',
      },
    },
  },
};

export const LargeText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_3',
      data: {
        ...baseText.data,
        fontSize: 24,
        variant: 'blue',
      },
    },
  },
};

export const BlueText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_4',
      data: {
        ...baseText.data,
        variant: 'blue',
      },
    },
  },
};

export const PurpleText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_5',
      data: {
        ...baseText.data,
        variant: 'purple',
      },
    },
  },
};

export const RedText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_6',
      data: {
        ...baseText.data,
        variant: 'red',
      },
    },
  },
};

export const OrangeText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_7',
      data: {
        ...baseText.data,
        variant: 'orange',
      },
    },
  },
};
