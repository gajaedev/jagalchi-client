#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Report Generator Script
 *
 * Generates an HTML report from the comparison results.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

interface ComparisonResult {
  name: string;
  figmaPath: string;
  actualPath: string;
  diffPath: string;
  diffPixels: number;
  diffPercentage: number;
  width: number;
  height: number;
  passed: boolean;
}

interface ComparisonReport {
  timestamp: string;
  total: number;
  passed: number;
  failed: number;
  threshold: number;
  results: ComparisonResult[];
}

function generateHTML(report: ComparisonReport): string {
  const passedResults = report.results.filter((r) => r.passed);
  const failedResults = report.results.filter((r) => !r.passed);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Regression Report - ${new Date(report.timestamp).toLocaleDateString()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 2rem;
      line-height: 1.6;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #111827;
    }
    .subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .summary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .summary-card h3 {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .summary-card .value {
      font-size: 2rem;
      font-weight: bold;
      color: #111827;
    }
    .summary-card.passed .value { color: #10b981; }
    .summary-card.failed .value { color: #ef4444; }
    .section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .section h2 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: #111827;
    }
    .results-grid {
      display: grid;
      gap: 2rem;
    }
    .result {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      background: #fafafa;
    }
    .result.failed {
      border-color: #fca5a5;
      background: #fef2f2;
    }
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .result-title {
      font-weight: 600;
      font-size: 1.125rem;
      color: #111827;
    }
    .result-status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .result-status.passed {
      background: #d1fae5;
      color: #065f46;
    }
    .result-status.failed {
      background: #fee2e2;
      color: #991b1b;
    }
    .result-meta {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
    .result-meta span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .images {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .image-container {
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      background: white;
    }
    .image-container img {
      width: 100%;
      height: auto;
      display: block;
    }
    .image-label {
      padding: 0.5rem;
      font-size: 0.75rem;
      text-align: center;
      background: #f9fafb;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .filter-buttons {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
    .filter-btn:hover {
      background: #f9fafb;
    }
    .filter-btn.active {
      background: #111827;
      color: white;
      border-color: #111827;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual Regression Report</h1>
    <p class="subtitle">Generated on ${new Date(report.timestamp).toLocaleString()}</p>

    <div class="summary">
      <div class="summary-card">
        <h3>Total</h3>
        <div class="value">${report.total}</div>
      </div>
      <div class="summary-card passed">
        <h3>Passed</h3>
        <div class="value">${report.passed}</div>
      </div>
      <div class="summary-card failed">
        <h3>Failed</h3>
        <div class="value">${report.failed}</div>
      </div>
      <div class="summary-card">
        <h3>Threshold</h3>
        <div class="value">${report.threshold * 100}%</div>
      </div>
    </div>

    ${
      failedResults.length > 0
        ? `
    <div class="section">
      <h2>❌ Failed (${failedResults.length})</h2>
      <div class="results-grid">
        ${failedResults.map((result) => generateResultHTML(result)).join('')}
      </div>
    </div>
    `
        : ''
    }

    ${
      passedResults.length > 0
        ? `
    <div class="section">
      <h2>✅ Passed (${passedResults.length})</h2>
      <div class="filter-buttons">
        <button class="filter-btn active" onclick="togglePassed()">Show All</button>
        <button class="filter-btn" onclick="togglePassed()">Hide All</button>
      </div>
      <div class="results-grid" id="passed-results">
        ${passedResults.map((result) => generateResultHTML(result)).join('')}
      </div>
    </div>
    `
        : ''
    }
  </div>

  <script>
    function togglePassed() {
      const results = document.getElementById('passed-results');
      results.style.display = results.style.display === 'none' ? 'grid' : 'none';
    }
  </script>
</body>
</html>`;
}

function generateResultHTML(result: ComparisonResult): string {
  const statusClass = result.passed ? 'passed' : 'failed';
  const statusText = result.passed ? 'Passed' : 'Failed';

  // Convert absolute paths to relative paths for images
  const figmaPath = path.relative(path.join(process.cwd(), 'visual-tests'), result.figmaPath);
  const actualPath = path.relative(path.join(process.cwd(), 'visual-tests'), result.actualPath);
  const diffPath = path.relative(path.join(process.cwd(), 'visual-tests'), result.diffPath);

  return `
    <div class="result ${statusClass}">
      <div class="result-header">
        <div class="result-title">${result.name}</div>
        <div class="result-status ${statusClass}">${statusText}</div>
      </div>
      <div class="result-meta">
        <span>📏 ${result.width}×${result.height}</span>
        <span>🔍 ${result.diffPercentage}% different</span>
        <span>🎨 ${result.diffPixels.toLocaleString()} pixels</span>
      </div>
      <div class="images">
        <div class="image-container">
          <img src="${figmaPath}" alt="Figma Design" />
          <div class="image-label">Figma Design</div>
        </div>
        <div class="image-container">
          <img src="${actualPath}" alt="Actual" />
          <div class="image-label">Actual</div>
        </div>
        <div class="image-container">
          <img src="${diffPath}" alt="Difference" />
          <div class="image-label">Difference</div>
        </div>
      </div>
    </div>
  `;
}

async function main() {
  const reportPath = path.join(process.cwd(), 'visual-tests/comparison-report.json');
  const outputPath = path.join(process.cwd(), 'visual-tests/report.html');

  try {
    await fs.access(reportPath);
  } catch {
    console.error('❌ Comparison report not found');
    console.log('\nRun comparison first:');
    console.log('  pnpm run visual:compare');
    process.exit(1);
  }

  console.log('📄 Generating HTML report...\n');

  const reportData = await fs.readFile(reportPath, 'utf-8');
  const report: ComparisonReport = JSON.parse(reportData);

  const html = generateHTML(report);
  await fs.writeFile(outputPath, html);

  console.log(`✅ Report generated: ${outputPath}`);
  console.log('\nOpen in browser:');
  console.log(`  open ${outputPath}`);
}

main().catch((error) => {
  console.error('❌ Report generation failed:', error);
  process.exit(1);
});
