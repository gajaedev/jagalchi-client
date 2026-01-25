import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Trash2, Edit, Copy } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { ContextMenu } from './index';

import type { ContextMenuItem } from './index';

const mockItems: ContextMenuItem[] = [
  { id: 'edit', label: '편집', icon: <Edit className="size-4" />, onClick: vi.fn() },
  { id: 'copy', label: '복사', icon: <Copy className="size-4" />, onClick: vi.fn() },
  {
    id: 'delete',
    label: '삭제',
    icon: <Trash2 className="size-4" />,
    onClick: vi.fn(),
    divider: true,
  },
];

describe('ContextMenu', () => {
  it('모든 메뉴 항목을 렌더링한다', () => {
    render(<ContextMenu items={mockItems} x={100} y={100} onClose={() => {}} />);

    expect(screen.getByRole('menuitem', { name: /편집/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /복사/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /삭제/ })).toBeInTheDocument();
  });

  it('지정된 위치에 렌더링된다', () => {
    const { container } = render(
      <ContextMenu items={mockItems} x={150} y={200} onClose={() => {}} />,
    );

    const menu = container.querySelector('[role="menu"]');
    expect(menu).toHaveStyle({ left: '150px', top: '200px' });
  });

  it('메뉴 항목 클릭 시 onClick 핸들러를 호출하고 메뉴를 닫는다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<ContextMenu items={mockItems} x={100} y={100} onClose={handleClose} />);

    await user.click(screen.getByRole('menuitem', { name: /편집/ }));

    expect(mockItems[0].onClick).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });

  it('비활성화된 항목은 클릭할 수 없다', async () => {
    const user = userEvent.setup();
    const disabledItem: ContextMenuItem = {
      id: 'disabled',
      label: '비활성화',
      onClick: vi.fn(),
      disabled: true,
    };

    render(<ContextMenu items={[disabledItem]} x={100} y={100} onClose={() => {}} />);

    const button = screen.getByRole('menuitem', { name: /비활성화/ });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(disabledItem.onClick).not.toHaveBeenCalled();
  });

  it('divider가 있는 항목 아래에 구분선을 표시한다', () => {
    const { container } = render(
      <ContextMenu items={mockItems} x={100} y={100} onClose={() => {}} />,
    );

    const separators = container.querySelectorAll('[role="separator"]');
    expect(separators).toHaveLength(1);
  });

  it('아이콘이 있는 항목은 아이콘을 표시한다', () => {
    const { container } = render(
      <ContextMenu items={mockItems} x={100} y={100} onClose={() => {}} />,
    );

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('ESC 키를 누르면 메뉴가 닫힌다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<ContextMenu items={mockItems} x={100} y={100} onClose={handleClose} />);

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalled();
  });

  it('메뉴 외부 클릭 시 메뉴가 닫힌다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <div>
        <div data-testid="outside">Outside</div>
        <ContextMenu items={mockItems} x={100} y={100} onClose={handleClose} />
      </div>,
    );

    await user.click(screen.getByTestId('outside'));

    expect(handleClose).toHaveBeenCalled();
  });
});
