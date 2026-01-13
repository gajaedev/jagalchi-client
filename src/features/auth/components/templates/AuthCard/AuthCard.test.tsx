import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AuthCard } from './index';

describe('AuthCard', () => {
  it('제목과 본문을 렌더링한다', () => {
    render(
      <AuthCard title="테스트 제목">
        <div>테스트 본문</div>
      </AuthCard>,
    );

    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
    expect(screen.getByText('테스트 본문')).toBeInTheDocument();
  });

  it('설명이 있을 때 렌더링한다', () => {
    render(
      <AuthCard title="테스트 제목" description="테스트 설명">
        <div>테스트 본문</div>
      </AuthCard>,
    );

    expect(screen.getByText('테스트 설명')).toBeInTheDocument();
  });

  it('설명이 없을 때 렌더링되지 않는다', () => {
    render(
      <AuthCard title="테스트 제목">
        <div>테스트 본문</div>
      </AuthCard>,
    );

    expect(screen.queryByText('테스트 설명')).not.toBeInTheDocument();
  });

  it('footer가 있을 때 렌더링한다', () => {
    render(
      <AuthCard title="테스트 제목" footer={<div>테스트 푸터</div>}>
        <div>테스트 본문</div>
      </AuthCard>,
    );

    expect(screen.getByText('테스트 푸터')).toBeInTheDocument();
  });

  it('footer가 없을 때 렌더링되지 않는다', () => {
    render(
      <AuthCard title="테스트 제목">
        <div>테스트 본문</div>
      </AuthCard>,
    );

    expect(screen.queryByText('테스트 푸터')).not.toBeInTheDocument();
  });

  it('커스텀 className을 적용한다', () => {
    const { container } = render(
      <AuthCard title="테스트 제목" className="custom-class">
        <div>테스트 본문</div>
      </AuthCard>,
    );

    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('children을 올바르게 렌더링한다', () => {
    render(
      <AuthCard title="테스트">
        <div data-testid="child-element">자식 엘리먼트</div>
      </AuthCard>,
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('자식 엘리먼트')).toBeInTheDocument();
  });
});
