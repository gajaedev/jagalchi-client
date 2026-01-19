# Jagalchi Editor Figma 재작업 계획

**작성일**: 2026-01-17
**전략**: ultrawork 병렬 작업 + 기존 코드 재활용
**범위**: Phase 1-4 (다중 선택 제외)

---

## 📋 전체 개요

### 작업 범위

- ✅ **재활용**: FlowNode, FlowEdge, FlowSection, FlowText, 타입 정의
- 🔄 **재작성**: Sidebar, ColorPicker, EditorTemplate, Toolbar
- ➕ **신규**: Jotai atoms, AI Dropdown

### 의사결정 요약

1. **ColorPicker**: react-colorful 라이브러리 사용
2. **/editor/new**: 완전히 삭제 (AI로만 생성)
3. **Sidebar**: 항상 열림 (선택 없을 때는 숨김)
4. **Jotai atoms**: 새로 생성
5. **테스트**: 유지 가능한 것은 유지, 새 컴포넌트는 새로 작성
6. **AI Dialog**: UI만 구현 (mock 데이터)

---

## 🔄 Git Worktree 전략

### Worktree 구성 (3개)

```bash
# 메인 저장소와 동일 레벨에 생성
cd /Users/justn/Projects/jagalchi-client

# 3개 worktree 생성
git worktree add ../jagalchi-65 feat/#65-layout-refactor
git worktree add ../jagalchi-66 feat/#66-colorpicker-2d
git worktree add ../jagalchi-67 feat/#67-sidebar-fixed

# Phase 4는 Phase 1-3 머지 후 순차 작업
```

### 병렬/순차 전략

```
Phase 1 (레이아웃) ──┐
                    ├─→ 모두 독립적 (병렬 가능)
Phase 2 (ColorPicker)┤
                    │
Phase 3 (Sidebar) ──┘

↓ (1-3 머지 후)

Phase 4 (AI Dropdown) → 순차 작업 (Phase 1 의존)
```

---

## 📦 Phase 1: 레이아웃 구조 변경

**이슈**: #65
**브랜치**: `feat/#65-layout-refactor`
**Worktree**: `jagalchi-65`
**예상 시간**: 1-2시간
**의존성**: 없음 (독립 작업 가능)

### 목표

- Sidebar를 항상 열린 우측 고정 패널로 변경
- Header 간소화
- `/editor/new` 페이지 삭제

### 파일 목록

#### 삭제

1. `/Users/justn/Projects/jagalchi-client/src/app/editor/new/page.tsx`

#### 수정

2. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/templates/EditorTemplate/index.tsx`
   - Sidebar를 고정 우측 패널로 변경
   - Sheet 제거, 항상 렌더링

3. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/EditorHeader/index.tsx`
   - "< Jagalchi Roadmap" 텍스트만 유지
   - 타이틀 편집 기능 제거
   - AI 버튼 제거
   - 잠금/저장 UI 제거

4. `/Users/justn/Projects/jagalchi-client/src/app/editor/[id]/page.tsx`
   - `/editor/new` 제거에 따른 로직 조정
   - EditorTemplate props 업데이트

5. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/templates/EditorTemplate/EditorTemplate.test.tsx`
   - 레이아웃 변경에 맞춰 테스트 수정

### 구현 단계

#### 1단계: EditorTemplate 레이아웃 변경

```tsx
// src/features/editor/components/templates/EditorTemplate/index.tsx

interface EditorTemplateProps {
  children: React.ReactNode; // Canvas
  header?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode; // 항상 렌더링
}

export function EditorTemplate({ children, header, toolbar, sidebar }: EditorTemplateProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Header - 고정 상단 */}
      {header && (
        <div className="bg-background fixed top-0 right-0 left-0 z-40 border-b">{header}</div>
      )}

      {/* Canvas + Sidebar 영역 */}
      <div className="absolute inset-0 top-[56px] flex">
        {/* Canvas - 좌측 확장 */}
        <div className="relative flex-1">{children}</div>

        {/* Sidebar - 우측 고정 패널 */}
        {sidebar && (
          <div className="bg-background w-[320px] overflow-y-auto border-l">{sidebar}</div>
        )}
      </div>

      {/* Toolbar - 하단 중앙 */}
      {toolbar && <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">{toolbar}</div>}
    </div>
  );
}
```

#### 2단계: EditorHeader 간소화

```tsx
// src/features/editor/components/organisms/EditorHeader/index.tsx

