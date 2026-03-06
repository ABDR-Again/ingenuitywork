/**
 * Update HTML pages to load their page-specific animation script
 * instead of the shared /src/animations.js.
 * Homepage keeps /src/animations.js.
 *
 * Run: node scripts/update-animation-scripts.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Map: HTML file → animation script path
const mapping = {
  'about/index.html':                          '/src/animations/about.js',
  'pricing/index.html':                        '/src/animations/pricing.js',
  'process/index.html':                        '/src/animations/process.js',
  'contact.html':                              '/src/animations/contact.js',
  'blog.html':                                 '/src/animations/blog.js',
  'testimonials.html':                         '/src/animations/testimonials.js',
  'portfolio/index.html':                      '/src/animations/portfolio.js',
  'services/index.html':                       '/src/animations/services-index.js',
  'case-studies/index.html':                   '/src/animations/case-studies-index.js',
  'services/web-design/index.html':            '/src/animations/services/web-design.js',
  'services/seo/index.html':                   '/src/animations/services/seo.js',
  'services/google-ads/index.html':            '/src/animations/services/google-ads.js',
  'services/branding/index.html':              '/src/animations/services/branding.js',
  'services/automation/index.html':            '/src/animations/services/automation.js',
  'services/maintenance/index.html':           '/src/animations/services/maintenance.js',
  'services/content-creation/index.html':      '/src/animations/services/content-creation.js',
  'services/graphic-design/index.html':        '/src/animations/services/graphic-design.js',
  'services/meta-ads/index.html':              '/src/animations/services/meta-ads.js',
  'services/social-media/index.html':          '/src/animations/services/social-media.js',
  'case-studies/luxewear-redesign/index.html':     '/src/animations/case-studies/luxewear-redesign.js',
  'case-studies/healthfirst-seo/index.html':       '/src/animations/case-studies/healthfirst-seo.js',
  'case-studies/propvault-google-ads/index.html':  '/src/animations/case-studies/propvault-google-ads.js',
  'case-studies/craftbrew-branding/index.html':    '/src/animations/case-studies/craftbrew-branding.js',
  'case-studies/finedge-automation/index.html':    '/src/animations/case-studies/finedge-automation.js',
  'case-studies/travelnest-maintenance/index.html': '/src/animations/case-studies/travelnest-maintenance.js',
  'case-studies/eduspark-content/index.html':      '/src/animations/case-studies/eduspark-content.js',
  'case-studies/fitpulse-design/index.html':       '/src/animations/case-studies/fitpulse-design.js',
  'case-studies/glowskin-meta-ads/index.html':     '/src/animations/case-studies/glowskin-meta-ads.js',
  'case-studies/petpals-social/index.html':        '/src/animations/case-studies/petpals-social.js',
};

let updated = 0;
let skipped = 0;

for (const [htmlRel, animPath] of Object.entries(mapping)) {
  const filePath = resolve(ROOT, htmlRel);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch {
    console.log(`  SKIP (not found): ${htmlRel}`);
    skipped++;
    continue;
  }

  // Replace the old animations.js reference with the page-specific one
  const oldTag = '<script type="module" src="/src/animations.js"></script>';
  if (html.includes(oldTag)) {
    html = html.replace(oldTag, `<script type="module" src="${animPath}"></script>`);
    writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ ${htmlRel} → ${animPath}`);
    updated++;
  } else {
    // Try alternate format
    const altTag = `<script src="/src/animations.js" type="module"></script>`;
    if (html.includes(altTag)) {
      html = html.replace(altTag, `<script type="module" src="${animPath}"></script>`);
      writeFileSync(filePath, html, 'utf-8');
      console.log(`  ✓ ${htmlRel} → ${animPath}`);
      updated++;
    } else {
      console.log(`  SKIP (no animations.js tag found): ${htmlRel}`);
      skipped++;
    }
  }
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
