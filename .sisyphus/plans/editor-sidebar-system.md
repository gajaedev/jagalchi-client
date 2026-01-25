# Editor Sidebar System - Figma 재설계

**작성일**: 2026-01-25
**전략**: ultrawork 병렬 작업 (molecules + organisms) → 순차 integration
**범위**: ColorSelector molecules + 4개 Sidebar organisms + EditorTemplate 통합

---

## 📋 요구사항 요약

### 목표

Figma 디자인 기반 에디터 Sidebar 시스템 완전 재작성

### 완료 조건

- [ ] ColorSelector molecule 재작성 완료 (Figma 디자인 100% 정합성)
- [ ] NodePropertiesPanel organism 재작성 완료
- [ ] EdgePropertiesPanel organism 재작성 완료
- [ ] SectionPropertiesPanel organism 재작성 완료
- [ ] TextPropertiesPanel organism 재작성 완료
- [ ] EditorSidebar 통합 완료 (조건부 렌더링)
- [ ] Jotai atoms 상태 관리 구현
- [ ] 모든 컴포넌트 Storybook 작성
- [ ] 테스트 통과 (286개 유지)
- [ ] Lint & Build 성공

---

## 🎯 구현 전략

### Worktree 분할

```
jagalchi-sidebar-molecules   (브랜치: feat/editor-sidebar-molecules)
  → ColorSelector 재작성

jagalchi-sidebar-organisms   (브랜치: feat/editor-sidebar-organisms)
  → 4개 Sidebar 재작성

jagalchi-editor-integration  (브랜치: feat/editor-integration)
  → EditorTemplate + Jotai atoms
```

### 병렬/순차 실행

```
Phase 1 (병렬 - ultrawork):
  ├─ Worktree 1: ColorSelector molecules
  └─ Worktree 2: 4개 Sidebar organisms

Phase 2 (순차):
  └─ Worktree 3: EditorTemplate integration
```

---

## 📦 Phase 1A: ColorSelector Molecule (병렬)

**Worktree**: `jagalchi-sidebar-molecules`
**브랜치**: `feat/editor-sidebar-molecules`
**예상 시간**: 1-2시간

### 파일 목록

#### 재작성

1. `/Users/justn/Projects/jagalchi-sidebar-molecules/src/features/roadmap-editor/components/molecules/ColorSelector/index.tsx`
   - 기존 코드 완전 재작성
   - Figma 디자인 스펙 준수 (36px 높이, 8px border-radius)

2. `/Users/justn/Projects/jagalchi-sidebar-molecules/src/features/roadmap-editor/components/molecules/ColorSelector/ColorSelector.test.tsx`
   - 새 테스트 작성

3. `/Users/justn/Projects/jagalchi-sidebar-molecules/src/features/roadmap-editor/components/molecules/ColorSelector/ColorSelector.stories.tsx`
   - Storybook 스토리 작성

### 구현 단계

#### 1단계: ColorSelector 재작성

- ColorPresetButton 사용 (atoms에서 import)
- Palette 아이콘 + 프리뷰 버튼
- Jotai atoms 사용 (isColorPickerOpenAtom, colorPickerTargetAtom)

#### 2단계: Storybook 작성

- Default, Node, Text 스토리
- Interactive 스토리

#### 3단계: 테스트 작성

- 프리셋 버튼 렌더링
- 커스텀 색상 버튼 클릭 이벤트
- 현재 색상 표시

### 검증 체크리스트

- [ ] ColorPresetButton 6개 렌더링
- [ ] Palette 아이콘 표시
- [ ] 현재 색상 프리뷰 버튼 동작
- [ ] 커스텀 색상 클릭 시 Dialog 열림 (atoms 호출)
- [ ] Storybook 정상 렌더링
- [ ] 테스트 통과
- [ ] Lint 통과

---

## 📦 Phase 1B: 4개 Sidebar Organisms (병렬)

**Worktree**: `jagalchi-sidebar-organisms`
**브랜치**: `feat/editor-sidebar-organisms`
**예상 시간**: 3-4시간

### 파일 목록

#### 재작성

1. **NodePropertiesPanel**
   - `/Users/justn/Projects/jagalchi-sidebar-organisms/src/features/roadmap-editor/components/organisms/NodePropertiesPanel/index.tsx`
   - 노드 이름, 설명, ColorSelector, 형부자료, AI 추천

