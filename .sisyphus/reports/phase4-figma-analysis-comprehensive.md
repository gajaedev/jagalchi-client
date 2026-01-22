# Phase 4 완전 재퍼블리싱 - Figma 분석 종합 보고서

**분석 일시**: 2026-01-23
**분석 대상**: 33개 Figma 링크 (컴포넌트 16개 + 페이지 17개)
**분석 방법**: 8개 병렬 에이전트 (Sisyphus + Ultrawork, 2회 실행)

---

## 📊 Executive Summary

### 전체 현황

- **컴포넌트 분석**: 16개 (Header 4개, Sidebar 6개, Canvas 4개, AI Menu 2개)
- **페이지 분석**: 17개 (기본 2개, 인터랙션 5개, AI 기능 5개, 다중 선택 5개)
- **주요 문제점**:
  - 색상 시스템 불일치 (Figma 디자인 토큰 vs 현재 구현)
  - 레이아웃 측정값 오차 (패딩, 간격, 크기)
  - 누락된 인터랙션 상태 (hover, active, disabled)
  - AI 기능 대부분 미구현 (모달, 폼, 로딩 상태)
  - 반응형 대응 미흡
  - 접근성 속성 부족 (aria-labels, 키보드 네비게이션)

### 우선순위 분포

- **High Priority**: 15개 작업 (색상 시스템, 레이아웃, AI 모달 인프라)
- **Medium Priority**: 18개 작업 (인터랙션 상태, 세부 스타일, 폼 컴포넌트)
- **Low Priority**: 8개 작업 (애니메이션, 미세 조정)

### 구현 완성도 평가

- **컴포넌트 레벨**: 82% (핸들 크기, 색상 토큰 등 미세 조정 필요)
- **페이지 레벨 (기본)**: 85% (초기 노드 생성, 사이드바 토글 필요)
- **페이지 레벨 (인터랙션)**: 75% (시각적 피드백 강화 필요)
- **페이지 레벨 (AI 기능)**: 15% (모달, 폼, 로딩 대부분 미구현)
- **페이지 레벨 (다중 선택)**: 80% (기본 완료, Phase 4 작업 필요)

---

## 🎯 High Priority 작업 (즉시 착수)

### 1. 디자인 토큰 시스템 정립

**파일**: `tailwind.config.ts`
**문제**: Figma의 색상 시스템이 코드에 일관되게 반영되지 않음
**작업**:

```typescript
// Figma 디자인 토큰 기준
colors: {
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  primary: {
    500: '#3B82F6',  // 현재 blue-500과 매칭 확인 필요
  }
}
```

### 2. EditorHeader 레이아웃 수정

**파일**: `src/features/roadmap-editor/components/organisms/EditorHeader/index.tsx`
**문제**:

- 높이 60px (Figma) vs 64px (현재)
- 내부 padding 16px로 통일 필요
- Zoom 컨트롤 오른쪽 간격 24px 필요
  **측정값**:

```
Height: 60px (not 64px)
Padding: 16px horizontal
Logo section: 48px width
Zoom controls: 16px gap between buttons
Right spacing: 24px from edge
```

### 3. EditorToolbar 재구성

**파일**: `src/features/roadmap-editor/components/organisms/EditorToolbar/index.tsx`
**문제**:

- 너비 56px (Figma) vs 64px (현재)
- 아이템 간격 8px로 통일
- Divider 스타일 불일치
  **측정값**:

```
Width: 56px (not 64px)
Item spacing: 8px vertical gap
Divider: 1px height, neutral-200, 8px margin
Border: 1px neutral-200 right edge
```

### 4. Canvas 요소 기본 크기 재조정

**파일**:

- `src/features/roadmap-editor/components/molecules/JagalchiNode/index.tsx`
- `src/features/roadmap-editor/components/molecules/JagalchiSection/index.tsx`

**JagalchiNode**:

```
Default size: 156 × 72px (not current size)
Padding: 12px all sides
Border radius: 8px
Border: 1.5px neutral-300
```

**JagalchiSection**:

```
Min size: 600 × 400px
Title height: 40px
Content padding: 16px
Border: 2px dashed neutral-300
Border radius: 12px
```

### 5. PropertyPanel 통합 레이아웃

**파일**:

