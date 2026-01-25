# 코드 리뷰: Sidebar CSS vs Figma 비교

**작성일**: 2026-01-26
**목적**: EditorResource, CollapseSection 구현과 Figma 디자인 간 CSS 차이점 분석

---

## 📋 요약

### ✅ 잘된 점

- EditorResource max-width 수정 완료 (400px)
- 기본 레이아웃 구조 (flex, gap, padding) 대부분 일치
- Hover 상태 정확히 구현 (#f1f5f9)
- 접근성 고려 (aria-label, button type)

### ⚠️ 개선 필요

1. **Typography**: Letter spacing 누락 (0.07px → 0.5px)
2. **CollapseSection**: Figma에 없는 toggle 기능 추가됨
3. **미세한 색상 차이**: text-black vs text-slate-900
4. **Line height**: Figma 명시값 vs Tailwind 기본값

---

## 🔍 1. EditorResource 상세 비교

### Figma 디자인 (Node: 4630:4112)

```tsx
// Default state
<div className="content-stretch flex gap-[8px] items-center max-w-[400px] p-[4px] relative rounded-[var(--semantic/rounded-sm,4px)]">
  <p className="font-medium leading-[var(--paragraph/small/line-height,21px)] overflow-hidden text-[14px] text-black text-ellipsis tracking-[0.07px]">
    ResourceSite.com/Resource1
  </p>
  <ArrowUpRight className="size-[16px]" />
</div>

// Hover state
<div className="bg-[var(--general/accent,#f1f5f9)] content-stretch flex gap-[8px] items-center max-w-[400px] p-[4px] relative rounded-[var(--semantic/rounded-sm,4px)]">
  ...
</div>
```

### 현재 구현

```tsx
// src/features/roadmap-editor/components/molecules/EditorResource/index.tsx:54-66
<button
  type="button"
  onClick={handleClick}
  className={cn(
    'flex items-center gap-2 rounded-sm p-1',
    'max-w-[400px]',
    'transition-colors hover:bg-slate-100',
    className,
  )}
  aria-label={`자료 열기: ${title}`}
>
  <p className="flex-1 overflow-hidden text-left text-sm font-medium text-ellipsis whitespace-nowrap text-slate-900">
    {title}
  </p>
  <ArrowUpRight className="size-4 shrink-0 text-slate-600" />
</button>
```

### 차이점 분석

| 항목                  | Figma             | 구현                           | 상태         | 노트                      |
| --------------------- | ----------------- | ------------------------------ | ------------ | ------------------------- |
| **Element**           | `<div>`           | `<button>`                     | ✅ 의도적    | 클릭 가능해야 함          |
| **gap**               | `8px`             | `gap-2` (8px)                  | ✅ 일치      |                           |
| **padding**           | `4px`             | `p-1` (4px)                    | ✅ 일치      |                           |
| **border-radius**     | `4px`             | `rounded-sm` (4px)             | ✅ 일치      |                           |
| **max-width**         | `400px`           | `max-w-[400px]`                | ✅ 수정됨    | 방금 수정                 |
| **Text size**         | `14px`            | `text-sm` (14px)               | ✅ 일치      |                           |
| **Font weight**       | `font-medium`     | `font-medium`                  | ✅ 일치      |                           |
| **Text overflow**     | `text-ellipsis`   | `text-ellipsis`                | ✅ 일치      |                           |
| **overflow-hidden**   | `overflow-hidden` | `overflow-hidden`              | ✅ 일치      |                           |
| **Hover bg**          | `#f1f5f9`         | `hover:bg-slate-100` (#f1f5f9) | ✅ 일치      |                           |
| **Icon size**         | `16px`            | `size-4` (16px)                | ✅ 일치      |                           |
| **Text color**        | `text-black`      | `text-slate-900`               | ⚠️ 미세 차이 | #000 vs #0f172a           |
| **Line height**       | `21px`            | Tailwind 기본                  | ⚠️ 명시 필요 | `leading-[21px]` 추가?    |
| **Letter spacing**    | `0.07px`          | 없음                           | ⚠️ 누락      | `tracking-[0.07px]` 추가? |
| **Icon color**        | 명시 없음         | `text-slate-600`               | ℹ️ 추론      | Figma 아이콘 색상 추론됨  |
| **flex-1**            | 없음              | `flex-1`                       | ✅ UX 개선   | 텍스트가 공간 차지        |
| **shrink-0**          | 없음              | `shrink-0`                     | ✅ UX 개선   | 아이콘 크기 유지          |
| **whitespace-nowrap** | 없음              | `whitespace-nowrap`            | ✅ UX 개선   | 한 줄 유지                |
| **text-left**         | 없음              | `text-left`                    | ✅ UX 개선   | 텍스트 정렬               |
| **transition-colors** | 없음              | `transition-colors`            | ✅ UX 개선   | 호버 애니메이션           |

### 권장 수정사항

#### Option 1: Figma 정확히 따르기 (Pixel Perfect)

```tsx
// src/features/roadmap-editor/components/molecules/EditorResource/index.tsx
<p className="flex-1 overflow-hidden text-left text-sm leading-[21px] font-medium tracking-[0.07px] text-ellipsis whitespace-nowrap text-black">
  {title}
</p>
```

**변경**:

- `text-slate-900` → `text-black`
- `leading-[21px]` 추가
- `tracking-[0.07px]` 추가

#### Option 2: UX 개선 유지 (권장)

현재 구현 유지. 이유:

1. **button 요소**: 접근성 향상 (키보드 네비게이션)
2. **transition-colors**: 부드러운 호버 효과
3. **flex-1, shrink-0**: 반응형 레이아웃
4. **text-slate-900**: 디자인 시스템 일관성 (Tailwind 기본 팔레트)

**미세 조정만**:

```tsx
<p className="flex-1 overflow-hidden text-left text-sm leading-[21px] font-medium tracking-[0.07px] text-ellipsis whitespace-nowrap text-slate-900">
  {title}
</p>
```

---

## 🔍 2. CollapseSection vs Figma

### Figma 디자인 (Node: 4534:12922 "첨부 자료" 섹션)

```tsx
// Figma에는 단순한 섹션 제목만 있음
<div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[var(--absolute/1,5,6px)]">
  <p className="css-4hzbpn text-[14px] leading-[21px] font-medium tracking-[0.07px]">첨부 자료</p>
  {/* 자료 목록 (Input fields) */}
</div>
```

**특징**:

- **접기/펼치기 없음**
- **Chevron 아이콘 없음**
- 단순한 `<p>` 태그 제목
- 항상 펼쳐진 상태

### 현재 구현

```tsx
// src/features/roadmap-editor/components/molecules/CollapseSection/index.tsx:44-62
<div className={cn('flex flex-col', className)}>
  {/* Header */}
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-2 py-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-700"
    aria-expanded={isOpen}
    aria-label={isOpen ? `${title} 섹션 접기` : `${title} 섹션 펼치기`}
  >
    {isOpen ? (
      <ChevronDown className="size-4 shrink-0 text-slate-600" />
    ) : (
      <ChevronRight className="size-4 shrink-0 text-slate-600" />
    )}
    <span>{title}</span>
  </button>

  {/* Content */}
  {isOpen && <div className="flex flex-col gap-3 pt-2">{children}</div>}
</div>
```

### 차이점

| 항목               | Figma         | 구현                    | 상태      |
| ------------------ | ------------- | ----------------------- | --------- |
| **Element**        | `<p>`         | `<button>`              | ❌ 다름   |
| **Toggle 기능**    | 없음          | 있음                    | ❌ 추가됨 |
| **Chevron 아이콘** | 없음          | 있음                    | ❌ 추가됨 |
| **State 관리**     | 없음          | `useState(defaultOpen)` | ❌ 추가됨 |
| **font-size**      | `14px`        | `text-sm` (14px)        | ✅ 일치   |
| **font-weight**    | `font-medium` | `font-medium`           | ✅ 일치   |
| **Text color**     | Figma 변수    | `text-slate-900`        | ✅ 유사   |

### 판단 필요

**Question**: CollapseSection의 toggle 기능을 유지할 것인가?

#### Option A: Figma 따르기 - Toggle 제거

```tsx
// CollapseSection을 단순한 섹션 헤더로 변경
export const CollapseSection = memo(function CollapseSection({
  title,
  children,
  className,
}: CollapseSectionProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p className="text-sm leading-[21px] font-medium tracking-[0.07px] text-slate-900">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
});
```

**장점**:

- Figma 디자인 정확히 일치
- 코드 단순화
- 불필요한 상태 관리 제거

**단점**:

- UX 저하 (긴 자료 목록 시 스크롤 필요)
- 사용자 제어권 감소

#### Option B: Toggle 유지 - UX 개선

현재 구현 유지

**장점**:

- 긴 자료 목록 시 UI 간결하게 유지
- 사용자가 필요한 섹션만 펼침
- 모던 UI 패턴 (Accordion)

**단점**:

- Figma와 불일치
- 추가 코드 복잡도

#### Option C: Figma에 Toggle 디자인 추가 요청

디자이너와 협의:

1. 현재 구현 (toggle 기능) 설명
2. UX 개선 효과 제시
3. Figma에 Chevron 아이콘 추가 요청

---

## 🔍 3. EditorNodeSidebar 전체 구조

### Figma 디자인 (Node: 4472:1567)

```tsx
<div className="relative flex h-[900px] w-[240px] shrink-0 flex-col content-stretch items-start border-l border-[#e2e8f0] bg-white">
  {/* Section 1: 노드 정보 */}
  <div className="relative flex w-full shrink-0 content-stretch items-center gap-[16px] border-b border-[#e2e8f0] p-[16px]">
    ...
  </div>

  {/* Section 2: 노드 이름/설명 */}
  <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[16px] border-b border-[#e2e8f0] p-[16px]">
    ...
  </div>

  {/* Section 3: 기본 컬러 */}
  <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[16px] border-b border-[#e2e8f0] p-[16px]">
    ...
  </div>

  {/* Section 4: 첨부 자료 */}
  <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[0px] border-b border-[#e2e8f0] p-[16px]">
    ...
  </div>
</div>
```

### 주요 CSS 변수

| 항목                | Figma 값           | 설명        |
| ------------------- | ------------------ | ----------- |
| **Sidebar width**   | `240px`            | 고정 너비   |
| **Sidebar height**  | `900px`            | 예시 높이   |
| **Background**      | `white`            |             |
| **Border left**     | `#e2e8f0`          | slate-200   |
| **Section padding** | `16px`             | semantic/md |
| **Section border**  | `border-b #e2e8f0` |             |
| **Section gap**     | `16px`             | semantic/md |

### Typography 토큰

| 용도             | Font Size | Weight         | Line Height | Letter Spacing |
| ---------------- | --------- | -------------- | ----------- | -------------- |
| **섹션 제목**    | 14px      | medium (500)   | 21px        | 0.07px         |
| **노드 제목**    | 16px      | semibold (600) | 24px        | 0px            |
| **노드 타입**    | 12px      | regular (400)  | 16px        | 0.18px         |
| **Input 텍스트** | 14px      | regular (400)  | 21px        | 0.07px         |
| **Placeholder**  | 14px      | regular (400)  | 21px        | 0.07px         |

### Input 필드 스타일

```tsx
className="
  bg-white
  border border-[#e2e8f0]
  min-h-[36px]
  px-[12px] py-[7.5px]
  rounded-[8px]
  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
"
```

---

## 🐛 발견된 문제점 & 수정 계획

### 1. EditorResource Letter Spacing 누락

**현재**:

```tsx
<p className="... text-slate-900">
```

**수정**:

```tsx
<p className="... text-slate-900 tracking-[0.07px]">
```

**파일**: `src/features/roadmap-editor/components/molecules/EditorResource/index.tsx:62`

---

### 2. EditorResource Line Height 명시

**현재**:

```tsx
<p className="... text-sm font-medium">
```

**수정**:

```tsx
<p className="... text-sm font-medium leading-[21px]">
```

**파일**: `src/features/roadmap-editor/components/molecules/EditorResource/index.tsx:62`

---

### 3. CollapseSection Toggle 기능 판단 필요

**현재 상태**: Toggle 기능 있음 (Figma에는 없음)

**옵션**:

- [ ] A: Toggle 제거 (Figma 따르기)
- [ ] B: Toggle 유지 (UX 개선)
- [ ] C: Figma에 디자인 추가 요청

**결정 필요**: 사용자 또는 디자이너와 협의

---

### 4. CollapseSection Typography 업데이트

**현재**:

```tsx
<span>{title}</span>
```

**수정** (Option B 선택 시):

```tsx
<span className="leading-[21px] tracking-[0.07px]">{title}</span>
```

**파일**: `src/features/roadmap-editor/components/molecules/CollapseSection/index.tsx:58`

---

## 📊 수정 우선순위

### High Priority (즉시 수정)

1. **EditorResource tracking-[0.07px]** - Typography 일관성
2. **EditorResource leading-[21px]** - Typography 일관성

### Medium Priority (판단 후 수정)

3. **CollapseSection toggle 기능** - 디자이너/사용자 결정 필요

### Low Priority (선택 사항)

4. **text-slate-900 vs text-black** - 디자인 시스템 일관성 고려

---

## ✅ 수정 후 체크리스트

- [ ] EditorResource tracking-[0.07px] 추가
- [ ] EditorResource leading-[21px] 추가
- [ ] CollapseSection 방향 결정 (Toggle 유지 or 제거)
- [ ] CollapseSection typography 업데이트 (결정에 따라)
- [ ] Storybook 확인
- [ ] pnpm lint 통과
- [ ] pnpm build 성공
- [ ] 커밋 & PR 업데이트

---

## 🎯 다음 단계

1. **즉시 수정**: EditorResource typography (tracking, leading)
2. **사용자 확인**: CollapseSection toggle 기능 유지 여부
3. **Phase 1A 완료**: EditorCheckbox, EditorTooltip 작업
4. **Phase 1B 완료 후 PR 머지**
5. **Phase 2 진행**: Property Panels (organisms)

---

## 📝 참고 문서

- Epic Plan: `.sisyphus/plans/editor-redesign-epic.md`
- Figma 수동 점검 가이드: `.sisyphus/manual-figma-check-guide.md`
- Figma Component Mapping: `scripts/figma-component-mapping.json`
