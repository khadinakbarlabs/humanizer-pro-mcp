#!/usr/bin/env node

import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const VERSION = "1.1.1";
const MCP_URL = "https://texthumanizer.pro/mcp";
const TEXT_EXTENSIONS = new Set(["", ".json", ".md", ".mjs", ".yaml", ".yml", ".txt"]);
const EXCLUDED_DIRECTORIES = new Set([".git", "node_modules", "dist"]);
const SECRET_PATTERNS = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ["GitHub token", /(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})/],
  ["OpenAI key", /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/],
  ["Anthropic key", /sk-ant-[A-Za-z0-9_-]{20,}/],
  ["Stripe live key", /(?:sk|rk)_live_[A-Za-z0-9]{16,}/],
  ["personal filesystem path", /(?:\/Users\/[A-Za-z0-9._-]+\/|\/home\/[A-Za-z0-9._-]+\/|[A-Za-z]:\\Users\\[^\\]+\\)/],
];

async function walk(directory = ROOT) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    const entryPath = path.join(directory, entry.name);
    const stats = await lstat(entryPath);
    if (stats.isSymbolicLink()) throw new Error(`Symbolic links are not allowed: ${entryPath}`);
    if (stats.isDirectory()) files.push(...await walk(entryPath));
    else if (stats.isFile()) files.push(entryPath);
  }
  return files;
}

function frontmatterValue(text, key) {
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1] ?? "";
  return frontmatter
    .split(/\r?\n/u)
    .find((line) => line.startsWith(`${key}:`))
    ?.slice(key.length + 1)
    .trim()
    .replace(/^['"]|['"]$/gu, "");
}

export async function validateRelease() {
  const errors = [];
  const required = [
    ".agents/plugins/marketplace.json",
    ".claude-plugin/marketplace.json",
    ".claude-plugin/plugin.json",
    ".codex-plugin/plugin.json",
    ".cursor-plugin/plugin.json",
    ".mcp.json",
    "assets/icon.png",
    "assets/logo.png",
    "GEMINI.md",
    "gemini-extension.json",
    "LICENSE",
    "PRIVACY.md",
    "README.md",
    "SECURITY.md",
    "SUBMISSION_PACKET.md",
    "package.json",
    "server.json",
    "skills/humanize-text/SKILL.md",
    "skills/humanize-text/agents/openai.yaml",
    "skills/humanize-text/assets/icon.png",
    "skills/humanize-text/assets/logo.png",
    "skills/humanize-text/references/modes.md",
    "skills/humanize-text/references/privacy-and-responsible-use.md"
  ];
  const files = await walk();
  const relativeFiles = new Set(files.map((file) => path.relative(ROOT, file)));
  for (const file of required) if (!relativeFiles.has(file)) errors.push(`Missing required file: ${file}`);

  const jsonFiles = [
    "package.json",
    ".mcp.json",
    ".codex-plugin/plugin.json",
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
    ".agents/plugins/marketplace.json",
    ".cursor-plugin/plugin.json",
    "gemini-extension.json",
    "server.json"
  ];
  const parsed = {};
  for (const file of jsonFiles) {
    try {
      parsed[file] = JSON.parse(await readFile(path.join(ROOT, file), "utf8"));
    } catch (error) {
      errors.push(`Invalid JSON in ${file}: ${error.message}`);
    }
  }

  const versions = [
    parsed["package.json"]?.version,
    parsed[".codex-plugin/plugin.json"]?.version,
    parsed[".claude-plugin/plugin.json"]?.version,
    parsed[".claude-plugin/marketplace.json"]?.plugins?.[0]?.version,
    parsed[".agents/plugins/marketplace.json"]?.plugins?.[0]?.version,
    parsed[".cursor-plugin/plugin.json"]?.version,
    parsed["gemini-extension.json"]?.version
  ];
  if (versions.some((version) => version !== VERSION)) errors.push("All package and plugin surface versions must match");
  if (parsed[".mcp.json"]?.mcpServers?.["humanizer-pro"]?.url !== MCP_URL) errors.push("MCP URL mismatch");
  if (parsed[".mcp.json"]?.mcpServers?.["humanizer-pro"]?.bearer_token_env_var) errors.push("The OAuth server must not declare a static bearer token");
  if (parsed[".agents/plugins/marketplace.json"]?.plugins?.[0]?.source?.path !== "../..") errors.push("Codex marketplace source must resolve to the repository root");
  if (parsed[".claude-plugin/marketplace.json"]?.plugins?.[0]?.source !== "./") errors.push("Claude marketplace source must resolve to the repository root");

  const skill = await readFile(path.join(ROOT, "skills/humanize-text/SKILL.md"), "utf8");
  if (frontmatterValue(skill, "name") !== "humanize-text") errors.push("Skill name must match its directory");
  const description = frontmatterValue(skill, "description") ?? "";
  if (!description || description.length > 1024) errors.push("Skill description must be 1-1024 characters");
  const bracketedTodo = "[" + "TODO:";
  const angleTodo = "<" + "TODO>";
  if (skill.includes(bracketedTodo) || skill.includes(angleTodo)) errors.push("Skill contains an unfinished placeholder");

  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;
    const relative = path.relative(ROOT, file);
    if (relative === "scripts/validate-release.mjs") continue;
    const text = await readFile(file, "utf8");
    for (const [label, pattern] of SECRET_PATTERNS) {
      if (pattern.test(text)) errors.push(`${label} found in ${relative}`);
    }
  }
  return [...new Set(errors)].sort();
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = await validateRelease();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Release validation passed.");
  }
}