- `src/features/roadmap-editor/components/organisms/NodePropertiesPanel/index.tsx`
- `src/features/roadmap-editor/components/organisms/EdgePropertiesPanel/index.tsx`
- `src/features/roadmap-editor/components/organisms/SectionPropertiesPanel/index.tsx`

**공통 측정값**:

```
Width: 320px
Padding: 16px
Section spacing: 20px
Label font: 12px medium, neutral-700
Input height: 36px
Border radius: 6px (inputs)
```

### 6. AI Menu 위치 및 스타일

**파일**: `src/features/roadmap-editor/components/molecules/EditorAiMenu/index.tsx`
**문제**:

- 위치 계산 로직 부재 (노드 하단 12px 간격)
- 그림자 불일치
  **측정값**:

```
Width: 240px (생성), 200px (수정)
Padding: 8px
Item height: 36px
Item padding: 12px horizontal
Gap: 4px between items
Shadow: 0 4px 12px rgba(0,0,0,0.15)
Border radius: 8px
Position: Node bottom + 12px
```

### 7. 반응형 Breakpoint 정의

**파일**: `tailwind.config.ts`
**작업**: Figma의 반응형 변경점 기준으로 설정

```typescript
screens: {
  'tablet': '768px',   // Sidebar collapse
  'desktop': '1024px', // Full layout
  'wide': '1440px',    // Optimal viewing
}
```

### 8. 접근성 기본 속성 추가

**모든 인터랙티브 요소**:

- `aria-label` 추가 (아이콘만 있는 버튼)
- `role` 명시 (toolbar, menu, dialog)
- `aria-expanded`, `aria-selected` 상태 관리
- 키보드 포커스 스타일 명확화 (2px outline, blue-500)

---

## ⚙️ Medium Priority 작업 (1차 완료 후)

### 9. Hover/Active 상태 구현

**모든 버튼/인터랙티브 요소**:

```css
/* Toolbar buttons */
hover: bg-neutral-100
active: bg-neutral-200

/* Property inputs */
hover: border-neutral-400
focus: border-primary-500, ring-2 ring-primary-100

/* AI Menu items */
hover: bg-neutral-50
active: bg-neutral-100
```

### 10. Disabled 상태 스타일

```css
disabled: opacity-40, cursor-not-allowed
disabled text: text-neutral-400
```

### 11. 툴팁 시스템 통일

**파일**: `src/features/roadmap-editor/components/atoms/EditorTooltip/index.tsx` (신규 생성)

```
Background: neutral-900
Text: white, 12px
Padding: 6px 10px
Border radius: 6px
Arrow: 4px
Delay: 500ms
Max width: 200px
```

### 12. Divider 컴포넌트 통일

**파일**: `src/features/roadmap-editor/components/atoms/EditorDivider/index.tsx` (신규 생성)

```typescript
// Horizontal: 1px height, neutral-200, 12px vertical margin
// Vertical: 1px width, neutral-200, 12px horizontal margin
```

### 13. Input 필드 통일

**PropertyPanel 내 모든 입력**:

```
Height: 36px
Padding: 8px 12px
Border: 1px neutral-300
Border radius: 6px
Font: 14px regular
Placeholder: neutral-400
```

### 14. Lock/Unlock 아이콘 상태

**Canvas 요소 (Node, Section, Text)**:

```
Position: Top-right corner, 8px from edges
Size: 16px icon
Background: white with 50% opacity
Hover: 80% opacity
Border radius: 4px
Padding: 4px
```

### 15. Collapse Toggle 애니메이션

**PropertyPanel sections**:

```
Transition: height 200ms ease-in-out
Icon rotation: 180deg, 200ms ease-in-out
```

### 16. 드래그 앤 드롭 피드백

**Canvas 요소**:

```
Dragging: opacity-50, cursor-grabbing
Drop target: border-2 border-primary-500, bg-primary-50
Invalid drop: border-2 border-red-500
```

### 17. Multi-Select 시각적 피드백

```
Selected border: 2px solid primary-500
Selection box: bg-primary-100 with 30% opacity
Count badge: 20px circle, primary-500, white text
```

### 18. Color Picker 스타일

**PropertyPanel color inputs**:

```
Preview: 20px circle, border-2 neutral-300
Picker popover: 240px width, 16px padding
Recent colors: 24px swatches, 8px gap
```

### 19. Dropdown 메뉴 스타일

