import type { Meta, StoryObj } from '@storybook/react';
import { EditorInput } from './index';

const meta = {
  title: 'Editor/Atoms/EditorInput',
  component: EditorInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드 레이블',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
    value: {
      control: 'text',
      description: '입력 값',
    },
    isMultiline: {
      control: 'boolean',
      description: '멀티라인(textarea) 여부',
    },
    hasError: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled 상태 여부',
    },
  },
} satisfies Meta<typeof EditorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 EditorInput (레이블 없음)
 */
export const Default: Story = {
  args: {
    placeholder: '자료 링크 입력',
  },
};

/**
 * 레이블이 있는 EditorInput
 */
export const WithLabel: Story = {
  args: {
    label: '노드 이름',
    placeholder: '노드 이름을 입력하세요',
  },
};

/**
 * 값이 있는 EditorInput
 */
export const WithValue: Story = {
  args: {
    label: '자료 링크',
    placeholder: '자료 링크 입력',
    value: "Justin'sVelog@velog.fejwnajwaf",
  },
};

/**
 * 멀티라인 (Textarea) EditorInput
 */
export const Multiline: Story = {
  args: {
    label: '노드 설명',
    placeholder: '노드 설명을 입력하세요',
    isMultiline: true,
  },
};

/**
 * 에러 상태 EditorInput
 */
export const WithError: Story = {
  args: {
    label: '자료 링크',
    placeholder: '자료 링크 입력',
    value: 'invalid-url',
    hasError: true,
    errorMessage: '올바른 URL을 입력하세요',
  },
};

/**
 * Disabled 상태 EditorInput
 */
export const Disabled: Story = {
  args: {
    label: '노드 이름',
    placeholder: '비활성화된 입력 필드',
    value: '수정 불가',
    isDisabled: true,
  },
};

/**
 * 긴 텍스트가 있는 Multiline EditorInput
 */
export const MultilineWithValue: Story = {
  args: {
    label: '노드 설명',
    placeholder: '노드 설명을 입력하세요',
    value:
      'React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.\n컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 만들 수 있습니다.',
    isMultiline: true,
  },
};
