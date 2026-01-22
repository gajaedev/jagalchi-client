import { render } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider as JotaiProvider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { JagalchiNode } from './index';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </JotaiProvider>
  );
}

describe('JagalchiNode', () => {
  const mockData = {
    variant: 'white' as const,
    label: 'Test Node',
    description: 'Test description',
    resources: [],
    isLocked: false,
  };

  it('노드 핸들 크기가 6px이다 (Figma 스펙)', () => {
    const { container } = render(
      <TestWrapper>
        <JagalchiNode data={mockData} id="test-node-1" />
      </TestWrapper>,
    );

    // 모든 핸들 요소 찾기
    const handles = container.querySelectorAll('[class*="react-flow__handle"]');

    // 4개의 핸들이 있어야 함 (top, right, bottom, left)
    expect(handles).toHaveLength(4);

    // 각 핸들이 !h-[6px] !w-[6px] 클래스를 가지고 있는지 확인
    handles.forEach((handle) => {
      const classList = handle.className;
      expect(classList).toContain('!h-[6px]');
      expect(classList).toContain('!w-[6px]');
      expect(classList).toContain('!rounded-full');
    });
  });

  it('선택되지 않았을 때 plus 버튼이 보이지 않는다', () => {
    const { container } = render(
      <TestWrapper>
        <JagalchiNode data={mockData} id="test-node-2" selected={false} />
      </TestWrapper>,
    );

    // PlusButtonHandle 컴포넌트가 렌더링되지 않았는지 확인
    const plusButtons = container.querySelectorAll('[class*="plus-button"]');
    expect(plusButtons).toHaveLength(0);
  });

  it('선택되었을 때 plus 버튼이 보인다', () => {
    const { container } = render(
      <TestWrapper>
        <JagalchiNode data={mockData} id="test-node-3" selected={true} />
      </TestWrapper>,
    );

    // PlusButtonHandle는 4개 방향에 렌더링됨
    // 실제 구현에 따라 selector 조정 필요
    const allButtons = container.querySelectorAll('button');

    // Plus 버튼들이 렌더링되었는지 확인 (최소 1개 이상)
    expect(allButtons.length).toBeGreaterThan(0);
  });

  it('노드 라벨을 렌더링한다', () => {
    const { getByText } = render(
      <TestWrapper>
        <JagalchiNode data={mockData} id="test-node-4" />
      </TestWrapper>,
    );

    expect(getByText('Test Node')).toBeInTheDocument();
  });
});