```
Max height: 240px
Item height: 36px
Item padding: 8px 12px
Scroll: thin scrollbar, neutral-200
Divider: 1px neutral-200, 8px margin
```

### 20. AI Indicator 배지

**AI 생성/수정된 요소**:

```
Position: Top-left corner, -6px offset
Size: 16px circle
Background: gradient from purple to pink
Icon: sparkle, white, 10px
Border: 2px white
```

---

## 🎨 Low Priority 작업 (마지막 단계)

### 21. Zoom 컨트롤 애니메이션

```
Button scale: 0.95 on active
Percentage transition: 150ms ease-out
```

### 22. Context Menu 애니메이션

```
Fade in: 100ms ease-out
Slide down: 8px, 150ms ease-out
```

### 23. Property Panel 전환 애니메이션

```
Fade: 150ms ease-in-out
Content slide: 200ms ease-out
```

### 24. Canvas Pan/Zoom 스무스

```
Wheel zoom: smooth scrolling
Pan inertia: ease-out 300ms
```

### 25. 노드 연결 애니메이션

```
Line draw: 200ms ease-out
Connector highlight: pulse animation
```

### 26. 미세 그림자/하이라이트 조정

```
Header shadow: 0 1px 2px rgba(0,0,0,0.05)
Panel shadow: 0 2px 4px rgba(0,0,0,0.06)
Popover shadow: 0 4px 12px rgba(0,0,0,0.15)
```

---

## 📄 페이지 레벨 분석 (17개 페이지)

### 분석 개요

컴포넌트 분석 완료 후 17개 페이지 상태를 추가 분석하여 전체적인 사용자 플로우와 인터랙션 상태를 파악했습니다.

### 그룹 1: 기본 상태 (2개 페이지)

#### 1.1 기본 페이지 (빈 캔버스)

**Figma**: node-id=4575-3693

**주요 발견사항**:

- 초기 로딩 시 Node_1 자동 생성 (Figma) vs 수동 추가만 가능 (현재)
- 핸들 크기: 6px (Figma) vs 1.5px (현재) - **4배 작음**
- 사이드바 초기 상태: 노드 선택 유지 (Figma) vs 빈 상태 (현재)

**우선순위 작업**:

- 🔴 **High**: 초기 노드 자동 생성 로직 (useEffect에서 defaultNode 생성)
- 🔴 **High**: 핸들 크기 수정 (`!h-[6px] !w-[6px]`)
- 🟡 **Medium**: 사이드바 초기 선택 상태 유지

#### 1.2 노드 많이 생성된 페이지

**Figma**: node-id=4472-1595

**주요 발견사항**:

- 노드 배치 패턴: 수평 266px, 수직 114px 간격
- 색상 사용 규칙: 루트(검정), 기본(흰색), 강조(주황)
- 현재 구현: React Flow의 자동 최적화로 성능 우수 (< 100ms)

**우선순위 작업**:

- 🟡 **Medium**: 노드 자동 정렬 옵션 (Distribute horizontally/vertically)
- 🟢 **Low**: 성능 최적화 (메모이제이션 - getNodeColors)

---

### 그룹 2: 인터랙션 상태 (5개 페이지)

#### 2.1 선 연결

**Figma**: node-id=4480-1254
**현재 완성도**: 70%

**구현 상황**:

- ✅ 4방향 핸들 존재
- ✅ Toolbar 하이라이트
- ⚠️ Phase 2로 표시된 라인 도구
- ❌ 연결 프리뷰 없음

**우선순위 작업**:

- 🔴 **High**: 선 연결 중 시각적 프리뷰 추가
- 🟡 **Medium**: 핸들 hover 상태 피드백

#### 2.2 섹션 생성

**Figma**: node-id=4489-1665
**현재 완성도**: 75%

**구현 상황**:

- ✅ Toolbar 버튼 존재
- ✅ SectionPropertiesPanel 동작
- ❌ 생성 중 프리뷰 (dashed border) 없음

**우선순위 작업**:

- 🔴 **High**: 섹션 생성 중 dashed border 프리뷰
- 🟡 **Medium**: 크기 조정 핸들 (8개 resize handles)

#### 2.3 텍스트 추가 / 2.4 매우 큰 텍스트

**Figma**: node-id=4508-2712 (동일)
**현재 완성도**: 80%

**구현 상황**:

