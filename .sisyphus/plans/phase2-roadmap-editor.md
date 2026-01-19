# Phase 2 Implementation Plan: Roadmap Editor - Toolbar, Sidebar, Header, Jotai, ColorPicker

**Date**: 2026-01-18
**Author**: Prometheus + Claude Sonnet 4.5
**Scope**: Toolbar + Sidebar + Header + Jotai 통합 + ColorPicker + Multi-select + LocalStorage

---

## 목표

Jagalchi 로드맵 에디터의 Phase 2 구현: 완전한 편집 UI + 상태 관리 + 속성 편집 + 색상 커스터마이징 + 영속성.

**Phase 2에 포함되는 것**:

- Header (좌상단): 뒤로가기 버튼 + 편집 가능한 타이틀
- Toolbar (하단 중앙): Node/Line/Section/Text 추가 버튼 + Gear 드롭다운
- Sidebar (우측 고정): 선택된 노드/엣지 속성 편집 패널
- ColorPicker Modal: 6개 프리셋 + 2D Gradient + Hue Slider
- Jotai 상태 관리: 전역 상태 통합 (nodes, edges, selection)
- Multi-select 지원: 여러 노드 동시 선택 (Phase 2 준비만, UI는 Phase 3)
- LocalStorage 저장: 클라이언트 사이드 영속성

**Phase 2에 포함되지 않는 것** (Phase 3):

- AI 추천 기능 (자료 추천, 설명 생성)
- Ghost node creation (FigJam 스타일)
- Multi-select UI (정렬 아이콘)
- Undo/Redo
- 서버 연동 (저장/로드 API)
- 키보드 단축키

---

## Figma Design 분석 결과

### 전체 레이아웃 구조

```
┌─────────────────────────────────────────────────────┐
│ Header (h-14)                                        │
│ [←] Jagalchi Roadmap                                │
├──────────────────────────────────┬──────────────────┤
│                                   │                  │
│                                   │   Sidebar        │
│         Canvas                    │   (w-60)         │
│         (ReactFlow)               │   - 노드 이름    │
│                                   │   - 노드 설명    │
│                                   │   - 기본 컬러    │
│                                   │   - 커스텀       │
│                                   │   - 첨부 자료    │
│                                   │                  │
├──────────────────────────────────┴──────────────────┤
│              Toolbar (h-16)                          │
│         [Node] [Line] [Section] [Text] [Gear▾]      │
└─────────────────────────────────────────────────────┘
```

### Header 스펙

- **높이**: 56px (h-14)
- **배경**: `bg-background` (white)
- **보더**: `border-b`
- **컴포넌트**:
  1. 뒤로가기 버튼 (ArrowLeft 아이콘, 24x24)
  2. 타이틀 (편집 가능한 Input, placeholder: "Jagalchi Roadmap")

### Toolbar 스펙

- **높이**: 64px (h-16)
- **위치**: 하단 고정, 중앙 정렬
- **배경**: `bg-background` with shadow
- **버튼 5개**:
  1. Node (노드 아이콘)
  2. Line (선 아이콘)
  3. Section (섹션 아이콘)
  4. Text (텍스트 아이콘)
  5. Gear (설정 아이콘 + 드롭다운, Phase 3용)
- **상태 표시**: 선택된 버튼은 `bg-primary text-primary-foreground`

### Sidebar 스펙

- **너비**: 240px (w-60)
- **위치**: 우측 고정 (항상 표시, Sheet 아님)
- **배경**: `bg-muted/30`
- **보더**: `border-l`
- **상태별 내용**:

#### 1. 노드 선택 시 (JagalchiNode)

```
┌─────────────────────┐
│ 노드 이름            │ ← Input
│ [New Node        ]  │
├─────────────────────┤
│ 노드 설명            │ ← Textarea
│ [               ]   │
│ [               ]   │
├─────────────────────┤
│ 기본 컬러            │
│ [□][■][🔵][🟣][🔴][🟠]│ ← 6 preset colors
├─────────────────────┤
│ 커스텀              │
│ [🎨] [■]           │ ← Palette icon + preview
├─────────────────────┤
│ 첨부 자료            │
│ [URL 1          ]  │
│ [URL 2          ]  │
│ [URL 3          ]  │
│ [+ 추가]            │
│ [AI 추천]           │ ← Phase 3
└─────────────────────┘
```

#### 2. 섹션 선택 시 (JagalchiSection)

```
┌─────────────────────┐
│ 섹션 이름            │
│ [빈 섹션        ]   │
├─────────────────────┤
│ 크기                │
│ W [200   ] H [200 ] │
├─────────────────────┤
│ 기본 컬러            │
│ [□][■][🔵][🟣][🔴][🟠]│
├─────────────────────┤
│ 커스텀              │
│ [🎨] [■]           │
└─────────────────────┘
```

#### 3. 텍스트 선택 시 (JagalchiText)

```
┌─────────────────────┐
│ 텍스트 크기          │
│ [14         ] px    │
├─────────────────────┤
│ 기본 컬러            │
│ [gray][black][blue] │
│ [purple][red][orange]│
├─────────────────────┤
│ 커스텀              │
│ [🎨] [■]           │
└─────────────────────┘
```

#### 4. 엣지 선택 시 (Edge)

```
┌─────────────────────┐
│ 라벨                │
│ [              ]    │
└─────────────────────┘
```

