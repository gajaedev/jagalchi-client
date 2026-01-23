# Figma vs Storybook Implementation Gap Analysis

**생성 일시**: 2026-01-23
**목적**: Figma 디자인과 현재 Storybook 구현 차이 분석

---

## 1. NodePropertiesPanel (노드 속성 패널)

### Figma 디자인 (4472:1567)

**구조**:

```
┌─ Header
│  ├─ "Node_1" (제목)
│  └─ "노드" (부제목)
│  └─ 잠금 아이콘
├─ 노드 이름 (Input)
│  └─ "Node_1"
├─ 노드 설명 (Textarea)
│  └─ "로드맵 설명 입력" (placeholder)
│  └─ "AI 생성" (우측 정렬)
├─ 기본 컬러 (Color Palette)
│  └─ 6개 색상 버튼: 흰색, 검정, 파랑, 보라, 빨강, 주황
├─ 커스텀 (Custom Color Picker)
│  └─ 팔레트 아이콘 + 청록색 버튼
└─ 첨부 자료 (Resources)
   ├─ 자료 링크 1: "Justin'sVelog.velog.fejwnajwaf"
   ├─ 자료 링크 2: "LibertsDelay.stoooopppppppp.com"
   ├─ "자료 링크 입력" (placeholder input)
   ├─ + 버튼 (추가 버튼)
   └─ "AI 추천" (우측 정렬)
```

**스타일링**:

- 너비: 240px
- 배경: white
- 좌측 테두리: #e2e8f0
- 섹션 구분: 하단 테두리
- 둥근 모서리: 8px
- 그림자: xs shadow
- 한국어 UI

**주요 요소**:

- ✅ 한국어 레이블
- ✅ AI 생성/AI 추천 텍스트
- ✅ 6색 팔레트 (고정 색상)
- ✅ 커스텀 컬러 피커
- ✅ 자료 링크 여러 개
- ✅ + 버튼으로 추가

---

### 현재 Storybook 구현

**구조**:

```
┌─ Header
│  ├─ "Learn React" (title)
│  └─ Node ID 표시
├─ Title Input
├─ Description Textarea
├─ Color Picker (단일)
└─ Delete 버튼 (선택적)
```

**스타일링**:

- 영어 UI
- 다른 레이아웃
- 단일 컬러 피커만 존재
- 자료 링크 섹션 없음

---

### ❌ 차이점 (Major)

| 요소        | Figma 디자인         | 현재 구현      | 상태         |
| ----------- | -------------------- | -------------- | ------------ |
| 언어        | 한국어               | 영어           | ❌ 불일치    |
| Header      | "Node_1" + "노드"    | "Learn React"  | ❌ 불일치    |
| 컬러 시스템 | 6색 팔레트 + 커스텀  | 단일 컬러 피커 | ❌ 완전 다름 |
| 자료 섹션   | 여러 링크 + AI 추천  | 없음           | ❌ 누락      |
| AI 텍스트   | "AI 생성", "AI 추천" | 없음           | ❌ 누락      |
| 잠금 아이콘 | 있음                 | 없음           | ❌ 누락      |

---

## 2. TextPropertiesPanel (텍스트 속성 패널)

### Figma 디자인 (4530:3269)

**구조**:

```
┌─ Header
│  ├─ "Text_No4, Focused" (제목)
│  └─ "텍스트" (부제목)
│  └─ 잠금 아이콘
├─ 텍스트 크기 (Number Input)
│  └─ "14" px
├─ 기본 컬러 (Color Palette)
│  └─ 5개 색상 버튼: 검정, 파랑, 보라, 빨강, 주황
└─ 커스텀 (Custom Color Picker)
   └─ 팔레트 아이콘 + 청록색 버튼
```

**주요 요소**:

- ✅ 한국어 레이블
- ✅ 텍스트 크기 조절 (px 단위)
- ✅ 5색 팔레트
- ✅ 커스텀 컬러 피커

### 현재 Storybook 구현

❌ **존재하지 않음** - TextPropertiesPanel 스토리 없음

---

## 3. EdgePropertiesPanel (엣지 속성 패널)

### Figma 디자인 (4480:2345)

**구조**:

```
┌─ Header
│  ├─ "선" (제목)
│  └─ "연결선" (부제목)
├─ 라벨 (Input)
│  └─ "라벨 없음" (placeholder)
├─ 스타일 (Line Style)
│  ├─ 실선 (선택됨)
│  ├─ 점선
│  └─ 꺾인선
├─ 화살표 (Arrow Direction)
│  ├─ 좌측 화살표 버튼
│  └─ 우측 화살표 버튼
├─ 두께 (Thickness)
│  └─ "1" px
├─ 기본 컬러 (Color Palette)
│  └─ 5개 색상 버튼: 검정, 파랑, 보라, 빨강, 주황
└─ 커스텀 (Custom Color Picker)
   └─ 팔레트 아이콘 + 청록색 버튼
```

**주요 요소**:

- ✅ 한국어 레이블
- ✅ 라인 스타일 선택 (실선/점선/꺾인선)
- ✅ 화살표 방향 버튼
- ✅ 두께 조절
- ✅ 5색 팔레트
- ✅ 커스텀 컬러 피커

