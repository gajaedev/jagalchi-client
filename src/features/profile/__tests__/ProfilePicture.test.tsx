import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

import { ProfilePicture } from '../components/atoms/ProfilePicture';
import { profileModeAtom } from '../stores/profile-atoms';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }),
}));

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

describe('ProfilePicture', () => {
  const src = 'http://example.com/pic.jpg';

  it('renders image in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfilePicture src={src} />
      </Wrapper>,
    );
    expect(screen.getByAltText('profile picture')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders edit overlay in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfilePicture src={src} />
      </Wrapper>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('triggers file input click on button click', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfilePicture src={src} />
      </Wrapper>,
    );

    const clickSpy = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      click: clickSpy,
    } as unknown as HTMLElement);

    fireEvent.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalled();
  });
});
