import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import { ProfileCustomLink } from '../components/atoms/ProfileCustomLink';
import { profileModeAtom } from '../stores/profile-atoms';

interface WrapperProps {
  initialValues: (readonly [WritableAtom<unknown, any[], any>, unknown])[];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: WrapperProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }: WrapperProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

describe('ProfileCustomLink', () => {
  it('renders nothing when no links and not in edit mode', () => {
    render(
      <TestProvider initialValues={[[profileModeAtom, 'show']]}>
        <ProfileCustomLink initialLinks={[]} />
      </TestProvider>,
    );
    expect(screen.queryByText('링크추가')).not.toBeInTheDocument();
  });

  it('renders add button in edit mode', () => {
    render(
      <TestProvider initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileCustomLink initialLinks={[]} />
      </TestProvider>,
    );
    expect(screen.getByRole('button', { name: /링크추가/ })).toBeInTheDocument();
  });

  it('adds new link input fields when button clicked', () => {
    render(
      <TestProvider initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileCustomLink initialLinks={[]} />
      </TestProvider>,
    );

    const addButton = screen.getByRole('button', { name: /링크추가/ });
    fireEvent.click(addButton);

    expect(screen.getByPlaceholderText('링크 이름')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://')).toBeInTheDocument();
    expect(addButton).toHaveTextContent('링크추가(1/5)');
  });

  it('disables add button when max links reached', () => {
    const initialLinks = Array(4).fill({ name: 'test', url: 'http://test.com' });

    render(
      <TestProvider initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileCustomLink initialLinks={initialLinks} />
      </TestProvider>,
    );

    const addButton = screen.getByRole('button', { name: /링크추가/ });
    expect(addButton).not.toBeDisabled();

    fireEvent.click(addButton);
    expect(addButton).toHaveTextContent('링크추가(5/5)');
    expect(addButton).toBeDisabled();
  });
});
