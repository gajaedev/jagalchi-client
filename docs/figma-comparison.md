# Figma Design Comparison

## Overview

Jagalchi includes fully automated Figma design comparison that runs on every pull request. This ensures that implemented components perfectly match the original Figma designs.

## How It Works

The automation pipeline consists of 4 steps:

```
1. Export Figma Designs → 2. Capture Storybook Screenshots → 3. Compare Images → 4. Generate Report
```

### 1. Figma Export

Exports component designs from Figma using the Figma REST API:

- Fetches 2x scale PNG images
- Saves to `visual-tests/figma/`
- Requires `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY`

### 2. Storybook Screenshots

Captures screenshots of Storybook stories using Playwright:

- Renders each story in headless Chrome
- Captures with animations disabled
- Saves to `visual-tests/actual/`

### 3. Image Comparison

Compares Figma vs Actual pixel-by-pixel using `pixelmatch`:

- Highlights visual differences
- Calculates difference percentage
- Generates diff images in `visual-tests/diff/`
- Default threshold: **0.1% (10 pixels per 10,000)**

### 4. Report Generation

Creates an HTML report with side-by-side comparisons:

- Figma design | Actual implementation | Difference
- Visual diff highlighting
- Pass/fail status for each component
- Opens automatically in browser

## Workflow: MCP Hybrid Automation

This system uses a **hybrid approach** combining MCP (Model Context Protocol) for setup and REST API for CI/CD:

```
1. [MCP] Sync Component Mappings → 2. [REST API] Export → 3. [Playwright] Capture → 4. [pixelmatch] Compare
```

### Why Hybrid?

| Approach     | Pros                                                                | Cons                                       | Used For      |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------ | ------------- |
| **MCP**      | ✅ Auto-detects node IDs<br>✅ No manual setup<br>✅ Real-time sync | ❌ Requires Figma Desktop<br>❌ Local only | Initial setup |
| **REST API** | ✅ Works in CI/CD<br>✅ No Desktop needed<br>✅ Team-wide           | ❌ Manual node IDs                         | Automation    |

**Best of Both**: Use MCP once for setup, then REST API handles everything.

---

## Setup

### 1. Get Figma Access Token

