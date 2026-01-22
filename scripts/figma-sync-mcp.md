# Figma MCP Sync Instructions

**Purpose**: Claude Code가 MCP를 사용해 Figma Desktop에서 컴포넌트를 자동 스캔하고 매핑을 생성합니다.

## Prerequisites

1. ✅ Figma Desktop 실행 중
2. ✅ 디자인 파일 열려있음
3. ✅ Dev Mode 접근 권한 (유료 Figma 플랜)

## Execution Steps (Claude Code에서 수동 실행)

### Step 1: Get Page Metadata

```typescript
// 페이지의 모든 컴포넌트 스캔
mcp__figma -
  desktop__get_metadata({
    nodeId: '0:1', // Page root
    clientLanguages: 'typescript',
    clientFrameworks: 'react,next.js',
  });
```

### Step 2: Parse and Match Components

Expected Storybook stories:

- NodePropertiesPanel-Default
- EdgePropertiesPanel-Default
- SectionPropertiesPanel-Default
- TextPropertiesPanel-Default
- ResourcePropertiesPanel-Default
- ContextMenu-Default
- ToolbarButton-Default
- EditorButton-Default
- RoadmapAiModal-Default

Figma name patterns (case-insensitive):

- "Node Properties Panel" → NodePropertiesPanel-Default
- "Edge Properties Panel" → EdgePropertiesPanel-Default
- "Section Properties Panel" → SectionPropertiesPanel-Default
- "Text Properties Panel" → TextPropertiesPanel-Default
- "Resource Properties Panel" → ResourcePropertiesPanel-Default
- "Context Menu" → ContextMenu-Default
- "Toolbar Button" → ToolbarButton-Default
- "Editor Button" → EditorButton-Default
- "AI Modal" or "Roadmap AI Modal" → RoadmapAiModal-Default

### Step 3: Generate Mapping File

Extract node IDs from metadata XML and create `scripts/figma-components.json`:

```json
{
  "timestamp": "2026-01-23T...",
  "fileKey": "extracted_from_figma_url",
  "mappings": [
    {
      "storybookName": "NodePropertiesPanel-Default",
      "figmaName": "Node Properties Panel",
      "nodeId": "123:456",
      "fileKey": "ABC123XYZ"
    }
  ]
}
```

### Step 4: Verify Mappings

Check that all 9 expected stories have valid node IDs.

## Manual Fallback

If MCP is unavailable:

1. Open Figma Desktop
2. Right-click each component → Copy link
3. Extract node ID from URL: `node-id=123-456` → `123:456`
4. Manually edit `scripts/figma-components.json`

## Automation Workflow

```bash
# Initial setup (once)
pnpm figma:sync  # Claude Code runs MCP scan

# Regular usage (CI/CD)
pnpm figma:export  # Uses generated mappings
pnpm figma:test    # Full pipeline
```
