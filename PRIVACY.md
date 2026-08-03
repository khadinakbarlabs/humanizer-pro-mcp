# Privacy

## Public package

This repository contains instructions, manifests, assets, tests, and remote-connection metadata. It includes no service credentials, user content, account data, telemetry, install hook, or proprietary rewriting code.

## Hosted Humanizer PRO service

The package connects to `https://texthumanizer.pro/mcp`. A user-provided text is sent to the hosted service only after an explicit `humanize_text` or `scan_ai_detection` request.

- Authentication uses the user's Humanizer PRO account through OAuth.
- Rewrites use the authenticated account's word balance.
- Rewrite requests may save original and rewritten text to the user's Humanizer PRO account history.
- The hosted service may use subprocessors for rewriting and naturalness analysis.
- Balance and plan tools return information associated with the authenticated account.

The current hosted-service policies are available at:

- https://texthumanizer.pro/privacy
- https://texthumanizer.pro/terms

For access, deletion, privacy, or support requests, email `hello@khadinakbar.com`.
