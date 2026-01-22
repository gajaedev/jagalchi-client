#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Figma Export Script
 *
 * Exports component screenshots from Figma using the Figma REST API.
 * Requires FIGMA_ACCESS_TOKEN environment variable.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

interface FigmaComponent {
  name: string;
  nodeId: string;
  fileKey: string;
}

/**
 * Component mapping from Storybook to Figma
 * Format: { storybookName: { name, nodeId, fileKey } }
 */
const FIGMA_COMPONENTS: Record<string, FigmaComponent> = {
  // Property Panels
  'NodePropertiesPanel-Default': {
    name: 'Node Properties Panel',
    nodeId: '1-1', // Replace with actual Figma node IDs
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  'EdgePropertiesPanel-Default': {
    name: 'Edge Properties Panel',
    nodeId: '1-2',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  'SectionPropertiesPanel-Default': {
    name: 'Section Properties Panel',
    nodeId: '1-3',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  'TextPropertiesPanel-Default': {
    name: 'Text Properties Panel',
    nodeId: '1-4',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  'ResourcePropertiesPanel-Default': {
    name: 'Resource Properties Panel',
    nodeId: '1-5',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },

  // Interactive Components
  'ContextMenu-Default': {
    name: 'Context Menu',
    nodeId: '2-1',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  'ToolbarButton-Default': {
    name: 'Toolbar Button',
    nodeId: '2-2',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
  'EditorButton-Default': {
    name: 'Editor Button',
    nodeId: '2-3',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },

  // AI Features
  'RoadmapAiModal-Default': {
    name: 'AI Modal',
    nodeId: '3-1',
    fileKey: process.env.FIGMA_FILE_KEY || '',
  },
};

interface FigmaImageResponse {
  err: string | null;
  images: Record<string, string>;
}

async function exportFigmaImage(
  fileKey: string,
  nodeId: string,
  outputPath: string,
): Promise<void> {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is required');
  }

  // Get image URL from Figma API
  const imageUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=2`;
  const response = await fetch(imageUrl, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as FigmaImageResponse;

  if (data.err) {
    throw new Error(`Figma API error: ${data.err}`);
  }

  const imageDownloadUrl = data.images[nodeId];
  if (!imageDownloadUrl) {
    throw new Error(`No image URL returned for node ${nodeId}`);
  }

  // Download image
  const imageResponse = await fetch(imageDownloadUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image: ${imageResponse.statusText}`);
  }

  const buffer = await imageResponse.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(buffer));

  console.log(`✓ Exported: ${path.basename(outputPath)}`);
}

async function main() {
  const outputDir = path.join(process.cwd(), 'visual-tests/figma');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const fileKey = process.env.FIGMA_FILE_KEY;
  if (!fileKey) {
    console.error('❌ FIGMA_FILE_KEY environment variable is required');
    console.log('\nSet it in your .env file or export it:');
    console.log('  export FIGMA_FILE_KEY=your-file-key');
    console.log('\nExtract from Figma URL: https://figma.com/design/FILE_KEY/...');
    process.exit(1);
  }

  console.log('🎨 Exporting Figma components...\n');

  let exported = 0;
  let skipped = 0;

  for (const [storybookName, component] of Object.entries(FIGMA_COMPONENTS)) {
    try {
      if (!component.nodeId || component.nodeId === '1-1') {
        console.log(`⚠ Skipped: ${storybookName} (no Figma node ID configured)`);
        skipped++;
        continue;
      }

      const outputPath = path.join(outputDir, `${storybookName}.png`);
      await exportFigmaImage(fileKey, component.nodeId, outputPath);
      exported++;
    } catch (error) {
      console.error(`✗ Failed to export ${storybookName}:`, error);
    }
  }

  console.log(`\n✅ Exported ${exported} images`);
  if (skipped > 0) {
    console.log(`⚠️  Skipped ${skipped} images (configure node IDs in scripts/figma-export.ts)`);
  }
}

main().catch((error) => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
