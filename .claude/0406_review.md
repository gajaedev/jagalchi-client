# 2026-04-06 전체 피처 리뷰

## Auth

### 상태: ⚠️ 이슈 있음

**구조 요약**: Atomic Design 패턴으로 잘 구성. 로그인/회원가입(3단계)/비밀번호 찾기(2단계) 플로우. Zod + RHF + TanStack Query mutation 조합.

**발견된 이슈**:

- [HIGH] 토큰 저장/관리 미구현 — 로그인 성공 시 token을 어디에도 저장 안 함. apiClient에 Authorization 헤더 없음. 인증된 API 요청 불가.
- [HIGH] 인증 가드/미들웨어 없음 — middleware.ts 없고, 라우트 보호 전무. 비로그인 사용자도 보호 페이지 접근 가능.
- [MEDIUM] 회원가입 에러 핸들링 누락 — `RegisterForm.tsx:56-68` onError 콜백 없음. 이메일 중복(409) 등 서버 에러 시 피드백 없음.
- [MEDIUM] 인증코드 전송 시 이메일 유효성 미검증 — `RegisterStep1Form.tsx:116`, `FindPasswordForm.tsx:203` Zod 검증 트리거 안 됨.
- [LOW] UI 문자열 전부 하드코딩 (messages.ts 미사용)

**미구현/TODO**:

- `LoginForm:51,55` / `RegisterForm:86,90` — Google/GitHub OAuth TODO
- 토큰 기반 인증 상태 관리 (Jotai atom)
- 인증 미들웨어/라우트 가드
- 로그아웃 기능
- 인증 코드 만료 타이머 UI

**테스트**: 13개 파일, 주요 컴포넌트/스키마/복합 훅 커버. 개별 mutation 훅 테스트 누락(간접 커버).

**종합**: UI/폼 검증/API 호출 레이어는 양호. **토큰 저장 및 인증 상태 관리가 완전 미구현**이 가장 시급.

### 엣지케이스 (HIGH 10건 / MEDIUM 8건 / LOW 8건)

**HIGH**:

- username 공백만 입력 통과 — `.trim()` 미적용. `"   "` 유효한 username 처리. (`auth.schema.ts:21`)
- 인증코드 만료 시간 미표시/미관리 — `expiresIn: 300` 서버 반환하나 클라이언트 미사용. (`use-verification-code.ts`)
- 인증코드 brute force 제한 없음 — 시도 횟수 무제한. (`use-verification-code.ts`)
- 코드 전송 후 이메일 변경 가능 — `isCodeSent=true`여도 이메일 필드 활성. 다른 이메일로 코드 인증 시도 가능. (`RegisterStep1Form.tsx:92`, `FindPasswordForm.tsx:158-163`)
- 회원가입 실패 시 에러 미표시 — `registerMutation` onError 없음. (`RegisterForm.tsx:56-68`)
- 로그인 상태에서 auth 페이지 접근 허용 — 인증 가드/redirect 없음. (`(auth)/layout.tsx`)
- 토큰 저장/관리 미구현 — 로그인/회원가입 성공 시 token 미저장. (`LoginForm:41-43`, `RegisterForm:63-65`)
- 로그인 brute force 방어 없음 — 실패 횟수 추적 없음, CAPTCHA 없음. (`LoginForm:39-48`)

**MEDIUM**:

- 비밀번호 최대 길이 제한 없음 — `.max()` 미적용, 수천 글자 가능. (`auth.schema.ts:10-16`)
- XSS — React 자동 이스케이프로 렌더링 방어되나 서버 전송 시 sanitize 없음. (`auth.schema.ts:20-22`)
- 코드 재전송 시 이전 코드 입력값 미초기화. (`use-verification-code.ts:17-25`)
- 회원가입 step 1/2/3 "다음"/"확인" 버튼 disabled 미적용 — 더블 클릭 가능. (`RegisterStep1Form:108`, `RegisterStep2Form:53`)
- 타임아웃 미설정 — auth API에 signal/timeout 미전달. (`api/auth.ts`)
- 브라우저 뒤로가기 시 step 관리 안 됨 — 히스토리 미연동. (`RegisterForm.tsx:27`)
- 새로고침 시 회원가입 상태 소실 — useRef로 관리, beforeunload 경고 없음. (`RegisterForm.tsx:28-29`)
- 회원가입 step 역순 이동 불가 — "뒤로" 버튼 없음. (`RegisterForm.tsx:93-107`)

