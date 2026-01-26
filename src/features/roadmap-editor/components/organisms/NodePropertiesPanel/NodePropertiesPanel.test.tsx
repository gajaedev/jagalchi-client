import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { NodePropertiesPanel } from '.';

import type { JagalchiNodeType } from '../../../types/editor.types';

const mockNode: JagalchiNodeType = {
  id: 'node-1',
  type: 'jagalchi-node',
  position: { x: 0, y: 0 },
  data: {
    label: 'Test Node',
    description: 'Test Description',
    variant: 'blue',
    isLocked: false,
    resources: ['https://example.com', '', ''],
  },
};

const renderWithProvider = (node: JagalchiNodeType) => {
  return render(
    <Provider>
      <NodePropertiesPanel node={node} />
    </Provider>,
  );
};

describe('NodePropertiesPanel', () => {
  it('renders node header with ID', () => {
    renderWithProvider(mockNode);
    expect(screen.getByText('node-1')).toBeInTheDocument();
  });

  it('renders lock button', () => {
    renderWithProvider(mockNode);
    expect(screen.getByRole('button', { name: /잠금/ })).toBeInTheDocument();
  });

  it('renders node name input', () => {
    renderWithProvider(mockNode);
    expect(screen.getByDisplayValue('Test Node')).toBeInTheDocument();
  });

  it('renders node description textarea', () => {
    renderWithProvider(mockNode);
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('renders AI generation text indicator', () => {
    renderWithProvider(mockNode);
    expect(screen.getByText('AI 생성')).toBeInTheDocument();
  });

  it('renders 3 resource input fields', () => {
    renderWithProvider(mockNode);
    const resourceInputs = screen.getAllByPlaceholderText('URL을 입력하세요');
    expect(resourceInputs).toHaveLength(3);
  });

  it('renders AI recommendation text indicator', () => {
    renderWithProvider(mockNode);
    expect(screen.getByText('AI 추천')).toBeInTheDocument();
  });

  it('disables inputs when node is locked', () => {
    const lockedNode = { ...mockNode, data: { ...mockNode.data, isLocked: true } };
    renderWithProvider(lockedNode);

    const nameInput = screen.getByDisplayValue('Test Node');
    expect(nameInput).toBeDisabled();

    const descriptionInput = screen.getByDisplayValue('Test Description');
    expect(descriptionInput).toBeDisabled();
  });

  it('allows user to interact with name input when unlocked', async () => {
    const user = userEvent.setup();
    renderWithProvider(mockNode);

    const nameInput = screen.getByDisplayValue('Test Node');
    expect(nameInput).not.toBeDisabled();

    // Verify input can receive focus
    await user.click(nameInput);
    expect(nameInput).toHaveFocus();
  });

  it('shows unlock icon when node is unlocked', () => {
    renderWithProvider(mockNode);
    expect(screen.getByRole('button', { name: /잠금/ })).toBeInTheDocument();
  });

  it('shows lock icon when node is locked', () => {
    const lockedNode = { ...mockNode, data: { ...mockNode.data, isLocked: true } };
    renderWithProvider(lockedNode);
    expect(screen.getByRole('button', { name: /잠금 해제/ })).toBeInTheDocument();
  });
});
