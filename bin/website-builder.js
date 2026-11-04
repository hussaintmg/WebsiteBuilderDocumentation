#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — UNIFIED CROSS-PLATFORM CLI
 * ============================================================================
 * 
 * Single entry point for all framework tools across Claude Code, Gemini,
 * Cursor, Linux, macOS, and Windows.
 * 
 * Commands:
 *   website-builder audit [target-dir] [--brain]
 *   website-builder scaffold [target-dir]
 *   website-builder docs <topic> [--content]
 *   website-builder compile
 *   website-builder test
 *   website-builder info
 * ============================================================================
 */

const path = require('path');
const { spawnSync } = require('child_process');
const { getSkillDir, getScriptPath, getDiagnostics } = require('../lib/resolve-paths');

const [,, command, ...args] = process.argv;

function runScript(scriptName, extraArgs = []) {
  const scriptPath = getScriptPath(scriptName);
  const result = spawnSync(process.execPath, [scriptPath, ...extraArgs], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env
  });
  process.exit(result.status || 0);
}

function showHelp() {
  console.log(`
Website Builder Engine CLI v2.1.0
══════════════════════════════════════════════════════════════════════════════
Usage: website-builder <command> [options]

Commands:
  audit [dir]       Run the 10-suite compliance audit & quality gate on a project
  scaffold [dir]    Auto-scaffold core utilities, hooks, portals, and contexts
  docs <topic>      Load targeted documentation without context blowout
  compile           Recompile all modular specs into BRAIN.md
  test              Run automated framework tests & verification
  info              Display detected environment paths and framework health

Examples:
  website-builder audit .
  website-builder scaffold .
  website-builder docs responsive-tabs --content
  website-builder info
══════════════════════════════════════════════════════════════════════════════
`);
}

switch (command) {
  case 'audit':
    runScript('audit-engine.js', args);
    break;

  case 'scaffold':
    runScript('scaffold-engine.js', args);
    break;

  case 'docs':
  case 'load-docs':
    runScript('load-docs.js', args);
    break;

  case 'compile':
    runScript('compile-brain.js', args);
    break;

  case 'test':
    runScript('test-framework.js', args);
    break;

  case 'info':
  case 'diagnostics':
    console.log('\nWebsite Builder Engine Diagnostics:');
    console.log('════════════════════════════════════════');
    const diag = getDiagnostics();
    console.log(JSON.stringify(diag, null, 2));
    break;

  case '--help':
  case '-h':
  case 'help':
  case undefined:
    showHelp();
    break;

  default:
    console.error(`Unknown command: "${command}". Run "website-builder help" for usage.`);
    process.exit(1);
}

