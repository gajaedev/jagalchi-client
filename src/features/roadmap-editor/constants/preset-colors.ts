import type { NodeColorVariant, TextColorVariant } from '../types/editor.types';

export const NODE_PRESET_COLORS: { variant: NodeColorVariant; hex: string; label: string }[] = [
  { variant: 'white', hex: '#ffffff', label: 'White' },
  { variant: 'black', hex: '#000000', label: 'Black' },
  { variant: 'blue', hex: '#155dfc', label: 'Blue' },
  { variant: 'purple', hex: '#9810fa', label: 'Purple' },
  { variant: 'red', hex: '#ec003f', label: 'Red' },
  { variant: 'orange', hex: '#f54a00', label: 'Orange' },
];

export const TEXT_PRESET_COLORS: { variant: TextColorVariant; hex: string; label: string }[] = [
  { variant: 'gray', hex: '#64748b', label: 'Gray' },
  { variant: 'black', hex: '#000000', label: 'Black' },
  { variant: 'blue', hex: '#3b82f6', label: 'Blue' },
  { variant: 'purple', hex: '#8b5cf6', label: 'Purple' },
  { variant: 'red', hex: '#f43f5e', label: 'Red' },
  { variant: 'orange', hex: '#f59e0b', label: 'Orange' },
];

export function hexToNodeVariant(hex: string): NodeColorVariant {
  const found = NODE_PRESET_COLORS.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
  return found?.variant ?? 'white';
}

export function hexToTextVariant(hex: string): TextColorVariant {
  const found = TEXT_PRESET_COLORS.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
  return found?.variant ?? 'gray';
}

export function nodeVariantToHex(variant: NodeColorVariant): string {
  return NODE_PRESET_COLORS.find((c) => c.variant === variant)?.hex ?? '#ffffff';
}

export function textVariantToHex(variant: TextColorVariant): string {
  return TEXT_PRESET_COLORS.find((c) => c.variant === variant)?.hex ?? '#64748b';
}
