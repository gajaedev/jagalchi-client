#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Figma Variant Auto-Sync Script
 *
 * Automatically detects all variants from Figma component frames.
 * Matches variants with Storybook stories based on naming conventions.
 *
 * Usage:
 *   This script is called by Claude Code with MCP access.
 *   Component frame URLs are provided, and all variants are auto-detected.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

interface FigmaVariant {
  nodeId: string;
  name: string;
  state?: string;
  lock?: string;
}

interface FigmaComponentMapping {
  storybookName: string;
  figmaName: string;
  nodeId: string;
  fileKey: string;
}

interface SyncResult {
  timestamp: string;
  fileKey: string;
  mappings: FigmaComponentMapping[];
}

/**
 * Component definitions with frame URLs
 * Frame URLs point to the component container with all variants
 */
const FIGMA_COMPONENTS: Record<string, { name: string; frameNodeId: string }> = {
  EditorNodeSidebar: {
    name: 'Editor Node Sidebar',
    frameNodeId: '4472:1569',
  },
  EditorLineSidebar: {
    name: 'Editor Line Sidebar',
    frameNodeId: '4480:2347',
  },
  EditorSectionSidebar: {
    name: 'Editor Section Sidebar',
    frameNodeId: '4480:3024',
  },
  EditorTextSidebar: {
    name: 'Editor Text Sidebar',
    frameNodeId: '4530:3273',
  },
  EditorResourceSidebar: {
    name: 'Editor Resource',
    frameNodeId: '4630:4112',
  },
  EditorToolbarItem: {
    name: 'Editor Toolbar Item',
    frameNodeId: '4357:2996',
  },
  EditorAIMenu: {
    name: 'Editor AI Menu',
    frameNodeId: '4573:3099',
  },
};

/**
 * Parse Figma variant name to extract state properties
 * Example: "State=Default, Lock=False" → { state: "Default", lock: "False" }
 */
function parseVariantName(name: string): { state?: string; lock?: string } {
  const props: { state?: string; lock?: string } = {};

  const stateMath = name.match(/State=([^,]+)/);
  if (stateMath) {
    props.state = stateMath[1]?.trim();
  }

  const lockMatch = name.match(/Lock=([^,]+)/);
  if (lockMatch) {
    props.lock = lockMatch[1]?.trim();
  }

  return props;
}

/**
 * Convert Figma variant to Storybook story name
 * Example: { state: "Default", lock: "False" } → "Default"
 */
function variantToStoryName(props: { state?: string; lock?: string }): string {
  // For now, use state as the variant name
  return props.state || 'Default';
}

/**
 * Parse metadata XML from MCP to extract variants
 * Looks for SYMBOL tags which represent component variants
 */
export function parseVariantsFromMetadata(xml: string): FigmaVariant[] {
  const variants: FigmaVariant[] = [];

  // Match SYMBOL tags (these are component variants in Figma)
  const symbolPattern = /<symbol id="([^"]+)" name="([^"]+)"/g;
  let match;

  while ((match = symbolPattern.exec(xml)) !== null) {
    const [, nodeId, name] = match;
    if (nodeId && name) {
      const props = parseVariantName(name);
      variants.push({
        nodeId,
        name,
        ...props,
      });
    }
  }

  return variants;
}

/**
 * Generate Storybook story name from component and variant
 * Example: EditorNodeSidebar + Default → NodePropertiesPanel-Default
 */
function generateStorybookName(componentKey: string, variantName: string): string {
  const nameMap: Record<string, string> = {
    EditorNodeSidebar: 'NodePropertiesPanel',
    EditorLineSidebar: 'EdgePropertiesPanel',
    EditorSectionSidebar: 'SectionPropertiesPanel',
    EditorTextSidebar: 'TextPropertiesPanel',
    EditorResourceSidebar: 'ResourcePropertiesPanel',
    EditorToolbarItem: 'ToolbarButton',
    EditorAIMenu: 'RoadmapAiModal',
  };

  const storybookComponent = nameMap[componentKey] || componentKey;
  return `${storybookComponent}-${variantName}`;
}

/**
 * Main function (called by Claude Code with MCP access)
 * This is a template - actual MCP calls are done by Claude
 */
async function main() {
  console.log('🔍 Scanning Figma components for variants...\n');

  const fileKey = process.env.FIGMA_FILE_KEY;
  if (!fileKey) {
    throw new Error(
      'FIGMA_FILE_KEY environment variable is required. Set it in .env.local or export it.',
    );
  }
  const mappings: FigmaComponentMapping[] = [];

  // Note: This would be called by Claude Code with MCP access
  // For each component, Claude will:
  // 1. Call mcp__figma__get_metadata(frameNodeId)
  // 2. Parse variants using parseVariantsFromMetadata()
  // 3. Generate mappings

  // Example output structure:
  for (const [componentKey, component] of Object.entries(FIGMA_COMPONENTS)) {
    console.log(`📦 ${component.name} (${component.frameNodeId})`);
    console.log('   Variants will be auto-detected by Claude with MCP\n');

    // Placeholder mapping (Claude will replace with actual variants)
    mappings.push({
      storybookName: generateStorybookName(componentKey, 'Default'),
      figmaName: `${component.name} (Default)`,
      nodeId: component.frameNodeId, // Will be replaced with variant nodeId
      fileKey,
    });
  }

  const outputPath = path.join(process.cwd(), 'scripts/figma-components.json');
  const result: SyncResult = {
    timestamp: new Date().toISOString(),
    fileKey,
    mappings,
  };

  await fs.writeFile(outputPath, JSON.stringify(result, null, 2));

  console.log('✅ Template mapping file created');
  console.log(`   ${outputPath}\n`);
  console.log('⚠️  Run this through Claude Code to detect actual variants');
}

// Export for use by other scripts
export { parseVariantName, variantToStoryName, generateStorybookName, FIGMA_COMPONENTS };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
