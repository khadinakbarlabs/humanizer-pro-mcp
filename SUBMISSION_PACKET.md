# Humanizer Pro Marketplace Submission Packet

## Listing

- App name: Humanizer Pro
- Publisher: Khadin Akbar Labs
- Website: `https://texthumanizer.pro`
- Remote MCP URL: `https://texthumanizer.pro/mcp`
- Support email: `support@texthumanizer.pro`
- Privacy policy: `https://texthumanizer.pro/privacy`
- Terms: `https://texthumanizer.pro/terms`

## Short Description

Rewrite text, analyze writing naturalness, and check Humanizer Pro balance and plans.

## Long Description

Humanizer Pro connects ChatGPT, Claude, and MCP-compatible clients to the hosted Humanizer Pro text editing service. Users can rewrite draft text for clarity, tone, and natural readability, analyze writing naturalness, check their word balance, and view available plans without leaving their AI client.

The connector uses OAuth, so each user links their own Humanizer Pro account. Usage is deducted from the same word balance used by the Humanizer Pro web app.

## Tools

| Tool | Type | User-facing purpose |
| --- | --- | --- |
| `humanize_text` | Write | Rewrite text the user is allowed to edit in stealth, academic, or SEO mode. |
| `scan_ai_detection` | Read | Analyze text naturalness and return AI-likeness and human-likeness scores. |
| `check_word_balance` | Read | Show the user's current plan, subscription words, purchased credits, and total words available. |
| `get_subscription_plans` | Read | Show available subscription plans and the user's current plan. |

## Review Notes

- Authentication: OAuth with hosted Humanizer Pro accounts.
- Data handling: tool calls process text supplied by the user for that request.
- Responsible use: the connector is for editing content the user owns or is allowed to revise. Users remain responsible for academic, workplace, publisher, and platform disclosure rules.
- Hosted endpoints: streamable HTTP and SSE are both available.
- Registry metadata: `server.json` validates against the official MCP Registry schema.

## Suggested Categories

- Writing
- Productivity
- Marketing
- Education support
- Developer tools / MCP

## Keywords

Humanizer Pro, text humanizer, AI writing editor, writing naturalness, MCP connector, ChatGPT app, Claude connector, text rewriting, SEO writing, academic writing support
