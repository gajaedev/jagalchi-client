import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

import { activeTabAtom } from '../../../stores/community.atoms';

import { Community } from './index';

function HydrateAtoms({ children }: { children: React.ReactNode }) {
  useHydrateAtoms([[activeTabAtom, 'latest' as const]]);
  return children;
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

vi.mock('@/hooks/use-popular-roadmaps', () => ({
  usePopularRoadmaps: () => ({ data: undefined, isLoading: false }),
}));

vi.mock('@/hooks/use-community-roadmaps', () => ({
  useCommunityRoadmaps: () => ({
    data: {
      content: [
        {
          id: 1,
          title: 'Test Roadmap',
          tags: [],
          owner: { id: 1, nickname: '홍길동', profileImageUrl: null },
        },
      ],
      pageable: { pageNumber: 0, pageSize: 12 },
      totalElements: 1,
      totalPages: 1,
      hasNext: false,
    },
    isLoading: false,
  }),
}));

vi.mock('../../molecules/CommunityHeader', () => ({
  CommunityHeader: () => <div data-testid="community-header">Header</div>,
}));

vi.mock('../../molecules/CommunityHero', () => ({
  CommunityHero: () => <div data-testid="community-hero">Hero</div>,
}));

vi.mock('../../molecules/CommunityFilter', () => ({
  CommunityFilter: () => <div data-testid="community-filter">Filter</div>,
}));

vi.mock('../../organisms/CommunityGrid', () => ({
  CommunityGrid: () => <div data-testid="community-grid">Grid</div>,
}));

describe('Community Template', () => {
  it('renders all main sections', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <HydrateAtoms>
            <Community />
          </HydrateAtoms>
        </Provider>
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('community-header')).toBeInTheDocument();
    expect(screen.getByTestId('community-hero')).toBeInTheDocument();
    expect(screen.getByTestId('community-filter')).toBeInTheDocument();
    expect(screen.getByTestId('community-grid')).toBeInTheDocument();
  });
});
