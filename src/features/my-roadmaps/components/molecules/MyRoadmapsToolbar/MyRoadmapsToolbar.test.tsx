import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsToolbar } from './index';

describe('MyRoadmapsToolbar', () => {
  it('renders breadcrumbs correctly', () => {
    render(<MyRoadmapsToolbar />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('My Roadmaps')).toBeDefined();
  });

  it('renders search input', () => {
    render(<MyRoadmapsToolbar />);
    expect(screen.getByPlaceholderText('Search...')).toBeDefined();
  });

  it('renders action buttons', () => {
    render(<MyRoadmapsToolbar />);
    expect(screen.getByRole('button', { name: /create/i })).toBeDefined();
  });
});
