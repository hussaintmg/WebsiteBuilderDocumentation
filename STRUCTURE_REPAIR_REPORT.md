# Structure & Link Repair Report

## What changed

- Consolidated six design-only rule documents into `design-system/`, preserving their substantive text.
- Updated internal Markdown links and in-text canonical paths to use the new locations; corrected 39 invalid/abbreviated heading fragments.
- Corrected the known relative links that were already broken in the supplied archive.
- Replaced 8 image-reference occurrences that pointed to another computer's `file:///C:/...` paths with clearly labelled recovery notes. The original image files were not included in the ZIP and therefore could not be restored or visually verified.
- Added `design-system/README.md` as the single entry point for the complete design system.
- Updated the root README directory map to match the canonical organization.
- Excluded `.git/` history and local Git metadata from this distribution ZIP; source document bodies and module/rule text are retained, except for path/link repairs and missing-image placeholder notes.

## Canonical moves

| Old location | New canonical location |
|---|---|
| `rules/DESIGN_ARCHITECTURE.md` | `design-system/DESIGN_ARCHITECTURE.md` |
| `rules/FRONTEND_DESIGN_RULES.md` | `design-system/FRONTEND_DESIGN_RULES.md` |
| `rules/MASTER_HOVER_ANIMATION_SYSTEM.md` | `design-system/MASTER_HOVER_ANIMATION_SYSTEM.md` |
| `rules/PREMIUM_BUTTON_ANIMATION_SYSTEM.md` | `design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md` |
| `rules/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md` | `design-system/ROW_CARD_DELETE_DUSTBIN_ANIMATION.md` |
| `rules/TASK_ANIMATED_BUTTONS_SYSTEM.md` | `design-system/TASK_ANIMATED_BUTTONS_SYSTEM.md` |

## Validation result

Running `python scripts/validate_markdown.py .` on this cleaned copy reports **48 Markdown files, 31 external links, 0 missing local targets, 0 invalid local anchors, and 0 machine-local link targets**. This validates local link structure only; it does not prove that external URLs currently return HTTP 200 or that their content is still appropriate.

## Outstanding work (not silently fabricated)

- Recover the screenshot/image assets listed in `design-system/assets/MISSING_REFERENCE_ASSETS.md`.
- Re-verify external source URLs and browser/library support when the actual implementation stack/version is chosen.
- Keep the searchable index in sync as entries are added; its cross-links should be checked after every catalogue change.
- Review potentially contradictory requirements across design and engineering docs in a deliberate policy pass; this pass only repaired structure and links and did not rewrite technical policies.