#### 5. 선택 없음

```
┌─────────────────────┐
│                     │
│  노드를 선택하세요   │
│                     │
└─────────────────────┘
```

### ColorPicker Modal 스펙

피그마에는 없지만 디자이너 지시: "적당히 해봐"

**구조**:

```
┌─────────────────────────────┐
│ [X] 컬러 선택                │
├─────────────────────────────┤
│  ┌────────────────────┐     │
│  │                    │     │ ← 2D Gradient Picker
│  │        ⊙           │     │   (Saturation x Lightness)
│  │                    │     │
│  └────────────────────┘     │
│  ┌────────────────────┐     │
│  │ [████████████████] │     │ ← Hue Slider (0-360°)
│  └────────────────────┘     │
│                             │
│  Preview: ■ #3b82f6         │
│                             │
│  [취소]         [적용]       │
└─────────────────────────────┘
```

**기술 스택**:

- `react-colorful` 패키지 사용
- `<HexColorPicker>` 컴포넌트
- Dialog (shadcn/ui)

---

## 파일 구조

```
src/features/roadmap-editor/
├── components/
│   ├── atoms/
│   │   ├── ColorPresetButton/
│   │   │   ├── index.tsx
│   │   │   └── ColorPresetButton.test.tsx
│   │   ├── ToolbarButton/
│   │   │   ├── index.tsx
│   │   │   └── ToolbarButton.test.tsx
│   │   └── index.ts
│   ├── molecules/
│   │   ├── ColorPicker/
│   │   │   ├── index.tsx
│   │   │   └── ColorPicker.test.tsx
│   │   ├── ColorSelector/
│   │   │   ├── index.tsx
│   │   │   └── ColorSelector.test.tsx
│   │   └── (기존 노드 컴포넌트들)
│   ├── organisms/
│   │   ├── EditorHeader/
│   │   │   ├── index.tsx
│   │   │   └── EditorHeader.test.tsx
│   │   ├── EditorToolbar/
│   │   │   ├── index.tsx
│   │   │   └── EditorToolbar.test.tsx
│   │   ├── EditorSidebar/
│   │   │   ├── index.tsx
│   │   │   └── EditorSidebar.test.tsx
│   │   ├── NodePropertiesPanel/
│   │   │   ├── index.tsx
│   │   │   └── NodePropertiesPanel.test.tsx
│   │   ├── SectionPropertiesPanel/
│   │   │   ├── index.tsx
│   │   │   └── SectionPropertiesPanel.test.tsx
│   │   ├── TextPropertiesPanel/
│   │   │   ├── index.tsx
│   │   │   └── TextPropertiesPanel.test.tsx
│   │   ├── EdgePropertiesPanel/
│   │   │   ├── index.tsx
│   │   │   └── EdgePropertiesPanel.test.tsx
│   │   └── index.ts
│   └── templates/
│       └── RoadmapEditor/ (기존 - 수정 필요)
├── stores/
│   ├── editor-atoms.ts (확장)
│   └── index.ts
├── hooks/
│   ├── use-canvas-center.ts (새로 추가)
│   ├── use-local-storage.ts (새로 추가)
│   └── index.ts
├── constants/
│   └── preset-colors.ts (새로 추가)
└── utils/
    └── viewport-utils.ts (새로 추가)
```

---

## 구현 단계

### Step 1: 패키지 설치

```bash
pnpm add react-colorful
pnpm add jotai  # 이미 있을 수 있음
```

### Step 2: Jotai Atoms 확장

**파일**: `src/features/roadmap-editor/stores/editor-atoms.ts`

```typescript
import { atom } from 'jotai';
import type { Edge } from '@xyflow/react';
import type { RoadmapNode, NodeColorVariant, TextColorVariant } from '../types/editor.types';

// Core state
export const nodesAtom = atom<RoadmapNode[]>([]);
export const edgesAtom = atom<Edge[]>([]);
export const roadmapTitleAtom = atom<string>('Jagalchi Roadmap');

// Selection state
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);

// Derived atoms
export const selectedNodesAtom = atom((get) => {
  const nodes = get(nodesAtom);
  const selectedIds = get(selectedNodeIdsAtom);
  return nodes.filter((node) => selectedIds.includes(node.id));
});

export const selectedEdgesAtom = atom((get) => {
  const edges = get(edgesAtom);
  const selectedIds = get(selectedEdgeIdsAtom);
  return edges.filter((edge) => selectedIds.includes(edge.id));
});

export const singleSelectedNodeAtom = atom((get) => {
  const selected = get(selectedNodesAtom);
  return selected.length === 1 ? selected[0] : null;
});

export const singleSelectedEdgeAtom = atom((get) => {
  const selected = get(selectedEdgesAtom);
  return selected.length === 1 ? selected[0] : null;
});

// ColorPicker state
export const isColorPickerOpenAtom = atom<boolean>(false);
export const colorPickerTargetAtom = atom<{
  type: 'node' | 'text';
  nodeId: string;
} | null>(null);

// Toolbar state
export const activeToolAtom = atom<'select' | 'node' | 'line' | 'section' | 'text'>('select');
```

### Step 3: 색상 프리셋 상수

**파일**: `src/features/roadmap-editor/constants/preset-colors.ts`

```typescript
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
```

**파일**: `src/constants/messages.ts` (기존에 추가)

