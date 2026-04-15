# Jagalchi Client 전체 수동 QA 체크리스트

> 작성일: 2026-04-06
> 테스트 계정: `kim@example.com` / `park@example.com` / `lee@example.com` (비밀번호: `Test1234!`)
> API 명세: `docs/api.md` | Gateway: `:8080` | JWT Bearer + HttpOnly Refresh Cookie

---

## 1. Auth (인증)

### 1-A. 로그인 (`/login`)

**Happy Path**

- [ ] "로그인해서 계속하기" 타이틀 + "이메일 주소를 입력해주세요" 설명 표시
- [ ] 이메일/비밀번호 입력 후 "로그인" 클릭 → `/myroadmap` 리다이렉트
- [ ] 로그인 중 버튼 "로그인 중..." + disabled
- [ ] 비밀번호 눈 아이콘으로 표시/숨김 토글 (aria-label "비밀번호 보기" ↔ "비밀번호 숨기기")
- [ ] "비밀번호를 잊어버렸나요?" → `/find-password`
- [ ] 하단 "아직 계정이 없나요? 회원가입" → `/register`

**Validation**

- [ ] 이메일 빈칸 → "이메일을 입력해주세요"
- [ ] 잘못된 이메일 형식 (예: "abc") → "올바른 이메일 형식이 아닙니다"
- [ ] 비밀번호 빈칸 → "비밀번호를 입력해주세요"
- [ ] 잘못된 자격증명 → root 에러 메시지 표시

**엣지케이스 (from review)**

- [ ] [HIGH] 토큰 저장/관리 미구현 — 로그인 성공 시 token 미저장, Authorization 헤더 없음
- [ ] [HIGH] 로그인 상태에서 `/login` 접근 허용 — 인증 가드/redirect 없음
- [ ] [HIGH] brute force 방어 없음 — 실패 횟수 추적 없음, CAPTCHA 없음
- [ ] [MEDIUM] auth API에 signal/timeout 미전달
- [ ] [MEDIUM] 더블 클릭 시 중복 요청 가능 — 버튼 disabled 타이밍

**API 스펙 대조** (`POST /users/auth/login`)

- [ ] Request: `{ email, password }` → Response: `{ accessToken }` + HttpOnly refresh cookie
- [ ] 401 UNAUTHORIZED 에러 시 적절한 메시지 표시
- [ ] accessToken을 저장하고 이후 API 요청에 `Authorization: Bearer <token>` 포함하는지
- [ ] refresh token cookie가 설정되는지 (HttpOnly)

**미구현**

- [ ] Google 로그인 버튼 (TODO: OAuth)
- [ ] GitHub 로그인 버튼 (TODO: OAuth)
- [ ] 토큰 기반 인증 상태 관리 (Jotai atom)
- [ ] 로그아웃 기능
- [ ] `PATCH /users/auth/refresh` — 토큰 갱신 플로우

---

### 1-B. 회원가입 (`/register`) — 3단계

**Step 1: 이메일/비밀번호/인증**

- [ ] "회원가입" 타이틀 + "회원가입할 이메일 정보를 입력해주세요" 설명
- [ ] "인증번호 전송" 클릭 → "전송 중..." → 성공 후 인증번호 필드 활성화
- [ ] 전송 전 인증번호 필드 disabled, 라벨 text-muted-foreground
- [ ] 전송 후 "재전송" 버튼 표시 (aria-label="인증번호 재전송")
- [ ] 전송 후 주 버튼 "인증번호 전송" → "다음"으로 변경
- [ ] 비밀번호 토글 아이콘 동작
- [ ] 이메일+비밀번호+인증번호 입력 후 "다음" → Step 2

**Step 1 Validation**

- [ ] 이메일 빈칸 → "이메일을 입력해주세요"
- [ ] 잘못된 이메일 형식 → "올바른 이메일 형식이 아닙니다"
- [ ] 비밀번호 빈칸 → "비밀번호를 입력해주세요"
- [ ] 비밀번호 8자 미만 → "8자 이상 영문, 숫자, 기호를 포함해야 합니다"
- [ ] 비밀번호에 영문 없음 (예: "12345678!") → 동일 에러
- [ ] 비밀번호에 숫자 없음 (예: "abcdefgh!") → 동일 에러
- [ ] 비밀번호에 기호 없음 (예: "abcdefg1") → 동일 에러
- [ ] 인증번호 빈칸 → "인증번호를 입력해주세요"

**Step 1 엣지케이스 (from review)**

- [ ] [HIGH] 인증코드 전송 시 이메일 유효성 미검증 — Zod 검증 트리거 안 됨
- [ ] [HIGH] 코드 전송 후 이메일 변경 가능 — `isCodeSent=true`여도 이메일 필드 활성
- [ ] [HIGH] 인증코드 만료 시간 미표시/미관리 — 서버 `expiresIn: 300` 반환하나 미사용
- [ ] [HIGH] 인증코드 brute force 제한 없음 — 시도 횟수 무제한
- [ ] [MEDIUM] 코드 재전송 시 이전 코드 입력값 미초기화
- [ ] [MEDIUM] 비밀번호 최대 길이 제한 없음 — `.max()` 미적용
- [ ] [MEDIUM] "다음" 버튼 disabled 미적용 — 더블 클릭 가능

**Step 1 API 스펙 대조**

- [ ] `POST /users/verification` — `{ email }` → 200 OK
- [ ] `PATCH /users/verification` — `{ email, code }` → 200 OK or 400 VALIDATION_FAILED

**Step 2: 사용자 이름**

- [ ] 카드 타이틀 "사용자 이름 설정", 설명 "사용자 이름을 입력해주세요"
- [ ] 하단 로그인 링크 footer 사라짐
- [ ] 이름 입력 후 "확인" → Step 3
- [ ] 이름 빈칸 → "이름을 입력해주세요"
- [ ] [HIGH] username 공백만 입력(`"   "`) 통과 — `.trim()` 미적용

