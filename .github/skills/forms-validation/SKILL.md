name: forms-validation
description: Build and review accessible React forms with validation, clear errors, loading/success/failure states, honeypot spam protection, and privacy consent.

# Purpose
Use this skill for Kynvera contact/newsletter forms.

# Rules
- Reuse the existing Kynvera CSS system.
- Validate on blur and again on submit.
- Associate errors with fields using aria-describedby.
- Set aria-invalid when a field is invalid.
- Keep submitted data on ordinary validation failures.
- Disable duplicate submission while a request is active.
- Never claim delivery success unless the request succeeds.

# Workflow
1. Inspect the existing form and design tokens.
2. Define the form model and validation rules.
3. Implement accessible states.
4. Integrate the existing endpoint/configuration.
5. Test keyboard, mobile, success, failure, and reduced-motion behavior.
6. Run npm run build.
