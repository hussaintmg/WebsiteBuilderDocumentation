#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];
function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function checkReference(rel, source) {
  const clean = rel.split('#')[0].split('?')[0];
  if (!clean || /^(https?:|mailto:|tel:|#)/i.test(clean)) return;
  if (!exists(path.normalize(path.join(path.dirname(source), clean)))) {
    errors.push(source + ' -> missing local reference: ' + rel);
  }
}
const manifestPath = path.join(root, 'SKILL_MANIFEST.json');
let manifest;
try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
catch (error) { errors.push('SKILL_MANIFEST.json is invalid JSON: ' + error.message); }
if (manifest) {
  const refs = new Set();
  function collect(value) {
    if (typeof value === 'string' && /\.(md|js|json|ya?ml)$/.test(value)) refs.add(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  }
  collect(manifest);
  for (const ref of refs) if (!exists(ref)) errors.push('Manifest reference missing: ' + ref);
  console.log('Manifest references checked: ' + refs.size);
}
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
  }
}
walk(root);
for (const full of files) {\n  // BRAIN.md is a compiled concatenation of source documents; its relative links\n  // intentionally refer to the original module locations, not BRAIN.md's root.\n  if (path.basename(full) === 'BRAIN.md') continue;
  const rel = path.relative(root, full).replace(/\\/g, '/');
  const content = fs.readFileSync(full, 'utf8');
  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(content))) {
    const destination = match[1].trim().replace(/^<|>$/g, '').split(/\s+/)[0];
    checkReference(destination, rel);
  }
}
if (!exists('scripts/resolve-paths.js')) errors.push('Missing scripts/resolve-paths.js');
if (!exists('scripts/website-builder.js')) errors.push('Missing scripts/website-builder.js');
if (errors.length) {
  console.error('\nDocumentation validation failed (' + errors.length + '):');
  errors.forEach((e) => console.error(' - ' + e));
} else {
  console.log('Markdown local links and manifest paths: PASS (' + files.length + ' Markdown files scanned).');
}
warnings.forEach((w) => console.warn('WARN: ' + w));
process.exitCode = errors.length ? 1 : 0;
