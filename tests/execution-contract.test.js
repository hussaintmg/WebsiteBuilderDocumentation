const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('execution contract exists and explicitly forbids false passes', () => {
  const contract = fs.readFileSync(path.join(root, 'EXECUTION_CONTRACT.md'), 'utf8');
  assert.match(contract, /NOT CONFIGURED/);
  assert.match(contract, /Missing scripts.*never PASS|Missing scripts, missing TypeScript, or test files without execution are never PASS/);
});

test('audit engine reports missing test scripts as NOT CONFIGURED', () => {
  const source = fs.readFileSync(path.join(root, 'scripts/audit-engine.js'), 'utf8');
  assert.match(source, /NOT CONFIGURED/);
  assert.match(source, /runScript\(pkg, manager, 'test', 'Automated tests'\)/);
  assert.doesNotMatch(source, /testFiles\.length > 0\)\s*\{\s*testSuitePassed = true/);
});

test('audit engine does not impose a universal framework or CSS requirement', () => {
  const source = fs.readFileSync(path.join(root, 'scripts/audit-engine.js'), 'utf8');
  assert.doesNotMatch(source, /hasRootApp\s*&&\s*!hasSrcApp/);
  assert.doesNotMatch(source, /Tailwind CSS Styling Framework/);
  assert.match(source, /Detected:/);
});

test('package scripts point to existing local scripts', () => {
  const pkg = require(path.join(root, 'package.json'));
  for (const command of Object.values(pkg.scripts)) {
    const matches = [...command.matchAll(/scripts\/([\w.-]+\.js)/g)];
    for (const match of matches) assert.ok(fs.existsSync(path.join(root, 'scripts', match[1])), match[1]);
  }
});
