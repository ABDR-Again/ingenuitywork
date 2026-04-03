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

function generateTitle(relPath) {
    if (relPath === 'index.html') return "Ingenuity Work - Web Development & Growth Services";
    
    // e.g., services/web-design/index.html -> web design
    let segments = relPath.replace(/\\/g, '/').split('/');
    let pageName = segments[segments.length - 2] || segments[segments.length - 1].replace('.html', '');
    
    // format name: web-design -> Web Design
    pageName = pageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    if (relPath.includes('services')) return `${pageName} Services - Ingenuity Work`;
    if (relPath.includes('case-studies')) return `${pageName} Case Study - Ingenuity Work`;
    if (relPath.includes('portfolio')) return `Portfolio - Ingenuity Work`;
    return `${pageName} - Ingenuity Work`;
}

function generateDescription(relPath, title) {
    if (relPath === 'index.html') return "Ingenuity Work combines premium web development with data-driven growth automation to scale your business beyond limits.";
    if (relPath.includes('services')) return `Explore our ${title.replace(' - Ingenuity Work', '')} to scale your business with expert solutions from Ingenuity Work.`;
    if (relPath.includes('case-studies')) return `Read our case study on ${title.replace(' Case Study - Ingenuity Work', '')} and see how Ingenuity Work delivered premium results.`;
    if (relPath.includes('pricing')) return `Transparent pricing for premium web development and growth services at Ingenuity Work.`;
    return `Learn more about ${title.replace(' - Ingenuity Work', '')} at Ingenuity Work. Small team, premium results.`;
}

function generateCanonical(relPath) {
    let cleanPath = relPath.replace(/\\/g, '/').replace(/index\.html$/, '');
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    return `${domain}${cleanPath}`;
}

const htmlFiles = getHtmlFiles(rootDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    const relPath = path.relative(rootDir, file);
    
    const title = generateTitle(relPath);
    const description = generateDescription(relPath, title);
    const canonical = generateCanonical(relPath);
    
    const seoTags = `
    <!-- Basic SEO tags -->
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${domain}/file.jpg">
    <meta property="og:site_name" content="Ingenuity Work">

    <!-- Favicon -->
    <link rel="icon" type="image/jpeg" href="/file.jpg">
`;
    // We want to insert these tags right after <head> or replace existing <title>
    // However, regex replacing <title>... might be tricky if it spans multiple lines or has attributes.
    // Let's remove existing <title> and description meta tags first to avoid duplicates.
    content = content.replace(/<title>[\s\S]*?<\/title>/gi, '');
    content = content.replace(/<meta\s+name="description"[\s\S]*?>/gi, '');
    content = content.replace(/<link\s+rel="canonical"[\s\S]*?>/gi, '');
    content = content.replace(/<meta\s+property="og:[\s\S]*?>/gi, '');
    content = content.replace(/<link\s+rel="icon"[\s\S]*?>/gi, '');
    
    // Insert just after <head>
    // Some files might have <head ...> e.g. <head lang="en">
    content = content.replace(/(<head[^>]*>)/i, `$1\n${seoTags}`);

    fs.writeFileSync(file, content);
    console.log(`Updated SEO for ${relPath}`);
});

console.log("All pages updated with universal SEO tags.");