export function EditorHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Jagalchi Roadmap</span>
      </button>
    </div>
  );
}
```

#### 3단계: `/editor/new` 페이지 삭제

```bash
rm /Users/justn/Projects/jagalchi-client/src/app/editor/new/page.tsx
```

#### 4단계: 테스트 수정

```tsx
// EditorTemplate.test.tsx - 고정 Sidebar 확인
it('renders fixed sidebar on right', () => {
  const { container } = render(
    <EditorTemplate sidebar={<div>Sidebar</div>}>Canvas</EditorTemplate>,
  );

  const sidebar = container.querySelector('.w-\\[320px\\]');
  expect(sidebar).toBeInTheDocument();
  expect(sidebar).toHaveClass('border-l');
});
```

### 검증 체크리스트

- [ ] EditorTemplate이 Sidebar를 항상 렌더링
- [ ] Sidebar 너비 320px, 우측 고정
- [ ] Header가 "< Jagalchi Roadmap" 텍스트만 표시
- [ ] `/editor/new` 접근 시 404
- [ ] 테스트 통과
- [ ] pnpm lint 통과
- [ ] pnpm build 성공

---

## 🎨 Phase 2: 2D 그라디언트 ColorPicker

**이슈**: #66
**브랜치**: `feat/#66-colorpicker-2d`
**Worktree**: `jagalchi-66`
**예상 시간**: 2-3시간
**의존성**: 없음 (독립 작업 가능)

### 목표

- react-colorful로 2D 그라디언트 ColorPicker 구현
- 5색 프리셋 유지
- HEX input 제거

### 파일 목록

#### 생성

1. `/Users/justn/Projects/jagalchi-client/package.json` (pnpm add)

#### 수정

2. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/atoms/ColorPicker/index.tsx`
   - 완전히 재작성 (react-colorful 사용)

3. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/atoms/ColorPicker/ColorPicker.test.tsx`
   - 새로 작성 (2D 피커 테스트)

4. `/Users/justn/Projects/jagalchi-client/src/stories/editor/ColorPicker.stories.tsx`
   - Storybook 업데이트

### 구현 단계

#### 1단계: react-colorful 설치

```bash
cd /Users/justn/Projects/jagalchi-66
pnpm add react-colorful
```

#### 2단계: ColorPicker 재작성

```tsx
// src/features/editor/components/atoms/ColorPicker/index.tsx

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  className?: string;
}

const DEFAULT_COLORS = ['#000000', '#3B82F6', '#8B5CF6', '#EF4444', '#F97316'];

export function ColorPicker({
  value,
  onChange,
  presetColors = DEFAULT_COLORS,
  className,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value);

  const handleChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange(newColor);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* 5색 프리셋 */}
      <div className="flex gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => handleChange(color)}
            className={cn(
              'h-8 w-8 rounded-full border-2 transition-all',
              currentColor === color
                ? 'ring-primary ring-2 ring-offset-2'
                : 'border-gray-300 hover:scale-110',
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>

      {/* 2D 그라디언트 피커 */}
      <div className="space-y-2">
        <p className="text-sm font-medium">커스텀</p>
        <HexColorPicker color={currentColor} onChange={handleChange} />
      </div>
    </div>
  );
}
```

#### 3단계: 테스트 작성

```tsx
// ColorPicker.test.tsx

describe('ColorPicker', () => {
  it('renders preset colors', () => {
    render(<ColorPicker value="#000000" onChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);
  });

  it('calls onChange when preset color clicked', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);

    const blueButton = screen.getByLabelText('Select color #3B82F6');
    fireEvent.click(blueButton);

    expect(onChange).toHaveBeenCalledWith('#3B82F6');
  });

  it('renders HexColorPicker from react-colorful', () => {
    const { container } = render(<ColorPicker value="#000000" onChange={vi.fn()} />);

    // react-colorful의 특정 클래스 확인
    expect(container.querySelector('.react-colorful')).toBeInTheDocument();
  });
});
```

#### 4단계: Storybook 업데이트

```tsx
// ColorPicker.stories.tsx

export default {
  title: 'Editor/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ColorPicker>;

export const Default: Story = {
  args: {
    value: '#3B82F6',
    onChange: (color) => console.log(color),
  },
};

export const CustomPresets: Story = {
  args: {
    value: '#FF6B6B',
    onChange: (color) => console.log(color),
    presetColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
  },
};
```

### 검증 체크리스트

- [ ] 5색 프리셋 버튼 렌더링
- [ ] 프리셋 클릭 시 색상 변경
- [ ] 2D 그라디언트 피커 동작
- [ ] Hue 슬라이더 동작
- [ ] HEX input 없음
- [ ] 테스트 통과
- [ ] Storybook 렌더링 정상
- [ ] pnpm lint 통과
- [ ] pnpm build 성공

