/**
 * Add modal import to all page animation files.
 * Run: node scripts/add-modal-import.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ANIM = resolve(__dirname, '..', 'src', 'animations');

const IMPORT_LINE = 'import "../modal.js";\n';
const IMPORT_LINE_NESTED = 'import "../../modal.js";\n';

function walk(dir, base = '') {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      walk(full, rel);
    } else if (entry.endsWith('.js')) {
      const content = readFileSync(full, 'utf-8');
      // Determine depth — files in subdirs need ../../modal.js
      const isNested = rel.includes('/');
      const importLine = isNested ? IMPORT_LINE_NESTED : IMPORT_LINE;
      
      if (content.includes('modal.js')) {
        console.log(`  · Already has import: ${rel}`);
        continue;
      }
      
      // Add import at the very top of the file
      const newContent = importLine + content;
      writeFileSync(full, newContent, 'utf-8');
      console.log(`  ✓ Added import: ${rel}`);
    }
  }
}

console.log("Adding modal imports to animation files...\n");
walk(ANIM);
console.log("\nDone!");
