# Humanizer PRO: Cline install guide

Humanizer PRO is a hosted Streamable HTTP MCP server. It requires no local
package installation and does not require a shared API key. Each person signs
in to their own Humanizer PRO account through the standard OAuth flow.

## Cline CLI

Add the remote server:

```bash
cline mcp add humanizer-pro https://texthumanizer.pro/mcp --type http
```

If Cline asks about authentication during setup, keep the server configured
without a static credential. When a Humanizer PRO tool is used for the first
time, complete the browser OAuth sign-in for your own account.

## Cline extension

In Cline, open MCP Servers and add a remote HTTP server with:

```text
Name: humanizer-pro
URL: https://texthumanizer.pro/mcp
```

Complete OAuth when Cline opens the Humanizer PRO sign-in page.

## Expected tools

- `humanize_text` — rewrite text you own or are authorized to edit.
- `scan_ai_detection` — return probabilistic writing-naturalness signals.
- `check_word_balance` — show the signed-in account's available words.

The server is intended for authorized editing. It does not promise a detector
outcome, and no account credential should be committed to a project.