**Step 3: 프로필 링크 (선택)**

- [ ] 카드 타이틀 "사용자 프로필 링크 추가"
- [ ] 3개 링크 필드 (이름 + URL 쌍)
- [ ] "확인" → 회원가입 완료 → `/myroadmap` 리다이렉트
- [ ] "건너뛰기" → 링크 없이 완료 → `/myroadmap` 리다이렉트
- [ ] 잘못된 URL 형식 → "올바른 URL 형식이 아닙니다"
- [ ] URL 빈칸은 허용 (optional)

**회원가입 전체 엣지케이스 (from review)**

- [ ] [HIGH] 회원가입 실패 시 에러 미표시 — onError 없음 (이메일 중복 409 등)
- [ ] [MEDIUM] 서버 전송 시 sanitize 없음
- [ ] [MEDIUM] 브라우저 뒤로가기 시 step 관리 안 됨 — 히스토리 미연동
- [ ] [MEDIUM] 새로고침 시 회원가입 상태 소실 — beforeunload 경고 없음
- [ ] [MEDIUM] step 역순 이동 불가 — "뒤로" 버튼 없음

**회원가입 API 스펙 대조** (`POST /users`)

- [ ] Request: `{ email, name, password }` → Response 201: `{ id, email, name }`
- [ ] 400 INVALID_INPUT 에러 처리
- [ ] 이메일 중복 시 적절한 에러 메시지

**미구현**

- [ ] Google 회원가입 (TODO)
- [ ] GitHub 회원가입 (TODO)
- [ ] 인증 코드 만료 타이머 UI

---

### 1-C. 비밀번호 찾기 (`/find-password`) — 2단계

**Step 1: 이메일 인증**

- [ ] "이메일 인증" 타이틀 + "비밀번호를 재설정할 이메일을 입력해주세요"
- [ ] "인증번호 전송" → 인증번호 필드 활성화 → "재전송" 표시
- [ ] 버튼 "인증번호 전송" → "다음"으로 변경
- [ ] "로그인하기" 링크 → `/login`
- [ ] 이메일 빈칸 → "이메일을 입력해주세요"
- [ ] 잘못된 이메일 → "올바른 이메일 형식이 아닙니다"
- [ ] 잘못된 인증번호 → verificationCode 필드 에러

**Step 1 API 스펙 대조**

- [ ] `PATCH /users/auth/password-reset` — `{ email }` → 200
- [ ] `PATCH /users/auth/password-reset/verify` — `{ email, code }` → 200 or 400

**Step 2: 새 비밀번호**

- [ ] 카드 타이틀 "새 비밀번호 입력", 설명 "재설정할 비밀번호를 입력해주세요"
- [ ] 새 비밀번호 + 비밀번호 확인 (둘 다 토글 가능)
- [ ] "완료" → "처리 중..." → `/login` 리다이렉트
- [ ] 비밀번호 규칙 위반 → "8자 이상 영문, 숫자, 기호를 포함해야 합니다"
- [ ] 비밀번호 확인 불일치 → "비밀번호가 일치하지 않습니다"
- [ ] 비밀번호 확인 빈칸 → "비밀번호 확인을 입력해주세요"

**Step 2 API 스펙 대조**

- [ ] 비밀번호 변경 API: `ChangePasswordRequest { email, newPassword }` 호출 확인

---

## 2. My Roadmaps (내 로드맵) (`/myroadmap`)

### 2-A. 레이아웃 & 사이드바

