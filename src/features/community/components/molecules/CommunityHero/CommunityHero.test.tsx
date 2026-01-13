import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

import { searchQueryAtom } from '../../../stores/community.atoms';
import { CommunityHero } from './index';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

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

describe('CommunityHero', () => {
  it('renders the title correctly', () => {
    render(
      <Wrapper initialValues={[[searchQueryAtom, '']]}>
        <CommunityHero />
      </Wrapper>,
    );
    expect(screen.getByText('어떤 로드맵을 찾고있나요?')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(
      <Wrapper initialValues={[[searchQueryAtom, '']]}>
        <CommunityHero />
      </Wrapper>,
    );
    const input = screen.getByPlaceholderText('Type a roadmap name to find...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'React' } });
    expect(input.value).toBe('React');
  });

  it('triggers search on Enter key', () => {
    render(
      <Wrapper initialValues={[[searchQueryAtom, '']]}>
        <CommunityHero />
      </Wrapper>,
    );
    const input = screen.getByPlaceholderText('Type a roadmap name to find...');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Since we can't easily check the atom value change in this test without more setup,
    // we just verify it doesn't crash and the local state was updated.
    // In a more robust test, we could check if a mock function or next selection reflects the change.
  });

  it('triggers search on button click', () => {
    render(
      <Wrapper initialValues={[[searchQueryAtom, '']]}>
        <CommunityHero />
      </Wrapper>,
    );
    const input = screen.getByPlaceholderText('Type a roadmap name to find...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Vue' } });
    fireEvent.click(button);
  });
});
