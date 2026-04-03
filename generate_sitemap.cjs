const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const domain = 'https://ingenuitywork.com';

function getHtmlFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (filePath.includes('node_modules') || filePath.includes('dist') || filePath.includes('.git')) return;
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = getHtmlFiles(rootDir);

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

htmlFiles.forEach(file => {
    const relPath = path.relative(rootDir, file);
    let cleanPath = relPath.replace(/\\/g, '/').replace(/index\.html$/, '');
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    
    // Default to daily freq and slightly higher priority for main pages
    let priority = '0.5';
    let freq = 'monthly';
    if (cleanPath === '/') {
        priority = '1.0';
        freq = 'weekly';
    } else if (cleanPath.startsWith('/services/') && cleanPath.split('/').filter(Boolean).length === 2) {
        priority = '0.8';
        freq = 'weekly';
    } else if (['/about/', '/contact.html', '/pricing/'].includes(cleanPath)) {
        priority = '0.9';
        freq = 'monthly';
    }

    // Getting modified time for <lastmod>
    const mtime = fs.statSync(file).mtime.toISOString().split('T')[0];

    sitemapContent += `  <url>
    <loc>${domain}${cleanPath}</loc>
    <lastmod>${mtime}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

sitemapContent += `</urlset>`;

fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapContent);
console.log("sitemap.xml generated in public directory.");
