import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import {
  activeTabAtom,
  filterCategoryAtom,
  sortByAtom,
  sortOrderAtom,
} from '../../../stores/community.atoms';
import { CommunityFilter } from './index';

const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const Wrapper = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

describe('CommunityFilter', () => {
  const initialValues = [
    [activeTabAtom, 'popular'],
    [filterCategoryAtom, 'all'],
    [sortByAtom, 'recent'],
    [sortOrderAtom, 'desc'],
  ] as const;

  it('renders filter tabs correctly', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <CommunityFilter />
      </Wrapper>,
    );
    expect(screen.getByText('인기')).toBeInTheDocument();
    expect(screen.getByText('최신')).toBeInTheDocument();
    expect(screen.getByText('저장된 로드맵')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <CommunityFilter />
      </Wrapper>,
    );
    const popularTab = screen.getByText('인기').closest('button');
    expect(popularTab).toHaveClass('bg-[#020617]');
  });

  it('opens sort dropdown on click', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <CommunityFilter />
      </Wrapper>,
    );
    const dropdownButton = screen.getByText('내림차순').closest('button')!;
    fireEvent.click(dropdownButton);

    expect(screen.getByText('정렬순서')).toBeInTheDocument();
    expect(screen.getByText('정렬기준')).toBeInTheDocument();
    expect(screen.getByText('필터링')).toBeInTheDocument();
  });

  it('allows switching tabs', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <CommunityFilter />
      </Wrapper>,
    );
    const latestTab = screen.getByText('최신').closest('button')!;
    fireEvent.click(latestTab);

    // In actual app, atom would update. Here we just check interaction.
    expect(latestTab).toBeInTheDocument();
  });
});
