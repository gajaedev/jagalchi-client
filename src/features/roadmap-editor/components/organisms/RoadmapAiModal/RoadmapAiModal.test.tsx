import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RoadmapAiModal } from '.';

describe('RoadmapAiModal', () => {
  const mockOnClose = vi.fn();

  const renderModal = (props = {}) => {
    return render(
      <RoadmapAiModal isOpen={true} onClose={mockOnClose} mode="generate" {...props} />,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderModal();
    expect(container).toBeInTheDocument();
  });

  it('renders generation form when mode is generate', () => {
    renderModal({ mode: 'generate' });
    expect(screen.getByText('AI 로드맵 생성')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/)).toBeInTheDocument();
  });

  it('renders modification form when mode is modify', () => {
    renderModal({ mode: 'modify' });
    expect(screen.getByText('AI 로드맵 수정')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByText('AI 로드맵 생성')).not.toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderModal();

    const cancelButton = screen.getByText('취소');
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles generation form submission', async () => {
    const user = userEvent.setup();
    renderModal({ mode: 'generate' });

    const textarea = screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/);
    await user.type(textarea, 'React 로드맵');

    const submitButton = screen.getByText('생성');
    await user.click(submitButton);

    // Should show loading state
    expect(screen.getByText(/AI가 작업 중입니다.../)).toBeInTheDocument();
  });

  it('handles modification form submission', async () => {
    const user = userEvent.setup();
    renderModal({ mode: 'modify' });

    const textarea = screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/);
    await user.type(textarea, '난이도를 낮춰주세요');

    const submitButton = screen.getByText('수정');
    await user.click(submitButton);

    // Should show loading state
    expect(screen.getByText(/AI가 작업 중입니다.../)).toBeInTheDocument();
  });
});