## My Roadmaps

### 상태: ❌ 심각

**구조 요약**: Atomic Design 기반. Jotai `atomWithStorage`로 클라이언트 상태 관리. TanStack Query 미사용, 서버 연동 전무. MSW 핸들러 존재하나 피처와 미연결.

**알려진 이슈 원인 분석**:

- **스켈레톤 멈춤** — `handleAddRoadmap`이 `jagalchi-my-roadmaps` key에 저장, 에디터는 `jagalchi-roadmaps` key에서 로딩. **두 저장소 완전 분리**. (`MyRoadmapsToolbar:41-52`, `use-roadmap-loader.ts:59`)
- **반응형 깨짐** — 그리드는 반응형이나 `RoadmapCard`가 `w-[304px]` 고정 너비. `px-20` 패딩이 좁은 화면에서 공간 압박. (`RoadmapCard:48`, `page.tsx:83`)
- **디렉토리 무시** — `_locationId` 언더스코어로 무시됨. `RoadmapData` 타입에 `parentId` 필드 자체 없음. 디렉토리 구조 미구현. (`MyRoadmapsToolbar:41`)
- **검색 안 됨** — Input에 `value`/`onChange` 미연결. 검색 atom 없음, 필터링 로직에 검색어 없음. (`MyRoadmapsToolbar:106-110`)
- **공유 로드맵 라우팅/헤더** — 헤더 `내 로드맵` 하드코딩. 카테고리 변경해도 URL/헤더 불변. (`MyRoadmapsHeader:17-18`)
- **사이드바** — `setActiveCategory` 동작은 하나, mock 데이터에 `isShared` 1개, `isFavorite` 2개뿐. 사이드바 검색도 미연결. (`MyRoadmapsSidebar:68,84`)
- **이름 수정** — `onRename` prop 정의되어 있으나 `MyRoadmapsGrid`에서 **콜백 미전달**. 클릭 시 no-op. (`MyRoadmapsGrid:12-18`)

**추가 발견된 이슈**:

- [HIGH] 카드 클릭으로 로드맵 열기 불가 — onClick/href 없음, id도 미전달. 로드맵 진입 방법 없음.
- [HIGH] 데이터 모델 분리 — `RoadmapData` vs `Roadmap` 타입 완전 별개. 에디터/뷰어와 데이터 불일치.
- [HIGH] MSW 핸들러 미사용 — fetch/TanStack Query 없이 순수 Jotai atomWithStorage만 사용.
- [MEDIUM] atomWithStorage SSR 하이드레이션 잠재 이슈
- [MEDIUM] 하드코딩 hex 색상 다수
- [MEDIUM] breadcrumb dead code — 디렉토리 진입 없어 항상 빈 배열.

**미구현/TODO**:

- 서버 API 연동
- 검색 기능 (로직)
- 디렉토리 계층 구조 (parentId)
- 카드 CRUD 동작 (이름수정, 삭제, 이동, 즐겨찾기)
- 카드 클릭 → 로드맵 열기
- 사이드바 검색
- 헤더 동적 타이틀
- 사용자 정보 연동

**테스트**: 11개 파일, 전 컴포넌트 커버.

**종합**: **UI 셸만 완성**. 핵심 기능 전부 미구현 또는 연결 단절. 에디터와 데이터 모델 불일치가 가장 근본적 구조 문제.

### 엣지케이스 (HIGH 4건 / MEDIUM 5건 / LOW 10건)

**HIGH**:

- 드롭다운 메뉴 기능 미연결 — 즐겨찾기/이름수정/이동/삭제 콜백이 Grid→Card로 전달 안 됨. UI만 존재. (`MyRoadmapsGrid:12-19`)
- 삭제 확인 다이얼로그 없음 — 향후 연결 시 즉시 삭제 위험. (`RoadmapCard:125-131`)
- 검색 기능 미연결 — 사이드바/툴바 검색 Input UI만, onChange 없음, 검색 atom 없음. (`MyRoadmapsSidebar:64-73`, `MyRoadmapsToolbar:104-111`)
- 로드맵 생성 후 에디터 데이터 동기화 없음 — localStorage 메타데이터와 에디터 데이터 간 단절. (`MyRoadmapsToolbar:41-51`)

