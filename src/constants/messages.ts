export const ERROR_MESSAGES = {
  GENERIC_HEADING: '문제가 발생했습니다',
  GENERIC_DESCRIPTION: '요청을 처리하는 중 오류가 발생했습니다.',
  RETRY_BUTTON: '다시 시도',
  GO_HOME: '홈으로',
  GO_HOME_FULL: '홈으로 돌아가기',
  NOT_FOUND_HEADING: '페이지를 찾을 수 없습니다',
  NOT_FOUND_DESCRIPTION: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
  GO_MY_ROADMAPS: '내 로드맵으로',
} as const;

export const AUTH_MESSAGES = {
  DELETE_ACCOUNT: '계정 삭제',
  DELETE_ACCOUNT_CONFIRM:
    '정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다.',
  DELETE_ACCOUNT_SUCCESS: '계정이 삭제되었습니다',
  LOGIN_EMAIL_NOT_FOUND: '존재하지 않는 이메일입니다',
  LOGIN_PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다',
  LOGIN_FAILED: '로그인에 실패했습니다',
  VERIFICATION_CODE_SENDING: '전송 중...',
  VERIFICATION_CODE_SEND: '인증번호 전송',
  VERIFICATION_CODE_RESEND: '재전송',
  VERIFICATION_CODE_RESEND_COOLDOWN: '초 후 재전송',
  LOGOUT: '로그아웃',
  // Login page
  LOGIN_TITLE: '로그인해서 계속하기',
  LOGIN_DESCRIPTION: '이메일 주소를 입력해주세요',
  LOGIN_NO_ACCOUNT: '아직 계정이 없나요?',
  LOGIN_REGISTER_LINK: '회원가입',
  LOGIN_LABEL: '로그인',
  LOGIN_LOADING: '로그인 중...',
  LOGIN_BACK_LINK: '로그인하기',
  // Login form labels
  EMAIL_LABEL: '이메일',
  EMAIL_PLACEHOLDER: '이메일 입력',
  PASSWORD_LABEL: '비밀번호',
  PASSWORD_PLACEHOLDER: '비밀번호 입력',
  PASSWORD_FORGOT: '비밀번호를 잊어버렸나요?',
  // Register page
  REGISTER_TITLE: '회원가입',
  REGISTER_DESCRIPTION: '회원가입할 이메일 정보를 입력해주세요',
  REGISTER_HAS_ACCOUNT: '이미 계정이 있나요?',
  REGISTER_LOGIN_LINK: '로그인',
  // Register step 1
  PASSWORD_SET_PLACEHOLDER: '비밀번호 지정',
  VERIFICATION_CODE_LABEL: '인증번호',
  VERIFICATION_CODE_RESEND_ARIA: '인증번호 재전송',
  NEXT: '다음',
  // Register step 2
  NAME_LABEL: '이름',
  USERNAME_PLACEHOLDER: '사용자 이름 입력',
  CONFIRM: '확인',
  STEP2_TITLE: '사용자 이름 설정',
  STEP2_DESCRIPTION: '사용자 이름을 입력해주세요',
  // Register step 3
  STEP3_TITLE: '사용자 프로필 링크 추가',
  STEP3_DESCRIPTION: '사용자 프로필에 표시할 링크를 입력해주세요',
  LINK_LABEL_1: '1번 링크',
  LINK_LABEL_2: '2번 링크',
  LINK_LABEL_3: '3번 링크',
  LINK_NAME_PLACEHOLDER: '링크 이름',
  LINK_URL_PLACEHOLDER: '링크 URL',
  SKIP: '건너뛰기',
  // Find password
  FIND_PASSWORD_TITLE: '이메일 인증',
  FIND_PASSWORD_DESCRIPTION: '비밀번호를 재설정할 이메일을 입력해주세요',
  FIND_PASSWORD_STEP2_TITLE: '새 비밀번호 입력',
  FIND_PASSWORD_STEP2_DESCRIPTION: '재설정할 비밀번호를 입력해주세요',
  NEW_PASSWORD_LABEL: '새 비밀번호',
  PASSWORD_CONFIRM_LABEL: '비밀번호 확인',
  PASSWORD_CONFIRM_PLACEHOLDER: '비밀번호 다시 입력',
  VERIFICATION_FAILED: '인증에 실패했습니다',
  PROCESSING: '처리 중...',
  COMPLETE: '완료',
  // OAuth
  OAUTH_GOOGLE: 'Google로 로그인',
  OAUTH_GITHUB: 'GitHub로 로그인',
  // Common
  CANCEL: '취소',
  DELETING: '처리 중...',
} as const;