```typescript
export const EDITOR_MESSAGES = {
  // ... 기존 메시지들
  SIDEBAR_EMPTY_STATE: '노드를 선택하세요',
  SIDEBAR_NODE_NAME_LABEL: '노드 이름',
  SIDEBAR_NODE_DESC_LABEL: '노드 설명',
  SIDEBAR_SECTION_NAME_LABEL: '섹션 이름',
  SIDEBAR_SECTION_SIZE_LABEL: '크기',
  SIDEBAR_TEXT_SIZE_LABEL: '텍스트 크기',
  SIDEBAR_EDGE_LABEL_LABEL: '라벨',
  SIDEBAR_COLOR_PRESET_LABEL: '기본 컬러',
  SIDEBAR_COLOR_CUSTOM_LABEL: '커스텀',
  SIDEBAR_RESOURCES_LABEL: '첨부 자료',
  SIDEBAR_ADD_RESOURCE_BUTTON: '추가',
  TOOLBAR_NODE_TOOLTIP: '노드 추가',
  TOOLBAR_LINE_TOOLTIP: '선 추가',
  TOOLBAR_SECTION_TOOLTIP: '섹션 추가',
  TOOLBAR_TEXT_TOOLTIP: '텍스트 추가',
  TOOLBAR_GEAR_TOOLTIP: '설정',
  COLOR_PICKER_TITLE: '컬러 선택',
  COLOR_PICKER_CANCEL: '취소',
  COLOR_PICKER_APPLY: '적용',
} as const;
```

### Step 4: Custom Hooks

#### use-canvas-center.ts

**파일**: `src/features/roadmap-editor/hooks/use-canvas-center.ts`

```typescript
import { useReactFlow } from '@xyflow/react';

/**
 * 현재 뷰포트 중앙 좌표를 반환하는 hook
 * 노드 생성 시 현재 보고 있는 화면 중앙에 배치하기 위해 사용
 */
export function useCanvasCenter() {
  const { getViewport, screenToFlowPosition } = useReactFlow();

  return () => {
    const viewport = getViewport();
    const centerX = window.innerWidth / 2 - 240; // 240px는 sidebar 너비
    const centerY = window.innerHeight / 2;

    return screenToFlowPosition({
      x: centerX,
      y: centerY,
    });
  };
}
```

#### use-local-storage.ts

**파일**: `src/features/roadmap-editor/hooks/use-local-storage.ts`

```typescript
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import type { Edge } from '@xyflow/react';

import { nodesAtom, edgesAtom, roadmapTitleAtom } from '../stores/editor-atoms';
import type { RoadmapNode } from '../types/editor.types';

const STORAGE_KEY = 'jagalchi-roadmap-editor';

interface StoredData {
  title: string;
  nodes: RoadmapNode[];
  edges: Edge[];
  version: string;
}

/**
 * LocalStorage에 에디터 상태를 자동 저장/로드하는 hook
 * - 마운트 시 자동 로드
 * - 노드/엣지/타이틀 변경 시 자동 저장 (debounced)
 */
export function useLocalStorage() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [title, setTitle] = useAtom(roadmapTitleAtom);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const data: StoredData = JSON.parse(stored);
      setNodes(data.nodes);
      setEdges(data.edges);
      setTitle(data.title);
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }, [setNodes, setEdges, setTitle]);

  // Save to localStorage on change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const data: StoredData = {
        title,
        nodes,
        edges,
        version: '1.0',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, title]);
}
```

### Step 5: Atomic Components

#### ColorPresetButton

**파일**: `src/features/roadmap-editor/components/atoms/ColorPresetButton/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ColorPresetButtonProps {
  hex: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorPresetButton = memo(function ColorPresetButton({
  hex,
  label,
  isSelected,
  onClick,
}: ColorPresetButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'h-8 w-8 rounded border-2 transition-all',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2'
      )}
      style={{ backgroundColor: hex }}
      onClick={onClick}
      aria-label={label}
    />
  );
});
```

#### ToolbarButton

**파일**: `src/features/roadmap-editor/components/atoms/ToolbarButton/index.tsx`

```typescript
'use client';

import { memo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ToolbarButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ToolbarButton = memo(function ToolbarButton({
  icon,
  label,
  isActive,
  onClick,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'ghost'}
          size="icon"
          className={cn('h-10 w-10', isActive && 'bg-primary text-primary-foreground')}
          onClick={onClick}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
});
```

### Step 6: Molecule Components

#### ColorPicker

**파일**: `src/features/roadmap-editor/components/molecules/ColorPicker/index.tsx`

