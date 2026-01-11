import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Square, Circle } from 'lucide-react';

import { ToolbarDropdown } from './index';
import { ToolbarItem } from '../ToolbarItem';

describe('ToolbarDropdown', () => {
  const mockItems = [
    {
      icon: <Square />,
      label: 'Square',
      onClick: vi.fn(),
    },
    {
      icon: <Circle />,
      label: 'Circle',
      onClick: vi.fn(),
    },
  ];

  it('renders trigger element', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<Square />} label="Tools" />}
        items={mockItems}
      />,
    );

    expect(screen.getByRole('button', { name: 'Tools' })).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<Square />} label="Tools" />}
        items={mockItems}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Tools' });
    await user.click(trigger);

    expect(screen.getByText('Square')).toBeInTheDocument();
    expect(screen.getByText('Circle')).toBeInTheDocument();
  });

  it('calls item onClick when item is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const items = [
      {
        icon: <Square />,
        label: 'Square',
        onClick: handleClick,
      },
    ];

    render(
      <ToolbarDropdown trigger={<ToolbarItem icon={<Square />} label="Tools" />} items={items} />,
    );

    const trigger = screen.getByRole('button', { name: 'Tools' });
    await user.click(trigger);

    const menuItem = screen.getByText('Square');
    await user.click(menuItem);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('disables menu item when disabled prop is true', async () => {
    const user = userEvent.setup();

    const items = [
      {
        icon: <Square />,
        label: 'Disabled Item',
        onClick: vi.fn(),
        disabled: true,
      },
    ];

    render(
      <ToolbarDropdown trigger={<ToolbarItem icon={<Square />} label="Tools" />} items={items} />,
    );

    const trigger = screen.getByRole('button', { name: 'Tools' });
    await user.click(trigger);

    const menuItem = screen.getByText('Disabled Item');
    expect(menuItem.closest('[role="menuitem"]')).toHaveAttribute('data-disabled');
  });

  it('controls open state when open prop is provided', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<Square />} label="Tools" />}
        items={mockItems}
        open={true}
      />,
    );

    expect(screen.getByText('Square')).toBeInTheDocument();
  });

  it('calls onOpenChange when dropdown is toggled', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<Square />} label="Tools" />}
        items={mockItems}
        onOpenChange={handleOpenChange}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Tools' });
    await user.click(trigger);

    expect(handleOpenChange).toHaveBeenCalled();
  });
});
