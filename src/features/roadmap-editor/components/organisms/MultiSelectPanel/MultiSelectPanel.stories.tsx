import { Provider, createStore } from 'jotai';

import { MultiSelectPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react';
import type { JagalchiNodeType, JagalchiSectionType } from '../../../types/editor.types';

import { nodesAtom, selectedNodeIdsAtom } from '../../../stores/editor-atoms';

const meta = {
  title: 'Features/RoadmapEditor/Organisms/MultiSelectPanel',
  component: MultiSelectPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelectPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample nodes for testing
const sampleNodes: Array<JagalchiNodeType | JagalchiSectionType> = [
  {
    id: 'node-1',
    type: 'jagalchi-node',
    position: { x: 100, y: 100 },
    data: {
      label: 'React 기초',
      description: 'React의 기본 개념 학습',
      variant: 'blue',
      isLocked: false,
      resources: [],
    },
  },
  {
    id: 'node-2',
    type: 'jagalchi-node',
    position: { x: 300, y: 100 },
    data: {
      label: 'TypeScript',
      description: 'TypeScript 타입 시스템',
      variant: 'purple',
      isLocked: false,
      resources: [],
    },
  },
  {
    id: 'section-1',
    type: 'jagalchi-section',
    position: { x: 100, y: 300 },
    data: {
      title: 'Frontend',
      variant: 'orange',
      isLocked: false,
    },
  },
];

function createStoryWithSelection(selectedIds: string[]) {
  const store = createStore();
  store.set(nodesAtom, sampleNodes);
  store.set(selectedNodeIdsAtom, selectedIds);

  return {
    decorators: [
      (Story: React.ComponentType) => (
        <Provider store={store}>
          <div className="h-[600px] w-[320px] border border-slate-200 bg-white">
            <Story />
          </div>
        </Provider>
      ),
    ],
  };
}

export const TwoNodesSelected: Story = {
  ...createStoryWithSelection(['node-1', 'node-2']),
};

export const ThreeItemsSelected: Story = {
  ...createStoryWithSelection(['node-1', 'node-2', 'section-1']),
};

export const SingleNodeSelected: Story = {
  ...createStoryWithSelection(['node-1']),
};

export const SingleSectionSelected: Story = {
  ...createStoryWithSelection(['section-1']),
};

export const ManyItemsSelected: Story = {
  ...createStoryWithSelection(['node-1', 'node-2', 'section-1', 'node-3', 'node-4', 'section-2']),
};