- ✅ TextPropertiesPanel 동작
- ✅ Font size 설정 가능
- ⚠️ 큰 텍스트 overflow 처리 미확인

**우선순위 작업**:

- 🟡 **Medium**: 텍스트 overflow/wrapping 검증
- 🟢 **Low**: Font size min/max 제약 추가

#### 2.5 드롭다운 선택

**Figma**: node-id=4534-13586
**현재 완성도**: 60%

**구현 상황**:

- ✅ EditorAiMenu 존재 (DropdownMenu)
- ⚠️ 위치가 고정 (Toolbar 내)
- ❌ Context menu 시스템 없음

**우선순위 작업**:

- 🔴 **High**: Context menu 위치 계산 (커서/컨텍스트 기준)
- 🟡 **Medium**: Dropdown hover 상태 스타일

---

### 그룹 3: AI 기능 (5개 페이지)

**전체 완성도**: 15% (대부분 미구현)

#### 3.1 노드 자료 추천 받을 때

**Figma**: node-id=4534-13898

**디자인 요구사항**:

- 480px × 400px 모달
- 다크 헤더 (Sparkles 아이콘 + "노드 자료 추천")
- 리소스 카드 리스트 (URL, 링크, 추가 버튼)

**현재 상황**:

- ❌ 모달 컴포넌트 없음
- ❌ 리소스 카드 UI 없음
- ✅ EditorAiMenu에 아이콘만 존재

**우선순위 작업**:

- 🔴 **Critical**: ResourceRecommendationModal 생성
- 🔴 **Critical**: 리소스 카드 컴포넌트
- 🔴 **Critical**: 추천 API 연동

#### 3.2 로드맵 생성 / 3.3 로드맵 생성 중

**Figma**: node-id=4573-2778, node-id=4589-3335

**디자인 요구사항**:

- 탭 인터페이스 ("로드맵 생성" / "로드맵 수정")
- 120px Textarea + "생성" 버튼
- 로딩 상태: 스피너 + "생성중" + opacity 50%

**현재 상황**:

- ❌ 모달 없음
- ❌ 탭 시스템 없음
- ❌ 폼 핸들링 없음
- ❌ 로딩 상태 관리 없음

**우선순위 작업**:

- 🔴 **Critical**: RoadmapAiModal (Dialog wrapper)
- 🔴 **Critical**: 탭 시스템 (Generation vs Modification)
- 🔴 **Critical**: Textarea + 폼 validation
- 🔴 **Critical**: 로딩 버튼 상태 (LoadingButton 컴포넌트)

#### 3.4 로드맵 수정 / 3.5 로드맵 수정 중

**Figma**: node-id=4589-3388, node-id=4577-2684

**디자인 요구사항**:

- 동일한 모달, "로드맵 수정" 탭 활성
- 수정사항 입력 폼
- 로딩 상태: "수정중"

**현재 상황**:

- ❌ 모달 없음 (동일)
- ❌ 수정 폼 없음

**우선순위 작업**:

- 🔴 **Critical**: 생성 모달과 동일 컴포넌트 재사용
- 🔴 **Critical**: 수정 API 연동

**예상 구현 시간** (AI 기능 전체):

- 모달 인프라: 3-4시간
- 폼 컴포넌트: 4-5시간
- 로딩 상태 & UX: 3-4시간
- 리소스 추천: 3-4시간
- **총합**: 18-22시간

---

### 그룹 4: 다중 선택 (5개 페이지)

**전체 완성도**: 80% (기본 완료)

#### 4.1 노드 다중 선택

**Figma**: node-id=4630-4183
**현재 완성도**: 85%

**구현 상황**:

- ✅ MultiSelectPanel 존재 (272px 사이드바)
- ✅ 선택 카운트 표시
- ✅ 6개 정렬 버튼
- ✅ 색상 선택기
- ⚠️ 사이드바 너비: 240px vs Figma 272px

**우선순위 작업**:

- 🟡 **Medium**: 사이드바 너비 통일 (272px)
- 🟢 **Low**: 선택 박스 시각 효과 (투명 배경, 그림자)

#### 4.2 선 다중 선택

**Figma**: node-id=4630-4509
**현재 완성도**: 40%

**구현 상황**:

- ✅ selectedEdgeIdsAtom 존재
- ✅ EdgePropertiesPanel 존재
- ❌ 엣지 다중 선택 패널 없음

