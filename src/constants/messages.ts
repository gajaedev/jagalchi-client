export const PROFILE_MESSAGES = {
  BIO_TITLE: '자기소개',
  COMPLETED_ROADMAP: '완주한 로드맵',
  IN_PROGRESS_ROADMAP: '진행중인 로드맵',
  MADE_ROADMAP: '만든 로드맵',
} as const;

export const EDITOR_MESSAGES = {
  SAVE_SUCCESS: '저장됨',
  SAVE_FAILED: '저장 실패',
  AI_GENERATE_ROADMAP: '로드맵 생성',
  AI_MODIFY_ROADMAP: '로드맵 수정',
  AI_MENU_LABEL: 'AI 메뉴',
  RESOURCE_DELETE_CONFIRM: '자료를 삭제하시겠습니까?',
  FLOW_NODE_DEFAULT_TITLE: 'Node',
  FLOW_SECTION_DEFAULT_TITLE: '섹션',
  FLOW_TEXT_DEFAULT_CONTENT: '텍스트',

  // AI Dialog
  AI_DIALOG_TITLE: '로드맵 생성',
  AI_DIALOG_GENERATE_TAB: '로드맵 생성',
  AI_DIALOG_MODIFY_TAB: '로드맵 수정',
  AI_DIALOG_SECTION_GENERATE: '로드맵 정보',
  AI_DIALOG_SECTION_MODIFY: '수정사항 정보',
  AI_DIALOG_DESC_GENERATE: '말이시',
  AI_DIALOG_DESC_MODIFY: '이번 부분을 이렇게 수정할거 생각하고싶습니다.',
  AI_DIALOG_PLACEHOLDER_GENERATE: '어떤 로드맵을 생성할까요?',
  AI_DIALOG_PLACEHOLDER_MODIFY: '어떻게 수정할까요?',
  AI_DIALOG_BUTTON_GENERATING: '생성중',
  AI_DIALOG_BUTTON_GENERATE: '생성하기',
  AI_DIALOG_BUTTON_MODIFY: '수정',

  // Page
  PAGE_LOADING: '로드맵을 불러오는 중...',
  PAGE_NOT_FOUND: '로드맵을 찾을 수 없습니다',

  // Toolbar
  TOOLBAR_NODE: '노드',
  TOOLBAR_LINE: '선',
  TOOLBAR_SECTION: '섹션',
  TOOLBAR_TEXT: '텍스트',
  TOOLBAR_AI: 'AI 기능',
  TOOLBAR_AI_GENERATE: '로드맵 생성',
  TOOLBAR_AI_MODIFY: '로드맵 수정',
} as const;
