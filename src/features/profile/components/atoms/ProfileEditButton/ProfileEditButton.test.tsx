import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ProfileEditButton } from './index';

describe('ProfileEditButton', () => {
  it('renders "편집하기" when variant is "show"', () => {
    render(<ProfileEditButton variant="show" />);
    expect(screen.getByRole('button')).toHaveTextContent('편집하기');
  });

  it('renders "편집 모드 나가기" when variant is "edit"', () => {
    render(<ProfileEditButton variant="edit" />);
    expect(screen.getByRole('button')).toHaveTextContent('편집 모드 나가기');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ProfileEditButton variant="show" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
