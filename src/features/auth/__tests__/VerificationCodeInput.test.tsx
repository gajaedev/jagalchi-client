import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VerificationCodeInput } from '../components/molecules/VerificationCodeInput';

describe('VerificationCodeInput', () => {
  it('isCodeSent가 false일 때 input이 비활성화된다', () => {
    render(<VerificationCodeInput isCodeSent={false} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('isCodeSent가 true일 때 input이 활성화된다', () => {
    render(<VerificationCodeInput isCodeSent={true} />);
    expect(screen.getByRole('textbox')).toBeEnabled();
  });

  it('placeholder를 표시한다', () => {
    render(<VerificationCodeInput isCodeSent={true} />);
    expect(screen.getByPlaceholderText('인증번호 입력')).toBeInTheDocument();
  });

  it('id 속성이 설정된다', () => {
    render(<VerificationCodeInput isCodeSent={true} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'verificationCode');
  });
});
