name: email-integrations
description: FormSubmit-style integration, environment variables, request handling, error handling, and safe delivery claims.

# Purpose
Use this skill when implementing or modifying FormSubmit, backend, or external email delivery workflows.

# Rules
- Read the configured endpoint strictly from environment variables.
- Handle network and service failures gracefully.
- Never expose API keys, credentials, or private environment values in frontend source code.
- Never tell users a message was sent when the request did not succeed.

# Workflow
1. Inspect configured email environment variables.
2. Wire HTTP requests with robust response and failure handling.
3. Ensure feedback UI correctly reflects real success or error responses.
4. Verify secrets remain unexposed in client build outputs.
