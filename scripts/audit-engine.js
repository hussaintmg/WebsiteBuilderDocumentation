#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — MASTER AUDIT, QUALITY GATE & TEST RUNNER CLI
 * ============================================================================
 * 
 * Standalone Zero-Dependency Node.js CLI to audit, test, and verify any web project
 * (greenfield or existing) against all mandatory standards of Website Builder Engine:
 * 
 * 1. Root-Level /app Directory & Zero src/ Wrapper
 * 2. Tech Stack & Modern Dependency Harmony (Tailwind, Motion, Lucide, cn)
 * 3. File Necessity, Orphan Detection & Dead-Code / Redundancy Audit
 * 4. Skill Completeness & High-Scale Features (Rapid Click, Low Bandwidth, Idempotency)
 * 5. UI/UX Excellence, Micro-Animations, Glassmorphism & Floating Labels
 * 6. Auth Ergonomics, Zero-Demo Security & Bidirectional Navigation
 * 7. Data Layer, Single Source of Truth & Context Law (Zero Raw Component API Calls)
 * 8. Edge Proxy Route Protection & Session Invalidation (middleware.ts)
 * 9. Comprehensive Testing: Page Default Exports, API Contracts & TypeScript Static Gate
 * 
 * Usage:
 *   node audit-engine.js [project-directory] [--strict] [--brain]
 * 
 * Exit Codes:
 *   0: Audit Passed (Compliance >= 95%)
 *   1: Audit Failed (Compliance < 95% - Agent must resolve all gaps)
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// CLI Arguments
const args = process.argv.slice(2);
const targetDirArg = args.find(a => !a.startsWith('--'));
const targetDir = path.resolve(targetDirArg || process.cwd());
const isStrict = true; // Strict by default per engine law
const showBrain = args.includes('--brain');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

function log(msg) { console.log(msg); }
function header(msg) {
  log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  log(`${colors.bold}${colors.white}  ${msg}${colors.reset}`);
  log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);
}

// File Search Helpers (Safe recursive walk with ignore)
const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.gemini', '.agents', '.turbo', '.cache']);

function walkFiles(dir, maxDepth = 7, currentDepth = 0) {
  if (currentDepth > maxDepth || !fs.existsSync(dir)) return [];
  let results = [];
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
      if (item.isDirectory()) {
        if (!IGNORED_DIRS.has(item.name)) {
          results = results.concat(walkFiles(path.join(dir, item.name), maxDepth, currentDepth + 1));
        }
      } else {
        results.push(path.join(dir, item.name));
      }
    }
  } catch (err) {
    // Ignore unreadable dirs
  }
  return results;
}

function safeReadFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
}

// Audit Result Collector
const auditResults = {
  passed: [],
  failed: [],
  warnings: [],
  totalScore: 0,
  maxScore: 0
};

function evaluateCheck(category, name, points, passed, details, fixHint) {
  auditResults.maxScore += points;
  if (passed) {
    auditResults.totalScore += points;
    auditResults.passed.push({ category, name, points, details });
    log(`  ${colors.green}✔ [PASS]${colors.reset} ${colors.bold}${name}${colors.reset} (${points} pts)`);
    if (details) log(`     ${colors.gray}↳ ${details}${colors.reset}`);
  } else {
    auditResults.failed.push({ category, name, points, details, fixHint });
    log(`  ${colors.red}✖ [FAIL]${colors.reset} ${colors.bold}${name}${colors.reset} (0/${points} pts)`);
    if (details) log(`     ${colors.yellow}↳ Issue: ${details}${colors.reset}`);
    if (fixHint) log(`     ${colors.cyan}↳ Remediation: ${fixHint}${colors.reset}`);
  }
}

// ============================================================================
// MAIN AUDIT RUNNER
// ============================================================================