**우선순위 작업**:

- 🔴 **High**: EdgePropertiesPanel 확장 (다중 선택 지원)
- 🟡 **Medium**: 엣지 색상/두께 벌크 편집

#### 4.3 섹션 다중 선택 / 4.4 텍스트 다중 선택

**Figma**: node-id=4630-4736, node-id=4630-4963
**현재 완성도**: 80%

**구현 상황**:

- ✅ 기본 다중 선택 동작
- ⚠️ Mixed 상태 표시 개선 필요

**우선순위 작업**:

- 🟡 **Medium**: "Mixed" 텍스트 명시적 표시
- 🟡 **Medium**: 섹션 크기 조정 핸들

#### 4.5 혼합 다중 선택

**Figma**: node-id=4630-5190
**현재 완성도**: 70%

**구현 상황**:

- ✅ 노드 다중 선택 동작
- ❌ 노드 + 엣지 혼합 선택 미지원

**우선순위 작업**:

- 🔴 **High**: 복합 타입 선택 처리 (노드 + 엣지 + 섹션)
- 🟡 **Medium**: 공통 속성만 표시 로직

---

### 페이지 레벨 분석 종합

#### 즉시 구현 필요 (Critical)

1. **AI 모달 인프라** (18-22시간)
   - RoadmapAiModal (Dialog wrapper)
   - ResourceRecommendationModal
   - 탭 시스템, 폼 컴포넌트, 로딩 상태

2. **초기 사용자 경험** (30분)
   - 초기 노드 자동 생성
   - 핸들 크기 수정

3. **엣지 다중 선택** (2-3시간)
   - EdgePropertiesPanel 확장

#### 단기 개선 (High Priority)

4. **인터랙션 프리뷰** (2-3시간)
   - 선 연결 중 프리뷰
   - 섹션 생성 중 dashed border

5. **Context Menu 시스템** (2-3시간)
   - 위치 계산 로직
   - 일반적인 컨텍스트 메뉴 인프라

6. **복합 선택 처리** (2시간)
   - 노드 + 엣지 + 섹션 혼합

#### 장기 개선 (Medium/Low Priority)

7. 노드 자동 정렬
8. 사이드바 토글
9. 사이드바 너비 통일
10. 성능 최적화 (메모이제이션)

---

## 🤖 자동화된 테스트 워크플로우

### Visual Regression Testing

**이미 구축됨**: `scripts/visual-test.ts`

**현재 테스트**:

- editor-full (전체 페이지)
- editor-header (헤더 영역)
- editor-sidebar (사이드바 영역)
- editor-canvas (캔버스 영역)

**추가 필요**:

```typescript
// PropertyPanel variants
{ name: 'property-node', selector: '[data-testid="property-panel"][data-type="node"]' }
{ name: 'property-edge', selector: '[data-testid="property-panel"][data-type="edge"]' }
{ name: 'property-section', selector: '[data-testid="property-panel"][data-type="section"]' }

// AI Menu states
{ name: 'ai-menu-create', selector: '[data-testid="ai-menu"][data-variant="create"]' }
{ name: 'ai-menu-edit', selector: '[data-testid="ai-menu"][data-variant="edit"]' }

// Interactive states
{ name: 'toolbar-hover', selector: 'aside button:hover' }
{ name: 'node-selected', selector: '[data-testid="canvas"] .selected' }
```

**실행 방법**:

```bash
# 개발 서버 백그라운드 실행
pnpm dev > /tmp/jagalchi-dev.log 2>&1 &

# 스크린샷 캡처
pnpm visual-test

# Figma 디자인과 비교 (수동 또는 도구 활용)
# screenshots/editor-full-actual.png vs Figma export
```

### GitHub Actions 통합 (제안)

```yaml
# .github/workflows/visual-regression.yml
name: Visual Regression

on:
  pull_request:
    paths:
      - 'src/features/roadmap-editor/**'

jobs:
  visual-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm dev &
      - run: pnpm visual-test
      - uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: screenshots/
```

---

## 📋 Phase 4 서브 이슈 제안 (최종)

### Epic #89: 에디터 완전 재퍼블리싱

#### Sub-Issue 1: 디자인 시스템 기반 구축

**Label**: `P4: Foundation`, `priority: high`
**Tasks**:

- [ ] Tailwind config에 Figma 디자인 토큰 반영
- [ ] 공통 컴포넌트 (Divider, Tooltip) 생성
- [ ] 접근성 기본 속성 가이드 문서 작성
- [ ] 반응형 breakpoint 정의

**Estimate**: 2-3일
**Dependencies**: 없음

#### Sub-Issue 2: Header & Toolbar 재구현

**Label**: `P4: Layout`, `priority: high`
**Tasks**:

- [ ] EditorHeader 레이아웃 수정 (60px 높이)
- [ ] EditorToolbar 재구성 (56px 너비)
- [ ] ToolbarButton 상태별 스타일
- [ ] Zoom 컨트롤 정확한 간격

**Estimate**: 2일
**Dependencies**: Sub-Issue 1

#### Sub-Issue 3: Canvas 요소 기본 구조

**Label**: `P4: Canvas`, `priority: high`
**Tasks**:

- [ ] JagalchiNode 크기 및 스타일 (156×72px)
- [ ] **핸들 크기 수정 (6px)** ⭐ 5분 작업, 즉시 체감 개선
- [ ] **초기 노드 자동 생성** ⭐ 10분 작업, UX 완성
- [ ] JagalchiSection 레이아웃 (600×400px)
- [ ] JagalchiText 기본 스타일
- [ ] Lock/Unlock 아이콘 추가

**Estimate**: 3일
**Dependencies**: Sub-Issue 1
**Quick Wins**: 핸들 크기, 초기 노드 (15분으로 큰 효과)

#### Sub-Issue 4: Property Panels 통합

**Label**: `P4: Properties`, `priority: high`
**Tasks**:

- [ ] 6개 Panel 공통 레이아웃 (320px)
- [ ] 사이드바 너비 통일 (272px)
- [ ] Input 필드 통일 (36px)
- [ ] Color Picker 스타일
- [ ] Collapse Toggle 구현
- [ ] 사이드바 토글 버튼 추가

**Estimate**: 3-4일
**Dependencies**: Sub-Issue 1

#### Sub-Issue 5: AI Modal Infrastructure ⭐ CRITICAL

**Label**: `P4: AI-Modal`, `priority: critical`
**Tasks**:

- [ ] RoadmapAiModal 컴포넌트 생성 (Dialog wrapper)
- [ ] 모달 헤더 (Sparkles 아이콘 + 제목)
- [ ] 탭 시스템 (로드맵 생성 / 로드맵 수정)
- [ ] 모달 스타일링 (480px × 400px, shadow-xl)
- [ ] Close/Cancel 기능

**Estimate**: 3-4시간
**Dependencies**: Sub-Issue 1
**Impact**: AI 기능 전체의 기반

#### Sub-Issue 6: AI Forms & Loading States ⭐ CRITICAL

**Label**: `P4: AI-Forms`, `priority: critical`
**Tasks**:

- [ ] RoadmapGenerationForm 컴포넌트
- [ ] RoadmapModificationForm 컴포넌트
- [ ] Textarea 컴포넌트 (120px, resizable)
- [ ] LoadingButton 컴포넌트 (스피너 + "생성중"/"수정중")
- [ ] 폼 validation 로직
- [ ] ResourceRecommendationModal 컴포넌트
- [ ] ResourceCard 컴포넌트 (URL, 링크, 추가 버튼)
- [ ] AI API 연동 (생성/수정/추천)

**Estimate**: 8-10시간
**Dependencies**: Sub-Issue 5
**Impact**: AI 기능 완성

#### Sub-Issue 7: 인터랙션 프리뷰 & Context Menu

**Label**: `P4: Interaction`, `priority: high`
**Tasks**:

- [ ] 선 연결 중 시각적 프리뷰
- [ ] 섹션 생성 중 dashed border 프리뷰
- [ ] Context menu 위치 계산 로직 (커서 기준)
- [ ] Context menu 일반 인프라
- [ ] 모든 버튼 hover/active 상태
- [ ] Input focus 스타일
- [ ] Disabled 상태 처리
- [ ] 드래그 앤 드롭 피드백

**Estimate**: 3-4일
**Dependencies**: Sub-Issue 2, 3, 4

#### Sub-Issue 8: 다중 선택 개선

**Label**: `P4: MultiSelect`, `priority: high`
**Tasks**:

- [ ] EdgePropertiesPanel 다중 선택 지원
- [ ] 엣지 색상/두께 벌크 편집
- [ ] 복합 타입 선택 처리 (노드 + 엣지 + 섹션)
- [ ] Mixed 상태 명시적 표시
- [ ] 섹션 크기 조정 핸들 (8개 resize handles)
- [ ] 공백 간격 입력 활성화 (Phase 4)

**Estimate**: 2-3일
**Dependencies**: Sub-Issue 4

#### Sub-Issue 9: 애니메이션 및 마이크로 인터랙션

**Label**: `P4: Animation`, `priority: low`
**Tasks**:

- [ ] Panel collapse 애니메이션
- [ ] Context menu fade-in
- [ ] Canvas pan/zoom 스무스
- [ ] 노드 연결 애니메이션
- [ ] 로딩 스피너 애니메이션

**Estimate**: 2일
**Dependencies**: Sub-Issue 7

#### Sub-Issue 10: Visual Regression Testing 확장

**Label**: `P4: Testing`, `priority: medium`
**Tasks**:

- [ ] 모든 컴포넌트 variant 스크린샷 추가
- [ ] 인터랙티브 상태 캡처 (hover, active, disabled)
- [ ] AI 모달 상태 캡처 (생성, 생성 중, 수정, 수정 중)
- [ ] 다중 선택 상태 캡처 (5가지 타입)
- [ ] GitHub Actions 통합
- [ ] Figma vs Actual 비교 자동화

**Estimate**: 2-3일
**Dependencies**: Sub-Issue 9

---

## 🚀 권장 실행 순서 (4주 계획)

### Week 1: Foundation & Quick Wins (Sub-Issue 1, 2, 3)

**목표**: 기반 구축 + 즉시 체감 개선

**Day 1-2**: Sub-Issue 1 (디자인 시스템)

- Tailwind config 디자인 토큰
- 공통 컴포넌트 생성
- 접근성 가이드

**Day 3-4**: Sub-Issue 2 (Header & Toolbar)

- EditorHeader 60px
- EditorToolbar 56px
- 버튼 상태 스타일

**Day 5**: Sub-Issue 3 - Quick Wins ⚡

- **핸들 크기 수정 (5분)**
- **초기 노드 자동 생성 (10분)**
- JagalchiNode 크기 조정 시작

**Checkpoint**:

- visual-test 실행
- 핸들 크기, 초기 노드 즉시 확인
- Figma 일치도: 70% → 85%

---

### Week 2: Core UI & AI Infrastructure (Sub-Issue 3, 4, 5)

**Day 1-2**: Sub-Issue 3 완료 (Canvas)

- JagalchiSection 레이아웃
- JagalchiText 스타일
- Lock/Unlock 아이콘

**Day 3-4**: Sub-Issue 4 (Property Panels)

- 6개 Panel 통합 레이아웃
- 사이드바 272px 통일
- Color Picker, Input 스타일

**Day 5**: Sub-Issue 5 시작 (AI Modal Infrastructure) ⭐

- RoadmapAiModal 컴포넌트
- 탭 시스템 기본 구조

**Checkpoint**:

- 주요 UI 구조 완료
- AI 모달 껍데기 완성
- Figma 일치도: 85% → 90%

---

### Week 3: AI Features & Interactions (Sub-Issue 5, 6, 7)

**Day 1-2**: Sub-Issue 5, 6 (AI Forms & Loading) ⭐ CRITICAL

- RoadmapGenerationForm
- RoadmapModificationForm
- LoadingButton 컴포넌트
- ResourceRecommendationModal
- AI API 연동

**Day 3-4**: Sub-Issue 7 (인터랙션 프리뷰)

- 선 연결/섹션 생성 프리뷰
- Context menu 시스템
- Hover/Active/Disabled 상태

**Day 5**: Sub-Issue 8 시작 (다중 선택)

- EdgePropertiesPanel 다중 선택

**Checkpoint**:

- AI 기능 완전 동작
- 인터랙션 프리뷰 완성
- Lighthouse 90점 이상
- Figma 일치도: 90% → 95%

---

### Week 4: Polish & Ship (Sub-Issue 8, 9, 10)

**Day 1-2**: Sub-Issue 8 완료 (다중 선택)

- 복합 타입 선택
- Mixed 상태 표시
- 공백 간격 입력