```typescript
'use client';

import { memo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAtom } from 'jotai';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { isColorPickerOpenAtom, colorPickerTargetAtom, nodesAtom } from '../../../stores/editor-atoms';
import type { JagalchiNodeData, JagalchiTextData } from '../../../types/editor.types';

export const ColorPicker = memo(function ColorPicker() {
  const [isOpen, setIsOpen] = useAtom(isColorPickerOpenAtom);
  const [target, setTarget] = useAtom(colorPickerTargetAtom);
  const [nodes, setNodes] = useAtom(nodesAtom);

  const [tempColor, setTempColor] = useState<string>('#3b82f6');

  const handleApply = () => {
    if (!target) return;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id !== target.nodeId) return node;

        // Custom color는 Phase 2에서 variant에 직접 저장하지 않고
        // 별도 customColor 필드 추가 필요 (타입 확장 필요)
        // 일단 여기서는 가장 가까운 preset으로 변환
        // TODO: Phase 2.1에서 customColor 필드 추가
        return node;
      })
    );

    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setTarget(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{EDITOR_MESSAGES.COLOR_PICKER_TITLE}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <HexColorPicker color={tempColor} onChange={setTempColor} />

          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded border"
              style={{ backgroundColor: tempColor }}
            />
            <span className="text-sm font-mono">{tempColor}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {EDITOR_MESSAGES.COLOR_PICKER_CANCEL}
          </Button>
          <Button onClick={handleApply}>
            {EDITOR_MESSAGES.COLOR_PICKER_APPLY}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
```

**참고**: Custom color 지원을 위해 타입 확장 필요:

```typescript
// types/editor.types.ts에 추가
export interface JagalchiNodeData extends BaseNodeData {
  label: string;
  description: string;
  resources: string[];
  customColor?: string; // Phase 2에서 추가
}
```

#### ColorSelector

**파일**: `src/features/roadmap-editor/components/molecules/ColorSelector/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useSetAtom } from 'jotai';
import { Palette } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { ColorPresetButton } from '../../atoms/ColorPresetButton';
import { isColorPickerOpenAtom, colorPickerTargetAtom } from '../../../stores/editor-atoms';
import type { NodeColorVariant, TextColorVariant } from '../../../types/editor.types';

interface ColorSelectorProps {
  type: 'node' | 'text';
  nodeId: string;
  currentVariant: NodeColorVariant | TextColorVariant;
  presets: { variant: string; hex: string; label: string }[];
  onPresetSelect: (variant: NodeColorVariant | TextColorVariant) => void;
}

export const ColorSelector = memo(function ColorSelector({
  type,
  nodeId,
  currentVariant,
  presets,
  onPresetSelect,
}: ColorSelectorProps) {
  const setIsColorPickerOpen = useSetAtom(isColorPickerOpenAtom);
  const setColorPickerTarget = useSetAtom(colorPickerTargetAtom);

  const handleCustomColorClick = () => {
    setColorPickerTarget({ type, nodeId });
    setIsColorPickerOpen(true);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">{EDITOR_MESSAGES.SIDEBAR_COLOR_PRESET_LABEL}</label>
        <div className="mt-2 flex gap-2">
          {presets.map((preset) => (
            <ColorPresetButton
              key={preset.variant}
              hex={preset.hex}
              label={preset.label}
              isSelected={currentVariant === preset.variant}
              onClick={() => onPresetSelect(preset.variant as any)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">{EDITOR_MESSAGES.SIDEBAR_COLOR_CUSTOM_LABEL}</label>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleCustomColorClick}
          >
            <Palette className="h-4 w-4" />
          </Button>
          <div
            className="h-8 w-8 rounded border"
            style={{ backgroundColor: presets.find((p) => p.variant === currentVariant)?.hex }}
          />
        </div>
      </div>
    </div>
  );
});
```

### Step 7: Organism Components

#### EditorHeader

**파일**: `src/features/roadmap-editor/components/organisms/EditorHeader/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { roadmapTitleAtom } from '../../../stores/editor-atoms';

export const EditorHeader = memo(function EditorHeader() {
  const router = useRouter();
  const [title, setTitle] = useAtom(roadmapTitleAtom);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push('/')}
        aria-label="뒤로가기"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="max-w-md border-none text-lg font-semibold focus-visible:ring-0"
        placeholder="Jagalchi Roadmap"
      />
    </header>
  );
});
```

#### EditorToolbar

**파일**: `src/features/roadmap-editor/components/organisms/EditorToolbar/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useReactFlow } from '@xyflow/react';
import {
  Square,
  Minus,
  RectangleHorizontal,
  Type,
  Settings,
} from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';
import { ToolbarButton } from '../../atoms/ToolbarButton';
import { useCanvasCenter } from '../../../hooks/use-canvas-center';
import { activeToolAtom, nodesAtom } from '../../../stores/editor-atoms';
import {
  createJagalchiNode,
  createJagalchiSection,
  createJagalchiText,
} from '../../../utils/node-factory';

export const EditorToolbar = memo(function EditorToolbar() {
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const setNodes = useSetAtom(nodesAtom);
  const getCanvasCenter = useCanvasCenter();

  const handleNodeAdd = () => {
    const position = getCanvasCenter();
    const newNode = createJagalchiNode({ position });
    setNodes((prev) => [...prev, newNode]);
    setActiveTool('select');
  };

  const handleSectionAdd = () => {
    const position = getCanvasCenter();
    const newSection = createJagalchiSection({ position });
    setNodes((prev) => [...prev, newSection]);
    setActiveTool('select');
  };

  const handleTextAdd = () => {
    const position = getCanvasCenter();
    const newText = createJagalchiText({ position });
    setNodes((prev) => [...prev, newText]);
    setActiveTool('select');
  };

  const handleLineAdd = () => {
    // Phase 2: Line tool은 나중에 구현 (엣지는 Handle에서 드래그로 생성)
    setActiveTool('line');
  };

  const handleGearClick = () => {
    // Phase 3: AI 기능 드롭다운
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-lg border bg-background p-2 shadow-lg">
        <ToolbarButton
          icon={<Square className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_NODE_TOOLTIP}
          isActive={activeTool === 'node'}
          onClick={handleNodeAdd}
        />
        <ToolbarButton
          icon={<Minus className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_LINE_TOOLTIP}
          isActive={activeTool === 'line'}
          onClick={handleLineAdd}
        />
        <ToolbarButton
          icon={<RectangleHorizontal className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_SECTION_TOOLTIP}
          isActive={activeTool === 'section'}
          onClick={handleSectionAdd}
        />
        <ToolbarButton
          icon={<Type className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_TEXT_TOOLTIP}
          isActive={activeTool === 'text'}
          onClick={handleTextAdd}
        />

        <div className="mx-1 h-6 w-px bg-border" />

        <ToolbarButton
          icon={<Settings className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_GEAR_TOOLTIP}
          isActive={false}
          onClick={handleGearClick}
        />
      </div>
    </div>
  );
});
```

