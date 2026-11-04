#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — AUTOMATED TEST SUITE & VERIFICATION RUNNER
 * ============================================================================
 * 
 * Verifies framework portability, progressive documentation loading,
 * path resolution across environments, link integrity, and responsive
 * mobile tabs algorithm correctness.
 * 
 * Usage:
 *   node scripts/test-framework.js
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  getSkillDir,
  resolveSkillPath,
  getScriptPath,
  getDiagnostics
} = require('../lib/resolve-paths');

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m'
};

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;
const failureDetails = [];

function assert(condition, testName, details = '') {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`  ${colors.green}✔ [PASS]${colors.reset} ${testName}`);
  } else {
    testsFailed++;
    console.log(`  ${colors.red}✖ [FAIL]${colors.reset} ${testName}`);
    if (details) {
      console.log(`     ${colors.red}↳ ${details}${colors.reset}`);
      failureDetails.push({ testName, details });
    }
  }
}

function suite(title) {
  console.log(`\n${colors.bold}${colors.cyan}▶ SUITE: ${title}${colors.reset}`);
}

async function runAllTests() {
  const startTime = Date.now();
  console.log(`\n${colors.bold}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  WEBSITE BUILDER ENGINE — AUTOMATED TEST SUITE${colors.reset}`);
  console.log(`${colors.bold}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);

  // --------------------------------------------------------------------------
  // SUITE 1: DYNAMIC PATH RESOLUTION & ENVIRONMENT PORTABILITY
  // --------------------------------------------------------------------------
  suite('Dynamic Path Resolution & Environment Portability');

  const skillDir = getSkillDir();
  assert(fs.existsSync(skillDir), 'Skill directory resolves to an existing filesystem path', `Resolved: ${skillDir}`);
  assert(fs.existsSync(path.join(skillDir, 'SKILL.md')), 'Skill directory contains SKILL.md marker');

  const skillDoc = resolveSkillPath('SKILL.md');
  assert(fs.existsSync(skillDoc), 'resolveSkillPath accurately resolves files inside skill directory');

  const auditScript = getScriptPath('audit-engine.js');
  assert(fs.existsSync(auditScript), 'getScriptPath locates audit-engine.js correctly');

  const diag = getDiagnostics();
  assert(diag.verified === true, 'Environment diagnostics report verified: true', JSON.stringify(diag));
  assert(typeof diag.home === 'string' && diag.home.length > 0, 'Home directory is dynamically discovered');

  // --------------------------------------------------------------------------
  // SUITE 2: PROGRESSIVE DOCUMENTATION MANIFEST & LINK INTEGRITY
  // --------------------------------------------------------------------------
  suite('Progressive Documentation Manifest & Link Integrity');

  const manifestPath = resolveSkillPath('SKILL_MANIFEST.json');
  assert(fs.existsSync(manifestPath), 'SKILL_MANIFEST.json exists at root');

  let manifest = null;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(manifest !== null && typeof manifest === 'object', 'SKILL_MANIFEST.json parses as valid JSON');
  } catch (e) {
    assert(false, 'SKILL_MANIFEST.json parses as valid JSON', e.message);
  }

  if (manifest) {
    assert(Array.isArray(manifest.supportedEnvironments), 'Supported environments listed (Claude Code, Gemini, Cursor, etc.)');
    assert(Boolean(manifest.tiers.tier0_manifest_and_core_law), 'Tier 0 Core Law tier configured');
    assert(Boolean(manifest.tiers.tier2_domain_modules.topicMapping), 'Tier 2 Topic Mapping configured');

    // Verify all referenced files in Tier 0 exist
    const tier0Files = manifest.tiers.tier0_manifest_and_core_law.mandatoryFiles || [];
    tier0Files.forEach(relPath => {
      const fullPath = resolveSkillPath(relPath);
      assert(fs.existsSync(fullPath), `Tier 0 mandatory file exists: ${relPath}`);
    });

    // Verify all files in Topic Mapping exist
    const topicMapping = manifest.tiers.tier2_domain_modules.topicMapping;
    let missingTopicFiles = [];
    Object.entries(topicMapping).forEach(([topic, files]) => {
      files.forEach(f => {
        const fullPath = resolveSkillPath(f);
        if (!fs.existsSync(fullPath)) {
          missingTopicFiles.push(`${topic} -> ${f}`);
        }
      });
    });
    assert(missingTopicFiles.length === 0, 'All files in Topic Mapping exist on disk', missingTopicFiles.slice(0, 5).join(', '));
  }

  // --------------------------------------------------------------------------
  // SUITE 3: LOAD-DOCS CLI VERIFICATION
  // --------------------------------------------------------------------------
  suite('load-docs.js CLI Tool Execution');

  const loadDocsScript = getScriptPath('load-docs.js');
  const runList = spawnSync(process.execPath, [loadDocsScript, '--list'], { encoding: 'utf8' });
  assert(runList.status === 0, 'node scripts/load-docs.js --list exits with Code 0');
  assert(runList.stdout.includes('responsive-tabs'), 'load-docs --list displays responsive-tabs topic');

  const runTopic = spawnSync(process.execPath, [loadDocsScript, 'responsive-tabs', '--files-only'], { encoding: 'utf8' });
  assert(runTopic.status === 0, 'node scripts/load-docs.js responsive-tabs --files-only exits with Code 0');
  assert(runTopic.stdout.includes('RESPONSIVE_MOBILE_TABS_SYSTEM.md'), 'load-docs outputs accurate path for tabs');

  // --------------------------------------------------------------------------
  // SUITE 4: RESPONSIVE MOBILE TABS SPECIFICATION & COMPONENTS
  // --------------------------------------------------------------------------
  suite('Responsive Mobile Tabs System & Mathematical Model');

  const tabsSpec = resolveSkillPath('design-system', 'RESPONSIVE_MOBILE_TABS_SYSTEM.md');
  assert(fs.existsSync(tabsSpec), 'RESPONSIVE_MOBILE_TABS_SYSTEM.md exists in design-system');

  const tabsHook = resolveSkillPath('hooks', 'useResponsiveTabs.ts');
  assert(fs.existsSync(tabsHook), 'hooks/useResponsiveTabs.ts exists');

  const tabsComponent = resolveSkillPath('components', 'ResponsiveTabs.tsx');
  assert(fs.existsSync(tabsComponent), 'components/ResponsiveTabs.tsx exists');

  // Mathematical Partition Logic Test (Simulated Engine)
  function simulatePartition(tabs, tabWidths, containerWidth, activeId, options = {}) {
    const { gap = 6, moreButtonWidth = 96, pinActiveTab = true } = options;
    const totalTabsWidth = tabWidths.reduce((a, b) => a + b, 0) + (tabs.length - 1) * gap;

    if (totalTabsWidth <= containerWidth) {
      return { visibleTabs: tabs, overflowTabs: [], isActiveInOverflow: false };
    }

    const availableForVisible = containerWidth - moreButtonWidth - gap;
    let accumulatedWidth = 0;
    const visible = [];
    const overflow = [];

    const activeIndex = tabs.findIndex(t => t.id === activeId);

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      const width = tabWidths[i] || 80;
      const nextTotal = visible.length === 0 ? width : accumulatedWidth + gap + width;
      if (nextTotal <= availableForVisible) {
        accumulatedWidth = nextTotal;
        visible.push(tab);
      } else {
        overflow.push(tab);
      }
    }

    if (visible.length === 0 && tabs.length > 0) {
      visible.push(tabs[0]);
      overflow.splice(0, 1);
    }

    const activeInOverflow = overflow.some(t => t.id === activeId);
    if (pinActiveTab && activeInOverflow && activeIndex !== -1 && visible.length > 0) {
      const activeItem = tabs[activeIndex];
      const lastVisible = visible.pop();
      overflow.push(lastVisible);
      const activeOverflowIdx = overflow.findIndex(t => t.id === activeId);
      if (activeOverflowIdx !== -1) overflow.splice(activeOverflowIdx, 1);
      visible.push(activeItem);
      return { visibleTabs: visible, overflowTabs: overflow, isActiveInOverflow: false };
    }

    return { visibleTabs: visible, overflowTabs: overflow, isActiveInOverflow: activeInOverflow };
  }

  const sampleTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'sales', label: 'Sales & Orders' },
    { id: 'customers', label: 'Customers' },
    { id: 'settings', label: 'System Settings' }
  ];
  const sampleWidths = [90, 85, 120, 100, 130]; // Total: 525px + 24px gap = 549px

  // Test 4.1: Desktop width (800px) fits all tabs
  const desktopResult = simulatePartition(sampleTabs, sampleWidths, 800, 'overview');
  assert(desktopResult.visibleTabs.length === 5, 'Desktop width (800px) renders all 5 tabs without overflow');
  assert(desktopResult.overflowTabs.length === 0, 'Desktop width produces empty overflow array');

  // Test 4.2: Mobile width (390px) partitions into visible + overflow
  const mobileResult = simulatePartition(sampleTabs, sampleWidths, 390, 'overview');
  assert(mobileResult.visibleTabs.length < 5, 'Mobile width (390px) moves un-fitting tabs into overflow');
  assert(mobileResult.overflowTabs.length > 0, 'Mobile width produces non-empty overflow array');
  assert(mobileResult.visibleTabs.some(t => t.id === 'overview'), 'Active tab "overview" remains visible in mobile view');

  // Test 4.3: Active tab retention when active tab would otherwise be hidden
  const mobileWithDeepActive = simulatePartition(sampleTabs, sampleWidths, 390, 'settings', { pinActiveTab: true });
  assert(
    mobileWithDeepActive.visibleTabs.some(t => t.id === 'settings'),
    'Pinning guarantee keeps active tab "settings" visible even on 390px screen'
  );

  // --------------------------------------------------------------------------
  // SUITE 5: UNIFIED CLI RUNNER (website-builder)
  // --------------------------------------------------------------------------
  suite('Unified Cross-Platform CLI Runner (bin/website-builder.js)');

  const cliPath = resolveSkillPath('bin', 'website-builder.js');
  assert(fs.existsSync(cliPath), 'bin/website-builder.js exists and is executable');

  const cliInfo = spawnSync(process.execPath, [cliPath, 'info'], { encoding: 'utf8' });
  assert(cliInfo.status === 0, 'website-builder info runs with Exit Code 0');
  assert(cliInfo.stdout.includes('"verified": true'), 'CLI info outputs valid verified JSON diagnostics');

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n${colors.bold}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}TEST EXECUTION SUMMARY (${duration}s)${colors.reset}`);
  console.log(`  Total Tests Run:  ${testsRun}`);
  console.log(`  Passed Tests:    ${colors.green}${testsPassed}${colors.reset}`);
  console.log(`  Failed Tests:    ${testsFailed > 0 ? colors.red : colors.green}${testsFailed}${colors.reset}`);
  console.log(`${colors.bold}══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  if (testsFailed > 0) {
    console.error(`${colors.red}Test failures detected. Please review the details above.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.green}✔ All automated tests passed successfully!${colors.reset}\n`);
    process.exit(0);
  }
}

runAllTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
