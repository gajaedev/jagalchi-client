import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

import { MyRoadmapsToolbar } from './index';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Provider>{ui}</Provider>
    </QueryClientProvider>,
  );
};

describe('MyRoadmapsToolbar', () => {
  it('renders root breadcrumb when no path', () => {
    renderWithProvider(<MyRoadmapsToolbar />);
    expect(screen.getByText('내 전체 로드맵')).toBeDefined();
  });

  it('renders search input', () => {
    renderWithProvider(<MyRoadmapsToolbar />);
    expect(screen.getByPlaceholderText('로드맵 검색')).toBeDefined();
  });

  it('renders action buttons', () => {
    renderWithProvider(<MyRoadmapsToolbar />);
    expect(screen.getByRole('button', { name: /new/i })).toBeDefined();
  });

  it('toggles filter box when filter button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(<MyRoadmapsToolbar />);
    const filterButton = screen.getByRole('button', { name: /filter/i });

    await user.click(filterButton);
    expect(screen.getByText('정렬순서')).toBeInTheDocument();

    await user.click(filterButton);
    expect(screen.queryByText('정렬순서')).not.toBeInTheDocument();
  });

  it('opens AddRoadmapModal when 로드맵 is selected from New menu', async () => {
    const user = userEvent.setup();
    renderWithProvider(<MyRoadmapsToolbar />);
    const newButton = screen.getByRole('button', { name: /new/i });

    await user.click(newButton);

    const roadmapOption = await screen.findByText('로드맵');
    await user.click(roadmapOption);

    expect(screen.getByText('로드맵 추가')).toBeInTheDocument();
  });

  it('opens AddDirectoryModal when 디렉토리 is selected from New menu', async () => {
    const user = userEvent.setup();
    renderWithProvider(<MyRoadmapsToolbar />);
    const newButton = screen.getByRole('button', { name: /new/i });

    await user.click(newButton);

    const directoryOption = await screen.findByText('디렉토리');
    await user.click(directoryOption);

    expect(screen.getByText('디렉토리 추가')).toBeInTheDocument();
  });
});
