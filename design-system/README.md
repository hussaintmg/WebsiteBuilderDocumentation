# Design System — Canonical Index

This folder is the single canonical home for design rules, CSS references, visual effects, UI components, cards, animation patterns, page sections, complete design archetypes, implementation recipes, research references, and the searchable index. When guidance conflicts, consult the relevant technical specification and note the conflict rather than silently discarding requirements.

## Recommended reading order

1. [Design Architecture](./DESIGN_ARCHITECTURE.md) — system-wide visual foundations and shared conventions.
2. [Frontend Design Rules](./FRONTEND_DESIGN_RULES.md) — implementation and UI quality constraints.
3. [CSS Properties Reference](./01_CSS_PROPERTIES_REFERENCE.md) — CSS fundamentals and advanced properties.
4. [Visual Effects Catalogue](./02_VISUAL_EFFECTS_CATALOGUE.md) — effects and visual treatments.
5. [UI Components Library](./03_UI_COMPONENTS_LIBRARY.md) — component patterns and interactions.
6. [Cards and Card Stacks Library](./04_CARDS_AND_CARD_STACKS_LIBRARY.md) — overlapping decks, stacked cards, fan-outs, swipe interactions, 3D cards.
7. [Animations Catalogue](./05_ANIMATIONS_CATALOGUE.md) — motion patterns, triggers, accessibility.
8. [Website Sections Library](./06_WEBSITE_SECTIONS_LIBRARY.md) — page-section compositions.
9. [Website Design Patterns](./07_WEBSITE_DESIGN_PATTERNS.md) — whole-site experience archetypes.
10. [Implementation Recipes](./09_IMPLEMENTATION_RECIPES.md) — practical React and Tailwind implementations.
11. [Sources and References](./08_SOURCES_AND_REFERENCES.md) — technical standards and external discovery sources.
12. [Searchable Index](./10_SEARCHABLE_INDEX.md) — cross-references and use-case lookup.

## Design system rules and animation subsystems

- [Master Hover Animation System](./MASTER_HOVER_ANIMATION_SYSTEM.md)
- [Premium Button Animation System](../design-system/PREMIUM_BUTTON_ANIMATION_SYSTEM.md)
- [Task Animated Buttons System](./TASK_ANIMATED_BUTTONS_SYSTEM.md)
- [Row/Card Delete Dustbin Animation](./ROW_CARD_DELETE_DUSTBIN_ANIMATION.md)
- [Three.js 3D Model Architecture, Inspection & Anatomy Engine](./THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md)
- [Missing Reference Image Recovery Ledger](./assets/MISSING_REFERENCE_ASSETS.md)

## Cross-system boundaries

- Design and UI decisions belong here.
- Backend connection, security, roles, planning, payment safeguards, and verification policy belong in `../rules/`.
- Feature behavior and module contracts belong in `../modules/`.
- `../README.md` and `../MAIN_AGENT_DIRECTIVE.md` are the entry points for the complete framework.

## How agents should use this library

Read only the relevant files for the requested change. Trace cross-links, preserve requirements that the user did not ask to change, and verify the target framework/library versions before applying implementation recipes. Treat examples as patterns—not as permission to copy a brand's visual identity or to claim external references were tested when they were not.
