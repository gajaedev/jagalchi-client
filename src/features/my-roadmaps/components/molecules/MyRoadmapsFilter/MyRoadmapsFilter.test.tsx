import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import { filterCategoryAtom, sortByAtom, sortOrderAtom } from '../../../stores/my-roadmaps.atoms';
import { MyRoadmapsFilter } from './MyRoadmapsFilter';

const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: [any, any][];
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
};

const Wrapper = ({
  initialValues,
  children,
}: {
  initialValues: [any, any][];
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

describe('MyRoadmapsFilter', () => {
  const initialValues: [any, any][] = [
    [filterCategoryAtom, 'all'],
    [sortByAtom, 'recent'],
    [sortOrderAtom, 'desc'],
  ];

  it('renders all filter sections correctly', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <MyRoadmapsFilter />
      </Wrapper>,
    );
    expect(screen.getByText('정렬순서')).toBeInTheDocument();
    expect(screen.getByText('정렬기준')).toBeInTheDocument();
    expect(screen.getByText('필터링')).toBeInTheDocument();
  });

  it('highlights the active sort order', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <MyRoadmapsFilter />
      </Wrapper>,
    );
    const descButton = screen.getByText('내림차순').closest('button');
    expect(descButton).toHaveClass('bg-[#E2E8F0]');
  });

  it('highlights the active sort criterion', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <MyRoadmapsFilter />
      </Wrapper>,
    );
    const recentButton = screen.getByText('최신순').closest('button');
    expect(recentButton).toHaveClass('bg-[#E2E8F0]');
  });

  it('highlights the active filter category', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <MyRoadmapsFilter />
      </Wrapper>,
    );
    const allButton = screen.getByText('전체').closest('button');
    expect(allButton).toHaveClass('bg-[#E2E8F0]');
  });

  it('updates selection state when an item is clicked', () => {
    render(
      <Wrapper initialValues={initialValues}>
        <MyRoadmapsFilter />
      </Wrapper>,
    );
    const ascButton = screen.getByText('오름차순').closest('button')!;
    fireEvent.click(ascButton);
    expect(ascButton).toHaveClass('bg-[#E2E8F0]');

    // Previous descending button should not have active class anymore
    const descButton = screen.getByText('내림차순').closest('button');
    expect(descButton).not.toHaveClass('bg-[#E2E8F0]');
  });
});
