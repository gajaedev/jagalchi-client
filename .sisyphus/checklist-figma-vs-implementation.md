# Figma vs Implementation 체크리스트

**작성일**: 2026-01-26
**목적**: Storybook에서 확인한 구현과 Figma 디자인 간 차이점 분석

---

## 1. EditorResource

### Figma 디자인 (Node: 4630:4112)

**스크린샷**:

- Default 상태: 배경 없음
- Hover 상태: 연한 회색 배경 (`#f1f5f9` = slate-100)

**스타일**:

- `gap`: 8px ✅
- `padding`: 4px ✅
- `max-width`: **400px** ⚠️
- `border-radius`: 4px (rounded-sm) ✅
- `font-size`: 14px (text-sm) ✅
- `font-weight`: 500 (medium) ✅
- `text-ellipsis`: 적용 ✅
- `hover:background`: `#f1f5f9` (slate-100) ✅

### 현재 구현 (`src/features/roadmap-editor/components/molecules/EditorResource/index.tsx`)

```typescript
<button
  className={cn(
    'flex items-center gap-2 rounded-sm p-1',
    'max-w-full',  // ⚠️ Figma는 max-w-[400px]
    'transition-colors hover:bg-slate-100',
    className,
  )}
>
  <p className="flex-1 overflow-hidden text-left text-sm font-medium text-ellipsis whitespace-nowrap text-slate-900">
    {title}
  </p>
  <ArrowUpRight className="size-4 shrink-0 text-slate-600" />
</button>
```

### 🔴 차이점

| 항목      | Figma         | 구현          | 상태      |
| --------- | ------------- | ------------- | --------- |
| max-width | `400px`       | `full`        | ❌ 불일치 |
| gap       | `8px` (gap-2) | `8px` (gap-2) | ✅ 일치   |
| padding   | `4px` (p-1)   | `4px` (p-1)   | ✅ 일치   |
| hover bg  | `#f1f5f9`     | `slate-100`   | ✅ 일치   |

**권장 수정**:

```typescript
- 'max-w-full',
+ 'max-w-[400px]',
```

---

## 2. CollapseSection

### Figma 디자인 (Node: 4472:1567 - EditorNodeSidebar)

**관찰 결과**:

- Figma에서는 "첨부 자료" 섹션이 **접기/펼치기 기능 없이 항상 열려있음**
- 섹션 제목이 있지만, ChevronDown/ChevronRight 아이콘이 **없음**
- 단순히 `<p>` 태그로 섹션 제목 표시

**스타일**:

- 섹션 제목: `text-sm font-medium text-slate-900`
- 간격: `gap-1.5` (6px)

### 현재 구현 (`src/features/roadmap-editor/components/molecules/CollapseSection/index.tsx`)

```typescript
<div className="flex flex-col">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-2 py-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-700"
    aria-expanded={isOpen}
  >
    {isOpen ? (
      <ChevronDown className="size-4 shrink-0 text-slate-600" />
    ) : (
      <ChevronRight className="size-4 shrink-0 text-slate-600" />
    )}
    <span>{title}</span>
  </button>
  {isOpen && <div className="flex flex-col gap-3 pt-2">{children}</div>}
</div>
```

### 🟡 차이점

| 항목             | Figma   | 구현    | 상태         |
| ---------------- | ------- | ------- | ------------ |
| 접기/펼치기 기능 | ❌ 없음 | ✅ 있음 | ⚠️ 추가 기능 |
| Chevron 아이콘   | ❌ 없음 | ✅ 있음 | ⚠️ 추가 기능 |
| 클릭 가능 버튼   | ❌ 없음 | ✅ 있음 | ⚠️ 추가 기능 |

**판단 필요**:

- Figma에는 접기/펼치기 기능이 **설계되지 않음**
- 하지만 구현에서는 **UX 개선을 위해 추가**한 것으로 보임
- 이것이 의도된 것인지, Figma와 일치해야 하는지 확인 필요

**옵션 1 - Figma 따르기**:

```typescript
// 접기/펼치기 없는 버전
export const SectionHeader = ({ title, children }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-sm font-medium text-slate-900">{title}</p>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);
```

**옵션 2 - 현재 구현 유지**:

- CollapseSection을 선택적 기능으로 사용 (필요한 곳에만 적용)

---

## 3. ContextMenu

### Figma 디자인

**상태**: Figma에서 ContextMenu 노드를 찾지 못함

**가능성**:

1. ContextMenu가 Figma에 설계되지 않음
2. 다른 페이지나 프레임에 있음
3. 컴포넌트 이름이 다를 수 있음

### 현재 구현 (`src/features/roadmap-editor/components/molecules/ContextMenu/index.tsx`)

```typescript
<div
  className={cn(
    'fixed z-50 min-w-[180px] rounded-lg border border-slate-200 bg-white p-1 shadow-md',
    className,
  )}
  style={{ left: `${x}px`, top: `${y}px` }}
  role="menu"
>
  {/* 메뉴 항목들 */}
</div>
```

**스타일**:

- `min-width`: 180px
- `border-radius`: 8px (rounded-lg)
- `border`: slate-200
- `shadow`: md
- `padding`: 4px (p-1)

### 🔵 차이점

| 항목      | Figma     | 구현    | 상태         |
| --------- | --------- | ------- | ------------ |
| 존재 여부 | ❓ 미확인 | ✅ 있음 | ⚠️ 확인 필요 |

**확인 필요**:

- Figma에 ContextMenu 디자인이 있는지 확인
- 없다면, 일반적인 디자인 시스템 패턴 따름

---

## 요약

### 🔴 즉시 수정 필요

1. **EditorResource**: `max-w-full` → `max-w-[400px]`

### 🟡 판단 필요

1. **CollapseSection**: Figma에는 접기/펼치기 기능이 없음. 현재 구현 유지할지, 제거할지 결정 필요.

### 🔵 확인 필요

1. **ContextMenu**: Figma 디자인 존재 여부 확인

---

## 다음 단계

1. 사용자에게 "무엇이 이상했는지" 구체적으로 확인
2. CollapseSection 사용 여부 결정 (Figma에 없는 기능)
3. ContextMenu Figma 디자인 확인
4. EditorResource max-width 수정 적용
