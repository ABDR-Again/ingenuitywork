import fs from 'fs';

let content = fs.readFileSync('c:\\new website\\index.html', 'utf8');

// Replace Services cards
const servicesRegex = /<!-- Service 1 -->[\s\S]*?<!-- Service 4 -->[\s\S]*?<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*<\/section>/;
const servicesReplacement = `<!-- Service 1 -->
<service-growth-card url="/services/web-design/" icon="web" title="WordPress" description="Custom themes and plugins built for performance and ease of management." gradient="from-blue-50 to-indigo-100"></service-growth-card>
<!-- Service 2 -->
<service-growth-card url="/services/shopify/" icon="shopping_bag" title="Shopify" description="High-converting stores designed to maximize your e-commerce revenue." gradient="from-green-50 to-emerald-100"></service-growth-card>
<!-- Service 3 -->
<service-growth-card url="/services/custom-dev/" icon="code_blocks" title="Custom Dev" description="Tailor-made web applications solving unique business challenges." gradient="from-purple-50 to-fuchsia-100"></service-growth-card>
<!-- Service 4 -->
<service-growth-card url="/services/seo/" icon="search" title="SEO Growth" description="Data-driven strategies to rank higher and attract qualified leads." gradient="from-orange-50 to-amber-100"></service-growth-card>
</div>
<div class="mt-12 text-center">
    <a href="/services/" class="bg-primary hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-xl shadow-primary/25 inline-flex items-center gap-2 no-underline">
        See All Services <span class="material-symbols-outlined text-sm">arrow_forward</span>
    </a>
</div>
</div>
</section>`;

content = content.replace(servicesRegex, servicesReplacement);

// Process Section Header - Center "How We Work" text
const processHeaderRegex = /<h2 class="font-display font-bold text-3xl md:text-4xl text-primary mb-4">How We Work<\/h2>\r?\n\s*<p class="text-slate-600 text-lg max-w-2xl">A proven 4-step framework to take your project from concept to completion\.<\/p>/;
const processHeaderReplacement = `<h2 class="font-display font-bold text-3xl md:text-4xl text-primary mb-4 text-center">How We Work</h2>
<p class="text-slate-600 text-lg max-w-2xl mx-auto text-center">A proven 4-step framework to take your project from concept to completion.</p>`;

content = content.replace(processHeaderRegex, processHeaderReplacement);

// Replace Process cards
const processCardsRegex = /<!-- Step 1 -->[\s\S]*?<!-- Step 4 -->[\s\S]*?<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*<\/section>/;
const processCardsReplacement = `<!-- Step 1 -->
<process-card step="1" title="Discovery" description="We analyze your needs, goals, and target audience."></process-card>
<!-- Step 2 -->
<process-card step="2" title="Strategy" description="We plan the architecture, design, and roadmap."></process-card>
<!-- Step 3 -->
<process-card step="3" title="Build" description="We code and develop using premium standards."></process-card>
<!-- Step 4 -->
<process-card step="4" title="Launch" description="We deploy, test, and hand over your asset."></process-card>
</div>
</div>
</div>
</section>`;

content = content.replace(processCardsRegex, processCardsReplacement);

// Add script tags
const scriptTarget = '<script src="/src/components/why-choose-us-card.js" type="module"></script>';
const scriptReplacement = '<script src="/src/components/why-choose-us-card.js" type="module"></script>\n<script src="/src/components/service-growth-card.js" type="module"></script>\n<script src="/src/components/process-card.js" type="module"></script>';

if (!content.includes('service-growth-card.js')) {
    content = content.replace(scriptTarget, scriptReplacement);
}

fs.writeFileSync('c:\\new website\\index.html', content);
console.log('Successfully updated index.html with new services and process components.');
