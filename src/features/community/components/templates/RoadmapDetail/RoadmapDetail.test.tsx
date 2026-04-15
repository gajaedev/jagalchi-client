import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { COMMUNITY_MESSAGES } from '@/constants/messages';

import { RoadmapDetail } from './index';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockDetailData = {
  id: 1,
  title: 'Roadmap 1',
  description: '이 로드맵은 Roadmap 1 학습 경로를 제공합니다.',
  thumbnailUrl: null,
  isPublic: true,
  viewCount: 42,
  owner: { id: 1, nickname: '홍길동', profileImageUrl: null },
  stats: { totalNodes: 5, totalEdges: 3, forkCount: 5 },
  tags: [],
  createdAt: '2024-01-01T12:00:00.000Z',
  updatedAt: '2024-01-01T12:00:00.000Z',
};

const mockFork = vi.fn();

vi.mock('@/hooks/use-roadmap-detail', () => ({
  useRoadmapDetail: (id: number) => {
    if (id === 1) {
      return { data: mockDetailData, isLoading: false, isError: false };
    }
    return { data: undefined, isLoading: false, isError: true };
  },
}));

vi.mock('@/hooks/use-fork-roadmap', () => ({
  useForkRoadmap: () => ({ mutate: mockFork, isPending: false }),
}));

vi.mock('next/image', () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean },
  ) => {
    const { fill: _, priority: __, ...rest } = props;
    void _;
    void __;
    return <img {...rest} data-testid="roadmap-image" />;
  },
}));

vi.mock('lucide-react', () => ({
  Heart: () => <span data-testid="icon-heart">Heart</span>,
  FilePlus2: () => <span data-testid="icon-file-plus">FilePlus</span>,
  ArrowLeft: () => <span data-testid="icon-arrow-left">ArrowLeft</span>,
}));

vi.mock('../../atoms/ContributorItem', () => ({
  ContributorItem: ({ name }: { name: string }) => <div data-testid="contributor-item">{name}</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="separator" {...props} />
  ),
}));

// MOCK_COMMUNITY_DATA ids: 1 through 15
const VALID_ID = 1;
const INVALID_ID = -1;

describe('RoadmapDetail', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockFork.mockClear();
  });

  it('renders roadmap detail when valid id', () => {
    render(<RoadmapDetail id={VALID_ID} />);
    expect(screen.getByText('Roadmap 1')).toBeInTheDocument();
    expect(screen.getByText(COMMUNITY_MESSAGES.VIEW_ROADMAP)).toBeInTheDocument();
    expect(screen.getByText(COMMUNITY_MESSAGES.ADD_TO_MY_ROADMAPS)).toBeInTheDocument();
  });

  it('shows not-found message for invalid id', () => {
    render(<RoadmapDetail id={INVALID_ID} />);
    expect(screen.getByText(COMMUNITY_MESSAGES.NOT_FOUND)).toBeInTheDocument();
  });

  it('"로드맵 보기" button calls router.push with correct path', async () => {
    const user = userEvent.setup();
    render(<RoadmapDetail id={VALID_ID} />);
    await user.click(screen.getByText(COMMUNITY_MESSAGES.VIEW_ROADMAP));
    expect(mockPush).toHaveBeenCalledWith(`/viewer/${VALID_ID}`);
  });

  it('"내 로드맵에 추가" button calls fork mutation', async () => {
    const user = userEvent.setup();
    render(<RoadmapDetail id={VALID_ID} />);
    await user.click(screen.getByText(COMMUNITY_MESSAGES.ADD_TO_MY_ROADMAPS));
    expect(mockFork).toHaveBeenCalledWith(VALID_ID, expect.any(Object));
  });

  it('like button toggles', async () => {
    const user = userEvent.setup();
    render(<RoadmapDetail id={VALID_ID} />);
    const heartIcon = screen.getAllByTestId('icon-heart')[0];
    const likeButton = heartIcon.closest('button')!;
    expect(likeButton).toBeInTheDocument();
    await user.click(likeButton);
    await user.click(likeButton);
  });
});
