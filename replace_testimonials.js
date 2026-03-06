import fs from 'fs';

let content = fs.readFileSync('c:\\new website\\index.html', 'utf8');

// The new Testimonials Section HTML (14 cards)
const newTestimonialsHTML = `<!-- Testimonials (NEW) -->
<section id="testimonials" class="py-24 bg-white overflow-hidden">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="section-header text-center mb-16">
        <span class="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Client Feedback</span>
        <h2 class="font-display font-bold text-3xl md:text-5xl text-primary mb-4">What Our Partners Say</h2>
        <p class="text-slate-600 text-lg max-w-2xl mx-auto">Discover how we've helped businesses like yours engineer growth through custom development and strategic marketing.</p>
    </div>
    
    <div class="testimonials-grid flex flex-wrap justify-center gap-6">
        <testimonial-card client-name="Sarah Jenkins" client-role="CEO, TechFlow" avatar-url="https://i.pravatar.cc/150?u=1" quote="Ingenuity Work transformed our online presence. The speed of the site and the custom automation they built saved us hours every week." color-index="0"></testimonial-card>
        <testimonial-card client-name="Mark Davies" client-role="Founder, RetailPro" avatar-url="https://i.pravatar.cc/150?u=2" quote="The team is incredibly transparent and skilled. Our Shopify store conversion rate doubled within a month of their redesign." color-index="1"></testimonial-card>
        <testimonial-card client-name="Elena Rodriguez" client-role="CMO, HealthFirst" avatar-url="https://i.pravatar.cc/150?u=3" quote="Their SEO growth strategies are unmatched. We're finally ranking on page one for our most competitive keywords." color-index="2"></testimonial-card>
        <testimonial-card client-name="David Chen" client-role="Director, FinEdge" avatar-url="https://i.pravatar.cc/150?u=4" quote="The custom software they developed completely streamlined our backend operations. A truly premium experience." color-index="3"></testimonial-card>
        <testimonial-card client-name="Jessica Sterling" client-role="VP Marketing, LuxeWear" avatar-url="https://i.pravatar.cc/150?u=5" quote="Our Meta Ads ROI skyrocketed after Ingenuity Work took over. They understand data-driven marketing better than anyone." color-index="4"></testimonial-card>
        <testimonial-card client-name="Michael Chang" client-role="Founder, PropVault" avatar-url="https://i.pravatar.cc/150?u=6" quote="Top-tier code standards and a beautiful design language. We couldn't be happier with our new brand identity and web app." color-index="0"></testimonial-card>
        <testimonial-card client-name="Rachel Torres" client-role="Head of Content, EduSpark" avatar-url="https://i.pravatar.cc/150?u=7" quote="Their clear communication and regular updates made this the easiest agency relationship we've ever had." color-index="1"></testimonial-card>
        <testimonial-card client-name="Thomas Wright" client-role="COO, LogisticsAI" avatar-url="https://i.pravatar.cc/150?u=8" quote="They delivered a complex automation system ahead of schedule without sacrificing any quality. Highly recommended." color-index="2"></testimonial-card>
        <testimonial-card client-name="Amanda Lee" client-role="Owner, CraftBrew" avatar-url="https://i.pravatar.cc/150?u=9" quote="The ongoing after-support is phenomenal. Whenever we need a tweak or face an issue, they are just a message away." color-index="3"></testimonial-card>
        <testimonial-card client-name="Chris Evans" client-role="CEO, ActiveLife" avatar-url="https://i.pravatar.cc/150?u=10" quote="We brought them in to fix a broken WordPress build from another agency. They stabilized it within days." color-index="4"></testimonial-card>
        <testimonial-card client-name="Sophia Martinez" client-role="Marketing Director, EcoHome" avatar-url="https://i.pravatar.cc/150?u=11" quote="If you need a team that understands both the technical and business sides of growth, Ingenuity Work is the right choice." color-index="0"></testimonial-card>
        <testimonial-card client-name="James Wilson" client-role="Founder, StartupHub" avatar-url="https://i.pravatar.cc/150?u=12" quote="Their lead generation campaigns have been the primary driver of our growth this year. The results speak for themselves." color-index="1"></testimonial-card>
        <testimonial-card client-name="Olivia Kim" client-role="Creative Director, StudioB" avatar-url="https://i.pravatar.cc/150?u=13" quote="A rare combination of incredible design sense and flawless technical execution. They elevated our entire brand." color-index="2"></testimonial-card>
        <testimonial-card client-name="Daniel Brown" client-role="Operations Mgr, BuildRight" avatar-url="https://i.pravatar.cc/150?u=14" quote="We consider them an extension of our own team. The partnership has been entirely invaluable to our company's success." color-index="3"></testimonial-card>
    </div>
</div>
</section>`;

// Replace the Trusted By and old Testimonials sections
const regexToRemove = /<!-- Trusted By Brands -->[\s\S]*?<!-- Final CTA -->/;
content = content.replace(regexToRemove, newTestimonialsHTML + '\n<!-- Final CTA -->');

// Add script tag if not present
const scriptTarget = '<script src="/src/components/process-card.js" type="module"></script>';
const scriptReplacement = '<script src="/src/components/process-card.js" type="module"></script>\n<script src="/src/components/testimonial-card.js" type="module"></script>';

if (!content.includes('testimonial-card.js')) {
    content = content.replace(scriptTarget, scriptReplacement);
}

fs.writeFileSync('c:\\new website\\index.html', content);
console.log('Successfully updated index.html with new testimonials section.');
