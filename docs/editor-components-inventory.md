# 에디터 컴포넌트 인벤토리

**작성일**: 2026-01-23
**목적**: 지금까지 구현한 실제 컴포넌트 정리

---

## 📊 전체 요약

| 카테고리      | 개수     | 테스트 있음 |
| ------------- | -------- | ----------- |
| **Atoms**     | 9개      | 6개         |
| **Molecules** | 12개     | 4개         |
| **Organisms** | 12개     | 6개         |
| **합계**      | **33개** | **16개**    |

---

## 🔹 Atoms (기본 컴포넌트) - 9개

### ✅ 테스트 있음 (6개)

| 컴포넌트           | 설명               | 파일                           |
| ------------------ | ------------------ | ------------------------------ |
| **ColorPicker**    | 컬러 선택기        | atoms/ColorPicker/index.tsx    |
| **EditorCheckbox** | 체크박스           | atoms/EditorCheckbox/index.tsx |
| **EditorDivider**  | 구분선 (수평/수직) | atoms/EditorDivider/index.tsx  |
| **EditorInput**    | 입력 필드 (36px)   | atoms/EditorInput/index.tsx    |
| **EditorTooltip**  | 툴팁               | atoms/EditorTooltip/index.tsx  |
| **LoadingButton**  | 로딩 버튼          | atoms/LoadingButton/index.tsx  |
| **ToolbarButton**  | 툴바 버튼          | atoms/ToolbarButton/index.tsx  |

### ❌ 테스트 없음 (2개)

| 컴포넌트              | 설명             | 파일                              |
| --------------------- | ---------------- | --------------------------------- |
| **ColorPresetButton** | 프리셋 컬러 버튼 | atoms/ColorPresetButton/index.tsx |
| **PlusButtonHandle**  | + 버튼 핸들      | atoms/PlusButtonHandle/index.tsx  |

---

## 🔸 Molecules (중간 컴포넌트) - 12개

### ✅ 테스트 있음 (4개)

| 컴포넌트                  | 설명           | 파일                                      |
| ------------------------- | -------------- | ----------------------------------------- |
| **CollapseSection**       | 접히는 섹션    | molecules/CollapseSection/index.tsx       |
| **ContextMenu**           | 컨텍스트 메뉴  | molecules/ContextMenu/index.tsx           |
| **JagalchiNode**          | 노드 컴포넌트  | molecules/JagalchiNode/index.tsx          |
| **ResourceCard**          | 자료 카드      | molecules/ResourceCard/index.tsx          |
| **RoadmapGenerationForm** | 로드맵 생성 폼 | molecules/RoadmapGenerationForm/index.tsx |

### ❌ 테스트 없음 (7개)

| 컴포넌트                    | 설명                    | 파일                                        |
| --------------------------- | ----------------------- | ------------------------------------------- |
| **ColorPicker**             | 컬러 선택기 (molecules) | molecules/ColorPicker/index.tsx             |
| **ColorSelector**           | 컬러 셀렉터             | molecules/ColorSelector/index.tsx           |
| **ConnectionLine**          | 연결선                  | molecules/ConnectionLine/index.tsx          |
| **EditorAiMenu**            | AI 메뉴                 | molecules/EditorAiMenu/index.tsx            |
| **JagalchiSection**         | 섹션 컴포넌트           | molecules/JagalchiSection/index.tsx         |
| **JagalchiText**            | 텍스트 컴포넌트         | molecules/JagalchiText/index.tsx            |
| **RoadmapModificationForm** | 로드맵 수정 폼          | molecules/RoadmapModificationForm/index.tsx |

---

## 🔶 Organisms (큰 컴포넌트) - 12개

### ✅ 테스트 있음 (6개)

| 컴포넌트                | 설명               | 파일                                    |
| ----------------------- | ------------------ | --------------------------------------- |
| **EdgePropertiesPanel** | 엣지 속성 패널     | organisms/EdgePropertiesPanel/index.tsx |
| **EditorHeader**        | 에디터 헤더 (60px) | organisms/EditorHeader/index.tsx        |
| **EditorToolbar**       | 에디터 툴바        | organisms/EditorToolbar/index.tsx       |
| **MultiSelectPanel**    | 다중 선택 패널     | organisms/MultiSelectPanel/index.tsx    |
| **NodePropertiesPanel** | 노드 속성 패널     | organisms/NodePropertiesPanel/index.tsx |
| **RoadmapAiModal**      | AI 모달            | organisms/RoadmapAiModal/index.tsx      |

### ❌ 테스트 없음 (6개)

| 컴포넌트                        | 설명             | 파일                                            |
| ------------------------------- | ---------------- | ----------------------------------------------- |
| **EditorSidebar**               | 사이드바 래퍼    | organisms/EditorSidebar/index.tsx               |
| **ResourcePropertiesPanel**     | 자료 속성 패널   | organisms/ResourcePropertiesPanel/index.tsx     |
| **ResourceRecommendationModal** | 자료 추천 모달   | organisms/ResourceRecommendationModal/index.tsx |
| **RoadmapCanvas**               | 캔버스           | organisms/RoadmapCanvas/index.tsx               |
| **SectionPropertiesPanel**      | 섹션 속성 패널   | organisms/SectionPropertiesPanel/index.tsx      |
| **TextPropertiesPanel**         | 텍스트 속성 패널 | organisms/TextPropertiesPanel/index.tsx         |

---

## 🎨 주요 기능별 분류

### 1. 속성 패널 (Property Panels) - 6개

