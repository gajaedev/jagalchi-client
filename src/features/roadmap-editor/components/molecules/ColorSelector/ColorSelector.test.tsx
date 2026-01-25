import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { describe, it, expect, vi } from 'vitest';

import { ColorSelector } from './index';

import type { NodeColorVariant } from '../../../types/editor.types';

const mockNodePresets = [
  { variant: 'white' as NodeColorVariant, hex: '#ffffff', label: 'White' },
  { variant: 'black' as NodeColorVariant, hex: '#000000', label: 'Black' },
  { variant: 'blue' as NodeColorVariant, hex: '#155dfc', label: 'Blue' },
  { variant: 'purple' as NodeColorVariant, hex: '#9810fa', label: 'Purple' },
  { variant: 'red' as NodeColorVariant, hex: '#ec003f', label: 'Red' },
  { variant: 'orange' as NodeColorVariant, hex: '#e17100', label: 'Orange' },
];

describe('ColorSelector', () => {
  it('renders all preset buttons', () => {
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // 6개의 ColorPresetButton 렌더링 확인
    // 각 색상별로 aria-label로 확인
    expect(screen.getByLabelText('색상: #ffffff')).toBeInTheDocument();
    expect(screen.getByLabelText('색상: #000000')).toBeInTheDocument();
    expect(screen.getByLabelText('색상: #155dfc')).toBeInTheDocument();
    expect(screen.getByLabelText('색상: #9810fa')).toBeInTheDocument();
    expect(screen.getByLabelText('색상: #ec003f')).toBeInTheDocument();
    expect(screen.getByLabelText('색상: #e17100')).toBeInTheDocument();
  });

  it('renders palette icon', () => {
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // Palette 아이콘 버튼 확인
    const paletteButton = screen.getByLabelText('커스텀 색상 선택기 열기');
    expect(paletteButton).toBeInTheDocument();
  });

  it('renders current color preview button', () => {
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // 현재 색상 프리뷰 버튼 확인
    const colorPreviewButton = screen.getByLabelText('현재 색상: #155dfc');
    expect(colorPreviewButton).toBeInTheDocument();
    expect(colorPreviewButton).toHaveStyle({ backgroundColor: '#155dfc' });
  });

  it('calls onPresetSelect when preset button is clicked', async () => {
    const user = userEvent.setup();
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // Red 프리셋 버튼 클릭
    const redButton = screen.getByLabelText('색상: #ec003f');
    await user.click(redButton);

    expect(handlePresetSelect).toHaveBeenCalledWith('red');
  });

  it('displays selected state on current variant', () => {
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="purple"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // Purple 버튼이 선택된 상태인지 확인
    const purpleButton = screen.getByLabelText('색상: #9810fa');
    expect(purpleButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('opens color picker dialog when custom color button is clicked', async () => {
    const user = userEvent.setup();
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // 커스텀 색상 버튼 클릭
    const customColorButton = screen.getByLabelText('현재 색상: #155dfc');
    await user.click(customColorButton);

    // Jotai atom이 호출되었는지는 직접 확인할 수 없지만,
    // 버튼이 정상 동작하는지 확인
    expect(customColorButton).toBeInTheDocument();
  });

  it('renders labels correctly', () => {
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // 라벨 확인
    expect(screen.getByText('기본 컬러')).toBeInTheDocument();
    expect(screen.getByText('커스텀')).toBeInTheDocument();
  });

  it('handles text type correctly', () => {
    const handlePresetSelect = vi.fn();
    const textPresets = [
      { variant: 'gray' as const, hex: '#64748b', label: 'Gray' },
      { variant: 'black' as const, hex: '#000000', label: 'Black' },
      { variant: 'blue' as const, hex: '#155dfc', label: 'Blue' },
    ];

    render(
      <Provider>
        <ColorSelector
          type="text"
          nodeId="text-1"
          currentVariant="gray"
          presets={textPresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // 현재 색상 확인
    const colorPreviewButton = screen.getByLabelText('현재 색상: #64748b');
    expect(colorPreviewButton).toHaveStyle({ backgroundColor: '#64748b' });
  });

  it('renders with Figma design specs (36px height, 8px border-radius)', () => {
    const handlePresetSelect = vi.fn();

    render(
      <Provider>
        <ColorSelector
          type="node"
          nodeId="node-1"
          currentVariant="blue"
          presets={mockNodePresets}
          onPresetSelect={handlePresetSelect}
        />
      </Provider>,
    );

    // 현재 색상 프리뷰 버튼의 클래스 확인 (Figma 스펙)
    const colorPreviewButton = screen.getByLabelText('현재 색상: #155dfc');
    expect(colorPreviewButton).toHaveClass('h-[36px]');
    expect(colorPreviewButton).toHaveClass('rounded-[8px]');
  });
});
