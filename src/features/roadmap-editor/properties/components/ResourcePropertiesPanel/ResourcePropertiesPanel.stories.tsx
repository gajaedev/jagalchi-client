import { Provider } from 'jotai';

import { ResourcePropertiesPanel } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/ResourcePropertiesPanel',
  component: ResourcePropertiesPanel,
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
} satisfies Meta<typeof ResourcePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseResource = {
  id: 'rsc_1',
  title: 'React 공식 문서',
  url: 'https://react.dev',
  isLocked: false,
};

// 이름 기반 매핑을 위해 `-Default`에 해당하는 스토리
export const Default: Story = {
  args: {
    resource: baseResource,
  },
};

export const Locked: Story = {
  args: {
    resource: {
      ...baseResource,
      isLocked: true,
    },
  },
};

export const Empty: Story = {
  args: {
    resource: {
      id: 'rsc_2',
      title: '',
      url: '',
      isLocked: false,
    },
  },
};
