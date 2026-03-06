import fs from 'fs';
import path from 'path';

const directoryPath = 'c:\\new website';

const regexIngenuityWork = /Ingenuity Work/gi; // Using 'gi' to catch all casings
const regexIngenuityWorkNS = /IngenuityWork/gi; // No spaces

// List of known emails in the site
const regexEmails = /hello@IngenuityWork\.com|admin@profitrx\.co\.uk|admin@directprofitrx\.co\.uk/gi;
const replacementEmail = 'a.b.d.r.1912003mltcqa.b.d.r@gmail.com';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.git', '.next', '.gemini'].includes(file)) {
        walkDir(fullPath);
      }
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      // Only process text files
      if (['.html', '.js', '.mjs', '.cjs', '.css', '.md', '.json', '.txt'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content;

        newContent = newContent.replace(regexIngenuityWork, 'Ingenuity Work');
        newContent = newContent.replace(regexIngenuityWorkNS, 'IngenuityWork');
        
        newContent = newContent.replace(regexEmails, replacementEmail);

        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Replaced content in ${fullPath}`);
        }
      }
    }
  }
}

walkDir(directoryPath);
