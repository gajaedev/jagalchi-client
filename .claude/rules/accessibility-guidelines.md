# Accessibility Guidelines

## 목표

Jagalchi 로드맵 에디터는 모든 사용자가 접근 가능하도록 WCAG 2.1 AA 기준을 준수합니다.

---

## 1. 키보드 접근성

### 필수 요구사항

- [ ] **Tab 네비게이션**: 모든 인터랙티브 요소는 Tab 키로 접근 가능해야 함
- [ ] **포커스 표시**: 포커스된 요소는 명확한 시각적 표시가 있어야 함
- [ ] **Enter/Space 동작**: 버튼은 Enter 또는 Space로 활성화되어야 함
- [ ] **Escape 닫기**: 모달, 드롭다운 등은 Escape 키로 닫혀야 함

### 구현 예시

```tsx
// ✅ Good - Tab으로 접근 가능한 버튼
<button onClick={handleClick} aria-label="노드 추가">
  <PlusIcon />
</button>

// ❌ Bad - div는 기본적으로 포커스 불가
<div onClick={handleClick}>
  <PlusIcon />
</div>

// ✅ Good - div를 사용해야 한다면 role과 tabIndex 추가
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
  <PlusIcon />
</div>
```

---

## 2. ARIA 속성

### 필수 ARIA 속성

| 요소               | 필수 속성                     | 예시                                    |
| ------------------ | ----------------------------- | --------------------------------------- |
| 버튼 (아이콘 전용) | `aria-label`                  | `<button aria-label="삭제">`            |
| 툴팁               | `role="tooltip"`              | `<div role="tooltip">`                  |
| 모달               | `role="dialog"`, `aria-modal` | `<div role="dialog" aria-modal="true">` |
| 토글 버튼          | `aria-pressed`                | `<button aria-pressed={isActive}>`      |
| 확장/축소          | `aria-expanded`               | `<button aria-expanded={isOpen}>`       |

### 구현 예시

```tsx
// EditorDivider - Separator
<div role="separator" aria-orientation="horizontal" aria-label="섹션 구분선" />

// EditorTooltip - Tooltip with aria-describedby
<button aria-describedby={tooltipId}>Hover me</button>
<div id={tooltipId} role="tooltip">Tooltip content</div>

// Modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
</div>
```

---

## 3. 색상 대비

### WCAG AA 기준

- **일반 텍스트**: 최소 4.5:1 대비
- **큰 텍스트 (18pt+)**: 최소 3:1 대비
- **UI 컴포넌트**: 최소 3:1 대비

### Figma 디자인 토큰 대비 검증

| 조합                     | 대비율 | 통과 여부               |
| ------------------------ | ------ | ----------------------- |
| neutral-900 on neutral-0 | 16:1   | ✅ Pass                 |
| neutral-700 on neutral-0 | 8:1    | ✅ Pass                 |
| neutral-0 on neutral-900 | 16:1   | ✅ Pass                 |
| primary-500 on neutral-0 | 4.6:1  | ✅ Pass                 |
| neutral-200 on neutral-0 | 1.3:1  | ❌ Fail (장식용만 사용) |

### 구현 예시

```tsx
// ✅ Good - 충분한 대비
<p className="text-neutral-900 bg-neutral-0">읽기 쉬운 텍스트</p>

// ⚠️ Caution - neutral-200는 장식용으로만 (divider, border)
<div className="border-neutral-200" />

// ❌ Bad - 낮은 대비 (텍스트에 사용 금지)
<p className="text-neutral-200 bg-neutral-0">읽기 어려운 텍스트</p>
```

---

## 4. 포커스 관리

### 포커스 이동 규칙

1. **모달 열림**: 모달 내 첫 번째 포커스 가능 요소로 이동
2. **모달 닫힘**: 모달을 연 트리거 요소로 복귀
3. **아이템 삭제**: 다음 아이템 또는 이전 아이템으로 이동
4. **Tab 순환**: 모달 내에서 Tab 키가 순환해야 함 (focus trap)

### 구현 예시

