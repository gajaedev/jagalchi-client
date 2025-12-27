import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import { ProfileInfomation } from '../components/atoms/ProfileInfomation';
import { profileModeAtom } from '../stores/profile-atoms';

interface WrapperProps {
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

describe('ProfileInfomation', () => {
  const defaultProps = {
    name: 'Test User',
    email: 'test@example.com',
  };

  it('renders correctly in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfileInfomation {...defaultProps} />
      </Wrapper>,
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Test User')).not.toBeInTheDocument();
  });

  it('renders inputs in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileInfomation {...defaultProps} />
      </Wrapper>,
    );
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('updates inputs when typed', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileInfomation {...defaultProps} />
      </Wrapper>,
    );

    const nameInput = screen.getByDisplayValue('Test User');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput).toHaveValue('New Name');
  });
});
