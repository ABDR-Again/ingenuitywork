/**
 * Final revert: Fix all remaining mismatched <button>...</a> and <a>...</button> tags.
 * Restore buttons to their original <button> form.
 * Also restore any <a> tags that should be <button> tags back.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function collectHtmlFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (['node_modules', 'dist', '.git', 'scripts'].includes(entry.name)) continue;
    if (entry.isDirectory()) collectHtmlFiles(fullPath, results);
    else if (entry.name.endsWith('.html')) results.push(fullPath);
  }
  return results;
}

const files = collectHtmlFiles(ROOT);
let totalFixes = 0;

for (const filePath of files) {
  let html = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(ROOT, filePath);
  const original = html;

  // Fix <button ...>...</a> → <button ...>...</button>
  html = html.replace(/<button\s([^>]+)>([\s\S]*?)<\/a>/g, (m, attrs, inner) => {
    totalFixes++;
    console.log(`[FIX] <button>...</a> → <button>...</button> in: ${relPath}`);
    return `<button ${attrs}>${inner}</button>`;
  });

  // Fix <a ...>...</button> → <a ...>...</a>
  html = html.replace(/<a\s([^>]+)>([\s\S]*?)<\/button>/g, (m, attrs, inner) => {
    totalFixes++;
    console.log(`[FIX] <a>...</button> → <a>...</a> in: ${relPath}`);
    return `<a ${attrs}>${inner}</a>`;
  });

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
  }
}

console.log(`\nTotal fixes: ${totalFixes}`);
