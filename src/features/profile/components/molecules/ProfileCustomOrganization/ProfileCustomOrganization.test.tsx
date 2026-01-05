import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect } from 'vitest';

import { profileModeAtom } from '../../../stores/profile-atoms';

import { ProfileCustomOrganization } from './index';

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

describe('ProfileCustomOrganization', () => {
  const initialValue = 'Test Corp';

  it('renders value rendering in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfileCustomOrganization initialValue={initialValue} />
      </Wrapper>,
    );
    expect(screen.getByText(initialValue)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('소속을 입력해주세요')).not.toBeInTheDocument();
  });

  it('renders nothing if empty in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfileCustomOrganization initialValue="" />
      </Wrapper>,
    );
    expect(screen.queryByText('Test Corp')).not.toBeInTheDocument();
  });

  it('renders input in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileCustomOrganization initialValue={initialValue} />
      </Wrapper>,
    );
    expect(screen.getByPlaceholderText('소속을 입력해주세요')).toHaveValue(initialValue);
  });

  it('updates input value', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfileCustomOrganization initialValue={initialValue} />
      </Wrapper>,
    );
    const input = screen.getByPlaceholderText('소속을 입력해주세요');
    fireEvent.change(input, { target: { value: 'New Corp' } });
    expect(input).toHaveValue('New Corp');
  });
});
