import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsToolbar } from './index';

describe('MyRoadmapsToolbar', () => {
  it('renders breadcrumbs correctly', () => {
    render(<MyRoadmapsToolbar />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Components')).toBeDefined();
    expect(screen.getByText('Breadcrumb')).toBeDefined();
  });

  it('renders search input', () => {
    render(<MyRoadmapsToolbar />);
    expect(screen.getByPlaceholderText('로드맵 검색')).toBeDefined();
  });

  it('renders action buttons', () => {
    render(<MyRoadmapsToolbar />);
    expect(screen.getByRole('button', { name: /new/i })).toBeDefined();
  });
});