**MEDIUM**:

- 빈 상태(empty state) UI 없음 — 0개 결과 시 빈 그리드만 표시. (`MyRoadmapsGrid:9-23`)
- 대량 데이터 가상화/페이지네이션 없음 — `.filter().sort()` 매 렌더, 전체 DOM 렌더링. (`page.tsx:24-77`)
- localStorage JSON 스키마 검증 없음 — 유효한 JSON이나 필드 누락 시 런타임 에러 가능.
- 모달 중첩 시 부모 모달 의도치 않은 닫힘 — SelectLocationModal 사용 중 overlay 클릭으로 AddRoadmapModal 닫힘 가능.
- RoadmapCard 키보드 접근성 — Card가 div 기반, tabIndex/role/onKeyDown 없음. (`RoadmapCard:46-48`)

## Community

### 상태: ⚠️ 이슈 있음

**구조 요약**: Atomic Design 패턴. Jotai 필터/검색 상태 관리. `/community` (목록) + `/community/[id]` (상세) 2페이지.

**발견된 이슈**:

- [HIGH] 전체가 Mock 데이터 기반 — API 호출 전무, MSW 핸들러도 없음. `MOCK_COMMUNITY_DATA` 15개 하드코딩 직접 import. TanStack Query 미사용.
- [HIGH] RoadmapDetail About 섹션 하드코딩 — 모든 상세페이지에 동일 텍스트. item에 description 필드 없음. (`RoadmapDetail/index.tsx:87-91`)
- [MEDIUM] CommunityHeader 사용자 정보 하드코딩 — `"UserName"` + 빈 아바타. 인증 미연동. (`CommunityHeader/index.tsx:30-31`)
- [MEDIUM] "내 로드맵에 추가" — `window.alert` 처리만. 로그인 확인 로직 없음. (`RoadmapDetail/index.tsx:77`)
- [MEDIUM] 좋아요 클라이언트 전용 — useState 토글만, 서버 연동 없음. 새로고침 시 초기화. (`RoadmapDetail/index.tsx:25,58`)
- [MEDIUM] "저장된 로드맵" 탭 가짜 — `result.slice(0, 5)` 반환. 실제 저장 기능 없음.
- [MEDIUM] ContributorItem, "마지막 업데이트" 등 다수 하드코딩

**미구현/TODO**:

- 실제 API 연동 (목록/상세 조회)
- MSW 핸들러
- 좋아요/저장 서버 동기화
- 내 로드맵에 추가 기능
- 로그인 상태 연동
- 페이지네이션/무한 스크롤
- Contributor 목록 API

**테스트**: 8개 파일, 구조 렌더링 + 기본 인터랙션 커버. 단 모두 mock 데이터 기반.

**종합**: UI 구조/테스트는 양호하나, **전체가 Mock 프로토타입 수준**. API 연동, 인증 통합, 핵심 비즈니스 로직 전부 미구현.

### 엣지케이스 (HIGH 5건 / MEDIUM 11건 / LOW 12건)

**HIGH**:

- 반응형 그리드 고정 — `grid-cols-3` 반응형 breakpoint 없음. 모바일에서 카드 잘림. (`CommunityGrid:21`)
- 카드 고정 크기 — `h-[200px] w-[304px]` 고정. 작은 화면 overflow. (`CommunityGrid:23`)
- 검색바 고정 너비 — `w-[640px]` 고정. 모바일 화면 넘침. (`CommunityHero:70`)
- 상세 페이지 고정 너비 — `w-[696px]`, `w-[134px]` 고정. 모바일 가로 스크롤. (`RoadmapDetail:47-48`)
- 필터 상태-URL 동기화 없음 — 필터/검색/탭 URL 미반영. 공유/북마크 불가, 새로고침 시 초기화.

**MEDIUM**:

