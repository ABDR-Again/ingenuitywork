/**
 * REVERT SCRIPT — Undo all changes from the current session.
 * 1. Replace <site-footer></site-footer> with the original footer HTML
 * 2. Remove footer-component.js script tags
 * 3. Revert email from a.b.d.r.1912003mltcqa.b.d.r@gmail.com back to a.b.d.r.1912003mltcqa.b.d.r@gmail.com
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const ORIGINAL_FOOTER = `<!-- Footer -->
<!-- Footer -->
<!-- Footer -->
<!-- Footer -->
<!-- Footer -->
<footer class="bg-primary text-slate-300 pt-20 pb-10 border-t border-slate-800 mt-auto">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
    
    <!-- Brand -->
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white">
                <span class="material-symbols-outlined text-xl">code</span>
            </div>
            <span class="font-display font-bold text-xl tracking-tight text-white">Ingenuity Work</span>
        </div>
        <p class="text-sm text-slate-400 leading-relaxed max-w-xs">Premium web development and data-driven growth services to take your business to the next level.</p>
        <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary-light hover:bg-white/20 transition-colors"><span class="material-symbols-outlined text-[20px]">link</span></a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary-light hover:bg-white/20 transition-colors"><span class="material-symbols-outlined text-[20px]">share</span></a>
        </div>
    </div>

    <!-- Services -->
    <div class="flex flex-col gap-4">
        <h4 class="text-white font-bold tracking-wider text-sm uppercase mb-2">Services</h4>
        <a href="/services/web-design/" class="text-sm hover:text-white transition-colors w-fit no-underline">Web Design</a>
        <a href="/services/seo/" class="text-sm hover:text-white transition-colors w-fit no-underline">SEO Growth</a>
        <a href="/services/meta-ads/" class="text-sm hover:text-white transition-colors w-fit no-underline">Meta Ads</a>
        <a href="/services/content-creation/" class="text-sm hover:text-white transition-colors w-fit no-underline">Content Creation</a>
        <a href="/services/" class="text-sm hover:text-white transition-colors w-fit font-semibold mt-2 no-underline">View All Services →</a>
    </div>

    <!-- Company -->
    <div class="flex flex-col gap-4">
        <h4 class="text-white font-bold tracking-wider text-sm uppercase mb-2">Company</h4>
        <a href="/about/" class="text-sm hover:text-white transition-colors w-fit no-underline">About Us</a>
        <a href="/case-studies/" class="text-sm hover:text-white transition-colors w-fit no-underline">Case Studies</a>
        <a href="/process/" class="text-sm hover:text-white transition-colors w-fit no-underline">Our Process</a>
        <a href="/pricing/" class="text-sm hover:text-white transition-colors w-fit no-underline">Pricing</a>
    </div>

    <!-- Contact -->
    <div class="flex flex-col gap-4">
        <h4 class="text-white font-bold tracking-wider text-sm uppercase mb-2">Contact</h4>
        <div class="flex items-center gap-3 text-sm">
            <span class="material-symbols-outlined text-[20px] text-slate-500">call</span>
            <a href="https://wa.me/923139313848" class="hover:text-white transition-colors whatsapp-link no-underline">0313 931 3848</a>
        </div>
        <div class="flex items-center gap-3 text-sm">
            <span class="material-symbols-outlined text-[20px] text-slate-500">mail</span>
            <span>a.b.d.r.1912003mltcqa.b.d.r@gmail.com</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
            <span class="material-symbols-outlined text-[20px] text-slate-500">location_on</span>
            <span>Global Remote, Based in PK</span>
        </div>
    </div>
</div>

<div class="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
    <p class="text-sm text-slate-500">&copy; 2024 Ingenuity Work. All rights reserved.</p>
    <div class="flex gap-6">
        <a href="#" class="text-sm text-slate-500 hover:text-white transition-colors no-underline">Privacy Policy</a>
        <a href="#" class="text-sm text-slate-500 hover:text-white transition-colors no-underline">Terms of Service</a>
    </div>
</div>
</div>
</footer><!-- /Footer --><!-- /Footer --><!-- /Footer --><!-- /Footer -->`;

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

for (const filePath of files) {
  let html = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(ROOT, filePath);
  let modified = false;

  // 1. Replace <site-footer></site-footer> with original footer
  if (html.includes('<site-footer></site-footer>')) {
    html = html.replace('<site-footer></site-footer>', ORIGINAL_FOOTER);
    modified = true;
    console.log(`[FOOTER] Restored in: ${relPath}`);
  }

  // 2. Remove footer-component.js script tags
  html = html.replace(/\n?<script[^>]*src="[^"]*footer-component\.js"[^>]*><\/script>\n?/g, '\n');
  
  // 3. Revert email
  html = html.replace(/admin@directprofitrx\.co\.uk/g, 'a.b.d.r.1912003mltcqa.b.d.r@gmail.com');

  if (html !== fs.readFileSync(filePath, 'utf-8')) {
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf-8');
    count++;
  }
}

console.log(`\nReverted ${count} files.`);
