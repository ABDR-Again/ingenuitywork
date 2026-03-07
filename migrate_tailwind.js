import fs from 'fs';
import path from 'path';

const TARGET_DIR = 'C:\\new website';

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
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

    // Remove Tailwind CDN Script
    content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com\?.*?"><\/script>\s*/g, '');
    content = content.replace(/<link rel="preload" href="https:\/\/cdn\.tailwindcss\.com\?.*?" as="script">\s*/g, '');

    // Remove Inline Tailwind Config
    content = content.replace(/<script id="tailwind-config">[\s\S]*?<\/script>\s*/g, '');
    
    // Check if index.css is loaded, and if not, add it
    if (!content.includes('<link rel="stylesheet" href="/src/index.css">')) {
         content = content.replace('</head>', '    <link rel="stylesheet" href="/src/index.css">\n</head>');
    }

    fs.writeFileSync(filePath, content);
    processedCount++;
}

console.log(`Global Update Complete! Processed ${processedCount} HTML files.`);
