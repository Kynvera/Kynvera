name: security
description: Input safety, XSS awareness, secret handling, external request safety, spam prevention, and safe defaults.

# Purpose
Use this skill when auditing forms, integrations, API endpoints, deployment setups, or new dependencies.

# Rules
- Validate and sanitize all user input to eliminate XSS risks.
- Never expose private keys, API tokens, or secrets in frontend repositories.
- Implement spam prevention mechanisms (such as honeypot fields) on public forms.
- Minimize third-party dependencies and prefer secure-by-default choices.

# Workflow
1. Review code changes for user input sanitation and XSS risks.
2. Inspect environment variable usage to verify secrets remain client-safe.
3. Ensure honeypot controls are active on all public submission forms.
4. Perform dependency hygiene checks before adding external packages.
