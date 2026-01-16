import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { EditorToolbar } from './index';

vi.mock('lucide-react', () => ({
  Box: () => <span data-testid="box-icon" />,
  Minus: () => <span data-testid="minus-icon" />,
  Square: () => <span data-testid="square-icon" />,
  Type: () => <span data-testid="type-icon" />,
  Settings: () => <span data-testid="settings-icon" />,
  Sparkles: () => <span data-testid="sparkles-icon" />,
}));

describe('EditorToolbar', () => {
  it('모든 도구 버튼이 렌더링된다', () => {
    render(<EditorToolbar />);

    expect(screen.getByRole('button', { name: '노드' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '선' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '섹션' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '텍스트' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI 기능' })).toBeInTheDocument();
  });

  it('활성 도구가 하이라이트된다', () => {
    render(<EditorToolbar activeMode="node" />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    expect(nodeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('도구 클릭 시 onModeChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleModeChange = vi.fn();

    render(<EditorToolbar onModeChange={handleModeChange} />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    await user.click(nodeButton);

    expect(handleModeChange).toHaveBeenCalledTimes(1);
    expect(handleModeChange).toHaveBeenCalledWith('node');
  });

  it('각 도구가 올바른 mode로 onModeChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleModeChange = vi.fn();

    render(<EditorToolbar onModeChange={handleModeChange} />);

    await user.click(screen.getByRole('button', { name: '노드' }));
    expect(handleModeChange).toHaveBeenLastCalledWith('node');

    await user.click(screen.getByRole('button', { name: '선' }));
    expect(handleModeChange).toHaveBeenLastCalledWith('line');

    await user.click(screen.getByRole('button', { name: '섹션' }));
    expect(handleModeChange).toHaveBeenLastCalledWith('section');

    await user.click(screen.getByRole('button', { name: '텍스트' }));
    expect(handleModeChange).toHaveBeenLastCalledWith('text');

    expect(handleModeChange).toHaveBeenCalledTimes(4);
  });

  it('적절한 접근성 속성을 갖는다', () => {
    render(<EditorToolbar />);

    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveAttribute('aria-label', '에디터 도구');
  });

  it('한 번에 하나의 도구만 활성화될 수 있다', () => {
    render(<EditorToolbar activeMode="line" />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    const lineButton = screen.getByRole('button', { name: '선' });
    const sectionButton = screen.getByRole('button', { name: '섹션' });
    const textButton = screen.getByRole('button', { name: '텍스트' });

    expect(nodeButton).toHaveAttribute('aria-pressed', 'false');
    expect(lineButton).toHaveAttribute('aria-pressed', 'true');
    expect(sectionButton).toHaveAttribute('aria-pressed', 'false');
    expect(textButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('activeMode가 null일 때 모든 도구 버튼이 비활성 상태이다', () => {
    render(<EditorToolbar activeMode={null} />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    const lineButton = screen.getByRole('button', { name: '선' });
    const sectionButton = screen.getByRole('button', { name: '섹션' });
    const textButton = screen.getByRole('button', { name: '텍스트' });

    expect(nodeButton).toHaveAttribute('aria-pressed', 'false');
    expect(lineButton).toHaveAttribute('aria-pressed', 'false');
    expect(sectionButton).toHaveAttribute('aria-pressed', 'false');
    expect(textButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('activeMode가 변경될 때 올바르게 업데이트된다', () => {
    const { rerender } = render(<EditorToolbar activeMode="node" />);

    expect(screen.getByRole('button', { name: '노드' })).toHaveAttribute('aria-pressed', 'true');

    rerender(<EditorToolbar activeMode="text" />);

    expect(screen.getByRole('button', { name: '노드' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: '텍스트' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('onModeChange가 없어도 렌더링된다', () => {
    render(<EditorToolbar activeMode="node" />);

    expect(screen.getByRole('toolbar')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('AI dropdown 버튼이 렌더링된다', () => {
    render(<EditorToolbar />);

    const aiButton = screen.getByRole('button', { name: 'AI 기능' });
    expect(aiButton).toBeInTheDocument();
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });

  it('AI dropdown을 클릭하면 메뉴가 열린다', async () => {
    const user = userEvent.setup();
    render(<EditorToolbar />);

    const aiButton = screen.getByRole('button', { name: 'AI 기능' });
    await user.click(aiButton);

    expect(screen.getByText('로드맵 생성')).toBeInTheDocument();
    expect(screen.getByText('로드맵 수정')).toBeInTheDocument();
  });

  it('로드맵 생성 메뉴 선택 시 onAIAction이 호출된다', async () => {
    const user = userEvent.setup();
    const mockOnAIAction = vi.fn();
    render(<EditorToolbar onAIAction={mockOnAIAction} />);

    const aiButton = screen.getByRole('button', { name: 'AI 기능' });
    await user.click(aiButton);

    const generateItem = screen.getByText('로드맵 생성');
    await user.click(generateItem);

    expect(mockOnAIAction).toHaveBeenCalledWith('generate');
  });

  it('로드맵 수정 메뉴 선택 시 onAIAction이 호출된다', async () => {
    const user = userEvent.setup();
    const mockOnAIAction = vi.fn();
    render(<EditorToolbar onAIAction={mockOnAIAction} />);

    const aiButton = screen.getByRole('button', { name: 'AI 기능' });
    await user.click(aiButton);

    const modifyItem = screen.getByText('로드맵 수정');
    await user.click(modifyItem);

    expect(mockOnAIAction).toHaveBeenCalledWith('modify');
  });

  it('onModeChange가 없으면 클릭해도 에러가 발생하지 않는다', async () => {
    const user = userEvent.setup();

    render(<EditorToolbar />);

    const nodeButton = screen.getByRole('button', { name: '노드' });

    // 에러 없이 클릭할 수 있어야 한다
    await expect(user.click(nodeButton)).resolves.not.toThrow();
  });

  it('각 도구 버튼의 아이콘이 렌더링된다', () => {
    render(<EditorToolbar />);

    expect(screen.getByTestId('box-icon')).toBeInTheDocument();
    expect(screen.getByTestId('minus-icon')).toBeInTheDocument();
    expect(screen.getByTestId('square-icon')).toBeInTheDocument();
    expect(screen.getByTestId('type-icon')).toBeInTheDocument();
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });

  it('Separator가 올바르게 렌더링된다', () => {
    const { container } = render(<EditorToolbar />);

    // Separator는 toolbar 내에 있어야 한다
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toBeInTheDocument();

    // Separator는 vertical orientation을 가져야 한다
    const separator = container.querySelector('[data-orientation="vertical"]');
    expect(separator).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    render(<EditorToolbar className="custom-toolbar" />);

    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('custom-toolbar');
  });

  it('모든 버튼이 type="button"이다', () => {
    render(<EditorToolbar />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
