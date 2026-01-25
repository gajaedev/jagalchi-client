import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { CollapseSection } from './index';

describe('CollapseSection', () => {
  it('제목과 내용을 렌더링한다', () => {
    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.getByRole('button', { name: /Test Section 섹션 접기/ })).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('기본값으로 펼쳐진 상태로 렌더링된다', () => {
    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('defaultOpen이 false면 접힌 상태로 시작한다', () => {
    render(
      <CollapseSection title="Test Section" defaultOpen={false}>
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('버튼 클릭 시 섹션이 접히고 펼쳐진다', async () => {
    const user = userEvent.setup();

    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    const button = screen.getByRole('button');

    // 처음에는 펼쳐져 있음
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // 클릭하면 접힘
    await user.click(button);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // 다시 클릭하면 펼쳐짐
    await user.click(button);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('펼쳐진 상태에서 ChevronDown 아이콘을 표시한다', () => {
    const { container } = render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    const chevronDown = container.querySelector('svg');
    expect(chevronDown).toBeInTheDocument();
  });

  it('접힌 상태에서 ChevronRight 아이콘을 표시한다', () => {
    const { container } = render(
      <CollapseSection title="Test Section" defaultOpen={false}>
        <div>Test Content</div>
      </CollapseSection>,
    );

    const chevronRight = container.querySelector('svg');
    expect(chevronRight).toBeInTheDocument();
  });
});
