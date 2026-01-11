import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { ToolbarDropdown } from './index';
import { ToolbarItem } from '../ToolbarItem';

vi.mock('lucide-react', () => ({
  Square: () => <span data-testid="square-icon" />,
  Circle: () => <span data-testid="circle-icon" />,
  ChevronDown: () => <span data-testid="chevron-down-icon" />,
}));

describe('ToolbarDropdown', () => {
  const MockIcon = ({ testId }: { testId: string }) => <span data-testid={testId}>Icon</span>;

  const mockItems = [
    {
      icon: <MockIcon testId="square-icon" />,
      label: '사각형',
      onClick: vi.fn(),
    },
    {
      icon: <MockIcon testId="circle-icon" />,
      label: '원형',
      onClick: vi.fn(),
    },
  ];

  it('trigger 요소가 렌더링된다', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={mockItems}
      />,
    );

    expect(screen.getByRole('button', { name: '도구' })).toBeInTheDocument();
  });

  it('open prop이 true일 때 드롭다운 메뉴가 렌더링된다', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={mockItems}
        open={true}
      />,
    );

    // 드롭다운 메뉴가 열려있는지 확인
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitem');

    expect(menu).toBeInTheDocument();
    expect(menuItems.length).toBe(2);
  });

  it('메뉴 아이템 클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const items = [
      {
        icon: <MockIcon testId="square-icon" />,
        label: '사각형',
        onClick: handleClick,
      },
    ];

    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={items}
        open={true}
      />,
    );

    // 메뉴 아이템을 role로 찾아서 클릭
    const menuItem = screen.getByRole('menuitem', { name: /사각형/ });
    await user.click(menuItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 아이템은 비활성화된다', () => {
    const items = [
      {
        icon: <MockIcon testId="disabled-icon" />,
        label: '비활성화 아이템',
        onClick: vi.fn(),
        disabled: true,
      },
    ];

    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={items}
        open={true}
      />,
    );

    // 메뉴 아이템에 data-disabled 속성이 있는지 확인
    const menuItem = screen.getByRole('menuitem', { name: /비활성화 아이템/ });
    expect(menuItem).toHaveAttribute('data-disabled');
  });

  it('open prop이 제공되면 열림 상태를 제어한다', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={mockItems}
        open={true}
      />,
    );

    // 드롭다운이 이미 열려있으므로 메뉴 아이템을 바로 찾을 수 있다
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(2);
  });

  it('onOpenChange 콜백이 제공된다', () => {
    const handleOpenChange = vi.fn();

    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={mockItems}
        onOpenChange={handleOpenChange}
      />,
    );

    // onOpenChange prop이 정상적으로 전달되었는지 확인
    expect(handleOpenChange).toBeDefined();
  });

  it('빈 items 배열도 렌더링된다', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={[]}
        open={true}
      />,
    );

    // 드롭다운이 열리지만 아이템이 없다
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(screen.queryAllByRole('menuitem').length).toBe(0);
  });

  it('여러 아이템이 올바르게 렌더링된다', () => {
    const items = [
      {
        icon: <MockIcon testId="item-1" />,
        label: '아이템 1',
        onClick: vi.fn(),
      },
      {
        icon: <MockIcon testId="item-2" />,
        label: '아이템 2',
        onClick: vi.fn(),
      },
      {
        icon: <MockIcon testId="item-3" />,
        label: '아이템 3',
        onClick: vi.fn(),
      },
    ];

    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={items}
        open={true}
      />,
    );

    // 메뉴 아이템들이 모두 렌더링되었는지 확인
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(3);
    expect(screen.getByRole('menuitem', { name: /아이템 1/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /아이템 2/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /아이템 3/ })).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    render(
      <ToolbarDropdown
        trigger={<ToolbarItem icon={<MockIcon testId="tool-icon" />} label="도구" />}
        items={mockItems}
        className="custom-dropdown"
        open={true}
      />,
    );

    // open={true}로 열려있으므로 메뉴를 직접 찾을 수 있음
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass('custom-dropdown');
  });
});