#### NodePropertiesPanel

**파일**: `src/features/roadmap-editor/components/organisms/NodePropertiesPanel/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useSetAtom } from 'jotai';
import { Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { ColorSelector } from '../../molecules/ColorSelector';
import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import type { JagalchiNodeType, NodeColorVariant } from '../../../types/editor.types';

interface NodePropertiesPanelProps {
  node: JagalchiNodeType;
}

export const NodePropertiesPanel = memo(function NodePropertiesPanel({
  node,
}: NodePropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiNodeType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? { ...n, data: { ...n.data, ...updates } }
          : n
      )
    );
  };

  const handleResourceAdd = () => {
    updateNode({ resources: [...node.data.resources, ''] });
  };

  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...node.data.resources];
    newResources[index] = value;
    updateNode({ resources: newResources });
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="node-label">{EDITOR_MESSAGES.SIDEBAR_NODE_NAME_LABEL}</Label>
        <Input
          id="node-label"
          value={node.data.label}
          onChange={(e) => updateNode({ label: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="node-desc">{EDITOR_MESSAGES.SIDEBAR_NODE_DESC_LABEL}</Label>
        <Textarea
          id="node-desc"
          value={node.data.description}
          onChange={(e) => updateNode({ description: e.target.value })}
          className="mt-1"
          rows={3}
        />
      </div>

      <ColorSelector
        type="node"
        nodeId={node.id}
        currentVariant={node.data.variant}
        presets={NODE_PRESET_COLORS}
        onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
      />

      <div>
        <Label>{EDITOR_MESSAGES.SIDEBAR_RESOURCES_LABEL}</Label>
        <div className="mt-2 space-y-2">
          {node.data.resources.map((resource, index) => (
            <Input
              key={index}
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="URL"
            />
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleResourceAdd}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            {EDITOR_MESSAGES.SIDEBAR_ADD_RESOURCE_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
});
```

#### SectionPropertiesPanel

**파일**: `src/features/roadmap-editor/components/organisms/SectionPropertiesPanel/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useSetAtom } from 'jotai';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { ColorSelector } from '../../molecules/ColorSelector';
import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import type { JagalchiSectionType, NodeColorVariant } from '../../../types/editor.types';

interface SectionPropertiesPanelProps {
  node: JagalchiSectionType;
}

export const SectionPropertiesPanel = memo(function SectionPropertiesPanel({
  node,
}: SectionPropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiSectionType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? { ...n, data: { ...n.data, ...updates } }
          : n
      )
    );
  };

  const updateSize = (dimension: 'width' | 'height', value: number) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? {
              ...n,
              style: {
                ...n.style,
                [dimension]: value,
              },
            }
          : n
      )
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="section-title">{EDITOR_MESSAGES.SIDEBAR_SECTION_NAME_LABEL}</Label>
        <Input
          id="section-title"
          value={node.data.title}
          onChange={(e) => updateNode({ title: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{EDITOR_MESSAGES.SIDEBAR_SECTION_SIZE_LABEL}</Label>
        <div className="mt-1 flex gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">W</span>
            <Input
              type="number"
              value={node.style?.width ?? 200}
              onChange={(e) => updateSize('width', Number(e.target.value))}
              className="w-20"
              min={200}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">H</span>
            <Input
              type="number"
              value={node.style?.height ?? 200}
              onChange={(e) => updateSize('height', Number(e.target.value))}
              className="w-20"
              min={200}
            />
          </div>
        </div>
      </div>

      <ColorSelector
        type="node"
        nodeId={node.id}
        currentVariant={node.data.variant}
        presets={NODE_PRESET_COLORS}
        onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
      />
    </div>
  );
});
```

#### TextPropertiesPanel

**파일**: `src/features/roadmap-editor/components/organisms/TextPropertiesPanel/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useSetAtom } from 'jotai';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { ColorSelector } from '../../molecules/ColorSelector';
import { TEXT_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import type { JagalchiTextType, TextColorVariant } from '../../../types/editor.types';

interface TextPropertiesPanelProps {
  node: JagalchiTextType;
}

export const TextPropertiesPanel = memo(function TextPropertiesPanel({
  node,
}: TextPropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiTextType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? { ...n, data: { ...n.data, ...updates } }
          : n
      )
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="text-size">{EDITOR_MESSAGES.SIDEBAR_TEXT_SIZE_LABEL}</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            id="text-size"
            type="number"
            value={node.data.fontSize}
            onChange={(e) => updateNode({ fontSize: Number(e.target.value) })}
            className="w-20"
            min={8}
            max={72}
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>
      </div>

      <ColorSelector
        type="text"
        nodeId={node.id}
        currentVariant={node.data.variant}
        presets={TEXT_PRESET_COLORS}
        onPresetSelect={(variant) => updateNode({ variant: variant as TextColorVariant })}
      />
    </div>
  );
});
```