- 빈 상태 메시지 미분류 — 검색 vs 필터 구분 없이 "검색 결과가 없습니다" 고정
- 상세 제목 overflow — `truncate`/`line-clamp` 없음. (`RoadmapDetail:50-52`)
- 카드/상세 이미지 로딩 실패 — `onError` 핸들러 없음
- 404 미반환 — 존재하지 않는 ID에 200 응답. `notFound()` 미호출
- error.tsx/not-found.tsx 부재
- 좋아요 카운트 미변경 — 하트 토글해도 숫자 불변. (`RoadmapDetail:58`)
- 키보드 드롭다운/탭 ARIA/검색 label/좋아요 aria/드롭다운 포커스 — 접근성 미비 다수

## Profile

### 상태: ⚠️ 이슈 있음

**구조 요약**: Atomic Design 패턴. Jotai로 show/edit 모드 전환, RHF로 폼 처리. 전체적으로 API 연동 전무, 모든 데이터 하드코딩.

**발견된 이슈**:

- [HIGH] API 연동 전무 — useQuery/useMutation/fetch 호출 없음. MSW 핸들러도 501 stub만. (`mocks/handlers/profile.ts:4-14`)
- [HIGH] 저장 기능 미구현 — "저장" 버튼이 `setMode('show')`만 호출. 실제 데이터 저장 없음, 편집값 리셋됨. (`ProfileInfoForm/index.tsx:126`)
- [MEDIUM] 프로필 이미지 업로드 클라이언트 전용 — FileReader → Jotai atom 저장만. 서버 업로드 없음, 새로고침 시 유실. (`ProfileHeader/index.tsx:24-31`)
- [MEDIUM] 하드코딩 mock 데이터 5곳 산재 — MOCK_USER_DATA, MOCK_ROADMAPS, MOCK_FILE_TREE, 소속명 등
- [MEDIUM] Bio 변경사항 부모 전파 안 됨 — onChange prop 미전달. (`Profile/index.tsx:47`)
- [LOW] 하드코딩 hex 색상값 다수 (ProfileEditButton, RoadmapCard, Profile 템플릿)

**미구현/TODO**:

- `Profile/index.tsx:14` — `// TODO: Replace with actual user data from API/state`
- MSW 핸들러 GET/PUT `/api/profile/:id` 501 stub
- 팔로우/언팔로우 기능
- 프로필 편집 서버 저장 파이프라인 전체
- 다른 유저 프로필 조회 라우팅

**테스트**: 16개 컴포넌트 전부 테스트 파일 존재. utils 테스트 없음.

**종합**: UI 구조/모드 전환 잘 구현. **API 연동 완전 부재**로 순수 프레젠테이션 레이어 상태. 백엔드 연동이 최우선.

### 엣지케이스 (HIGH 9건 / MEDIUM 7건 / LOW 9건)

**HIGH**:

- 저장 미구현 — "저장" 클릭 시 `setMode('show')`만. API 없음, 새로고침 시 유실. (`ProfileInfoForm:126`)
- 빈 이름/이메일 제출 가능 — `required`/validation 없음. (`ProfileInfoForm:98-99`)
- Bio 편집 취소 미복원 — "취소" 버튼이 name/email만 reset, bio 변경은 그대로 남음. (`ProfileBio:22-45`)
- Organization/Links 편집 취소 미복원 — 취소 메커니즘 없음. (`ProfileCustomOrganization:37-40`)
- 이미지 파일 크기 무제한 — 수백MB 파일도 허용. (`ProfilePicture:28-33`)
- base64 변환 성능 — 대용량 이미지 메모리 급증. Jotai atom에 거대 base64 저장. (`ProfileHeader:26`)
- 타임존 불일치 — `getLastYearDates()`는 로컬, `GenerateMockContributions()`는 UTC. 자정~오전 9시 날짜 불일치. (`contribution-utils.tsx:14-19` vs `generate-mock-contributions.ts:33`)
- 반응형 레이아웃 — Bio 영역 `w-[500px] shrink-0` 고정. 500px 미만 깨짐. (`Profile:45-46`)
- edit 모드 페이지 이동 경고 없음 — `beforeunload` 없음. 변경사항 무경고 유실.
- 전역 모드 atom 취소 불완전 — profileModeAtom 하나로 전체 관리. "취소"가 name/email만 reset, bio/org/links는 남음. (`profile-atoms.ts:3`)
- 동시 편집 일괄 저장 없음 — 각 컴포넌트 독립 `useForm`. 일괄 저장 메커니즘 없음.

