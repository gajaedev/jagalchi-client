import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import { ProfileInfoForm } from '../components/molecules/ProfileInfoForm';
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

describe('ProfileInfoForm', () => {
  const defaultProps = {
    name: 'Test User',
    email: 'test@example.com',
  };

  it('renders correctly in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfileInfoForm {...defaultProps} />
      </Wrapper>,
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Test User')).not.toBeInTheDocument();
  });

  it('renders inputs in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileInfoForm {...defaultProps} />
      </Wrapper>,
    );
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('updates inputs when typed', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileInfoForm {...defaultProps} />
      </Wrapper>,
    );

    const nameInput = screen.getByDisplayValue('Test User');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput).toHaveValue('New Name');
  });
});
