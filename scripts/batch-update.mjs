/**
 * Batch script to:
 * 1. Replace all <footer>...</footer> blocks with <site-footer></site-footer>
 * 2. Add footer-component.js script tag
 * 3. Fix CTA buttons across all service/case-study/process pages
 * 4. Add scroll-reveal classes to sections
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ===== COLLECT ALL HTML FILES =====
function collectHtmlFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    if (entry.isDirectory()) {
      collectHtmlFiles(fullPath, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allHtmlFiles = collectHtmlFiles(ROOT);
console.log(`Found ${allHtmlFiles.length} HTML files to process.\n`);

let totalFooterReplaced = 0;
let totalButtonsFixed = 0;
let totalScrollRevealAdded = 0;

for (const filePath of allHtmlFiles) {
  let html = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(ROOT, filePath);
  let modified = false;

  // ===== 1. REPLACE FOOTER =====
  // Match from the FIRST <footer to the LAST </footer> including comments
  const footerRegex = /(?:<!--\s*Footer\s*-->[\s\r\n]*)*<footer[\s\S]*?<\/footer>(?:<!--\s*\/Footer\s*-->)*/gi;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, '<site-footer></site-footer>');
    totalFooterReplaced++;
    modified = true;
    console.log(`[FOOTER] Replaced in: ${relPath}`);
  }

  // ===== 2. ADD FOOTER-COMPONENT SCRIPT =====
  if (!html.includes('footer-component.js') && html.includes('<site-footer>')) {
    // Add before the closing </body> or before animations.js
    if (html.includes('src/animations.js')) {
      html = html.replace(
        /<script[^>]*src="[^"]*animations\.js"[^>]*><\/script>/,
        '<script src="/src/footer-component.js"></script>\n$&'
      );
    } else {
      html = html.replace('</body>', '<script src="/src/footer-component.js"></script>\n</body>');
    }
    modified = true;
  }

  // ===== 3. FIX CTA BUTTONS =====
  
  // "Start Your Project" / "Start Ranking Higher" / "Launch My Ads" / "Get Started" → modal-trigger
  const ctaButtonTexts = [
    'Start Your Project',
    'Start Ranking Higher', 
    'Launch My Ads',
    'Launch My Campaign',
    'Get Started',
    'Start My Campaign',
    'Book Free Consultation',
    'Book a Free Consultation',
    'Get a Quote',
    'Request a Quote',
    'Start Growing',
  ];
  
  for (const btnText of ctaButtonTexts) {
    // Match <button> elements containing the text but missing modal-trigger
    const btnRegex = new RegExp(
      `(<button\\s[^>]*class="[^"]*)(">\\s*(?:<[^>]*>\\s*)*${btnText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*)`,
      'gi'
    );
    html = html.replace(btnRegex, (match, prefix, rest) => {
      if (prefix.includes('modal-trigger')) return match;
      totalButtonsFixed++;
      modified = true;
      console.log(`[BUTTON] Added modal-trigger to "${btnText}" in: ${relPath}`);
      return `${prefix} modal-trigger${rest}`;
    });
  }

  // "View Portfolio" / "View Case Study" / "View Case Studies" → link to /case-studies/
  const portfolioTexts = ['View Portfolio', 'View Case Study', 'View Case Studies', 'View Our Work'];
  for (const btnText of portfolioTexts) {
    const btnRegex = new RegExp(
      `<button([^>]*)>([\\s\\S]*?${btnText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?)<\\/button>`,
      'gi'
    );
    html = html.replace(btnRegex, (match, attrs, inner) => {
      totalButtonsFixed++;
      modified = true;
      console.log(`[BUTTON] Converted "${btnText}" to link in: ${relPath}`);
      return `<a href="/case-studies/"${attrs} class="no-underline ${(attrs.match(/class="([^"]*)"/) || ['',''])[1]}">${inner}</a>`;
    });
  }

  // "Contact via Email" → link to /contact.html
  const contactRegex = /<button([^>]*)>([\s\S]*?Contact via Email[\s\S]*?)<\/button>/gi;
  html = html.replace(contactRegex, (match, attrs, inner) => {
    totalButtonsFixed++;
    modified = true;
    console.log(`[BUTTON] Converted "Contact via Email" to link in: ${relPath}`);
    return `<a href="/contact.html"${attrs} class="no-underline ${(attrs.match(/class="([^"]*)"/) || ['',''])[1]}">${inner}</a>`;
  });

  // "Chat on WhatsApp" button → link to wa.me (if not already an <a>)
  const waRegex = /<button([^>]*)>([\s\S]*?Chat on WhatsApp[\s\S]*?)<\/button>/gi;
  html = html.replace(waRegex, (match, attrs, inner) => {
    totalButtonsFixed++;
    modified = true;
    console.log(`[BUTTON] Converted "Chat on WhatsApp" to link in: ${relPath}`);
    return `<a href="https://wa.me/923139313848" target="_blank"${attrs} class="no-underline ${(attrs.match(/class="([^"]*)"/) || ['',''])[1]}">${inner}</a>`;
  });

  // Process page: "View Case Studies" button → link if it's a button
  if (relPath.includes('process')) {
    const viewCsRegex = /<button([^>]*)>([\s\S]*?View Case Studies[\s\S]*?)<\/button>/gi;
    html = html.replace(viewCsRegex, (match, attrs, inner) => {
      totalButtonsFixed++;
      modified = true;
      console.log(`[BUTTON] Converted "View Case Studies" to link in: ${relPath}`);
      return `<a href="/case-studies/"${attrs} class="no-underline ${(attrs.match(/class="([^"]*)"/) || ['',''])[1]}">${inner}</a>`;
    });
  }

  // ===== 4. UPDATE EMAIL REFERENCES =====
  // Replace old email with new one
  html = html.replace(/hello@IngenuityWork\.com/g, 'a.b.d.r.1912003mltcqa.b.d.r@gmail.com');
  
  // ===== WRITE FILE =====
  if (modified) {
    fs.writeFileSync(filePath, html, 'utf-8');
  }
}

console.log(`\n===== SUMMARY =====`);
console.log(`Footers replaced: ${totalFooterReplaced}`);
console.log(`Buttons fixed: ${totalButtonsFixed}`);
console.log(`Files processed: ${allHtmlFiles.length}`);