2. **EdgePropertiesPanel**
   - `/Users/justn/Projects/jagalchi-sidebar-organisms/src/features/roadmap-editor/components/organisms/EdgePropertiesPanel/index.tsx`
   - 라인 스타일, ColorSelector

3. **SectionPropertiesPanel**
   - `/Users/justn/Projects/jagalchi-sidebar-organisms/src/features/roadmap-editor/components/organisms/SectionPropertiesPanel/index.tsx`
   - 섹션 이름, ColorSelector

4. **TextPropertiesPanel**
   - `/Users/justn/Projects/jagalchi-sidebar-organisms/src/features/roadmap-editor/components/organisms/TextPropertiesPanel/index.tsx`
   - 텍스트 내용, ColorSelector

5. **각 컴포넌트 테스트 & Storybook**
   - `*.test.tsx` 파일들
   - `*.stories.tsx` 파일들

### 구현 단계

#### 1단계: NodePropertiesPanel 재작성

```tsx
// Figma 디자인 기반 구조
- Header: "Node_1" + Lock 버튼
- 노드 이름: EditorInput
- 노드 설명: EditorInput (multiline)
- AI 생성: LoadingButton
- 기본 컬러: ColorSelector (molecules)
- 형부자료: EditorInput 3개 + "AI 추천" LoadingButton
```

#### 2단계: EdgePropertiesPanel 재작성

```tsx
- Header: "Line_1" + Lock 버튼
- 라인 스타일: Select/Dropdown
- 기본 컬러: ColorSelector
```

#### 3단계: SectionPropertiesPanel 재작성

```tsx
- Header: "Section_1" + Lock 버튼
- 섹션 이름: EditorInput
- 기본 컬러: ColorSelector
```

#### 4단계: TextPropertiesPanel 재작성

```tsx
- Header: "Text_1" + Lock 버튼
- 텍스트 내용: EditorInput (multiline)
- 기본 컬러: ColorSelector
```

#### 5단계: Storybook & 테스트 작성

### 검증 체크리스트

- [ ] 4개 Sidebar 모두 Figma 디자인 일치
- [ ] 모든 Sidebar에서 ColorSelector 동작
- [ ] EditorInput, LoadingButton 등 atoms 정상 사용
- [ ] Lock 버튼 표시
- [ ] Storybook 4개 스토리 정상
- [ ] 테스트 통과
- [ ] Lint 통과

---

## 📦 Phase 2: EditorTemplate Integration (순차)

**Worktree**: `jagalchi-editor-integration`
**브랜치**: `feat/editor-integration`
**예상 시간**: 2-3시간
**의존성**: Phase 1A, 1B 완료 후 머지 필수

### 파일 목록

#### 생성

1. `/Users/justn/Projects/jagalchi-editor-integration/src/features/roadmap-editor/stores/editor-atoms.ts`
   - Jotai atoms 신규 생성

#### 재작성

2. `/Users/justn/Projects/jagalchi-editor-integration/src/features/roadmap-editor/components/organisms/EditorSidebar/index.tsx`
   - 조건부 렌더링 로직 (선택 타입에 따라 4개 Sidebar 분기)

3. `/Users/justn/Projects/jagalchi-editor-integration/src/features/roadmap-editor/components/templates/RoadmapEditor/index.tsx`
   - EditorSidebar 통합
   - Jotai Provider 추가

### Jotai Atoms 구조

```tsx
// src/features/roadmap-editor/stores/editor-atoms.ts

import { atom } from 'jotai';
import type { Node, Edge } from '@xyflow/react';

// 선택 상태
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);

// 선택 타입 (derived atom)
export const selectionTypeAtom = atom<'node' | 'edge' | 'section' | 'text' | 'multi' | null>(
  (get) => {
    const nodeIds = get(selectedNodeIdsAtom);
    const edgeIds = get(selectedEdgeIdsAtom);

    if (nodeIds.length === 0 && edgeIds.length === 0) return null;
    if (nodeIds.length > 1 || edgeIds.length > 1) return 'multi';

    // TODO: Node type 판별 로직 추가
    if (nodeIds.length === 1) return 'node';
    if (edgeIds.length === 1) return 'edge';

    return null;
  },
);

// ColorPicker Dialog 상태
export const isColorPickerOpenAtom = atom<boolean>(false);
export const colorPickerTargetAtom = atom<{ type: 'node' | 'text'; nodeId: string } | null>(null);
```

