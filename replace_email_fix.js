import fs from 'fs';
import path from 'path';

const directoryPath = 'c:\\new website';

const regexIncorrectEmail1 = /a\.b\.d\.r\.1912003a\.b\.d\.r@gmail\.com/gi;
const regexIncorrectEmail2 = /hello@IngenuityWork\.com/gi;
const regexIncorrectEmail3 = /hello@ingenuity work\.com/gi;
const regexIncorrectEmail4 = /admin@profitrx\.co\.uk/gi;
const regexIncorrectEmail5 = /admin@directprofitrx\.co\.uk/gi;
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

        newContent = newContent.replace(regexIncorrectEmail1, replacementEmail);
        newContent = newContent.replace(regexIncorrectEmail2, replacementEmail);
        newContent = newContent.replace(regexIncorrectEmail3, replacementEmail);
        newContent = newContent.replace(regexIncorrectEmail4, replacementEmail);
        newContent = newContent.replace(regexIncorrectEmail5, replacementEmail);

        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Replaced content in ${fullPath}`);
        }
      }
    }
  }
}

walkDir(directoryPath);
