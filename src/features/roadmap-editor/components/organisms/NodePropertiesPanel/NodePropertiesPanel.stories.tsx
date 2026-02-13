import { Provider } from 'jotai';

import { NodePropertiesPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { JagalchiNodeType } from '../../../types/editor.types';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/NodePropertiesPanel',
  component: NodePropertiesPanel,
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
} satisfies Meta<typeof NodePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseNode: JagalchiNodeType = {
  id: 'Node_1',
  type: 'jagalchi-node',
  position: { x: 0, y: 0 },
  data: {
    label: '프론트엔드 기초',
    description: 'HTML, CSS, JavaScript의 기본 개념을 학습합니다.',
    variant: 'blue',
    isLocked: false,
    resources: ['https://developer.mozilla.org/ko/docs/Learn', 'https://javascript.info/', ''],
  },
};

export const Default: Story = {
  args: {
    node: baseNode,
  },
};

export const Locked: Story = {
  args: {
    node: {
      ...baseNode,
      data: {
        ...baseNode.data,
        isLocked: true,
      },
    },
  },
};

export const Empty: Story = {
  args: {
    node: {
      id: 'Node_2',
      type: 'jagalchi-node',
      position: { x: 0, y: 0 },
      data: {
        label: '',
        description: '',
        variant: 'white',
        isLocked: false,
        resources: ['', '', ''],
      },
    },
  },
};

export const WithLongContent: Story = {
  args: {
    node: {
      ...baseNode,
      id: 'Node_3',
      data: {
        ...baseNode.data,
        label: '매우 긴 노드 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다',
        description:
          '이것은 매우 긴 설명입니다. 로드맵에서 노드의 설명이 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 목표, 주요 개념, 선수 지식 등 다양한 정보가 포함될 수 있습니다.',
        resources: [
          'https://very-long-url-example.com/documentation/getting-started/introduction',
          'https://another-long-url.com/tutorials/advanced/deep-dive',
          'https://third-resource.com/guides/best-practices',
        ],
      },
    },
  },
};

export const PurpleVariant: Story = {
  args: {
    node: {
      ...baseNode,
      id: 'Node_4',
      data: {
        ...baseNode.data,
        variant: 'purple',
      },
    },
  },
};

export const RedVariant: Story = {
  args: {
    node: {
      ...baseNode,
      id: 'Node_5',
      data: {
        ...baseNode.data,
        variant: 'red',
      },
    },
  },
};
