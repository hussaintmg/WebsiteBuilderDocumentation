#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — AUTOMATED CODEBASE AUDIT & GAP ANALYSIS CLI
 * ============================================================================
 * 
 * Standalone Zero-Dependency Node.js CLI to audit any web project (greenfield
 * or existing) against the 30+ mandatory standards of Website Builder Engine.
 * 
 * Usage:
 *   node audit-engine.js [project-directory] [--strict] [--fix-hints]
 * 
 * Exit Codes:
 *   0: Audit Passed (Compliance >= 95%)
 *   1: Audit Failed (Compliance < 95% - Agent must continue working)
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// CLI Arguments
const args = process.argv.slice(2);
const targetDirArg = args.find(a => !a.startsWith('--'));
const targetDir = path.resolve(targetDirArg || process.cwd());
const isStrict = true; // Strict by default per engine rule

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

function walkFiles(dir, maxDepth = 6, currentDepth = 0) {
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
// AUDIT SUITES
// ============================================================================

async function runAudit() {
  header(`WEBSITE BUILDER ENGINE — CODEBASE COMPLIANCE AUDIT`);
  log(`${colors.gray}Target Directory: ${targetDir}${colors.reset}\n`);

  const allFiles = walkFiles(targetDir);
  const fileNames = allFiles.map(f => path.relative(targetDir, f).replace(/\\/g, '/'));

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
  // SUITE 1: ROOT ARCHITECTURE & DIRECTORY RULES
  // --------------------------------------------------------------------------
  log(`${colors.bold}${colors.magenta}▶ SUITE 1: ROOT ARCHITECTURE & FOLDER INTEGRITY${colors.reset}`);

  // Check 1.1: Root /app folder (Zero src/ wrapper)
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

  // Check 1.2: Root Sibling Folders Structure
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

  // Check 1.3: FILE-MAP.md Navigation Registry
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
  // SUITE 2: TECH STACK & PRODUCTION PACKAGES
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 2: TECH STACK & DEPENDENCY HARMONY${colors.reset}`);

  // Check 2.1: Tailwind CSS
  const hasTailwind = Boolean(deps['tailwindcss'] || deps['@tailwindcss/postcss'] || deps['@tailwindcss/vite']);
  evaluateCheck(
    'Dependencies',
    'Tailwind CSS Styling Framework',
    8,
    hasTailwind,
    hasTailwind ? `Tailwind CSS detected (${deps['tailwindcss'] || deps['@tailwindcss/postcss'] || 'installed'})` : 'Tailwind CSS missing in package.json',
    'Install Tailwind CSS: npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p'
  );

  // Check 2.2: Motion & Animation Ecosystem (Framer Motion / GSAP)
  const hasMotion = Boolean(deps['framer-motion'] || deps['gsap']);
  evaluateCheck(
    'Dependencies',
    'Animation Stack (Framer Motion / GSAP)',
    8,
    hasMotion,
    hasMotion ? 'Framer Motion or GSAP installed' : 'No modern animation library found',
    'Install Framer Motion: npm install framer-motion'
  );

  // Check 2.3: Modern Icon Suite (Lucide React)
  const hasLucide = Boolean(deps['lucide-react']);
  evaluateCheck(
    'Dependencies',
    'Vector Icon Ecosystem (lucide-react)',
    5,
    hasLucide,
    hasLucide ? 'Lucide React detected' : 'lucide-react missing',
    'Install Lucide React: npm install lucide-react'
  );

  // Check 2.4: Class Utilities (clsx & tailwind-merge)
  const hasCnUtils = Boolean(deps['clsx'] && deps['tailwind-merge']);
  evaluateCheck(
    'Dependencies',
    'Class Merge Utilities (clsx & tailwind-merge)',
    4,
    hasCnUtils,
    hasCnUtils ? 'clsx and tailwind-merge detected' : 'Missing clsx or tailwind-merge',
    'Install utilities: npm install clsx tailwind-merge'
  );

  // --------------------------------------------------------------------------
  // SUITE 3: UI/UX, DESIGN SYSTEM & POLISH
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 3: UI/UX EXCELLENCE & VISUAL POLISH${colors.reset}`);

  // Scan TSX/JSX/CSS codebases for design tokens
  const codeFiles = allFiles.filter(f => /\.(tsx|jsx|css)$/.test(f));
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

  // Check 3.1: Micro-Animations & Smooth Transitions
  evaluateCheck(
    'UI/UX',
    'Micro-Animations & Smooth CSS Transitions',
    8,
    totalTransitions >= 5,
    `Found ${totalTransitions} files with smooth transition utilities`,
    'Apply transition-all duration-300 ease-out on interactive elements, buttons, and card states.'
  );

  // Check 3.2: Modern Motion Physics (Framer Motion in Components)
  evaluateCheck(
    'UI/UX',
    'Interactive Motion Physics (motion.* / AnimatePresence)',
    8,
    totalMotionTags >= 3,
    `Found ${totalMotionTags} files utilizing motion components`,
    'Wrap cards, modals, lists, and hero headers in <motion.div> with initial, animate, and exit states.'
  );

  // Check 3.3: Glassmorphism & Ambient Depth
  evaluateCheck(
    'UI/UX',
    'Glassmorphism & Depth (backdrop-blur & alpha borders)',
    6,
    totalGlassEffects >= 3,
    `Found ${totalGlassEffects} files with glass/frosted styling`,
    'Add backdrop-blur-md bg-neutral-900/60 border border-white/10 to headers, cards, and modal dialogs.'
  );

  // Check 3.4: Dual Theme Support (dark: classes)
  evaluateCheck(
    'UI/UX',
    'Theme System & Contrast (dark: tokens)',
    6,
    hasDarkSupport,
    hasDarkSupport ? 'Tailwind dark: utility classes active' : 'No dark: utility tokens detected',
    'Ensure all text and surfaces support dark mode with dark:bg-neutral-950 dark:text-neutral-100.'
  );

  // Check 3.5: Floating Label Inputs (No Raw Browser Placeholders)
  evaluateCheck(
    'UI/UX',
    'Floating Label Input Architecture',
    5,
    hasFloatingInputs,
    hasFloatingInputs ? 'Floating label patterns detected' : 'Standard flat placeholder inputs detected',
    'Upgrade raw <input placeholder="..." /> to Floating Label Inputs per design-system/03_UI_COMPONENTS_LIBRARY.md'
  );

  // --------------------------------------------------------------------------
  // SUITE 4: AUTHENTICATION, ERGONOMICS & ZERO-DEMO SECURITY
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 4: AUTHENTICATION, ZERO-DEMO & ERGONOMICS${colors.reset}`);

  // Find Auth files
  const authFiles = allFiles.filter(f => /(login|signup|auth|register|forgot-password)/i.test(f) && /\.(tsx|jsx|js|ts)$/.test(f));
  let hasForbiddenDemoButtons = false;
  let hasForgotPasswordLink = false;
  let hasInterAuthSignupLoginLinks = false;
  let demoMatches = [];

  for (const af of authFiles) {
    const content = safeReadFile(af);
    // Check forbidden demo credentials / quick login buttons
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

  // Check 4.1: Strict Zero-Demo Security Mandate
  evaluateCheck(
    'Auth Security',
    'Strict Zero-Demo Policy (No Quick-Login Backdoor Buttons)',
    8,
    !hasForbiddenDemoButtons,
    !hasForbiddenDemoButtons ? 'Zero demo accounts or quick-login buttons found' : `Forbidden demo artifacts: ${demoMatches.join(', ')}`,
    'Remove all "Login as Admin" demo buttons and mock credentials from auth forms per modules/AUTH_AND_FACELOCK.md'
  );

  // Check 4.2: Inter-Auth Navigation Ergonomics (Links between Login ⇄ Signup ⇄ Forgot)
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
  // SUITE 5: DATA LAYER, CONTEXT LAW & BACKEND HYGIENE
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 5: DATA LAYER & CONTEXT ENCAPSULATION LAW${colors.reset}`);

  // Check 5.1: Root Domain Models
  const modelFiles = allFiles.filter(f => /models[\\/].+\.(ts|js)$/.test(f));
  evaluateCheck(
    'Data Layer',
    'Dedicated Root Models (/models/*.ts)',
    6,
    modelFiles.length >= 1,
    `Found ${modelFiles.length} root domain models`,
    'Organize data schemas into 1 file per model in <root>/models/ (e.g., User.ts, Order.ts).'
  );

  // Check 5.2: Dedicated Domain Contexts
  const contextFiles = allFiles.filter(f => /context[\\/].+(context|provider)\.(tsx|jsx|ts|js)$/i.test(f));
  evaluateCheck(
    'Data Layer',
    'Single Source of Truth Domain Contexts (/context/*.tsx)',
    6,
    contextFiles.length >= 1,
    `Found ${contextFiles.length} domain contexts in /context/`,
    'Create domain React Contexts in /context/ to manage state mutations and encapsulate API calls.'
  );

  // Check 5.3: Context Law (No Direct Raw Component API Calls in Pages)
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
    5,
    directApiViolations.length === 0,
    directApiViolations.length === 0 ? 'All page components consume context hooks' : `Direct API calls in: ${directApiViolations.slice(0, 3).join(', ')}`,
    'Refactor direct fetch/axios calls in pages into domain Context provider methods.'
  );

  // --------------------------------------------------------------------------
  // SUITE 6: EDGE PROXY & ROUTE SECURITY
  // --------------------------------------------------------------------------
  log(`\n${colors.bold}${colors.magenta}▶ SUITE 6: ROUTE PROXY & EDGE SECURITY${colors.reset}`);

  // Check 6.1: Edge Middleware Proxy
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
