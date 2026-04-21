# Jagalchi Client - 현실 점검 (Level 0)

**분석 일시**: 2026-02-14
**분석 범위**: 전체 코드베이스 (265 TypeScript 파일)
**분석 깊이**: ⭐⭐⭐⭐⭐⭐ (Phase 1-5 완료)

---

## 🎯 30초 요약

Jagalchi는 **구조는 완벽하지만, 구현에 치명적 버그 8개**가 있는 프로젝트입니다.

**✅ 강점**: Feature isolation, Atomic Design, TypeScript strict
**🚨 약점**: 데이터 손실, 보안 취약점, 성능 핫스팟, 중복 코드 240줄

**즉시 수정 필수**: CRITICAL 8개 (2-3시간 소요)
**1주일 내 수정**: HIGH 9개 (1-2일 소요)

---

## 🚨 지금 안 고치면 나중에 X되는 것 (CRITICAL - 8개)

### 1. 🔴 `fastArrayHash` - 사용자 작업 손실

**파일**: `src/features/roadmap-editor/hooks/use-auto-save.ts:26-31`

**문제**: Auto-save가 노드 속성 변경을 감지하지 못함. 사용자가 노드 label, description, color를 변경해도 해시가 동일하면 저장 안 됨.

```typescript
// 현재: 길이 + 첫/마지막 ID만 체크
function fastArrayHash(arr: unknown[]): string {
  if (!arr.length) return '0';
  const first = arr[0] as { id?: string };
  const last = arr[arr.length - 1] as { id?: string };
  return `${arr.length}-${first.id ?? ''}-${last.id ?? ''}`; // ❌ 중간 노드 변경 무시
}
```

**영향**:

- 노드 라벨 수정 → 저장 안 됨
- 색상 변경 → 저장 안 됨
- 중간 노드 편집 → 저장 안 됨
- 사용자는 "자동 저장됨"이라고 믿지만 실제로는 손실

**수정**: `JSON.stringify` 사용 (이미 500ms debounce 있으므로 성능 문제 없음)

**비용**: 지금 30분 vs 나중 3시간 + 사용자 신뢰 손실

---

### 2. 🔴 JSON.parse 검증 없음 - 크래시 위험

**파일**: `src/features/roadmap-editor/pages/RoadmapEditorPage.tsx:226, 238`

**문제**: localStorage 데이터를 검증 없이 파싱. 브라우저 확장 프로그램이나 손상된 데이터가 있으면 앱 크래시.

```typescript
// ❌ 현재 - 검증 없음
const roadmaps: Roadmap[] = JSON.parse(stored);

// ✅ 이미 존재하는 함수 사용하면 됨
const roadmaps = parseRoadmaps(stored) as Roadmap[]; // use-auto-save.ts:100에서 이미 사용 중
```

**모순**: `use-auto-save.ts`는 Zod 검증 사용, Page는 안 함 → 일관성 없음

**수정**: 1줄 변경으로 해결

**비용**: 지금 5분 vs 나중 프로덕션 크래시

---

### 3. 🔴 Clipboard Injection - XSS 가능

**파일**: `src/features/roadmap-editor/hooks/use-keyboard-shortcuts.ts:149`

**문제**: 붙여넣기(Ctrl+V)가 localStorage clipboard를 검증 없이 파싱. 악의적 확장 프로그램이 임의 노드 주입 가능.

```typescript
// ❌ 현재
const copiedNodes = JSON.parse(clipboard) as RoadmapNode[]; // 믿고 쓰기
```

**공격 시나리오**:

1. 악성 브라우저 확장이 `localStorage['jagalchi-clipboard']`에 악의적 데이터 주입
2. 사용자가 Ctrl+V
3. 임의 노드 데이터가 state에 주입됨

**수정**: Zod schema로 검증 (이미 `roadmapNodeSchema` 존재)

**비용**: 지금 20분 vs 나중 보안 사고

---

### 4. 🔴 Copy/Paste edges 누락 - 기능 버그

**파일**: `src/features/roadmap-editor/hooks/use-keyboard-shortcuts.ts:133-140`

**문제**: 노드 복사/붙여넣기 시 edges(연결선)가 복사 안 됨. 5개 연결된 노드를 복사하면 5개 고립된 노드만 생성됨.

```typescript
// ❌ 현재 - 노드만 복사
const selectedNodes = nodesRef.current.filter((node: RoadmapNode) =>
  selectedNodeIdsRef.current.includes(node.id),
);
localStorage.setItem('jagalchi-clipboard', JSON.stringify(selectedNodes));
```

**영향**: 서브그래프 복사 시 연결 관계 손실 → 그래프 에디터의 핵심 기능 깨짐

**수정**: edges도 함께 복사, ID 리매핑 필요

**비용**: 지금 1시간 vs 나중 2시간 + 사용자 불만

---

### 5. 🔴 11개 wildcard exports - CLAUDE.md 위반

