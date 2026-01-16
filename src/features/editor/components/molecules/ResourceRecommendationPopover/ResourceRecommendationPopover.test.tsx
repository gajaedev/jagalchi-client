import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResourceRecommendationPopover } from './index';

describe('ResourceRecommendationPopover', () => {
  it('renders trigger and shows content on click', async () => {
    const user = userEvent.setup();
    const onAddResource = vi.fn();

    render(
      <ResourceRecommendationPopover
        trigger={<button>AI 추천</button>}
        onAddResource={onAddResource}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'AI 추천' });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByText('AI 추천 자료')).toBeInTheDocument();
  });

  it('displays recommended resources', async () => {
    const user = userEvent.setup();
    const onAddResource = vi.fn();

    render(
      <ResourceRecommendationPopover
        trigger={<button>AI 추천</button>}
        onAddResource={onAddResource}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'AI 추천' }));

    expect(screen.getByText('React 공식 문서')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Handbook')).toBeInTheDocument();
    expect(screen.getByText('Next.js 공식 문서')).toBeInTheDocument();
  });

  it('calls onAddResource when add button is clicked', async () => {
    const user = userEvent.setup();
    const onAddResource = vi.fn();

    render(
      <ResourceRecommendationPopover
        trigger={<button>AI 추천</button>}
        onAddResource={onAddResource}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'AI 추천' }));

    const addButtons = screen.getAllByRole('button', { name: '추가' });
    await user.click(addButtons[0]);

    expect(onAddResource).toHaveBeenCalledWith({
      id: '1',
      title: 'React 공식 문서',
      url: 'https://react.dev',
    });
  });

  it('shows loading state when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onAddResource = vi.fn();

    render(
      <ResourceRecommendationPopover
        trigger={<button>AI 추천</button>}
        onAddResource={onAddResource}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'AI 추천' }));

    const retryButton = screen.getByRole('button', { name: '다시 추천받기' });
    await user.click(retryButton);

    expect(screen.getByText('추천 자료를 불러오는 중...')).toBeInTheDocument();
  });

  it('shows recommendations after retry', async () => {
    const user = userEvent.setup();
    const onAddResource = vi.fn();

    render(
      <ResourceRecommendationPopover
        trigger={<button>AI 추천</button>}
        onAddResource={onAddResource}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'AI 추천' }));

    const retryButton = screen.getByRole('button', { name: '다시 추천받기' });
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('React 공식 문서')).toBeInTheDocument();
    });
  });
});
