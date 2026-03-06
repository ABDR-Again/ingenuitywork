import fs from 'fs';
import path from 'path';

// --- 1. Update index.html (Homepage) ---
let indexContent = fs.readFileSync('c:\\new website\\index.html', 'utf8');

// Regex to find the 14 testimonial cards and replace with just the first 6 + a button
const testimonialsRegex = /<div class="testimonials-grid flex flex-wrap justify-center gap-6">[\s\S]*?<\/div>\r?\n<\/div>\r?\n<\/section>/;

const newHomepageTestimonials = `<div class="testimonials-grid flex flex-wrap justify-center gap-6">
        <testimonial-card client-name="Sarah Jenkins" client-role="CEO, TechFlow" avatar-url="https://i.pravatar.cc/150?u=1" quote="Ingenuity Work transformed our online presence. The speed of the site and the custom automation they built saved us hours every week." color-index="0"></testimonial-card>
        <testimonial-card client-name="Mark Davies" client-role="Founder, RetailPro" avatar-url="https://i.pravatar.cc/150?u=2" quote="The team is incredibly transparent and skilled. Our Shopify store conversion rate doubled within a month of their redesign." color-index="1"></testimonial-card>
        <testimonial-card client-name="Elena Rodriguez" client-role="CMO, HealthFirst" avatar-url="https://i.pravatar.cc/150?u=3" quote="Their SEO growth strategies are unmatched. We're finally ranking on page one for our most competitive keywords." color-index="2"></testimonial-card>
        <testimonial-card client-name="David Chen" client-role="Director, FinEdge" avatar-url="https://i.pravatar.cc/150?u=4" quote="The custom software they developed completely streamlined our backend operations. A truly premium experience." color-index="3"></testimonial-card>
        <testimonial-card client-name="Jessica Sterling" client-role="VP Marketing, LuxeWear" avatar-url="https://i.pravatar.cc/150?u=5" quote="Our Meta Ads ROI skyrocketed after Ingenuity Work took over. They understand data-driven marketing better than anyone." color-index="4"></testimonial-card>
        <testimonial-card client-name="Michael Chang" client-role="Founder, PropVault" avatar-url="https://i.pravatar.cc/150?u=6" quote="Top-tier code standards and a beautiful design language. We couldn't be happier with our new brand identity and web app." color-index="0"></testimonial-card>
    </div>
    <div class="mt-16 text-center">
        <a href="/testimonials/" class="bg-primary hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-xl shadow-primary/25 inline-flex items-center gap-2 no-underline">
            See All Testimonials <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
    </div>
</div>
</section>`;

indexContent = indexContent.replace(testimonialsRegex, newHomepageTestimonials);
fs.writeFileSync('c:\\new website\\index.html', indexContent);


// --- 2. Create the new Testimonials Page ---
const testimonialsDir = 'c:\\new website\\testimonials';
if (!fs.existsSync(testimonialsDir)) {
    fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Generate 27 distinct cards to load 3 at a time (3 * 9 rows = 27 cards)
const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Lisa", "Daniel", "Nancy", "Matthew", "Betty", "Anthony"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark"];
const roles = ["CEO", "Founder", "CMO", "CTO", "Director", "VP Marketing", "COO", "Head of Content", "Owner", "Creative Director", "Operations Manager", "Product Lead"];
const companies = ["TechFlow", "RetailPro", "HealthFirst", "FinEdge", "LuxeWear", "PropVault", "EduSpark", "LogisticsAI", "CraftBrew", "ActiveLife", "EcoHome", "StartupHub", "StudioB", "BuildRight"];

const rawCards = [];
for (let i = 0; i < 27; i++) {
    const name = `${firstNames[i]} ${lastNames[i]}`;
    const role = `${roles[i % roles.length]}, ${companies[i % companies.length]}`;
    const avatar = `https://i.pravatar.cc/150?u=${i + 20}`; // unique seed
    const quote = `Working with Ingenuity Work was the best decision for our company. The ${i % 2 === 0 ? 'development' : 'design'} phase was flawless.`;
    const colorIndex = i % 5;
    
    // We wrap each group of 3 in a 'reveal-row' except the first row which is visible immediately
    rawCards.push(`<testimonial-card client-name="${name}" client-role="${role}" avatar-url="${avatar}" quote="${quote}" color-index="${colorIndex}"></testimonial-card>`);
}

