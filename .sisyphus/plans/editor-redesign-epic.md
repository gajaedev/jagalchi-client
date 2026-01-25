# Editor Redesign Epic - Work Plan

**Created**: 2026-01-25
**Epic Branch**: `feat/editor-redesign-epic`
**Related Issues**: Closes existing PRs #101-108
**Verification Level**: `screen` (Figma comparison mandatory)

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
❌ NodePropertiesPanel: 98% 차이
   - Figma: 한국어, 6색 팔레트, 자료 섹션, AI 텍스트
   - 구현: 영어, 단일 컬러피커만

❌ EdgePropertiesPanel: 85% 차이
   - Figma: 라인 스타일, 화살표, 두께 조절
   - 구현: 거의 없음

❌ TextPropertiesPanel: 100% 차이
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
1. Figma 디자인 분석 (/intake 또는 MCP)
2. 컴포넌트 구현 (atoms → molecules → organisms)
3. Storybook 작성 (모든 variants)
4. Figma 비교 (pnpm figma:compare)
   → 차이 > 5% → 수정 → 재비교
5. 단위 테스트 작성
6. Atomic commit
7. PR 생성 (템플릿 준수)
```

---

## 📋 상세 구현 계획 (Implementation Plan)

### Phase 0: 준비 작업

**Duration**: 1일

**Tasks**:

```bash
1. Epic 브랜치 생성
   git checkout -b feat/editor-redesign-epic develop

2. 기존 PR 8개 정리
   - PR #101-108: Close all (코멘트 남기기)
   - Epic #109: Update description

3. Epic Issue 생성 (.github/ISSUE_TEMPLATE/feature.yml)
   - 제목: [Feature] 로드맵 에디터 재설계 (Figma 정합성)
   - 설명: 모든 컴포넌트를 Figma 디자인과 일치하도록 재구현
   - 작업 목록: 6개 카테고리별 작업

4. Git tag 생성 (현재 상태 보관)
   git tag archive/editor-before-redesign

5. Worktree 디렉토리 준비
   mkdir -p ../jagalchi-atoms
   mkdir -p ../jagalchi-panels
   mkdir -p ../jagalchi-canvas
   mkdir -p ../jagalchi-layout
   mkdir -p ../jagalchi-ai
   mkdir -p ../jagalchi-supporting
```

**Checklist**:

- [ ] Epic 브랜치 생성 완료
- [ ] 기존 PR 8개 close 완료
- [ ] Epic issue 생성 (템플릿 준수)
- [ ] Git tag 생성
- [ ] Worktree 디렉토리 준비

---

### Phase 1: Basic UI + Supporting (병렬)

**Duration**: 2-3일
**Worktrees**: `../jagalchi-atoms`, `../jagalchi-supporting`

#### 1A. Basic UI (Atoms) - 9개

**Branch**: `feat/editor-atoms`

**Components**:

1. EditorInput (36px 높이, focus 스타일)
2. EditorCheckbox (체크박스)
3. EditorDivider (수평/수직 구분선)
4. EditorTooltip (툴팁)
5. ColorPicker (컬러 선택기 - atom 레벨)
6. ColorPresetButton (프리셋 컬러 버튼)
7. ToolbarButton (툴바 버튼)
8. LoadingButton (로딩 버튼)
9. PlusButtonHandle (+ 버튼 핸들)

**Workflow (각 컴포넌트)**:

```bash
# Worktree 시작
git worktree add ../jagalchi-atoms feat/editor-atoms
cd ../jagalchi-atoms

# 컴포넌트 1: EditorInput
1. Figma 분석
   - MCP로 node ID 확인
   - 디자인 토큰 추출 (높이, 패딩, 테두리)

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

5. Commit
   git add .
   git commit -m "feat(atoms): implement EditorInput with Figma design"

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

1. CollapseSection (접히는 섹션)
2. ContextMenu (컨텍스트 메뉴)
3. ResourceCard (자료 카드)
4. ColorSelector (컬러 셀렉터 - molecule 레벨)

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

#### 2A. Property Panels (Organisms) - 6개

**Branch**: `feat/editor-property-panels`

**Components** (우선순위 순):

1. **NodePropertiesPanel** (가장 중요, 98% 차이 해결)
2. **TextPropertiesPanel** (새로 만들기, 100% 차이 해결)
3. **EdgePropertiesPanel** (85% 차이 해결)
4. SectionPropertiesPanel
5. ResourcePropertiesPanel
6. MultiSelectPanel

**1. NodePropertiesPanel - 상세 구현**

**Figma Requirements** (node: 4472:1567):

