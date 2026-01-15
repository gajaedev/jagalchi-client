import type { NodeColorVariant, NodeState } from '../types/editor.types';

/**
 * Color variant mapping for React Flow custom nodes
 * Provides Tailwind classes for 6 color variants and 2 states (default/focus)
 */
export const FLOW_NODE_COLORS = {
  white: {
    default: {
      bg: 'bg-white',
      border: 'border-border',
      text: 'text-foreground',
      badge: 'bg-muted text-muted-foreground',
      handle: 'bg-primary',
    },
    focus: {
      bg: 'bg-white',
      border: 'border-blue-400',
      text: 'text-foreground',
      badge: 'bg-blue-500 text-white',
      handle: 'bg-primary',
    },
  },
  black: {
    default: {
      bg: 'bg-primary',
      border: 'border-border',
      text: 'text-primary-foreground',
      badge: 'bg-primary text-primary-foreground',
      handle: 'bg-primary',
    },
    focus: {
      bg: 'bg-primary',
      border: 'border-blue-400',
      text: 'text-primary-foreground',
      badge: 'bg-blue-500 text-white',
      handle: 'bg-primary',
    },
  },
  blue: {
    default: {
      bg: 'bg-blue-600',
      border: 'border-border',
      text: 'text-white',
      badge: 'bg-blue-500 text-white',
      handle: 'bg-primary',
    },
    focus: {
      bg: 'bg-blue-600',
      border: 'border-blue-400',
      text: 'text-white',
      badge: 'bg-blue-500 text-white',
      handle: 'bg-primary',
    },
  },
  purple: {
    default: {
      bg: 'bg-violet-600',
      border: 'border-border',
      text: 'text-white',
      badge: 'bg-violet-500 text-white',
      handle: 'bg-primary',
    },
    focus: {
      bg: 'bg-violet-600',
      border: 'border-blue-400',
      text: 'text-white',
      badge: 'bg-violet-500 text-white',
      handle: 'bg-primary',
    },
  },
  red: {
    default: {
      bg: 'bg-rose-600',
      border: 'border-border',
      text: 'text-white',
      badge: 'bg-rose-500 text-white',
      handle: 'bg-primary',
    },
    focus: {
      bg: 'bg-rose-600',
      border: 'border-blue-400',
      text: 'text-white',
      badge: 'bg-rose-500 text-white',
      handle: 'bg-primary',
    },
  },
  orange: {
    default: {
      bg: 'bg-amber-600',
      border: 'border-border',
      text: 'text-white',
      badge: 'bg-amber-500 text-white',
      handle: 'bg-primary',
    },
    focus: {
      bg: 'bg-amber-600',
      border: 'border-blue-400',
      text: 'text-white',
      badge: 'bg-amber-500 text-white',
      handle: 'bg-primary',
    },
  },
} as const;

/**
 * Get Tailwind class names for a specific color variant and state
 */
export function getFlowNodeClasses(variant: NodeColorVariant, state: NodeState) {
  return FLOW_NODE_COLORS[variant][state];
}
