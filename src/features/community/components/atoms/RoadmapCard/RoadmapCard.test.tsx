import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RoadmapCard } from './index';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('RoadmapCard', () => {
  it('renders the title and author correctly', () => {
    render(<RoadmapCard id="test-1" title="Test Roadmap" author="John Doe" />);

    expect(screen.getByText('Test Roadmap')).toBeInTheDocument();
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
  });

  it('renders the placeholder icon when no imageUrl is provided', () => {
    const { container } = render(
      <RoadmapCard id="test-2" title="Test Roadmap" author="John Doe" />,
    );

    const svg = container.querySelector('.lucide-square-dashed');
    expect(svg).toBeInTheDocument();
  });

  it('renders the image when imageUrl is provided', () => {
    const imageUrl = 'https://example.com/image.png';
    render(<RoadmapCard id="test-3" title="Test Roadmap" author="John Doe" imageUrl={imageUrl} />);

    const image = screen.getByAltText('Test Roadmap');
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute('src');
  });
});
