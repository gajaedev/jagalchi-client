import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import * as aiApi from '@/api/ai';

import { ResourceRecommendationModal } from '.';

vi.mock('@/api/ai', async (importOriginal) => {
  const actual = await importOriginal<typeof aiApi>();
  return {
    ...actual,
    getResourceRecommendation: vi.fn(),
  };
});

const mockItems = [
  {
    title: '공식 문서',
    url: 'https://example.com/docs',
    source: 'web',
    score: 0.9,
    why_recommended: '공식 문서는 가장 정확한 정보를 제공합니다',
    difficulty: 'beginner' as const,
    estimated_minutes: 30,
  },
  {
    title: '입문 튜토리얼',
    url: 'https://example.com/tutorial',
    source: 'web',
    score: 0.8,
    why_recommended: '단계별로 학습할 수 있는 튜토리얼입니다',
    difficulty: 'beginner' as const,
    estimated_minutes: 60,
  },
  {
    title: '유튜브 강의',
    url: 'https://example.com/youtube',
    source: 'web',
    score: 0.7,
    why_recommended: '영상으로 쉽게 학습할 수 있습니다',
    difficulty: 'intermediate' as const,
    estimated_minutes: null,
  },
];

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
    vi.mocked(aiApi.getResourceRecommendation).mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();
    renderModal();

    const recommendButton = screen.getByText('추천받기');
    await user.click(recommendButton);

    expect(screen.getByText('자료를 찾는 중...')).toBeInTheDocument();
  });

  it('shows resources after recommendation', async () => {
    vi.mocked(aiApi.getResourceRecommendation).mockResolvedValue({
      query: 'React',
      generated_at: '',
      items: mockItems,
      model_version: '',
      retrieval_evidence: [],
    });
    const user = userEvent.setup();
    renderModal();

    const recommendButton = screen.getByText('추천받기');
    await user.click(recommendButton);

    await waitFor(
      () => {
        expect(screen.queryByText('자료를 찾는 중...')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(screen.getByText('공식 문서')).toBeInTheDocument();
    expect(screen.getByText('입문 튜토리얼')).toBeInTheDocument();
    expect(screen.getByText('유튜브 강의')).toBeInTheDocument();
  });

  it('shows close button after resources are loaded', async () => {
    vi.mocked(aiApi.getResourceRecommendation).mockResolvedValue({
      query: 'React',
      generated_at: '',
      items: mockItems,
      model_version: '',
      retrieval_evidence: [],
    });
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
    vi.mocked(aiApi.getResourceRecommendation).mockResolvedValue({
      query: 'React',
      generated_at: '',
      items: mockItems,
      model_version: '',
      retrieval_evidence: [],
    });
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

    const closeButton = screen.getByText('닫기');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