**MEDIUM**:

- XSS 서버측 sanitize 없음 (API 미구현이라 현재 영향 없음)
- 파일 형식 우회 — `accept="image/*"`는 클라이언트 힌트뿐
- FileReader 에러 핸들링 없음 — `reader.onerror` 미설정. (`ProfileHeader:24-30`)
- 이미지 atom persistence 없음 — 새로고침 시 업로드 이미지 유실. (`profile-atoms.ts:9`)
- 긴 이름 overflow — `truncate` 없음. (`ProfileInfoForm:74`)
- 로드맵 카드/리스트 0개 empty state 없음 — 빈 그리드만 표시
- ContributionGraph 접근성 — 셀이 `<div>`, `role`/`aria-label` 없음

## Roadmap Editor

### 상태: ⚠️ 이슈 있음

**구조 요약**: React Flow 기반 에디터. Jotai + jotai-history undo/redo + localStorage 자동저장. Canvas/Properties/Sidebar/Toolbar/Core 5개 서브 모듈. 테스트 32개로 매우 양호.

**발견된 이슈**:

- [HIGH] DetailNode가 존재하지 않는 `createDetailNode` import — `DetailNode/index.tsx:10`, node-factory에 해당 함수 없음. untracked WIP 코드, 빌드 에러 가능.
- [HIGH] DetailNodeBase도 untracked — `src/components/roadmap/nodes/DetailNodeBase/`. nodeTypes에 미등록.
- [MEDIUM] ColorPicker 커스텀 색상 미구현 — `handleApply`가 적용 없이 닫힘. HexColorPicker UI만 존재. (`ColorPicker/index.tsx:27`)
- [MEDIUM] AI 기능 전체 미구현 — AI 로드맵 생성/수정(`RoadmapAiModal`), AI 자료 추천(`ResourceRecommendationModal`) 모두 setTimeout mock + console.log.
- [MEDIUM] EditorHeader "Readme 수정", "더보기" 버튼 미구현 — onClick 없음. (`EditorHeader/index.tsx:50,59`)
- [MEDIUM] Edge 속성 일부 disabled — 라벨 input, 화살표 버튼 2개, 두께 input. (`EdgePropertiesPanel/index.tsx`)
- [MEDIUM] MultiSelectPanel 간격(Spacing) disabled. (`MultiSelectPanel/index.tsx:148-152`)
- [LOW] MSW 핸들러와 에디터 불일치 — 에디터는 localStorage만 사용, MSW는 myroadmap용.
- [LOW] 문자열 하드코딩 다수 — UnsavedChangesDialog, EditorHeader, ErrorFallback 등.
- [LOW] Line tool 미구현 — `setActiveTool('line')`만, 실제 그리기 없음. Phase 2 주석.

**미구현/TODO**:

- Phase 4: AI 로드맵 생성/수정/자료추천 (3곳)
- Phase 2.1: 커스텀 색상 적용
- Phase 2: Line tool
- DetailNode 새 노드 타입 (WIP)
- Edge 라벨/화살표/두께 편집
- 노드 간격 자동 조절
- Readme 수정, 더보기 메뉴

**테스트**: 32개 파일, 매우 양호. use-roadmap-loader, use-unsaved-changes 등 일부 훅 테스트 누락.

**종합**: 핵심 기능(노드/엣지 CRUD, D&D, undo/redo, 자동저장, 단축키) 잘 구현. **untracked DetailNode 빌드 에러 주의**. AI 기능/Edge 속성 등 다수 미구현 UI 존재.

### 엣지케이스 (HIGH 2건 / MEDIUM 7건 / LOW 11건)

**HIGH**:

- 다른 탭 동시 편집 — storage 이벤트 미감지, last-write-wins로 데이터 손실 가능. BroadcastChannel 없음.
- 브라우저 뒤로가기 버튼 — popstate 미처리. `use-unsaved-changes.ts`가 Next.js router만 처리, 브라우저 history.back은 미감지. 미저장 변경사항 경고 없이 유실.

**MEDIUM**:

