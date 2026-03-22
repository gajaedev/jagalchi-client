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

// MOCK_COMMUNITY_DATA ids: '1' through '15'
const VALID_ID = '1';
const INVALID_ID = 'does-not-exist';

describe('RoadmapDetail', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
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

  it('"내 로드맵에 추가" button calls window.alert with login message', async () => {
    const user = userEvent.setup();
    render(<RoadmapDetail id={VALID_ID} />);
    await user.click(screen.getByText(COMMUNITY_MESSAGES.ADD_TO_MY_ROADMAPS));
    expect(window.alert).toHaveBeenCalledWith(COMMUNITY_MESSAGES.LOGIN_REQUIRED);
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
