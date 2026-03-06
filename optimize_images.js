import fs from 'fs';
import path from 'path';

// Target directory
const TARGET_DIR = 'C:\\new website';

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
let lazyCount = 0;
let preloadCount = 0;

for (const filePath of htmlFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Find Hero images to preload (first image in <main> or specifically marked)
    // We'll look for common hero images based on typical paths (like hero images from assets folder)
    // Given the structure, we can do a naive check: if an image is before the first section, or in the first header
    
    // Instead of complex AST parsing, we use a regex to find ALL img tags
    // and decide based on their position in the string if they are "above" or "below" the fold.
    // Roughly, the top 30% of characters or first 2 images can be considered 'above the fold'
    
    // We'll remove existing loading="lazy" just in case it's on a hero image
    content = content.replace(/<img([^>]*)loading="lazy"([^>]*)>/g, '<img$1$2>');
    
    let imgRegex = /<img\s+([^>]*?)>/gi;
    let match;
    let imgCount = 0;
    
    const newContent = content.replace(imgRegex, (match, attrs) => {
        imgCount++;
        
        // Check if the image already has a loading attribute
        if (attrs.includes('loading=')) {
            return match; // Leave it alone if manually set to eager
        }

        // We'll consider the first image (or first two on the homepage) as Hero/above the fold
        const isHomePage = filePath.endsWith('index.html') && !filePath.includes('\\services\\') && !filePath.includes('\\testimonials\\');
        const limit = isHomePage ? 2 : 1;

        if (imgCount <= limit) {
            // It's a hero image. Try to preload it.
            // Extract the src
            const srcMatch = attrs.match(/src="([^"]+)"/);
            if (srcMatch && srcMatch[1]) {
                 const imgSrc = srcMatch[1];
                 const preloadTag = `\n    <link rel="preload" as="image" href="${imgSrc}">\n`;
                 // Inject preload into head if not already there
                 if (!content.includes(`href="${imgSrc}"`)) { 
                      content = content.replace('<head>', '<head>' + preloadTag);
                      preloadCount++;
                 }
            }
            // Explicitly set eager just in case
            modified = true;
            return `<img ${attrs} loading="eager">`;
        } else {
            // Below the fold, inject lazy
            lazyCount++;
            modified = true;
            return `<img ${attrs} loading="lazy">`;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, newContent);
        processedCount++;
    }
}

console.log(`Global Optimization Complete!`);
console.log(`- Modified ${processedCount} HTML files.`);
console.log(`- Added ${preloadCount} <link rel="preload" as="image"> tags for Hero images.`);
console.log(`- Applied loading="lazy" to ${lazyCount} below-the-fold images.`);
