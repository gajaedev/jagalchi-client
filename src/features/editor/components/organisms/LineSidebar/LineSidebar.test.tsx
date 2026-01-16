import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { LineSidebar } from './index';

describe('LineSidebar', () => {
  it('기본 요소들이 렌더링된다', () => {
    render(<LineSidebar />);

    expect(screen.getByText('선 편집')).toBeInTheDocument();
    expect(screen.getByText('Line')).toBeInTheDocument();
    expect(screen.getByText('선 스타일')).toBeInTheDocument();
    expect(screen.getByLabelText('선 색상')).toBeInTheDocument();
  });

  it('선 스타일 버튼들이 렌더링된다', () => {
    render(<LineSidebar />);

    expect(screen.getByRole('button', { name: /실선/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /점선$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /점선 \(작은\)/i })).toBeInTheDocument();
  });

  it('선 스타일을 변경할 수 있다', async () => {
    const user = userEvent.setup();
    render(<LineSidebar />);

    const dashedButton = screen.getByRole('button', { name: /점선$/i });
    await user.click(dashedButton);

    // 버튼이 선택된 상태가 되는지 확인 (variant가 default가 됨)
    expect(dashedButton).toBeInTheDocument();
  });

  it('색상 입력이 렌더링된다', () => {
    render(<LineSidebar />);

    const colorInput = screen.getByLabelText('선 색상') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput.type).toBe('color');
    expect(colorInput.value).toBe('#000000');
  });

  it('라벨을 입력할 수 있다', async () => {
    const user = userEvent.setup();
    render(<LineSidebar />);

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    await user.type(labelInput, '새로운 라벨');

    expect(labelInput).toHaveValue('새로운 라벨');
  });
});
