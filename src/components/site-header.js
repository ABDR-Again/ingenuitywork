/**
 * <site-header> Web Component
 * Renders the shared sticky header with navigation across all pages.
 * Animation is scoped via a unique CSS class prefix so it cannot interfere with page content.
 */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    // Inject scoped animation styles
    if (!document.getElementById('site-header-anim-styles')) {
      const style = document.createElement('style');
      style.id = 'site-header-anim-styles';
      style.textContent = `
        @keyframes siteHeaderSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .site-header-animate {
          animation: siteHeaderSlideDown 0.6s ease-out both;
        }
        site-header { display: block; position: relative; z-index: 100; }
      `;
      document.head.appendChild(style);
    }

    this.innerHTML = `
<!-- Sticky Header -->
<header class="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100 site-header-animate">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex justify-between items-center h-20">
<!-- Logo -->
<div class="flex items-center gap-3">
<div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
<span class="material-symbols-outlined text-xl">code</span>
</div>
<a href="/" class="font-display font-bold text-xl tracking-tight text-primary no-underline">Ingenuity Work</a>
</div>
<!-- Nav -->
<nav class="hidden xl:flex gap-8 items-center h-full">
<a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors h-full flex items-center" href="/">Home</a>

<!-- Services Dropdown -->
<div class="relative group h-full flex items-center">
    <a class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors flex items-center gap-1 cursor-pointer" href="/services/">
        Services <span class="material-symbols-outlined text-[16px] transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
    </a>
    <div class="absolute top-full left-1/2 -translate-x-1/2 z-[100] w-[600px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-2 gap-4 translate-y-2 group-hover:translate-y-0 before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
        <!-- Service Items -->
        <a href="/services/web-design/" class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item no-underline">
            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform"><span class="material-symbols-outlined">web</span></div>
            <div>
                <div class="font-bold text-slate-900 text-sm mb-1">Web Design</div>
                <div class="text-xs text-slate-500">Custom WordPress &amp; Shopify</div>
            </div>
        </a>
        <a href="/services/seo/" class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item no-underline">
            <div class="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform"><span class="material-symbols-outlined">search</span></div>
            <div>
                <div class="font-bold text-slate-900 text-sm mb-1">SEO Growth</div>
                <div class="text-xs text-slate-500">Rank higher on Google</div>
            </div>
        </a>
        <a href="/services/meta-ads/" class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item no-underline">
            <div class="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform"><span class="material-symbols-outlined">campaign</span></div>
            <div>
                <div class="font-bold text-slate-900 text-sm mb-1">Meta Ads</div>
                <div class="text-xs text-slate-500">Scale on FB &amp; Insta</div>
            </div>
        </a>
        <a href="/services/automation/" class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item no-underline">
            <div class="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform"><span class="material-symbols-outlined">smart_toy</span></div>
            <div>
                <div class="font-bold text-slate-900 text-sm mb-1">Automation</div>
                <div class="text-xs text-slate-500">Streamline workflows</div>
            </div>
        </a>
        <div class="col-span-2 pt-4 mt-2 border-t border-slate-100 flex justify-center">
            <a href="/services/" class="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all no-underline">View all services <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
        </div>
    </div>
</div>

<!-- Case Studies Dropdown -->
<div class="relative group h-full flex items-center">
    <a class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors flex items-center gap-1 cursor-pointer" href="/case-studies/">
        Case Studies <span class="material-symbols-outlined text-[16px] transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
    </a>
    <div class="absolute top-full left-1/2 -translate-x-1/2 z-[100] w-[350px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
        <!-- CS Items -->
        <a href="/case-studies/luxewear-redesign/" class="flex flex-col gap-1 p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline">
            <div class="text-xs font-bold text-primary uppercase tracking-wider">Web Design</div>
            <div class="font-bold text-slate-900 text-sm">LuxeWear Redesign</div>
            <div class="text-xs text-slate-500">+85% Conversion Rate</div>
        </a>
        <a href="/case-studies/glowskin-meta-ads/" class="flex flex-col gap-1 p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline">
            <div class="text-xs font-bold text-primary uppercase tracking-wider">Meta Ads</div>
            <div class="font-bold text-slate-900 text-sm">GlowSkin Scaling</div>
            <div class="text-xs text-slate-500">5.2x ROAS at $50k/mo</div>
        </a>
        <a href="/case-studies/healthfirst-seo/" class="flex flex-col gap-1 p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline">
            <div class="text-xs font-bold text-primary uppercase tracking-wider">SEO</div>
            <div class="font-bold text-slate-900 text-sm">HealthFirst Visibility</div>
            <div class="text-xs text-slate-500">3x Organic Traffic</div>
        </a>
        <div class="pt-3 mt-1 border-t border-slate-100 flex justify-center">
            <a href="/case-studies/" class="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all no-underline">View all case studies <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
        </div>
    </div>
</div>

<!-- Company Dropdown -->
<div class="relative group h-full flex items-center">
    <a class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
        Company <span class="material-symbols-outlined text-[16px] transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
    </a>
    <div class="absolute top-full left-1/2 -translate-x-1/2 z-[100] w-[220px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
        <a href="/about/" class="text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-50 p-2.5 rounded-lg transition-colors no-underline flex items-center gap-3"><span class="material-symbols-outlined text-[18px]">info</span> About Us</a>
        <a href="/process/" class="text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-50 p-2.5 rounded-lg transition-colors no-underline flex items-center gap-3"><span class="material-symbols-outlined text-[18px]">account_tree</span> Our Process</a>
        <a href="/pricing/" class="text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-50 p-2.5 rounded-lg transition-colors no-underline flex items-center gap-3"><span class="material-symbols-outlined text-[18px]">payments</span> Pricing</a>
        <a href="/contact.html" class="text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-50 p-2.5 rounded-lg transition-colors no-underline flex items-center gap-3"><span class="material-symbols-outlined text-[18px]">call</span> Contact Us</a>
    </div>
</div>

</nav>
<!-- Actions -->
<div class="hidden md:flex items-center gap-6">
<div class="hidden lg:flex items-center gap-2 text-slate-600">
<span class="material-symbols-outlined text-lg">call</span>
<span class="text-sm font-medium">0313 931 3848</span>
</div>
<button class="modal-trigger bg-primary hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
<span>Book Consultation</span>
<span class="material-symbols-outlined text-sm shrink-0">arrow_forward</span>
</button>
</div>
<!-- Mobile Menu Button -->
<button class="xl:hidden p-2 text-slate-600">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</header>
`;
  }
}

customElements.define('site-header', SiteHeader);
