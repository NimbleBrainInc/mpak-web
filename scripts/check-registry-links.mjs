#!/usr/bin/env node
/**
 * Fail if the build links to a path this site does not serve.
 *
 * The registry lives on its own host, so a link written as though this site
 * served it — `/bundles/`, or `https://mpak.dev/bundles/` — resolves here and
 * 404s. That looked correct for as long as one origin served both, which is why
 * it needs a check rather than a convention: the failure appears all at once, at
 * cutover, on pages nobody thought to re-read.
 *
 * Stated as a resolution rule rather than a list of bad shapes. A denylist can
 * only refuse what someone thought to enumerate, and the first version of this
 * script proved the point — it passed a build containing three broken links
 * because they arrived in an `action=` attribute and a JSON-LD string rather
 * than the `href=` it knew about. Asking "does this resolve?" has nothing to
 * keep current.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;
const SELF_ORIGIN = 'https://mpak.dev';

// Files that can carry links. llms.txt is markdown addressed to crawlers, and
// carried a broken link the HTML-only pass never looked at.
const LINKABLE = /\.(html|txt|xml|json)$/;

// Attributes that name a location, plus anything written against this origin
// in body text or a serialized string.
const ROOT_RELATIVE = /(?:href|action|src)="(\/[^"]*)"/g;
const SELF_ABSOLUTE = new RegExp(`${SELF_ORIGIN}(/[^"'\\s)<>\\]]*)`, 'g');

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (LINKABLE.test(entry.name)) yield path;
  }
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

/** A path resolves if the build serves it as a file or as a directory index. */
async function resolves(pathname) {
  const clean = decodeURIComponent(pathname.split(/[?#]/)[0]);
  if (clean === '/') return exists(join(DIST, 'index.html'));
  const target = join(DIST, clean);
  if (await exists(target)) return true;
  if (await exists(join(target, 'index.html'))) return true;
  // `/404/` is emitted as 404.html rather than a directory.
  return exists(`${target.replace(/\/$/, '')}.html`);
}

const broken = [];
for await (const file of files(DIST)) {
  const text = await readFile(file, 'utf8');
  const found = new Set();
  for (const re of [ROOT_RELATIVE, SELF_ABSOLUTE]) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) found.add(m[1]);
  }
  for (const pathname of found) {
    if (!(await resolves(pathname))) {
      broken.push({ file: file.slice(DIST.length + 1), pathname });
    }
  }
}

if (broken.length > 0) {
  console.error('Links to paths this site does not serve:\n');
  for (const b of broken) console.error(`  ${b.file}: ${b.pathname}`);
  console.error(
    '\nRegistry routes belong on siteConfig.registryUrl — these 404 once mpak.dev is Pages.',
  );
  process.exit(1);
}

console.log('Every internal link resolves to a file in dist/.');