1. Visit [Figma Settings → Personal Access Tokens](https://www.figma.com/developers/api#access-tokens)
2. Click "Generate new token"
3. Name it (e.g., "Jagalchi Visual Testing")
4. Copy the token (starts with `figd_`)

### 2. Get Figma File Key

Extract from your Figma file URL:

```
https://figma.com/design/ABC123XYZ/FileName
                        ↑
                   File Key
```

### 3. Add Environment Variables

#### Local Development

Create `.env.local`:

```bash
FIGMA_ACCESS_TOKEN=figd_your_token_here
FIGMA_FILE_KEY=ABC123XYZ
```

#### GitHub Actions (CI)

Add these secrets in GitHub repository settings:

1. Go to Settings → Secrets and variables → Actions
2. Add `FIGMA_ACCESS_TOKEN`
3. Add `FIGMA_FILE_KEY`

### 4. Configure Component Mapping (MCP Auto-Sync)

**Option A: Automatic (Recommended) - MCP-based**

```bash
# Open Figma Desktop with your design file, then run:
pnpm figma:sync
```

This will:

- Scan Figma file using MCP
- Auto-detect component node IDs
- Generate `scripts/figma-components.json`
- Match Figma components with Storybook stories

**Option B: Manual Fallback**

If MCP is unavailable, manually edit `scripts/figma-export.ts`:

```typescript
const FIGMA_COMPONENTS: Record<string, FigmaComponent> = {
  'NodePropertiesPanel-Default': {
    name: 'Node Properties Panel',
    nodeId: '1-1', // ← Get from Figma (right-click → Copy link)
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  // Add more mappings...
};
```

**How to get Figma node ID manually:**

1. Right-click component in Figma
2. Select "Copy link"
3. URL format: `https://figma.com/design/FILE_KEY/Name?node-id=1-2`
4. Node ID is `1:2` (replace `-` with `:`)

## Local Usage

### Initial Setup (Once)

```bash
# 1. Sync component mappings using MCP (Figma Desktop must be open)
pnpm figma:sync

# This generates scripts/figma-components.json with auto-detected node IDs
```

### Run Full Pipeline

```bash
# Export Figma + Capture screenshots + Compare + Generate report
pnpm figma:test
```

This will:

1. Export designs from Figma (uses mappings from figma-components.json)
2. Start Storybook (if not running)
3. Capture screenshots
4. Compare images
5. Generate HTML report
6. Open report in browser

### Run Individual Steps

```bash
# 0. Re-sync if Figma components changed (optional)
pnpm figma:sync

# 1. Export Figma designs only
pnpm figma:export

# 2. Capture screenshots (requires Storybook running)
pnpm storybook  # In another terminal
pnpm figma:screenshots

# 3. Compare images
pnpm figma:compare

# 4. Generate HTML report
pnpm figma:report
open visual-tests/report.html
```

## CI/CD Integration

### Automatic PR Comments

When you create a PR, GitHub Actions will:

1. Run the full comparison pipeline
2. Post results as a PR comment
3. Upload artifacts (images + report)

Example comment:

```
🎨 Figma Visual Regression Results

✅ All components match Figma designs!

Summary:
- Total: 9
- ✅ Passed: 9
- ❌ Failed: 0
- Threshold: 0.1%
```

### Viewing Results

1. Go to PR → Checks → "figma-comparison"
2. Click "Details" → "Summary"
3. Download "visual-test-results" artifact
4. Extract and open `report.html`

## Component Mapping

**✨ Automatic Variant Detection**: The system automatically detects all Figma component variants!

Current mapped components (automatically generated):

| Component            | Variants Detected | Storybook Stories                                               | Status         |
| -------------------- | ----------------- | --------------------------------------------------------------- | -------------- |
| EditorNodeSidebar    | 4 variants        | NodePropertiesPanel-Default, Locked, Closed, ClosedLocked       | ✅ Auto-synced |
| EditorLineSidebar    | 2 variants        | EdgePropertiesPanel-Default, Closed                             | ✅ Auto-synced |
| EditorSectionSidebar | 4 variants        | SectionPropertiesPanel-Default, Locked, Closed, ClosedLocked    | ✅ Auto-synced |
| EditorTextSidebar    | 4 variants        | TextPropertiesPanel-Default, Locked, Closed, ClosedLocked       | ✅ Auto-synced |
| EditorResource       | 2 variants        | ResourcePropertiesPanel-Default, Hover                          | ✅ Auto-synced |
| EditorToolbarItem    | 8 variants        | ToolbarButton-Default, Hover, Active, Disabled, WithDropdown... | ✅ Auto-synced |
| EditorAIMenu         | 1 variant         | RoadmapAiModal-Default                                          | ✅ Auto-synced |

**Total**: 25 variants automatically tested

📖 **See**: [Figma Variant System Documentation](./FIGMA-VARIANT-SYSTEM.md) for details

## Troubleshooting

### Error: "Figma Desktop MCP unavailable"

**Cause**: Figma Desktop is not running or MCP integration is not enabled

**Solution**:

1. Open Figma Desktop application
2. Open your design file
3. Ensure Claude Code has MCP access to Figma
4. Run `pnpm figma:sync` through Claude Code (not terminal)

**Alternative**: Use manual fallback (edit `scripts/figma-export.ts`)

### Error: "FIGMA_ACCESS_TOKEN is required"

**Solution**: Set environment variable:

```bash
export FIGMA_ACCESS_TOKEN=figd_your_token
# Or add to .env.local
```

### Error: "Figma API error: 404"

**Possible causes:**

1. Invalid `FIGMA_FILE_KEY`
2. No access to Figma file
3. Incorrect node ID

**Solution**:

- Verify file key from Figma URL
- Ensure you have view access to the file
- Double-check node IDs (use `:` not `-`)

### Error: "Storybook is not running"

**Solution**: Start Storybook first:

```bash
pnpm storybook
# Then in another terminal:
pnpm figma:screenshots
```

### Error: "Image dimensions don't match"

**Possible causes:**

- Figma design was resized
- Storybook component has responsive behavior

**Solution**:

1. Check if Figma design size matches expected dimensions
2. Fix component styling to match Figma
3. Update Figma design if needed

### High Difference Percentage

**Normal differences:**

- Font rendering (1-2%)
- Anti-aliasing (0.5-1%)
- Shadows/gradients (2-3%)

**Problematic differences:**

- Layout mismatch (>5%)
- Wrong colors (>10%)
- Missing elements (>20%)

**Solution**: Adjust threshold or fix implementation

## Best Practices

### 1. Keep Figma in Sync

- Update Figma before major UI changes
- Lock approved component designs
- Use Figma versions for tracking

### 2. Atomic Comparisons

- Compare individual components, not full pages
- Use consistent viewport sizes
- Disable animations during capture

### 3. Threshold Management

- Default: 0.1% (very strict)
- For complex gradients: 0.5-1%
- For pixel-perfect UI: 0.05%

### 4. Component Naming

Use consistent naming:

- Storybook: `ComponentName-Variant`
- Figma: Same naming convention
- File output: Matches Storybook ID

### 5. Regular Updates

- Review diffs weekly
- Accept intentional changes
- Investigate unexpected differences

## Advanced Configuration

### Custom Threshold Per Component

Edit `scripts/compare-images.ts`:

```typescript
const CUSTOM_THRESHOLDS: Record<string, number> = {
  'NodePropertiesPanel-Default': 0.1,
  'ContextMenu-WithIcons': 0.5, // More lenient for complex UI
};
```

### Different Image Formats

Change export format in `scripts/figma-export.ts`:

```typescript
const imageUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=jpg&scale=2`;
//                                                                              ↑
//                                                                         jpg or png
```

### Ignore Regions

Add mask to `scripts/compare-images.ts`:

```typescript
const mask = new PNG({ width, height });
// Fill mask with white for regions to ignore
// White pixels (255,255,255,255) are ignored
```

## FAQ

### Do I need Figma Desktop for MCP sync?

**Initial setup**: Yes, run `pnpm figma:sync` once with Figma Desktop open

**After setup**: No, CI/CD uses REST API automatically

**Team members**: Only one person needs to run sync, others use generated `figma-components.json`

### Do I need a Figma paid plan?

No, the free plan includes API access. Professional plans offer:

- Unlimited version history
- Better collaboration features

### How long does comparison take?

- Figma export: 1-2 seconds per component
- Screenshot capture: 0.5-1 second per story
- Image comparison: <0.1 second per image
- **Total**: ~1-2 minutes for 10 components

### Can I compare animations?

Not directly. Options:

1. Capture multiple frames and compare
2. Use Chromatic's interaction tests
3. Manual review of animations

### What about responsive designs?

Capture multiple viewport sizes:

```typescript
const viewports = [
  { width: 375, height: 667 }, // Mobile
  { width: 768, height: 1024 }, // Tablet
  { width: 1920, height: 1080 }, // Desktop
];
```

### How do I handle dark mode?

1. Export separate Figma designs for dark mode
2. Capture Storybook with dark mode enabled
3. Compare separately

## Resources

- [Figma REST API Docs](https://www.figma.com/developers/api)
- [Pixelmatch Library](https://github.com/mapbox/pixelmatch)
- [Playwright Screenshot API](https://playwright.dev/docs/screenshots)
- [Visual Regression Testing Guide](https://www.chromatic.com/docs/visual-testing-best-practices)

## Maintenance

### Weekly Checklist

- [ ] Review failed comparisons
- [ ] Update node IDs for new components
- [ ] Sync Figma designs with implementation
- [ ] Accept intentional design changes
- [ ] Archive old comparison reports

### Monthly Review

- [ ] Audit component coverage (target: 100%)
- [ ] Optimize image comparison performance
- [ ] Update documentation
- [ ] Review and adjust thresholds
