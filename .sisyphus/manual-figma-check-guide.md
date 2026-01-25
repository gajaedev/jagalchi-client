# 수동 Figma 점검 가이드

**작성일**: 2026-01-26
**목적**: 구현한 컴포넌트를 Figma 디자인과 직접 비교 점검

---

## 📋 점검 대상 컴포넌트

### 1. EditorResource ✅ (완료)

**파일 위치**:

- 구현: `src/features/roadmap-editor/components/molecules/EditorResource/index.tsx`
- 테스트: `src/features/roadmap-editor/components/molecules/EditorResource/EditorResource.test.tsx`
- 스토리: `src/features/roadmap-editor/components/molecules/EditorResource/EditorResource.stories.tsx`

**Storybook 확인**:

```
http://localhost:6006
→ Features/RoadmapEditor/Molecules/EditorResource
```

**Figma 디자인**:

- Node ID: `4630:4112`
- Export된 이미지: `visual-tests/figma/ResourcePropertiesPanel-Default.png`
- Export된 이미지: `visual-tests/figma/ResourcePropertiesPanel-Hover.png`

**스토리 5개**:

1. Default
2. Short
3. LongTitle
4. CustomClick
5. Multiple

---

### 2. CollapseSection ✅ (완료, 하지만 Figma에 없음)

**파일 위치**:

- 구현: `src/features/roadmap-editor/components/molecules/CollapseSection/index.tsx`
- 테스트: `src/features/roadmap-editor/components/molecules/CollapseSection/CollapseSection.test.tsx`
- 스토리: `src/features/roadmap-editor/components/molecules/CollapseSection/CollapseSection.stories.tsx`

**Storybook 확인**:

```
http://localhost:6006
→ Features/RoadmapEditor/Molecules/CollapseSection
```

**Figma 디자인**:

- ⚠️ **Figma에 접기/펼치기 기능 없음**
- EditorNodeSidebar (4472:1567) 내부의 "첨부 자료" 섹션 참고
- 단순한 섹션 제목만 있고, Chevron 아이콘이나 클릭 기능은 없음

**스토리 4개**:

1. Default (펼쳐진 상태)
2. Closed (접힌 상태)
3. WithResources
4. LongContent

---

### 3. ContextMenu ❌ (삭제됨)

- Figma 디자인 없음
- 구현 완전히 제거됨 (커밋 84a0d9d)
- 나중에 Figma에 디자인 추가되면 다시 구현 예정

---

## 🔍 점검 체크리스트

### EditorResource

#### 1. Default 상태 (Default Story)

**Figma 기준** (`ResourcePropertiesPanel-Default.png`):

- [ ] gap: 8px (gap-2)
- [ ] padding: 4px (p-1)
- [ ] max-width: **400px** ⚠️ (현재 구현: `max-w-full`)
- [ ] border-radius: 4px (rounded-sm)
- [ ] font-size: 14px (text-sm)
- [ ] font-weight: 500 (medium)
- [ ] text-ellipsis: 긴 텍스트 말줄임 적용
- [ ] 배경색: 없음 (투명)
- [ ] ArrowUpRight 아이콘: 16px (size-4), slate-600

**이미지 비교**:

```bash
# Figma 이미지
open visual-tests/figma/ResourcePropertiesPanel-Default.png

# Storybook
http://localhost:6006/?path=/story/features-roadmapeditor-molecules-editorresource--default
```

#### 2. Hover 상태 (Storybook에는 없음, Figma에는 있음)

**Figma 기준** (`ResourcePropertiesPanel-Hover.png`):

