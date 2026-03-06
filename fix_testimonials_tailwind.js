import fs from 'fs';
import path from 'path';

// --- 1. Fix testimonials/index.html head to include Tailwind CDN like index.html ---
const testimonialsHtmlPath = 'c:\\new website\\testimonials\\index.html';
let testimonialsHtml = fs.readFileSync(testimonialsHtmlPath, 'utf8');

const tailwindHead = `<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Sora:wght@400;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Theme Config -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#0b111e",
                        secondary: "#334155",
                        "background-light": "#ffffff",
                        "background-dark": "#0f172a",
                        "surface-light": "#f8fafc",
                        "surface-dark": "#1e293b",
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Sora', 'sans-serif'],
                    },
                    borderRadius: {
                        DEFAULT: "0.5rem",
                        lg: "0.75rem",
                        xl: "1rem",
                        "2xl": "1.5rem",
                    },
                },
            },
        }
</script>
<style>
    /* Custom scrollbar for clean look */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    
    .hidden-row {
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
</style>
`;

// Replace everything between <head> and </head> with the new tailwindHead
testimonialsHtml = testimonialsHtml.replace(/<link href="\/src\/index\.css" rel="stylesheet">[\s\S]*?<\/style>/, tailwindHead);
fs.writeFileSync(testimonialsHtmlPath, testimonialsHtml);

// --- 2. Update vite.config.js ---
const viteConfigPath = 'c:\\new website\\vite.config.js';
let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
if (!viteConfig.includes('testimonials: resolve(__dirname, "testimonials/index.html")')) {
    viteConfig = viteConfig.replace(
        'services: resolve(__dirname, "services/index.html"),',
        'services: resolve(__dirname, "services/index.html"),\n        testimonials: resolve(__dirname, "testimonials/index.html"),'
    );
    fs.writeFileSync(viteConfigPath, viteConfig);
}

// --- 3. Update testimonial-card.js to use Tailwind classes ---
const testimonialCardPath = 'c:\\new website\\src\\components\\testimonial-card.js';
let testimonialCard = fs.readFileSync(testimonialCardPath, 'utf8');

// Replace hex colors with Tailwind utility classes for the liquid backgrounds and text colors
const colorsReplacement = `const colors = [
            { main: 'bg-indigo-500', alt: 'bg-indigo-600', text: 'text-indigo-500' }, 
            { main: 'bg-blue-500', alt: 'bg-blue-600', text: 'text-blue-500' }, 
            { main: 'bg-sky-500', alt: 'bg-sky-600', text: 'text-sky-500' }, 
            { main: 'bg-violet-500', alt: 'bg-violet-600', text: 'text-violet-500' }, 
            { main: 'bg-fuchsia-500', alt: 'bg-fuchsia-600', text: 'text-fuchsia-500' }
        ];`;

testimonialCard = testimonialCard.replace(/const colors = \[[\s\S]*?\];/, colorsReplacement);

// Replace the HTML template injection to use the classes
const htmlReplacementTemplate = `const liquidColorClass = selectedColor.main;
        const liquidColorAltClass = selectedColor.alt;
        const textColorClass = selectedColor.text;

        this.innerHTML = \`
            <div class="card bg-primary rounded-3xl border border-white/10 shadow-xl m-4 w-[350px] h-[400px]">
                <div class="liquid \${liquidColorClass}"></div>
                <div class="liquid-alt \${liquidColorAltClass}"></div>
                
                <div class="card-content">
                    <div class="avatar-container relative w-20 h-20 mb-5">
                        <img src="\${avatarUrl}" alt="\${clientName}" class="avatar-img w-full h-full rounded-full object-cover border-[3px] border-white/10 transition-colors duration-400 hover:border-white/50">
                    </div>
                    <div class="quote-icon \${textColorClass} text-[50px] leading-none mb-2 opacity-60 transition-all duration-400 font-serif">“</div>
                    <p class="testimonial-text text-[15px] font-light leading-relaxed mb-6 italic flex-grow text-slate-200">"\${quote}"</p>
                    <h3 class="client-name font-bold text-[16px] tracking-wide uppercase m-0 text-white">\${clientName}</h3>
                    <p class="client-role text-[13px] text-slate-400 font-normal transition-colors duration-400 mt-1 hover:text-white/80">\${clientRole}</p>
                </div>
            </div>
        \`;`;

// Find where innerHTML is set and replace it
testimonialCard = testimonialCard.replace(/const liquidColor = [\s\S]*?<\/div>\r?\n\s*`;/, htmlReplacementTemplate);

// We need to fix the pseudo element by using actual divs to support tailwind classes natively inside shadow DOM/web component HTML.
// So we added <div class="liquid-alt ..."></div> in the template above.
// Now we need to update the CSS style block in the component to match this structure.
const styleReplacement = `/* --- THE LIQUID HOVER EFFECT --- */
                testimonial-card .liquid, testimonial-card .liquid-alt {
                    position: absolute;
                    width: 900px; 
                    height: 900px;
                    top: -950px;
                    left: -950px;
                    border-radius: 40%;
                    animation: testimonial-spin 6s linear infinite;
                    transition: top 1s ease-in-out, left 1s ease-in-out;
                    z-index: 1;
                    pointer-events: none; 
                }

                testimonial-card .liquid-alt {
                    width: 810px; /* 90% */
                    height: 810px;
                    top: -855px; /* offset slightly to center inside liquid */
                    left: -855px;
                    border-radius: 42%;
                    animation: testimonial-spin 8s linear infinite reverse;
                }

                /* Trigger liquid on hover */
                testimonial-card .card:hover .liquid {
                    top: -250px; 
                    left: -250px;
                }
                testimonial-card .card:hover .liquid-alt {
                    top: -205px; 
                    left: -205px;
                }`;

testimonialCard = testimonialCard.replace(/\/\* --- THE LIQUID HOVER EFFECT --- \*\/[\s\S]*?\.card:hover \.liquid \{[\s\S]*?\}/, styleReplacement);

fs.writeFileSync(testimonialCardPath, testimonialCard);
console.log('Successfully updated testimonials page HTML and converted testimonial-card.js to utilize Tailwind CSS classes.');
