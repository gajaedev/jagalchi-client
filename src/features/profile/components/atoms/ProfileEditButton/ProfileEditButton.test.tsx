import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ProfileEditButton } from './index';

describe('ProfileEditButton', () => {
  it('renders "프로필 수정" when variant is "show"', () => {
    render(<ProfileEditButton variant="show" />);
    expect(screen.getByRole('button')).toHaveTextContent('프로필 수정');
  });

  it('renders "수정 완료" when variant is "edit"', () => {
    render(<ProfileEditButton variant="edit" />);
    expect(screen.getByRole('button')).toHaveTextContent('수정 완료');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ProfileEditButton variant="show" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
