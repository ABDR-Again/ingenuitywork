/**
 * Batch script to replace inline header/footer HTML with web components
 * across all HTML pages in the project.
 * 
 * Run: node scripts/apply-components.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Hard-code the known list of HTML files from the project
const files = [
  'index.html',
  'about/index.html',
  'pricing/index.html',
  'process/index.html',
  'portfolio/index.html',
  'services/index.html',
  'services/web-design/index.html',
  'services/seo/index.html',
  'services/google-ads/index.html',
  'services/branding/index.html',
  'services/automation/index.html',
  'services/maintenance/index.html',
  'services/content-creation/index.html',
  'services/graphic-design/index.html',
  'services/meta-ads/index.html',
  'services/social-media/index.html',
  'case-studies/index.html',
  'case-studies/luxewear-redesign/index.html',
  'case-studies/healthfirst-seo/index.html',
  'case-studies/propvault-google-ads/index.html',
  'case-studies/craftbrew-branding/index.html',
  'case-studies/finedge-automation/index.html',
  'case-studies/travelnest-maintenance/index.html',
  'case-studies/eduspark-content/index.html',
  'case-studies/fitpulse-design/index.html',
  'case-studies/glowskin-meta-ads/index.html',
  'case-studies/petpals-social/index.html',
  'blog.html',
  'contact.html',
  'testimonials.html',
];

let updated = 0;
let skipped = 0;

for (const rel of files) {
  const filePath = resolve(ROOT, rel);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch {
    console.log(`  SKIP (not found): ${rel}`);
    skipped++;
    continue;
  }

  // Already converted?
  if (html.includes('<site-header>') || html.includes('<site-footer>')) {
    console.log(`  SKIP (already converted): ${rel}`);
    skipped++;
    continue;
  }

  let changed = false;

  // ── Replace HEADER ──
  // Match from the first <!-- Sticky Header --> or <!-- Header --> or <!-- TopNavBar --> comment
  // all the way through </header> and any trailing <!-- /Sticky Header --> comments
  const headerRegex = /(?:<!--\s*(?:Sticky Header|Header|TopNavBar)\s*-->\s*\n?)*<header[\s\S]*?<\/header>\s*\n?(?:<!--\s*\/(?:Sticky Header|Header)\s*-->\s*\n?)*/;
  if (headerRegex.test(html)) {
    html = html.replace(headerRegex, '<site-header></site-header>\n');
    changed = true;
  }

  // ── Replace FOOTER ──
  // Match from <!-- Footer --> comments through </footer> and trailing <!-- /Footer --> comments
  const footerRegex = /(?:<!--\s*(?:Minimal )?Footer\s*-->\s*\n?)*<footer[\s\S]*?<\/footer>(?:<!--\s*\/Footer\s*-->)*/;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, '<site-footer></site-footer>');
    changed = true;
  }

  // ── Add component script imports (before </body> if not already present) ──
  if (!html.includes('site-header.js')) {
    html = html.replace(
      '</body>',
      '<script src="/src/components/site-header.js" type="module"></script>\n<script src="/src/components/site-footer.js" type="module"></script>\n</body>'
    );
    changed = true;
  }

  if (changed) {
    writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ Updated: ${rel}`);
    updated++;
  } else {
    console.log(`  SKIP (no header/footer found): ${rel}`);
    skipped++;
  }
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
