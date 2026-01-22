import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RoadmapGenerationForm } from './index';

describe('RoadmapGenerationForm', () => {
  it('레이블과 Textarea를 렌더링한다', () => {
    render(<RoadmapGenerationForm onSubmit={vi.fn()} />);

    expect(screen.getByText('로드맵 설명')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('생성할 로드맵의 정보를 자세히 알려주세요.'),
    ).toBeInTheDocument();
  });

  it('제출 버튼을 렌더링한다', () => {
    render(<RoadmapGenerationForm onSubmit={vi.fn()} />);

    expect(screen.getByRole('button', { name: '로드맵 생성하기' })).toBeInTheDocument();
  });

  it('빈 입력일 때 제출 버튼이 비활성화된다', () => {
    render(<RoadmapGenerationForm onSubmit={vi.fn()} />);

    expect(screen.getByRole('button', { name: '로드맵 생성하기' })).toBeDisabled();
  });

  it('텍스트 입력 시 제출 버튼이 활성화된다', async () => {
    const user = userEvent.setup();

    render(<RoadmapGenerationForm onSubmit={vi.fn()} />);

    const textarea = screen.getByPlaceholderText('생성할 로드맵의 정보를 자세히 알려주세요.');
    await user.type(textarea, 'React 학습 로드맵');

    expect(screen.getByRole('button', { name: '로드맵 생성하기' })).not.toBeDisabled();
  });

  it('폼 제출 시 onSubmit을 호출한다', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RoadmapGenerationForm onSubmit={handleSubmit} />);

    const textarea = screen.getByPlaceholderText('생성할 로드맵의 정보를 자세히 알려주세요.');
    await user.type(textarea, 'React 학습 로드맵');

    const submitButton = screen.getByRole('button', { name: '로드맵 생성하기' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith('React 학습 로드맵');
    });
  });

  it('로딩 상태에서 버튼과 텍스트 필드가 비활성화된다', () => {
    render(<RoadmapGenerationForm onSubmit={vi.fn()} isLoading={true} />);

    expect(screen.getByRole('button', { name: '생성중' })).toBeDisabled();
    expect(screen.getByPlaceholderText('생성할 로드맵의 정보를 자세히 알려주세요.')).toBeDisabled();
  });

  it('로딩 상태에서 버튼 텍스트가 "생성중"으로 변경된다', () => {
    render(<RoadmapGenerationForm onSubmit={vi.fn()} isLoading={true} />);

    expect(screen.getByRole('button', { name: '생성중' })).toBeInTheDocument();
  });
});
