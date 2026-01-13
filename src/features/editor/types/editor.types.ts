// Core types
export interface Resource {
  id: string;
  url: string;
  title: string;
}

export type EditorToolbarMode = 'node' | 'line' | 'section' | 'text' | 'ai';
export type SaveStatus = 'default' | 'saved' | 'failed';
export type LineStyle = 'solid' | 'dashed' | 'dotted';
export type FontWeight = 'normal' | 'bold';
export type SelectionType = 'node' | 'line' | 'section' | 'text' | 'mixed';

// Editor element data
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

export interface SectionData {
  title: string;
  color: string;
  isLocked: boolean;
}

export interface TextData {
  content: string;
  fontSize: number;
  fontWeight: FontWeight;
  color: string;
  isLocked: boolean;
}

export interface ElementData
  extends Partial<NodeData>, Partial<LineData>, Partial<SectionData>, Partial<TextData> {
  type: 'node' | 'line' | 'section' | 'text';
}

// Dropdown item type
export interface ToolbarDropdownItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}