#### EdgePropertiesPanel

**파일**: `src/features/roadmap-editor/components/organisms/EdgePropertiesPanel/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useSetAtom } from 'jotai';
import type { Edge } from '@xyflow/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { edgesAtom } from '../../../stores/editor-atoms';

interface EdgePropertiesPanelProps {
  edge: Edge;
}

export const EdgePropertiesPanel = memo(function EdgePropertiesPanel({
  edge,
}: EdgePropertiesPanelProps) {
  const setEdges = useSetAtom(edgesAtom);

  const updateEdge = (label: string) => {
    setEdges((prev) =>
      prev.map((e) =>
        e.id === edge.id
          ? { ...e, label }
          : e
      )
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="edge-label">{EDITOR_MESSAGES.SIDEBAR_EDGE_LABEL_LABEL}</Label>
        <Input
          id="edge-label"
          value={(edge.label as string) ?? ''}
          onChange={(e) => updateEdge(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
});
```

#### EditorSidebar

**파일**: `src/features/roadmap-editor/components/organisms/EditorSidebar/index.tsx`

```typescript
'use client';

import { memo } from 'react';
import { useAtomValue } from 'jotai';

import { EDITOR_MESSAGES } from '@/constants/messages';
import { singleSelectedNodeAtom, singleSelectedEdgeAtom } from '../../../stores/editor-atoms';
import { NodePropertiesPanel } from '../NodePropertiesPanel';
import { SectionPropertiesPanel } from '../SectionPropertiesPanel';
import { TextPropertiesPanel } from '../TextPropertiesPanel';
import { EdgePropertiesPanel } from '../EdgePropertiesPanel';
import type { JagalchiNodeType, JagalchiSectionType, JagalchiTextType } from '../../../types/editor.types';

export const EditorSidebar = memo(function EditorSidebar() {
  const selectedNode = useAtomValue(singleSelectedNodeAtom);
  const selectedEdge = useAtomValue(singleSelectedEdgeAtom);

  // Edge가 선택된 경우
  if (selectedEdge) {
    return (
      <aside className="w-60 border-l bg-muted/30">
        <EdgePropertiesPanel edge={selectedEdge} />
      </aside>
    );
  }

  // Node가 선택된 경우
  if (selectedNode) {
    if (selectedNode.type === 'jagalchi-node') {
      return (
        <aside className="w-60 border-l bg-muted/30">
          <NodePropertiesPanel node={selectedNode as JagalchiNodeType} />
        </aside>
      );
    }

    if (selectedNode.type === 'jagalchi-section') {
      return (
        <aside className="w-60 border-l bg-muted/30">
          <SectionPropertiesPanel node={selectedNode as JagalchiSectionType} />
        </aside>
      );
    }

    if (selectedNode.type === 'jagalchi-text') {
      return (
        <aside className="w-60 border-l bg-muted/30">
          <TextPropertiesPanel node={selectedNode as JagalchiTextType} />
        </aside>
      );
    }
  }

  // 아무것도 선택되지 않은 경우
  return (
    <aside className="flex w-60 items-center justify-center border-l bg-muted/30">
      <p className="text-sm text-muted-foreground">
        {EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}
      </p>
    </aside>
  );
});
```

### Step 8: RoadmapCanvas 수정 (Jotai 통합)

**파일**: `src/features/roadmap-editor/components/organisms/RoadmapCanvas/index.tsx` (수정)

```typescript
'use client';

import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnSelectionChangeParams,
  type NodeTypes,
  BackgroundVariant,
  ConnectionMode,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { JagalchiNode } from '../../molecules/JagalchiNode';
import { JagalchiSection } from '../../molecules/JagalchiSection';
import { JagalchiText } from '../../molecules/JagalchiText';
import {
  nodesAtom,
  edgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
} from '../../../stores/editor-atoms';

const nodeTypes: NodeTypes = {
  'jagalchi-node': JagalchiNode,
  'jagalchi-section': JagalchiSection,
  'jagalchi-text': JagalchiText,
};

export function RoadmapCanvas() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [selectedNodeIds, setSelectedNodeIds] = useAtom(selectedNodeIdsAtom);
  const [selectedEdgeIds, setSelectedEdgeIds] = useAtom(selectedEdgeIdsAtom);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }: OnSelectionChangeParams) => {
      setSelectedNodeIds(selectedNodes.map((n) => n.id));
      setSelectedEdgeIds(selectedEdges.map((e) => e.id));
    },
    [setSelectedNodeIds, setSelectedEdgeIds]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          label: '',
          labelStyle: { fontSize: 12, fontWeight: 400 },
          labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
        }}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[16, 16]}
        multiSelectionKeyCode="Shift"
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
```

### Step 9: RoadmapEditor 템플릿 수정

**파일**: `src/features/roadmap-editor/components/templates/RoadmapEditor/index.tsx` (수정)

