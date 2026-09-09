name: newsletter
description: Lightweight newsletter signup UI, email validation, privacy language, Substack integration, success states, and analytics.

# Purpose
Use this skill when updating footer, hero, blog, or about page newsletter signups.

# Rules
- Keep signup interactions lightweight and simple.
- Validate email input accurately.
- Clearly explain what the user is subscribing to and provide explicit privacy language.
- Use configured publication/endpoint destinations.
- Track `newsletter_signup` analytics event only after the signup action succeeds.

# Workflow
1. Construct lightweight email input with privacy disclaimers.
2. Validate user input on blur and submit.
3. Connect submission logic to configured Substack or endpoint.
4. Trigger conversion analytics event upon verified success.
