import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('../atoms/RoadmapCard', () => ({
  RoadmapCard: ({ title, author }: any) => (
    <div data-testid="roadmap-card">
      <span>{title}</span>
      <span>By {author}</span>
    </div>
  ),
}));

import { render, screen } from '@testing-library/react';
import { CommunityGrid } from './CommunityGrid';

const mockItems = [
  { id: '1', title: 'Roadmap 1', author: 'Author 1', imageUrl: 'url1' },
  { id: '2', title: 'Roadmap 2', author: 'Author 2' },
];

describe('CommunityGrid', () => {
  it('renders a list of RoadmapCard components', () => {
    render(<CommunityGrid items={mockItems} />);

    expect(screen.getByText('Roadmap 1')).toBeInTheDocument();
    expect(screen.getByText('By Author 1')).toBeInTheDocument();
    expect(screen.getByText('Roadmap 2')).toBeInTheDocument();
    expect(screen.getByText('By Author 2')).toBeInTheDocument();
  });

  it('renders empty state message when items list is empty', () => {
    render(<CommunityGrid items={[]} />);

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });
});