```typescript
'use client';

import { ReactFlowProvider } from '@xyflow/react';
import { Provider as JotaiProvider } from 'jotai';

import { RoadmapCanvas } from '../../organisms/RoadmapCanvas';
import { EditorHeader } from '../../organisms/EditorHeader';
import { EditorToolbar } from '../../organisms/EditorToolbar';
import { EditorSidebar } from '../../organisms/EditorSidebar';
import { ColorPicker } from '../../molecules/ColorPicker';
import { useLocalStorage } from '../../../hooks/use-local-storage';

function EditorContent() {
  useLocalStorage(); // Auto-save/load

  return (
    <div className="relative flex h-screen w-screen flex-col">
      <EditorHeader />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <RoadmapCanvas />
        </div>
        <EditorSidebar />
      </div>

      <EditorToolbar />
      <ColorPicker />
    </div>
  );
}

export function RoadmapEditor() {
  return (
    <JotaiProvider>
      <ReactFlowProvider>
        <EditorContent />
      </ReactFlowProvider>
    </JotaiProvider>
  );
}
```

### Step 10: Barrel Exports 업데이트

**파일**: `src/features/roadmap-editor/index.ts` (업데이트)

```typescript
// Components
export { JagalchiNode } from './components/molecules/JagalchiNode';
export { JagalchiSection } from './components/molecules/JagalchiSection';
export { JagalchiText } from './components/molecules/JagalchiText';
export { ColorPicker } from './components/molecules/ColorPicker';
export { ColorSelector } from './components/molecules/ColorSelector';
export { ColorPresetButton } from './components/atoms/ColorPresetButton';
export { ToolbarButton } from './components/atoms/ToolbarButton';
export { RoadmapCanvas } from './components/organisms/RoadmapCanvas';
export { EditorHeader } from './components/organisms/EditorHeader';
export { EditorToolbar } from './components/organisms/EditorToolbar';
export { EditorSidebar } from './components/organisms/EditorSidebar';
export { NodePropertiesPanel } from './components/organisms/NodePropertiesPanel';
export { SectionPropertiesPanel } from './components/organisms/SectionPropertiesPanel';
export { TextPropertiesPanel } from './components/organisms/TextPropertiesPanel';
export { EdgePropertiesPanel } from './components/organisms/EdgePropertiesPanel';
export { RoadmapEditor } from './components/templates/RoadmapEditor';

// Types
export type {
  NodeColorVariant,
  TextColorVariant,
  NodeState,
  JagalchiNodeData,
  JagalchiSectionData,
  JagalchiTextData,
  RoadmapNode,
} from './types/editor.types';

// Utils
export {
  createJagalchiNode,
  createJagalchiSection,
  createJagalchiText,
} from './utils/node-factory';

// Constants
export { getNodeColors, getTextColor } from './constants/node-colors';
export {
  NODE_PRESET_COLORS,
  TEXT_PRESET_COLORS,
  hexToNodeVariant,
  hexToTextVariant,
  nodeVariantToHex,
  textVariantToHex,
} from './constants/preset-colors';

// Hooks
export { useCanvasCenter } from './hooks/use-canvas-center';
export { useLocalStorage } from './hooks/use-local-storage';

// Stores
export {
  nodesAtom,
  edgesAtom,
  roadmapTitleAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
  selectedNodesAtom,
  selectedEdgesAtom,
  singleSelectedNodeAtom,
  singleSelectedEdgeAtom,
  isColorPickerOpenAtom,
  colorPickerTargetAtom,
  activeToolAtom,
} from './stores/editor-atoms';
```

### Step 11: 테스트 페이지 업데이트

**파일**: `src/app/editor-test/page.tsx` (수정)

```typescript
'use client';

import { RoadmapEditor } from '@/features/roadmap-editor';

export default function EditorTestPage() {
  // Phase 2에서는 initialNodes/initialEdges 불필요
  // LocalStorage에서 자동 로드됨
  return <RoadmapEditor />;
}
```

---

## 검증 체크리스트

Phase 2 완료 후 다음 항목들을 확인한다:

### 시각적 검증

- [ ] Header: 뒤로가기 버튼 + 편집 가능한 타이틀
- [ ] Toolbar: 5개 버튼 (Node, Line, Section, Text, Gear)
- [ ] Sidebar: 선택된 노드에 따라 적절한 패널 표시
- [ ] ColorPicker: 2D gradient + Hue slider + 프리셋 6개
- [ ] 각 패널의 Input/Textarea/Button 정상 렌더링

### 기능 검증

- [ ] Toolbar 버튼 클릭 시 노드 생성 (현재 뷰포트 중앙)
- [ ] Sidebar에서 노드 속성 편집 (이름, 설명, 색상, 자료)
- [ ] Sidebar에서 섹션 속성 편집 (이름, 크기, 색상)
- [ ] Sidebar에서 텍스트 속성 편집 (크기, 색상)
- [ ] Sidebar에서 엣지 라벨 편집
- [ ] ColorPicker 열기/닫기/적용
- [ ] Multi-select (Shift + 클릭) 작동
- [ ] LocalStorage 저장/로드 (새로고침 후에도 유지)
- [ ] Header 타이틀 편집 가능
- [ ] 뒤로가기 버튼 클릭 시 `/`로 이동

### Jotai 상태 검증

