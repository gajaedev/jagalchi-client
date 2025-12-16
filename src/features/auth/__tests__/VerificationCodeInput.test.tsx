import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { VerificationCodeInput } from '../components/molecules/VerificationCodeInput';

describe('VerificationCodeInput', () => {
  it('인증번호 레이블을 렌더링한다', () => {
    render(<VerificationCodeInput isCodeSent={false} />);
    expect(screen.getByText('인증번호')).toBeInTheDocument();
  });

  it('isCodeSent가 false일 때 input이 비활성화된다', () => {
    render(<VerificationCodeInput isCodeSent={false} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('isCodeSent가 true일 때 input이 활성화된다', () => {
    render(<VerificationCodeInput isCodeSent={true} />);
    expect(screen.getByRole('textbox')).toBeEnabled();
  });

  it('isCodeSent가 true일 때 재전송 버튼을 표시한다', () => {
    render(<VerificationCodeInput isCodeSent={true} onResend={() => {}} />);
    expect(screen.getByRole('button', { name: '인증번호 재전송' })).toBeInTheDocument();
  });

  it('isCodeSent가 false일 때 재전송 버튼을 표시하지 않는다', () => {
    render(<VerificationCodeInput isCodeSent={false} onResend={() => {}} />);
    expect(screen.queryByRole('button', { name: '인증번호 재전송' })).not.toBeInTheDocument();
  });

  it('재전송 버튼 클릭 시 onResend를 호출한다', async () => {
    const user = userEvent.setup();
    const handleResend = vi.fn();

    render(<VerificationCodeInput isCodeSent={true} onResend={handleResend} />);
    await user.click(screen.getByRole('button', { name: '인증번호 재전송' }));

    expect(handleResend).toHaveBeenCalledTimes(1);
  });

  it('errorMessage가 있으면 에러를 표시한다', () => {
    render(<VerificationCodeInput isCodeSent={true} errorMessage="인증번호를 입력해주세요" />);
    expect(screen.getByRole('alert')).toHaveTextContent('인증번호를 입력해주세요');
  });

  it('errorMessage가 있으면 aria-invalid가 설정된다', () => {
    render(<VerificationCodeInput isCodeSent={true} errorMessage="인증번호를 입력해주세요" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
