import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { CollapseSection } from './index';

describe('CollapseSection', () => {
  it('제목과 children을 렌더링한다', () => {
    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('기본적으로 열려있다', () => {
    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('defaultOpen={false}일 때 닫혀있다', () => {
    render(
      <CollapseSection title="Test Section" defaultOpen={false}>
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('클릭 시 토글된다', async () => {
    const user = userEvent.setup();

    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    const button = screen.getByRole('button');

    expect(screen.getByText('Test Content')).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('aria-expanded 속성이 올바르게 설정된다', async () => {
    const user = userEvent.setup();

    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
