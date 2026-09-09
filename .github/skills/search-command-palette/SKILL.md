name: search-command-palette
description: Lunr-based client-side search, Cmd/Ctrl+K palette, keyboard navigation, fuzzy matching, and filters.

# Purpose
Use this skill when implementing or modifying global search, the command palette dialog, or keyboard UX.

# Rules
- Keep search fully client-side using Lunr.
- Index projects, capabilities, labs, and future blog content.
- Provide full keyboard access: Cmd+K / Ctrl+K shortcut to open, Escape to close, Arrow keys to navigate, and Enter to select.
- Use an accessible modal dialog pattern.

# Workflow
1. Setup/update Lunr search index generation.
2. Implement modal overlay adhering to accessible dialog semantics.
3. Bind keyboard listeners (`Cmd+K`, `Escape`, arrows, `Enter`).
4. Verify fuzzy matching and categorized search results.