- [ ] hover:bg-slate-100 (#f1f5f9) ✅
- [ ] 다른 스타일은 Default와 동일

**현재 구현**:

- ✅ `hover:bg-slate-100` 적용됨
- ⚠️ Storybook에 Hover 스토리 없음 (CSS만 있음)

---

### CollapseSection

#### Figma와의 차이점

**Figma** (EditorNodeSidebar 4472:1567 "첨부 자료" 섹션):

```tsx
// Figma 디자인 (접기/펼치기 없음)
<div className="flex flex-col gap-1.5">
  <p className="text-sm font-medium text-slate-900">첨부 자료</p>
  <div className="flex flex-col gap-3">{/* 자료 목록 */}</div>
</div>
```

**현재 구현** (접기/펼치기 추가):

```tsx
// 우리 구현 (접기/펼치기 있음)
<button onClick={toggleOpen}>
  {isOpen ? <ChevronDown /> : <ChevronRight />}
  <span>첨부 자료</span>
</button>;
{
  isOpen && <div>{children}</div>;
}
```

**판단 필요**:

- [ ] **접기/펼치기 기능을 유지할 것인가?** (UX 개선)
- [ ] **Figma 디자인을 따를 것인가?** (단순 섹션 제목)

---

## 🐛 발견된 문제점

### EditorResource

#### ❌ 1. max-width 불일치

**Figma**: `max-width: 400px`
**구현**: `max-w-full`

**수정 필요**:

```tsx
// 현재
'max-w-full',

// 수정 후
'max-w-[400px]',
```

**파일**: `src/features/roadmap-editor/components/molecules/EditorResource/index.tsx:38`

---

#### ⚠️ 2. Hover 스토리 누락

**Figma**: Hover 상태 variant 있음
**Storybook**: Hover 스토리 없음 (CSS만 있음)

**수정 옵션**:

- 옵션 1: Hover 스토리 추가 (Chromatic 스크린샷용)
- 옵션 2: 그냥 CSS만 있어도 됨 (사용자가 테스트 가능)

---

### CollapseSection

#### ⚠️ 3. Figma에 없는 기능 추가됨

**Figma**: 접기/펼치기 기능 없음 (단순 섹션 제목)
**구현**: ChevronDown/Right 아이콘, toggle 기능 추가

**판단 필요**:

- UX 개선을 위해 추가한 건지?
- Figma 디자인을 따라야 하는지?

---

## 📊 비교 방법

### 방법 1: 직접 시각 비교

1. **Figma 이미지 열기**:

   ```bash
   open visual-tests/figma/ResourcePropertiesPanel-Default.png
   ```

2. **Storybook 열기**:

   ```
   http://localhost:6006/?path=/story/features-roadmapeditor-molecules-editorresource--default
   ```

3. **나란히 놓고 비교**:
   - 간격 (gap, padding)
   - 색상 (text, background, icon)
   - 크기 (width, height, font-size)
   - 정렬 (alignment)
   - 말줄임 (ellipsis)

---

### 방법 2: 브라우저 DevTools 측정

1. Storybook에서 F12 (DevTools)
2. Elements 탭에서 컴포넌트 선택
3. Computed 탭에서 실제 스타일 확인:
   - `max-width`
   - `gap`
   - `padding`
   - `font-size`
   - `background-color` (hover 시)

---

### 방법 3: Figma MCP로 디자인 코드 확인

```bash
# Figma MCP를 사용해서 디자인 코드 가져오기
mcp__figma-desktop__get_design_context({
  nodeId: "4630:4111"  # Default 상태
})

mcp__figma-desktop__get_design_context({
  nodeId: "4630:4113"  # Hover 상태
})
```

---

## ✅ 수정 후 확인 사항

1. **EditorResource max-width 수정**:
   - [ ] `max-w-full` → `max-w-[400px]` 변경
   - [ ] Storybook 확인
   - [ ] Lint & Build 통과
   - [ ] 커밋 & 푸시

2. **CollapseSection 판단**:
   - [ ] 접기/펼치기 기능 유지 or 제거 결정
   - [ ] 결정 사항 `.sisyphus/plans/editor-redesign-epic.md`에 기록

3. **Hover 스토리 추가** (선택):
   - [ ] EditorResource에 Hover 스토리 추가
   - [ ] Chromatic 스크린샷 확인

---

## 🎯 다음 단계

점검 완료 후:

1. **발견한 문제 수정**
2. **남은 Phase 1A atoms 작업**:
   - [ ] EditorCheckbox
   - [ ] EditorTooltip
3. **Phase 1B 완료 후 PR 머지**
4. **Phase 2로 진행** (Property Panels)

---

## 📝 참고 문서

- Epic Plan: `.sisyphus/plans/editor-redesign-epic.md`
- Figma 비교 체크리스트: `.sisyphus/checklist-figma-vs-implementation.md`
- Figma Component Mapping: `scripts/figma-component-mapping.json`
- Figma Components (자동 동기화): `scripts/figma-components.json`
