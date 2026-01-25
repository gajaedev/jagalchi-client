import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorResource } from './index';

describe('EditorResource', () => {
  it('제목과 아이콘을 렌더링한다', () => {
    render(<EditorResource title="Test Resource" url="https://example.com" />);

    expect(screen.getByText('Test Resource')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('클릭 시 URL을 새 창에서 연다', async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<EditorResource title="Test Resource" url="https://example.com" />);

    await user.click(screen.getByRole('button'));

    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer',
    );

    windowOpenSpy.mockRestore();
  });

  it('커스텀 onClick 핸들러가 있으면 URL 대신 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(
      <EditorResource title="Test Resource" url="https://example.com" onClick={handleClick} />,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
    expect(windowOpenSpy).not.toHaveBeenCalled();

    windowOpenSpy.mockRestore();
  });

  it('긴 제목은 말줄임표로 표시된다', () => {
    const longTitle = 'Very Long Resource Title That Should Be Truncated With Ellipsis';

    render(<EditorResource title={longTitle} url="https://example.com" />);

    const titleElement = screen.getByText(longTitle);
    expect(titleElement).toHaveClass('text-ellipsis');
    expect(titleElement).toHaveClass('overflow-hidden');
  });

  it('aria-label을 가진다', () => {
    render(<EditorResource title="Test Resource" url="https://example.com" />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', '자료 열기: Test Resource');
  });
});
