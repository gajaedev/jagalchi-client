import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import {
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
  nodesAtom,
  edgesAtom,
} from '../../../stores/editor-atoms';

import { EditorSidebar } from './index';

import type {
  JagalchiNodeType,
  JagalchiSectionType,
  JagalchiTextType,
} from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

const mockJagalchiNode: JagalchiNodeType = {
  id: 'node-1',
  type: 'jagalchi-node',
  position: { x: 0, y: 0 },
  data: {
    label: 'React 기초',
    description: 'React의 기본 개념을 학습합니다',
    variant: 'blue',
    isLocked: false,
    resources: ['https://react.dev', 'https://velog.io/@example'],
  },
};

const mockJagalchiSection: JagalchiSectionType = {
  id: 'section-1',
  type: 'jagalchi-section',
  position: { x: 0, y: 0 },
  data: {
    title: 'Frontend Roadmap',
    variant: 'purple',
    isLocked: false,
  },
  style: {
    width: 400,
    height: 300,
  },
};

const mockJagalchiText: JagalchiTextType = {
  id: 'text-1',
  type: 'jagalchi-text',
  position: { x: 0, y: 0 },
  data: {
    content: '학습 목표',
    fontSize: 24,
    fontWeight: 'bold',
    variant: 'black',
    isLocked: false,
  },
};

const mockEdge: Edge = {
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
  label: '선행 학습',
};

interface DecoratorProps {
  children: React.ReactNode;
  atoms: {
    selectedNodeIds: string[];
    selectedEdgeIds: string[];
    nodes: any[];
    edges: any[];
  };
}

const JotaiDecorator = ({ children, atoms }: DecoratorProps) => {
  const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
    useHydrateAtoms([
      [selectedNodeIdsAtom, atoms.selectedNodeIds],
      [selectedEdgeIdsAtom, atoms.selectedEdgeIds],
      [nodesAtom, atoms.nodes],
      [edgesAtom, atoms.edges],
    ]);
    return children;
  };

  return (
    <Provider>
      <HydrateAtoms>
        <div style={{ width: '240px', height: '600px' }}>{children}</div>
      </HydrateAtoms>
    </Provider>
  );
};

const meta = {
  title: 'Editor/Organisms/EditorSidebar',
  component: EditorSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 아무것도 선택되지 않은 기본 상태
 */
export const Empty: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: [],
          selectedEdgeIds: [],
          nodes: [],
          edges: [],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};

/**
 * 일반 노드(jagalchi-node) 선택 시
 */
export const NodeSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['node-1'],
          selectedEdgeIds: [],
          nodes: [mockJagalchiNode],
          edges: [],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};

/**
 * 섹션(jagalchi-section) 선택 시
 */
export const SectionSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['section-1'],
          selectedEdgeIds: [],
          nodes: [mockJagalchiSection],
          edges: [],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};

/**
 * 텍스트(jagalchi-text) 선택 시
 */
export const TextSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['text-1'],
          selectedEdgeIds: [],
          nodes: [mockJagalchiText],
          edges: [],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};

/**
 * 엣지(연결선) 선택 시
 */
export const EdgeSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: [],
          selectedEdgeIds: ['edge-1'],
          nodes: [],
          edges: [mockEdge],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};

/**
 * 여러 노드 선택 시 (다중 선택)
 */
export const MultipleNodesSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['node-1', 'node-2'],
          selectedEdgeIds: [],
          nodes: [
            mockJagalchiNode,
            {
              ...mockJagalchiNode,
              id: 'node-2',
              data: { ...mockJagalchiNode.data, label: 'TypeScript 기초' },
            },
          ],
          edges: [],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};
