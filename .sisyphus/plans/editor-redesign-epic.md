# Editor Redesign Epic - Work Plan

**Created**: 2026-01-25
**Updated**: 2026-01-25 (Figma 컴포넌트 구조 반영)
**Epic Branch**: `feat/editor-redesign-epic`
**Related Issues**: Closes existing PRs #101-108
**Verification Level**: `screen` (Figma comparison mandatory)

---

## 📋 Figma 컴포넌트 매핑 (Component Mapping)

### 네이밍 전략

- **Figma 이름**: 디자인 파일에서 사용하는 원본 이름
- **구현 이름**: 코드에서 사용할 컴포넌트 이름

### 매핑 테이블

| Figma Component Name      | Node ID    | 구현 컴포넌트 이름        | 카테고리 | 이유                          |
| ------------------------- | ---------- | ------------------------- | -------- | ----------------------------- |
| EditorHeader              | 4466:2207  | EditorHeader              | Organism | 에디터 전용                   |
| EditorToolbarItem         | 4357:2996  | EditorToolbarItem         | Atom     | 에디터 전용                   |
| EditorNodeSidebar         | 4472:1569  | EditorNodeSidebar         | Organism | 에디터 전용 (4 variants)      |
| EditorResourceInput       | 4534:13436 | EditorResourceInput       | Molecule | 에디터 전용                   |
| EditorLineSidebar         | 4480:2347  | EditorLineSidebar         | Organism | 에디터 전용                   |
| EditorSectionSidebar      | 4480:3024  | EditorSectionSidebar      | Organism | 에디터 전용                   |
| EditorTextSidebar         | 4530:3273  | EditorTextSidebar         | Organism | 에디터 전용                   |
| EditorMultiSectionSidebar | 4605:8058  | EditorMultiSectionSidebar | Organism | 에디터 전용                   |
| EditorNode                | 4466:2390  | **JagalchiNode**          | Molecule | 에디터 + 뷰어 공용 (재사용)   |
| EditorSection             | 4479:1101  | **JagalchiSection**       | Molecule | 에디터 + 뷰어 공용 (재사용)   |
| EditorText                | 4508:3026  | **JagalchiText**          | Molecule | 에디터 + 뷰어 공용 (재사용)   |
| EditorAIMenu (생성)       | 4573:3099  | EditorAIMenu              | Organism | 에디터 전용 (variant: create) |
| EditorAIMenu (수정)       | 4573:3100  | EditorAIMenu              | Organism | 에디터 전용 (variant: modify) |
| EditorResource            | 4630:4112  | EditorResource            | Molecule | 에디터 전용                   |

**네이밍 결정 이유**:

- **JagalchiNode/Section/Text**: 에디터와 뷰어 모두에서 재사용되므로 "Jagalchi" prefix 사용
- **Editor prefix**: 에디터 전용 컴포넌트는 "Editor" prefix 유지
- Figma 디자인 이름과 구현 이름이 다른 경우는 위 3개 컴포넌트뿐

---

## 🎯 목표 (Goals)

### Primary Goal

로드맵 에디터의 모든 컴포넌트를 Figma 디자인과 정확히 일치하도록 재구현하여, 98% 차이율을 0%로 개선.

### Secondary Goals

1. **Atomic Design 준수**: atoms → molecules → organisms 계층 명확화
2. **컨벤션 100% 준수**: Named exports, 템플릿, Co-Authored-By 규칙
3. **테스트 커버리지 80%**: 모든 주요 컴포넌트 단위 테스트
4. **Figma 자동 비교**: screen 레벨 검증 (픽셀 차이 < 5%)
5. **재사용 가능**: 에디터와 뷰어에서 모두 사용 가능

---

## 📊 현황 분석 (Current State)

### 문제점

```
❌ NodePropertiesPanel (현재) → EditorNodeSidebar (Figma): 98% 차이
   - Figma: 한국어, 6색 팔레트, 자료 섹션, AI 텍스트
   - 구현: 영어, 단일 컬러피커만

❌ EdgePropertiesPanel (현재) → EditorLineSidebar (Figma): 85% 차이
   - Figma: 라인 스타일, 화살표, 두께 조절
   - 구현: 거의 없음

❌ TextPropertiesPanel (현재) → EditorTextSidebar (Figma): 100% 차이
   - Figma: 존재함
   - 구현: 아예 없음

❌ 규칙 위반
   - Co-Authored-By 매번 추가 (명시 없이)
   - .github/ 템플릿 무시
   - MUST 규칙 미준수
```

### 기존 코드 상태

**develop 브랜치** (20개 컴포넌트):

- Atoms: 3개
- Molecules: 7개
- Organisms: 9개
- Templates: 1개

**feat 브랜치들** (33개 컴포넌트):