| 컴포넌트                | 테스트 | Storybook | Figma 매칭         |
| ----------------------- | ------ | --------- | ------------------ |
| NodePropertiesPanel     | ✅     | ✅        | ❌ (98% 다름)      |
| EdgePropertiesPanel     | ✅     | ✅        | ❌ (85% 다름)      |
| SectionPropertiesPanel  | ❌     | ❌        | ?                  |
| TextPropertiesPanel     | ❌     | ❌        | ❌ (존재하지 않음) |
| ResourcePropertiesPanel | ❌     | ✅        | ?                  |
| MultiSelectPanel        | ✅     | ❌        | ?                  |

### 2. 캔버스 요소 (Canvas Elements) - 4개

| 컴포넌트        | 테스트 | 설명   |
| --------------- | ------ | ------ |
| JagalchiNode    | ✅     | 노드   |
| JagalchiSection | ❌     | 섹션   |
| JagalchiText    | ❌     | 텍스트 |
| ConnectionLine  | ❌     | 연결선 |

### 3. 레이아웃 (Layout) - 4개

| 컴포넌트      | 테스트 | 설명                   |
| ------------- | ------ | ---------------------- |
| EditorHeader  | ✅     | 헤더 (60px, 로고 + 줌) |
| EditorToolbar | ✅     | 툴바                   |
| EditorSidebar | ❌     | 사이드바 래퍼          |
| RoadmapCanvas | ❌     | 캔버스                 |

### 4. AI 기능 (AI Features) - 5개

| 컴포넌트                    | 테스트 | 설명           |
| --------------------------- | ------ | -------------- |
| RoadmapAiModal              | ✅     | AI 모달        |
| EditorAiMenu                | ❌     | AI 메뉴        |
| RoadmapGenerationForm       | ✅     | 로드맵 생성 폼 |
| RoadmapModificationForm     | ❌     | 로드맵 수정 폼 |
| ResourceRecommendationModal | ❌     | 자료 추천 모달 |

### 5. 기본 UI (Base UI) - 14개

| 컴포넌트          | 카테고리 | 테스트 |
| ----------------- | -------- | ------ |
| ToolbarButton     | Atom     | ✅     |
| LoadingButton     | Atom     | ✅     |
| EditorInput       | Atom     | ✅     |
| EditorCheckbox    | Atom     | ✅     |
| EditorDivider     | Atom     | ✅     |
| EditorTooltip     | Atom     | ✅     |
| ColorPicker       | Atom     | ✅     |
| ColorPresetButton | Atom     | ❌     |
| PlusButtonHandle  | Atom     | ❌     |
| ColorSelector     | Molecule | ❌     |
| CollapseSection   | Molecule | ✅     |
| ContextMenu       | Molecule | ✅     |
| ResourceCard      | Molecule | ✅     |
| ...               | ...      | ...    |

---

## 📈 커버리지 현황

### 테스트 커버리지

- **전체**: 16/33 = **48.5%**
- **Atoms**: 6/9 = **66.7%**
- **Molecules**: 4/12 = **33.3%**
- **Organisms**: 6/12 = **50%**

### Storybook 커버리지

- **속성 패널**: 3/6 = **50%**
  - NodePropertiesPanel ✅
  - EdgePropertiesPanel ✅
  - ResourcePropertiesPanel ✅
  - SectionPropertiesPanel ❌
  - TextPropertiesPanel ❌
  - MultiSelectPanel ❌

---

## 🚨 주요 발견 사항

### 1. Figma 디자인과 불일치

**심각함 (재구현 필요)**:

- NodePropertiesPanel: 98% 다름
- EdgePropertiesPanel: 85% 다름
- TextPropertiesPanel: 존재하지 않음

### 2. 테스트 누락

**테스트 없는 중요 컴포넌트**:

- SectionPropertiesPanel
- TextPropertiesPanel
- ResourcePropertiesPanel
- RoadmapCanvas
- EditorSidebar

### 3. Storybook 누락

**Storybook 없는 컴포넌트**:

- SectionPropertiesPanel
- TextPropertiesPanel
- MultiSelectPanel

---

## 🎯 남은 작업

### High Priority

1. **Figma 재구현**
   - [ ] NodePropertiesPanel 재작성 (6색 팔레트, 자료 섹션, AI 텍스트)
   - [ ] TextPropertiesPanel 새로 작성
   - [ ] EdgePropertiesPanel 재작성 (스타일, 화살표, 두께)

2. **테스트 추가**
   - [ ] SectionPropertiesPanel 테스트
   - [ ] TextPropertiesPanel 테스트
   - [ ] ResourcePropertiesPanel 테스트

3. **Storybook 추가**
   - [ ] SectionPropertiesPanel 스토리
   - [ ] TextPropertiesPanel 스토리
   - [ ] MultiSelectPanel 스토리

### Medium Priority

- [ ] 나머지 17개 컴포넌트 테스트 추가
- [ ] Storybook 커버리지 80% 달성

---

## 📝 결론

**실제로 만든 것**:

- ✅ 33개 컴포넌트 구현
- ✅ 16개 테스트 작성
- ✅ 에디터 기본 인프라 완성

**문제점**:

- ❌ Figma 디자인과 불일치 (3개 주요 컴포넌트)
- ❌ 테스트 커버리지 48.5%
- ❌ Storybook 커버리지 낮음

**다음 단계**:

1. Figma 디자인에 맞게 3개 컴포넌트 재구현
2. 테스트 커버리지 80% 달성
3. Storybook 스토리 추가