export const COMMUNITY_MESSAGES = {
  NOT_FOUND: '로드맵을 찾을 수 없습니다.',
  VIEW_ROADMAP: '로드맵 보기',
  ADD_TO_MY_ROADMAPS: '내 로드맵에 추가',
  LOGIN_REQUIRED: '로그인 후 이용 가능합니다',
  LIKE: '좋아요',
  ABOUT: 'About',
  MADE_BY: 'Made by',
  LAST_UPDATED: '마지막 업데이트',
  LOADING: '불러오는 중...',
  LOADING_DETAIL: '로드맵 정보를 불러오는 중...',
  ERROR_LOAD_FAILED: '로드맵을 불러오는데 실패했습니다.',
  FORK_SUCCESS: '로드맵을 내 로드맵에 추가했습니다.',
  FORK_FAILED: '로드맵 추가에 실패했습니다.',
  FORK_COUNT_LABEL: '포크',
  SAVED_EMPTY: '저장된 로드맵이 없습니다.',
  // Hero
  HERO_TITLE: '어떤 로드맵을 찾고있나요?',
  SEARCH_ARIA: '검색',
  BACK_ARIA: '뒤로가기',
  // Grid
  SEARCH_EMPTY: '검색 결과가 없습니다.',
  POPULAR_EMPTY: '인기 로드맵이 없습니다.',
  // Filter
  TAB_POPULAR: '인기',
  TAB_LATEST: '최신',
  TAB_SAVED: '저장된 로드맵',
  SORT_ORDER_LABEL: '정렬순서',
  SORT_BY_LABEL: '정렬기준',
  FILTER_LABEL: '필터링',
  SORT_DESC: '내림차순',
  SORT_ASC: '오름차순',
  SORT_NAME: '글자순',
  SORT_RECENT: '최신순',
  SORT_SIZE: '크기순',
  FILTER_ALL: '전체',
  FILTER_ROADMAP: '로드맵',
  FILTER_DIRECTORY: '디렉토리',
} as const;

export const MY_ROADMAPS_MESSAGES = {
  SEARCH_PLACEHOLDER: '로드맵 검색',
  NEW_ROADMAP: '로드맵',
  NEW_DIRECTORY: '디렉토리',
  SHARE_COPIED: '링크가 클립보드에 복사되었습니다',
  SHARE_FAILED: '링크 복사에 실패했습니다',
  // Delete dialog
  DELETE_TITLE: '정말 삭제하시겠습니까?',
  DELETE_DESCRIPTION: '이 작업은 되돌릴 수 없습니다.',
  DELETE_CANCEL: '취소',
  DELETE_CONFIRM: '삭제',
  // Rename dialog
  RENAME_TITLE: '이름 수정',
  RENAME_CANCEL: '취소',
  RENAME_CONFIRM: '확인',
  RENAME_PLACEHOLDER: '새 이름을 입력하세요',
  // Header
  HEADER_TITLE: '내 로드맵',
  HEADER_ROADMAP_SUFFIX: '로드맵',
  // Toolbar
  ALL_ROADMAPS: '내 전체 로드맵',
  // Sidebar
  SIDEBAR_RECENT: '최근',
  SIDEBAR_COMMUNITY: '커뮤니티',
  SIDEBAR_MY_ROADMAP: '내 로드맵',
  SIDEBAR_SHARED: '공유된 로드맵',
  SIDEBAR_FAVORITES: '즐겨찾기',
  // Card
  CARD_FILE_COUNT_SUFFIX: '개의 파일',
  CARD_MORE_ARIA: '더 보기',
  CARD_FAVORITE: '즐겨찾기',
  CARD_RENAME: '이름수정',
  CARD_MOVE: '파일이동',
  CARD_DELETE: '삭제',
  // AddRoadmapModal
  ADD_ROADMAP_TITLE: '로드맵 추가',
  ADD_ROADMAP_PLACEHOLDER: '로드맵 이름을 입력하세요',
  ADD_ROADMAP_DETAIL: '자세히 설정하기',
  // SelectLocationModal
  SELECT_LOCATION_TITLE: '위치선택',
  SELECT_LOCATION_DESCRIPTION: '이동하거나 저장할 위치를 선택하세요.',
  // Filter (shared with community)
  SORT_ORDER_LABEL: '정렬순서',
  SORT_BY_LABEL: '정렬기준',
  FILTER_LABEL: '필터링',
  SORT_DESC: '내림차순',
  SORT_ASC: '오름차순',
  SORT_NAME: '글자순',
  SORT_RECENT: '최신순',
  SORT_SIZE: '크기순',
  FILTER_ALL: '전체',
  FILTER_ROADMAP: '로드맵',
  FILTER_DIRECTORY: '디렉토리',
  // Common dialog buttons
  CANCEL: '취소',
  CONFIRM: '확인',
  // Loading/Error
  LOADING: '로드맵을 불러오는 중...',
  // Directory actions
  DIR_RENAME: '이름 변경',
  DIR_DELETE: '삭제',
  DIR_DELETE_CONFIRM: '이 디렉토리를 삭제하시겠습니까?',
} as const;

