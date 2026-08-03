# Humanizer PRO — text humanization plugin and Agent Skill

[![skills.sh](https://skills.sh/b/khadinakbarlabs/humanizer-pro-mcp)](https://skills.sh/khadinakbarlabs/humanizer-pro-mcp/humanize-text)
[![validate](https://github.com/khadinakbarlabs/humanizer-pro-mcp/actions/workflows/validate.yml/badge.svg)](https://github.com/khadinakbarlabs/humanizer-pro-mcp/actions/workflows/validate.yml)
[![license](https://img.shields.io/badge/license-MIT-6d5ef5)](LICENSE)

Humanizer PRO connects AI clients to the hosted Humanizer PRO text-editing service. It can rewrite text you own or are allowed to edit in Stealth, Academic, or SEO mode, analyze writing naturalness, and check your word balance.

This repository is the official open-source distribution package. It contains the portable `humanize-text` Agent Skill, native Claude Code and Codex plugin manifests, marketplace metadata, and the remote MCP connection. The proprietary rewriting engine, billing logic, and service credentials remain hosted at [texthumanizer.pro](https://texthumanizer.pro).

## Install

### Claude Code

```text
/plugin marketplace add khadinakbarlabs/humanizer-pro-mcp
/plugin install humanizer-pro@humanizer-pro
```

Claude loads the skill and the hosted MCP server. Sign in with your Humanizer PRO account when the first tool requires authentication.

### OpenAI Codex

```bash
codex plugin marketplace add khadinakbarlabs/humanizer-pro-mcp
codex plugin add humanizer-pro@humanizer-pro
```

Codex loads the same skill and remote MCP connection. Public Codex marketplace availability is separate from this GitHub-hosted marketplace and depends on OpenAI review.

### skills.sh and compatible agents

```bash
npx skills add khadinakbarlabs/humanizer-pro-mcp --skill humanize-text
```

Select a specific supported agent when needed:

```bash
npx skills add khadinakbarlabs/humanizer-pro-mcp --skill humanize-text --agent claude-code --yes
npx skills add khadinakbarlabs/humanizer-pro-mcp --skill humanize-text --agent codex --yes
npx skills add khadinakbarlabs/humanizer-pro-mcp --skill humanize-text --agent cursor --yes
```

Browse the catalog entry at [skills.sh/khadinakbarlabs/humanizer-pro-mcp/humanize-text](https://skills.sh/khadinakbarlabs/humanizer-pro-mcp/humanize-text).

### GitHub Copilot

GitHub CLI 2.90 or later can install the skill for Copilot or another supported host:

```bash
gh skill install khadinakbarlabs/humanizer-pro-mcp humanize-text
```

The repository's `skills/humanize-text/SKILL.md` follows the open Agent Skills specification.

### Gemini CLI

```bash
gemini extensions install https://github.com/khadinakbarlabs/humanizer-pro-mcp
```

Connect the hosted MCP endpoint when your Gemini setup does not import it automatically:

```text
https://texthumanizer.pro/mcp
```

### ChatGPT or another MCP client

Add a custom/developer connector using:

```text
https://texthumanizer.pro/mcp
```

Then sign in with your Humanizer PRO account. Public ChatGPT app directory availability depends on OpenAI review.

## What the skill does

| Request | Tool | Effect |
| --- | --- | --- |
| Humanize or rewrite authorized text | `humanize_text` | Uses Stealth, Academic, or SEO mode and deducts the processed words from the account balance. |
| Analyze writing naturalness | `scan_ai_detection` | Returns estimated AI-likeness and human-likeness signals without rewriting. |
| Check remaining usage | `check_word_balance` | Returns plan, subscription words, purchased credits, and total available words. |

The workflow confirms rewrites over 500 words, sends the complete text in one call, prevents automatic billable retries, and reports the remaining balance when available.

## Remote service

- Streamable HTTP: `https://texthumanizer.pro/mcp`
- SSE fallback: `https://texthumanizer.pro/sse`
- OAuth metadata: `https://texthumanizer.pro/.well-known/oauth-authorization-server`
- Health: `https://texthumanizer.pro/health`
- Documentation: `https://texthumanizer.pro/mcp-docs`
- Privacy: `https://texthumanizer.pro/privacy`
- Terms: `https://texthumanizer.pro/terms`
- Support: `hello@khadinakbar.com`

No API key is included or required by this repository. Each user authenticates through the hosted OAuth flow and uses their own Humanizer PRO word balance.

## Responsible use

Use Humanizer PRO only for text you own or are authorized to revise. Preserve citations and factual meaning, and follow applicable academic, workplace, client, publisher, and platform disclosure rules.

Naturalness and detector scores are probabilistic. This package does not promise that a rewrite will pass Turnitin, GPTZero, Originality.ai, Copyleaks, ZeroGPT, or any other detector.

## Validate

```bash
npm run release:check
claude plugin validate . --strict
python3 /path/to/skill-creator/scripts/quick_validate.py skills/humanize-text
mcp-publisher validate server.json
```

The release check validates every manifest, referenced asset, skill identifier, MCP URL, version, and public text file for common secret and personal-path patterns.

## Directory metadata

- `server.json` follows the official MCP Registry format.
- `.claude-plugin/marketplace.json` makes this repository a Claude Code marketplace.
- `.agents/plugins/marketplace.json` makes it a Codex plugin marketplace.
- `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`, and `gemini-extension.json` provide native package surfaces.
- `skills/humanize-text/SKILL.md` is the portable source used by skills.sh, Copilot, Codex, Claude Code, Cursor, and other Agent Skills-compatible clients.

## License

The skill, manifests, metadata, documentation, tests, and validation scripts in this repository are licensed under MIT. The hosted Humanizer PRO service and proprietary rewriting engine are not included in that license.
