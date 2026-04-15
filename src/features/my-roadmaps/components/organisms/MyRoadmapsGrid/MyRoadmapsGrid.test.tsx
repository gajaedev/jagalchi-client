import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsGrid } from './index';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('MyRoadmapsGrid', () => {
  const mockRoadmaps = [
    { id: 1, title: 'Roadmap 1' },
    { id: 2, title: 'Roadmap 2' },
    { id: 3, title: 'Roadmap 3' },
  ];

  it('renders correctly', () => {
    render(<MyRoadmapsGrid roadmaps={mockRoadmaps} />, { wrapper });
    expect(screen.getByText('Roadmap 1')).toBeDefined();
    expect(screen.getByText('Roadmap 2')).toBeDefined();
    expect(screen.getByText('Roadmap 3')).toBeDefined();
  });

  it('renders empty state correctly', () => {
    render(<MyRoadmapsGrid roadmaps={[]} />, { wrapper });
    expect(screen.queryByText('Roadmap 1')).toBeNull();
  });
});
