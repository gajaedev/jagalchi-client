import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorInput } from './index';

describe('EditorInput', () => {
  it('레이블을 올바르게 표시한다', () => {
    render(<EditorInput label="노드 이름" />);
    expect(screen.getByText('노드 이름')).toBeInTheDocument();
  });

  it('placeholder를 올바르게 표시한다', () => {
    render(<EditorInput placeholder="자료 링크 입력" />);
    const input = screen.getByPlaceholderText('자료 링크 입력');
    expect(input).toBeInTheDocument();
  });

  it('value를 올바르게 표시한다', () => {
    render(<EditorInput value="테스트 값" />);
    const input = screen.getByDisplayValue('테스트 값');
    expect(input).toBeInTheDocument();
  });

  it('입력 시 onChange 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<EditorInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'a');
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('isMultiline=true일 때 textarea를 렌더링한다', () => {
    render(<EditorInput isMultiline placeholder="멀티라인" />);
    const textarea = screen.getByPlaceholderText('멀티라인');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('isMultiline=false일 때 input을 렌더링한다', () => {
    render(<EditorInput placeholder="단일 라인" />);
    const input = screen.getByPlaceholderText('단일 라인');
    expect(input.tagName).toBe('INPUT');
  });

  it('hasError=true일 때 에러 스타일을 적용한다', () => {
    render(<EditorInput hasError placeholder="에러 상태" />);
    const input = screen.getByPlaceholderText('에러 상태');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('에러 메시지를 올바르게 표시한다', () => {
    render(<EditorInput hasError errorMessage="올바른 URL을 입력하세요" placeholder="에러" />);
    expect(screen.getByText('올바른 URL을 입력하세요')).toBeInTheDocument();
  });

  it('hasError=false일 때 에러 메시지를 표시하지 않는다', () => {
    render(<EditorInput errorMessage="에러" placeholder="정상" />);
    expect(screen.queryByText('에러')).not.toBeInTheDocument();
  });

  it('isDisabled=true일 때 입력이 비활성화된다', () => {
    render(<EditorInput isDisabled placeholder="비활성화" />);
    const input = screen.getByPlaceholderText('비활성화');
    expect(input).toBeDisabled();
  });

  it('isDisabled=true일 때 입력이 불가능하다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<EditorInput isDisabled onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'test');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('Figma 디자인 스타일을 적용한다 (36px 높이)', () => {
    render(<EditorInput placeholder="스타일 테스트" />);
    const input = screen.getByPlaceholderText('스타일 테스트');
    expect(input).toHaveClass('min-h-[36px]');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('rounded-lg');
    expect(input).toHaveClass('shadow-sm');
  });
});