---

## 📂 Phase 3: Sidebar 고정 패널 구현

**이슈**: #67
**브랜치**: `feat/#67-sidebar-fixed`
**Worktree**: `jagalchi-67`
**예상 시간**: 2-3시간
**의존성**: Phase 2 (ColorPicker) - 머지 후 최신 ColorPicker 사용

### 목표

- Sidebar를 항상 열린 상태로 변경
- Sheet 제거
- 선택 없을 때 조건부 렌더링
- 새 ColorPicker 통합

### 파일 목록

#### 생성

1. `/Users/justn/Projects/jagalchi-client/src/features/editor/stores/editor-atoms.ts`
   - Jotai atoms 신규 생성

#### 수정

2. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/DynamicSidebar/index.tsx`
   - Sheet 제거, 고정 패널로 변경

3. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/NodeSidebar/index.tsx`
   - 새 ColorPicker 사용

4. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/LineSidebar/index.tsx`
   - 새 ColorPicker 사용

5. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/SectionSidebar/index.tsx`
   - 새 ColorPicker 사용

6. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/TextSidebar/index.tsx`
   - 새 ColorPicker 사용

7. `/Users/justn/Projects/jagalchi-client/src/app/editor/[id]/page.tsx`
   - Jotai atoms 사용

### 구현 단계

#### 1단계: Jotai atoms 생성

```tsx
// src/features/editor/stores/editor-atoms.ts

import { atom } from 'jotai';
import type { Node, Edge } from '@xyflow/react';
import type { EditorToolbarMode, SelectionType } from '../types/editor.types';

// Toolbar 상태
export const toolbarModeAtom = atom<EditorToolbarMode | null>(null);

// React Flow 데이터
export const flowNodesAtom = atom<Node[]>([]);
export const flowEdgesAtom = atom<Edge[]>([]);

// 선택 상태
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);

// 선택 타입 (derived atom)
export const selectionTypeAtom = atom<SelectionType | null>((get) => {
  const nodeIds = get(selectedNodeIdsAtom);
  const edgeIds = get(selectedEdgeIdsAtom);

  if (nodeIds.length === 0 && edgeIds.length === 0) return null;

  if (nodeIds.length > 0 && edgeIds.length === 0) {
    // TODO: Node type 판별 로직 (node/section/text)
    return 'node';
  }

  if (nodeIds.length === 0 && edgeIds.length > 0) {
    return 'line';
  }

  return 'mixed';
});
```

#### 2단계: DynamicSidebar 재작성

```tsx
// src/features/editor/components/organisms/DynamicSidebar/index.tsx

import { useAtomValue } from 'jotai';
import { selectionTypeAtom } from '../../stores/editor-atoms';
import { NodeSidebar } from '../NodeSidebar';
import { LineSidebar } from '../LineSidebar';
// ... other imports

export function DynamicSidebar() {
  const selectionType = useAtomValue(selectionTypeAtom);

  // 선택 없으면 렌더링 안 함
  if (!selectionType) {
    return null;
  }

  switch (selectionType) {
    case 'node':
      return <NodeSidebar />;

    case 'line':
      return <LineSidebar />;

    case 'section':
      return <SectionSidebar />;

    case 'text':
      return <TextSidebar />;

    case 'mixed':
      return <div className="text-muted-foreground p-4 text-sm">여러 요소가 선택되었습니다.</div>;

    default:
      return null;
  }
}
```

#### 3단계: NodeSidebar에 ColorPicker 통합

```tsx
// src/features/editor/components/organisms/NodeSidebar/index.tsx

import { ColorPicker } from '../../atoms/ColorPicker';

