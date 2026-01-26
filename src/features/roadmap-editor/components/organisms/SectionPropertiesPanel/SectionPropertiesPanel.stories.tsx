import { Provider } from 'jotai';

import { SectionPropertiesPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { JagalchiSectionType } from '../../../types/editor.types';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/SectionPropertiesPanel',
  component: SectionPropertiesPanel,
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
} satisfies Meta<typeof SectionPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: JagalchiSectionType = {
  id: 'Section_1',
  type: 'jagalchi-section',
  position: { x: 0, y: 0 },
  data: {
    title: '기초 단계',
    variant: 'blue',
    isLocked: false,
  },
};

export const Default: Story = {
  args: {
    node: baseSection,
  },
};

export const Locked: Story = {
  args: {
    node: {
      ...baseSection,
      data: {
        ...baseSection.data,
        isLocked: true,
      },
    },
  },
};

export const Empty: Story = {
  args: {
    node: {
      id: 'Section_2',
      type: 'jagalchi-section',
      position: { x: 0, y: 0 },
      data: {
        title: '',
        variant: 'white',
        isLocked: false,
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    node: {
      ...baseSection,
      id: 'Section_3',
      data: {
        ...baseSection.data,
        title: '매우 긴 섹션 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다',
      },
    },
  },
};

export const PurpleVariant: Story = {
  args: {
    node: {
      ...baseSection,
      id: 'Section_4',
      data: {
        ...baseSection.data,
        title: '중급 단계',
        variant: 'purple',
      },
    },
  },
};

export const RedVariant: Story = {
  args: {
    node: {
      ...baseSection,
      id: 'Section_5',
      data: {
        ...baseSection.data,
        title: '고급 단계',
        variant: 'red',
      },
    },
  },
};

export const OrangeVariant: Story = {
  args: {
    node: {
      ...baseSection,
      id: 'Section_6',
      data: {
        ...baseSection.data,
        title: '실전 프로젝트',
        variant: 'orange',
      },
    },
  },
};