- +13개 추가 (기본 UI, AI 기능)
- 하지만 Figma와 불일치

### 보존할 인프라

✅ Figma automation (PR #111):

- `scripts/figma-export.ts`
- `scripts/compare-images.ts`
- `scripts/generate-report.ts`

✅ Git worktree 설정:

- `.claude/CLAUDE.md` 참고

---

## 🛠️ 접근 방법 (Approach)

### 전략

1. **Clean Slate**: develop 그대로 두고 새 epic 브랜치에서 시작
2. **Category-based Worktrees**: 6개 카테고리별 병렬 작업
3. **Figma First**: 모든 컴포넌트는 Figma 디자인 분석부터
4. **Screen Verification**: 퍼블리싱 → Storybook → Figma 비교 → 테스트
5. **Atomic Commits**: 컴포넌트당 1개 커밋, 명확한 메시지

### 기술 스택

- **Figma MCP**: 디자인 메타데이터 추출
- **Figma REST API**: 이미지 export
- **Playwright**: Storybook 스크린샷
- **pixelmatch**: 픽셀 비교 (threshold < 5%)
- **Vitest**: 단위 테스트
- **Storybook**: 문서화 + 시각적 검증

### 워크플로우 (각 컴포넌트)

```
1. Figma 디자인 분석 (MCP: mcp__figma__get_design_context)
2. 컴포넌트 구현 (atoms → molecules → organisms)
3. Storybook 작성 (모든 variants)
4. Figma 비교 (pnpm figma:compare)
   → 차이 > 5% → 수정 → 재비교
5. 단위 테스트 작성
6. Atomic commit (⚠️ MUST: 한국어 커밋 메시지)
7. PR 생성 (템플릿 준수)
```

### ⚠️ MUST: 커밋 메시지 규칙

**모든 커밋 메시지는 한국어로 작성해야 합니다.**

```bash
# ✅ Good - 한국어 커밋 메시지
git commit -m "feat(atoms): EditorInput 구현 (Figma 디자인 기반)"

# ❌ Bad - 영어 커밋 메시지
git commit -m "feat(atoms): implement EditorInput with Figma design"
```

**형식**:

```
<type>(<scope>): <subject>

# 예시
feat(atoms): EditorInput 구현 (Figma 디자인 기반)
fix(atoms): ColorPicker 색상 선택 버그 수정
test(atoms): EditorInput 테스트 추가
```

**이유**: 이 프로젝트는 한국어 커밋 메시지를 표준으로 사용합니다.

---

## 📋 상세 구현 계획 (Implementation Plan)

### Phase 0: 준비 작업 ✅ (완료)

**Duration**: 1일

**Tasks**:

```bash
1. Epic 브랜치 생성 ✅
   git checkout -b feat/editor-redesign-epic develop

2. 기존 PR 9개 정리 ✅
   - PR #101-109: Closed

3. Epic Issue 생성 ✅
   - Issue #113 생성

4. Git tag 생성 ✅
   git tag archive/editor-before-redesign

5. Worktree 디렉토리 준비 ✅
   - jagalchi-atoms (feat/editor-atoms)
   - jagalchi-supporting (feat/editor-supporting)
   - jagalchi-panels (feat/editor-property-panels)
   - jagalchi-canvas (feat/editor-canvas)
   - jagalchi-layout (feat/editor-layout)
   - jagalchi-ai (feat/editor-ai)

6. Plan 문서 작성 ✅
   - Commits: af69d06, 737d776
   - Figma 컴포넌트 매핑 추가
```

**Checklist**:

- [x] Epic 브랜치 생성 완료
- [x] 기존 PR 9개 close 완료
- [x] Epic issue 생성 (템플릿 준수)
- [x] Git tag 생성
- [x] Worktree 디렉토리 준비
- [x] Plan 문서 작성 및 커밋
- [x] Figma 컴포넌트 구조 분석 및 매핑

---

### Phase 1: Basic UI + Supporting (병렬)

**Duration**: 2-3일
**Worktrees**: `../jagalchi-atoms`, `../jagalchi-supporting`

#### 1A. Basic UI (Atoms) - 9개

**Branch**: `feat/editor-atoms`

**Components**:

1. **EditorInput** (36px 높이, focus 스타일)
   - Figma: EditorResourceInput 4534:13436 내부 컴포넌트로 추출
   - 용도: 노드 이름, 자료 입력 등

2. **EditorCheckbox** (체크박스)
   - Figma: EditorNodeSidebar 4472:1569 내부에서 추출
   - 용도: 설정 토글

3. **EditorDivider** (수평/수직 구분선)
   - Figma: EditorNodeSidebar 4472:1569 내부에서 추출
   - 용도: 섹션 구분

4. **EditorTooltip** (툴팁)
   - Figma: 확인 필요
   - 용도: 버튼 설명

5. **ColorPicker** (컬러 선택기 - atom 레벨)
   - Figma: EditorNodeSidebar 4472:1567 내부
   - 용도: 커스텀 컬러 선택

6. **ColorPresetButton** (프리셋 컬러 버튼)
   - Figma: EditorNodeSidebar 4472:1567 내부
   - 6개 프리셋: white, black, blue(#155dfc), purple(#9810fa), red(#ec003f), orange(#e17100)

7. **ToolbarButton** (툴바 버튼)
   - Figma: EditorToolbarItem 4357:2996
   - 용도: 툴바 액션 버튼

8. **LoadingButton** (로딩 버튼)
   - Figma: 확인 필요
   - 용도: AI 추천 등 비동기 작업

9. **PlusButtonHandle** (+ 버튼 핸들)
   - Figma: EditorNode 4466:2390 내부
   - 용도: 노드 연결 핸들 (4방향)

**Workflow (각 컴포넌트)**:

```bash
# Worktree 시작
git worktree add ../jagalchi-atoms feat/editor-atoms
cd ../jagalchi-atoms

# 컴포넌트 1: EditorInput
1. Figma 분석
   mcp__figma__get_design_context(nodeId: "4534:13436")
   # EditorResourceInput에서 입력 필드 구조 확인

2. 구현
   src/features/roadmap-editor/components/atoms/EditorInput/
   ├── index.tsx
   ├── EditorInput.test.tsx
   └── EditorInput.stories.tsx

3. 검증
   pnpm storybook  # 터미널 1
   pnpm figma:screenshots  # 터미널 2
   pnpm figma:compare
   → 차이율 확인 (< 5% 목표)

4. 테스트
   pnpm test EditorInput

5. Commit (⚠️ MUST: 한국어 커밋 메시지)
   git add .
   git commit -m "feat(atoms): EditorInput 구현 (Figma 디자인 기반)"

# 반복 (2-9번 컴포넌트)

# 완료 후
git push -u origin feat/editor-atoms
gh pr create --base feat/editor-redesign-epic \
  --title "feat(atoms): implement basic UI atoms (9 components)" \
  --body "$(cat <<'EOF'
## 📋 관련 이슈
Part of Editor Redesign Epic

## 📝 작업 내용
- [x] EditorInput (36px, Figma 일치)
- [x] EditorCheckbox
- [x] EditorDivider (horizontal/vertical)
- [x] EditorTooltip
- [x] ColorPicker
- [x] ColorPresetButton
- [x] ToolbarButton
- [x] LoadingButton
- [x] PlusButtonHandle

## 📸 Figma 비교
- 모든 컴포넌트 < 5% 차이
- 리포트: visual-tests/report.html

## ✅ 체크리스트
- [x] 관련 이슈 연결
- [x] Figma 디자인 100% 일치
- [x] 단위 테스트 작성 (9/9)
- [x] Storybook 추가 (9/9)
- [x] 린트/빌드 통과 확인
EOF
)"
```

#### 1B. Supporting Components (Molecules) - 4개

**Branch**: `feat/editor-supporting`

**Components**:

1. **CollapseSection** (접히는 섹션)
   - Figma: EditorNodeSidebar 4472:1567 내부
   - 용도: "자료" 섹션 등 접기/펼치기

2. **ContextMenu** (컨텍스트 메뉴)
   - Figma: 확인 필요
   - 용도: 우클릭 메뉴

3. **EditorResource** (자료 카드)
   - Figma: EditorResource 4630:4112
   - 용도: 자료 목록 표시

4. **ColorSelector** (컬러 셀렉터 - molecule 레벨)
   - Figma: EditorNodeSidebar 4472:1567 내부
   - 구성: ColorPresetButton 6개 + ColorPicker
   - 용도: 노드 색상 선택

**Workflow**: 1A와 동일

**Checklist**:

- [ ] Atoms 9개 구현 완료 (각각 < 5% 차이)
- [ ] Supporting 4개 구현 완료
- [ ] 테스트 커버리지 > 80%
- [ ] PR 2개 생성 (템플릿 준수)
- [ ] Epic 브랜치에 머지

---

### Phase 2: Property Panels + Canvas (병렬)

**Duration**: 3-4일
**Worktrees**: `../jagalchi-panels`, `../jagalchi-canvas`

#### 2A. Property Panels (Organisms) - 5개

**Branch**: `feat/editor-property-panels`

**Components** (우선순위 순):

1. **EditorNodeSidebar** (가장 중요, 98% 차이 해결)
   - Figma: 4472:1569 (4 variants)
     - State=Default, Lock=False (4472:1567)
     - State=Default, Lock=True (4472:2132)
     - State=Closed, Lock=False (4472:1568)
     - State=Closed, Lock=True (4472:2166)

2. **EditorTextSidebar** (새로 만들기, 100% 차이 해결)
   - Figma: 4530:3273
   - 용도: 텍스트 노드 속성 편집

3. **EditorLineSidebar** (85% 차이 해결)
   - Figma: 4480:2347
   - 용도: 라인(edge) 속성 편집

4. **EditorSectionSidebar**
   - Figma: 4480:3024
   - 용도: 섹션 노드 속성 편집

5. **EditorMultiSectionSidebar**
   - Figma: 4605:8058
   - 용도: 다중 선택 시 공통 속성 편집

**1. EditorNodeSidebar - 상세 구현**

**Figma Requirements** (node: 4472:1567):

```typescript
// 1. 레이아웃
- 너비: 282px (고정)
- 패딩: 16px
- 간격: 12px (섹션 간)

// 2. 노드 이름 섹션
<EditorInput label="노드 이름" value={name} />
<EditorInput label="노드 설명" multiline value={description} />

// 3. 기본 컬러 섹션
<div>
  <label>기본 컬러</label>
  <ColorSelector
    presets={[white, black, blue, purple, red, orange]}
    value={color}
    onChange={handleColorChange}
  />
</div>

// 4. 자료 섹션
<CollapseSection title="자료">
  {resources.map(r => <EditorResource key={r.id} {...r} />)}
  <EditorResourceInput onAdd={handleAddResource} />
  <LoadingButton onClick={handleAIRecommend}>
    AI 추천 받기
  </LoadingButton>
</CollapseSection>

// 5. AI 생성 텍스트
{isAIGenerated && (
  <div className="text-neutral-500 text-xs">
    🤖 AI가 생성한 노드입니다
  </div>
)}
```

**구현 파일**:

```
organisms/EditorNodeSidebar/
├── index.tsx
├── EditorNodeSidebar.test.tsx
├── EditorNodeSidebar.stories.tsx
└── components/
    └── ResourceList.tsx
```

**Storybook Variants**:

```typescript
// EditorNodeSidebar.stories.tsx
export const Default: Story = {
  args: {
    node: {
      name: '노드 이름',
      description: '노드 설명',
      color: '#155dfc',
      resources: [],
      isAIGenerated: false,
      isLocked: false,
    },
  },
};

export const Locked: Story = {
  args: {
    ...Default.args,
    node: { ...Default.args.node, isLocked: true },
  },
};

export const WithResources: Story = {
  args: {
    ...Default.args,
    node: {
      ...Default.args.node,
      resources: [
        { id: '1', title: '자료 1', url: 'https://...' },
        { id: '2', title: '자료 2', url: 'https://...' },
      ],
    },
  },
};

export const AIGenerated: Story = {
  args: {
    ...Default.args,
    node: { ...Default.args.node, isAIGenerated: true },
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    isCollapsed: true,
  },
};
```

**검증**:

```bash
# Figma 비교
pnpm figma:compare

# 예상 결과
EditorNodeSidebar-Default.png: 2.3% different ✅
EditorNodeSidebar-Locked.png: 1.9% different ✅
EditorNodeSidebar-WithResources.png: 3.1% different ✅
EditorNodeSidebar-AIGenerated.png: 1.8% different ✅
EditorNodeSidebar-Closed.png: 2.5% different ✅
```

**2-5번 컴포넌트**: 동일 프로세스

#### 2B. Canvas Elements (Molecules) - 4개

**Branch**: `feat/editor-canvas`

**Components**:

1. **JagalchiNode** (에디터 + 뷰어 공용)
   - Figma: EditorNode 4466:2390
   - 구현 이름: JagalchiNode (재사용 위해 Jagalchi prefix)

2. **JagalchiSection** (에디터 + 뷰어 공용)
   - Figma: EditorSection 4479:1101
   - 구현 이름: JagalchiSection

3. **JagalchiText** (에디터 + 뷰어 공용)
   - Figma: EditorText 4508:3026
   - 구현 이름: JagalchiText

4. **ConnectionLine** (edge rendering)
   - Figma: 확인 필요
   - 용도: 노드 간 연결선

**JagalchiNode - 상세 구현**:

**Figma Requirements** (EditorNode 4466:2390):

```typescript
interface JagalchiNodeProps {
  id: string;
  data: {
    title: string;
    color: string;
    isLocked?: boolean;
    isAIGenerated?: boolean;
  };
  isSelected?: boolean;
  isEditable?: boolean; // 에디터: true, 뷰어: false
}

// 스타일
- 최소 너비: 120px
- 패딩: 12px 16px
- 테두리: 1px solid (색상에 따라)
- 그림자: selected 시 강조
- 핸들: PlusButtonHandle (4방향)
```

**구현**:

```typescript
// molecules/JagalchiNode/index.tsx
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { PlusButtonHandle } from '../../atoms/PlusButtonHandle';

export const JagalchiNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <div className={cn(
      "min-w-[120px] px-4 py-3 rounded-lg border",
      "transition-all duration-200",
      selected && "ring-2 ring-primary-500 shadow-lg"
    )} style={{ borderColor: data.color }}>

      {/* Handles (4방향) */}
      <PlusButtonHandle type="source" position={Position.Top} />
      <PlusButtonHandle type="source" position={Position.Right} />
      <PlusButtonHandle type="source" position={Position.Bottom} />
      <PlusButtonHandle type="source" position={Position.Left} />

      {/* Title */}
      <div className="text-sm font-medium">{data.title}</div>

      {/* AI Badge */}
      {data.isAIGenerated && (
        <div className="mt-1 text-xs text-neutral-500">🤖 AI</div>
      )}
    </div>
  );
});

JagalchiNode.displayName = 'JagalchiNode';
```

**Storybook Variants**:

```typescript
// JagalchiNode.stories.tsx
export const Default: Story = {
  args: { data: { title: 'Node 1', color: '#3b82f6' } },
};

export const Selected: Story = {
  args: { ...Default.args, selected: true },
};

export const AIGenerated: Story = {
  args: { data: { ...Default.args.data, isAIGenerated: true } },
};

export const Locked: Story = {
  args: { data: { ...Default.args.data, isLocked: true } },
};

export const CustomColor: Story = {
  args: { data: { title: 'Custom', color: '#9810fa' } },
};
```

**Checklist**:

- [ ] Property Panels 5개 완료 (각 < 5% 차이)
- [ ] Canvas Elements 4개 완료
- [ ] 에디터/뷰어 공용 확인 (JagalchiNode/Section/Text)
- [ ] PR 2개 생성
- [ ] Epic 브랜치에 머지

---

### Phase 3: Layout (순차)

**Duration**: 2일
**Worktree**: `../jagalchi-layout`

**Branch**: `feat/editor-layout`

**Components**:

1. **EditorHeader** (60px, 로고 + 줌 컨트롤)
   - Figma: EditorHeader 4466:2207

2. **EditorToolbar** (툴바)
   - 구성: EditorToolbarItem (4357:2996) 여러 개

3. **EditorSidebar** (사이드바 래퍼)
   - 구성: EditorNodeSidebar, EditorTextSidebar 등을 포함

4. **RoadmapCanvas** (캔버스 + React Flow)
   - 구성: JagalchiNode, JagalchiSection, JagalchiText, ConnectionLine

**Implementation Order**:

```
EditorHeader → EditorToolbar → EditorSidebar → RoadmapCanvas
(각각 의존성 있음, 순차 진행)
```

**RoadmapCanvas - 통합 작업**:

```typescript
// organisms/RoadmapCanvas/index.tsx
import ReactFlow from 'reactflow';
import { JagalchiNode, JagalchiSection, JagalchiText } from '../../molecules';
import { ConnectionLine } from '../../molecules/ConnectionLine';

const nodeTypes = {
  jagalchiNode: JagalchiNode,
  jagalchiSection: JagalchiSection,
  jagalchiText: JagalchiText,
};

export function RoadmapCanvas() {
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      connectionLineComponent={ConnectionLine}
      // ... props
    />
  );
}
```

**Checklist**:

- [ ] Layout 4개 완료
- [ ] 전체 레이아웃 조립 확인
- [ ] 캔버스 인터랙션 테스트
- [ ] PR 생성
- [ ] Epic 브랜치에 머지

---

### Phase 4: AI Features (순차)

**Duration**: 2-3일
**Worktree**: `../jagalchi-ai`

**Branch**: `feat/editor-ai`

**Components**:

1. **RoadmapAiModal** (AI 모달)
   - 구성: RoadmapGenerationForm + RoadmapModificationForm

2. **RoadmapGenerationForm** (로드맵 생성 폼)
   - 용도: AI로 새 로드맵 생성

3. **RoadmapModificationForm** (로드맵 수정 폼)
   - 용도: 기존 로드맵 AI로 수정

4. **ResourceRecommendationModal** (자료 추천 모달)
   - 용도: AI가 추천한 자료 목록

5. **EditorAIMenu** (AI 메뉴)
   - Figma: EditorAIMenu (생성) 4573:3099
   - Figma: EditorAIMenu (수정) 4573:3100
   - 2가지 variant: create, modify

**EditorAIMenu - 상세 구현**:

**Figma Requirements**:

```typescript
interface EditorAIMenuProps {
  variant: 'create' | 'modify';
  onSelect: (action: string) => void;
}

// variant: create (4573:3099)
- 메뉴 항목: ["로드맵 생성", "노드 추천", "자료 추천"]

// variant: modify (4573:3100)
- 메뉴 항목: ["로드맵 수정", "노드 확장", "자료 추가"]
```

**Implementation Order**:

```
RoadmapGenerationForm
  → RoadmapModificationForm
    → RoadmapAiModal (위 2개 포함)
      → ResourceRecommendationModal
        → EditorAiMenu
```

**Checklist**:

- [ ] AI Features 5개 완료
- [ ] 모달 인터랙션 테스트
- [ ] 폼 유효성 검증 테스트
- [ ] PR 생성
- [ ] Epic 브랜치에 머지

---

### Phase 5: 통합 & 검증

**Duration**: 1-2일

**Tasks**:

```bash
1. Epic 브랜치로 전체 머지 확인
   git checkout feat/editor-redesign-epic
   git log --oneline --graph

2. 전체 빌드 테스트
   pnpm lint
   pnpm build
   pnpm test

3. 전체 Figma 비교 (14개 컴포넌트 + variants)
   pnpm figma:export
   pnpm figma:screenshots
   pnpm figma:compare
   pnpm figma:report
   → 모든 컴포넌트 < 5% 확인

4. Storybook 배포 (Chromatic)
   pnpm build-storybook
   pnpm chromatic

5. 문서 업데이트
   - docs/editor-components-inventory.md (33→33 업데이트)
   - docs/figma-implementation-gap.md (98%→0% 확인)
   - README.md (필요 시)
```

**Checklist**:

- [ ] 전체 빌드 성공
- [ ] 전체 테스트 통과
- [ ] Figma 비교 모두 < 5%
- [ ] Storybook 배포 완료
- [ ] 문서 업데이트 완료

---

### Phase 6: PR & 머지

**Duration**: 1일

**Tasks**:

```bash
1. Epic PR 생성
   gh pr create --base develop \
     --title "feat(epic): redesign editor with Figma compliance" \
     --body "$(cat .github/PULL_REQUEST_TEMPLATE.md)"

2. PR 체크리스트 완료
   - [x] 관련 이슈 연결
   - [x] 셀프 코드 리뷰 완료
   - [x] Figma 디자인 100% 일치 (< 5%)
   - [x] 테스트 커버리지 80%
   - [x] 린트/빌드 통과 확인
   - [x] Storybook 배포 완료

3. 스크린샷 첨부
   - Figma 비교 리포트 (report.html)
   - Before/After 비교

4. 리뷰 요청
   - 사용자에게 리뷰 요청
   - CI 통과 대기

5. 머지
   git checkout develop
   git merge feat/editor-redesign-epic
   git push origin develop

6. Cleanup
   git worktree remove ../jagalchi-atoms
   git worktree remove ../jagalchi-panels
   git worktree remove ../jagalchi-canvas
   git worktree remove ../jagalchi-layout
   git worktree remove ../jagalchi-ai
   git worktree remove ../jagalchi-supporting

   git branch -d feat/editor-atoms
   git branch -d feat/editor-property-panels
   git branch -d feat/editor-canvas
   git branch -d feat/editor-layout
   git branch -d feat/editor-ai
   git branch -d feat/editor-supporting
```

**Checklist**:

- [ ] Epic PR 생성 (템플릿 준수)
- [ ] 스크린샷 첨부
- [ ] CI 통과
- [ ] 리뷰 승인
- [ ] develop에 머지
- [ ] Worktrees cleanup

---

## 🧪 테스트 전략 (Testing Strategy)

### Unit Tests (Vitest)

**Coverage Target**: 80%

**Test Cases (각 컴포넌트)**:

```typescript
// EditorInput.test.tsx
describe('EditorInput', () => {
  it('renders with label', () => { ... });
  it('handles value change', () => { ... });
  it('shows validation error', () => { ... });
  it('supports disabled state', () => { ... });
  it('matches Figma design snapshot', () => { ... });
});
```

**Snapshot Tests**:

```typescript
// Storybook snapshot
import { composeStories } from '@storybook/react';
import * as stories from './EditorInput.stories';

const { Default, WithError, Disabled } = composeStories(stories);

it('matches snapshot - Default', () => {
  const { container } = render(<Default />);
  expect(container).toMatchSnapshot();
});
```

### Visual Regression (Figma Comparison)

**Threshold**: < 5% pixel difference

**Workflow**:

```bash
# 1. Export Figma designs
pnpm figma:export
# → visual-tests/figma/*.png (25 variants)

# 2. Capture Storybook screenshots
pnpm storybook &
pnpm figma:screenshots
# → visual-tests/actual/*.png

# 3. Compare
pnpm figma:compare
# → visual-tests/diff/*.png
# → visual-tests/comparison-report.json

# 4. Generate report
pnpm figma:report
# → visual-tests/report.html

# 5. Review
open visual-tests/report.html
# → 모든 컴포넌트 < 5% 확인
```

**Acceptance Criteria**:

```
✅ Pass: diffPercentage < 5%
⚠️  Warning: 5% ≤ diffPercentage < 10%
❌ Fail: diffPercentage ≥ 10%
```

### Integration Tests (Optional)

**Canvas Interaction**:

```typescript
// RoadmapCanvas.test.tsx
describe('RoadmapCanvas', () => {
  it('adds node on toolbar button click', () => { ... });
  it('selects node on click', () => { ... });
  it('opens property panel on selection', () => { ... });
  it('connects nodes with edge', () => { ... });
});
```

---

## ⚠️ 리스크 및 대응 (Risks & Mitigation)

### Risk 1: Figma API Rate Limit

**Risk**: 14개 컴포넌트 export 시 rate limit (60 req/min)

**Mitigation**:

- Export 실패 시 자동 재시도 (1분 대기)
- 배치 크기 조절 (10개씩)
- 로컬 캐싱 (이미 export된 것은 스킵)

### Risk 2: 디자인 토큰 불일치

**Risk**: Figma 디자인이 Tailwind config와 다를 수 있음

**Mitigation**:

- Phase 0에서 디자인 토큰 먼저 추출
- `tailwind.config.ts` 업데이트
- 모든 하드코딩 금지 (토큰만 사용)

### Risk 3: 에디터/뷰어 충돌

**Risk**: JagalchiNode 등이 뷰어에서 안 맞을 수 있음

**Mitigation**:

- `isEditable` prop으로 분기
- Phase 3에서 뷰어 테스트
- 필요 시 Wrapper 컴포넌트 추가

### Risk 4: 병렬 작업 Conflict

**Risk**: 6개 worktree 동시 작업 시 merge conflict

**Mitigation**:

- Atomic Design 계층 준수 (atoms → molecules)
- 각 worktree는 독립적인 폴더만 수정
- Phase별 순차 머지 (1 → 2 → 3 ...)

### Risk 5: 테스트 커버리지 미달

**Risk**: 시간 부족으로 80% 못 채울 가능성

**Mitigation**:

- 각 컴포넌트마다 최소 3개 테스트 (렌더링, 인터랙션, 스냅샷)
- Phase 5에서 전체 커버리지 확인
- 부족 시 Phase 6 전에 보완

---

## ✅ 성공 기준 (Success Criteria)

### Must Have (필수)

- [ ] **Figma 정합성**: 모든 컴포넌트 < 5% 차이
- [ ] **컴포넌트 수**: 27개 전부 재구현 (9 atoms + 4 molecules + 9 organisms + 5 AI)
- [ ] **테스트 커버리지**: ≥ 80%
- [ ] **빌드 통과**: `pnpm lint && pnpm build` 성공
- [ ] **템플릿 준수**: 모든 issue/PR이 템플릿 따름
- [ ] **Co-Authored-By**: 명시 없이는 절대 추가 안 함

### Should Have (권장)

- [ ] Storybook 배포 (Chromatic)
- [ ] 문서 업데이트 (inventory, gap analysis)
- [ ] Accessibility 점수 90+
- [ ] Git history 깔끔 (atomic commits)

### Nice to Have (선택)

- [ ] E2E 테스트 (Playwright)
- [ ] 성능 최적화 (React.memo, useMemo)
- [ ] 애니메이션 추가 (Figma 디자인 있으면)

---

## 📅 타임라인 (Timeline)

| Phase       | Duration    | Tasks                 | Deliverables                  |
| ----------- | ----------- | --------------------- | ----------------------------- |
| **Phase 0** | 1일 ✅      | 준비 작업             | Epic 브랜치, Issue, Worktrees |
| **Phase 1** | 2-3일       | Basic UI + Supporting | 13개 컴포넌트, PR 2개         |
| **Phase 2** | 3-4일       | Panels + Canvas       | 9개 컴포넌트, PR 2개          |
| **Phase 3** | 2일         | Layout                | 4개 컴포넌트, PR 1개          |
| **Phase 4** | 2-3일       | AI Features           | 5개 컴포넌트, PR 1개          |
| **Phase 5** | 1-2일       | 통합 & 검증           | Figma 리포트, 문서            |
| **Phase 6** | 1일         | PR & 머지             | Epic PR, develop 머지         |
| **Total**   | **12-16일** | 6 Phases              | 27 컴포넌트, 7 PRs            |

---

## 🔗 참고 문서 (References)

### 프로젝트 문서

- `.claude/CLAUDE.md` - 프로젝트 컨벤션
- `.claude/rules/development-workflow.md` - 개발 워크플로우
- `.github/ISSUE_TEMPLATE/feature.yml` - Issue 템플릿
- `.github/PULL_REQUEST_TEMPLATE.md` - PR 템플릿

### Figma

- File Key: `L7Ai9cZPKaF09qZfg9xWhH`
- Components: 14개 + variants (위 매핑 테이블 참고)
- Automation: `scripts/figma-*.ts`

### Figma 컴포넌트 링크

| 컴포넌트                  | Node ID    | Figma 링크                                                                                                   |
| ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| EditorHeader              | 4466:2207  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4466-2207  |
| EditorToolbarItem         | 4357:2996  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4357-2996  |
| EditorToolbarDropdown     | 4357:3019  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4357-3019  |
| EditorToolbar             | 4472:2494  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4472-2494  |
| EditorNodeSidebar         | 4472:1569  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4472-1569  |
| EditorResourceInput       | 4534:13436 | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4534-13436 |
| EditorLineSidebar         | 4480:2347  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4480-2347  |
| EditorSectionSidebar      | 4480:3024  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4480-3024  |
| EditorTextSidebar         | 4530:3273  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4530-3273  |
| EditorMultiSectionSidebar | 4605:8058  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4605-8058  |
| EditorNode                | 4466:2390  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4466-2390  |
| EditorSection             | 4479:1101  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4479-1101  |
| EditorText                | 4508:3026  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4508-3026  |
| EditorAIMenu (생성)       | 4573:3099  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4573-3099  |
| EditorAIMenu (수정)       | 4573:3100  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4573-3100  |
| EditorResource            | 4630:4112  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4630-4112  |

### Figma 페이지 링크

| 페이지                  | Node ID    | Figma 링크                                                                                                   |
| ----------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| 기본 페이지             | 4575:3693  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4575-3693  |
| 노드 많이 생성된 페이지 | 4472:1595  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4472-1595  |
| 노드 자료 추천 받을 때  | 4534:13898 | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4534-13898 |
| 선 연결                 | 4480:1254  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4480-1254  |
| 섹션 생성               | 4489:1665  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4489-1665  |
| 텍스트 추가             | 4508:2712  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4508-2712  |
| 드롭다운 선택           | 4534:13586 | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4534-13586 |
| 로드맵 생성             | 4573:2778  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4573-2778  |
| 로드맵 생성 중          | 4589:3335  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4589-3335  |
| 로드맵 수정             | 4589:3388  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4589-3388  |
| 로드맵 수정 중          | 4577:2684  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4577-2684  |
| 노드 다중 선택          | 4630:4183  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4630-4183  |
| 선 다중 선택            | 4630:4509  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4630-4509  |
| 섹션 다중 선택          | 4630:4736  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4630-4736  |
| 텍스트 다중 선택        | 4630:4963  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4630-4963  |
| 혼합 다중 선택          | 4630:5190  | https://www.figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/Jagalchi-s-Obra-shadcn-ui--Community-?node-id=4630-5190  |

### Figma Node IDs (Quick Reference)

```json
{
  "EditorHeader": "4466:2207",
  "EditorToolbarItem": "4357:2996",
  "EditorToolbarDropdown": "4357:3019",
  "EditorToolbar": "4472:2494",
  "EditorNodeSidebar": "4472:1569",
  "EditorResourceInput": "4534:13436",
  "EditorLineSidebar": "4480:2347",
  "EditorSectionSidebar": "4480:3024",
  "EditorTextSidebar": "4530:3273",
  "EditorMultiSectionSidebar": "4605:8058",
  "EditorNode": "4466:2390",
  "EditorSection": "4479:1101",
  "EditorText": "4508:3026",
  "EditorAIMenu_Create": "4573:3099",
  "EditorAIMenu_Modify": "4573:3100",
  "EditorResource": "4630:4112"
}
```

### 글로벌 가이드

- `~/.claude/sisyphus-core.md` - FVL, Sisyphus 시스템
- `~/.claude/git-workflow.md` - Git 컨벤션
- `~/.claude/frontend-essentials.md` - Frontend 베스트 프랙티스

---

## 💡 Next Steps

**Current Phase**: Phase 1 시작 준비

**Immediate Actions**:

1. EditorInput Figma 분석 (EditorResourceInput 4534:13436에서 추출)
2. ColorPresetButton Figma 분석 (EditorNodeSidebar 4472:1567에서 추출)
3. Atoms 9개 순차 구현
4. Supporting 4개 병렬 구현

**Execution Command**:

```bash
# Example component build
/ui screen "EditorInput atom from Figma 4534:13436"
```

---

**Plan Status**: 📝 Updated (Figma 구조 반영 완료)
**Waiting for**: User approval to begin Phase 1 execution