- 노드 수백 개 성능 — `JSON.stringify` 변경감지, 가상화 미설정. fast-hash도 O(n\*k). (`use-auto-save.ts:64`, `fast-hash.ts:24-42`)
- self-loop 엣지 — `isValidConnection` 미설정, `source === target` 검증 없음. (`RoadmapCanvas:70-75`)
- Undo/Redo와 자동저장 충돌 — Undo→500ms 경과→자동저장→크래시 시, 히스토리 복구 불가. 메모리 전용.
- localStorage 용량 초과 시 UI 알림 없음 — console만 출력, 사용자 모름. (`use-auto-save.ts:117-121`)
- 붙여넣기 위치 — 현재 뷰포트 무시, 원본 위치+50,50 오프셋. 화면 밖 생성 가능. (`use-keyboard-shortcuts.ts:229-232`)
- Ctrl+D 복제 시 엣지 미복제 — Ctrl+C/V는 엣지 포함, Ctrl+D는 노드만. 비대칭. (`use-keyboard-shortcuts.ts:257-278`)
- fitView 타이밍 — 마운트 시 1회만, 데이터 로드 후 재실행 미보장. (`RoadmapCanvas:157-158`)

## Roadmap Viewer

### 상태: ⚠️ 이슈 있음

**구조 요약**: ReactFlow 기반 읽기 전용 뷰어. Jotai 상태, localStorage 데이터 로딩, 캔버스/카드 듀얼 뷰, 사이드바, 줌 컨트롤. 컴포넌트 10개, 훅 1개, 스토어 1개.

**발견된 이슈**:

- [HIGH] API 미연동 — localStorage 전용 로딩. MSW에 핸들러 있으나 미사용. (`use-viewer-roadmap-loader.ts:17`)
- [MEDIUM] HeaderMenu 항목 전부 미구현 — "통계", "다크모드", "JSON 가져오기", "버전 보기" 등 onClick 없음.
- [MEDIUM] 내보내기/이미지 저장 전부 빈 함수 — Markdown, PDF, JSON, PNG, JPG, SVG 모두 TODO. (`HeaderExportMenu/index.tsx:7-15`, `HeaderSaveAsImageMenu/index.tsx:7-15`)
- [MEDIUM] HeaderExportMenu, HeaderSaveAsImageMenu가 `return null` — 렌더링 안 하면서 import/export 중. 불필요한 코드.
- [MEDIUM] 하드코딩 hex 색상 다수 — RoadmapHeader, ZoomButtonGroup. 다크모드 불가.
- [LOW] 검색 Input 장식용 — onChange/onSubmit 없음. (`RoadmapHeader/index.tsx:53-56`)
- [LOW] AI 피드백 버튼 미연결 — onAiFeedback prop 미전달. (`RoadmapViewer/index.tsx:56`)
- [LOW] 사이드바 닫으면 재오픈 불가 — 열기 버튼 없음.
- [LOW] 캔버스 `h-[700px]` 고정 — 반응형 미적용.

**미구현/TODO**:

- 내보내기: Markdown, PDF, JSON (TODO 3개)
- 이미지 저장: PNG, JPG, SVG (TODO 3개)
- 메뉴: 통계, 다크모드, JSON 가져오기, 버전 보기
- 검색, AI 학습 피드백
- API 기반 로드맵 로딩

**테스트**: 7개 테스트 파일. RoadmapViewer, ViewerCanvas, ViewerZoomControls, 훅 테스트 누락.

**종합**: 뷰어 기본 골격(캔버스, 노드 선택, 사이드바, 줌) 양호. **메뉴에 표시된 기능 대부분 미구현**, localStorage→API 전환 필요.

### 엣지케이스 (HIGH 1건 / MEDIUM 3건 / LOW 12건)

**HIGH**:

- 사이드바 닫기 후 재오픈 불가 — 열기 버튼 없음. 닫으면 새로고침 전까지 복구 불가. (`RoadmapViewer:89`)

**MEDIUM**:

- 미등록 노드 타입 — 새 노드 타입 추가 시 뷰어에서 기본 노드로 폴백. (`ViewerCanvas:28-32`)
- Zod 스키마 vs TypeScript 타입 불일치 — `roadmap-schema.ts`에서 label/resources optional이나 `JagalchiNodeData`에서는 필수. (`roadmap-schema.ts:14-22`)
- 모바일 레이아웃 미최적화 — 캔버스 `h-[700px]` 고정, 줌 컨트롤 비반응형. (`ViewerCanvas:69`)

