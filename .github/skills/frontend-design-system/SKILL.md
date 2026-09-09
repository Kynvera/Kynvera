name: frontend-design-system
description: Shared UI system patterns, buttons, cards, modals, navigation, typography, surfaces, borders, grids, and motion.

# Purpose
Use this skill for maintaining UI consistency, responsive work, design polish, and building new visual sections.

# Rules
- Treat `src/styles.css` and `design-tokens.json` as the single source of truth.
- Reuse existing CSS classes and design token utility patterns.
- Keep spacing, type hierarchy, borders, focus states, cards, buttons, modals, and motion coherent across sections.
- Do not rewrite `styles.css` just to simplify a single task.

# Workflow
1. Check existing CSS classes in `src/styles.css` and variables in `design-tokens.json`.
2. Compose layout elements reusing established design system styles.
3. Test responsiveness across mobile and desktop breakpoints.
