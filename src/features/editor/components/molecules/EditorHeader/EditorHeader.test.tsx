import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { EditorHeader } from './index';

vi.mock('lucide-react', () => ({
  ArrowLeft: () => <span data-testid="arrow-left-icon" />,
  Check: () => <span data-testid="check-icon" />,
  AlertCircle: () => <span data-testid="alert-circle-icon" />,
}));

describe('EditorHeader', () => {
  it('기본 title이 렌더링된다', () => {
    render(<EditorHeader title="테스트 로드맵" status="default" />);
    expect(screen.getByText('테스트 로드맵')).toBeInTheDocument();
  });

  it('title이 없으면 기본 텍스트를 표시한다', () => {
    render(<EditorHeader status="default" />);
    expect(screen.getByText('로드맵 제목')).toBeInTheDocument();
  });

  it('onTitleChange가 제공되면 편집 가능한 input이 렌더링된다', () => {
    render(<EditorHeader title="테스트 로드맵" status="default" onTitleChange={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('테스트 로드맵');
    expect(input).toHaveAttribute('placeholder', '로드맵 제목');
  });

  it('onTitleChange가 없으면 정적 heading이 렌더링된다', () => {
    render(<EditorHeader title="테스트 로드맵" status="default" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('테스트 로드맵');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('title input 변경 시 onTitleChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleTitleChange = vi.fn();

    render(<EditorHeader title="" status="default" onTitleChange={handleTitleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '새 제목');

    expect(handleTitleChange).toHaveBeenCalled();
    expect(handleTitleChange).toHaveBeenCalledWith('새 제목');
  });

  it('onBack이 제공되면 뒤로 가기 버튼이 렌더링된다', () => {
    render(<EditorHeader title="테스트" status="default" onBack={vi.fn()} />);

    expect(screen.getByRole('button', { name: '뒤로 가기' })).toBeInTheDocument();
  });

  it('onBack이 없으면 뒤로 가기 버튼이 렌더링되지 않는다', () => {
    render(<EditorHeader title="테스트" status="default" />);

    expect(screen.queryByRole('button', { name: '뒤로 가기' })).not.toBeInTheDocument();
  });

  it('뒤로 가기 버튼 클릭 시 onBack을 호출한다', async () => {
    const user = userEvent.setup();
    const handleBack = vi.fn();

    render(<EditorHeader title="테스트" status="default" onBack={handleBack} />);

    const backButton = screen.getByRole('button', { name: '뒤로 가기' });
    await user.click(backButton);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('saved 상태 인디케이터를 표시한다', () => {
    render(<EditorHeader title="테스트" status="saved" />);

    expect(screen.getByText('(저장됨)')).toBeInTheDocument();
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('failed 상태 인디케이터를 표시한다', () => {
    render(<EditorHeader title="테스트" status="failed" />);

    expect(screen.getByText('(저장 실패)')).toBeInTheDocument();
    expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
  });

  it('default 상태일 때 인디케이터를 표시하지 않는다', () => {
    render(<EditorHeader title="테스트" status="default" />);

    expect(screen.queryByText('(저장됨)')).not.toBeInTheDocument();
    expect(screen.queryByText('(저장 실패)')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('상태 인디케이터가 적절한 접근성 속성을 갖는다', () => {
    const { rerender } = render(<EditorHeader title="테스트" status="saved" />);

    let statusElement = screen.getByRole('status');
    expect(statusElement).toHaveAttribute('aria-live', 'polite');
    expect(statusElement).toHaveClass('text-green-600');

    rerender(<EditorHeader title="테스트" status="failed" />);

    statusElement = screen.getByRole('status');
    expect(statusElement).toHaveAttribute('aria-live', 'polite');
    expect(statusElement).toHaveClass('text-destructive');
  });

  it('상태가 변경될 때 올바르게 업데이트된다', () => {
    const { rerender } = render(<EditorHeader title="테스트" status="default" />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    rerender(<EditorHeader title="테스트" status="saved" />);
    expect(screen.getByText('(저장됨)')).toBeInTheDocument();

    rerender(<EditorHeader title="테스트" status="failed" />);
    expect(screen.getByText('(저장 실패)')).toBeInTheDocument();
    expect(screen.queryByText('(저장됨)')).not.toBeInTheDocument();

    rerender(<EditorHeader title="테스트" status="default" />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <EditorHeader title="테스트" status="default" className="custom-header" />,
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('custom-header');
  });

  it('헤더 요소가 올바른 시맨틱을 갖는다', () => {
    render(<EditorHeader title="테스트" status="default" />);

    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('빈 title에서 시작하여 입력할 수 있다', async () => {
    const user = userEvent.setup();
    const handleTitleChange = vi.fn();

    render(<EditorHeader title="" status="default" onTitleChange={handleTitleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    await user.type(input, '새로운 로드맵');

    expect(handleTitleChange).toHaveBeenCalled();
  });
});
