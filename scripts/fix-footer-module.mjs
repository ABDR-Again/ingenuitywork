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
    if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) collectHtmlFiles(fullPath, results);
    else if (entry.name.endsWith('.html')) results.push(fullPath);
  }
  return results;
}

const files = collectHtmlFiles(ROOT);
let count = 0;
for (const f of files) {
  let html = fs.readFileSync(f, 'utf-8');
  const old = '<script src="/src/footer-component.js"></script>';
  const replacement = '<script type="module" src="/src/footer-component.js"></script>';
  if (html.includes(old)) {
    html = html.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    fs.writeFileSync(f, html, 'utf-8');
    count++;
    console.log(`Fixed: ${path.relative(ROOT, f)}`);
  }
}
console.log(`\nTotal files fixed: ${count}`);
