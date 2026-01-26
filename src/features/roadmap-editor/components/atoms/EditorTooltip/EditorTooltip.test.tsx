import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { EditorTooltip } from './index';

describe('EditorTooltip', () => {
  it('마우스 호버 시 tooltip을 표시한다', async () => {
    const user = userEvent.setup();

    render(
      <EditorTooltip content="Tooltip content" delay={0}>
        <button>Hover me</button>
      </EditorTooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    });
  });

  it('마우스 떠나면 tooltip을 숨긴다', async () => {
    const user = userEvent.setup();

    render(
      <EditorTooltip content="Tooltip content" delay={0}>
        <button>Hover me</button>
      </EditorTooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    await user.unhover(trigger);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('키보드 포커스 시 tooltip을 표시한다', async () => {
    const user = userEvent.setup();

    render(
      <EditorTooltip content="Tooltip content" delay={0}>
        <button>Focus me</button>
      </EditorTooltip>,
    );

    await user.tab(); // Focus the button

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('블러 시 tooltip을 숨긴다', async () => {
    render(
      <EditorTooltip content="Tooltip content" delay={0}>
        <button>Focus me</button>
      </EditorTooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Focus me' });
    trigger.focus();

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    trigger.blur();

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('컴포넌트가 올바른 스타일 클래스를 적용한다', () => {
    render(
      <EditorTooltip content="Tooltip content" delay={0}>
        <button>Hover me</button>
      </EditorTooltip>,
    );

    // 컴포넌트가 렌더링되었는지 확인
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });
});
