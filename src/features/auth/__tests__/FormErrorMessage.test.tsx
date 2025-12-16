import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormErrorMessage } from '../components/atoms/FormErrorMessage';

describe('FormErrorMessage', () => {
  it('메시지가 있으면 렌더링한다', () => {
    render(<FormErrorMessage message="에러 메시지입니다" />);
    expect(screen.getByRole('alert')).toHaveTextContent('에러 메시지입니다');
  });

  it('메시지가 없으면 렌더링하지 않는다', () => {
    render(<FormErrorMessage />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('메시지가 빈 문자열이면 렌더링하지 않는다', () => {
    render(<FormErrorMessage message="" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
