import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LoadingButton } from './index';

describe('LoadingButton', () => {
  it('기본 텍스트를 렌더링한다', () => {
    render(<LoadingButton>Click me</LoadingButton>);

    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('로딩 상태에서 스피너와 로딩 텍스트를 표시한다', () => {
    render(
      <LoadingButton isLoading={true} loadingText="Loading...">
        Click me
      </LoadingButton>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Loading...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('로딩 상태에서 버튼이 비활성화된다', () => {
    render(<LoadingButton isLoading={true}>Click me</LoadingButton>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disabled prop이 true일 때 버튼이 비활성화된다', () => {
    render(<LoadingButton disabled={true}>Click me</LoadingButton>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('클릭 이벤트를 처리한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<LoadingButton onClick={handleClick}>Click me</LoadingButton>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('로딩 상태에서는 클릭 이벤트가 발생하지 않는다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <LoadingButton isLoading={true} onClick={handleClick}>
        Click me
      </LoadingButton>,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
