import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

import { profileModeAtom } from '../../../stores/profile-atoms';

import { ProfilePicture } from './index';

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
  AvatarFallback: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

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
  const userName = '홍길동';

  it('renders image in view mode with default alt', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfilePicture src={src} />
      </Wrapper>,
    );
    expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
  });

  it('renders image in view mode with custom userName alt', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <ProfilePicture src={src} userName={userName} />
      </Wrapper>,
    );
    expect(screen.getByAltText(`${userName}의 프로필 사진`)).toBeInTheDocument();
  });

  it('renders edit overlay in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfilePicture src={src} />
      </Wrapper>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('triggers file selection when edit button is clicked', () => {
    const { container } = render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfilePicture src={src} />
      </Wrapper>,
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('calls onUpload when file is selected', async () => {
    const handleUpload = vi.fn();
    const { container } = render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <ProfilePicture src={src} onUpload={handleUpload} />
      </Wrapper>,
    );

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleUpload).toHaveBeenCalledWith(file);
  });
});