**LOW**: localStorage 에러 처리(양호), 손상 JSON 처리(양호), 빈 노드/엣지(양호), 엣지 source/target(ReactFlow 내부 처리), 노드 선택 상태(파생 atom으로 안전), 줌 한계(ReactFlow 기본), 라우팅 전반(양호), XSS 방지(React 이스케이핑)

## 종합 평가

### 피처별 상태 요약

| 피처        | 상태 | UI  | API 연동        | 테스트  | 핵심 문제                                    |
| ----------- | ---- | --- | --------------- | ------- | -------------------------------------------- |
| Auth        | ⚠️   | ✅  | ⚠️ 부분         | ✅ 13개 | 토큰 저장/인증 가드 미구현                   |
| My Roadmaps | ❌   | ✅  | ❌ 전무         | ✅ 11개 | UI 셸만, CRUD/검색/디렉토리 전부 미연결      |
| Community   | ⚠️   | ✅  | ❌ 전무         | ✅ 8개  | 전체 Mock 프로토타입                         |
| Profile     | ⚠️   | ✅  | ❌ 전무         | ✅ 16개 | API 전무, 저장 미구현                        |
| Editor      | ⚠️   | ✅  | ⚠️ localStorage | ✅ 32개 | 핵심 OK, AI/Edge 일부 미구현, DetailNode WIP |
| Viewer      | ⚠️   | ✅  | ⚠️ localStorage | ⚠️ 7개  | 메뉴 기능 대부분 미구현, localStorage 전용   |

### 공통 문제

1. **API 연동 전무** — Auth 일부 제외, 모든 피처가 Mock/localStorage 기반. TanStack Query 거의 미사용.
2. **데이터 모델 분열** — My Roadmaps(`RoadmapData`) vs Editor/Viewer(`Roadmap`) 타입/저장소 분리.
3. **인증 파이프라인 미완성** — 토큰 저장 없음 → 인증 API 요청 불가 → 다른 모든 피처의 사용자 연동 차단.
4. **하드코딩 hex 색상** — 전 피처에 걸쳐 Tailwind semantic 토큰 대신 raw hex 사용. 다크모드 불가.
5. **UI 문자열 하드코딩** — `constants/messages.ts` 컨벤션 미준수 다수.

### 우선순위 제안

1. **Auth 토큰 관리** — 모든 피처의 선결 조건
2. **데이터 모델 통합** — My Roadmaps ↔ Editor/Viewer 간 타입/저장소 통일
3. **My Roadmaps API 연동** — 가장 많은 이슈, 사용자 경험 직결
4. **Community/Profile API 연동** — Mock → 실제 데이터
5. **Editor/Viewer localStorage → API 전환**
6. **UI 정리** — 반응형, 색상 토큰화, 문자열 상수화

### 엣지케이스 집계

| 피처        | HIGH   | MEDIUM | LOW    | 합계    |
| ----------- | ------ | ------ | ------ | ------- |
| Auth        | 10     | 8      | 8      | 26      |
| My Roadmaps | 4      | 5      | 10     | 19      |
| Community   | 5      | 11     | 12     | 28      |
| Profile     | 9      | 7      | 9      | 25      |
| Editor      | 2      | 7      | 11     | 20      |
| Viewer      | 1      | 3      | 12     | 16      |
| **전체**    | **31** | **41** | **62** | **134** |

**엣지케이스 핵심 패턴**:

1. **반응형 전무** — Community, Profile, My Roadmaps 전부 px 고정 너비. 모바일 사용 불가.
2. **토큰/인증 파이프라인 부재** — Auth 토큰 미저장이 모든 피처의 사용자 연동 차단.
3. **데이터 저장 미구현** — Profile 저장, My Roadmaps CRUD 콜백 미연결, Community 좋아요/저장 미동기화.
4. **폼 검증 부족** — Auth username 공백, Profile 빈 이름, 인증코드 이메일 변경 등.
5. **접근성 미비** — ARIA 속성 누락, 키보드 네비게이션 불완전, 스크린리더 미지원 다수.
