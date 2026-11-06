#!/usr/bin/env node
'use strict';

/**
 * Architecture-aware project verification runner.
 * Missing commands are reported as NOT CONFIGURED, never as PASS.
 * This tool does not install dependencies or mutate the target project.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith('--')) || '.';
const target = path.resolve(targetArg);
const timeout = Number(process.env.WBE_CHECK_TIMEOUT_MS || 120000);
const results = [];

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { return null; }
}
function add(name, status, detail, command = '') {
  results.push({ name, status, detail, command });
  const icon = status === 'PASS' ? 'PASS' : status === 'FAIL' ? 'FAIL' : status;
  console.log('[' + icon + '] ' + name + (command ? ' — ' + command : ''));
  if (detail) console.log('       ' + detail);
}
function detectPackageManager(dir) {
  if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(dir, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(dir, 'bun.lockb')) || fs.existsSync(path.join(dir, 'bun.lock'))) return 'bun';
  return 'npm';
}
function commandFor(manager, script) {
  if (manager === 'yarn') return ['yarn', [script]];
  if (manager === 'pnpm') return ['pnpm', ['run', script]];
  if (manager === 'bun') return ['bun', ['run', script]];
  return ['npm', ['run', script]];
}
function runScript(pkg, manager, script, label) {
  if (!pkg || !pkg.scripts || typeof pkg.scripts[script] !== 'string') {
    add(label, 'NOT CONFIGURED', 'No "' + script + '" script exists in package.json.');
    return;
  }
  const [bin, argv] = commandFor(manager, script);
  let result;
  try {
    result = spawnSync(bin, argv, { cwd: target, encoding: 'utf8', timeout, maxBuffer: 8 * 1024 * 1024, shell: process.platform === 'win32' });
  } catch (error) {
    add(label, 'BLOCKED', error.message, bin + ' ' + argv.join(' '));
    return;
  }
  const output = ((result.stdout || '') + '\n' + (result.stderr || '')).trim();
  if (result.error) {
    const status = result.error.code === 'ETIMEDOUT' ? 'BLOCKED' : 'BLOCKED';
    add(label, status, result.error.message, bin + ' ' + argv.join(' '));
  } else if (result.status === 0) {
    add(label, 'PASS', output.split('\n').filter(Boolean).slice(-3).join(' | ') || 'Exit code 0.', bin + ' ' + argv.join(' '));
  } else {
    add(label, 'FAIL', 'Exit code ' + result.status + '. ' + output.split('\n').filter(Boolean).slice(-5).join(' | '), bin + ' ' + argv.join(' '));
  }
}
function main() {
  console.log('Website Builder Engine — evidence-based project audit');
  console.log('Target: ' + target);
  if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    add('Project directory', 'FAIL', 'Target directory does not exist.');
    process.exitCode = 1;
    return;
  }
  const pkgPath = path.join(target, 'package.json');
  const pkg = fs.existsSync(pkgPath) ? readJson(pkgPath) : null;
  if (fs.existsSync(pkgPath) && !pkg) add('package.json', 'FAIL', 'Invalid JSON.');
  else if (pkg) add('package.json', 'PASS', 'Manifest parsed; package manager inferred from lockfile.');
  else add('JavaScript package manifest', 'NOT CONFIGURED', 'No package.json found. This may be valid for non-JavaScript projects.');

  const manager = detectPackageManager(target);
  const scripts = (pkg && pkg.scripts) || {};
  const hasTypeScript = fs.existsSync(path.join(target, 'tsconfig.json')) ||
    fs.readdirSync(target).some((name) => /\.(ts|tsx)$/.test(name));
  const hasPython = fs.existsSync(path.join(target, 'pyproject.toml')) || fs.existsSync(path.join(target, 'requirements.txt'));
  const hasGo = fs.existsSync(path.join(target, 'go.mod'));
  const hasRust = fs.existsSync(path.join(target, 'Cargo.toml'));
  add('Project profile', 'PASS',
    'Detected: ' + [pkg ? 'JavaScript package' : null, hasTypeScript ? 'TypeScript' : null, hasPython ? 'Python' : null, hasGo ? 'Go' : null, hasRust ? 'Rust' : null].filter(Boolean).join(', ') + '; package manager: ' + manager + '.');

  if (pkg) {
    runScript(pkg, manager, 'test', 'Automated tests');
    runScript(pkg, manager, 'build', 'Production build');
    runScript(pkg, manager, 'typecheck', 'Typecheck');
    runScript(pkg, manager, 'lint', 'Lint');
  } else {
    add('Automated tests', 'NOT CONFIGURED', 'No package manifest; use the project-native test command and report its evidence.');
    add('Production build', 'NOT CONFIGURED', 'No package manifest; build verification is project-specific.');
  }

  if (hasTypeScript && !scripts.typecheck) {
    const localTsc = path.join(target, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
    if (fs.existsSync(localTsc)) {
      const result = spawnSync(localTsc, ['--noEmit'], { cwd: target, encoding: 'utf8', timeout, shell: process.platform === 'win32' });
      add('TypeScript compiler fallback', result.status === 0 ? 'PASS' : result.error ? 'BLOCKED' : 'FAIL',
        ((result.stdout || '') + (result.stderr || '')).trim().split('\n').slice(-5).join(' | ') || 'tsc --noEmit exited ' + result.status,
        'node_modules/.bin/tsc --noEmit');
    } else if (!scripts.typecheck) {
      add('TypeScript compiler fallback', 'NOT CONFIGURED', 'TypeScript detected, but no typecheck script or local TypeScript compiler is available.');
    }
  } else if (!hasTypeScript) {
    add('TypeScript check', 'NOT APPLICABLE', 'No TypeScript source/configuration detected.');
  }

  const failures = results.filter((r) => r.status === 'FAIL').length;
  const blocked = results.filter((r) => r.status === 'BLOCKED').length;
  const unverified = results.filter((r) => ['NOT CONFIGURED', 'NOT RUN'].includes(r.status)).length;
  console.log('\nSummary: ' + results.filter((r) => r.status === 'PASS').length + ' PASS, ' + failures + ' FAIL, ' + blocked + ' BLOCKED, ' + unverified + ' UNVERIFIED/NOT CONFIGURED.');
  console.log('This report is evidence for configured commands only; it is not a visual, security or production-readiness certification.');
  if (failures || blocked) process.exitCode = 1;
}
main();
