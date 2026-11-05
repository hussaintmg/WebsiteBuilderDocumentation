const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const scaffold = path.join(root, 'scripts', 'scaffold-engine.js');
const deps = {
  react: '^19.0.0',
  'react-dom': '^19.0.0',
  tailwindcss: '^4.0.0',
  'framer-motion': '^12.0.0',
  'lucide-react': '^0.500.0',
  clsx: '^2.1.1',
  'tailwind-merge': '^3.0.0'
};
function project(withDeps = true) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wbe-scaffold-'));
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'fixture', dependencies: withDeps ? deps : { react: '^19.0.0' } }));
  return dir;
}
function run(dir, args = []) {
  return spawnSync(process.execPath, [scaffold, dir, ...args], { encoding: 'utf8', timeout: 15000 });
}

test('scaffold is read-only by default', () => {
  const dir = project();
  const before = fs.readFileSync(path.join(dir, 'package.json'), 'utf8');
  const result = run(dir);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /READ-ONLY SCAFFOLD PLAN GENERATED/);
  assert.equal(fs.existsSync(path.join(dir, 'lib', 'utils.ts')), false);
  assert.equal(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'), before);
});

test('--force without --apply is rejected without changing files', () => {
  const dir = project();
  const result = run(dir, ['--force']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--force requires --apply/);
  assert.equal(fs.existsSync(path.join(dir, 'lib', 'utils.ts')), false);
});

test('--apply creates missing files but never mutates package.json', () => {
  const dir = project();
  const before = fs.readFileSync(path.join(dir, 'package.json'), 'utf8');
  const result = run(dir, ['--apply']);
  assert.equal(result.status, 0);
  assert.equal(fs.existsSync(path.join(dir, 'lib', 'utils.ts')), true);
  assert.equal(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'), before);
});

test('--apply --force backs up existing files before overwriting', () => {
  const dir = project();
  fs.mkdirSync(path.join(dir, 'lib'), { recursive: true });
  const target = path.join(dir, 'lib', 'utils.ts');
  fs.writeFileSync(target, 'custom user code\\n');
  const result = run(dir, ['--apply', '--force']);
  assert.equal(result.status, 0);
  const backups = fs.readdirSync(path.join(dir, 'lib')).filter(name => name.startsWith('utils.ts.bak-'));
  assert.equal(backups.length, 1);
  assert.equal(fs.readFileSync(path.join(dir, backups[0]), 'utf8'), 'custom user code\\n');
});

test('unsupported project dependencies stop before any scaffold writes', () => {
  const dir = project(false);
  const result = run(dir, ['--apply']);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Scaffold not applicable/);
  assert.equal(fs.existsSync(path.join(dir, 'lib', 'utils.ts')), false);
});
