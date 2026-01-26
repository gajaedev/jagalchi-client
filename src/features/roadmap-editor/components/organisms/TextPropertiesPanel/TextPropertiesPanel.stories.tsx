import { Provider } from 'jotai';

import { TextPropertiesPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { JagalchiTextType } from '../../../types/editor.types';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/TextPropertiesPanel',
  component: TextPropertiesPanel,
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
    fontSize: 16,
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

export const Empty: Story = {
  args: {
    node: {
      id: 'Text_2',
      type: 'jagalchi-text',
      position: { x: 0, y: 0 },
      data: {
        content: '',
        variant: 'gray',
        fontSize: 16,
        fontWeight: 'normal',
        isLocked: false,
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_3',
      data: {
        ...baseText.data,
        content:
          '이것은 매우 긴 텍스트 내용입니다. 로드맵에서 텍스트 노드가 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 가이드, 주의사항, 팁 등 다양한 정보가 포함될 수 있습니다.',
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
        content: '중요 알림',
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
        content: '추가 정보',
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
        content: '경고',
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
        content: '권장사항',
        variant: 'orange',
      },
    },
  },
};

export const GrayText: Story = {
  args: {
    node: {
      ...baseText,
      id: 'Text_8',
      data: {
        ...baseText.data,
        content: '참고',
        variant: 'gray',
      },
    },
  },
};