**파일**:

- `src/features/community/index.ts`
- `src/features/community/components/index.ts`
- `src/features/my-roadmaps/components/*/index.ts` (9개)

**문제**: 프로젝트 규칙(`CLAUDE.md`)에서 명시적으로 금지한 `export *` 사용

```typescript
// ❌ 금지됨
export * from './components';

// ✅ 해야 함
export { Community, RoadmapCard, ... } from './components';
```

**영향**: API surface 불명확, 리팩토링 위험 증가

**수정**: 11개 파일 수정 (각 파일 2분)

**비용**: 지금 30분 vs 나중 리팩토링 시 충돌

---

### 6. 🔴 URL Injection - Profile Links

**파일**: `src/features/profile/components/organisms/ProfileCustomLinks/index.tsx:102`

**문제**: 사용자 입력 URL을 검증 없이 `<a href>`에 렌더링. `javascript:` 프로토콜 공격 가능.

```typescript
// ❌ 현재
<a href={link.url.startsWith('http') ? link.url : `https://${link.url}`}>
```

**공격**: `javascript:alert(document.cookie)` 입력 가능

**수정**: URL sanitizer 추가 (roadmap-editor에 이미 `validateUrl()` 존재)

**비용**: 지금 30분 vs 나중 XSS 사고

---

### 7. 🔴 `defaultEdgeOptions` 매 렌더 재생성 - 성능 저하

**파일**: `src/features/roadmap-editor/components/organisms/RoadmapCanvas/index.tsx:148-153`

**문제**: Object literal이 매 렌더마다 생성됨 → React Flow가 edge 재계산

```typescript
// ❌ 현재
defaultEdgeOptions={{
  type: 'smoothstep',
  label: '',
  labelStyle: { fontSize: 12, fontWeight: 400 },
}}
```

**영향**: 50개 edge × 매 렌더 = 150번 불필요한 재계산 (키보드 입력마다)

**수정**: `useMemo` 또는 module 상수로 이동

**비용**: 지금 5분 vs 나중 사용자 "느리다" 불만

---

### 8. 🔴 `align-nodes` O(n\*m) - 다중 선택 느림

**파일**: `src/features/roadmap-editor/utils/align-nodes.ts:19,29,42,56,66,77,93`

**문제**: `selectedIds.includes(node.id)` 반복 → 100 nodes × 20 selected = 2,000번 비교

```typescript
// ❌ 현재
const selectedNodes = nodes.filter((node) => selectedIds.includes(node.id)); // O(n*m)
```

**영향**: 100개 노드 프로젝트에서 정렬 버튼 클릭 시 눈에 띄는 지연

**수정**: `Set` 사용 → O(n)

**비용**: 지금 20분 vs 나중 "에디터 느림" 리뷰

---

## ⚠️ 기술 부채 씨앗 (1-3개월 후 문제) - HIGH (9개)

### 1. God Component - RoadmapEditorPage (252줄)

**파일**: `src/features/roadmap-editor/pages/RoadmapEditorPage.tsx`

**문제**: 6개 역할을 한 컴포넌트가 담당

- Loading/error 관리
- 초기 상태 추적
- 변경 감지
- Auto-save 오케스트레이션
- Browser unload 방지
- localStorage helpers

**나중 문제**: 팀원 늘면 충돌, 테스트 어려움, 버그 수정 시 사이드 이펙트

**수정**:

- `useRoadmapLoader(roadmapId)` 훅
- `useUnsavedChanges(nodes, edges, title)` 훅
- `roadmap-storage.ts` 서비스

**비용**: 지금 2시간 vs 나중 4시간 + 머지 충돌

---

### 2-3. RoadmapCard 3개 중복 + useClickOutside 2개 중복

**파일**:

- `src/features/my-roadmaps/components/atoms/RoadmapCard/` (74줄)
- `src/features/community/components/atoms/RoadmapCard/` (39줄)
- `src/features/profile/components/atoms/RoadmapCard/` (38줄)
- `src/features/community/hooks/use-click-outside/` (20줄)
- `src/features/my-roadmaps/hooks/use-click-outside.ts` (20줄)

**문제**: 복사-붙여넣기 코드 → Shotgun Surgery (카드 레이아웃 변경 시 3곳 수정)

**수정**:

- RoadmapCard → `src/components/RoadmapCard.tsx` (variant props)
- useClickOutside → `src/hooks/use-click-outside.ts`

**비용**: 지금 1시간 vs 나중 3시간 (매번 3곳 수정)

---

### 4-5. updateNode 4번 반복 + Panel Header 4번 반복

**파일**:

- NodePropertiesPanel, SectionPropertiesPanel, TextPropertiesPanel, EdgePropertiesPanel

**문제**: 동일 로직 4번 복사 (총 120줄)

**수정**:

- `useUpdateNode(nodeId)` 훅
- `<PanelHeader>` 컴포넌트

**비용**: 지금 1시간 vs 나중 버그 수정 4곳

---

### 6. localStorage 2개 레이어 - 검증 불일치

**파일**:

- `RoadmapEditorPage.tsx` (검증 없음)
- `use-auto-save.ts` (Zod 검증 있음)

**문제**: 두 경로가 경쟁 → auto-save debounce 중 manual save 하면 덮어쓰기

**수정**: 단일 `RoadmapStorageService`

**비용**: 지금 1시간 vs 나중 데이터 손실 버그

---

### 7-8. 공유 타입 중복 + STORAGE_KEY 2곳 정의

**파일**:

- `community/types/`, `my-roadmaps/atoms.ts` (SortOrder, SortBy 중복)
- `RoadmapEditorPage.tsx:203`, `use-auto-save.ts:19` (STORAGE_KEY 중복)

**문제**: 한쪽 변경 시 다른 쪽 모름 → 불일치

**수정**: `src/types/`, `constants/` 로 이동

**비용**: 지금 20분 vs 나중 divergence 버그

---

### 9. roadmap-editor 복잡도 (107 files, 49%)

**파일**: `src/features/roadmap-editor/` 전체

**문제**: 단일 feature가 전체 코드베이스의 절반. Sub-features로 분해 필요.

**제안 구조**:

```
roadmap-editor/
├── canvas/          (RoadmapCanvas, nodes, edges)
├── properties/      (모든 PropertiesPanel)
├── toolbar/         (EditorToolbar, AI 기능)
├── sidebar/         (EditorSidebar, 패널 전환)
└── core/            (atoms, hooks, utils, types)
```

**비용**: 지금 4시간 vs 나중 8시간 (코드베이스 커지면 더 어려움)

---

## 💡 과감한 제안

### 1. RoadmapEditorPage 통째로 재작성 추천

**이유**:

- 252줄, 6개 역할, 테스트 불가능
- 리팩토링보다 재작성이 빠름

**예상 시간**:

- 리팩토링: 4시간 (기존 로직 유지하며 분해)
- 재작성: 3시간 (훅 조합 + 테스트)

**ROI**: 재작성이 25% 빠르고 품질 높음

---

### 2. Profile feature의 useState + useEffect 패턴 갈아엎기

**파일**: 4개 컴포넌트 (ProfileInfoForm, ProfileBio, ProfileCustomOrganization, ProfileCustomLinks)

**문제**: React 안티패턴 (prop → useState → useEffect 동기화)

**제안**: React Hook Form으로 전환 (이미 프로젝트에 설치됨)

**비용**: 지금 2시간 vs 나중 버그 + 성능 문제

---

### 3. roadmap-editor를 별도 패키지로 분리 고려

**이유**:

- 107 files (49%)는 과도함
- 독립적인 "그래프 에디터 라이브러리"로 추출 가능
- 다른 프로젝트 재사용 가능

**장기 전략**: Monorepo 전환 시 `@jagalchi/roadmap-editor` 패키지

---

## ✅ 잘 된 것 (계속 유지)

1. **Feature isolation 완벽** - cross-import 0개
2. **Atomic Design 일관성** - 모든 feature에서 atoms → molecules → organisms → templates
3. **TypeScript strict mode** - 타입 에러 0개
4. **Undo/Redo 아키텍처** - 단일 atom으로 nodes/edges 동기화 (훌륭한 설계)
5. **Zod validation** - 이미 좋은 스키마 있음 (일관되게 사용만 하면 됨)
6. **Node factory 패턴** - SRP 준수
7. **URL validation** - `javascript:`, `data:` 차단 (roadmap-editor에서)
8. **Messages 중앙화** - `EDITOR_MESSAGES` 상수 (i18n 준비)

---

## 📊 통계

| 항목                | 현황                      |
| ------------------- | ------------------------- |
| **총 이슈**         | 19개                      |
| **CRITICAL**        | 8개 (즉시 수정)           |
| **HIGH**            | 9개 (1주일 내)            |
| **MEDIUM**          | 7개 (1개월 내)            |
| **LOW**             | 5개 (선택)                |
| **중복 코드**       | 240+ 줄                   |
| **테스트 커버리지** | editor 100%, community 0% |

---

## 🎯 냉정한 평가

**구조**: ⭐⭐⭐⭐⭐ (완벽)
**구현**: ⭐⭐⭐ (버그 많음)
**보안**: ⭐⭐ (Critical 3개)
**성능**: ⭐⭐⭐ (핫스팟 5개)
**유지보수성**: ⭐⭐ (중복 코드 240줄)

**종합**:

- 설계는 훌륭, 실행은 아쉬움
- 퍼블리싱 직후라 다행 (지금 고치기 최적기)
- CRITICAL 8개만 고치면 프로덕션 준비 완료

---

## 🚀 다음 단계

`ACTION_ITEMS.md` 참고 → 우선순위별 즉시 실행 가능한 액션 아이템
