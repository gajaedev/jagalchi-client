import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EdgePropertiesPanel } from './index';

describe('EdgePropertiesPanel', () => {
  describe('Single edge mode', () => {
    const defaultProps = {
      edgeId: 'edge-1',
      label: 'Test Edge',
      color: '#3b82f6',
      strokeWidth: 2,
      onLabelChange: vi.fn(),
      onColorChange: vi.fn(),
      onStrokeWidthChange: vi.fn(),
      onDelete: vi.fn(),
    };

    it('renders edge properties with correct title', () => {
      render(<EdgePropertiesPanel {...defaultProps} />);

      expect(screen.getByText('Edge Properties')).toBeInTheDocument();
    });

    it('displays edge ID as disabled input', () => {
      render(<EdgePropertiesPanel {...defaultProps} />);

      const edgeIdInput = screen.getByDisplayValue('edge-1') as HTMLInputElement;
      expect(edgeIdInput).toBeDisabled();
    });

    it('displays edge label', () => {
      render(<EdgePropertiesPanel {...defaultProps} />);

      expect(screen.getByDisplayValue('Test Edge')).toBeInTheDocument();
    });

    it('calls onLabelChange when label is edited', async () => {
      const user = userEvent.setup();
      const handleLabelChange = vi.fn();

      render(<EdgePropertiesPanel {...defaultProps} onLabelChange={handleLabelChange} />);

      const labelInput = screen.getByDisplayValue('Test Edge');
      await user.clear(labelInput);
      await user.type(labelInput, 'New Label');

      expect(handleLabelChange).toHaveBeenCalled();
    });

    it('calls onStrokeWidthChange when slider is moved', () => {
      const handleStrokeWidthChange = vi.fn();

      render(
        <EdgePropertiesPanel {...defaultProps} onStrokeWidthChange={handleStrokeWidthChange} />,
      );

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '4' } });

      expect(handleStrokeWidthChange).toHaveBeenCalledWith(4);
    });

    it('displays stroke width value', () => {
      render(<EdgePropertiesPanel {...defaultProps} strokeWidth={4} />);

      expect(screen.getByText('4px')).toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();

      render(<EdgePropertiesPanel {...defaultProps} onDelete={handleDelete} />);

      const deleteButton = screen.getByLabelText('Delete edge');
      await user.click(deleteButton);

      expect(handleDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Multi-select mode', () => {
    const selectedEdges = [
      { id: 'edge-1', label: 'Edge 1', color: '#3b82f6', strokeWidth: 2 },
      { id: 'edge-2', label: 'Edge 2', color: '#10b981', strokeWidth: 3 },
      { id: 'edge-3', color: '#3b82f6', strokeWidth: 2 },
    ];

    const multiSelectProps = {
      isMultiSelect: true,
      selectedEdges,
      color: '#3b82f6',
      strokeWidth: 2,
      onBulkColorChange: vi.fn(),
      onBulkStrokeWidthChange: vi.fn(),
      onBulkDelete: vi.fn(),
    };

    it('renders multi-select mode with count', () => {
      render(<EdgePropertiesPanel {...multiSelectProps} />);

      expect(screen.getByText('Edge Properties (3)')).toBeInTheDocument();
    });

    it('shows mixed color indicator when edges have different colors', () => {
      render(<EdgePropertiesPanel {...multiSelectProps} />);

      expect(screen.getByText('Stroke Color (Mixed)')).toBeInTheDocument();
      expect(
        screen.getByText('Selected edges have different colors. Changing will apply to all.'),
      ).toBeInTheDocument();
    });

    it('shows mixed stroke width indicator when edges have different widths', () => {
      render(<EdgePropertiesPanel {...multiSelectProps} />);

      expect(screen.getByText('Stroke Width (Mixed)')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Selected edges have different stroke widths. Changing will apply to all.',
        ),
      ).toBeInTheDocument();
    });

    it('does not show mixed indicators when all edges have same properties', () => {
      const samePropsEdges = [
        { id: 'edge-1', color: '#3b82f6', strokeWidth: 2 },
        { id: 'edge-2', color: '#3b82f6', strokeWidth: 2 },
      ];

      render(<EdgePropertiesPanel {...multiSelectProps} selectedEdges={samePropsEdges} />);

      expect(screen.queryByText('Stroke Color (Mixed)')).not.toBeInTheDocument();
      expect(screen.queryByText('Stroke Width (Mixed)')).not.toBeInTheDocument();
      expect(screen.getByText('Stroke Color')).toBeInTheDocument();
      expect(screen.getByText('Stroke Width')).toBeInTheDocument();
    });

    it('displays all selected edges in the list when section is expanded', async () => {
      const user = userEvent.setup();
      render(<EdgePropertiesPanel {...multiSelectProps} />);

      // Expand the "Selected Edges" section
      const selectedEdgesButton = screen.getByRole('button', { name: /Expand Selected Edges/i });
      await user.click(selectedEdgesButton);

      expect(screen.getByText('edge-1')).toBeInTheDocument();
      expect(screen.getByText('edge-2')).toBeInTheDocument();
      expect(screen.getByText('edge-3')).toBeInTheDocument();
    });

    it('shows edge labels when available and section is expanded', async () => {
      const user = userEvent.setup();
      render(<EdgePropertiesPanel {...multiSelectProps} />);

      // Expand the "Selected Edges" section
      const selectedEdgesButton = screen.getByRole('button', { name: /Expand Selected Edges/i });
      await user.click(selectedEdgesButton);

      expect(screen.getByText('Edge 1')).toBeInTheDocument();
      expect(screen.getByText('Edge 2')).toBeInTheDocument();
    });

    it('shows stroke width for each edge', () => {
      render(<EdgePropertiesPanel {...multiSelectProps} />);

      const widthLabels = screen.getAllByText(/px$/);
      expect(widthLabels.length).toBeGreaterThan(0);
    });

    it('calls onBulkDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      const handleBulkDelete = vi.fn();

      render(<EdgePropertiesPanel {...multiSelectProps} onBulkDelete={handleBulkDelete} />);

      const deleteButton = screen.getByLabelText('Delete all selected edges');
      await user.click(deleteButton);

      expect(handleBulkDelete).toHaveBeenCalledTimes(1);
    });

    it('calls onBulkStrokeWidthChange when slider is moved', () => {
      const handleBulkStrokeWidthChange = vi.fn();

      render(
        <EdgePropertiesPanel
          {...multiSelectProps}
          onBulkStrokeWidthChange={handleBulkStrokeWidthChange}
        />,
      );

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '5' } });

      expect(handleBulkStrokeWidthChange).toHaveBeenCalledWith(5);
    });
  });
});
