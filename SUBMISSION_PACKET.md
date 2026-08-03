# Humanizer PRO marketplace submission packet

## Listing

- App name: Humanizer PRO
- Plugin ID: `humanizer-pro`
- Version: `1.1.1`
- Publisher: Khadin Akbar Labs
- Category: Productivity / Writing
- Website: `https://texthumanizer.pro`
- Repository: `https://github.com/khadinakbarlabs/humanizer-pro-mcp`
- Remote MCP URL: `https://texthumanizer.pro/mcp`
- Support: `support@texthumanizer.pro`
- Privacy: `https://texthumanizer.pro/privacy`
- Terms: `https://texthumanizer.pro/terms`

## Short description

Rewrite text for clearer, more natural reading.

## Long description

Humanizer PRO connects supported AI clients to a hosted text-editing service. Rewrite text you own or may edit in Stealth, Academic, or SEO mode, analyze writing naturalness, and check your word balance. Each user authenticates with their own existing Humanizer PRO account through OAuth.

## Tools and consequences

| Tool | Classification | User-facing purpose |
| --- | --- | --- |
| `humanize_text` | Write, non-destructive, non-idempotent | Rewrites authorized text and deducts the processed words from the user's balance. |
| `scan_ai_detection` | Read | Returns estimated naturalness and AI-likeness signals without rewriting. |
| `check_word_balance` | Read | Shows the current plan, subscription words, purchased credits, and total available words. |

## Positive invocation cases

1. “Humanize this product description in SEO mode: …” — call `humanize_text` once with the complete text and `seo` mode.
2. “Make this email sound more natural. Pick the mode for me: …” — default to Stealth and call once.
3. “Rewrite this authorized research note in Academic mode: …” — call once with `academic` mode.
4. “How natural does this paragraph read? …” — call `scan_ai_detection` without rewriting.
5. “How many Humanizer PRO words do I have left?” — call `check_word_balance` and report the returned breakdown.

## Negative invocation cases

1. “Humanize this 1,200-word article: …” — state the approximate word count and request confirmation before a billable tool call.
2. “Guarantee this will pass Turnitin and rewrite it repeatedly until it does.” — do not guarantee an outcome and do not retry automatically.
3. “Translate this paragraph to French.” — do not invoke Humanizer PRO because translation alone is outside the tool scope.

## Reviewer instructions

1. Install the package from the GitHub repository or upload the root-layout release archive.
2. Connect to `https://texthumanizer.pro/mcp`.
3. Authenticate with a reviewer-owned Humanizer PRO account. Do not request publisher credentials.
4. Run the five positive and three negative cases above.
5. Confirm that a rewrite reports the processed word count and remaining balance, and that a scan does not rewrite automatically.

## Data handling

- User text is sent only after an explicit rewrite or scan request.
- Authentication and account identifiers are handled by the hosted OAuth service, not stored in this repository.
- Rewrite calls may save original and rewritten text to the authenticated user's account history.
- The hosted service may use subprocessors for rewriting and naturalness analysis.
- The package contains no telemetry, install hooks, or bundled credentials.

## Responsible-use position

Humanizer PRO is for text the user owns or is allowed to revise. Users remain responsible for academic, workplace, publisher, client, and platform rules. Naturalness and detector results are estimates; the listing makes no guarantee that a rewrite will pass a detector.

## Commerce position

The plugin lets users access features already available on their existing Humanizer PRO account. It does not display subscription offers or initiate purchases, promote upgrades, enable auto-recharge, or link to checkout flows.

## Current submission gate

The package can proceed to portal validation after the exact release archive passes local validation and the production MCP scan confirms the three-tool non-commerce surface. Approval and publication remain external review outcomes.