### 현재 Storybook 구현

**구조**:

```
┌─ Header
│  └─ Edge 정보 (영어)
├─ Label Input (영어)
└─ 기타 설정 (간소화됨)
```

### ❌ 차이점

| 요소        | Figma 디자인             | 현재 구현  | 상태         |
| ----------- | ------------------------ | ---------- | ------------ |
| 언어        | 한국어                   | 영어       | ❌ 불일치    |
| 스타일 선택 | 3가지 (실선/점선/꺾인선) | 없음       | ❌ 누락      |
| 화살표 버튼 | 있음                     | 없음       | ❌ 누락      |
| 두께 조절   | 있음                     | 없음       | ❌ 누락      |
| 컬러 시스템 | 5색 팔레트 + 커스텀      | 단일 컬러? | ❌ 확인 필요 |

---

## 4. ToolbarButton (툴바 버튼)

### Figma 디자인 (4357:2997)

**구조**:

```
심플한 아이콘 버튼
- 크기: 32x32px
- 아이콘만 표시
- 8가지 베리언트:
  - Default, Hover, Active, Disabled
  - WithDropdownDefault, WithDropdownHover, WithDropdownActive, WithDropdownDisabled
```

### 현재 Storybook 구현

**구조**:

```
ToolbarButton 컴포넌트 존재
- 크기가 약간 다름 (36x30)
- 기본 기능은 유사
```

### ❌ 차이점

| 요소     | Figma 디자인 | 현재 구현 | 상태         |
| -------- | ------------ | --------- | ------------ |
| 크기     | 32x32        | 36x30     | ❌ 약간 다름 |
| 베리언트 | 8개          | 확인 필요 | ⚠️ 확인 필요 |

---

## 전체 요약

### 검증된 컴포넌트 (4/25)

| 컴포넌트            | Figma                           | Storybook         | 차이율 | 상태           |
| ------------------- | ------------------------------- | ----------------- | ------ | -------------- |
| NodePropertiesPanel | 한국어, 6색 팔레트, 자료 섹션   | 영어, 단순 구조   | 98%    | ❌ 재구현 필요 |
| TextPropertiesPanel | 한국어, 텍스트 크기, 5색 팔레트 | 없음              | 100%   | ❌ 새로 작성   |
| EdgePropertiesPanel | 한국어, 스타일/화살표/두께      | 영어, 간소화      | 85%    | ❌ 재구현 필요 |
| ToolbarButton       | 32x32, 8 variants               | 36x30, ? variants | 15%    | ⚠️ 크기 조정   |

### 미확인 컴포넌트 (21/25)

- SectionPropertiesPanel (4 variants)
- ResourcePropertiesPanel (2 variants)
- RoadmapAiModal (1 variant)
- 기타 variants

---

## 재구현 필요 우선순위

### High Priority (완전 재구현) - 차이율 80%+

1. **NodePropertiesPanel** (98% 다름)
   - [ ] 6색 팔레트 시스템 구현
   - [ ] 자료 링크 섹션 (여러 개 + AI 추천)
   - [ ] AI 생성/추천 텍스트 추가
   - [ ] 한국어 레이블 적용
   - [ ] 잠금 아이콘 추가

2. **TextPropertiesPanel** (100% 다름 - 존재하지 않음)
   - [ ] 새 컴포넌트 작성
   - [ ] 텍스트 크기 조절 (px)
   - [ ] 5색 팔레트 시스템
   - [ ] 커스텀 컬러 피커
   - [ ] 한국어 레이블

3. **EdgePropertiesPanel** (85% 다름)
   - [ ] 라인 스타일 선택 (실선/점선/꺾인선)
   - [ ] 화살표 방향 버튼
   - [ ] 두께 조절
   - [ ] 5색 팔레트 시스템
   - [ ] 한국어 레이블

### Medium Priority (부분 수정) - 차이율 20-80%

- [ ] SectionPropertiesPanel (확인 필요)
- [ ] ResourcePropertiesPanel (확인 필요)
- [ ] RoadmapAiModal (확인 필요)

### Low Priority (크기/스타일 조정) - 차이율 <20%

- [ ] ToolbarButton
  - 크기: 36x30 → 32x32 수정
  - 8개 베리언트 확인

---

## 다음 단계

1. ✅ NodePropertiesPanel Figma 확인
2. ⏳ TextPropertiesPanel Figma 확인
3. ⏳ EdgePropertiesPanel Figma 확인
4. ⏳ 나머지 22개 베리언트 확인
5. ⏳ 재구현 계획 수립
6. ⏳ 컴포넌트별 재구현 시작

---

## 자동화 워크플로우

재구현 후:

1. `pnpm figma:sync` - 베리언트 매핑 업데이트 (필요시)
2. `pnpm figma:export` - Figma 이미지 export
3. `pnpm storybook` - Storybook 시작
4. `pnpm figma:screenshots` - 스크린샷 캡처
5. `pnpm figma:compare` - 비교 실행
6. `pnpm figma:report` - 리포트 생성

**목표**: 모든 컴포넌트 차이율 < 10%
