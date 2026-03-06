const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\new website';
const searchRegex = /Ingenuity Work/g;
const replaceString = 'Ingenuity work';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', 'dist', '.git', '.next', '.gemini'].includes(file)) {
        walkDir(fullPath);
      }
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.html', '.js', '.mjs', '.css', '.md'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('Ingenuity Work') || content.includes('IngenuityWork')) {
          content = content.replace(searchRegex, replaceString);
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Replaced in ${fullPath}`);
        }
      }
    }
  }
}

walkDir(directoryPath);
