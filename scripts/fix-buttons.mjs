/**
 * Fix all buttons across the entire site.
 * - CTA buttons with "Book Consultation", "Get Free Consultation", "Start Your Project",
 *   "Start Ranking", "Start a Project", "Get Started" → add modal-trigger class
 * - "View Services" → /services/
 * - "View Portfolio", "View Case Studies", "View Case Study" → /case-studies/
 * - "Contact via Email" → /contact.html
 * - "Start Conversation" → /contact.html
 * - "Chat on WhatsApp" → https://wa.me/923139313848
 * 
 * Also fixes <button> tags that should be <a> tags when linking to pages.
 *
 * Run: node scripts/fix-buttons.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

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

let totalFixed = 0;

for (const rel of files) {
  const filePath = resolve(ROOT, rel);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch {
    continue;
  }

  const original = html;
  let fixes = [];

  // ──────────────────────────────────────────────────
  // 1. Fix buttons that should open the popup form
  //    Pattern: <button ...>TEXT</button> or <button ...>TEXT</a>
  //    that contain trigger words but DON'T have modal-trigger class
  // ──────────────────────────────────────────────────
  const popupTriggerWords = [
    'Book Consultation',
    'Book Free Consultation',
    'Get Free Consultation',
    'Start Your Project',
    'Start Ranking',
    'Start a Project',
    'Get Started after Step 2',
    'Get started after Step 2',
    'Start Conversation',
    'Get in Touch',
    'Let\'s Talk',
  ];

  // Add modal-trigger to buttons that contain popup trigger words
  for (const word of popupTriggerWords) {
    // Match <button> or <a> tags containing the trigger word but missing modal-trigger
    const regex = new RegExp(
      `(<(?:button|a)\\s[^>]*?)(?<!modal-trigger\\s)(?<!modal-trigger\\b)(class="[^"]*"[^>]*>)([\\s\\S]*?${escapeRegex(word)}[\\s\\S]*?<\\/(?:button|a)>)`,
      'gi'
    );
    // Simpler approach: find elements containing the word and ensure they have modal-trigger
    html = addModalTriggerToButtons(html, word);
  }

  // ──────────────────────────────────────────────────
  // 2. Fix "View Services" button → link to /services/
  // ──────────────────────────────────────────────────
  // Match buttons containing "View Services" that aren't already links
  html = html.replace(
    /(<button\s[^>]*>)([\s\S]*?View Services[\s\S]*?)<\/(?:button|a)>/gi,
    (match, tag, content) => {
      const classes = extractClasses(tag);
      return `<a href="/services/" class="${classes} no-underline">${content}</a>`;
    }
  );

  // ──────────────────────────────────────────────────
  // 3. Fix "View Portfolio" / "View Case Studies" / "View Work" → /case-studies/
  // ──────────────────────────────────────────────────
  html = fixLinkButton(html, 'View Portfolio', '/case-studies/');
  html = fixLinkButton(html, 'View Case Studies', '/case-studies/');
  html = fixLinkButton(html, 'View Work', '/portfolio/index.html');

  // ──────────────────────────────────────────────────
  // 4. Fix "Contact via Email" → /contact.html
  // ──────────────────────────────────────────────────
  html = fixLinkButton(html, 'Contact via Email', '/contact.html');

  // ──────────────────────────────────────────────────
  // 5. Fix "Start Conversation" → /contact.html
  // ──────────────────────────────────────────────────
  // The Start Conversation button on homepage is a <button> that should link to contact
  html = html.replace(
    /(<button\s[^>]*>)([\s\S]*?Start Conversation[\s\S]*?)<\/(?:button|a)>/gi,
    (match, tag, content) => {
      const classes = extractClasses(tag);
      return `<a href="/contact.html" class="${classes} no-underline">${content}</a>`;
    }
  );

  // ──────────────────────────────────────────────────
  // 6. Fix "Chat on WhatsApp" buttons → wa.me link
  // ──────────────────────────────────────────────────
  html = html.replace(
    /(<button\s[^>]*>)([\s\S]*?Chat on WhatsApp[\s\S]*?)<\/(?:button|a)>/gi,
    (match, tag, content) => {
      const classes = extractClasses(tag);
      return `<a href="https://wa.me/923139313848" target="_blank" class="${classes} no-underline whatsapp-link">${content}</a>`;
    }
  );

  // ──────────────────────────────────────────────────
  // 7. Fix "Get Free Consultation" on listing pages (should open popup)
  // ──────────────────────────────────────────────────
  html = addModalTriggerToButtons(html, 'Get Free Consultation');
  html = addModalTriggerToButtons(html, 'Book Free Consultation');
  html = addModalTriggerToButtons(html, 'Book Consultation');

  // ──────────────────────────────────────────────────
  // 8. Remove malformed </a> after </button> tags
  // ──────────────────────────────────────────────────
  html = html.replace(/<\/button>\s*<\/a>/g, '</button>');

  // Fix <button ...>...</a> patterns (should be </button>)
  html = html.replace(/(<button\b[^>]*>[\s\S]*?)<\/a>/g, '$1</button>');

  if (html !== original) {
    writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ Fixed: ${rel}`);
    totalFixed++;
  } else {
    console.log(`  · No changes: ${rel}`);
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);


/* ── Helper Functions ── */

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractClasses(tag) {
  const match = tag.match(/class="([^"]*)"/);
  return match ? match[1] : '';
}

function addModalTriggerToButtons(html, word) {
  // Find <button> or non-linked <a> tags containing the word 
  // and ensure modal-trigger is in the class
  const escapedWord = escapeRegex(word);
  
  // Pattern: <button class="..." >...word...</button> without modal-trigger in class
  html = html.replace(
    new RegExp(`(<button\\s+)([^>]*class=")([^"]*)(")([^>]*>)([\\s\\S]*?${escapedWord}[\\s\\S]*?)(<\\/(?:button|a)>)`, 'gi'),
    (match, pre, classStart, classes, classEnd, rest, content, close) => {
      if (classes.includes('modal-trigger')) return match;
      if (classes.includes('modal-close')) return match;
      if (classes.includes('modal-back')) return match;
      return `${pre}${classStart}${classes} modal-trigger${classEnd}${rest}${content}</button>`;
    }
  );

  // Also handle <a> tags with href="#" containing the word
  html = html.replace(
    new RegExp(`(<a\\s+)([^>]*href="#"[^>]*class=")([^"]*)(")([^>]*>)([\\s\\S]*?${escapedWord}[\\s\\S]*?)(<\\/a>)`, 'gi'),
    (match, pre, classStart, classes, classEnd, rest, content, close) => {
      if (classes.includes('modal-trigger')) return match;
      return `${pre}${classStart}${classes} modal-trigger${classEnd}${rest}${content}${close}`;
    }
  );

  return html;
}

function fixLinkButton(html, text, href) {
  const escaped = escapeRegex(text);
  // Fix <button>...text...</button> → <a href="...">...text...</a>
  html = html.replace(
    new RegExp(`(<button\\s[^>]*>)([\\s\\S]*?${escaped}[\\s\\S]*?)<\\/(?:button|a)>`, 'gi'),
    (match, tag, content) => {
      // Don't convert if already correct or if it has modal-trigger
      if (tag.includes('modal-trigger')) return match;
      const classes = extractClasses(tag);
      return `<a href="${href}" class="${classes} no-underline">${content}</a>`;
    }
  );
  return html;
}
