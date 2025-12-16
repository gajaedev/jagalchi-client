import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormField } from '../components/molecules/FormField';

describe('FormField', () => {
  it('label을 렌더링한다', () => {
    render(
      <FormField label="이메일" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('children을 렌더링한다', () => {
    render(
      <FormField label="이메일" htmlFor="email">
        <input id="email" data-testid="email-input" />
      </FormField>,
    );
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('error가 있으면 에러 메시지를 표시한다', () => {
    render(
      <FormField label="이메일" htmlFor="email" error="이메일을 입력해주세요">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('이메일을 입력해주세요');
  });

  it('error가 없으면 에러 메시지를 표시하지 않는다', () => {
    render(
      <FormField label="이메일" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('labelExtra가 있으면 렌더링한다', () => {
    render(
      <FormField
        label="비밀번호"
        htmlFor="password"
        labelExtra={<a href="/forgot">비밀번호 찾기</a>}
      >
        <input id="password" type="password" />
      </FormField>,
    );
    expect(screen.getByText('비밀번호 찾기')).toBeInTheDocument();
  });

  it('label의 for 속성이 올바르게 설정된다', () => {
    render(
      <FormField label="이메일" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    const label = screen.getByText('이메일');
    expect(label).toHaveAttribute('for', 'email');
  });
});
