import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LoadingButton } from './index';

describe('LoadingButton', () => {
  it('텍스트를 올바르게 표시한다', () => {
    render(<LoadingButton>AI 추천 받기</LoadingButton>);
    expect(screen.getByRole('button')).toHaveTextContent('AI 추천 받기');
  });

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<LoadingButton onClick={handleClick}>AI 추천 받기</LoadingButton>);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('isLoading=true일 때 로딩 스피너를 표시한다', () => {
    const { container } = render(<LoadingButton isLoading>AI 추천 받기</LoadingButton>);
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('isLoading=false일 때 로딩 스피너를 표시하지 않는다', () => {
    const { container } = render(<LoadingButton isLoading={false}>AI 추천 받기</LoadingButton>);
    const spinner = container.querySelector('svg');
    expect(spinner).not.toBeInTheDocument();
  });

  it('isLoading=true일 때 버튼이 비활성화된다', () => {
    render(<LoadingButton isLoading>AI 추천 받기</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('isLoading=true일 때 클릭이 동작하지 않는다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <LoadingButton isLoading onClick={handleClick}>
        AI 추천 받기
      </LoadingButton>,
    );
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disabled=true일 때 버튼이 비활성화된다', () => {
    render(<LoadingButton disabled>AI 추천 받기</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shadcn/ui Button을 기반으로 한다', () => {
    render(<LoadingButton variant="outline">AI 추천 받기</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('커스텀 className을 적용할 수 있다', () => {
    render(<LoadingButton className="w-full">AI 추천 받기</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });
});
