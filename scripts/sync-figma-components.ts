#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Figma Component Sync Script (MCP-based)
 *
 * Automatically scans Figma file using MCP and generates component mappings.
 * Eliminates manual node ID configuration.
 *
 * Usage:
 *   1. Open Figma Desktop with your design file
 *   2. Run: pnpm figma:sync
 *   3. Component mappings are saved to scripts/figma-components.json
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

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
 * Expected Storybook story names that need Figma mappings
 */
const EXPECTED_STORIES = [
  'NodePropertiesPanel-Default',
  'EdgePropertiesPanel-Default',
  'SectionPropertiesPanel-Default',
  'TextPropertiesPanel-Default',
  'ResourcePropertiesPanel-Default',
  'ContextMenu-Default',
  'ToolbarButton-Default',
  'EditorButton-Default',
  'RoadmapAiModal-Default',
];

/**
 * Figma component name patterns to match with Storybook stories
 * Allows flexible matching (e.g., "Node Properties" matches "NodePropertiesPanel")
 */
const FIGMA_NAME_PATTERNS: Record<string, string[]> = {
  'NodePropertiesPanel-Default': ['Node Properties Panel', 'NodePropertiesPanel', 'Node Panel'],
  'EdgePropertiesPanel-Default': ['Edge Properties Panel', 'EdgePropertiesPanel', 'Edge Panel'],
  'SectionPropertiesPanel-Default': [
    'Section Properties Panel',
    'SectionPropertiesPanel',
    'Section Panel',
  ],
  'TextPropertiesPanel-Default': ['Text Properties Panel', 'TextPropertiesPanel', 'Text Panel'],
  'ResourcePropertiesPanel-Default': [
    'Resource Properties Panel',
    'ResourcePropertiesPanel',
    'Resource Panel',
  ],
  'ContextMenu-Default': ['Context Menu', 'ContextMenu'],
  'ToolbarButton-Default': ['Toolbar Button', 'ToolbarButton'],
  'EditorButton-Default': ['Editor Button', 'EditorButton'],
  'RoadmapAiModal-Default': ['AI Modal', 'RoadmapAiModal', 'Roadmap AI Modal'],
};

/**
 * Parse XML metadata from Figma to extract components
 */
function parseMetadataXML(xml: string): Array<{ name: string; nodeId: string }> {
  const components: Array<{ name: string; nodeId: string }> = [];

  // Simple regex-based XML parsing (good enough for structured Figma XML)
  const framePattern = /<FRAME[^>]*name="([^"]*)"[^>]*node-id="([^"]*)"[^>]*\/>/g;
  const componentPattern = /<COMPONENT[^>]*name="([^"]*)"[^>]*node-id="([^"]*)"[^>]*\/>/g;

  let match;

  // Extract FRAMEs
  while ((match = framePattern.exec(xml)) !== null) {
    const [, name, nodeId] = match;
    if (name && nodeId) {
      components.push({ name, nodeId });
    }
  }

  // Extract COMPONENTs
  while ((match = componentPattern.exec(xml)) !== null) {
    const [, name, nodeId] = match;
    if (name && nodeId) {
      components.push({ name, nodeId });
    }
  }

  return components;
}

/**
 * Match Figma component name with Storybook story name
 */
function matchStorybookName(figmaName: string): string | null {
  for (const [storybookName, patterns] of Object.entries(FIGMA_NAME_PATTERNS)) {
    for (const pattern of patterns) {
      if (figmaName.toLowerCase().includes(pattern.toLowerCase())) {
        return storybookName;
      }
    }
  }
  return null;
}

async function main() {
  console.log('🔍 Scanning Figma file using MCP...\n');

  try {
    // Note: This script requires Figma Desktop to be running with MCP integration
    // Since we can't directly call MCP from Node.js, this is a placeholder
    // In actual usage, Claude Code will execute this with MCP access

    console.log('⚠️  This script requires Figma Desktop MCP integration.');
    console.log('⚠️  Please run this script through Claude Code with Figma Desktop open.\n');

    // For now, create a template file
    const outputPath = path.join(process.cwd(), 'scripts/figma-components.json');

    const templateResult: SyncResult = {
      timestamp: new Date().toISOString(),
      fileKey: process.env.FIGMA_FILE_KEY || 'YOUR_FILE_KEY',
      mappings: EXPECTED_STORIES.map((story) => ({
        storybookName: story,
        figmaName: FIGMA_NAME_PATTERNS[story]?.[0] || story,
        nodeId: 'PLACEHOLDER', // Will be replaced by MCP scan
        fileKey: process.env.FIGMA_FILE_KEY || 'YOUR_FILE_KEY',
      })),
    };

    await fs.writeFile(outputPath, JSON.stringify(templateResult, null, 2));

    console.log('📄 Template mapping file created:');
    console.log(`   ${outputPath}\n`);
    console.log('Next steps:');
    console.log('   1. Open Figma Desktop with your design file');
    console.log('   2. Run this script through Claude Code');
    console.log('   3. Claude will use MCP to scan and update mappings automatically');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// Export for use by Claude Code with MCP access
export { parseMetadataXML, matchStorybookName, EXPECTED_STORIES, FIGMA_NAME_PATTERNS };

// Only run main if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  });
}
