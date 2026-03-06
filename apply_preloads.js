import fs from 'fs';
import path from 'path';

// Target directory
const TARGET_DIR = 'C:\\new website';

// Preloads to inject globally:
// - Tailwind CDN script
// - Inter & Sora Google Fonts
// - Google Material Symbols
// - Global index.css
const preloadsHtml = `
    <!-- Performance Preloads -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap">
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
    <link rel="preload" href="/src/index.css" as="style">
    <link rel="preload" href="/src/components/site-header.js" as="script" type="module">
    <link rel="preload" href="/src/components/site-footer.js" as="script" type="module">
    <link rel="preload" href="/src/components/site-modal.js" as="script" type="module">
    <link rel="preload" href="https://cdn.tailwindcss.com?plugins=forms,container-queries" as="script">
`;

// Helper: Get all HTML files recursively
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        // Skip node_modules and dist, and .git
        if (filePath.includes('node_modules') || filePath.includes('\\dist\\') || filePath.includes('.git')) {
             continue;
        }
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = getHtmlFiles(TARGET_DIR);
let processedCount = 0;

for (const filePath of htmlFiles) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any existing preloads we added before to avoid duplicates
    content = content.replace(/<!-- Performance Preloads -->[\s\S]*?<link rel="preload" href="https:\/\/cdn\.tailwindcss\.com\?plugins=forms,container-queries" as="script">\s*/, '');
    
    // Inject preloads right after the opening <head> tag
    if (content.includes('<head>')) {
         content = content.replace('<head>', "<head>\n" + preloadsHtml);
    } else if (content.includes('<head ')) { // In case it has attributes
        const headMatch = content.match(/<head[^>]*>/);
        if (headMatch) {
             content = content.replace(headMatch[0], headMatch[0] + "\n" + preloadsHtml);
        }
    }

    // specific fix for testimonials page CTA (it works by calling <site-modal>.open())
    // Make sure <site-modal></site-modal> is present on the page near the footer.
    if (filePath.includes('testimonials\\index.html') || filePath.includes('testimonials/index.html')) {
        // Checking if we already have it to prevent duplicates
        if (!content.includes('<site-modal></site-modal>')) {
             content = content.replace('</body>', '    <site-modal></site-modal>\n</body>');
        }
        
        // Also ensure the modal script is imported at the bottom
        if (!content.includes('<script src="/src/components/site-modal.js" type="module"></script>')) {
            content = content.replace('</body>', '    <script src="/src/components/site-modal.js" type="module"></script>\n</body>');
        }
    }

    fs.writeFileSync(filePath, content);
    processedCount++;
}

console.log(`Successfully injected preloads and verified modal tags across ${processedCount} HTML files.`);
