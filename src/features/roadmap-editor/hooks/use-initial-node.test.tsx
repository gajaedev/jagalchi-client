import { renderHook } from '@testing-library/react';
import { useAtomValue, Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, expect, it } from 'vitest';

import { nodesAtom } from '../stores/editor-atoms';
import { useInitialNode } from './use-initial-node';

function HydrateAtoms({ initialValues, children }: any) {
  useHydrateAtoms(initialValues);
  return children;
}

function TestProvider({ initialValues, children }: any) {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
}

describe('useInitialNode', () => {
  it('빈 캔버스에 초기 노드(Node_1)를 생성한다', () => {
    const { result } = renderHook(
      () => {
        useInitialNode();
        return useAtomValue(nodesAtom);
      },
      {
        wrapper: ({ children }) => (
          <TestProvider initialValues={[[nodesAtom, []]]}>{children}</TestProvider>
        ),
      },
    );

    // 초기 노드가 생성되었는지 확인
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toMatchObject({
      type: 'jagalchi-node',
      position: { x: 250, y: 250 },
      data: {
        label: 'Node_1',
        variant: 'white',
        isLocked: false,
      },
    });
  });

  it('이미 노드가 있으면 초기 노드를 생성하지 않는다', () => {
    const existingNodes = [
      {
        id: 'existing-node',
        type: 'jagalchi-node',
        position: { x: 100, y: 100 },
        data: {
          label: 'Existing Node',
          variant: 'white' as const,
          description: '',
          resources: [],
          isLocked: false,
        },
      },
    ];

    const { result } = renderHook(
      () => {
        useInitialNode();
        return useAtomValue(nodesAtom);
      },
      {
        wrapper: ({ children }) => (
          <TestProvider initialValues={[[nodesAtom, existingNodes]]}>{children}</TestProvider>
        ),
      },
    );

    // 기존 노드만 있고 새 노드가 추가되지 않았는지 확인
    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe('existing-node');
  });
});
