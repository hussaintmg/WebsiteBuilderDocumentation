#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — PROGRESSIVE DOCUMENTATION LOADER
 * ============================================================================
 * 
 * Solves context blowout by allowing AI agents to load targeted documentation
 * on-demand based on their current task (e.g. tabs, buttons, auth, datatable,
 * retrofit, payments, storage) rather than attempting to ingest the entire
 * 1.8MB BRAIN.md at once.
 * 
 * Usage:
 *   node scripts/load-docs.js <topic> [--content] [--files-only]
 *   node scripts/load-docs.js --list
 * 
 * Examples:
 *   node scripts/load-docs.js responsive-tabs --content
 *   node scripts/load-docs.js buttons
 *   node scripts/load-docs.js --list
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { getSkillDir, resolveSkillPath } = require('./resolve-paths');

const args = process.argv.slice(2);
const isList = args.includes('--list');
const isContent = args.includes('--content');
const isFilesOnly = args.includes('--files-only');
const topicArg = args.find(a => !a.startsWith('--'));

function loadManifest() {
  const manifestPath = resolveSkillPath('SKILL_MANIFEST.json');
  if (fs.existsSync(manifestPath)) {
    try {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      return null;
    }
  }
  return null;
}

function run() {
  const manifest = loadManifest();
  if (!manifest) {
    console.error('Error: SKILL_MANIFEST.json not found in skill root:', getSkillDir());
    process.exit(1);
  }

  const topicMapping = manifest.tiers.tier2_domain_modules.topicMapping;

  if (isList || !topicArg) {
    console.log('\nAvailable Website Builder Engine Topics:');
    console.log('════════════════════════════════════════');
    Object.keys(topicMapping).sort().forEach(topic => {
      console.log(`  • ${topic.padEnd(20)} -> ${topicMapping[topic].join(', ')}`);
    });
    console.log('\nUsage: node scripts/load-docs.js <topic> [--content | --files-only]');
    process.exit(0);
  }

  const normalizedTopic = topicArg.toLowerCase().trim();
  const matchedFiles = topicMapping[normalizedTopic];

  if (!matchedFiles || matchedFiles.length === 0) {
    // Try partial match
    const candidates = Object.keys(topicMapping).filter(k => k.includes(normalizedTopic) || normalizedTopic.includes(k));
    if (candidates.length > 0) {
      console.log(`\nTopic "${topicArg}" not found exactly. Did you mean:`);
      candidates.forEach(c => console.log(`  • ${c}`));
    } else {
      console.error(`\nUnknown topic: "${topicArg}". Run with --list to see available topics.`);
    }
    process.exit(1);
  }

  const resolvedPaths = matchedFiles.map(f => resolveSkillPath(f));

  if (isFilesOnly) {
    resolvedPaths.forEach(p => console.log(p));
    process.exit(0);
  }

  console.log(`\nDocumentation for topic: "${normalizedTopic}"`);
  console.log('══════════════════════════════════════════════════════════════════════════════');
  resolvedPaths.forEach((p, idx) => {
    console.log(`[File ${idx + 1}/${resolvedPaths.length}]: ${p}`);
  });
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  if (isContent) {
    resolvedPaths.forEach(p => {
      if (fs.existsSync(p)) {
        console.log(`\n/* ========== BEGIN: ${path.basename(p)} ========== */\n`);
        console.log(fs.readFileSync(p, 'utf8'));
        console.log(`\n/* ========== END: ${path.basename(p)} ========== */\n`);
      } else {
        console.log(`[Warning] File not found on disk: ${p}`);
      }
    });
  } else {
    console.log('Tip: Pass --content to print the full file contents, or read the files above directly.\n');
  }
}

run();

