#!/usr/bin/env node
/**
 * Fail if the build links to a registry route as though this site served it.
 *
 * The registry lives on its own host, so `/bundles/` and `/login/` resolve
 * against this site — which has no such routes — and answer 404. They looked
 * correct for as long as one origin served both, which is exactly why this is a
 * check rather than a convention: the failure only appears at cutover, on every
 * page at once, and the badge snippets keep sending publishers to a dead URL
 * from their own READMEs long after.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;

// Paths the registry owns. Anchored to the quote so `/login/` matches but
// `https://registry.mpak.dev/login/` does not.
const FORBIDDEN = [
  { pattern: /href="\/bundles\/?"/g, what: 'href="/bundles/"' },
  { pattern: /href="\/login\/?"/g, what: 'href="/login/"' },
  { pattern: /href="\/my-packages\/?"/g, what: 'href="/my-packages/"' },
  { pattern: /https:\/\/mpak\.dev\/packages\//g, what: 'https://mpak.dev/packages/' },
];

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const offences = [];
for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  for (const { pattern, what } of FORBIDDEN) {
    const hits = html.match(pattern);
    if (hits) offences.push({ file: file.slice(DIST.length + 1), what, count: hits.length });
  }
}

if (offences.length > 0) {
  console.error('Registry routes linked as if this site served them:\n');
  for (const o of offences) console.error(`  ${o.file}: ${o.what} ×${o.count}`);
  console.error('\nUse siteConfig.registryUrl — these 404 once mpak.dev is GitHub Pages.');
  process.exit(1);
}

console.log('No registry routes linked as local paths.');
