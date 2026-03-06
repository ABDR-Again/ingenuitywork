/**
 * Replace all inline consultation modal HTML with <site-modal> component.
 * 1. Remove everything between <!-- Consultation Modal --> and <!-- /Consultation Modal -->
 * 2. Add <site-modal></site-modal> tag before </body>
 * 3. Add <script src="/src/components/site-modal.js" type="module"></script> before </body>
 *
 * Run: node scripts/add-modal-component.mjs
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
    if (entry === 'node_modules' || entry === '.gemini' || entry === 'dist' || entry === 'scripts') continue;
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (entry.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtml = walk(ROOT);
let totalFixed = 0;

for (const filePath of allHtml) {
  let html = readFileSync(filePath, 'utf-8');
  const original = html;

  // ─── Step 1: Remove inline modal HTML ───
  // Match from "<!-- Consultation Modal" to "<!-- /Consultation Modal -->" (inclusive, with surrounding whitespace)
  html = html.replace(/\s*<!-- Consultation Modal[^]*?<!-- \/Consultation Modal -->\s*/g, '\n');

  // Also catch variations without the comment markers but with the modal div
  // Remove any remaining <div id="consultation-modal"...>...</div> blocks
  // We'll do this carefully with a regex that matches the whole modal block
  html = html.replace(/\s*<div id="consultation-modal"[^]*?<\/div>\s*<\/div>\s*<\/div>\s*/g, '\n');

  // ─── Step 2: Add <site-modal> tag if not present ───
  if (!html.includes('<site-modal>')) {
    // Add before </body> or before the last script tags
    html = html.replace(
      /(<script[^>]*site-footer\.js[^>]*><\/script>)/,
      '$1\n<script src="/src/components/site-modal.js" type="module"></script>\n<site-modal></site-modal>'
    );
    
    // If that didn't work (no site-footer script found), try before </body>
    if (!html.includes('<site-modal>')) {
      html = html.replace(
        '</body>',
        '<script src="/src/components/site-modal.js" type="module"></script>\n<site-modal></site-modal>\n</body>'
      );
    }
  }

  // ─── Step 3: Add site-modal.js script if not present ───
  if (!html.includes('site-modal.js')) {
    html = html.replace(
      '<site-modal>',
      '<script src="/src/components/site-modal.js" type="module"></script>\n<site-modal>'
    );
  }

  if (html !== original) {
    writeFileSync(filePath, html, 'utf-8');
    const rel = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    console.log(`  ✓ Updated: ${rel}`);
    totalFixed++;
  } else {
    const rel = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    console.log(`  · No changes: ${rel}`);
  }
}

console.log(`\nDone! Updated ${totalFixed} of ${allHtml.length} files.`);
