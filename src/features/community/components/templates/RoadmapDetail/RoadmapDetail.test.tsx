import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { MOCK_COMMUNITY_DATA } from '../../../constants/community.mock';
import { RoadmapDetail } from './index';

// Mock the data module
vi.mock('../../../constants/community.mock', () => ({
  MOCK_COMMUNITY_DATA: [
    {
      id: '1',
      title: 'Test Roadmap',
      author: 'Test Author',
      likes: 10,
      updatedAt: '2024-01-01T00:00:00.000Z',
      type: 'roadmap',
      imageUrl: 'https://example.com/test-image.jpg',
    },
  ],
}));

// Mock NextImage to avoid issues with next/image in tests
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} alt={props.alt} data-testid="roadmap-image" />,
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Heart: () => <span data-testid="icon-heart">Heart</span>,
  FilePlus2: () => <span data-testid="icon-file-plus">FilePlus</span>,
}));

// Mock components used in RoadmapDetail
vi.mock('../../atoms/ContributorItem', () => ({
  ContributorItem: ({ name }: { name: string }) => <div data-testid="contributor-item">{name}</div>,
}));

// Mock shadcn/ui components (simplified)
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));
vi.mock('@/components/ui/separator', () => ({
  Separator: (props: any) => <div data-testid="separator" {...props} />,
}));

describe('RoadmapDetail', () => {
  const mockItem = MOCK_COMMUNITY_DATA[0];

  it('renders "Not Found" message when id is invalid', () => {
    render(<RoadmapDetail id="invalid-id" />);
    expect(screen.getByText('로드맵을 찾을 수 없습니다.')).toBeInTheDocument();
  });

  it('renders roadmap details correctly when id is valid', () => {
    render(<RoadmapDetail id={mockItem.id} />);

    // Check title
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();

    // Check author/contributors (mocked)
    expect(screen.getByText(mockItem.author)).toBeInTheDocument();
    expect(screen.getByText('Co-author')).toBeInTheDocument();
    expect(screen.getByText('Contributor')).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText('좋아요')).toBeInTheDocument();
    expect(screen.getByText('로드맵 보기')).toBeInTheDocument();
    expect(screen.getByText('내 로드맵에 추가')).toBeInTheDocument();

    // Check "About" section presence
    expect(screen.getByText('About')).toBeInTheDocument();
    // Check "Made by" section presence
    expect(screen.getByText('Made by')).toBeInTheDocument();
    // Check "Last updated" section presence
    expect(screen.getByText('마지막 업데이트')).toBeInTheDocument();
  });

  it('renders image when imageUrl is present', () => {
    render(<RoadmapDetail id={mockItem.id} />);
    // Since we mocked next/image as img, we can search by alt text
    const image = screen.getByTestId('roadmap-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockItem.imageUrl);
  });
});