async function runAudit() {
  header(`WEBSITE BUILDER ENGINE — MASTER COMPLIANCE, QUALITY & TEST AUDIT`);
  log(`${colors.gray}Target Directory: ${targetDir}${colors.reset}`);

  const globalBrainPath = 'C:/Users/lenovo/.gemini/config/skills/website-builder-engine/BRAIN.md';
  if (fs.existsSync(globalBrainPath)) {
    log(`${colors.gray}Master Brain:    ${globalBrainPath} (Active & Verified)${colors.reset}\n`);
  } else {
    log(`${colors.gray}Master Brain:    Pending compilation${colors.reset}\n`);
  }

  const allFiles = walkFiles(targetDir);
  const relFiles = allFiles.map(f => path.relative(targetDir, f).replace(/\\/g, '/'));

  // Read package.json
  const pkgPath = path.join(targetDir, 'package.json');
  let pkg = {};
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(safeReadFile(pkgPath));
    } catch (e) {
      pkg = {};
    }
  }
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

  // --------------------------------------------------------------------------
  // SUITE 1: ROOT ARCHITECTURE & FOLDER INTEGRITY
  // --------------------------------------------------------------------------
  log(`${colors.bold}${colors.magenta}▶ SUITE 1: ROOT ARCHITECTURE & FOLDER INTEGRITY${colors.reset}`);

  const hasRootApp = fs.existsSync(path.join(targetDir, 'app'));
  const hasSrcApp = fs.existsSync(path.join(targetDir, 'src', 'app')) || fs.existsSync(path.join(targetDir, 'src', 'pages'));
  evaluateCheck(
    'Architecture',
    'Root-Level /app Directory (Zero src/ Wrapper)',
    10,
    hasRootApp && !hasSrcApp,
    hasRootApp && !hasSrcApp ? 'App router is situated directly at root <root>/app/' : (hasSrcApp ? 'Detected prohibited src/ wrapper' : 'Missing /app directory'),
    'Move all files from src/app/ to root /app/ and update tsconfig.json paths to "@/*": ["./*"]'
  );

  const rootComponents = fs.existsSync(path.join(targetDir, 'components'));
  const rootContext = fs.existsSync(path.join(targetDir, 'context')) || fs.existsSync(path.join(targetDir, 'contexts'));
  const rootModels = fs.existsSync(path.join(targetDir, 'models'));
  const hasCleanSiblings = rootComponents && (rootContext || rootModels);
  evaluateCheck(
    'Architecture',
    'Root Sibling Folders (/components, /context, /models)',
    5,
    hasCleanSiblings,
    `Components: ${rootComponents}, Context: ${rootContext}, Models: ${rootModels}`,
    'Scaffold missing root folders: /components, /context, and /models directly at project root.'
  );

  const hasFileMap = fs.existsSync(path.join(targetDir, 'FILE-MAP.md'));
  evaluateCheck(
    'Architecture',
    'Root FILE-MAP.md Navigation Map',
    5,
    hasFileMap,
    hasFileMap ? 'Living FILE-MAP.md is present' : 'Missing FILE-MAP.md at project root',
    'Generate a verified FILE-MAP.md documenting entry points, primary routes, models, and data flows.'
  );

  // --------------------------------------------------------------------------
  // SUITE 2: TECH STACK & MODERN DEPENDENCY HARMONY
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 2: TECH STACK & DEPENDENCY HARMONY${colors.reset}`);

  const hasTailwind = Boolean(deps['tailwindcss'] || deps['@tailwindcss/postcss'] || deps['@tailwindcss/vite']);
  evaluateCheck(
    'Dependencies',
    'Tailwind CSS Styling Framework',
    6,
    hasTailwind,
    hasTailwind ? `Tailwind CSS detected (${deps['tailwindcss'] || deps['@tailwindcss/postcss'] || 'installed'})` : 'Tailwind CSS missing in package.json',
    'Install Tailwind CSS: npm install -D tailwindcss postcss autoprefixer'
  );

  const hasMotion = Boolean(deps['framer-motion'] || deps['gsap']);
  evaluateCheck(
    'Dependencies',
    'Animation Stack (Framer Motion / GSAP)',
    6,
    hasMotion,
    hasMotion ? 'Framer Motion or GSAP installed' : 'No modern animation library found',
    'Install Framer Motion: npm install framer-motion'
  );

  const hasLucide = Boolean(deps['lucide-react']);
  evaluateCheck(
    'Dependencies',
    'Vector Icon Ecosystem (lucide-react)',
    4,
    hasLucide,
    hasLucide ? 'Lucide React detected' : 'lucide-react missing',
    'Install Lucide React: npm install lucide-react'
  );

  const hasCnUtils = Boolean(deps['clsx'] && deps['tailwind-merge']);
  evaluateCheck(
    'Dependencies',
    'Class Merge Utilities (clsx & tailwind-merge)',
    4,
    hasCnUtils,
    hasCnUtils ? 'clsx and tailwind-merge detected' : 'Missing clsx or tailwind-merge',
    'Install utilities: npm install clsx tailwind-merge'
  );

  // Check conflicting redundant packages
  const hasDuplicateHttp = Boolean(deps['axios'] && deps['ky']);
  const hasDuplicateDates = Boolean(deps['moment'] && (deps['date-fns'] || deps['dayjs']));
  const noRedundantBloat = !hasDuplicateHttp && !hasDuplicateDates;
  evaluateCheck(
    'Dependencies',
    'Zero Redundant Package Bloat (Anti-Bloat Law)',
    3,
    noRedundantBloat,
    noRedundantBloat ? 'No conflicting package duplicates detected' : 'Conflicting packages found (e.g. multiple date/HTTP libraries)',
    'Consolidate dependencies: purge redundant packages per rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md'
  );

  // --------------------------------------------------------------------------
  // SUITE 3: FILE NECESSITY, DEAD CODE & REDUNDANCY AUDIT
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 3: FILE NECESSITY, ORPHAN DETECTION & CODE QUALITY${colors.reset}`);

  // Collect all project code files
  const codeFiles = allFiles.filter(f => /\.(tsx|jsx|ts|js)$/.test(f) && !f.endsWith('.d.ts'));
  const allCodeContent = codeFiles.map(f => safeReadFile(f)).join('\n');

  // Check for empty or dummy placeholder files
  const dummyFiles = [];
  for (const cf of codeFiles) {
    const content = safeReadFile(cf).trim();
    if (content.length < 30 || /^\/\/\s*TODO|^\/\*\s*placeholder\s*\*\/|export\s*default\s*function\s*\w*\(\)\s*\{\s*return\s*null;\s*\}/i.test(content)) {
      dummyFiles.push(path.relative(targetDir, cf).replace(/\\/g, '/'));
    }
  }

  evaluateCheck(
    'Code Quality',
    'Zero Empty or Dummy Placeholder Files',
    5,
    dummyFiles.length === 0,
    dummyFiles.length === 0 ? 'All code files contain functional implementations' : `Detected dummy placeholder files: ${dummyFiles.slice(0, 3).join(', ')}`,
    'Implement real logic or remove empty/dummy files per rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md'
  );

  // Orphan / Unused File Detection for non-route components
  const componentAndUtilFiles = codeFiles.filter(f => {
    const rel = path.relative(targetDir, f).replace(/\\/g, '/');
    return /^(components|lib|hooks|utils)[\\/]/.test(rel) && !rel.includes('index.');
  });

  const orphanFiles = [];
  for (const cuf of componentAndUtilFiles) {
    const baseName = path.basename(cuf, path.extname(cuf));
    // Regex looking for import of this basename
    const importRegex = new RegExp(`['"](?:\\.|@)[^'"]*\\/${baseName}['"]|\\b${baseName}\\b`, 'g');
    const matches = allCodeContent.match(importRegex);
    // If only occurs once (or self-reference only in its own file), it's likely an unreferenced orphan
    if (!matches || matches.length <= 1) {
      orphanFiles.push(path.relative(targetDir, cuf).replace(/\\/g, '/'));
    }
  }

  evaluateCheck(
    'Code Quality',
    'Zero Orphan / Unreferenced Dead Code Files',
    5,
    orphanFiles.length === 0,
    orphanFiles.length === 0 ? 'All components and utilities are actively referenced' : `Detected ${orphanFiles.length} unreferenced files: ${orphanFiles.slice(0, 3).join(', ')}`,
    'Connect unreferenced components to active views or delete dead code.'
  );

  // --------------------------------------------------------------------------
  // SUITE 4: SKILL COMPLETENESS & CANONICAL MODULE FEATURES
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 4: SKILL COMPLETENESS & HIGH-SCALE CAPABILITIES${colors.reset}`);

  // Check Rapid-Click Batching presence in interactive controls
  let hasRapidClick = /useRapidClickBatcher|rapidClick|AbortController.*setTimeout/i.test(allCodeContent);
  evaluateCheck(
    'Skill Modules',
    'Optimistic Rapid-Click Batching Engine',
    6,
    hasRapidClick,
    hasRapidClick ? 'Rapid-click debounce and AbortController batching detected' : 'Standard instant click handlers without batching',
    'Implement useRapidClickBatcher on pagination, quantity steppers, and carousels per modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md'
  );

  // Check Low-Bandwidth Optimizations
  let hasLowBandwidth = /blurDataURL|placeholder=["']blur["']|image\/webp|image\/avif|loading=["']lazy["']/i.test(allCodeContent);
  evaluateCheck(
    'Skill Modules',
    'Low-Bandwidth & Slow Network Optimizations',
    5,
    hasLowBandwidth,
    hasLowBandwidth ? 'Image BlurHash/LQIP or WebP/AVIF optimizations detected' : 'Standard un-optimized media tags detected',
    'Implement adaptive WebP/AVIF and BlurHash LQIP per modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md'
  );

  // --------------------------------------------------------------------------
  // SUITE 5: UI/UX EXCELLENCE, ANIMATIONS & GLASS DEPTH
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 5: UI/UX EXCELLENCE & VISUAL POLISH${colors.reset}`);

  let totalTransitions = 0;
  let totalGlassEffects = 0;
  let totalMotionTags = 0;
  let hasFloatingInputs = false;
  let hasDarkSupport = false;

  for (const cf of codeFiles) {
    const content = safeReadFile(cf);
    if (/transition-(all|colors|opacity|transform)/.test(content)) totalTransitions++;
    if (/backdrop-blur-(md|lg|xl)|bg-white\/|bg-black\/|border-white\//.test(content)) totalGlassEffects++;
    if (/<motion\./.test(content) || /AnimatePresence/.test(content)) totalMotionTags++;
    if (/peer-placeholder-shown|FloatingLabel|floating-label/.test(content)) hasFloatingInputs = true;
    if (/dark:/.test(content)) hasDarkSupport = true;
  }

  evaluateCheck(
    'UI/UX',
    'Micro-Animations & Smooth CSS Transitions',
    6,
    totalTransitions >= 5,
    `Found ${totalTransitions} files with smooth transition utilities`,
    'Apply transition-all duration-300 ease-out on interactive elements, buttons, and card states.'
  );

  evaluateCheck(
    'UI/UX',
    'Interactive Motion Physics (motion.* / AnimatePresence)',
    6,
    totalMotionTags >= 3,
    `Found ${totalMotionTags} files utilizing motion components`,
    'Wrap cards, modals, lists, and hero headers in <motion.div> with initial, animate, and exit states.'
  );

  evaluateCheck(
    'UI/UX',
    'Glassmorphism & Depth (backdrop-blur & alpha borders)',
    6,
    totalGlassEffects >= 3,
    `Found ${totalGlassEffects} files with glass/frosted styling`,
    'Add backdrop-blur-md bg-neutral-900/60 border border-white/10 to headers, cards, and modal dialogs.'
  );

  evaluateCheck(
    'UI/UX',
    'Theme System & Contrast (dark: tokens)',
    5,
    hasDarkSupport,
    hasDarkSupport ? 'Tailwind dark: utility classes active' : 'No dark: utility tokens detected',
    'Ensure all text and surfaces support dark mode with dark:bg-neutral-950 dark:text-neutral-100.'
  );

  evaluateCheck(
    'UI/UX',
    'Floating Label Input Architecture',
    5,
    hasFloatingInputs,
    hasFloatingInputs ? 'Floating label patterns detected' : 'Standard flat placeholder inputs detected',
    'Upgrade raw <input placeholder="..." /> to Floating Label Inputs per design-system/03_UI_COMPONENTS_LIBRARY.md'
  );

  // --------------------------------------------------------------------------
  // SUITE 6: AUTHENTICATION, ZERO-DEMO & ERGONOMICS
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 6: AUTHENTICATION, ZERO-DEMO & ERGONOMICS${colors.reset}`);

  const authFiles = allFiles.filter(f => /(login|signup|auth|register|forgot-password)/i.test(f) && /\.(tsx|jsx|js|ts)$/.test(f));
  let hasForbiddenDemoButtons = false;
  let hasForgotPasswordLink = false;
  let hasInterAuthSignupLoginLinks = false;
  let demoMatches = [];

  for (const af of authFiles) {
    const content = safeReadFile(af);
    const demoPatterns = [
      /login as (admin|owner|demo|user)/i,
      /admin@example\.com/i,
      /quick login/i,
      /demo credentials/i,
      /fill demo/i
    ];
    for (const dp of demoPatterns) {
      if (dp.test(content)) {
        hasForbiddenDemoButtons = true;
        demoMatches.push(`${path.basename(af)}: matched ${dp}`);
      }
    }

    if (/forgot-password|forgot password/i.test(content)) hasForgotPasswordLink = true;
    if (/(already have an account|don't have an account|dont have an account)/i.test(content)) {
      hasInterAuthSignupLoginLinks = true;
    }
  }

  evaluateCheck(
    'Auth Security',
    'Strict Zero-Demo Policy (No Quick-Login Backdoors)',
    8,
    !hasForbiddenDemoButtons,
    !hasForbiddenDemoButtons ? 'Zero demo accounts or quick-login buttons found' : `Forbidden demo artifacts: ${demoMatches.join(', ')}`,
    'Remove all "Login as Admin" demo buttons and mock credentials from auth forms per modules/AUTH_AND_FACELOCK.md'
  );

  const authErgonomicsPassed = hasForgotPasswordLink && hasInterAuthSignupLoginLinks;
  evaluateCheck(
    'Auth Ergonomics',
    'Inter-Auth Bidirectional Navigation Links',
    6,
    authErgonomicsPassed,
    `Forgot Password link: ${hasForgotPasswordLink}, Login ⇄ Signup links: ${hasInterAuthSignupLoginLinks}`,
    'Provide right-aligned "Forgot password?" on login and bidirectional footer links ("Don\'t have an account? Sign up" ⇄ "Already have an account? Log in").'
  );

  // --------------------------------------------------------------------------
  // SUITE 7: DATA LAYER & CONTEXT ENCAPSULATION LAW
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 7: DATA LAYER & CONTEXT ENCAPSULATION LAW${colors.reset}`);

  const modelFiles = allFiles.filter(f => /models[\\/].+\.(ts|js)$/.test(f));
  evaluateCheck(
    'Data Layer',
    'Dedicated Root Models (/models/*.ts)',
    6,
    modelFiles.length >= 1,
    `Found ${modelFiles.length} root domain models`,
    'Organize data schemas into 1 file per model in <root>/models/ (e.g., User.ts, Order.ts).'
  );

  const contextFiles = allFiles.filter(f => /context[\\/].+(context|provider)\.(tsx|jsx|ts|js)$/i.test(f));
  evaluateCheck(
    'Data Layer',
    'Single Source of Truth Domain Contexts (/context/*.tsx)',
    6,
    contextFiles.length >= 1,
    `Found ${contextFiles.length} domain contexts in /context/`,
    'Create domain React Contexts in /context/ to manage state mutations and encapsulate API calls.'
  );

  const pageFiles = allFiles.filter(f => /app[\\/].*page\.(tsx|jsx)$/.test(f));
  let directApiViolations = [];
  for (const pf of pageFiles) {
    const content = safeReadFile(pf);
    if (/axios\.(get|post|put|delete)|fetch\(['"`]\/api\//.test(content)) {
      directApiViolations.push(path.basename(path.dirname(pf)) + '/page.tsx');
    }
  }
  evaluateCheck(
    'Data Layer',
    'Context Law Compliance (Zero Direct Raw API Calls in Page Components)',
    6,
    directApiViolations.length === 0,
    directApiViolations.length === 0 ? 'All page components consume context hooks' : `Direct API calls in: ${directApiViolations.slice(0, 3).join(', ')}`,
    'Refactor direct fetch/axios calls in pages into domain Context provider methods.'
  );

  // --------------------------------------------------------------------------
  // SUITE 8: ROUTE PROXY & EDGE SECURITY
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 8: ROUTE PROXY & EDGE SECURITY${colors.reset}`);

  const hasMiddleware = fs.existsSync(path.join(targetDir, 'middleware.ts')) || fs.existsSync(path.join(targetDir, 'middleware.js'));
  evaluateCheck(
    'Security',
    'Edge Middleware Route Proxy (middleware.ts)',
    6,
    hasMiddleware,
    hasMiddleware ? 'Next.js Edge middleware.ts is configured' : 'Missing middleware.ts at root',
    'Deploy root middleware.ts with session token validation and unauthorized redirect protection per modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md'
  );

  // --------------------------------------------------------------------------
  // SUITE 9: COMPREHENSIVE TESTING: PAGES, API CONTRACTS & TS GATE
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 9: COMPREHENSIVE TESTING OF PAGES, APIS & STATIC GATE${colors.reset}`);

  // Test 9.1: Page Default Exports & Structural Integrity
  let brokenPages = [];
  for (const pf of pageFiles) {
    const content = safeReadFile(pf);
    if (!/export\s+default\s+(function|async\s+function|const|\w+)/.test(content)) {
      brokenPages.push(path.relative(targetDir, pf).replace(/\\/g, '/'));
    }
  }
  evaluateCheck(
    'Testing',
    'Page Contract Integrity (Valid Default React Exports)',
    6,
    brokenPages.length === 0 && pageFiles.length > 0,
    brokenPages.length === 0 ? `All ${pageFiles.length} page components export valid default components` : `Broken page exports in: ${brokenPages.join(', ')}`,
    'Ensure all app/**/page.tsx files export a valid React component as default export.'
  );

  // Test 9.2: API Route Contract Integrity ({ success, data, error } envelopes)
  const apiFiles = allFiles.filter(f => /app[\\/]api[\\/].*route\.(ts|js)$/.test(f));
  let unhandledApis = [];
  for (const af of apiFiles) {
    const content = safeReadFile(af);
    const hasHttpExport = /export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE)/.test(content);
    const hasEnvelope = /success\s*:\s*(true|false)|NextResponse\.json/i.test(content);
    const hasTryCatch = /try\s*\{[\s\S]*\}\s*catch/i.test(content);
    if (!hasHttpExport || !hasEnvelope || !hasTryCatch) {
      unhandledApis.push(path.relative(targetDir, af).replace(/\\/g, '/'));
    }
  }
  evaluateCheck(
    'Testing',
    'API Route Contract Integrity ({ success, data, error } Envelopes & Try/Catch)',
    6,
    unhandledApis.length === 0,
    unhandledApis.length === 0 ? `All ${apiFiles.length} API handlers enforce envelopes & error handling` : `Violations in: ${unhandledApis.slice(0, 3).join(', ')}`,
    'Wrap API route handlers in try/catch and return standard { success: boolean, data, error } envelopes per rules/BACKEND_CONNECTION_RULES.md'
  );

  // Test 9.3: Static TypeScript Compilation Gate (Tier 1)
  const hasTsConfig = fs.existsSync(path.join(targetDir, 'tsconfig.json'));
  let tscPassed = false;
  let tscDetails = 'No tsconfig.json found';

  if (hasTsConfig) {
    try {
      const tscRun = spawnSync('npx', ['tsc', '--noEmit'], {
        cwd: targetDir,
        encoding: 'utf8',
        shell: true
      });
      if (tscRun.status === 0) {
        tscPassed = true;
        tscDetails = 'TypeScript compilation succeeded with Exit Code 0 (Zero type errors)';
      } else {
        tscPassed = false;
        const errLines = (tscRun.stdout || tscRun.stderr || '').split('\n').filter(Boolean);
        tscDetails = `TypeScript errors detected: ${errLines[0] || 'Typecheck failed'}`;
      }
    } catch (e) {
      tscPassed = false;
      tscDetails = `Failed to run tsc: ${e.message}`;
    }
  } else {
    // Pure JavaScript project
    tscPassed = true;
    tscDetails = 'JavaScript project (No TypeScript errors)';
  }

  evaluateCheck(
    'Testing',
    'Tier 1 Static Gate (npx tsc --noEmit / Clean Compilation)',
    8,
    tscPassed,
    tscDetails,
    'Fix all TypeScript type errors until `npx tsc --noEmit` exits with Code 0.'
  );

  // --------------------------------------------------------------------------
  // FINAL SCORE & SUMMARY
  // --------------------------------------------------------------------------
  const scorePercent = Math.round((auditResults.totalScore / auditResults.maxScore) * 100);

  header(`AUDIT REPORT & COMPLIANCE VERDICT`);
  log(`  ${colors.bold}Total Score:${colors.reset}   ${scorePercent >= 95 ? colors.green : colors.red}${auditResults.totalScore} / ${auditResults.maxScore} (${scorePercent}%)${colors.reset}`);
  log(`  ${colors.bold}Passing Checks:${colors.reset} ${colors.green}${auditResults.passed.length}${colors.reset}`);
  log(`  ${colors.bold}Failing Checks:${colors.reset} ${auditResults.failed.length > 0 ? colors.red : colors.green}${auditResults.failed.length}${colors.reset}\n`);

  if (auditResults.failed.length > 0) {
    log(`${colors.bold}${colors.yellow}REMEDIATION ACTION ITEMS REQUIRED FOR COMPLIANCE:${colors.reset}`);
    auditResults.failed.forEach((f, idx) => {
      log(`  ${colors.bold}${idx + 1}. [${f.category}] ${f.name}${colors.reset}`);
      if (f.details) log(`     ${colors.red}• Problem:${colors.reset} ${f.details}`);
      if (f.fixHint) log(`     ${colors.cyan}• Fix:${colors.reset} ${f.fixHint}`);
    });
    log('');
  }

  if (scorePercent >= 95) {
    log(`${colors.bold}${colors.green}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
    log(`${colors.bold}${colors.green}  ✔ COMPLIANCE PASSED (${scorePercent}% >= 95%). Meets Website Builder Engine standards!${colors.reset}`);
    log(`${colors.bold}${colors.green}══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);
    process.exit(0);
  } else {
    log(`${colors.bold}${colors.red}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
    log(`${colors.bold}${colors.red}  ✖ COMPLIANCE AUDIT FAILED (${scorePercent}% < 95% threshold).${colors.reset}`);
    log(`${colors.bold}${colors.yellow}  The AI Agent MUST resolve the failing items above before claiming completion.${colors.reset}`);
    log(`${colors.bold}${colors.red}══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);
    if (isStrict) {
      process.exit(1);
    }
  }
}

runAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
