import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsGrid } from './index';

describe('MyRoadmapsGrid', () => {
  const mockRoadmaps = [
    { id: '1', title: 'Roadmap 1' },
    { id: '2', title: 'Roadmap 2' },
    { id: '3', title: 'Roadmap 3' },
  ];

  it('renders correctly', () => {
    render(<MyRoadmapsGrid roadmaps={mockRoadmaps} />);
    expect(screen.getByText('Roadmap 1')).toBeDefined();
    expect(screen.getByText('Roadmap 2')).toBeDefined();
    expect(screen.getByText('Roadmap 3')).toBeDefined();
  });

  it('renders empty state correctly', () => {
    render(<MyRoadmapsGrid roadmaps={[]} />);
    expect(screen.queryByText('Roadmap 1')).toBeNull();
  });
});
