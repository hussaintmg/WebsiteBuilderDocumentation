const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const audit = path.join(root, 'scripts', 'audit-engine.js');

function fixture(manifest) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wbe-audit-'));
  if (manifest) fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(manifest));
  return dir;
}
function run(dir) {
  return spawnSync(process.execPath, [audit, dir], { encoding: 'utf8', timeout: 15000 });
}

test('missing package/test configuration is explicitly unverified, not a pass', () => {
  const dir = fixture(null);
  const result = run(dir);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /\[NOT CONFIGURED\] Automated tests/);
  assert.doesNotMatch(result.stdout, /\[PASS\] Automated tests/);
});

test('a configured failing test script is executed and fails the audit', () => {
  const dir = fixture({ scripts: { test: "node -e 'process.exit(7)'" } });
  const result = run(dir);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /\[FAIL\] Automated tests/);
  assert.match(result.stdout, /Exit code 7/);
});

test('a configured passing test script is actually executed', () => {
  const dir = fixture({ scripts: { test: "node -e \"console.log('fixture test ran')\"" } });
  const result = run(dir);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /\[PASS\] Automated tests/);
  assert.match(result.stdout, /fixture test ran/);
});

test('archived legacy audit engine refuses to report a false compliance pass', () => {
  const legacy = path.join(root, 'scripts', 'audit-engine.legacy.js');
  const result = spawnSync(process.execPath, [legacy], { encoding: 'utf8', timeout: 15000 });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Deprecated legacy audit engine/);
});
