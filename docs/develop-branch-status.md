# Develop 브랜치 현황

**확인 일시**: 2026-01-23
**브랜치**: develop

---

## 📊 에디터 컴포넌트 현황

### 총 20개 컴포넌트

| 카테고리      | 개수 | 컴포넌트 목록                                                                                                                                                      |
| ------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Atoms**     | 3개  | ColorPresetButton, PlusButtonHandle, ToolbarButton                                                                                                                 |
| **Molecules** | 7개  | ColorPicker, ColorSelector, ConnectionLine, EditorAiMenu, JagalchiNode, JagalchiSection, JagalchiText                                                              |
| **Organisms** | 9개  | EdgePropertiesPanel, EditorHeader, EditorSidebar, EditorToolbar, MultiSelectPanel, NodePropertiesPanel, RoadmapCanvas, SectionPropertiesPanel, TextPropertiesPanel |
| **Templates** | 1개  | RoadmapEditor                                                                                                                                                      |

---

## 📁 디렉토리 구조

```
src/features/roadmap-editor/
├── components/
│   ├── atoms/ (3개)
│   │   ├── ColorPresetButton/
│   │   ├── PlusButtonHandle/
│   │   └── ToolbarButton/
│   ├── molecules/ (7개)
│   │   ├── ColorPicker/
│   │   ├── ColorSelector/
│   │   ├── ConnectionLine/
│   │   ├── EditorAiMenu/
│   │   ├── JagalchiNode/
│   │   ├── JagalchiSection/
│   │   └── JagalchiText/
│   ├── organisms/ (9개)
│   │   ├── EdgePropertiesPanel/
│   │   ├── EditorHeader/
│   │   ├── EditorSidebar/
│   │   ├── EditorToolbar/
│   │   ├── MultiSelectPanel/
│   │   ├── NodePropertiesPanel/
│   │   ├── RoadmapCanvas/
│   │   ├── SectionPropertiesPanel/
│   │   └── TextPropertiesPanel/
│   └── templates/ (1개)
│       └── RoadmapEditor/
├── constants/
│   ├── index.ts
│   ├── node-colors.ts
│   └── preset-colors.ts
├── stores/
│   ├── editor-atoms.ts
│   └── index.ts
├── types/
│   └── editor.types.ts
└── utils/
    ├── align-nodes.ts
    └── node-factory.ts
```

---

## 🔍 주요 컴포넌트

### Atoms

1. **ColorPresetButton** - 프리셋 컬러 버튼
2. **PlusButtonHandle** - + 버튼 핸들
3. **ToolbarButton** - 툴바 버튼

### Molecules

1. **ColorPicker** - 컬러 선택기
2. **ColorSelector** - 컬러 셀렉터
3. **ConnectionLine** - 연결선
4. **EditorAiMenu** - AI 메뉴
5. **JagalchiNode** - 노드 컴포넌트
6. **JagalchiSection** - 섹션 컴포넌트
7. **JagalchiText** - 텍스트 컴포넌트

### Organisms

1. **EdgePropertiesPanel** - 엣지 속성 패널
2. **EditorHeader** - 에디터 헤더
3. **EditorSidebar** - 사이드바
4. **EditorToolbar** - 툴바
5. **MultiSelectPanel** - 다중 선택 패널
6. **NodePropertiesPanel** - 노드 속성 패널
7. **RoadmapCanvas** - 캔버스
8. **SectionPropertiesPanel** - 섹션 속성 패널
9. **TextPropertiesPanel** - 텍스트 속성 패널

---

## 📝 기타 파일

### Constants

- `node-colors.ts` - 노드 색상 정의
- `preset-colors.ts` - 프리셋 색상
- `index.ts` - export

### Stores (Jotai)

- `editor-atoms.ts` - 에디터 상태
- `index.ts` - export

### Types

- `editor.types.ts` - 에디터 타입 정의

### Utils

- `align-nodes.ts` - 노드 정렬 유틸
- `node-factory.ts` - 노드 생성 팩토리

---

## 🆚 feat 브랜치와 비교

| 항목              | develop | feat/#100 | 차이  |
| ----------------- | ------- | --------- | ----- |
| **컴포넌트 개수** | 20개    | 33개      | +13개 |
| **Atoms**         | 3개     | 9개       | +6개  |
| **Molecules**     | 7개     | 12개      | +5개  |
| **Organisms**     | 9개     | 12개      | +3개  |

### feat 브랜치에만 있는 컴포넌트 (13개)

**Atoms (6개)**:

- ColorPicker
- EditorCheckbox
- EditorDivider
- EditorInput
- EditorTooltip
- LoadingButton

**Molecules (5개)**:

- CollapseSection
- ContextMenu
- ResourceCard
- RoadmapGenerationForm
- RoadmapModificationForm

**Organisms (3개)**:

- ResourcePropertiesPanel
- ResourceRecommendationModal
- RoadmapAiModal

---

## 💡 결론

**develop 브랜치**:

- ✅ 기본 에디터 인프라 있음 (20개 컴포넌트)
- ✅ 주요 패널들 존재 (Node, Edge, Section, Text, MultiSelect)
- ✅ 캔버스 요소 있음 (Node, Section, Text, Line)
- ✅ 기본 레이아웃 완성 (Header, Toolbar, Sidebar, Canvas)

**feat 브랜치에서 추가된 것**:

- +13개 컴포넌트 (주로 UI 기본 요소, AI 기능)
- EditorInput, EditorCheckbox, EditorDivider 등 기본 UI
- RoadmapAiModal, ResourcePropertiesPanel 등 AI/자료 기능
