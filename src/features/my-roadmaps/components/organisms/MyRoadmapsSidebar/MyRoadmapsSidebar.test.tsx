import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsSidebar } from './index';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Provider>{ui}</Provider>
    </QueryClientProvider>,
  );
};

describe('MyRoadmapsSidebar', () => {
  it('renders all sidebar categories', () => {
    renderWithProvider(<MyRoadmapsSidebar />);
    expect(screen.getByText('최근')).toBeInTheDocument();
    expect(screen.getByText('커뮤니티')).toBeInTheDocument();
    expect(screen.getByText('내 로드맵')).toBeInTheDocument();
    expect(screen.getByText('공유된 로드맵')).toBeInTheDocument();
    expect(screen.getByText('즐겨찾기')).toBeInTheDocument();
  });

  it('clicking a category changes the active category', async () => {
    const user = userEvent.setup();
    renderWithProvider(<MyRoadmapsSidebar />);

    const recentButton = screen.getByText('최근').closest('button')!;
    await user.click(recentButton);
    expect(recentButton).toHaveClass('bg-slate-200');

    const myRoadmapButton = screen.getByText('내 로드맵').closest('button')!;
    expect(myRoadmapButton).not.toHaveClass('bg-slate-200');
  });
});
