# Figma Variant Auto-Detection System

## Overview

자동으로 Figma component의 모든 variant를 감지하고, Storybook story와 매칭합니다.

**핵심 기능**:

- ✅ Component frame URL만 제공하면 자동으로 모든 variant 스캔
- ✅ Storybook story 이름과 자동 매칭
- ✅ Story가 없는 variant는 자동 스킵
- ✅ 25개 variant를 한 번에 자동 테스트

---

## How It Works

### 1. Figma Component Structure

```
EditorNodeSidebar (Frame: 4472:1569)
├─ State=Default, Lock=False  (Variant: 4472:1567)
├─ State=Default, Lock=True   (Variant: 4472:2132)
├─ State=Closed, Lock=False   (Variant: 4472:1568)
└─ State=Closed, Lock=True    (Variant: 4472:2166)
```

### 2. Automatic Mapping

**Input**: Component frame URL

```
https://figma.com/design/L7Ai9cZPKaF09qZfg9xWhH/...?node-id=4472-1569
                                                              ↑
                                                         Frame ID
```

**MCP Scan**: Claude automatically detects all variants

**Output**: Auto-generated mappings

```json
{
  "componentName": "EditorNodeSidebar",
  "frameNodeId": "4472:1569",
  "variants": [
    {
      "name": "State=Default, Lock=False",
      "nodeId": "4472:1567",
      "storybookName": "NodePropertiesPanel-Default"
    },
    {
      "name": "State=Default, Lock=True",
      "nodeId": "4472:2132",
      "storybookName": "NodePropertiesPanel-Locked"
    }
  ]
}
```

### 3. Storybook Matching

```typescript
// Automatic matching rules
EditorNodeSidebar + "State=Default" → NodePropertiesPanel-Default
EditorNodeSidebar + "State=Closed"  → NodePropertiesPanel-Closed
EditorToolbarItem + "State=Hover"   → ToolbarButton-Hover
```

**Only tests variants that have Storybook stories**. Other variants are automatically skipped.

---

## Setup (One-Time)

### Step 1: Provide Component Frame URLs

Create a list of your Figma component frames:

```typescript
// These are the container frames with ALL variants
const FIGMA_COMPONENTS = {
  EditorNodeSidebar: {
    url: 'https://figma.com/design/FILE_KEY/Name?node-id=4472-1569',
    frameNodeId: '4472:1569',
  },
  // ... more components
};
```

### Step 2: Run Auto-Sync

```bash
# Claude Code will run MCP to scan all variants
pnpm figma:sync
```

**What happens**:

1. MCP scans each component frame
2. Extracts all variant node IDs
3. Generates Storybook story names
4. Saves to `scripts/figma-components.json`

### Step 3: Export & Test

```bash
# Export all 25 variants automatically
pnpm figma:export

# Capture Storybook screenshots (only existing stories)
pnpm figma:screenshots

# Compare Figma vs Storybook
pnpm figma:compare

# Generate HTML report
pnpm figma:report
```

---

## Naming Conventions

### Figma Variant Names

```
State=Default, Lock=False  → Parsed as { state: "Default", lock: "False" }
More Option=True, State=Hover → Parsed as { moreOption: "True", state: "Hover" }
```

### Storybook Story Names

```typescript
// Pattern: ComponentName-VariantState
NodePropertiesPanel - Default; // State=Default
NodePropertiesPanel - Locked; // State=Default, Lock=True
ToolbarButton - Hover; // State=Hover
ToolbarButton - WithDropdownActive; // More Option=True, State=Active
```

**Convention**:

- Use `State` as the primary variant indicator
- Additional properties become prefixes (e.g., `WithDropdown`, `Locked`)

---

## Current Mappings

**Automatically generated from Figma**:

| Component            | Variants   | Storybook Stories                                               |
| -------------------- | ---------- | --------------------------------------------------------------- |
| EditorNodeSidebar    | 4 variants | NodePropertiesPanel-Default, Locked, Closed, ClosedLocked       |
| EditorLineSidebar    | 2 variants | EdgePropertiesPanel-Default, Closed                             |
| EditorSectionSidebar | 4 variants | SectionPropertiesPanel-Default, Locked, Closed, ClosedLocked    |
| EditorTextSidebar    | 4 variants | TextPropertiesPanel-Default, Locked, Closed, ClosedLocked       |
| EditorResource       | 2 variants | ResourcePropertiesPanel-Default, Hover                          |
| EditorToolbarItem    | 8 variants | ToolbarButton-Default, Hover, Active, Disabled, WithDropdown... |
| EditorAIMenu         | 1 variant  | RoadmapAiModal-Default                                          |

