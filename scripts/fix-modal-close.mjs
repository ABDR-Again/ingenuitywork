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
let count = 0;
for (const f of files) {
  let html = fs.readFileSync(f, 'utf-8');
  const orig = html;
  
  // Fix modal close button: <button class="modal-close ..."><span>close</span></a>
  // The </a> should be </button>
  html = html.replace(
    /(<button\s+class="modal-close[^"]*"[^>]*>\s*<span[^>]*>close<\/span>\s*)<\/a>/g,
    '$1</button>'
  );
  
  if (html !== orig) {
    fs.writeFileSync(f, html, 'utf-8');
    count++;
    console.log(`Fixed modal-close in: ${path.relative(ROOT, f)}`);
  }
}
console.log(`\nTotal: ${count} files fixed`);
