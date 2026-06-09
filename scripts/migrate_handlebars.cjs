const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../New folder');
const partialsDir = path.join(__dirname, '../src/partials');
const outJs = path.join(__dirname, '../src/new-home-animations.js');

if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir, { recursive: true });
}

const files = [
    'header.html',
    'hero.html',
    'problems-growth.html',
    'about us.html',
    'services.html',
    'tools.html',
    'tracking.html',
    'why-choose-us.html',
    'industries.html',
    'portfolio.html',
    'our processs.html',
    'team.html',
    'testimonials (1).html',
    'faqs.html',
    'FINAL cta.html',
    'footer.html'
];

let allScripts = '';

files.forEach(file => {
    if (!fs.existsSync(path.join(srcDir, file))) {
        console.log(`Skipping ${file}, not found.`);
        return;
    }
    
    let content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
    
    // Extract everything between <style> and </style>
    let styles = '';
    const styleRegex = /<style>([\s\S]*?)<\/style>/i;
    const styleMatch = content.match(styleRegex);
    if (styleMatch) {
        styles = styleMatch[1];
        // Clean up global resets to avoid conflicts
        styles = styles.replace(/\*\s*\{[^}]+\}/g, '');
        styles = styles.replace(/html\s*\{[^}]+\}/g, '');
        styles = styles.replace(/body\s*\{[^}]+\}/g, '');
        styles = styles.replace(/:root\s*\{([\s\S]*?)\}/g, (match, inner) => {
             // keep root variables but maybe scope them? Actually let's keep them
             return match;
        });
    }
    
    // Extract everything between <script> and </script>
    // We ignore the CDN script tags
    const scriptRegex = /<script(?:\s+[^>]*?)?>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
        let scriptContent = match[1].trim();
        if (scriptContent.length > 0 && !scriptContent.includes('gsap.min.js')) {
            allScripts += `\n// --- From ${file} ---\n${scriptContent}\n`;
        }
    }
    
    // Extract the body content (ignore html, head, body tags)
    let bodyContent = '';
    const bodyRegex = /<body(?:\s+[^>]*?)?>([\s\S]*?)<\/body>/i;
    const bodyMatch = content.match(bodyRegex);
    if (bodyMatch) {
        bodyContent = bodyMatch[1];
        // Remove script tags from body
        bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    } else {
        bodyContent = content; // fallback
    }
    
    // Construct the partial
    let hbsContent = `<!-- Partial from ${file} -->\n`;
    if (styles.trim().length > 0) {
        hbsContent += `<style>\n${styles.trim()}\n</style>\n\n`;
    }
    hbsContent += bodyContent.trim() + '\n';
    
    // Create safe filename
    const safeName = file.toLowerCase().replace(/[\s\(\)]+/g, '-').replace(/-+/g, '-').replace('.html', '.hbs');
    fs.writeFileSync(path.join(partialsDir, safeName), hbsContent);
    console.log(`Created partial: ${safeName}`);
});

// Wrap all scripts in a DOMContentLoaded listener
const finalScript = `
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Animations may not work.');
    }
    
    ${allScripts}
});
`;

fs.writeFileSync(outJs, finalScript);
console.log('Created new-home-animations.js');