export const PROFILE_MESSAGES = {
  BIO_TITLE: '자기소개',
  COMPLETED_ROADMAP: '완주한 로드맵',
  IN_PROGRESS_ROADMAP: '진행중인 로드맵',
  MADE_ROADMAP: '만든 로드맵',
  // ProfilePicture
  PROFILE_PICTURE_ALT: '프로필 사진',
  PROFILE_PICTURE_ALT_WITH_NAME: '의 프로필 사진',
  UPLOAD_FORMAT_ERROR: 'JPG, PNG, GIF, WEBP 형식만 업로드 가능합니다.',
  UPLOAD_SIZE_ERROR: '이미지 파일은 5MB 이하만 업로드할 수 있습니다.',
  // ProfileEditButton
  EDIT_BUTTON_SHOW: '편집하기',
  EDIT_BUTTON_EDIT: '편집 모드 나가기',
  // ProfileLinkAddButton
  LINK_ADD_BUTTON: '링크추가',
  // ProfileCustomLinks
  LINK_NAME_PLACEHOLDER: '링크 이름',
  LINK_DELETE_TITLE: '링크 삭제',
  // AddRoadmapModal (profile)
  ADD_PUBLIC_ROADMAP: '공개 로드맵 추가',
  SELECT_ROADMAP_TITLE: '로드맵 선택',
  SEARCH_ROADMAP_PLACEHOLDER: '로드맵 검색',
  SEARCH_EMPTY: '검색 결과가 없습니다.',
  CANCEL: '취소',
  CONFIRM: '확인',
  // Follow
  FOLLOW: '팔로우',
  UNFOLLOW: '언팔로우',
  FOLLOW_LOADING: '처리 중...',
  FOLLOWERS_TITLE: '팔로워',
  FOLLOWINGS_TITLE: '팔로잉',
  FOLLOW_LIST_EMPTY: '목록이 없습니다.',
  FOLLOW_LIST_LOADING: '불러오는 중...',
  FOLLOW_LIST_ERROR: '목록을 불러올 수 없습니다.',
  // Profile template
  LOADING: '프로필을 불러오는 중...',
  ERROR: '프로필을 불러올 수 없습니다.',
  BACK_BUTTON: '프로필',
} as const;

