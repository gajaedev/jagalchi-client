export const PROFILE_MESSAGES = {
  BIO_TITLE: '자기소개',
  COMPLETED_ROADMAP: '완주한 로드맵',
  IN_PROGRESS_ROADMAP: '진행중인 로드맵',
  MADE_ROADMAP: '만든 로드맵',
} as const;

export const EDITOR_MESSAGES = {
  SAVE_SUCCESS: '저장됨',
  SAVE_FAILED: '저장 실패',
  // Phase 1: React Flow 노드 기본값
  FLOW_NODE_DEFAULT_LABEL: '새 노드',
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
  // Phase 2: ColorPicker
  COLOR_PICKER_TITLE: '컬러 선택',
  COLOR_PICKER_CANCEL: '취소',
  COLOR_PICKER_APPLY: '적용',
  // AI 기능
  AI_GENERATE_ROADMAP: '로드맵 생성',
  AI_MODIFY_ROADMAP: '로드맵 수정',
  AI_MENU_LABEL: 'AI 메뉴',
  RESOURCE_DELETE_CONFIRM: '자료를 삭제하시겠습니까?',
} as const;