// Group into rows of 3
let cardRowsHTML = '';
for (let i = 0; i < rawCards.length; i += 3) {
    const rowClass = i < 3 ? 'testimonials-row visible-row' : 'testimonials-row hidden-row opacity-0 translate-y-8';
    cardRowsHTML += `<div class="flex flex-wrap justify-center gap-6 w-full mb-6 ${rowClass}">
        ${rawCards[i]}
        ${rawCards[i+1] || ''}
        ${rawCards[i+2] || ''}
    </div>`;
}

const testimonialsPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testimonials - Ingenuity Work</title>
    <link href="/src/index.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
    <style>
        .hidden-row {
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body class="font-sans text-slate-800 bg-slate-50 antialiased selection:bg-primary selection:text-white flex flex-col min-h-screen">
    
    <site-header></site-header>

    <main class="flex-grow pt-32 pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="section-header text-center mb-16">
                <h1 id="testimonials-heading" class="font-display font-bold text-4xl md:text-5xl text-primary mb-4 opacity-0 translate-y-8">Testimonials</h1>
                <p id="testimonials-subheading" class="text-slate-600 text-lg max-w-2xl mx-auto opacity-0 translate-y-8">Hear from the innovative companies we've partnered with to engineer digital excellence.</p>
            </div>
            
            <div id="testimonials-container" class="flex flex-col items-center">
                ${cardRowsHTML}
            </div>
            
        </div>
        
        <!-- Final CTA (Reused from homepage as requested) -->
        <section id="cta" class="py-24 px-4 sm:px-6 lg:px-8 mt-12 opacity-0 translate-y-8">
            <div class="cta-box max-w-7xl mx-auto rounded-3xl overflow-hidden relative text-center py-20 px-6 bg-primary">
                <!-- Decorative Gradient -->
                <div class="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-50"></div>
                <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                
                <div class="cta-content relative z-10 max-w-2xl mx-auto">
                    <h2 class="font-display font-bold text-4xl md:text-5xl text-white mb-6">Ready to scale your business?</h2>
                    <p class="text-slate-300 text-lg mb-10">Let's discuss how we can engineer a better future for your company.</p>
                    <button class="bg-white text-primary hover:bg-slate-100 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-xl inline-flex items-center gap-2" onclick="document.querySelector('site-modal').open()">
                        <span class="material-symbols-outlined">chat</span>
                        Start Conversation
                    </button>
                </div>
            </div>
        </section>
        
    </main>

    <site-footer></site-footer>

    <script src="/src/components/site-header.js" type="module"></script>
    <script src="/src/components/site-footer.js" type="module"></script>
    <script src="/src/components/site-modal.js" type="module"></script>
    <script src="/src/components/testimonial-card.js" type="module"></script>
    <site-modal></site-modal>

    <!-- Page Specific GSAP Logic for Scroll Reveal -->
    <script type="module">
        import gsap from 'gsap';
        import { ScrollTrigger } from 'gsap/ScrollTrigger';

        gsap.registerPlugin(ScrollTrigger);

        // 1. Initial Page Load Animation
        const tl = gsap.timeline();
        tl.to('#testimonials-heading', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .to('#testimonials-subheading', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

        // 2. Animate the very first row of cards immediately
        const firstRowCards = document.querySelectorAll('.visible-row testimonial-card');
        firstRowCards.forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: 0.5 + (i * 0.15),
                ease: "power3.out",
                onComplete: () => {
                   const innerCard = card.querySelector('.card');
                   if(innerCard) innerCard.classList.add('appear');
                }
            });
        });

        // 3. ScrollTrigger for subsequent rows
        const hiddenRows = document.querySelectorAll('.hidden-row');
        hiddenRows.forEach((row, i) => {
            ScrollTrigger.create({
                trigger: row,
                start: "top 85%", // when top of row hits 85% of screen height
                onEnter: () => {
                    row.classList.add('reveal-active');
                    
                    // Add appear class to inner cards for CSS transitions
                    const rowCards = row.querySelectorAll('testimonial-card');
                    rowCards.forEach((card, j) => {
                        setTimeout(() => {
                           const innerCard = card.querySelector('.card');
                           if(innerCard) innerCard.classList.add('appear');
                        }, j * 100); // slight stagger
                    });
                },
                once: true // Only animate once
            });
        });
        
        // 4. Scroll trigger for the CTA
        ScrollTrigger.create({
            trigger: '#cta',
            start: "top 85%",
            onEnter: () => {
                gsap.to('#cta', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
            },
            once: true
        });

    </script>
</body>
</html>`;

fs.writeFileSync(path.join(testimonialsDir, 'index.html'), testimonialsPageHTML);
console.log('Successfully updated homepage and created new testimonials page.');
