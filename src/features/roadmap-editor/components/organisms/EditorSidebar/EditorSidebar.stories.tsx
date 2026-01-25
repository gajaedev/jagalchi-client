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
        <div className="h-[600px] w-[240px] overflow-visible">{children}</div>
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

/**
 * 여러 섹션 선택 시 (다중 섹션 선택)
 */
export const MultipleSectionsSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['section-1', 'section-2'],
          selectedEdgeIds: [],
          nodes: [
            mockJagalchiSection,
            {
              ...mockJagalchiSection,
              id: 'section-2',
              data: { ...mockJagalchiSection.data, title: 'Backend Roadmap' },
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

/**
 * 여러 텍스트 노드 선택 시
 */
export const MultipleTextsSelected: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['text-1', 'text-2'],
          selectedEdgeIds: [],
          nodes: [
            mockJagalchiText,
            {
              ...mockJagalchiText,
              id: 'text-2',
              data: { ...mockJagalchiText.data, content: '선수 지식' },
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

/**
 * 혼합 선택: 노드 1개 + 섹션 1개 + 텍스트 1개
 */
export const MixedSelection: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['node-1', 'section-1', 'text-1'],
          selectedEdgeIds: [],
          nodes: [mockJagalchiNode, mockJagalchiSection, mockJagalchiText],
          edges: [],
        }}
      >
        <Story />
      </JotaiDecorator>
    ),
  ],
};

/**
 * 매우 긴 콘텐츠를 가진 노드 선택
 */
export const NodeWithLongContent: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['node-long'],
          selectedEdgeIds: [],
          nodes: [
            {
              id: 'node-long',
              type: 'jagalchi-node',
              position: { x: 0, y: 0 },
              data: {
                label: 'React와 TypeScript를 이용한 Advanced 패턴 학습 및 최적화 기법',
                description:
                  '이 섹션에서는 React와 TypeScript를 이용하여 대규모 애플리케이션을 구축하는 방법을 배웁니다. 고급 패턴, 성능 최적화, 메모리 관리 등의 주제를 다루며, 실제 프로젝트에 적용 가능한 실용적인 기술들을 학습합니다.',
                variant: 'blue' as const,
                isLocked: false,
                resources: ['https://react.dev', 'https://www.typescriptlang.org'],
              },
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

/**
 * 5개 이상의 리소스를 가진 노드 선택
 */
export const NodeWithManyResources: Story = {
  decorators: [
    (Story) => (
      <JotaiDecorator
        atoms={{
          selectedNodeIds: ['node-resources'],
          selectedEdgeIds: [],
          nodes: [
            {
              id: 'node-resources',
              type: 'jagalchi-node',
              position: { x: 0, y: 0 },
              data: {
                label: 'React 심화',
                description: '다양한 학습 자료를 통해 React를 깊이 있게 학습합니다',
                variant: 'purple' as const,
                isLocked: false,
                resources: [
                  'https://react.dev',
                  'https://velog.io/@example/react-advanced',
                  'https://github.com/react-patterns',
                  'https://youtube.com/watch?v=...',
                  'https://egghead.io/courses/react',
                  'https://udemy.com/course/react-complete-guide',
                ],
              },
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
