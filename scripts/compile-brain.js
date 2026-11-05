#!/usr/bin/env node

/**
 * ============================================================================
 * WEBSITE BUILDER ENGINE — MASTER BRAIN COMPILER
 * ============================================================================
 * 
 * Compiles all modular specifications, execution contracts, design system files, engineering
 * rules, and architecture blueprints into a unified, high-density BRAIN.md.
 * 
 * When an AI agent loads BRAIN.md, the ENTIRE framework's intelligence,
 * rules, modules, and code recipes are immediately present in its context!
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputFile = path.join(rootDir, 'BRAIN.md');

// ANSI Colors
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const bold = '\x1b[1m';
const reset = '\x1b[0m';

console.log(`${bold}${cyan}Compiling Website Builder Engine Master Brain...${reset}`);

// Ordered Section Manifest
const sections = [
  {
    category: '1. Core Directives & Behavioral Laws',
    files: [
      'EXECUTION_CONTRACT.md',
      'SKILL.md',
      'MAIN_AGENT_DIRECTIVE.md',
      'rules/CORE_DIRECTIVE.md',
      'rules/MANDATORY_EXECUTION_CHECKLIST.md',
      'rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md',
      'rules/EXPERT_ENGINEERING_AND_PHASED_PLANNING_SYSTEM.md',
      'rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md',
      'rules/BACKEND_CONNECTION_RULES.md',
      'rules/RBAC_SECURITY_RULES.md',
      'rules/PAYMENT_SAFEGUARD_RULE.md',
      'rules/TESTING_AND_VERIFICATION.md'
    ]
  },
  {
    category: '2. Design System & Visual Architecture',
    files: [
      'design-system/DESIGN_ARCHITECTURE.md',
      'design-system/FRONTEND_DESIGN_RULES.md',
      'design-system/RESPONSIVE_MOBILE_TABS_SYSTEM.md',
      'design-system/LIQUID_GOOEY_NAVIGATION_TABS_SYSTEM.md',
      'design-system/3D_INTERACTIVE_CAROUSEL_SYSTEM.md',
      'design-system/300_VIRAL_ANIMATIONS_AND_HOVER_EFFECTS_CATALOGUE.md',
      'design-system/APPLE_GENIE_ORIGIN_MORPH_SYSTEM.md',
      'design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md',
      'design-system/BUTTON_IN_FLIGHT_TASK_ANIMATIONS_SPECIFICATION.md',
      'design-system/TASK_ANIMATED_BUTTONS_SYSTEM.md',
      'design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md',
      'design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md',
      'design-system/01_CSS_PROPERTIES_REFERENCE.md',
      'design-system/02_VISUAL_EFFECTS_CATALOGUE.md',
      'design-system/03_UI_COMPONENTS_LIBRARY.md',
      'design-system/04_CARDS_AND_CARD_STACKS_LIBRARY.md',
      'design-system/05_ANIMATIONS_CATALOGUE.md',
      'design-system/06_WEBSITE_SECTIONS_LIBRARY.md',
      'design-system/07_WEBSITE_DESIGN_PATTERNS.md',
      'design-system/09_IMPLEMENTATION_RECIPES.md'
    ]
  },
  {
    category: '3. Core Business & Architecture Modules',
    files: [
      'modules/EXISTING_PROJECT_RETROFIT_ENGINE.md',
      'modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md',
      'modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md',
      'modules/MULTI_STORAGE_POLYMORPHIC_MEDIA_ENGINE.md',
      'modules/PAYMENT_IDEMPOTENCY_AND_RECONCILIATION_ENGINE.md',
      'modules/BACKEND_SCALING_AND_RESILIENCE_ARCHITECTURE.md',
      'modules/ADVANCED_SYSTEM_DESIGNS_AND_HIGH_SCALE_PATTERNS.md',
      'modules/AUTH_AND_FACELOCK.md',
      'modules/ROUTE_PROXY_AND_PROTECTION_SYSTEM.md',
      'modules/ORDER_SLIDE_WORKFLOW.md',
      'modules/DATA_TABLE_AND_CARDS_SYSTEM.md',
      'modules/CMS_ENGINE.md',
      'modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md',
      'modules/CHAT_AND_COMMUNICATION_SYSTEM.md',
      'modules/CHAT_LIGHTWEIGHT_CONCURRENCY_AND_COMPRESSION.md',
      'modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md',
      'modules/AUTONOMOUS_AI_LEAD_RESPONDER_AND_BOOKING_SYSTEM.md',
      'modules/ENQUIRIES_AND_LEADS_SYSTEM.md',
      'modules/NEWSLETTER_AND_BLOGS_SYSTEM.md',
      'modules/INFINITE_COMMENTS_AND_REPLIES_SYSTEM.md',
      'modules/LMS_LIVE_STREAMING_AND_INTERACTIVE_CLASSES.md',
      'modules/MOBILE_NAVIGATION_AND_LAYOUT.md',
      'modules/MULTI_TENANT_SYSTEM.md',
      'modules/RBAC_SYSTEM.md',
      'modules/SHORTCUT_KEYS_SYSTEM.md',
      'modules/AUTOMATIONS_AND_NOTIFICATIONS.md',
      'modules/NOT_FOUND_PAGE.md'
    ]
  },
  {
    category: '4. Project Initialization & Discovery',
    files: [
      'PLAN_BUILDER.md',
      'DISCOVERY_QUESTIONNAIRE.md'
    ]
  },
  {
    category: '5. Project Intelligence, Scope Planning & Quality Gates',
    files: [
      'engines/PROJECT_INTELLIGENCE.md',
      'engines/INTENT_AND_SCOPE.md',
      'engines/INDEPENDENT_REVIEWER.md',
      'quality/ANIMATION_QA.md',
      'quality/ACCEPTANCE_CRITERIA.md'
    ]
  }
];

let compiledContent = `# 🧠 WEBSITE BUILDER ENGINE — MASTER COMPILED BRAIN
> **CANONICAL PRODUCTION SPECIFICATION & COMPLETE KNOWLEDGE BASE**  
> Auto-generated compiled synthesis of all 50+ architecture modules, design systems, engineering rules, and verification standards.
> 
> **AGENT DIRECTIVE**: Reading this single file immediately loads the full architecture, code recipes, design tokens, and security rules into your working memory. Never produce generic code when canonical implementations exist below.

---

## 📑 MASTER TABLE OF CONTENTS

`;

// Build TOC
let fileCount = 0;
let ingestedCount = 0;
const missingFiles = [];
for (const sec of sections) {
  compiledContent += `### ${sec.category}\n`;
  for (const relFile of sec.files) {
    const anchor = relFile.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    compiledContent += `- [${relFile}](#file-${anchor})\n`;
    fileCount++;
  }
  compiledContent += '\n';
}

compiledContent += '---\n\n';

// Ingest Files
for (const sec of sections) {
  compiledContent += `# ${sec.category}\n\n`;

  for (const relFile of sec.files) {
    const fullPath = path.join(rootDir, relFile);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Missing file ${relFile}`);
      missingFiles.push(relFile);
      continue;
    }

    ingestedCount++;
    const anchor = relFile.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const rawContent = fs.readFileSync(fullPath, 'utf8');

    compiledContent += `\n<a id="file-${anchor}"></a>\n`;
    compiledContent += `## 📄 Specification: \`${relFile}\`\n\n`;
    compiledContent += rawContent;
    compiledContent += '\n\n---\n\n';
  }
}

// Write compiled BRAIN.md
fs.writeFileSync(outputFile, compiledContent, 'utf8');

const stats = fs.statSync(outputFile);
const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
const lineCount = compiledContent.split('\n').length;

console.log(`${bold}${green}✔ Successfully compiled Master Brain!${reset}`);
console.log(`  Output Path: ${outputFile}`);
console.log(`  Manifest Files: ${fileCount}`);
console.log(`  Files Actually Ingested: ${ingestedCount}`);
if (missingFiles.length) {
  console.error(`Compilation incomplete: ${missingFiles.length} missing source file(s): ${missingFiles.join(', ')}`);
  process.exitCode = 1;
}
console.log(`  Total Size: ${sizeMB} MB (${lineCount} lines)`);

