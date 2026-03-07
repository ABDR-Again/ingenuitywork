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
    let changed = false;

    // Fix trailing slashes capturing inside the regex from earlier:
    if (content.includes('"/ loading="')) {
        content = content.replace(/"\/ loading="/g, '" loading="');
        changed = true;
    }
    
    // Fix unescaped < in option tags for Vite parser
    if (content.includes('<option value="<$1k">< $1,000</option>')) {
        content = content.replace(/<option value="<\$1k">< \$1,000<\/option>/g, '<option value="&lt;$1k">&lt; $1,000</option>');
        changed = true;
    }
    if (content.includes('<option value="<$1k">')) {
        content = content.replace(/<option value="<\$1k">/g, '<option value="&lt;$1k">');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        processedCount++;
    }
}

console.log(`Global Tag Fix Complete! Processed ${processedCount} HTML files.`);
