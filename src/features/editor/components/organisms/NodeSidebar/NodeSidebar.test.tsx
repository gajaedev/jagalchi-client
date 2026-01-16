import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { NodeSidebar } from './index';

vi.mock('lucide-react', () => ({
  Lock: () => <span data-testid="lock-icon" />,
  Plus: () => <span data-testid="plus-icon" />,
  X: () => <span data-testid="x-icon" />,
}));

describe('NodeSidebar', () => {
  it('기본 요소들이 렌더링된다', () => {
    render(<NodeSidebar />);

    expect(screen.getByText('Node_1')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(screen.getByLabelText('노드 이름')).toBeInTheDocument();
    expect(screen.getByLabelText('노드 설명')).toBeInTheDocument();
  });

  it('기본값이 올바르게 설정된다', () => {
    render(<NodeSidebar />);

    const titleInput = screen.getByLabelText('노드 이름') as HTMLInputElement;
    expect(titleInput.value).toBe('Node_1');

    const descriptionTextarea = screen.getByLabelText('노드 설명') as HTMLTextAreaElement;
    expect(descriptionTextarea.value).toBe('');
  });

  it('노드 이름을 변경할 수 있다', async () => {
    const user = userEvent.setup();
    render(<NodeSidebar />);

    const titleInput = screen.getByLabelText('노드 이름');
    await user.clear(titleInput);
    await user.type(titleInput, '새로운 노드');

    expect(titleInput).toHaveValue('새로운 노드');
  });

  it('노드 설명을 변경할 수 있다', async () => {
    const user = userEvent.setup();
    render(<NodeSidebar />);

    const descriptionTextarea = screen.getByLabelText('노드 설명');
    await user.type(descriptionTextarea, '새로운 설명');

    expect(descriptionTextarea).toHaveValue('새로운 설명');
  });

  it('색상 입력이 렌더링된다', () => {
    render(<NodeSidebar />);

    const colorInput = screen.getByLabelText('기본 컬러') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput.type).toBe('color');
  });

  it('자료 추가 버튼이 있다', () => {
    render(<NodeSidebar />);

    const addButton = screen.getByRole('button', { name: /자료 추가/i });
    expect(addButton).toBeInTheDocument();
  });

  it('자료를 추가할 수 있다', async () => {
    const user = userEvent.setup();
    render(<NodeSidebar />);

    // 초기 상태: 자료 없음
    expect(screen.getByText('첨부된 자료가 없습니다')).toBeInTheDocument();

    // 자료 추가 버튼 클릭
    const addButton = screen.getByRole('button', { name: /자료 추가/i });
    await user.click(addButton);

    // 자료 입력 필드 렌더링 확인
    expect(screen.queryByText('첨부된 자료가 없습니다')).not.toBeInTheDocument();
  });

  it('잠금 토글이 있다', () => {
    render(<NodeSidebar />);

    const lockSwitch = screen.getByRole('switch', { name: /잠금/i });
    expect(lockSwitch).toBeInTheDocument();
  });

  it('AI 생성 버튼이 있다', () => {
    render(<NodeSidebar />);

    const aiButton = screen.getByRole('button', { name: 'AI 생성' });
    expect(aiButton).toBeInTheDocument();
  });

  it('AI 추천 버튼이 있다', () => {
    render(<NodeSidebar />);

    const aiRecommendButton = screen.getByRole('button', { name: 'AI 추천' });
    expect(aiRecommendButton).toBeInTheDocument();
  });
});
