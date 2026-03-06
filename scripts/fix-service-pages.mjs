/**
 * Fix all 10 service page HTML files:
 * 1. Fix mismatched <a>...</button> and <button>...</a> tags
 * 2. Make primary hero button open popup (pure <button> + modal-trigger, no href)
 * 3. Make secondary hero button link to /case-studies/
 * 4. Fix "Book Free Consultation" / "Consult on WhatsApp" buttons to be modal-trigger
 * 5. Fix WhatsApp CTA section buttons  
 * 6. Ensure CTA section above footer exists with consultation form + WhatsApp buttons
 *
 * Run: node scripts/fix-service-pages.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const servicePages = [
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
];

let totalFixed = 0;

for (const rel of servicePages) {
  const filePath = resolve(ROOT, rel);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch {
    console.log(`  ⚠ File not found: ${rel}`);
    continue;
  }
  const original = html;

  // ─── Fix 1: Close mismatched tags ───
  // Fix <a ...>...</button>  →  <a ...>...</a>
  html = html.replace(/<a(\s[^>]*)>([\s\S]*?)<\/button>/g, (match, attrs, content) => {
    // Only fix if it's not a modal close button or other nested scenario
    if (attrs.includes('modal-close')) return match;
    return `<a${attrs}>${content}</a>`;
  });

  // Fix <button ...>...</a>  →  <button ...>...</button>
  html = html.replace(/<button(\s[^>]*)>([\s\S]*?)<\/a>/g, (match, attrs, content) => {
    return `<button${attrs}>${content}</button>`;
  });

  // ─── Fix 2: Hero primary button → pure <button> with modal-trigger ───
  // Find buttons/links containing "Start Your Project", "Start Ranking", "Start Your Brand",
  // "Get Started", "Launch Your", etc. in the hero area and make them modal triggers
  const primaryHeroTexts = [
    'Start Your Project',
    'Start Ranking Higher',
    'Start Your Brand',
    'Get Started',
    'Launch Your',
    'Automate Your',
    'Start Your Campaign',
    'Start Growing',
    'Start Creating',
    'Boost Your',
    'Elevate Your',
    'Scale Your',
    'Transform Your',
    'Accelerate Your',
  ];

  for (const text of primaryHeroTexts) {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Fix <a href="..." class="...modal-trigger...">...text...</a> → <button class="...modal-trigger...">...text...</button>
    html = html.replace(
      new RegExp(`<a\\s+(href="[^"]*"\\s+)?([^>]*?)>(\\s*${escaped}[\\s\\S]*?)<\\/a>`, 'gi'),
      (match, href, attrs, content) => {
        // If in hero section (first occurrence usually), convert to button
        // Remove href from attrs if present
        let cleanAttrs = attrs.replace(/href="[^"]*"\s*/g, '');
        if (!cleanAttrs.includes('modal-trigger')) {
          cleanAttrs = cleanAttrs.replace(/class="/, 'class="modal-trigger ');
        }
        // Remove no-underline and whatsapp-link from classes
        cleanAttrs = cleanAttrs.replace(/\s*no-underline\s*/g, ' ');
        cleanAttrs = cleanAttrs.replace(/\s*whatsapp-link\s*/g, ' ');
        return `<button ${cleanAttrs}>${content}</button>`;
      }
    );
	
	// Also fix already-button cases that might have wrong attributes
    html = html.replace(
      new RegExp(`<a\\s+href="[^"]*"\\s+([^>]*class="[^"]*modal-trigger[^"]*"[^>]*)>(\\s*${escaped}[\\s\\S]*?)<\\/(?:a|button)>`, 'gi'),
      (match, attrs, content) => {
        let cleanAttrs = attrs.replace(/\s*no-underline\s*/g, ' ').replace(/\s*whatsapp-link\s*/g, ' ');
        return `<button ${cleanAttrs}>${content}</button>`;
      }
    );
  }

  // ─── Fix 3: "View Portfolio" / "View Case Studies" → link to /case-studies/ ───
  const viewTexts = ['View Portfolio', 'View Case Studies', 'View Our Work', 'See Our Work'];
  for (const text of viewTexts) {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Fix dead <button>...text...</button> → <a href="/case-studies/">...text...</a>
    html = html.replace(
      new RegExp(`<button\\s+([^>]*)>(\\s*${escaped}\\s*)<\\/button>`, 'gi'),
      (match, attrs, content) => {
        // Keep original classes but add href
        return `<a href="/case-studies/" ${attrs} style="text-decoration:none">${content}</a>`;
      }
    );
  }

  // ─── Fix 4: "Contact via Email" → link to /contact.html ───
  html = html.replace(
    /<button\s+([^>]*)>(\s*Contact via Email\s*)<\/button>/gi,
    (match, attrs, content) => `<a href="/contact.html" ${attrs} style="text-decoration:none">${content}</a>`
  );

  // ─── Fix 5: "Book Free Consultation" in pricing cards → modal-trigger ───
  // These are <a href="whatsapp_link">Book Free Consultation</a> that should be modal-trigger buttons
  html = html.replace(
    /<a\s+href="https:\/\/wa\.me\/[^"]*"\s+([^>]*)>(\s*(?:<span[^>]*>[^<]*<\/span>\s*)?Book Free Consultation\s*)<\/a>/gi,
    (match, attrs, content) => {
      let cleanAttrs = attrs.replace(/\s*no-underline\s*/g, ' ').replace(/\s*whatsapp-link\s*/g, ' ');
      if (!cleanAttrs.includes('modal-trigger')) {
        cleanAttrs = cleanAttrs.replace(/class="/, 'class="modal-trigger ');
      }
      return `<button ${cleanAttrs}>${content}</button>`;
    }
  );

  // ─── Fix 6: "Consult on WhatsApp" dead buttons → modal-trigger ───
  html = html.replace(
    /<button\s+([^>]*)>(\s*Consult on WhatsApp\s*)<\/button>/gi,
    (match, attrs, content) => {
      if (!attrs.includes('modal-trigger')) {
        attrs = attrs.replace(/class="/, 'class="modal-trigger ');
      }
      return `<button ${attrs}>${content}</button>`;
    }
  );

  // ─── Fix 7: "Chat on WhatsApp" dead buttons → modal-trigger ───  
  html = html.replace(
    /<button\s+([^>]*)>(\s*(?:<span[^>]*>[^<]*<\/span>\s*)?Chat on WhatsApp\s*)<\/button>/gi,
    (match, attrs, content) => {
      if (!attrs.includes('modal-trigger')) {
        attrs = attrs.replace(/class="/, 'class="modal-trigger ');
      }
      return `<button ${attrs}>${content}</button>`;
    }
  );

  if (html !== original) {
    writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ Fixed: ${rel}`);
    totalFixed++;
  } else {
    console.log(`  · No changes: ${rel}`);
  }
}

console.log(`\nDone! Fixed ${totalFixed} of ${servicePages.length} service pages.`);