```tsx
// 모달 포커스 트랩 예시
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose }: ModalProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때: 트리거 저장 & 첫 번째 요소 포커스
      triggerRef.current = document.activeElement as HTMLElement;
      firstFocusableRef.current?.focus();
    } else {
      // 모달 닫힐 때: 트리거로 복귀
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div role="dialog" aria-modal="true">
      <button ref={firstFocusableRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
```

---

## 5. 스크린 리더 지원

### 필수 요구사항

- [ ] **대체 텍스트**: 모든 이미지/아이콘에 `alt` 또는 `aria-label` 제공
- [ ] **상태 변경 알림**: `aria-live`로 동적 변경 알림
- [ ] **숨김 요소**: 장식용 요소는 `aria-hidden="true"` 또는 `role="presentation"`
- [ ] **의미 있는 링크**: "여기 클릭" 대신 "로드맵 생성하기"

### 구현 예시

```tsx
// ✅ Good - 아이콘 버튼에 명확한 레이블
<button aria-label="노드 추가">
  <PlusIcon aria-hidden="true" />
</button>

// ✅ Good - 동적 변경 알림
<div aria-live="polite" aria-atomic="true">
  {savedMessage && <p>로드맵이 저장되었습니다.</p>}
</div>

// ❌ Bad - 불명확한 링크
<a href="/create">여기를 클릭하세요</a>

// ✅ Good - 명확한 링크
<a href="/create">새 로드맵 만들기</a>
```

---

## 6. 에디터 특화 접근성

### 캔버스 조작

- **키보드 노드 선택**: Arrow 키로 노드 간 이동
- **노드 편집**: Enter 키로 편집 모드 진입
- **다중 선택**: Shift + Arrow 키
- **삭제**: Delete 또는 Backspace 키

### 구현 예시

```tsx
// 캔버스 키보드 네비게이션
function RoadmapCanvas() {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      // 오른쪽 노드로 포커스 이동
      focusNextNode('right');
    } else if (e.key === 'ArrowLeft') {
      // 왼쪽 노드로 포커스 이동
      focusNextNode('left');
    } else if (e.key === 'Enter') {
      // 선택된 노드 편집 모드
      enterEditMode();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      // 선택된 노드 삭제
      deleteSelectedNodes();
    }
  };

  return <div role="application" onKeyDown={handleKeyDown} aria-label="로드맵 캔버스"></div>;
}
```

---

## 7. 체크리스트

### 컴포넌트 제작 시 필수 검증

- [ ] Tab 키로 모든 요소 접근 가능
- [ ] 포커스 표시가 명확함
- [ ] 키보드만으로 모든 기능 사용 가능
- [ ] ARIA 속성이 올바르게 적용됨
- [ ] 색상 대비가 WCAG AA 기준 충족
- [ ] 스크린 리더로 테스트 완료 (VoiceOver/NVDA)
- [ ] Lighthouse 접근성 점수 90점 이상

---

## 8. 테스트 도구

### 자동화 도구

- **Lighthouse**: Chrome DevTools > Lighthouse > Accessibility
- **axe DevTools**: Chrome Extension
- **eslint-plugin-jsx-a11y**: ESLint 플러그인

### 수동 테스트

- **키보드 전용 테스트**: 마우스 없이 모든 기능 사용해보기
- **스크린 리더 테스트**:
  - macOS: VoiceOver (Cmd + F5)
  - Windows: NVDA (무료)
- **확대 테스트**: 브라우저 확대 200%에서 레이아웃 깨지지 않는지 확인

---

## 9. 참고 문서

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

---

## 10. 예외 사항

### 허용되는 예외

- **Canvas 인터랙션**: React Flow 캔버스의 드래그 앤 드롭은 마우스 중심이므로, 키보드 대안 제공
- **복잡한 시각화**: 그래프/차트는 데이터 테이블 대안 제공
- **실시간 협업**: 다른 사용자의 커서는 장식용으로 간주 (`aria-hidden="true"`)

---

이 가이드라인은 프로젝트가 성장함에 따라 지속적으로 업데이트됩니다.
