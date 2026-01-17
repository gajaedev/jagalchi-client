import { EDITOR_MESSAGES } from '@/constants/messages';

import type {
  JagalchiNodeType,
  JagalchiSectionType,
  JagalchiTextType,
  NodeColorVariant,
  TextColorVariant,
} from '../types/editor.types';

interface CreateNodeOptions {
  position: { x: number; y: number };
  variant?: NodeColorVariant;
  label?: string;
}

interface CreateSectionOptions {
  position: { x: number; y: number };
  variant?: NodeColorVariant;
  title?: string;
}

interface CreateTextOptions {
  position: { x: number; y: number };
  variant?: TextColorVariant;
  content?: string;
}

export function createJagalchiNode(options: CreateNodeOptions): JagalchiNodeType {
  const { position, variant = 'white', label = EDITOR_MESSAGES.FLOW_NODE_DEFAULT_LABEL } = options;

  return {
    id: crypto.randomUUID(),
    type: 'jagalchi-node',
    position,
    data: {
      variant,
      label,
      description: '',
      resources: [],
      isLocked: false,
    },
  };
}

export function createJagalchiSection(options: CreateSectionOptions): JagalchiSectionType {
  const {
    position,
    variant = 'white',
    title = EDITOR_MESSAGES.FLOW_SECTION_DEFAULT_TITLE,
  } = options;

  return {
    id: crypto.randomUUID(),
    type: 'jagalchi-section',
    position,
    style: { width: 200, height: 200 },
    data: {
      variant,
      title,
      isLocked: false,
    },
  };
}

export function createJagalchiText(options: CreateTextOptions): JagalchiTextType {
  const {
    position,
    variant = 'gray',
    content = EDITOR_MESSAGES.FLOW_TEXT_DEFAULT_CONTENT,
  } = options;

  return {
    id: crypto.randomUUID(),
    type: 'jagalchi-text',
    position,
    data: {
      variant,
      content,
      fontSize: 14,
      fontWeight: 'normal',
      isLocked: false,
    },
  };
}
