import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ResourceRecommendationModal } from '.';

describe('ResourceRecommendationModal', () => {
  const mockOnClose = vi.fn();

  const renderModal = (props = {}) => {
    return render(
      <ResourceRecommendationModal
        isOpen={true}
        onClose={mockOnClose}
        nodeName="React"
        {...props}
      />,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderModal();
    expect(container).toBeInTheDocument();
  });

  it('renders title', () => {
    renderModal();
    expect(screen.getByText('AI 자료 추천')).toBeInTheDocument();
  });

  it('renders node name in subtitle', () => {
    renderModal({ nodeName: 'React' });
    expect(screen.getByText(/"React"/)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByText('AI 자료 추천')).not.toBeInTheDocument();
  });

  it('shows empty state initially', () => {
    renderModal();
    expect(screen.getByText('추천할 자료가 없습니다')).toBeInTheDocument();
    expect(screen.getByText('추천받기')).toBeInTheDocument();
  });

  it('shows loading state when recommending', async () => {
    const user = userEvent.setup();
    renderModal();

    const recommendButton = screen.getByText('추천받기');
    await user.click(recommendButton);

    expect(screen.getByText('자료를 찾는 중...')).toBeInTheDocument();
  });

  it('shows resources after recommendation', async () => {
    const user = userEvent.setup();
    renderModal();

    const recommendButton = screen.getByText('추천받기');
    await user.click(recommendButton);

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.queryByText('자료를 찾는 중...')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Check if mock resources are displayed
    expect(screen.getByText('공식 문서')).toBeInTheDocument();
    expect(screen.getByText('입문 튜토리얼')).toBeInTheDocument();
    expect(screen.getByText('유튜브 강의')).toBeInTheDocument();
  });

  it('shows close button after resources are loaded', async () => {
    const user = userEvent.setup();
    renderModal();

    const recommendButton = screen.getByText('추천받기');
    await user.click(recommendButton);

    await waitFor(
      () => {
        expect(screen.getByText('닫기')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    renderModal();

    // Get resources first
    const recommendButton = screen.getByText('추천받기');
    await user.click(recommendButton);

    await waitFor(
      () => {
        expect(screen.getByText('닫기')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    const closeButton = screen.getByText('닫기');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
