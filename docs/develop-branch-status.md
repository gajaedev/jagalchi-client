# Develop 브랜치 현황

**확인 일시**: 2026-04-07
**브랜치**: develop (7558391)
**Phase**: 0-4 완료

---

## Phase 완료 현황

| Phase | 제목                   | 주요 내용                                                  | 상태 |
| ----- | ---------------------- | ---------------------------------------------------------- | ---- |
| 0     | 인프라/공통 기반       | API 클라이언트, 인증 레이어, 미들웨어, 데이터 모델 통합    | Done |
| 1     | 토큰/미들웨어/검증     | atomWithStorage, 쿠키 동기화, Zod 강화                     | Done |
| 2A    | 마이로드맵 연결        | 카드 클릭 라우팅, CRUD 콜백, 검색, empty state             | Done |
| 2B    | 커뮤니티 반응형        | 반응형 그리드, 좋아요 카운트, About 동적화                 | Done |
| 2C    | 프로필 편집 개선       | 편집 취소 복원, 폼 검증, 반응형, 이미지 제한               | Done |
| 3     | 에디터/뷰어 엣지케이스 | API 로더 준비, DetailNode, 사이드바 재오픈, self-loop 방지 | Done |
| 4-1   | Tailwind 토큰          | 31파일 hex → Tailwind semantic 클래스                      | Done |
| 4-2   | 문자열 상수화          | 30파일, 6개 상수 그룹 (~120개 키) → messages.ts            | Done |
| 4-3   | 접근성                 | ARIA 속성, 키보드 네비게이션 (5개 컴포넌트)                | Done |
| 4-4   | 에러 페이지            | error.tsx, not-found.tsx (글로벌 + myroadmap 라우트그룹)   | Done |

---

## 전체 컴포넌트 현황: 총 77개

| Feature        | 컴포넌트 수 | 비고                                           |
| -------------- | ----------- | ---------------------------------------------- |
| roadmap-editor | 30          | 도메인별 서브디렉토리 구조로 재편              |
| profile        | 17          | atoms 4, molecules 8, organisms 4, templates 1 |
| roadmap-viewer | 10          | 플랫 구조                                      |
| community      | 8           | atoms 2, molecules 3, organisms 1, templates 2 |
| auth           | 6           | atoms 2, molecules 2, organisms 1, templates 1 |
| my-roadmaps    | 6           | atoms 1, molecules 1, organisms 3, templates 1 |

---

## Roadmap Editor 상세 (30개 컴포넌트)

에디터는 기존 atoms/molecules/organisms 구조에서 **도메인별 서브디렉토리** 구조로 확장됨.

### 도메인별 구조

```
src/features/roadmap-editor/
├── canvas/components/       (7개)
│   ├── ConnectionLine/
│   ├── DetailNode/
│   ├── JagalchiNode/
│   ├── JagalchiSection/
│   ├── JagalchiText/
│   ├── PlusButtonHandle/
│   └── RoadmapCanvas/
├── properties/components/   (10개)
│   ├── ColorPicker/
│   ├── ColorPickerInline/
│   ├── ColorPresetButton/
│   ├── ColorSelector/
│   ├── EdgePropertiesPanel/
│   ├── EditorDivider/
│   ├── EditorInput/
│   ├── NodePropertiesPanel/
│   ├── SectionPropertiesPanel/
│   └── TextPropertiesPanel/
├── sidebar/components/      (2개)
│   ├── EditorSidebar/
│   └── MultiSelectPanel/
├── toolbar/components/      (2개)
│   ├── EditorToolbar/
│   └── ToolbarButton/
├── core/components/         (2개)
│   ├── EditorHeader/
│   └── RoadmapEditor/
├── components/              (7개, 기존 구조)
│   ├── atoms/
│   │   └── LoadingButton/
│   ├── molecules/
│   │   └── EditorAiMenu/
│   └── organisms/
│       ├── ResourceRecommendationModal/
│       ├── RoadmapAiModal/
│       ├── RoadmapGenerationForm/
│       ├── RoadmapModificationForm/
│       └── UnsavedChangesDialog/
├── constants/
├── hooks/
├── stores/
├── types/
└── utils/
```

### Roadmap Viewer (10개)

```
src/features/roadmap-viewer/
├── components/
│   ├── CardListMode/
│   ├── HeaderExportMenu/      (stub - return null)
│   ├── HeaderMenu/
│   ├── HeaderSaveAsImageMenu/ (stub - return null)
│   ├── RoadmapHeader/
│   ├── RoadmapViewer/
│   ├── ViewerCanvas/
│   ├── ViewerSidebar/
│   ├── ViewerZoomControls/
│   └── ZoomButtonGroup/
├── hooks/
├── stores/
└── types/
```

---

## 기타 Feature 상세

### Auth (6개)

| 카테고리  | 컴포넌트                             |
| --------- | ------------------------------------ |
| Atoms     | GoogleAuthButton, GitHubAuthButton   |
| Molecules | PasswordInput, VerificationCodeInput |
| Organisms | LoginForm                            |
| Templates | AuthCard                             |

### Profile (17개)

| 카테고리  | 컴포넌트                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Atoms     | RoadmapCard, ProfileEditButton, ProfileLinkAddButton, ProfilePicture                                                                       |
| Molecules | ProfileCustomOrganization, ProfileStreak, RoadmapList, ProfileHeader, ProfileBio, ProfileCustomBoxArea, ProfileInfoForm, ContributionGraph |
| Organisms | ProfileThirdBox, AddRoadmapModal, MadeRoadmapList, ProfileCustomLinks                                                                      |
| Templates | Profile                                                                                                                                    |

### My Roadmaps (6개)

| 카테고리  | 컴포넌트                                            |
| --------- | --------------------------------------------------- |
| Atoms     | RoadmapCard                                         |
| Molecules | MyRoadmapsToolbar                                   |
| Organisms | MyRoadmapsGrid, MyRoadmapsHeader, MyRoadmapsSidebar |
| Templates | MyRoadmapsLayout                                    |

### Community (8개)

| 카테고리  | 컴포넌트                                        |
| --------- | ----------------------------------------------- |
| Atoms     | ContributorItem, RoadmapCard                    |
| Molecules | CommunityHeader, CommunityFilter, CommunityHero |
| Organisms | CommunityGrid                                   |
| Templates | Community, RoadmapDetail                        |

---

## 코드 품질 현황

P0-P4 통합 코드리뷰 결과 (상세: `docs/p0-p4-code-review.md`):

| 심각도  | 개수 |
| ------- | ---- |
| BLOCKER | 1    |
| HIGH    | 8    |
| MEDIUM  | 17   |
| LOW     | 8    |

**판정:** APPROVE_WITH_NOTES — BLOCKER 1건(URL 입력 차단) 즉시 수정 필요

---

## 참조 문서

- 코드리뷰: `docs/p0-p4-code-review.md`
- 남은 작업: `docs/remaining-tasks.md`
- API 명세: `docs/api.md`
- 에디터 컴포넌트: `docs/editor-components-inventory.md`
