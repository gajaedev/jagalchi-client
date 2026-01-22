import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorHeader } from './index';

describe('EditorHeader', () => {
  it('60px 높이로 렌더링된다', () => {
    const { container } = render(<EditorHeader />);
    const header = container.firstChild as HTMLElement;

    expect(header.className).toContain('h-[60px]');
  });

  it('로고 섹션을 렌더링한다', () => {
    render(<EditorHeader />);

    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('줌 컨트롤 버튼들을 렌더링한다', () => {
    render(<EditorHeader />);

    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset zoom')).toBeInTheDocument();
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
  });

  it('줌 레벨을 표시한다', () => {
    render(<EditorHeader zoomLevel={150} />);

    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('줌 인 버튼 클릭 시 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const onZoomIn = vi.fn();

    render(<EditorHeader onZoomIn={onZoomIn} />);

    const zoomInButton = screen.getByLabelText('Zoom in');
    await user.click(zoomInButton);

    expect(onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('줌 아웃 버튼 클릭 시 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const onZoomOut = vi.fn();

    render(<EditorHeader onZoomOut={onZoomOut} />);

    const zoomOutButton = screen.getByLabelText('Zoom out');
    await user.click(zoomOutButton);

    expect(onZoomOut).toHaveBeenCalledTimes(1);
  });

  it('줌 리셋 버튼 클릭 시 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const onZoomReset = vi.fn();

    render(<EditorHeader onZoomReset={onZoomReset} />);

    const zoomResetButton = screen.getByLabelText('Reset zoom');
    await user.click(zoomResetButton);

    expect(onZoomReset).toHaveBeenCalledTimes(1);
  });

  it('neutral-200 border와 neutral-0 배경을 적용한다', () => {
    const { container } = render(<EditorHeader />);
    const header = container.firstChild as HTMLElement;

    expect(header.className).toContain('border-neutral-200');
    expect(header.className).toContain('bg-neutral-0');
  });
});
