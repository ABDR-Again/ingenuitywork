/**
 * Fix malformed HTML from the batch conversion.
 * Issues: 
 * 1. Buttons converted to <a> but closing tag stayed </button> (and vice versa)
 * 2. Some buttons got double class attributes
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
    if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
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
  let modified = false;

  // Fix 1: <a ...>text</button> → <a ...>text</a>
  const fix1 = html.replace(/<a\s([^>]+)>([\s\S]*?)<\/button>/g, (m, attrs, inner) => {
    modified = true;
    totalFixes++;
    console.log(`[FIX1] <a>...</button> → <a>...</a> in: ${relPath}`);
    return `<a ${attrs}>${inner}</a>`;
  });
  html = fix1;

  // Fix 2: <button ...>text</a> → keep as <a> since intent was to convert
  const fix2 = html.replace(/<button\s([^>]+)>([\s\S]*?)<\/a>/g, (m, attrs, inner) => {
    // Check if this was a "View Portfolio" or "View Case Study" etc conversion
    const textClean = inner.replace(/<[^>]*>/g, '').trim();
    const linkTexts = ['View Portfolio', 'View Case Study', 'View Case Studies', 'Contact via Email', 'Chat on WhatsApp'];
    if (linkTexts.some(t => textClean.includes(t))) {
      modified = true;
      totalFixes++;
      console.log(`[FIX2] <button>...${textClean}...</a> → <a>...</a> in: ${relPath}`);
      // Extract href if present in attrs or infer
      let href = '/case-studies/';
      if (textClean.includes('Contact via Email')) href = '/contact.html';
      if (textClean.includes('WhatsApp')) href = 'https://wa.me/923139313848';
      return `<a href="${href}" ${attrs} class="no-underline">${inner}</a>`;
    }
    return m;
  });
  html = fix2;

  // Fix 3: Double class attributes — class="..." class="..."
  html = html.replace(/class="([^"]*?)"\s+class="([^"]*?)"/g, (m, c1, c2) => {
    modified = true;
    totalFixes++;
    console.log(`[FIX3] Merged double class attributes in: ${relPath}`);
    // Deduplicate classes
    const classes = [...new Set([...c1.split(/\s+/), ...c2.split(/\s+/)].filter(Boolean))];
    return `class="${classes.join(' ')}"`;
  });

  // Fix 4: Ensure "Start Your Project" type buttons that got converted to <a> tags
  // pointing to WhatsApp are restored to <button> with modal-trigger
  html = html.replace(/<a\s+href="https:\/\/wa\.me\/\d+"[^>]*modal-trigger[^>]*>([\s\S]*?)<\/a>/g, (m, inner) => {
    const textClean = inner.replace(/<[^>]*>/g, '').trim();
    // These CTA buttons should NOT link to WhatsApp - they should open modal
    if (['Start Your Project', 'Start Ranking Higher', 'Launch My Ads', 'Get Started', 'Book Free Consultation'].some(t => textClean.includes(t))) {
      modified = true;
      totalFixes++;
      console.log(`[FIX4] Restored "${textClean}" from <a wa.me> to <button modal-trigger> in: ${relPath}`);
      return `<button class="flex items-center justify-center rounded-lg h-12 px-8 bg-primary dark:bg-white text-white dark:text-primary text-base font-bold transition-transform hover:-translate-y-0.5 shadow-lg modal-trigger">${inner}</button>`;
    }
    return m;
  });

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf-8');
  }
}

console.log(`\nTotal fixes applied: ${totalFixes}`);
