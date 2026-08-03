import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateRelease } from "../scripts/validate-release.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("the release package passes deterministic validation", async () => {
  assert.deepEqual(await validateRelease(), []);
});

test("the MCP connection uses hosted OAuth without a bundled credential", async () => {
  const config = JSON.parse(await readFile(path.join(ROOT, ".mcp.json"), "utf8"));
  assert.deepEqual(config, {
    mcpServers: {
      "humanizer-pro": {
        type: "http",
        url: "https://texthumanizer.pro/mcp"
      }
    }
  });
});

test("the skill protects billable rewrite calls", async () => {
  const skill = await readFile(path.join(ROOT, "skills/humanize-text/SKILL.md"), "utf8");
  assert.match(skill, /more than 500 words/u);
  assert.match(skill, /exactly once/u);
  assert.match(skill, /Never split, batch, retry, or reprocess/u);
  assert.match(skill, /Do not promise/u);
});

test("the public package exposes the non-commerce three-tool surface", async () => {
  const skill = await readFile(path.join(ROOT, "skills/humanize-text/SKILL.md"), "utf8");
  const manifest = await readFile(path.join(ROOT, ".codex-plugin/plugin.json"), "utf8");
  const submission = await readFile(path.join(ROOT, "SUBMISSION_PACKET.md"), "utf8");
  const text = `${skill}\n${manifest}\n${submission}`;

  assert.doesNotMatch(text, /get_subscription_plans|view available plans|pricing/u);
  assert.match(submission, /does not display subscription offers or initiate purchases/u);
});
