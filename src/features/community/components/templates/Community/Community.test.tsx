import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, it, expect, vi } from 'vitest';

import { Community } from './index';

vi.mock('../../molecules/CommunityHero', () => ({
  CommunityHero: () => <div data-testid="community-hero">Hero</div>,
}));

vi.mock('../../molecules/CommunityFilter', () => ({
  CommunityFilter: () => <div data-testid="community-filter">Filter</div>,
}));

vi.mock('../../organisms/CommunityGrid', () => ({
  CommunityGrid: () => <div data-testid="community-grid">Grid</div>,
}));

describe('Community Template', () => {
  it('renders all main sections', () => {
    render(
      <Provider>
        <Community />
      </Provider>,
    );

    expect(screen.getByTestId('community-hero')).toBeInTheDocument();
    expect(screen.getByTestId('community-filter')).toBeInTheDocument();
    expect(screen.getByTestId('community-grid')).toBeInTheDocument();
  });
});