export function NodeSidebar() {
  const [color, setColor] = useState('#3B82F6');

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Node_1</h3>
        <Button variant="ghost" size="icon">
          <Lock className="h-4 w-4" />
        </Button>
      </div>

      {/* 노드 이름 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">노드 이름</label>
        <Input placeholder="Node_1" />
      </div>

      {/* 노드 설명 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">노드 설명</label>
        <Textarea placeholder="Description..." />
      </div>

      {/* AI 생성 */}
      <Button variant="outline" className="w-full">
        AI 생성
      </Button>

      {/* 기본 컬러 + 커스텀 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">기본 컬러</label>
        <ColorPicker value={color} onChange={setColor} />
      </div>

      {/* 형부 자료 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">형부 자료</label>
        <Input placeholder="자료 링크 입력" />
        <Input placeholder="자료 링크 입력" />
        <Input placeholder="자료 링크 입력" />
        <Button variant="outline" size="sm" className="w-full">
          + AI 추천
        </Button>
      </div>
    </div>
  );
}
```

#### 4단계: 다른 Sidebar에도 동일하게 적용

- LineSidebar, SectionSidebar, TextSidebar에 ColorPicker 통합

### 검증 체크리스트

- [ ] 선택 없을 때 Sidebar 렌더링 안 됨
- [ ] Node 선택 시 NodeSidebar 표시
- [ ] Line 선택 시 LineSidebar 표시
- [ ] ColorPicker가 모든 Sidebar에서 동작
- [ ] Jotai atoms 상태 동기화
- [ ] 테스트 통과
- [ ] pnpm lint 통과
- [ ] pnpm build 성공

---

## 🤖 Phase 4: AI Dropdown 구현

**이슈**: #68
**브랜치**: `feat/#68-ai-dropdown`
**Worktree**: 메인 저장소 또는 새 worktree
**예상 시간**: 1-2시간
**의존성**: Phase 1 (EditorTemplate) - 머지 후 작업

### 목표

- 툴바에 톱니바퀴 버튼 추가
- Dropdown 메뉴 구현
- AI Dialog 연동 (mock)

### 파일 목록

#### 수정

1. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/EditorToolbar/index.tsx`
   - 톱니바퀴 버튼 + Dropdown 추가

2. `/Users/justn/Projects/jagalchi-client/src/features/editor/components/organisms/AIDialog/index.tsx`
   - 로딩 상태 추가 (mock)

3. `/Users/justn/Projects/jagalchi-client/src/app/editor/[id]/page.tsx`
   - AIDialog 상태 관리

### 구현 단계

#### 1단계: DropdownMenu 설치 (필요 시)

```bash
pnpm dlx shadcn@latest add dropdown-menu
```

#### 2단계: EditorToolbar에 톱니바퀴 추가

```tsx
// src/features/editor/components/organisms/EditorToolbar/index.tsx

import { Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EditorToolbarProps {
  activeMode: EditorToolbarMode | null;
  onModeChange: (mode: EditorToolbarMode | null) => void;
  onAIAction: (action: 'generate' | 'modify') => void;
}

export function EditorToolbar({ activeMode, onModeChange, onAIAction }: EditorToolbarProps) {
  return (
    <div className="bg-background flex items-center gap-2 rounded-lg border px-4 py-2 shadow-lg">
      {/* 기존 버튼들 */}
      <Button
        variant={activeMode === 'node' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onModeChange('node')}
      >
        <Square className="h-4 w-4" />
      </Button>

      <Button
        variant={activeMode === 'line' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onModeChange('line')}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>

      <Button
        variant={activeMode === 'section' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onModeChange('section')}
      >
        <Square className="h-5 w-5" />
      </Button>

      <Button
        variant={activeMode === 'text' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onModeChange('text')}
      >
        <Type className="h-4 w-4" />
      </Button>

      <div className="bg-border h-6 w-px" />

      {/* 톱니바퀴 Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAIAction('generate')}>로드맵 생성</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAIAction('modify')}>로드맵 수정</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
```

#### 3단계: AIDialog 로딩 상태 추가

```tsx
// src/features/editor/components/organisms/AIDialog/index.tsx

export function AIDialog({ open, onOpenChange, initialAction }: AIDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);

    // Mock: 2초 후 완료
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* 기존 탭 UI */}

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-muted-foreground ml-2 text-sm">생성 중...</p>
          </div>
        ) : (
          <>
            <Textarea placeholder="프롬프트 입력..." />
            <Button onClick={handleGenerate}>생성하기</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

#### 4단계: 페이지에서 연동

```tsx
// src/app/editor/[id]/page.tsx

export default function EditorPage() {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiAction, setAiAction] = useState<'generate' | 'modify'>('generate');

  const handleAIAction = (action: 'generate' | 'modify') => {
    setAiAction(action);
    setAiDialogOpen(true);
  };

  return (
    <>
      <EditorTemplate
        toolbar={
          <EditorToolbar
            activeMode={toolbarMode}
            onModeChange={setToolbarMode}
            onAIAction={handleAIAction}
          />
        }
        // ... other props
      >
        <EditorCanvas />
      </EditorTemplate>

      <AIDialog open={aiDialogOpen} onOpenChange={setAiDialogOpen} initialAction={aiAction} />
    </>
  );
}
```

### 검증 체크리스트

- [ ] 툴바에 톱니바퀴 버튼 표시
- [ ] Dropdown 메뉴 동작 ("로드맵 생성", "로드맵 수정")
- [ ] "로드맵 생성" 클릭 시 AIDialog 열림 (생성 탭)
- [ ] "로드맵 수정" 클릭 시 AIDialog 열림 (수정 탭)
- [ ] 로딩 상태 표시 (2초 mock)
- [ ] 테스트 통과
- [ ] pnpm lint 통과
- [ ] pnpm build 성공

---

## 🚀 Ultrawork 실행 계획

### 1단계: Phase 1-3 병렬 실행

```bash
# 3개 worktree 생성
git worktree add ../jagalchi-65 feat/#65-layout-refactor
git worktree add ../jagalchi-66 feat/#66-colorpicker-2d
git worktree add ../jagalchi-67 feat/#67-sidebar-fixed

# Phase 1-3을 병렬로 실행 (ultrawork)
# - Phase 1: jagalchi-65에서 작업
# - Phase 2: jagalchi-66에서 작업
# - Phase 3: jagalchi-67에서 작업
```

### 2단계: 의존성 순서 머지

```
Phase 2 (ColorPicker) 먼저 머지
  ↓
Phase 3 (Sidebar) 머지 (ColorPicker 의존)
  ↓
Phase 1 (레이아웃) 머지
  ↓
Phase 4 (AI Dropdown) 순차 작업 후 머지
```

**이유:**

- Phase 3이 Phase 2의 ColorPicker를 사용하므로 Phase 2 먼저 머지
- Phase 1은 독립적이지만, Phase 4가 의존하므로 Phase 4 전에 머지
- Phase 4는 Phase 1 머지 후 순차 작업

### 3단계: 각 Phase 빌드 검증

```bash
# 병렬 빌드 (각 worktree에서)
cd ../jagalchi-65 && pnpm build &
cd ../jagalchi-66 && pnpm build &
cd ../jagalchi-67 && pnpm build &
wait
```

---

## 📝 이슈/PR 생성 전략

### 이슈 생성

```bash
# Phase 1-4 이슈 생성
gh issue create --title "[Feature] Editor 레이아웃 구조 변경" --body "..."
gh issue create --title "[Feature] 2D 그라디언트 ColorPicker 구현" --body "..."
gh issue create --title "[Feature] Sidebar 고정 패널 구현" --body "..."
gh issue create --title "[Feature] AI Dropdown 구현" --body "..."
```

### PR 생성 순서

1. **PR #66 (ColorPicker)** - 먼저 머지
2. **PR #67 (Sidebar)** - Phase 2 머지 후 생성 (ColorPicker 사용)
3. **PR #65 (레이아웃)** - 독립적으로 머지 가능
4. **PR #68 (AI Dropdown)** - Phase 1 머지 후 생성

---

## ⚠️ 주의사항

### 1. Phase 3 작업 시

- Phase 2 (ColorPicker)가 머지된 후 `git pull origin develop`로 최신 ColorPicker 가져오기
- 또는 Phase 2 PR이 머지되기 전까지 임시로 기존 ColorPicker 사용

### 2. Worktree 충돌 방지

- 같은 파일을 여러 worktree에서 수정하지 않기
- Phase 1, 2, 3는 파일이 겹치지 않도록 설계됨

### 3. 테스트 작성

- 각 Phase에서 새로 만든 컴포넌트는 테스트 필수
- 기존 FlowNode 등은 테스트 유지

### 4. Figma 디자인 참고

- 작업 중 `.claude/figma-design-spec.md` 수시로 확인
- 불확실한 부분은 Figma 스크린샷 다시 확인

---

## 🎯 최종 목표

### Phase 1-4 완료 후 상태

- ✅ Sidebar: 항상 열린 우측 고정 패널
- ✅ ColorPicker: 2D 그라디언트 + 5색 프리셋
- ✅ Header: "< Jagalchi Roadmap" 간소화
- ✅ AI 진입점: 툴바 톱니바퀴 Dropdown
- ✅ `/editor/new`: 삭제
- ✅ Jotai atoms: 선택 상태 관리
- ✅ 모든 테스트 통과
- ✅ Figma 디자인 70% 구현

### 다음 단계 (별도 작업)

- Phase 5: 다중 선택 Sidebar (정렬 아이콘 6개)
- API 연동 (AI 생성/수정)
- E2E 테스트

---

**작성 완료일**: 2026-01-17
**예상 완료 시간**: 6-10시간 (병렬 작업 시 3-5시간)
**난이도**: 중간
