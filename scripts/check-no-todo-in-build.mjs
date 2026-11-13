/**
 * Fail the build if App Router rendered output contains literal "TODO" placeholders.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SCAN_ROOTS = [
  join(process.cwd(), ".next", "server", "app"),
  join(process.cwd(), ".next", "static"),
];

const SOURCE_ROOTS = [join(process.cwd(), "src")];

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".json",
  ".rsc",
  ".meta",
  ".body",
  ".txt",
]);

const SOURCE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]);

const TODO_PATTERN = /\bTODO\b|TODO:/;

function walk(dir, allowedExts, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      walk(full, allowedExts, files);
    } else if (allowedExts.has(extname(name))) {
      files.push(full);
    }
  }
  return files;
}

function scanRoots(roots, allowedExts) {
  const hits = [];
  for (const root of roots) {
    for (const file of walk(root, allowedExts)) {
      let text;
      try {
        text = readFileSync(file, "utf8");
      } catch {
        continue;
      }
      if (TODO_PATTERN.test(text)) {
        hits.push(file.replace(process.cwd(), "").replace(/\\/g, "/"));
      }
    }
  }
  return hits;
}

const outputHits = scanRoots(SCAN_ROOTS, TEXT_EXTENSIONS);
const sourceHits = scanRoots(SOURCE_ROOTS, SOURCE_EXTENSIONS);
const hits = [...outputHits, ...sourceHits];

if (hits.length) {
  console.error("Build check failed: 'TODO' found in app output or src:");
  for (const path of hits.slice(0, 25)) {
    console.error(`  - ${path}`);
  }
  if (hits.length > 25) {
    console.error(`  ... and ${hits.length - 25} more`);
  }
  process.exit(1);
}

console.log("Build check passed: no TODO in rendered app output or src.");
