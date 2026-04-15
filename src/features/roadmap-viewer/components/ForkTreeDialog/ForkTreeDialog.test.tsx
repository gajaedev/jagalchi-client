import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

vi.mock('@/hooks/use-fork-tree', () => ({
  useForkTree: vi.fn(),
}));

import { VIEWER_MESSAGES } from '@/constants/messages';
import { useForkTree } from '@/hooks/use-fork-tree';

import { ForkTreeDialog } from './index';

const mockForkTree = {
  id: 1,
  title: 'Original Roadmap',
  ownerId: 42,
  ownerName: 'alice',
  forkCount: 2,
  children: [
    {
      id: 2,
      title: 'Forked Roadmap',
      ownerId: 43,
      ownerName: 'bob',
      forkCount: 0,
      children: [],
    },
  ],
};

describe('ForkTreeDialog', () => {
  it('renders trigger button', () => {
    vi.mocked(useForkTree).mockReturnValue({ data: undefined, isLoading: false } as any);
    render(
      <Provider>
        <ForkTreeDialog roadmapId={1} />
      </Provider>,
    );
    expect(screen.getByText(VIEWER_MESSAGES.FORK_TREE_TITLE)).toBeInTheDocument();
  });

  it('shows empty state when no fork tree', async () => {
    vi.mocked(useForkTree).mockReturnValue({ data: null, isLoading: false } as any);
    render(
      <Provider>
        <ForkTreeDialog roadmapId={1} />
      </Provider>,
    );
    // Click button to open dialog
    screen.getByText(VIEWER_MESSAGES.FORK_TREE_TITLE).click();
    expect(await screen.findByText(VIEWER_MESSAGES.FORK_TREE_EMPTY)).toBeInTheDocument();
  });

  it('renders fork tree nodes', async () => {
    vi.mocked(useForkTree).mockReturnValue({ data: mockForkTree, isLoading: false } as any);
    render(
      <Provider>
        <ForkTreeDialog roadmapId={1} />
      </Provider>,
    );
    screen.getByText(VIEWER_MESSAGES.FORK_TREE_TITLE).click();
    expect(await screen.findByText('Original Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Forked Roadmap')).toBeInTheDocument();
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.getByText('@bob')).toBeInTheDocument();
  });
});