export const VIEWER_MESSAGES = {
  // Learning Coach
  COACH_TITLE: 'AI 학습 코치',
  COACH_TAB_FEEDBACK: '학습 피드백',
  COACH_TAB_QA: '질문하기',
  COACH_LOADING: 'AI가 분석 중...',
  COACH_FEEDBACK_EMPTY: '선택한 노드의 학습 피드백을 받아보세요',
  COACH_FEEDBACK_REQUEST: '피드백 받기',
  COACH_SCORES: '학습 점수',
  COACH_STRENGTHS: '잘한 점',
  COACH_GAPS: '보완할 점',
  COACH_NEXT_ACTIONS: '다음 학습 추천',
  COACH_QUESTION_PLACEHOLDER: '학습 관련 질문을 입력하세요',
  COACH_ASK: '질문',
  COACH_SOURCES: '참고 자료',
  COACH_QA_EMPTY: '학습 관련 질문을 해보세요',
  COACH_CLOSE: '닫기',
  COACH_ERROR: 'AI 분석에 실패했습니다. 다시 시도해주세요.',
  COACH_SCORE_EVIDENCE: '증거 수준',
  COACH_SCORE_STRUCTURE: '구조',
  COACH_SCORE_SPECIFICITY: '구체성',
  COACH_SCORE_REPRODUCIBILITY: '재현성',
  COACH_SCORE_OVERALL: '종합',
  // Fork tree
  FORK_TREE_TITLE: '포크 트리',
  FORK_TREE_EMPTY: '포크 정보가 없습니다',
  FORK_TREE_LOADING: '불러오는 중...',
  FORK_TREE_COLLAPSE: '접기',
  FORK_TREE_EXPAND: '펼치기',
  MENU_FORK_TREE: '포크 트리 보기',
  // Fork
  FORK_BUTTON: '포크',
  FORK_SUCCESS: '로드맵을 포크했습니다',
  FORK_ALREADY_FORKED: '이미 포크한 로드맵입니다',
  // Header
  AI_FEEDBACK_BUTTON: 'AI 학습 피드백',
  SEARCH_PLACEHOLDER: '로드맵 안에서 검색',
  DEFAULT_ROADMAP_TITLE: "Jagalchi's Roadmap",
  // Header menus
  MENU_STATISTICS: '로드맵 통계',
  MENU_DARK_MODE: '다크모드 전환',
  MENU_EXPORT: '내보내기',
  MENU_SAVE_IMAGE: '이미지로 저장',
  MENU_IMPORT_JSON: 'JSON으로 가져오기',
  MENU_VERSION: '버전 보기',
  EXPORT_MARKDOWN: 'Markdown',
  EXPORT_PDF: 'PDF',
  EXPORT_JSON: 'JSON',
  IMAGE_PNG: 'PNG',
  IMAGE_JPG: 'JPG',
  IMAGE_SVG: 'SVG',
  // Sidebar
  SIDEBAR_TITLE: '노드 목록',
  SIDEBAR_SEARCH_PLACEHOLDER: '노드 검색',
  SIDEBAR_EMPTY: '노드가 없습니다',
  SIDEBAR_DETAIL_DESCRIPTION: '설명',
  SIDEBAR_DETAIL_RESOURCES: '첨부 자료',
  SIDEBAR_TOTAL_COUNT: '총 {count}개 노드',
  // Progress
  PROGRESS_LABEL: '진행률',
  NODE_COMPLETED: '완료됨',
  NODE_INCOMPLETE: '미완료',
  // Loading/Error
  LOADING: '로드맵을 불러오는 중...',
  ERROR_NOT_FOUND: '로드맵을 찾을 수 없습니다',
  ERROR_LOAD_FAILED: '로드맵을 불러오는데 실패했습니다',
  // View mode
  VIEW_CANVAS: '캔버스',
  VIEW_CARDS: '카드',
  // Sidebar toggle
  SIDEBAR_OPEN_BUTTON_LABEL: '노드 목록 열기',
  // Export image
  EXPORT_IMAGE_TITLE: '이미지로 저장',
  EXPORT_PNG: 'PNG로 저장',
  EXPORT_JPG: 'JPG로 저장',
  EXPORT_SVG: 'SVG로 저장',
  // Export data
  EXPORT_DATA_TITLE: '데이터 내보내기',
  EXPORT_JSON_DOWNLOAD: 'JSON으로 내보내기',
  EXPORT_MARKDOWN_DOWNLOAD: 'Markdown으로 내보내기',
  // Export loading
  EXPORT_LOADING: '내보내는 중...',
  // Import
  IMPORT_JSON_INVALID: '유효하지 않은 JSON 파일입니다',
} as const;