- [ ] `/` 접속 → `/myroadmap` 리다이렉트
- [ ] 사이드바(240px) + 메인 콘텐츠 2패널 레이아웃
- [ ] 사이드바: 아바타 + "UserName" + 이메일 + ChevronDown
- [ ] 사이드바 검색 필드 표시
- [ ] 카테고리 5개: "최근" / "커뮤니티" / "내 로드맵" / "공유된 로드맵" / "즐겨찾기"
- [ ] 기본 활성: "내 로드맵" (bg-[#e2e8f0])
- [ ] "최근" → 전체 표시
- [ ] "커뮤니티" → category='community' 필터
- [ ] "내 로드맵" → category='my-roadmap' 필터
- [ ] "공유된 로드맵" → isShared=true 필터
- [ ] "즐겨찾기" → isFavorite=true 필터

### 2-B. 헤더 & 툴바

- [ ] "내 로드맵" 대제목 + "User's 로드맵" 서브텍스트
- [ ] 브레드크럼: 기본 "내 전체 로드맵"
- [ ] 검색 필드 (placeholder: "로드맵 검색")
- [ ] 필터 버튼(ListFilter) → 드롭다운
- [ ] 드롭다운 바깥 클릭 → 닫힘
- [ ] 정렬순서: 내림차순(기본) / 오름차순
- [ ] 정렬기준: 글자순 / 최신순(기본) / 크기순
- [ ] 필터링: 전체(기본) / 로드맵 / 디렉토리
- [ ] 필터 변경 → 그리드 즉시 반영
- [ ] "New" 버튼(Plus) → "로드맵" / "디렉토리" 드롭다운

### 2-C. 그리드

- [ ] 반응형: 1열(sm) / 2열(md) / 3열(lg)
- [ ] 카드: 썸네일(이미지 or SquareDashed 아이콘) + 제목 + 서브텍스트
- [ ] 카드 더보기(⋯) → 컨텍스트 메뉴
- [ ] 로드맵: 즐겨찾기 / 이름수정 / 파일이동 / 삭제
- [ ] 디렉토리: 이름수정 / 파일이동 / 삭제 (즐겨찾기 없음)
- [ ] 메뉴 클릭 시 이벤트 전파 차단

### 2-D. 로드맵 추가 모달

- [ ] "New" > "로드맵" → 모달 오픈
- [ ] "로드맵 추가" 타이틀, 이름 입력 (placeholder: "로드맵 이름을 입력하세요")
- [ ] 이름 빈칸 → "확인" disabled
- [ ] 이름 입력 → "확인" → 목록 맨 앞에 추가 + `/editor/{id}` 이동
- [ ] "취소" → 닫힘 + 입력 초기화
- [ ] "자세히 설정하기" → 위치 선택 모달

### 2-E. 디렉토리 추가 모달

- [ ] "New" > "디렉토리" → 모달 오픈
- [ ] "디렉토리 추가" 타이틀 (placeholder: "디렉토리 이름을 입력하세요")
- [ ] 이름 빈칸 → "확인" disabled
- [ ] 이름 입력 → "확인" → 목록 맨 앞에 추가 (에디터 이동 없음)
- [ ] "취소" → 닫힘

### 2-F. 위치 선택 모달

- [ ] "위치선택" 타이틀 + 검색 필드 (placeholder: "Search")
- [ ] 트리 구조: Team > Directory 계층
- [ ] 항목 클릭 → 선택 (bg-[#0f172a], 흰색 텍스트)
- [ ] 미선택 시 "확인" disabled (bg-[#81868f])
- [ ] 검색 → 이름 기준 필터링 (대소문자 무시)
- [ ] "취소" → 선택 초기화 + 닫힘

### 2-G. 브레드크럼

- [ ] 디렉토리 진입 시 "내 전체 로드맵 > 디렉토리명" 표시
- [ ] 마지막 세그먼트 파란색(text-blue-700)
- [ ] "내 전체 로드맵" 클릭 → 루트로 이동
- [ ] 중간 세그먼트 클릭 → 해당 위치까지

### 2-H. 엣지케이스 (from review)

**HIGH**

- [ ] 카드 클릭으로 로드맵 열기 불가 — onClick/href 없음, id 미전달
- [ ] 데이터 모델 분리 — `RoadmapData` vs `Roadmap` 타입 완전 별개, 에디터/뷰어와 불일치
- [ ] MSW 핸들러 미사용 — fetch/TanStack Query 없이 순수 atomWithStorage만
- [ ] 스켈레톤 멈춤 — `handleAddRoadmap`이 `jagalchi-my-roadmaps`에 저장, 에디터는 `jagalchi-roadmaps`에서 로딩 (저장소 분리)
- [ ] 삭제 확인 다이얼로그 없음 — 향후 연결 시 즉시 삭제 위험
- [ ] 로드맵 생성 후 에디터 데이터 동기화 없음

**MEDIUM**

- [ ] 반응형 깨짐 — `RoadmapCard` `w-[304px]` 고정 너비, `px-20` 패딩 압박
- [ ] 빈 상태(empty state) UI 없음 — 0개 결과 시 빈 그리드만
- [ ] 대량 데이터 가상화/페이지네이션 없음
- [ ] localStorage JSON 스키마 검증 없음
- [ ] 모달 중첩 시 부모 모달 의도치 않은 닫힘
- [ ] RoadmapCard 키보드 접근성 — div 기반, tabIndex/role/onKeyDown 없음
- [ ] atomWithStorage SSR 하이드레이션 잠재 이슈
- [ ] 하드코딩 hex 색상 다수
- [ ] breadcrumb dead code — 디렉토리 진입 없어 항상 빈 배열
- [ ] 디렉토리 무시 — `_locationId` 언더스코어, `RoadmapData`에 `parentId` 없음
- [ ] 공유 로드맵 헤더 `내 로드맵` 하드코딩 — 카테고리 변경해도 불변

**미구현**

- [ ] 사이드바 검색 필터링 미연결
- [ ] 카드 컨텍스트 메뉴 액션 (즐겨찾기/이름수정/이동/삭제) 미연결
- [ ] 사이드바 프로필 ChevronDown 드롭다운
- [ ] 브레드크럼 디렉토리 진입 트리거 미연결
- [ ] 서버 API 연동 전체
- [ ] 사용자 정보 연동

---

## 3. Community (커뮤니티)

### 3-A. 목록 (`/community`)

**Happy Path**

- [ ] 헤더: 뒤로가기(router.back()) + 오른쪽 "UserName" + 아바타
- [ ] 히어로: "어떤 로드맵을 찾고있나요?" + 검색바 (placeholder: "Type a roadmap name to find...")
- [ ] 검색바 Enter 또는 화살표 버튼 → searchQuery atom 업데이트 → 그리드 필터링
- [ ] 탭: "인기"(기본) / "최신" / "저장된 로드맵" — 선택 시 primary 배경
- [ ] 정렬 드롭다운(기본 "내림차순") → 3열 필터 패널
- [ ] 필터 패널 바깥 클릭 → 닫힘
- [ ] 3열 그리드 카드: 썸네일 + 제목 + "By 작자명"
- [ ] 카드 클릭 → `/community/{id}`

**Edge Cases (from review)**

- [ ] 검색 결과 없음 → "검색 결과가 없습니다." (border-dashed 영역)
- [ ] localQuery는 Enter/버튼 클릭 전까지 atom 미반영

**HIGH**

- [ ] 반응형 그리드 고정 — `grid-cols-3` breakpoint 없음, 모바일 카드 잘림
- [ ] 카드 고정 크기 — `h-[200px] w-[304px]`, 작은 화면 overflow
- [ ] 검색바 고정 너비 — `w-[640px]`, 모바일 화면 넘침
- [ ] 상세 페이지 고정 너비 — `w-[696px]`, `w-[134px]`, 모바일 가로 스크롤
- [ ] 필터 상태-URL 동기화 없음 — 공유/북마크 불가, 새로고침 시 초기화
- [ ] 전체가 Mock 데이터 기반 — API 호출 전무, MSW 핸들러도 없음
- [ ] About 섹션 하드코딩 — 모든 상세페이지에 동일 텍스트

**MEDIUM**

- [ ] 빈 상태 메시지 미분류 — 검색 vs 필터 구분 없이 동일 메시지
- [ ] 상세 제목 overflow — `truncate`/`line-clamp` 없음
- [ ] 카드/상세 이미지 로딩 실패 — `onError` 핸들러 없음
- [ ] 404 미반환 — 존재하지 않는 ID에 200 응답, `notFound()` 미호출
- [ ] error.tsx/not-found.tsx 부재
- [ ] 좋아요 카운트 미변경 — 하트 토글해도 숫자 불변
- [ ] 키보드 드롭다운/탭 ARIA/검색 label/좋아요 aria — 접근성 미비 다수
- [ ] CommunityHeader 사용자 정보 하드코딩 ("UserName" + 빈 아바타)
- [ ] ContributorItem, "마지막 업데이트" 등 다수 하드코딩
- [ ] 페이지네이션/무한 스크롤 없음

### 3-B. 상세 (`/community/[id]`)

**Happy Path**

- [ ] 뒤로가기 + 헤더
- [ ] 히어로 이미지 영역 (400px)
- [ ] 로드맵 타이틀 + 좋아요 수 + 하트 버튼
- [ ] 하트 클릭 → 빨간색 채워진 하트로 토글
- [ ] "로드맵 보기" → `/viewer/{id}`
- [ ] "내 로드맵에 추가" → alert("로그인 후 이용 가능합니다")
- [ ] About 섹션 (설명 텍스트)
- [ ] Made by 사이드바 (작성자 + Co-author + Contributor)
- [ ] "마지막 업데이트: 2달 전"
- [ ] 존재하지 않는 id → "로드맵을 찾을 수 없습니다."

**미구현**

- [ ] 좋아요 서버 연동 (로컬 state만, 새로고침 시 리셋)
- [ ] "내 로드맵에 추가" 실제 기능
- [ ] "저장된 로드맵" 탭 실데이터
- [ ] API 연동 (목록/상세 조회)
- [ ] MSW 핸들러
- [ ] 로그인 상태 연동
- [ ] Contributor 목록 API

---

## 4. Profile (프로필) (`/profile`)

### 4-A. 조회 모드 (기본)

- [ ] 헤더: "프로필" + 뒤로가기(ArrowLeft), 오른쪽 "User" + Pencil
- [ ] ProfileHeader: 아바타(128x128) + 이름 + 이메일 + 팔로워/팔로잉
- [ ] 팔로워 수 포맷: 3000 → "3k"
- [ ] "편집하기" 버튼 (outline)
- [ ] 바이오: "자기소개" 카드, 3줄까지 표시 (line-clamp-3)
- [ ] 바이오 3줄 초과 → "전체 보기" 클릭 → 확장 → "접기" (aria-expanded)
- [ ] 바이오 비어있음 → "자기소개가 없습니다." (text-muted-foreground/50)
- [ ] 소속: Building2 아이콘 + 소속명 (비어있으면 렌더링 안됨)
- [ ] 링크: 클릭 → 새 탭 열림 (ArrowUpRight 아이콘, 비어있으면 렌더링 안됨)
- [ ] 기여 그래프: "N일 연속 스트릭", 셀 hover → title "날짜: N contributions"
- [ ] 완주한 로드맵 / 진행중인 로드맵: ScrollArea 스크롤
- [ ] 만든 로드맵: 3열 그리드

### 4-B. 편집 모드

- [ ] "편집하기" 클릭 → 전체 편집 모드 전환 (profileModeAtom = 'edit')
- [ ] 아바타 편집 아이콘(Pencil) → 파일 선택 (accept="image/\*") → 이미지 즉시 반영
- [ ] 이름/이메일 → Input으로 변경, 직접 편집
- [ ] "취소" → 원래 값 reset + 조회 모드 복귀
- [ ] "저장" → 조회 모드 복귀
- [ ] 바이오 → Textarea (280px, 리사이즈 불가)
- [ ] 소속 → Input (placeholder: "소속을 입력해주세요")
- [ ] 링크: 이름(120px) + URL Input + 삭제(Trash2) 버튼
- [ ] "링크추가(N/5)" → 빈 링크 행 추가
- [ ] 5개 도달 → "링크추가(5/5)" disabled
- [ ] 링크 삭제 버튼 → 해당 링크 제거
- [ ] 만든 로드맵 영역 "공개 로드맵 추가" 버튼

### 4-C. 공개 로드맵 추가 모달

- [ ] "로드맵 선택" 타이틀
- [ ] 폴더 트리 — 클릭으로 접기/펼치기
- [ ] 파일 클릭 → 선택 (ring-1 ring-indigo-500, bg-indigo-50)
- [ ] 선택된 파일 재클릭 → 선택 해제
- [ ] 검색 → 파일 이름 필터링 + 매칭 폴더 자동 펼침
- [ ] 검색 결과 없음 → "검색 결과가 없습니다."
- [ ] 파일 미선택 → "확인" disabled
- [ ] "확인" → onConfirm + 닫힘
- [ ] "취소" → 선택/검색 초기화 + 닫힘

### 4-D. 엣지케이스 (from review)

**HIGH**

- [ ] API 연동 전무 — useQuery/useMutation/fetch 없음, MSW도 501 stub
- [ ] 빈 이름/이메일 제출 가능 — `required`/validation 없음
- [ ] Bio 편집 취소 미복원 — "취소"가 name/email만 reset, bio 변경은 그대로
- [ ] Organization/Links 편집 취소 미복원 — 취소 메커니즘 없음
- [ ] 이미지 파일 크기 무제한 — 수백MB 허용
- [ ] base64 변환 성능 — 대용량 이미지 메모리 급증, Jotai atom에 거대 base64
- [ ] 타임존 불일치 — `getLastYearDates()` 로컬 vs `GenerateMockContributions()` UTC
- [ ] 반응형 — Bio `w-[500px] shrink-0` 고정, 500px 미만 깨짐
- [ ] edit 모드 페이지 이동 경고 없음 — `beforeunload` 없음
- [ ] 전역 모드 atom 취소 불완전 — "취소"가 name/email만 reset, bio/org/links 남음
- [ ] 동시 편집 일괄 저장 없음 — 각 컴포넌트 독립 useForm

**MEDIUM**

- [ ] 파일 형식 우회 — `accept="image/*"`는 클라이언트 힌트뿐
- [ ] FileReader 에러 핸들링 없음 — `reader.onerror` 미설정
- [ ] 이미지 atom persistence 없음 — 새로고침 시 업로드 이미지 유실
- [ ] 긴 이름 overflow — `truncate` 없음
- [ ] 로드맵 카드/리스트 0개 empty state 없음
- [ ] ContributionGraph 접근성 — 셀이 div, role/aria-label 없음
- [ ] Bio 변경사항 부모 전파 안 됨 — onChange prop 미전달
- [ ] 프로필 이미지 서버 업로드 없음 — 새로고침 유실

**API 스펙 대조**

- [ ] `GET /users?name={name}` — 프로필 조회 (user + streak 포함)
- [ ] `PATCH /users/profile` — `{ user: { profileImage, bio, externalLinks } }` → 200
- [ ] `PATCH /users/{name}/follow` — `{ toggle: true }` → 팔로우 토글
- [ ] `GET /users/{name}/followers` — 팔로워 목록
- [ ] `GET /users/{name}/followings` — 팔로잉 목록
- [ ] `DELETE /users` — 계정 삭제 (Auth required)

**미구현**

- [ ] 프로필 편집 저장 API (setMode만 호출)
- [ ] 실제 사용자 데이터 API (MOCK_USER_DATA 하드코딩)
- [ ] 팔로우/언팔로우 기능
- [ ] 다른 유저 프로필 조회 라우팅

---

## 5. Roadmap Editor (에디터) (`/editor/[id]`)

### 5-A. 페이지 로딩

- [ ] 로딩 중 → LoadingSkeleton 표시
- [ ] 로드맵 데이터 로드 실패 → ErrorFallback + "재시도" 버튼
- [ ] 정상 로드 → EditorHeader + Canvas + Sidebar + Toolbar

### 5-B. EditorHeader

- [ ] 뒤로가기(ChevronLeft) + 로드맵 타이틀 + "(수정중)" + 더보기(Ellipsis)
- [ ] 뒤로가기 클릭 → 미저장 변경 있으면 UnsavedChangesDialog, 없으면 `/myroadmap`
- [ ] "Readme 수정" 버튼 표시

### 5-C. 캔버스 — 노드 CRUD

- [ ] "노드 추가"(SquarePlus) → 캔버스 중앙에 새 노드 (label: "새 노드", variant: "white")
- [ ] "섹션 추가"(Frame) → 캔버스 중앙에 새 섹션
- [ ] "텍스트 추가"(Type) → 캔버스 중앙에 새 텍스트
- [ ] 노드 드래그 이동 (16x16 그리드 스냅)
- [ ] 노드 선택 시 상하좌우 PlusButtonHandle(+) 표시
- [ ] (+) 클릭 → 해당 방향에 새 노드 생성 (100px 오프셋, 부모 컬러 상속)
- [ ] 섹션 선택 시 NodeResizer 핸들 (최소 200x200)

### 5-D. 캔버스 — 엣지

- [ ] Handle → Handle 드래그 → smoothstep 엣지 생성
- [ ] Handle → 빈 공간 드래그 → 새 노드 자동 생성 + 엣지 연결
- [ ] ConnectionMode.Loose (노드 본체에도 연결 가능)

### 5-E. 캔버스 — 선택 & 줌

- [ ] 노드 클릭 → 단일 선택 → 사이드바 속성 패널
- [ ] Shift+클릭 → 다중 선택
- [ ] 다중 선택(2+) → MultiSelectPanel
- [ ] 빈 영역 클릭 → 선택 해제
- [ ] 마우스 휠 → 줌
- [ ] 중/우 클릭 드래그 → 패닝
- [ ] fitView (초기 로드 시 전체 노드 보이도록)

### 5-F. 키보드 단축키

- [ ] Delete/Backspace → 선택 노드/엣지 삭제 (연결 엣지도 함께)
- [ ] Ctrl+Z → Undo (최대 100단계)
- [ ] Ctrl+Shift+Z → Redo
- [ ] Ctrl+A → 전체 선택
- [ ] Ctrl+C → 선택 노드 + 관련 엣지 localStorage 클립보드에 복사
- [ ] Ctrl+V → 붙여넣기 (새 ID, +50,+50 오프셋, Zod 검증)
- [ ] Ctrl+D → 선택 노드 복제 (+50,+50 오프셋)
- [ ] ESC → 선택 해제
- [ ] **Input/Textarea 포커스 시 모든 단축키 무시**

### 5-G. 속성 패널 (EditorSidebar)

**공통**

- [ ] 빈 상태: "노드를 선택하세요"
- [ ] 접기/펼치기 버튼 (ChevronsRight/ChevronsLeft) → w-0 ↔ w-240px

**NodePropertiesPanel (jagalchi-node)**

- [ ] 헤더: 노드 이름 + "노드" + Lock 토글
- [ ] Lock 활성화 → 모든 입력 disabled
- [ ] "노드 이름" Input → 캔버스 label 실시간 반영
- [ ] "노드 설명" Textarea → description 반영
- [ ] "AI 생성" 텍스트 (미연결)
- [ ] 기본 컬러: 프리셋 스와치 + "커스텀" → ColorPicker
- [ ] 프리셋 클릭 → variant 즉시 변경
- [ ] 첨부 자료: URL 3슬롯 (validation + XSS 방지)
- [ ] "AI 추천" 텍스트 (미연결)

**SectionPropertiesPanel (jagalchi-section)**

- [ ] "섹션 이름" Input → title 반영
- [ ] 크기 W/H (disabled, 미구현)
- [ ] 기본 컬러 프리셋

**TextPropertiesPanel (jagalchi-text)**

- [ ] 텍스트 크기 (disabled, 미구현)
- [ ] 텍스트 컬러 프리셋

**EdgePropertiesPanel (엣지)**

- [ ] 라벨 Input (disabled, 미구현)
- [ ] 라인 스타일: 실선 / 점선("5 5") / 꼬인선(dotted)
- [ ] 화살표 방향 2버튼 (disabled, 미구현)
- [ ] 두께 Input (disabled, 미구현)
- [ ] 기본 컬러 프리셋 → stroke 색상 변경

**MultiSelectPanel (2+ 선택)**

- [ ] "다중 선택" 헤더 + 선택 수
- [ ] 정렬: 좌/중/우, 상/중/하
- [ ] Spacing (disabled, "Mixed")
- [ ] Name/Description (disabled, "Mixed")
- [ ] 컬러 → 선택된 전체 노드/섹션에 일괄 적용

### 5-H. 자동 저장

- [ ] 노드/엣지/타이틀 변경 → 500ms 디바운스 → localStorage 저장
- [ ] key: 'jagalchi-roadmaps', Zod 스키마 검증
- [ ] 변경 없으면 저장 스킵 (JSON.stringify 비교)
- [ ] 새로고침 후 데이터 복원 확인
- [ ] localStorage 90% 이상 시 console.warn

### 5-I. 미저장 변경사항 다이얼로그

- [ ] 뒤로가기 시 변경사항 있으면 다이얼로그 표시
- [ ] "저장하지 않은 변경사항이 있습니다" 타이틀
- [ ] "계속 편집" → 다이얼로그 닫힘, 에디터 유지
- [ ] "저장하지 않고 나가기" → 저장 없이 이동
- [ ] "저장하고 나가기" → 저장 후 이동

### 5-J. AI 기능

**AI 메뉴**

- [ ] Sparkles + ChevronDown → 드롭다운
- [ ] "로드맵 생성" → RoadmapAiModal (generate)
- [ ] "로드맵 수정" → RoadmapAiModal (modify)

**로드맵 생성 모달**

- [ ] "AI 로드맵 생성" 타이틀
- [ ] Textarea (placeholder: "어떤 로드맵을 만들고 싶으신가요?")
- [ ] 빈 프롬프트 → "생성" disabled
- [ ] "생성" → 로딩 + "AI가 작업 중입니다..." → 2초 후 닫힘
- [ ] "취소" → 닫힘

**로드맵 수정 모달**

- [ ] "AI 로드맵 수정" 타이틀
- [ ] Textarea (placeholder: "로드맵을 어떻게 수정하고 싶으신가요?")
- [ ] 동작은 생성 모달과 동일

**자료 추천 모달**

- [ ] "AI 자료 추천" 타이틀
- [ ] 초기: "추천할 자료가 없습니다" + "추천받기" 버튼
- [ ] "추천받기" → 로딩 → 목 데이터 3건
- [ ] 자료 카드 클릭 → 새 탭 (target="\_blank", rel="noopener noreferrer")
- [ ] "닫기" → 닫힘

### 5-K. ColorPicker 모달

- [ ] "커스텀" 버튼 → ColorPicker 오픈
- [ ] react-colorful HexColorPicker 표시
- [ ] 색상 미리보기 (8x8 사각형 + hex 코드)
- [ ] "적용" → 닫힘 (커스텀 색상 적용은 미구현)
- [ ] "취소" → 닫힘

### 5-L. 엣지케이스 (from review)

**HIGH**

- [ ] DetailNode가 존재하지 않는 `createDetailNode` import — 빌드 에러 가능
- [ ] DetailNodeBase untracked — nodeTypes에 미등록
- [ ] 다른 탭 동시 편집 — storage 이벤트 미감지, last-write-wins 데이터 손실
- [ ] 브라우저 뒤로가기 버튼 — popstate 미처리, 미저장 변경사항 무경고 유실

**MEDIUM**

- [ ] 노드 수백 개 성능 — `JSON.stringify` 변경감지, 가상화 미설정
- [ ] self-loop 엣지 — `isValidConnection` 미설정, `source === target` 검증 없음
- [ ] Undo/Redo와 자동저장 충돌 — Undo→디바운스→자동저장→크래시 시 히스토리 복구 불가
- [ ] localStorage 용량 초과 시 UI 알림 없음 — console만
- [ ] 붙여넣기 위치 — 뷰포트 무시, 원본+50,50 오프셋으로 화면 밖 생성 가능
- [ ] Ctrl+D 복제 시 엣지 미복제 — Ctrl+C/V는 엣지 포함, Ctrl+D는 노드만 (비대칭)
- [ ] fitView 타이밍 — 마운트 시 1회만, 데이터 로드 후 재실행 미보장
- [ ] MSW 핸들러와 에디터 불일치 — 에디터는 localStorage만
- [ ] Line tool 미구현 — `setActiveTool('line')`만

**API 스펙 대조** (향후 전환 대상)

- [ ] WebSocket STOMP `/ws` 연결 + `X-User-ID`, `X-User-Role` 헤더
- [ ] `SUBSCRIBE /user/queue/ack` — ACK/NACK 수신
- [ ] `SUBSCRIBE /topic/roadmap/{id}/state` — 실시간 이벤트 수신
- [ ] `SEND /app/roadmap/{id}/action` — CREATE/EDIT/DELETE/UNDO/REDO Action 전송
- [ ] `GET /api/roadmap/{id}/events?since={seq}` — 이벤트 히스토리 조회
- [ ] 커서 추적: `SEND /app/roadmap/{id}/cursor` + `SUBSCRIBE /topic/roadmap/{id}/cursors`

**미구현**

- [ ] ColorPicker 커스텀 색상 실제 적용
- [ ] 엣지 라벨/화살표/두께 편집
- [ ] 섹션 크기(W/H) 편집
- [ ] 텍스트 크기 편집
- [ ] "Readme 수정" 기능
- [ ] 더보기(Ellipsis) 메뉴
- [ ] "선 추가" 도구 (Phase 2)
- [ ] localStorage → WebSocket STOMP 전환
- [ ] 실시간 협업 (커서 추적)

---

## 6. Roadmap Viewer (뷰어) (`/viewer/[id]`)

### 6-A. 페이지 로딩

- [ ] 로딩 → "로드맵을 불러오는 중..."
- [ ] 에러 → "로드맵을 찾을 수 없습니다" (text-destructive)

### 6-B. 헤더

- [ ] 뒤로가기(router.back()) + 로드맵 타이틀 + ChevronDown
- [ ] 중앙: 아바타 (Fallback "U")
- [ ] 검색 (placeholder: "로드맵 안에서 검색")
- [ ] "AI 학습 피드백" 버튼 (Sparkles)

### 6-C. 뷰 모드 전환

- [ ] "캔버스"(Map) / "카드"(LayoutGrid) 전환 버튼
- [ ] 캔버스 모드에서만 줌 컨트롤 표시

### 6-D. 캔버스 모드

- [ ] 읽기 전용: 이동 불가(nodesDraggable=false), 연결 불가(nodesConnectable=false)
- [ ] 선택만 가능 → 사이드바에 상세 표시
- [ ] Background 그리드 (gap=16)
- [ ] fitView + snapToGrid(16x16)
- [ ] 패닝/줌 가능

### 6-E. 카드 모드

- [ ] jagalchi-node만 순번(1,2,3...) + label + description 리스트
- [ ] "보기" 버튼 → selectedViewerNodeIdAtom 설정
- [ ] 노드 없으면 "노드가 없습니다"

### 6-F. 사이드바 (ViewerSidebar)

- [ ] "노드 목록" 타이틀 + 닫기(X)
- [ ] 검색 (placeholder: "노드 검색") → label 기준 대소문자 무시 필터링
- [ ] 검색 결과 없음 → "노드가 없습니다"
- [ ] 노드 클릭 → 선택(bg-accent) + 하단 상세 (설명 + 첨부 URL)
- [ ] 첨부 URL → 새 탭 오픈
- [ ] 하단: "총 N개 노드"

### 6-G. 줌 컨트롤

- [ ] 줌 인(+) / 줌 아웃(-) / fitView(Maximize, aria-label "화면 맞춤")
- [ ] 현재 줌 레벨 % 표시

### 6-H. 설정 메뉴 (HeaderMenu)

- [ ] Settings 아이콘 → 드롭다운
- [ ] "로드맵 통계" (미구현)
- [ ] "내보내기" → PNG/JPG/SVG/PDF/Markdown/JSON (모두 미구현)
- [ ] "JSON으로 가져오기" (미구현)
- [ ] "다크모드 전환" (미구현)
- [ ] "버전 보기" (미구현)

### 6-I. 엣지케이스 (from review)

**HIGH**

- [ ] 사이드바 닫기 후 재오픈 불가 — 열기 버튼 없음, 새로고침 전까지 복구 불가

**MEDIUM**

- [ ] 미등록 노드 타입 — 새 타입 추가 시 기본 노드로 폴백
- [ ] Zod 스키마 vs TypeScript 타입 불일치 — label/resources optional vs 필수
- [ ] 모바일 레이아웃 — 캔버스 `h-[700px]` 고정, 줌 컨트롤 비반응형
- [ ] API 미연동 — localStorage 전용, MSW 핸들러 미사용
- [ ] HeaderExportMenu, HeaderSaveAsImageMenu `return null` — 불필요 코드
- [ ] 하드코딩 hex 색상 다수 — 다크모드 불가

**API 스펙 대조** (향후 전환 대상)

- [ ] `GET /api/roadmap/{id}/events?since=0` — 전체 이벤트로 로드맵 복원
- [ ] WebSocket STOMP 구독으로 실시간 업데이트 반영

**미구현**

- [ ] 내보내기 전체 (PNG/JPG/SVG/PDF/Markdown/JSON)
- [ ] JSON 가져오기, 다크모드, 통계, 버전
- [ ] 헤더 검색 기능
- [ ] AI 학습 피드백 (onAiFeedback 미연결)
- [ ] 타이틀 ChevronDown 드롭다운
- [ ] localStorage → API 전환

---

## 7. 미구현 기능 종합

| 피처        | 항목                                           | 상태                    |
| ----------- | ---------------------------------------------- | ----------------------- |
| Auth        | Google/GitHub OAuth                            | 핸들러 빈 함수          |
| Auth        | 토큰 저장/인증 상태 관리                       | 완전 미구현             |
| Auth        | 인증 가드/미들웨어                             | middleware.ts 없음      |
| Auth        | 로그아웃                                       | 미구현                  |
| Auth        | 토큰 갱신 (`PATCH /users/auth/refresh`)        | 미구현                  |
| Profile     | 사용자 데이터 API                              | MOCK_USER_DATA 하드코딩 |
| Profile     | 편집 저장 API (`PATCH /users/profile`)         | setMode만 호출          |
| Profile     | 팔로우/언팔로우 (`PATCH /users/{name}/follow`) | 미구현                  |
| Profile     | 계정 삭제 (`DELETE /users`)                    | 미구현                  |
| Editor      | AI 로드맵 생성/수정                            | 2초 setTimeout 후 닫힘  |
| Editor      | AI 자료 추천                                   | 목 데이터 3건           |
| Editor      | ColorPicker 커스텀 적용                        | 모달만 열림             |
| Editor      | 엣지 라벨/화살표/두께                          | disabled                |
| Editor      | 섹션 크기, 텍스트 크기                         | disabled                |
| Editor      | Readme 수정, 더보기 메뉴                       | 버튼만                  |
| Editor      | "선 추가" 도구                                 | Phase 2                 |
| Editor      | WebSocket STOMP 연동                           | localStorage만 사용     |
| Editor      | 실시간 협업/커서 추적                          | 미구현                  |
| Viewer      | 내보내기 (PNG~JSON)                            | TODO 빈 함수            |
| Viewer      | JSON 가져오기/다크모드/통계/버전               | 메뉴만                  |
| Viewer      | 헤더 검색, AI 피드백                           | 미연결                  |
| Viewer      | API 기반 로드맵 로딩                           | localStorage만          |
| Community   | 좋아요 서버 연동                               | 로컬 state만            |
| Community   | "내 로드맵에 추가"                             | alert만                 |
| Community   | API 연동 전체                                  | Mock 데이터 직접 import |
| My Roadmaps | 사이드바 검색                                  | Input만, 필터링 미연결  |
| My Roadmaps | 카드 메뉴 액션                                 | 콜백 미연결             |
| My Roadmaps | 카드 클릭 → 로드맵 열기                        | onClick/href 없음       |
| My Roadmaps | 프로필 드롭다운                                | 미구현                  |
| My Roadmaps | 서버 API 연동                                  | atomWithStorage만       |

---

## 8. Cross-cutting (공통)

### 반응형

- [ ] Auth: 400px 카드, 소형 화면 양쪽 여백 (min-h-screen p-4)
- [ ] My Roadmaps: 사이드바 240px 고정, 그리드 md:2열 lg:3열
- [ ] My Roadmaps: `RoadmapCard` `w-[304px]` 고정 — 작은 화면 깨짐
- [ ] Community: `grid-cols-3` 고정, 검색바 `w-[640px]` 고정 — 모바일 overflow
- [ ] Community 상세: `w-[696px]`, `w-[134px]` 고정 — 모바일 가로 스크롤
- [ ] Profile: Bio `w-[500px] shrink-0` 고정, 500px 미만 깨짐
- [ ] Profile: sm에서 flex-col 전환, ThirdBox 1열 → 2열
- [ ] Editor: h-screen w-screen 전체, 사이드바 w-[240px]
- [ ] Viewer: 캔버스 `h-[700px]` 고정, 줌 컨트롤 비반응형

### 접근성

- [ ] 모든 아이콘 버튼 aria-label 확인
- [ ] PasswordInput: aria-label 전환 ("비밀번호 보기"/"비밀번호 숨기기")
- [ ] ProfileBio: aria-expanded, aria-controls
- [ ] 폼: FormLabel ↔ FormControl 연결
- [ ] Tab 키 → 폼 필드 순서 이동
- [ ] Enter 키 → 폼 제출
- [ ] ESC 키 → 모달/드롭다운 닫기
- [ ] RoadmapCard: div 기반 — tabIndex/role/onKeyDown 없음
- [ ] Community: 드롭다운/탭 ARIA, 검색 label, 좋아요 aria 미비
- [ ] ContributionGraph: 셀이 div, role/aria-label 없음

### 한국어 입력

- [ ] 모든 Input/Textarea 한국어 자모 분리 없는지
- [ ] 검색 필드 한글 조합 중 Enter 동작 (compositionEnd)
- [ ] 에디터 노드 이름/설명 한국어 실시간 업데이트

### 데이터 지속성

- [ ] My Roadmaps: atomWithStorage('jagalchi-my-roadmaps') → 새로고침 후 유지
- [ ] Editor: localStorage('jagalchi-roadmaps') → 새로고침 후 복원
- [ ] 시크릿/프라이빗 모드 localStorage 동작 확인
- [ ] atomWithStorage SSR 하이드레이션 이슈 확인

### 공통 구조 문제 (from review)

- [ ] [HIGH] API 연동 전무 — Auth 일부 제외, 전 피처 Mock/localStorage
- [ ] [HIGH] 데이터 모델 분열 — My Roadmaps(`RoadmapData`) vs Editor/Viewer(`Roadmap`)
- [ ] [HIGH] 인증 파이프라인 미완성 — 토큰 저장 없음 → 인증 API 불가 → 전 피처 차단
- [ ] [MEDIUM] 하드코딩 hex 색상 전 피처 — Tailwind semantic 토큰 미사용, 다크모드 불가
- [ ] [MEDIUM] UI 문자열 하드코딩 — `constants/messages.ts` 컨벤션 미준수 다수

### MSW (Mock Service Worker)

- [ ] Auth API (login, register, sendVerificationCode, verifyCode, resetPassword) 목 응답 정상
- [ ] MSWProvider 래핑 확인
- [ ] MSW 핸들러 vs 실제 API 스펙(`docs/api.md`) 일치 여부

---

## 9. 우선순위 제안 (from review)

1. **Auth 토큰 관리** — 모든 피처의 선결 조건
2. **데이터 모델 통합** — My Roadmaps ↔ Editor/Viewer 타입/저장소 통일
3. **My Roadmaps API 연동** — 가장 많은 이슈, 사용자 경험 직결
4. **Community/Profile API 연동** — Mock → 실제 데이터
5. **Editor/Viewer localStorage → API 전환** (WebSocket STOMP)
6. **UI 정리** — 반응형, 색상 토큰화, 문자열 상수화

---

## 엣지케이스 집계 (from review)

| 피처        | HIGH   | MEDIUM | LOW    | 합계    |
| ----------- | ------ | ------ | ------ | ------- |
| Auth        | 10     | 8      | 8      | 26      |
| My Roadmaps | 4      | 5      | 10     | 19      |
| Community   | 5      | 11     | 12     | 28      |
| Profile     | 9      | 7      | 9      | 25      |
| Editor      | 2      | 7      | 11     | 20      |
| Viewer      | 1      | 3      | 12     | 16      |
| **전체**    | **31** | **41** | **62** | **134** |
