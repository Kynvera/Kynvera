name: testing-qa
description: Type-checking, build verification, interaction tests, responsive checks, accessibility smoke tests, and regression review.

# Purpose
Use this skill before issuing commits, opening pull requests, or cutting releases.

# Rules
- Every meaningful change must pass build and quality verification.
- Always run `npm run build` and ensure zero TypeScript or bundling errors.
- Check behavior in dark and light themes.
- Verify mobile and desktop viewports, keyboard interaction, and reduced-motion states.
- Never declare a task complete without running relevant verification steps.

# Workflow
1. Run `npm run build` and inspect output.
2. Open browser developer console and check for runtime/rendering errors.
3. Test feature across mobile and desktop breakpoints.
4. Check theme toggling and reduced-motion compliance.
