import { render, screen } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

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

interface WrapperProps {
  initialValues: (readonly [WritableAtom<unknown, any[], any>, unknown])[];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: WrapperProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }: WrapperProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const mockJagalchiNode: JagalchiNodeType = {
  id: 'node-1',
  type: 'jagalchi-node',
  position: { x: 0, y: 0 },
  data: {
    label: 'Test Node',
    description: 'Test description',
    variant: 'blue',
    isLocked: false,
    resources: [],
  },
};

const mockJagalchiSection: JagalchiSectionType = {
  id: 'section-1',
  type: 'jagalchi-section',
  position: { x: 0, y: 0 },
  data: {
    title: 'Test Section',
    variant: 'blue',
    isLocked: false,
  },
};

const mockJagalchiText: JagalchiTextType = {
  id: 'text-1',
  type: 'jagalchi-text',
  position: { x: 0, y: 0 },
  data: {
    content: 'Test Text',
    fontSize: 16,
    fontWeight: 'normal',
    variant: 'black',
    isLocked: false,
  },
};

const mockEdge: Edge = {
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
  label: 'Test Edge',
};

describe('EditorSidebar', () => {
  it('renders empty state when no selection', () => {
    render(
      <TestProvider
        initialValues={[
          [selectedNodeIdsAtom, []],
          [selectedEdgeIdsAtom, []],
          [nodesAtom, []],
          [edgesAtom, []],
        ]}
      >
        <EditorSidebar />
      </TestProvider>,
    );

    expect(screen.getByText('선택된 요소가 없습니다')).toBeInTheDocument();
  });

  it('renders NodePropertiesPanel when single jagalchi-node is selected', () => {
    render(
      <TestProvider
        initialValues={[
          [selectedNodeIdsAtom, ['node-1']],
          [selectedEdgeIdsAtom, []],
          [nodesAtom, [mockJagalchiNode]],
          [edgesAtom, []],
        ]}
      >
        <EditorSidebar />
      </TestProvider>,
    );

    expect(screen.getByText('노드 이름')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Node')).toBeInTheDocument();
  });

  it('renders SectionPropertiesPanel when single jagalchi-section is selected', () => {
    render(
      <TestProvider
        initialValues={[
          [selectedNodeIdsAtom, ['section-1']],
          [selectedEdgeIdsAtom, []],
          [nodesAtom, [mockJagalchiSection]],
          [edgesAtom, []],
        ]}
      >
        <EditorSidebar />
      </TestProvider>,
    );

    expect(screen.getByText('섹션 이름')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Section')).toBeInTheDocument();
  });

  it('renders TextPropertiesPanel when single jagalchi-text is selected', () => {
    render(
      <TestProvider
        initialValues={[
          [selectedNodeIdsAtom, ['text-1']],
          [selectedEdgeIdsAtom, []],
          [nodesAtom, [mockJagalchiText]],
          [edgesAtom, []],
        ]}
      >
        <EditorSidebar />
      </TestProvider>,
    );

    expect(screen.getByText('텍스트 내용')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Text')).toBeInTheDocument();
  });

  it('renders EdgePropertiesPanel when single edge is selected', () => {
    render(
      <TestProvider
        initialValues={[
          [selectedNodeIdsAtom, []],
          [selectedEdgeIdsAtom, ['edge-1']],
          [nodesAtom, []],
          [edgesAtom, [mockEdge]],
        ]}
      >
        <EditorSidebar />
      </TestProvider>,
    );

    expect(screen.getByText('라인 스타일')).toBeInTheDocument();
  });

  it('renders MultiSelectPanel when multiple nodes are selected', () => {
    render(
      <TestProvider
        initialValues={[
          [selectedNodeIdsAtom, ['node-1', 'node-2']],
          [selectedEdgeIdsAtom, []],
          [nodesAtom, [mockJagalchiNode, { ...mockJagalchiNode, id: 'node-2' }]],
          [edgesAtom, []],
        ]}
      >
        <EditorSidebar />
      </TestProvider>,
    );

    expect(screen.getByText('다중 선택')).toBeInTheDocument();
  });
});
