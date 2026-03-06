/**
 * <site-footer> Web Component
 * Renders the shared footer across all pages.
 * Animation is scoped via a unique CSS class prefix + IntersectionObserver so it
 * cannot interfere with any other page content or animations.
 */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    // Inject scoped animation styles (once)
    if (!document.getElementById('site-footer-anim-styles')) {
      const style = document.createElement('style');
      style.id = 'site-footer-anim-styles';
      style.textContent = `
        @keyframes siteFooterFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .site-footer-hidden {
          opacity: 0;
        }
        .site-footer-reveal {
          animation: siteFooterFadeUp 0.7s ease-out both;
        }
        .site-footer-reveal-delay-1 {
          animation: siteFooterFadeUp 0.7s ease-out 0.1s both;
        }
        .site-footer-reveal-delay-2 {
          animation: siteFooterFadeUp 0.7s ease-out 0.2s both;
        }
        .site-footer-reveal-delay-3 {
          animation: siteFooterFadeUp 0.7s ease-out 0.3s both;
        }
      `;
      document.head.appendChild(style);
    }

    this.innerHTML = `
<footer class="bg-primary text-slate-300 pt-20 pb-10 border-t border-slate-800 mt-auto">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 site-footer-hidden" data-footer-reveal>
    
    <!-- Brand -->
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white">
                <span class="material-symbols-outlined text-xl">code</span>
            </div>
            <span class="font-display font-bold text-xl tracking-tight text-white">Ingenuity Work</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed max-w-xs">Premium web development and data-driven growth services to take your business to the next level.</p>
        <div class="flex gap-4">
            <a href="https://www.instagram.com/IngenuityWork" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
            <a href="https://wa.me/923139313848" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors whatsapp-link" aria-label="WhatsApp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
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
            <span class="material-symbols-outlined text-[20px] text-slate-300">call</span>
            <a href="https://wa.me/923139313848" class="hover:text-white transition-colors whatsapp-link no-underline">0313 931 3848</a>
        </div>
        <div class="flex items-center gap-3 text-sm">
            <span class="material-symbols-outlined text-[20px] text-slate-300">mail</span>
            <span>a.b.d.r.1912003mltcqa.b.d.r@gmail.com</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
            <span class="material-symbols-outlined text-[20px] text-slate-300">location_on</span>
            <span>Global Remote, Based in PK</span>
        </div>
    </div>
</div>

<div class="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 site-footer-hidden" data-footer-reveal-bottom>
    <p class="text-sm text-slate-300">&copy; 2026 Ingenuity work. All rights reserved.</p>
    <div class="flex gap-6">
        <a href="/privacy.html" class="text-sm text-white hover:text-slate-200 transition-colors no-underline">Privacy Policy</a>
        <a href="/terms.html" class="text-sm text-white hover:text-slate-200 transition-colors no-underline">Terms of Service</a>
    </div>
</div>
</div>
</footer>
`;

    // Set up IntersectionObserver for scroll-reveal animation
    this._setupRevealAnimation();
  }

  _setupRevealAnimation() {
    const gridEl = this.querySelector('[data-footer-reveal]');
    const bottomEl = this.querySelector('[data-footer-reveal-bottom]');
    if (!gridEl && !bottomEl) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.hasAttribute('data-footer-reveal')) {
            entry.target.classList.remove('site-footer-hidden');
            entry.target.classList.add('site-footer-reveal');
          }
          if (entry.target.hasAttribute('data-footer-reveal-bottom')) {
            entry.target.classList.remove('site-footer-hidden');
            entry.target.classList.add('site-footer-reveal-delay-2');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (gridEl) observer.observe(gridEl);
    if (bottomEl) observer.observe(bottomEl);
  }
}

customElements.define('site-footer', SiteFooter);
