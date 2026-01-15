// Core types
export interface Resource {
  id: string;
  url: string;
  title: string;
}

/**
 * Represents the active mode of the editor toolbar, determining which element type can be created.
 */
export type EditorToolbarMode = 'node' | 'line' | 'section' | 'text' | 'ai';
export type SaveStatus = 'default' | 'saved' | 'failed';
export type LineStyle = 'solid' | 'dashed' | 'dotted';
export type FontWeight = 'normal' | 'bold';
/**
 * Indicates what types of elements are currently selected in the editor canvas.
 */
export type SelectionType = 'node' | 'line' | 'section' | 'text' | 'mixed';

// Editor element data
/**
 * Data structure for a learning node element containing title, description, resources, and styling.
 * Nodes represent individual learning units that can be locked to prevent accidental editing.
 */
export interface NodeData {
  title: string;
  description: string;
  resources: Resource[];
  color: string;
  isLocked: boolean;
}

export interface LineData {
  style: LineStyle;
  color: string;
  label?: string;
}

/**
 * Data structure for a grouped section that can organize multiple elements visually.
 */
export interface SectionData {
  title: string;
  color: string;
  isLocked: boolean;
}

/**
 * Data structure for free-form text element with customizable font size, weight, and color.
 */
export interface TextData {
  content: string;
  fontSize: number;
  fontWeight: FontWeight;
  color: string;
  isLocked: boolean;
}

/**
 * Union type for any editor element data that can have properties from node, line, section, or text types.
 * The 'type' field indicates which specific element type this represents.
 */
export interface ElementData
  extends Partial<NodeData>, Partial<LineData>, Partial<SectionData>, Partial<TextData> {
  type: 'node' | 'line' | 'section' | 'text';
}

// AI types
export type AIAction = 'generate' | 'modify';

export interface AIMenuItem {
  action: AIAction;
  label: string;
  icon: React.ReactNode;
}

// React Flow node types
export type NodeColorVariant = 'white' | 'black' | 'blue' | 'purple' | 'red' | 'orange';
export type NodeState = 'default' | 'focus';

/**
 * React Flow custom node data extending NodeData with visual variants
 */
export interface FlowNodeData extends NodeData {
  variant: NodeColorVariant;
  state: NodeState;
  index?: number;
}

/**
 * React Flow custom section data extending SectionData with visual variants
 */
export interface FlowSectionData extends SectionData {
  variant: NodeColorVariant;
  state: NodeState;
}

/**
 * React Flow custom text data extending TextData with visual variants
 */
export interface FlowTextData extends TextData {
  variant: NodeColorVariant;
  state: NodeState;
}

export type FlowNodeType = 'custom-node' | 'custom-section' | 'custom-text';


// Dropdown item type
export interface ToolbarDropdownItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}
