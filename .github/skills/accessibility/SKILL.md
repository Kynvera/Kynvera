name: accessibility
description: Semantic HTML, keyboard operation, focus states, modal focus management, labels, ARIA, contrast, and reduced motion.

# Purpose
Use this skill for auditing UI interactions and completing Phase 4 WCAG AA accessibility compliance.

# Rules
- Treat accessibility as a core technical feature, not an optional extra.
- Require semantic HTML markup across all components.
- Ensure visible focus states, proper labels, and keyboard access for all interactive elements.
- Manage focus correctly inside modal dialogs.
- Respect `prefers-reduced-motion` and verify contrast standards.

# Workflow
1. Audit markup for semantic HTML tags and appropriate ARIA attributes.
2. Verify full keyboard navigation and visible focus rings.
3. Confirm error announcements use `aria-describedby` and `aria-invalid`.
4. Verify colors pass contrast thresholds and animation obeys reduced-motion settings.
