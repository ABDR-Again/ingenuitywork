/**
 * <site-modal> Web Component
 * Renders the shared consultation modal popup across all pages.
 * The modal HTML is defined once here, eliminating duplication.
 */
import '../modal.js';

class SiteModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<!-- Consultation Modal Overlay -->
<div id="consultation-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 hidden">
    <!-- Backdrop -->
    <div class="modal-backdrop absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0"></div>
    
    <!-- Modal Window -->
    <div class="modal-window relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden scale-95 opacity-0 flex flex-col h-auto max-h-[90vh]">
        <!-- Close Button -->
        <button class="modal-close z-10 absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
            <span class="material-symbols-outlined text-lg">close</span>
        </button>
        
        <!-- Header -->
        <div class="p-6 md:p-8 pb-4 md:pb-6 border-b border-slate-100/50 bg-slate-50/50 shrink-0">
            <h3 class="font-display font-black text-2xl text-slate-900 mb-2">Let's Talk Growth</h3>
            <p class="text-slate-500 text-sm">Fill out the details below so we can prepare for our chat.</p>
        </div>
        
        <!-- Scrollable Content Area -->
        <form id="consultation-form" class="overflow-y-auto overflow-x-hidden flex-grow relative">
            
            <!-- Step 1: Contact Info -->
            <div id="modal-step-1" class="p-6 md:p-8 flex flex-col gap-4 w-full h-fit">
                <h4 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Step 1: Your Details</h4>
                
                <!-- Error Banner -->
                <div id="modal-error-1" class="hidden bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm flex items-start gap-2">
                    <span class="material-symbols-outlined text-[18px]">error</span>
                    <span class="error-text">Please fill out all required fields.</span>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name <span class="text-red-500">*</span></label>
                    <input type="text" id="modal-name" name="name" placeholder="John Doe" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address <span class="text-red-500">*</span></label>
                    <input type="email" id="modal-email" name="email" placeholder="john@example.com" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number <span class="text-red-500">*</span></label>
                    <div class="flex gap-2">
                        <select id="modal-country" name="country_code" class="w-[100px] shrink-0 px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer">
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+92" selected>🇵🇰 +92</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+971">🇦🇪 +971</option>
                        </select>
                        <input type="tel" id="modal-phone" name="phone_number" placeholder="312 345 6789" required class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-w-0">
                    </div>
                </div>
                <button type="button" id="modal-next-1" class="w-full shrink-0 h-12 mt-2 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-primary/20">
                    Next Step <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>

            <!-- Step 2: Project Details (Hidden initially) -->
            <div id="modal-step-2" class="p-6 md:p-8 hidden flex flex-col gap-4 w-full h-fit opacity-0 translate-x-10 pointer-events-none">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 class="font-bold text-slate-900 text-sm">Step 2: Project Info</h4>
                    <button type="button" id="modal-back-1" class="text-xs text-slate-500 hover:text-primary flex items-center gap-1 font-medium transition-colors"><span class="material-symbols-outlined text-[14px]">arrow_back</span> Back</button>
                </div>
                
                <!-- Error Banner -->
                <div id="modal-error-2" class="hidden bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm flex items-start gap-2">
                    <span class="material-symbols-outlined text-[18px]">error</span>
                    <span class="error-text">Please fill out all required fields.</span>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Service <span class="text-red-500">*</span></label>
                        <select id="modal-service" name="service" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer">
                            <option value="" disabled selected>Select...</option>
                            <option value="Web Design">Web Design</option>
                            <option value="SEO">SEO</option>
                            <option value="Ads">Google/Meta Ads</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Branding">Branding</option>
                            <option value="Content Creation">Content Creation</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Automation">Automation</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Other">Other (Specify)</option>
                        </select>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Budget <span class="text-red-500">*</span></label>
                        <select id="modal-budget" name="budget" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer">
                            <option value="" disabled selected>Select...</option>
                            <option value="<$1k">&lt; $1,000</option>
                            <option value="$1k-$5k">$1,000 - $5,000</option>
                            <option value="$5k-$10k">$5,000 - $10,000</option>
                            <option value="$10k+">$10,000+</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Timeline <span class="text-red-500">*</span></label>
                    <select id="modal-timeline" name="timeline" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer">
                        <option value="" disabled selected>Select timeline...</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-2 Months">1-2 Months</option>
                        <option value="Flexible">Flexible</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Other Details (Optional)</label>
                    <textarea id="modal-reason" name="other_details" rows="2" placeholder="Tell us more about your project goals..." class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
                </div>
                <button type="submit" id="modal-next-2" class="w-full shrink-0 h-12 mt-2 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-primary/20">
                    Continue to Connect <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
            
            <!-- Step 3: Connection Options (Hidden initially) -->
            <div id="modal-step-3" class="p-6 md:p-8 hidden flex flex-col gap-4 w-full h-fit opacity-0 translate-x-10 pointer-events-none">
                <div class="text-center mb-2">
                    <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span class="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-xl mb-1">Details Ready!</h4>
                    <p class="text-slate-500 text-sm">How would you like to conclude?</p>
                </div>
                
                <a href="https://wa.me/923139313848" target="_blank" class="w-full h-14 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors shadow-lg shadow-green-500/20 no-underline">
                    <span class="material-symbols-outlined">chat</span>
                    Message on WhatsApp
                </a>
                
                <a href="mailto:a.b.d.r.1912003mltcqa.b.d.r@gmail.com" class="w-full h-14 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm no-underline">
                    <span class="material-symbols-outlined">mail</span>
                    Send an Email
                </a>
                
                <button type="button" id="modal-back-2" class="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mx-auto underline decoration-slate-300 underline-offset-4">
                    Wait, let me edit details
                </button>
            </div>
        </form>
    </div>
</div>
<!-- /Consultation Modal -->
`;
  }
}

customElements.define('site-modal', SiteModal);
