name: kynvera-architecture
description: High-level repository architecture map, component boundaries, state flow, API behavior, and safe-change rules.

# Purpose
Use this skill before changing project structure or overall architecture.

# Rules
- Inspect existing code first and avoid unnecessary rewrites.
- Understand App.tsx, components, styles, assets, public files, and data arrays before modifying file placement.
- Maintain remote GitHub loading patterns, theme state, and modal behavior integrity.
- Ensure environment variables and contact integrations strictly adhere to existing implementation patterns.

# Workflow
1. Inspect App.tsx and core component boundaries.
2. Verify state flow, remote loading, and environment variable requirements.
3. Apply structural or architecture changes incrementally.
4. Run `npm run build` to verify project integrity.
