import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ContextMenu, type ContextMenuItem } from './index';

describe('ContextMenu', () => {
  const mockItems: ContextMenuItem[] = [
    { id: '1', label: 'Edit', onClick: vi.fn() },
    { id: '2', label: 'Delete', onClick: vi.fn() },
    { id: '3', label: 'Duplicate', onClick: vi.fn(), disabled: true },
  ];

  const defaultProps = {
    isOpen: true,
    position: { x: 100, y: 100 },
    items: mockItems,
    onClose: vi.fn(),
  };

  it('열려있을 때 메뉴를 렌더링한다', () => {
    render(<ContextMenu {...defaultProps} />);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
  });

  it('닫혀있을 때 메뉴를 렌더링하지 않는다', () => {
    render(<ContextMenu {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('메뉴 아이템 클릭 시 onClick을 호출하고 메뉴를 닫는다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const handleClick = vi.fn();

    const items: ContextMenuItem[] = [{ id: '1', label: 'Edit', onClick: handleClick }];

    render(<ContextMenu {...defaultProps} items={items} onClose={handleClose} />);

    const editButton = screen.getByRole('menuitem', { name: 'Edit' });
    await user.click(editButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('disabled 아이템은 클릭되지 않는다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<ContextMenu {...defaultProps} onClose={handleClose} />);

    const duplicateButton = screen.getByRole('menuitem', { name: 'Duplicate' });
    await user.click(duplicateButton);

    expect(mockItems[2].onClick).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('메뉴 외부 클릭 시 onClose를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <div>
        <div data-testid="outside">Outside</div>
        <ContextMenu {...defaultProps} onClose={handleClose} />
      </div>,
    );

    const outside = screen.getByTestId('outside');
    await user.click(outside);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('Escape 키를 누르면 onClose를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<ContextMenu {...defaultProps} onClose={handleClose} />);

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('separator를 렌더링한다', () => {
    const itemsWithSeparator: ContextMenuItem[] = [
      { id: '1', label: 'Edit', onClick: vi.fn() },
      { id: 'sep', label: '', onClick: vi.fn(), separator: true },
      { id: '2', label: 'Delete', onClick: vi.fn() },
    ];

    render(<ContextMenu {...defaultProps} items={itemsWithSeparator} />);

    const separators = screen.getAllByRole('separator');
    expect(separators).toHaveLength(1);
  });

  it('disabled 아이템은 aria-disabled 속성을 가진다', () => {
    render(<ContextMenu {...defaultProps} />);

    const duplicateButton = screen.getByRole('menuitem', { name: 'Duplicate' });
    expect(duplicateButton).toHaveAttribute('aria-disabled', 'true');
  });
});
