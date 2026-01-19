import type { NodeColorVariant, TextColorVariant, NodeState } from '../types/editor.types';

interface NodeColorClasses {
  bg: string;
  border: string;
  text: string;
  handle: string;
  badge: string;
}

export const NODE_COLOR_CLASSES: Record<NodeColorVariant, Record<NodeState, NodeColorClasses>> = {
  white: {
    default: {
      bg: 'bg-background',
      border: 'border-border',
      text: 'text-foreground',
      handle: 'bg-primary',
      badge: 'bg-muted text-muted-foreground',
    },
    focus: {
      bg: 'bg-background',
      border: 'border-[#3f8dff]',
      text: 'text-foreground',
      handle: 'bg-primary',
      badge: 'bg-blue-500 text-white',
    },
  },
  black: {
    default: {
      bg: 'bg-primary',
      border: 'border-border',
      text: 'text-primary-foreground',
      handle: 'bg-primary-foreground',
      badge: 'bg-primary text-primary-foreground',
    },
    focus: {
      bg: 'bg-primary',
      border: 'border-[#3f8dff]',
      text: 'text-primary-foreground',
      handle: 'bg-primary-foreground',
      badge: 'bg-blue-500 text-white',
    },
  },
  blue: {
    default: {
      bg: 'bg-[#155dfc]',
      border: 'border-[#155dfc]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-[#155dfc] text-white',
    },
    focus: {
      bg: 'bg-[#155dfc]',
      border: 'border-[#3f8dff]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-blue-500 text-white',
    },
  },
  purple: {
    default: {
      bg: 'bg-[#9810fa]',
      border: 'border-[#9810fa]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-[#9810fa] text-white',
    },
    focus: {
      bg: 'bg-[#9810fa]',
      border: 'border-[#3f8dff]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-blue-500 text-white',
    },
  },
  red: {
    default: {
      bg: 'bg-[#ec003f]',
      border: 'border-[#ec003f]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-[#ec003f] text-white',
    },
    focus: {
      bg: 'bg-[#ec003f]',
      border: 'border-[#3f8dff]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-blue-500 text-white',
    },
  },
  orange: {
    default: {
      bg: 'bg-[#f54a00]',
      border: 'border-[#f54a00]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-[#f54a00] text-white',
    },
    focus: {
      bg: 'bg-[#f54a00]',
      border: 'border-[#3f8dff]',
      text: 'text-white',
      handle: 'bg-white',
      badge: 'bg-blue-500 text-white',
    },
  },
} as const;

export const TEXT_COLOR_CLASSES: Record<TextColorVariant, string> = {
  gray: 'text-[#64748b]',
  black: 'text-foreground',
  blue: 'text-[#3b82f6]',
  purple: 'text-[#8b5cf6]',
  red: 'text-[#f43f5e]',
  orange: 'text-[#f59e0b]',
} as const;

export function getNodeColors(variant: NodeColorVariant, state: NodeState): NodeColorClasses {
  return NODE_COLOR_CLASSES[variant][state];
}

export function getTextColor(variant: TextColorVariant): string {
  return TEXT_COLOR_CLASSES[variant];
}