- [ ] 노드 추가/삭제/수정 시 atoms 업데이트
- [ ] 선택 상태 atoms 업데이트 (selectedNodeIdsAtom)
- [ ] Sidebar가 선택 상태에 반응
- [ ] Toolbar active state가 activeToolAtom에 반응

### 코드 품질 검증

- [ ] `pnpm lint` 통과
- [ ] `pnpm build` 성공
- [ ] TypeScript 에러 없음
- [ ] 모든 컴포넌트에 'use client' directive
- [ ] Named export 패턴 준수
- [ ] Jotai atoms import 경로 올바름

---

## 주요 설계 결정

### 1. Jotai를 React Flow 상태와 통합

**이유**: React Flow의 내장 상태 관리(`useNodesState`, `useEdgesState`)는 로컬에만 적용됨. Toolbar/Sidebar가 Canvas와 상태를 공유하려면 전역 상태 필요.

**Trade-off**: React Flow의 최적화된 업데이트 로직을 직접 처리해야 함 (`applyNodeChanges`, `applyEdgeChanges` 사용).

### 2. Sidebar를 항상 표시 (Sheet 사용 안 함)

**이유**: Figma 디자인 분석 결과, Sidebar는 고정된 240px 너비로 항상 표시됨. 모바일은 Phase 3에서 고려.

### 3. Custom Color 지원 (타입 확장 필요)

**이유**: Phase 1은 6개 프리셋만 지원. Phase 2에서 `customColor?: string` 필드 추가로 HEX 값 저장.

**참고**: ColorPicker 적용 시 `variant`를 가장 가까운 프리셋으로 변환하거나, `variant: 'custom'` 추가 필요.

### 4. LocalStorage debounce (500ms)

**이유**: 노드 드래그 시 매 프레임마다 저장하면 성능 저하. 500ms debounce로 적절한 균형.

### 5. useCanvasCenter에서 sidebar 너비 보정

**이유**: 뷰포트 중앙이 아닌 "사용자가 보고 있는 화면의 중앙"에 노드 생성. `window.innerWidth / 2 - 240` (sidebar 너비 보정).

---

## Phase 2 이후 남은 작업 (Phase 3)

1. **AI 기능**: 자료 추천, 설명 생성 (Gear 드롭다운)
2. **Multi-select UI**: 정렬 아이콘 (Align Left, Center, Right, Top, Middle, Bottom)
3. **Ghost Node Creation**: FigJam 스타일 (툴바 클릭 → 캔버스에 Ghost → 클릭으로 배치)
4. **Undo/Redo**: Jotai history middleware 또는 custom stack
5. **키보드 단축키**: Delete, Ctrl+Z, Ctrl+C/V 등
6. **서버 연동**: 저장/로드 API, 실시간 협업 (Phase 4)

---

## Critical Files

Phase 2 구현 시 핵심 파일들:

- `src/features/roadmap-editor/stores/editor-atoms.ts` - Jotai 상태 정의
- `src/features/roadmap-editor/constants/preset-colors.ts` - 색상 프리셋
- `src/features/roadmap-editor/hooks/use-canvas-center.ts` - 뷰포트 중앙 계산
- `src/features/roadmap-editor/hooks/use-local-storage.ts` - 영속성
- `src/features/roadmap-editor/components/organisms/EditorToolbar/index.tsx` - 노드 추가
- `src/features/roadmap-editor/components/organisms/EditorSidebar/index.tsx` - 속성 편집
- `src/features/roadmap-editor/components/molecules/ColorPicker/index.tsx` - 커스텀 색상
- `src/features/roadmap-editor/components/templates/RoadmapEditor/index.tsx` - 레이아웃 통합
- `src/constants/messages.ts` - UI 문자열 추가

---

## Acceptance Criteria

Phase 2가 완료되었다고 판단하는 기준:

1. ✅ 사용자가 Toolbar 버튼을 클릭해서 노드/섹션/텍스트를 추가할 수 있다
2. ✅ 추가된 노드가 현재 뷰포트 중앙(sidebar 너비 보정)에 생성된다
3. ✅ 노드 선택 시 Sidebar에 해당 노드의 속성 편집 패널이 표시된다
4. ✅ Sidebar에서 노드 이름, 설명, 색상, 자료를 편집할 수 있다
5. ✅ Sidebar에서 섹션 이름, 크기, 색상을 편집할 수 있다
6. ✅ Sidebar에서 텍스트 크기, 색상을 편집할 수 있다
7. ✅ Sidebar에서 엣지 라벨을 편집할 수 있다
8. ✅ ColorPicker가 열리고, 2D gradient + Hue slider로 색상을 선택할 수 있다
9. ✅ Header 타이틀을 편집할 수 있다
10. ✅ Header 뒤로가기 버튼을 클릭하면 `/`로 이동한다
11. ✅ 페이지 새로고침 후에도 노드/엣지/타이틀이 LocalStorage에서 복원된다
12. ✅ Multi-select (Shift + 클릭)가 작동한다 (단, 정렬 UI는 Phase 3)
13. ✅ `pnpm lint` 통과
14. ✅ `pnpm build` 성공
15. ✅ TypeScript 에러 없음

---

**이 plan은 Phase 2만 다룹니다. AI 기능, Multi-select UI, Undo/Redo는 Phase 3에서 별도 이슈로 진행합니다.**
