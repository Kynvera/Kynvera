name: ui-ux-pro-max
description: Advanced UI/UX design architecture, visual hierarchy, spatial density, custom Vanilla CSS keyframe motion, component polish, and WCAG AA accessibility.

# Purpose
Use this skill for high-level UI/UX redesigns, component visual polish, complex layout architecture, micro-interactions, and accessibility audits.

# Core Principles
- **Design Tokens First:** Derive all colors, typography, spacing, border radii, and shadows from `design-tokens.json` and CSS custom properties in `src/styles.css`.
- **Vanilla CSS Architecture:** Write modular, maintainable rules in `src/styles.css`. No external UI libraries or utility frameworks.
- **Visual Hierarchy & Contrast:** Use strict contrast levels and font scale pairings (Manrope for body/headings, JetBrains Mono for code/technical stats).
- **Subtle & Purposeful Motion:** Utilize native `@keyframes` and `transition` with `cubic-bezier(.22, 1, .36, 1)` easing.
- **Accessibility (WCAG AA):** Ensure minimum 44x44px touch targets, visible focus indicators (`:focus-visible`), aria labels, and `prefers-reduced-motion` fallbacks.

# UI/UX Polish Checklist
1. **Layout & Grid:** Use consistent 8px-based spatial system (`var(--space-2)`, `var(--space-4)`, etc.).
2. **Surface Depth:** Combine subtle borders (`1px solid var(--border-color)`) with measured elevation shadows rather than heavy drop shadows.
3. **Interactive States:** Provide distinct visual feedback for Default, Hover, Active, Focus, Disabled, and Loading states.
4. **Motion Safeguard:** Include `@media (prefers-reduced-motion: reduce)` for every animated component.

# Workflow
1. Inspect existing tokens in `design-tokens.json` and CSS variables in `src/styles.css`.
2. Construct semantic React 19 TypeScript component structure.
3. Define layout grid, surface styling, and typography hierarchy in `src/styles.css`.
4. Apply interaction feedback and native keyframe animations.
5. Verify accessibility compliance and run `npm run build`.