**Day 3**: Sub-Issue 9 (애니메이션)

- Panel collapse
- Context menu fade
- Canvas pan/zoom 스무스

**Day 4-5**: Sub-Issue 10 (Testing)

- 모든 상태 스크린샷 추가
- GitHub Actions 통합
- Figma vs Actual 자동화

**Final Checkpoint**:

- Ship 레벨 검증 통과
- Figma 일치도: 95%+
- Lighthouse: Performance/Accessibility > 90
- 모든 AI 기능 동작

---

### 병렬 작업 가능 구간

**Week 1-2**: 동시 진행 가능

- Person A: Foundation (Sub-Issue 1)
- Person B: Header & Toolbar (Sub-Issue 2)

**Week 2-3**: 동시 진행 가능

- Person A: AI Modal/Forms (Sub-Issue 5, 6)
- Person B: Property Panels (Sub-Issue 4)

**Week 3-4**: 동시 진행 가능

- Person A: 인터랙션 프리뷰 (Sub-Issue 7)
- Person B: 다중 선택 (Sub-Issue 8)

**예상 총 소요 시간**:

- 단독 작업: 4주
- 2인 병렬: 3주
- 3인 병렬: 2.5주

---

## 📊 메트릭 및 성공 기준

### 코드 품질

- [ ] ESLint 오류 0개
- [ ] TypeScript strict mode 통과
- [ ] 모든 컴포넌트 Storybook 문서화

### 성능

- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB (gzipped)

### 접근성

- [ ] Lighthouse Accessibility > 95
- [ ] 키보드 네비게이션 100% 지원
- [ ] 색상 대비 WCAG AA 통과
- [ ] Screen reader 테스트 통과

### 디자인 일치도

- [ ] Visual regression 오차 < 2px
- [ ] 색상 정확도 100%
- [ ] 레이아웃 측정값 오차 < 1px
- [ ] 모든 인터랙션 상태 구현

### 테스트

- [ ] Unit test 커버리지 > 80%
- [ ] E2E 테스트 주요 시나리오 커버
- [ ] Visual regression 자동화

---

## 🎯 다음 단계

1. **Epic #89에 10개 Sub-Issue 생성** - 위의 구조 그대로 활용
2. **Quick Wins 먼저 실행** ⚡ (15분)
   - 핸들 크기 수정 → 즉시 체감 개선
   - 초기 노드 자동 생성 → UX 완성
3. **Sub-Issue 1 착수** - 디자인 시스템 기반 구축
4. **매 Sub-Issue 완료 시 visual-test 실행** - 진행 상황 추적
5. **Week 단위 Checkpoint PR** - 점진적 머지 전략

**예상 총 소요 시간**:

- 단독 작업: 4주
- 2인 병렬: 3주
- 3인 병렬: 2.5주

**Critical Path**: Sub-Issue 5, 6 (AI 기능) - 18-22시간 소요 예상

---

## 📝 Notes

### 자동화 워크플로우 활용

```bash
# 개발 시작
pnpm dev > /tmp/jagalchi-dev.log 2>&1 &

# 변경 후 즉시 스크린샷 비교
pnpm visual-test

# Figma와 비교 (수동)
open screenshots/
# Figma 디자인과 나란히 비교
```

### Git 전략

- **Branch**: `feature/P4-재퍼블리싱-<sub-issue-번호>-<간략설명>`
- **Commit**: Atomic commits (하나의 컴포넌트 = 하나의 커밋)
- **PR**: Sub-Issue 단위로 생성, Checkpoint마다 develop 머지

### 협업 포인트

- Figma 디자인 변경 시 즉시 노티 필요
- 새로운 상태/variant 추가 시 visual-test 업데이트
- 성능 이슈 발견 시 즉시 공유

---

**작성자**: Claude Sonnet 4.5 (Sisyphus Multi-Agent System)
**분석 도구**: 8 Parallel Explore Agents (2회 실행) + Figma MCP + Playwright Visual Testing
**분석 범위**:

- 1차: 16개 컴포넌트 (Header, Toolbar, Sidebar, Canvas, AI Menu)
- 2차: 17개 페이지 상태 (기본, 인터랙션, AI 기능, 다중 선택)
  **최종 업데이트**: 2026-01-23
  **총 분석 시간**: ~2시간 (병렬 실행)