```typescript
// 1. 레이아웃
- 너비: 282px (고정)
- 패딩: 16px
- 간격: 12px (섹션 간)

// 2. 노드 이름 섹션
<EditorInput label="노드 이름" value={name} />

// 3. 기본 컬러 섹션
<div>
  <label>기본 컬러</label>
  <ColorPalette>
    {[white, black, blue, purple, red, orange].map(...)}
  </ColorPalette>
  <ColorPicker /> {/* 커스텀 컬러 */}
</div>

// 4. 자료 섹션
<CollapseSection title="자료">
  {resources.map(r => <ResourceCard key={r.id} {...r} />)}
  <Button>+ 자료 추가</Button>
  <Button variant="secondary">AI 추천 받기</Button>
</CollapseSection>

// 5. AI 생성 텍스트
<div className="text-neutral-500 text-xs">
  🤖 AI가 생성한 노드입니다
</div>
```

**구현 파일**:

```
organisms/NodePropertiesPanel/
├── index.tsx
├── NodePropertiesPanel.test.tsx
├── NodePropertiesPanel.stories.tsx
└── components/
    ├── ColorPalette.tsx
    └── ResourceList.tsx
```

**검증**:

```bash
# Figma 비교
pnpm figma:compare

# 예상 결과
NodePropertiesPanel-Default.png: 2.3% different ✅
NodePropertiesPanel-WithResources.png: 3.1% different ✅
NodePropertiesPanel-AIGenerated.png: 1.8% different ✅
```

**2-6번 컴포넌트**: 동일 프로세스

#### 2B. Canvas Elements (Molecules) - 4개

**Branch**: `feat/editor-canvas`

**Components**:

1. **JagalchiNode** (에디터 + 뷰어 공용)
2. **JagalchiSection** (에디터 + 뷰어 공용)
3. **JagalchiText** (에디터 + 뷰어 공용)
4. ConnectionLine (edge rendering)

**JagalchiNode - 상세 구현**:

**Figma Requirements**:

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
```

**Checklist**:

- [ ] Property Panels 6개 완료 (각 < 5% 차이)
- [ ] Canvas Elements 4개 완료
- [ ] 에디터/뷰어 공용 확인
- [ ] PR 2개 생성
- [ ] Epic 브랜치에 머지

---

### Phase 3: Layout (순차)

**Duration**: 2일
**Worktree**: `../jagalchi-layout`

**Branch**: `feat/editor-layout`

**Components**:

1. EditorHeader (60px, 로고 + 줌 컨트롤)
2. EditorToolbar (툴바)
3. EditorSidebar (사이드바 래퍼)
4. RoadmapCanvas (캔버스 + React Flow)

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

1. RoadmapAiModal (AI 모달)
2. RoadmapGenerationForm (로드맵 생성 폼)
3. RoadmapModificationForm (로드맵 수정 폼)
4. ResourceRecommendationModal (자료 추천 모달)
5. EditorAiMenu (AI 메뉴)

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

3. 전체 Figma 비교 (25개 variants)
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

**Risk**: 25개 variants export 시 rate limit (60 req/min)

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
- [ ] **컴포넌트 수**: 33개 전부 재구현
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
| **Phase 0** | 1일         | 준비 작업             | Epic 브랜치, Issue, Worktrees |
| **Phase 1** | 2-3일       | Basic UI + Supporting | 13개 컴포넌트, PR 2개         |
| **Phase 2** | 3-4일       | Panels + Canvas       | 10개 컴포넌트, PR 2개         |
| **Phase 3** | 2일         | Layout                | 4개 컴포넌트, PR 1개          |
| **Phase 4** | 2-3일       | AI Features           | 5개 컴포넌트, PR 1개          |
| **Phase 5** | 1-2일       | 통합 & 검증           | Figma 리포트, 문서            |
| **Phase 6** | 1일         | PR & 머지             | Epic PR, develop 머지         |
| **Total**   | **12-16일** | 6 Phases              | 33 컴포넌트, 7 PRs            |

---

## 🔗 참고 문서 (References)

### 프로젝트 문서

- `.claude/CLAUDE.md` - 프로젝트 컨벤션
- `.claude/rules/development-workflow.md` - 개발 워크플로우
- `.github/ISSUE_TEMPLATE/feature.yml` - Issue 템플릿
- `.github/PULL_REQUEST_TEMPLATE.md` - PR 템플릿

### Figma

- File Key: `L7Ai9cZPKaF09qZfg9xWhH`
- Components: `scripts/figma-components.json` (25 variants)
- Automation: `scripts/figma-*.ts`

### 글로벌 가이드

- `~/.claude/sisyphus-core.md` - FVL, Sisyphus 시스템
- `~/.claude/git-workflow.md` - Git 컨벤션
- `~/.claude/frontend-essentials.md` - Frontend 베스트 프랙티스

---

## 💡 Next Steps

**Immediate Actions** (Phase 0):

1. Epic 브랜치 생성
2. Epic Issue 생성 (템플릿 작성)
3. 기존 PR 8개 close
4. Git tag 생성

**After Plan Approval**:

```bash
/sisyphus + git-worktree "Execute Phase 0 of editor redesign epic"
```

---

**Plan Status**: 📝 Draft
**Waiting for**: User approval to begin execution
