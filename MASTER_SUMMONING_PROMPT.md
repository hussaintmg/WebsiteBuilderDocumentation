# 🚀 Website Builder Engine — Master Summoning Prompt & Executive Summary

> **HOW TO USE**: Copy and paste the prompt block below into ANY project or workspace when prompting an AI agent. It delivers an immediate high-impact executive summary of **WHAT** must be built, and binds the agent to fetch the full specifications and code recipes from the global skill `website-builder-engine` for **HOW** to implement every detail.
>
> You can also invoke it directly via slash command: `/website-builder-summary`

---

## 📋 The Copy-Paste Master Prompt

```markdown
/goal /using-superpowers /website-builder-summary
Is project ko Website Builder Engine standard ke mutabiq complete aur modernize karo.

SUMMARY OF WHAT YOU MUST DO:
1. INGEST MASTER BRAIN: Read C:/Users/lenovo/.gemini/config/skills/website-builder-engine/BRAIN.md before writing code.
2. ZERO PLAIN HTML & MODERN AESTHETICS: Dark obsidian canvas (bg-neutral-950), frosted glassmorphism (backdrop-blur-xl bg-neutral-900/60 border border-white/10), and Framer Motion transitions (initial={{ opacity: 0, y: 16 }}) on all page containers.
3. CLEAN ROOT /app (ZERO src/ WRAPPER): Next.js App Router directly at root /app/, with sibling /components, /context, /models.
4. ZERO-DEMO AUTH & BIDIRECTIONAL LINKS: No prefilled demo accounts or "Click to login as Admin" buttons in any environment. Empty string state (""). Full bidirectional links: /login (right-aligned "Forgot password?" + bottom "Sign up"), /signup ("Log in"), recovery ("Back to log in").
5. CONTEXT LAW & STATE INTEGRITY: Zero direct raw fetch() or axios in page components. All queries and mutations must flow through domain React Contexts (/context/).
6. SCREEN-LEVEL GENIE TRASH BIN DELETION: Deleting table rows/cards must escape container overflow: hidden via getBoundingClientRect() snapshots into a screen-level portal (fixed inset-0 z-[99999]). Animate kinetic bin rushing from right edge (x: 260 -> 0), motorized lid opening (rotate: -55deg), 3D vacuum siphon deform (scaleX: 0.12, rotateX: 65deg), elastic lid slam, and remaining table rows gliding up smoothly via Framer Motion layout FLIP.
7. RAPID-CLICK BATCHING: High-frequency controls (pagination, steppers, likes, table sorts) must use useRapidClickBatcher with 0ms optimistic UI updates, 300ms settling debounce, and AbortController cancellation.
8. LOW-BANDWIDTH SPEED: Adaptive WebP/AVIF images with BlurHash LQIP, React Server Component streaming (< 50ms TTFB), and IndexedDB SWR caching.
9. FILE NECESSITY & DEAD-CODE PURGE: Audit every file; eliminate unreferenced orphan components, dummy placeholder stubs (// TODO), and duplicate conflicting libraries (axios vs fetch, moment vs date-fns).
10. COMPREHENSIVE TESTS & 95%+ AUDIT GATE: Ensure all pages export valid React components, all API route handlers enforce { success, data, error } envelopes with try/catch, and npx tsc --noEmit exits code 0. Run the automated audit script:
    node C:/Users/lenovo/.gemini/config/skills/website-builder-engine/scripts/audit-engine.js .
    YOU ARE STRICTLY FORBIDDEN FROM STOPPING UNTIL THE AUDIT SCORE IS >= 95%.

WHERE TO GET THE DETAILS (HOW TO IMPLEMENT):
- Master Brain: C:/Users/lenovo/.gemini/config/skills/website-builder-engine/BRAIN.md
- Retrofit Protocol: C:/Users/lenovo/.gemini/config/skills/website-builder-engine/modules/EXISTING_PROJECT_RETROFIT_ENGINE.md
- Genie Trash Bin: C:/Users/lenovo/.gemini/config/skills/website-builder-engine/design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md
- Copy-Paste Recipes: C:/Users/lenovo/.gemini/config/skills/website-builder-engine/design-system/09_IMPLEMENTATION_RECIPES.md
- Testing Standard: C:/Users/lenovo/.gemini/config/skills/website-builder-engine/rules/TESTING_AND_VERIFICATION.md
```

---

## 🧭 Executive Action Matrix

| # | Master Requirement (WHAT to do) | Canonical Specification (HOW to do it) | Exact File to Read |
| :-: | :--- | :--- | :--- |
| **0** | **Master Brain Ingestion** | Full synthesis of all 50 framework specs | `C:/Users/lenovo/.../BRAIN.md` |
| **1** | **Visual Glow-Up & Motion** | Obsidian dark canvas, glassmorphism, Framer Motion | `design-system/DESIGN_ARCHITECTURE.md` & `05_ANIMATIONS_CATALOGUE.md` |
| **2** | **Root `/app` Layout** | Clean root App Router, zero `src/` wrapper | `rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md` |
| **3** | **Zero-Demo Auth & Links** | Empty inputs, no backdoor buttons, bidirectional links | `modules/AUTH_AND_FACELOCK.md` (Section 12) |
| **4** | **Context Law Encapsulation** | Zero raw fetch in pages, state in `/context/` | `rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md` |
| **5** | **Screen Genie Trash Bin** | Fixed portal elevation, kinetic bin, 3D vacuum drop | `design-system/APPLE_GENIE_TRASH_BIN_DELETION_SYSTEM.md` |
| **6** | **Rapid-Click Batching** | 0ms optimistic UI, 300ms debounce, AbortController | `modules/OPTIMISTIC_RAPID_CLICK_BATCHING_ENGINE.md` |
| **7** | **Low-Bandwidth 5-Pillar** | WebP/AVIF, BlurHash LQIP, RSC shells, offline SWR | `modules/LOW_BANDWIDTH_AND_EXTREME_PERFORMANCE_ENGINE.md` |
| **8** | **Dead-Code & Anti-Bloat** | Purge orphan files, remove empty stubs & duplicate pkgs | `rules/SAFE_DEVELOPMENT_AND_FILE_MAP_RULES.md` |
| **9** | **Full Page & API Tests** | Validate page exports, API envelopes, try/catch, tsc | `rules/TESTING_AND_VERIFICATION.md` |
| **10** | **Automated Audit Exit** | Run audit CLI until score >= 95% (Exit code 0) | `scripts/audit-engine.js` |