### EditorSidebar 조건부 렌더링

```tsx
// src/features/roadmap-editor/components/organisms/EditorSidebar/index.tsx

import { useAtomValue } from 'jotai';
import { selectionTypeAtom } from '../../../stores/editor-atoms';
import { NodePropertiesPanel } from '../NodePropertiesPanel';
import { EdgePropertiesPanel } from '../EdgePropertiesPanel';
import { SectionPropertiesPanel } from '../SectionPropertiesPanel';
import { TextPropertiesPanel } from '../TextPropertiesPanel';
import { MultiSelectPanel } from '../MultiSelectPanel';

export function EditorSidebar() {
  const selectionType = useAtomValue(selectionTypeAtom);

  // 선택 없으면 null 반환 (렌더링 안 함)
  if (!selectionType) return null;

  switch (selectionType) {
    case 'node':
      return <NodePropertiesPanel />;
    case 'edge':
      return <EdgePropertiesPanel />;
    case 'section':
      return <SectionPropertiesPanel />;
    case 'text':
      return <TextPropertiesPanel />;
    case 'multi':
      return <MultiSelectPanel />;
    default:
      return null;
  }
}
```

### 검증 체크리스트

- [ ] Jotai atoms 생성 완료
- [ ] EditorSidebar 조건부 렌더링 동작
- [ ] 선택 없을 때 Sidebar 렌더링 안 됨
- [ ] Node 선택 시 NodePropertiesPanel 표시
- [ ] Edge 선택 시 EdgePropertiesPanel 표시
- [ ] RoadmapEditor에 Jotai Provider 추가
- [ ] 테스트 통과
- [ ] Lint & Build 성공

---

## 🚀 Ultrawork 실행 계획

### Phase 1 실행 (병렬)

```bash
# Worktree 1: ColorSelector molecules
cd /Users/justn/Projects/jagalchi-sidebar-molecules
pnpm build &

# Worktree 2: 4개 Sidebar organisms
cd /Users/justn/Projects/jagalchi-sidebar-organisms
pnpm build &

wait
```

### Phase 2 실행 (순차)

```bash
# Phase 1 머지 후
cd /Users/justn/Projects/jagalchi-editor-integration
pnpm build
```

---

## 📝 커밋 & PR 전략

### 커밋 메시지 형식

```
refactor(editor): <컴포넌트명> Figma 디자인 재작성

Figma 디자인 100% 정합성 달성:
- <변경사항 1>
- <변경사항 2>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### PR 순서

1. **PR molecules**: ColorSelector 재작성
2. **PR organisms**: 4개 Sidebar 재작성 (molecules 머지 후)
3. **PR integration**: EditorTemplate 통합 (1, 2 머지 후)

---

## ⚠️ 리스크 & 완화 전략

### 리스크 1: Figma 디자인 불명확

- **완화**: 작업 중 디자인 불명확하면 즉시 사용자 호출 (`날 불러라`)

### 리스크 2: Worktree 간 의존성 충돌

- **완화**: molecules 먼저 완료 → organisms에서 import
- Phase 1 완료 후 Phase 2 시작 (순차)

### 리스크 3: 기존 테스트 깨짐

- **완화**: 각 worktree에서 개별 테스트 실행
- 통합 전 전체 테스트 검증

### 리스크 4: Jotai atoms 타입 불일치

- **완화**: TypeScript strict mode 준수
- 타입 정의 먼저 작성 후 구현

---

## 🎯 최종 목표

### Phase 1-2 완료 후 상태

- ✅ ColorSelector: Figma 디자인 100% 일치
- ✅ 4개 Sidebar: 모두 재작성 완료
- ✅ EditorSidebar: 조건부 렌더링 동작
- ✅ Jotai atoms: 선택 상태 관리
- ✅ Storybook: 모든 컴포넌트 문서화
- ✅ 테스트: 286개 유지 (추가 테스트 포함)
- ✅ Figma 디자인 정합성: 100%

---

**작성 완료일**: 2026-01-25
**예상 완료 시간**: 6-9시간 (병렬 작업 시 4-6시간)
**난이도**: 중상
