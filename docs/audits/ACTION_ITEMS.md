# 즉시 실행 액션 (우선순위순)

**최종 업데이트**: 2026-04-20

> 2026-04-20 스윕: 남아 있던 HIGH 항목(H2~H8) 검증.
>
> - H2/H3 RoadmapCard 공용 primitive 추출 (PR #252). `useClickOutside` 는 이미
>   단일 hook(`src/hooks/use-click-outside.ts`)으로 통합되어 있었음.
> - H4/H5 `PanelHeader` + `useUpdateNode` 는 이미 Node/Section/Text/Edge Panel
>   모두에서 사용 중(`src/features/roadmap-editor/properties/...`). 재검증 완료.
> - H6 localStorage 는 `src/lib/roadmap-storage.ts` 단일 서비스로 완료.
> - H7/H8 공용 타입/상수는 `src/types/sort.types.ts`, `src/lib/roadmap-storage.ts`
>   로 이미 존재. feature 는 re-export 만 사용.

---

## ⚡ 이번 주 (CRITICAL - 8개)

### P0-1: fastArrayHash 수정 (30분)

**파일**: `src/features/roadmap-editor/hooks/use-auto-save.ts:26-31`

**작업**:

```typescript
// 삭제: fastArrayHash() 함수 전체

// 수정: line 60-62
const currentNodesHash = JSON.stringify(currentNodes);
const currentEdgesHash = JSON.stringify(currentEdges);

if (currentNodesHash === lastSavedNodesRef.current &&
    currentEdgesHash === lastSavedEdgesRef.current) {
```

**테스트**:

1. 노드 label 변경 → 저장 확인
2. 색상 변경 → 저장 확인
3. 중간 노드 편집 → 저장 확인

---

### P0-2: JSON.parse 검증 추가 (10분)

**파일**: `src/features/roadmap-editor/pages/RoadmapEditorPage.tsx:226, 238`

**작업**:

```typescript
// Line 15: import 추가
import { parseRoadmaps } from '../schemas/roadmap.schema';

// Line 226: 수정
function loadRoadmapFromLocalStorage(id: string): Roadmap | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  const roadmaps = parseRoadmaps(stored) as Roadmap[]; // ✅ 검증 추가
  return roadmaps.find((r) => r.id === id) || null;
}

// Line 238: 수정
function saveRoadmapToLocalStorage(roadmap: Roadmap): void {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(STORAGE_KEY);
  const roadmaps = parseRoadmaps(stored) as Roadmap[]; // ✅ 검증 추가
  // ... rest
}
```

**테스트**: localStorage 손상된 데이터 넣고 로드 시 에러 안 나는지 확인

---

### P0-3: Clipboard 검증 추가 (20분)

**파일**: `src/features/roadmap-editor/hooks/use-keyboard-shortcuts.ts:149`

**작업**:

```typescript
// Line 3: import 추가
import { z } from 'zod';
import { roadmapNodeSchema } from '../schemas/roadmap.schema';

// Line 145: 새 schema 정의
const clipboardNodesSchema = z.array(roadmapNodeSchema);

// Line 149-158: 수정
const clipboard = localStorage.getItem('jagalchi-clipboard');
if (clipboard) {
  try {
    const parsed = JSON.parse(clipboard);
    const result = clipboardNodesSchema.safeParse(parsed);
    if (!result.success) {
      console.warn('Invalid clipboard data');
      return;
    }
    const copiedNodes = result.data;
    // ... rest
```

**테스트**: localStorage clipboard에 잘못된 데이터 넣고 붙여넣기 시 무시되는지 확인

---

### P0-4: Copy/Paste edges 추가 (1시간)

**파일**: `src/features/roadmap-editor/hooks/use-keyboard-shortcuts.ts:133-158`

**작업**:

```typescript
// Line 133: Copy handler - edges도 복사
if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
  event.preventDefault();
  const selectedNodes = nodesRef.current.filter((node: RoadmapNode) =>
    selectedNodeIdsRef.current.includes(node.id),
  );

  // ✅ edges도 복사
  const selectedEdges = edgesRef.current.filter(
    (edge: Edge) =>
      selectedNodeIdsRef.current.includes(edge.source) &&
      selectedNodeIdsRef.current.includes(edge.target),
  );

  if (selectedNodes.length > 0) {
    localStorage.setItem(
      'jagalchi-clipboard',
      JSON.stringify({
        nodes: selectedNodes,
        edges: selectedEdges,
      }),
    );
  }
}

// Line 149: Paste handler - edges도 붙여넣기
if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
  event.preventDefault();
  const clipboard = localStorage.getItem('jagalchi-clipboard');
  if (clipboard) {
    try {
      const parsed = JSON.parse(clipboard);
      const result = clipboardNodesSchema.safeParse(parsed.nodes);
      if (!result.success) return;

      const copiedNodes = result.data;
      const copiedEdges = parsed.edges || [];

      // ID 매핑 생성
      const idMap = new Map<string, string>();
      const newNodes = copiedNodes.map((node: RoadmapNode) => {
        const newId = createId();
        idMap.set(node.id, newId);
        return {
          ...node,
          id: newId,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50,
          },
        };
      });

      // Edges ID 리매핑
      const newEdges = copiedEdges.map((edge: Edge) => ({
        ...edge,
        id: createId(),
        source: idMap.get(edge.source) || edge.source,
        target: idMap.get(edge.target) || edge.target,
      }));

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);
    } catch (error) {
      console.error('Paste error:', error);
    }
  }
}
```

**테스트**: 연결된 노드 3개 복사 → 붙여넣기 → edges도 복사되는지 확인

---

### P0-5: Wildcard exports 수정 (30분)

**파일**: 11개 (아래 순서대로)

1. `src/features/community/index.ts`

```typescript
// ❌ 삭제
export * from './components';

// ✅ 추가
export {
  ContributorItem,
  RoadmapCard,
  CommunityFilter,
  CommunityHero,
  CommunityGrid,
  Community,
  RoadmapDetail,
} from './components';
```

2. `src/features/community/components/index.ts`

```typescript
// ❌ 삭제
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';

// ✅ 추가
export { ContributorItem, RoadmapCard } from './atoms';
export { CommunityFilter, CommunityHero } from './molecules';
export { CommunityGrid } from './organisms';
export { Community, RoadmapDetail } from './templates';
```

3-11. `src/features/my-roadmaps/components/*/index.ts` (9개 파일)

- 각 파일에서 `export *` → `export { ... }` 명시적으로 변경

**테스트**: `pnpm build` 성공 확인

---

### P0-6: URL Sanitizer 추가 (30분)

**파일**:

- `src/lib/url-validation.ts` (새 파일)
- `src/features/profile/components/organisms/ProfileCustomLinks/index.tsx`

**작업**:

1. `src/lib/url-validation.ts` 생성:

```typescript
const ALLOWED_PROTOCOLS = ['https:', 'http:'];

export function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '#';

  try {
    const withProtocol = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    const parsed = new URL(withProtocol);
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      return '#';
    }
    return parsed.href;
  } catch {
    return '#';
  }
}
```

2. ProfileCustomLinks 수정:

```typescript
// Line 5: import 추가
import { sanitizeUrl } from '@/lib/url-validation';

// Line 102: 수정
<a
  href={sanitizeUrl(link.url)}
  target="_blank"
  rel="noopener noreferrer"
>
```

**테스트**: `javascript:alert(1)` 입력 → `#`로 변환되는지 확인

---

### P0-7: defaultEdgeOptions useMemo (5분)

**파일**: `src/features/roadmap-editor/components/organisms/RoadmapCanvas/index.tsx`

**작업**:

```typescript
// Line 2: import 추가
import { useMemo } from 'react';

// Line 148: 수정
const defaultEdgeOptions = useMemo(() => ({
  type: 'smoothstep',
  label: '',
  labelStyle: { fontSize: 12, fontWeight: 400 },
  labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
}), []);

// Line 156: 사용
<ReactFlow
  // ...
  defaultEdgeOptions={defaultEdgeOptions}
```

**테스트**: React DevTools Profiler로 edge 재렌더링 감소 확인

---

### P0-8: align-nodes Set 사용 (20분)

**파일**: `src/features/roadmap-editor/utils/align-nodes.ts`

**작업**:

```typescript
// Line 16: 추가
const selectedIdsSet = new Set(selectedIds);

// Line 19: 수정
const selectedNodes = nodes.filter((node) => selectedIdsSet.has(node.id));

// Line 29, 42, 56, 66, 77, 93: 모두 수정
return nodes.map((node) =>
  selectedIdsSet.has(node.id) // ✅ Set 사용
    ? { ...node, position: { ...node.position, x: targetValue } }
    : node,
);
```

**테스트**: 100개 노드 생성 → 20개 선택 → 정렬 → 지연 없는지 확인

---

## 📅 다음 주 (HIGH - 9개)

### H1: RoadmapEditorPage 훅 분해 (2시간)

**작업**:

1. `src/features/roadmap-editor/hooks/use-roadmap-loader.ts` 생성
2. `src/features/roadmap-editor/hooks/use-unsaved-changes.ts` 생성
3. `src/features/roadmap-editor/services/roadmap-storage.ts` 생성
4. RoadmapEditorPage에서 사용

**효과**: God Component → 조합 가능한 훅

---

### H2-H3: 중복 컴포넌트/훅 통합 (1.5시간)

**작업**:

1. `src/components/RoadmapCard.tsx` 생성 (variant props)
2. `src/hooks/use-click-outside.ts` 생성
3. 3개 RoadmapCard 삭제, 임포트 변경
4. 2개 useClickOutside 삭제, 임포트 변경

**효과**: Shotgun Surgery 제거

---

### H4-H5: Property panel 중복 제거 (1.5시간)

**작업**:

1. `src/features/roadmap-editor/hooks/use-update-node.ts` 생성
2. `src/features/roadmap-editor/components/molecules/PanelHeader.tsx` 생성
3. 4개 PropertiesPanel에서 사용

**효과**: 120줄 중복 제거

---

### H6: localStorage 단일 서비스 (1시간)

**작업**:

1. `src/features/roadmap-editor/services/roadmap-storage.ts` 생성
2. STORAGE_KEY, loadRoadmap, saveRoadmap 통합
3. RoadmapEditorPage, use-auto-save에서 사용

**효과**: 데이터 경쟁 조건 제거

---

### H7-H8: 공유 타입/상수 추출 (20분)

**작업**:

1. `src/types/sort.types.ts` 생성 (SortOrder, SortBy, FilterCategory)
2. `src/features/roadmap-editor/constants/storage.ts` 생성 (STORAGE_KEY)
3. 중복 삭제, 임포트 변경

**효과**: DRY 준수

---

### H9: roadmap-editor sub-features 분해 (4시간)

**작업**:

```
roadmap-editor/
├── canvas/          (RoadmapCanvas, JagalchiNode, JagalchiSection, JagalchiText)
├── properties/      (모든 PropertiesPanel + PanelHeader)
├── toolbar/         (EditorToolbar + AI modals)
├── sidebar/         (EditorSidebar + MultiSelectPanel)
└── core/            (atoms, hooks, utils, types, schemas)
```

**효과**: 107 files → 5개 sub-features (각 ~20 files)

---

## 📆 이번 달 (MEDIUM - 7개)

### M1-M4: Profile 컴포넌트 리팩토링 (2시간)

**작업**: React Hook Form으로 전환

- ProfileInfoForm
- ProfileBio
- ProfileCustomOrganization
- ProfileCustomLinks

**효과**: useState + useEffect 안티패턴 제거

---

### M5-M7: 성능 최적화 (1시간)

**작업**:

1. `hasChanges` JSON.stringify → fast hash
2. Keyboard shortcuts O(n\*m) → Set
3. MultiSelectPanel useCallback

**효과**: 대규모 roadmap 성능 개선

---

## 📊 작업 시간 예상

| 우선순위     | 작업 개수 | 예상 시간 | 완료 후 효과       |
| ------------ | --------- | --------- | ------------------ |
| **CRITICAL** | 8개       | 2-3시간   | 프로덕션 준비 완료 |
| **HIGH**     | 9개       | 1-2일     | 기술 부채 제거     |
| **MEDIUM**   | 7개       | 1일       | 성능 & 품질 개선   |
| **총합**     | 24개      | 3-4일     | 완벽한 코드베이스  |

---

## ✅ 완료 체크리스트

### 이번 주 끝나기 전

- [x] P0-1: fastArrayHash 수정
- [x] P0-2: JSON.parse 검증
- [x] P0-3: Clipboard 검증
- [x] P0-4: Copy/Paste edges
- [x] P0-5: Wildcard exports
- [x] P0-6: URL Sanitizer
- [x] P0-7: defaultEdgeOptions
- [x] P0-8: align-nodes Set

### 다음 주

- [x] H1: RoadmapEditorPage 훅 분해
- [x] H2-H3: 중복 컴포넌트/훅 통합 (PR #252, useClickOutside 이미 통합됨)
- [x] H4-H5: Property panel 중복 제거 (PanelHeader + useUpdateNode 적용 완료)
- [x] H6: localStorage 단일 서비스 (`src/lib/roadmap-storage.ts`)
- [x] H7-H8: 공유 타입/상수 추출 (`src/types/sort.types.ts`)
- [x] H9: roadmap-editor sub-features 분해

### 이번 달

- [x] M1-M4: Profile 리팩토링
- [x] M5-M7: 성능 최적화

---

## 🎯 성공 기준

**이번 주 완료 후**:

- ✅ 데이터 손실 버그 0개
- ✅ 보안 취약점 0개
- ✅ CLAUDE.md 100% 준수
- ✅ 성능 핫스팟 제거

**다음 주 완료 후**:

- ✅ 중복 코드 0줄
- ✅ God Component 0개
- ✅ 테스트 가능한 구조

**이번 달 완료 후**:

- ✅ React 안티패턴 0개
- ✅ 100 nodes roadmap에서 60fps 유지
- ✅ 프로덕션 배포 준비 완료

---

**다음 액션**: P0-1부터 순서대로 시작! 🚀
