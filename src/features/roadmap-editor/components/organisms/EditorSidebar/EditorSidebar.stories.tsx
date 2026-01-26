import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { ReactNode } from 'react';

import { EditorSidebar } from '.';
import {
  nodesAtom,
  edgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
} from '../../../stores/editor-atoms';

import type { Meta, StoryObj } from '@storybook/react';
import type {
  JagalchiNodeType,
  JagalchiSectionType,
  JagalchiTextType,
} from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

// Jotai v2에서 initialValues를 사용하기 위한 wrapper
function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: Iterable<readonly [any, unknown]>;
  children: ReactNode;
}) {
  useHydrateAtoms(new Map(initialValues));
  return children;
}

const meta = {
  title: 'Features/RoadmapEditor/Organisms/EditorSidebar',
  component: EditorSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNode: JagalchiNodeType = {
  id: 'Node_1',
  type: 'jagalchi-node',
  position: { x: 0, y: 0 },
  data: {
    label: '프론트엔드 기초',
    description: 'HTML, CSS, JavaScript의 기본 개념을 학습합니다.',
    variant: 'blue',
    isLocked: false,
    resources: ['https://developer.mozilla.org/ko/docs/Learn', '', ''],
  },
};

const mockSection: JagalchiSectionType = {
  id: 'Section_1',
  type: 'jagalchi-section',
  position: { x: 0, y: 0 },
  data: {
    title: '기초 단계',
    variant: 'blue',
    isLocked: false,
  },
};

const mockText: JagalchiTextType = {
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

const mockEdge: Edge = {
  id: 'Line_1',
  source: 'node-1',
  target: 'node-2',
  style: {
    stroke: '#000000',
  },
};

export const NoSelection: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <div className="flex h-screen justify-end">
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const NodeSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [nodesAtom, [mockNode]],
            [selectedNodeIdsAtom, ['Node_1']],
          ]}
        >
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const EdgeSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [edgesAtom, [mockEdge]],
            [selectedEdgeIdsAtom, ['Line_1']],
          ]}
        >
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const SectionSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [nodesAtom, [mockSection]],
            [selectedNodeIdsAtom, ['Section_1']],
          ]}
        >
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const TextSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [nodesAtom, [mockText]],
            [selectedNodeIdsAtom, ['Text_1']],
          ]}
        >
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const MultiSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [
              nodesAtom,
              [
                { ...mockNode, id: 'node-1' },
                { ...mockNode, id: 'node-2', data: { ...mockNode.data, variant: 'purple' } },
                { ...mockNode, id: 'node-3', data: { ...mockNode.data, variant: 'red' } },
              ],
            ],
            [selectedNodeIdsAtom, ['node-1', 'node-2', 'node-3']],
          ]}
        >
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};
