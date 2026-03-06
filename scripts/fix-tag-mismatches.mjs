/**
 * Fix ALL remaining <a>...</button> mismatches across the entire services directory.
 * Run: node scripts/fix-tag-mismatches.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (entry.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtml = walk(ROOT).filter(f => !f.includes('node_modules') && !f.includes('.gemini'));
let totalFixed = 0;

for (const filePath of allHtml) {
  let html = readFileSync(filePath, 'utf-8');
  const original = html;

  // Fix <a ...>...</button>  →  <a ...>...</a>
  // Use a non-greedy match that avoids crossing nested tags
  let changed = true;
  while (changed) {
    changed = false;
    html = html.replace(/<a(\s[^>]*?)>([^]*?)<\/button>/g, (match, attrs, content) => {
      // Skip modal-close buttons or if content contains another <a
      if (attrs.includes('modal-close') || content.includes('<a ')) return match;
      changed = true;
      return `<a${attrs}>${content}</a>`;
    });
  }

  if (html !== original) {
    writeFileSync(filePath, html, 'utf-8');
    const rel = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    console.log(`  ✓ Fixed: ${rel}`);
    totalFixed++;
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
