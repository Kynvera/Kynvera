name: analytics
description: Privacy-focused analytics event instrumentation, pageviews, conversions, and graceful failure handling.

# Purpose
Use this skill when implementing conversion tracking, custom events, or debugging analytics.

# Rules
- Stick strictly to the standard event vocabulary: `form_submit`, `newsletter_signup`, `project_clicked`, `github_click` (and later `blog_read`, `download`).
- Ensure analytics scripts never block UI rendering or crash the application if an ad-blocker or provider fails.
- Maintain consistent event naming conventions.

# Workflow
1. Identify target user actions for instrumentation.
2. Wrap tracking calls in defensive, non-blocking execution handlers.
3. Verify event payloads conform strictly to the standard vocabulary.
4. Test functionality with provider blocked to confirm graceful degradation.