export const EDITOR_MESSAGES = {
  // Editor sidebar
  SIDEBAR_OPEN_ARIA: '사이드바 열기',
  SIDEBAR_CLOSE_ARIA: '사이드바 닫기',
  // Multi-select
  MULTI_SELECT_NODE_LABEL: '노드',
  // ErrorFallback
  ERROR_CANNOT_LOAD: '로드맵을 불러올 수 없습니다',
  ERROR_RETRY: '다시 시도',
  ERROR_BACK_TO_ROADMAPS: '내 로드맵으로 돌아가기',
  SAVE_SUCCESS: '저장됨',
  SAVE_FAILED: '저장 실패',
  // Phase 1: React Flow 노드 기본값
  FLOW_NODE_DEFAULT_LABEL: '새 노드',
  FLOW_DETAIL_NODE_DEFAULT_LABEL: '새 상세 노드',
  FLOW_SECTION_DEFAULT_TITLE: '빈 섹션',
  FLOW_TEXT_DEFAULT_CONTENT: '텍스트',
  // Phase 2: Sidebar 라벨
  SIDEBAR_EMPTY_STATE: '노드를 선택하세요',
  SIDEBAR_NODE_NAME_LABEL: '노드 이름',
  SIDEBAR_NODE_DESC_LABEL: '노드 설명',
  SIDEBAR_SECTION_NAME_LABEL: '섹션 이름',
  SIDEBAR_SECTION_SIZE_LABEL: '크기',
  SIDEBAR_TEXT_SIZE_LABEL: '텍스트 크기',
  SIDEBAR_EDGE_LABEL_LABEL: '라벨',
  SIDEBAR_EDGE_LABEL_PLACEHOLDER: '라벨 없음',
  SIDEBAR_EDGE_ARROW_FORWARD: '단방향 화살표',
  SIDEBAR_EDGE_ARROW_BIDIRECTIONAL: '양방향 화살표',
  SIDEBAR_EDGE_STYLE_LABEL: '스타일',
  SIDEBAR_EDGE_STYLE_SOLID: '실선',
  SIDEBAR_EDGE_STYLE_DASHED: '점선',
  SIDEBAR_EDGE_STYLE_WAVY: '꼬인선',
  SIDEBAR_EDGE_ARROW_LABEL: '화살표',
  SIDEBAR_EDGE_THICKNESS_LABEL: '두께',
  SIDEBAR_COLOR_PRESET_LABEL: '기본 컬러',
  SIDEBAR_COLOR_CUSTOM_LABEL: '커스텀',
  SIDEBAR_RESOURCES_LABEL: '첨부 자료',
  SIDEBAR_ADD_RESOURCE_BUTTON: '추가',
  // Phase 2: Toolbar 툴팁
  TOOLBAR_NODE_TOOLTIP: '노드 추가',
  TOOLBAR_LINE_TOOLTIP: '선 추가',
  TOOLBAR_SECTION_TOOLTIP: '섹션 추가',
  TOOLBAR_TEXT_TOOLTIP: '텍스트 추가',
  TOOLBAR_GEAR_TOOLTIP: '설정',
  // Phase 3: AI Menu
  AI_MENU_GENERATE_LABEL: '로드맵 생성',
  AI_MENU_MODIFY_LABEL: '로드맵 수정',
  // Phase 2: ColorPicker
  COLOR_PICKER_TITLE: '컬러 선택',
  COLOR_PICKER_CANCEL: '취소',
  COLOR_PICKER_APPLY: '적용',
  COLOR_PICKER_HEX_PLACEHOLDER: '#000000',
  // Phase 3: Multi-select
  MULTI_SELECT_TITLE: '다중 선택',
  MULTI_SELECT_COUNT: '개 선택됨',
  MULTI_SELECT_ALIGN_LABEL: '정렬',
  MULTI_SELECT_SPACING_LABEL: '간격',
  MULTI_SELECT_NAME_MIXED: 'Mixed',
  MULTI_SELECT_DESC_MIXED: 'Mixed',
  MULTI_SELECT_ALIGN_LEFT: '왼쪽 정렬',
  MULTI_SELECT_ALIGN_CENTER: '가운데 정렬',
  MULTI_SELECT_ALIGN_RIGHT: '오른쪽 정렬',
  MULTI_SELECT_ALIGN_TOP: '위쪽 정렬',
  MULTI_SELECT_ALIGN_MIDDLE: '중간 정렬',
  MULTI_SELECT_ALIGN_BOTTOM: '아래쪽 정렬',
  // AI 기능
  AI_GENERATE_ROADMAP: '로드맵 생성',
  AI_MODIFY_ROADMAP: '로드맵 수정',
  AI_MENU_LABEL: 'AI 메뉴',
  RESOURCE_DELETE_CONFIRM: '자료를 삭제하시겠습니까?',
  // Phase 4: AI Modal
  AI_MODAL_GENERATE_TITLE: 'AI 로드맵 생성',
  AI_MODAL_MODIFY_TITLE: 'AI 로드맵 수정',
  AI_MODAL_GENERATE_PLACEHOLDER: '어떤 로드맵을 만들고 싶으신가요? (예: React 웹 개발 로드맵)',
  AI_MODAL_MODIFY_PLACEHOLDER: '로드맵을 어떻게 수정하고 싶으신가요? (예: 난이도를 낮춰주세요)',
  AI_MODAL_CANCEL: '취소',
  AI_MODAL_GENERATE_BUTTON: '생성',
  AI_MODAL_MODIFY_BUTTON: '수정',
  AI_MODAL_LOADING: 'AI가 작업 중입니다...',
  AI_RESOURCE_MODAL_TITLE: 'AI 자료 추천',
  AI_RESOURCE_MODAL_SUBTITLE: '선택한 노드에 적합한 학습 자료를 추천합니다',
  AI_RESOURCE_MODAL_RECOMMEND_BUTTON: '추천받기',
  AI_RESOURCE_MODAL_CLOSE: '닫기',
  AI_RESOURCE_MODAL_LOADING: '자료를 찾는 중...',
  AI_RESOURCE_MODAL_EMPTY: '추천할 자료가 없습니다',
  AI_RESOURCE_MODAL_ERROR: '자료 추천에 실패했습니다',
  AI_GENERATE_ERROR: 'AI 로드맵 생성에 실패했습니다',
  AI_MODIFY_ERROR: 'AI 로드맵 수정에 실패했습니다',
  AI_DESC_LOADING: 'AI 생성 중...',
  AI_DESC_BUTTON: 'AI 생성',
  AI_DESC_ERROR: 'AI 설명 생성에 실패했습니다',
  AI_RECOMMEND_BUTTON: 'AI 추천',
  // NodePropertiesPanel
  NODE_NAME_PLACEHOLDER: '노드 이름을 입력하세요',
  NODE_DESC_PLACEHOLDER: '노드 설명을 입력하세요',
  RESOURCE_URL_PLACEHOLDER: 'URL을 입력하세요',
  NODE_SUBTITLE: '노드',
  // ResourceRecommendationModal
  DEFAULT_RESOURCE_QUERY: 'programming',
  // RoadmapCanvas
  NEW_NODE_LABEL: 'New Node',
} as const;

export const REALTIME_MESSAGES = {
  NACK_TITLE: '변경 사항을 저장하지 못했습니다',
  NACK_DESCRIPTION: '잠시 후 다시 시도해주세요.',
  CONNECTION_CONNECTED: '실시간 협업 중',
  CONNECTION_DISCONNECTED: '연결 끊김',
} as const;

export const NOTIFICATION_MESSAGES = {
  // Bell
  BELL_ARIA: '알림',
  UNREAD_COUNT_ARIA: '읽지 않은 알림',
  // Dropdown header
  TITLE: '알림',
  MARK_ALL_READ: '모두 읽음',
  // List
  EMPTY: '새로운 알림이 없습니다',
  LOADING: '알림을 불러오는 중...',
  ERROR: '알림을 불러오지 못했습니다',
  // Item
  MARK_READ_ARIA: '읽음 처리',
} as const;
