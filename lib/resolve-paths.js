/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — CROSS-PLATFORM PATH & ENVIRONMENT RESOLVER
 * ============================================================================
 * 
 * Dynamically resolves the canonical Website Builder Engine root directory
 * across heterogeneous AI environments:
 *  - Claude Code (~/.claude/skills/website-builder-engine)
 *  - Google Gemini (~/.gemini/config/skills/website-builder-engine)
 *  - Cursor / VS Code (~/.cursor/skills/ or local workspace)
 *  - Standalone Git clone / Monorepo workspace
 *  - Linux, macOS, and Windows multi-user profiles
 * 
 * Eliminates all hardcoded user profile paths (e.g. C:/Users/lenovo/...)
 * and guarantees zero-configuration portability.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

function getCandidateSkillDirs() {
  const home = os.homedir();
  const candidates = [];

  // 1. Explicit Environment Variables
  if (process.env.WEBSITE_BUILDER_SKILL_DIR) {
    candidates.push(path.resolve(process.env.WEBSITE_BUILDER_SKILL_DIR));
  }
  if (process.env.SKILL_DIR) {
    candidates.push(path.resolve(process.env.SKILL_DIR));
  }

  // 2. Relative to this module (within the repository itself)
  const repoRoot = path.resolve(__dirname, '..');
  candidates.push(repoRoot);

  // 3. User Home Gemini Global Skill Directory
  candidates.push(path.join(home, '.gemini', 'config', 'skills', 'website-builder-engine'));

  // 4. User Home Claude Code Global Skill Directory
  candidates.push(path.join(home, '.claude', 'skills', 'website-builder-engine'));

  // 5. User Home Cursor / VS Code Directory
  candidates.push(path.join(home, '.cursor', 'skills', 'website-builder-engine'));
  candidates.push(path.join(home, '.config', 'website-builder-engine'));

  // 6. Common Windows Development Locations
  candidates.push('C:\\Coding\\WebsiteBuilderDocumentation');
  candidates.push('D:\\Coding\\WebsiteBuilderDocumentation');

  return candidates;
}

let cachedSkillDir = null;

/**
 * Discovers and returns the absolute path to the Website Builder Engine root directory.
 * @returns {string} Absolute path to the skill directory containing SKILL.md.
 */
function getSkillDir() {
  if (cachedSkillDir && fs.existsSync(path.join(cachedSkillDir, 'SKILL.md'))) {
    return cachedSkillDir;
  }

  const candidates = getCandidateSkillDirs();
  for (const candidate of candidates) {
    try {
      if (candidate && fs.existsSync(candidate)) {
        const marker = path.join(candidate, 'SKILL.md');
        if (fs.existsSync(marker)) {
          cachedSkillDir = candidate;
          return candidate;
        }
      }
    } catch {
      // Continue to next candidate on permission/filesystem errors
    }
  }

  // Graceful fallback to repo root if all checks fail
  const fallback = path.resolve(__dirname, '..');
  cachedSkillDir = fallback;
  return fallback;
}

/**
 * Resolves a path relative to the active Website Builder Engine root.
 * @param {...string} subPaths - Path segments relative to skill root
 * @returns {string} Absolute path to the resolved target
 */
function resolveSkillPath(...subPaths) {
  return path.join(getSkillDir(), ...subPaths);
}

/**
 * Resolves a script path inside the scripts/ directory.
 * @param {string} scriptName - Name of script (e.g. 'audit-engine.js')
 * @returns {string} Absolute path
 */
function getScriptPath(scriptName) {
  return resolveSkillPath('scripts', scriptName);
}

/**
 * Returns environment and path diagnostics for debugging and audit logs.
 */
function getDiagnostics() {
  const activeDir = getSkillDir();
  const hasSkill = fs.existsSync(path.join(activeDir, 'SKILL.md'));
  const hasBrain = fs.existsSync(path.join(activeDir, 'BRAIN.md'));
  const hasAudit = fs.existsSync(path.join(activeDir, 'scripts', 'audit-engine.js'));

  return {
    os: process.platform,
    home: os.homedir(),
    activeSkillDir: activeDir,
    verified: hasSkill && hasAudit,
    hasSkillMd: hasSkill,
    hasBrainMd: hasBrain,
    hasAuditCli: hasAudit
  };
}

module.exports = {
  getSkillDir,
  resolveSkillPath,
  getScriptPath,
  getCandidateSkillDirs,
  getDiagnostics
};

