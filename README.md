# Humanizer Pro MCP

Official remote MCP connector metadata for Humanizer Pro.

Humanizer Pro lets AI clients connect to the hosted Humanizer Pro backend at `https://texthumanizer.pro/mcp` to rewrite text for clarity and natural readability, analyze writing naturalness, check word balance, and view subscription plans.

This repository is intentionally open source metadata and documentation only. The Humanizer Pro web app, proprietary backend, billing logic, and rewriting engine are not included here.

## Remote MCP Server

- Name: `Humanizer Pro`
- Streamable HTTP: `https://texthumanizer.pro/mcp`
- SSE fallback: `https://texthumanizer.pro/sse`
- Health: `https://texthumanizer.pro/health`
- Server card: `https://texthumanizer.pro/.well-known/mcp/server-card.json`
- Website: `https://texthumanizer.pro`

## Tools

| Tool | Type | Description |
| --- | --- | --- |
| `humanize_text` | Write | Rewrites text the user is allowed to edit for clarity, tone, and natural readability. Supports `stealth`, `academic`, and `seo` modes. |
| `scan_ai_detection` | Read | Evaluates how natural a piece of writing reads and returns AI-likeness and human-likeness scores. |
| `check_word_balance` | Read | Returns the authenticated user's plan, subscription words, purchased credits, and total available words. |
| `get_subscription_plans` | Read | Returns available Humanizer Pro plans and the user's current plan. |

## Authentication

The remote MCP server uses OAuth. Users connect with their Humanizer Pro account and usage is billed against their existing word balance.

No API key is required in this repository.

## Connect From ChatGPT

1. Open ChatGPT settings.
2. Go to Apps and Connectors.
3. Add a developer or custom connector using `https://texthumanizer.pro/mcp`.
4. Sign in with your Humanizer Pro account when prompted.

Public ChatGPT app directory availability depends on OpenAI review.

## Connect From Claude

Claude supports remote MCP custom connectors. Add `https://texthumanizer.pro/mcp` as a custom connector and authenticate with your Humanizer Pro account.

Directory availability depends on Anthropic review.

## MCP Registry

This repo includes `server.json` using the official MCP Registry format:

```bash
mcp-publisher validate server.json
mcp-publisher publish server.json
```

## Smithery

The hosted remote MCP can be published to Smithery with:

```bash
smithery mcp publish https://texthumanizer.pro/mcp -n khadin-akbar/humanizer-pro
```

## Responsible Use

Humanizer Pro is for editing content you own or are allowed to revise. Users remain responsible for following academic, workplace, publisher, and platform disclosure rules.

## License

The metadata and documentation in this repository are licensed under MIT.
