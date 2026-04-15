import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsLayout } from './index';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Provider>{ui}</Provider>
    </QueryClientProvider>,
  );
};

describe('MyRoadmapsLayout', () => {
  it('renders children', () => {
    renderWithProvider(
      <MyRoadmapsLayout>
        <div>child content</div>
      </MyRoadmapsLayout>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders sidebar', () => {
    renderWithProvider(
      <MyRoadmapsLayout>
        <div>child</div>
      </MyRoadmapsLayout>,
    );
    expect(screen.getByText('내 로드맵')).toBeInTheDocument();
  });
});
