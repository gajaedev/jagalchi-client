import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { SectionSidebar } from './index';

vi.mock('lucide-react', () => ({
  Lock: () => <span data-testid="lock-icon" />,
}));

describe('SectionSidebar', () => {
  it('기본 요소들이 렌더링된다', () => {
    render(<SectionSidebar />);

    expect(screen.getByText('섹션 편집')).toBeInTheDocument();
    expect(screen.getByText('Section')).toBeInTheDocument();
    expect(screen.getByLabelText('섹션 제목')).toBeInTheDocument();
    expect(screen.getByLabelText('섹션 색상')).toBeInTheDocument();
  });

  it('기본값이 올바르게 설정된다', () => {
    render(<SectionSidebar />);

    const titleInput = screen.getByLabelText('섹션 제목') as HTMLInputElement;
    expect(titleInput.value).toBe('Section_1');

    const colorInput = screen.getByLabelText('섹션 색상') as HTMLInputElement;
    expect(colorInput.value).toBe('#3b82f6');
  });

  it('섹션 제목을 변경할 수 있다', async () => {
    const user = userEvent.setup();
    render(<SectionSidebar />);

    const titleInput = screen.getByLabelText('섹션 제목');
    await user.clear(titleInput);
    await user.type(titleInput, '새로운 섹션');

    expect(titleInput).toHaveValue('새로운 섹션');
  });

  it('색상 입력이 렌더링된다', () => {
    render(<SectionSidebar />);

    const colorInput = screen.getByLabelText('섹션 색상') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput.type).toBe('color');
  });

  it('잠금 토글이 있다', () => {
    render(<SectionSidebar />);

    const lockSwitch = screen.getByRole('switch', { name: /잠금/i });
    expect(lockSwitch).toBeInTheDocument();
  });
});