**Total**: 25 variants tested automatically

---

## Adding New Components

### 1. Get Figma Frame URL

- Open Figma
- Select the component **container frame** (not individual variants)
- Right-click → "Copy link"
- URL format: `https://figma.com/design/FILE_KEY/Name?node-id=XXXX-YYYY`

### 2. Add to Configuration

Edit `scripts/sync-figma-variants.ts`:

```typescript
const FIGMA_COMPONENTS: Record<string, { name: string; frameNodeId: string }> = {
  // Existing components...

  NewComponent: {
    name: 'My New Component',
    frameNodeId: 'XXXX:YYYY', // Extract from URL: XXXX-YYYY → XXXX:YYYY
  },
};
```

### 3. Re-run Sync

```bash
pnpm figma:sync
```

Claude will automatically:

- Scan all variants in the new component
- Generate Storybook story names
- Update `figma-components.json`

### 4. Create Storybook Stories

Create stories matching the generated names:

```typescript
// src/stories/MyComponent.stories.tsx
export const Default: Story = { ... };
export const Hover: Story = { ... };
export const Active: Story = { ... };
```

### 5. Test

```bash
pnpm figma:test
```

---

## Troubleshooting

### No Variants Detected

**Problem**: Component has no `<symbol>` tags in Figma metadata

**Solution**:

- Verify you're using a component frame (not an instance)
- Check that variants exist in Figma
- Ensure Figma file is published/shared

### Storybook Story Not Found

**Problem**: Variant exported but no screenshot captured

**Cause**: Story name doesn't match auto-generated name

**Solution**:

1. Check `figma-components.json` for expected story name
2. Rename your Storybook story to match
3. Or update `generateStorybookName()` function

### Figma API Rate Limit

**Problem**: `429 Too Many Requests` error

**Solution**:

- Wait 1 minute between exports
- Or export in batches (split components)
- Figma free tier: 60 requests/minute

---

## Advanced Configuration

### Custom Story Name Generation

Edit `scripts/sync-figma-variants.ts`:

```typescript
function generateStorybookName(componentKey: string, variantName: string): string {
  const nameMap: Record<string, string> = {
    EditorNodeSidebar: 'NodePropertiesPanel',
    MyComponent: 'MyCustomStoryPrefix', // Add your mapping
  };

  const storybookComponent = nameMap[componentKey] || componentKey;
  return `${storybookComponent}-${variantName}`;
}
```

### Variant Filtering

To skip certain variants, add filter logic in `figma-export.ts`:

```typescript
// Skip "Disabled" variants
if (variant.name.includes('Disabled')) {
  continue;
}
```

---

## Benefits

### Before (Manual)

```
1. Find each variant in Figma
2. Right-click → Copy link
3. Extract node ID
4. Add to config file
5. Repeat for 25 variants (❌ 30 minutes)
```

### After (Automatic)

```
1. Provide component frame URL
2. Run pnpm figma:sync (✅ 30 seconds)
```

**Time saved**: 95% reduction in setup time

---

## File Structure

```
scripts/
├── sync-figma-variants.ts        # Variant detection logic
├── figma-export.ts                # Export using detected variants
├── figma-components.json          # Auto-generated mappings (DO commit)
├── storybook-screenshots.ts       # Screenshot capture
└── compare-images.ts              # Pixel comparison

visual-tests/
├── figma/                         # 25 Figma exports
├── actual/                        # Storybook screenshots (only existing stories)
├── diff/                          # Comparison diffs
└── report.html                    # Visual report
```

---

## FAQ

### Q: Do I need to update mappings when Figma changes?

**A**: No. Re-run `pnpm figma:sync` and Claude will automatically detect new/removed variants.

### Q: What if I add a new variant in Figma?

**A**:

1. Run `pnpm figma:sync` (auto-detects new variant)
2. Create matching Storybook story (if needed)
3. Run `pnpm figma:test`

### Q: Can I test only specific variants?

**A**: Yes, delete unwanted mappings from `figma-components.json` or create filtered Storybook stories.

### Q: Do I need to provide variant node IDs manually?

**A**: No. Only provide the component **frame URL**. Claude's MCP automatically extracts all variant node IDs.

---

## Related Documentation

- [Figma Comparison Overview](./figma-comparison.md)
- [Storybook Setup](../README.md#storybook)
- [Visual Regression Testing](./figma-comparison.md#how-it-works)
