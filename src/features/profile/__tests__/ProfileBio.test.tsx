import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import { ProfileBio } from '../components/molecules/ProfileBio';
import { profileModeAtom } from '../stores/profile-atoms';

interface WrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: (readonly [WritableAtom<unknown, any[], any>, unknown])[];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: WrapperProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const Wrapper = ({ initialValues, children }: WrapperProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

describe('ProfileBio', () => {
  const defaultBio = 'This is a test bio.';

  it('renders text in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfileBio bio={defaultBio} />
      </Wrapper>,
    );
    expect(screen.getByText('자기소개')).toBeInTheDocument();
    expect(screen.getByText(defaultBio)).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('renders textarea in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileBio bio={defaultBio} />
      </Wrapper>,
    );
    expect(screen.getByText('자기소개')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(defaultBio);
  });

  it('updates input value in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileBio bio={defaultBio} />
      </Wrapper>,
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New bio content' } });
    expect(textarea).toHaveValue('New bio content');
  });
});
