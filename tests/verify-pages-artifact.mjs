import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = await readFile(path.join(root, 'index.html'), 'utf8');
const pages = [...index.matchAll(/'([^']+\.html)\?embed=1'/g)].map((match) => match[1]);

assert.equal(pages.length, 5, 'index.html must reference five BSI subpages');
for (const page of pages) {
  await access(path.join(root, page));
}

console.log(`Verified ${pages.length} BSI subpages are published beside index.html.`);
